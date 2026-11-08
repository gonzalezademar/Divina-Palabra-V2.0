"use client";
import Link from 'next/link';
import { copyPreviousProgress } from '@/lib/practice';
import { useEffect, useState } from 'react';
import { newRoundId, readRounds, SavedRound } from '@/lib/round-storage';
import { modeNames } from '@/lib/classroom';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
type Mode = 'find-word' | 'complete-phrase' | 'guess-the-phrase' | 'bible-rosco' | 'word-search' | 'counseling-practical';
export default function SetupPage() {
  const router = useRouter();
  const [savedRounds,setSavedRounds]=useState<SavedRound[]>([]);
  const [copyMessage,setCopyMessage]=useState('');
  const { storageOwner, preferencesReady, setPendingRoundId, teams, setTeams, setGameMode, setActiveLesson, restartCurrentGame, isPracticeMode, setPracticeMode, isSoundOn, toggleSound, roundTime, setRoundTime, difficulty, setDifficulty, bibleVersion, setBibleVersion, language, t, includeGuidedContent, setIncludeGuidedContent } = useGame();
  useEffect(()=>{if(preferencesReady)setSavedRounds(readRounds(storageOwner));},[preferencesReady,storageOwner]);
  const es = language === 'es';
  const [mode, setMode] = useState<Mode>('find-word');
  const [group, setGroup] = useState(false);
  const [starting, setStarting] = useState(false);
  const modes: { id: Mode; title: string; description: string }[] = [
    { id: 'find-word', title: t.setup.mode_find_word, description: ('Ordena los grupos de letras para formar una palabra.') },
    { id: 'complete-phrase', title: t.setup.mode_complete_phrase, description: ('Lee el pasaje y elige las palabras que faltan.') },
    { id: 'guess-the-phrase', title: t.setup.mode_guess_phrase, description: ('Elige letras para descubrir un pasaje, sin reloj.') },
    { id: 'bible-rosco', title: t.setup.mode_rosco, description: ('Responde una palabra por letra. Puedes pasar y revisar las pendientes.') },
    { id: 'word-search', title: t.setup.mode_word_search, description: ('Encuentra palabras y luego clasifica conceptos bíblicos.') },
    { id: 'counseling-practical', title: t.setup.mode_counseling, description: ('Lee un relato o una enseñanza bíblica y reflexiona con su referencia.') },
  ];
  const selected = modes.find(item => item.id === mode)!;
  const selectStyle = 'mt-2 w-full rounded-xl bg-slate-950 border border-slate-600 p-3';
  function start() {
    if (starting||!preferencesReady) return;
    setStarting(true);
    setActiveLesson(null);
    if(mode === 'counseling-practical') setPracticeMode(true);
    setTeams(group ? [0, 1].map(i => ({ name: teams[i]?.name || ((`Equipo ${i + 1}`)), score: 0, lives: 5 })) : [{ name: ('Mi recorrido'), score: 0, lives: 5 }]);
    const id=newRoundId(); setPendingRoundId(id); restartCurrentGame(); setGameMode(mode); router.push('/game?round='+id);
  }
  return <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
    <header className="flex items-center justify-between gap-3">
      <Button variant="outline" onClick={() => router.push('/')}><ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4" />{('Inicio')}</Button>
      <Button variant="outline" onClick={toggleSound} aria-pressed={isSoundOn}>{((isSoundOn ? 'Sonido: sí' : 'Sonido: no'))}</Button>
    </header>
    <section className="learning-panel space-y-3"><h2 className="font-bold">{storageOwner==='guest'?'Avances de este navegador · Sin cuenta':'Tus avances personales'}</h2><p>{storageOwner==='guest'?'Aquí se conservan también los avances de versiones anteriores. Quienes usan este navegador sin cuenta comparten este espacio.':'Tus nuevos recorridos e historial se guardan por separado de las otras cuentas en este navegador.'}</p>{storageOwner!=='guest'&&<details><summary className="cursor-pointer py-2">Conservar en mi cuenta los avances anteriores</summary><p>Los avances anteriores no indicaban a quién pertenecían. Copia los de este navegador solo si son tuyos. No borraremos el original ni reemplazaremos recorridos existentes.</p><Button variant="outline" onClick={()=>{try{const n=copyPreviousProgress(storageOwner);setSavedRounds(readRounds(storageOwner));setCopyMessage(n?'Avances copiados. El original sigue conservado en el espacio sin cuenta.':'No hay avances nuevos para copiar; lo anterior sigue conservado.');}catch{setCopyMessage('No se completó la copia. Los originales siguen conservados; libera espacio y vuelve a intentar.');}}}>Copiar avances anteriores a mi cuenta</Button><p role="status">{copyMessage}</p></details>}</section>
    {savedRounds.length>0&&<section className="learning-panel space-y-3"><h2 className="text-xl font-bold">Tienes recorridos guardados</h2><p>Conservan las preguntas, tus respuestas y el tiempo. Se recuperan en pausa. Comenzar otra actividad no borra estos recorridos.</p>{savedRounds.map((saved,i)=><div key={saved.id} className="border-t border-slate-700 pt-3 space-y-2"><p>{modeNames[saved.config.gameMode]} · {saved.config.difficulty==='discipulo'?'Intermedio':saved.config.difficulty==='principiante'?'Principiante':'Avanzado'}</p><Button onClick={()=>router.push('/game?round='+encodeURIComponent(saved.id))}>{i===0?'Continuar donde quedé':'Continuar este recorrido'}</Button></div>)}</section>}
    <section className="rounded-3xl border border-amber-500/30 bg-slate-900 p-5 sm:p-8 space-y-6">
      <div className="space-y-2"><p className="text-amber-300 flex gap-2 items-center"><BookOpen aria-hidden="true" className="h-5 w-5" />Divina Palabra</p><h1 className="text-3xl font-headline font-bold">{('Aprende a tu ritmo')}</h1><p className="text-slate-300">{('Etapas de hasta 5 desafíos; el círculo recorre el abecedario. Puedes empezar con las opciones marcadas.')}</p></div>
      <fieldset className="space-y-3"><legend className="font-bold text-lg mb-3">{('1. Elige una actividad')}</legend><div className="grid sm:grid-cols-2 gap-3">{modes.map(item => <label key={item.id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer ${mode === item.id ? 'border-amber-400 bg-amber-500/10' : 'border-slate-700 bg-slate-950'}`}><input type="radio" name="activity" value={item.id} checked={mode === item.id} onChange={() => { setMode(item.id); if(item.id === 'counseling-practical') setPracticeMode(true); setRoundTime(item.id === 'bible-rosco' ? 300 : item.id === 'word-search' ? 180 : 60); }} className="mt-1 accent-amber-400" /><span><span className="block font-bold text-slate-100">{item.title}</span><span className="block text-sm text-slate-300 mt-1">{item.description}</span></span></label>)}</div></fieldset>
      <fieldset disabled={mode === 'counseling-practical'} className="space-y-3"><legend className="font-bold text-lg mb-3">{('2. Elige el ritmo')}</legend>
        <label className="flex items-start gap-3 rounded-xl border border-slate-700 p-4 cursor-pointer"><input type="radio" name="pace" checked={isPracticeMode} onChange={() => setPracticeMode(true)} className="mt-1 accent-amber-400" /><span><strong className="block">{('Sin tiempo · Recomendado para comenzar')}</strong><span className="text-sm text-slate-300">{('Lee con calma y aprende sin perder oportunidades.')}</span></span></label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-700 p-4 cursor-pointer"><input type="radio" name="pace" checked={!isPracticeMode} onChange={() => setPracticeMode(false)} className="mt-1 accent-amber-400" /><span><strong className="block">{('Con desafío de tiempo y puntos')}</strong><span className="text-sm text-slate-300">{('Puedes pausar. Los errores consumen oportunidades; descubrir la frase no usa reloj.')}</span></span></label>
        {!isPracticeMode && mode !== 'guess-the-phrase' && <label className="block">{('Tiempo disponible')}<select className={selectStyle} value={roundTime} onChange={event => setRoundTime(Number(event.target.value))}>{[60,90,150,180,300,600].map(seconds => <option key={seconds} value={seconds}>{seconds} {('segundos')}</option>)}</select></label>}
      </fieldset>
      <section className="rounded-xl border border-slate-700 p-4 space-y-3"><label className="block font-bold">Nivel de conocimiento<select aria-label="Nivel de conocimiento" className={selectStyle} value={difficulty} onChange={e=>setDifficulty(e.target.value as typeof difficulty)}><option value="principiante">Principiante</option><option value="discipulo">Intermedio</option><option value="avanzado">Avanzado</option></select></label><p className="text-sm text-slate-300">Puedes cambiarlo cuando quieras. No representa edad ni mide tu fe.</p><Link href="/encounters" className="inline-block min-h-11 py-3 text-amber-200 underline">Participar con otra persona, cada uno en su dispositivo</Link></section>
      <details className="rounded-xl border border-slate-700 p-4"><summary className="cursor-pointer font-bold py-2">{('Más opciones: participantes y versión')}</summary><div className="grid sm:grid-cols-2 gap-4 mt-4">
        <label>{('Participantes')}<select className={selectStyle} value={group ? 'group' : 'solo'} onChange={e => setGroup(e.target.value === 'group')}><option value="solo">{('Individual')}</option><option value="group">{('Dos equipos en este dispositivo')}</option></select></label>
        <label className="sm:col-span-2">{t.setup.bible_version}<select className={selectStyle} value={bibleVersion} onChange={e => setBibleVersion(e.target.value)}>{(([['rvr1960','Reina-Valera 1960'],['nvi','Nueva Versión Internacional'],['ntv','Nueva Traducción Viviente']])).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
        {mode === 'counseling-practical' && <label className="flex items-start gap-3 mt-4"><input type="checkbox" className="mt-1" checked={includeGuidedContent} onChange={e=>setIncludeGuidedContent(e.target.checked)}/><span>Incluir relatos para leer acompañados<span className="block text-sm text-slate-300">Algunos pasajes tratan situaciones difíciles. Selecciónalos para conversar con una persona de confianza. El nivel no representa edad.</span></span></label>}
      </details>
      <p className="text-sm text-slate-300">Se priorizan palabras y pasajes que todavía no has visto en este espacio de práctica, también al cambiar de nivel. Cuando el banco se agota, comienza el repaso.</p>
      {bibleVersion==='ntv' && <p role="status" className="rounded-xl border border-amber-500/40 p-3 text-amber-200">El catálogo NTV es breve: las frases pueden repetirse pronto. RVR1960 tiene más contenido disponible. Puedes elegir la versión en Más opciones.</p>}
      <div className="border-t border-slate-700 pt-5 space-y-3"><p className="text-slate-300">{selected.title} · {difficulty === 'principiante' ? t.setup.diff_beginner : difficulty === 'discipulo' ? t.setup.diff_disciple : t.setup.diff_expert} · {isPracticeMode ? (('Sin tiempo')) : (('Con puntos'))}</p><Button onClick={start} disabled={starting||!preferencesReady} className="w-full h-auto min-h-14 py-4 text-lg font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl">{starting ? (('Preparando…')) : (('Comenzar actividad'))}</Button></div>
    </section>
  </main>;
}
