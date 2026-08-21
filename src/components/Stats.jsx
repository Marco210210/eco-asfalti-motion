import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'

const FACILITIES = [
  {
    label: 'Autorizzazione ambientale',
    code: '137/26',
    title: 'AUA integrata',
    desc: "L'AUA n. 137 del 30 giugno 2026 comprende scarichi, emissioni in atmosfera, impatto acustico e recupero dei rifiuti.",
  },
  {
    label: 'Recupero R5 · EER 17 03 02',
    code: '97.860',
    unit: 't/anno',
    title: 'Capacità autorizzata',
    desc: "Quantitativo massimo annuo autorizzato per il recupero di conglomerato bituminoso in procedura semplificata.",
  },
  {
    label: 'Contenuto riciclato certificato',
    code: '45%',
    title: 'Prodotti ReMade',
    desc: 'Le miscele certificate raggiungono fino al 45% di materiale riciclato, con percentuali dichiarate per ciascun prodotto.',
  },
  {
    label: 'Sostenibilità ESG-LABEX',
    code: '13',
    unit: 'SDGs',
    title: 'Rating AAA/AAA−',
    desc: 'Score ESG pari a 80 e tredici Obiettivi di Sviluppo Sostenibile raggiunti secondo la certificazione ESG-LABEX.',
  },
]

function FacilityCard({ facility, delay }) {
  return (
    <Reveal className="facility-card" delay={delay}>
      <div className="facility-card-top">
        <span className="facility-label">{facility.label}</span>
        <span className="facility-dot" aria-hidden="true" />
      </div>
      <div className="facility-code">{facility.code}{facility.unit && <small>{facility.unit}</small>}</div>
      <div className="facility-copy">
        <h3>{facility.title}</h3>
        <p>{facility.desc}</p>
      </div>
    </Reveal>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [-80, 100])

  return (
    <section className="section facility-section" id="autorizzazioni" ref={ref}>
      <motion.div className="facility-orb" aria-hidden="true" style={reduce ? undefined : { y: orbY }} />
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Dati documentati</span>
          <h2 className="section-title">Autorizzati. <span className="out">Misurabili.</span></h2>
          <p className="section-intro">Numeri e titoli ricavati dalle autorizzazioni e dalle certificazioni aziendali aggiornate al 2026.</p>
        </Reveal>
        <div className="facility-grid">
          {FACILITIES.map((facility, i) => (
            <FacilityCard key={facility.title} facility={facility} delay={i * 0.12} />
          ))}
        </div>
        <p className="data-note">Le validità dei titoli restano soggette alle prescrizioni e alle sorveglianze previste dagli enti competenti.</p>
      </div>
    </section>
  )
}
