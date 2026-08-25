import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { href: '#azienda', label: 'Azienda' },
  { href: '#materiali', label: 'Materiali' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#certificazioni', label: 'Certificazioni' },
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  const lastY = useRef(0)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const keepVisible = window.matchMedia('(max-width: 1024px), (hover: none) and (pointer: coarse)').matches
      if (keepVisible) {
        setSolid(false)
        setHidden(false)
      } else {
        setSolid(y > 40)
        setHidden(y > 300 && y > lastY.current && !menuOpen)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    try {
      localStorage.setItem('ecoasfalti-theme', theme)
    } catch (_) {
      // The selected theme still applies for the current page when storage is unavailable.
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4faf7' : '#0c0c0e')
  }, [theme])

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
          <img
            className="brand-logo"
            src={`${import.meta.env.BASE_URL}images/eco-asfalti-logo.png`}
            width="668"
            height="589"
            alt=""
          />
        </a>

        <nav className={`main-nav${menuOpen ? ' open' : ''}`} id="mainNav" aria-label="Navigazione principale">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#contatti" className="nav-cta" onClick={() => setMenuOpen(false)}>Contatti</a>
        </nav>

        <div className="header-controls">
          <button
            type="button"
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'Attiva il tema chiaro' : 'Attiva il tema scuro'}
            title={theme === 'dark' ? 'Tema chiaro' : 'Tema scuro'}
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
              </svg>
            )}
          </button>

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
      </div>
    </header>
  )
}
