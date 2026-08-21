import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const STEPS = [
  { t: 0, number: '01', label: 'Preparazione', detail: 'Il piano di posa viene verificato e preparato.' },
  { t: 0.32, number: '02', label: 'Stesa', detail: 'La finitrice distribuisce il conglomerato in modo uniforme.' },
  { t: 0.68, number: '03', label: 'Compattazione', detail: 'Densità e regolarità vengono portate a progetto.' },
  { t: 0.88, number: '04', label: 'Finitura', detail: 'Controlli e segnaletica completano la superficie.' },
]

function AsphaltPaver() {
  return (
    <svg className="paver-machine-svg" viewBox="0 0 560 310" role="img" aria-label="Finitrice stradale Eco Asfalti">
      <defs>
        <linearGradient id="paverOrange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8a50" />
          <stop offset="0.48" stopColor="#ff5c1a" />
          <stop offset="1" stopColor="#bc3108" />
        </linearGradient>
        <linearGradient id="paverMetal" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#4b4d53" />
          <stop offset="0.55" stopColor="#25262b" />
          <stop offset="1" stopColor="#121317" />
        </linearGradient>
        <linearGradient id="paverGlass" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#9bd5e8" stopOpacity="0.72" />
          <stop offset="0.45" stopColor="#284554" stopOpacity="0.86" />
          <stop offset="1" stopColor="#111920" />
        </linearGradient>
        <linearGradient id="paverTrack" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#101115" />
          <stop offset="0.5" stopColor="#34363c" />
          <stop offset="1" stopColor="#111216" />
        </linearGradient>
        <radialGradient id="paverLight">
          <stop stopColor="#fff2bd" />
          <stop offset="0.35" stopColor="#ffca55" />
          <stop offset="1" stopColor="#ff7a00" stopOpacity="0" />
        </radialGradient>
        <filter id="machineShadow" x="-20%" y="-30%" width="150%" height="180%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#000" floodOpacity="0.58" />
        </filter>
        <filter id="beaconGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="leftTrackClip"><rect x="126" y="221" width="185" height="58" rx="29" /></clipPath>
        <clipPath id="rightTrackClip"><rect x="344" y="225" width="150" height="52" rx="26" /></clipPath>
      </defs>

      <g filter="url(#machineShadow)">
        <path d="M28 238H138L157 259H19Z" fill="url(#paverMetal)" stroke="#65676d" strokeWidth="3" />
        <path d="M18 260H166L181 278H8Z" fill="#111216" stroke="#414249" strokeWidth="3" />
        <path d="M86 235L116 194H148" stroke="#777980" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M49 235L79 204" stroke="#ff5c1a" strokeWidth="5" strokeLinecap="round" />
        <rect x="30" y="273" width="148" height="9" rx="4.5" fill="#050608" />

        <rect x="114" y="214" width="212" height="73" rx="34" fill="#0b0c0f" stroke="#4b4d53" strokeWidth="4" />
        <rect x="126" y="221" width="185" height="58" rx="29" fill="url(#paverTrack)" />
        <g className="paver-track-treads" clipPath="url(#leftTrackClip)" stroke="#62646b" strokeWidth="5">
          {Array.from({ length: 13 }, (_, index) => <path key={index} d={`M${120 + index * 17} 218l-15 66`} />)}
        </g>
        <ellipse cx="170" cy="250" rx="28" ry="22" fill="#15161a" stroke="#74767c" strokeWidth="3" />
        <ellipse cx="268" cy="250" rx="28" ry="22" fill="#15161a" stroke="#74767c" strokeWidth="3" />
        <circle cx="170" cy="250" r="8" fill="#ff5c1a" />
        <circle cx="268" cy="250" r="8" fill="#ff5c1a" />

        <rect x="334" y="218" width="173" height="68" rx="32" fill="#0b0c0f" stroke="#4b4d53" strokeWidth="4" />
        <rect x="344" y="225" width="150" height="52" rx="26" fill="url(#paverTrack)" />
        <g className="paver-track-treads paver-track-treads-rear" clipPath="url(#rightTrackClip)" stroke="#62646b" strokeWidth="5">
          {Array.from({ length: 11 }, (_, index) => <path key={index} d={`M${340 + index * 17} 222l-14 59`} />)}
        </g>
        <ellipse cx="381" cy="251" rx="25" ry="20" fill="#15161a" stroke="#74767c" strokeWidth="3" />
        <ellipse cx="457" cy="251" rx="25" ry="20" fill="#15161a" stroke="#74767c" strokeWidth="3" />

        <path d="M136 205L158 123H344L391 215H170Z" fill="url(#paverOrange)" stroke="#ff9b69" strokeWidth="3" />
        <path d="M158 123H337L359 172H146Z" fill="#e64710" opacity="0.68" />
        <path d="M175 136h121" stroke="#ffbb98" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M162 181H359" stroke="#8f2306" strokeWidth="3" opacity="0.75" />
        <path d="M186 197h145" stroke="#ff9a68" strokeWidth="2" opacity="0.55" />
        <text x="187" y="169" fill="#fff5ee" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="900" letterSpacing="2">ECO ASFALTI</text>
        <text x="189" y="188" fill="#391007" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="800" letterSpacing="4">ROAD SYSTEMS</text>

        <path d="M245 121L266 55H371L410 126Z" fill="#22242a" stroke="#656870" strokeWidth="3" />
        <path d="M274 64H329V116H258Z" fill="url(#paverGlass)" stroke="#9ba0a8" strokeWidth="2" />
        <path d="M334 64H367L399 116H334Z" fill="url(#paverGlass)" stroke="#9ba0a8" strokeWidth="2" />
        <path d="M250 52H385" stroke="#17181c" strokeWidth="13" strokeLinecap="round" />
        <path d="M257 48H386" stroke="#ff5c1a" strokeWidth="5" strokeLinecap="round" />
        <path d="M272 51V28M365 51V28" stroke="#8b8e95" strokeWidth="5" strokeLinecap="round" />
        <path d="M251 27H385L397 36H241Z" fill="#26272c" stroke="#777980" strokeWidth="3" />
        <path d="M294 116V66M334 116V65" stroke="#1a1b20" strokeWidth="5" />
        <circle cx="354" cy="95" r="13" fill="#17181c" stroke="#8f9299" strokeWidth="3" />
        <path d="M354 95l10-7" stroke="#ff5c1a" strokeWidth="3" strokeLinecap="round" />

        <path d="M373 135L506 153L548 225H394Z" fill="url(#paverOrange)" stroke="#ff9d6c" strokeWidth="3" />
        <path d="M394 151L505 165L527 205H405Z" fill="#2b2c31" stroke="#7b7d84" strokeWidth="3" />
        <path d="M418 169L505 180" stroke="#55575e" strokeWidth="6" strokeLinecap="round" />
        <path d="M514 158L541 144L553 151L536 177" fill="#ff5c1a" stroke="#ff9a68" strokeWidth="2" />
        <circle cx="535" cy="192" r="24" fill="url(#paverLight)" opacity="0.55" />
        <rect x="526" y="185" width="14" height="9" rx="3" fill="#ffe5a3" />

        <path d="M146 117H225M151 105H223M154 103v29M219 103v27" stroke="#b9bbc0" strokeWidth="4" strokeLinecap="round" />
        <path d="M205 101V52H221V101" fill="#24262a" stroke="#777980" strokeWidth="3" />
        <path d="M200 52H227" stroke="#15161a" strokeWidth="7" strokeLinecap="round" />
        <path d="M411 126h62M414 126v31M466 127v24" stroke="#b9bbc0" strokeWidth="4" strokeLinecap="round" />
        <circle cx="326" cy="190" r="15" fill="#202126" stroke="#7b2e17" strokeWidth="3" />
        <circle cx="326" cy="190" r="8" fill="none" stroke="#6e7178" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="326" cy="190" r="2.5" fill="#ff5c1a" />

        <path d="M310 26v-9" stroke="#6f7279" strokeWidth="4" />
        <ellipse className="paver-beacon-glow" cx="310" cy="10" rx="18" ry="12" fill="#ff7a00" opacity="0.28" filter="url(#beaconGlow)" />
        <path d="M301 16V7a9 9 0 0118 0v9Z" fill="#ff8a00" stroke="#ffd27a" strokeWidth="2" />
      </g>
    </svg>
  )
}

export default function Paver() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const machineRef = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [machineTravel, setMachineTravel] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const machineX = useTransform(scrollYProgress, [0.04, 0.86], [0, machineTravel])
  const machineY = useTransform(scrollYProgress, [0, 0.22, 0.48, 0.72, 1], [0, -3, 0, -3, 0])
  const asphaltScale = useTransform(scrollYProgress, [0.04, 0.84], [0.03, 1])
  const markingsScale = useTransform(scrollYProgress, [0.67, 0.94], [0, 1])
  const sceneGlow = useTransform(scrollYProgress, [0, 0.55, 1], [0.18, 0.6, 0.28])
  const progressScale = useTransform(scrollYProgress, [0, 0.92], [0, 1])
  const steamOpacity = useTransform(scrollYProgress, [0.04, 0.12, 0.82, 0.9], [0, 0.72, 0.72, 0])

  useEffect(() => {
    const stage = stageRef.current
    const machine = machineRef.current
    if (!stage || !machine) return undefined

    // La finitrice prosegue quasi fuori scena: in questo modo il bordo del
    // nuovo asfalto resta sempre dietro al banco di stesa, fino a fine strada.
    const measure = () => setMachineTravel(Math.max(0, stage.clientWidth - (machine.offsetWidth * 0.12)))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    observer.observe(machine)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    let index = 0
    STEPS.forEach((step, stepIndex) => { if (value >= step.t) index = stepIndex })
    setActive(index)
  })

  const Scene = (
    <div className="paver-sticky">
      <motion.div className="paver-ambient" aria-hidden="true" style={reduce ? { opacity: 0.35 } : { opacity: sceneGlow }} />

      <div className="paver-heading">
        <span className="eyebrow">Dal conglomerato alla superficie</span>
        <h2 className="paver-title" id="come-nasce">Come nasce <em>una strada.</em></h2>
        <p>Precisione di stesa, controllo degli spessori e compattazione: ogni passaggio costruisce la prestazione finale.</p>
      </div>

      <div className="paver-stage" ref={stageRef} aria-hidden="true">
        <div className="paver-horizon">
          <span /><span /><span /><span /><span /><span /><span />
        </div>
        <div className="paver-road-bed">
          <div className="paver-road-aggregate" />
          <motion.div className="paver-fresh-asphalt" style={reduce ? { scaleX: 1 } : { scaleX: asphaltScale }}>
            <span className="paver-asphalt-sheen" />
          </motion.div>
          <motion.div className="paver-road-markings" style={reduce ? { scaleX: 1 } : { scaleX: markingsScale }}>
            <span /><span /><span /><span /><span />
          </motion.div>
          <div className="paver-road-edge paver-road-edge-top" />
          <div className="paver-road-edge paver-road-edge-bottom" />
        </div>

        <motion.div
          ref={machineRef}
          className="paver-machine"
          style={reduce ? { x: machineTravel } : { x: machineX, y: machineY }}
        >
          <AsphaltPaver />
          <motion.div className="paver-heat" style={reduce ? { opacity: 0 } : { opacity: steamOpacity }}>
            <i /><i /><i /><i /><i />
          </motion.div>
        </motion.div>
      </div>

      <div className="paver-process">
        <div className="paver-process-line" aria-hidden="true"><motion.span style={reduce ? { scaleX: 1 } : { scaleX: progressScale }} /></div>
        <div className="paver-steps">
          {STEPS.map((step, index) => (
            <div className={`paver-step${active >= index ? ' on' : ''}`} key={step.label}>
              <b>{step.number}</b>
              <span><strong>{step.label}</strong><small>{step.detail}</small></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (reduce) {
    return <section className="paver paver-reduced" ref={ref}>{Scene}</section>
  }

  return <section className="paver" ref={ref}>{Scene}</section>
}
