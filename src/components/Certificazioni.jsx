import Reveal from './Reveal.jsx'

const CERTS = [
  { title: 'ISO 9001', tag: 'Qualità', desc: 'Processi controllati e tracciabili per una costanza qualitativa in ogni fornitura e cantiere.', icon: (<><path d="M9 12l2 2 4-4" /><path d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z" /></>) },
  { title: 'ISO 14001', tag: 'Ambiente', desc: 'Riduzione degli impatti, recupero del fresato e gestione responsabile delle risorse.', icon: <path d="M12 3c4 3 5 7 3 11-1 3-4 5-3 7M12 3c-4 3-5 7-3 11 1 3 4 5 3 7M4 12h16" /> },
  { title: 'ISO 45001', tag: 'Sicurezza', desc: 'Tutela degli operatori con procedure di sicurezza rigorose in impianto e in cantiere.', icon: <path d="M12 2a5 5 0 0 1 5 5c0 2-1 3-1 5H8c0-2-1-3-1-5a5 5 0 0 1 5-5ZM9 17h6M9 20h6" /> },
  { title: 'Marcatura CE', tag: 'EN 13108', desc: 'Conglomerati conformi agli standard europei, con marcatura CE e prove documentate.', icon: <path d="M9 7a5 5 0 1 0 0 10M17 7a5 5 0 1 0 0 10" /> },
]

export default function Certificazioni() {
  return (
    <section className="section" id="certificazioni">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Qualità &amp; Ambiente</span>
          <h2 className="section-title">Certificazioni</h2>
        </Reveal>
        <div className="cert-grid">
          {CERTS.map((c, i) => (
            <Reveal className="cert-card" key={c.title} delay={i * 0.07}>
              <div className="cert-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
              </div>
              <h3>{c.title}</h3>
              <p className="cert-tag">{c.tag}</p>
              <p>{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
