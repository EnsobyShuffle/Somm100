import React from 'react';
import FoundationPrecoursePracticeReturn, {type PracticeReturn} from './FoundationPrecoursePracticeReturn';

const exercises = [
  {
    id: 'foundation-place-scale',
    title: '法国、卢瓦尔河谷、桑塞尔，分别放在哪一级？',
    clues: '资料卡给了三个名字：桑塞尔（Sancerre）、法国、卢瓦尔河谷（Loire Valley）。',
    question: '从大到小排好这三个名字。桑塞尔可以填在葡萄园一栏吗？',
    answer: '先写国家法国，再写大产区卢瓦尔河谷，最后写其中更具体的产地桑塞尔。桑塞尔是产区名。资料卡没有给出某一座葡萄园。',
  },
  {
    id: 'foundation-place-climate',
    title: '同在法国，为什么波尔多和南罗讷河谷要分开看？',
    clues: '波尔多在法国西南部，受大西洋影响。南罗讷河谷更靠近地中海，整体更温暖干燥。',
    question: '各写一个需要查的成熟季问题。只有产区位置，能判断某瓶酒的实际风格吗？',
    answer: '在波尔多可先查成熟和采收季的降雨时点，在南罗讷河谷可先查高温和水分条件。判断具体酒款时，再核对年份、品种、园址和酿造。',
  },
  {
    id: 'foundation-place-label-conventions',
    title: '一张正标突出地名，另一张突出品种',
    clues: '虚构标签甲突出「夏布利（Chablis）」。乙突出「霞多丽」，背标另有产地。',
    question: '从哪里开始读两张标签？哪一张已经把品种直接写在正标上？',
    answer: '甲先把夏布利记作地名，再查该产地与品种的关系。乙可直接记录霞多丽，再从背标核实产地。标签上最醒目的文字只决定阅读起点，仍要读完正背标。',
  },
];

export default function FoundationPrecoursePlacePractice({practiceReturn}: {practiceReturn?: PracticeReturn}) {
  return (
    <section aria-labelledby="foundation-precourse-place-title">
      <h3 id="foundation-precourse-place-title">读到一个地名，先查什么？</h3>
      <p>用法国做第一次练习。先认出地理层级，再把产地线索和酒款资料连起来。</p>
      {exercises.map(({id, title, clues, question, answer}) => (
        <details key={id} id={id}>
          <summary id={id + '-title'}>{title}</summary>
          <p>{clues}</p>
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
