'use client';
import { useEffect, useRef, useState } from 'react';
import { NotebookPen, Download, X } from 'lucide-react';
import { listStudyNotes, NOTE_LIMIT, noteKey, notesMarkdown, readStudyNote, saveStudyNote, type NoteContext, type StudyNote } from '../lib/study-notes';
import './study-notes.css';

export function StudyNotes({ context }: { context: NoteContext }) {
  const [open, setOpen] = useState(false), [active, setActive] = useState(context);
  const [body, setBody] = useState(''), [notes, setNotes] = useState<StudyNote[]>([]);
  const [savedAt, setSavedAt] = useState(''), [error, setError] = useState(''), [notice, setNotice] = useState('');
  const field = useRef<HTMLTextAreaElement>(null), trigger = useRef<HTMLButtonElement>(null);
  const current = useRef({ context, body: '', unsaved: false });
  const contextKey = noteKey(context);

  function refresh(moduleId: string) {
    const result = listStudyNotes(localStorage, moduleId);
    setNotes(result.notes);
    setNotice(result.unreadable ? `${result.unreadable} 条旧记录暂时无法读取，原记录保留。` : '');
  }
  function load(target: NoteContext) {
    if (current.current.unsaved) { setError('当前内容尚未保存，请先重试保存或导出当前笔记。'); return false; }
    try {
      const note = readStudyNote(localStorage, target);
      setActive(target); setBody(note?.body || ''); setSavedAt(note?.updatedAt || ''); setError('');
      current.current = { context: target, body: note?.body || '', unsaved: false };
      refresh(target.moduleId); return true;
    } catch { setError('无法读取本机笔记，原记录已保留。请检查浏览器存储权限。'); return false; }
  }
  function persist(value: string) {
    setBody(value);
    current.current.body = value;
    current.current.unsaved = true;
    try {
      const note = saveStudyNote(localStorage, current.current.context, value);
      current.current.unsaved = false; setSavedAt(note.updatedAt); setError(''); refresh(note.moduleId);
    } catch { setError('尚未保存：请检查浏览器存储空间，或先导出当前笔记备份。'); }
  }
  function show() { if (load(context)) setOpen(true); else setOpen(true); }
  function close() {
    if (current.current.unsaved) { setError('尚有未保存内容，请先保存或导出；当前内容仍保留在编辑框中。'); return; }
    setOpen(false); trigger.current?.focus();
  }
  function download(all = false) {
    const note = { ...current.current.context, body: current.current.body, updatedAt: savedAt || new Date().toISOString() };
    const data = all ? [note, ...notes.filter(n => noteKey(n) !== noteKey(note))].filter(n => n.body.trim()) : [note];
    const url = URL.createObjectURL(new Blob([notesMarkdown(data)], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `SOMM100-${active.moduleId}-${all ? 'notes' : 'note'}.md`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  useEffect(() => { load(context); }, [contextKey]);
  useEffect(() => {
    function quote(event: Event) {
      const text = (event as CustomEvent).detail?.text;
      if (typeof text !== 'string' || !text.trim() || text.length > 3000) return;
      if (!load(context)) { setOpen(true); return; }
      const value = [current.current.body, `> ${text.trim().replace(/\n/g, '\n> ')}`].filter(Boolean).join('\n\n') + '\n\n';
      if (value.length > NOTE_LIMIT) { setError('笔记已达到长度上限，请先导出备份。'); setOpen(true); return; }
      persist(value); setOpen(true);
    }
    window.addEventListener('somm100:note-quote', quote);
    return () => window.removeEventListener('somm100:note-quote', quote);
  }, [contextKey]);
  useEffect(() => {
    function leaving(event: BeforeUnloadEvent) { if (current.current.unsaved) { event.preventDefault(); event.returnValue = ''; } }
    window.addEventListener('beforeunload', leaving);
    return () => window.removeEventListener('beforeunload', leaving);
  }, []);
  useEffect(() => { if (open) field.current?.focus(); }, [open]);

  return <div className="study-notes-entry">
    <button ref={trigger} className="button secondary" aria-expanded={open} aria-controls="cms-study-notes" onClick={show}><NotebookPen size={17}/>学习笔记{notes.length > 0 && <span>· {notes.length}</span>}</button>
    <small>按小节记录 · 自动保存</small>
    {open && <aside id="cms-study-notes" className="study-notes-panel" aria-label="CMS 学习笔记" onKeyDown={e => { if (e.key === 'Escape') close(); }}>
      <header><div><span className="eyebrow">MY NOTES</span><h2>学习笔记</h2></div><button className="icon-button" aria-label="收起学习笔记" onClick={close}><X size={20}/></button></header>
      <p className="study-note-context">{active.moduleTitle}<br/><strong>{active.title}</strong></p>
      {noteKey(active) !== contextKey && <button className="text-button" onClick={() => load(context)}>返回当前小节笔记</button>}
      <label htmlFor="cms-note-body">我的理解、疑问与补充</label>
      <textarea ref={field} id="cms-note-body" value={body} maxLength={NOTE_LIMIT} onChange={e => persist(e.target.value)} placeholder="在这里记下重点、整理自己的理解。也可以选中正文，点击「记笔记」保存摘录。"/>
      <div className="study-note-status"><span role="status">{error ? '尚未保存' : savedAt ? '已自动保存到本机' : '开始输入即可自动保存'}</span><small>{body.length.toLocaleString()} / 20,000</small></div>
      {error && <p className="study-note-error" role="alert">{error}</p>}
      <div className="button-row"><button className="button" onClick={() => persist(body)}>保存笔记</button><button className="text-button" disabled={!body.trim()} onClick={() => download()}><Download size={14}/>导出当前笔记</button></div>
      <details className="study-note-list"><summary>本章笔记 · {notes.length}</summary>{notes.map(note => <div key={noteKey(note)}><button onClick={() => load(note)} aria-pressed={noteKey(note) === noteKey(active)}>{note.title}<small>Stage {note.stage} · {note.resource}</small></button><a href={note.href}>回到原文</a></div>)}{!notes.length && <p>保存后可在这里回看本章笔记。</p>}{notes.length > 0 && <button className="text-button" onClick={() => download(true)}>导出本章全部笔记</button>}</details>
      {notice && <p role="status">{notice}</p>}
      <footer>免登录测试：笔记仅保存在当前浏览器。换设备前请导出备份。</footer>
    </aside>}
  </div>;
}
