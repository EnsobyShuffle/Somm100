export type NoteContext = {
  moduleId: string;
  moduleTitle: string;
  stage: number;
  resource: string;
  sectionId: string;
  title: string;
  href: string;
};
export type StudyNote = NoteContext & { body: string; updatedAt: string };
export const NOTE_LIMIT = 20000;
const PREFIX = 'somm100-study-note-v1:';
type Store = Pick<Storage, 'getItem' | 'setItem' | 'key' | 'length'>;

export function noteKey(context: NoteContext) {
  return PREFIX + [context.moduleId, context.stage, context.resource, context.sectionId || 'chapter'].map(encodeURIComponent).join(':');
}
function parseNote(raw: string): StudyNote {
  const note = JSON.parse(raw);
  if (!note || typeof note.body !== 'string' || typeof note.title !== 'string' || typeof note.moduleId !== 'string' || typeof note.href !== 'string' || !note.href.startsWith('#cms-module?') || typeof note.updatedAt !== 'string') throw Error('这条笔记暂时无法读取，原记录已保留。');
  return note;
}
export function readStudyNote(storage: Store, context: NoteContext) {
  const raw = storage.getItem(noteKey(context));
  return raw ? parseNote(raw) : null;
}
export function saveStudyNote(storage: Store, context: NoteContext, body: string, now = new Date()): StudyNote {
  if (body.length > NOTE_LIMIT) throw Error('每节笔记最多 20,000 字符。');
  // Read first: never silently replace an unreadable existing record.
  readStudyNote(storage, context);
  const note = { ...context, body, updatedAt: now.toISOString() };
  storage.setItem(noteKey(context), JSON.stringify(note));
  return note;
}
export function listStudyNotes(storage: Store, moduleId: string) {
  const notes: StudyNote[] = [];
  let unreadable = 0;
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!key?.startsWith(PREFIX + encodeURIComponent(moduleId) + ':')) continue;
    try { const note = parseNote(storage.getItem(key)!); if (note.body.trim()) notes.push(note); } catch { unreadable++; }
  }
  return { notes: notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), unreadable };
}
export function notesMarkdown(notes: StudyNote[]) {
  return '# SOMM100 · CMS 学习笔记\n\n' + notes.map(n => `## ${n.moduleTitle} · ${n.title}\n\nStage ${n.stage} · ${n.resource}\n\n${n.body}\n\n来源页面：${n.href}\n\n保存时间：${n.updatedAt}`).join('\n\n---\n\n');
}
