import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Magnetic from './Magnetic.jsx'

const ease = [0.16, 1, 0.3, 1]

/* Each headline line sits in an overflow-hidden mask and slides up into view. */
function MaskLine({ children, delay }) {
  const reduce = useReducedMotion()
  return (
    <span className="line">
      <motion.span
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero-bg" aria-hidden="true"><div className="hero-grid" /></div>
      <motion.div className="hero-glow" aria-hidden="true" style={reduce ? undefined : { y: glowY }} />

      <motion.div className="container hero-inner" style={reduce ? undefined : { y, opacity }}>
        <motion.p className="hero-eyebrow eyebrow" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          Eco Asfalti SRL &middot; dal 1998
        </motion.p>

        <h1 className="hero-title" aria-label="Costruiamo strade che durano">
          <MaskLine delay={0.35}>Costruiamo</MaskLine>
          <MaskLine delay={0.45}>strade che</MaskLine>
          <MaskLine delay={0.55}><em>durano.</em></MaskLine>
        </h1>

        <motion.p className="hero-lead" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.8 }}>
          Conglomerati bituminosi e pavimentazioni stradali. Tecnologia, qualità
          certificata e materiali riciclati — dall'impianto alla stesa finale.
        </motion.p>

        <motion.div className="hero-actions" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.9 }}>
          <Magnetic><a href="#materiali" className="btn btn-primary">Esplora i materiali</a></Magnetic>
          <Magnetic><a href="#contatti" className="btn btn-ghost">Richiedi un preventivo</a></Magnetic>
        </motion.div>
      </motion.div>

      {/* rotating circular badge */}
      <motion.div
        className="hero-badge"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6, ease }}
      >
        <motion.svg viewBox="0 0 200 200" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 16, ease: 'linear', repeat: Infinity }}>
          <defs>
            <path id="circlePath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
          </defs>
          <text className="badge-text">
            <textPath href="#circlePath" startOffset="0">
              ECO ASFALTI SRL · QUALITÀ CERTIFICATA ·
            </textPath>
          </text>
        </motion.svg>
        <span className="hero-badge-core">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </span>
      </motion.div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scorri</span>
        <motion.span animate={reduce ? {} : { y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.span>
      </div>

      <div className="hero-road" aria-hidden="true" />
    </section>
  )
}
