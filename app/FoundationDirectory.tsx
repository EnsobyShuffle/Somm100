import React, {useEffect, useState} from 'react';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import {openReviewRecap} from './FoundationReviewRecap';
import './foundation-study.css';

const learningStages = [
  {target: 'foundation-study-title', title: '课前预习', english: 'Pre-learning'},
  {target: 'foundation-cohort-bridge-title', title: '课间复习', english: 'Mid-course study'},
  {target: 'foundation-assessment-title', title: '考核与结课', english: 'Review and assessment'},
  {target: 'foundation-cohort-title', title: '课程信息与报名', english: 'Information and registration'},
];

export default function FoundationDirectory({onOpen}: {onOpen: (target: string) => void}) {
  return <div className="foundation-directory">
    <h1 id="foundation-directory-title" tabIndex={-1}>SOMM100</h1>
    <nav className="foundation-stage-list" aria-labelledby="foundation-directory-title">
      {learningStages.map(({target, title, english}) =>
        <button type="button" key={target} className="foundation-stage-card" onClick={() => onOpen(target)}>
          <span lang="en">{english}</span><span lang="zh-CN">{title}</span>
        </button>
      )}
    </nav>
    <section className="foundation-articles" aria-labelledby="foundation-articles-title">
      <h2 id="foundation-articles-title">侍酒师100文章</h2>
      <a href="https://www.tyjzk.com/article/30586.html" target="_blank" rel="noopener noreferrer">从【侍酒师100】毕业的年轻人，后来都怎样了？</a>
    </section>
  </div>;
}

const topics = [
  {id: 'd1', title: 'D1 · 种植、酿造与酒标'},
  {id: 'd2', title: 'D2 · 葡萄品种'},
  {id: 'd3', title: 'D3 · 欧洲产区'},
  {id: 'd4', title: 'D4 · 工艺与世界产区'},
];

const resources = [
  {target: 'foundation-bridge-title', title: '21 天自选复习资源'},
  {target: 'foundation-france-title', title: '法国专题复习'},
  {target: 'foundation-sparkling-title', title: '起泡酒练习'},
];

type QuizStatus = {
  prefix:string; answered:number; total:number; review:number; error:string;
  target:{prefix:string; questionId:string; number:number};
};

export function FoundationReviewTopics() {
  const [quizStatuses,setQuizStatuses]=useState<Record<string,QuizStatus>>({});
  useEffect(()=>{
    function updateQuizStatus(event:Event){
      const status=(event as CustomEvent<QuizStatus>).detail;
      if(!topics.some(({id})=>status?.prefix===`foundation-${id}`))return;
      setQuizStatuses(previous=>({...previous,[status.prefix]:status}));
    }
    window.addEventListener('foundation-quiz-status',updateQuizStatus);
    return ()=>window.removeEventListener('foundation-quiz-status',updateQuizStatus);
  },[]);
  return (
    <details className="foundation-review-topics white-panel foundation-study">
        <summary>专题复习与自测</summary>
        <p>每组可直接看提要、做自测或打开案例。第22期逐日教学安排以当期课程方通知为准。</p>
        <p className="fine-print">下方统计来自当前浏览器的综合自测记录。点「复习」进入第一道待复习题；没有待复习题时，可继续上次停留的题目。</p>
        <div className="foundation-directory-grid">
          {topics.map(({id, title}) => {
            const prefix = `foundation-${id}`;
            const recapId = `${prefix}-recap`;
            const status=quizStatuses[prefix];
            return (
              <section className="foundation-directory-topic" key={id} aria-labelledby={`${prefix}-directory-label`}>
                <h3 id={`${prefix}-directory-label`}>{title}</h3>
                <p className="fine-print" role="status">
                  {status ? `已答 ${status.answered} / ${status.total} 题，待复习 ${status.review} 题。` : '正在读取本机作答记录。'}
                  {status?.error && ' 本机记录保存或读取异常，请查看自测提示。'}
                </p>
                {status && <button className="button secondary foundation-directory-resume" type="button"
                  onClick={()=>window.dispatchEvent(new CustomEvent('foundation-return-quiz',{detail:status.target}))}>
                  {status.review ? `复习第 ${status.target.number} 题` : `继续第 ${status.target.number} 题`}
                </button>}
                <div className="foundation-directory-actions">
                  <button className="button secondary" type="button" aria-label={`${title} · 复习提要`}
                    onClick={() => focusFoundationTarget(`${prefix}-title`)}>提要</button>
                  <button className="button secondary" type="button" aria-label={`${title} · 综合自测`}
                    onClick={() => focusFoundationTarget(`${prefix}-quiz-title`)}>自测</button>
                  <button className="button secondary" type="button" aria-label={`${title} · 复盘案例`}
                    aria-controls={recapId} onClick={() => openReviewRecap(recapId)}>案例</button>
                </div>
              </section>
            );
          })}
        </div>
        <div className="foundation-directory-grid">
          {resources.map(({target, title}) => (
            <button className="button secondary" key={target} type="button" onClick={() => focusFoundationTarget(target)}>
              {title}
            </button>
          ))}
        </div>
    </details>
  );
}
