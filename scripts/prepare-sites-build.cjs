const fs = require('fs')
const path = require('path')

const root = process.cwd()
const distDir = path.join(root, 'dist')
const serverDir = path.join(distDir, 'server')
const openAiDistDir = path.join(distDir, '.openai')

fs.mkdirSync(serverDir, { recursive: true })
fs.mkdirSync(openAiDistDir, { recursive: true })
fs.copyFileSync(path.join(root, '.openai', 'hosting.json'), path.join(openAiDistDir, 'hosting.json'))

fs.writeFileSync(
  path.join(serverDir, 'index.js'),
  `export default {
  async fetch(request, env) {
    if (!env || !env.ASSETS) {
      return new Response('Static asset binding is unavailable.', { status: 500 })
    }

    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404) {
      return response
    }

    const url = new URL(request.url)
    if (url.pathname.includes('.')) {
      return response
    }

    url.pathname = '/index.html'
    return env.ASSETS.fetch(new Request(url, request))
  },
}
`
)
