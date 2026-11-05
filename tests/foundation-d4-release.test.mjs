import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {readD2Progress, writeD2Progress, d2UnitResult} from '../lib/foundation-d2.mjs';
import {recordFoundationAnswer} from '../lib/foundation-study.mjs';

const data = JSON.parse(readFileSync(new URL('../data/foundation-d4.json', import.meta.url)));
const draft = JSON.parse(readFileSync(new URL('../docs/staging/foundation-d4-review.json', import.meta.url)));
const key = 'somm100.foundation.d4-review.v1';

test('sparkling release preserves source IDs and answers and excludes private provenance', () => {
  assert.equal(data.units.length, 4);
  assert.equal(data.units.flatMap(u => u.checks).length, 23);
  assert.equal(data.units.flatMap(u => u.questions).length, 12);
  assert.doesNotMatch(JSON.stringify(data), /app\.notion\.com|sourceEditedAt|publicationReady/);
  for (const [i, unit] of data.units.entries()) {
    assert.equal(unit.id, draft.units[i].id);
    assert.deepEqual(unit.checks.map(c => c.id), draft.units[i].checks.map(c => c.id));
    assert.deepEqual(unit.questions.map(q => [q.id,q.answer]), draft.units[i].questions.map(q => [q.id,q.answer]));
    assert(unit.learningObjective && unit.preparation && unit.practice);
    for (const q of unit.questions) assert.equal(new Set(q.options).size, 4);
  }
});

test('D4 round trip preserves first and latest answers without touching any existing course key', () => {
  const oldKeys = ['study','d1-review','d2-review','france-review','d3-review'].map(n => `somm100.foundation.${n}.v1`);
  const records = new Map(oldKeys.map(k => [k, 'existing record']));
  const storage = {getItem: k => records.get(k) ?? null, setItem: (k,v) => records.set(k,v)};
  const unit = data.units[3];
  let {progress} = readD2Progress(storage, data, key);
  progress.unit = unit.number;
  for (const c of unit.checks) progress.checks[c.id] = true;
  assert.equal(d2UnitResult(unit, progress).reviewed, false);
  for (const q of unit.questions) {
    progress = recordFoundationAnswer(progress, q, (q.answer + 1) % 4);
    progress = recordFoundationAnswer(progress, q, q.answer);
  }
  assert.equal(d2UnitResult(unit, progress).reviewed, true);
  assert.equal(writeD2Progress(storage, progress, key), '');
  assert.deepEqual(readD2Progress(storage, data, key).progress, progress);
  oldKeys.forEach(k => assert.equal(records.get(k), 'existing record'));
  assert.equal(progress.answers[unit.questions[0].id].first, (unit.questions[0].answer + 1) % 4);
});

test('D4 future or malformed records remain protected and storage failure is visible', () => {
  for (const raw of ['{broken', '{"version":9}']) {
    const storage = {getItem: () => raw, setItem: () => assert.fail('must not overwrite')};
    assert.equal(readD2Progress(storage, data, key).canSave, false);
    assert.equal(storage.getItem(key), raw);
  }
  const {progress} = readD2Progress(null, data, key);
  assert(writeD2Progress({setItem() {throw Error('quota');}}, progress, key));
});
