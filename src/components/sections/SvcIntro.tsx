import { PortableText } from '@portabletext/react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface SvcIntroProps {
  heading?: string
  body?: any
}

export default function SvcIntro({ heading, body }: SvcIntroProps) {
  if (!body) return null
  return (
    <section className="svc-intro">
      <div className="svc-wrap">
        {heading && <SectionHead as="h2" title={heading} />}
        <RevealOnScroll>
          <div className="svc-body">
            <PortableText value={body} />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
