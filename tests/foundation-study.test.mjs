import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {emptyFoundationProgress, normalizeFoundationProgress, recordFoundationAnswer, foundationWeekResult, foundationOptions} from '../lib/foundation-study.mjs';
const data = JSON.parse(readFileSync(new URL('../data/foundation-study.json', import.meta.url), 'utf8'));

test('source curriculum has eight weeks, thirty checks and thirty-one uniquely mapped questions', () => {
  assert.equal(data.weeks.length, 8);
  assert.equal(data.weeks.flatMap(w => w.checks).length, 30);
  assert.equal(data.questions.length, 31);
  const ids = [...data.weeks, ...data.weeks.flatMap(w => w.checks), ...data.questions].map(x => x.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(data.weeks.map(w => data.questions.filter(q => q.week === w.number).length), [3, 3, 3, 3, 3, 6, 4, 6]);
  for (const q of data.questions) {
    assert.equal(q.options.length, 4);
    assert.ok(q.answer >= 0 && q.answer < 4);
  }
});

test('retry keeps first answer, latest answer, other answers and unrelated check state', () => {
  const [q, other] = data.questions;
  let p = {...emptyFoundationProgress(), checks: {'foundation-w1-check-1': true}};
  p = recordFoundationAnswer(p, other, 0);
  p = recordFoundationAnswer(p, q, 0);
  const before = p;
  p = recordFoundationAnswer(p, q, q.answer);
  assert.deepEqual(p.answers[q.id], {first: 0, latest: q.answer});
  assert.deepEqual(p.answers[other.id], {first: 0, latest: 0});
  assert.equal(p.checks['foundation-w1-check-1'], true);
  assert.equal(before.answers[q.id].latest, 0);
  assert.equal(recordFoundationAnswer(p, q, -1), p);
  assert.equal(recordFoundationAnswer(p, q, 99), p);
});

test('unanswered and partially answered weeks cannot be marked ready', () => {
  const week = data.weeks[0], questions = data.questions.filter(q => q.week === 1);
  let p = emptyFoundationProgress();
  assert.equal(foundationWeekResult(week, data, p).ready, false);
  p = recordFoundationAnswer(p, questions[0], questions[0].answer);
  assert.equal(foundationWeekResult(week, data, p).ready, false);
  for (const q of questions) p = recordFoundationAnswer(p, q, q.answer);
  assert.equal(foundationWeekResult(week, data, p).ready, true);
  p = recordFoundationAnswer(p, questions[0], (questions[0].answer + 1) % 4);
  assert.deepEqual(foundationWeekResult(week, data, p), {total: 3, answered: 3, review: 1, ready: false});
});

test('JSON round trip preserves valid first/final answers across four/eight week pace changes', () => {
  let p = recordFoundationAnswer(emptyFoundationProgress(), data.questions[0], 0);
  p = recordFoundationAnswer(p, data.questions[0], 1);
  p = {...p, pace: 4, period: 4, checks: {'foundation-w8-check-5': true}};
  assert.deepEqual(normalizeFoundationProgress(JSON.parse(JSON.stringify(p)), data), p);
  p = {...p, pace: 8, period: 7};
  assert.deepEqual(normalizeFoundationProgress(p, data), p);
});

test('corrupt entries cannot fabricate progress or an invalid active week', () => {
  const bad = {version: 1, pace: 4, period: 8, checks: {'foundation-w1-check-1': 'true', unrelated: true}, answers: {
    [data.questions[0].id]: {first: -1, latest: 1},
    [data.questions[1].id]: {first: 0, latest: '2'},
    unknown: {first: 1, latest: 1}
  }};
  assert.deepEqual(normalizeFoundationProgress(bad, data), {...emptyFoundationProgress(), pace: 4});
  for (const value of [null, [], {version: 2}]) assert.deepEqual(normalizeFoundationProgress(value, data), emptyFoundationProgress());
});

test('option display order is stable and never changes answer identity', () => {
  for (const q of data.questions) {
    const order = foundationOptions(q);
    assert.deepEqual([...order].sort(), [0, 1, 2, 3]);
    assert.deepEqual(foundationOptions(q), order);
    assert.equal(q.options[order[order.indexOf(q.answer)]], q.options[q.answer]);
  }
  assert.ok(new Set(data.questions.map(q => foundationOptions(q).indexOf(q.answer))).size >= 3);
});
