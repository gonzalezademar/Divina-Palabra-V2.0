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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
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
