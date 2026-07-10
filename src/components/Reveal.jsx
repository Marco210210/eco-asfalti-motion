import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const Reveal = forwardRef(function Reveal(
  { children, className, as = 'div', delay = 0, y = 34, ...rest },
  ref,
) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
})

export default Reveal
