import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface FilmSectionProps {
    image?: any;
}

export default function FilmSection({ image }: FilmSectionProps) {
    return (
        <div className="film-wrap s-warm">
            <div className="film-media">
                <div className="film-single-img">
                    {image ? (
                        <Image
                            src={urlFor(image).width(800).quality(85).auto('format').url()}
                            alt="Film photography by Alex Cinisi"
                            width={600}
                            height={900}
                            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                        />
                    ) : (
                        <div className="film-img-ph" />
                    )}
                </div>
            </div>
            <RevealOnScroll className="film-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>Film &amp; Digital</div>
                <div className="h2" style={{ color: 'var(--off-white)', marginBottom: '22px' }}>The Best of<br /><em>Both Worlds</em></div>
                <p>Every wedding receives the richness of digital mastery — vibrant colours, flawless detail, fast turnaround. For those who want something even more special, medium-format film adds an unmistakable warmth, grain, and timelessness that digital cannot replicate.</p>
                <p>Film photography is available as a bespoke enhancement to any package. The two mediums complement each other beautifully — giving you a gallery that feels both contemporary and eternal.</p>
                <Link href="#invest" className="btn-fill" style={{ background: 'var(--off-white)', color: 'var(--ink)', marginTop: '22px' }}>See Investment Details</Link>
            </RevealOnScroll>
        </div>
    );
}
