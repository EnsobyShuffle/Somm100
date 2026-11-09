'use client';
import React from 'react';
import data from '../data/foundation-cohort22.json';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import './foundation-study.css';
const h = React.createElement;
const dateLabel = date => date.replaceAll('-', '/');
const yuan = new Intl.NumberFormat('zh-CN', {style:'currency', currency:'CNY', maximumFractionDigits:0});
export default function FoundationCohort() {
  return h('section', {className:'white-panel foundation-study', 'aria-labelledby':'foundation-cohort-title'},
    h('h2', {id:'foundation-cohort-title'}, '第22期｜五城课程安排'),
    h('p', null, '适合准备进入侍酒师行业的学习者，以及希望提升酒水知识和服务能力的餐饮从业者。零基础学员可从课前导学开始。'),
    h('p', null, `本期有 ${data.teachingDays} 天线下面授，分三个阶段，另有 ${data.fieldTrip.days} 天产区游学。面授每天 ${data.classHours}，以中文授课，辅以英语。`),
    h('p', {className:'fine-print'}, '以下日期来自第22期招生资料，跨年日期已完整标明。临近开课请向课程方确认；班期日期不等同于逐日教学内容。'),
    h('div', {className:'button-row'},
      h('button', {type:'button', className:'button secondary', onClick:() => focusFoundationTarget('foundation-registration-title')},
        '查看学费与报名'),
      h('button', {type:'button', className:'button secondary', onClick:() => focusFoundationTarget('foundation-cohort-bridge-title')},
        '查看第22期课间复习'),
      h('button', {type:'button', className:'button secondary', onClick:() => focusFoundationTarget('foundation-assessment-title')},
        '查看考核范围与复习索引')),
    h('p', null, `课程设计由 ${data.courseDesigner} 负责，课程顾问为 ${data.courseAdvisor}。`),
    h('div', {className:'foundation-cohort-grid'}, data.cities.map(city =>
      h('article', {key:city.city, className:'foundation-cohort-city'},
        h('h3', null, city.city),
        h('p', null, h('strong', null, '主讲老师／班主任'), h('br'),
          h('span', {className:'foundation-cohort-instructor'}, city.instructor), ' · AS (CMS)'),
        h('p', {className:'fine-print'}, city.bio),
        h('dl', null, city.stages.map((dates, i) =>
          h('div', {key:i}, h('dt', null, '第' + ['一','二','三'][i] + '阶段'),
            h('dd', null, dates.map((date, j) => h(React.Fragment, {key:date},
              j > 0 ? '、' : null, h('time', {dateTime:date}, dateLabel(date))))))))))),
    h('h3', null, '产区游学'),
    h('p', null, h('time', {dateTime:data.fieldTrip.start}, dateLabel(data.fieldTrip.start)),
      ' 至 ', h('time', {dateTime:data.fieldTrip.end}, dateLabel(data.fieldTrip.end)), `，共 ${data.fieldTrip.days} 天。`),
    h('h3', {id:'foundation-registration-title'}, '第22期｜学费与报名'),
    h('dl', {className:'foundation-cohort-tuition'}, data.tuition.map(option =>
      h('div', {key:option.label}, h('dt', null, option.label),
        h('dd', null, yuan.format(option.amountCny), ' 人民币')))),
    h('p', {className:'fine-print'}, '学费为第22期招生资料所列金额。班级名额、付款和退款安排请向课程方确认。'),
    h('a', {className:'foundation-cohort-registration', href:data.registrationUrl, target:'_blank', rel:'noopener noreferrer'},
      '打开第22期报名表（Microsoft Forms） ↗'),
    h('br'),
    h('a', {href:data.sourceUrl, target:'_blank', rel:'noopener noreferrer'}, '查看课程招生原文 ↗'),
    h('p', {className:'fine-print'}, data.sourceLabel + '；原文链接可能需要在微信内查看。')
  );
}
