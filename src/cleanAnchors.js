/* One-page site: in-page links scroll to their section without writing
   "#section" into the address bar, so the URL stays the plain home URL. */
function scrollToSection(hash, smooth) {
  let id = ''
  try { id = decodeURIComponent(hash.slice(1)) } catch (_) { return false }
  const target = id && document.getElementById(id)
  if (!target) return false
  const behavior = smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto'
  if (id === 'hero') window.scrollTo({ top: 0, behavior })
  else target.scrollIntoView({ behavior, block: 'start' })
  // Move keyboard focus with the scroll, as a native anchor jump would.
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  return true
}

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const link = event.target.closest?.('a[href^="#"]')
  if (!link || link.target) return
  if (scrollToSection(link.getAttribute('href'), true)) event.preventDefault()
})

// Arriving from another page (e.g. "Torna ai contatti"): reach the section, then drop the hash.
if (location.hash) {
  requestAnimationFrame(() => {
    if (scrollToSection(location.hash, false)) history.replaceState(history.state, '', location.pathname + location.search)
  })
}
