'use client';
import React, {useState} from 'react';
import cohort from '../data/foundation-cohort22.json';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import {foundationPrepWindow} from '../lib/foundation-study.mjs';

const h = React.createElement;
const essentials = [
  ['foundation-1', '先把葡萄到酒的过程说一遍'],
  ['foundation-4', '用甜度、酸度和酒体描述一杯酒'],
  ['foundation-7', '找出一张酒标上的产地与年份'],
];

export default function FoundationPrepByCity() {
  const [plan, setPlan] = useState(null);

  function selectCity(event) {
    const city = cohort.cities.find(entry => entry.city === event.target.value);
    if (!city) {
      setPlan(null);
      return;
    }
    const firstClass = city.stages[0][0];
    setPlan({city: city.city, firstClass, ...foundationPrepWindow(firstClass)});
  }

  return h('section', {'aria-labelledby': 'foundation-prep-city-title'},
    h('h3', {id: 'foundation-prep-city-title'}, '按开课城市安排预习'),
    h('div', {className: 'foundation-study-controls'},
      h('label', {htmlFor: 'foundation-prep-city'}, '第22期上课城市',
        h('select', {id: 'foundation-prep-city', value: plan?.city ?? '', onChange: selectCity},
          h('option', {value: ''}, '请选择城市'),
          cohort.cities.map(({city}) => h('option', {key: city, value: city}, city))))),
    h('p', {role: 'status'}, plan ?
      h(React.Fragment, null,
        plan.city, '首日面授为 ', h('time', {dateTime: plan.firstClass}, plan.firstClass), '。 ',
        plan.days < 0 ? '首日面授已过。已开课的学员可从课间复习继续。' :
        plan.days === 0 ? '今天开课。有时间可先看下方三个概念。' :
        `按北京时间距开课 ${plan.days} 天。${plan.pace ? `可在下方选用 ${plan.pace} 周节奏。` : '时间不足四周，可以从下方三个概念开始。'}`) :
      '选择城市后查看首日面授日期和建议。'),
    plan && plan.days >= 0 && !plan.pace ? h(React.Fragment, null,
      h('p', null, '每次先读一个概念，再用自己的话说一遍。遇到拿不准的地方，记下来带去课堂。'),
      h('div', {className: 'button-row'}, essentials.map(([target, title]) =>
        h('button', {key: target, type: 'button', className: 'button secondary', onClick: () => focusFoundationTarget(target)}, title)))) :
      plan && plan.days < 0 ? h('button', {type: 'button', className: 'button secondary', onClick: () => focusFoundationTarget('foundation-cohort-bridge-title')}, '查看第22期课间复习') : null,
    h('p', {className: 'fine-print'}, '日期来自第22期招生资料。查看建议不会调整你的预习节奏、当前周或答题记录。'));
}
