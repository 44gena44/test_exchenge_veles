import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function PageHeader({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <h1 className={cn("text-3xl font-bold tracking-tight text-foreground mb-32", className)}>
      {children}
    </h1>
  );
}
