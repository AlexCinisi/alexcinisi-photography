import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wedding Venues in Sicily — Destination Wedding Photography | Alex Cinisi',
  description: 'Discover Sicily\'s most stunning wedding venues — Villa Igiea, Taormina, Scopello, Noto. Editorial photography for refined destination weddings.',
};

export default function LocationsHubPage() {
  return (
    <main className="pt-32">
      <div className="max pad">
        <div className="f-label">Locations</div>
        <div className="h2-lg">Luxury Venues Across<br /><em>Sicily & Italy</em></div>
        <p style={{ fontSize: '.88rem', color: 'var(--charcoal)', marginTop: 12 }}>Locations hub coming soon — explore venue-specific pages below.</p>
      </div>
    </main>
  );
}
