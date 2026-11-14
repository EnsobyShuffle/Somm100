import React from 'react';
import FoundationPrecoursePracticeReturn, {type PracticeReturn} from './FoundationPrecoursePracticeReturn';

const cases = [
  {
    id: 'foundation-label-vintage-check',
    title: '瓶身和网页写着不同年份',
    evidence: [
      ['手中的酒瓶', '云岭酒庄 · 山谷白葡萄酒 · 2022 · 12.5% vol.'],
      ['生产者网页', '同名酒款 · 2023 · 13% vol. · 霞多丽'],
    ],
    question: '为手中的酒填年份和酒精度。品种能否直接用网页上的资料补齐？',
    answer: '记录瓶身上的 2022 和 12.5% vol.。网页对应 2023 年份，手中这瓶的品种先留待核实。找对应 2022 年份的技术资料，再确认品种。',
  },
  {
    id: 'foundation-label-bottler-check',
    title: '正标是品牌，背标写着装瓶方',
    evidence: [
      ['正标', '石径 · 红葡萄酒 · 2021'],
      ['背标', '松河公司装瓶 · 13% vol.'],
    ],
    question: '分别填品牌、装瓶方和生产者。正标和背标各提供了什么？',
    answer: '品牌填「石径」，装瓶方填「松河公司」。两处文字都没有明确说明谁酿造，生产者留待核实。继续查生产者资料或询问供货方。',
  },
  {
    id: 'foundation-label-region-check',
    title: '酒标给了产地，没写品种和干甜',
    evidence: [
      ['正标', '河湾酒庄 · Bordeaux · 2023'],
      ['背标', '白葡萄酒 · 12% vol.'],
    ],
    question: '能直接填哪些字段？看到产地和酒精度后，品种与干甜两栏怎么处理？',
    answer: '可以抄录酒标上的名称、产地 Bordeaux、年份 2023、酒类白葡萄酒和酒精度 12% vol.。品种和干甜先标待查，用对应酒款的技术资料或生产者说明补齐。',
  },
];

export default function FoundationPrecourseLabelPractice({practiceReturn}: {practiceReturn?: PracticeReturn}) {
  return (
    <section aria-labelledby="foundation-precourse-label-title">
      <h3 id="foundation-precourse-label-title">酒标怎么核对</h3>
      <p>以下三组为虚构资料。先把「直接读到」和「还要查」分别记下，再展开核对。</p>
      {cases.map(({id, title, evidence, question, answer}) => (
        <details id={id} key={id}>
          <summary id={id + '-title'}>{title}</summary>
          <dl>
            {evidence.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <p><strong>自查　</strong>{question}</p>
          <details>
            <summary>展开参考判断</summary>
            <p>{answer}</p>
          </details>
          <FoundationPrecoursePracticeReturn caseId={id} practiceReturn={practiceReturn}/>
        </details>
      ))}
    </section>
  );
}
