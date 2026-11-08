"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Home, School, Trophy, BookOpen, User } from 'lucide-react';

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { language, playSound, hasConfiguredLanguage } = useGame();

  // Hide on game screen or if language hasn't been configured yet
  if (pathname === '/game' || !hasConfiguredLanguage) {
    return null;
  }

  const navItems = [
    {
      label: ('Inicio'),
      icon: Home,
      path: '/'
    },
    {
      label: ('Educador'),
      icon: School,
      path: '/teacher'
    },
    {
      label: ('Actividades'),
      icon: Trophy,
      path: '/setup'
    },
    {
      label: ('Biblia'),
      icon: BookOpen,
      path: '/bible'
    },
    {
      label: ('Perfil'),
      icon: User,
      path: '/profile'
    }
  ];

  const handleNav = (path: string) => {
    playSound('click');
    router.push(path);
  };

  return (
    <nav aria-label={("Navegación principal")} className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800/80 px-1 py-2 grid grid-cols-5 gap-1 items-center md:max-w-md md:mx-auto md:bottom-4 md:rounded-2xl md:border shadow-2xl transition-all duration-300">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <button
            key={item.path}
            aria-current={isActive ? "page" : undefined}
            onClick={() => handleNav(item.path)}
            className={`flex flex-col items-center justify-center min-h-12 min-w-0 flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-amber-400 bg-amber-500/10 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5.5 h-5.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-[11px] sm:text-xs mt-1 font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
