import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal — Wedding Stories & Editorials | Alex Cinisi Photography',
  description: 'Explore destination wedding stories from Sicily — Villa Igiea, Taormina, Scopello, Noto. Editorial and film photography by Alex Cinisi.',
};

export default function JournalPage() {
  return (
    <main className="pt-32">
      <div className="max pad">
        <div className="f-label">Journal</div>
        <div className="h2-lg">Wedding Stories &<br /><em>Editorials</em></div>
        <p style={{ fontSize: '.88rem', color: 'var(--charcoal)', marginTop: 12 }}>Coming soon — curated wedding stories from Sicily and beyond.</p>
      </div>
    </main>
  );
}
