import Reveal from './Reveal.jsx'

const CERTS = [
  { title: 'ISO 9001:2015', tag: 'Qualità', desc: 'Sistema di gestione per la qualità.', number: 'QMS-020317073-25', validUntil: '27.03.2028' },
  { title: 'ISO 14001:2015', tag: 'Ambiente', desc: 'Sistema di gestione ambientale.', number: 'EMS-020317073-25', validUntil: '27.03.2028' },
  { title: 'ISO 45001:2018', tag: 'Salute e sicurezza', desc: 'Sistema di gestione della salute e sicurezza sul lavoro.', number: 'HMS-020317073-25', validUntil: '27.03.2028' },
  { title: 'UNI ISO 37001:2016', tag: 'Anticorruzione', desc: 'Sistema di gestione per la prevenzione della corruzione.', number: 'ABMS-080117840-25', validUntil: '05.09.2028' },
  { title: 'ISO 39001:2012', tag: 'Sicurezza stradale', desc: 'Sistema di gestione della sicurezza del traffico stradale.', number: 'RTS-080117837-25', validUntil: '03.09.2028' },
  { title: 'ISO 50001:2018', tag: 'Energia', desc: 'Sistema di gestione dell’energia.', number: '0442E2026', validUntil: '20.04.2029' },
  { title: 'PAS 24000:2022', tag: 'Responsabilità sociale', desc: 'Sistema di gestione sociale.', number: 'PAS-020220045-26', validUntil: '18.03.2027' },
  { title: 'UNI/PdR 125:2022', tag: 'Parità di genere', desc: 'Sistema di gestione per la parità di genere nel contesto lavorativo.', number: 'PG 3529', validUntil: '03.09.2028' },
  { title: 'ESG-LABEX', tag: 'Rating AAA/AAA−', desc: 'Score 80 e 13 Obiettivi di Sviluppo Sostenibile raggiunti.', number: 'OMS-020220044-26', validUntil: '18.03.2027' },
  { title: 'ReMade®', tag: 'Contenuto riciclato', desc: 'Conglomerati bituminosi con contenuto riciclato certificato dal 16% al 45%.', number: '1591/001 rev.0', validUntil: '01.04.2029' },
  { title: 'SOA OG 3 · II', tag: 'Lavori pubblici', desc: 'Qualificazione per strade, autostrade, ponti, viadotti e relative opere complementari.', number: '109951/31/00', validUntil: '15.07.2030' },
]

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4" />
      <path d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z" />
    </svg>
  )
}

export default function Certificazioni() {
  return (
    <section className="section certifications-section" id="certificazioni">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Qualità, persone e ambiente</span>
          <h2 className="section-title">Sistema <span className="out">certificato.</span></h2>
          <p className="section-intro">Undici titoli documentano processi, sostenibilità, responsabilità sociale e qualificazione nei lavori pubblici.</p>
        </Reveal>
        <div className="cert-grid">
          {CERTS.map((cert, index) => (
            <Reveal className="cert-card" key={cert.title} delay={(index % 4) * 0.05}>
              <div className="cert-card-top">
                <div className="cert-badge" aria-hidden="true"><ShieldIcon /></div>
                <span className="cert-valid">fino al {cert.validUntil}</span>
              </div>
              <h3>{cert.title}</h3>
              <p className="cert-tag">{cert.tag}</p>
              <p>{cert.desc}</p>
              <p className="cert-number">Certificato {cert.number}</p>
            </Reveal>
          ))}
        </div>
        <p className="data-note">Validità indicate nei documenti ricevuti e soggette alle sorveglianze periodiche previste dai rispettivi organismi.</p>
      </div>
    </section>
  )
}
