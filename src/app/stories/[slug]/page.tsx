import Heading from '@/components/ui/Heading';

export default async function SingleStoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <div className="pt-32 container">
            <Heading>Story: {slug}</Heading>
            {/* TODO: Implement full design */}
        </div>
    );
}
