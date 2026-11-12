'use client';

import React from 'react';
import concepts from '../data/foundation-concepts.json';
import grapes from '../data/foundation-grapes.json';
import FoundationPrecourseEvidencePractice from './FoundationPrecourseEvidencePractice.js';
import FoundationPrecourseLabelPractice from './FoundationPrecourseLabelPractice';
import FoundationPrecoursePlacePractice from './FoundationPrecoursePlacePractice';
import FoundationPrecourseStylePractice from './FoundationPrecourseStylePractice';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';

type ReviewReturn = {conceptId: string; onReturn: () => void};
type PracticeReturn = {caseId: string; onReturn: () => void};

export default function FoundationConcepts({reviewReturn, practiceReturn}: {reviewReturn?: ReviewReturn; practiceReturn?: PracticeReturn}) {
  return <>
    <section className="white-panel" aria-labelledby="foundation-concept-index">
      <h3 id="foundation-concept-index">学习目录</h3>
      <ol>
        {concepts.map(({id, title}) => (
          <li key={id}><a href={`#${id}`} onClick={event => {
            event.preventDefault();
            focusFoundationTarget(id);
          }}>{title}</a></li>
        ))}
      </ol>
      <p className="fine-print">每节先读概念，再做一道口头自查。延伸阅读打开公众号原文，可能需要在微信中查看。</p>
    </section>
    {concepts.map(({id, title, intro, example, question, answer, articles}, index) => (
      <section className="foundation-chapter foundation-study" id={id} key={id} aria-labelledby={`${id}-title`}>
        <span className="eyebrow">课前学习 · {index + 1} / {concepts.length}</span>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
        <p>{example}</p>
        {(id === 'foundation-2' || id === 'foundation-3') && <FoundationPrecourseEvidencePractice conceptId={id} practiceReturn={practiceReturn}/>}
        {id === 'foundation-4' && <FoundationPrecourseStylePractice/>}
        {id === 'foundation-5' && (
          <section aria-labelledby="foundation-grape-cards-title">
            <h3 id="foundation-grape-cards-title">六个品种怎么比较</h3>
            <p>先选两个品种，按结构、气候、酿造和产区各记一条。再试着口头回答卡片里的问题。</p>
            {grapes.map(({id: grapeId, name, structure, climate, winemaking, regions, check}) => (
              <details id={`foundation-grape-${grapeId}`} key={grapeId}>
                <summary>{name}</summary>
                <dl>
                  <dt>结构</dt><dd>{structure}</dd>
                  <dt>气候与成熟度</dt><dd>{climate}</dd>
                  <dt>酿造选择</dt><dd>{winemaking}</dd>
                  <dt>经典产区</dt><dd>{regions}</dd>
                </dl>
                <p><strong>口头自查　</strong>{check}</p>
              </details>
            ))}
          </section>
        )}
        {id === 'foundation-6' && <FoundationPrecoursePlacePractice/>}
        {id === 'foundation-7' && <FoundationPrecourseLabelPractice/>}
        {articles.length > 0 && <>
          <h3>继续阅读</h3>
          <ul>
            {articles.map(({title, url, whyRead}) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">{title} ↗</a>
                <p className="fine-print">为什么看：{whyRead}</p>
              </li>
            ))}
          </ul>
        </>}
        <p><strong>口头自查　</strong>{question}</p>
        <details>
          <summary>查看参考答案</summary>
          <p>{answer}</p>
        </details>
        <div className="button-row">
          <button type="button" className="button secondary" onClick={() => focusFoundationTarget('foundation-study-title')}>回到本周预习</button>
          {reviewReturn?.conceptId === id && (
            <button type="button" className="button secondary" onClick={reviewReturn.onReturn}>回到刚才的准备度题</button>
          )}
        </div>
      </section>
    ))}
  </>;
}
