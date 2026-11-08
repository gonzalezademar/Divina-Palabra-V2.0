const {chromium}=require('@playwright/test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),vm=require('vm'),ts=require('typescript');
const root=path.resolve(__dirname,'..'),out=process.env.DP_TEST_OUTPUT||path.join(root,'reports');fs.mkdirSync(out,{recursive:true});
const data=require('../src/data/bible/es_rvr1960.json'),es=require('../src/data/locales/es.json');const box={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,'src/data/newChallengesData.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,box);const catalog=box.exports.newChallengesEs;
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z0-9]/g,'');
(async()=>{
 const {createService}=await import('../server/service.mjs');const app=createService({dbPath:':memory:'});await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${app.server.address().port}`;
 const browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();const errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));let answered=0;
 async function begin(mode,level,width){await page.setViewportSize({width,height:900});await page.goto(base+'/setup');await page.locator(`input[name=activity][value="${mode}"]`).check();await page.getByLabel('Nivel de conocimiento',{exact:true}).selectOption(level);await page.getByRole('button',{name:'Comenzar actividad',exact:true}).click();await page.getByRole('button',{name:'Pausar',exact:true}).waitFor();}
 async function pause(){await page.getByRole('button',{name:'Pausar',exact:true}).click();await page.getByRole('heading',{name:'Actividad en pausa'}).waitFor();await page.getByRole('button',{name:'Continuar actividad',exact:true}).click();}
 try{
  for(const width of [360,1280])for(const level of ['principiante','discipulo','avanzado'])for(const mode of ['find-word','complete-phrase','guess-the-phrase','bible-rosco','word-search','counseling-practical']){
   await begin(mode,level,width);await pause();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${mode}/${level}: ancho`);
   if(mode==='bible-rosco')await page.getByRole('button',{name:'Comenzar',exact:true}).click();
   for(let turn=0;turn<(mode==='bible-rosco'?21:5);turn++){
    if(mode==='find-word'){
     await page.getByRole('button',{name:'💡 Ver Pista',exact:true}).click();const body=await page.locator('body').innerText();const q=[...data.findWordLevel1,...data.findWordLevel2].find(q=>body.includes(q.hint));assert.ok(q,'Pista identificada');
     const input=page.getByRole('textbox',{name:'Tu respuesta',exact:true});await input.fill(q.answer.slice(0,2));await pause();assert.equal(await input.inputValue(),q.answer.slice(0,2));await input.fill(q.answer.toLowerCase());await page.getByRole('button',{name:es.game.submit_button,exact:true}).dblclick();
    } else if(mode==='complete-phrase'){
     const question=await page.locator('h2').filter({hasText:'_______'}).innerText();const parts=question.trim().split(/\s+/);const q=data.completePhraseChallenges.find(q=>{const words=q.fullPhrase.split(' ');return words.length===parts.length&&parts.every((w,i)=>w==='_______'||w===words[i]);});assert.ok(q,'Fragmento identificado');
     const words=q.fullPhrase.split(' '),answer=parts.map((w,i)=>w==='_______'?words[i]:'').filter(Boolean).join(', ').toUpperCase();
     await page.getByRole('button',{name:answer,exact:true}).click();
    } else if(mode==='guess-the-phrase'){
     const spans=await page.locator('h2.font-mono span').allTextContents(),masked=spans.join(' ');const body=await page.locator('body').innerText();
     const q=data.guessPhraseChallenges.find(q=>body.includes(q.reference)&&q.phrase.toUpperCase().length===masked.length&&[...masked].every((c,i)=>c==='_'||c===q.phrase.toUpperCase()[i]));assert.ok(q,'Frase identificada');
     await page.getByRole('textbox',{name:'Frase completa',exact:true}).fill(q.phrase.toLowerCase());await page.getByRole('button',{name:es.game.phrase_button,exact:true}).click();
    } else if(mode==='bible-rosco'){
     const body=await page.locator('body').innerText(),q=catalog.rosco[level].flat().find(q=>body.includes(q.definition));assert.ok(q,'Consigna del rosco identificada');await page.locator('input').filter({visible:true}).first().fill(q.word.toLowerCase());await page.getByRole('button',{name:es.game.submit_button,exact:true}).click();
    } else if(mode==='counseling-practical'){
     const body=await page.locator('body').innerText(),q=catalog.counseling.find(q=>body.includes(q.description)&&body.includes(q.question));assert.ok(q,'Caso identificado');assert.ok(!q.guidance,'Los casos acompañados no aparecen por defecto');const text=q.options[q.correctIndex];await page.getByRole('button').filter({hasText:text}).first().click();
    } else {
     const cells=page.locator('button[aria-label*="fila"]');
     if(await cells.count()){
      const labels=await cells.evaluateAll(es=>es.map(e=>e.getAttribute('aria-label'))),grid=[];for(const label of labels){const m=label.match(/^(.), fila (\d+), columna (\d+)$/);assert.ok(m);(grid[Number(m[2])-1]||=[])[Number(m[3])-1]=m[1];}
      const body=await page.locator('body').innerText();const allWords=[...new Set([...data.findWordLevel1,...data.findWordLevel2].map(q=>q.answer).concat(Object.values(catalog.wordSearch).flat().flatMap(q=>q.words)))];
      const targets=allWords.filter(word=>body.split('\n').some(line=>line.trim()===word));assert.ok(targets.length>=3);
      for(const word of targets){let pos;for(let r=0;r<grid.length;r++)for(let c=0;c<grid.length;c++)for(const [dr,dc]of [[0,1],[1,0],[1,1]])if([...norm(word)].every((ch,i)=>norm(grid[r+dr*i]?.[c+dc*i]||'')===ch))pos=[r,c,r+dr*(word.length-1),c+dc*(word.length-1)];assert.ok(pos,word);const [r,c,rr,cc]=pos;
       await page.getByRole('button',{name:`${grid[rr][cc]}, fila ${rr+1}, columna ${cc+1}`,exact:true}).click();await page.getByRole('button',{name:`${grid[r][c]}, fila ${r+1}, columna ${c+1}`,exact:true}).click();await page.getByRole('button',{name:/^Verificar/}).click();
      }
     }else{
      for(let step=0;step<6;step++){const text=await page.locator('body').innerText(),q=catalog.classification.flatMap(x=>x.items).find(q=>text.split('\n').some(line=>line.trim()===q.name));assert.ok(q,'Libro identificado');await page.getByRole('button',{name:q.category,exact:true}).click();}
     }
    }
    answered++;
    if(mode!=='bible-rosco'){await page.getByRole('button',{name:'Continuar',exact:true}).click();}
   }
   await page.getByText(es.summary.title_completed,{exact:true}).waitFor();assert.equal(await page.getByText('Vamos a repasarlo',{exact:true}).count(),0);
   results.push({mode,level,width,completed:true});console.log('Completo',mode,level,width);
   if(width===360)await page.screenshot({path:path.join(out,`${mode}-${level}-final.png`),fullPage:true});
   await page.goBack();await page.getByRole('button',{name:'Comenzar actividad',exact:true}).waitFor();await page.goForward();await page.getByRole('button',{name:'Comenzar actividad',exact:true}).waitFor();
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'recorridos-interfaz.json'),JSON.stringify({sessions:results.length,answered,errors,results},null,2));console.log(JSON.stringify({sessions:results.length,answered,errors}));
 }catch(e){await page.screenshot({path:path.join(out,'fallo-recorrido.png'),fullPage:true});fs.writeFileSync(path.join(out,'fallo-recorrido.txt'),String(e)+'\n'+JSON.stringify(errors));console.error(e);process.exitCode=1;}
 finally{await browser.close();app.server.closeAllConnections();await new Promise(r=>app.server.close(r));app.db.close();}
})();
