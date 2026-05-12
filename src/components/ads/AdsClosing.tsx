interface AdsClosingProps {
  quote: string
  ctaText: string
}

export default function AdsClosing({ quote, ctaText }: AdsClosingProps) {
  return (
    <section className="ads-closing">
      <p className="ads-closing-quote">{quote}</p>
      <a href="#book" className="ads-closing-cta">{ctaText}</a>
      <p className="ads-closing-copyright">© 2026 Alex Cinisi Photography · Sicily, Italy</p>
    </section>
  )
}
