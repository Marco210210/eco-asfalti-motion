import { motion } from 'framer-motion'

/* Seamless infinite marquee. The row holds two copies of `items`; translating
   it by exactly -50% loops without a visible seam. */
export default function Marquee({ items, direction = 1, duration = 26, className = '' }) {
  const content = [...items, ...items]
  return (
    <div className={`marquee-band ${className}`} aria-hidden="true">
      <motion.div
        className="marquee-row"
        animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {content.map((it, i) => (
          <span className="marquee-item" key={i}>{it}</span>
        ))}
      </motion.div>
    </div>
  )
}
