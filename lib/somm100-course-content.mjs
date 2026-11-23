// Private SOMM100 course import contract.
// This module never fetches Notion credentials or mixes CMS study content into the
// six-day beginner sommelier syllabus.
export const COURSE_IMPORT_SCHEMA = 'SOMM100.private.student.breakdown.v1';
export const COURSE_PUBLIC_SCHEMA = 'SOMM100.student.course.v1';
export const COURSE_DAYS = Object.freeze(['D1', 'D2', 'D1-D2法国共用', 'D3', 'D4']);

const archiveMarkers = /高阶资料归档|高阶教师档案|不纳入入门学员必修|研究论文全文|教师历史备课原稿/;
const htmlMarkup = /<(?:script|style|iframe|img|object|embed|svg)\b/i;
const privateMarkers = /(?:^|\n)\s*(?:教师备课|教研边界|历史教研|教师参考|仅内研|内部研发状态)\s*[:：]/;

function checkRecord(record, shard) {
  if (!record || typeof record !== 'object') throw new Error('Malformed KP record');
  const {id, title, day, source, body_markdown: body} = record;
  if (typeof id !== 'string' || !/^(?:D[1-4]|F)-\d{2}-KP\d{2}$/.test(id)) {
    throw new Error('Invalid SOMM100 KP ID: ' + String(id));
  }
  if (typeof title !== 'string' || !title.includes(id)) throw new Error('KP title/ID mismatch: ' + id);
  if (!COURSE_DAYS.includes(day) || (shard.day && shard.day !== day)) throw new Error('Day mismatch: ' + id);
  if (typeof source !== 'string' || !/^https:\/\/app\.notion\.com\/p\/[0-9a-f]{32}(?:\?.*)?$/i.test(source)) {
    throw new Error('Notion source missing: ' + id);
  }
  if (typeof body !== 'string' || body.trim().length < 100 || body.length > 12000) {
    throw new Error('Invalid student text length: ' + id);
  }
  if (htmlMarkup.test(body)) throw new Error('Executable/embedded HTML is not permitted: ' + id);
  return record;
}

export function redactTeacherNotes(markdown) {
  // The source author intentionally retains advanced research on the original
  // Notion page. Only the *student-first* section may enter the course build.
  const paragraphs = markdown.split(/\n\s*\n/);
  return paragraphs.filter(part => !privateMarkers.test(part) &&
    !/^\s*(?:\*\*)?(?:教研边界|Knowledge Extension[｜:：].*待审|审核／发布边界)/i.test(part))
    .join('\n\n')
    .trim();
}

function isCleared(record) {
  return record.public_ready === true &&
    ['已审核', 'approved'].includes(record.teacher_review) &&
    record.rights_cleared === true;
}

/**
 * Parse course files previously exported privately from the sole SOMM100
 * Knowledge Points database. Draft mode is for local QA only.
 *
 * Production output is strictly allowlisted: an unchecked row is NEVER copied
 * into public assets, even if it has a "student first" heading in Notion.
 */
export function compileSomm100Course(shards, {mode = 'production'} = {}) {
  if (!Array.isArray(shards) || !shards.length) throw new Error('No SOMM100 import shards');
  if (!['production', 'private-preview'].includes(mode)) throw new Error('Invalid import mode');

  const seen = new Set();
  const entries = [];
  const withheld = [];
  for (const shard of shards) {
    if (shard?.schema !== COURSE_IMPORT_SCHEMA || !Array.isArray(shard.records)) {
      throw new Error('Unsupported or incomplete SOMM100 import shard');
    }
    for (const raw of shard.records) {
      const record = checkRecord(raw, shard);
      if (seen.has(record.id)) throw new Error('Duplicate KP: ' + record.id);
      seen.add(record.id);
      if (archiveMarkers.test(record.body_markdown) ||
          (mode === 'production' && !isCleared(record))) {
        withheld.push(record.id);
        continue;
      }
      const text = redactTeacherNotes(record.body_markdown);
      if (text.length < 100 || archiveMarkers.test(text)) {
        withheld.push(record.id);
        continue;
      }
      entries.push({
        id: record.id,
        title: record.title,
        day: record.day,
        module: String(record.module || ''),
        text,
        // Retain provenance in the import manifest, but don't leak private
        // Notion URLs into the student-facing JSON.
      });
    }
  }

  const order = Object.fromEntries(COURSE_DAYS.map((day, index) => [day, index]));
  entries.sort((a, b) => order[a.day] - order[b.day] ||
    a.id.localeCompare(b.id, 'en'));
  return {
    schema: COURSE_PUBLIC_SCHEMA,
    version: 1,
    audience: 'SOMM100-entry-level',
    // Only production mode can be served to students.
    approved: mode === 'production',
    entries,
    stats: {imported: entries.length, withheld: withheld.length},
  };
}

export function validatePublishedCourse(data) {
  if (!data || data.schema !== COURSE_PUBLIC_SCHEMA ||
      data.approved !== true || !Array.isArray(data.entries)) return false;
  const ids = new Set();
  for (const entry of data.entries) {
    if (!entry || typeof entry.id !== 'string' || ids.has(entry.id) ||
        !COURSE_DAYS.includes(entry.day) || typeof entry.text !== 'string' ||
        entry.text.length < 100 || archiveMarkers.test(entry.text) ||
        htmlMarkup.test(entry.text)) return false;
    ids.add(entry.id);
  }
  return data.entries.length > 0;
}
