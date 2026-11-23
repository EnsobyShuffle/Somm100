export const COURSE_PUBLIC_SCHEMA = 'SOMM100.student.course.v1';
export const COURSE_DAYS = Object.freeze(['D1', 'D2', 'D1-D2法国共用', 'D3', 'D4']);
const idPattern = /^(D[1-4]|F)-\d{2}-KP\d{2}$/;
export const archiveMarkers = /高阶资料归档|高阶教师档案|不纳入入门学员必修|研究论文全文|教师历史备课原稿/;
export const embeddedMedia = /<(?:script|style|iframe|img|object|embed|svg)\b|!\[[^\]]*\]\(/i;

export function matchesDay(id, day) {
  const prefix = typeof id === 'string' && id.match(idPattern)?.[1];
  return Boolean(prefix) && (prefix === 'F' ? 'D1-D2法国共用' : prefix) === day;
}

export function externalArticle(url) {
  try {
    const target = new URL(url);
    return target.protocol === 'https:' && !target.username && !target.password &&
      !/(^|\.)(notion\.com|notion\.so|notion\.site)$/.test(target.hostname) &&
      !target.searchParams.has('X-Amz-Signature');
  } catch {
    return false;
  }
}

export function validatePublishedCourse(data) {
  if (data?.schema !== COURSE_PUBLIC_SCHEMA || data.audience !== 'SOMM100-entry-level' ||
      data.approved !== true || !Array.isArray(data.entries) || !data.entries.length) return false;
  const ids = new Set();
  for (const row of data.entries) {
    if (!row || !matchesDay(row.id, row.day) || ids.has(row.id) ||
        typeof row.title !== 'string' || !row.title.trim() || typeof row.module !== 'string' ||
        typeof row.text !== 'string' || row.text.length < 100 || embeddedMedia.test(row.text) ||
        archiveMarkers.test(row.text) || /https?:\/\/|notion-file-block:/i.test(row.text) ||
        Object.keys(row).some(key => !['id','title','day','module','text','extensions'].includes(key))) return false;
    if (row.extensions !== undefined && (!Array.isArray(row.extensions) || row.extensions.some(link =>
      typeof link?.title !== 'string' || !link.title.trim() || !externalArticle(link.url) ||
      Object.keys(link).some(key => !['title','url'].includes(key))))) return false;
    ids.add(row.id);
  }
  return true;
}
