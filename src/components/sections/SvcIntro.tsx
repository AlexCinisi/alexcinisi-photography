import { PortableText } from '@portabletext/react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

interface SvcIntroProps {
  heading?: string
  body?: any
}

export default function SvcIntro({ heading, body }: SvcIntroProps) {
  if (!body) return null
  return (
    <section className="svc-intro">
      <div className="svc-wrap">
        <RevealOnScroll>
          {heading && <div className="svc-h2">{heading}</div>}
          <div className="svc-body">
            <PortableText value={body} />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
