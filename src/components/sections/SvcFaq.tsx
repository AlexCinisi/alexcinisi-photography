import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'
import type { ReactNode } from 'react'

interface FaqEntry { question: string; answer: string }
interface SvcFaqProps {
  label?: string
  heading?: ReactNode
  items: FaqEntry[]
  background?: 'pearl' | 'white'
}

export default function SvcFaq({ label = 'Questions', heading, items, background = 'pearl' }: SvcFaqProps) {
  if (!items?.length) return null
  return (
    <section className={background === 'pearl' ? 's-pearl pad' : 's-white pad'}>
      <div className="max">
        {heading && <SectionHead as="h2" label={label} title={heading} center />}
        <RevealOnScroll className="faq-wrap d1">
          {items.map((f, i) => (
            <details key={i} className="faq-nat">
              <summary className="faq-nat-q">
                <span className="faq-nat-q-t">{f.question}</span>
                <span className="faq-nat-ico" aria-hidden="true">+</span>
              </summary>
              <div className="faq-nat-a"><p>{f.answer}</p></div>
            </details>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
