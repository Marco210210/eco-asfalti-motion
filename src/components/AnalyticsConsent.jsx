import { useEffect, useState } from 'react'

const CONSENT_KEY = 'ecoasfalti-analytics-consent'
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

function prepareConsentApi() {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments) }
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

function loadAnalytics() {
  if (!measurementId || document.querySelector('script[data-eco-analytics]')) return

  window.gtag('consent', 'update', { analytics_storage: 'granted' })
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { anonymize_ip: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  script.dataset.ecoAnalytics = 'true'
  document.head.appendChild(script)
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(() => (
    measurementId ? localStorage.getItem(CONSENT_KEY) : 'disabled'
  ))

  useEffect(() => {
    if (!measurementId) return undefined

    prepareConsentApi()
    if (choice === 'accepted') loadAnalytics()

    const reopen = () => setChoice(null)
    window.addEventListener('ecoasfalti:open-privacy-settings', reopen)
    return () => window.removeEventListener('ecoasfalti:open-privacy-settings', reopen)
  }, [choice])

  if (!measurementId || choice) return null

  const saveChoice = (value) => {
    localStorage.setItem(CONSENT_KEY, value)
    setChoice(value)

    if (value === 'accepted') {
      loadAnalytics()
    } else if (window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'denied' })
    }
  }

  return (
    <aside className="analytics-consent" aria-label="Preferenze Analytics">
      <div>
        <strong>Misurazione del sito</strong>
        <p>Con il tuo consenso utilizziamo Google Analytics per capire come migliorare il sito. Se rifiuti, lo script non viene caricato.</p>
        <a href={`${import.meta.env.BASE_URL}privacy-policy.html`}>Leggi la Privacy Policy</a>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="consent-reject" onClick={() => saveChoice('rejected')}>Rifiuta</button>
        <button type="button" className="consent-accept" onClick={() => saveChoice('accepted')}>Accetta Analytics</button>
      </div>
    </aside>
  )
}
