import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {D3_QUIZ_STORAGE_KEY, quizProgressData, quizResult} from '../lib/foundation-quiz.mjs';
import {readD2Progress,writeD2Progress} from '../lib/foundation-d2.mjs';
import {recordFoundationAnswer} from '../lib/foundation-study.mjs';
const json = p => JSON.parse(readFileSync(new URL(p,import.meta.url)));
const data = json('../data/foundation-d3-quiz.json');
const reviews = json('../data/foundation-d3.json');
const inventory = json('../docs/qa/foundation-d34-source-inventory-20261105.json').quizzes.find(q=>q.day===3);
const progressData = quizProgressData(data);

test('D3 standalone quiz preserves all 30 source IDs, answers and review mappings',()=>{
  assert.equal(data.questions.length,30);
  assert.equal(new Set(data.questions.map(q=>q.id)).size,30);
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

test('quiz round trip keeps question 30 and first/latest answers without changing review record',()=>{
  const reviewKey='somm100.foundation.d3-review.v1';
  const records=new Map([[reviewKey,'existing review']]);
  const storage={getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,v)};
  let {progress}=readD2Progress(storage,progressData,D3_QUIZ_STORAGE_KEY);
  const q=data.questions[29];
  progress.unit=30;
  progress=recordFoundationAnswer(progress,q,(q.answer+1)%4);
  progress=recordFoundationAnswer(progress,q,q.answer);
  assert.equal(writeD2Progress(storage,progress,D3_QUIZ_STORAGE_KEY),'');
  assert.deepEqual(readD2Progress(storage,progressData,D3_QUIZ_STORAGE_KEY).progress,progress);
  assert.equal(records.get(reviewKey),'existing review');
  assert.equal(progress.answers[q.id].first,(q.answer+1)%4);
  assert.equal(quizResult(data,progress).correct,1);
});

test('needs-review list changes after correction without counting unattempted questions',()=>{
  let {progress}=readD2Progress({getItem:()=>null},progressData,D3_QUIZ_STORAGE_KEY);
  assert.deepEqual(quizResult(data,progress),{total:30,answered:0,correct:0,needsReview:[]});
  const q=data.questions[9];
  progress=recordFoundationAnswer(progress,q,(q.answer+1)%4);
  assert.deepEqual(quizResult(data,progress),{total:30,answered:1,correct:0,needsReview:[10]});
  progress=recordFoundationAnswer(progress,q,q.answer);
  assert.deepEqual(quizResult(data,progress),{total:30,answered:1,correct:1,needsReview:[]});
});

test('corrupt/future quiz records stay intact and unknown ids cannot fabricate progress',()=>{
  for(const raw of ['{broken','{"version":5}']) {
    const result=readD2Progress({getItem:()=>raw},progressData,D3_QUIZ_STORAGE_KEY);
    assert.equal(result.canSave,false);
  }
  const raw=JSON.stringify({version:1,unit:99,checks:{fake:true},answers:{fake:{first:0,latest:0},[data.questions[0].id]:{first:9,latest:1}}});
  const {progress}=readD2Progress({getItem:()=>raw},progressData,D3_QUIZ_STORAGE_KEY);
  assert.equal(progress.unit,1);
  assert.deepEqual(progress.answers,{});
  assert.deepEqual(progress.checks,{});
});
