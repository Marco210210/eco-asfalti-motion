/* Shared by the home and static pages. No third-party requests before opt-in. */
(() => {
  const KEY = 'ecoasfalti-consent-v2'
  const VERSION = '2026-10-02'
  const id = document.querySelector('meta[name="eco-analytics-id"]')?.content || ''
  const enabled = /^G-[A-Z0-9]+$/.test(id)
  let memory = null
  let loaded = false
  let expiryTimer
  let returnFocus
  let dialog
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
  function close() { dialog.close(); returnFocus?.focus?.() }
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
  function open() {
    if (dialog.open) return
    returnFocus = document.activeElement
    dialog.showModal()
  }
  function init() {
    dialog = document.createElement('dialog')
    dialog.className = 'cookie-dialog'
    dialog.setAttribute('aria-labelledby', 'cookie-title')
    dialog.setAttribute('aria-describedby', 'cookie-description')
    dialog.innerHTML = `<h2 id="cookie-title">Preferenze cookie</h2>
      <p id="cookie-description">${enabled ? 'Usiamo strumenti tecnici necessari al sito. Solo se acconsenti, Google Analytics misura le visite. Puoi rifiutare e continuare a navigare.' : 'Questo sito usa solo strumenti tecnici per funzionare e ricordare il tema scelto. La misurazione con Google Analytics non è attiva.'}</p>
      <p>Puoi rivedere la scelta in qualsiasi momento da “Preferenze cookie” nel footer.</p>
      <p><a href="./cookie-policy.html">Cookie Policy</a> · <a href="./privacy-policy.html">Privacy Policy</a></p>
      <div class="cookie-actions"><button type="button" data-choice="rejected">${enabled ? 'Rifiuta facoltativi' : 'Chiudi'}</button>${enabled ? '<button type="button" data-choice="accepted">Accetta Analytics</button>' : ''}</div>`
    document.body.appendChild(dialog)
    dialog.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => save(button.dataset.choice)))
    dialog.addEventListener('cancel', event => { event.preventDefault(); save('rejected') })
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
      if (enabled && !read()) open()
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true })
  else init()
})()
