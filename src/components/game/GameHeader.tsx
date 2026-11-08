"use client";
import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pause, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface GameHeaderProps { onCancel?: () => void; onPauseChange?: (paused: boolean) => void; initialPaused?: boolean; }
export function GameHeader({ onCancel, onPauseChange, initialPaused=false }: GameHeaderProps) {
  const { isSoundOn, toggleSound, resetGame, restartCurrentGame, language } = useGame();
  const router = useRouter();
  const [open, setOpen] = useState(initialPaused);
  const es = language === 'es';
  const changeOpen = (value: boolean) => { setOpen(value); onPauseChange?.(value); };
  return <header className="fixed top-0 inset-x-0 p-3 flex justify-between gap-2 z-20 bg-slate-950 border-b border-slate-700">
    {onCancel ? <AlertDialog open={open} onOpenChange={changeOpen}>
      <AlertDialogTrigger asChild><Button variant="outline" className="gap-2"><Pause aria-hidden="true" className="h-5 w-5" />{('Pausar')}</Button></AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-900 text-slate-100 border-slate-700 max-h-[90dvh] overflow-y-auto">
        <AlertDialogHeader><AlertDialogTitle>{('Actividad en pausa')}</AlertDialogTitle><AlertDialogDescription className="text-slate-300">{('El reloj está detenido. Continuar conserva tu respuesta. Repasar conserva los desafíos y reinicia los puntos; finalizar muestra el resumen.')}</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-col gap-3">
          <AlertDialogCancel className="m-0 bg-amber-400 text-slate-950 hover:bg-amber-300">{('Continuar actividad')}</AlertDialogCancel>
          <AlertDialogAction className="bg-slate-800 text-white hover:bg-slate-700" onClick={restartCurrentGame}>{('Repasar estos desafíos')}</AlertDialogAction>
          <AlertDialogAction className="bg-slate-800 text-white hover:bg-slate-700" onClick={onCancel}>{('Finalizar y ver resumen')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> : <Button variant="outline" onClick={() => { resetGame(); router.push('/'); }} className="gap-2"><Home aria-hidden="true" className="h-5 w-5" />{('Inicio')}</Button>}
    <Button variant="outline" onClick={toggleSound} aria-pressed={isSoundOn}>{((isSoundOn ? 'Sonido: sí' : 'Sonido: no'))}</Button>
  </header>;
}
