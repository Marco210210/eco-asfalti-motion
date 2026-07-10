import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const PROJECTS = [
  { media: 'pm-1', cat: 'Viabilità urbana', title: 'Rifacimento arterie comunali', desc: '12.000 m² di manto rinnovato con usura drenante fonoassorbente.' },
  { media: 'pm-2', cat: 'Infrastrutture', title: 'Piazzale logistico industriale', desc: "Pavimentazione ad alta portanza per traffico pesante e mezzi d'opera." },
  { media: 'pm-3', cat: 'Mobilità dolce', title: 'Rete di piste ciclabili', desc: 'Percorsi ciclopedonali in conglomerato drenante colorato.' },
]

function TiltCard({ p, delay }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 })

  const onMove = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { mx.set(0); my.set(0) }

  return (
    <Reveal delay={delay}>
      <motion.article
        ref={ref}
        className="project-card"
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      >
        <div className="project-media">
          <div className={`project-media-inner ${p.media}`} aria-hidden="true" />
        </div>
        <div className="project-info">
          <span className="project-cat">{p.cat}</span>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Realizzazioni() {
  return (
    <section className="section" id="realizzazioni">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Realizzazioni</span>
          <h2 className="section-title">Cantieri <span className="out">di riferimento</span></h2>
        </Reveal>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <TiltCard key={p.title} p={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
