import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/* Full-screen intro: a 0→100 counter, a progress bar, then the panel slides
   up to reveal the site. Calls onDone when finished. */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setCount(100); const t = setTimeout(onDone, 200); return () => clearTimeout(t) }

    const duration = 1500
    const start = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      animate={count >= 100 ? { y: '-100%' } : {}}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
      onAnimationComplete={() => count >= 100 && onDone()}
    >
      <div className="preloader-count">
        {count}<span className="pc-accent">%</span>
      </div>
      <div className="preloader-bar">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
          transition={{ ease: 'linear' }}
        />
      </div>
      <div className="preloader-label">Eco Asfalti · caricamento</div>
    </motion.div>
  )
}
