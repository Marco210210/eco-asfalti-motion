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
  const server = await createServer({ mode: 'production', server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx')
    const markup = renderToString(React.createElement(App))
    const file = await readFile('dist/index.html', 'utf8')
    await writeFile('dist/index.html', file.replace('<div id="root"></div>', `<div id="root">${markup}</div>`))
  } finally { await server.close() }
}
for (const file of (await readdir('dist')).filter(name => name.endsWith('.html'))) {
  let html = await readFile(`dist/${file}`, 'utf8')
  html = html.replace(/<meta name="eco-analytics-id" content="[^"]*"\s*\/>/, `<meta name="eco-analytics-id" content="${preview ? '' : analytics}" />`)
  if (preview) html = html.replace(/<meta name="robots" content="[^"]*"\s*\/>/, '<meta name="robots" content="noindex, nofollow" />')
  await writeFile(`dist/${file}`, html)
}
if (preview) {
  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n')
  await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>')
}
console.log(preview ? 'Preview: noindex, no Analytics, no prerendered business content.' : 'Production: full HTML prerendered; privacy settings applied to every page.')
