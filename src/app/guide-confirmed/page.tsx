import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { guideConfirmedQuery } from '@/lib/sanity/queries'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

// ⚠️ Guscio spoglio: LayoutShell NON monta Nav, Footer, StickyMobileCTA né i
// due JSON-LD su questa route (isBareShell). La pagina è la finestra intera —
// non c'è chrome che chiuda il fondo.
// Pagina di ringraziamento: raggiungibile solo via redirect da GuideForm.
// L'evento CompleteRegistration è cablato in GTM sul page view di questa
// route — nessun dataLayer.push nel form, per non contare due volte.

export const revalidate = 3600

export const metadata: Metadata = {
  title: { absolute: 'Thank you — Alex Cinisi Photography' },
  description: 'Your Sicily Wedding Guide is on its way.',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default async function GuideConfirmed() {
  const data = await client.fetch(guideConfirmedQuery).catch(() => null)

  const heading = data?.tyHeading || "It's on its way ✦"
  const body = data?.tyBody || "Your Sicily Wedding Guide is heading to your inbox right now. If it doesn't appear within a few minutes, check your spam folder — and drag it to your inbox so we don't lose each other."
  const softCtaLabel = data?.tySoftCtaLabel || "Can't wait? Check your date now →"
  const videoUrl = data?.tyVideo?.asset?.url || null

  return (
    <main className="pad-lg s-white">
      <RevealOnScroll style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <h1 className="h2-lg">{heading}</h1>

        <p style={{ marginTop: '24px', lineHeight: 1.7, color: 'var(--mid)' }}>{body}</p>

        {videoUrl && (
          <video
            src={videoUrl}
            controls
            playsInline
            preload="metadata"
            style={{ width: '100%', marginTop: '32px', display: 'block' }}
          />
        )}

        <p style={{ marginTop: '36px' }}>
          <Link href="/call" className="btn-text">
            {softCtaLabel}
          </Link>
        </p>
      </RevealOnScroll>
    </main>
  )
}
