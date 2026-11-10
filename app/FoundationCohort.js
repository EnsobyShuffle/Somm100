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
    h('p', null, '课堂范围包括葡萄种植与酿造、葡萄酒产区和品鉴，也涵盖烈酒、清酒等酒水，以及侍酒服务、餐酒搭配、酒单设计和酒窖管理。'),
    h('p', {className:'fine-print'}, '以下为第22期招生资料列出的面授日期，按实际先后编号。教学主题、考核日与教室安排以课程方通知为准。'),
    h('div', {className:'button-row'},
      h('button', {type:'button', className:'button secondary', onClick:() => focusFoundationTarget('foundation-registration-title')},
        '查看学费与报名'),
      h('button', {type:'button', className:'button secondary', onClick:() => focusFoundationTarget('foundation-cohort-bridge-title')},
        '查看第22期课间复习'),
      h('button', {type:'button', className:'button secondary', onClick:() => focusFoundationTarget('foundation-cohort-field-trip-title')},
        '查看产区游学'),
      h('button', {type:'button', className:'button secondary', onClick:() => focusFoundationTarget('foundation-assessment-title')},
        '查看考核范围与复习索引')),
    h('p', null, `课程设计由 ${data.courseDesigner} 负责，课程顾问为 ${data.courseAdvisor}。`),
    h('div', {className:'foundation-cohort-grid'}, data.cities.map(city => {
      const stages = city.stages.map((dates, i) => {
        const firstDay = city.stages.slice(0, i).flat().length + 1;
        return h('div', {key:i},
          h('dt', null, '第' + ['一','二','三'][i] + '阶段'),
          h('dd', null, h('ul', {className:'foundation-cohort-days'}, dates.map((date, j) =>
            h('li', {key:date}, `第 ${firstDay + j} 天`, h('time', {dateTime:date}, dateLabel(date)))))));
      });
      return h('article', {key:city.city, className:'foundation-cohort-city'},
        h('h3', null, city.city),
        h('p', null, h('strong', null, '主讲老师／班主任'), h('br'),
          h('span', {className:'foundation-cohort-instructor'}, city.instructor), ' · AS (CMS)'),
        h('p', {className:'fine-print'}, city.bio),
        h('dl', null, stages));
    })),
    h('section', {className:'foundation-week', 'aria-labelledby':'foundation-cohort-field-trip-title'},
      h('h3', {id:'foundation-cohort-field-trip-title'}, '产区游学'),
      h('p', null, h('time', {dateTime:data.fieldTrip.start}, dateLabel(data.fieldTrip.start)),
        ' 至 ', h('time', {dateTime:data.fieldTrip.end}, dateLabel(data.fieldTrip.end)), `，共 ${data.fieldTrip.days} 天。`),
      h('p', null, '第22期招生资料列明，游学安排在理论学习之后。课程方提供三晚住宿和餐饮，学员自理往返交通费用。'),
      h('details', {id:'foundation-cohort-field-trip-review'},
        h('summary', null, '游学观察练习｜从葡萄园追到酒杯'),
        h('p', null, '选一款现场有资料可查的酒，用三条笔记把原料、工艺与杯中观察连起来。'),
        h('ol', null,
          h('li', null, '葡萄园。记下一个可观察的细节，如地块位置或葡萄品种，再问原料是否确实来自这块地。'),
          h('li', null, '酒窖。记下酒庄说明的一项酿造或熟成选择，确认它是否用在你选的这款酒上。'),
          h('li', null, '酒杯。记下一个闻到或尝到的特征，说明你认为它可能与哪条线索有关，以及还缺什么证据。')),
        h('p', {className:'fine-print'}, '这是自选练习。集合地点、参访酒庄和行程细节以课程方通知为准。'))),
    h('h3', {id:'foundation-registration-title'}, '第22期｜学费与报名'),
    h('dl', {className:'foundation-cohort-tuition'}, data.tuition.map(option =>
      h('div', {key:option.label}, h('dt', null, option.label),
        h('dd', null, yuan.format(option.amountCny), ' 人民币')))),
    h('p', {id:'foundation-cohort-payment'}, `第22期招生资料列明，报名时先付 ${yuan.format(data.payment.initialCny)}，余款须在${data.payment.balanceDue}结清，产区游学在${data.payment.fieldTripCondition}。`),
    h('p', {className:'fine-print'}, '班级名额、考试日期、收款渠道和退款安排请向课程方确认。'),
    h('a', {className:'foundation-cohort-registration', href:data.registrationUrl, target:'_blank', rel:'noopener noreferrer'},
      '打开第22期报名表（Microsoft Forms） ↗'),
    h('br'),
    h('a', {href:data.sourceUrl, target:'_blank', rel:'noopener noreferrer'}, '查看课程招生原文 ↗'),
    h('p', {className:'fine-print'}, data.sourceLabel + '；原文链接可能需要在微信内查看。')
  );
}
