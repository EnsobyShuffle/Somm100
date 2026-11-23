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

test('conflicting duplicate KP IDs abort instead of silently overwriting lessons', () => {
  assert.throws(() => compileSomm100Course([shard([record, {...record, body_markdown:body + "修订"}])],
    {mode: 'private-preview'}), /duplicate KP/i);
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

test('matching source and body across shards count once; approval conflicts abort', () => {
  const second = {...record, teacher_review:undefined, review:'待教师审核'};
  const data = compileSomm100Course([shard([record]),shard([second])],{mode:'private-preview'});
  assert.equal(data.stats.duplicates,1);
  assert.equal(data.entries.length,1);
  assert.equal(data.entries[0].source,record.source);
  const approved = {...record,teacher_review:'approved',student_ready:true,rights_cleared:true};
  assert.throws(()=>compileSomm100Course([shard([record,approved])]),/duplicate KP/);
});

test('student release strips private source links and stops before an archived section', () => {
  const cleared = {...record,student_ready:true,teacher_review:'approved',rights_cleared:true,
    body_markdown:body+'\n\n参照 [另一节](https://app.notion.com/p/example)。\n\n### 高阶资料归档\n\n旧稿内容'};
  const output = compileSomm100Course([shard([cleared])]);
  assert.equal(output.entries.length,1);
  assert.doesNotMatch(output.entries[0].text,/旧稿|https:|归档/);
  assert.equal(validatePublishedCourse({...output,entries:[{...output.entries[0],source:record.source}]}),false);
});

test('extension candidates are joined only after review, access and rights verification', () => {
  const checked = {...record,student_ready:true,teacher_review:'approved',rights_cleared:true};
  const article = {id:record.id,article_title:'品种术语',article_url:'https://example.com/article',
    student_publication_allowed:true,rights_cleared:true,teacher_status:'已审核',access_verified:true};
  const index = {schema:'SOMM100.private.extension-candidate-index.v1',records:[
    article, {...article, article_url:record.source}, {...article,article_url:'https://example.com/other',access_verified:false}]};
  const output = compileSomm100Course([shard([checked])],{extensionIndexes:[index]});
  assert.deepEqual(output.entries[0].extensions,[{title:article.article_title,url:article.article_url}]);
});

import {readCourse} from '../cloudfunctions/somm100FoundationRead/read-course.mjs';
import {createHash} from 'node:crypto';

test('only an enrolled, non-anonymous CloudBase identity can read the pinned release', async () => {
  const checked = {...record,student_ready:true,teacher_review:'approved',rights_cleared:true};
  const bytes = Buffer.from(JSON.stringify(compileSomm100Course([shard([checked])])));
  const digest = data => createHash('sha256').update(data).digest('hex');
  const config = {SOMM100_FOUNDATION_UIDS:'registered-test-user',
    SOMM100_FOUNDATION_RELEASE_FILE:'cloud://test/private/release',SOMM100_FOUNDATION_RELEASE_SHA256:digest(bytes)};
  const member = {uid:'registered-test-user',isAnonymous:false};
  const noRead = () => assert.fail('Unentitled request accessed private storage');
  assert.deepEqual(await readCourse(null,config,noRead),{status:401});
  assert.deepEqual(await readCourse({...member,isAnonymous:true},config,noRead),{status:401});
  assert.deepEqual(await readCourse({uid:'other',isAnonymous:false},config,noRead),{status:403});
  assert.deepEqual(await readCourse(member,{...config,SOMM100_FOUNDATION_UIDS:''},noRead),{status:403});
  assert.equal((await readCourse(member,config,()=>bytes)).course.entries.length,1);
  assert.deepEqual(await readCourse(member,config,()=>Buffer.from('{}')),{status:503});
  const preview = Buffer.from(JSON.stringify(compileSomm100Course([shard([record])],{mode:'private-preview'})));
  assert.deepEqual(await readCourse(member,{...config,SOMM100_FOUNDATION_RELEASE_SHA256:digest(preview)},()=>preview),{status:503});
});
