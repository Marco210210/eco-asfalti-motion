/* Shared by the home and static pages. No third-party requests before opt-in. */
(() => {
  const KEY = 'ecoasfalti-consent-v2'
  const VERSION = '2026-10-02-ga4'
  const id = document.querySelector('meta[name="eco-analytics-id"]')?.content || ''
  const enabled = /^G-[A-Z0-9]+$/.test(id)
  let memory = null
  let loaded = false
  let expiryTimer
  let returnFocus
  const expires = timestamp => { const date = new Date(timestamp); date.setMonth(date.getMonth() + 6); return date.getTime() }
  function read() {
    try { memory = JSON.parse(localStorage.getItem(KEY)) } catch (_) { /* Storage may be blocked. */ }
    if (!memory || memory.version !== VERSION || !['accepted', 'rejected'].includes(memory.choice)
      || !Number.isFinite(memory.at) || memory.at > Date.now() || expires(memory.at) <= Date.now()) return null
    return memory
  }
  function clearAnalyticsCookies() {
    const domains = location.hostname.split('.').map((_, i, parts) => parts.slice(i).join('.'))
    for (const part of document.cookie.split(';')) {
      const name = part.split('=')[0].trim()
      if (!/^_ga(?:_|$)/.test(name)) continue
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
      for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`
    }
  }
  function stop() {
    window[`ga-disable-${id}`] = true
    document.querySelector('script[data-eco-analytics]')?.remove()
    clearAnalyticsCookies()
  }
  function start() {
    if (!enabled || loaded || read()?.choice !== 'accepted') return
    loaded = true
    window[`ga-disable-${id}`] = false
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    window.gtag('consent', 'update', { analytics_storage: 'granted' })
    window.gtag('js', new Date())
    window.gtag('config', id, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 15552000,
      cookie_update: false,
    })
    // Never send form values, URL query parameters, hash fragments or referrer queries.
    let referrer = ''
    try { const url = new URL(document.referrer); referrer = url.origin + url.pathname } catch (_) { /* No referrer. */ }
    window.gtag('event', 'page_view', { page_location: location.origin + location.pathname, page_referrer: referrer, page_title: document.title })
    const script = document.createElement('script')
    script.async = true
    script.dataset.ecoAnalytics = 'true'
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    document.head.appendChild(script)
    armExpiry()
  }
  function armExpiry() {
    clearTimeout(expiryTimer)
    const consent = read()
    if (consent?.choice !== 'accepted') return
    expiryTimer = setTimeout(() => {
      if (read()?.choice !== 'accepted') { stop(); location.reload() } else armExpiry()
    }, Math.min(expires(consent.at) - Date.now() + 50, 2147483647))
  }
  let banner
  const isOpen = () => banner && !banner.hidden
  function close() {
    const restore = banner.contains(document.activeElement) ? returnFocus : null
    banner.hidden = true
    returnFocus = null
    restore?.focus?.()
  }
  function save(choice) {
    memory = { version: VERSION, choice, at: Date.now() }
    try { localStorage.setItem(KEY, JSON.stringify(memory)); localStorage.removeItem('ecoasfalti-analytics-consent') } catch (_) { /* Current-page choice still applies. */ }
    close()
    if (choice === 'accepted' && enabled) start()
    else {
      stop()
      if (loaded) location.reload() // Unload the running tag, including its event handlers.
    }
  }
  function togglePrefs(show) {
    const prefs = banner.querySelector('.cookie-prefs')
    const toggle = banner.querySelector('[data-action="customize"]')
    if (!prefs || !toggle) return
    prefs.hidden = !show
    toggle.setAttribute('aria-expanded', String(show))
    toggle.textContent = show ? 'Salva preferenze' : 'Personalizza'
    if (show) banner.querySelector('#cookie-analytics').checked = read()?.choice === 'accepted'
  }
  // Non-modal: the page stays usable and the site's custom cursor stays above it.
  function open({ focus = true } = {}) {
    if (!isOpen()) {
      togglePrefs(false)
      banner.hidden = false
    }
    if (focus) {
      if (!banner.contains(document.activeElement)) returnFocus = document.activeElement
      banner.focus()
    }
  }
  function init() {
    banner = document.createElement('section')
    banner.className = 'cookie-banner'
    banner.hidden = true
    banner.tabIndex = -1
    banner.setAttribute('role', 'dialog')
    banner.setAttribute('aria-modal', 'false')
    banner.setAttribute('aria-labelledby', 'cookie-title')
    banner.setAttribute('aria-describedby', 'cookie-description')
    const closeIcon = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
    banner.innerHTML = enabled
      ? `<button class="cookie-close" type="button" data-choice="rejected" aria-label="Chiudi senza accettare">${closeIcon}</button>
      <p class="cookie-eyebrow">Privacy</p>
      <h2 id="cookie-title">Cookie su questo sito</h2>
      <p id="cookie-description">Usiamo solo strumenti tecnici necessari al funzionamento. Con il tuo consenso attiviamo anche Google Analytics, per capire in forma aggregata come viene visitato il sito. Nessuna pubblicità né profilazione. Chiudendo con la X continui senza cookie facoltativi.</p>
      <div class="cookie-prefs" id="cookie-prefs" hidden>
        <div class="cookie-pref"><div><strong>Tecnici</strong><small>Tema scelto e memoria della tua preferenza sui cookie.</small></div><span class="cookie-pref-fixed">Sempre attivi</span></div>
        <div class="cookie-pref"><label for="cookie-analytics"><strong>Statistici</strong><small>Google Analytics 4: visite di pagina, dopo il consenso, per 6 mesi.</small></label><span class="cookie-switch" data-cursor="hover"><input type="checkbox" role="switch" id="cookie-analytics" /><span></span></span></div>
      </div>
      <div class="cookie-actions">
        <button class="cookie-btn" type="button" data-choice="rejected">Rifiuta facoltativi</button>
        <button class="cookie-btn" type="button" data-choice="accepted">Accetta Analytics</button>
        <button class="cookie-btn cookie-btn-ghost" type="button" data-action="customize" aria-expanded="false" aria-controls="cookie-prefs">Personalizza</button>
      </div>
      <p class="cookie-links"><a href="./cookie-policy.html">Cookie Policy</a><span aria-hidden="true">·</span><a href="./privacy-policy.html">Privacy Policy</a></p>`
      : `<button class="cookie-close" type="button" data-choice="rejected" aria-label="Chiudi pannello">${closeIcon}</button>
      <p class="cookie-eyebrow">Privacy</p>
      <h2 id="cookie-title">Preferenze cookie</h2>
      <p id="cookie-description">Questo sito usa solo strumenti tecnici per funzionare e ricordare il tema scelto. La misurazione con Google Analytics non è attiva: non c'è nulla da accettare.</p>
      <div class="cookie-actions is-single"><button class="cookie-btn" type="button" data-choice="rejected">Chiudi</button></div>
      <p class="cookie-links"><a href="./cookie-policy.html">Cookie Policy</a><span aria-hidden="true">·</span><a href="./privacy-policy.html">Privacy Policy</a></p>`
    // First in the tab order, so keyboard users reach it before the page content.
    document.body.prepend(banner)
    banner.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => save(button.dataset.choice)))
    banner.querySelector('[data-action="customize"]')?.addEventListener('click', event => {
      if (event.currentTarget.getAttribute('aria-expanded') === 'true') save(banner.querySelector('#cookie-analytics').checked ? 'accepted' : 'rejected')
      else togglePrefs(true)
    })
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !isOpen()) return
      const active = document.activeElement
      if (banner.contains(active) || !active || active === document.body) { event.preventDefault(); save('rejected') }
    })
    document.addEventListener('click', event => {
      if (event.target.closest('[data-cookie-settings]')) { event.preventDefault(); open() }
    })
    window.EcoPrivacy = { open }
    window.addEventListener('ecoasfalti:open-privacy-settings', open)
    window.addEventListener('storage', event => { if (event.key === KEY || event.key === null) { stop(); location.reload() } })
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && loaded && read()?.choice !== 'accepted') { stop(); location.reload() }
    })
    if (enabled && read()?.choice === 'accepted') start()
    else {
      stop()
      if (enabled && !read()) open({ focus: false })
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true })
  else init()
})()
