'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface JournalPost {
  _id: string;
  title: string;
  slug: { current: string };
  coupleName: string;
  subtitle?: string;
  location: string;
  country?: string;
  date: string;
  category: string;
  tags?: string[];
  heroImage?: any;
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'travel', label: 'Travel' },
  { value: 'bts', label: 'Behind the Scenes' },
];

export default function JournalGrid({ posts }: { posts: JournalPost[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);
  
  const filtered = activeCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Category filters — inspired by Greg Finck */}
      <div className="journal-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={`journal-filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat.value);
              setVisibleCount(12);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid — 3 columns, card with couple name + location (D&S style info) */}
      <div className="journal-grid">
        {filtered.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--mid)', fontSize: '.88rem', padding: '80px 0' }}>
            No stories in this category yet.
          </p>
        ) : (
          filtered.slice(0, visibleCount).map((post, i) => (
            <RevealOnScroll key={post._id} className={i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}>
              <Link href={`/journal/${post.slug.current}`} className="journal-card">
                <div className="journal-card-img">
                  {post.heroImage ? (
                    <Image
                      src={urlFor(post.heroImage).width(600).height(800).url()}
                      alt={post.heroImage?.alt || `${post.coupleName} wedding`}
                      width={600}
                      height={800}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(155deg, #E8E4DE, #D2CCC4)' }} />
                  )}
                </div>
                <div className="journal-card-info">
                  <h3>{post.coupleName}</h3>
                  <p>{post.location}</p>
                </div>
              </Link>
            </RevealOnScroll>
          ))
        )}
      </div>

      {filtered.length > visibleCount && (
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button
            className="btn-text"
            onClick={() => setVisibleCount(prev => prev + 12)}
            style={{ fontSize: '.65rem', letterSpacing: '.22em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Load More Stories
          </button>
        </div>
      )}
    </>
  );
}
