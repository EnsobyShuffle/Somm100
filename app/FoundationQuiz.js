'use client';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import React, {useEffect, useRef, useState} from 'react';
import {quizProgressData, quizResult, quizReviewTargets, quizReturnQuestion} from '../lib/foundation-quiz.mjs';
import {emptyD2Progress, readD2Progress, writeD2Progress} from '../lib/foundation-d2.mjs';
import {recordFoundationAnswer, foundationOptions} from '../lib/foundation-study.mjs';
import './foundation-study.css';

const h = React.createElement;
export default function FoundationQuiz({data, reviews, storageKey, prefix}) {
  const progressData = React.useMemo(() => quizProgressData(data), [data]);
  const [progress, setProgress] = useState(emptyD2Progress);
  const navigationRequested = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let result;
    try { result = readD2Progress(window.localStorage, progressData, storageKey); }
    catch { result = readD2Progress(null, progressData, storageKey); }
    setProgress(result.progress); setCanSave(result.canSave); setError(result.error); setLoaded(true);
  }, [progressData, storageKey]);
  useEffect(() => {
    if (!loaded || !canSave) return;
    try { setError(writeD2Progress(window.localStorage, progress, storageKey)); }
    catch { setError('本机保存失败，请勿关闭当前页面。'); }
  }, [progress, loaded, canSave, storageKey]);
  useEffect(() => {
    function returnToQuiz(event) {
      if(!loaded)return;
      const target=quizReturnQuestion(data,prefix,event.detail);
      if(!target)return;
      setProgress(p=>({...p,unit:target.number}));
      window.requestAnimationFrame(()=>{
        focusFoundationTarget(prefix+'-quiz-title');
      });
    }
    window.addEventListener('foundation-return-quiz',returnToQuiz);
    return ()=>window.removeEventListener('foundation-return-quiz',returnToQuiz);
  },[data,prefix,loaded]);
  const question = data.questions.find(q => q.number === progress.unit) || data.questions[0];
  const entry = progress.answers[question.id];
  const result = quizResult(data, progress);
  const groups = [...new Set(data.questions.map(q => q.group))];
  useEffect(() => {
    if (!navigationRequested.current) return;
    navigationRequested.current = false;
    focusFoundationTarget(prefix+'-quiz-title');
  }, [question.id, prefix]);
  function choose(number) {
    if (number === question.number) return;
    navigationRequested.current = true;
    setProgress(p => ({...p,unit:number}));
  }
  return h('section', {id:prefix+'-quiz',className:'white-panel foundation-study','aria-labelledby':prefix+'-quiz-title'},
    h('h2', {id:prefix+'-quiz-title',tabIndex:-1}, data.title),
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
    h('div', {className:'button-row'}, quizReviewTargets(question, reviews, prefix).map(target=>{
      return h('button', {key:target.unitId,type:'button',className:'button secondary',disabled:!loaded,onClick:()=>{
        window.dispatchEvent(new CustomEvent('foundation-open-review',{detail:{prefix:target.prefix,unitId:target.unitId,returnTo:{prefix,questionId:question.id,number:question.number}}}));
      }}, '复习｜'+target.title);
    })),
    h('div', {className:'button-row'},
      h('button',{type:'button',className:'button secondary',disabled:!loaded||question.number===1,onClick:()=>choose(question.number-1)},'上一题'),
      h('button',{type:'button',className:'button secondary',disabled:!loaded||question.number===data.questions.length,onClick:()=>choose(question.number+1)},'下一题'),
      h('button',{type:'button',className:'button secondary',disabled:!loaded||!result.needsReview.length,onClick:()=>choose(result.needsReview.find(n=>n>question.number)||result.needsReview[0])},'下一道待复习题')));
}
