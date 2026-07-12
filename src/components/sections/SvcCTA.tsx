import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'
import type { ReactNode } from 'react'

interface SvcCTAProps { eyebrow?: string; heading?: ReactNode; body?: string; ctaText?: string; ctaHref?: string }

export default function SvcCTA({ eyebrow = 'Your Moment Awaits', heading, body, ctaText = 'Start the conversation', ctaHref = '/contact' }: SvcCTAProps) {
  return (
    <section className="svc-cta">
      {heading && <SectionHead as="h2" label={eyebrow} title={heading} center />}
      <RevealOnScroll>
        {body && <p>{body}</p>}
        <Link href={ctaHref} className="svc-cta-btn">{ctaText}</Link>
      </RevealOnScroll>
    </section>
  )
}
