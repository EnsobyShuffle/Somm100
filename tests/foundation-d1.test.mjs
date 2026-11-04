import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {emptyD1Progress, normalizeD1Progress, d1UnitResult, readD1Progress, writeD1Progress, D1_STORAGE_KEY} from '../lib/foundation-d1.mjs';
import {recordFoundationAnswer, FOUNDATION_STORAGE_KEY} from '../lib/foundation-study.mjs';
const data = JSON.parse(readFileSync(new URL('../data/foundation-d1.json', import.meta.url)));

test('D1 contains ten independent lessons with source checklists and three questions each', () => {
  assert.equal(data.units.length, 10);
  assert.equal(data.units.flatMap(u => u.checks).length, 71);
  const ids = [];
  for (const u of data.units) {
    ids.push(u.id, ...u.checks.map(c => c.id), ...u.questions.map(q => q.id));
    assert.equal(u.sections.length, 3);
    assert.equal(u.questions.length, 3);
    for (const q of u.questions) {
      assert.equal(q.options.length, 4);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
      assert.ok(q.explanation.length > 0);
    }
  }
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(!JSON.stringify(data).includes('app.notion.com'));
});

test('lesson ten restores correctly and cannot be confused with eight-week progress', () => {
  const value = {...emptyD1Progress(), unit: 10};
  assert.equal(normalizeD1Progress(value, data).unit, 10);
  assert.equal(normalizeD1Progress({...value, unit: 11}, data).unit, 1);
  assert.notEqual(D1_STORAGE_KEY, FOUNDATION_STORAGE_KEY);
});

test('a lesson requires both self-checks and correct attempts to show reviewed', () => {
  const u = data.units[0];
  let p = emptyD1Progress();
  for (const q of u.questions) p = recordFoundationAnswer(p, q, q.answer);
  assert.equal(d1UnitResult(u, p).reviewed, false);
  p.checks = Object.fromEntries(u.checks.map(c => [c.id, true]));
  assert.equal(d1UnitResult(u, p).reviewed, true);
  p = recordFoundationAnswer(p, u.questions[0], (u.questions[0].answer + 1) % 4);
  assert.equal(d1UnitResult(u, p).reviewed, false);
  assert.equal(p.answers[u.questions[0].id].first, u.questions[0].answer);
});

test('save/restore round trip only writes the dedicated D1 key', () => {
  const records = new Map([[FOUNDATION_STORAGE_KEY, 'old pre-course records']]);
  const storage = {getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value)};
  let p = {...emptyD1Progress(), unit: 10};
  p = recordFoundationAnswer(p, data.units[9].questions[0], 0);
  p = recordFoundationAnswer(p, data.units[9].questions[0], 2);
  assert.equal(writeD1Progress(storage, p), '');
  assert.deepEqual(readD1Progress(storage, data).progress, p);
  assert.equal(records.get(FOUNDATION_STORAGE_KEY), 'old pre-course records');
});

test('malformed or future records disable writes and are left intact', () => {
  for (const raw of ['bad json', '{"version":2}']) {
    const storage = {getItem: () => raw, setItem: () => assert.fail('must not write while reading')};
    const result = readD1Progress(storage, data);
    assert.equal(result.canSave, false);
    assert.ok(result.error);
  }
  const denied = {getItem() {throw Error('blocked');}, setItem() {throw Error('quota');}};
  assert.equal(readD1Progress(denied, data).canSave, false);
  assert.ok(writeD1Progress(denied, emptyD1Progress()));
});

test('unknown ids and invalid answers do not count as lesson progress', () => {
  const p = normalizeD1Progress({version: 1, unit: 1, checks: {unknown: true}, answers: {
    [data.units[0].questions[0].id]: {first: 0, latest: 9}, unknown: {first: 0, latest: 0}
  }}, data);
  assert.deepEqual(p, emptyD1Progress());
});
