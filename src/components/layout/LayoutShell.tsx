'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import StickyMobileCTA from './StickyMobileCTA'

interface LayoutShellProps {
  children: React.ReactNode;
  logo?: any;
  logoFooter?: any;
}

export default function LayoutShell({ children, logo, logoFooter }: LayoutShellProps) {
  const pathname = usePathname()
  const isAds = pathname?.startsWith('/ads')

  return (
    <>
      {!isAds && <Nav logo={logo} />}
      {children}
      {!isAds && <Footer logo={logo} logoFooter={logoFooter} />}
      {!isAds && <StickyMobileCTA />}
    </>
  )
}
