'use client';
import React, {useEffect, useMemo, useState} from 'react';
import {validatePublishedCourse} from '../lib/somm100-course-content.mjs';
import './foundation-kp.css';

// The existing SOMM100 Course page remains the entry point. Private Notion
// drafts are never fetched by the client or shipped in the public repository.
const groups = [
  {day: 'D1', label: 'Day 1 · 葡萄与酿造'},
  {day: 'D2', label: 'Day 2 · 葡萄品种'},
  {day: 'D1-D2法国共用', label: '法国产区与酒标'},
  {day: 'D3', label: 'Day 3 · 欧洲产区'},
  {day: 'D4', label: 'Day 4 · 起泡酒与世界产区'},
];

type StudentKp = {
  id: string;
  title: string;
  day: string;
  module: string;
  text: string;
};

type PublishedCourse = {
  schema: string;
  approved: true;
  entries: StudentKp[];
};

function readableText(raw: string) {
  // Render text, not HTML. Notion Markdown link targets may point to internal
  // teacher notes, so don't turn them into public student navigation links.
  return raw
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)\]\((?:[^()]|\([^)]*\))*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/__(.*?)__/g, '$1')
    .replace(/^\s*#{1,5}\s+/gm, '')
    .trim();
}

export default function FoundationKnowledgeBreakdown() {
  const [course, setCourse] = useState<PublishedCourse | null>(null);
  const [day, setDay] = useState('D1');
  const [query, setQuery] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    // File exists only after a teacher-approved course import. A missing file
    // leaves the existing foundation view unchanged, with no blank/error card.
    fetch('./course-content/somm100-student.json', {signal: controller.signal, cache: 'no-store'})
      .then(async response => {
        if (!response.ok || !(response.headers.get('content-type') || '').includes('json')) return null;
        return response.json();
      })
      .then(data => {
        if (!controller.signal.aborted && validatePublishedCourse(data)) setCourse(data);
      })
      .catch(() => { /* No approved student package: keep current course intact. */ });
    return () => controller.abort();
  }, []);

  const entries = useMemo(() => {
    if (!course) return [];
    const term = query.trim().toLocaleLowerCase('zh-CN');
    return course.entries.filter(item =>
      item.day === day &&
      (!term || (item.id + ' ' + item.title + ' ' + item.module + ' ' + item.text)
        .toLocaleLowerCase('zh-CN').includes(term)));
  }, [course, day, query]);

  if (!course) return null;
  return (
    <section className="white-panel foundation-study foundation-kp" id="foundation-student-breakdowns"
      aria-labelledby="foundation-kp-heading">
      <span className="eyebrow">SOMM100 · KNOWLEDGE BREAKDOWN</span>
      <h2 id="foundation-kp-heading">课程知识解析</h2>
      <p>按课程日阅读知识点，把品种、产区和酿造概念变成能向客人解释的语言。</p>
      <div className="foundation-kp-tabs" role="group" aria-label="选择课程知识点范围">
        {groups.map(group => (
          <button key={group.day} type="button" onClick={() => setDay(group.day)}
            className={day === group.day ? 'button' : 'button secondary'}
            aria-pressed={day === group.day}>{group.label}</button>
        ))}
      </div>
      <label className="foundation-kp-search">
        <span>搜索当前课程日的知识点</span>
        <input type="search" value={query} onChange={event => setQuery(event.target.value)}
          placeholder="例如：酸度、Chardonnay、波尔多" />
      </label>
      <p role="status" className="fine-print">当前显示 {entries.length} 条知识解析。进入其他课程日可切换范围。</p>
      <div className="foundation-kp-list">
        {entries.map(item => (
          <details key={item.id} id={'foundation-kp-' + item.id}>
            <summary>
              <span className="foundation-kp-id">{item.id}</span>
              <strong>{item.title.replace(item.id + '｜', '')}</strong>
            </summary>
            <div className="foundation-kp-body">
              {readableText(item.text).split(/\n\s*\n/).filter(Boolean).map((paragraph, index) =>
                <p key={index}>{paragraph}</p>)}
            </div>
          </details>
        ))}
        {entries.length === 0 && <p className="fine-print">当前范围未找到匹配的知识点。</p>}
      </div>
    </section>
  );
}
