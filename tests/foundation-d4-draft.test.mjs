import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const draft = JSON.parse(readFileSync(new URL('../docs/staging/foundation-d4-review.json', import.meta.url)));
const inventory = JSON.parse(readFileSync(new URL('../docs/qa/foundation-d34-source-inventory-20261105.json', import.meta.url)));
// Answer letters in the order recorded by each course source, 2026-11-05.
const keys = {
  "foundation-d4-01": "BCD",
  "foundation-d4-02": "BCD",
  "foundation-d4-03": "BCD",
  "foundation-d4-04": "BCD",
  "foundation-d4-05": "BCD",
  "foundation-d4-06": "BCD",
  "foundation-d4-07": "BCD",
  "foundation-d4-08": "BCD",
  "foundation-d4-09": "BCD",
  "foundation-d4-10": "BCD",
  "foundation-d4-11": "BCD",
  "foundation-d4-12": "BCD",
  "foundation-d4-13": "BCD",
  "foundation-d4-14": "BCD",
  "foundation-d4-15": "BAC"
};

test('D4 editorial units track all 15 source pages and checklists', () => {
  const sources = inventory.units.filter(unit => unit.sourceDay === 4);
  assert.equal(draft.units.length, 15);
  assert.deepEqual(draft.units.map(u => u.id), sources.map(u => u.id));
  for (const [i, unit] of draft.units.entries()) {
    assert.equal(unit.checks.length, sources[i].checkCount);
    assert.equal(unit.sourceEditedAt, sources[i].sourceEditedAt);
    assert.equal(unit.source, sources[i].source);
    assert.ok(unit.preparation && unit.learningObjective && unit.sections.length === 2);
  }
  assert.equal(draft.units.flatMap(u => u.checks).length, 93);
  assert.equal(draft.currentCohortDayConfirmed, false);
  assert.equal(draft.studentUiIntegrated, false);
  assert.equal(draft.publicationReady, false);
});

test('45 unique unit questions preserve their source order and answer letters', () => {
  const ids = new Set();
  for (const unit of draft.units) {
    assert.equal(unit.questions.length, 3);
    assert.equal(unit.questions.map(q => 'ABCD'[q.answer]).join(''), keys[unit.id]);
    unit.questions.forEach((q, i) => {
      assert.equal(q.id, unit.id + '-q' + (i + 1));
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.ok(q.explanation.includes(q.options[q.answer]));
      ids.add(q.id);
    });
  }
  assert.equal(ids.size, 45);
});
