const fs=require('fs'),vm=require('vm'),ts=require('typescript'),assert=require('node:assert/strict'),path=require('path');
const root=path.resolve(__dirname,'../src');
function load(file){const box={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,box);return box.exports;}
const p=load('lib/practice.ts'),grid=load('lib/word-search.ts'),norm=load('lib/string-utils.ts').normalizeForValidation,catalog=load('data/newChallengesData.ts').newChallengesEs;
let seed=71623;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const levels=['principiante','discipulo','avanzado'];let report={method:'Sesiones completas de cinco desafíos, historial vacío por modalidad y nivel, sin filtros ni lecciones. 20 simulaciones por combinación, 160 sesiones por simulación.',versions:{}};
function simulate(pool,k=5){let firsts=[];for(let run=0;run<20;run++){let history={},first=null;for(let session=1;session<=160;session++){const selected=p.prioritize(pool,history,random).slice(0,k);assert.equal(new Set(selected.map(p.identity)).size,selected.length);if(!first&&selected.some(x=>history[p.identity(x)]))first=session;selected.forEach(x=>history[p.identity(x)]=session);}firsts.push(first);}assert.equal(new Set(firsts).size,1);return {unique:p.unique(pool).length,firstRepeatedSession:firsts[0]};}
for(const version of ['rvr1960','nvi','ntv']){const d=JSON.parse(fs.readFileSync(path.join(root,'data/bible/es_'+version+'.json'),'utf8')),r={};for(const [index,level]of levels.entries()){const l1=d.findWordLevel1.filter(x=>x.syllables?.length>1),l2=d.findWordLevel2;const words=level==='principiante'?l1:level==='avanzado'?l2:[...l1,...l2];
r[level]={words:simulate(words),complete:simulate(d.completePhraseChallenges),guess:simulate(d.guessPhraseChallenges)};
const searches=[...catalog.wordSearch[level],...p.buildSearchSets([...d.findWordLevel1,...d.findWordLevel2],index+4),...catalog.classification];r[level].search=simulate(searches);r[level].reflection=simulate(catalog.counseling);
for(let run=0;run<50;run++){let history={};for(let session=1;session<=5;session++){let list=p.buildRosco(catalog.rosco[level],history,1,random)[0].letters;assert.equal(list.length,21);if(session<=4)assert.ok(list.every(x=>!history[p.identity(x)]),'Rosco repeats before four rounds');else assert.ok(list.every(x=>history[p.identity(x)]));list.forEach(x=>history[p.identity(x)]=session);}}
r[level].rosco={uniqueWords:p.unique(catalog.rosco[level].flat()).length,firstRepeatedSession:5};
// Every generated word must be physically present in its grid.
for(const set of searches.filter(x=>x.words)){const g=grid.generateWordSearchGrid(set.words,8+index*2);for(const raw of set.words){const word=grid.normalizeGridWord(raw);let found=false;for(let row=0;row<g.length;row++)for(let col=0;col<g.length;col++)for(const [dr,dc]of [[0,1],[1,0],[1,1]]){if([...word].every((c,i)=>g[row+i*dr]?.[col+i*dc]===c))found=true;}assert.ok(found,'Missing word '+word);}}
for(let length=5;length<=27;length++)for(let run=0;run<20;run++){const positions=p.missingPositions(length,level,random);assert.equal(new Set(positions).size,positions.length);assert.ok(positions.every(x=>x>=0&&x<length));}
}report.versions[version]=r;}
assert.equal(norm('  JESÚS,   ES SEÑOR. '),norm('Jesus es Señor'));
assert.notEqual(norm('año'),norm('ano'));
assert.equal(load('lib/string-utils.ts').answersMatch('El Señor','EL SENOR'),true);
assert.equal(p.progressAdvice([{correct:5,total:5,assisted:0}]).ready,false);
assert.equal(p.progressAdvice([0,1,2].map(n=>({correct:5,total:5,assisted:0,ids:Array.from({length:5},(_,i)=>String(n*5+i))}))).ready,true);
assert.equal(p.progressAdvice([0,1,2].map(n=>({correct:5,total:5,assisted:0,ids:['1','2','3','4','5']}))).ready,false);
assert.equal(p.progressAdvice([{correct:5,total:5,assisted:5},{correct:5,total:5,assisted:5},{correct:5,total:5,assisted:5}]).ready,false);
console.log(JSON.stringify(report,null,2));
console.error('PASS: selection, cycles, rosco, grid reachability, missing positions, normalization, progression.');
