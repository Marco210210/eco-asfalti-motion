import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from './Reveal.jsx'

const STATS = [
  { to: 25, unit: '+', label: 'Anni di attività', pct: 0.7 },
  { to: 1200, unit: '+', label: 'Cantieri completati', pct: 0.9 },
  { to: 98, unit: '%', label: 'Fresato recuperato', pct: 0.98 },
  { to: 4, unit: '', label: 'Certificazioni ISO', pct: 0.5 },
]

function StatCard({ stat, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(stat.to); return }
    const dur = 1600, start = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * stat.to))
      if (p < 1) raf = requestAnimationFrame(step); else setVal(stat.to)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, stat.to])

  return (
    <Reveal className="stat" delay={delay} ref={ref}>
      <div className="stat-num">
        {val.toLocaleString('it-IT')}<span className="u">{stat.unit}</span>
      </div>
      <span className="stat-label">{stat.label}</span>
      <div className="stat-bar">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: stat.pct }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }}
        />
      </div>
    </Reveal>
  )
}

export default function Stats() {
  return (
    <section className="section" id="azienda">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Numeri</span>
          <h2 className="section-title">Fatti, <span className="out">non</span> promesse</h2>
        </Reveal>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
