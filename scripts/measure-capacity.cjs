const fs=require('fs'),path=require('path'),vm=require('vm'),ts=require('typescript');
const root=path.resolve(__dirname,'..');function mod(file){const box={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,box);return box.exports;}
const p=mod('src/lib/practice.ts'),n=mod('src/data/newChallengesData.ts').newChallengesEs,rows=[];
for(const version of ['rvr1960','nvi','ntv'])for(const level of ['principiante','discipulo','avanzado']){
 const d=require(path.join(root,'src/data/bible/es_'+version+'.json')),first=d.findWordLevel1.filter(q=>q.syllables?.length>1),second=d.findWordLevel2;
 const pools={'find-word':level==='principiante'?first:level==='avanzado'?second:[...first,...second],'complete-phrase':d.completePhraseChallenges,'guess-the-phrase':d.guessPhraseChallenges,'bible-rosco':n.rosco[level].flat(),'word-search':[...n.wordSearch[level],...p.buildSearchSets([...d.findWordLevel1,...d.findWordLevel2],level==='principiante'?4:level==='discipulo'?5:6),...n.classification],'counseling-practical':n.counseling.filter(q=>!q.guidance)};
 for(const [mode,pool]of Object.entries(pools)){const counts=[];for(let trial=0;trial<20;trial++){let seed=trial+1;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296),h={};let complete=0;for(let turn=1;turn<=500;turn++){
 const selected=mode==='bible-rosco'?p.buildRosco([pool],h,1,random)[0].letters:p.selectFresh(pool,h,5,random);
 if(selected.length<(mode==='bible-rosco'?21:5)||selected.some(q=>p.lastExposure(q,h)>0))break;
 complete++;for(const q of selected){h[p.identity(q)]=turn;p.exposureKeys(q).forEach(k=>h[k]=turn);}
 }counts.push(complete);}
 rows.push({version,level,mode,fichas:p.unique(pool).length,recorridosNuevosMin:Math.min(...counts),recorridosNuevosMax:Math.max(...counts),diasMin:Math.min(...counts)/2,diasMax:Math.max(...counts)/2});}
}
fs.writeFileSync(path.join(process.env.DP_TEST_OUTPUT||root,'capacidad-implementada.json'),JSON.stringify({criterio:'20 simulaciones por actividad, nivel y versión. Dos recorridos diarios de esa misma actividad; termina al aparecer el primer contenido ya visto. Los bancos entre niveles y modalidades se comparten: las filas no se suman.',rows},null,2));console.table(rows.filter(x=>x.version==='rvr1960'));
