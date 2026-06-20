"use client";

import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

export function AdBanner({ className }: { className?: string }) {
  const { language } = useGame();

  return (
    <div className={cn(
      "w-full h-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-amber-500/10 flex items-center justify-between px-4 py-2 text-xs relative overflow-hidden group shadow-lg",
      className
    )}>
      {/* Background glow effect */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/10 transition-all duration-300" />
      
      <div className="flex items-center gap-2.5 z-10">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center font-bold font-mono text-amber-400 text-[10px]">
          AG
        </div>
        <div className="text-left">
          <p className="font-bold text-amber-300 tracking-wide">AG Lumina Apps</p>
          <p className="text-[10px] text-slate-400">
            {language === 'es' ? 'Descubre más herramientas con propósito' : 'Discover more tools with purpose'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 z-10">
        <span className="text-[9px] uppercase tracking-widest text-slate-500 border border-slate-800 rounded px-1.5 py-0.5 bg-slate-950/40">
          {language === 'es' ? 'Promoción' : 'Sponsor'}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse hidden sm:inline" />
      </div>
    </div>
  );
}

    