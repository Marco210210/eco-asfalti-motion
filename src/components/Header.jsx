import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { href: '#materiali', label: 'Materiali' },
  { href: '#come-nasce', label: 'La strada' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#certificazioni', label: 'Certificazioni' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)
      setHidden(y > 300 && y > lastY.current && !menuOpen)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && menuOpen) { setMenuOpen(false); toggleRef.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={`site-header${solid ? ' solid' : ''}${hidden ? ' hidden' : ''}`}>
      <div className="container header-inner">
        <a href="#hero" className="brand" aria-label="Eco Asfalti SRL — home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="38" height="38" fill="none">
              <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="#17171b" stroke="#ff5c1a" strokeWidth="2" />
              <path d="M8 30 L20 10 L32 30" stroke="#ff5c1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="20" y1="16" x2="20" y2="19" stroke="#f4f2ee" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="20" y1="22" x2="20" y2="25" stroke="#f4f2ee" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">ECO ASFALTI</span>
            <span className="brand-sub">S.R.L.</span>
          </span>
        </a>

        <nav className={`main-nav${menuOpen ? ' open' : ''}`} id="mainNav" aria-label="Navigazione principale">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#contatti" className="nav-cta" onClick={() => setMenuOpen(false)}>Contatti</a>
        </nav>

        <button
          ref={toggleRef}
          className="nav-toggle"
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          aria-controls="mainNav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
