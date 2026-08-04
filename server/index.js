import 'dotenv/config'
import './instrumentation.js'
import cors from 'cors'
import express from 'express'
import { startActiveObservation, updateActiveTrace } from '@langfuse/tracing'
import { langfuseSpanProcessor, telemetrySdk } from './instrumentation.js'

const app = express()
app.use(cors({ origin: ['https://sibustephen.me', 'https://www.sibustephen.me'] }))
app.use(express.json({ limit: '64kb' }))

app.get('/health', (_req, res) => res.json({ ok: true, tracing: 'langfuse' }))

app.post('/portfolio-agent', async (req, res) => {
  const question = String(req.body?.question || '').trim()
  const sessionId = String(req.body?.sessionId || crypto.randomUUID())

  if (!question) return res.status(400).json({ error: 'question is required' })

  try {
    const result = await startActiveObservation('custom-gpt-action', async span => {
      updateActiveTrace({
        name: 'portfolio-agent-request',
        sessionId,
        userId: 'chatgpt-custom-gpt',
        tags: ['custom-gpt', 'portfolio'],
        metadata: { source: 'chatgpt-action' }
      })

      span.update({ input: { question } })

      // Replace this with your own retrieval/agent logic. The endpoint is intentionally
      // server-side so Langfuse credentials never reach the GitHub Pages frontend.
      const answer = {
        answer: 'The action endpoint is connected and traced. Add your portfolio retrieval or model call here.',
        source: 'sibustephen.me'
      }

      span.update({ output: answer })
      return answer
    })

    await langfuseSpanProcessor.forceFlush()
    res.json(result)
  } catch (error) {
    console.error(error)
    await langfuseSpanProcessor.forceFlush()
    res.status(500).json({ error: 'Agent action failed' })
  }
})

const server = app.listen(process.env.PORT || 8787, () => {
  console.log(`Agent action listening on ${process.env.PORT || 8787}`)
})

async function shutdown() {
  server.close()
  await langfuseSpanProcessor.forceFlush()
  await telemetrySdk.shutdown()
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
