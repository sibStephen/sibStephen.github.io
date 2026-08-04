import { NodeSDK } from '@opentelemetry/sdk-node'
import { LangfuseSpanProcessor } from '@langfuse/otel'

export const langfuseSpanProcessor = new LangfuseSpanProcessor({
  environment: process.env.LANGFUSE_TRACING_ENVIRONMENT || 'development',
  mask: ({ data }) => data
    .replace(/sk-lf-[A-Za-z0-9-]+/g, '[REDACTED_LANGFUSE_SECRET]')
    .replace(/sk-[A-Za-z0-9_-]{20,}/g, '[REDACTED_API_KEY]')
})

export const telemetrySdk = new NodeSDK({
  spanProcessors: [langfuseSpanProcessor]
})

telemetrySdk.start()
