// Vercel serverless function - bridges Node.js to TanStack Start's Web Fetch handler

let cachedFetchHandler

async function getHandler() {
  if (!cachedFetchHandler) {
    const mod = await import('../dist/server/server.js')
    // Built server exports: { default: { fetch } }
    cachedFetchHandler = mod.default?.fetch ?? mod.fetch
  }
  return cachedFetchHandler
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function nodeToWebRequest(req, body) {
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost'
  const url = `${protocol}://${host}${req.url}`

  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v))
    } else if (value) {
      headers.set(key, value)
    }
  }

  const init = { method: req.method, headers }
  if (req.method !== 'GET' && req.method !== 'HEAD' && body?.length) {
    init.body = body
  }

  return new Request(url, init)
}

export default async function handler(req, res) {
  try {
    const fn = await getHandler()
    const body = await readBody(req)
    const webReq = nodeToWebRequest(req, body)
    const webRes = await fn(webReq)

    res.statusCode = webRes.status
    webRes.headers.forEach((value, key) => res.setHeader(key, value))

    if (webRes.body) {
      const reader = webRes.body.getReader()
      const pump = async () => {
        const { done, value } = await reader.read()
        if (done) return res.end()
        res.write(value)
        return pump()
      }
      await pump()
    } else {
      res.end()
    }
  } catch (err) {
    console.error('[vercel handler error]', err)
    res.statusCode = 500
    res.end('Internal Server Error')
  }
}
