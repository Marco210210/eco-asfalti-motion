import { useEffect, useState } from 'react'

export default function MobileStickyCta() {
  const [contactVisible, setContactVisible] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)

  useEffect(() => {
    const contactSection = document.getElementById('contatti')
    const heroSection = document.getElementById('hero')
    if (!contactSection || !heroSection) return undefined

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.target === heroSection) setHeroVisible(entry.isIntersecting)
        if (entry.target === contactSection) setContactVisible(entry.isIntersecting)
      }),
      { threshold: 0.12 },
    )
    observer.observe(contactSection)
    observer.observe(heroSection)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      className={`mobile-sticky-cta${contactVisible || heroVisible ? ' is-hidden' : ''}`}
      href="#contatti"
      aria-label="Richiedi una fornitura a Eco Asfalti"
    >
      Richiedi una fornitura <span aria-hidden="true">→</span>
    </a>
  )
}
