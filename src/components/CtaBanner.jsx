import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <Reveal className="cta-inner">
          <h2>Iniziamo il tuo cantiere</h2>
          <p>Il nostro ufficio tecnico ti guida dalla scelta del materiale fino alla stesa finale.</p>
          <Magnetic strength={0.5}>
            <a href="#contatti" className="btn">Richiedi un preventivo</a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
