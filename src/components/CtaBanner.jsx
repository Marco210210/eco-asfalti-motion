import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <Reveal className="cta-inner">
          <h2>La tua prossima fornitura parte da qui.</h2>
          <p>Conglomerati bituminosi e prodotti CAM: troviamo la miscela adatta al tuo progetto.</p>
          <Magnetic strength={0.5}>
            <a href="#contatti" className="btn">Parliamo della tua fornitura</a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
