"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { api, levelNames, modeNames, Question, Result, Snapshot } from '@/lib/classroom';
import { Button } from '@/components/ui/button';
import { QuestionCard } from './QuestionCard';
interface Room { id:string;creator:string;mode:string;level:keyof typeof levelNames;status:string;index:number;total:number;peerProgress:number;paused:boolean;question:Question|null;ownResults:Result[];results:{label:string;count:number}[]|null; }
export function OnlineRoom({id,snapshot,onClose}:{id:string;snapshot:Snapshot;onClose:()=>void}) {
  const [room,setRoom]=useState<Room|null>(null);const [draft,setDraft]=useState<{question:string;answer:string;selection:[number,number]|null}>({question:'',answer:'',selection:null});const [saveError,setSaveError]=useState(false);const [hint,setHint]=useState('');const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);const [last,setLast]=useState<Result|null>(null);const lock=useRef(false);
  const refresh=useCallback(async()=>{const value=await api<Room>(`room?id=${encodeURIComponent(id)}`);setRoom(value);return value;},[id]);
  useEffect(()=>{let stop=false;let timeout:ReturnType<typeof setTimeout>;async function tick(){try{if(document.hidden)return;const value=await api<Room>('room-heartbeat',{id});if(stop)return;setRoom(value);setMessage(previous=>previous.startsWith('No hay conexión')?'Conexión recuperada. Puedes continuar.':previous);}catch(e){if(!stop)setMessage((e as Error).message);}finally{if(!stop)timeout=setTimeout(tick,2500);}}void tick();return()=>{stop=true;clearTimeout(timeout);};},[id]);
  const draftRef=useRef(draft);draftRef.current=draft;
  const questionId=room?.question?.id||'';
  const activeQuestion=useRef('');activeQuestion.current=questionId;
  const draftKey=`dp_room_draft_v1:${snapshot.user.id}:${id}:${questionId}`;
  const answer=draft.question===questionId?draft.answer:'';
  useEffect(()=>{
    setHint('');
    try{const cached=JSON.parse(localStorage.getItem(draftKey)||'null');const selection=Array.isArray(cached?.selection)&&cached.selection.length===2&&cached.selection.every((n:unknown)=>Number.isInteger(n)&&Number(n)>=0&&Number(n)<100)?cached.selection:null;setDraft({question:questionId,answer:typeof cached?.answer==='string'?cached.answer:'',selection});}catch{setDraft({question:questionId,answer:'',selection:null});}
  },[questionId,draftKey]);
  function updateDraft(values:Partial<typeof draft>){
    const next={...draftRef.current,...values,question:questionId};draftRef.current=next;setDraft(next);
    try{localStorage.setItem(draftKey,JSON.stringify(next));setSaveError(false);}catch{setSaveError(true);}
  }

  async function send(){if(!room||lock.current)return;lock.current=true;setBusy(true);try{const result=await api<{result:Result}>('room-answer',{id,index:room.index,answer});try{localStorage.removeItem(draftKey);}catch{};setLast(result.result);setMessage('Respuesta registrada.');await refresh();}catch(e){setMessage((e as Error).message);await refresh().catch(()=>{});}finally{lock.current=false;setBusy(false);}}
  if(!room)return <section className="learning-panel"><p role="status">Abriendo encuentro… {message}</p><Button variant="outline" onClick={onClose}>Volver</Button></section>;
  const finished=room.status==='finished';const scores=room.results||[];const top=Math.max(...scores.map(s=>s.count));const winners=scores.filter(s=>s.count===top);
  return <div className="space-y-5"><Button variant="outline" onClick={onClose}>Volver · Conservar el encuentro</Button><section className="learning-panel space-y-3"><h1 className="text-2xl font-bold">Encuentro: {modeNames[room.mode]}</h1><p>{levelNames[room.level]} · {room.total} desafíos · Sin reloj</p><p>Ambos reciben los mismos desafíos. Cada respuesta correcta sin revelar la ayuda cuenta una vez. No se restan puntos. La reflexión se comparte como actividad, sin ganador.</p><p>Tu avance: {room.index}/{room.total} · Otra persona: {room.peerProgress}/{room.total}</p><p role="status" className="text-amber-200">{message}</p>
      {room.status==='invited'&&(room.creator===snapshot.user.id?<p>Invitación preparada. La otra persona debe aceptarla en sus encuentros.</p>:<Button disabled={busy} onClick={async()=>{setBusy(true);try{await api('room-accept',{id});await refresh();}catch(e){setMessage((e as Error).message);}finally{setBusy(false);}}}>Aceptar y comenzar encuentro</Button>)}
      {room.status==='closed'&&<p>El encuentro se cerró. No se declara ganador por una interrupción.</p>}
      {room.paused&&<p role="status">Esperando conexión de la otra persona. El avance está guardado; no hay penalización ni reloj corriendo.</p>}
      {finished&&<div className="rounded-xl bg-slate-950 p-4 space-y-3"><h2 className="text-xl font-bold">{room.mode==='counseling-practical'?'Reflexión compartida completada':winners.length>1?'Empate':`Mayor cantidad de aciertos: ${winners[0]?.label}`}</h2>{room.mode!=='counseling-practical'&&scores.map(s=><p key={s.label}>{s.label}: {s.count} respuestas correctas sin ayuda.</p>)}<p>Gracias por participar. Pueden repasar y comenzar otro encuentro cuando quieran.</p></div>}
      {room.status==='active'&&!room.question&&<p>Completaste tu parte. Esperamos a la otra persona para mostrar el resultado.</p>}
    </section>
    {saveError&&<p role="alert">Este navegador no pudo guardar la respuesta pendiente. Confírmala antes de salir o conserva esta pantalla.</p>}
    {last&&<aside className="learning-panel space-y-2"><h2 className="font-bold">Respuesta anterior</h2><p>{last.encouragement}</p>{last.type!=='reflexion'&&<p>Respuesta de referencia: {last.expected}</p>}<p>{last.reference}</p>{last.helped&&<p>Se utilizó ayuda; este desafío no suma al contador.</p>}</aside>}
    {room.status==='active'&&room.question&&<><QuestionCard key={room.question.id} question={room.question} answer={answer} onChange={value=>updateDraft({answer:value})} boardKey={`${id}:${questionId}`} selection={draft.question===questionId?draft.selection:null} onSelection={selection=>updateDraft({selection})} index={room.index} hint={hint} disabled={busy||room.paused||draft.question!==questionId} onHelp={async()=>{const requested=questionId;setBusy(true);try{const help=await api<{answer:string}>('room-help',{id,index:room.index,question:requested});if(activeQuestion.current===requested)setHint(room.question?.type==='reflexion'?'Consulta el pasaje y elige una opción para conversar.':help.answer);}catch(e){setMessage((e as Error).message);}finally{setBusy(false);}}} onIssue={async()=>{try{await api('issue',{question:room.question!.id,answer,reason:'ambigua'});setMessage('Consulta guardada. Puedes exportarla desde Mis consultas.');}catch(e){setMessage((e as Error).message);}}}/><Button className="w-full" disabled={busy||room.paused||!answer.trim()} onClick={send}>{busy?'Registrando…':'Confirmar respuesta'}</Button></>}
    {['active','invited'].includes(room.status)&&<details className="learning-panel"><summary className="cursor-pointer">Finalizar este encuentro</summary><p className="my-3">Se cerrará para ambos sin declarar un ganador. La vinculación permanece.</p><Button variant="outline" disabled={busy} onClick={async()=>{try{await api('room-close',{id});await refresh();}catch(e){setMessage((e as Error).message);}}}>Confirmar finalización</Button></details>}
  </div>;
}
