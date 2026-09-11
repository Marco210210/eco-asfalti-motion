import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

/* Keep the FAQPage JSON-LD in index.html aligned with this data. */
import FAQS from '../data/faqs.json'

export default function Faq() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal className="section-head" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>FAQ</span>
          <h2 className="section-title">Domande frequenti</h2>
        </Reveal>

        <Reveal className="faq-list" delay={0.05}>
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div className="faq-item" key={i}>
                <button className="faq-q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true"></span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="faq-a-inner">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
