'use client';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import React, {useEffect, useState} from 'react';
import data from '../data/foundation-bridge.json';
import cohort from '../data/foundation-cohort22.json';
import {FOUNDATION_BRIDGE_KEY} from '../lib/foundation-backup.mjs';
import {bridgeCalendar} from '../lib/foundation-bridge-calendar.mjs';
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

const compactBlocks = [
  {
    title: '先重建 D1–D2 知识框架',
    work: '先用 D1 提要把葡萄园、发酵和成酒风格连起来，再用 D2 品种与法国专题复习品种、地名和酒标。',
    check: '合上页面，分别用一句话解释为什么采收时机可能改变成酒风格，以及为什么看到产区仍要查酒款资料。把说不清的一点记下来。',
    targets: [
      {headingId:'foundation-d1-title', label:'D1 基础复习'},
      {headingId:'foundation-d2-title', label:'D2 品种复习'},
      {headingId:'foundation-france-title', label:'法国专题'},
    ],
  },
  {
    title: '自测后预习 D3–D4',
    work: '从 D1 和 D2 自测各选一个薄弱主题，答完回看解析。给下一阶段留一段时间，先认欧洲产区、起泡和加强酒的几个关键词。',
    check: '在纸上写下一个欧洲产区和一个工艺词，各写一条自己想带进课堂的问题。',
    targets: [
      {headingId:'foundation-d1-quiz-title', label:'D1 自测'},
      {headingId:'foundation-d2-quiz-title', label:'D2 自测'},
      {headingId:'foundation-d3-title', label:'D3 欧洲产区'},
      {headingId:'foundation-d4-title', label:'D4 起泡、加强酒与世界产区'},
    ],
  },
];

function CohortBridge() {
  const [cityName, setCityName] = useState('');
  const city = cohort.cities.find(item => item.city === cityName);
  const calendar = city && bridgeCalendar(city.stages[0].at(-1), city.stages[1][0]);

  return h('section', {'aria-labelledby':'foundation-cohort-bridge-title'},
    h('h3', {id:'foundation-cohort-bridge-title'}, '第22期｜课间复习建议'),
    h('p', null, '选上课城市，查看第一、第二阶段之间可用的完整日期，再按下面两个学习段安排复习。练习顺序由学习页面建议，面授、考试和作业以课程方通知为准。'),
    h('div', {className:'foundation-study-controls'},
      h('label', null, '上课城市', h('select', {value:cityName, onChange:event=>setCityName(event.target.value)},
        h('option', {value:''}, '请选择城市'),
        cohort.cities.map(item=>h('option', {key:item.city, value:item.city}, item.city))))),
    calendar && h('p', {role:'status'}, `${cityName}｜两段面授之间有 ${calendar.days} 个完整日历日。`),
    h('div', {className:'foundation-cohort-grid'}, compactBlocks.map((block, index) => {
      const range = calendar?.ranges[index];
      return h('article', {key:block.title, className:'foundation-cohort-city'},
        h('h4', null, `第 ${index + 1} 段｜${block.title}`),
        range && h('p', {className:'fine-print'}, '建议日期　',
          h('time', {dateTime:range[0]}, range[0].replaceAll('-', '/')), ' 至 ',
          h('time', {dateTime:range[1]}, range[1].replaceAll('-', '/'))),
        h('p', null, block.work),
        h('p', null, h('strong', null, '自查　'), block.check),
        h('div', {className:'button-row'}, block.targets.map(targetButton)));
    })));
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
    h('h2', {id: 'foundation-bridge-title'}, '课堂间学习路径'),
    h(CohortBridge),
    h('h3', null, '21 天自选学习资源'),
    h('p', null, '从 D1 复习开始，经 D2 与法国专题过渡到下一阶段预习。按自己的进度选读，也可留到后面继续。'),
    h('div', {className: 'foundation-study-controls'},
      h('label', null, '当前学习日', h('select', {
        id: 'foundation-bridge-day',
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
