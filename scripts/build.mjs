import { build, createServer, loadEnv } from 'vite'
import { readFile, writeFile, readdir } from 'node:fs/promises'
import React from 'react'
import { renderToString } from 'react-dom/server'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const preview = env.VITE_ENABLE_ACCESS_GATE === 'true'
const analytics = env.VITE_GA_MEASUREMENT_ID?.trim() || ''
if (analytics && !/^G-[A-Z0-9]+$/.test(analytics)) throw new Error('Invalid GA4 measurement ID')
await build()
if (!preview) {
  // Render the same React content at build time; no Node server needed on Aruba.
  const server = await createServer({ mode: 'production', server: { middlewareMode: true, watch: null }, appType: 'custom' })
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx')
    const markup = renderToString(React.createElement(App))
    const file = await readFile('dist/index.html', 'utf8')
    await writeFile('dist/index.html', file.replace('<div id="root"></div>', `<div id="root">${markup}</div>`))
  } finally { await server.close() }
}
for (const file of (await readdir('dist')).filter(name => name.endsWith('.html'))) {
  let html = await readFile(`dist/${file}`, 'utf8')
  // The single-page entry needs all of this stylesheet immediately. Inlining
  // removes its blocking round trip on slow mobile connections.
  for (const match of [...html.matchAll(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"<>]+\.css)">/g)]) {
    const css = await readFile(`dist/${match[1]}`, 'utf8')
    html = html.replace(match[0], `<style>${css.replaceAll('</style', '<\\/style')}</style>`)
  }
  // Small local styles inline remove two blocking requests from the first render.
  for (const path of ['fonts/fonts.css', 'privacy-consent.css']) {
    let css = await readFile(`dist/${path}`, 'utf8')
    if (path.startsWith('fonts/')) css = css.replace(/url\((['"]?)\.\/([^)'"\s]+)\1\)/g, 'url("./fonts/$2")')
    html = html.replace(`<link rel="stylesheet" href="./${path}" />`, `<style>${css}</style>`)
  }
  html = html.replace(/<meta name="eco-analytics-id" content="[^"]*"\s*\/>/, `<meta name="eco-analytics-id" content="${preview ? '' : analytics}" />`)
  if (preview) html = html.replace(/<meta name="robots" content="[^"]*"\s*\/>/, '<meta name="robots" content="noindex, nofollow" />')
  await writeFile(`dist/${file}`, html)
}
if (preview) {
  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n')
  await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>')
}
console.log(preview ? 'Preview: noindex, no Analytics, no prerendered business content.' : 'Production: full HTML prerendered; privacy settings applied to every page.')
