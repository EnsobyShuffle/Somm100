'use client';
import React, {useEffect, useState} from 'react';
import data from '../data/foundation-d2.json';
import {emptyD2Progress, readD2Progress, writeD2Progress, d2UnitResult} from '../lib/foundation-d2.mjs';
import {recordFoundationAnswer, foundationOptions} from '../lib/foundation-study.mjs';
import FoundationDiagram from './FoundationDiagram.js';
import './foundation-study.css';

const h = React.createElement;
export default function FoundationD2Review() {
  const [progress, setProgress] = useState(emptyD2Progress);
  const [loaded, setLoaded] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    // Accessing window.localStorage itself can throw in restricted browsers.
    let result;
    try { result = readD2Progress(window.localStorage, data); }
    catch { result = readD2Progress(null, data); }
    setProgress(result.progress); setCanSave(result.canSave); setError(result.error); setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || !canSave) return;
    try { setError(writeD2Progress(window.localStorage, progress)); }
    catch { setError('本机保存不可用。当前作答仅保留在本页面中。'); }
  }, [progress, loaded, canSave]);

  const unit = data.units.find(u => u.number === progress.unit) || data.units[0];
  const result = d2UnitResult(unit, progress);
  const reviewed = data.units.filter(u => d2UnitResult(u, progress).reviewed).length;
  function chooseUnit(number) {
    setProgress(p => ({...p, unit: number}));
  }
  return h('section', {className: 'white-panel foundation-study', id: 'foundation-d2-review', 'aria-labelledby': 'foundation-d2-title'},
    h('h2', {id: 'foundation-d2-title'}, 'D2｜葡萄品种复习'),
    h('p', null, '本区先开放葡萄品种的 9 个复习单元，供课堂后重建知识、检查理解。法国专题请见下方独立复习区；这些内容仍不代表完整 D2 课程或当期课表。'),
    h('p', {className: 'fine-print'}, '自查与首次／最近答案仅保存在当前浏览器，独立于课前和 D1 记录，不同步到账号或讲师端。'),
    error ? h('p', {role: 'alert'}, error) : null,
    h('div', {className: 'foundation-study-controls'},
      h('label', null, '选择复习单元', h('select', {value: unit.number, disabled: !loaded, onChange: e => chooseUnit(Number(e.target.value))},
        data.units.map(u => h('option', {key: u.id, value: u.number}, `${u.number}. ${u.title}`))))),
    h('p', {role: 'status'}, `已复习 ${reviewed} / ${data.units.length} 节；本节自查 ${result.checked} / ${unit.checks.length}，选择题作答 ${result.answered} / ${unit.questions.length}。`),
    h('article', {key: unit.id, id: unit.id},
      h('h3', null, unit.title),
      unit.sections.map((section, i) => h('section', {key: i}, h('h4', null, section.heading), h('p', null, section.text))),
      h(FoundationDiagram, {unitId: unit.id}),
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
              entry.latest !== q.answer ? h('button', {type: 'button', className: 'button secondary', onClick: () => document.getElementById(unit.id)?.scrollIntoView({behavior: 'smooth', block: 'start'})}, '返回本节正文') : null) : null);
        })),
      h('p', {role: 'status'}, result.reviewed ? '本节自查与理解检查已完成，可继续下一节。' : '自查未确认或题目仍有疑问时，可继续阅读和重答，不设淘汰线。'),
      h('div', {className: 'button-row'},
        h('button', {type: 'button', className: 'button secondary', disabled: !loaded || unit.number === 1, onClick: () => chooseUnit(unit.number - 1)}, '上一节'),
        h('button', {type: 'button', className: 'button secondary', disabled: !loaded || unit.number === data.units.length, onClick: () => chooseUnit(unit.number + 1)}, '下一节'))));
}

