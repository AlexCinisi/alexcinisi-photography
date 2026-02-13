import Link from 'next/link';

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <div className="breadcrumb" style={{ paddingTop: '90px' }}>
            {items.map((item, index) => (
                <span key={index}>
                    {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                    ) : (
                        item.label
                    )}
                    {index < items.length - 1 && <span>/</span>}
                </span>
            ))}
        </div>
    );
}
