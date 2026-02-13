// src/components/seo/SchemaMarkup.tsx
export default function SchemaMarkup({ jsonLd }: { jsonLd: any }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
