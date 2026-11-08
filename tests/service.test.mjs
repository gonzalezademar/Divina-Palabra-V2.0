import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { createService } from '../server/service.mjs';

test('recorridos completos, permisos, interrupciones y categorías sin edades', async t => {
  const folder=fs.mkdtempSync(path.join(os.tmpdir(),'divina-test-'));
  let clock=Date.now();const app=createService({dbPath:path.join(folder,'test.sqlite'),now:()=>clock});
  await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${app.server.address().port}`;
  const users={};let checks=0;
  async function request(who,endpoint,body,expected=200){
    const res=await fetch(`${base}/api/${endpoint}`,{method:body===undefined?'GET':'POST',headers:{Origin:base,'Content-Type':'application/json',Cookie:users[who]?.cookie||''},body:body===undefined?undefined:JSON.stringify(body)});
    const json=await res.json();assert.equal(res.status,expected,`${endpoint}: ${JSON.stringify(json)}`);checks++;
    const cookie=res.headers.get('set-cookie');if(cookie&&users[who])users[who].cookie=cookie.split(';')[0];return json;
  }
  try{
    for(const name of ['teacher','student','outsider','otherteacher']){users[name]={};const r=await request(name,'register',{alias:name,password:'una frase de prueba segura'});users[name]={...users[name],...r};}
    await request('teacher','educator',{});
    const catalogue=await request('teacher','catalog');
    await request('student','catalog',undefined,403);
    await t.test('credenciales, privacidad y origen de solicitudes',async()=>{
      await request('outsider','login',{alias:'student',password:'equivocada'},401);
      const res=await fetch(base+'/api/educator',{method:'POST',headers:{Origin:'https://sitio-ajeno.example','Content-Type':'application/json',Cookie:users.teacher.cookie},body:'{}'});assert.equal(res.status,403);checks++;
      const s=await request('student','state');assert.equal(s.user.alias,'student');assert.equal(s.tasks.length,0);assert.ok(!JSON.stringify(s).includes('password'));assert.ok(!('age' in s.user));
      const raw=app.db.prepare('SELECT value FROM state').get().value;assert.ok(!raw.includes('una frase de prueba segura'));assert.ok(!raw.includes(users.student.recovery));checks+=3;
    });
    await request('teacher','educator',{});await request('otherteacher','educator',{});
    await t.test('QR que vence, doble confirmación, permisos y desvinculación',async()=>{
      let qr=await request('teacher','invite',{kind:'class'});clock+=5001;await request('student','join',{token:qr.token},410);
      qr=await request('teacher','invite',{kind:'class'});const join=await request('student','join',{token:qr.token,confirm:false});
      await request('teacher','confirm',{id:join.pending,accept:true},409);
      clock+=6000;await request('student','join',{pending:join.pending});
      await request('outsider','confirm',{id:join.pending,accept:true},404);
      assert.equal((await request('student','state')).links.length,0);
      clock+=9000;await request('teacher','confirm',{id:join.pending,accept:true,level:'principiante'});
      const s=await request('student','state');assert.equal(s.links.length,1);assert.ok(!JSON.stringify(s.links).includes('teacher'));checks+=2;
    });
    const link=(await request('teacher','state')).links[0];
    let task;
    await t.test('asignación, borradores privados, corrección y devolución sin notas',async()=>{
      const questions=catalogue.filter(q=>q.mode==='find-word'&&q.version==='rvr1960'&&(!q.levels||q.levels.includes('principiante'))).slice(0,2);
      const payload={title:'Aprendemos de la Biblia',level:'principiante',questions:questions.map(q=>q.id),links:[link.id],requestId:'assignment-1'};
      await request('outsider','assign',payload,403);
      await request('teacher','assign',{...payload,title:'Escríbeme por otro medio'},400);
      await request('teacher','assign',payload);await request('teacher','assign',payload);
      let s=await request('student','state');assert.equal(s.tasks.length,1);task=s.tasks[0];
      await request('outsider','draft',{id:task.id,answers:{},revision:0},403);
      await request('student','submit',{id:task.id,answers:{},revision:0,requestId:'empty'},400);
      assert.equal((await request('student','state')).tasks[0].revision,0);
      const answers={[questions[0].id]:questions[0].answer.toLowerCase(),[questions[1].id]:'mensaje libre que nunca verá el educador'};
      const draft=await request('student','draft',{id:task.id,answers,revision:0});
      const teacher=await request('teacher','state');assert.ok(!teacher.tasks[0].draft);assert.ok(!JSON.stringify(teacher).includes('mensaje libre'));
      await request('student','draft',{id:task.id,answers,revision:0});
      await request('student','draft',{id:task.id,answers:{...answers,[questions[0].id]:'otra versión'},revision:0},409);
      const delivered=await request('student','submit',{id:task.id,answers,revision:draft.revision,requestId:'delivery-1'});
      assert.equal(delivered.attempt.results[0].correct,true);assert.equal(delivered.attempt.results[1].correct,false);
      await request('student','submit',{id:task.id,answers,revision:draft.revision,requestId:'delivery-1'});
      s=await request('teacher','state');assert.equal(s.tasks[0].attempts.length,1);assert.ok(!JSON.stringify(s).includes('mensaje libre'));
      await request('teacher','feedback',{id:task.id,choice:99,attempt:1},400);await request('otherteacher','feedback',{id:task.id,choice:1,attempt:1},403);
      await request('teacher','feedback',{id:task.id,choice:1,attempt:1});assert.ok((await request('student','state')).tasks[0].feedback.text);
      await request('student','issue',{question:questions[1].id,answer:answers[questions[1].id],reason:'respuesta'});assert.equal((await request('teacher','state')).issues.length,0);
      await request('student','unlink',{id:link.id});
      const before=JSON.stringify((await request('teacher','state')).tasks[0]);
      await request('student','draft',{id:task.id,answers:{[questions[0].id]:'nuevo repaso'},revision:delivered.revision});
      assert.equal(JSON.stringify((await request('teacher','state')).tasks[0]),before);
      await request('teacher','feedback',{id:task.id,choice:1,attempt:1},409);
      await request('student','submit',{id:task.id,answers,revision:delivered.revision+1,requestId:'delivery-2'},409);
      assert.equal((await request('student','state')).tasks.length,1);checks+=10;
    });
    clock+=61000;
    await t.test('reconexión sin restaurar permisos antiguos',async()=>{
      const qr=await request('teacher','invite',{kind:'class'});const p=await request('student','join',{token:qr.token});await request('teacher','confirm',{id:p.pending,accept:true,level:'avanzado'});
      assert.equal((await request('student','state')).tasks[0].writable,false);
      await request('teacher','assign',{title:'Repasamos juntos',level:'avanzado',questions:[catalogue.find(q=>!q.levels||q.levels.includes('avanzado')).id],links:[link.id],requestId:'bad-old-link'},409);
    });
    await t.test('recuperación de contraseña revoca sesiones y clave anterior',async()=>{
      const oldCookie=users.outsider.cookie;const oldRecovery=users.outsider.recovery;
      await request('outsider','recover',{alias:'outsider',password:'otra frase segura nueva',recovery:'no-es-la-clave'},401);
      const r=await request('outsider','recover',{alias:'outsider',password:'otra frase segura nueva',recovery:oldRecovery});assert.ok(r.recovery!==oldRecovery);
      const res=await fetch(base+'/api/state',{headers:{Cookie:oldCookie}});assert.equal(res.status,401);
      await request('outsider','recover',{alias:'outsider',password:'otra frase segura nueva',recovery:oldRecovery},401);
    });
    const qr=await request('teacher','invite',{kind:'peer'});const p=await request('student','join',{token:qr.token});await request('teacher','confirm',{id:p.pending,accept:true});
    const peer=(await request('teacher','state')).links.find(l=>l.kind==='peer');
    for(const level of ['principiante','intermedio','avanzado'])for(const mode of ['find-word','complete-phrase','guess-the-phrase','bible-rosco','word-search','counseling-practical']){
      clock+=61000;
      await t.test(`encuentro completo: ${mode} / ${level}`,async()=>{
        const room=await request('teacher','room-create',{link:peer.id,mode,level,version:'rvr1960'});
        await request('outsider',`room?id=${room.id}`,undefined,403);
        await request('teacher','room-accept',{id:room.id},409);
        await request('student','room-accept',{id:room.id});
        let a=await request('teacher',`room?id=${room.id}`);let b=await request('student',`room?id=${room.id}`);assert.equal(a.question.id,b.question.id);
        clock+=16000;await request('teacher','room-answer',{id:room.id,index:0,answer:'ejemplo'},409);
        await request('student','room-heartbeat',{id:room.id});
        for(let index=0;index<a.total;index++){
          for(const who of ['teacher','student']){
            const view=await request(who,`room?id=${room.id}`);const q=catalogue.find(q=>q.id===view.question.id);assert.equal(view.index,index);
            const answer=who==='student'&&index===0&&mode!=='counseling-practical'?'equivocación':q.answer;
            await request(who,'room-answer',{id:room.id,index,answer,score:999999});
            if(index===0)await request(who,'room-answer',{id:room.id,index,answer},409);
          }
        }
        a=await request('teacher',`room?id=${room.id}`);assert.equal(a.status,'finished');
        if(mode==='counseling-practical')assert.ok(a.ownResults.every(r=>r.correct===null));else assert.equal(a.results[0].count-a.results[1].count,1);
        checks+=3;
      });
    }
    await t.test('datos persistentes, sin edades ni contenido añadido al catálogo',async()=>{
      const value=JSON.parse(app.db.prepare('SELECT value FROM state').get().value);
      assert.equal(value.users.length,4);assert.equal(value.rooms.length,18);
      assert.ok(value.users.every(u=>!('age' in u)&&!('birthDate' in u)&&!('isAdult' in u)));
      assert.ok(value.tasks.every(t=>t.questions.every(k=>catalogue.some(q=>q.id===k))));checks+=4;
    });
    await t.test('grupo de veinte alumnos: una asignación, veinte entregas independientes',async()=>{
      const links=[];
      for(let i=0;i<20;i++){
        clock+=61000;const name=`groupstudent${i}`;users[name]={};
        await request(name,'register',{alias:name,password:'una frase distinta segura'});
        const invitation=await request('teacher','invite',{kind:'class'});const pending=await request(name,'join',{token:invitation.token});
        await request('teacher','confirm',{id:pending.pending,accept:true,level:['principiante','intermedio','avanzado'][i%3]});
        links.push((await request(name,'state')).links[0].id);
      }
      const body={title:'Repasamos juntos',level:'intermedio',questions:[catalogue[0].id],links,requestId:'twenty'};
      const created=await request('teacher','assign',body);assert.equal(created.count,20);
      await request('teacher','assign',body);
      const grouped=(await request('teacher','state')).tasks.filter(t=>t.requestId==='twenty');assert.equal(grouped.length,20);
      for(let i=0;i<20;i++){
        const name=`groupstudent${i}`;const tasks=(await request(name,'state')).tasks;assert.equal(tasks.length,1);
        await request(name,'submit',{id:tasks[0].id,revision:0,answers:{[catalogue[0].id]:i%2?catalogue[0].answer:'error de prueba'},requestId:`student-${i}`});
      }
      const final=(await request('teacher','state')).tasks.filter(t=>t.requestId==='twenty');assert.equal(final.filter(t=>t.attempts.length===1).length,20);checks+=24;
    });
    await t.test('tareas en las seis modalidades y tres niveles',async()=>{
      const classLink=(await request('teacher','state')).links.find(l=>l.active&&l.kind==='class'&&l.member===users.student.user.id);
      for(const level of ['principiante','intermedio','avanzado']) for(const mode of ['find-word','complete-phrase','guess-the-phrase','bible-rosco','word-search','counseling-practical']){
        clock+=61000;
        const q=catalogue.find(q=>q.mode===mode&&(!q.levels||q.levels.includes(level))&&(q.version==='rvr1960'||q.version==='referencias'));
        await request('teacher','assign',{title:'Comprendemos un pasaje',level,questions:[q.id],links:[classLink.id],requestId:`${level}-${mode}`});
        const task=(await request('student','state')).tasks.at(-1);
        await request('student','help',{id:task.id,question:q.id});
        const delivered=await request('student','submit',{id:task.id,revision:0,answers:{[q.id]:q.answer},requestId:`${level}-${mode}`});
        assert.equal(delivered.attempt.results[0].helped,true);assert.equal(delivered.attempt.results[0].correct,mode==='counseling-practical'?null:true);checks+=2;
      }
    });
    await t.test('veinte alumnos consultan a la vez y una carga interrumpida no bloquea al grupo',async()=>{
      clock+=61000;
      const durations=[];
      await Promise.all(Array.from({length:20},async(_,i)=>{for(let round=0;round<5;round++){const begin=performance.now();const s=await request(`groupstudent${i}`,'state');assert.equal(s.tasks.length,1);durations.push(performance.now()-begin);}}));
      durations.sort((a,b)=>a-b);checks+=100;
      const socket=net.createConnection(app.server.address().port,'127.0.0.1');
      await new Promise(r=>socket.once('connect',r));
      socket.write(`POST /api/draft HTTP/1.1\r\nHost: 127.0.0.1\r\nContent-Type: application/json\r\nContent-Length: 100\r\n\r\n{`);
      try{const r=await fetch(base+'/api/health',{signal:AbortSignal.timeout(1500)});assert.equal(r.status,200);checks++;}finally{socket.destroy();}
      const navigation=await fetch(base+'/game.txt?_rsc=test',{headers:{RSC:'1'}});assert.ok(navigation.headers.get('content-type').includes('text/x-component'));checks++;
      console.log(JSON.stringify({consultasConcurrentes:20,consultasTotales:100,p95Milisegundos:Number(durations[94].toFixed(1)),nota:'Servicio local, cuentas ficticias; no representa latencia de Internet.'}));
    });
    console.log(JSON.stringify({verificaciones:checks,encuentrosCompletos:18,niveles:3,modalidades:6}));
  }finally{await new Promise(resolve=>app.server.close(resolve));app.db.close();}
});
