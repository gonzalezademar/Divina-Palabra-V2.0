import test from 'node:test';
import assert from 'node:assert/strict';
import { createService } from '../server/service.mjs';
import { createCloudStore } from '../server/cloud-store.mjs';

function sharedStore() {
  let revision = 0;
  let value = {users:[],sessions:[],links:[],invites:[],pending:[],tasks:[],rooms:[],issues:[]};
  const rates = new Map();
  return {
    rejectCommit: false, failCommit: false, conflicts: 0,
    async load() { return {revision, value: structuredClone(value)}; },
    async commit(expected, next) {
      if (this.failCommit) throw Object.assign(new Error('Guardado no disponible.'), {status:503});
      if (this.rejectCommit || expected !== revision) { this.conflicts++; return false; }
      value = structuredClone(next); revision++; return true;
    },
    async rate(key, max) {
      const hits = (rates.get(key) || 0) + 1; rates.set(key, hits);
      if (hits > max) throw Object.assign(new Error('Demasiados intentos.'), {status:429});
    }
  };
}

async function start(t, store, now = Date.now) {
  const app = createService({store, now});
  await new Promise(resolve => app.server.listen(0,'127.0.0.1',resolve));
  t.after(() => { app.server.closeAllConnections(); app.close(); });
  const base = `http://127.0.0.1:${app.server.address().port}`;
  return async (endpoint, data, cookie = '') => {
    const response = await fetch(`${base}/api/${endpoint}`, {method:data===undefined?'GET':'POST',headers:{Origin:base,'Content-Type':'application/json',Cookie:cookie},body:data===undefined?undefined:JSON.stringify(data)});
    return {status:response.status, data:await response.json(), cookie:response.headers.get('set-cookie')?.split(';')[0]};
  };
}
const registration = alias => ({alias, password:'Una frase de prueba segura'});
const ok = response => { assert.equal(response.status,200,JSON.stringify(response.data)); return response; };

test('dos servidores conservan veinte cuentas simultáneas y una sesión sirve en ambos', async t => {
  const store=sharedStore(), a=await start(t,store), b=await start(t,store);
  const results=await Promise.all(Array.from({length:20},(_,i)=>(i%2?a:b)('register',registration(`persona_${i}`))));
  results.forEach(ok);
  const saved=await store.load();
  assert.equal(saved.value.users.length,20);
  assert.equal(new Set(saved.value.users.map(u=>u.code)).size,20);
  assert.ok(store.conflicts>0,'debe ejercitar conflictos reales entre instancias');
  for (const result of results) assert.equal(ok(await b('identity',undefined,result.cookie)).data.user.id,result.data.user.id);
  const restarted=await start(t,store);
  assert.equal(ok(await restarted('identity',undefined,results[0].cookie)).data.user.id,results[0].data.user.id);
});

test('dos altas del mismo alias no crean cuentas duplicadas', async t => {
  const store=sharedStore(),a=await start(t,store),b=await start(t,store);
  const replies=await Promise.all([a('register',registration('mismo_alias')),b('register',registration('mismo_alias'))]);
  assert.deepEqual(replies.map(r=>r.status).sort(),[200,409]);
  assert.equal((await store.load()).value.users.length,1);
  assert.equal(replies.find(r=>r.status===409).cookie,undefined);
});

test('un guardado fallido o una colisión agotada nunca entrega una cookie sin sesión', async t => {
  for(const failure of ['failCommit','rejectCommit']) {
    const store=sharedStore();store[failure]=true;
    const request=await start(t,store);
    const response=await request('register',registration('registro_fallido'));
    assert.equal(response.status,503);assert.equal(response.cookie,undefined);
    assert.equal((await store.load()).value.users.length,0);
    store[failure]=false;
    ok(await request('register',registration('registro_fallido')));
  }
});

test('el límite de intentos por alias se comparte entre servidores', async t => {
  const store=sharedStore(),a=await start(t,store),b=await start(t,store);
  for(let i=0;i<12;i++) assert.equal((await(i%2?a:b)('login',registration('no_existe'))).status,401);
  const restarted=await start(t,store);
  assert.equal((await restarted('login',registration('no_existe'))).status,429);
});

test('la presencia y las respuestas del encuentro sobreviven al cambio de servidor', async t => {
  let clock=Date.now();const store=sharedStore(),a=await start(t,store,()=>clock),b=await start(t,store,()=>clock);
  const one=ok(await a('register',registration('participante_a'))),two=ok(await b('register',registration('participante_b')));
  const invite=ok(await a('invite',{kind:'peer'},one.cookie)).data;
  const joined=ok(await b('join',{token:invite.token},two.cookie)).data;
  ok(await a('confirm',{id:joined.pending,accept:true},one.cookie));
  const link=ok(await b('state',undefined,two.cookie)).data.links[0];
  const room=ok(await a('room-create',{link:link.id,mode:'find-word',level:'principiante',version:'rvr1960'},one.cookie)).data;
  ok(await b('room-accept',{id:room.id},two.cookie));clock+=16000;
  assert.equal(ok(await a(`room?id=${room.id}`,undefined,one.cookie)).data.paused,true);
  ok(await b('room-heartbeat',{id:room.id},two.cookie));
  const restarted=await start(t,store,()=>clock);
  assert.equal(ok(await restarted(`room?id=${room.id}`,undefined,one.cookie)).data.paused,false);
  ok(await a('room-answer',{id:room.id,index:0,answer:'ejemplo'},one.cookie));
  assert.equal(ok(await b(`room?id=${room.id}`,undefined,one.cookie)).data.index,1);
});

test('adaptador REST: fallo cerrado, ámbito explícito y confirmación de revisión', async () => {
  assert.throws(()=>createCloudStore({url:'https://example.com',key:'secret',namespace:''}),{status:503});
  const calls=[];
  const client=createCloudStore({url:'https://example.com',key:'sb_secret_test',namespace:'preview',fetcher:async(url,options)=>{
    calls.push({url,options});return {ok:true,json:async()=>url.includes('dp_state?')?[{revision:7,value:(await sharedStore().load()).value}]:true};
  }});
  const snapshot=await client.load();assert.equal(snapshot.revision,7);
  assert.equal(await client.commit(7,snapshot.value),true);await client.rate('ip:local',12,60000);
  assert.ok(calls[0].url.includes('id=eq.preview'));
  assert.equal(JSON.parse(calls[1].options.body).p_revision,7);
  assert.ok(!calls[2].options.body.includes('ip:local'));
  assert.equal(calls[0].options.headers.apikey,'sb_secret_test');
  const unavailable=createCloudStore({url:'https://example.com',key:'secret',namespace:'preview',fetcher:async()=>({ok:false})});
  await assert.rejects(unavailable.load(),{status:503});
  const missing=createCloudStore({url:'https://example.com',key:'secret',namespace:'preview',fetcher:async()=>({ok:true,json:async()=>[]})});
  await assert.rejects(missing.load(),{status:503});
});
