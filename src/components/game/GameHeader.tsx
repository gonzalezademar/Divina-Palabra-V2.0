"use client"

import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function GameHeader() {
    const { isSoundOn, toggleSound, resetGame } = useGame();
    const router = useRouter();

    const handleReset = () => {
        resetGame();
        router.push('/');
    }

    return (
        <header className="absolute top-0 left-0 right-0 p-2 md:p-4 flex justify-between items-center z-10">
            <div className="flex gap-2">
                <Link href="/" passHref>
                    <Button variant="ghost" size="icon" onClick={() => resetGame()}>
                        <Home className="h-6 w-6" />
                        <span className="sr-only">Volver al Inicio</span>
                    </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleReset}>
                    <RefreshCw className="h-6 w-6" />
                    <span className="sr-only">Reiniciar Juego</span>
                </Button>
            </div>
            <Button onClick={toggleSound} variant="ghost" size="icon">
                {isSoundOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                <span className="sr-only">Toggle Sound</span>
            </Button>
        </header>
    )
}
