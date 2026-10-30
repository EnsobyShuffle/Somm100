import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadTypeScript} from './load-typescript.mjs';
const {ROUND_SIZES,buildQuizRound}=await loadTypeScript('../lib/quiz-round.ts');
const {applyQuizFormats}=await loadTypeScript('../lib/quiz-formats.ts');
const {grade}=await loadTypeScript('../lib/learning.ts');
const data=JSON.parse(readFileSync(new URL('../data/curriculum.json',import.meta.url)));
const originals=data.questions.filter(q=>q.track==='SOMM100'),before=JSON.stringify(originals),questions=applyQuizFormats(originals);
assert.deepEqual(ROUND_SIZES,[10,20,30,50,100]);
assert.equal(questions.filter(q=>q.type==='mcq').length,32);assert.equal(questions.filter(q=>q.type==='short').length,14);
assert.equal(JSON.stringify(originals),before);
for(let i=0;i<questions.length;i++){
 const q=questions[i],old=originals[i];assert.equal(q.id,old.id);assert.equal(q.prompt,old.prompt);assert.equal(q.answer,old.answer);assert.equal(q.sourceContentHash,old.sourceContentHash);
 if(q.type==='mcq'){assert.equal(q.options[q.correct],old.answer);assert.equal(new Set(q.options).size,4);assert.equal(grade(q,q.correct).score,1);assert.equal(grade(q,(q.correct+1)%4).score,0)}
}
for(const size of [10,20,30]){const r=buildQuizRound(questions,size,true);assert.equal(r.actual,size);assert.equal(r.mcq,size*.7);assert.equal(r.short,size*.3);assert.equal(new Set(r.ids).size,size);assert.equal(r.limited,false)}
for(const size of [50,100]){const r=buildQuizRound(questions,size,true);assert.equal(r.actual,46);assert.equal(r.mcq,32);assert.equal(r.short,14);assert.equal(new Set(r.ids).size,46);assert.equal(r.limited,true)}
assert.equal(buildQuizRound([...questions,...questions],100,true).actual,46);
const onlyChoices=questions.filter(q=>q.type==='mcq');const r=buildQuizRound(onlyChoices,20,true);assert.equal(r.actual,20);assert.equal(r.short,0);assert.equal(new Set(r.ids).size,20);
assert.deepEqual(buildQuizRound([],100,true).ids,[]);
const old=originals[0];assert.equal(applyQuizFormats([{...old,answer:'Changed source'}])[0].type,'short');
const cms=data.questions.find(q=>q.track==='CMS');assert.deepEqual(applyQuizFormats([cms])[0],cms);
console.log('PASS: 7:3 rounds, 50/100 caps, no repeated IDs, filtered pools, 32 choice presentations, shared grading and immutable originals.');
