'use client';
import React, {useEffect, useState} from 'react';
import data from '../data/foundation-d3-quiz.json';
import reviews from '../data/foundation-d3.json';
import {D3_QUIZ_STORAGE_KEY, quizProgressData, quizResult} from '../lib/foundation-quiz.mjs';
import {emptyD2Progress, readD2Progress, writeD2Progress} from '../lib/foundation-d2.mjs';
import {recordFoundationAnswer, foundationOptions} from '../lib/foundation-study.mjs';
import './foundation-study.css';

const h = React.createElement;
const progressData = quizProgressData(data);
export default function FoundationD3Quiz() {
  const [progress, setProgress] = useState(emptyD2Progress);
  const [loaded, setLoaded] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let result;
    try { result = readD2Progress(window.localStorage, progressData, D3_QUIZ_STORAGE_KEY); }
    catch { result = readD2Progress(null, progressData, D3_QUIZ_STORAGE_KEY); }
    setProgress(result.progress); setCanSave(result.canSave); setError(result.error); setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || !canSave) return;
    try { setError(writeD2Progress(window.localStorage, progress, D3_QUIZ_STORAGE_KEY)); }
    catch { setError('本机保存失败，请勿关闭当前页面。'); }
  }, [progress, loaded, canSave]);
  const question = data.questions.find(q => q.number === progress.unit) || data.questions[0];
  const entry = progress.answers[question.id];
  const result = quizResult(data, progress);
  const groups = [...new Set(data.questions.map(q => q.group))];
  function choose(number) { setProgress(p => ({...p,unit:number})); }
  return h('section', {id:'foundation-d3-quiz',className:'white-panel foundation-study','aria-labelledby':'foundation-d3-quiz-title'},
    h('h2', {id:'foundation-d3-quiz-title'}, data.title),
    h('p', null, '可分段完成，用来发现还需复习的知识点。可随时重答，不设及格线；课堂安排以本期课程为准。'),
    h('p', {className:'fine-print'}, '当前题目与首次／最近答案仅保存在本浏览器，与逐节自查分别保存，不同步到账号或讲师端。'),
    error && h('p', {role:'alert'}, error),
    h('div', {className:'foundation-study-controls'}, h('label', null, '选择题目',
      h('select', {value:question.number,disabled:!loaded,onChange:e=>choose(Number(e.target.value))},
        groups.map(group=>h('optgroup', {key:group,label:group}, data.questions.filter(q=>q.group===group).map(q=>h('option', {key:q.id,value:q.number}, `${q.number}. ${q.prompt}`))))))),
    h('p', {role:'status'}, `已答 ${result.answered} / ${result.total} 题，最近答对 ${result.correct} 题，待复习 ${result.needsReview.length} 题。`),
    h('fieldset', {key:question.id,className:'foundation-question'},
      h('legend', null, `${question.number}. ${question.prompt}`),
      foundationOptions(question).map((index,position)=>h('label', {key:index,className:'foundation-check'},
        h('input', {type:'radio',name:question.id,disabled:!loaded,checked:entry?.latest===index,
          onChange:()=>setProgress(p=>recordFoundationAnswer(p,question,index))}),
        h('span', null, `${String.fromCharCode(65+position)}. ${question.options[index]}`))),
      entry && h('div', {'aria-live':'polite'},
        h('p', null, entry.latest===question.answer?'理解正确。':'需要复习。正确理解为 '+question.options[question.answer]+'。'),
        h('p', null, question.explanation),
        h('p', {className:'fine-print'}, `首次选择：${question.options[entry.first]}；最近选择：${question.options[entry.latest]}`))),
    h('div', {className:'button-row'}, question.unitIds.map(id=>{
      const unit = reviews.units.find(u=>u.id===id);
      return h('button', {key:id,type:'button',className:'button secondary',disabled:!loaded,onClick:()=>{
        window.dispatchEvent(new CustomEvent('foundation-open-review',{detail:{prefix:'foundation-d3',unitId:id}}));
      }}, '复习｜'+unit.title);
    })),
    h('div', {className:'button-row'},
      h('button',{type:'button',className:'button secondary',disabled:!loaded||question.number===1,onClick:()=>choose(question.number-1)},'上一题'),
      h('button',{type:'button',className:'button secondary',disabled:!loaded||question.number===data.questions.length,onClick:()=>choose(question.number+1)},'下一题'),
      h('button',{type:'button',className:'button secondary',disabled:!loaded||!result.needsReview.length,onClick:()=>choose(result.needsReview.find(n=>n>question.number)||result.needsReview[0])},'下一道待复习题')));
}
