'use client';
import React,{useState} from 'react';
import raw from '../data/spain-review-audit.json';

type AuditSource={id:string;title:string|null;url:string;system:string;scope:string;status:string;sourceNoteId?:string;sourceModified?:string;originalFolder?:string;youdaoUrl?:string};
type Audit={reviewedAt:string;summary:string;sources:AuditSource[];coverage:{label:string;before:number;after:number;note:string}[];changes:{title:string;detail:string;href?:string}[];limits:string[]};
const audit=raw as Audit;
const normal=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function sourceTitle(source:AuditSource){
 const title=(source.title||'').replace(/<[^>]*>/g,' ').replace(/[\u0000-\u001f\u007f-\u009f]/g,' ').replace(/\s+/g,' ').trim();
 return title||(source.id==='3f817d16de4c8147b4d2e4a86eef54e0'?'Dominio del Águila · 外部文章索引':'未命名原始资料');
}
export function SpainSourceReview(){
 const [query,setQuery]=useState('');
 const sources=audit.sources.filter(s=>normal(sourceTitle(s)+' '+s.scope+' '+(s.originalFolder||'')).includes(normal(query)));
 return <section className="es-section es-source-review">
  <div className="es-section-heading"><div><span className="eyebrow">ORIGINAL NOTES & REVIEW</span><h2>原文与核对</h2></div><small>{audit.reviewedAt}</small></div>
  <p>{audit.summary}</p>
  <div className="es-review-table-wrap"><table className="es-review-table"><thead><tr><th>内容</th><th>上次整理</th><th>本次复核后</th><th>计数范围</th></tr></thead><tbody>{audit.coverage.map(row=><tr key={row.label}><th>{row.label}</th><td>{row.before.toLocaleString()}</td><td><b>{row.after.toLocaleString()}</b></td><td>{row.note}</td></tr>)}</tbody></table></div>
  <div className="es-review-changes">{audit.changes.map(c=><article key={c.title}><h3>{c.title}</h3><p>{c.detail}</p>{c.href&&<a href={c.href}>查看相关档案 →</a>}</article>)}</div>
  <h3>本轮查阅的原始资料</h3><p className="es-note">每篇保留原始入口与核对范围。Notion 中的有道导入副本与直接读取的有道原笔记分别注明；标题相同的不同笔记保留独立记录。</p>
  <label className="es-source-search"><span>查找原文或主题</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Spain Producers / Rioja / 品种 / Ownership"/></label>
  <p className="es-note">{sources.length} 条原始资料核对记录</p>
  <div className="es-source-list">{sources.map(s=><details key={s.id}><summary><span>{sourceTitle(s)}</span><small>{s.status}</small></summary><div><p>{s.scope}</p><dl><dt>来源</dt><dd>{s.system}</dd>{s.originalFolder&&<><dt>原文件夹</dt><dd>{s.originalFolder}</dd></>}{s.sourceModified&&<><dt>源笔记日期</dt><dd>{s.sourceModified}</dd></>}{s.sourceNoteId&&<><dt>原笔记标识</dt><dd>{s.sourceNoteId}</dd></>}</dl><a href={s.url} target="_blank" rel="noreferrer">打开原始资料 ↗</a>{s.youdaoUrl&&<a href={s.youdaoUrl} target="_blank" rel="noreferrer">有道原笔记 ↗</a>}</div></details>)}</div>
  {audit.limits.length>0&&<div className="es-review-limits"><h3>资料边界</h3><ul>{audit.limits.map(t=><li key={t}>{t}</li>)}</ul></div>}
 </section>
}
