// Loader di next/image: il ridimensionamento lo fa la pipeline di Sanity, non Vercel.
// Perché: Vercel conta ogni variante come una trasformazione (5.000/mese su Hobby) e
// ricomprimeva un'immagine che Sanity aveva già compresso. Qui la compressione è una sola,
// dall'originale. Diagnosi: vault/01-Projects/Immagini-Vercel/stato.md

type LoaderArgs = { src: string; width: number; quality?: number }

const SANITY_CDN = 'cdn.sanity.io'

// Qualità quando il componente non la dichiara: è il default di next/image.
const DEFAULT_QUALITY = 75

export default function sanityImageLoader({ src, width, quality }: LoaderArgs): string {
  let url: URL
  try {
    url = new URL(src)
  } catch {
    return src
  }
  if (url.hostname !== SANITY_CDN || !url.pathname.startsWith('/images/')) return src

  const params = url.searchParams

  // Dimensioni dell'originale, scritte da Sanity nel nome del file: …-4000x3000.jpg.
  // Se c'è un ritaglio (rect=x,y,w,h), conta quello.
  const fromName = url.pathname.match(/-(\d+)x(\d+)\.[a-z0-9]+$/i)
  let baseW = fromName ? Number(fromName[1]) : Infinity
  let baseH = fromName ? Number(fromName[2]) : Infinity
  const rect = params.get('rect')?.split(',').map(Number)
  if (rect && rect.length === 4 && rect[2] > 0 && rect[3] > 0) {
    baseW = rect[2]
    baseH = rect[3]
  }

  const srcW = Number(params.get('w')) || 0
  const srcH = Number(params.get('h')) || 0
  const ratio = srcW && srcH ? srcH / srcW : 0

  // Tetto 1, l'originale: con un rapporto fissato pone un limite anche la sua altezza.
  const maxOriginal = ratio ? Math.min(baseW, Math.floor(baseH / ratio)) : baseW
  // Tetto 2, la larghezza scelta dal componente (w nell'URL, o quella che deriva da h da sola).
  // È anche il tetto che aveva Vercel, che non ingrandisce: la risoluzione resta quella di prima
  // e il peso non può crescere.
  const maxComponent = srcW || (srcH && Number.isFinite(baseW) ? Math.round((srcH * baseW) / baseH) : Infinity)
  const w = Math.max(1, Math.min(width, maxOriginal, maxComponent))

  params.set('w', String(w))
  if (ratio) {
    params.set('h', String(Math.round(w * ratio)))
  } else {
    // Solo altezza (loghi, badge): la larghezza guida e le proporzioni restano quelle originali.
    params.delete('h')
  }

  // Qualità: quella che il componente passa a next/image, cioè quella che Vercel applicava alla
  // fine (il q nell'URL Sanity veniva poi ricompresso, quindi non contava). Misurato il 24/11:
  // stessa qualità finale ma una sola compressione invece di due = più fedele all'originale
  // e circa il 6% più leggero. Alzarla migliora ancora, ma pesa (q80: +18%).
  params.set('q', String(quality ?? DEFAULT_QUALITY))

  // Formato fisso WebP, come serviva Vercel. Con auto=format Sanity sceglie AVIF, che a q75
  // ammorbidisce i dettagli fini (misurato il 24/11: −32% contro −3% del WebP, rispetto
  // all'originale senza perdite) e cambia nel tempo, perché lo genera in background.
  params.delete('auto')
  if (!params.has('fm')) params.set('fm', 'webp')

  return url.toString()
}
