import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const MATERIALS = [
  { index: '01', media: 'hm-base', title: 'Conglomerato di base', desc: 'Strato portante ad elevata stabilità: distribuisce i carichi e dà una fondazione solida.' },
  { index: '02', media: 'hm-binder', title: 'Binder di collegamento', desc: 'Il legante strutturale tra base e usura: coesione e resistenza alle deformazioni.' },
  { index: '03', media: 'hm-usura', title: "Conglomerato d'usura", desc: 'La superficie a contatto con il traffico: aderenza, regolarità, resistenza.' },
  { index: '04', media: 'hm-drenante', title: 'Usura drenante fonoassorbente', desc: "Porosità aperta che drena l'acqua e riduce il rumore di rotolamento." },
  { index: '05', media: 'hm-colorato', title: 'Usura drenante colorata', desc: 'Prestazioni drenanti con finitura colorata per ciclabili e aree pedonali.' },
  { index: '06', media: 'hm-eco', title: 'Conglomerato riciclato (RAP)', desc: 'Elevata percentuale di fresato recuperato: stesse prestazioni, minore impatto.' },
]

function Card({ item }) {
  return (
    <article className="h-card">
      <div className={`h-card-media ${item.media}`} aria-hidden="true"></div>
      <div className="h-card-body">
        <span className="h-card-index">{item.index}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </article>
  )
}

export default function MaterialiScroll() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-74%'])

  if (reduce) {
    return (
      <section className="section" id="materiali">
        <div className="container section-head">
          <span className="eyebrow">I materiali</span>
          <h2 className="section-title">Uno strato per ogni esigenza</h2>
        </div>
        <div className="h-track" style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
          {MATERIALS.map((m) => <Card key={m.index} item={m} />)}
        </div>
      </section>
    )
  }

  return (
    <section className="h-scroll" id="materiali" ref={ref} style={{ height: '380vh' }}>
      <div className="h-scroll-sticky">
        <div className="h-scroll-head">
          <span className="eyebrow">I materiali</span>
          <h2 className="section-title">Uno strato <span className="out">per ogni</span> esigenza</h2>
        </div>
        <motion.div className="h-track" style={{ x }}>
          {MATERIALS.map((m) => <Card key={m.index} item={m} />)}
        </motion.div>
      </div>
    </section>
  )
}
