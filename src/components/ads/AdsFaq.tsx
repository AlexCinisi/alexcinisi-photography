'use client'

import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface AdsFaqProps {
  faqs: FaqItem[]
  heading?: string
}

export default function AdsFaq({ faqs, heading = 'Questions, Answered' }: AdsFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="ads-faq" style={{ textAlign: 'center' }}>
      <div className="ads-eyebrow"><span>FAQ</span></div>
      <h2 className="ads-h2">{heading}</h2>
      <div className="ads-faq-list" style={{ textAlign: 'left' }}>
        {faqs.map((faq, i) => (
          <div key={i} className={`ads-faq-item ${openIndex === i ? 'open' : ''}`}>
            <button
              className="ads-faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              {faq.question}
              <span className="ads-faq-icon">+</span>
            </button>
            <div className="ads-faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
