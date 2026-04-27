import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { urlFor, getHotspotPosition } from '@/lib/sanity/image';
import {
  journalPostBySlugQuery,
  allJournalSlugsQuery,
} from '@/lib/sanity/queries';
import { PortableText } from '@portabletext/react';
import Breadcrumb from '@/components/sections/Breadcrumb';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import FinalCTA from '@/components/sections/FinalCTA';

export const revalidate = 3600;

/* ──────────────────────────────────────
   Static Params
   ────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await client.fetch(allJournalSlugsQuery);
  return (slugs || []).map((s: { slug: string }) => ({ slug: s.slug }));
}

/* ──────────────────────────────────────
   SEO Metadata
   ────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(journalPostBySlugQuery, { slug });
  if (!post) return { title: 'Story Not Found' };

  const title =
    post.metaTitle ||
    `${post.coupleName} — ${post.location} | Alex Cinisi Photography`;
  const description =
    post.metaDescription ||
    `${post.coupleName}'s wedding at ${post.location}. Luxury destination wedding photography by Alex Cinisi.`;

  return {
    title,
    description,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      ...(post.heroImage && {
        images: [
          {
            url: urlFor(post.heroImage)
              .width(1200)
              .height(630)
              .quality(90)
              .auto('format')
              .url(),
          },
        ],
      }),
    },
  };
}

/* ──────────────────────────────────────
   Helpers
   ────────────────────────────────────── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function categoryLabel(cat: string) {
  const map: Record<string, string> = {
    wedding: 'Wedding',
    editorial: 'Editorial',
    engagement: 'Engagement',
    travel: 'Travel',
    bts: 'Behind the Scenes',
  };
  return map[cat] || cat;
}

/* ──────────────────────────────────────
   Gallery Layout Engine
   
   Reads each image's native aspect ratio
   and the fullWidth toggle from Sanity.
   Builds rows automatically:
   
   - Landscape (ratio > 1.2)              → full-width row
   - Portrait/square with fullWidth=true   → full-width row (centered, max 70%)
   - Two consecutive non-fullWidth portraits → side-by-side pair
   - Lone portrait at end                  → centered at 60%
   ────────────────────────────────────── */
type GalleryImage = {
  _key?: string;
  alt?: string;
  caption?: string;
  fullWidth?: boolean;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: { width: number; height: number; aspectRatio: number };
      lqip?: string;
    };
  };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

type GalleryRow =
  | { type: 'full'; img: GalleryImage }
  | { type: 'full-portrait'; img: GalleryImage }
  | { type: 'pair'; imgs: [GalleryImage, GalleryImage] }
  | { type: 'centered'; img: GalleryImage };

function buildGalleryRows(images: GalleryImage[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let i = 0;

  while (i < images.length) {
    const img = images[i];
    const ratio = img.asset?.metadata?.dimensions?.aspectRatio ?? 1;
    const isLandscape = ratio > 1.2;

    // Landscape → always full width
    if (isLandscape) {
      rows.push({ type: 'full', img });
      i++;
      continue;
    }

    // Portrait/square with fullWidth toggle ON → full-width centered
    if (img.fullWidth) {
      rows.push({ type: 'full-portrait', img });
      i++;
      continue;
    }

    // Portrait/square without fullWidth → try to pair with next
    const next = images[i + 1];
    if (next) {
      const nextRatio =
        next.asset?.metadata?.dimensions?.aspectRatio ?? 1;
      const nextIsLandscape = nextRatio > 1.2;

      if (!nextIsLandscape && !next.fullWidth) {
        rows.push({ type: 'pair', imgs: [img, next] });
        i += 2;
        continue;
      }
    }

    // Lone portrait → centered
    rows.push({ type: 'centered', img });
    i++;
  }

  return rows;
}

/* ──────────────────────────────────────
   Image URL builder — native proportions
   
   quality(90) + auto('format') = WebP/AVIF
   at near-lossless quality. WebP at q90
   is SMALLER than JPEG at q85, with
   visually superior results. Best of
   both worlds: maximum quality, smaller
   file size.
   ────────────────────────────────────── */
function galleryImageUrl(img: GalleryImage, maxWidth: number = 2400) {
  return urlFor(img)
    .width(maxWidth)
    .quality(90)
    .auto('format')
    .fit('max')
    .url();
}

function getImageDimensions(img: GalleryImage, targetWidth: number = 2400) {
  const dims = img.asset?.metadata?.dimensions;
  if (!dims) return { width: targetWidth, height: Math.round(targetWidth * 0.75) };
  const scale = targetWidth / dims.width;
  return {
    width: Math.round(dims.width * scale),
    height: Math.round(dims.height * scale),
  };
}

/* Get LQIP blur placeholder from Sanity metadata */
function getBlurData(img: GalleryImage): string | undefined {
  return img.asset?.metadata?.lqip || undefined;
}

/* ──────────────────────────────────────
   Import hotspot helper (same used in HeroLocation)
   ────────────────────────────────────── */
// Using getHotspotPosition imported from '@/lib/sanity/image'

/* ──────────────────────────────────────
   Page Component
   ────────────────────────────────────── */
export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(journalPostBySlugQuery, { slug });
  if (!post) notFound();

  const gallery: GalleryImage[] = post.gallery || [];
  const rows = buildGalleryRows(gallery);

  // Split rows for pull-quote insertion at ~40%
  const pullQuoteIndex = Math.floor(rows.length * 0.4);
  const rowsBefore = rows.slice(0, pullQuoteIndex);
  const rowsAfter = rows.slice(pullQuoteIndex);

  /* ── JSON-LD Schemas ── */
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.alexcinisiphotography.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Journal',
        item: 'https://www.alexcinisiphotography.com/journal',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.coupleName,
        item: `https://www.alexcinisiphotography.com/journal/${slug}`,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      post.coupleName + (post.subtitle ? ' — ' + post.subtitle : ''),
    description:
      post.metaDescription ||
      `${post.coupleName}'s wedding at ${post.location}`,
    image: post.heroImage
      ? urlFor(post.heroImage)
          .width(1200)
          .quality(90)
          .auto('format')
          .url()
      : undefined,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Alex Cinisi',
      url: 'https://www.alexcinisiphotography.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alex Cinisi Photography',
      url: 'https://www.alexcinisiphotography.com',
    },
    mainEntityOfPage: `https://www.alexcinisiphotography.com/journal/${slug}`,
  };

  const gallerySchema =
    gallery.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: `${post.coupleName} Wedding Gallery`,
          description: `Wedding photography gallery from ${post.location}`,
          image: gallery
            .slice(0, 10)
            .map((img: GalleryImage, i: number) => ({
              '@type': 'ImageObject',
              url: galleryImageUrl(img, 1200),
              name:
                img.alt ||
                `${post.coupleName} wedding photo ${i + 1}`,
              description:
                img.caption ||
                `Wedding photography at ${post.location}`,
            })),
        }
      : null;

  /* ── Render helper for gallery rows ── */
  function renderRow(row: GalleryRow, index: number) {
    switch (row.type) {
      case 'full': {
        const dims = getImageDimensions(row.img, 2400);
        const blur = getBlurData(row.img);
        return (
          <RevealOnScroll key={`row-${index}`}>
            <div className="journal-gallery-row full">
              <Image
                src={galleryImageUrl(row.img, 2400)}
                alt={row.img.alt || `${post.coupleName} photo`}
                width={dims.width}
                height={dims.height}
                sizes="(max-width: 768px) 100vw, 1400px"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
                {...(blur ? { placeholder: 'blur' as const, blurDataURL: blur } : {})}
                loading="lazy"
              />
            </div>
          </RevealOnScroll>
        );
      }
      case 'full-portrait': {
        const dims = getImageDimensions(row.img, 1800);
        const blur = getBlurData(row.img);
        return (
          <RevealOnScroll key={`row-${index}`}>
            <div className="journal-gallery-row full-portrait">
              <Image
                src={galleryImageUrl(row.img, 1800)}
                alt={row.img.alt || `${post.coupleName} photo`}
                width={dims.width}
                height={dims.height}
                sizes="(max-width: 768px) 100vw, 980px"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
                {...(blur ? { placeholder: 'blur' as const, blurDataURL: blur } : {})}
                loading="lazy"
              />
            </div>
          </RevealOnScroll>
        );
      }
      case 'pair': {
        const dims0 = getImageDimensions(row.imgs[0], 1400);
        const dims1 = getImageDimensions(row.imgs[1], 1400);
        const blur0 = getBlurData(row.imgs[0]);
        const blur1 = getBlurData(row.imgs[1]);
        return (
          <RevealOnScroll key={`row-${index}`}>
            <div className="journal-gallery-row pair">
              <div className="journal-gallery-pair-item">
                <Image
                  src={galleryImageUrl(row.imgs[0], 1400)}
                  alt={
                    row.imgs[0].alt || `${post.coupleName} photo`
                  }
                  width={dims0.width}
                  height={dims0.height}
                  sizes="(max-width: 768px) 100vw, 680px"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                  {...(blur0 ? { placeholder: 'blur' as const, blurDataURL: blur0 } : {})}
                  loading="lazy"
                />
              </div>
              <div className="journal-gallery-pair-item">
                <Image
                  src={galleryImageUrl(row.imgs[1], 1400)}
                  alt={
                    row.imgs[1].alt || `${post.coupleName} photo`
                  }
                  width={dims1.width}
                  height={dims1.height}
                  sizes="(max-width: 768px) 100vw, 680px"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                  {...(blur1 ? { placeholder: 'blur' as const, blurDataURL: blur1 } : {})}
                  loading="lazy"
                />
              </div>
            </div>
          </RevealOnScroll>
        );
      }
      case 'centered': {
        const dims = getImageDimensions(row.img, 1400);
        const blur = getBlurData(row.img);
        return (
          <RevealOnScroll key={`row-${index}`}>
            <div className="journal-gallery-row centered">
              <Image
                src={galleryImageUrl(row.img, 1400)}
                alt={row.img.alt || `${post.coupleName} photo`}
                width={dims.width}
                height={dims.height}
                sizes="(max-width: 768px) 100vw, 840px"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
                {...(blur ? { placeholder: 'blur' as const, blurDataURL: blur } : {})}
                loading="lazy"
              />
            </div>
          </RevealOnScroll>
        );
      }
    }
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      {gallerySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(gallerySchema),
          }}
        />
      )}

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Journal', href: '/journal' },
          { label: post.coupleName },
        ]}
      />

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — 100vh full-screen overlay
          Same pattern as HeroLocation / Homepage hero.
          Uses .hero + .hero-bg + .hero-content classes.
          heroTextDark toggles .hero--dark-text for
          bright hero images.
          ═══════════════════════════════════════════ */}
      <section
        className={`hero hero--journal${post.heroTextDark ? ' hero--dark-text' : ''}`}
      >
        {/* Background image — identical to HeroLocation */}
        <div className="hero-bg">
          {post.heroImage ? (
            <Image
              src={urlFor(post.heroImage)
                .fit('crop')
                .crop('focalpoint')
                .width(2400)
                .auto('format')
                .quality(90)
                .url()}
              alt={
                post.heroImage?.alt ||
                `${post.coupleName} wedding at ${post.location}`
              }
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: getHotspotPosition(post.heroImage),
              }}
              priority={true}
              quality={90}
            />
          ) : (
            <div
              className="iph"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: 1,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                width={48}
                height={48}
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Hero Photo
            </div>
          )}
        </div>

        {/* Content overlay — couple name + meta */}
        <div className="hero-content journal-hero-content">
          <h1 className="journal-hero-title">{post.coupleName}</h1>
          {post.subtitle && (
            <p className="journal-hero-subtitle">{post.subtitle}</p>
          )}
          <p className="journal-hero-meta">
            {post.locationRef ? (
              <Link
                href={`/locations/${post.locationRef.slug.current}`}
                className="journal-hero-meta-link"
              >
                {post.location}
              </Link>
            ) : (
              post.location
            )}
            {' · '}
            {formatDate(post.date)}
            {' · '}
            {categoryLabel(post.category)}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: GALLERY — first half (~40%)
          ═══════════════════════════════════════════ */}
      {rowsBefore.length > 0 && (
        <section className="s-white journal-gallery-section">
          <div className="journal-gallery">
            {rowsBefore.map((row, i) => renderRow(row, i))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 3: PULL-QUOTE (only if pullQuote
          field is filled in Sanity — never subtitle)
          ═══════════════════════════════════════════ */}
      {post.pullQuote && (
        <section
          className="s-white"
          style={{ padding: '40px 64px 60px' }}
        >
          <div className="max" style={{ maxWidth: 900 }}>
            <RevealOnScroll>
              <p className="journal-pullquote">{post.pullQuote}</p>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 4: GALLERY — second half (~60%)
          ═══════════════════════════════════════════ */}
      {rowsAfter.length > 0 && (
        <section className="s-white journal-gallery-section">
          <div className="journal-gallery">
            {rowsAfter.map((row, i) =>
              renderRow(row, rowsBefore.length + i)
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 5: NARRATIVE TEXT (SEO content)
          ═══════════════════════════════════════════ */}
      {post.seoContent && (
        <section
          className="s-white"
          style={{ padding: '64px 64px 72px' }}
        >
          <div
            className="max journal-body"
            style={{ maxWidth: 680 }}
          >
            <RevealOnScroll>
              <div
                style={{
                  borderTop: '1px solid var(--rule)',
                  paddingTop: 48,
                }}
              >
                <PortableText value={post.seoContent} />
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 6: VENDOR CREDITS
          ═══════════════════════════════════════════ */}
      {post.vendorCredits?.length > 0 && (
        <section
          className="s-white"
          style={{ padding: '0 64px 72px' }}
        >
          <div className="max" style={{ maxWidth: 680 }}>
            <RevealOnScroll>
              <div
                style={{
                  borderTop: '1px solid var(--rule)',
                  paddingTop: 32,
                }}
              >
                <div
                  className="f-label"
                  style={{ marginBottom: 16 }}
                >
                  Credits
                </div>
                <div className="journal-credits">
                  {post.vendorCredits.map(
                    (v: any, i: number) => (
                      <div key={i} className="journal-credit">
                        <span className="journal-credit-role">
                          {v.role}
                        </span>
                        {v.url ? (
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="journal-credit-name"
                          >
                            {v.name}
                          </a>
                        ) : (
                          <span className="journal-credit-name">
                            {v.name}
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 7: RELATED STORIES (2 cards)
          ═══════════════════════════════════════════ */}
      {post.relatedStories?.length > 0 && (
        <section className="s-grey pad">
          <div className="max">
            <RevealOnScroll
              className="sec-head"
              style={{ marginBottom: 48 }}
            >
              <div className="f-label">Continue Exploring</div>
            </RevealOnScroll>
            <div className="journal-related">
              {post.relatedStories
                .slice(0, 2)
                .map((related: any) => (
                  <RevealOnScroll key={related._id}>
                    <Link
                      href={`/journal/${related.slug.current}`}
                      className="journal-related-card"
                    >
                      <div className="journal-related-img">
                        {related.heroImage ? (
                          <Image
                            src={urlFor(related.heroImage)
                              .width(900)
                              .height(600)
                              .quality(90)
                              .auto('format')
                              .url()}
                            alt={
                              related.heroImage?.alt ||
                              `${related.coupleName} wedding`
                            }
                            width={900}
                            height={600}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              background:
                                'linear-gradient(155deg, #E8E4DE, #D2CCC4)',
                            }}
                          />
                        )}
                      </div>
                      <h3 className="journal-related-title">
                        {related.coupleName}
                      </h3>
                      <p className="journal-related-location">
                        {related.location}
                      </p>
                    </Link>
                  </RevealOnScroll>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 8: FINAL CTA
          ═══════════════════════════════════════════ */}
      <FinalCTA />
    </main>
  );
}
