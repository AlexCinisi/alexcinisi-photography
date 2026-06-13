'use client'

import { useEffect, useState } from 'react'

interface AdsHeaderProps {
  ctaText: string
  logoUrl?: string
}

export default function AdsHeader({ ctaText, logoUrl }: AdsHeaderProps) {
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
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`ads-header ${hidden ? 'hidden' : ''}`}>
      {logoUrl ? (
        <img src={logoUrl} alt="Alex Cinisi Photography" className="ads-header-logo-svg" />
      ) : (
        <span className="ads-header-logo">Alex Cinisi</span>
      )}
      <button className="ads-header-cta" onClick={scrollToBook}>
        {ctaText}
      </button>
    </header>
  )
}
