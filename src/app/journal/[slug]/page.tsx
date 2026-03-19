import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Story | Alex Cinisi Photography',
};

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <main className="pt-32">
      <div className="max pad">
        <div className="f-label">Journal</div>
        <div className="h2-lg">Story: {slug}</div>
        <p style={{ fontSize: '.88rem', color: 'var(--charcoal)', marginTop: 12 }}>Full story template coming soon.</p>
      </div>
    </main>
  );
}
