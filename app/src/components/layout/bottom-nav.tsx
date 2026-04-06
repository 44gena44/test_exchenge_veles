"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Repeat, History, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/obmennik', label: 'Главная', icon: Home },
  { href: '/exchange', label: 'Обмен', icon: Repeat, includedPaths: ['/exchange', '/transfer-abroad'] },
  { href: '/history', label: 'История', icon: History },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 flex justify-center">
        <div className="mx-auto w-full max-w-xs">
            <nav className="flex justify-around items-center h-64 bg-background/80 backdrop-blur-lg border border-border rounded-full shadow-lg">
                {navItems.map((item) => {
                const isActive = item.href === '/obmennik' ? pathname === item.href : (item.includedPaths ? item.includedPaths.some(path => pathname.startsWith(path)) : pathname.startsWith(item.href));
                return (
                    <Link href={item.href} key={item.label} className={cn(
                        "flex flex-col items-center justify-center text-center w-64 h-64 rounded-full transition-all duration-300 ease-in-out",
                        { "text-muted-foreground": !isActive }
                    )}>
                        <div className={cn("flex items-center justify-center w-40 h-40 rounded-full transition-all duration-300", 
                            { "bg-primary text-primary-foreground scale-110": isActive }
                        )}>
                            <item.icon className="h-20 w-20" />
                        </div>
                        <span className={cn(
                            "text-xs font-medium -mt-6 transition-opacity duration-300",
                            { "opacity-0 -translate-y-8 h-0": isActive },
                            { "opacity-100": !isActive }
                        )}>
                            {item.label}
                        </span>
                    </Link>
                );
                })}
            </nav>
        </div>
    </div>
  );
}
