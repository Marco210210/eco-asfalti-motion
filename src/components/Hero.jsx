import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Magnetic from './Magnetic.jsx'
import HeroFilm from './HeroFilm.jsx'

const ease = [0.16, 1, 0.3, 1]

function MaskLine({ children, delay }) {
  const reduce = useReducedMotion()
  return <span className="line"><motion.span initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.75, ease, delay }}>{children}</motion.span></span>
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -48])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])

  return (
    <section className="hero hero-cinema" id="hero" ref={ref}>
      <div className="container cinema-layout">
        <motion.div className="cinema-copy" style={reduce ? undefined : { y, opacity }}>
          <p className="hero-eyebrow eyebrow">Nocera Superiore · Il nostro cuore è la produzione</p>
          <h1 className="hero-title" aria-label="Produciamo conglomerati bituminosi">
            <MaskLine delay={0.08}>Produciamo</MaskLine>
            <MaskLine delay={0.16}>conglomerati</MaskLine>
            <MaskLine delay={0.24}><em>bituminosi.</em></MaskLine>
          </h1>
          <p className="hero-lead">Miscele per le infrastrutture di oggi. Materie prime secondarie, prodotti CAM e contenuto riciclato certificato per quelle di domani.</p>
        </motion.div>

        <HeroFilm />

        <div className="hero-actions">
          <Magnetic><a href="#produzione" className="btn btn-primary">Scopri la produzione ↗</a></Magnetic>
          <Magnetic><a href="#contatti" className="btn btn-ghost">Richiedi una fornitura</a></Magnetic>
        </div>
        <div className="hero-proof"><span>Prodotti CAM</span><span>ReMade®</span><span>Fino al 45% di riciclato</span></div>
      </div>

      <div className="hero-badge" aria-hidden="true">
        <motion.svg viewBox="0 0 200 200" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 24, ease: 'linear', repeat: Infinity }}>
          <defs><path id="circlePath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" /></defs>
          <text className="badge-text"><textPath href="#circlePath">PRODUZIONE · RECUPERO · NUOVA MATERIA ·</textPath></text>
        </motion.svg>
        <span className="hero-badge-core"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7a8 8 0 0 0-13 0L3 10m0-6v6h6M5 17a8 8 0 0 0 13 0l3-3m0 6v-6h-6" /></svg></span>
      </div>
      <a className="hero-scroll" href="#servizi"><span>Esplora</span><motion.span aria-hidden="true" animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.span></a>
      <div className="hero-material-flow" aria-hidden="true"><span /><span /><span /></div>
    </section>
  )
}
