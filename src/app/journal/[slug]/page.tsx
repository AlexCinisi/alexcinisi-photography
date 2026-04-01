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
              .quality(85)
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
   
   - Landscape (ratio > 1.2) → full-width row
   - Portrait/square with fullWidth=true → full-width row (centered, max 70%)
   - Portrait/square pairs → side-by-side row
   - Lone portrait at end → centered at 60%
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

    // Portrait/square with fullWidth toggle → full-width (centered, larger)
    if (img.fullWidth) {
      rows.push({ type: 'full-portrait', img });
      i++;
      continue;
    }

    // Portrait/square without fullWidth → try to pair with next non-landscape, non-fullWidth
    const next = images[i + 1];
    if (next) {
      const nextRatio = next.asset?.metadata?.dimensions?.aspectRatio ?? 1;
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
   ────────────────────────────────────── */
function galleryImageUrl(img: GalleryImage, maxWidth: number = 1600) {
  return urlFor(img)
    .width(maxWidth)
    .quality(85)
    .auto('format')
    .fit('max')
    .url();
}

function getImageDimensions(img: GalleryImage) {
  const dims = img.asset?.metadata?.dimensions;
  if (!dims) return { width: 1600, height: 1200 };
  // Scale to maxWidth while keeping native ratio
  const scale = 1600 / dims.width;
  return {
    width: Math.round(dims.width * scale),
    height: Math.round(dims.height * scale),
  };
}

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
      ? urlFor(post.heroImage).width(1200).quality(85).auto('format').url()
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
          image: gallery.slice(0, 10).map((img: GalleryImage, i: number) => ({
            '@type': 'ImageObject',
            url: galleryImageUrl(img, 1200),
            name:
              img.alt || `${post.coupleName} wedding photo ${i + 1}`,
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
        const dims = getImageDimensions(row.img);
        return (
          <RevealOnScroll key={`row-${index}`}>
            <div className="journal-gallery-row full">
              <Image
                src={galleryImageUrl(row.img)}
                alt={row.img.alt || `${post.coupleName} photo`}
                width={dims.width}
                height={dims.height}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>
          </RevealOnScroll>
        );
      }
      case 'full-portrait': {
        const dims = getImageDimensions(row.img);
        return (
          <RevealOnScroll key={`row-${index}`}>
            <div className="journal-gallery-row full-portrait">
              <Image
                src={galleryImageUrl(row.img)}
                alt={row.img.alt || `${post.coupleName} photo`}
                width={dims.width}
                height={dims.height}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>
          </RevealOnScroll>
        );
      }
      case 'pair': {
        const dims0 = getImageDimensions(row.imgs[0]);
        const dims1 = getImageDimensions(row.imgs[1]);
        return (
          <RevealOnScroll key={`row-${index}`}>
            <div className="journal-gallery-row pair">
              <div className="journal-gallery-pair-item">
                <Image
                  src={galleryImageUrl(row.imgs[0], 900)}
                  alt={row.imgs[0].alt || `${post.coupleName} photo`}
                  width={dims0.width}
                  height={dims0.height}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
              </div>
              <div className="journal-gallery-pair-item">
                <Image
                  src={galleryImageUrl(row.imgs[1], 900)}
                  alt={row.imgs[1].alt || `${post.coupleName} photo`}
                  width={dims1.width}
                  height={dims1.height}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </div>
          </RevealOnScroll>
        );
      }
      case 'centered': {
        const dims = getImageDimensions(row.img);
        return (
          <RevealOnScroll key={`row-${index}`}>
            <div className="journal-gallery-row centered">
              <Image
                src={galleryImageUrl(row.img)}
                alt={row.img.alt || `${post.coupleName} photo`}
                width={dims.width}
                height={dims.height}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>
          </RevealOnScroll>
        );
      }
    }
  }

  /* ── Hero image dimensions ── */
  const heroDims = post.heroImage?.asset?.metadata?.dimensions;
  const heroWidth = heroDims?.width || 2400;
  const heroHeight = heroDims?.height || 1600;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {gallerySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
        />
      )}

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Journal', href: '/journal' },
          { label: post.coupleName },
        ]}
      />

      {/* === SECTION 1: TITOLO TIPOGRAFICO === */}
      <section className="s-white journal-title-section">
        <div className="max" style={{ maxWidth: 900 }}>
          <RevealOnScroll>
            <h1 className="journal-post-title">{post.coupleName}</h1>
            <p className="journal-post-meta">
              {post.locationRef ? (
                <Link
                  href={`/locations/${post.locationRef.slug.current}`}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--rule)',
                    paddingBottom: 1,
                  }}
                >
                  {post.location}
                </Link>
              ) : (
                post.location
              )}
              {' · '}
              {formatDate(post.date)} · {categoryLabel(post.category)}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* === SECTION 2: HERO IMAGE — proporzioni native === */}
      <section className="journal-hero">
        {post.heroImage ? (
          <Image
            src={urlFor(post.heroImage)
              .width(2400)
              .quality(85)
              .auto('format')
              .url()}
            alt={
              post.heroImage?.alt ||
              `${post.coupleName} wedding at ${post.location}`
            }
            width={heroWidth}
            height={heroHeight}
            priority
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '85vh',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '50vh',
              background:
                'linear-gradient(155deg, #E8E4DE, #D2CCC4)',
            }}
          />
        )}
      </section>

      {/* === SECTION 3: SUBTITLE (solo se presente, non ripetuto come pullquote) === */}
      {post.subtitle && (
        <section className="s-white" style={{ padding: '48px 64px 0' }}>
          <div className="max" style={{ maxWidth: 900 }}>
            <RevealOnScroll>
              <p className="journal-post-subtitle">{post.subtitle}</p>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* === SECTION 4: GALLERY — prima metà (~40%) === */}
      {rowsBefore.length > 0 && (
        <section className="s-white journal-gallery-section">
          <div className="journal-gallery">
            {rowsBefore.map((row, i) => renderRow(row, i))}
          </div>
        </section>
      )}

      {/* === SECTION 5: PULL-QUOTE (solo se campo pullQuote compilato) === */}
      {post.pullQuote && (
        <section className="s-white" style={{ padding: '40px 64px 60px' }}>
          <div className="max" style={{ maxWidth: 900 }}>
            <RevealOnScroll>
              <p className="journal-pullquote">{post.pullQuote}</p>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* === SECTION 6: GALLERY — seconda metà (~60%) === */}
      {rowsAfter.length > 0 && (
        <section className="s-white journal-gallery-section">
          <div className="journal-gallery">
            {rowsAfter.map((row, i) =>
              renderRow(row, rowsBefore.length + i)
            )}
          </div>
        </section>
      )}

      {/* === SECTION 7: NARRATIVE TEXT (SEO content) === */}
      {post.seoContent && (
        <section className="s-white" style={{ padding: '64px 64px 72px' }}>
          <div className="max journal-body" style={{ maxWidth: 680 }}>
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

      {/* === SECTION 8: VENDOR CREDITS === */}
      {post.vendorCredits?.length > 0 && (
        <section className="s-white" style={{ padding: '0 64px 72px' }}>
          <div className="max" style={{ maxWidth: 680 }}>
            <RevealOnScroll>
              <div
                style={{
                  borderTop: '1px solid var(--rule)',
                  paddingTop: 32,
                }}
              >
                <div className="f-label" style={{ marginBottom: 16 }}>
                  Credits
                </div>
                <div className="journal-credits">
                  {post.vendorCredits.map((v: any, i: number) => (
                    <div key={i} className="journal-credit">
                      <span className="journal-credit-role">{v.role}</span>
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

      {/* === SECTION 9: RELATED STORIES === */}
      {post.relatedStories?.length > 0 && (
        <section className="s-grey pad">
          <div className="max">
            <RevealOnScroll className="sec-head" style={{ marginBottom: 48 }}>
              <div className="f-label">Continue Exploring</div>
            </RevealOnScroll>
            <div className="journal-related">
              {post.relatedStories.slice(0, 2).map((related: any) => (
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
                            .quality(85)
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

      {/* === SECTION 10: FINAL CTA === */}
      <FinalCTA />
    </main>
  );
}
