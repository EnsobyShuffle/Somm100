'use client';
import React from 'react';
const h = React.createElement;
const anchors = [
  ['香槟','Champagne','先找法国偏北的学习锚点。'],
  ['阿尔萨斯','Alsace','找法国东部、靠近德国的位置。'],
  ['卢瓦尔河谷','Loire Valley / Val de Loire','沿河从西部向内陆看，留意区域跨度。'],
  ['勃艮第','Burgundy / Bourgogne','找到法国东部内陆区域，再联系夏布利和南北顺序。'],
  ['波尔多','Bordeaux','找法国西南部，联系大西洋影响。'],
  ['罗讷河谷','Rhône Valley / Vallée du Rhône','沿河辨认南北两部分，避免把全区视作一种气候。'],
  ['普罗旺斯','Provence','找法国东南部、地中海一侧。'],
  ['朗格多克—鲁西荣','Languedoc-Roussillon','找法国南部地中海沿岸，与普罗旺斯区分。']
];
export default function FoundationFranceMapGuide() {
  return h('section', {className:'foundation-map-guide','aria-labelledby':'foundation-france-map-title'},
    h('h4',{id:'foundation-france-map-title'},'法国总览｜把八个地名放回地图'),
    h('p',null,'先看国家轮廓、海洋与方向，再找产区。下列地名卡用于对照拼写，排列顺序不代表地理位置。'),
    h('a',{href:'https://vinatlas.fr/fr/decouvrir/',target:'_blank',rel:'noopener noreferrer'},'打开 Vinatlas 地图介绍与入口（第三方，新窗口）'),
    h('p',{className:'fine-print'},'Vinatlas 是独立地图项目，说明使用 INAO 等公开数据。这里提供学习入口，具体产区规则仍应查原始官方资料。'),
    h('ul',null,anchors.map(([cn,name,hint])=>h('li',{key:name},h('strong',null,cn+' · '+name),h('p',null,hint)))),
    h('h5',null,'三步定位练习'),
    h('ol',null,
      h('li',null,'在地图上指出大西洋一侧与地中海一侧，再找香槟、阿尔萨斯和波尔多。用“偏北”“东部”“西南部”描述位置。'),
      h('li',null,'找到另外五组地名。卢瓦尔河谷沿线与罗讷河南北部各有哪些位置变化？地图只帮助提出气候问题，具体差异再回看本节正文。'),
      h('li',null,'暂时收起地名卡，独立找到六个核心锚点——波尔多、勃艮第、卢瓦尔河谷、罗讷河谷、阿尔萨斯、香槟。每个选一句位置描述，再说一个想进一步核对的品种或气候问题。')),
    h('details',null,h('summary',null,'完成后核对学习重点'),
      h('p',null,'香槟偏北，阿尔萨斯在东部靠近德国，波尔多在西南部。地中海方向可先连接普罗旺斯、朗格多克—鲁西荣与南罗讷。'),
      h('p',null,'卢瓦尔河谷从西部延伸到内陆，罗讷河谷要区分南北。纬度和海洋只是线索，地形与局部条件也会改变气候，不能从一个区域名称推断所有酒的风格。'),
      h('p',null,'能在真实地图上独立定位后，再勾选本节对应自查。只读过地名卡时，可以继续练习，不必提前标记完成。')),
    h('p',{className:'fine-print'},'地图需联网。打不开时先完成地名与概念复习，定位任务留待地图可用时继续。此练习不自动计分或保存作答。'));
}
