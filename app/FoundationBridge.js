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

const finalReviewBlocks = [
  {
    title: '用证据复盘 D3–D4',
    work: '从欧洲产区选一款静止酒，再从 D4 选一款起泡或加强酒。各写下一个产地线索和一个工艺线索，并说明哪条线索能帮助判断风格。',
    check: '遮住笔记，复述两款酒的关键区别。圈出一个自己只是在猜的地方，回到对应专题核对。',
    targets: [
      {headingId:'foundation-d3-title', label:'D3 欧洲产区'},
      {headingId:'foundation-d4-title', label:'D4 工艺与世界产区'},
      {headingId:'foundation-d3-quiz-title', label:'D3 自测'},
      {headingId:'foundation-d4-quiz-title', label:'D4 自测'},
    ],
  },
  {
    title: '和同伴走一轮综合自练',
    work: '先做一题盲品或口头解释，再选一个服务情境。从两份团队酒单草案各挑一条待核对的记录，互相追问选酒理由。',
    check: '写下一个有观察支持的判断、一句对客解释和一个待核对的酒单字段。把答不清的问题带回课堂。',
    targets: [
      {headingId:'foundation-assessment-title', label:'盲品、口试和团队酒单'},
      {headingId:'foundation-assessment-practice-title', label:'餐厅情境自练'},
      {headingId:'foundation-sparkling-assessment-title', label:'起泡酒综合自练'},
      {headingId:'foundation-assessment-team-pours-title', label:'杯卖库存自练'},
    ],
  },
];

function bridgeBlocks(blocks, calendar) {
  return h('div', {className:'foundation-cohort-grid'}, blocks.map((block, index) => {
    const range = calendar?.ranges[index];
    return h('article', {key:block.title, className:'foundation-cohort-city'},
      h('h4', null, `第 ${index + 1} 段｜${block.title}`),
      range && h('p', {className:'fine-print'}, '建议日期　',
        h('time', {dateTime:range[0]}, range[0].replaceAll('-', '/')), ' 至 ',
        h('time', {dateTime:range[1]}, range[1].replaceAll('-', '/'))),
      h('p', null, block.work),
      h('p', null, h('strong', null, '自查　'), block.check),
      h('div', {className:'button-row'}, block.targets.map(targetButton)));
  }));
}

function bridgeWindow(cityName, calendar, lastClass, nextClass) {
  return h('p', {role:'status'}, `${cityName}｜两段面授之间有 ${calendar.days} 个完整日历日。`,
    ' 上一阶段末日 ', h('time', {dateTime:lastClass}, lastClass.replaceAll('-', '/')),
    '，下一阶段首日 ', h('time', {dateTime:nextClass}, nextClass.replaceAll('-', '/')), '。');
}

function CohortBridge({cityName, onCityChange}) {
  const city = cohort.cities.find(item => item.city === cityName);
  const firstEnd = city?.stages[0].at(-1);
  const secondStart = city?.stages[1][0];
  const secondEnd = city?.stages[1].at(-1);
  const thirdStart = city?.stages[2][0];
  const calendar = city && bridgeCalendar(firstEnd, secondStart);
  const finalCalendar = city && bridgeCalendar(secondEnd, thirdStart);

  return h(React.Fragment, null,
    h('section', {'aria-labelledby':'foundation-cohort-bridge-title'},
      h('h3', {id:'foundation-cohort-bridge-title'}, '第22期｜课间复习建议'),
      h('p', null, '选上课城市，下方两次课间都会显示可用于复习的完整日期。练习由学习页面建议，面授、考试和作业以课程方通知为准。'),
      h('div', {className:'foundation-study-controls'},
        h('label', null, '上课城市', h('select', {value:cityName, onChange:event=>onCityChange(event.target.value)},
          h('option', {value:''}, '请选择城市'),
          cohort.cities.map(item=>h('option', {key:item.city, value:item.city}, item.city))))),
      h('h4', null, '第一阶段后｜约两周复习与预习'),
      calendar && bridgeWindow(cityName, calendar, firstEnd, secondStart),
      bridgeBlocks(compactBlocks, calendar)),
    h('section', {className:'foundation-week', 'aria-labelledby':'foundation-cohort-final-bridge-title'},
      h('h4', {id:'foundation-cohort-final-bridge-title'}, '第二阶段后｜综合复盘'),
      h('p', null, '从第二阶段末日之后到第三阶段开始前，按自己的进度复盘葡萄酒知识和餐厅情境。'),
      finalCalendar && bridgeWindow(cityName, finalCalendar, secondEnd, thirdStart),
      bridgeBlocks(finalReviewBlocks, finalCalendar),
      h('details', {id:'foundation-final-class-prep', className:'foundation-week'},
        h('summary', {id:'foundation-final-class-prep-title'}, '最后一次面授前｜整理三条复盘记录'),
        h('p', null, '从已经完成的自练各选一项，写成一页笔记，带到最后一次面授和同伴核对。'),
        h('ol', null,
          h('li', null, '知识：写下一个原判断、支持它的观察，以及还需要查的一份酒标或酒款资料。'),
          h('li', null, '服务：记下客人的原要求、你会复述确认的一句话，以及需要交接给同事的一项信息。'),
          h('li', null, '酒单：从杯卖或主酒单草案挑一条，记录选酒理由、待核实的字段及负责查证的组员。')),
        h('div', {className:'button-row'}, [
          {headingId:'foundation-sparkling-assessment-title', label:'回看起泡酒综合自练'},
          {headingId:'foundation-assessment-recommendation-title', label:'回看点单变更自练'},
          {headingId:'foundation-assessment-team-pours-title', label:'回看杯卖库存自练'},
        ].map(targetButton)),
        h('details', null,
          h('summary', null, '看一份三条笔记示例'),
          h('dl', null,
            h('dt', null, '知识'),
            h('dd', null, '我闻到了烤面包香，推测可能有酒泥接触。下一步查酒款技术表，分别核对酒泥接触时长和二次发酵容器。'),
            h('dt', null, '服务'),
            h('dd', null, '客人把两杯干白改成一杯干白加一份气泡水。我复述新订单、确认价格，再告诉同事哪一杯干白已取消。'),
            h('dt', null, '酒单'),
            h('dd', null, '这款起泡酒暂列杯卖，供客人餐前选择。请负责盘点的组员复核扣除预留后还能接几杯，再更新可售数。'))),
        h('p', {className:'fine-print'}, '这一页是自选复盘。当天教学安排、考核时间及作业提交要求以课程方通知为准。'))));
}

export default function FoundationBridge({cityName, onCityChange}) {
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
    h(CohortBridge, {cityName, onCityChange}),
    h('h3', null, '21 天自选学习资源'),
    h('p', null, '从 D1 复习开始，经 D2 与法国专题过渡到下一阶段预习。第22期的复习日期请看上方城市安排，这 21 天资源可按需选读。'),
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
