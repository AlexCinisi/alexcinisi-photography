'use client'
import Image from 'next/image'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'

interface PhotoPauseProps {
    image?: any // Sanity image object
    alt?: string
    fallbackGradient?: string
}

export default function PhotoPause({
    image,
    alt = 'Wedding photography by Alex Cinisi',
    fallbackGradient = 'linear-gradient(160deg, #c4baa8 0%, #a89e8c 40%, #8c836e 100%)'
}: PhotoPauseProps) {
    return (
        <section className="photo-pause">
            {image ? (
                <Image
                    src={urlFor(image).fit('crop').crop('focalpoint').width(2400).quality(85).auto('format').url()}
                    alt={alt}
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                        objectPosition: getHotspotPosition(image)
                    }}
                    priority={false}
                />
            ) : (
                <div className="photo-pause-ph" style={{ background: fallbackGradient }} />
            )}
        </section>
    )
}
