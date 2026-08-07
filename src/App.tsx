import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

const reel1 = '/reels/fmcg_ad.png'
const reel2 = '/reels/appartment_tour_ad.png'
const reel3 = '/reels/saas_explain_Ad.png'
const reel4 = '/reels/product_launch_Ad.png'
const reel5 = '/reels/pet_foods_ad.png'
const reel6 = '/reels/tryserum_ugc_female.png'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScQRiHubMIsVHb4l-xgWrNuTp9enlf0uFqJ-QnaGzYa5PMQDw/formResponse'
const ENTRY_ID = 'entry.2018604987'

const FORMATS = [
  'Product Launch', 'Founder Story', 'Problem → Solution', 'Testimonial',
  'Comparison', 'How-To', 'Unboxing', 'Before & After', 'Meme',
  'Product Showcase', 'AI Talent', 'Explainer', 'Social Proof', 'Lifestyle',
]

const INDUSTRIES = [
  'Ecommerce', 'SaaS', 'D2C Brands', 'Shopify Stores', 'Amazon Sellers',
  'Marketing Agencies', 'Restaurants', 'Real Estate', 'Travel', 'Fitness',
  'Education', 'Finance', 'Automotive', 'Pet Brands', 'Fashion',
  'Coffee & F&B', 'Home & Living', 'Mobile Apps',
]

function useEarlyAccess() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'invalid' | 'loading' | 'success'>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const normalized = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) { setState('invalid'); return }
    setState('loading')

    const iframe = document.createElement('iframe')
    iframe.name = 'prism-ea-frame'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = GOOGLE_FORM_URL
    form.target = 'prism-ea-frame'
    const input = document.createElement('input')
    input.name = ENTRY_ID
    input.value = normalized
    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()
    setTimeout(() => { document.body.removeChild(form); document.body.removeChild(iframe) }, 2000)

    setState('success')
    setEmail('')
  }

  return { email, setEmail, state, setState, submit }
}

function EarlyAccessForm({ id, variant }: { id?: string; variant?: 'hero' | 'section' }) {
  const { email, setEmail, state, setState, submit } = useEarlyAccess()

  if (state === 'success') {
    return (
      <div className={`ea-success ${variant === 'section' ? 'ea-success-section' : ''}`}>
        <p className="ea-success-icon">✦</p>
        <p className="ea-success-title">You're in.</p>
        <p className="ea-success-sub">We'll send your invite before the public launch.</p>
      </div>
    )
  }

  return (
    <form className={`ea-form ${variant === 'section' ? 'ea-form-section' : ''}`} id={id} onSubmit={submit} noValidate>
      <div className="ea-row">
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state !== 'idle') setState('idle') }}
          aria-invalid={state === 'invalid'}
        />
        <button type="submit" disabled={state === 'loading'}>
          {state === 'loading' ? 'Reserving…' : 'Get early access'}
        </button>
      </div>
      <p className="ea-hint" role="status" aria-live="polite">
        {state === 'invalid' ? 'Enter a valid work email.' : 'Private beta · No credit card required'}
      </p>
    </form>
  )
}

function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="logo"><img src="/favicon.svg" alt="Prism" className="logo-img" /> Prism</a>
          <ul>
            <li><a href="#capabilities">Capabilities</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#formats">Formats</a></li>
            <li><a href="#team">Team</a></li>
          </ul>
          <a href="#early-access" className="nav-cta">Get early access</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true"><div className="grain" /></div>
        <div className="hero-content">
          <p className="overline">The AI creative engine for performance marketing</p>
          <h1>One product.<br /><span>Infinite ads.</span></h1>
          <p className="hero-sub">
            Upload your product once. Prism produces hundreds of ad creatives — hooks, scripts, storyboards,
            voiceovers, and finished variations — so you can test faster, find winners sooner, and scale what converts.
          </p>
          <EarlyAccessForm variant="hero" />
        </div>

        <div className="hero-reels" aria-hidden="true">
          <div className="reel-frame reel-back-left">
            <img src={reel1} alt="" />
            <div className="reel-meta">
              <span className="reel-label">Coffee Ad</span>
              <span className="reel-dur">:30</span>
            </div>
          </div>
          <div className="reel-frame reel-center">
            <img src={reel5} alt="" />
            <div className="reel-meta">
              <span className="reel-label">Pet Foods Ad</span>
              <span className="reel-dur">:15</span>
            </div>
            <div className="reel-play">▶</div>
          </div>
          <div className="reel-frame reel-back-right">
            <img src={reel6} alt="" />
            <div className="reel-meta">
              <span className="reel-label">Skin Care Ad</span>
              <span className="reel-dur">:45</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNAL STRIP ── */}
      <section className="signal-strip">
        <div className="signal-inner">
          <p><strong>100+</strong> creative variations per brief</p>
          <p><strong>10×</strong> faster than agencies</p>
          <p><strong>Every</strong> format, every platform</p>
          <p><strong>Zero</strong> production overhead</p>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="capabilities" id="capabilities">
        <div className="section-inner">
          <p className="section-label">Capabilities</p>
          <h2>Everything between brief and live ad — automated</h2>
          <div className="cap-grid">
            <article>
              <h3>Hook Engine</h3>
              <p>Prism writes dozens of scroll-stopping openers per concept. Test hooks at the speed your ad account demands.</p>
            </article>
            <article>
              <h3>Script Studio</h3>
              <p>Full ad scripts with value angles, objection handling, and CTAs — structured for performance, not just views.</p>
            </article>
            <article>
              <h3>Storyboard Architect</h3>
              <p>Scene-by-scene visual plans optimized for pacing, retention curves, and platform-specific attention patterns.</p>
            </article>
            <article>
              <h3>Voice Production</h3>
              <p>Natural voiceovers matched to brand tone, persona, and language. Dozens of voices, zero recording sessions.</p>
            </article>
            <article>
              <h3>Creative Multiplier</h3>
              <p>One brief becomes 100+ unique variations. Different angles, tones, formats, and lengths — ready for split testing.</p>
            </article>
            <article>
              <h3>Platform Intelligence</h3>
              <p>Every creative is built for where it runs. Aspect ratios, pacing, and hooks tuned for Meta, TikTok, YouTube, and more.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <div className="section-inner">
          <p className="section-label">How it works</p>
          <h2>From product to performance creative in minutes</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Upload your product</h3>
              <p>Share a URL, description, or brand assets. Prism learns your product, audience, and positioning.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>Prism crafts your creatives</h3>
              <p>Hooks, scripts, storyboards, voiceovers, and finished ad variations — produced in minutes, not weeks.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Select your strongest angles</h3>
              <p>Review creative concepts, refine messaging, and choose the variations that match your campaign goals.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <h3>Launch and iterate</h3>
              <p>Export platform-ready creatives. Test, learn, and produce fresh variations on demand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREATIVE FORMATS ── */}
      <section className="formats" id="formats">
        <div className="section-inner">
          <p className="section-label">Creative formats</p>
          <h2>Every ad format your campaigns need</h2>
          <p className="formats-sub">Not just one type of creative. Prism produces the full spectrum of ad formats that performance teams rely on.</p>
          <div className="format-tags">
            {FORMATS.map((f) => <span key={f} className="format-tag">{f}</span>)}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="industries">
        <div className="section-inner">
          <p className="section-label">Built for every vertical</p>
          <h2>Any product. Any industry. Any market.</h2>
          <div className="industry-grid">
            {INDUSTRIES.map((i) => <span key={i}>{i}</span>)}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="team" id="team">
        <div className="section-inner">
          <p className="section-label">The team</p>
          <h2>Built by operators who understand growth</h2>
          <div className="team-grid">
            <div className="member">
              <div className="avatar">MM</div>
              <div>
                <strong>Manivel Manoharan</strong>
                <span>Head of Engineering & Co-Founder</span>
              </div>
            </div>
            <div className="member">
              <div className="avatar">KM</div>
              <div>
                <strong>Komalalakshmi Meghanathan</strong>
                <span>Head of Marketing & Co-Founder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EARLY ACCESS ── */}
      <section className="early-access" id="early-access">
        <div className="section-inner ea-inner">
          <p className="section-label">Early access</p>
          <h2>Be first to create ads with Prism</h2>
          <p className="ea-copy">
            Join the private beta before public launch. Built for marketers, founders, and agencies who need more creative volume without more headcount.
          </p>
          <EarlyAccessForm variant="section" />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-logo">Prism</p>
          <p>© 2026 Prism · The AI creative engine for performance marketing</p>
        </div>
      </footer>
    </>
  )
}

export default App
