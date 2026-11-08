const fs=require('fs'),vm=require('vm'),ts=require('typescript'),assert=require('node:assert/strict'),path=require('path');
const root=path.resolve(__dirname,'..');
function load(file,extra={}){const box={exports:{},...extra};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,'src',file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,box);return box.exports;}
const p=load('lib/practice.ts'),c=load('data/newChallengesData.ts').newChallengesEs,g=load('lib/word-search.ts'),match=load('lib/string-utils.ts').answersMatch;
let seed=2301;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};let sessions=0,grids=0,items=0;
const remember=(history,q,t)=>p.exposureKeys(q).forEach(k=>history[k]=t);
assert.equal(c.counseling.length,110);assert.equal(c.counseling.filter(x=>x.guidance).length,3);
for(const q of c.counseling){assert.equal(new Set(q.options).size,3);assert.ok(q.options[q.correctIndex]);assert.ok(q.suggestedVerse.includes(q.biblicalSupport));items++;}
for(const level of ['principiante','discipulo','avanzado']){
 const pool=p.unique(c.rosco[level].flat());assert.equal(pool.length,294);assert.equal(new Set(pool.map(x=>x.definition)).size,294);
 const letters={};for(const q of pool){(letters[q.letter]||=[]).push(q);assert.ok(q.type==='starts'?p.canonical(q.word).startsWith(q.letter):p.canonical(q.word).includes(q.letter));assert.ok(q.reference);items++;}
 assert.equal(Object.keys(letters).length,21);assert.ok(Object.values(letters).every(a=>a.length===14));
 for(const teams of [1,2])for(let run=0;run<12;run++){
  const history={},fresh=14/teams;
  for(let round=1;round<=fresh*2+1;round++){
   const selected=p.buildRosco(c.rosco[level],history,teams,random).flatMap(x=>x.letters);
   assert.equal(selected.length,21*teams);assert.equal(new Set(selected.map(p.identity)).size,selected.length);
   if(round<=fresh)assert.ok(selected.every(q=>!p.lastExposure(q,history)));
   if(round===fresh+1)assert.ok(selected.every(q=>p.lastExposure(q,history)>0));
   selected.forEach(q=>remember(history,q,round));sessions++;
  }
 }
}
for(const ver of ['rvr1960','nvi','ntv']){
 const d=JSON.parse(fs.readFileSync(path.join(root,`src/data/bible/es_${ver}.json`),'utf8'));
 for(const q of [...d.findWordLevel1,...d.findWordLevel2]){
  assert.ok(q.answer&&q.reference&&q.hint&&q.review?.status==='revisado');if(q.syllables)assert.equal(q.syllables.join(''),q.answer);
  if(q.contentKind==='palabra-en-pasaje'){assert.ok(q.hint.includes('_______'));assert.ok(!/\p{L}_{3,}|_{3,}\p{L}/u.test(q.hint));const body=q.hint.slice(q.hint.indexOf('«')+1,-1);assert.ok(!p.canonical(body).split(' ').includes(p.canonical(q.answer)));}items++;
 }
 for(const q of [...d.completePhraseChallenges,...d.guessPhraseChallenges])assert.ok(q.contentKind==='fragmento-textual'&&q.reference);
 for(const level of ['principiante','discipulo','avanzado']){
  const first=d.findWordLevel1.filter(x=>x.syllables.length>1),size=level==='principiante'?4:level==='discipulo'?5:6;
  const pools={words:level==='principiante'?first:level==='avanzado'?d.findWordLevel2:[...first,...d.findWordLevel2],complete:d.completePhraseChallenges,guess:d.guessPhraseChallenges,search:[...c.wordSearch[level],...p.buildSearchSets([...d.findWordLevel1,...d.findWordLevel2],size),...c.classification],reflection:c.counseling.filter(q=>!q.guidance)};
  for(const [mode,pool]of Object.entries(pools))for(let trial=0;trial<3;trial++){
   const history={};for(let turn=1;turn<=150;turn++){
    const selected=p.selectFresh(pool,history,5,random);assert.ok(selected.length>0&&selected.length<=5);
    const keys=selected.flatMap(p.exposureKeys);assert.equal(new Set(keys).size,keys.length,`${mode}: contenido repetido en una tanda`);
    const unseen=p.unique(pool).filter(q=>!p.lastExposure(q,history));if(unseen.length>=5&&mode!=='search')assert.ok(selected.every(q=>!p.lastExposure(q,history)));
    selected.forEach(q=>remember(history,q,turn));sessions++;
   }
  }
  for(const set of pools.search.filter(x=>x.words)){
   const grid=g.generateWordSearchGrid(set.words,size===4?8:size===5?10:12);
   for(const raw of set.words){const word=g.normalizeGridWord(raw);let found=false;
    for(let r=0;r<grid.length;r++)for(let col=0;col<grid.length;col++)for(const [dr,dc]of [[0,1],[1,0],[1,1]])if([...word].every((ch,i)=>grid[r+dr*i]?.[col+dc*i]===ch))found=true;assert.ok(found,raw);
   }grids++;
  }
 }
 const history={};p.selectFresh(d.completePhraseChallenges,history,5,random).forEach(q=>remember(history,q,1));const selected=p.selectFresh(d.guessPhraseChallenges,history,5,random),fresh=p.unique(d.guessPhraseChallenges).filter(q=>!p.lastExposure(q,history));if(fresh.length>=5)assert.ok(selected.every(q=>!p.lastExposure(q,history)));
}
const service=JSON.parse(fs.readFileSync(path.join(root,'server/catalog.json'),'utf8'));assert.equal(p.unique(service.filter(q=>q.type==='reflexion')).length,110);assert.ok(service.every(q=>!q.retired));assert.equal(match('señor','SENOR'),true);assert.equal(match('ano','año'),false);
const memory=new Map([['dp_seen_v1:find-word:rvr1960',JSON.stringify({DAVID:123})],['dp_seen_v2:compartido','{"malo":"texto"}']]);
const storage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};const migration=load('lib/practice.ts',{window:{},localStorage:storage});
assert.equal(migration.lastExposure({answer:'David'},migration.readExposure('find-word:rvr1960')),123);
migration.markExposure('complete-phrase:rvr1960',{fullPhrase:'Texto de prueba',reference:'Salmo 23:1'});assert.ok(migration.lastExposure({phrase:'Otra traducción de prueba',reference:'Salmos 23:1'},migration.readExposure('guess-the-phrase:nvi'))>0);
const result={resultado:'Correcto',sesionesSimuladas:sessions,cuadriculasVerificadas:grids,fichasComprobadas:items,rosco:294,reflexiones:110,reflexionesSinAcompanamiento:107,traducciones:['rvr1960','nvi','ntv'],niveles:['principiante','intermedio','avanzado'],nota:'Comprueba estructura, coherencia y selección. La evaluación bíblica contextual está documentada por separado.'};
if(process.env.DP_TEST_OUTPUT){fs.mkdirSync(process.env.DP_TEST_OUTPUT,{recursive:true});fs.writeFileSync(path.join(process.env.DP_TEST_OUTPUT,'catalogo-y-simulaciones.json'),JSON.stringify(result,null,2));}console.log(JSON.stringify(result,null,2));
