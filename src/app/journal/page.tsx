import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allJournalPostsQuery } from '@/lib/sanity/queries';
import Breadcrumb from '@/components/sections/Breadcrumb';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import FinalCTA from '@/components/sections/FinalCTA';
import JournalGrid from '@/components/sections/JournalGrid';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Journal — Wedding Stories & Editorials | Alex Cinisi Photography',
  description: 'Explore destination wedding stories from Sicily — Villa Igiea, Taormina, Scopello, Noto. Editorial and film photography by Alex Cinisi.',
  alternates: { canonical: '/journal' },
};

export default async function JournalPage() {
  const posts = await client.fetch(allJournalPostsQuery, { start: 0, end: 50 });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.alexcinisiphotography.com" },
      { "@type": "ListItem", "position": 2, "name": "Journal", "item": "https://www.alexcinisiphotography.com/journal" }
    ]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Journal' }
      ]} />

      <section className="s-white" style={{ paddingTop: 0 }}>
        <div className="max pad">
          <RevealOnScroll>
            <div className="f-label">Journal</div>
            <div className="h2-lg" style={{ marginBottom: 16 }}>
              Wedding Stories &amp;<br /><em>Editorials</em>
            </div>
            <p style={{ fontSize: '.88rem', color: 'var(--charcoal)', maxWidth: 480, lineHeight: 1.85 }}>
              Curated stories from Sicily and beyond — each one a real celebration, told through editorial photography.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="s-white pad">
        <div className="max">
          <JournalGrid posts={posts || []} />
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
