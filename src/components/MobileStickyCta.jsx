import { useEffect, useState } from 'react'

export default function MobileStickyCta() {
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    const contactSection = document.getElementById('contatti')
    if (!contactSection) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.12 },
    )
    observer.observe(contactSection)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      className={`mobile-sticky-cta${contactVisible ? ' is-hidden' : ''}`}
      href="#contatti"
      aria-label="Richiedi un preventivo a Eco Asfalti"
    >
      Richiedi un preventivo <span aria-hidden="true">→</span>
    </a>
  )
}
