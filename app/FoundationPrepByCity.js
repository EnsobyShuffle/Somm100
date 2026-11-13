'use client';
import React from 'react';
import cohort from '../data/foundation-cohort22.json';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import {foundationPrepWindow} from '../lib/foundation-study.mjs';

const h = React.createElement;
const essentials = [
  {
    id: 'foundation-prep-quick-process',
    target: 'foundation-1',
    title: '从葡萄到酒',
    prompt: '记录写着「果串仍在藤上」「葡萄送到酒窖」「酒已装瓶」。按顺序念一遍，再说出哪两条记录之间发生了采收。',
    answer: '先在藤上生长，再采收并送入酒窖，经过酿造后才装瓶。采收发生在「果串仍在藤上」和「葡萄送到酒窖」之间。',
  },
  {
    id: 'foundation-prep-quick-style',
    target: 'foundation-4',
    title: '把风格线索分开记',
    prompt: '一段试饮笔记写着「闻到柠檬，入口酸感明显，口中感觉轻盈」。把三条观察分别归入香气、酸度和酒体，再看甜度一栏能否填写。',
    answer: '柠檬记在香气栏，酸感明显记在酸度栏，轻盈记在酒体栏。甜度暂留空，等试饮者描述甜感或查到对应酒款资料后再填。',
  },
  {
    id: 'foundation-prep-quick-label',
    target: 'foundation-7',
    title: '用酒标确认信息',
    prompt: '一张虚构正标写着「青丘酒庄 · 红葡萄酒 · 2022 · 13% vol.」。指出年份和酒精度。如果同学问葡萄来自哪里，你会翻看或查找哪份资料？',
    answer: '年份标为 2022，酒精度标为 13% vol.。先查完整正标和背标的产地标示，仍找不到就核对同一酒款和年份的生产者资料。',
  },
];

export default function FoundationPrepByCity({cityName, onCityChange}) {
  const city = cohort.cities.find(entry => entry.city === cityName);
  const firstClass = city?.stages[0][0];
  const plan = firstClass ? foundationPrepWindow(firstClass) : null;

  return h('section', {'aria-labelledby': 'foundation-prep-city-title'},
    h('h3', {id: 'foundation-prep-city-title'}, '按开课城市安排预习'),
    h('div', {className: 'foundation-study-controls'},
      h('label', {htmlFor: 'foundation-prep-city'}, '第22期上课城市',
        h('select', {id: 'foundation-prep-city', value: cityName, onChange: event => onCityChange(event.target.value)},
          h('option', {value: ''}, '请选择城市'),
          cohort.cities.map(({city}) => h('option', {key: city, value: city}, city))))),
    h('p', {role: 'status'}, plan ?
      h(React.Fragment, null,
        cityName, '首日面授为 ', h('time', {dateTime: firstClass}, firstClass), '。 ',
        plan.days < 0 ? '首日面授已过。已开课的学员可从课间复习继续。' :
        plan.days === 0 ? '今天开课。有时间可先做下方短自查。' :
        `按北京时间距开课 ${plan.days} 天。${plan.pace ? `可在下方选用 ${plan.pace} 周节奏。` : '时间不足四周，可以从下方短自查开始。'}`) :
      '选择城市后查看首日面授日期和建议。'),
    plan && plan.days >= 0 && !plan.pace ? h(React.Fragment, null,
      h('p', null, '任选一题，先用自己的话作答，再展开参考判断。把拿不准的地方记下来，带去课堂。'),
      h('ol', null, essentials.map(({id, target, title, prompt, answer}) =>
        h('li', {key: id},
          h('h4', null, title),
          h('p', null, prompt),
          h('details', {id}, h('summary', null, '展开参考判断'), h('p', null, answer)),
          h('button', {type: 'button', className: 'button secondary', onClick: () => focusFoundationTarget(target)}, `回看｜${title}`))))) :
      plan && plan.days < 0 ? h('button', {type: 'button', className: 'button secondary', onClick: () => focusFoundationTarget('foundation-cohort-bridge-title')}, '查看第22期课间复习') : null,
    h('p', {className: 'fine-print'}, '日期来自第22期招生资料。查看建议不会调整你的预习节奏、当前周或答题记录。'));
}
