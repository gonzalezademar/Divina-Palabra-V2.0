const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const output=path.resolve(process.env.DP_TEST_OUTPUT || path.join(__dirname,'../reports'));
fs.mkdirSync(output,{recursive:true});
(async()=>{
 const {createService}=await import('../server/service.mjs');const service=createService({dbPath:':memory:'});await new Promise(r=>service.server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+service.server.address().port;
 const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:360,height:800},reducedMotion:'reduce'});const cases=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
 const es=require('../src/data/locales/es.json');
 async function begin(mode,{group=false,timed=false,level='principiante'}={}){
  await page.goto(base+'/setup');await page.locator(`input[name=activity][value="${mode}"]`).check();await page.getByLabel('Nivel de conocimiento',{exact:true}).selectOption(level);
  if(mode!=='counseling-practical')await page.locator('input[name=pace]').nth(timed?1:0).check();
  await page.locator('summary').click();await page.getByLabel(/^Participantes/).selectOption(group?'group':'solo');await page.getByRole('button',{name:'Comenzar actividad',exact:true}).click();await page.getByRole('button',{name:'Pausar',exact:true}).waitFor();
 }
 try{
  await begin('find-word',{timed:true});await page.clock.install();
  const timer=page.locator('span').filter({hasText:/^\d+s$/}).first();
  assert.equal(await timer.innerText(),'60s');await page.clock.runFor(5000);assert.equal(await timer.innerText(),'60s');
  await page.getByRole('button',{name:'Estoy listo: comenzar tiempo'}).click();await page.clock.runFor(3000);assert.equal(await timer.innerText(),'57s');
  await page.getByPlaceholder(es.game.input_placeholder).fill('mi respuesta parcial');await page.getByRole('button',{name:'Pausar',exact:true}).click();await page.clock.runFor(65000);assert.equal(await timer.innerText(),'57s');await page.getByRole('button',{name:'Continuar actividad',exact:true}).click();assert.equal(await page.getByPlaceholder(es.game.input_placeholder).inputValue(),'mi respuesta parcial');
  await page.clock.runFor(58000);await page.getByText('Tiempo terminado',{exact:true}).last().waitFor();await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByText('Desafío 2 de 5',{exact:true}).waitFor();cases.push('El reloj espera la lectura, pausa 65 segundos sin consumir tiempo ni respuesta y vence una sola vez.');
  // Diez respuestas incorrectas con clic doble: ambos equipos reciben cinco turnos.
  await begin('find-word',{group:true,timed:true,level:'avanzado'});
  for(let i=0;i<10;i++){
   await page.getByText(`Desafío ${i+1} de 10`,{exact:true}).waitFor();await page.getByRole('button',{name:'Estoy listo: comenzar tiempo'}).click();await page.getByPlaceholder(es.game.input_placeholder).fill('respuesta equivocada');await page.getByRole('button',{name:es.game.submit_button,exact:true}).dblclick();await page.getByRole('button',{name:'Continuar',exact:true}).click();
  }
  await page.getByRole('heading',{name:'Empate',exact:true}).waitFor();cases.push('Dos equipos completan diez turnos con errores y doble clic; empate real, cinco desafíos por equipo.');
  await begin('find-word',{group:true,timed:true});await page.getByRole('button',{name:'Pausar',exact:true}).click();await page.getByRole('button',{name:'Finalizar y ver resumen'}).click();assert.equal(await page.getByRole('heading',{name:/Ganador|Empate/}).count(),0);cases.push('Finalizar anticipadamente no inventa un ganador.');
  // Veintiún pasos sin responder deben ofrecer repaso, no un bucle infinito.
  await begin('bible-rosco');await page.getByRole('button',{name:'Comenzar',exact:true}).click();
  for(let i=0;i<21;i++)await page.getByRole('button',{name:es.game.pasapalabra,exact:true}).click();
  await page.getByRole('heading',{name:'Terminaste una vuelta'}).waitFor();await page.getByRole('button',{name:'Revisar pendientes'}).click();await page.getByRole('button',{name:es.game.pasapalabra,exact:true}).waitFor();cases.push('Las 21 letras omitidas cierran una vuelta y permiten repasar voluntariamente.');
  // Reflexiones: todas las opciones reciben orientación sin puntos ni notas.
  await begin('counseling-practical');
  for(let i=0;i<5;i++){await page.locator('fieldset button').filter({has:page.locator('span').filter({hasText:/^A$/})}).first().click();await page.getByText('Para reflexionar',{exact:true}).waitFor();await page.getByRole('button',{name:'Continuar',exact:true}).click();}
  await page.getByText(es.summary.title_completed,{exact:true}).waitFor();assert.equal(await page.getByText(/puntos obtenidos|ganador|empate/i).count(),0);cases.push('Cinco reflexiones completas con orientación y sin puntuación.');
  await page.goto(base+'/teacher');await page.evaluate(()=>document.documentElement.style.fontSize='32px');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));cases.push('Acceso al educador legible al ampliar el tamaño base del texto al 200 %.');
  await page.evaluate(()=>{for(const key of Object.keys(localStorage))if(key.startsWith('dp_round_v1:')||key==='dp_active_round_v1')localStorage.removeItem(key);});
  await page.goto(base+'/game');await page.getByRole('button',{name:'Comenzar actividad',exact:true}).waitFor();cases.push('Abrir una actividad sin selección devuelve a una pantalla útil.');
  // Datos ficticios de prueba, sin generar ni guardar versículos en el catálogo.
  let oldRequest;
  await page.route('https://bible-api.deno.dev/**',async route=>{const chapter=route.request().url().split('/').at(-1);if(chapter==='1'){oldRequest=route;return;}await route.fulfill({json:{vers:[{number:1,verse:'DATO DE PRUEBA DEL CAPÍTULO DOS'}]}});});
  await page.goto(base+'/bible');await page.getByLabel('Capítulo',{exact:true}).fill('2');await page.getByText('DATO DE PRUEBA DEL CAPÍTULO DOS',{exact:true}).waitFor();
  if(oldRequest)await oldRequest.fulfill({json:{vers:[{number:1,verse:'DATO DE PRUEBA OBSOLETO'}]}});
  await page.waitForTimeout(250);assert.equal(await page.getByText('DATO DE PRUEBA OBSOLETO',{exact:true}).count(),0);cases.push('Una respuesta lenta de la Biblia no aparece bajo el título de otro capítulo (servicio simulado).');
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'pruebas-presion.json'),JSON.stringify({cases,errors},null,2));console.log(JSON.stringify({casos:cases.length,errores:errors}));
 }catch(e){await page.screenshot({path:path.join(output,'fallo-presion.png'),fullPage:true});console.error(e);process.exitCode=1;}
 finally{await browser.close();service.server.closeAllConnections();await new Promise(r=>service.server.close(r));service.db.close();}
})();
