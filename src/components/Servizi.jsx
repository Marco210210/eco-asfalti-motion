import Reveal from './Reveal.jsx'

const SERVICES = [
  { num: '01', title: 'Impianto di produzione', desc: 'Produzione interna di conglomerati a caldo e riciclati, con controllo qualità costante e forniture puntuali in cantiere.' },
  { num: '02', title: 'Stesa e pavimentazione', desc: "Squadre e mezzi dedicati per la posa di strade, piazzali, parcheggi e piste ciclabili di ogni dimensione." },
  { num: '03', title: 'Manutenzione stradale', desc: 'Fresatura, risanamento di buche e rifacimento del manto per il ripristino della sicurezza stradale.' },
  { num: '04', title: 'Consulenza tecnica', desc: 'Scelta del materiale, computi metrici e sopralluoghi per soluzioni su misura del tuo progetto.' },
]

export default function Servizi() {
  return (
    <section className="section" id="servizi">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Servizi</span>
          <h2 className="section-title">Cosa <span className="out">facciamo</span></h2>
        </Reveal>

        <div className="stack">
          {SERVICES.map((s, i) => (
            <div
              className="stack-card"
              key={s.num}
              style={{ top: `calc(90px + ${i * 18}px)`, zIndex: i + 1 }}
            >
              <div>
                <div className="stack-card-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <span className="sc-icon" aria-hidden="true">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
