import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    level?: 'h1' | 'h2' | 'h3' | 'h4';
    size?: 'default' | 'lg' | 'xl';
    children: React.ReactNode;
}

export default function Heading({ level = 'h2', size = 'default', className, children, ...props }: HeadingProps) {
    const Tag = level;

    const sizes = {
        default: "text-2xl md:text-3xl tracking-tight",
        lg: "text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight",
        xl: "text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none"
    };

    return (
        <Tag className={cn(sizes[size], "font-display text-[var(--ink)]", className)} {...props}>
            {children}
        </Tag>
    );
}
