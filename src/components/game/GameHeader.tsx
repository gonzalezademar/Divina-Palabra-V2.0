"use client"

import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Home } from 'lucide-react';
import Link from 'next/link';

export function GameHeader() {
    const { isSoundOn, toggleSound } = useGame();
    return (
        <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon">
                    <Home className="h-6 w-6" />
                    <span className="sr-only">Volver al Inicio</span>
                </Button>
            </Link>
            <Button onClick={toggleSound} variant="ghost" size="icon">
                {isSoundOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                <span className="sr-only">Toggle Sound</span>
            </Button>
        </header>
    )
}
