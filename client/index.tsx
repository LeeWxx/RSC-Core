import { createRoot } from 'react-dom/client'
import { createFromFetch } from 'react-server-dom-webpack/client'

async function main() {
  const response = await fetch('/rsc')
  const streamElement = await createFromFetch(response)
  const container = document.getElementById('root')
  if (!container) return
  const root = createRoot(container)
  root.render(streamElement)
}

main().catch((err) => console.error(err))
