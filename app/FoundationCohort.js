'use client';
import React from 'react';
import data from '../data/foundation-cohort22.json';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import './foundation-study.css';
const h = React.createElement;
const dateLabel = date => date.replaceAll('-', '/');
export default function FoundationCohort() {
  return h('section', {className:'white-panel foundation-study', 'aria-labelledby':'foundation-cohort-title'},
    h('h2', {id:'foundation-cohort-title'}, '第22期｜五城课程安排'),
    h('p', null, '本期为五天线下面授，分三个阶段进行；另有四天产区游学。每日面授时间：' + data.classHours + '。'),
    h('p', {className:'fine-print'}, '以下日期来自第22期招生资料，跨年日期已完整标明。临近开课请向课程方确认；班期日期不等同于逐日教学内容。'),
    h('button', {type:'button', className:'button secondary', onClick:() => focusFoundationTarget('foundation-assessment-title')},
      '查看考核范围与复习索引'),
    h('div', {className:'foundation-cohort-grid'}, data.cities.map(city =>
      h('article', {key:city.city, className:'foundation-cohort-city'},
        h('h3', null, city.city),
        h('dl', null, city.stages.map((dates, i) =>
          h('div', {key:i}, h('dt', null, '第' + ['一','二','三'][i] + '阶段'),
            h('dd', null, dates.map((date, j) => h(React.Fragment, {key:date},
              j > 0 ? '、' : null, h('time', {dateTime:date}, dateLabel(date))))))))))),
    h('h3', null, '产区游学'),
    h('p', null, h('time', {dateTime:data.fieldTrip.start}, dateLabel(data.fieldTrip.start)),
      ' 至 ', h('time', {dateTime:data.fieldTrip.end}, dateLabel(data.fieldTrip.end)), '，共四天。'),
    h('a', {href:data.sourceUrl, target:'_blank', rel:'noopener noreferrer'}, '查看课程招生原文 ↗'),
    h('p', {className:'fine-print'}, data.sourceLabel + '；原文链接可能需要在微信内查看。')
  );
}
