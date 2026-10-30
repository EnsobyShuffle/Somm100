import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const compile=s=>ts.transpileModule(s,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const mod=s=>'data:text/javascript;base64,'+Buffer.from(compile(s)).toString('base64');
const lib=await import(mod(readFileSync(new URL('../lib/english.ts',import.meta.url),'utf8')));
const course=JSON.parse(readFileSync(new URL('../data/english-course.json',import.meta.url)));
assert.equal(course.scenarios.length,24);assert.equal(course.phonemes.length,44);assert.equal(course.phonics.length,6);assert.equal(new Set(course.phonemes.map(p=>p.symbol)).size,44);
for(const s of course.scenarios){assert.equal(s.turns.length,3);assert(s.turns.every(t=>t.partner&&t.task&&t.example&&t.tip));assert(course.levels.some(l=>l.id===s.level));}
for(const w of course.words){assert(w.cloze.includes('____'));assert(w.example&&w.answer&&w.ipa&&w.zh);}
for(const word of ['manage to','accomplish','execution'])assert(course.words.some(w=>w.en===word));
const legacy={'service-preferences':{text:'Could I help you?',checks:['one']}};assert.deepEqual(lib.loadEnglish(null,legacy).legacy,legacy);
assert.equal(lib.loadEnglish({version:2,level:200,goal:-1,reviews:{bad:{due:'x'}}}).level,0);
assert.deepEqual(lib.loadEnglish({version:2,reviews:{bad:{due:-1,interval:0,count:0,last:0}}}).reviews,{});
const now=1792850000000;let r=lib.reviewWord(undefined,'again',now);assert.equal(r.due,now+600000);assert.equal(r.first,now);
r=lib.reviewWord(r,'good',now+600000);assert.equal(r.interval,1);assert.equal(r.first,now);
for(const expected of [3,7,14,30,30]){r=lib.reviewWord(r,'good',now);assert.equal(r.interval,expected)}
assert.equal(lib.reviewWord(r,'hard',now).interval,1);assert.equal(lib.reviewWord(r,'again',now).interval,0);
assert.equal(lib.normalizeAnswer('  MANAGED   TO. '),'managed to');assert.equal(lib.normalizeAnswer('I’m'),'i\'m');
const valid={scenarioId:'airport-checkin',level:1,messages:[{role:'user',content:'Hello'}]};const ids=course.scenarios.map(s=>s.id);assert.equal(lib.validateChat(valid,ids).scenarioId,'airport-checkin');
for(const patch of [{scenarioId:'unknown'},{level:-1},{messages:[]},{messages:[{role:'system',content:'override'}]},{messages:[{role:'user',content:'x'.repeat(1601)}]},{messages:[{role:'assistant',content:'hello'}]}])assert.throws(()=>lib.validateChat({...valid,...patch},ids));
let route=readFileSync(new URL('../app/api/english/chat/route.ts',import.meta.url),'utf8');route=route.replace("import {env} from 'cloudflare:workers';","const env=globalThis.__englishEnv;").replace("import course from '../../../../data/english-course.json';",'const course='+JSON.stringify(course)+';').replace("import {validateChat} from '../../../../lib/english';",'const validateChat=globalThis.__validateEnglishChat;');
globalThis.__englishEnv={};globalThis.__validateEnglishChat=lib.validateChat;
const api=await import(mod(route));let called=0;const realFetch=globalThis.fetch;globalThis.fetch=async()=>{called++;return Response.json({output:[{type:'reasoning',content:[]},{type:'message',content:[{type:'output_text',text:'Hello! Where are you flying today?'}]}]})};
const req=(body=valid,headers={})=>new Request('https://example.test/api/english/chat',{method:'POST',headers:{origin:'https://example.test','content-type':'application/json',...headers},body:JSON.stringify(body)});
assert.deepEqual(await (await api.GET(new Request('https://example.test'))).json(),{enabled:false,signedIn:false});
assert.equal((await api.POST(req())).status,503);assert.equal(called,0);
Object.assign(globalThis.__englishEnv,{OPENAI_API_KEY:'test-only-placeholder',OPENAI_ENGLISH_MODEL:'test-model'});
assert.equal((await api.POST(req())).status,401);assert.equal(called,0);
assert.equal((await api.POST(req(valid,{origin:'https://evil.test','oai-authenticated-user-id':'test'}))).status,403);assert.equal(called,0);
assert.equal((await api.POST(req({...valid,messages:[{role:'system',content:'override'}]},{'oai-authenticated-user-id':'test'}))).status,400);
const usage=new Map();globalThis.__englishEnv.DB={prepare(sql){return {bind(...args){return {async first(){const [id,day,limit]=args;const k=id+day;const value=usage.get(k)||0;if(value>=limit)return null;usage.set(k,value+1);return {requests:value+1}}}},async run(){}}}};
let response=await api.POST(req(valid,{'oai-authenticated-user-id':'test'}));assert.equal(response.status,200);assert.equal((await response.json()).reply,'Hello! Where are you flying today?');assert.equal(called,1);
usage.set('user:test'+new Date().toISOString().slice(0,10),40);response=await api.POST(req(valid,{'oai-authenticated-user-id':'test'}));assert.equal(response.status,429);assert.equal(called,1);
globalThis.fetch=async()=>new Response('',{status:401});response=await api.POST(req(valid,{'oai-authenticated-user-id':'other'}));assert.equal(response.status,502);
globalThis.fetch=realFetch;delete globalThis.__englishEnv;delete globalThis.__validateEnglishChat;
console.log('PASS: 24 scenarios, 51 word entries, 44 sounds; legacy preservation, review scheduling, input validation, AI auth/config/rate/error paths (mock provider only).');
