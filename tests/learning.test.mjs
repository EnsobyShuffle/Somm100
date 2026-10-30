import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const data=JSON.parse(readFileSync(new URL('../data/curriculum.json',import.meta.url)));
const cms=JSON.parse(readFileSync(new URL('../data/cms-learning.json',import.meta.url)));
const {loadTypeScript}=await import('./load-typescript.mjs');
const {grade,scheduleReview}=await loadTypeScript('../lib/learning.ts');
// Grading contract fixture only; never deployed as course content.
const mcq={type:'mcq',options:['A','B','C','D'],correct:0};
assert.equal(grade(mcq,0).score,1);
assert.equal(grade(mcq,1).score,0);
for(const answer of [null,undefined,-1,4,'0'])assert.throws(()=>grade(mcq,answer));
const short=data.questions.find(q=>q.canSelfAssess);
assert.throws(()=>grade(short,'',2));assert.throws(()=>grade(short,'answer',undefined));
assert.deepEqual(grade(short,'My explanation',1),{score:1,maxScore:2,method:'self-assessed'});
const now=new Date('2026-10-24T00:00:00Z');
assert.deepEqual(scheduleReview(0,true,now),{streak:1,dueAt:'2026-10-25T00:00:00.000Z'});
assert.deepEqual(scheduleReview(1,true,now),{streak:2,dueAt:'2026-10-27T00:00:00.000Z'});
assert.deepEqual(scheduleReview(4,false,now),{streak:0,dueAt:'2026-10-25T00:00:00.000Z'});
assert.equal(new Set(data.questions.map(q=>q.id)).size,data.questions.length);
for(const q of data.questions){assert(q.sourceBatch?q.sourceRefs?.length:q.lessonId?data.lessons.some(l=>l.id===q.lessonId):q.knowledgeNode==='alsace'||cms.modules.some(m=>m.id===q.moduleId&&m.questionIds.includes(q.id)),q.id+' must link to a lesson, chapter question bank or sourced set');assert(q.sourceUrl);assert(q.answer||q.answerImages?.length||q.canSelfAssess===false);if(q.type==='mcq')assert(q.options[q.correct]);}
for(const l of data.lessons){for(const qid of l.related||[])assert(data.questions.some(q=>q.id===qid),l.id+' links to an existing question');assert(l.body.trim().length>0,l.id+' needs reading content');}
assert(data.checklist.length>=56);
assert.equal(new Set(data.checklist.map(k=>k.id)).size,data.checklist.length);
console.log('PASS: grading boundaries, self-assessment separation, spaced review, source IDs and lesson/question linkage.');

for(const level of ['SOMM100','CS','AS','MS'])assert(data.questions.some(q=>q.difficulty===level),'Each difficulty needs actual questions');
