'use client';
import React,{useState} from 'react';
import {dictionary,openDictionary} from '../lib/dictionary';
import {searchTerms,normalizeTerm} from '../lib/term-lookup';
import './dictionary.css';
const categories=['全部','餐饮服务','酱汁','食材','烹饪','风味与口感','菜名','生活英语','职业表达','葡萄酒','葡萄栽培','酿造','产区与分级'];
const cuisines=['全部菜系',...new Set(dictionary.map(t=>t.cuisine).filter((c):c is string=>Boolean(c)))];
export function DictionaryLibrary(){
 const [query,setQuery]=useState(''),[category,setCategory]=useState('全部'),[cuisine,setCuisine]=useState('全部菜系'),[limit,setLimit]=useState(40);
 const candidates=query.trim()&&[...categories,...cuisines].includes(query.trim())?dictionary.filter(t=>normalizeTerm(t.category)===normalizeTerm(query)||normalizeTerm(t.cuisine||'')===normalizeTerm(query)):searchTerms(dictionary,query);
 const filtered=candidates.filter(t=>(category==='全部'||t.category===category)&&(cuisine==='全部菜系'||t.cuisine===cuisine));
 const shown=filtered.slice(0,limit);
 return <section className="dictionary-library" aria-label="English Library 专业词库">
  <div className="en-section-title"><div><span className="eyebrow">ENGLISH LIBRARY</span><h2>读懂一个词，也学会怎样用。</h2><p>葡萄酒、食物与餐厅服务。查释义、看例句，再了解它的出处。</p></div><span>{dictionary.length} 个词条</span></div>
  <label className="dictionary-search">搜索英文、中文或别名<input type="search" value={query} maxLength={100} onChange={e=>{setQuery(e.target.value);setLimit(40)}} placeholder="béarnaise / 酱汁 / managed to"/></label>
  <div className="dictionary-filters" role="group" aria-label="词库分类">{categories.filter(c=>c==='全部'||dictionary.some(t=>t.category===c)).map(c=><button key={c} className={'chip '+(category===c?'selected':'')} aria-pressed={category===c} onClick={()=>{setCategory(c);setCuisine('全部菜系');setLimit(40)}}>{c}</button>)}</div>
  {category==='菜名'&&<label className="dictionary-cuisine">选择菜系<select value={cuisine} onChange={e=>{setCuisine(e.target.value);setLimit(40)}}>{cuisines.map(c=><option key={c}>{c}</option>)}</select></label>}
  <p className="dictionary-count" role="status">找到 {filtered.length} 个词条 · 点击查看完整释义</p>
  <div className="dictionary-grid">{shown.map(t=><button className="dictionary-card" key={t.id} onClick={()=>openDictionary(t.en)}><span className="eyebrow">{t.category}{t.cuisine?' · '+t.cuisine:''}</span><h3 lang="en">{t.en}</h3><span className="dictionary-zh">{t.zh}</span><p>{t.definition.zh}</p><span className="dictionary-open">查看解释{t.examples.length?'与例句':''} →</span></button>)}</div>
  {!filtered.length&&<div className="dictionary-empty"><p>暂未找到这个词，可以试试原形、完整短语或中文。</p><button className="chip" onClick={()=>{setQuery('');setCategory('全部');setCuisine('全部菜系');setLimit(40)}}>查看全部词条</button></div>}
  {filtered.length>shown.length&&<button className="button secondary dictionary-more" onClick={()=>setLimit(n=>n+40)}>再显示 40 个词条</button>}
 </section>;
}
