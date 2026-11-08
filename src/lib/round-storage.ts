import { progressOwner, progressStorageKey } from './practice';
export type SavedRound = { schema: 1; owner?:string; id: string; savedAt: number; config: any; data: any };
const prefix = 'dp_round_v1:';
const activeKey = 'dp_active_round_v1';
const fallbackClaims=new Map<string,()=>boolean>();
export function newRoundId() { return typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
const object = (x: any) => !!x && typeof x === 'object' && !Array.isArray(x);
const number = (x: any, max: number) => Number.isFinite(x) && x >= 0 && x <= max;
function valid(x: any): x is SavedRound {
  if (!x || x.schema !== 1 || typeof x.id !== 'string' || !number(x.savedAt, Number.MAX_SAFE_INTEGER) || !object(x.config) || !object(x.data)) return false;
  const c=x.config,d=x.data;
  if (!['find-word','complete-phrase','guess-the-phrase','bible-rosco','word-search','counseling-practical'].includes(c.gameMode) || !['principiante','discipulo','avanzado'].includes(c.difficulty) || !['rvr1960','nvi','ntv'].includes(c.bibleVersion) || typeof c.isPracticeMode!=='boolean' || !number(c.roundTime,600)) return false;
  if (!Array.isArray(c.teams) || c.teams.length<1 || c.teams.length>2 || !c.teams.every((t:any)=>object(t)&&typeof t.name==='string'&&number(t.score,100000)&&number(t.lives,100))) return false;
  if (!Array.isArray(d.challenges) || !d.challenges.length || d.challenges.length>20 || !d.challenges.every(object)) return false;
  if (!Number.isInteger(d.currentChallengeIndex) || !number(d.currentChallengeIndex,d.challenges.length-1) || !Number.isInteger(d.currentTeamIndex) || !number(d.currentTeamIndex,c.teams.length-1) || !number(d.timeLeft,600)) return false;
  if (typeof d.answer!=='string' || typeof d.letterInput!=='string' || ![null,'correct','incorrect'].includes(d.feedback)) return false;
  for (const k of ['teamActiveRoscoIndex','teamRoscoAnswers','teamTimeLeft']) if(!object(d[k])) return false;
  for (const k of ['wsSelected','wsFound','wsGrid','guessedLetters','playedChallenges','answeredRosco','completePhraseOptions']) if(!Array.isArray(d[k])) return false;
  for (const k of ['readyToAnswer','roundReview','hintRevealed','isTurnPaused','showComparison','submitted','usedHint','attemptHadError']) if(typeof d[k]!=='boolean') return false;
  if(!d.guessedLetters.every((v:any)=>typeof v==='string') || !d.wsFound.every((v:any)=>typeof v==='string') || !d.wsGrid.every((row:any)=>Array.isArray(row)&&row.every((v:any)=>typeof v==='string'&&v.length===1)) || !d.playedChallenges.every(object)) return false;
  const strings=(a:any)=>Array.isArray(a)&&a.every((v:any)=>typeof v==='string');
  if(typeof d.helpMessage!=='string'||!number(d.classItemIndex,30)||!strings(d.answeredRosco)||!strings(d.completePhraseOptions))return false;
  if(!d.wsSelected.every((v:any)=>object(v)&&Number.isInteger(v.r)&&Number.isInteger(v.c)&&number(v.r,d.wsGrid.length-1)&&number(v.c,d.wsGrid[v.r]?.length-1)))return false;
  if(!Object.values(d.teamActiveRoscoIndex).every(v=>Number.isInteger(v)&&number(v,30))||!Object.values(d.teamTimeLeft).every(v=>number(v,600)))return false;
  if(!Object.values(d.teamRoscoAnswers).every((a:any)=>object(a)&&Object.values(a).every(v=>['correct','incorrect','skipped'].includes(v as string))))return false;
  if(d.lastIncorrectWord!==null&&(!object(d.lastIncorrectWord)||!['word','letter','teamName'].every(k=>typeof d.lastIncorrectWord[k]==='string')))return false;
  if(!d.challenges.every((q:any)=>{
    if(c.gameMode==='find-word')return typeof q.answer==='string'&&typeof q.hint==='string'&&typeof q.question==='string';
    if(c.gameMode==='complete-phrase')return typeof q.fullPhrase==='string'&&typeof q.question==='string'&&strings(q.words)&&Array.isArray(q.missingIndices)&&q.missingIndices.every((i:any)=>Number.isInteger(i)&&number(i,q.words.length-1));
    if(c.gameMode==='guess-the-phrase')return typeof q.phrase==='string'&&strings(q.preGuessed);
    if(c.gameMode==='counseling-practical')return typeof q.description==='string'&&typeof q.question==='string'&&strings(q.options)&&Number.isInteger(q.correctIndex)&&number(q.correctIndex,q.options.length-1);
    if(c.gameMode==='word-search')return q.type==='word-search'?strings(q.words)&&strings(q.references):q.type==='classification'&&strings(q.categories)&&Array.isArray(q.items)&&q.items.every((i:any)=>object(i)&&typeof i.name==='string'&&typeof i.category==='string');
    return true;
  }))return false;
  if(c.gameMode==='bible-rosco'&&!d.challenges.every((r:any)=>Array.isArray(r.letters)&&r.letters.length>0&&r.letters.every((q:any)=>object(q)&&typeof q.word==='string')))return false;
  return true;
}
export function readRound(id?: string | null, owner=progressOwner()): SavedRound | null {
  try { const key=id||localStorage.getItem(progressStorageKey(activeKey,owner)); if(!key)return null; const raw=localStorage.getItem(progressStorageKey(prefix+key,owner));if(!raw)return null;const value=JSON.parse(raw);return valid(value)&&value.id===key?{...value,owner}:null; } catch { return null; }
}
export function readRounds(owner=progressOwner()): SavedRound[] {
  try {const scoped=progressStorageKey(prefix,owner);return Object.keys(localStorage).filter(k=>k.startsWith(scoped)).map(k=>readRound(k.slice(scoped.length),owner)).filter((r):r is SavedRound=>!!r).sort((a,b)=>b.savedAt-a.savedAt);}catch{return [];}
}
export function writeRound(round: SavedRound): boolean {
  const owner=round.owner||progressOwner();if(owner!==progressOwner())return false;
  const check=fallbackClaims.get(owner+':'+round.id);if(check&&!check())return false;
  try {localStorage.setItem(progressStorageKey(prefix+round.id,owner),JSON.stringify(round));localStorage.setItem(progressStorageKey(activeKey,owner),round.id);return true;}catch{return false;}
}
export function clearRound(id: string, owner=progressOwner()) {
  if(owner!==progressOwner())return;
  const check=fallbackClaims.get(owner+':'+id);if(check&&!check())return;
  try {localStorage.removeItem(progressStorageKey(prefix+id,owner));if(localStorage.getItem(progressStorageKey(activeKey,owner))===id){const next=readRounds(owner)[0];if(next)localStorage.setItem(progressStorageKey(activeKey,owner),next.id);else localStorage.removeItem(progressStorageKey(activeKey,owner));}}catch{}
}
// El navegador libera el bloqueo al cerrar o recargar una pestaña, incluso tras un cierre inesperado.
export async function claimRound(id:string, owner:string):Promise<(()=>void)|null> {
  if(!navigator.locks){
    const key=progressStorageKey('dp_round_lock:'+id,owner),token=newRoundId();
    const read=()=>{try{return JSON.parse(localStorage.getItem(key)||'null');}catch{return null;}};
    if((read()?.expires||0)>Date.now())return null;
    localStorage.setItem(key,JSON.stringify({token,expires:Date.now()+30000}));
    await new Promise(r=>setTimeout(r,0));
    const owns=()=>read()?.token===token;
    if(!owns())return null;
    fallbackClaims.set(owner+':'+id,owns);
    const lost=()=>{if(!owns())window.dispatchEvent(new Event('dp-round-lock-lost'));};
    const interval=setInterval(()=>{if(owns())localStorage.setItem(key,JSON.stringify({token,expires:Date.now()+30000}));else lost();},5000);
    const changed=(e:StorageEvent)=>{if(e.key===key)lost();};window.addEventListener('storage',changed);
    let released=false;const release=()=>{if(released)return;released=true;clearInterval(interval);window.removeEventListener('storage',changed);window.removeEventListener('pagehide',release);if(owns())localStorage.removeItem(key);fallbackClaims.delete(owner+':'+id);};
    window.addEventListener('pagehide',release);return release;
  }
  return new Promise((resolve,reject)=>{
    navigator.locks.request(`divina-round:${owner}:${id}`,{ifAvailable:true},lock=>{
      if(!lock){resolve(null);return;}
      return new Promise<void>(release=>resolve(release));
    }).catch(reject);
  });
}
