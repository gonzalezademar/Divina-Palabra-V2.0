import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, createHash, scrypt as scryptCallback, timingSafeEqual, randomInt } from 'node:crypto';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import practice from './practice.cjs';
import catalogue from './catalog.json' with { type: 'json' };
import archived from './catalog-archive.json' with { type: 'json' };

const scrypt = promisify(scryptCallback);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const byId = new Map([...archived, ...catalogue].map(q => [q.id, q]));
const activeIds = new Set(catalogue.map(q => q.id));
export const LEVELS = ['principiante', 'intermedio', 'avanzado'];
export const FEEDBACK = [
  'Reconociste las ideas del pasaje. Continúa con el siguiente recorrido.',
  'Revisa las referencias señaladas y vuelve a intentarlo con calma.',
  'Usar las ayudas también forma parte del aprendizaje.',
  'Hay distintas aplicaciones posibles. Conversaremos sobre ellas en la reunión.',
  'Lo revisaremos en la reunión. Conserva tu solicitud de aclaración.'
];
export const TITLES = ['Aprendemos de la Biblia', 'Personajes y acontecimientos', 'Comprendemos un pasaje', 'Repasamos juntos', 'Reflexionamos sobre lo aprendido'];
const id = () => randomBytes(18).toString('base64url');
const digest = text => createHash('sha256').update(text).digest('hex');
const normalize = x => String(x ?? '').trim().toUpperCase().replace(/Ñ/g, '\uE000').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\uE000/g, 'Ñ').replace(/[^A-ZÑ0-9\s|]/g, '').replace(/\s+/g, ' ').replace(/\bSENOR\b/g, 'SEÑOR');
const matches = (input, q) => [q.answer, ...(q.accepted || [])].some(x => normalize(input) === normalize(x));
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
const check = (condition, message = 'No puedes acceder a este elemento.', status = 403) => { if (!condition) fail(status, message); };
const passwordHash = async (password, salt = randomBytes(16).toString('hex')) => `${salt}:${(await scrypt(password, salt, 64)).toString('hex')}`;
async function verifyPassword(password, hash) {
  if (!hash) { await passwordHash(password, '0'.repeat(32)); return false; }
  const calculated = await passwordHash(password, hash.split(':')[0]);
  return timingSafeEqual(Buffer.from(calculated), Buffer.from(hash));
}
const validatePassword = value => check(typeof value === 'string' && value.length >= 12 && value.length <= 128, 'Usa una contraseña de 12 a 128 caracteres. Puede ser una frase fácil de recordar.', 400);
const shuffle = items => { const a = [...items]; for (let i = a.length - 1; i > 0; i--) { const j = randomInt(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const studentLabel = user => `Participante ${user.code}`;

// El servidor decide respuestas, permisos y transiciones. El cliente nunca envía puntos.
export function createService({ dbPath = path.join(root, 'var/divina.sqlite'), origin, allowedOrigins = [], store, now = Date.now } = {}) {
  let db;
  if (!store) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    db = new DatabaseSync(dbPath);
    db.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY CHECK(id=1), value TEXT NOT NULL)');
  }
  let state = db ? JSON.parse(db.prepare('SELECT value FROM state WHERE id=1').get()?.value || 'null') : null;
  state ||= { users: [], sessions: [], links: [], invites: [], pending: [], tasks: [], rooms: [], issues: [] };
  let dirty = false;
  let requestRates = new Set();
  const persist = () => {
    if (store) { dirty = true; return; }
    db.prepare('INSERT INTO state(id,value) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET value=excluded.value').run(JSON.stringify(state));
  };
  const buckets = new Map();
  const takeRate = async (key, max = 20, duration = 60_000) => {
    if (store) {
      if (!requestRates.has(key)) { await store.rate(key, max, duration); requestRates.add(key); }
      return;
    }
    const bucket = buckets.get(key);
    const next = !bucket || bucket.end <= now() ? { count: 1, end: now() + duration } : { ...bucket, count: bucket.count + 1 };
    buckets.set(key, next);
    if (buckets.size > 10000) for (const [k, v] of buckets) if (v.end < now()) buckets.delete(k);
    check(next.count <= max, 'Demasiados intentos. Espera un minuto y vuelve a intentarlo.', 429);
  };
  const publicUser = u => ({ id: u.id, alias: u.alias, label: studentLabel(u), educator: !!u.educator });
  const userBy = key => state.users.find(u => u.id === key);
  const linkFor = (a, b, kind) => state.links.find(l => l.active && l.kind === kind && ((l.owner === a && l.member === b) || (kind === 'peer' && l.owner === b && l.member === a)));
  const taskLink = t => state.links.find(l => l.id === t.link && l.active);
  const safeQuestion = (q, index, level) => {
    const { answer, accepted, contentKeys, ...safe } = q;
    const parts = level === 'principiante' && q.syllables?.length ? q.syllables : [...q.answer];
    let pieces = parts.map((text,i)=>({text,order:digest(`${q.id}:${level}:${i}`)})).sort((a,b)=>a.order.localeCompare(b.order)).map(x=>x.text);
    if(pieces.join('') === parts.join('') && new Set(parts).size > 1) pieces = [...parts.slice(1),parts[0]];
    const masked = q.passage?.split(' ').map((w, i) => (i % (level === 'principiante' ? 6 : level === 'intermedio' ? 3 : 2) === 1 ? '____' : w)).join(' ');
    // Las citas completas se revelan como ayuda, no se alteran en el catálogo.
    const support = level === 'principiante' ? 'Paso a paso: lee la consigna, consulta la referencia y usa la ayuda si la necesitas.' : level === 'intermedio' ? 'Relaciona la consigna con el pasaje. Puedes consultar la ayuda cuando lo necesites.' : 'Responde y contrasta tu conclusión con el contexto del pasaje. La ayuda sigue disponible.';
    return { ...safe, passage: undefined, masked, index, support, lengthHint: q.mode === 'bible-rosco' && level !== 'avanzado' ? q.answer.length : undefined, pieces: q.mode === 'find-word' ? pieces : undefined };
  };
  const resultFor = (q, answer, help) => ({ question: q.id, answer, reference: q.reference, expected: q.answer, correct: q.type === 'reflexion' ? null : matches(answer, q), type: q.type, helped: !!help, explanation: q.explanation || '', encouragement: q.type === 'reflexion' ? 'Gracias por reflexionar. Compara las opciones con el pasaje y continúa en la reunión.' : matches(answer, q) ? 'Reconociste esta respuesta. Sigue aprendiendo.' : 'Revisemos este detalle. Lee el pasaje y vuelve a intentarlo con calma.' });
  const retiredTask = t => t.questions.some(id => !activeIds.has(id));
  const taskView = (t, u) => ({ ...t, questions: t.questions.map((q, i) => safeQuestion(byId.get(q), i, t.level)), retiredContent:retiredTask(t), writable: !!taskLink(t)&&!retiredTask(t), ownerLabel: studentLabel(userBy(t.owner)), studentLabel: studentLabel(userBy(t.student)), draft: u.id === t.student ? t.draft : undefined,
    updated: u.id === t.student ? t.updated : undefined, revision: u.id === t.student ? t.revision : 0,
    // Las respuestas libres rechazadas quedan privadas: no se convierten en mensajes al educador.
    attempts: u.id === t.student ? t.attempts : t.attempts.map(a => ({...a, results: a.results.map(r => ({...r, answer: r.type === 'reflexion' ? r.answer : r.correct ? r.expected : 'Respuesta para repasar'}))}))
  });
  const roomView = (r, u) => {
      const index = r.answers[u.id].length;
      const peer = r.members.find(k => k !== u.id);
      const absent = r.status === 'active' && (r.heartbeat[peer] || 0) < now() - 15000;
      return { ...r, questions: undefined, answers: undefined, helped: undefined, heartbeat: undefined, total: r.questions.length, index, peerProgress: r.answers[peer].length, paused: absent, question: index < r.questions.length ? safeQuestion(byId.get(r.questions[index]), index, r.level) : null, ownResults: r.answers[u.id], results: r.status === 'finished' ? r.members.map(k => ({ label: studentLabel(userBy(k)), count: r.answers[k].filter(a => a.correct).length })) : null };
  };
  const cleanup = () => {
    state.sessions = state.sessions.filter(x => x.expires > now());
    state.invites = state.invites.filter(x => x.expires > now());
    state.pending = state.pending.filter(x => x.expires > now());
  };
  const issueSession = (user, response) => {
    const token = id();
    state.sessions.push({ hash: digest(token), user: user.id, expires: now() + 7 * 86400000 });
    response.setHeader('Set-Cookie', `dp_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800${origin?.startsWith('https:') ? '; Secure' : ''}`);
  };
  const publicSnapshot = u => ({
    user: publicUser(u), levels: LEVELS, titles: TITLES, feedbackOptions: FEEDBACK,
    links: state.links.filter(l => l.owner === u.id || l.member === u.id).map(l => ({ ...l, otherLabel: studentLabel(userBy(l.owner === u.id ? l.member : l.owner)) })),
    pending: state.pending.filter(p => p.owner === u.id || p.member === u.id).map(p => ({ ...p, otherLabel: studentLabel(userBy(p.owner === u.id ? p.member : p.owner)) })),
    tasks: state.tasks.filter(t => t.student === u.id || t.owner === u.id).map(t => taskView(t, u)),
    rooms: state.rooms.filter(r => r.members.includes(u.id)).map(r => ({ id: r.id, mode: r.mode, level: r.level, status: r.status, creator: r.creator, members: r.members.map(k => ({ id: k, label: studentLabel(userBy(k)) })), created: r.created })),
    issues: state.issues.filter(i => i.user === u.id)
  });
  let queue = Promise.resolve();
  async function api(req, res, url) {
    cleanup();
    const method = req.method;
    if (!['GET', 'POST'].includes(method)) fail(405, 'Acción no admitida.');
    const expectedOrigin = origin || `http://${req.headers.host}`;
    if (method === 'POST') {
      check([expectedOrigin, ...allowedOrigins].includes(req.headers.origin), 'La solicitud no procede de esta aplicación.', 403);
      check(req.headers['content-type']?.startsWith('application/json'), 'Formato de solicitud no válido.', 415);
    }
    const clientAddress = store && process.env.VERCEL === '1' ? req.headers['x-vercel-forwarded-for'] || req.socket.remoteAddress : req.socket.remoteAddress;
    await takeRate(`all:${clientAddress}`, 6000);
    let data = {};
    if (method === 'POST') {
      data = req.parsedData;
      check(data && typeof data === 'object' && !Array.isArray(data), 'Solicitud no válida.', 400);
    }
    const endpoint = url.pathname.slice(5);
    if (endpoint === 'health' && method === 'GET') return { status: 'ok', storage: store ? 'supabase' : 'sqlite' };
    if (['register', 'login', 'recover'].includes(endpoint) && method === 'POST') {
      await takeRate(`auth:${clientAddress}`, 120);
      check(typeof data.alias === 'string' && /^[\p{L}\p{N}_]{3,24}$/u.test(data.alias.trim().normalize('NFC')), 'El alias necesita entre 3 y 24 letras, números o guion bajo.', 400);
      check(typeof data.password === 'string' && data.password.length <= 128, 'Revisa la contraseña.', 400);
      const alias = data.alias.trim().normalize('NFC').toLocaleLowerCase('es');
      await takeRate(`auth-account:${alias}`, 12);
      let u = state.users.find(x => x.alias === alias);
      let recovery;
      if (endpoint === 'register') {
        validatePassword(data.password);
        check(!u, 'Ese alias no está disponible. Elige otro.', 409);
        recovery = randomBytes(18).toString('hex');
        u = { id: id(), alias, password: await passwordHash(data.password), recovery: digest(recovery), code: state.users.length + 1001, educator: false, created: now() };
        state.users.push(u);
      } else if (endpoint === 'login') check(await verifyPassword(data.password, u?.password), 'El alias o la contraseña no coinciden.', 401);
      else {
        validatePassword(data.password);
        check(u && typeof data.recovery === 'string' && u.recovery === digest(data.recovery.trim()), 'No pudimos recuperar la cuenta con esos datos.', 401);
        u.password = await passwordHash(data.password);
        recovery = randomBytes(18).toString('hex'); u.recovery = digest(recovery);
        state.sessions = state.sessions.filter(s => s.user !== u.id);
      }
      issueSession(u, res); persist(); return { user: publicUser(u), recovery };
    }
    const token = req.headers.cookie?.match(/(?:^|;\s*)dp_session=([^;]+)/)?.[1];
    const session = token && state.sessions.find(s => s.hash === digest(token));
    const u = session && userBy(session.user);
    if (method === 'GET' && endpoint === 'identity') return {user:u?publicUser(u):null};
    check(u, 'Inicia sesión para continuar. Tu trabajo guardado se conserva.', 401);
    await takeRate(`user:${u.id}`, 300);
    if (method === 'GET' && endpoint === 'state') return publicSnapshot(u);
    if (method === 'GET' && endpoint === 'catalog') { check(u.educator, 'Activa las herramientas de Educador para preparar tareas con soluciones.'); return catalogue; } // catálogo precargado para preparar tareas; no acepta contenido del cliente
    if (method === 'POST' && endpoint === 'logout') {
      state.sessions = state.sessions.filter(s => s !== session);
      res.setHeader('Set-Cookie', 'dp_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'); persist(); return { ok: true };
    }
    if (method === 'POST' && endpoint === 'educator') { u.educator = true; persist(); return { ok: true }; }
    if (method === 'POST' && endpoint === 'invite') {
      check(['class', 'peer'].includes(data.kind), 'Elige el tipo de vinculación.', 400);
      if (data.kind === 'class') check(u.educator);
      let invitation = state.invites.find(i => i.owner === u.id && i.kind === data.kind && i.expires > now());
      if (!invitation) { invitation = { token: id(), owner: u.id, kind: data.kind, expires: now() + 5000 }; state.invites.push(invitation); }
      persist(); return { token: invitation.token, expires: invitation.expires, serverNow: now() };
    }
    if (method === 'POST' && endpoint === 'join') {
      await takeRate(`join:${u.id}`, 15);
      if (data.pending) {
        const pending = state.pending.find(p=>p.id===data.pending && p.member===u.id && p.expires>now());
        check(pending,'La solicitud venció. Escanea el QR nuevamente.',410);
        pending.memberConfirmed = true; persist(); return {pending:pending.id,number:pending.number,expires:pending.expires};
      }
      const invitation = state.invites.find(i => i.token === data.token && i.expires > now());
      check(invitation, 'Este QR venció. Escanea el que se muestra ahora.', 410);
      check(invitation.owner !== u.id, 'Usa la cuenta de la otra persona para vincularte.', 400);
      check(!linkFor(invitation.owner, u.id, invitation.kind), 'Ya están vinculados. Puedes volver a tus tareas.', 409);
      let p = state.pending.find(p => p.owner === invitation.owner && p.member === u.id && p.kind === invitation.kind);
      if (!p) { p = { id: id(), owner: invitation.owner, member: u.id, kind: invitation.kind, number: String(randomInt(100, 1000)), expires: now() + 120000, memberConfirmed: data.confirm !== false }; state.pending.push(p); }
      else if (data.confirm !== false) p.memberConfirmed = true;
      persist(); return { pending: p.id, number: p.number, expires: p.expires };
    }
    if (method === 'POST' && endpoint === 'confirm') {
      const p = state.pending.find(p => p.id === data.id && p.expires > now());
      check(p && p.owner === u.id, 'La solicitud ya no está disponible.', 404);
      if(data.accept === true) check(p.memberConfirmed, 'La otra persona todavía debe confirmar su vinculación.',409);
      check(LEVELS.includes(data.level || 'principiante'), 'Elige un nivel válido.', 400);
      if (data.accept === true && !linkFor(p.owner, p.member, p.kind)) state.links.push({ id: id(), owner: p.owner, member: p.member, kind: p.kind, level: data.level || 'principiante', active: true, created: now() });
      state.pending = state.pending.filter(x => x.id !== p.id); persist(); return { ok: true };
    }
    if (method === 'POST' && ['unlink', 'level'].includes(endpoint)) {
      const l = state.links.find(x => x.id === data.id && x.active);
      check(l && (l.owner === u.id || (endpoint === 'unlink' && l.member === u.id)));
      if (endpoint === 'unlink') { l.active = false; l.ended = now(); for (const r of state.rooms) if (r.link === l.id && r.status !== 'finished') r.status = 'closed'; }
      else { check(LEVELS.includes(data.level), 'Elige un nivel válido.', 400); l.level = data.level; }
      persist(); return { ok: true };
    }
    if (method === 'POST' && endpoint === 'assign') {
      check(u.educator);
      check(TITLES.includes(data.title) && LEVELS.includes(data.level), 'Elige un título y un nivel del catálogo.', 400);
      check(Array.isArray(data.questions) && data.questions.length >= 1 && data.questions.length <= 10 && new Set(data.questions).size === data.questions.length && data.questions.every(k => activeIds.has(k)), 'Selecciona entre 1 y 10 desafíos diferentes del catálogo revisado.', 400);
      check(data.questions.every(k=>!byId.get(k).levels||byId.get(k).levels.includes(data.level)), 'Hay desafíos que no corresponden al nivel elegido. Reemplázalos antes de asignar.',400);
      check(!data.questions.some(k=>byId.get(k).guidance)||data.guided===true,'Confirma que prepararás la lectura acompañada de estos pasajes.',400);
      check(Array.isArray(data.links) && data.links.length > 0 && data.links.length <= 100, 'Selecciona al menos un alumno.', 400);
      const links = [...new Set(data.links)].map(k => state.links.find(l => l.id === k && l.active && l.owner === u.id && l.kind === 'class'));
      check(links.every(Boolean), 'Alguna vinculación cambió. Revisa los destinatarios.', 409);
      check(typeof data.requestId === 'string' && data.requestId.length <= 80, 'Falta el identificador de entrega.', 400);
      if (state.tasks.some(t => t.owner === u.id && t.requestId === data.requestId)) return { ok: true, repeated: true };
      for (const l of links) state.tasks.push({ id: id(), requestId: data.requestId, title: data.title, owner: u.id, student: l.member, link: l.id, level: data.level, questions: data.questions, created: now(), revision: 0, draft: {}, attempts: [], feedback: null });
      persist(); return { ok: true, count: links.length };
    }
    if (method === 'POST' && ['draft', 'submit', 'feedback', 'help'].includes(endpoint)) {
      const t = state.tasks.find(t => t.id === data.id);
      check(t && (endpoint === 'feedback' ? t.owner === u.id : t.student === u.id));
      if (endpoint === 'help') {
        const q = byId.get(data.question); check(q && t.questions.includes(q.id));
        t.helpForAttempt ||= {}; t.helpForAttempt[q.id]=t.attempts.length;
        t.draft[q.id] = { ...(t.draft[q.id] || {}), helped: true }; persist(); return { answer: q.answer, explanation: q.explanation || '', reference: q.reference, options: q.options };
      }
      if (endpoint === 'feedback') {
        check(!retiredTask(t),'Esta tarea se conserva para consulta: contiene fichas retiradas. Prepara una nueva con el catálogo revisado.',409);
        check(taskLink(t), 'La vinculación terminó. No se enviarán nuevas devoluciones.', 409);
        check(t.attempts.length && Number.isInteger(data.choice) && FEEDBACK[data.choice], 'Selecciona una devolución preparada.', 400);
        check(data.attempt === t.attempts.length, 'Hay una nueva entrega. Revísala antes de enviar la devolución.', 409);
        t.feedback = { text: FEEDBACK[data.choice], date: now(), attempt: t.attempts.length }; persist(); return { ok: true };
      }
      if (endpoint === 'submit') {
        check(!retiredTask(t),'Esta tarea conserva fichas retiradas. Solicita una nueva tarea del catálogo revisado.',409);
        check(taskLink(t), 'La vinculación terminó. Conservas la tarea para practicar, pero ya no puedes entregarla.', 409);
        check(typeof data.requestId === 'string' && data.requestId.length <= 80, 'Falta el identificador de entrega.', 400);
        const previous = t.attempts.find(a => a.requestId === data.requestId);
        if (previous) {
          const revision=previous.revision ?? (Number.isSafeInteger(data.revision)&&data.revision>=0?data.revision+1:null);
          check(revision!==null,'La entrega ya está guardada. Vuelve a abrir la tarea para continuar.',409);
          return { ok: true, attempt: previous, revision };
        }
      }
      if(endpoint==='draft') {
        check(data.answers && typeof data.answers==='object' && !Array.isArray(data.answers),'Revisa las respuestas.',400);
        const fingerprint=digest(JSON.stringify({revision:data.revision,answers:Object.keys(data.answers).sort().map(k=>[k,data.answers[k]])}));
        if(data.requestId!==undefined)check(typeof data.requestId==='string'&&data.requestId.length>0&&data.requestId.length<=80,'Identificador de guardado no válido.',400);
        const receipt=data.requestId && (t.draftReceipts||[]).find(r=>r.id===data.requestId);
        if(receipt){check(receipt.fingerprint===fingerprint,'El identificador pertenece a otra edición. Conserva tus respuestas y revisa la versión guardada.',409);return {ok:true,revision:receipt.revision};}
        if(!data.requestId && data.revision===t.revision-1 && t.questions.every(k=>typeof data.answers[k]==='string'&&data.answers[k]===t.draft[k]?.answer))return {ok:true,revision:t.revision};
        data.draftFingerprint=fingerprint;
      }
      check(data.revision === t.revision, 'Hay otra versión guardada. Tus respuestas pendientes se conservan; elige cuál continuar.', 409);
      check(data.answers && typeof data.answers === 'object' && !Array.isArray(data.answers), 'Revisa las respuestas.', 400);
      const next = {};
      for (const q of t.questions) {
        const value = data.answers[q] ?? t.draft[q]?.answer ?? '';
        check(typeof value === 'string' && value.length <= 1500, 'Una respuesta es demasiado extensa.', 400);
        const item = byId.get(q);
        if (item.type === 'reflexion' && value) check(item.options[Number(value)] !== undefined && /^\d$/.test(value), 'Selecciona una de las opciones disponibles.', 400);
        next[q] = { answer: value, helped: t.helpForAttempt?.[q]===t.attempts.length || (!t.helpForAttempt&&!t.attempts.length&&!!t.draft[q]?.helped) };
      }
      if (endpoint === 'submit') check(t.questions.every(q => next[q].answer.trim()), 'Hay desafíos sin responder. Puedes guardar y continuar después.', 400);
      t.draft = next; t.revision++; t.updated = now();
      if (endpoint === 'draft') { if(data.requestId){t.draftReceipts=[...(t.draftReceipts||[]),{id:data.requestId,fingerprint:data.draftFingerprint,revision:t.revision}].slice(-100);} persist(); return { ok: true, revision: t.revision }; }
      const attempt = { requestId: data.requestId, revision: t.revision, date: now(), results: t.questions.map(k => ({...resultFor(byId.get(k), next[k].answer, next[k].helped),previouslyHelped:t.attempts.some(a=>a.results.some(r=>r.question===k&&r.helped))})) };
      t.attempts.push(attempt); t.feedback = null; persist(); return { ok: true, attempt, revision: t.revision };
    }
    if (method === 'POST' && endpoint === 'issue') {
      const q = byId.get(data.question); check(q, 'No encontramos la pregunta.', 404);
      check(['ambigua', 'respuesta', 'texto'].includes(data.reason), 'Elige el motivo de la consulta.', 400);
      const answer = typeof data.answer === 'string' ? data.answer.slice(0, 1500) : '';
      const issue = { id: id(), user: u.id, question: q.id, prompt: q.prompt, answer, reference: q.reference, version: q.version, reason: data.reason, created: now() };
      state.issues.push(issue); persist(); return { ok: true, issue };
    }
    if (method === 'POST' && endpoint === 'room-create') {
      const l = state.links.find(l => l.id === data.link && l.active && l.kind === 'peer' && (l.owner === u.id || l.member === u.id)); check(l);
      check(LEVELS.includes(data.level), 'Elige un nivel válido.', 400);
      const pool = catalogue.filter(q => q.mode === data.mode && !q.guidance && (!q.levels||q.levels.includes(data.level)) && (q.version === data.version || q.version === 'referencias'));
      check(pool.length, 'Elige una actividad y una versión disponibles.', 400);
      const existing = state.rooms.find(r => r.link === l.id && ['invited', 'active'].includes(r.status));
      if (existing) return { id: existing.id };
      const history = {};
      for(const previous of state.rooms.filter(r => r.members.some(k=>k===l.owner||k===l.member))) for(const key of previous.questions){const q=byId.get(key);if(q)practice.exposureKeys(q).forEach(k=>{history[k]=Math.max(history[k]||0,previous.created);});}
      const order = practice.prioritize(pool, history);
      const questions = data.mode === 'bible-rosco' ? [...new Set(order.map(q => q.letter))].sort().map(letter => order.find(q => q.letter === letter).id) : practice.selectFresh(pool,history,5).map(q => q.id);
      const r = { id: id(), link: l.id, creator: u.id, members: [l.owner, l.member], mode: data.mode, level: data.level, questions, created: now(), status: 'invited', answers: {}, helped: {}, heartbeat: {} };
      for (const k of r.members) { r.answers[k] = []; r.helped[k] = []; }
      state.rooms.push(r); persist(); return { id: r.id };
    }
    if (endpoint === 'room' && method === 'GET') {
      const r = state.rooms.find(r => r.id === url.searchParams.get('id')); check(r && r.members.includes(u.id));
      return roomView(r, u);
    }
    if (method === 'POST' && ['room-accept', 'room-answer', 'room-heartbeat', 'room-close', 'room-help'].includes(endpoint)) {
      const r = state.rooms.find(r => r.id === data.id); check(r && r.members.includes(u.id));
      if (endpoint === 'room-close') { if (r.status !== 'finished') r.status = 'closed'; persist(); return { ok: true }; }
      if (endpoint === 'room-heartbeat') {
        if (r.status === 'active' && state.links.some(l => l.id === r.link && l.active)) { r.heartbeat[u.id] = now(); persist(); }
        return roomView(r, u);
      }
      check(!r.questions.some(k=>!activeIds.has(k)),'Este encuentro conserva fichas de una edición anterior. Puedes cerrarlo y preparar uno nuevo con el catálogo revisado.',409);
      check(state.links.some(l => l.id === r.link && l.active), 'La vinculación terminó.', 409);
      if (endpoint === 'room-accept') { check(r.creator !== u.id && r.status === 'invited', 'La invitación ya cambió.', 409); r.status = 'active'; r.members.forEach(k => r.heartbeat[k] = now()); persist(); return { ok: true }; }
      check(r.status === 'active', 'Este encuentro no está activo.', 409);
      r.heartbeat[u.id] = now();
      const index = r.answers[u.id].length;
      check(index < r.questions.length, 'Ya completaste tu recorrido.', 409);
      if (endpoint === 'room-help') { check(data.index===index && data.question===r.questions[index], 'La pregunta cambió. Pide ayuda para la que estás viendo ahora.',409); r.helped[u.id].push(index); persist(); const q = byId.get(r.questions[index]); return { answer: q.answer, reference: q.reference }; }
      check(data.index === index, 'Esa respuesta ya se registró. Actualiza el encuentro.', 409);
      const peer = r.members.find(k => k !== u.id);
      check((r.heartbeat[peer] || 0) >= now() - 15000, 'Esperamos a la otra persona. Tu avance está guardado.', 409);
      check(typeof data.answer === 'string' && data.answer.length <= 1500 && data.answer.trim(), 'Escribe o selecciona una respuesta.', 400);
      const q = byId.get(r.questions[index]);
      if (q.type === 'reflexion') check(/^\d$/.test(data.answer) && q.options[Number(data.answer)] !== undefined, 'Selecciona una opción.', 400);
      const result = resultFor(q, data.answer, r.helped[u.id].includes(index));
      // Cada desafío resuelto sin revelar la solución cuenta una vez; no se aceptan puntos del cliente.
      if (result.helped && result.correct) result.correct = false;
      r.answers[u.id].push(result);
      if (r.members.every(k => r.answers[k].length === r.questions.length)) r.status = 'finished';
      persist(); return { ok: true, result };
    }
    fail(404, 'No encontramos esa función.');
  }
  const handleRequest = async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Frame-Options', 'DENY');
    let url;
    try { url = new URL(req.url, 'http://localhost'); } catch { res.writeHead(400); return res.end(); }
    if (url.pathname.startsWith('/api/')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Cache-Control', 'no-store');
      const run = async () => {
        requestRates = new Set();
        try {
          for (let attempt = 0; attempt < 8; attempt++) {
            let revision;
            if (store) { const snapshot = await store.load(); state = snapshot.value; revision = snapshot.revision; }
            dirty = false;
            const headers = new Map();
            const result = await api(req, { setHeader: (key, value) => headers.set(key, value) }, url);
            if (store && dirty && !await store.commit(revision, state)) {
              await new Promise(resolve => setTimeout(resolve, randomInt(10, 60) * (attempt + 1)));
              continue;
            }
            // Una cookie solo se entrega cuando su sesión ya está guardada.
            for (const [key, value] of headers) res.setHeader(key, value);
            res.end(JSON.stringify(result)); return;
          }
          fail(503, 'Hay varias operaciones en curso. Intenta de nuevo; tu trabajo anterior se conserva.');
        } catch (e) {
          res.statusCode = e.status || 500;
          res.end(JSON.stringify({ error: e.status ? e.message : 'No pudimos completar la operación. Intenta de nuevo.' }));
          if (!e.status) console.error('Error interno del servicio:', e.name);
        }
      };
      // Leer cada cuerpo fuera de la cola: un cliente con conexión lenta no bloquea a todos.
      const receive = async () => {
        try {
          if(req.method === 'POST') {
            const chunks=[];let bytes=0;
            for await (const chunk of req) { bytes+=chunk.length;check(bytes<=32768,'Solicitud demasiado extensa.',413);chunks.push(chunk); }
            try {req.parsedData=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{fail(400,'No pudimos leer la solicitud.');}
          }
          queue=queue.then(run,run);
          await queue;
        } catch(e) { if(!res.destroyed) {res.statusCode=e.status||400;res.end(JSON.stringify({error:e.status?e.message:'La solicitud se interrumpió. Vuelve a intentarlo.'}));} }
      };
      await receive(); return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
    let relative; try { relative = decodeURIComponent(url.pathname); } catch { res.writeHead(400); return res.end(); }
    const publicRoot = path.join(root, 'out');
    let file = path.resolve(publicRoot, '.' + relative);
    if (!file.startsWith(publicRoot + path.sep) && file !== publicRoot) { res.writeHead(403); return res.end(); }
    // Next export publica los datos de navegación en .txt. Devolver HTML a una
    // solicitud RSC provocaba una recarga y perdía la actividad recién elegida.
    if(req.headers.rsc === '1') {
      const componentFile=file.endsWith('.txt')?file:file===publicRoot?path.join(publicRoot,'index.txt'):file.replace(/[\\/]$/,'')+'.txt';
      if(fs.existsSync(componentFile)) {file=componentFile;res.setHeader('Content-Type','text/x-component; charset=utf-8');res.setHeader('Vary','RSC, Next-Router-State-Tree, Next-Router-Prefetch');}
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end('Página no encontrada.'); }
    const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
    if(!res.hasHeader('Content-Type')) res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  };
  const server = http.createServer(handleRequest);
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  return { server, handleRequest, close: () => { server.close(); db?.close(); }, db };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3011);
  const host = process.env.HOST || '127.0.0.1';
  if (!['127.0.0.1', 'localhost'].includes(host) && !process.env.APP_ORIGIN) throw new Error('Configura APP_ORIGIN antes de habilitar acceso desde otros dispositivos.');
  const app = createService({ dbPath: process.env.DP_DATABASE || path.join(root, 'var/divina.sqlite'), origin: process.env.APP_ORIGIN });
  app.server.listen(port, host, () => console.log(`Divina Palabra disponible en ${process.env.APP_ORIGIN || `http://${host}:${port}`}`));
}
