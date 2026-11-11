import React from 'react';

const cases = [
  {
    id: 'foundation-written-chardonnay',
    title: '霞多丽｜哪些风格差异能从工艺记录解释？',
    prefix: 'foundation-d2',
    unitId: 'foundation-d2-02',
    reviewLabel: '回看霞多丽的风格变量',
    records: [
      ['甲批', '同一地块、同一日采收。未做苹果酸乳酸转化，分离酒泥后在不锈钢罐熟成。试饮时酸感鲜明。'],
      ['乙批', '与甲批使用同批葡萄汁。完成苹果酸乳酸转化，在不锈钢罐中接触细酒泥熟成。试饮时酸感较柔和，口感较圆润。'],
    ],
    questions: [
      '写出两批酒已知的两个工艺差别，以及一个共同的熟成条件。',
      '分别给乙批的酸感和质地提出一个有记录支持的解释。',
      '想检验细酒泥接触对质地的影响，应怎样重新安排两批的工艺？',
    ],
    answers: [
      '两批的苹果酸乳酸转化和细酒泥接触安排不同，熟成容器都是不锈钢罐。',
      '苹果酸乳酸转化可能让酸感柔和。细酒泥接触可能增加质地的饱满感。两项工艺同时变化，现有记录无法单独分辨各自的贡献。',
      '把同批基酒分开，统一苹果酸乳酸转化、熟成容器与时长，只改变细酒泥接触，再用同样条件对照品尝。',
    ],
  },
  {
    id: 'foundation-written-santorini-tokaj',
    title: '圣托里尼与托卡伊｜地名、品种、风格如何分栏？',
    prefix: 'foundation-d3',
    unitId: 'foundation-d3-13',
    reviewLabel: '回看希腊与匈牙利',
    records: [
      ['甲瓶', '酒标写 Santorini 与 Assyrtiko。种植记录写有传统篮状整枝。'],
      ['乙瓶', '酒标写 Tokaj 与 Furmint。手头照片缺少背标与干甜说明。'],
    ],
    questions: [
      '给两瓶各写一组国家、产地、葡萄品种。',
      '甲的整枝方式能帮助种植者应对哪种环境条件？这条记录应写在哪一栏？',
      '乙的干甜现在能填什么？写出可以继续核对的资料。',
    ],
    answers: [
      '甲是希腊、圣托里尼、Assyrtiko。乙是匈牙利、托卡伊、Furmint。',
      '篮状整枝可帮助葡萄应对当地的强风。这一项写进葡萄园管理栏。',
      '乙的干甜暂记待查。托卡伊有以 Furmint 酿成的干白，也有甜酒。继续核对这瓶酒的完整标签、具体酒款和对应技术资料。',
    ],
  },
  {
    id: 'foundation-written-fortification',
    title: '加强酒｜同样的酒精度，糖分从哪里来？',
    prefix: 'foundation-d4',
    unitId: 'foundation-d4-05',
    reviewLabel: '回看加强时机与甜度',
    records: [
      ['甲批', '葡萄汁仍有可发酵糖时加入葡萄蒸馏酒，中止发酵。记录显示后续没有调甜。成酒标示 19% vol.。'],
      ['乙批', '基酒先发酵至干，再加入葡萄蒸馏酒，之后调入有甜度的酒液。成酒也标示 19% vol.。'],
    ],
    questions: [
      '分别把两批的发酵、加强和调配步骤按先后顺序写出来。',
      '甲与乙成酒中的甜度各有哪一项工艺来源？',
      '要比较两瓶每升所含残糖，下一步查什么？',
    ],
    answers: [
      '甲在发酵中途加强，随后不调甜。乙先发酵至干，再加强，之后调入有甜度的酒液。',
      '甲保留一部分原来未被发酵消耗的葡萄糖分。乙从后续调入的酒液获得甜度。',
      '核对两款成酒对应批次的残糖数据或检测结果。两张标签的 19% vol. 只提供标示酒精度。',
    ],
  },
];

export default function FoundationWrittenPractice() {
  return (
    <section aria-labelledby="foundation-written-more-title">
      <h5 id="foundation-written-more-title">再练三题</h5>
      <p>资料卡均为虚构。每题先写判断和依据，再展开答案核对。</p>
      {cases.map(({id, title, prefix, unitId, reviewLabel, records, questions, answers}) => (
        <details id={id} key={id}>
          <summary>{title}</summary>
          <dl>
            {records.map(([label, record]) => (
              <div key={label}><dt>{label}</dt><dd>{record}</dd></div>
            ))}
          </dl>
          <ol>{questions.map(question => <li key={question}>{question}</li>)}</ol>
          <details>
            <summary>展开参考答案</summary>
            <ol>{answers.map(answer => <li key={answer}>{answer}</li>)}</ol>
          </details>
          <button
            type="button"
            className="button secondary"
            onClick={() => window.dispatchEvent(new CustomEvent('foundation-open-review', {
              detail: {prefix, unitId},
            }))}
          >{reviewLabel}</button>
        </details>
      ))}
    </section>
  );
}
