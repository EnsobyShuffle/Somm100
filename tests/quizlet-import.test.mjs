import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadTypeScript} from './load-typescript.mjs';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url)));
const data=read('data/curriculum.json'),report=read('data/quizlet-import-20261028.json'),catalog=read('data/quizlet-sources.json');
const byId=new Map(data.questions.map(q=>[q.id,q]));
const imported=data.questions.filter(q=>q.sourceBatch==='quizlet-20261028');
const stable=v=>Array.isArray(v)?'['+v.map(stable).join(', ')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+': '+stable(v[k])).join(', ')+'}':JSON.stringify(v);
assert.equal(byId.size,data.questions.length);
assert.equal(imported.length,9192);assert.equal(data.questions.length,9238);
assert.equal(Object.keys(report.originalQuestionHashes).length,282);
for(const id of Object.keys(report.originalQuestionHashes))assert(!byId.has(id),id+' must be retired from the active bank');
const policy=read('data/question-source-policy.json');
for(const q of imported)assert.equal(createHash('sha256').update(stable(q)).digest('hex'),policy.cmsOriginalHashes[q.id],q.id+' original import must remain unchanged');
assert.equal(new Set(report.sourceMappings.map(r=>r.entryId)).size,9192);
assert(report.sourceMappings.every(r=>byId.has(r.questionId)));
const sourceIds=new Set(catalog.sources.map(s=>s.set_id));
assert.equal(catalog.sources.find(s=>s.set_id==='249811021').creator,'davishrlw');
assert.equal(sourceIds.size,21);assert.equal(imported.reduce((n,q)=>n+q.sourceRefs.length,0),16456);
const images=new Set();
for(const q of imported){
 assert.equal(q.type,'short');assert.equal(q.track,'CMS');assert(q.sourceRefs.every(s=>sourceIds.has(s.setId)&&Number.isInteger(s.index)&&s.index>0));
 for(const image of [...q.promptImages,...q.answerImages]){assert(existsSync(new URL('../public'+image.src,import.meta.url)));images.add(image.src);}
 if(q.canSelfAssess)assert(q.answer.trim()||q.answerImages.length);
 else assert(q.contentNotes.length&&q.reviewStatus==='source-incomplete');
}
assert.equal(images.size,41);
const {quizPool}=await loadTypeScript('../lib/quiz-study.ts');
const {newTestState,applyTestAction}=await loadTypeScript('../lib/testing-store.ts');
const state=newTestState(),f={track:'CMS',level:'all',topic:'all',country:'all',region:'all',type:'all',filter:'all',source:'quizlet',quality:'all'};
assert.equal(quizPool(data.questions,state,f).length,9192);
for(const [level,count] of [['IC',4814],['AS',1772],['MS',2606]])assert.equal(quizPool(data.questions,state,{...f,level}).length,count);
assert.equal(quizPool(data.questions,state,{...f,source:'course'}).length,0);
assert.equal(quizPool(data.questions,state,{...f,quality:'needs-review'}).length,36);
assert.equal(quizPool(data.questions,state,{...f,quality:'ready'}).length,9156);
for(const source of catalog.sources){const expected=imported.filter(q=>q.sourceRefs.some(r=>r.setId===source.set_id)).length;assert.equal(quizPool(data.questions,state,{...f,source:source.set_id}).length,expected);}
const known=imported.find(q=>q.importEntryId==='CS-00001');
assert(quizPool(data.questions,state,{...f,keyword:'five first growths'}).some(q=>q.id===known.id));
// New activity must preserve existing device records and refer to the exact imported ID.
state.attempts.push({id:'legacy',question_id:'Q01',answer:'Legacy answer',score:2,max_score:2,method:'self-assessed',created_at:'2026-10-28T00:00:00Z'});
state.bookmarks.push('Q01');
assert.throws(()=>applyTestAction(state,'/api/learning',{type:'answer',questionId:'Q01',answer:'Retired',rating:2}));
applyTestAction(state,'/api/learning',{type:'answer',questionId:known.id,answer:'Recalled',rating:2,requestId:'imported'});
applyTestAction(state,'/api/learning',{type:'bookmark',questionId:known.id,active:true});
assert(state.attempts.some(a=>a.question_id==='Q01'));assert(state.bookmarks.includes('Q01'));
assert(state.reviews.some(r=>r.question_id===known.id&&r.last_score===1));
applyTestAction(state,'/api/learning',{type:'dismiss',questionId:known.id,active:true});
assert(!quizPool(data.questions,state,f).some(q=>q.id===known.id));
assert(quizPool(data.questions,state,{...f,filter:'dismissed'}).some(q=>q.id===known.id));
applyTestAction(state,'/api/learning',{type:'dismiss',questionId:known.id,active:false});
assert(quizPool(data.questions,state,f).some(q=>q.id===known.id));
const missing=imported.find(q=>!q.canSelfAssess),before=state.attempts.length;
assert.throws(()=>applyTestAction(state,'/api/learning',{type:'answer',questionId:missing.id,answer:'Recalled',rating:2}));
assert.equal(state.attempts.length,before);
const imageOnly=imported.find(q=>!q.answer&&q.answerImages.length&&q.canSelfAssess);
applyTestAction(state,'/api/learning',{type:'answer',questionId:imageOnly.id,answer:'Identified image',rating:2,requestId:'image'});
assert(state.reviews.some(r=>r.question_id===imageOnly.id));
console.log('PASS: 282 retired generated questions, 46 Henritage originals, 9,192 imported entries, 16,456 source mappings, 41 images, all levels/sets, 36 flagged entries, and compatible learning records.');
