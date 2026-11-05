import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {readD2Progress, writeD2Progress, D2_STORAGE_KEY} from '../lib/foundation-d2.mjs';
import {recordFoundationAnswer} from '../lib/foundation-study.mjs';

const data = JSON.parse(readFileSync(new URL('../data/foundation-d3.json', import.meta.url)));
const draft = JSON.parse(readFileSync(new URL('../docs/staging/foundation-d3-review.json', import.meta.url)));
const key = 'somm100.foundation.d3-review.v1';

test('reviewed units retain source IDs and answer indices without editorial links', () => {
  assert.equal(data.units.length, 13);
  assert.equal(data.units.flatMap(unit => unit.checks).length, 72);
  assert.equal(data.units.flatMap(unit => unit.questions).length, 39);
  assert.doesNotMatch(JSON.stringify(data), /app\.notion\.com|sourceEditedAt|publicationReady/);
  for (const [i, unit] of data.units.entries()) {
    const source = draft.units[i];
    assert.equal(unit.id, source.id);
    assert.deepEqual(unit.checks.map(c => c.id), source.checks.map(c => c.id));
    assert.deepEqual(unit.questions.map(q => [q.id, q.answer]), source.questions.map(q => [q.id, q.answer]));
  }
});

test('D3 saves and restores independently of a pre-existing D2 record', () => {
  const records = new Map([[D2_STORAGE_KEY, 'untouched']]);
  const storage = {getItem: k => records.get(k) ?? null, setItem: (k, v) => records.set(k, v)};
  const unit = data.units[2];
  let {progress} = readD2Progress(storage, data, key);
  progress.unit = unit.number;
  progress.checks[unit.checks[0].id] = true;
  progress = recordFoundationAnswer(progress, unit.questions[0], (unit.questions[0].answer + 1) % 4);
  progress = recordFoundationAnswer(progress, unit.questions[0], unit.questions[0].answer);
  assert.equal(writeD2Progress(storage, progress, key), '');
  assert.deepEqual(readD2Progress(storage, data, key).progress, progress);
  assert.equal(records.get(D2_STORAGE_KEY), 'untouched');
  records.set(key, '{"version":9}');
  assert.equal(readD2Progress(storage, data, key).canSave, false);
});

test('existing five-unit progress survives a new-unit attempt and reload', () => {
  const previous = {units: data.units.slice(0, 5)};
  const records = new Map();
  const storage = {
    getItem: name => records.get(name) ?? null,
    setItem: (name, value) => records.set(name, value),
  };
  const tuscany = previous.units[4];
  const oldQuestion = tuscany.questions[0];
  let progress = readD2Progress(storage, previous, key).progress;
  progress.unit = tuscany.number;
  progress.checks[tuscany.checks[0].id] = true;
  progress = recordFoundationAnswer(progress, oldQuestion, (oldQuestion.answer + 1) % 4);
  progress = recordFoundationAnswer(progress, oldQuestion, oldQuestion.answer);
  assert.equal(writeD2Progress(storage, progress, key), '');
  const restored = readD2Progress(storage, data, key).progress;
  assert.deepEqual(restored, progress);

  const portugal = data.units[8];
  restored.unit = portugal.number;
  const updated = recordFoundationAnswer(restored, portugal.questions[0], portugal.questions[0].answer);
  assert.equal(writeD2Progress(storage, updated, key), '');
  assert.deepEqual(readD2Progress(storage, data, key).progress, updated);
  assert.deepEqual(updated.answers[oldQuestion.id], progress.answers[oldQuestion.id]);
});
