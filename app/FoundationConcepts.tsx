'use client';

import React from 'react';
import concepts from '../data/foundation-concepts.json';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';

export default function FoundationConcepts() {
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
        </div>
      </section>
    ))}
  </>;
}
