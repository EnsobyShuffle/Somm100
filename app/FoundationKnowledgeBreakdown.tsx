'use client';
import React, {useEffect, useMemo, useState} from 'react';
import {validatePublishedCourse} from '../cloudfunctions/somm100FoundationRead/contract.mjs';
import './foundation-kp.css';

const groups = [
  {day:'D1', label:'Day 1 · 葡萄与酿造'},
  {day:'D2', label:'Day 2 · 葡萄品种'},
  {day:'D1-D2法国共用', label:'Day 1–2 · 法国基础'},
  {day:'D3', label:'Day 3 · 欧洲产区'},
  {day:'D4', label:'Day 4 · 起泡、加强酒与世界产区'},
];
type StudentKp = {id:string; title:string; day:string; module:string; text:string; extensions?:{title:string;url:string}[]};
type Course = {entries:StudentKp[]};

export function CourseReader({course}:{course:Course}) {
  const [day,setDay] = useState('D1');
  const [query,setQuery] = useState('');
  const [chapter,setChapter] = useState('');
  const dayRows = useMemo(() => course.entries.filter(row => row.day === day), [course,day]);
  const chapters = [...new Set(dayRows.map(row => row.id.split('-').slice(0,2).join('-')))];
  const term = query.trim().toLocaleLowerCase('zh-CN');
  const results = new Map<string,StudentKp[]>();
  for (const row of dayRows) {
    const section = row.id.split('-').slice(0,2).join('-');
    if (chapter && section !== chapter) continue;
    if (term && ![row.id,row.title,row.module,row.text].join(' ').toLocaleLowerCase('zh-CN').includes(term)) continue;
    if (!results.has(section)) results.set(section,[]);
    results.get(section)!.push(row);
  }
  return <>
    <div className="foundation-kp-tabs" role="group" aria-label="课程模块">
      {groups.map(group => <button key={group.day} type="button" aria-pressed={day === group.day}
        className={day === group.day ? 'button' : 'button secondary'}
        onClick={() => {setDay(group.day);setChapter('');setQuery('');}}>{group.label}</button>)}
    </div>
    {(day === 'D3' || day === 'D4') && <p>桥接预习 · 完成 Day 1–2 后阅读</p>}
    <label className="foundation-kp-search"><span>选择章节</span>
      <select value={chapter} onChange={e => setChapter(e.target.value)}>
        <option value="">全部章节</option>
        {chapters.map(code => <option key={code} value={code}>{code} · {dayRows.find(row => row.id.startsWith(code+'-'))?.module}</option>)}
      </select>
    </label>
    <label className="foundation-kp-search"><span>搜索当前模块</span>
      <input type="search" value={query} placeholder="例如 Chardonnay、波尔多" onChange={e=>setQuery(e.target.value)}/>
    </label>
    <p role="status">{results.size ? '共 '+Array.from(results.values()).reduce((n,rows)=>n+rows.length,0)+' 个知识点' : '没有匹配的知识点'}</p>
    {Array.from(results,([code,rows]) => <section key={code} className="foundation-kp-list">
      <h3>{code} · {rows[0].module}</h3>
      {rows.map(row => <details key={row.id}>
        <summary><span className="foundation-kp-id">{row.id}</span><strong>{row.title.replace(row.id+'｜','')}</strong></summary>
        <div className="foundation-kp-body">{row.text.split(/\n\s*\n/).map((part,i)=><p key={i}>{part.replace(/^#{1,6}\s+/gm,'')}</p>)}
          {Boolean(row.extensions?.length) && <><h4>延伸阅读</h4><ul>{row.extensions?.map(link =>
            <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a></li>)}</ul></>}
        </div>
      </details>)}
    </section>)}
  </>;
}

export default function FoundationKnowledgeBreakdown() {
  const enabled = Boolean(import.meta.env?.VITE_SOMM100_COURSE_ENV && import.meta.env?.VITE_SOMM100_COURSE_PUBLISHABLE_KEY);
  const [course,setCourse] = useState<Course|null>(null);
  const [status,setStatus] = useState(0);
  const [attempt,setAttempt] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let generation = 0;
    let disposed = false;
    let unsubscribe: (()=>void)|undefined;
    async function refresh() {
      const request = ++generation;
      setCourse(null);
      setStatus(0);
      try {
        const client = await import('../lib/somm100-course-client');
        if (disposed || request !== generation) return;
        unsubscribe ??= client.onSessionChange(refresh);
        const result = await client.loadCourse();
        if (disposed || request !== generation) return;
        if (result.status === 200 && validatePublishedCourse(result.course)) {
          setCourse(result.course as Course);
          setStatus(200);
        } else setStatus(result.status === 401 || result.status === 403 ? result.status : 503);
      } catch {
        if (!disposed && request === generation) setStatus(503);
      }
    }
    const visibility = () => {
      if (!document.hidden) void refresh();
      else {generation++;setCourse(null);setStatus(0);}
    };
    void refresh();
    document.addEventListener('visibilitychange', visibility);
    return () => {disposed = true;unsubscribe?.();document.removeEventListener('visibilitychange',visibility);};
  }, [enabled,attempt]);
  if (!enabled) return null;
  return <section className="white-panel foundation-study foundation-kp" aria-labelledby="foundation-kp-heading">
    <h2 id="foundation-kp-heading">课程知识解析 · Knowledge Breakdown</h2>
    {course ? <CourseReader course={course}/> : <div role="status">
      {status === 401 ? <button className="button" onClick={async()=>{
        try {const client = await import('../lib/somm100-course-client'); const res = await client.signIn(); if(res?.error) setStatus(503);}
        catch {setStatus(503);}
      }}>学员登录后阅读</button> : status === 403 ? '当前账号尚未获得本课程阅读权限。' :
        status === 503 ? <><p>暂时无法读取课程。</p><button className="button secondary" onClick={()=>setAttempt(n=>n+1)}>重新加载</button></> : '正在读取课程…'}
    </div>}
  </section>;
}
