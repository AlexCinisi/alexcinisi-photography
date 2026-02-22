'use client'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface PhotoPauseProps {
    image?: any  // Sanity image object
    alt?: string
}

export default function PhotoPause({ image, alt = 'Wedding photography by Alex Cinisi' }: PhotoPauseProps) {
    return (
        <div className="photo-pause">
            {image ? (
                <Image
                    src={urlFor(image).width(2400).quality(85).auto('format').url()}
                    alt={alt}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
            ) : (
                <div className="photo-pause-ph" />
            )}
        </div>
    )
}
