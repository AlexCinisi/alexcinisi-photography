import { PortableText } from '@portabletext/react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

interface GuideIntroProps { eyebrow?: string; body?: any }

export default function GuideIntro({ eyebrow, body }: GuideIntroProps) {
  if (!body) return null
  return (
    <section className="s-white pad">
      <div className="max">
        <RevealOnScroll className="guide-intro">
          {eyebrow && <div className="svc-eyebrow">{eyebrow}</div>}
          <div className="guide-intro-body">
            <PortableText value={body} />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
