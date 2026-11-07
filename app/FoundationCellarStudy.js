import React from 'react';

const h = React.createElement;
const cases = [
  {
    name: 'Louis Michel & Fils · Chablis',
    url: 'https://www.louismicheletfils.com/en/chablis-et-petit-chablis',
    note: '自发苹果酸乳酸转化。仅在不锈钢罐中熟成 6–10 个月。该条目没有交代是否带酒泥熟成或搅动酒泥。',
  },
  {
    name: 'Ridge Vineyards · 2023 Estate Chardonnay',
    url: 'https://www.ridgewine.com/wines/2023-estate-chardonnay/',
    note: '桶内酒精发酵，完成苹果酸乳酸转化。发酵后带酒泥熟成 9 个月，使用了新旧橡木桶。该条目没有交代是否搅动酒泥。',
  },
  {
    name: 'Melka Estates · 2023 Mekerra Chardonnay',
    url: 'https://www.melkaestates.com/wines/10_chardonnay',
    note: '桶内酒精发酵，未做苹果酸乳酸转化。在中性法国橡木桶里熟成 19 个月。该条目没有交代是否带酒泥熟成或搅动酒泥。',
  },
];

export default function FoundationCellarStudy() {
  return h('section', {className: 'foundation-cellar-study', 'aria-labelledby': 'foundation-d1-08-cellar-study'},
    h('h4', {id: 'foundation-d1-08-cellar-study'}, '案例练习｜三款霞多丽，三种工艺组合'),
    h('p', null, '读下面的酒庄资料摘要，在笔记里为每款酒分三栏记录：苹果酸乳酸转化、熟成容器、酒泥接触。资料没交代的项目标「未说明」。'),
    h('ul', null, cases.map(item =>
      h('li', {key: item.name},
        h('strong', null, item.name),
        h('p', null, item.note),
        h('a', {href: item.url, target: '_blank', rel: 'noopener noreferrer'}, '查阅酒庄原文 ↗')))),
    h('ol', null,
      h('li', null, '找出一款没有过桶但做了苹果酸乳酸转化的酒，再找出一款过桶但没有做这项转化的酒。'),
      h('li', null, '找出明确记录带酒泥熟成的酒。能从这份资料判断酒庄搅过酒泥吗？'),
      h('li', null, '如果喝到其中一款质地更圆润，你还需要比较哪些信息，才能解释原因？')),
    h('details', null,
      h('summary', null, '核对三个判断'),
      h('ol', null,
        h('li', null, 'Louis Michel 使用不锈钢并完成转化。Melka 使用橡木桶但未做转化。把容器和苹果酸乳酸转化分别记录。'),
        h('li', null, 'Ridge 明确写了带酒泥熟成。搅动酒泥是另一个操作，酒庄资料未说明是否采用。'),
        h('li', null, '这些酒还涉及不同产区、年份条件和熟成安排。可以查酸度、酒精度、桶龄和酒泥接触等线索。仅凭这三款的资料与口感，无法把质地差异归因于某一个工序。'))));
}
