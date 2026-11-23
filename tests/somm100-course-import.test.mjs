import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COURSE_IMPORT_SCHEMA, compileSomm100Course,
  validatePublishedCourse, redactTeacherNotes,
} from '../lib/somm100-course-content.mjs';

const body = '葡萄酒从葡萄开始，学习时先认识葡萄的果皮、果肉和籽。\n\n'
  + '白葡萄酒通常先把果汁与果皮分开，红葡萄酒常让果皮与汁液接触一段时间。'
  + '餐厅可以用 Pinot Noir 与 Cabernet Sauvignon 比较颜色与口感。';
const record = {
  id: 'D1-01-KP01',
  title: 'D1-01-KP01｜葡萄的结构',
  day: 'D1',
  module: '葡萄与葡萄园',
  source: 'https://app.notion.com/p/41d17d16de4c810d85e7f0d58a430b3c',
  body_markdown: body,
  teacher_review: 'pending',
  public_ready: false,
};
const shard = rows => ({schema: COURSE_IMPORT_SCHEMA, day: 'D1', not_published: true, records: rows});

test('unreviewed Notion drafts never enter a production student package', () => {
  const result = compileSomm100Course([shard([record])]);
  assert.equal(result.entries.length, 0);
  assert.equal(result.stats.withheld, 1);
  assert.equal(validatePublishedCourse(result), false);
});

test('teacher preview can inspect entry-level source text without exposing it publicly', () => {
  const result = compileSomm100Course([shard([record])], {mode: 'private-preview'});
  assert.equal(result.entries.length, 1);
  assert.equal(result.approved, false);
  assert.equal(validatePublishedCourse(result), false);
});

test('only reviewed, rights-cleared content can enter a published student package', () => {
  const checked = {...record, teacher_review: '已审核', rights_cleared: true, public_ready: true};
  const result = compileSomm100Course([shard([checked])]);
  assert.equal(result.stats.imported, 1);
  assert.equal(result.entries[0].id, record.id);
  assert.equal(Object.hasOwn(result.entries[0], 'source'), false);
  assert.equal(validatePublishedCourse(result), true);
});

test('research archives are excluded even when incorrectly marked approved', () => {
  const checked = {...record, body_markdown: '高阶资料归档｜不纳入入门学员必修 ' + body,
    teacher_review: '已审核', rights_cleared: true, public_ready: true};
  const result = compileSomm100Course([shard([checked])]);
  assert.equal(result.entries.length, 0);
});

test('duplicate KP IDs abort instead of silently overwriting lessons', () => {
  assert.throws(() => compileSomm100Course([shard([record, record])],
    {mode: 'private-preview'}), /Duplicate KP/);
});

test('embedded HTML code cannot be imported', () => {
  assert.throws(() => compileSomm100Course([shard([{...record, body_markdown: body + '<script>alert(1)</script>'}])],
    {mode: 'private-preview'}), /HTML/);
});

test('teacher-only paragraphs are removed before display', () => {
  const clean = redactTeacherNotes(body + '\n\n教研边界：仅供教师查证，不进入学生端。');
  assert.ok(clean.includes('Pinot Noir'));
  assert.ok(!clean.includes('教研边界'));
});
