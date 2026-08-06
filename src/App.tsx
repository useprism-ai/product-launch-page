import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import reel1 from './assets/tryserum_ugc_female.png'
import reel2 from './assets/product_launch_ugc.png'
import reel3 from './assets/before_and_after_ugc.png'

function App() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<'idle' | 'invalid' | 'loading' | 'success'>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setFormState('invalid')
      return
    }
    setFormState('loading')
    await new Promise((resolve) => setTimeout(resolve, 900))
    setFormState('success')
    setEmail('')
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <p className="logo">▲ Prism</p>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#team">Team</a></li>
          </ul>
          <a href="#waitlist" className="nav-cta">Get early access</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="grain" />
        </div>

        <div className="hero-inner">
          <p className="pill">AI-powered UGC ad engine</p>
          <h1>
            Stop hiring actors.<br />
            <span>Start generating ads.</span>
          </h1>
          <p className="hero-sub">
            Prism creates scroll-stopping short-form video ads complete with AI voiceover,
            storyboard, and marketing-ready scripts. No cameras. No editing. Just results.
          </p>

          <div id="waitlist" className="waitlist-anchor" />
          <form className="cta-form" onSubmit={handleSubmit} noValidate>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (formState !== 'idle') setFormState('idle')
              }}
              aria-invalid={formState === 'invalid'}
              aria-describedby="cta-status"
            />
            <button type="submit" disabled={formState === 'loading'}>
              {formState === 'loading' ? 'Joining…' : 'Join waitlist →'}
            </button>
          </form>
          <p id="cta-status" className="cta-status" role="status" aria-live="polite">
            {formState === 'invalid' && 'Please enter a valid email address.'}
            {formState === 'success' && "You're in! We'll reach out soon."}
            {formState === 'idle' && 'Free to join · No credit card required'}
          </p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="phone phone-center">
            <img src={reel1} alt="" />
            <div className="phone-overlay">
              <span className="phone-badge">▶ AI Generated</span>
              <p>"Try this serum" · UGC hook</p>
            </div>
          </div>
          <div className="phone phone-left">
            <img src={reel2} alt="" />
            <div className="phone-overlay">
              <span className="phone-badge">▶ AI Avatar</span>
              <p>Product launch</p>
            </div>
          </div>
          <div className="phone phone-right">
            <img src={reel3} alt="" />
            <div className="phone-overlay">
              <span className="phone-badge">▶ AI Voiceover</span>
              <p>Before &amp; after</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF BAR ── */}
      <section className="proof-bar">
        <div className="proof-inner">
          <div className="proof-stat">
            <strong>15×</strong>
            <span>faster ad creation</span>
          </div>
          <div className="proof-divider" />
          <div className="proof-stat">
            <strong>70%</strong>
            <span>lower production cost</span>
          </div>
          <div className="proof-divider" />
          <div className="proof-stat">
            <strong>∞</strong>
            <span>ad variations per brief</span>
          </div>
          <div className="proof-divider" />
          <div className="proof-stat">
            <strong>0</strong>
            <span>actors needed</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features" id="features">
        <div className="section-inner">
          <p className="section-label">What Prism does</p>
          <h2>Your entire ad production pipeline, replaced by AI</h2>

          <div className="feature-grid">
            <article className="feat">
              <div className="feat-icon">🎬</div>
              <h3>AI Storyboard</h3>
              <p>Auto-generate scene-by-scene ad flows optimized for TikTok, Reels, and Shorts from a single product description.</p>
            </article>
            <article className="feat">
              <div className="feat-icon">🎙️</div>
              <h3>Voice Generation</h3>
              <p>Natural voiceovers matched to persona, accent, and brand tone. No recording sessions, no voice actors.</p>
            </article>
            <article className="feat">
              <div className="feat-icon">📝</div>
              <h3>Script Engine</h3>
              <p>AI writes hooks, value props, and CTAs designed for scroll-stopping performance on every platform.</p>
            </article>
            <article className="feat">
              <div className="feat-icon">🔄</div>
              <h3>Infinite Variations</h3>
              <p>Generate dozens of unique ad angles from one brief. A/B test at scale without hiring more creatives.</p>
            </article>
            <article className="feat">
              <div className="feat-icon">📱</div>
              <h3>Platform-Native</h3>
              <p>Every ad is built for the platform it runs on. Vertical, horizontal, square — all aspect ratios covered.</p>
            </article>
            <article className="feat">
              <div className="feat-icon">⚡</div>
              <h3>Launch in Minutes</h3>
              <p>Go from brand brief to ready-to-publish UGC ads in minutes, not weeks. Ship campaigns at the speed of thought.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <div className="section-inner">
          <p className="section-label">How it works</p>
          <h2>From brief to ad in 4 steps</h2>

          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-line" />
              <h3>Describe your product</h3>
              <p>Paste your landing page, describe your audience, set the campaign goal.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-line" />
              <h3>Prism generates ads</h3>
              <p>AI creates multiple ad concepts with scripts, voiceover, and storyboards.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-line" />
              <h3>Pick your winners</h3>
              <p>Review, tweak, and select the best-performing angles for your campaign.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-line" />
              <h3>Publish everywhere</h3>
              <p>Export platform-ready ads and launch across TikTok, Instagram, YouTube.</p>
            </div>
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
                <span>Head of Engineering &amp; Co-Founder</span>
              </div>
            </div>
            <div className="member">
              <div className="avatar">KM</div>
              <div>
                <strong>Komalalakshmi Meghanathan</strong>
                <span>Head of Marketing &amp; Co-Founder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <div className="section-inner">
          <h2>Ready to create ads that convert?</h2>
          <p>Join hundreds of brands waiting to use Prism. Be first in line.</p>
          <a href="#waitlist" className="final-btn">Join the waitlist →</a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Prism · AI-generated UGC ads for modern brands</p>
      </footer>
    </>
  )
}

export default App
