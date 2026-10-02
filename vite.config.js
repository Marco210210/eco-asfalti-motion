import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

const faqs = JSON.parse(readFileSync(new URL('./src/data/faqs.json', import.meta.url), 'utf8'))

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), {
    name: 'eco-structured-content',
    transformIndexHtml(html) {
      const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }
      return html.replace(/<script id="faq-schema" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="faq-schema" type="application/ld+json">${JSON.stringify(faq).replace(/</g, '\\u003c')}</script>`)
    },
  }],
  server: {
    port: 5177,
    open: true,
  },
})
