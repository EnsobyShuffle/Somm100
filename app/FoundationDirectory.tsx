import React from 'react';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import './foundation-study.css';

const stages = [
  {target: 'foundation-study-title', title: '课前预习', description: '选 4 周或 8 周，从基础概念读起。'},
  {target: 'foundation-cohort-bridge-title', title: '课间复习', description: '选第22期上课城市，查看两阶段之间的复习建议。'},
  {target: 'foundation-assessment-title', title: '考核与结课', description: '查看复习索引、情境自练和证书说明。'},
  {target: 'foundation-cohort-title', title: '五城班期与报名', description: '查面授日期、老师、学费和报名表。'},
];

const topics = [
  {target: 'foundation-bridge-title', title: '21 天课堂间学习路径'},
  {target: 'foundation-d1-title', title: 'D1 课堂后复习'},
  {target: 'foundation-d1-quiz-title', title: 'D1 综合自测'},
  {target: 'foundation-d2-title', title: 'D2 葡萄品种复习'},
  {target: 'foundation-d2-quiz-title', title: 'D2 综合自测'},
  {target: 'foundation-france-title', title: '法国专题复习'},
  {target: 'foundation-d3-title', title: 'D3 欧洲产区'},
  {target: 'foundation-d3-quiz-title', title: 'D3 综合自测'},
  {target: 'foundation-d4-title', title: 'D4 工艺与世界产区'},
  {target: 'foundation-d4-quiz-title', title: 'D4 综合自测'},
  {target: 'foundation-sparkling-title', title: '起泡酒练习'},
];

export default function FoundationDirectory() {
  return (
    <nav className="white-panel foundation-study foundation-directory" aria-labelledby="foundation-directory-title">
      <h2 id="foundation-directory-title">课程导览</h2>
      <div className="foundation-directory-grid">
        {stages.map(({target, title, description}) => (
          <button className="button secondary" key={target} type="button" onClick={() => focusFoundationTarget(target)}>
            <strong>{title}</strong>
            <span>{description}</span>
          </button>
        ))}
      </div>
      <details>
        <summary>展开专题复习与自测</summary>
        <p>按主题选读。第22期逐日教学安排以当期课程方通知为准。</p>
        <div className="foundation-directory-grid">
          {topics.map(({target, title}) => (
            <button className="button secondary" key={target} type="button" onClick={() => focusFoundationTarget(target)}>
              {title}
            </button>
          ))}
        </div>
      </details>
    </nav>
  );
}
