import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { GameProvider } from '@/contexts/GameContext';
import { BottomNavigation } from '@/components/common/BottomNavigation';

export const metadata: Metadata = {
  title: 'Divina Palabra - Edición Bíblica',
  description: 'Un panel interactivo de actividades y retos bíblicos para fortalecer tu conocimiento de las Escrituras. Desarrollado por AG Lumina.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="font-body antialiased bg-slate-950 text-slate-100 min-h-screen">
        <GameProvider>
          <div className="pb-20 md:pb-24">
            {children}
          </div>
          <BottomNavigation />
          <Toaster />
        </GameProvider>
      </body>
    </html>
  );
}
