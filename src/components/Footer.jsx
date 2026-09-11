import { motion, useReducedMotion } from 'framer-motion'

const FOOTER_LINKS = [
  { href: '#produzione', label: 'Produzione' },
  { href: '#recupero', label: 'Recupero rifiuti' },
  { href: '#pavimentazioni', label: 'Pavimentazioni' },
  { href: '#certificazioni', label: 'Certificazioni' },
  { href: '#azienda', label: 'Azienda' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contatti', label: 'Contatti' },
]

export default function Footer() {
  const reduce = useReducedMotion()
  const year = new Date().getFullYear()
  const privacyPage = `${import.meta.env.BASE_URL}privacy-policy.html`
  const analyticsEnabled = Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID?.trim())
  return (
    <footer className="site-footer">
      <div className="footer-marquee" aria-hidden="true">
        <motion.div
          className="marquee-row"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          <span className="footer-mark">ECO ASFALTI · ECO ASFALTI ·</span>
          <span className="footer-mark">ECO ASFALTI · ECO ASFALTI ·</span>
        </motion.div>
      </div>

      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#hero" className="footer-logo-link" aria-label="Eco Asfalti SRL — torna all'inizio">
            <img
              className="footer-logo"
              src={`${import.meta.env.BASE_URL}images/eco-asfalti-logo.png`}
              width="668"
              height="589"
              alt=""
            />
          </a>
          <p>Produzione di conglomerati bituminosi e prodotti ecologici CAM. Nuovo valore alla materia, qualità certificata.</p>
        </div>
        <nav className="footer-nav" aria-label="Navigazione footer">
          {FOOTER_LINKS.map((l) => (<a key={l.href} href={l.href}>{l.label}</a>))}
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {year} Eco Asfalti SRL &middot; P. IVA 06052780654 &middot; REA SA-493642</span>
        <span>
          <a href={privacyPage}>Privacy Policy</a>
          {analyticsEnabled && (
            <><span aria-hidden="true"> &middot; </span><button type="button" className="footer-privacy-button" onClick={() => window.dispatchEvent(new Event('ecoasfalti:open-privacy-settings'))}>Preferenze Analytics</button></>
          )}
          <span aria-hidden="true"> &middot; </span>Tutti i diritti riservati
        </span>
      </div>
    </footer>
  )
}
