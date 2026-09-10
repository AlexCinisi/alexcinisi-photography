'use client'

import { goToForm } from '@/lib/go-to-form'

interface AnchorCtaProps {
  /** id della sezione che ospita il form. */
  anchorId: string
  className?: string
  children: React.ReactNode
}

/**
 * La CTA di chiusura vive dentro componenti server (AdsClosing, la landing
 * della guida): serve un guscio client per lo scorrimento e il fuoco.
 * L'`href` resta vero — con JS spento, o su click centrale, si comporta
 * comunque da ancora.
 */
export default function AnchorCta({ anchorId, className, children }: AnchorCtaProps) {
  return (
    <a
      href={`#${anchorId}`}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        goToForm(anchorId)
      }}
    >
      {children}
    </a>
  )
}
