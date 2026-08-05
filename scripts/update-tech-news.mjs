import fs from "node:fs/promises";
import Parser from "rss-parser";
import { GoogleGenAI } from "@google/genai";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { trace, SpanStatusCode } from "@opentelemetry/api";
import { LangfuseSpanProcessor } from "@langfuse/otel";

const requiredVariables = [
  "GEMINI_API_KEY",
  "LANGFUSE_PUBLIC_KEY",
  "LANGFUSE_SECRET_KEY",
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

process.env.LANGFUSE_BASE_URL =
  process.env.LANGFUSE_BASE_URL || "https://us.cloud.langfuse.com";

const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";

const sdk = new NodeSDK({
  spanProcessors: [new LangfuseSpanProcessor()],
});

sdk.start();

const tracer = trace.getTracer("sibu-tech-news-agent");

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const parser = new Parser({
  timeout: 20000,
  headers: {
    "User-Agent": "SibuStephenTechNewsAgent/2.0",
  },
});

const feeds = [
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
  },
  {
    name: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
  },
];

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function generateWithRetry(params, maxAttempts = 5) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await gemini.models.generateContent(params);
    } catch (error) {
      lastError = error;

      const status = Number(error?.status);
      const retryable = [429, 500, 502, 503, 504].includes(status);

      if (!retryable || attempt === maxAttempts) {
        throw error;
      }

      const exponentialDelay = 2000 * 2 ** (attempt - 1);
      const jitter = Math.floor(Math.random() * 1000);
      const delay = Math.min(exponentialDelay + jitter, 30000);

      console.warn(
        `Gemini returned ${status}. Retrying in ${delay}ms ` +
          `(${attempt}/${maxAttempts})...`,
      );

      await sleep(delay);
    }
  }

  throw lastError;
}

async function loadArticles() {
  const results = await Promise.allSettled(
    feeds.map(async (feedSource) => {
      const feed = await parser.parseURL(feedSource.url);

      return feed.items.slice(0, 10).map((item) => ({
        source: feedSource.name,
        title: item.title?.trim() || "Untitled",
        url: item.link || "",
        publishedAt:
          item.isoDate ||
          item.pubDate ||
          new Date().toISOString(),
        excerpt:
          item.contentSnippet
            ?.replace(/\s+/g, " ")
            .trim()
            .slice(0, 600) || "",
      }));
    }),
  );

  for (const result of results) {
    if (result.status === "rejected") {
      console.warn(`Feed failed: ${result.reason?.message || result.reason}`);
    }
  }

  return results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value)
    .filter((article) => article.title && article.url);
}

function parseJsonResponse(text) {
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  if (!parsed.summary || !Array.isArray(parsed.items)) {
    throw new Error("Gemini response did not contain summary and items.");
  }

  return parsed;
}

function createPrompt(articles) {
  return `
You are the technology-news curator for Sibu Stephen's professional portfolio.

Select five meaningful recent technology stories from the provided articles.

Prioritize:
- artificial intelligence
- Drupal and content platforms
- web development
- accessibility
- cloud platforms
- developer tools
- cybersecurity
- digital engineering

Use only the supplied source information.
Do not invent facts, dates, sources, or URLs.
Keep each summary factual and concise.

Return JSON only in this exact structure:

{
  "summary": "A concise overview of this week's technology developments.",
  "items": [
    {
      "title": "Article title",
      "summary": "Two concise sentences explaining the story and why it matters.",
      "source": "Publisher name",
      "url": "Original article URL",
      "publishedAt": "Original publication date",
      "topics": ["AI", "Web development"]
    }
  ]
}

Articles:

${JSON.stringify(articles, null, 2)}
`.trim();
}

async function generateBriefing(articles) {
  const prompt = createPrompt(articles);

  return tracer.startActiveSpan(
    "generate-weekly-tech-news",
    {
      attributes: {
        "gen_ai.system": "google",
        "gen_ai.request.model": model,
        "gen_ai.operation.name": "generate_content",
        "agent.name": "Sibu Tech News Agent",
        "agent.article_count": articles.length,
      },
    },
    async (span) => {
      try {
        const response = await generateWithRetry({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
            responseJsonSchema: {
              type: "object",
              additionalProperties: false,
              required: ["summary", "items"],
              properties: {
                summary: {
                  type: "string",
                },
                items: {
                  type: "array",
                  minItems: 1,
                  maxItems: 5,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: [
                      "title",
                      "summary",
                      "source",
                      "url",
                      "publishedAt",
                      "topics"
                    ],
                    properties: {
                      title: {
                        type: "string",
                      },
                      summary: {
                        type: "string",
                      },
                      source: {
                        type: "string",
                      },
                      url: {
                        type: "string",
                      },
                      publishedAt: {
                        type: "string",
                      },
                      topics: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

        const text = response.text;

        span.setAttribute("gen_ai.response.model", model);
        span.setAttribute("gen_ai.response.has_content", Boolean(text));
        span.setAttribute(
          "gen_ai.usage.input_tokens",
          response.usageMetadata?.promptTokenCount || 0,
        );
        span.setAttribute(
          "gen_ai.usage.output_tokens",
          response.usageMetadata?.candidatesTokenCount || 0,
        );

        span.setStatus({
          code: SpanStatusCode.OK,
        });

        return parseJsonResponse(text);
      } catch (error) {
        span.recordException(error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        });

        throw error;
      } finally {
        span.end();
      }
    },
  );
}

async function main() {
  const articles = await loadArticles();

  if (articles.length === 0) {
    throw new Error("No articles were retrieved from the RSS feeds.");
  }

  console.log(`Retrieved ${articles.length} articles.`);
  console.log(`Generating briefing with ${model}...`);

  const briefing = await generateBriefing(articles);

  const output = {
    generatedAt: new Date().toISOString(),
    agent: {
      name: "Sibu Tech News Agent",
      provider: "Google Gemini",
      model,
      schedule: "Weekly",
      observability: "Langfuse",
    },
    summary: briefing.summary,
    items: briefing.items.slice(0, 5),
  };

  await fs.mkdir("public", {
    recursive: true,
  });

  await fs.writeFile(
    "public/tech-news.json",
    `${JSON.stringify(output, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `Created public/tech-news.json with ${output.items.length} stories.`,
  );
}

let exitCode = 0;

try {
  await main();
} catch (error) {
  exitCode = 1;
  console.error(error);
} finally {
  try {
    await sdk.shutdown();
  } catch (shutdownError) {
    console.error("Telemetry shutdown failed:", shutdownError);
    exitCode = 1;
  }
}

process.exitCode = exitCode;
