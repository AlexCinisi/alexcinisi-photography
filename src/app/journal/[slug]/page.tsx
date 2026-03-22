import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { journalPostBySlugQuery, allJournalSlugsQuery } from '@/lib/sanity/queries';
import { PortableText } from '@portabletext/react';
import Breadcrumb from '@/components/sections/Breadcrumb';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import FinalCTA from '@/components/sections/FinalCTA';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(allJournalSlugsQuery);
  return (slugs || []).map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(journalPostBySlugQuery, { slug });
  if (!post) return { title: 'Story Not Found' };
  
  const title = post.metaTitle || `${post.coupleName} — ${post.location} | Alex Cinisi Photography`;
  const description = post.metaDescription || `${post.coupleName}'s wedding at ${post.location}. Luxury destination wedding photography by Alex Cinisi.`;
  
  return {
    title,
    description,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      ...(post.heroImage && {
        images: [{ url: urlFor(post.heroImage).width(1200).height(630).url() }],
      }),
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function categoryLabel(cat: string) {
  const map: Record<string, string> = {
    wedding: 'Wedding', editorial: 'Editorial', engagement: 'Engagement',
    travel: 'Travel', bts: 'Behind the Scenes',
  };
  return map[cat] || cat;
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(journalPostBySlugQuery, { slug });
  if (!post) notFound();

  // Split gallery into two blocks for rhythm
  const gallery = post.gallery || [];
  const galleryBlock1 = gallery.slice(0, 6);   // First 6 photos → 3-column stagger
  const galleryBlock2 = gallery.slice(6);        // Rest → 1-wide + 2-side pattern

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.alexcinisiphotography.com" },
      { "@type": "ListItem", "position": 2, "name": "Journal", "item": "https://www.alexcinisiphotography.com/journal" },
      { "@type": "ListItem", "position": 3, "name": post.coupleName, "item": `https://www.alexcinisiphotography.com/journal/${slug}` }
    ]
  };

  // Article schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.coupleName + (post.subtitle ? ' — ' + post.subtitle : ''),
    "description": post.metaDescription || `${post.coupleName}'s wedding at ${post.location}`,
    "image": post.heroImage ? urlFor(post.heroImage).width(1200).height(800).url() : undefined,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Alex Cinisi",
      "url": "https://www.alexcinisiphotography.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alex Cinisi Photography",
      "url": "https://www.alexcinisiphotography.com"
    },
    "mainEntityOfPage": `https://www.alexcinisiphotography.com/journal/${slug}`
  };

  // ImageGallery schema (solo se ci sono foto)
  const gallerySchema = gallery.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": `${post.coupleName} Wedding Gallery`,
    "description": `Wedding photography gallery from ${post.location}`,
    "image": gallery.slice(0, 10).map((img: any, i: number) => ({
      "@type": "ImageObject",
      "url": urlFor(img).width(1200).height(800).url(),
      "name": img.alt || `${post.coupleName} wedding photo ${i + 1}`,
      "description": img.caption || `Wedding photography at ${post.location}`
    }))
  } : null;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {gallerySchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
      )}

      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Journal', href: '/journal' },
        { label: post.coupleName }
      ]} />

      {/* === SECTION 1: TITOLO TIPOGRAFICO (D&S-inspired) === */}
      <section className="s-white journal-title-section">
        <div className="max" style={{ maxWidth: 900 }}>
          <RevealOnScroll>
            <h1 className="journal-post-title">{post.coupleName}</h1>
            {post.subtitle && (
              <p className="journal-post-subtitle">{post.subtitle}</p>
            )}
            <p className="journal-post-meta">
              {post.locationRef ? (
                <Link href={`/locations/${post.locationRef.slug.current}`} style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid var(--rule)', paddingBottom: 1 }}>
                  {post.location}
                </Link>
              ) : (
                post.location
              )}
              {' · '}{formatDate(post.date)} · {categoryLabel(post.category)}
              {post.tags?.length > 0 && ` · ${post.tags.join(' · ')}`}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* === SECTION 2: HERO IMAGE (full-bleed, clean) === */}
      <section className="journal-hero">
        {post.heroImage ? (
          <Image
            src={urlFor(post.heroImage).width(1920).height(1080).url()}
            alt={post.heroImage?.alt || `${post.coupleName} wedding at ${post.location}`}
            width={1920}
            height={1080}
            priority
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(155deg, #E8E4DE, #D2CCC4)' }} />
        )}
      </section>

      {/* === SECTION 3: GALLERY BLOCK 1 — 3-column stagger (D&S-inspired) === */}
      {galleryBlock1.length > 0 && (
        <section className="s-white" style={{ padding: '80px 64px' }}>
          <div className="max">
            <div className="journal-gallery-stagger">
              {galleryBlock1.map((img: any, i: number) => (
                <RevealOnScroll key={i}>
                  <div className="journal-gallery-item">
                    <Image
                      src={urlFor(img).width(800).height(1067).url()}
                      alt={img.alt || `${post.coupleName} photo ${i + 1}`}
                      width={800}
                      height={1067}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === SECTION 4: PULL-QUOTE (D&S-inspired editorial break) === */}
      {post.subtitle && (
        <section className="s-white" style={{ padding: '40px 64px 80px' }}>
          <div className="max" style={{ maxWidth: 900 }}>
            <RevealOnScroll>
              <p className="journal-pullquote">{post.subtitle}</p>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* === SECTION 5: GALLERY BLOCK 2 — 1-wide + 2-side rhythm (GF-inspired) === */}
      {galleryBlock2.length > 0 && (
        <section className="s-white" style={{ padding: '0 64px 80px' }}>
          <div className="max">
            <div className="journal-gallery-rhythm">
              {galleryBlock2.map((img: any, i: number) => (
                <RevealOnScroll key={i}>
                  <div className={`journal-rhythm-item ${i % 3 === 0 ? 'wide' : 'half'}`}>
                    <Image
                      src={urlFor(img).width(i % 3 === 0 ? 1400 : 700).height(i % 3 === 0 ? 933 : 933).url()}
                      alt={img.alt || `${post.coupleName} photo ${galleryBlock1.length + i + 1}`}
                      width={i % 3 === 0 ? 1400 : 700}
                      height={933}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === SECTION 6: NARRATIVE TEXT (GF-inspired, SEO content) === */}
      {post.seoContent && (
        <section className="s-white" style={{ padding: '0 64px 72px' }}>
          <div className="max journal-body" style={{ maxWidth: 680 }}>
            <RevealOnScroll>
              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 48 }}>
                <PortableText value={post.seoContent} />
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* === SECTION 7: VENDOR CREDITS (nostro, per SEO) === */}
      {post.vendorCredits?.length > 0 && (
        <section className="s-white" style={{ padding: '0 64px 72px' }}>
          <div className="max" style={{ maxWidth: 680 }}>
            <RevealOnScroll>
              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 32 }}>
                <div className="f-label" style={{ marginBottom: 16 }}>Credits</div>
                <div className="journal-credits">
                  {post.vendorCredits.map((v: any, i: number) => (
                    <div key={i} className="journal-credit">
                      <span className="journal-credit-role">{v.role}</span>
                      {v.url ? (
                        <a href={v.url} target="_blank" rel="noopener noreferrer" className="journal-credit-name">{v.name}</a>
                      ) : (
                        <span className="journal-credit-name">{v.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* === SECTION 8: RELATED STORIES (nostro, 2 card grandi) === */}
      {post.relatedStories?.length > 0 && (
        <section className="s-grey pad">
          <div className="max">
            <RevealOnScroll className="sec-head" style={{ marginBottom: 48 }}>
              <div className="f-label">Continue Exploring</div>
            </RevealOnScroll>
            <div className="journal-related">
              {post.relatedStories.slice(0, 2).map((related: any) => (
                <RevealOnScroll key={related._id}>
                  <Link href={`/journal/${related.slug.current}`} className="journal-related-card">
                    <div className="journal-related-img">
                      {related.heroImage ? (
                        <Image
                          src={urlFor(related.heroImage).width(900).height(600).url()}
                          alt={related.heroImage?.alt || `${related.coupleName} wedding`}
                          width={900}
                          height={600}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(155deg, #E8E4DE, #D2CCC4)' }} />
                      )}
                    </div>
                    <h3 className="journal-related-title">{related.coupleName}</h3>
                    <p className="journal-related-location">{related.location}</p>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === SECTION 9: FINAL CTA === */}
      <FinalCTA />
    </main>
  );
}
