import Reveal from './Reveal.jsx'

/* Also used by the build to generate FAQPage structured data. */
import FAQS from '../data/faqs.json'

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal className="section-head" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>FAQ</span>
          <h2 className="section-title">Domande frequenti</h2>
        </Reveal>

        <Reveal className="faq-list" delay={0.05}>
          {FAQS.map((item, i) => (
              <details className="faq-item" key={item.q} name="eco-faq" open={i === 0}>
                <summary className="faq-q" id={`faq-q-${i}`}>
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true"></span>
                </summary>
                    <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                      <p className="faq-a-inner">{item.a}</p>
                    </div>
              </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
