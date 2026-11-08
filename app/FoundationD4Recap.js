import React from 'react';

const cases = [
  {
    title: '起泡酒｜先装瓶，还是先二次发酵？',
    prompt: '对照 Prosecco DOC Spumante 与 Cava。分别说出二次发酵的容器，再排出装瓶和二次发酵的先后顺序。',
    answer: 'Prosecco DOC Spumante 先在密闭耐压罐内二次发酵，再装瓶。Cava 先将加过糖和酵母的基酒装瓶，再在瓶中二次发酵。',
    reviews: [[4, '三种起泡酒']],
  },
  {
    title: '甜度｜波特与冰酒在哪一步留下糖分？',
    prompt: '分别指出一款甜型波特和 Inniskillin Vidal Icewine 2023 获得甜度的关键步骤。一个发生在发酵中，另一个从采收时就开始。',
    answer: '甜型波特在发酵中加入葡萄蒸馏酒，停止发酵并保留尚未被酵母消耗的糖。冰酒以藤上自然冻结的葡萄压榨出浓缩葡萄汁，随后发酵，成酒仍保留残糖。',
    reviews: [[6, '波特酒工艺'], [10, '加拿大冰酒']],
  },
  {
    title: '熟成｜把酵母膜与加热分开记录',
    prompt: '一款 Fino 在酵母膜下熟成，Blandy’s Duke of Clarence 则采用 Estufagem。分别写出两款酒需要核对的熟成条件。',
    answer: 'Fino 要查酵母膜 Flor 下的生物熟成。Duke of Clarence 要查加热发生在罐内的阶段，并把后续木桶熟成单独记录。',
    reviews: [[7, '雪莉熟成'], [8, '马德拉熟成']],
  },
  {
    title: '白诗南｜产区、品种和年份一样，还缺什么？',
    prompt: '两款白诗南都写 Swartland 和 2023。哪份技术表写不锈钢罐发酵，哪份写桶发酵？如果喝起来不同，还要记录哪些信息？',
    answer: 'Swartland Winery 写不锈钢罐发酵，KWV The Mentors 写桶发酵。再分别记录葡萄园、熟成方式和品鉴观察，区分资料所载事实与自己的风格解释。',
    reviews: [[13, '南非白诗南']],
  },
  {
    title: '中国葡萄酒｜酒款能回答哪种产区问题？',
    prompt: '用敖云 2017 和奔富 CWT 521 2022 对照。哪款可先用来查滇西北山地葡萄园？哪款可用来说明跨区混酿，两个品种分别来自哪里？',
    answer: '先用敖云查滇西北山地及多地块原料。奔富技术表列出云南香格里拉赤霞珠和宁夏马瑟兰，适合说明跨区混酿。',
    reviews: [[14, '中国产区定位'], [15, '中国酒款查证']],
  },
];

const h = React.createElement;

export default function FoundationD4Recap({onReview, disabled}) {
  return h('details', {id: 'foundation-d4-recap'},
    h('summary', null, 'D4 综合复盘 · 5 个案例'),
    h('p', null, '每题先写下酒标或资料能确认的信息，再写工艺或产区判断。用原复习单元的技术表核对。'),
    h('p', {className: 'fine-print'}, '书面作答请记在自己的笔记中。展开参考答案不计分。'),
    h('ol', null, cases.map(({title, prompt, answer, reviews}) =>
      h('li', {key: title},
        h('h3', null, title),
        h('p', null, prompt),
        h('details', null, h('summary', null, '展开参考答案'), h('p', null, answer)),
        h('div', {className: 'button-row'}, reviews.map(([number, label]) =>
          h('button', {
            key: number, type: 'button', className: 'button secondary', disabled,
            onClick: () => onReview(number),
          }, `回看第 ${number} 节 · ${label}`)))))));
}
