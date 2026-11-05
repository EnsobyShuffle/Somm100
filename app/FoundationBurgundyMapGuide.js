'use client';
import React from 'react';
const h = React.createElement;
export default function FoundationBurgundyMapGuide() {
  return h('section', {className:'foundation-map-guide', 'aria-labelledby':'foundation-burgundy-map-title'},
    h('h4', {id:'foundation-burgundy-map-title'}, '勃艮第读图练习｜从区域到地名'),
    h('p', null, '学习目标是建立南北方向感，并区分区域、村庄和葡萄园。先打开行业协会的区域总图，再按需要进入交互地图放大查看。'),
    h('p', null, h('a', {href:'https://www.bourgogne-wines.com/our-resources/media,3181,14293.html?args=Y29tcF9pZD0yMzA5JmFjdGlvbj1maWNoZV9tZWRpYSZpZD0zMDMmfA%3D%3D',target:'_blank',rel:'noopener noreferrer'}, '打开 BIVB 五大区域地图资源页（新窗口）')),
    h('p', null, h('a', {href:'https://www.bourgogne-wines.com/our-resources/bourgogne-maps,3181,15261.html',target:'_blank',rel:'noopener noreferrer'}, '打开 BIVB 交互地图介绍与入口（新窗口）')),
    h('ol', null,
      h('li', null, '在总图上找到 Chablis、Côte de Nuits、Côte de Beaune、Côte Chalonnaise、Mâconnais。先指出最北和最南的学习锚点，再按顺序连起来。'),
      h('li', null, '找到 Côte de Nuits 与 Côte de Beaune，判断哪一个更靠北。再找到 Côte Chalonnaise，确认它位于 Côte de Beaune 与 Mâconnais 之间。'),
      h('li', null, '进入交互地图，选择一个本节提到的地名，用村镇或产区名称搜索。放大后记录屏幕上显示的名称与分类，区分村庄名称、产区名称和葡萄园名称。找不到时保留疑问，不凭名称猜等级。')),
    h('details', null, h('summary', null, '完成后核对方向与阅读方法'),
      h('p', null, '本节五个锚点由北向南为夏布利、夜丘、伯恩丘、夏隆内丘、马贡内。总图还包含大欧塞尔、上夜丘、上伯恩丘、库舒瓦和沙蒂永等名称，五个锚点只是入门线索。'),
      h('p', null, '夜丘在伯恩丘以北；夏隆内丘在伯恩丘以南、马贡内以北。先确认方向，再读具体酒款的产地信息。'),
      h('p', null, '第三项按你选择的地名核对。交互地图提供村镇、产区和等级等搜索方式，记录实际显示的分类即可。地图能帮助识别来源，不能单独判断酒款品质。')),
    h('p', {className:'fine-print'}, '外部地图需联网打开。打不开时可先用上方顺序示意复习，实际地图定位留待完成。这三项练习不自动计分或保存作答。'));
}
