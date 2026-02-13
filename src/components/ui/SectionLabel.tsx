import { cn } from '@/lib/utils';

interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
    return (
        <div className={cn("flex items-center gap-4 mb-4", className)}>
            <span className="text-[var(--mid)] uppercase text-[0.7rem] tracking-[0.15em] font-medium">
                {children}
            </span>
            <div className="h-[1px] bg-[var(--accent)] w-12" />
        </div>
    );
}
