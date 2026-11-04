'use client';
import React, {useEffect, useState} from 'react';
import data from '../data/foundation-france.json';
import {emptyFranceProgress, readFranceProgress, writeFranceProgress, franceUnitResult} from '../lib/foundation-france.mjs';
import {recordFoundationAnswer, foundationOptions} from '../lib/foundation-study.mjs';
import FoundationDiagram from './FoundationDiagram.js';
import FoundationRhoneMapGuide from './FoundationRhoneMapGuide.js';
import './foundation-study.css';

const h = React.createElement;
export default function FoundationFranceReview() {
  const [progress, setProgress] = useState(emptyFranceProgress);
  const [loaded, setLoaded] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    // Accessing window.localStorage itself can throw in restricted browsers.
    let result;
    try { result = readFranceProgress(window.localStorage, data); }
    catch { result = readFranceProgress(null, data); }
    setProgress(result.progress); setCanSave(result.canSave); setError(result.error); setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || !canSave) return;
    try { setError(writeFranceProgress(window.localStorage, progress)); }
    catch { setError('本机保存不可用。当前作答仅保留在本页面中。'); }
  }, [progress, loaded, canSave]);

  const unit = data.units.find(u => u.number === progress.unit) || data.units[0];
  const result = franceUnitResult(unit, progress);
  const reviewed = data.units.filter(u => franceUnitResult(u, progress).reviewed).length;
  function chooseUnit(number) {
    setProgress(p => ({...p, unit: number}));
  }
  return h('section', {className: 'white-panel foundation-study', id: 'foundation-france-review', 'aria-labelledby': 'foundation-france-title'},
    h('h2', {id: 'foundation-france-title'}, '法国专题｜连接品种与产区'),
    h('p', null, '六个专题帮助你把地名、气候、品种与风格连起来。它们是共享复习材料，暂不指定为某一天的完整课堂安排；罗讷河单元附官方地图入口与读图练习，其余地图仍待补充。'),
    h('p', {className: 'fine-print'}, '自查与首次／最近答案仅保存在当前浏览器，独立于课前、D1 和 D2 记录，不同步到账号或讲师端。'),
    error ? h('p', {role: 'alert'}, error) : null,
    h('div', {className: 'foundation-study-controls'},
      h('label', null, '选择复习单元', h('select', {value: unit.number, disabled: !loaded, onChange: e => chooseUnit(Number(e.target.value))},
        data.units.map(u => h('option', {key: u.id, value: u.number}, `${u.number}. ${u.title}`))))),
    h('p', {role: 'status'}, `已复习 ${reviewed} / ${data.units.length} 节；本节自查 ${result.checked} / ${unit.checks.length}，选择题作答 ${result.answered} / ${unit.questions.length}。`),
    h('article', {key: unit.id, id: unit.id},
      h('h3', null, unit.title),
      unit.sections.map((section, i) => h('section', {key: i}, h('h4', null, section.heading), h('p', null, section.text))),
      h(FoundationDiagram, {unitId: unit.id}),
      unit.id === 'foundation-france-05' ? h(FoundationRhoneMapGuide) : null,
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
