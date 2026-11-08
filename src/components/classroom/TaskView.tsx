"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { api, ApiError, dateLabel, levelNames, requestId, Snapshot, Task } from '@/lib/classroom';
import { Button } from '@/components/ui/button';
import { QuestionCard } from './QuestionCard';

export function TaskView({ task, snapshot, onClose, refresh }: {task:Task;snapshot:Snapshot;onClose:()=>void;refresh:()=>Promise<void>}) {
  const own = task.student===snapshot.user.id;
  const cacheKey=`dp_task_draft:${snapshot.user.id}:${task.id}`;
  const [answers,setAnswers]=useState<Record<string,string>>(()=>Object.fromEntries(task.questions.map(q=>[q.id,task.draft?.[q.id]?.answer||''])));
  const [hints,setHints]=useState<Record<string,string>>({});const [index,setIndex]=useState(0);const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);const [dirty,setDirty]=useState(false);
  const [showReview,setShowReview]=useState(task.attempts.length>0||!!task.retiredContent);const [choice,setChoice]=useState(0);const [issueReason,setIssueReason]=useState('ambigua');const [issueOpen,setIssueOpen]=useState(false);
  const [reviewedAttempt,setReviewedAttempt]=useState(task.attempts.length);
  const newAttempt=reviewedAttempt!==task.attempts.length;
  const revision=useRef(task.revision);const initialRevision=useRef(task.revision);const initialQuestions=useRef(task.questions);const queue=useRef(Promise.resolve());const submission=useRef(requestId());const lock=useRef(false);
  const [conflict,setConflict]=useState(false);
  const answersRef=useRef(answers);answersRef.current=answers;
  type SaveOperation={id:string;revision:number;answers:Record<string,string>};
  const pendingSave=useRef<SaveOperation|null>(null);
  const cache=useCallback(()=>{try{localStorage.setItem(cacheKey,JSON.stringify({answers:answersRef.current,revision:revision.current,pending:pendingSave.current}));}catch{}},[cacheKey]);
  useEffect(()=>{
    try{
      const cached=JSON.parse(localStorage.getItem(cacheKey)||sessionStorage.getItem(cacheKey)||'null');
      if(cached?.answers&&typeof cached.answers==='object'&&initialQuestions.current.every(q=>typeof (cached.answers[q.id]??'')==='string')){
        answersRef.current=cached.answers;setAnswers(cached.answers);setDirty(true);
        const op=cached.pending;
        if(op&&typeof op.id==='string'&&Number.isSafeInteger(op.revision)&&op.answers&&typeof op.answers==='object'&&Object.values(op.answers).every(v=>typeof v==='string')){pendingSave.current=op;revision.current=op.revision;}
        else if(cached.revision!==initialRevision.current)setConflict(true);
        setMessage('Recuperamos tus respuestas pendientes de guardar.');
      }
    }catch{/* La copia confirmada permanece en el servidor. */}
  },[cacheKey]);
  const flushPending=useCallback(async()=>{
    const op=pendingSave.current;if(!op)return;
    const result=await api<{revision:number}>('draft',{id:task.id,answers:op.answers,revision:op.revision,requestId:op.id});
    revision.current=result.revision;pendingSave.current=null;cache();
  },[cache,task.id]);
  const save = useCallback((values:Record<string,string>) => {
    const operation=queue.current.catch(()=>{}).then(async()=>{
      try{
        await flushPending();
        pendingSave.current={id:requestId(),revision:revision.current,answers:values};cache();
        await flushPending();
        if(JSON.stringify(answersRef.current)===JSON.stringify(values)){
          setDirty(false);try{localStorage.removeItem(cacheKey);sessionStorage.removeItem(cacheKey);}catch{}
        }
        setConflict(false);setMessage('Avance guardado. Puedes continuar después.');
      }catch(e){cache();if(e instanceof ApiError&&e.status===409)setConflict(true);throw e;}
    });
    queue.current=operation;return operation;
  },[cache,cacheKey,flushPending]);
  useEffect(()=>{if(!dirty||!own||busy||conflict)return;cache();const timeout=setTimeout(()=>{void save(answers).catch(e=>setMessage(e.message));},900);return()=>clearTimeout(timeout);},[answers,dirty,own,cache,save,busy,conflict]);
  async function resolveConflict(useMine:boolean){
    setBusy(true);
    try{
      await queue.current.catch(()=>{});
      const latest=(await api<Snapshot>('state')).tasks.find(t=>t.id===task.id);if(!latest)throw new Error('No encontramos la tarea. Tus respuestas siguen conservadas.');
      const serverAnswers=Object.fromEntries(latest.questions.map(q=>[q.id,latest.draft?.[q.id]?.answer||'']));
      // Conservar ambas versiones antes de que el alumno elija la que continuará.
      localStorage.setItem(cacheKey+':recovery',JSON.stringify({mine:answersRef.current,server:serverAnswers,date:Date.now()}));
      revision.current=latest.revision;pendingSave.current=null;setConflict(false);
      if(useMine)await save(answersRef.current);
      else{answersRef.current=serverAnswers;setAnswers(serverAnswers);setDirty(false);localStorage.removeItem(cacheKey);sessionStorage.removeItem(cacheKey);setMessage('Continuamos con la versión guardada. La otra copia sigue disponible abajo.');}
    }catch(e){setMessage((e as Error).message);}finally{setBusy(false);}
  }
  const q=task.questions[index];
  async function submit(){if(lock.current)return;lock.current=true;setBusy(true);try{await queue.current.catch(()=>{});await flushPending();const result=await api<{revision:number}>('submit',{id:task.id,answers,revision:revision.current,requestId:submission.current});revision.current=result.revision;setDirty(false);try{localStorage.removeItem(cacheKey);sessionStorage.removeItem(cacheKey);}catch{};setMessage('Entrega recibida. Puedes consultar tu devolución automática.');await refresh();setShowReview(true);}catch(e){if(e instanceof ApiError&&e.status===409)setConflict(true);setMessage((e as Error).message);}finally{lock.current=false;setBusy(false);}}
  return <div className="space-y-5"><Button variant="outline" disabled={busy} onClick={async()=>{if(own&&dirty){try{await save(answers);onClose();}catch(e){setMessage((e as Error).message);}}else onClose();}}>Volver a mis tareas</Button>
    <header className="learning-panel space-y-2"><h1 className="text-2xl font-bold">{task.title}</h1><p>{dateLabel(task.created)} · {levelNames[task.level]}</p><p>{own?`Educador: ${task.ownerLabel}`:`Alumno: ${task.studentLabel}`}</p><p>Aprendemos sin notas. Puedes consultar las referencias, usar ayudas y volver a intentarlo.</p>{task.retiredContent&&<p className="text-amber-200">Esta tarea conserva contenido de una edición anterior, retirado durante la revisión. Se mantiene para consulta; solicita a tu educador una tarea del catálogo revisado.</p>}{!task.writable&&!task.retiredContent&&<p className="text-amber-200">La vinculación terminó. Conservas esta tarea para consulta y práctica privada. No se enviarán nuevas entregas ni devoluciones.</p>}</header>
    <p role="status" aria-live="polite" className="text-amber-200">{message}</p>
    {own&&conflict&&<section role="alert" className="learning-panel space-y-3"><h2 className="font-bold">Hay dos versiones de tus respuestas</h2><p>Tus respuestas pendientes siguen aquí. Elige con cuál continuar; conservaremos una copia de ambas.</p><Button disabled={busy} onClick={()=>resolveConflict(true)}>Conservar mis respuestas</Button><Button variant="outline" disabled={busy} onClick={()=>resolveConflict(false)}>Usar la versión guardada</Button></section>}
    {own&&<details className="text-sm"><summary className="cursor-pointer py-2">Recuperar una copia anterior de esta tarea</summary><p>Disponible si resolviste un conflicto de versiones en este navegador.</p><Button variant="outline" disabled={busy} onClick={()=>{try{const backup=JSON.parse(localStorage.getItem(cacheKey+':recovery')||'null');if(!backup){setMessage('No hay una copia de conflicto para esta tarea.');return;}const next=backup.mine;answersRef.current=next;setAnswers(next);setDirty(true);setShowReview(false);setConflict(true);cache();setMessage('Copia recuperada. Revisa tus respuestas antes de guardarlas.');}catch{setMessage('No pudimos leer la copia. La versión guardada permanece en el servidor.');}}}>Ver mis respuestas anteriores</Button></details>}
    {own&&!showReview&&<><p>Desafío {index+1} de {task.questions.length}. Sin reloj.</p><progress className="w-full accent-amber-400" max={task.questions.length} value={Object.values(answers).filter(x=>x.trim()).length} aria-label="Respuestas completadas"/>
      <QuestionCard key={q.id} question={q} index={index} answer={answers[q.id]||''} boardKey={`${task.id}:${q.id}`} onChange={value=>{const next={...answersRef.current,[q.id]:value};answersRef.current=next;setAnswers(next);setDirty(true);cache();submission.current=requestId();}} hint={hints[q.id]} disabled={busy||!!task.retiredContent}
        onHelp={async()=>{try{const help=await api<{answer:string;explanation:string;options?:string[]}>('help',{id:task.id,question:q.id});setHints(prev=>({...prev,[q.id]:q.type==='reflexion'?(help.explanation||'Lee el pasaje y conversa sobre las opciones en la reunión.'):help.answer}));}catch(e){setMessage((e as Error).message);}}} onIssue={()=>setIssueOpen(true)}/>
      {issueOpen&&<section className="learning-panel space-y-3"><h2 className="font-bold">Solicitud de ayuda o aclaración</h2><label className="learning-label">Motivo<select className="learning-input" value={issueReason} onChange={e=>setIssueReason(e.target.value)}><option value="ambigua">No entiendo la pregunta</option><option value="respuesta">Mi respuesta no fue reconocida</option><option value="texto">Quiero revisar el texto o la referencia</option></select></label><p>Se guardará la pregunta y tu respuesta. Puedes exportarla desde Mis consultas; no se envía ningún mensaje.</p><Button disabled={busy} onClick={async()=>{setBusy(true);try{await api('issue',{question:q.id,answer:answers[q.id]||'',reason:issueReason});setMessage('Consulta guardada. Podrás revisarla y descargarla en PDF.');setIssueOpen(false);await refresh();}catch(e){setMessage((e as Error).message);}finally{setBusy(false);}}}>Guardar consulta</Button><Button variant="outline" onClick={()=>setIssueOpen(false)}>Cancelar</Button></section>}
      <div className="flex flex-wrap gap-3"><Button variant="outline" disabled={busy||index===0} onClick={()=>setIndex(index-1)}>Anterior</Button><Button disabled={busy||index===task.questions.length-1} onClick={()=>setIndex(index+1)}>Siguiente</Button><Button variant="outline" disabled={busy} onClick={async()=>{try{await save(answers);}catch(e){setMessage((e as Error).message);}}}>Guardar avance</Button></div>
      {index===task.questions.length-1&&<section className="learning-panel space-y-3"><p>Antes de entregar, revisa tus respuestas. El sistema las comprobará y luego el educador podrá consultarlas.</p><Button className="w-full" disabled={busy||conflict||!task.writable||task.questions.some(q=>!answers[q.id]?.trim())} onClick={submit}>{busy?'Confirmando entrega…':'Entregar tarea'}</Button>{task.questions.some(q=>!answers[q.id]?.trim())&&<p>Faltan respuestas. Puedes volver con Anterior o guardar para después.</p>}</section>}
    </>}
    {(showReview||!own)&&<section className="learning-panel space-y-4"><h2 className="text-xl font-bold">Devolución y próximos pasos</h2>{!task.attempts.length?<p>La tarea todavía no fue entregada. Los borradores del alumno son privados.</p>:<>{task.attempts.at(-1)!.results.map((r,i)=><article key={r.question} className="border-t border-slate-700 pt-4 space-y-2"><h3 className="font-bold">Desafío {i+1} · {r.type==='textual'?'Fragmento textual':r.type==='reflexion'?'Reflexión guiada':'Respuesta comprobable'}</h3><p>{r.encouragement}</p><p>Respuesta: {task.questions[i]?.options?.[Number(r.answer)]||r.answer}</p>{r.type!=='reflexion'&&<p>Respuesta de referencia: {r.expected}</p>}{r.explanation&&<p>{r.explanation}</p>}<p className="text-sky-200">{r.reference} {r.helped?'· Con ayuda en este intento':r.previouslyHelped?'· Consultaste ayuda en un intento anterior':''}</p>{own&&<Button variant="ghost" onClick={()=>{setIndex(i);setShowReview(false);setIssueOpen(true);}}>Consultar esta respuesta</Button>}</article>)}<p className="text-sm text-slate-300">Entregas conservadas: {task.attempts.length}. La corrección automática puede necesitar revisión; no mide tu fe.</p></>}
      {task.feedback&&<aside className="rounded-xl bg-sky-950 p-4"><h3 className="font-bold">Devolución del educador</h3><p>{task.feedback.text}</p></aside>}
      {own?(!task.retiredContent&&<Button onClick={()=>{setShowReview(false);setIndex(0);setHints({});submission.current=requestId();}}>Repasar y volver a intentar</Button>):task.attempts.length>0&&task.writable&&<>{newAttempt&&<div role="status" className="space-y-3 text-amber-200"><p>Hay una nueva entrega. Revisa sus respuestas antes de enviar la devolución.</p><Button onClick={()=>{setReviewedAttempt(task.attempts.length);setChoice(0);}}>Ya revisé la nueva entrega</Button></div>}<label className="learning-label">Elegir devolución<select className="learning-input" value={choice} onChange={e=>setChoice(Number(e.target.value))}>{snapshot.feedbackOptions.map((x,i)=><option value={i} key={x}>{x}</option>)}</select></label><Button disabled={busy||newAttempt} onClick={async()=>{setBusy(true);try{await api('feedback',{id:task.id,choice,attempt:reviewedAttempt});await refresh();setMessage('Devolución enviada dentro de la app.');}catch(e){setMessage((e as Error).message);}finally{setBusy(false);}}}>Enviar devolución preparada</Button></>}
    </section>}
  </div>;
}
