"use client";
import { progressStorageKey } from '@/lib/practice';
import { useEffect, useState } from 'react';
import { exportIssues, Issue, requestId } from '@/lib/classroom';
import { Button } from '@/components/ui/button';
export function Clarification({prompt,answer,reference,version}:{prompt:string;answer:string;reference:string;version:string}) {
 const [items,setItems]=useState<Issue[]>([]);const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);
 useEffect(()=>{try{const value=JSON.parse(localStorage.getItem(progressStorageKey('dp_private_queries'))||'[]');if(Array.isArray(value))setItems(value.filter(x=>typeof x.prompt==='string'&&typeof x.answer==='string'));}catch{}},[]);
 function save(){const next=[...items,{id:requestId(),prompt,answer,reference,version,reason:'respuesta',created:Date.now()}];setItems(next);try{localStorage.setItem(progressStorageKey('dp_private_queries'),JSON.stringify(next));setMessage('Consulta guardada en este navegador. Puedes descargarla para pedir ayuda.');}catch{setMessage('No pudimos guardarla en este navegador. Descarga el PDF antes de salir.');}}
 return <details className="learning-panel text-left"><summary className="cursor-pointer font-bold py-2">¿La pregunta o tu respuesta necesitan revisión?</summary><div className="space-y-3 mt-3"><p>Guarda una solicitud de ayuda. No se envía a otra persona ni modifica el resultado de la actividad.</p><p>Respuesta que se guardará: {answer||'(sin respuesta escrita)'}</p><Button variant="outline" onClick={save}>Guardar esta consulta</Button><p role="status">{message}</p>{items.length>0&&<><p>{items.length} consultas privadas. Revisa que tus respuestas no incluyan información personal antes de compartir el archivo.</p><Button disabled={busy} onClick={async()=>{setBusy(true);try{await exportIssues(items);}catch{setMessage('No pudimos generar el PDF. Vuelve a intentarlo.');}finally{setBusy(false);}}}>Descargar mis consultas en PDF</Button></>}</div></details>;
}
