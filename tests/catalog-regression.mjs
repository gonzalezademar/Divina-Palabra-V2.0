import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { createService } from '../server/service.mjs';
const root=path.resolve(import.meta.dirname,'..');
const current=JSON.parse(fs.readFileSync(path.join(root,'server/catalog.json'))),archive=JSON.parse(fs.readFileSync(path.join(root,'server/catalog-archive.json')));
const originalPath=process.env.DP_ORIGINAL_CATALOG;
let preserved=0;if(originalPath){const all=new Set([...current,...archive].map(q=>q.id));for(const q of JSON.parse(fs.readFileSync(originalPath))){assert.ok(all.has(q.id),q.id);preserved++;}}
const retired=archive[0],guided=current.find(q=>q.guidance);assert.ok(retired&&guided);
const folder=fs.mkdtempSync(path.join(os.tmpdir(),'dp-catalog-regression-')),dbPath=path.join(folder,'test.sqlite');
const db=new DatabaseSync(dbPath);db.exec('CREATE TABLE state(id INTEGER PRIMARY KEY,value TEXT)');
const state={users:[{id:'t',code:'001',alias:'docente_prueba',educator:true},{id:'s',code:'002',alias:'alumno_prueba'}],sessions:['t','s'].map(user=>({user,hash:createHash('sha256').update(user).digest('hex'),expires:Date.now()+600000})),links:[{id:'link',owner:'t',member:'s',active:true,kind:'class',level:'principiante'}],invites:[],pending:[],rooms:[],issues:[],tasks:[{id:'old',owner:'t',student:'s',link:'link',title:'Aprendemos de la Biblia',level:'principiante',questions:[retired.id],created:Date.now(),revision:0,draft:{},attempts:[],feedback:null}]};
db.prepare('INSERT INTO state VALUES(1,?)').run(JSON.stringify(state));db.close();
const app=createService({dbPath});await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
async function api(user,endpoint,body,status=200){const r=await fetch(base+'/api/'+endpoint,{method:body===undefined?'GET':'POST',headers:{Cookie:'dp_session='+user,Origin:base,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});const json=await r.json();assert.equal(r.status,status,JSON.stringify(json));return json;}
try{
 const s=await api('s','state');assert.equal(s.tasks[0].retiredContent,true);assert.equal(s.tasks[0].writable,false);assert.equal(s.tasks[0].questions[0].id,retired.id);
 const payload={title:'Aprendemos de la Biblia',level:'principiante',links:['link'],requestId:'new'};
 await api('t','assign',{...payload,questions:[retired.id]},400);
 await api('t','assign',{...payload,questions:[guided.id]},400);
 await api('t','assign',{...payload,questions:[guided.id],guided:true});
 await api('s','submit',{id:'old',answers:{[retired.id]:retired.answer},revision:0,requestId:'old-submit'},409);
 await api('t','feedback',{id:'old',choice:0},409);
 assert.equal((await api('s','state')).tasks.length,2);
 const result={resultado:'Correcto',fichasOriginalesConservadas:preserved,casos:['Consulta de tarea antigua','Bloqueo de nueva asignación retirada','Confirmación de lectura acompañada','Sin recorrección de ficha retirada','Sin nuevas devoluciones sobre ficha retirada','Tarea anterior conservada junto a la nueva']};
 fs.writeFileSync(path.join(process.env.DP_TEST_OUTPUT||folder,'compatibilidad-catalogo.json'),JSON.stringify(result,null,2));console.log(result);
}finally{app.server.closeAllConnections();await new Promise(r=>app.server.close(r));app.db.close();}
