import React, { useEffect, useState } from 'react'
import { ArrowUpRight } from '../icons'

export default function TechNews() {
  const [news, setNews] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/tech-news.json?v=${Date.now()}`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then(setNews)
      .catch(() => setError(true))
  }, [])

  return (
    <section id="news" className="section shell tech-news-section" aria-labelledby="tech-news-title">
      <div className="section-heading split">
        <div><p className="eyebrow">04 · Scheduled AI agent</p><h2 id="tech-news-title">Weekly technology intelligence</h2></div>
        <span className="ai-status"><span /> Observed with Langfuse</span>
      </div>

      {error && <p className="news-message">The latest briefing is temporarily unavailable.</p>}
      {!error && !news && <p className="news-message">Loading the latest agent briefing…</p>}

      {news && (
        <>
          <div className="news-agent-strip">
            <div><span>Agent</span><b>{news.agent?.name}</b></div>
            <div><span>Model</span><b>{news.agent?.model}</b></div>
            <div><span>Schedule</span><b>{news.agent?.schedule}</b></div>
            <div><span>Last run</span><b>{news.generatedAt ? new Date(news.generatedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Pending first run'}</b></div>
          </div>
          <p className="news-summary">{news.summary}</p>
          {news.items?.length > 0 ? (
            <div className="news-grid">
              {news.items.map(item => (
                <article className="news-card" key={item.url}>
                  <p className="label">{item.source}</p>
                  <h3><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title} <ArrowUpRight size={16} /></a></h3>
                  <p>{item.summary}</p>
                  <ul aria-label="Article topics">{item.topics?.map(topic => <li key={topic}>{topic}</li>)}</ul>
                </article>
              ))}
            </div>
          ) : <p className="news-message">The workflow is configured. Run it once from GitHub Actions to publish the first briefing.</p>}
        </>
      )}
    </section>
  )
}
