"use client";

import { cn } from '@/lib/utils';

export function AdBanner({ className }: { className?: string }) {
  // In a real app, this component would integrate with an ad network like AdMob.
  // For this scaffold, it's a visual placeholder.
  return (
    <div className={cn("w-full h-full bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground text-xs", className)}>
      <p>Anuncio</p>
    </div>
  );
}

    