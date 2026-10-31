'use client';
import React, {useEffect, useRef, useState} from 'react';
import './word-lookup.css';
import './external-ask.css';

const services = [
 {name:'DeepSeek', href:'https://chat.deepseek.com/'},
 {name:'ChatGPT', href:'https://chatgpt.com/'},
 {name:'豆包', href:'https://www.doubao.com/chat/'},
];
type Selection = {text:string; x:number; y:number; canQuote:boolean};
export function WordLookup({showTrigger=true}:{showTrigger?:boolean}) {
 const [enabled,setEnabled]=useState(true), [selection,setSelection]=useState<Selection|null>(null);
 const [open,setOpen]=useState(false), [query,setQuery]=useState(''), [notice,setNotice]=useState('');
 const panel=useRef<HTMLDivElement>(null), field=useRef<HTMLTextAreaElement>(null);
 const prompt=query.trim() ? `请用中文解释下面这段葡萄酒学习内容，保留关键术语原文；如有不确定的事实，请明确说明并提供可核查来源。\n\n${query.trim()}` : '';
 useEffect(()=>{try{setEnabled(localStorage.getItem('somm100-selection-lookup')!=='off')}catch{}},[]);
 useEffect(()=>{
  if(!enabled){setSelection(null);return;}
  let timer:ReturnType<typeof setTimeout>;
  const read=()=>{
   const s=window.getSelection(), text=s?.toString().trim()||'';
   const a=s?.anchorNode?.parentElement, f=s?.focusNode?.parentElement;
   const excluded='input,textarea,[contenteditable=true],.word-lookup,.study-notes-panel';
   if(!s?.rangeCount||!text||text.length>3000||!a?.closest('main')||!f?.closest('main')||a.closest(excluded)||f.closest(excluded)){setSelection(null);return;}
   const rect=s.getRangeAt(0).getBoundingClientRect();
   if(!rect.width&&!rect.height)return;
   setSelection({text,x:Math.max(12,Math.min(rect.left,innerWidth-292)),y:Math.max(8,Math.min(rect.bottom+8,innerHeight-165)),canQuote:!!a.closest('[data-cms-section]')});
  };
  const changed=()=>{clearTimeout(timer);timer=setTimeout(read,140)};
  const clear=()=>setSelection(null);
  document.addEventListener('selectionchange',changed);window.addEventListener('scroll',clear,true);
  return()=>{clearTimeout(timer);document.removeEventListener('selectionchange',changed);window.removeEventListener('scroll',clear,true)};
 },[enabled]);
 useEffect(()=>{
  const close=()=>{setOpen(false);setSelection(null)};
  const show=(e:Event)=>{const text=(e as CustomEvent).detail?.query;if(typeof text!=='string'||text.length>3000)return;setQuery(text);setNotice('');setOpen(true);setSelection(null)};
  window.addEventListener('hashchange',close);window.addEventListener('somm100:dictionary',show);
  return()=>{window.removeEventListener('hashchange',close);window.removeEventListener('somm100:dictionary',show)};
 },[]);
 useEffect(()=>{
  if(!open)return;
  field.current?.focus();
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};
  const outside=(e:PointerEvent)=>{if(!(e.target instanceof Element)||e.target.closest('.word-selection,.word-lookup-trigger'))return;if(!panel.current?.contains(e.target))setOpen(false)};
  document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);
  return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside)};
 },[open]);
 async function copy(text=prompt){
  try{await navigator.clipboard.writeText(text);setNotice('问题已复制，请在打开的网站粘贴并发送。')}
  catch{setNotice('未能自动复制，请选择下方问题手动复制。')}
 }
 function ask(text:string){
  const value=`请用中文解释下面这段葡萄酒学习内容，保留关键术语原文；如有不确定的事实，请明确说明并提供可核查来源。\n\n${text.trim()}`;
  setQuery(text);setOpen(true);setSelection(null);void copy(value);
 }
 return <div className="word-lookup external-ask">
  {showTrigger&&<button className="word-lookup-trigger" aria-expanded={open} onClick={()=>setOpen(!open)}>问 AI</button>}
  {selection&&!open&&<div className="word-selection" role="group" aria-label="选中文字的操作" style={{left:selection.x,top:selection.y}} onPointerDown={e=>e.preventDefault()}>
   <div className="word-selection-preview">{selection.text.slice(0,65)}{selection.text.length>65?'…':''}</div>
   <div className="word-selection-actions">{services.map(s=><a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" onClick={()=>ask(selection.text)}>问 {s.name}</a>)}</div>
   {selection.canQuote&&<button onClick={()=>{window.dispatchEvent(new CustomEvent('somm100:note-quote',{detail:{text:selection.text}}));setSelection(null)}}>记笔记</button>}
  </div>}
  {open&&<div ref={panel} className="word-lookup-panel" role="dialog" aria-label="向 AI 提问">
   <header><strong>问 DeepSeek / ChatGPT / 豆包</strong><button aria-label="关闭提问" onClick={()=>setOpen(false)}>×</button></header>
   <label className="word-search-label" htmlFor="external-ask-text">所选内容</label>
   <textarea id="external-ask-text" ref={field} value={query} maxLength={3000} rows={4} onChange={e=>{setQuery(e.target.value);setNotice('')}}/>
   <p>点击入口会复制问题并打开对应网站，再粘贴发送。大陆用户可优先使用 DeepSeek 或豆包。</p>
   <div className="external-ask-links">{services.map(s=><a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" onClick={()=>{if(prompt)void copy()}}>问 {s.name} ↗</a>)}</div>
   {prompt&&<><label className="word-search-label" htmlFor="external-ask-prompt">待发送问题</label><textarea id="external-ask-prompt" readOnly rows={5} value={prompt} onFocus={e=>e.target.select()}/><button className="chip" onClick={()=>void copy()}>复制问题</button></>}
   <p role="status">{notice}</p>
   <footer><label><input type="checkbox" checked={enabled} onChange={e=>{setEnabled(e.target.checked);try{localStorage.setItem('somm100-selection-lookup',e.target.checked?'on':'off')}catch{}}}/>选中文字时显示提问入口</label></footer>
  </div>}
 </div>;
}
