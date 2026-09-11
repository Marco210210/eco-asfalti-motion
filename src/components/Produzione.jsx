import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'

export default function Produzione() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-28, 28])
  return (
    <div className="section production-section" ref={ref}>
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">01 / Produzione · La nostra attività principale</span>
          <h2 className="section-title" id="produzione-title">La qualità nasce<br />dalla <span className="out">materia.</span></h2>
          <p className="section-intro">Produciamo conglomerati bituminosi nel nostro impianto di Nocera Superiore. Al centro, miscele affidabili e prodotti ecologici che valorizzano le materie prime secondarie.</p>
        </Reveal>
        <div className="cam-showcase" id="prodotti-cam">
          <Reveal className="cam-image-wrap">
            <motion.img src={`${import.meta.env.BASE_URL}images/impianto-01.webp`} alt="Foto reale delle aree di stoccaggio dell’impianto Eco Asfalti a Nocera Superiore" width="2200" height="1238" loading="lazy" style={reduce ? undefined : { y: imageY }} />
            <span className="cam-image-caption">Il nostro impianto / Nocera Superiore</span>
            <div className="recycled-seal"><span>fino al</span><strong>45<small>%</small></strong><span>riciclato certificato</span></div>
          </Reveal>
          <Reveal className="cam-copy" delay={0.12}>
            <span className="eco-pill"><span aria-hidden="true">↗</span> Prodotti ecologici</span>
            <h3>Più valore alla materia.<br /><em>Meno risorse vergini.</em></h3>
            <p>Le nostre miscele per i CAM Strade portano le materie prime secondarie dentro la produzione di nuovi conglomerati bituminosi.</p>
            <p>Il contenuto riciclato delle otto miscele ReMade® è certificato dal 16% al 45%: un dato concreto, dichiarato per ogni prodotto e consultabile nel certificato.</p>
            <div className="cam-tags"><span>Materiali CAM</span><span>ReMade®</span><span>Economia circolare</span></div>
            <Magnetic><a className="text-link" href={`${import.meta.env.BASE_URL}certificazioni/remade.pdf`} target="_blank" rel="noreferrer">Consulta il certificato ReMade <span aria-hidden="true">↗</span><span className="sr-only"> (PDF, nuova scheda)</span></a></Magnetic>
          </Reveal>
        </div>
        <Reveal className="energy-transition">
          <div><span className="eyebrow">La transizione ecologica dell’impianto</span><h3>Il cambiamento<br />parte anche dai forni.</h3></div>
          <div className="energy-switch" aria-label="Passaggio dal combustibile BTZ al GPL"><span className="energy-before">BTZ</span><span className="energy-line" aria-hidden="true"><i /></span><strong>GPL</strong></div>
          <p>Il passaggio dei forni dal combustibile BTZ al GPL accompagna l’evoluzione verso una produzione a minore impatto ambientale. Un intervento concreto, insieme al recupero e all’impiego di materiali riciclati.</p>
        </Reveal>
      </div>
    </div>
  )
}
