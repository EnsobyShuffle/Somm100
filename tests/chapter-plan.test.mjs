import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadTypeScript} from './load-typescript.mjs';
const {validateChapterPlan,chapterProgress,dueChapterPlans,chapterCalendar,chinaDateTime}=await loadTypeScript('../lib/chapter-plan.ts');
const {newTestState,applyTestAction,testView,testFetch}=await loadTypeScript('../lib/testing-store.ts');
const modules=JSON.parse(readFileSync(new URL('../data/cms-learning.json',import.meta.url))).modules;
const now=new Date('2026-10-26T12:00:00Z');
const empty={startDate:'',targetDate:'',reminderEnabled:false,remindAt:''};
assert.deepEqual(validateChapterPlan(empty),empty);
for(const day of ['2026-02-29','2026-02-31','2026-13-01','bad'])assert.throws(()=>validateChapterPlan({...empty,startDate:day}));
assert.doesNotThrow(()=>validateChapterPlan({...empty,startDate:'2028-02-29',targetDate:'2029-01-01'}));
assert.throws(()=>validateChapterPlan({...empty,startDate:'2027-05-01',targetDate:'2027-04-01'}));
assert.throws(()=>validateChapterPlan({...empty,reminderEnabled:true}));
assert.throws(()=>validateChapterPlan({...empty,remindAt:'2026-02-30T12:00:00.000Z'}));
assert.equal(chinaDateTime(new Date('2026-10-26T16:30:00Z')),'2026-10-27T00:30');
const nextDay={...empty,startDate:'2026-10-27',targetDate:'2026-10-27',reminderEnabled:true,remindAt:'2026-10-26T16:30:00.000Z'};
assert.doesNotThrow(()=>validateChapterPlan(nextDay));
assert.throws(()=>validateChapterPlan({...nextDay,targetDate:'2026-10-26',startDate:''}));

// Legacy saved records migrate without losing study data; each module has its own plan.
const state=newTestState();delete state.chapterPlans;state.readings=['M1-READ01'];
assert.deepEqual(testView(state,'/api/learning',now).chapterPlans,{});
const plan={...empty,startDate:'2026-10-01',targetDate:'2027-03-01',reminderEnabled:true,remindAt:'2026-10-26T11:00:00.000Z'};
applyTestAction(state,'/api/learning',{type:'chapter-plan',moduleId:'module01',plan},now);
applyTestAction(state,'/api/learning',{type:'chapter-plan',moduleId:'module02',plan:{...plan,remindAt:'2026-10-27T11:00:00.000Z'}},now);
assert.deepEqual(dueChapterPlans(modules,state,now).map(m=>m.id),['module01']);
const uid=state.chapterPlans.module01.calendarUid;
applyTestAction(state,'/api/learning',{type:'chapter-reminder-seen',moduleId:'module01'},now);
assert.equal(dueChapterPlans(modules,state,now).length,0);
applyTestAction(state,'/api/learning',{type:'chapter-plan',moduleId:'module01',plan},now);
assert.equal(dueChapterPlans(modules,state,now).length,0,'editing unchanged reminder must not repeat it');
applyTestAction(state,'/api/learning',{type:'chapter-plan',moduleId:'module01',plan:{...plan,remindAt:'2026-10-26T11:30:00.000Z'}},now);
assert.equal(dueChapterPlans(modules,state,now).length,1,'rescheduling rearms the reminder');
assert.equal(state.chapterPlans.module01.calendarUid,uid);
const before=JSON.stringify(state);
assert.throws(()=>applyTestAction(state,'/api/learning',{type:'chapter-plan',moduleId:'module01',plan:{...plan,targetDate:'2025-01-01'}},now));
assert.equal(JSON.stringify(state),before);
assert.throws(()=>applyTestAction(state,'/api/learning',{type:'chapter-plan',moduleId:'unknown',plan},now));

const event=chapterCalendar(modules[0],state.chapterPlans.module01,'https://somm100-learning.henritage.chatgpt.site/#cms-module?module=module01');
assert(event.includes('DTSTART:20261026T113000Z\r\n'));
assert(event.includes('UID:'+uid+'@somm100.local'));
assert(event.includes('BEGIN:VALARM'));
assert(event.includes('SEQUENCE:3'));
assert(event.split('\r\n').every(l=>new TextEncoder().encode(l).length<=75));
assert.throws(()=>chapterCalendar(modules[0],{...state.chapterPlans.module01,reminderEnabled:false},'https://example.com'));

// Progress includes only unique tasks from this module; Dismiss is not completion.
const m=modules[0];state.completed=[...m.lessonIds];state.checks=[...m.checklistIds];
state.readings=m.resources.core.sections.filter(s=>s.track).map(s=>s.id);
state.attempts=m.questionIds.map(question_id=>({question_id}));
assert.equal(chapterProgress(m,state).percent,100);
assert.equal(dueChapterPlans(modules,state,now).length,0,'completed chapters no longer prompt');
assert.equal(chapterProgress(modules[1],state).percent,0);
state.attempts.push(state.attempts[0]);assert.equal(chapterProgress(m,state).percent,100);
state.attempts=state.attempts.filter(a=>a.question_id!==m.questionIds.at(-1));state.dismissed=[m.questionIds.at(-1)];
assert(chapterProgress(m,state).percent<100);
const progress=chapterProgress(m,state);
applyTestAction(state,'/api/learning',{type:'chapter-plan',moduleId:'module01',plan:null},now);
assert(!state.chapterPlans.module01);assert(state.chapterPlans.module02);
assert.deepEqual(chapterProgress(m,state),progress);

// Persist, reload, disable; errors do not become successful UI saves.
const records=new Map();globalThis.localStorage={getItem:k=>records.get(k)||null,setItem:(k,v)=>records.set(k,v)};
const action={type:'chapter-plan',moduleId:'module01',plan};
assert((await testFetch('/api/learning',{method:'POST',body:JSON.stringify(action)})).ok);
let restored=await (await testFetch('/api/learning')).json();assert.equal(restored.chapterPlans.module01.targetDate,'2027-03-01');
await testFetch('/api/learning',{method:'POST',body:JSON.stringify({...action,plan:{...plan,reminderEnabled:false}})});
restored=await (await testFetch('/api/learning')).json();assert.equal(dueChapterPlans(modules,restored,now).length,0);
globalThis.localStorage.setItem=()=>{throw Error('quota')};assert(!(await testFetch('/api/learning',{method:'POST',body:JSON.stringify(action)})).ok);
console.log('PASS: chapter scheduling, optional dates, future years, date validation, timezone, legacy data, independent chapters, reminder acknowledgement/rescheduling, true progress, calendar export and storage failures.');
