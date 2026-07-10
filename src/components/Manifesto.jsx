import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const TEXT = "Non posiamo semplicemente asfalto: costruiamo infrastrutture che collegano persone, resistono al tempo e rispettano l'ambiente."
const WORDS = TEXT.split(' ')

function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }}>{children}{' '}</motion.span>
}

export default function Manifesto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] })

  return (
    <section className="section manifesto" ref={ref}>
      <div className="container">
        <p className="manifesto-text">
          {reduce
            ? TEXT
            : WORDS.map((w, i) => {
                const start = i / WORDS.length
                const end = start + 1 / WORDS.length
                const em = /ambiente|collegano|tempo/i.test(w)
                return (
                  <Word key={i} range={[start, end]} progress={scrollYProgress}>
                    {em ? <em>{w}</em> : w}
                  </Word>
                )
              })}
        </p>
      </div>
    </section>
  )
}
