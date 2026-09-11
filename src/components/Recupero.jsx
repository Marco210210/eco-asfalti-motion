import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'

const STEPS = [
  { title: 'Recuperiamo', text: 'Il fresato delle pavimentazioni entra nel nostro impianto autorizzato.' },
  { title: 'Valorizziamo', text: 'Il materiale recuperato diventa una risorsa per nuove miscele.' },
  { title: 'Reimpieghiamo', text: 'Le materie prime secondarie tornano nella produzione di conglomerati.' },
]

export default function Recupero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-70, 70])
  return (
    <section className="section recovery-section" id="recupero" ref={ref} aria-labelledby="recupero-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">02 / Recupero rifiuti</span>
          <h2 className="section-title" id="recupero-title">Una nuova vita.<br /><span className="out">La stessa materia.</span></h2>
          <p className="section-intro">Il recupero alimenta la nostra produzione. Trasformiamo il fresato stradale in una risorsa, riducendo il ricorso a nuove materie prime.</p>
        </Reveal>
        <div className="recovery-grid">
          <Reveal className="recovery-visual">
            <img src={`${import.meta.env.BASE_URL}images/impianto-02.webp`} alt="Vista aerea reale dell’impianto Eco Asfalti e delle aree di deposito" width="2200" height="1238" loading="lazy" />
            <div className="circular-emblem" aria-hidden="true">
              <motion.svg viewBox="0 0 240 240" style={reduce ? undefined : { rotate }}><circle cx="120" cy="120" r="108" /><path d="M120 12a108 108 0 0 1 108 108M120 228A108 108 0 0 1 12 120" /><path d="m214 104 14 16 10-20M26 136l-14-16-10 20" /></motion.svg>
              <span>Da materia<br />a <strong>materia.</strong></span>
            </div>
          </Reveal>
          <div className="recovery-steps">
            {STEPS.map((step, index) => <Reveal className="recovery-step" key={step.title} delay={index * 0.1}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></Reveal>)}
            <Reveal className="recovery-capacity"><span>Capacità di recupero autorizzata</span><strong>97.860 <small>t/anno</small></strong><p>Fresato in ingresso: EER (CER) 17 03 02, tipologia 7.6. Recupero nel rispetto dell’AUA n. 137/2026.</p><a href="#contatti" className="text-link">Organizza un conferimento <span aria-hidden="true">↗</span></a></Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
