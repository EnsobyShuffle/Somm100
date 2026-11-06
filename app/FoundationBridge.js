'use client';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import React, {useEffect, useState} from 'react';
import data from '../data/foundation-bridge.json';
import {FOUNDATION_BRIDGE_KEY} from '../lib/foundation-backup.mjs';
import {emptyD2Progress, readD2Progress, writeD2Progress} from '../lib/foundation-d2.mjs';
import './foundation-study.css';

const h = React.createElement;
const progressData = {units: data.days.map(day => ({number: day.number, checks: [], questions: []}))};

const weekOptions = [0, 1, 2].map(week => h('optgroup', {key: week, label: `第 ${week + 1} 周`},
  data.days.slice(week * 7, week * 7 + 7).map(item =>
    h('option', {key: item.id, value: item.number}, `第 ${item.number} 天 · ${item.title}`))));

function openTarget(target) {
  if (target.headingId) {
    focusFoundationTarget(target.headingId);
    return;
  }
  window.dispatchEvent(new CustomEvent('foundation-open-review', {
    detail: {prefix: target.prefix, unitId: target.unitId},
  }));
}

function targetButton(target) {
  return h('button', {
    key: target.unitId || target.headingId,
    type: 'button', className: 'button secondary', onClick: () => openTarget(target),
  }, target.label);
}

export default function FoundationBridge() {
  const [progress, setProgress] = useState(emptyD2Progress);
  const [loaded, setLoaded] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let result;
    try { result = readD2Progress(window.localStorage, progressData, FOUNDATION_BRIDGE_KEY); }
    catch { result = readD2Progress(null, progressData, FOUNDATION_BRIDGE_KEY); }
    setProgress(result.progress);
    setCanSave(result.canSave);
    setError(result.error);
    setLoaded(true);
  }, []);

  const day = data.days.find(item => item.number === progress.unit) || data.days[0];
  function chooseDay(number) {
    const next = {...progress, unit: number};
    setProgress(next);
    if (!canSave) return;
    try { setError(writeD2Progress(window.localStorage, next, FOUNDATION_BRIDGE_KEY)); }
    catch { setError('本机保存不可用。当前学习日只保留在此页面。'); }
  }

  return h('section', {className: 'white-panel foundation-study', 'aria-labelledby': 'foundation-bridge-title'},
    h('h2', {id: 'foundation-bridge-title'}, '21 天课堂间学习路径'),
    h('p', null, '从 D1 复习开始，经 D2 与法国专题过渡到下一阶段预习。可按自己的节奏选择学习日，具体面授和考试日期以当期通知为准。'),
    h('div', {className: 'foundation-study-controls'},
      h('label', null, '当前学习日', h('select', {
        value: day.number, disabled: !loaded, onChange: event => chooseDay(Number(event.target.value)),
      }, weekOptions))),
    h('h3', null, `第 ${day.number} 天 · ${day.title}`),
    h('p', null, day.focus),
    day.targets.length > 0 && h('div', {className: 'button-row'}, day.targets.map(targetButton)),
    day.previews?.map(card => h('details', {key: card.title},
      h('summary', null, card.title),
      h('p', null, card.summary),
      h('p', null, `自查：${card.check}`),
      targetButton(card.review))),
    error && h('p', {role: 'alert'}, error),
    h('p', {className: 'fine-print'}, '当前学习日保存在本浏览器，也可随课程备份转移。选择学习日不计入出勤或考核。'),
    h('div', {className: 'button-row'},
      h('button', {type: 'button', className: 'button secondary', disabled: !loaded || day.number === 1, onClick: () => chooseDay(day.number - 1)}, '上一天'),
      h('button', {type: 'button', className: 'button secondary', disabled: !loaded || day.number === data.days.length, onClick: () => chooseDay(day.number + 1)}, '下一天')));
}
