import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test('messaggio breve spiegato prima di inviare; errore server visibile', async ({ page }) => {
  let sends = 0
  await page.route('**/api/contact.php', route => {
    sends++
    return route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ ok: false, message: 'Invio non riuscito. Codice: SMTP_AUTH_535.' }) })
  })
  await page.goto('/')
  await page.locator('#nome').fill('Mario Rossi')
  await page.locator('#email').fill('test@example.com')
  await page.locator('#messaggio').fill('test')
  await page.locator('#privacy_acceptance').check()
  await page.getByRole('button', { name: 'Invia richiesta' }).click()
  await expect(page.locator('.form-feedback')).toHaveText('Scrivi un messaggio di almeno 10 caratteri.')
  expect(sends).toBe(0)
  await page.locator('#messaggio').fill('Prova di invio dal sito.')
  await page.getByRole('button', { name: 'Invia richiesta' }).click()
  await expect(page.locator('.form-feedback')).toContainText('SMTP_AUTH_535')
  expect(sends).toBe(1)
})

test('HTML indicizzabile e FAQ coerenti anche senza JavaScript', async ({ browser }) => {
  const html = readFileSync('dist/index.html', 'utf8')
  expect(html).not.toContain('<div id="root"></div>')
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]))
  const faq = blocks.find(b => b['@type'] === 'FAQPage')
  expect(faq.mainEntity.length).toBe(JSON.parse(readFileSync('src/data/faqs.json', 'utf8')).length)
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.locator('h1')).toBeVisible()
  const second = page.locator('details').nth(1)
  await second.locator('summary').click()
  await expect(second).toHaveAttribute('open', '')
  await context.close()
})

test('nessun Analytics senza ID; preferenze disponibili sulle pagine', async ({ page }) => {
  const external = []
  page.on('request', req => { if (!req.url().startsWith('http://127.0.0.1:4173')) external.push(req.url()) })
  for (const path of ['/', '/privacy-policy.html', '/cookie-policy.html', '/grazie.html', '/404.html']) {
    await page.goto(path)
    await expect(page.locator('.cookie-dialog')).not.toBeVisible()
    await page.getByRole('button', { name: 'Preferenze cookie' }).first().click()
    await expect(page.locator('.cookie-dialog')).toBeVisible()
    await page.getByRole('button', { name: 'Chiudi', exact: true }).click()
  }
  expect(external).toEqual([])
})

test('Analytics richiede consenso; rifiuto e revoca bloccano il tag', async ({ page }) => {
  let tags = 0
  await page.route('**/privacy-policy.html*', async route => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace('name="eco-analytics-id" content=""', 'name="eco-analytics-id" content="G-TEST123"') })
  })
  await page.route('https://www.googletagmanager.com/**', route => {
    tags++
    return route.fulfill({ contentType: 'application/javascript', body: 'document.cookie="_ga=test; path=/"' })
  })
  await page.goto('/privacy-policy.html?email=private@example.com')
  await expect(page.locator('.cookie-dialog')).toBeVisible()
  expect(tags).toBe(0)
  await page.getByRole('button', { name: 'Rifiuta facoltativi' }).click()
  await page.reload()
  await expect(page.locator('.cookie-dialog')).not.toBeVisible()
  expect(tags).toBe(0)
  await page.getByRole('button', { name: 'Preferenze cookie' }).first().click()
  await page.getByRole('button', { name: 'Accetta Analytics' }).click()
  await expect.poll(() => tags).toBe(1)
  const events = await page.evaluate(() => window.dataLayer.map(x => Array.from(x)))
  expect(JSON.stringify(events)).not.toContain('private@example.com')
  await page.getByRole('button', { name: 'Preferenze cookie' }).first().click()
  await Promise.all([page.waitForEvent('load'), page.getByRole('button', { name: 'Rifiuta facoltativi' }).click()])
  expect(tags).toBe(1)
  expect(await page.context().cookies()).not.toEqual(expect.arrayContaining([expect.objectContaining({ name: '_ga' })]))
})

test('consenso scaduto su mobile: nessun tag, dialogo accessibile e chiusura con Escape', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 })
  await page.addInitScript(() => localStorage.setItem('ecoasfalti-consent-v2', JSON.stringify({ version: '2026-10-02', choice: 'accepted', at: Date.now() - 366 * 86400000 })))
  await page.route('**/cookie-policy.html', async route => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace('name="eco-analytics-id" content=""', 'name="eco-analytics-id" content="G-TEST123"') })
  })
  const tags = []
  await page.route('https://www.googletagmanager.com/**', route => { tags.push(route.request().url()); return route.abort() })
  await page.goto('/cookie-policy.html')
  await expect(page.getByRole('dialog')).toBeVisible()
  const bounds = await page.getByRole('dialog').boundingBox()
  expect(bounds.x).toBeGreaterThanOrEqual(0)
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(360)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  expect(tags).toEqual([])
})
