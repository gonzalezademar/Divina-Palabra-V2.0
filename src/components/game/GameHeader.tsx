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
import { Volume2, VolumeX, Home, RefreshCw, Pause } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GameHeaderProps {
  onCancel?: () => void;
}

export function GameHeader({ onCancel }: GameHeaderProps) {
    const { isSoundOn, toggleSound, resetGame, restartCurrentGame, playSound, t } = useGame();
    const router = useRouter();

    const handleFullReset = () => {
        playSound('click');
        if (onCancel) {
            onCancel();
        } else {
            resetGame();
            router.push('/');
        }
    }

    const handleGameRestart = () => {
        playSound('click');
        restartCurrentGame();
    }

    return (
        <header className="absolute top-0 left-0 right-0 p-2 md:p-4 flex justify-between items-center z-20 bg-slate-950/60 backdrop-blur-sm border-b border-slate-800/60">
            <div className="flex gap-2 items-center">
                {/* Prominent Exit button - always visible */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="border-slate-700 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-1.5 rounded-xl px-3"
                        >
                            <Pause className="h-4 w-4 text-amber-400" />
                            <span className="text-xs font-semibold hidden sm:inline">{t.game.cancel}</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100 rounded-2xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-amber-300 font-bold">{t.game.restart_title}</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                                {t.game.restart_desc}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex gap-2 flex-wrap">
                            <AlertDialogCancel className="border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl">{t.game.cancel}</AlertDialogCancel>
                            <AlertDialogAction onClick={handleGameRestart} className="bg-slate-800 text-slate-200 hover:bg-slate-700 rounded-xl">{t.game.current_match}</AlertDialogAction>
                            <AlertDialogAction onClick={handleFullReset} className="bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold rounded-xl flex items-center gap-1.5">
                                <Home className="h-4 w-4" />
                                {t.game.back_to_menu}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Restart button */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleGameRestart}
                    className="text-slate-400 hover:text-white"
                    title={t.game.restart_sr}
                >
                    <RefreshCw className="h-5 w-5" />
                </Button>
            </div>
            <Button onClick={toggleSound} variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                {isSoundOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                <span className="sr-only">Toggle Sound</span>
            </Button>
        </header>
    )
}
