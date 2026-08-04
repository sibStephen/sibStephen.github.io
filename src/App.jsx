import React, { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, Code2, Github, Headphones, Menu, Mic2, Moon, Search, Sun, X } from './icons'
import ProjectCard from './components/ProjectCard'
import TechNews from './components/TechNews'
import { certifications, drupalContributions, education, expertise, projects, socials, talks, writing } from './data/portfolio'

const nav = [['about', 'About'], ['work', 'Work'], ['drupal', 'Drupal'], ['ai', 'AI Profile'], ['news', 'Tech News'], ['writing', 'Writing'], ['credentials', 'Credentials'], ['connect', 'Connect']]

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return projects
    return projects.filter(item => `${item.category} ${item.title} ${item.description}`.toLowerCase().includes(term))
  }, [query])

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <div className="shell nav-wrap">
          <a className="brand" href="#top" aria-label="Sibu Stephen home"><span>&lt;</span>SS<span>/&gt;</span></a>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
            {nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero shell">
          <div className="hero-copy">
            <p className="status"><span /> Available for meaningful digital work</p>
            <p className="eyebrow">Drupal architect · Front-end engineer · Accessibility advocate</p>
            <h1>I build digital experiences that are <em>usable, scalable</em> and ready for what comes next.</h1>
            <p className="intro">I work across Drupal, React, accessibility, design systems and open source—turning complex requirements into clear, component-driven products.</p>
            <div className="actions">
              <a className="button primary" href="#work">Explore my work <ArrowRight size={18} /></a>
              <a className="button ghost" href="https://medium.com/@sibustephen_55060" target="_blank" rel="me noopener noreferrer"><BookOpen size={18} /> Medium</a>
            </div>
          </div>
          <div className="profile-visual">
            <img src="/sibu-profile-v2.jpg" alt="Sibu Stephen" />
            <div className="profile-code" aria-label="Technology profile summary">
              <p>profile.json</p>
              <code>Drupal · React · WCAG · Design systems · Open source</code>
            </div>
          </div>
        </section>

        <section id="about" className="section shell about-section">
          <div className="section-kicker">// About</div>
          <div className="about-grid">
            <h2>Hello 👋</h2>
            <div className="about-copy">
              <p>I am a Drupal developer and digital experience specialist with more than a decade of experience building, maintaining and improving complex web platforms.</p>
              <p>My work spans Drupal architecture, accessible front-end systems, React, custom modules, design systems and performance. I enjoy making complicated requirements feel clear, practical and reusable.</p>
              <p>I also contribute to the Drupal community through maintained projects, patches, documentation, speaking and meetup organization.</p>
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Areas of expertise">
          <div>{[...expertise, ...expertise].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✦</b></span>)}</div>
        </section>

        <section id="work" className="section shell">
          <div className="section-heading split">
            <div><p className="eyebrow">01 · Selected work</p><h2>Projects and platforms</h2></div>
            <label className="search-field"><Search size={17} aria-hidden="true"/><span className="sr-only">Filter projects</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter projects" /></label>
          </div>
          <div className="project-grid">{filteredProjects.map(project => <ProjectCard key={project.url} project={project} />)}</div>
          {filteredProjects.length === 0 && <p className="empty-state">No matching projects. Try another keyword.</p>}
        </section>

        <section id="drupal" className="section shell">
          <div className="section-heading split">
            <div><p className="eyebrow">02 · Open source</p><h2>Drupal contributions</h2></div>
            <a className="text-link" href="https://www.drupal.org/u/sibustephen" target="_blank" rel="me noopener noreferrer">View Drupal.org profile <ArrowUpRight size={17}/></a>
          </div>
          <div className="contribution-grid">
            {drupalContributions.map(item => (
              <a className="contribution-card" href={item.url} target="_blank" rel="noopener noreferrer" key={item.title}>
                <span>{item.metric}</span><h3>{item.title}</h3><p>{item.description}</p><ArrowUpRight size={18}/>
              </a>
            ))}
          </div>
        </section>


        <section id="ai" className="section shell ai-profile-section">
          <div className="section-heading split">
            <div><p className="eyebrow">03 · Agent-ready profile</p><h2>AI profile and machine-readable portfolio</h2></div>
            <span className="ai-status"><span /> Langfuse-ready backend included</span>
          </div>
          <div className="ai-profile-grid">
            <article className="ai-intro-card">
              <p className="label">AI PROFILE</p>
              <h3>A structured identity layer for agents, search tools and assistants.</h3>
              <p>The site keeps the redesigned human-facing portfolio while also exposing machine-readable profile data, an AI catalogue and LLM guidance files.</p>
              <div className="ai-tags"><span>Agent discoverability</span><span>Structured JSON</span><span>LLM context</span><span>Langfuse tracing</span></div>
            </article>
            <div className="ai-resource-list">
              <a href="/.well-known/ai-catalog.json" target="_blank" rel="noopener noreferrer"><div><b>AI Catalog</b><code>/.well-known/ai-catalog.json</code><p>Discoverable catalogue of portfolio capabilities, projects and agent resources.</p></div><ArrowUpRight /></a>
              <a href="/profile.json" target="_blank" rel="noopener noreferrer"><div><b>Profile JSON</b><code>/profile.json</code><p>Structured professional profile for integrations and AI-powered experiences.</p></div><ArrowUpRight /></a>
              <a href="/llms.txt" target="_blank" rel="noopener noreferrer"><div><b>LLM Guide</b><code>/llms.txt</code><p>Concise guidance that helps language models understand and navigate the site.</p></div><ArrowUpRight /></a>
              <a href="/llms-full.txt" target="_blank" rel="noopener noreferrer"><div><b>Full AI Context</b><code>/llms-full.txt</code><p>Expanded context for assistants that need a richer view of the portfolio.</p></div><ArrowUpRight /></a>
            </div>
          </div>
          <div className="agent-observability">
            <div><p className="label">AGENT OBSERVABILITY</p><h3>Langfuse tracing is retained in the server package.</h3></div>
            <p>The <code>server/</code> integration records action requests, sessions, outputs, metadata and errors without exposing the Langfuse secret key in the static React frontend.</p>
            <a className="text-link" href="https://us.cloud.langfuse.com" target="_blank" rel="noopener noreferrer">Open Langfuse <ArrowUpRight size={17}/></a>
          </div>
        </section>

        <TechNews />

        <section id="writing" className="section panel-section">
          <div className="shell">
            <div className="section-heading"><p className="eyebrow">04 · Ideas in public</p><h2>Writing and publication</h2></div>
            <div className="writing-grid">
              {writing.map((item, index) => (
                <a className="writing-card" href={item.url} target="_blank" rel="me noopener noreferrer" key={item.url}>
                  <span className="index">0{index + 1}</span><div><p className="label">{item.label}</p><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="credentials" className="section shell">
          <div className="section-heading"><p className="eyebrow">05 · Learning</p><h2>Education and certifications</h2></div>
          <div className="education-grid">
            {education.map(item => <article className="education-card" key={item.school}><p className="label">{item.years}</p><h3>{item.degree}</h3><p>{item.school}</p></article>)}
          </div>
          <div className="cert-grid">
            {certifications.map(item => (
              <article className="cert-card" key={`${item.issuer}-${item.title}`}>
                <div className="cert-badge" aria-hidden="true">{item.issuer.slice(0, 2).toUpperCase()}</div>
                <div><p className="label">{item.issuer}</p><h3>{item.title}</h3><p>{item.issued}{item.expires ? ` · Expires ${item.expires}` : ''}</p>{item.credential && <small>Credential ID: {item.credential}</small>}{item.skills && <span className="skill-chip">{item.skills}</span>}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="talks" className="section panel-section">
          <div className="shell">
            <div className="section-heading"><p className="eyebrow">06 · Speaking</p><h2>Talks, camps and interviews</h2></div>
            <div className="talk-layout">
              <div className="talk-intro"><Mic2 size={32}/><p>Sharing practical lessons from accessibility, component-driven front ends and the Drupal community.</p></div>
              <div className="talk-list">{talks.map((talk, index) => <a href={talk.url} target="_blank" rel="noopener noreferrer" key={talk.url}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{talk.title}</h3><p>{talk.detail}</p></div><ArrowUpRight size={18}/></a>)}</div>
            </div>
          </div>
        </section>

        <section id="connect" className="section shell">
          <div className="creative-card">
            <div><p className="eyebrow">07 · Connect</p><h2>Find me across the web.</h2><p>Code, design, articles, community work, music and professional updates—all in one place.</p><img className="creative-image" src="/graphic-design.jpg" alt="Creative design work by Sibu Stephen" /></div>
            <div className="creative-links">
              {socials.map(item => <a href={item.url} target="_blank" rel="me noopener noreferrer" key={item.url}><Code2/><span><b>{item.label}</b>{item.detail}</span><ArrowUpRight/></a>)}
              <a href="https://www.amazon.in/Livelihood-Living-Sibu-Stephen/dp/164429432X" target="_blank" rel="author noopener noreferrer"><BookOpen/><span><b>Livelihood of Living</b>Published in 2018</span><ArrowUpRight/></a>
              <a href="https://soundcloud.com/sibu-stephen" target="_blank" rel="me noopener noreferrer"><Headphones/><span><b>SoundCloud</b>Music and mixes</span><ArrowUpRight/></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-wrap"><div><a className="brand" href="#top"><span>&lt;</span>SS<span>/&gt;</span></a><p>Designed and built with React, accessibility and curiosity.</p></div><div className="footer-links"><a href="https://www.linkedin.com/in/sibu-stephen-841b6353/" target="_blank" rel="me noopener noreferrer">LinkedIn</a><a href="https://medium.com/@sibustephen_55060" target="_blank" rel="me noopener noreferrer">Medium</a><a href="https://github.com/sibStephen" target="_blank" rel="me noopener noreferrer">GitHub</a></div></div>
      </footer>
    </>
  )
}
