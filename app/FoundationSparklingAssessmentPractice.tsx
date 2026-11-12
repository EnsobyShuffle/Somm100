import React from 'react';

const steps = [
  {
    id: 'foundation-sparkling-assessment-blind',
    title: '盲品｜先记观察',
    task: '甲杯闻到柠檬皮和烤面包，乙杯以梨和白花为主。分别写下两杯的观察，再为甲杯写一个可能的解释和一个待查问题。',
    answer: '把柠檬皮、烤面包、梨和白花记为观察。甲杯的烤面包气息可能与酒泥接触有关。可查酒泥接触时间和酿造记录，仅凭这些香气还无法确认二次发酵容器。',
  },
  {
    id: 'foundation-sparkling-assessment-written',
    title: '笔试｜核对工艺记录',
    task: '完成盲品记录后再展开。按模拟记录指出两款酒的二次发酵容器，再写一项仍无法确认的风格差异。',
    record: '甲｜基酒装瓶后密封，再次发酵，之后与酒泥一起熟成。乙｜基酒在耐压罐中再次发酵，之后再装瓶。两份记录都未注明成酒残糖。',
    answer: '甲的二次发酵容器是瓶，乙是罐。要比较甜度，可再查成酒残糖或甜度标示。',
  },
  {
    id: 'foundation-sparkling-assessment-oral',
    title: '口试｜向同伴解释',
    task: '用三句话说清楚两款酒的共同点、工艺差异和一个需要查证的风格判断。请同伴追问：只喝一口就能确认用的哪种工艺吗？',
    answer: '两款酒的气泡都来自密闭条件下的二次发酵。甲在瓶中进行，乙在罐中进行，依据是模拟工艺记录。品鉴可以提供线索，确认容器和判断成酒甜度还需要分别核对工艺资料和甜度证据。',
  },
];

export default function FoundationSparklingAssessmentPractice() {
  return (
    <section className="foundation-week" aria-labelledby="foundation-sparkling-assessment-title">
      <h4 id="foundation-sparkling-assessment-title">起泡酒综合自练｜从观察到解释</h4>
      <p>按盲品、笔试、口试的顺序练习。同一组虚构样本贯穿三项练习，可独立完成，也可请同伴提问。</p>
      <ol>
        {steps.map(({id, title, task, record, answer}) => (
          <li key={id}>
            <h5>{title}</h5>
            <p>{task}</p>
            {record && <details id={`${id}-record`}>
              <summary>展开模拟工艺记录</summary>
              <p>{record}</p>
            </details>}
            <details id={id}>
              <summary>展开参考判断</summary>
              <p>{answer}</p>
            </details>
          </li>
        ))}
      </ol>
      <p className="fine-print">本练习用于课间复习。正式题目、考试时段与评分以课程方通知为准。</p>
    </section>
  );
}
