import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

/* Keep in sync with the FAQPage JSON-LD in index.html. */
const FAQS = [
  { q: 'Che tipo di conglomerati bituminosi producete?', a: "Produciamo conglomerati di base, binder di collegamento, usura con bitume tal quale o modificato, usura SMA con bitume modificato, usura drenante e materiali CAM." },
  { q: 'Oltre alla fornitura del materiale, realizzate anche la posa?', a: "Sì. Seguiamo il cantiere dall'inizio alla fine: produzione del conglomerato nel nostro impianto, trasporto e stesa con squadre e mezzi specializzati per strade, piazzali, parcheggi e piste ciclabili." },
  { q: 'Quanto materiale riciclato contengono i prodotti ReMade?', a: 'Le otto miscele certificate ReMade contengono dal 16% al 45% di materiale riciclato. Le percentuali sono dichiarate per ciascun prodotto nel certificato 1591/001.' },
  { q: 'Qual è la capacità autorizzata per il recupero del fresato?', a: "L'AUA n. 137/2026 autorizza il recupero R5 di conglomerato bituminoso EER 17 03 02 fino a un quantitativo massimo di 97.860 tonnellate all'anno." },
  { q: 'Quali certificazioni possiede Eco Asfalti?', a: 'Il sistema comprende ISO 9001, ISO 14001, ISO 45001, UNI ISO 37001, ISO 39001, ISO 50001, PAS 24000, UNI/PdR 125, ESG-LABEX e ReMade. L’impresa possiede inoltre attestazione SOA OG 3, classifica II.' },
  { q: 'Eco Asfalti adotta un Modello 231?', a: 'Sì. L’azienda ha adottato un Modello di Organizzazione, Gestione e Controllo ai sensi del D.Lgs. 231/2001, con Codice Etico, Organismo di Vigilanza e disciplina delle segnalazioni whistleblowing.' },
  { q: "Dove si trova l'impianto?", a: "La sede legale e operativa è in Via Alveo Santa Croce 46, 84015 Nocera Superiore, in provincia di Salerno." },
  { q: 'Come posso richiedere informazioni o un preventivo?', a: 'Puoi compilare il modulo nella sezione Contatti oppure scrivere a info@ecoasfalti.it. Il team valuterà la richiesta e le esigenze del cantiere.' },
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
