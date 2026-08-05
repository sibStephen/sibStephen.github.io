# Gemini + Langfuse weekly tech-news agent

## Install or convert dependencies

For this ZIP, run:

```bash
npm install
```

To convert an older OpenAI-based copy manually, run:

```bash
npm uninstall openai @langfuse/openai
npm install @google/genai @langfuse/otel @opentelemetry/sdk-node @opentelemetry/api rss-parser
```

## Create and connect a Gemini API key

Create a key in Google AI Studio. Store it as a GitHub environment secret.
Never put a real key in `.env.example`, `src`, `public`, or any committed file.

For local testing:

```bash
cp .env.example .env
```

Edit `.env`, then load it and run the agent:

```bash
set -a
source .env
set +a
npm run update:tech-news
```

## GitHub environment secrets

Repository Settings -> Environments -> github-pages -> Environment secrets:

- `GEMINI_API_KEY`
- `LANGFUSE_PUBLIC_KEY`
- `LANGFUSE_SECRET_KEY`
- `LANGFUSE_BASE_URL` = `https://us.cloud.langfuse.com`

Optional environment variable:

- `GEMINI_MODEL` = `gemini-3.5-flash`

The workflow declares `environment: github-pages`, allowing it to read these
secrets.

## Run manually

Repository -> Actions -> Update weekly technology news -> Run workflow.

The workflow fetches RSS feeds, asks Gemini to curate five stories, sends
OpenTelemetry spans to Langfuse, updates `public/tech-news.json`, builds the
Vite site, and publishes `dist` to `gh-pages`.
