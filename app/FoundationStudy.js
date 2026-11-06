'use client';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import React, {useEffect, useState} from 'react';
import data from '../data/foundation-study.json';
import {FOUNDATION_STORAGE_KEY, emptyFoundationProgress, normalizeFoundationProgress, recordFoundationAnswer, foundationWeekResult, foundationOptions} from '../lib/foundation-study.mjs';
import './foundation-study.css';

const h = React.createElement;
function scrollToConcept(id) {
  focusFoundationTarget(id);
}

export default function FoundationStudy() {
  const [progress, setProgress] = useState(emptyFoundationProgress);
  const [loaded, setLoaded] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [canSave, setCanSave] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FOUNDATION_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && parsed.version !== 1) throw new Error('unsupported stored version');
      setProgress(normalizeFoundationProgress(parsed, data));
      setCanSave(true);
    } catch {
      // Preserve unreadable/unsupported records instead of overwriting them.
      setSaveError('已有本机记录无法读取。本次可继续练习，但不会覆盖旧记录或保存新进度。');
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || !canSave) return;
    try {
      window.localStorage.setItem(FOUNDATION_STORAGE_KEY, JSON.stringify(progress));
      setSaveError('');
    } catch {
      setSaveError('本机保存失败，请勿关闭页面。当前作答仍保留在本次页面中。');
    }
  }, [progress, loaded, canSave]);

  const firstWeek = progress.pace === 4 ? progress.period * 2 - 1 : progress.period;
  const visibleWeeks = data.weeks.filter(w => w.number === firstWeek || (progress.pace === 4 && w.number === firstWeek + 1));
  return h('section', {className: 'white-panel foundation-study', 'aria-labelledby': 'foundation-study-title'},
    h('h2', {id: 'foundation-study-title'}, '本周要完成什么'),
    h('p', null, '同一套内容，两种节奏。推荐提前 8 周开始，每周 2–3 次、每次 30–45 分钟；4 周版每周约 3–4 次，合并相邻两周。可自行选择当前周，不代表已安排开课日期。'),
    h('div', {className: 'foundation-study-controls'},
      h('label', null, '预习节奏', h('select', {value: progress.pace, disabled: !loaded, onChange: e => {
        const pace = Number(e.target.value);
        setProgress(p => ({...p, pace, period: pace === 4 ? Math.ceil(firstWeek / 2) : firstWeek}));
      }}, h('option', {value: 8}, '8 周 · 推荐'), h('option', {value: 4}, '4 周 · 压缩'))),
      h('label', null, '当前周', h('select', {value: progress.period, disabled: !loaded, onChange: e => setProgress(p => ({...p, period: Number(e.target.value)}))},
        Array.from({length: progress.pace}, (_, i) => h('option', {value: i + 1, key: i}, `第 ${i + 1} 周`))))),
    h('p', {className: 'fine-print'}, '自查不计分；准备度题用于发现需要复习的概念，不设淘汰线。进度及首次／最近答案仅保存在当前浏览器，不会同步到账号或讲师端。'),
    saveError ? h('p', {role: 'alert'}, saveError) : null,
    visibleWeeks.map(week => {
      const result = foundationWeekResult(week, data, progress);
      const questions = data.questions.filter(q => q.week === week.number);
      return h('article', {key: week.id, id: week.id, className: 'foundation-week'},
        h('h3', null, `${progress.pace === 4 ? '学习单元' : '第'} ${week.number}${progress.pace === 4 ? '' : ' 周'}｜${week.title}`),
        h('p', null, week.goal),
        h('h4', {id: `${week.id}-digest`}, '先理解'),
        h('p', null, week.digest),
        h('div', {className: 'button-row'}, week.concepts.map(id => h('button', {type: 'button', className: 'button secondary', key: id, onClick: () => scrollToConcept(id)}, `查看概念 ${Number(id.split('-')[1]) + 1} 与阅读资料`))),
        h('fieldset', null, h('legend', null, '知识点自查 · 理解后再勾选'),
          week.checks.map(check => h('label', {className: 'foundation-check', key: check.id},
            h('input', {type: 'checkbox', disabled: !loaded, checked: progress.checks[check.id] === true, onChange: e => {
              const checked = e.target.checked;
              setProgress(p => ({...p, checks: {...p.checks, [check.id]: checked}}));
            }}), h('span', null, check.text)))),
        h('details', null,
          h('summary', null, `准备度选择题 · ${questions.length} 题`),
          h('p', {role: 'status'}, result.ready ? '本组概念检查：已准备好。你仍可返回阅读和自查。' : result.answered < result.total ? `已作答 ${result.answered} / ${result.total}，完成后查看本组准备度。` : '建议再看一遍本周内容，然后重新选择。'),
          week.number === 8 ? h('p', null, '这部分只是第一次预览；没记住也没关系，正式课程和三周桥接还会再次学习。') : null,
          questions.map(q => {
            const entry = progress.answers[q.id];
            const correct = entry?.latest === q.answer;
            return h('fieldset', {className: 'foundation-question', key: q.id},
              h('legend', null, q.prompt),
              foundationOptions(q).map((index, position) => h('label', {className: 'foundation-check', key: index},
                h('input', {type: 'radio', disabled: !loaded, name: q.id, value: index, checked: entry?.latest === index,
                  onChange: () => setProgress(p => recordFoundationAnswer(p, q, index))}),
                h('span', null, `${String.fromCharCode(65 + position)}. ${q.options[index]}`))),
              entry ? h('div', {'aria-live': 'polite'},
                h('p', null, correct ? `理解正确：${q.topic}。` : `再看一下「${q.topic}」。正确理解是：${q.options[q.answer]}。`),
                !correct ? h('button', {type: 'button', className: 'button secondary', onClick: () => scrollToConcept(`${week.id}-digest`)}, '返回本周知识提要') : null,
                h('p', {className: 'fine-print'}, `首次选择：${q.options[entry.first]}；最近选择：${q.options[entry.latest]}`)) : null);
          })));
    }));
}
