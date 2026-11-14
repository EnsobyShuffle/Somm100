import React from 'react';
import FoundationPrecoursePracticeReturn, {type PracticeReturn} from './FoundationPrecoursePracticeReturn';

const contrasts = [
  {
    id: 'foundation-style-fruit-sweetness',
    title: '果香明显，入口就甜吗？',
    notes: '一杯白葡萄酒闻起来像熟桃，入口后几乎没有甜感。',
    question: '把「熟桃」与「几乎没有甜感」分别记在哪一栏？',
    answer: '熟桃记在香气栏，入口甜感记在甜度栏。若要确认这瓶酒的残糖量，查酒款技术资料。',
  },
  {
    id: 'foundation-style-acidity-tannin',
    title: '嘴里生津和牙龈发干，可以同时出现吗？',
    notes: '一杯红葡萄酒入口后让人口中生津，随后牙龈有明显收敛感。',
    question: '用两个不同的词记录这两种感受。',
    answer: '生津可作为酸度的线索，牙龈收敛可作为单宁的线索。把两项分别记录，同一杯酒可以兼有鲜明酸感和明显涩感。',
  },
  {
    id: 'foundation-style-body-alcohol',
    title: '酒精度相同，酒体一定一样吗？',
    notes: '两瓶都标示 13% vol.。甲入口轻盈，乙入口更饱满。',
    question: '分别记录两瓶的标示酒精度和口中酒体。还可以查什么来解释差异？',
    answer: '两瓶的标示酒精度都记 13% vol.，酒体分别记轻盈和较饱满。若要解释差异，再查品种、成熟度或酒泥接触等酿造信息。',
  },
];

export default function FoundationPrecourseStylePractice({practiceReturn}: {practiceReturn?: PracticeReturn}) {
  return (
    <section aria-labelledby="foundation-precourse-style-title">
      <h3 id="foundation-precourse-style-title">把三组风格词分开记</h3>
      <p>先用虚构的品尝记录练习描述。每次只写你实际观察到的信息。</p>
      {contrasts.map(({id, title, notes, question, answer}) => (
        <details key={id} id={id}>
          <summary id={id + '-title'}>{title}</summary>
          <p>{notes}</p>
          <p><strong>自查　</strong>{question}</p>
          <details>
            <summary>展开参考描述</summary>
            <p>{answer}</p>
          </details>
          <FoundationPrecoursePracticeReturn caseId={id} practiceReturn={practiceReturn}/>
        </details>
      ))}
    </section>
  );
}
