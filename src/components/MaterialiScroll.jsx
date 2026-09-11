import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useReducedMotion } from 'framer-motion'

const POINTER_DRAG_GAIN = 1.75
const TOUCHPAD_GAIN = 3.4
const MATERIAL_IMAGE_BASE = `${import.meta.env.BASE_URL}images/`

const MATERIALS_UNSORTED = [
  { index: '01', image: 'materials/base-editoriale.webp', illustrative: true, alt: 'Immagine illustrativa: sezione di conglomerato di base con aggregati grossi nella matrice bituminosa', title: 'Conglomerato di base', desc: 'Strato portante ad elevata stabilità: distribuisce i carichi e dà una fondazione solida.', variants: ['Disponibile anche la miscela CB BASEBINDER HD.'] },
  { index: '02', image: 'materials/binder-editoriale.webp', illustrative: true, alt: 'Immagine illustrativa: binder sfuso a grana intermedia in una vaschetta di campionamento', title: 'Binder di collegamento', desc: 'Lo strato di collegamento tra base e usura: coesione e resistenza alle deformazioni.' },
  {
    index: '03',
    image: 'materials/usura-editoriale.webp',
    illustrative: true,
    alt: 'Immagine illustrativa: tappetino bituminoso steso, a tessitura fine e compatta',
    title: "Conglomerato d'usura (tappetino)",
    desc: 'La superficie a contatto con il traffico: aderenza, regolarità e resistenza.',
    variants: [
      'Usura confezionato con bitume tal quale',
      'Usura confezionato con bitume modificato',
      'Usura Splittmastix Asphalt (SMA) con bitume modificato',
    ],
  },
  { index: '04', image: 'materials/drenante-editoriale.webp', illustrative: true, alt: 'Immagine illustrativa: conglomerato drenante con vuoti aperti tra gli aggregati', title: 'Usura drenante', desc: "La porosità aperta favorisce il drenaggio dell'acqua e contribuisce a ridurre il rumore di rotolamento." },
  {
    index: '05',
    image: 'impianto-01.webp',
    alt: 'Foto reale delle aree di stoccaggio e dell’impianto Eco Asfalti a Nocera Superiore',
    title: 'Conglomerati per i CAM',
    tag: 'Prodotti ecologici',
    className: 'cam-product-card',
    desc: "Conglomerati con materie prime secondarie per i progetti che richiedono i Criteri Ambientali Minimi. Un nuovo impiego per la materia recuperata, con attenzione alla qualità e all’ambiente.",
  },
  {
    index: '06',
    image: 'impianto-03.webp',
    alt: 'Foto reale dell’impianto di produzione Eco Asfalti',
    className: 'remade-card',
    title: 'Conglomerati certificati ReMade',
    tag: 'Cert. 1591/001',
    desc: 'Otto miscele con contenuto riciclato certificato dal 16% al 45%. Le percentuali di ogni prodotto sono consultabili nel certificato ReMade®.',
    certificate: true,
  },
]

const MATERIALS = [MATERIALS_UNSORTED[4], MATERIALS_UNSORTED[5], ...MATERIALS_UNSORTED.slice(0, 4)].map((item, index) => ({ ...item, index: String(index + 1).padStart(2, '0') }))

function Card({ item }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      className={`h-card${item.className ? ` ${item.className}` : ''}`}
      whileHover={reduce ? undefined : { y: -12, rotate: -0.6 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
    >
      <div className="h-card-media">
        <img
          src={`${MATERIAL_IMAGE_BASE}${item.image}`}
          alt={item.alt}
          width={item.illustrative ? 960 : 2200}
          height={item.illustrative ? 640 : 1238}
          loading="lazy"
          decoding="async"
        />
        <span className="material-image-caption">{item.illustrative ? 'Immagine illustrativa' : 'Il nostro impianto'}</span>
      </div>
      <div className="h-card-body">
        <div className="h-card-meta">
          <span className="h-card-index">{item.index}</span>
          {item.tag && <span className="h-card-tag">{item.tag}</span>}
        </div>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        {item.variants && (
          <ul className="product-variants">
            {item.variants.map((variant) => <li key={variant}>{variant}</li>)}
          </ul>
        )}
        <p className="technical-request">
          {item.certificate ? <a href={`${import.meta.env.BASE_URL}certificazioni/remade.pdf`} target="_blank" rel="noreferrer">Apri il certificato ReMade (PDF) ↗</a> : <a href="#contatti">Richiedi informazioni sul prodotto ↗</a>}
        </p>
      </div>
    </motion.article>
  )
}

export default function MaterialiScroll() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const dragRef = useRef({ active: false, pointerId: null, startX: 0, lastX: 0, moved: false })
  const suppressClickRef = useRef(false)
  const [horizontalTravel, setHorizontalTravel] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const trackX = useMotionValue(0)
  const lastProgressRef = useRef(0)
  const needsVerticalAlignmentRef = useRef(false)

  const moveTrackBy = useCallback((trackDelta) => {
    if (horizontalTravel <= 0 || reduce || !ref.current) {
      trackRef.current?.scrollBy({ left: trackDelta, behavior: 'auto' })
      return
    }

    const next = Math.min(0, Math.max(-horizontalTravel, trackX.get() - trackDelta))
    trackX.set(next)
    needsVerticalAlignmentRef.current = true
  }, [horizontalTravel, reduce, trackX])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const previous = lastProgressRef.current
    lastProgressRef.current = progress
    if (horizontalTravel <= 0 || reduce) return

    if (progress <= 0.001) {
      trackX.set(0)
      return
    }
    if (progress >= 0.999) {
      trackX.set(-horizontalTravel)
      return
    }

    const next = trackX.get() - (progress - previous) * horizontalTravel
    trackX.set(Math.min(0, Math.max(-horizontalTravel, next)))
  })

  useEffect(() => {
    const progress = scrollYProgress.get()
    lastProgressRef.current = progress
    if (horizontalTravel > 0 && !reduce) {
      trackX.set(-progress * horizontalTravel)
    }
  }, [horizontalTravel, reduce, scrollYProgress, trackX])

  useEffect(() => {
    const section = ref.current
    const track = trackRef.current
    if (!section || !track) return undefined

    let active = true
    const desktopQuery = window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)')

    const measure = () => {
      if (!active) return

      if (!desktopQuery.matches) {
        setHorizontalTravel(0)
        setSectionHeight(null)
        return
      }

      const viewportWidth = document.documentElement.clientWidth
      const travel = Math.max(0, Math.ceil(track.scrollWidth - viewportWidth))
      setHorizontalTravel(travel)
      setSectionHeight(Math.ceil(window.innerHeight + travel * 1.25))
    }

    measure()
    document.fonts?.ready.then(measure)

    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    desktopQuery.addEventListener('change', measure)

    return () => {
      active = false
      observer.disconnect()
      window.removeEventListener('resize', measure)
      desktopQuery.removeEventListener('change', measure)
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || horizontalTravel <= 0) return undefined

    const handleWheel = (event) => {
      const horizontalDelta = event.shiftKey ? event.deltaY : event.deltaX
      if (Math.abs(horizontalDelta) < 2 || Math.abs(horizontalDelta) < Math.abs(event.deltaY)) return

      event.preventDefault()
      const modeScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerWidth : 1
      moveTrackBy(horizontalDelta * modeScale * TOUCHPAD_GAIN)
    }

    track.addEventListener('wheel', handleWheel, { passive: false })
    return () => track.removeEventListener('wheel', handleWheel)
  }, [horizontalTravel, moveTrackBy])

  useEffect(() => {
    if (horizontalTravel <= 0 || reduce) return undefined

    const alignVerticalProgress = (event) => {
      if (!needsVerticalAlignmentRef.current || event.shiftKey) return
      if (Math.abs(event.deltaY) < 2 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

      const section = ref.current
      if (!section) return

      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const pinDistance = Math.max(0, section.offsetHeight - window.innerHeight)
      const currentScroll = window.scrollY

      // Ignore a stale manual position after the user has already left the section.
      if (currentScroll < sectionTop - 2 || currentScroll > sectionTop + pinDistance + 2) {
        needsVerticalAlignmentRef.current = false
        return
      }

      const trackProgress = Math.min(1, Math.max(0, -trackX.get() / horizontalTravel))
      const alignedScroll = sectionTop + pinDistance * trackProgress

      needsVerticalAlignmentRef.current = false
      lastProgressRef.current = trackProgress

      // The alignment happens only when vertical scrolling resumes and must be
      // immediate: the following wheel delta remains entirely native.
      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, alignedScroll)
      root.style.scrollBehavior = previousScrollBehavior
    }

    window.addEventListener('wheel', alignVerticalProgress, { capture: true, passive: true })
    return () => window.removeEventListener('wheel', alignVerticalProgress, { capture: true })
  }, [horizontalTravel, reduce, trackX])

  const handlePointerDown = (event) => {
    if (horizontalTravel <= 0 || event.target.closest('a, button') || (event.pointerType === 'mouse' && event.button !== 0)) return

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      moved: false,
    }
    suppressClickRef.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  const handlePointerMove = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return

    const delta = drag.lastX - event.clientX
    drag.lastX = event.clientX
    if (Math.abs(delta) < 0.5) return

    drag.moved = drag.moved || Math.abs(drag.startX - event.clientX) > 4
    suppressClickRef.current = drag.moved
    event.preventDefault()
    moveTrackBy(delta * POINTER_DRAG_GAIN)
  }

  const finishPointerDrag = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragRef.current = { active: false, pointerId: null, startX: 0, lastX: 0, moved: false }
    setIsDragging(false)
    window.setTimeout(() => { suppressClickRef.current = false }, 0)
  }

  const handleTrackKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const distance = Math.min(window.innerWidth * 0.35, 420) * direction
    if (horizontalTravel > 0) {
      moveTrackBy(distance)
    } else {
      trackRef.current?.scrollBy({ left: distance, behavior: reduce ? 'auto' : 'smooth' })
    }
  }

  const trackInteractionProps = {
    role: 'region',
    'aria-label': 'Materiali Eco Asfalti, elenco scorrevole',
    tabIndex: 0,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: finishPointerDrag,
    onPointerCancel: finishPointerDrag,
    onKeyDown: handleTrackKeyDown,
    onClickCapture: (event) => {
      if (!suppressClickRef.current) return
      event.preventDefault()
      event.stopPropagation()
    },
  }

  if (reduce) {
    return (
      <section className="section" id="materiali" ref={ref}>
        <div className="container section-head">
          <span className="eyebrow">La nostra produzione</span>
          <h2 className="section-title">Miscele per ogni esigenza</h2>
          <p className="h-scroll-hint">Trascina le card o scorri orizzontalmente</p>
        </div>
        <div ref={trackRef} className="h-track" style={{ overflowX: 'auto', paddingBottom: '1rem' }} {...trackInteractionProps}>
          {MATERIALS.map((m) => <Card key={m.index} item={m} />)}
        </div>
      </section>
    )
  }

  return (
    <section
      className="h-scroll"
      id="materiali"
      ref={ref}
      style={{ height: sectionHeight ? `${sectionHeight}px` : '390vh' }}
    >
      <div className="h-scroll-sticky">
        <div className="h-scroll-head">
          <span className="eyebrow">La nostra produzione</span>
          <h2 className="section-title">Miscele <span className="out">per ogni</span> esigenza</h2>
          <p className="h-scroll-hint">Trascina le card o usa il touchpad in orizzontale</p>
        </div>
        <motion.div
          ref={trackRef}
          className={`h-track${isDragging ? ' is-dragging' : ''}`}
          style={{ x: trackX }}
          {...trackInteractionProps}
        >
          {MATERIALS.map((m) => <Card key={m.index} item={m} />)}
        </motion.div>
      </div>
    </section>
  )
}
