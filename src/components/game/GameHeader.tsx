
"use client"

import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Volume2, VolumeX, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function GameHeader() {
    const { isSoundOn, toggleSound, resetGame, restartCurrentGame, playSound } = useGame();
    const router = useRouter();

    const handleFullReset = () => {
        playSound('click');
        resetGame();
        router.push('/');
    }

    const handleGameRestart = () => {
        playSound('click');
        restartCurrentGame();
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
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <RefreshCw className="h-6 w-6" />
                            <span className="sr-only">Reiniciar Juego</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>¿Qué deseas reiniciar?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Puedes reiniciar solo la partida actual para volver a intentarlo, o volver al menú principal para empezar un juego nuevo.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleGameRestart}>Partida Actual</AlertDialogAction>
                        <AlertDialogAction onClick={handleFullReset}>Juego Completo</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <Button onClick={toggleSound} variant="ghost" size="icon">
                {isSoundOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                <span className="sr-only">Toggle Sound</span>
            </Button>
        </header>
    )
}
