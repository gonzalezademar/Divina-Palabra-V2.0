"use client";
import { FormEvent, useRef, useState } from 'react';
import { api } from '@/lib/classroom';
import { Button } from '@/components/ui/button';

export function Account({ onReady }: { onReady: () => void }) {
  const [mode, setMode] = useState('login');
  const [alias, setAlias] = useState(''); const [password, setPassword] = useState(''); const [recovery, setRecovery] = useState('');
  const [newCode, setNewCode] = useState(''); const [busy, setBusy] = useState(false); const [message, setMessage] = useState(''); const lock = useRef(false);
  async function submit(e: FormEvent) {
    e.preventDefault(); if (lock.current) return; lock.current = true; setBusy(true); setMessage('');
    try { const result = await api<{ recovery?: string }>(mode, { alias, password, recovery }); setPassword(''); if (result.recovery) setNewCode(result.recovery); else onReady(); }
    catch (error) { setMessage((error as Error).message); } finally { lock.current = false; setBusy(false); }
  }
  if (newCode) return <section className="learning-panel space-y-4"><h2 className="text-xl font-bold">Guarda tu clave de recuperación</h2><p>Te permitirá recuperar el acceso si olvidas la contraseña. No la compartas con tu educador ni con otros participantes. Una clave nueva reemplaza la anterior.</p><code className="block break-all bg-slate-950 p-4 text-amber-200 select-all">{newCode}</code><Button onClick={() => { const link = document.createElement('a'); const url = URL.createObjectURL(new Blob([`Divina Palabra\nAlias: ${alias}\nClave de recuperación: ${newCode}\nGuárdala en un lugar privado. No es una clave de tarea.`], { type: 'text/plain;charset=utf-8' })); link.href = url; link.download = 'mi-clave-de-recuperacion.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }}>Descargar mi clave</Button><Button variant="outline" onClick={onReady}>Ya la guardé · Continuar</Button></section>;
  return <section className="learning-panel space-y-5"><div><h2 className="text-2xl font-bold">{mode === 'register' ? 'Crea tu cuenta' : mode === 'recover' ? 'Recupera tu cuenta' : 'Entra a tu cuenta'}</h2><p className="text-slate-300 mt-2">Tu alias es privado. Las personas vinculadas te verán con un número de participante. No solicitamos edades.</p></div>
    <div className="flex flex-wrap gap-2">{[['login','Entrar'],['register','Crear cuenta'],['recover','Olvidé mi contraseña']].map(([key,label]) => <Button key={key} variant={mode === key ? 'default' : 'outline'} disabled={busy} onClick={() => {setMode(key);setMessage('');setPassword('');}}>{label}</Button>)}</div>
    <form onSubmit={submit} className="space-y-4"><label className="learning-label">Alias privado<input aria-label="Alias privado" className="learning-input" autoComplete="username" required minLength={3} maxLength={24} pattern="[\p{L}\p{N}_]+" autoCapitalize="none" spellCheck={false} value={alias} onChange={e => setAlias(e.target.value)} /><span className="text-sm text-slate-300">Entre 3 y 24 letras, números o guion bajo. Sin espacios.</span></label>
      {mode === 'recover' && <label className="learning-label">Clave de recuperación<input className="learning-input" autoComplete="off" required value={recovery} onChange={e=>setRecovery(e.target.value)} /><span className="text-sm text-slate-300">Sin esta clave ni tu contraseña no podremos recuperar el acceso. No usamos preguntas personales.</span></label>}
      <label className="learning-label">{mode === 'recover' ? 'Nueva contraseña' : 'Contraseña'}<input aria-label={mode === 'recover' ? 'Nueva contraseña' : 'Contraseña'} className="learning-input" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={mode === 'login' ? 1 : 12} maxLength={128} value={password} onChange={e => setPassword(e.target.value)} />{mode !== 'login' && <span className="text-sm text-slate-300">Al menos 12 caracteres. Puedes usar una frase que recuerdes.</span>}</label>
      {mode === 'register' && <p className="text-sm text-slate-300">Guardaremos la cuenta, los vínculos y las tareas en el servicio de esta aplicación. Sin chat ni perfiles públicos. Al crearla recibirás una clave para recuperar el acceso; no se envía correo.</p>}
      <p role="alert" className="text-amber-200">{message}</p><Button className="w-full" disabled={busy}>{busy ? 'Un momento…' : mode === 'register' ? 'Crear mi cuenta' : mode === 'recover' ? 'Recuperar acceso' : 'Entrar'}</Button>
    </form></section>;
}
