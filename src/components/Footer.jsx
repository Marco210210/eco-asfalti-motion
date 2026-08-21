import { motion } from 'framer-motion'

const FOOTER_LINKS = [
  { href: '#azienda', label: 'Azienda' },
  { href: '#materiali', label: 'Materiali' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#certificazioni', label: 'Certificazioni' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contatti', label: 'Contatti' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const privacyPage = `${import.meta.env.BASE_URL}privacy-policy.html`
  const analyticsEnabled = Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID?.trim())
  return (
    <footer className="site-footer">
      <div className="footer-marquee" aria-hidden="true">
        <motion.div
          className="marquee-row"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          <span className="footer-mark">ECO ASFALTI · ECO ASFALTI ·</span>
          <span className="footer-mark">ECO ASFALTI · ECO ASFALTI ·</span>
        </motion.div>
      </div>

      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-name">ECO ASFALTI <span className="accent">S.R.L.</span></span>
          <p>Conglomerati bituminosi e pavimentazioni stradali. Qualità certificata, impegno sostenibile.</p>
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
