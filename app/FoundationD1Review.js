'use client';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import React, {useEffect, useRef, useState} from 'react';
import data from '../data/foundation-d1.json';
import {emptyD1Progress, readD1Progress, writeD1Progress, d1UnitResult} from '../lib/foundation-d1.mjs';
import {recordFoundationAnswer, foundationOptions} from '../lib/foundation-study.mjs';
import {mappedReviewUnit} from '../lib/foundation-quiz.mjs';
import FoundationQuizReturn from './FoundationQuizReturn.js';
import FoundationDiagram from './FoundationDiagram.js';
import FoundationVideoStudy from './FoundationVideoStudy.js';
import FoundationCellarStudy from './FoundationCellarStudy.js';
import FoundationLabelPractice from './FoundationLabelPractice.js';
import './foundation-study.css';

const h = React.createElement;
export default function FoundationD1Review() {
  const [progress, setProgress] = useState(emptyD1Progress);
  const navigationRequested = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    function openReview(event) {
      const target = mappedReviewUnit(data, 'foundation-d1', event.detail);
      if (!target) return;
      setProgress(p => ({...p, unit:target.number}));
      window.requestAnimationFrame(() => focusFoundationTarget('foundation-d1-title'));
    }
    window.addEventListener('foundation-open-review', openReview);
    return () => window.removeEventListener('foundation-open-review', openReview);
  }, []);
  useEffect(() => {
    // Accessing window.localStorage itself can throw in restricted browsers.
    let result;
    try { result = readD1Progress(window.localStorage, data); }
    catch { result = readD1Progress(null, data); }
    setProgress(result.progress); setCanSave(result.canSave); setError(result.error); setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || !canSave) return;
    try { setError(writeD1Progress(window.localStorage, progress)); }
    catch { setError('本机保存不可用。当前作答仅保留在本页面中。'); }
  }, [progress, loaded, canSave]);

  const unit = data.units.find(u => u.number === progress.unit) || data.units[0];
  const result = d1UnitResult(unit, progress);
  const reviewed = data.units.filter(u => d1UnitResult(u, progress).reviewed).length;
  useEffect(() => {
    if (!navigationRequested.current) return;
    navigationRequested.current = false;
    focusFoundationTarget(unit.id);
  }, [unit.id]);
  function chooseUnit(number) {
    if (number === unit.number) return;
    navigationRequested.current = true;
    setProgress(p => ({...p, unit: number}));
  }
  return h('section', {className: 'white-panel foundation-study', id: 'foundation-d1-review', 'aria-labelledby': 'foundation-d1-title'},
    h('h2', {id: 'foundation-d1-title'}, 'D1｜课堂后复习'),
    h(FoundationQuizReturn,{prefix:'foundation-d1'}),
    h('p', null, '先重建课堂知识，再检查理解。本区供 D1 后复习使用，与上方课前预习分开；不是完整课堂课表，也不代表已完成课堂出勤或课程考核。'),
    h('p', {className: 'fine-print'}, '自查与首次／最近答案仅保存在当前浏览器，独立于课前记录，不同步到账号或讲师端。'),
    error ? h('p', {role: 'alert'}, error) : null,
    h('div', {className: 'foundation-study-controls'},
      h('label', null, '选择复习单元', h('select', {value: unit.number, disabled: !loaded, onChange: e => chooseUnit(Number(e.target.value))},
        data.units.map(u => h('option', {key: u.id, value: u.number}, `${u.number}. ${u.title}`))))),
    h('p', {role: 'status'}, `已复习 ${reviewed} / ${data.units.length} 节；本节自查 ${result.checked} / ${unit.checks.length}，选择题作答 ${result.answered} / ${unit.questions.length}。`),
    h('article', {key: unit.id, id: unit.id},
      h('h3', null, unit.title),
      unit.learningObjective && h('p', null, h('strong', null, '学习目标　'), unit.learningObjective),
      unit.preparation && h('p', null, h('strong', null, '学习准备　'), unit.preparation),
      unit.sections.map((section, i) => h('section', {key: i}, h('h4', null, section.heading), h('p', null, section.text))),
      h(FoundationDiagram, {unitId: unit.id}),
      h(FoundationVideoStudy, {unitId: unit.id}),
      unit.id === 'foundation-d1-08' ? h(FoundationCellarStudy) : null,
      unit.id === 'foundation-d1-10' ? h(FoundationLabelPractice) : null,
      unit.practice && h('section', null,
        h('h4', null, '动手练习'),
        h('p', null, unit.practice),
        h('p', {className: 'fine-print'}, '请在自己的笔记中完成，再按提示核对。这项书面练习不在页面保存或自动评分，也不会自动标记本节完成。')),
      h('fieldset', null, h('legend', null, '知识点自查 · 理解后勾选'),
        unit.checks.map(c => h('label', {key: c.id, className: 'foundation-check'},
          h('input', {type: 'checkbox', checked: progress.checks[c.id] === true, disabled: !loaded, onChange: e => {
            const checked = e.target.checked;
            setProgress(p => ({...p, checks: {...p.checks, [c.id]: checked}}));
          }}), h('span', null, c.text)))),
      h('details', null, h('summary', null, '边学边检 · 3 道选择题'),
        unit.questions.map(q => {
          const entry = progress.answers[q.id];
          return h('fieldset', {key: q.id, className: 'foundation-question'},
            h('legend', null, q.prompt),
            foundationOptions(q).map((index, position) => h('label', {key: index, className: 'foundation-check'},
              h('input', {type: 'radio', name: q.id, disabled: !loaded, checked: entry?.latest === index,
                onChange: () => setProgress(p => recordFoundationAnswer(p, q, index))}),
              h('span', null, `${String.fromCharCode(65 + position)}. ${q.options[index]}`))),
            entry ? h('div', {'aria-live': 'polite'},
              h('p', null, `${entry.latest === q.answer ? '理解正确。' : '建议回看本节。正确理解：' + q.options[q.answer] + '。'}${q.explanation}`),
              h('p', {className: 'fine-print'}, `首次选择：${q.options[entry.first]}；最近选择：${q.options[entry.latest]}`),
              entry.latest !== q.answer ? h('button', {type: 'button', className: 'button secondary', onClick: () => focusFoundationTarget(unit.id)}, '返回本节正文') : null) : null);
        })),
      h('p', {role: 'status'}, result.reviewed ? '本节自查与理解检查已完成，可继续下一节。' : '自查未确认或题目仍有疑问时，可继续阅读和重答，不设淘汰线。'),
      h('div', {className: 'button-row'},
        h('button', {type: 'button', className: 'button secondary', disabled: !loaded || unit.number === 1, onClick: () => chooseUnit(unit.number - 1)}, '上一节'),
        h('button', {type: 'button', className: 'button secondary', disabled: !loaded || unit.number === data.units.length, onClick: () => chooseUnit(unit.number + 1)}, '下一节'))));
}


