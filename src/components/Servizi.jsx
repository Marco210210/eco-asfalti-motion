import Reveal from './Reveal.jsx'

const SERVICES = [
  { num: '01', href: '#produzione', title: 'Produzione', label: 'La nostra attività principale', desc: 'Conglomerati bituminosi e prodotti ecologici CAM. Tutto parte da qui.' },
  { num: '02', href: '#recupero', title: 'Recupero rifiuti', label: 'La materia torna risorsa', desc: 'Recupero del fresato e reimpiego nel ciclo produttivo.' },
  { num: '03', href: '#pavimentazioni', title: 'Pavimentazioni', label: 'A completamento della filiera', desc: 'Esecuzione lavori e manutenzione al servizio delle infrastrutture.' },
]

export default function Servizi() {
  return (
    <section className="chapter-index" id="servizi" aria-label="Le nostre attività, in ordine di priorità">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Tre attività. Una direzione.</span>
        </Reveal>

        <div className="chapter-index-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <a className={`chapter-link${i === 0 ? ' chapter-link-primary' : ''}`} href={s.href}>
                <span className="chapter-link-top"><span>{s.num}</span><span aria-hidden="true">↗</span></span>
                <span className="chapter-link-label">{s.label}</span>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
