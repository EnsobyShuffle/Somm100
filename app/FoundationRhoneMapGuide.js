'use client';
import React from 'react';
const h = React.createElement;
export default function FoundationRhoneMapGuide() {
  return h('section', {className:'foundation-map-guide', 'aria-labelledby':'foundation-rhone-map-title'},
    h('h4', {id:'foundation-rhone-map-title'}, '拿着官方地图，完成三个定位任务'),
    h('p', null, '先打开地图、放大看地名，再回来核对。地图来自 Inter Rhône，以下使用其 2025 年版本；本页不以该版本代替现行法规。'),
    h('a', {href:'https://www.vins-rhone.com/sites/vignoble/files/documentation/2025-04/CARTE-VVDR-A3-2025-sans%20villes.pdf', target:'_blank', rel:'noopener noreferrer'}, '打开 Inter Rhône 罗讷河产区地图（PDF，新窗口）'),
    h('ol', null,
      h('li', null, '找出 Vienne、Valence、Orange、Avignon，建立由北向南的方向感。'),
      h('li', null, '找到 Côte-Rôtie、Condrieu、Hermitage、Cornas，再找 Châteauneuf-du-Pape，比较它们在南北两部分的位置。'),
      h('li', null, '回到本节品种对照：哪些地名先连接 Syrah？哪个连接 Viognier？哪个可作为南部混酿的学习锚点？')),
    h('details', null, h('summary', null, '完成后展开核对'),
      h('p', null, '城市由北向南：Vienne → Valence → Orange → Avignon。'),
      h('p', null, 'Côte-Rôtie、Condrieu、Hermitage、Cornas 位于北部；Châteauneuf-du-Pape 位于南部。北部前三个红酒学习锚点是 Côte-Rôtie、Hermitage、Cornas，对应 Syrah；Condrieu 对应白品种 Viognier。'),
      h('p', null, 'Châteauneuf-du-Pape 用于理解南部混酿，但它并不等于固定 GSM 配方。')),
    h('p', {className:'fine-print'}, '这组读图练习不自动计分，也不代替本节自查。外部 PDF 的手机加载和大陆网络可用性尚未验收；打不开时可先继续本页复习。'),
    h('a', {href:'https://www.vins-rhone.com/en/wine-school/educational-resources', target:'_blank', rel:'noopener noreferrer'}, '地图链接失效时：前往 Inter Rhône 官方教学资源页'));
}
