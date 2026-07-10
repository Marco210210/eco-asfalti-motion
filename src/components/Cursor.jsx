import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* A trailing custom cursor: a solid dot + a lagging ring that grows over
   interactive elements. Desktop (fine pointer) + no reduced motion only. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const t = e.target
      setHovering(!!t.closest('a, button, [data-cursor="hover"]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y, scale: hovering ? 0 : 1 }} />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 1 : 0.7 }}
        transition={{ duration: 0.25 }}
      />
    </>
  )
}
