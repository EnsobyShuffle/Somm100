import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const draft=JSON.parse(readFileSync(new URL('../docs/staging/foundation-d3-review.json',import.meta.url),'utf8'));
const inventory=JSON.parse(readFileSync(new URL('../docs/qa/foundation-d34-source-inventory-20261105.json',import.meta.url),'utf8'));
test('draft cannot be mistaken for published or confirmed cohort content',()=>{
assert.equal(draft.status,'editorial-draft-not-imported');
for(const key of ['currentCohortDayConfirmed','studentUiIntegrated','publicationReady'])assert.equal(draft[key],false);
});
test('all thirteen D3 units map to the verified source inventory',()=>{
assert.equal(draft.units.length,13);
draft.units.forEach((u,i)=>{assert.equal(u.number,i+1);const source=inventory.units.find(x=>x.id===u.id);assert.ok(source);assert.equal(u.source,source.source);assert.equal(u.checks.length,source.checkCount);assert.equal(u.questions.length,source.questionCount);});
});
test('unit, check and question IDs are unique and independently namespaced',()=>{
const ids=draft.units.flatMap(u=>[u.id,...u.checks.map(c=>c.id),...u.questions.map(q=>q.id)]);
assert.equal(new Set(ids).size,ids.length);assert.ok(ids.every(id=>id.startsWith('foundation-d3-')));
assert.equal(draft.units.reduce((n,u)=>n+u.checks.length,0),72);
assert.equal(draft.units.reduce((n,u)=>n+u.questions.length,0),39);
});
test('all questions have four distinct options and a valid source answer',()=>{
for(const u of draft.units)for(const q of u.questions){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);assert.ok(q.explanation.includes(q.options[q.answer]));assert.ok(q.prompt.length>5);}
});
test('original digests have goals, preparation and text without private source HTML',()=>{
for(const u of draft.units){assert.ok(u.learningObjective);assert.ok(u.preparation);assert.equal(u.sections.length,2);for(const s of u.sections){assert.ok(s.heading);assert.ok(s.text.length>30);assert.doesNotMatch(s.text,/<[^>]*>|https?:\/\//);}}
});
