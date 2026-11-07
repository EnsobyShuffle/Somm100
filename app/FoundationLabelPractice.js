'use client';
import React from 'react';
import './foundation-study.css';
const h = React.createElement;

const chablisLabelUrl = 'https://www.chablis-wines.com/tasting/the-art-of-tasting/how-to-read-a-label/how-to-read-a-label,1838,7685.html';
const chablisVarietyUrl = 'https://www.chablis-wines.com/discover/a-unique-territory-and-terroir/four-appellations-and-one-varietal/four-appellations-and-one-varietal,1807,7644.html';
const cloudyBayUrl = 'https://www.cloudybay.com/en-us/our-wines/sauvignon-blanc-2025';

function sourceLink(url, label) {
  return h('a', {href:url, target:'_blank', rel:'noopener noreferrer'}, label);
}

export default function FoundationLabelPractice() {
  return h('section', {className:'foundation-label-practice', 'aria-labelledby':'foundation-label-title'},
    h('h4', {id:'foundation-label-title'}, '先读事实，再做判断｜两张酒标信息卡'),
    h('p', null, '以下名称与组合均为虚构练习，不是真实商品或完整合规酒标。先只用卡片上的信息作答；找不到的信息可以写“未标出”，不用猜。'),
    h('div', {className:'foundation-label-grid'},
      h('article', {className:'foundation-label-card'},
        h('h5', null, '卡片 A｜直接写出品种'),
        h('p', {className:'foundation-label-name'}, '山间课堂酒庄'),
        h('p', null, 'CHARDONNAY'), h('p', null, '2023'), h('p', null, '13% vol'),
        h('p', {className:'fine-print'}, '练习摘录：未提供产地、法定产区或等级信息。')),
      h('article', {className:'foundation-label-card'},
        h('h5', null, '卡片 B｜信息还不够'),
        h('p', {className:'foundation-label-name'}, '河畔课堂酒庄'),
        h('p', null, 'WHITE WINE'), h('p', null, '2022'), h('p', null, '12% vol'),
        h('p', {className:'fine-print'}, '练习摘录：未提供品种、产地、法定产区或等级信息。'))),
    h('ol', null,
      h('li', null, '分别记录：生产者、产地、年份、品种、酒精度、法定产区或等级。每项区分“卡片写了什么”和“仍需核实什么”。'),
      h('li', null, '卡片 B 能确定是什么葡萄品种吗？为了继续查证，你还需要找到哪些信息？'),
      h('li', null, 'A 的酒精度较高，B 的年份较早：能据此判断哪瓶更好、哪瓶更甜吗？说明理由。')),
    h('details', null, h('summary', null, '完成后核对酒标练习'),
      h('p', null, 'A 明示生产者名称、Chardonnay、2023 和 13% vol；B 明示生产者名称、白葡萄酒、2022 和 12% vol。年份通常表示葡萄采收年，不等于装瓶年。两张卡片都没有提供产地或等级。'),
      h('p', null, 'B 没有提供品种，不能仅凭 WHITE WINE 或 12% vol 推定。可以继续看背标、产区名称及生产者的产品资料，再把核实的信息与卡片事实分开记录。'),
      h('p', null, '较高酒精度或较早年份都不是品质排名；酒精度也不能单独确定甜度。需要更多产品资料，必要时结合品尝判断。')),
    h('section', {'aria-labelledby':'foundation-label-examples-title'},
      h('h5', {id:'foundation-label-examples-title'}, '再看两个真实例子｜地名和品种怎么读'),
      h('p', null, '先打开资料看图，再按「图上读到／查资料确认／仍不确定」三栏做笔记。图片打不开时，也可以用下面的提示完成对照。'),
      h('div', {className:'foundation-label-grid'},
        h('article', {className:'foundation-label-card'},
          h('h6', {className:'foundation-label-name'}, 'Chablis'),
          h('p', null, '先找法定产区名，再看图中是否直接写了品种。'),
          sourceLink(chablisLabelUrl, '看夏布利产区官方读标图 ↗')),
        h('article', {className:'foundation-label-card'},
          h('h6', {className:'foundation-label-name'}, 'Cloudy Bay Sauvignon Blanc 2025'),
          h('p', null, '先找品牌、品种和年份。酒精度在你看到的瓶图上读得到，还是只能从产品页查到？'),
          sourceLink(cloudyBayUrl, '看酒庄瓶图与产品资料 ↗'))),
      h('details', null,
        h('summary', null, '核对真实案例'),
        h('ul', null,
          h('li', null, 'Chablis 是法定产区名。即使正标没有写 Chardonnay，也可以查产区资料确认这个法定产区使用的品种。把 Chardonnay 记在「查资料确认」栏。', ' ', sourceLink(chablisVarietyUrl, '核对夏布利产区与品种 ↗')),
          h('li', null, 'Cloudy Bay 是品牌，Sauvignon Blanc 是品种，2025 是年份。酒庄产品页列出 13.5% 酒精度。瓶图看不清数字时，把它记为产品资料，别当成自己已从酒标读到的字段。'),
          h('li', null, '同款酒的年份和市场版本可能不同。读手边实瓶时，先核对正背标与资料对应的年份。')))),
    h('h5', null, '换成身边的一瓶酒'),
    h('p', null, '用同样六项检查正标和背标，把结果记在自己的笔记中。找出一条明确事实、一条需要查询的线索，以及一条目前不能下的结论。无需上传照片，也无需为练习购买或饮用葡萄酒。'),
    h('p', {className:'fine-print'}, '这组开放练习不自动计分；完成后仍可使用下方原有自查和选择题。'));
}
