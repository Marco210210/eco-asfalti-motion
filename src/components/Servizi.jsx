import Reveal from './Reveal.jsx'

const SERVICES = [
  { num: '01', title: 'Produzione di conglomerati', desc: 'Produzione interna di conglomerato bituminoso, incluse miscele ReMade con contenuto riciclato certificato fino al 45%.' },
  { num: '02', title: 'Recupero del fresato', desc: "Recupero R5 del conglomerato bituminoso EER 17 03 02 e reimpiego del materiale nel ciclo produttivo, nel rispetto dell'AUA vigente." },
  { num: '03', title: 'Stesa e manutenzione', desc: 'Fresatura, ripristino e manutenzione di strade, piazzali e pavimentazioni con squadre e mezzi dedicati.' },
  { num: '04', title: 'Noleggio mezzi meccanici', desc: 'Noleggio di mezzi meccanici per lavorazioni stradali e attività di cantiere.' },
  { num: '05', title: 'Supporto tecnico', desc: 'Analisi delle esigenze, scelta della miscela e sopralluoghi per definire la soluzione più adatta al progetto.' },
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
