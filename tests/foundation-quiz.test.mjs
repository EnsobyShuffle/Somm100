import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {D1_QUIZ_STORAGE_KEY, D3_QUIZ_STORAGE_KEY, D4_QUIZ_STORAGE_KEY, mappedReviewUnit, quizProgressData, quizResult} from '../lib/foundation-quiz.mjs';
import {readD1Progress,writeD1Progress} from '../lib/foundation-d1.mjs';
import {readD2Progress,writeD2Progress} from '../lib/foundation-d2.mjs';
import {recordFoundationAnswer} from '../lib/foundation-study.mjs';
const json = p => JSON.parse(readFileSync(new URL(p,import.meta.url)));
for (const [day,count,storageKey] of [[1,25,D1_QUIZ_STORAGE_KEY],[3,30,D3_QUIZ_STORAGE_KEY],[4,45,D4_QUIZ_STORAGE_KEY]]) {
const data = json(`../data/foundation-d${day}-quiz.json`);
const reviews = json(`../data/foundation-d${day}.json`);
const inventory = day===1 ? json('../docs/qa/foundation-d1-quiz-source-20261105.json') : json('../docs/qa/foundation-d34-source-inventory-20261105.json').quizzes.find(q=>q.day===day);
const progressData = quizProgressData(data);

test(`D${day} standalone quiz preserves all ${count} source IDs, answers and review mappings`,()=>{
  assert.equal(data.questions.length,count);
  assert.equal(new Set(data.questions.map(q=>q.id)).size,count);
  assert.doesNotMatch(JSON.stringify(data),/app\.notion\.com|sourceEditedAt/);
  data.questions.forEach((q,i)=>{
    assert.equal(q.id,inventory.mapping[i].id);
    assert.equal(q.answer,inventory.mapping[i].sourceAnswer.charCodeAt(0)-65);
    assert.deepEqual(q.unitIds,inventory.mapping[i].unitIds);
    assert.equal(new Set(q.options).size,4);
    assert(q.explanation);
    q.unitIds.forEach(id=>assert(reviews.units.some(u=>u.id===id)));
  });
});

test(`D${day} quiz round trip restores final question and first/latest answers without changing review record`,()=>{
  const reviewKey=`somm100.foundation.d${day}-review.v1`;
  const records=new Map([[reviewKey,'existing review']]);
  const storage={getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,v)};
  let {progress}=readD2Progress(storage,progressData,storageKey);
  const q=data.questions[count-1];
  progress.unit=count;
  progress=recordFoundationAnswer(progress,q,(q.answer+1)%4);
  progress=recordFoundationAnswer(progress,q,q.answer);
  assert.equal(writeD2Progress(storage,progress,storageKey),'');
  assert.deepEqual(readD2Progress(storage,progressData,storageKey).progress,progress);
  assert.equal(records.get(reviewKey),'existing review');
  assert.equal(progress.answers[q.id].first,(q.answer+1)%4);
  assert.equal(quizResult(data,progress).correct,1);
});

test(`D${day} review list changes after correction without counting unattempted questions`,()=>{
  let {progress}=readD2Progress({getItem:()=>null},progressData,storageKey);
  assert.deepEqual(quizResult(data,progress),{total:count,answered:0,correct:0,needsReview:[]});
  const q=data.questions[9];
  progress=recordFoundationAnswer(progress,q,(q.answer+1)%4);
  assert.deepEqual(quizResult(data,progress),{total:count,answered:1,correct:0,needsReview:[10]});
  progress=recordFoundationAnswer(progress,q,q.answer);
  assert.deepEqual(quizResult(data,progress),{total:count,answered:1,correct:1,needsReview:[]});
});

test(`D${day} corrupt/future quiz records stay intact and unknown ids cannot fabricate progress`,()=>{
  for(const raw of ['{broken','{"version":5}']) {
    const result=readD2Progress({getItem:()=>raw},progressData,storageKey);
    assert.equal(result.canSave,false);
  }
  const raw=JSON.stringify({version:1,unit:99,checks:{fake:true},answers:{fake:{first:0,latest:0},[data.questions[0].id]:{first:9,latest:1}}});
  const {progress}=readD2Progress({getItem:()=>raw},progressData,storageKey);
  assert.equal(progress.unit,1);
  assert.deepEqual(progress.answers,{});
  assert.deepEqual(progress.checks,{});
});

}

test("D1, D3 and D4 standalone quizzes save and reload independently",()=>{
  const records=new Map();
  const storage={getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,v)};
  for (const [day,key] of [[1,D1_QUIZ_STORAGE_KEY],[3,D3_QUIZ_STORAGE_KEY],[4,D4_QUIZ_STORAGE_KEY]]) {
    const data=json(`../data/foundation-d${day}-quiz.json`);
    let {progress}=readD2Progress(storage,quizProgressData(data),key);
    progress.unit=data.questions.length;
    progress=recordFoundationAnswer(progress,data.questions.at(-1),data.questions.at(-1).answer);
    assert.equal(writeD2Progress(storage,progress,key),'');
  }
  assert.equal(records.size,3);
  for (const [day,key] of [[1,D1_QUIZ_STORAGE_KEY],[3,D3_QUIZ_STORAGE_KEY],[4,D4_QUIZ_STORAGE_KEY]]) {
    const data=json(`../data/foundation-d${day}-quiz.json`);
    const {progress}=readD2Progress(storage,quizProgressData(data),key);
    assert.equal(progress.unit,data.questions.length);
    assert.equal(quizResult(data,progress).correct,1);
    assert.deepEqual(Object.keys(progress.answers),[data.questions.at(-1).id]);
  }
});


test('D1 review navigation accepts only its own known unit and retains restored lesson records',()=>{
  const data=json('../data/foundation-d1.json');
  assert.equal(mappedReviewUnit(data,'foundation-d1',null),null);
  assert.equal(mappedReviewUnit(data,'foundation-d1',{prefix:'foundation-d3',unitId:'foundation-d1-10'}),null);
  assert.equal(mappedReviewUnit(data,'foundation-d1',{prefix:'foundation-d1',unitId:'fake'}),null);
  const unit=mappedReviewUnit(data,'foundation-d1',{prefix:'foundation-d1',unitId:'foundation-d1-10'});
  assert.equal(unit.number,10);
  const prior={version:1,unit:1,checks:{[data.units[0].checks[0].id]:true},answers:{[data.units[0].questions[0].id]:{first:0,latest:1}}};
  let raw=JSON.stringify(prior);
  const storage={getItem:()=>raw,setItem:(_,v)=>{raw=v}};
  const restored=readD1Progress(storage,data).progress;
  const next={...restored,unit:unit.number};
  assert.equal(writeD1Progress(storage,next),'');
  const again=readD1Progress(storage,data).progress;
  assert.equal(again.unit,10);
  assert.deepEqual(again.answers,prior.answers);
  assert.deepEqual(again.checks,prior.checks);
});
