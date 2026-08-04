# Langfuse tracing for the ChatGPT Custom GPT action

The portfolio remains a static Vite/GitHub Pages site. Langfuse tracing is implemented in the separate `server/` action backend because the Langfuse secret key must never be shipped to a browser.

## Run locally

1. Copy `.env.example` to `.env` and add newly generated Langfuse credentials.
2. Run `cd server && npm install && npm start`.
3. POST JSON to `http://localhost:8787/portfolio-agent`.
4. Confirm the `portfolio-agent-request` trace appears in Langfuse.

## Connect to the Custom GPT

Deploy `server/` to a Node host (Render, Railway, Fly.io, Azure App Service, etc.), set the four Langfuse environment variables in the host's secret manager, update the server URL in `server/openapi.yaml`, then paste the schema into the GPT's Action configuration.

Langfuse will trace action calls only. ChatGPT's internal model execution and private reasoning are not exposed to Langfuse.

## Security

Never commit `.env` or place `LANGFUSE_SECRET_KEY` in Vite variables. Rotate any secret that has been pasted into chat or committed previously.
