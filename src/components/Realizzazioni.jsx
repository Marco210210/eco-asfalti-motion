import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

export default function Realizzazioni() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 180, damping: 24 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 180, damping: 24 })
  const onMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - 0.5)
    my.set((event.clientY - rect.top) / rect.height - 0.5)
  }
  return (
    <div className="section reference-section" id="realizzazioni">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Lavori di rilievo</span>
          <h3 className="section-title">Il valore di un<br /><span className="out">grande impegno.</span></h3>
          <p className="section-intro">Appalti strutturati in cui contano la qualità della proposta, l’organizzazione e l’offerta economicamente più vantaggiosa.</p>
        </Reveal>
        <Reveal>
          <motion.article ref={ref} className="anas-project" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0) }} style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}>
            <div className="anas-project-top"><span>Lavoro con ANAS</span><span className="project-status"><i aria-hidden="true" /> In corso</span></div>
            <div className="anas-project-body"><div className="anas-value">20<span>M€</span></div><div><h4>Un lavoro da<br />20 milioni di euro.</h4><p>Un impegno in corso con ANAS, tra i lavori di riferimento che affiancano la nostra attività principale di produzione.</p></div></div>
            <div className="anas-project-bottom"><span>Infrastrutture stradali</span><span>Qualità · Organizzazione · Esecuzione</span></div>
          </motion.article>
        </Reveal>
      </div>
    </div>
  )
}
