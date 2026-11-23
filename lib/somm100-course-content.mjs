import {COURSE_DAYS, COURSE_PUBLIC_SCHEMA, archiveMarkers, embeddedMedia, externalArticle, matchesDay, validatePublishedCourse}
  from '../cloudfunctions/somm100FoundationRead/contract.mjs';
export {COURSE_DAYS, COURSE_PUBLIC_SCHEMA, validatePublishedCourse};
export const COURSE_IMPORT_SCHEMA = 'SOMM100.private.student.breakdown.v1';

function checkRecord(record, shard) {
  const {id, title, day, source, body_markdown: body} = record ?? {};
  if (!matchesDay(id, day) || shard.day !== day) throw new Error('KP ID/day mismatch: ' + id);
  if (typeof title !== 'string' || !title.startsWith(id + '｜')) throw new Error('KP title/ID mismatch: ' + id);
  if (!/^https:\/\/app\.notion\.com\/p\/[0-9a-f]{32}$/i.test(source)) throw new Error('Notion source missing: ' + id);
  if (typeof body !== 'string' || body.trim().length < 100 || body.length > 12000) throw new Error('Invalid text: ' + id);
  if (embeddedMedia.test(body)) throw new Error('Embedded media or HTML: ' + id);
}

export function redactTeacherNotes(markdown) {
  const paragraphs = [];
  for (const part of markdown.replace(/\\\*/g, '*').split(/\n\s*\n/)) {
    const plain = part.replace(/\*\*/g, '').trim();
    if (/^(?:#{1,6}\s*)?(?:高阶资料归档|高阶教师档案|教师历史备课原稿|以下为旧研究|以下完整保留历史)/.test(plain)) break;
    if (/^(?:#{1,6}\s*)?(?:.*Knowledge Extension|教研边界|教师备课|教师参考|审核|教研状态|教研标识|教学状态|资源状态|教师旧稿隔离|仅内研|内部研发状态)/im.test(plain)) continue;
    paragraphs.push(plain.replace(/\[([^\]]+)\]\(https?:\/\/(?:[^()\s]|\([^()]*\))*\)/g, '$1'));
  }
  return paragraphs.join('\n\n').trim();
}

function cleared(record) {
  return (record.student_ready === true || record.public_ready === true) &&
    ['已审核', 'approved'].includes(record.teacher_review) && record.rights_cleared === true;
}

function approvedArticles(indexes) {
  const articles = new Map();
  for (const index of indexes) {
    if (index?.schema !== 'SOMM100.private.extension-candidate-index.v1' || !Array.isArray(index.records))
      throw new Error('Invalid Knowledge Extension index');
    for (const row of index.records) {
      if (row.student_publication_allowed !== true || row.rights_cleared !== true ||
          !['已审核','approved'].includes(row.teacher_status) || row.access_verified !== true ||
          !externalArticle(row.article_url) || !row.article_title?.trim()) continue;
      const links = articles.get(row.id) || [];
      if (!links.some(link => link.url === row.article_url)) links.push({title: row.article_title.trim(), url: row.article_url});
      articles.set(row.id, links);
    }
  }
  return articles;
}

export function compileSomm100Course(shards, {mode = 'production', extensionIndexes = []} = {}) {
  if (!Array.isArray(shards) || !shards.length) throw new Error('No SOMM100 import shards');
  if (!['production', 'private-preview'].includes(mode)) throw new Error('Invalid import mode');
  const articles = approvedArticles(extensionIndexes);
  const seen = new Map();
  const entries = [];
  let duplicates = 0;
  let withheld = 0;
  for (const shard of shards) {
    if (shard?.schema !== COURSE_IMPORT_SCHEMA || !Array.isArray(shard.records)) throw new Error('Invalid SOMM100 import shard');
    for (const row of shard.records) {
      checkRecord(row, shard);
      const {id, title, day, source, module, body_markdown: body} = row;
      // The first export used review: 待教师审核; later exports use teacher_review: pending.
      const fingerprint = JSON.stringify([title, day, source, module, body, cleared(row)]);
      if (seen.has(id)) {
        if (seen.get(id) !== fingerprint) throw new Error('Conflicting duplicate KP: ' + id);
        duplicates++;
        continue;
      }
      seen.set(id, fingerprint);
      if (mode === 'private-preview') {
        entries.push({id, title, day, module, source, text: body, review: row.teacher_review ?? row.review});
        continue;
      }
      const text = redactTeacherNotes(body);
      if (!cleared(row) || text.length < 100 || archiveMarkers.test(text) || /https?:\/\//i.test(text)) {
        withheld++;
        continue;
      }
      entries.push({id, title, day, module, text, extensions: articles.get(id) ?? []});
    }
  }
  entries.sort((a,b) => COURSE_DAYS.indexOf(a.day) - COURSE_DAYS.indexOf(b.day) || a.id.localeCompare(b.id, 'en'));
  const course = {
    schema: mode === 'production' ? COURSE_PUBLIC_SCHEMA : 'SOMM100.private.staging.v1',
    version: 1, audience: 'SOMM100-entry-level', approved: mode === 'production', entries,
    stats: {imported: entries.length, duplicates, withheld, extensions: entries.reduce((n,r) => n + (r.extensions?.length ?? 0), 0)},
  };
  if (mode === 'production' && entries.length && !validatePublishedCourse(course)) throw new Error('Invalid student release');
  return course;
}
