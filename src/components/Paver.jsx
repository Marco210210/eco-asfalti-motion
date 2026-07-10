import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'

const STEPS = [
  { t: 0.0, label: 'Stesa del conglomerato' },
  { t: 0.4, label: 'Compattazione' },
  { t: 0.75, label: 'Finitura' },
]

function Roller() {
  return (
    <svg viewBox="0 0 120 96" fill="none">
      {/* body */}
      <rect x="30" y="16" width="60" height="34" rx="6" fill="#ff5c1a" />
      <rect x="40" y="8" width="26" height="16" rx="4" fill="#17171b" stroke="#ff5c1a" strokeWidth="2" />
      {/* drum */}
      <circle cx="34" cy="66" r="22" fill="#2a2a30" stroke="#ff5c1a" strokeWidth="3" />
      <circle cx="34" cy="66" r="8" fill="#17171b" />
      {/* rear wheel */}
      <circle cx="92" cy="72" r="14" fill="#2a2a30" stroke="#6f6d68" strokeWidth="2.5" />
    </svg>
  )
}

export default function Paver() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const rollerLeft = useTransform(scrollYProgress, [0, 0.85], ['0%', '80%'])
  const rollerBob = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -4, 0, -4, 0])
  const asphaltScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    let idx = 0
    STEPS.forEach((s, i) => { if (v >= s.t) idx = i })
    setActive(idx)
  })

  const Scene = (
    <div className="paver-sticky">
      <h2 className="paver-title" id="come-nasce">
        Come nasce <em>una strada</em>
      </h2>

      <div className="paver-stage">
        <div className="paver-ground">
          <motion.div className="paver-asphalt" style={reduce ? { transform: 'scaleX(1)' } : { scaleX: asphaltScale }} />
        </div>
        <motion.div
          className="paver-roller"
          style={reduce ? { left: '80%' } : { left: rollerLeft, y: rollerBob }}
        >
          <Roller />
        </motion.div>
      </div>

      <div className="paver-steps">
        {STEPS.map((s, i) => (
          <span className={`paver-step${active >= i ? ' on' : ''}`} key={s.label}>
            <b>0{i + 1}</b> {s.label}
          </span>
        ))}
      </div>
    </div>
  )

  if (reduce) {
    return <section className="paver" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>{Scene}</section>
  }

  return (
    <section className="paver" ref={ref} style={{ height: '300vh' }}>
      {Scene}
    </section>
  )
}
