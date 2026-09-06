import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

const reel1 = '/reels/fmcg_ad.png'
const reel2 = '/reels/pet_foods_ad.png'
const reel3 = '/reels/product_launch_ugc.png'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScQRiHubMIsVHb4l-xgWrNuTp9enlf0uFqJ-QnaGzYa5PMQDw/formResponse'
const ENTRY_ID = 'entry.2018604987'

// Google Form field entry IDs — extracted from FB_PUBLIC_LOAD_DATA_ (authoritative source)
const PROFILE_ENTRY_IDS = {
  role: 'entry.1976973393',
  adSpend: 'entry.649849349',
  creativesPerMonth: 'entry.1595821606',
  currentMethod: 'entry.522611118',
  painPoint: 'entry.1347220797',
  prismHelp: 'entry.145180785',
  toolSpend: 'entry.1013446723',
  testInterest: 'entry.134247264',
}

type ProfileAnswers = {
  role: string
  adSpend: string
  creativesPerMonth: string
  currentMethod: string[]
  painPoint: string
  prismHelp: string[]
  toolSpend: string
  testInterest: string
}

const EMPTY_PROFILE: ProfileAnswers = {
  role: '', adSpend: '', creativesPerMonth: '', currentMethod: [],
  painPoint: '', prismHelp: [], toolSpend: '', testInterest: '',
}

type Question =
  | { key: keyof ProfileAnswers; type: 'single'; title: string; options: string[] }
  | { key: keyof ProfileAnswers; type: 'multi'; title: string; options: string[] }
  | { key: keyof ProfileAnswers; type: 'text'; title: string; placeholder: string }

const QUESTIONS: Question[] = [
  {
    key: 'role', type: 'single', title: 'What best describes you?',
    options: ['Ecommerce/DTC founder', 'Performance marketer', 'Marketing agency', 'SaaS founder', 'SaaS marketer', 'Creative/designer', 'Other'],
  },
  {
    key: 'adSpend', type: 'single', title: "What's your monthly paid-ad spend?",
    options: ['Not running ads', '<$1K', '$1–5K', '$5–10K', '$10–50K', '$50K+'],
  },
  {
    key: 'creativesPerMonth', type: 'single', title: 'How many new creatives do you produce/test per month?',
    options: ['0–5', '5–10', '10–30', '30–50', '50–100', '100+'],
  },
  {
    key: 'currentMethod', type: 'multi', title: 'How do you currently produce them?',
    options: ['In-house', 'Freelancer', 'Agency', 'UGC creators', 'AI tools', 'Myself'],
  },
  {
    key: 'painPoint', type: 'text', title: "What's the biggest pain in your current creative workflow?",
    placeholder: 'Type your answer…',
  },
  {
    key: 'prismHelp', type: 'multi', title: 'What would you most want Prism to help with?',
    options: ['Generate variations', 'Find hooks/angles', 'Turn winners into new experiments', 'Analyze creative performance', 'Tell me what to test next', 'Manage creative testing', 'Create finished ads'],
  },
  {
    key: 'toolSpend', type: 'single', title: 'What do you currently spend on creative production/tools per month?',
    options: ['$0', '<$100', '$100–500', '$500–1K', '$1–3K', '$3K+'],
  },
  {
    key: 'testInterest', type: 'single', title: 'Would you be interested in testing an early version with us?',
    options: ["Yes — I'd like to test it", "Yes — and I'd be open to giving feedback", 'Just notify me when it launches'],
  },
]

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

function submitToGoogleForm(fields: Record<string, string | string[]>) {
  const iframe = document.createElement('iframe')
  iframe.name = 'prism-ea-frame'
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = GOOGLE_FORM_URL
  form.target = 'prism-ea-frame'
  Object.entries(fields).forEach(([name, value]) => {
    const values = Array.isArray(value) ? value : [value]
    values.forEach((v) => {
      if (!v) return
      const input = document.createElement('input')
      input.name = name
      input.value = v
      form.appendChild(input)
    })
  })
  document.body.appendChild(form)
  form.submit()
  setTimeout(() => { document.body.removeChild(form); document.body.removeChild(iframe) }, 2000)
}

function useEarlyAccess() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'invalid' | 'loading' | 'success'>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const normalized = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) { setState('invalid'); return }
    setState('loading')
    submitToGoogleForm({ [ENTRY_ID]: normalized })
    setState('success')
  }

  return { email, setEmail, state, setState, submit }
}

function ProfileQuiz({ email, onFinish }: { email: string; onFinish: () => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<ProfileAnswers>(EMPTY_PROFILE)
  const question = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1

  const finish = (finalAnswers: ProfileAnswers) => {
    submitToGoogleForm({
      [ENTRY_ID]: email,
      [PROFILE_ENTRY_IDS.role]: finalAnswers.role,
      [PROFILE_ENTRY_IDS.adSpend]: finalAnswers.adSpend,
      [PROFILE_ENTRY_IDS.creativesPerMonth]: finalAnswers.creativesPerMonth,
      [PROFILE_ENTRY_IDS.currentMethod]: finalAnswers.currentMethod,
      [PROFILE_ENTRY_IDS.painPoint]: finalAnswers.painPoint,
      [PROFILE_ENTRY_IDS.prismHelp]: finalAnswers.prismHelp,
      [PROFILE_ENTRY_IDS.toolSpend]: finalAnswers.toolSpend,
      [PROFILE_ENTRY_IDS.testInterest]: finalAnswers.testInterest,
    })
    onFinish()
  }

  const goNext = (updated: ProfileAnswers) => {
    if (isLast) { finish(updated); return }
    setStep((s) => s + 1)
  }

  const selectSingle = (value: string) => {
    const updated = { ...answers, [question.key]: value }
    setAnswers(updated)
    goNext(updated)
  }

  const toggleMulti = (value: string) => {
    const current = answers[question.key] as string[]
    const updated = {
      ...answers,
      [question.key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    }
    setAnswers(updated)
  }

  const setText = (value: string) => {
    setAnswers({ ...answers, [question.key]: value })
  }

  return (
    <div className="quiz">
      <div className="quiz-progress">
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`quiz-dot ${i === step ? 'quiz-dot-active' : ''} ${i < step ? 'quiz-dot-done' : ''}`} />
        ))}
      </div>

      <p className="quiz-title">{question.title}</p>

      {question.type === 'single' && (
        <div className="quiz-options">
          {question.options.map((opt) => (
            <button key={opt} type="button" className="quiz-chip" onClick={() => selectSingle(opt)}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === 'multi' && (
        <>
          <div className="quiz-options">
            {question.options.map((opt) => {
              const selected = (answers[question.key] as string[]).includes(opt)
              return (
                <button
                  key={opt}
                  type="button"
                  className={`quiz-chip ${selected ? 'quiz-chip-selected' : ''}`}
                  onClick={() => toggleMulti(opt)}
                >
                  {selected && <span className="quiz-check">✓</span>}{opt}
                </button>
              )
            })}
          </div>
          <button type="button" className="quiz-continue" onClick={() => goNext(answers)}>
            {isLast ? 'Get early access →' : 'Continue →'}
          </button>
        </>
      )}

      {question.type === 'text' && (
        <>
          <textarea
            className="quiz-textarea"
            placeholder={question.placeholder}
            value={answers[question.key] as string}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
          <button type="button" className="quiz-continue" onClick={() => goNext(answers)}>
            {isLast ? 'Get early access →' : 'Continue →'}
          </button>
        </>
      )}

      <button type="button" className="quiz-skip" onClick={onFinish}>
        Skip this question
      </button>
    </div>
  )
}

function EarlyAccessForm({ id, variant }: { id?: string; variant?: 'hero' | 'section' }) {
  const { email, setEmail, state, setState, submit } = useEarlyAccess()
  const [phase, setPhase] = useState<'quiz' | 'done'>('quiz')

  if (state === 'success' && phase === 'quiz') {
    return (
      <div className={`ea-success ${variant === 'section' ? 'ea-success-section' : ''}`}>
        <p className="ea-success-icon">✦</p>
        <p className="ea-success-title">You're in.</p>
        <p className="ea-success-sub">Help us build this for you — 8 quick questions, skip anytime.</p>
        <ProfileQuiz email={email} onFinish={() => setPhase('done')} />
      </div>
    )
  }

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
            <img src={reel2} alt="" />
            <div className="reel-meta">
              <span className="reel-label">Pet Foods Ad</span>
              <span className="reel-dur">:15</span>
            </div>
            <div className="reel-play">▶</div>
          </div>
          <div className="reel-frame reel-back-right">
            <img src={reel3} alt="" />
            <div className="reel-meta">
              <span className="reel-label">Product Launch Ad</span>
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
