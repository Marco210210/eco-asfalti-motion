import { useCallback, useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const PHOTO_HOLD_MS = 5000
const FADE_MS = 850

export default function HeroFilm() {
  const [reduce, setReduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const reduceRef = useRef(reduce)
  reduceRef.current = reduce
  const pictureRef = useRef(null)
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const visibleRef = useRef(false)
  const intentRef = useRef(null)
  const phaseRef = useRef('video')
  const photoTimerRef = useRef(null)
  const photoDeadlineRef = useRef(0)
  const photoRemainingRef = useRef(0)
  const runRef = useRef(0)
  const attemptedRef = useRef(false)
  const mountedRef = useRef(false)
  const statusRef = useRef('idle')
  const [status, setStatus] = useState('idle')
  const [showVideo, setShowVideo] = useState(false)

  const updateStatus = useCallback((next) => {
    statusRef.current = next
    if (mountedRef.current) setStatus(next)
  }, [])

  const freezePhoto = useCallback(() => {
    if (photoTimerRef.current === null) return
    clearTimeout(photoTimerRef.current)
    photoTimerRef.current = null
    photoRemainingRef.current = Math.max(0, photoDeadlineRef.current - performance.now())
  }, [])

  const pause = useCallback((suspend = false) => {
    runRef.current += 1
    freezePhoto()
    videoRef.current?.pause()
    // Only a deliberate pause cancels the intent to resume when visible.
    if (!suspend) intentRef.current = null
    updateStatus(suspend ? 'suspended' : 'paused')
  }, [freezePhoto, updateStatus])

  const playVideo = useCallback(() => {
    const video = videoRef.current
    if (!video || !intentRef.current || !visibleRef.current || document.hidden) return
    const run = ++runRef.current
    updateStatus('loading')
    if (!video.getAttribute('src') || video.error) {
      // Keep the source attached offscreen to preserve time and buffered data.
      const mobile = window.matchMedia('(max-width: 900px)').matches
      video.src = `${BASE}videos/ciclo-hero-${mobile ? '720' : '1080'}.mp4`
      video.load()
    } else if (video.ended) {
      video.currentTime = 0
    }
    video.muted = true
    video.play().catch((error) => {
      if (!mountedRef.current || run !== runRef.current) return
      intentRef.current = null
      setShowVideo(false)
      updateStatus(error.name === 'NotAllowedError' ? 'idle' : 'unavailable')
    })
  }, [updateStatus])

  const playPhoto = useCallback(() => {
    if (photoTimerRef.current !== null) return
    updateStatus('interlude')
    photoDeadlineRef.current = performance.now() + photoRemainingRef.current
    photoTimerRef.current = setTimeout(() => {
      photoTimerRef.current = null
      photoRemainingRef.current = 0
      phaseRef.current = 'video'
      if (intentRef.current && visibleRef.current && !document.hidden) playVideo()
      else updateStatus(intentRef.current ? 'suspended' : 'paused')
    }, photoRemainingRef.current)
  }, [playVideo, updateStatus])

  const resume = useCallback(() => {
    if (!intentRef.current || !visibleRef.current || document.hidden) return
    if (['playing', 'loading', 'interlude'].includes(statusRef.current)) return
    if (phaseRef.current === 'photo') playPhoto()
    else playVideo()
  }, [playPhoto, playVideo])

  useEffect(() => {
    mountedRef.current = true
    const video = videoRef.current
    return () => {
      mountedRef.current = false
      runRef.current += 1
      clearTimeout(photoTimerRef.current)
      photoTimerRef.current = null
      video?.pause()
      // Retain intent/state across StrictMode's effect replay.
      if (intentRef.current) statusRef.current = 'suspended'
    }
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduce && intentRef.current === 'auto') pause()
  }, [reduce, pause])

  useEffect(() => {
    const picture = pictureRef.current
    if (!picture) return undefined
    let firstPaint

    const syncPlayback = () => {
      if (!visibleRef.current || document.hidden) {
        cancelAnimationFrame(firstPaint)
        if (intentRef.current) pause(true)
        return
      }
      if (intentRef.current) {
        resume()
        return
      }
      if (attemptedRef.current) return
      attemptedRef.current = true
      const connection = navigator.connection
      const conserveData = connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType)
      if (reduceRef.current || conserveData) return
      intentRef.current = 'auto'
      // Leave the first paint to the photo, text and navigation.
      firstPaint = requestAnimationFrame(resume)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.2
      syncPlayback()
    }, { threshold: [0, 0.2] })

    // Observe the actual mobile frame, not the hero's remaining text/buttons.
    observer.observe(picture)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(firstPaint)
      document.removeEventListener('visibilitychange', syncPlayback)
    }
  }, [pause, resume])

  const handleEnded = () => {
    freezePhoto()
    phaseRef.current = 'photo'
    // Five seconds of the original photo after the fade has completed.
    photoRemainingRef.current = PHOTO_HOLD_MS + (reduceRef.current ? 0 : FADE_MS)
    setShowVideo(false)
    if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)'
    if (intentRef.current && visibleRef.current && !document.hidden) playPhoto()
    else updateStatus(intentRef.current ? 'suspended' : 'paused')
  }

  const handleControl = () => {
    if (['playing', 'loading', 'interlude'].includes(statusRef.current)) {
      pause()
    } else {
      attemptedRef.current = true
      intentRef.current = 'manual'
      resume()
    }
  }

  const label = {
    idle: 'Guarda il ciclo', loading: 'Annulla riproduzione', playing: 'Pausa video',
    interlude: 'Pausa ciclo', paused: 'Riprendi il ciclo', suspended: 'Riprendi il ciclo',
    unavailable: 'Riprova il video',
  }[status]
  const canPause = status === 'playing' || status === 'interlude'

  return (
    <div className={`hero-film${showVideo ? ' is-playing' : ''}`} data-status={status} style={{ '--hero-film-fade': `${FADE_MS}ms` }}>
      <div ref={pictureRef} className="hero-film-picture" aria-hidden="true">
        <picture>
          <img src={`${BASE}images/impianto-06.webp`} width="2200" height="1238" alt="" fetchPriority="high" />
        </picture>
        <video
          ref={videoRef} id="hero-film-video" muted playsInline preload="none" tabIndex={-1}
          aria-hidden="true" disablePictureInPicture
          onPlaying={() => {
            if (!intentRef.current || !visibleRef.current || document.hidden) { videoRef.current?.pause(); return }
            setShowVideo(true)
            updateStatus('playing')
          }}
          onEnded={handleEnded}
          onError={() => {
            if (!intentRef.current) return
            pause()
            phaseRef.current = 'video'
            setShowVideo(false)
            updateStatus('unavailable')
          }}
          onTimeUpdate={() => {
            const video = videoRef.current
            if (phaseRef.current === 'video' && progressRef.current && video?.duration) {
              progressRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`
            }
          }}
        />
        <div className="hero-film-scrim" />
      </div>
      <div className="hero-film-controls">
        <span className="hero-film-caption">Il ciclo produttivo <span>10 secondi, nuova materia.</span></span>
        <button type="button" className="hero-film-control" onClick={handleControl} aria-controls="hero-film-video">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {canPause ? <path d="M7 4v12M13 4v12" /> : status === 'loading' ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="m7 4 9 6-9 6Z" />}
          </svg>
          {label}
        </button>
        <span className="sr-only" role="status">{status === 'unavailable' ? 'Il video non è disponibile. Puoi continuare a navigare oppure riprovare.' : ''}</span>
        <div className="hero-film-progress" aria-hidden="true"><span ref={progressRef} /></div>
      </div>
    </div>
  )
}
