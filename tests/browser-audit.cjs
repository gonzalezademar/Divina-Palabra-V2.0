const {chromium}=require('@playwright/test');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const output=path.resolve(process.env.DP_TEST_OUTPUT || path.join(__dirname,'../reports'));fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const reports=[],errors=[];let checks=0;
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 const {createService}=await import('../server/service.mjs');
 const os=require('node:os');const testDir=fs.mkdtempSync(path.join(os.tmpdir(),'divina-browser-'));
 const service=createService({dbPath:path.join(testDir,'browser.sqlite')});await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${service.server.address().port}`;
 async function noOverflow(label){const sizes=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(sizes.scroll<=sizes.width+1,`${label}: desbordamiento ${JSON.stringify(sizes)}`);checks++;}
 try{
  for(const route of ['/','/setup','/profile','/about','/teacher','/classroom','/encounters']){await page.goto(base+route);await page.waitForTimeout(450);await noOverflow(route);assert.equal(await page.locator('input[type=date]').count(),0);reports.push({pantalla:route,ancho:390,resultado:'sin desbordamiento'});}
  await page.goto(base+'/');await page.screenshot({path:path.join(output,'inicio-celular.png'),fullPage:true});
  await page.goto(base+'/setup');await page.screenshot({path:path.join(output,'actividades-celular.png'),fullPage:true});
  // Configuración corrupta, una equivocación que no debe romper la aplicación.
  await page.evaluate(()=>{localStorage.setItem('soundOn','incorrecto');localStorage.setItem('difficulty','{');localStorage.setItem('roundTime','no-es-numero');localStorage.setItem('userSettings','{"isAdult":true,"ageVerified":true}');});
  await page.reload();await page.getByRole('button',{name:'Comenzar actividad',exact:true}).waitFor();await noOverflow('configuración corrupta');assert.equal(await page.evaluate(()=>localStorage.getItem('userSettings')),null);checks++;
  const alias='prueba_docente_'+Date.now().toString().slice(-7);
  await page.goto(base+'/teacher');await page.getByRole('button',{name:'Crear cuenta',exact:true}).click();await page.getByLabel('Alias privado',{exact:true}).fill(alias);await page.getByLabel('Contraseña',{exact:true}).fill('Una frase segura para pruebas');await page.getByRole('button',{name:'Crear mi cuenta',exact:true}).click();await page.getByRole('heading',{name:'Guarda tu clave de recuperación'}).waitFor();await page.getByRole('button',{name:'Ya la guardé · Continuar',exact:true}).click();await page.getByRole('button',{name:'Activar herramientas de Educador'}).click();await page.getByRole('heading',{name:'Preparar una tarea',exact:true}).waitFor();await noOverflow('educador registrado');
  const teacher=(await (await context.request.get(base+'/api/state')).json()).user;
  const studentContext=await browser.newContext({viewport:{width:360,height:800},reducedMotion:'reduce'});const student=await studentContext.newPage();student.on('pageerror',e=>errors.push(e.message));
  const studentAlias='prueba_alumno_'+Date.now().toString().slice(-7);
  await student.goto(base+'/classroom');await student.getByRole('button',{name:'Crear cuenta',exact:true}).click();await student.getByLabel('Alias privado',{exact:true}).fill(studentAlias);await student.getByLabel('Contraseña',{exact:true}).fill('Otra frase segura para pruebas');await student.getByRole('button',{name:'Crear mi cuenta',exact:true}).click();await student.getByRole('button',{name:'Ya la guardé · Continuar',exact:true}).click();await student.getByRole('button',{name:'Vincularme con mi educador'}).click();
  await page.getByRole('button',{name:'Vincular',exact:true}).click();await page.getByRole('button',{name:'Mostrar mi QR'}).click();await page.getByAltText('QR de vinculación temporal').waitFor();await page.screenshot({path:path.join(output,'vinculacion-qr.png'),fullPage:true});
  const invitation=await (await context.request.post(base+'/api/invite',{headers:{Origin:base},data:{kind:'class'}})).json();
  await student.getByLabel('Enlace o código leído del QR').fill(invitation.token);await student.getByRole('button',{name:'Confirmar mi solicitud de vinculación'}).click();
  await page.getByRole('button',{name:'Sí, vincular',exact:true}).waitFor({timeout:12000});await page.getByRole('button',{name:'Sí, vincular',exact:true}).click();
  await page.getByRole('navigation',{name:'Secciones de mi espacio'}).getByRole('button',{name:'Educador',exact:true}).click();await page.getByRole('heading',{name:'Preparar una tarea'}).waitFor();
  await page.getByRole('checkbox',{name:/EL PRIMER LIBRO DE LA BIBLIA/}).check();await page.getByRole('button',{name:'Seleccionar alumnos de este nivel'}).click();await page.getByRole('button',{name:'Revisar antes de asignar'}).click();await page.getByRole('heading',{name:'Confirma tu tarea'}).waitFor();await page.getByRole('button',{name:'Confirmar y asignar tarea',exact:true}).dblclick();await page.getByText('Tarea asignada. Cada alumno tiene su propia entrega.').waitFor();
  const state=await (await context.request.get(base+'/api/state')).json();assert.equal(state.tasks.length,1);checks++;
  await student.getByRole('button',{name:'Mis tareas',exact:true}).click();await student.getByRole('button',{name:'Abrir tarea'}).waitFor({timeout:12000});await student.getByRole('button',{name:'Abrir tarea'}).click();await student.getByLabel('Tu respuesta',{exact:true}).fill('una respuesta equivocada');await student.getByText('Avance guardado. Puedes continuar después.').waitFor();
  await studentContext.setOffline(true);await student.getByLabel('Tu respuesta',{exact:true}).fill('otra respuesta que no debe perderse');await student.waitForTimeout(1500);await student.getByRole('button',{name:'Entregar tarea',exact:true}).click();await student.getByText(/No hay conexión con el servicio/).waitFor();assert.equal(await student.getByLabel('Tu respuesta',{exact:true}).inputValue(),'otra respuesta que no debe perderse');checks++;
  await studentContext.setOffline(false);
  let dropped=false;let confirmLost;const confirmationLost=new Promise(resolve=>{confirmLost=resolve;});
  await student.route('**/api/submit',async route=>{if(!dropped){dropped=true;const accepted=await route.fetch();assert.equal(accepted.status(),200);await route.abort('failed');confirmLost();}else await route.continue();});
  await student.getByRole('button',{name:'Entregar tarea',exact:true}).click();await confirmationLost;await student.getByText(/No hay conexión con el servicio/).waitFor();
  await student.getByRole('button',{name:'Entregar tarea',exact:true}).click();await student.getByRole('heading',{name:'Devolución y próximos pasos'}).waitFor();await student.screenshot({path:path.join(output,'devolucion-alumno.png'),fullPage:true});
  await student.getByRole('button',{name:'Repasar y volver a intentar',exact:true}).click();await student.getByLabel('Tu respuesta',{exact:true}).fill('repaso después del reintento');await student.getByText('Avance guardado. Puedes continuar después.').waitFor();await student.getByRole('button',{name:'Entregar tarea',exact:true}).click();await student.getByRole('heading',{name:'Devolución y próximos pasos'}).waitFor();checks+=2;
  await page.getByRole('button',{name:'Ver entrega',exact:true}).click();await page.getByRole('heading',{name:'Devolución y próximos pasos'}).waitFor();assert.equal(await page.getByText('otra respuesta que no debe perderse',{exact:true}).count(),0);await page.getByRole('button',{name:'Enviar devolución preparada'}).waitFor();if(await page.getByRole('button',{name:'Enviar devolución preparada'}).isDisabled()){await page.getByRole('button',{name:'Ya revisé la nueva entrega'}).click();checks++;}await page.getByRole('button',{name:'Enviar devolución preparada'}).click();checks++;
  await student.getByRole('button',{name:'Consultar esta respuesta'}).click();await student.getByRole('button',{name:'Guardar consulta',exact:true}).click();await student.getByRole('button',{name:'Volver a mis tareas'}).click();await student.getByRole('button',{name:'Mis consultas',exact:true}).click();await student.getByRole('checkbox').first().check();const downloadPromise=student.waitForEvent('download');await student.getByRole('button',{name:'Descargar las consultas seleccionadas en PDF'}).click();const download=await downloadPromise;await download.saveAs(path.join(output,'consulta-de-prueba.pdf'));checks++;
  await page.getByRole('button',{name:'Volver a mis tareas'}).click();await page.setViewportSize({width:1366,height:900});await page.screenshot({path:path.join(output,'educador-pc.png'),fullPage:true});
  // Matriz de actividad individual: tres niveles, seis modalidades y dos tamaños.
  for(const width of [360,1280]){
    await page.setViewportSize({width,height:900});
    for(const level of ['principiante','discipulo','avanzado'])for(const mode of ['find-word','complete-phrase','guess-the-phrase','bible-rosco','word-search','counseling-practical']){
      await page.goto(base+'/setup');await page.locator(`input[name=activity][value="${mode}"]`).check();await page.getByLabel('Nivel de conocimiento',{exact:true}).selectOption(level);await page.getByRole('button',{name:'Comenzar actividad',exact:true}).click();await page.waitForURL(/\/game(?:\?|$)/);
      const pause=page.getByRole('button',{name:'Pausar',exact:true});await pause.waitFor({timeout:15000});await noOverflow(`${mode}/${level}/${width}`);await pause.click();await page.getByRole('button',{name:'Continuar actividad',exact:true}).click();checks++;
      if(level==='principiante'&&width===360)await page.screenshot({path:path.join(output,`${mode}-celular.png`),fullPage:true});
      if(mode==='find-word'){await page.getByPlaceholder('Escribe tu respuesta aquí').fill('respuesta equivocada');await page.getByRole('button',{name:'Enviar Respuesta',exact:true}).dblclick();await page.getByText('Vamos a repasarlo',{exact:true}).waitFor();checks++;}
      reports.push({modalidad:mode,nivel:level,ancho:width,resultado:'apertura, pausa y diseño revisados'});
    }
  }
  assert.deepEqual(errors,[]);checks++;
  fs.writeFileSync(path.join(output,'pruebas-interfaz.json'),JSON.stringify({checks,errors,reports},null,2));console.log(JSON.stringify({checks,errors,pantallas:reports.length}));
  await studentContext.close();
 }catch(e){await page.screenshot({path:path.join(output,'fallo-interfaz.png'),fullPage:true});console.error(e);fs.writeFileSync(path.join(output,'fallo-interfaz.txt'),String(e)+'\n'+JSON.stringify(errors));process.exitCode=1;}
 finally{await browser.close();service.server.closeAllConnections();await new Promise(resolve=>service.server.close(resolve));service.db.close();}
})();
