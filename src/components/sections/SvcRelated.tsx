import Image from 'next/image'
import Link from 'next/link'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'
import SectionHead from '@/components/ui/SectionHead'
import type { ReactNode } from 'react'

interface SvcRelatedPost { slug?: string; heroImage?: any; coupleName?: string; title?: string; location?: string }
interface SvcRelatedProps { eyebrow?: string; heading?: ReactNode; posts?: SvcRelatedPost[] }

export default function SvcRelated({ eyebrow = 'Real Stories', heading, posts }: SvcRelatedProps) {
  if (!posts?.length) return null
  return (
    <section className="svc-related">
      <div className="svc-wrap">
        <SectionHead as="h2" label={eyebrow} title={heading} />
        <div className={posts.length > 2 ? 'svc-rel-slider' : 'svc-rel-grid'}>
          {posts.map((post, i) => (
            post?.slug && (
              <Link key={i} href={`/journal/${post.slug}`} className="svc-rel-card">
                {post.heroImage?.asset && (
                  <div className="svc-rel-img">
                    <Image
                      src={urlFor(post.heroImage).width(1000).auto('format').quality(85).url()}
                      alt={post.heroImage.alt || post.title || ''}
                      fill sizes="(max-width: 860px) 80vw, 33vw"
                      style={{ objectFit: 'cover', objectPosition: getHotspotPosition(post.heroImage) }}
                    />
                  </div>
                )}
                <div className="svc-rel-title">{post.coupleName || post.title}</div>
                {post.location && <div className="svc-rel-loc">{post.location}</div>}
              </Link>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
