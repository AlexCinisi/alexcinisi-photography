'use client'

import { useEffect, useState } from 'react'

interface AdsHeaderProps {
  ctaText: string
  logoUrl?: string
  /** id dell'ancora a cui porta la CTA. Le due pagine ads usano 'book'. */
  anchorId?: string
  /** Barra scura anziché bianca: serve dove la hero è una foto scura a piena altezza. */
  dark?: boolean
}

export default function AdsHeader({ ctaText, logoUrl, anchorId = 'book', dark = false }: AdsHeaderProps) {
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 200 && y > lastY)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  const scrollToBook = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`lp-header ${dark ? 'lp-header--dark' : ''} ${hidden ? 'hidden' : ''}`}>
      {logoUrl ? (
        <img src={logoUrl} alt="Alex Cinisi Photography" className="lp-header-logo-svg" />
      ) : (
        <span className="lp-header-logo">Alex Cinisi</span>
      )}
      <button className="lp-header-cta" onClick={scrollToBook}>
        {ctaText}
      </button>
    </header>
  )
}
