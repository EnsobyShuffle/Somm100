import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {FOUNDATION_BRIDGE_KEY,restoreFoundationBackup} from '../lib/foundation-backup.mjs';
import {readD2Progress,writeD2Progress} from '../lib/foundation-d2.mjs';
import {bridgeCalendar} from '../lib/foundation-bridge-calendar.mjs';

const json = name => JSON.parse(readFileSync(new URL(`../data/${name}.json`, import.meta.url)));
const {days} = json('foundation-bridge');

test('bridge follows V0.2 milestones and points only to available review or quiz content', () => {
  assert.deepEqual(days.map(day => day.number), Array.from({length: 21}, (_, i) => i + 1));
  assert.equal(new Set(days.map(day => day.id)).size, 21);
  assert.equal(days[9].targets[0].headingId, 'foundation-d1-quiz-title');
  assert.equal(days[14].targets[0].headingId, 'foundation-d2-quiz-title');
  assert.match(days[15].focus, /中期检测待开放/);
  const prefixes = ['d1','d2','d3','d4','france'];
  const units = new Map(prefixes.map(prefix => [`foundation-${prefix}`, json(`foundation-${prefix}`).units]));
  const quizHeadings = new Set(['foundation-d1-quiz-title','foundation-d2-quiz-title']);
  assert.deepEqual(days.filter(day => day.previews).map(day => day.number), [17,18,19,20]);
  for (const day of days) {
    if (day.previews) assert.equal(day.previews.length, 2);
    for (const target of [...day.targets, ...(day.previews || []).map(card => card.review)]) {
      if (target.headingId) assert(quizHeadings.has(target.headingId));
      else assert(units.get(target.prefix)?.some(unit => unit.id === target.unitId));
    }
  }
});

test('saved day 21 survives an old Foundation backup without a bridge record', () => {
  const records = new Map();
  const storage = {getItem: key => records.get(key) ?? null, setItem: (key, raw) => records.set(key, raw), removeItem: key => records.delete(key)};
  const data = {units: days.map(day => ({number: day.number, checks: [], questions: []}))};
  assert.equal(writeD2Progress(storage, {version:1,unit:21,checks:{},answers:{}}, FOUNDATION_BRIDGE_KEY), '');
  const old = {format:'somm100-foundation-backup',version:1,records:{'somm100.foundation.d1-review.v1':JSON.stringify({version:1,unit:2,checks:{},answers:{}})}};
  assert.equal(restoreFoundationBackup(storage, old, {replaceExisting:true}).written, 1);
  assert.equal(readD2Progress(storage, data, FOUNDATION_BRIDGE_KEY).progress.unit, 21);
});

test('cohort 22 bridge ranges exclude both class days in each city', () => {
  const {cities} = json('foundation-cohort22');
  assert.deepEqual(cities.map(({city, stages}) => [city, bridgeCalendar(stages[0].at(-1), stages[1][0])]), [
    ['北京', {days:12, ranges:[['2026-11-25','2026-11-30'],['2026-12-01','2026-12-06']]}],
    ['上海', {days:12, ranges:[['2026-11-28','2026-12-03'],['2026-12-04','2026-12-09']]}],
    ['成都', {days:12, ranges:[['2026-12-01','2026-12-06'],['2026-12-07','2026-12-12']]}],
    ['深圳', {days:12, ranges:[['2026-12-04','2026-12-09'],['2026-12-10','2026-12-15']]}],
    ['广州', {days:12, ranges:[['2026-12-06','2026-12-11'],['2026-12-12','2026-12-17']]}],
  ]);
  assert.deepEqual(bridgeCalendar('2026-12-30','2027-01-03'), {
    days:3, ranges:[['2026-12-31','2027-01-01'],['2027-01-02','2027-01-02']],
  });
  assert.equal(bridgeCalendar('2026-12-30','2026-12-31'), null);
});
