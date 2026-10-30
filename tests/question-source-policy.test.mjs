import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {loadTypeScript} from './load-typescript.mjs';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url)));
const data=read('data/curriculum.json'),owned=data.questions.filter(q=>q.track==='SOMM100');
const {quizLanguage,questionText}=await loadTypeScript('../lib/quiz-language.ts');
const {quizPool}=await loadTypeScript('../lib/quiz-study.ts');
assert.equal(owned.length,46);
assert.equal(new Set(owned.map(q=>q.id)).size,46);
for(const q of owned){assert.equal(q.sourceOwner,'Henritage');assert.equal(q.sourceRefs[0].setId,'891549861');assert(q.sourceContentHash&&q.sourceExtractedAt);assert(/[\u4e00-\u9fff]/.test(q.prompt));}
assert.equal(quizLanguage('SOMM100','all'),'zh');
assert.equal(quizLanguage('CMS','IC'),'bilingual');
for(const level of ['AS','MS']){
 assert.equal(quizLanguage('CMS',level),'en');
 for(const q of data.questions.filter(q=>q.difficulty===level)){const view=questionText(q);assert.equal(view.mode,'en');assert(!view.promptZh&&!view.answerZh&&!view.translationPending);assert(!/[\u4e00-\u9fff]/.test(view.prompt+view.answer));}
}
const cs=data.questions.find(q=>q.id==='QL-CS-cee9db1a7e380f13');
assert.equal(questionText(cs).prompt,cs.prompt);assert(questionText(cs).promptZh&&questionText(cs).answerZh);
const f={track:'SOMM100',level:'all',topic:'all',country:'all',region:'all',type:'all',filter:'all',source:'all'};
assert.equal(quizPool(data.questions,{},f).length,46);
assert.equal(quizPool(data.questions,{}, {...f,source:'891549861'}).length,46);
assert.equal(quizPool(data.questions,{}, {...f,track:'CMS',source:'891549861'}).length,0);
for(const name of ['italy-ms','italy-grapes','south-america-ms']){
 const html=readFileSync(new URL('../public/releases/'+name+'/index.html',import.meta.url),'utf8');
 for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
 if(name.startsWith('italy'))assert(html.includes('"ms_question_bank":[]'));
 if(name==='italy-grapes')assert(html.includes('function buildGrapeQuizBank(){return []}'));
 if(name==='south-america-ms')assert(/window.SOMM100_QUESTIONS\s*=\s*\[\]/.test(html));
}
console.log('PASS: Henritage source traceability, track isolation, bilingual display fields, English-only AS/MS, retired static banks and script syntax.');
