// Espacios locales separados. Las claves anteriores permanecen en el espacio invitado.
export function progressOwner(): string {
  try {return localStorage.getItem('dp_owner_v1') || 'guest';}catch{return 'guest';}
}
export function progressStorageKey(key:string, owner=progressOwner()):string {
  return owner==='guest'?key:`dp_account_v1:${owner}:${key}`;
}
export function changeProgressOwner(owner:string) {
  const previous=progressOwner();
  try{localStorage.setItem('dp_owner_v1',owner);}catch{}
  if(typeof window!=='undefined'&&previous!==owner)window.dispatchEvent(new Event('dp-owner-change'));
}
export function copyPreviousProgress(owner:string):number {
  if(owner==='guest')return 0;
  let count=0;
  const marker=progressStorageKey('previous-copied',owner);
  if(localStorage.getItem(marker))return 0;
  for(const key of Object.keys(localStorage).filter(k=>/^dp_(round_v1:|active_round_v1$|seen_v[12]:|progress_v1:)|^divina_palabra_(learning_profile|analytics)$|^dp_private_queries$|^draftSermon$/.test(k))){
    const raw=localStorage.getItem(key);if(!raw)continue;
    const target=progressStorageKey(key,owner),existing=localStorage.getItem(target);
    if(!existing){localStorage.setItem(target,raw);count++;continue;}
    try{
      const old=JSON.parse(raw),current=JSON.parse(existing);
      if(key.startsWith('dp_seen_')){for(const [k,v] of Object.entries(old))if(typeof v==='number')current[k]=Math.max(current[k]||0,v);localStorage.setItem(target,JSON.stringify(current));count++;}
      else if(key.startsWith('dp_progress_')&&Array.isArray(old)&&Array.isArray(current)){localStorage.setItem(target,JSON.stringify([...new Map([...old,...current].map(x=>[JSON.stringify(x),x])).values()]));count++;}
      else if(key==='divina_palabra_learning_profile'){for(const k of ['bloomLevels','competencies','themes','books']){current[k]||={};for(const [name,value] of Object.entries(old[k]||{}))if(typeof value==='number')current[k][name]=Math.max(current[k][name]||0,value);}current.totalChallenges=Math.max(current.totalChallenges||0,old.totalChallenges||0);localStorage.setItem(target,JSON.stringify(current));count++;}
    }catch{/* Conservar las dos copias originales si no se pueden combinar. */}
  }
  localStorage.setItem(marker,'1');window.dispatchEvent(new Event('dp-progress-copied'));return count;
}

// Selection is independent of UI and never changes the source Bible text.
export type Exposure = Record<string, number>;
export function canonical(value: unknown): string {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
export function identity(item: any): string {
  if (item.options) return canonical(item.id || item.description || item.prompt);
  const content = item.answer || item.fullPhrase || item.phrase || item.word || item.id || JSON.stringify(item.items || item.words || item);
  return canonical(content);
}
export function unique<T>(items: T[], key: (item: T) => string = identity): T[] {
  return [...new Map(items.map(item => [key(item), item])).values()];
}
export function prioritize<T>(items: T[], history: Exposure, random = Math.random): T[] {
  return unique(items).map(item => ({ item, seen: lastExposure(item, history), order: random() }))
    .sort((a, b) => a.seen - b.seen || a.order - b.order)
    .map(entry => entry.item);
}
// Las dos actividades de frases comparten pasajes; las palabras comparten vocabulario.
export function exposureKeys(item: any): string[] {
  if (item.words) return item.words.map((word: string) => `palabra:${canonical(word)}`);
  if (item.items) return item.items.map((word: any) => `palabra:${canonical(word.name)}`);
  if (item.fullPhrase || item.phrase || item.passage || ['complete-phrase','guess-the-phrase'].includes(item.mode)) {
    const reference = canonical(item.reference).replace(/^SALMO /, 'SALMOS ');
    return [`pasaje:${reference}`];
  }
  if (item.options) return [`caso:${item.id || canonical(item.description || item.prompt)}`];
  return [`palabra:${canonical(item.answer || item.word)}`];
}
export function lastExposure(item: any, history: Exposure): number {
  return Math.max(history[identity(item)] || 0, history[`legacy:${identity(item)}`] || 0, ...exposureKeys(item).map(key => history[key] || 0));
}
// Dentro de una misma tanda se evita reutilizar vocabulario aunque cambie el conjunto.
export function selectFresh<T>(items: T[], history: Exposure, count: number, random = Math.random): T[] {
  const ordered = prioritize(items, history, random), selected: T[] = [], used = new Set<string>();
  for (const item of ordered) {
    const keys = exposureKeys(item);
    if (keys.some(key => used.has(key))) continue;
    selected.push(item); keys.forEach(key => used.add(key));
    if (selected.length >= count) break;
  }
  return selected;
}
function cleanHistory(value: unknown): Exposure {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([, time]) => typeof time === 'number' && Number.isFinite(time) && time > 0));
}
export function readExposure(scope: string): Exposure {
  if (typeof window === 'undefined') return {};
  try { let history: Exposure = {};
    try { history = cleanHistory(JSON.parse(localStorage.getItem(progressStorageKey('dp_seen_v2:compartido')) || '{}')); } catch { /* Recuperar el historial anterior aunque la nueva copia esté dañada. */ }
    for (const mode of ['find-word','complete-phrase','guess-the-phrase','bible-rosco','word-search','counseling-practical']) for (const version of ['rvr1960','nvi','ntv']) {
      let old: Exposure = {}; try { old=cleanHistory(JSON.parse(localStorage.getItem(progressStorageKey(`dp_seen_v1:${mode}:${version}`))||'{}')); } catch {}
      for (const [key,time] of Object.entries(old)) history[`legacy:${canonical(key)}`]=Math.max(history[`legacy:${canonical(key)}`]||0,time);
    }
    return history;
  } catch { return {}; }
}
export function markExposure(scope: string, item: any) {
  try { const history = readExposure(scope); const time=Date.now();
    history[`legacy:${identity(item)}`]=time;
    exposureKeys(item).forEach(key => { history[key]=time; });
    localStorage.setItem(progressStorageKey('dp_seen_v2:compartido'), JSON.stringify(history));
  } catch { /* Practice remains available without local storage. */ }
}
export function missingPositions(length: number, difficulty: string, random = Math.random) {
  const count = Math.min(length, difficulty === 'principiante' ? 1 : Math.max(2, Math.floor(length * (difficulty === 'discipulo' ? .3 : .5))));
  return Array.from({ length }, (_, i) => ({ i, order: random() })).sort((a,b) => a.order - b.order).slice(0,count).map(x => x.i);
}
export function buildSearchSets(words: any[], size: number) {
  const groups = new Map<string, any[]>();
  for (const item of unique(words)) {
    if (!item.answer || !/^[A-ZÁÉÍÓÚÜÑ]+$/i.test(item.answer) || item.answer.length > 12) continue;
    const book = item.reference.replace(/\s+\d.*$/, '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleUpperCase('es');
    const group = groups.get(book) || []; group.push(item); groups.set(book, group);
  }
  return [...groups].flatMap(([book, items]) => {
    const sets = [];
    for (let i=0;i<items.length;i+=size) {
      const chunk=items.slice(i,i+size); if(chunk.length<3) continue;
      sets.push({type:'word-search', id:`catalog:${book}:${chunk.map(x=>x.answer).join('|')}`, theme:`Palabras del catálogo: ${book}`, words:chunk.map(x=>x.answer), references:[...new Set(chunk.map(x=>x.reference))]});
    }
    return sets;
  });
}
export function buildRosco(lists: any[][], history: Exposure, teams: number, random = Math.random) {
  const pools = new Map<string, any[]>();
  for (const item of unique(lists.flat())) {
    const pool=pools.get(item.letter)||[];pool.push(item);pools.set(item.letter,pool);
  }
  const ordered=[...pools].map(([letter,pool])=>[letter,prioritize(pool,history,random)] as const);
  return Array.from({length:teams},(_,team)=>({type:'rosco',letters:ordered.map(([,pool])=>pool[team % pool.length])}));
}
export type ProgressEntry = { correct: number; total: number; assisted: number; ids?: string[] };
export function progressAdvice(entries: ProgressEntry[]) {
  const recent=entries.slice(-3), total=recent.reduce((n,x)=>n+x.total,0), correct=recent.reduce((n,x)=>n+x.correct,0), assisted=recent.reduce((n,x)=>n+x.assisted,0);
  const distinct = new Set(recent.flatMap(x=>x.ids || [])).size;
  if(recent.length<3 || total<15 || distinct<15) return {ready:false,text:'Completa al menos tres recorridos y 15 desafíos distintos para valorar el siguiente nivel.'};
  return correct/total>=.8 && assisted/total<=.2
    ? {ready:true,text:'Has respondido bien al menos el 80 % con pocas ayudas. Puedes probar el siguiente nivel cuando quieras.'}
    : {ready:false,text:'Continúa a tu ritmo. Repasar y usar las ayudas también forma parte del aprendizaje.'};
}

// Recupera registros válidos de versiones anteriores sin borrar su copia original.
export function readProgress(key: string): ProgressEntry[] {
  try {
    const raw = localStorage.getItem(progressStorageKey(key));
    if (!raw) return [];
    let value: unknown;
    try { value = JSON.parse(raw); } catch { value = null; }
    const valid = Array.isArray(value) ? value.filter((entry): entry is ProgressEntry => {
      if (!entry || typeof entry !== 'object') return false;
      return ['total','correct','assisted'].every(k => Number.isInteger(entry[k]) && entry[k] >= 0)
        && entry.correct <= entry.total && entry.assisted <= entry.total
        && (entry.ids === undefined || (Array.isArray(entry.ids) && entry.ids.every((id: unknown) => typeof id === 'string')));
    }) : [];
    if (!Array.isArray(value) || valid.length !== value.length) {
      const backup = progressStorageKey(`dp_recovery_v1:${key}`);
      if (!localStorage.getItem(backup)) localStorage.setItem(backup, raw);
    }
    return valid;
  } catch { return []; }
}
