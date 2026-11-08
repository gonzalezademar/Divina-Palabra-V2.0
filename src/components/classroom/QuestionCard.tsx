"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Question } from '@/lib/classroom';
import { generateWordSearchGrid, normalizeGridWord } from '@/lib/word-search';

function WordBoard({ question, answer, onChange, boardKey, selection, onSelection }: { question: Question; answer: string; onChange: (value: string) => void; boardKey:string; selection?:[number,number]|null;onSelection?:(value:[number,number]|null)=>void }) {
  const words = question.words || [];
  const [grid] = useState(() => generateWordSearchGrid(words, 12, boardKey));
  const [localStart, setLocalStart] = useState<[number,number] | null>(null); const start=selection===undefined?localStart:selection; const setStart=(value:[number,number]|null)=>{setLocalStart(value);onSelection?.(value);}; const [notice,setNotice]=useState('');
  const found = answer ? answer.split('|') : [];
  function choose(r:number,c:number) {
    if(!start){setStart([r,c]);setNotice('Ahora toca la última letra de la palabra.');return;}
    const dr = r-start[0], dc=c-start[1];
    if(dr && dc && Math.abs(dr)!==Math.abs(dc)){setStart([r,c]);setNotice('Elige una línea recta: horizontal, vertical o diagonal.');return;}
    const length=Math.max(Math.abs(dr),Math.abs(dc));let text='';for(let i=0;i<=length;i++)text+=grid[start[0]+Math.sign(dr)*i][start[1]+Math.sign(dc)*i];
    const word=words.find(w=>normalizeGridWord(w)===text||normalizeGridWord(w)===[...text].reverse().join(''));
    if(word){const next=[...new Set([...found,word])];onChange(words.filter(w=>next.includes(w)).join('|'));setNotice(found.includes(word)?'Esa palabra ya está marcada.':`Encontraste ${word}.`);}else setNotice('Esa selección no coincide. Vuelve a elegir el inicio y el final.');setStart(null);
  }
  return <div className="space-y-3"><p>Toca la primera y la última letra. Puedes seleccionar en ambas direcciones. En celular, desliza la cuadrícula hacia los costados.</p><div className="max-w-full overflow-x-auto rounded-xl" tabIndex={0} role="region" aria-label="Cuadrícula de palabras, desplazamiento horizontal"><div className="grid gap-0.5" style={{minWidth:grid.length*44,gridTemplateColumns:`repeat(${grid.length},minmax(0,1fr))`}}>{grid.flatMap((row,r)=>row.map((letter,c)=><button type="button" key={`${r}-${c}`} aria-label={`Fila ${r+1}, columna ${c+1}: ${letter}`} aria-pressed={start?.[0]===r&&start?.[1]===c} onClick={()=>choose(r,c)} className={`word-cell rounded text-sm font-bold ${start?.[0]===r&&start?.[1]===c?'bg-amber-400 text-slate-950':'bg-slate-800'}`}>{letter}</button>))}</div></div><p role="status">{notice}</p><ul className="flex flex-wrap gap-2">{words.map(w=><li key={w} className={found.includes(w)?'text-emerald-300':'text-slate-300'}>{found.includes(w)?'✓ ':''}{w}</li>)}</ul><p>{found.length} de {words.length} palabras encontradas.</p></div>;
}

export function QuestionCard({ question:q, answer, onChange, index, hint, onHelp, onIssue, disabled=false, boardKey=q.id, selection, onSelection }: {boardKey?:string;selection?:[number,number]|null;onSelection?:(value:[number,number]|null)=>void;question:Question;answer:string;onChange:(value:string)=>void;index:number;hint?:string;onHelp:()=>void;onIssue:()=>void;disabled?:boolean}) {
  return <fieldset disabled={disabled} className="learning-panel min-w-0 max-w-full space-y-4"><legend className="font-bold px-2">Desafío {index+1}</legend>
    <p className="text-sm text-amber-200">{q.type==='textual'?'Fragmento textual · Completa según la versión indicada':q.type==='reflexion'?'Reflexión guiada · Sin calificación':'Pregunta de respuesta comprobable'}</p>
    {q.retired&&<p role="status" className="text-amber-200">Ficha anterior conservada para consulta. Su contenido está retirado y no se usa para nuevas tareas.</p>}{q.guidance&&<p className="text-amber-200">Para leer acompañados: {q.guidance}</p>}{q.contextNote&&<details><summary className="cursor-pointer py-2">Contexto del pasaje</summary><p>{q.contextNote}</p></details>}{q.support&&<p className="text-sm text-slate-300">{q.support}</p>}{q.lengthHint&&<p>La respuesta tiene {q.lengthHint} letras.</p>}
    {q.letter && <p className="font-bold text-xl">{q.letterRule==='contains'?'Contiene':'Comienza con'} {q.letter}</p>}<p className="whitespace-pre-line text-lg">{q.prompt}</p>
    {q.pieces && <p className="rounded-xl bg-slate-950 p-3 tracking-widest text-xl break-words">{q.pieces.join(' · ')}</p>}
    {q.masked && <p className="rounded-xl border-l-4 border-amber-400 bg-slate-950 p-4">{q.masked}</p>}
    <p className="text-sm text-slate-300">Referencia: {q.reference} · {q.version==='referencias'?'Consigna basada en la Biblia, no cita textual':q.version.toUpperCase()}</p>
    {q.mode==='word-search'?<WordBoard key={q.id} question={q} answer={answer} onChange={onChange} boardKey={boardKey} selection={selection} onSelection={onSelection}/>:q.options?<div className="space-y-2">{q.options.map((option,i)=><label key={i} className={`flex gap-3 rounded-xl border p-3 cursor-pointer ${answer===String(i)?'border-amber-400 bg-amber-500/10':'border-slate-600'}`}><input type="radio" name={`question-${q.id}`} checked={answer===String(i)} onChange={()=>onChange(String(i))}/><span>{option}</span></label>)}</div>:<label className="learning-label">{q.type==='textual'?'Escribe la frase completa':'Tu respuesta'}<input aria-label={q.type==='textual'?'Escribe la frase completa':'Tu respuesta'} className="learning-input" autoComplete="off" maxLength={1500} value={answer} onChange={e=>onChange(e.target.value)} /><span className="text-sm text-slate-300">Puedes escribir sin tildes y sin distinguir mayúsculas.</span></label>}
    {hint && <div role="status" className="rounded-xl border border-sky-500/40 p-4"><strong>Ayuda para repasar</strong><p>{hint}</p><p className="text-sm mt-2">Consultar también es aprender. Esta ayuda queda registrada.</p></div>}
    <div className="flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={onHelp}>Ver ayuda y referencia</Button><Button type="button" variant="ghost" onClick={onIssue}>Pedir aclaración</Button></div>
  </fieldset>;
}
