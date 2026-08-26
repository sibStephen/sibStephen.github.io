import React, { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, Code2, Github, Headphones, Menu, Mic2, Moon, Search, Sun, X } from './icons'
import ProjectCard from './components/ProjectCard'
import TechNews from './components/TechNews'
import DeskIllustration from './components/DeskIllustration'
import PhotoLightbox from './components/PhotoLightbox'
import { caseStudies, certifications, drupalContributions, education, expertise, projects, socials, talks, writing } from './data/portfolio'

const nav = [['about', 'About'], ['work', 'Work'], ['drupal', 'Drupal'], ['case-studies', 'Case Studies'], ['ai', 'AI Profile'], ['news', 'Tech News'], ['writing', 'Writing'], ['credentials', 'Credentials'], ['accessibility', 'Accessibility'], ['connect', 'Connect']]
const quickPrompts = [
  'Who is Sibu Stephen?',
  'What does he do?',
  'What projects has he worked on?',
  'Where is he based?',
  'What is his Drupal background?'
]

const galleryImages = [
  { src: '/sibu.jpeg', alt: 'Sibu Stephen', caption: 'Sibu Stephen' },
  { src: '/sibu-profile1.jpg', alt: 'Abstract chalk-drawn personal mark', caption: 'Personal mark' },
  { src: '/sibu-profile2.jpg', alt: '"SIBU" name graphic with falling leaves', caption: 'Name mark' },
  { src: '/sibu-profile3.jpg', alt: 'Lyrics graphic titled "My Heart, A Radio"', caption: 'My Heart, A Radio — a poem' },
  { src: '/sibu-profile4.jpg', alt: 'Abstract geometric signature mark', caption: 'Signature mark' },
  { src: '/sibu-profile5.jpg', alt: 'Microsoft Student Associates certificate', caption: 'Microsoft Student Associates' },
]

const profileSummary = 'Sibu Stephen is a Drupal architect, front-end engineer, accessibility advocate, writer, community contributor and digital experience professional who blends technical depth with user-centered design.'

function buildProfileAnswer(question) {
  const q = question.toLowerCase()

  if (/(who|about|profile|introduction|introduce|biography|bio)/.test(q)) {
    return `${profileSummary} He works across Drupal architecture, React, design systems, accessibility, performance, open-source contribution, mentoring and public-facing technical communication.`
  }

  if (/(drupal|architect|developer|role|job|work|what does he do|what does sibu do)/.test(q)) {
    return 'Sibu Stephen is a Drupal architect and front-end engineer whose work includes Drupal architecture, accessible product design, component-driven front ends, performance-focused development, open-source contribution, and helping teams turn complex requirements into usable digital experiences.'
  }

  if (/(react|front[- ]end|accessibility|wcag|design systems|open source|ui|ux|product)/.test(q)) {
    return 'He specializes in Drupal, React, accessibility, WCAG-conscious design, design systems, Storybook, component-driven UI, open-source development and better product experiences for real users.'
  }

  if (/(education|degree|masters|school|computer science|study|background)/.test(q)) {
    return 'Sibu Stephen studied computer science at Symbiosis Institute of Computer Studies and Research, where he completed his Master of Science, and earlier earned a Bachelor in Computer Application from Wadia College, Pune University.'
  }

  if (/(project|intent ui|scie|highcharts|marvel|portfolio|what has he done|work history)/.test(q)) {
    return 'He has worked on projects such as Intent UI, the SCIE Drupal module, Highcharts visualisation work, a Marvel prototype, public GitHub experiments, and Drupal community-maintained initiatives. His portfolio also reflects years of digital platform and front-end work.'
  }

  if (/(talk|conference|speaking|youtube|interview|meetup|community|opensource|drupal community|mentoring)/.test(q)) {
    return 'He is active in the Drupal community through contributions, talks, meetups, public learning, and mentoring. He has spoken at DrupalCamp Colorado, Drupal Ottawa, Stanford WebCamp, DDI Camp and A11y Talks, and he is known for helping younger developers engage with Drupal and web technology.'
  }

  if (/(book|livelihood|publish|writing|medium|article|dzone|author)/.test(q)) {
    return 'He writes on Medium and DZone and published the book Livelihood of Living in 2018. His work extends beyond engineering into storytelling, ideas, and practical perspectives on life and technology.'
  }

  if (/(music|soundcloud|hobby|apart from work|outside work|personal life|what else|life)/.test(q)) {
    return 'Outside professional work, Sibu Stephen is also connected to creative and cultural interests. His public profile includes music via SoundCloud, writing, learning, design thinking, and community engagement beyond just software engineering.'
  }

  if (/(github|linkedin|medium|behance|drupal.org|soundcloud|dzone|social|connect|contact)/.test(q)) {
    return 'You can follow Sibu Stephen on GitHub, Drupal.org, Medium, DZone, Behance, LinkedIn and SoundCloud. His portfolio also includes structured profile JSON and LLM-friendly resources for machines and assistants.'
  }

  if (/(where|based|location|live|lives|reside|country|india|pune|edmonton|home)/.test(q)) {
    return 'Sibu Stephen has roots in Pune, India, where he studied at Wadia College and Pune University and stayed active in the local Drupal Pune community. He is currently based in Edmonton, Canada, where he continues his professional work and has helped organize Drupal Meetup Edmonton events. So while Pune shaped his education and early community involvement, Edmonton is where he lives and works today.'
  }

  if (/(help|ask|can you|what can you answer|summary)/.test(q)) {
    return 'I can answer questions about Sibu Stephen’s work, background, education, Drupal expertise, React and accessibility experience, projects, community involvement, talks, writing, music, and overall professional identity.'
  }

  return 'Sibu Stephen is a Drupal architect, front-end engineer and accessibility-focused digital professional with a strong background in open-source work, design systems, community contribution, writing, and product-minded implementation. He is known for combining technical depth with practical, user-centered digital experiences.'
}

async function fetchPublicWebContext(question) {
  const searchQuery = `Sibu Stephen ${question}`
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json&no_redirect=1&no_html=1&skip_disambig=1`

  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const data = await response.json()
    const abstract = data?.AbstractText?.trim()
    const source = data?.AbstractSource?.trim()
    const related = data?.RelatedTopics?.find(topic => typeof topic === 'object' && topic?.Text)?.Text
    const snippet = abstract || related

    if (!snippet) return null

    return {
      snippet: snippet.replace(/\s+/g, ' ').trim(),
      source: source || 'Public web'
    }
  } catch (error) {
    return null
  }
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I can answer questions about Sibu Stephen, including his work, background, Drupal expertise, accessibility focus, projects, writing, music, community contributions, and where he is based.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return projects
    return projects.filter(item => `${item.category} ${item.title} ${item.description}`.toLowerCase().includes(term))
  }, [query])

  const askQuestion = async (rawQuestion) => {
    const trimmed = rawQuestion.trim()
    if (!trimmed || loading) return

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setLoading(true)

    const profileAnswer = buildProfileAnswer(trimmed)
    const publicContext = await fetchPublicWebContext(trimmed)

    const finalText = publicContext
      ? `${profileAnswer}\n\nPublic-source context: ${publicContext.snippet} (${publicContext.source})`
      : profileAnswer

    setMessages(prev => [...prev, { role: 'assistant', text: finalText }])
    setLoading(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await askQuestion(input)
  }

  const handleQuickPrompt = async (prompt) => {
    await askQuestion(prompt)
  }

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
            <div className="desk-scene">
              <DeskIllustration />
              <button
                type="button"
                className="profile-photo-pin"
                onClick={() => setGalleryIndex(0)}
                aria-label={`Open photo gallery, ${galleryImages.length} photos`}
              >
                <div className="photo-stack">
                  <div className="photo-card photo-card-3"><img src="/sibu-profile3.jpg" alt="" /></div>
                  <div className="photo-card photo-card-2"><img src="/sibu-profile1.jpg" alt="" /></div>
                  <div className="photo-card photo-card-1 profile-photo-sway">
                    <span className="photo-tape" aria-hidden="true" />
                    <img src="/sibu.jpeg" alt="" />
                  </div>
                </div>
                <span className="photo-stack-badge">+{galleryImages.length - 1}</span>
              </button>
            </div>
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


        <section id="case-studies" className="section shell case-studies-section">
          <div className="section-heading split">
            <div><p className="eyebrow">Case studies</p><h2>Situation, task, action, result</h2></div>
          </div>
          <div className="case-study-grid">
            {caseStudies.map(item => (
              <article className="case-study-card" key={item.title}>
                <h3>{item.title}</h3>
                <dl>
                  <div><dt>Situation</dt><dd>{item.situation}</dd></div>
                  <div><dt>Task</dt><dd>{item.task}</dd></div>
                  <div><dt>Action</dt><dd>{item.action}</dd></div>
                  <div><dt>Result</dt><dd>{item.result}</dd></div>
                </dl>
                <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer">View source <ArrowUpRight size={17}/></a>
              </article>
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

        <section id="accessibility" className="section shell accessibility-section">
          <div className="section-heading"><p className="eyebrow">Accessibility</p><h2>Accessibility statement</h2></div>
          <div className="accessibility-grid">
            <div className="accessibility-copy">
              <p>This site is designed and built with WCAG 2.2 Level AA as the target standard, in line with the accessibility expectations set out in government digital service standards.</p>
              <p>Accessibility isn't an add-on here—it's part of how I work day to day as a Drupal and front-end accessibility advocate, and this site is built to the same standard I hold client and community projects to.</p>
              <p>If you use assistive technology and find something on this site that doesn't work as expected, I want to know about it. Please get in touch via <a href="https://www.linkedin.com/in/sibu-stephen-841b6353/" target="_blank" rel="me noopener noreferrer">LinkedIn</a> and I'll address it.</p>
            </div>
            <ul className="accessibility-checklist">
              <li>Semantic landmarks and a "skip to main content" link on every page</li>
              <li>Full keyboard operability, including the navigation menu and chat widget</li>
              <li>Visible focus states and descriptive <code>aria-label</code>s on interactive controls</li>
              <li>Color contrast checked in both the light and dark themes</li>
              <li>Text alternatives provided for meaningful images and icons</li>
              <li>Content structured with proper heading order for screen reader navigation</li>
            </ul>
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

      <div className="chatbot-floating">
        <div className={`chatbot-widget ${chatOpen ? 'open' : 'collapsed'}`} aria-live="polite">
          <button className="chatbot-toggle" type="button" onClick={() => setChatOpen(!chatOpen)} aria-expanded={chatOpen} aria-label={chatOpen ? 'Close chat' : 'Open chat'}>
            <span>{chatOpen ? '✕' : '💬'}</span>
          </button>

          {chatOpen && (
            <div className="chatbot-panel">
              <div className="chatbot-header">
                <div>
                  <p className="chatbot-badge">Sibu AI</p>
                  <h3>Portfolio assistant</h3>
                </div>
              </div>

              <div className="quick-prompts" aria-label="Suggested questions">
                {quickPrompts.map(prompt => (
                  <button key={prompt} type="button" onClick={() => handleQuickPrompt(prompt)}>{prompt}</button>
                ))}
              </div>

              <div className="chatbot-messages">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`chatbot-message ${message.role}`}>
                    <span className="chatbot-label">{message.role === 'assistant' ? 'Sibu Bot' : 'You'}</span>
                    <p>{message.text}</p>
                  </div>
                ))}
                {loading && (
                  <div className="chatbot-message assistant">
                    <span className="chatbot-label">Sibu Bot</span>
                    <p>Checking the profile and public references...</p>
                  </div>
                )}
              </div>

              <form className="chatbot-form" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="chatbot-input">Ask about Sibu Stephen</label>
                <input
                  id="chatbot-input"
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  placeholder="Ask about Drupal, React, projects, books, or Sibu’s background..."
                />
                <button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Ask'}</button>
              </form>
            </div>
          )}
        </div>
      </div>

      <footer className="site-footer">
        <div className="shell footer-wrap"><div><a className="brand" href="#top"><span>&lt;</span>SS<span>/&gt;</span></a><p>Designed and built with React, accessibility and curiosity.</p></div><div className="footer-links"><a href="https://www.linkedin.com/in/sibu-stephen-841b6353/" target="_blank" rel="me noopener noreferrer">LinkedIn</a><a href="https://medium.com/@sibustephen_55060" target="_blank" rel="me noopener noreferrer">Medium</a><a href="https://github.com/sibStephen" target="_blank" rel="me noopener noreferrer">GitHub</a></div></div>
      </footer>

      {galleryIndex !== null && (
        <PhotoLightbox
          images={galleryImages}
          index={galleryIndex}
          onClose={() => setGalleryIndex(null)}
          onIndexChange={setGalleryIndex}
        />
      )}
    </>
  )
}
