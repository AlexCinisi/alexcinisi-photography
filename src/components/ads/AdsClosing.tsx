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
      <p style={{ marginTop: 12 }}>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"
           style={{ color: 'var(--mid)', fontSize: '.7rem', textDecoration: 'none', marginRight: 16 }}>
          Privacy Policy
        </a>
        <a href="/cookie-policy" target="_blank" rel="noopener noreferrer"
           style={{ color: 'var(--mid)', fontSize: '.7rem', textDecoration: 'none' }}>
          Cookie Policy
        </a>
      </p>
    </section>
  )
}
