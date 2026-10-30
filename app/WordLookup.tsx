'use client';
import React, { useEffect, useRef, useState } from 'react';
import { dictionary, type DictionaryEntry } from '../lib/dictionary';
import grapes from '../data/grape-index.json';
import cmsData from '../data/cms-learning.json';
import { findTerm, normalizeTerm, resolveTerm, searchTerms, termsInSelection } from '../lib/term-lookup';
import { buildCourseTranslationIndex, readingTranslation, type CourseTerm } from '../lib/cms-translation';
import './word-lookup.css';
import './dictionary.css';

const courseIndex = buildCourseTranslationIndex(cmsData.modules);
const courseTerms = courseIndex.terms.filter(term => !findTerm(dictionary, term.en));
const terms: (DictionaryEntry | CourseTerm)[] = [...dictionary, ...courseTerms];
type Mode = 'translation' | 'definition';
type Selected = { text: string; x: number; y: number; sectionId: string; paragraph: string };
export function WordLookup({showTrigger=true}:{showTrigger?:boolean}) {
 const [enabled, setEnabled] = useState(true), [selection, setSelection] = useState<Selected | null>(null);
 const [open, setOpen] = useState(false), [query, setQuery] = useState(''), [mode, setMode] = useState<Mode>('translation');
 const [language, setLanguage] = useState<'zh' | 'en'>('zh'), [context, setContext] = useState({ sectionId: '', paragraph: '' });
 const panel = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null), field = useRef<HTMLInputElement>(null);
 useEffect(() => { try { setEnabled(localStorage.getItem('somm100-selection-lookup') !== 'off'); } catch {} }, []);
 useEffect(() => {
  if (!enabled) { setSelection(null); return; }
  let timer: ReturnType<typeof setTimeout>;
  function read() {
   const selected = window.getSelection(), text = selected?.toString().trim() || '';
   const anchor = selected?.anchorNode?.parentElement, focus = selected?.focusNode?.parentElement;
   if (!selected?.rangeCount || !text || text.length > 3000 || !anchor?.closest('main') || !focus?.closest('main') || anchor.closest('input,textarea,[contenteditable=true],.word-lookup,.study-notes-panel') || focus.closest('input,textarea,[contenteditable=true],.word-lookup,.study-notes-panel')) { setSelection(null); return; }
   const rect = selected.getRangeAt(0).getBoundingClientRect();
   if (!rect.width && !rect.height) return;
   const paragraph = anchor.closest('p,li,td');
   setSelection({ text, x: Math.max(12, Math.min(rect.left, window.innerWidth - 292)), y: Math.max(8, Math.min(rect.bottom + 8, window.innerHeight - 122)), sectionId: anchor.closest('[data-cms-section]')?.getAttribute('data-cms-section') || '', paragraph: paragraph && paragraph.contains(focus) ? paragraph.textContent || '' : '' });
  }
  function changed() { clearTimeout(timer); timer = setTimeout(read, 140); }
  function clear() { setSelection(null); }
  document.addEventListener('selectionchange', changed); window.addEventListener('scroll', clear, true);
  return () => { clearTimeout(timer); document.removeEventListener('selectionchange', changed); window.removeEventListener('scroll', clear, true); };
 }, [enabled]);
 useEffect(() => { function close() { setOpen(false); setSelection(null); } window.addEventListener('hashchange', close); return () => window.removeEventListener('hashchange', close); }, []);
 useEffect(() => {
  function show(e: Event) { const text = (e as CustomEvent).detail?.query; if (typeof text !== 'string' || text.length > 3000) return; setQuery(text); setContext({ sectionId: '', paragraph: '' }); setMode('definition'); setOpen(true); setSelection(null); }
  window.addEventListener('somm100:dictionary', show); return () => window.removeEventListener('somm100:dictionary', show);
 }, []);
 useEffect(() => {
  if (!open) return;
  field.current?.focus();
  function key(e: KeyboardEvent) { if (e.key === 'Escape') { setOpen(false); trigger.current?.focus(); } }
  function outside(e: PointerEvent) { if (!panel.current?.contains(e.target as Node) && !trigger.current?.contains(e.target as Node) && !(e.target as Element)?.closest('.word-selection')) setOpen(false); }
  document.addEventListener('keydown', key); document.addEventListener('pointerdown', outside);
  return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
 }, [open]);
 const resolved = resolveTerm(terms, query), entry = resolved?.entry;
 const related = entry ? entry.relatedTerms.map(t => findTerm(terms, t)).filter((t): t is DictionaryEntry | CourseTerm => Boolean(t && t.id !== entry.id)).slice(0, 6) : [];
 const q = normalizeTerm(query), suggestions = !entry && q && q.length < 80 ? searchTerms(terms, query).slice(0, 6) : [];
 const matches = q ? grapes.filter(g => [g.name, g.id, ...g.aliases.map(a => a.name)].some(n => normalizeTerm(n) === q)) : [];
 const passage = readingTranslation(courseIndex.passages, query, context.sectionId, context.paragraph);
 const selectedTerms = !entry && q ? termsInSelection(terms, query) : [];
 const preview = selection ? resolveTerm(terms, selection.text) : undefined;
 function lookup(m: Mode) { if (selection) { setQuery(selection.text); setContext({ sectionId: selection.sectionId, paragraph: selection.paragraph }); } setMode(m); setOpen(true); setSelection(null); }
 function choose(text: string) { setQuery(text); setContext({ sectionId: '', paragraph: '' }); }
 function toggle(value: boolean) { setEnabled(value); try { localStorage.setItem('somm100-selection-lookup', value ? 'on' : 'off'); } catch {} }
 function quote() { if (!selection) return; window.dispatchEvent(new CustomEvent('somm100:note-quote', { detail: { text: selection.text } })); setSelection(null); }
 return <div className="word-lookup">
  {showTrigger&&<button ref={trigger} className="word-lookup-trigger" onClick={() => { if (selection) lookup('translation'); else setOpen(!open); }} aria-expanded={open} aria-controls="word-lookup-panel">Aa <span>划词释义</span></button>}
  {selection && !open && <div className="word-selection" role="group" aria-label="选中文字的操作" style={{ left: selection.x, top: selection.y }} onPointerDown={e => e.preventDefault()}>
   <div className="word-selection-preview">{preview ? <><strong>{preview.entry.zh}</strong><small>{preview.form ? `词形：${preview.entry.en}` : preview.entry.en}</small></> : <span>{selection.sectionId ? '查看词语释义与教材对照' : '查询中英词语释义'}</span>}</div>
   <div className="word-selection-actions"><button onClick={() => lookup('translation')}>翻译</button><button onClick={() => lookup('definition')}>解释</button>{selection.sectionId && <button onClick={quote}>记笔记</button>}</div>
  </div>}
  {open && <div id="word-lookup-panel" ref={panel} className="word-lookup-panel" role="dialog" aria-label="资料库翻译与解释">
   <header><strong>资料库 · 翻译与解释</strong><button aria-label="关闭释义" onClick={() => { setOpen(false); trigger.current?.focus(); }}>×</button></header>
   <label className="word-search-label" htmlFor="word-lookup-query">词语 / Term</label><input id="word-lookup-query" ref={field} value={query} onChange={e => choose(e.target.value)} placeholder="grapes / rootstocks / 酒泥" autoComplete="off" maxLength={3000}/>
   <div className="word-modes" role="group" aria-label="查询方式"><button aria-pressed={mode === 'translation'} onClick={() => setMode('translation')}>翻译</button><button aria-pressed={mode === 'definition'} onClick={() => setMode('definition')}>解释</button></div>
   <div className="word-result" aria-live="polite">
    {entry ? <>
     <p className="word-meta">{entry.category} · {'courseSource' in entry ? '课程译名 / 学习稿' : `已核对 ${entry.reviewedAt}`}</p>
     {resolved?.form && <p className="word-form-note">按词形匹配：{query} → {entry.en}</p>}
     <h3>{entry.en}</h3>{entry.ipa && <p className="word-ipa">{entry.ipa}</p>}<p className="word-translation">{entry.zh}</p>
     {mode === 'definition' && <>{!('courseSource' in entry) && <div className="word-definition-languages"><button aria-pressed={language === 'zh'} onClick={() => setLanguage('zh')}>中文</button><button aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>English</button></div>}<p lang={language === 'en' && !('courseSource' in entry) ? 'en' : 'zh-CN'}>{entry.definition['courseSource' in entry ? 'zh' : language]}</p>{entry.examples.map((example, i) => <div className="word-example" key={i}><p lang="en">{example.en}</p><p lang="zh-CN">{example.zh}</p></div>)}<section className="word-related-section">{related.length > 0 && <><h4>相关词汇</h4><div className="word-related" role="group" aria-label="相关词汇">{related.map(t => <button key={t.id} onClick={() => choose(t.en)}>{t.en} · {t.zh}</button>)}</div></>}</section></>}
     <div className="word-sources">{entry.sources.map(s => <a key={s.url} href={s.url} target={s.url.startsWith('#') ? undefined : '_blank'} rel="noreferrer">{s.title}</a>)}</div>
     {entry.entityType === 'Grape' && matches.map(g => <p key={g.id}><a href={'#grapes?id=' + g.id}>打开 {g.name} 品种档案</a></p>)}
    </> : matches.length ? <><p>葡萄品种 · Grape variety</p>{matches.map(g => <div key={g.id}><h3><a href={'#grapes?id=' + g.id}>{g.name}</a></h3><p>{mode === 'definition' ? g.summary : '品种名称保留原文；点击进入档案。'}</p></div>)}</> : query.trim() && !passage ? <><p>{suggestions.length ? '选择你想查的词条：' : '这个词或句子暂未收录完整译文。'}</p><div className="word-suggestions">{suggestions.map(t => <button key={t.id} onClick={() => choose(t.en)}>{t.en} · {t.zh}</button>)}</div><p className="word-empty-note">当前使用共享词库与 CMS 双语稿。任意新句子的实时翻译尚未接入；不会用拼接词义冒充整句翻译。</p></> : !query.trim() ? <p>选择正文中的词语，或在这里输入词语。</p> : null}
    {passage && <section className="word-course-translation"><h4>{passage.exact ? '教材原有中文对照' : '所在段落的中文对照'}</h4>{!passage.exact && <small>以下为整段对照，不是所选词句的独立译文。</small>}<p lang="zh-CN">{passage.passage.zh}</p><small>原学习稿，待逐段终审；法规与历史陈述请结合原页面勘误阅读。</small><a href={passage.passage.href}>回到课程原文</a></section>}
    {selectedTerms.length > 0 && <section className="word-selection-terms"><h4>所选内容中的词语</h4><small>术语释义，不代表整句翻译。</small>{selectedTerms.map(term => <button key={term.id} onClick={() => choose(term.en)}><span>{term.en}</span><strong>{term.zh}</strong></button>)}</section>}
   </div>
   <footer><label><input type="checkbox" checked={enabled} onChange={e => toggle(e.target.checked)}/>选中文字时显示翻译／解释</label><small>{dictionary.length} 个共享词条 · {courseTerms.length} 个课程补充译名 · {courseIndex.passages.length} 组教材对照</small><a className="word-library-link" href="#english?tab=library" onClick={() => setOpen(false)}>浏览 English Library</a></footer>
  </div>}
 </div>;
}
