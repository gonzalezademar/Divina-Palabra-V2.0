import { changeProgressOwner } from './practice';
export type Level = 'principiante' | 'intermedio' | 'avanzado';
export const levelNames: Record<Level, string> = { principiante: 'Principiante', intermedio: 'Intermedio', avanzado: 'Avanzado' };
export const modeNames: Record<string, string> = { 'find-word': 'Encuentra la palabra', 'complete-phrase': 'Completa la frase', 'guess-the-phrase': 'Descubrir la frase', 'bible-rosco': 'El círculo de la palabra', 'word-search': 'Sopa de palabras', 'counseling-practical': 'Reflexión bíblica' };
export interface Question { levels?: Level[]; retired?: boolean; guidance?: string; contextNote?: string; contentKeys?: string[]; id: string; mode: string; version: string; type: string; prompt: string; reference: string; answer?: string; passage?: string; masked?: string; options?: string[]; explanation?: string; pieces?: string[]; syllables?: string[]; letter?: string; letterRule?: string; words?: string[]; support?: string; lengthHint?: number; }
export interface Result { question: string; answer: string; expected: string; correct: boolean | null; helped: boolean; previouslyHelped?:boolean; type: string; reference: string; encouragement: string; explanation: string; }
export interface Task { retiredContent?: boolean; id: string; requestId: string; title: string; owner: string; student: string; ownerLabel: string; studentLabel: string; level: Level; questions: Question[]; created: number; revision: number; writable: boolean; draft?: Record<string, { answer: string; helped: boolean }>; attempts: { date: number; results: Result[] }[]; feedback: { text: string; date: number; attempt: number } | null; }
export interface Link { id: string; owner: string; member: string; kind: 'class' | 'peer'; level: Level; active: boolean; otherLabel: string; }
export interface Issue { id: string; prompt: string; answer: string; reference: string; version: string; reason: string; created: number; }
export interface Snapshot { user: { id: string; alias: string; label: string; educator: boolean }; levels: Level[]; titles: string[]; feedbackOptions: string[]; links: Link[]; pending: { id: string; owner: string; member: string; otherLabel: string; number: string; kind: string; expires: number; memberConfirmed: boolean }[]; tasks: Task[]; rooms: { id: string; mode: string; level: Level; status: string; creator: string; created: number; members: {id: string;label: string}[] }[]; issues: Issue[]; }
export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }
export async function api<T = { ok: boolean }>(endpoint: string, body?: unknown): Promise<T> {
  let response: Response;
  try { response = await fetch(`/api/${endpoint}`, { method: body === undefined ? 'GET' : 'POST', headers: body === undefined ? undefined : { 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body), credentials: 'same-origin', signal: AbortSignal.timeout(12000), cache: 'no-store' }); }
  catch { throw new ApiError('No hay conexión con el servicio. Conserva esta pantalla y vuelve a intentar.', 0); }
  const data = await response.json().catch(() => ({ error: 'El servicio de cuentas no está disponible en esta dirección.' }));
  if (!response.ok) throw new ApiError(data.error || 'No pudimos completar la operación.', response.status);
  if(['register','login','recover'].includes(endpoint)&&data.user?.id)changeProgressOwner(data.user.id);
  if(endpoint==='logout')changeProgressOwner('guest');
  return data as T;
}
export const requestId = () => typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Array.from(crypto.getRandomValues(new Uint32Array(4))).join('-');
export const dateLabel = (n: number) => new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' }).format(n);
export async function exportIssues(issues: Issue[]) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF(); let y = 20;
  const write = (text: string, size = 11) => { doc.setFontSize(size); const lines = doc.splitTextToSize(text, 175) as string[]; for (const line of lines) { if (y > 275) { doc.addPage(); y = 20; } doc.text(line, 18, y); y += size * .5 + 1; } y += 3; };
  write('SOLICITUD DE AYUDA O ACLARACIÓN', 16);
  write('Divina Palabra · Consulta educativa. No es una calificación ni una afirmación de error bíblico.');
  write('Este archivo no incluye alias, identificadores de cuenta ni claves. Revisa las respuestas antes de compartirlo.');
  issues.forEach((q, i) => { write(`${i + 1}. ${dateLabel(q.created)}`, 13); write(`Motivo: ${q.reason === 'ambigua' ? 'Pregunta poco clara' : q.reason === 'texto' ? 'Revisar texto o referencia' : 'Respuesta no reconocida'}`); write(q.prompt); write(`Respuesta que deseo consultar: ${q.answer || '(sin respuesta)'}`); write(`Referencia: ${q.reference} · Versión: ${q.version}`); });
  doc.save('solicitud-de-ayuda-divina-palabra.pdf');
}
