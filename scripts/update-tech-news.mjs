import fs from "node:fs/promises";
import Parser from "rss-parser";
import OpenAI from "openai";
import { observeOpenAI } from "@langfuse/openai";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";

const REQUIRED_ENV = [
  "OPENAI_API_KEY",
  "LANGFUSE_PUBLIC_KEY",
  "LANGFUSE_SECRET_KEY",
];

for (const name of REQUIRED_ENV) {
  if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
}

process.env.LANGFUSE_BASE_URL ||= "https://us.cloud.langfuse.com";

const sdk = new NodeSDK({
  spanProcessors: [new LangfuseSpanProcessor()],
});
sdk.start();

const openai = observeOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }), {
  generationName: "weekly-tech-news-curation",
  sessionId: `weekly-tech-news-${new Date().toISOString().slice(0, 10)}`,
  tags: ["portfolio", "scheduled-agent", "tech-news"],
  metadata: { site: "sibustephen.me", workflow: "weekly-tech-news" },
});

const parser = new Parser({
  timeout: 20_000,
  headers: { "User-Agent": "SibuStephenTechNewsAgent/1.0 (+https://sibustephen.me)" },
});

const feeds = [
  { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index" },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  { name: "Drupal.org", url: "https://www.drupal.org/planet/rss.xml" },
];

const clean = (value = "") => value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

async function collectArticles() {
  const settled = await Promise.allSettled(
    feeds.map(async (source) => {
      const feed = await parser.parseURL(source.url);
      return feed.items.slice(0, 12).map((item) => ({
        source: source.name,
        title: clean(item.title) || "Untitled",
        url: item.link || item.guid || "",
        publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
        excerpt: clean(item.contentSnippet || item.content || item.summary).slice(0, 700),
      }));
    }),
  );

  const articles = settled
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value)
    .filter((item) => item.url && item.title);

  if (!articles.length) throw new Error("No RSS articles could be retrieved.");
  return articles;
}

function parseJson(text) {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

async function generateBriefing(articles) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    temperature: 0.2,
    max_tokens: 1800,
    messages: [
      {
        role: "system",
        content: `You are Sibu Stephen's scheduled technology-news curation agent. Select exactly five timely and meaningful stories from the supplied RSS records. Prioritize AI, web engineering, Drupal, accessibility, cloud, developer tooling, cybersecurity, and digital experience. Use only supplied facts. Keep summaries factual and useful. Return JSON only with this schema: {"summary":"one paragraph","items":[{"title":"string","summary":"two concise sentences","source":"string","url":"string","publishedAt":"ISO date/string","topics":["string"]}]}. Preserve each selected article's original URL and source.`,
      },
      { role: "user", content: JSON.stringify(articles, null, 2) },
    ],
  });

  const content = response.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned no content.");
  const parsed = parseJson(content);
  if (!Array.isArray(parsed.items) || parsed.items.length === 0) throw new Error("Model output did not contain news items.");
  return parsed;
}

async function main() {
  const articles = await collectArticles();
  const briefing = await generateBriefing(articles);
  const output = {
    generatedAt: new Date().toISOString(),
    agent: {
      name: "Sibu Tech Intelligence Agent",
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      schedule: "Every Monday",
      observedWith: "Langfuse",
      sourceCount: feeds.length,
    },
    summary: briefing.summary,
    items: briefing.items.slice(0, 5),
  };
  await fs.writeFile("public/tech-news.json", `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Published ${output.items.length} curated technology stories.`);
}

try {
  await main();
} finally {
  await sdk.shutdown();
}
