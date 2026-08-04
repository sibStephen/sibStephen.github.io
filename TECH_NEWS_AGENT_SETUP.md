# Weekly Tech Intelligence Agent

This project keeps the browser-facing portfolio static. A scheduled GitHub Actions job runs the agent securely on GitHub's server, fetches RSS headlines, asks OpenAI to select and summarize five stories, records the model call in Langfuse, writes `public/tech-news.json`, builds the site, and publishes `dist` to `gh-pages`.

## Security first

The OpenAI and Langfuse secret keys previously pasted into chat must be revoked. Do not put real keys in `.env.example`, React source, `public/`, or any `VITE_` environment variable.

Create replacement credentials, then add them as repository secrets:

```bash
gh secret set OPENAI_API_KEY
gh secret set LANGFUSE_PUBLIC_KEY
gh secret set LANGFUSE_SECRET_KEY
```

Optional model override:

```bash
gh variable set OPENAI_MODEL --body "gpt-4.1-mini"
```

## First run

Commit the project to the default `master` branch, then run:

```bash
gh workflow run update-tech-news.yml
gh run watch
```

After the workflow finishes:

1. Open the Langfuse project and confirm a `weekly-tech-news-curation` generation appears.
2. Open `/tech-news.json` on the website.
3. Confirm the Weekly Technology Intelligence section displays five cards.

## Local test

Copy `.env.example` to `.env`, add newly generated keys only, export them in your shell, then run:

```bash
npm install
npm run update:tech-news
npm run build
npm run preview
```

The scheduled workflow runs Mondays at 14:17 UTC. GitHub schedules can start a little later during periods of runner load.
