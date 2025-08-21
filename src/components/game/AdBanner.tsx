"use client";

import { cn } from '@/lib/utils';

export function AdBanner({ className }: { className?: string }) {
  // In a real app, this component would integrate with an ad network like AdMob.
  // For this scaffold, it's a visual placeholder.
  return (
    <div className={cn("w-full h-16 bg-muted/50 border-t border-b border-border flex items-center justify-center text-muted-foreground text-sm", className)}>
      <p>Espacio para Banner de Anuncio</p>
    </div>
  );
}
