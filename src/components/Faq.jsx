import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

/* Keep in sync with the FAQPage JSON-LD in index.html. */
const FAQS = [
  { q: 'Che tipo di conglomerati bituminosi producete?', a: "Produciamo l'intera gamma per ogni strato della pavimentazione: conglomerato di base, binder di collegamento, strato d'usura, usura drenante fonoassorbente, usura drenante colorata e conglomerato riciclato (RAP)." },
  { q: 'Oltre alla fornitura del materiale, realizzate anche la posa?', a: "Sì. Seguiamo il cantiere dall'inizio alla fine: produzione del conglomerato nel nostro impianto, trasporto e stesa con squadre e mezzi specializzati per strade, piazzali, parcheggi e piste ciclabili." },
  { q: 'Utilizzate materiali riciclati?', a: "Sì. Recuperiamo e riutilizziamo il fresato d'asfalto (RAP) nei nostri conglomerati, riducendo l'estrazione di nuove materie prime e l'impatto ambientale, mantenendo le stesse prestazioni." },
  { q: 'Quali certificazioni possiede Eco Asfalti SRL?', a: 'Operiamo con sistema di gestione certificato ISO 9001 (qualità), ISO 14001 (ambiente) e ISO 45001 (sicurezza sul lavoro). I nostri conglomerati sono a marcatura CE secondo la norma EN 13108.' },
  { q: 'In quali zone operate?', a: 'Operiamo con il nostro impianto e le nostre squadre sul territorio regionale e nelle aree limitrofe. Per verificare la copertura del tuo cantiere contattaci: valutiamo ogni richiesta con un sopralluogo dedicato.' },
  { q: 'Come posso richiedere un preventivo?', a: 'Puoi compilare il modulo nella sezione Contatti oppure chiamarci: il nostro ufficio tecnico ti ricontatta per un sopralluogo e un preventivo su misura, senza impegno.' },
]

export default function Faq() {
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
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
