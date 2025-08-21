import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { GameProvider } from '@/contexts/GameContext';

export const metadata: Metadata = {
  title: 'Encuentra la Palabra - Edición Bíblica',
  description: 'Un juego de palabras bíblico para desafiar tu conocimiento.',
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
      <body className="font-body antialiased">
        <GameProvider>
          {children}
          <Toaster />
        </GameProvider>
      </body>
    </html>
  );
}
