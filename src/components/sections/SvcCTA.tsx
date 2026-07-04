import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import type { ReactNode } from 'react'

interface SvcCTAProps { eyebrow?: string; heading?: ReactNode; body?: string; ctaText?: string; ctaHref?: string }

export default function SvcCTA({ eyebrow = 'Your Moment Awaits', heading, body, ctaText = 'Start the conversation', ctaHref = '/contact' }: SvcCTAProps) {
  return (
    <section className="svc-cta">
      <RevealOnScroll>
        <div className="svc-eyebrow" style={{ color: 'var(--accent)', textAlign: 'center' }}>{eyebrow}</div>
        <div className="svc-h2">{heading}</div>
        {body && <p>{body}</p>}
        <Link href={ctaHref} className="svc-cta-btn">{ctaText}</Link>
      </RevealOnScroll>
    </section>
  )
}
