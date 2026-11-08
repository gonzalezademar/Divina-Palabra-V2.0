"use client";
import { useEffect, useRef, useState } from 'react';
import { api, Level, levelNames, Snapshot } from '@/lib/classroom';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function Scan({ onScan, onError }: { onScan: (text: string) => void; onError: (text: string) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    let stopped = false; let stream: MediaStream | undefined; let frame = 0;
    async function start() {
      try {
        const { default: jsQR } = await import('jsqr');
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        if (stopped) { stream.getTracks().forEach(t=>t.stop()); return; }
        video.current!.srcObject = stream; await video.current!.play();
        const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        const scan = () => { if (stopped) return; const v = video.current; if (v && v.readyState >= 2) { canvas.width = Math.min(v.videoWidth, 640); canvas.height = v.videoHeight * canvas.width / v.videoWidth; ctx.drawImage(v,0,0,canvas.width,canvas.height); const pixels = ctx.getImageData(0,0,canvas.width,canvas.height); const code = jsQR(pixels.data, pixels.width, pixels.height); if (code) { onScan(code.data); return; } } frame = requestAnimationFrame(scan); }; scan();
      } catch { onError('No pudimos usar la cámara. Puedes escanear con la cámara del teléfono o pegar el enlace del QR. En otro dispositivo la cámara necesita una conexión HTTPS.'); }
    }
    void start(); return () => { stopped = true; cancelAnimationFrame(frame); stream?.getTracks().forEach(t=>t.stop()); };
  }, [onScan, onError]);
  return <video ref={video} muted playsInline className="w-full max-w-sm rounded-xl" aria-label="Cámara para escanear el QR" />;
}

export function Pairing({ snapshot, refresh, kind }: { snapshot: Snapshot; refresh: () => Promise<void>; kind: 'class' | 'peer' }) {
  const [show, setShow] = useState(false); const [qr, setQr] = useState(''); const [url, setUrl] = useState(''); const [entry, setEntry] = useState('');
  const [camera, setCamera] = useState(false); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false); const [level, setLevel] = useState<Level>('principiante');
  async function reserve(text: string) {
    setCamera(false);
    try {
      let token=text.trim(); if(token.includes('://')) {const parsed=new URL(token); if(parsed.origin!==location.origin) throw new Error('Abre el QR desde la cámara del teléfono para acceder a la misma dirección de la app.'); token=new URLSearchParams(parsed.hash.slice(1)).get('vincular')||'';}
      await api('join',{token,confirm:false});setEntry('');setMessage('QR leído. Tienes dos minutos para revisar y confirmar la vinculación.');await refresh();
    }catch(e){setMessage((e as Error).message);}
  }
  const receive = useRef((text: string) => { void reserve(text); });
  const scanError = useRef((text: string) => { setMessage(text); setCamera(false); });
  useEffect(() => { const token = new URLSearchParams(location.hash.slice(1)).get('vincular'); if (token) { receive.current(token); history.replaceState(null, '', location.pathname); } }, []);
  useEffect(() => {
    if (!show) return; let stop = false; let timeout: ReturnType<typeof setTimeout>;
    async function rotate() { try { const data = await api<{token:string;expires:number;serverNow:number}>('invite', {kind}); const value = `${location.origin}/classroom#vincular=${data.token}`; const QR = await import('qrcode'); const image = await QR.toDataURL(value, { width: 280, margin: 3 }); if (!stop) {setQr(image);setUrl(value);timeout = setTimeout(rotate, Math.max(100, data.expires-data.serverNow+50));} } catch(e) { if (!stop) {setQr('');setUrl('');setMessage((e as Error).message);timeout = setTimeout(rotate, 5000);} } }
    void rotate(); return () => {stop=true;clearTimeout(timeout);};
  }, [show, kind]);
  async function join() { if (busy) return; setBusy(true); try { let token = entry.trim(); if (token.includes('://')) { const parsed = new URL(token); if (parsed.origin !== location.origin) throw new Error('El QR corresponde a otra dirección de la app. Ábrelo desde la cámara del teléfono.'); token = new URLSearchParams(parsed.hash.slice(1)).get('vincular') || ''; } const result = await api<{number:string}>('join', {token}); setEntry('');setMessage(`Solicitud enviada. Comparen el número ${result.number} y esperen la confirmación de la otra persona.`); await refresh(); } catch(e) {setMessage((e as Error).message);} finally{setBusy(false);} }
  const canShow = kind === 'peer' || snapshot.user.educator;
  return <section className="learning-panel space-y-4"><h2 className="text-xl font-bold">{kind === 'class' ? 'Vinculación con el educador' : 'Vincular a otra persona'}</h2><p>Primero, ambos deben entrar a sus cuentas. Háganlo juntos: uno muestra su QR, el otro lo escanea y confirma. Comparen el número antes de aceptar. El vínculo se mantiene hasta que alguien lo retire.</p>
    {canShow && <Button variant="outline" onClick={()=>setShow(!show)}>{show ? 'Cerrar mi QR' : 'Mostrar mi QR'}</Button>}
    {show && <div className="space-y-3"><p>El QR cambia cada 5 segundos. Después de escanear tendrán 2 minutos para confirmar.</p>{qr ? <Image unoptimized src={qr} width={280} height={280} alt="QR de vinculación temporal" className="max-w-full rounded-xl" /> : <p role="status">Preparando QR…</p>}<details><summary className="cursor-pointer py-2">Alternativa si la cámara no funciona</summary><label className="learning-label">Enlace temporal del QR<input className="learning-input" readOnly value={url} onFocus={e=>e.target.select()} /></label><p className="text-sm">Se vence junto con el QR. No contiene datos de tareas ni contraseñas.</p></details></div>}
    <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={()=>{setCamera(!camera);setMessage('');}}>{camera ? 'Cerrar cámara' : 'Escanear un QR'}</Button></div>
    {camera && <Scan onScan={receive.current} onError={scanError.current} />}
    <label className="learning-label">Enlace o código leído del QR<input className="learning-input" value={entry} onChange={e=>setEntry(e.target.value)} autoComplete="off" /></label><p className="text-sm text-slate-300">Al confirmar permites que esta persona te envíe actividades y reciba las respuestas correspondientes. No se comparte tu alias privado.</p><Button onClick={join} disabled={busy || !entry.trim()}>{busy ? 'Enviando…' : 'Confirmar mi solicitud de vinculación'}</Button>
    <p role="status" className="text-amber-200">{message}</p>
    {snapshot.pending.map(p => <div key={p.id} className="rounded-xl bg-slate-950 border border-slate-600 p-4 space-y-3"><p>{p.otherLabel} · Número de confirmación: <strong className="text-2xl">{p.number}</strong></p>{p.owner === snapshot.user.id ? !p.memberConfirmed ? <p>La otra persona está revisando la solicitud. Espera su confirmación.</p> : <><p>Confirma que es la persona que está contigo.</p>{p.kind === 'class' && <label className="learning-label">Nivel inicial<select className="learning-input" value={level} onChange={e=>setLevel(e.target.value as Level)}>{Object.entries(levelNames).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>}<div className="flex gap-2"><Button disabled={busy} onClick={async()=>{setBusy(true);try{await api('confirm',{id:p.id,accept:true,level});await refresh();setMessage('Vinculación confirmada.');}catch(e){setMessage((e as Error).message);}finally{setBusy(false);}}}>Sí, vincular</Button><Button variant="outline" disabled={busy} onClick={async()=>{try{await api('confirm',{id:p.id,accept:false});await refresh();}catch(e){setMessage((e as Error).message);}}}>Rechazar</Button></div></> : p.memberConfirmed ? <p>Tu confirmación está registrada. Esperando a la otra persona…</p> : <><p>Confirma que esta es la persona con la que deseas compartir las actividades correspondientes.</p><Button disabled={busy} onClick={async()=>{setBusy(true);try{await api('join',{pending:p.id});await refresh();}catch(e){setMessage((e as Error).message);}finally{setBusy(false);}}}>Confirmar mi vinculación</Button></>}</div>)}
  </section>;
}
