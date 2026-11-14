import React from 'react';
import FoundationPrecoursePracticeReturn from './FoundationPrecoursePracticeReturn';

const h = React.createElement;

const practices = {
  'foundation-2': {
    title: '葡萄园的两条观察',
    cases: [
      {
        id: 'foundation-vineyard-drainage',
        title: '同一场雨，为什么两块地要分开看？',
        observation: '相邻两块地种同一品种。昨夜下雨，今早甲地低处还有积水，乙地表面已无积水。',
        question: '哪一条是今天能确认的观察？若要判断葡萄成熟是否受影响，还要看什么？',
        answer: '能确认的是观察当时甲地低处仍有积水。再比较两地后续的排水、植株状态和果实成熟记录。一早的积水不足以判断最终成熟度或成酒风格。',
      },
      {
        id: 'foundation-vineyard-canopy',
        title: '果串下午暴晒，应该先查什么？',
        observation: '同一块地里，有些果串下午直接晒到太阳，另一些果串被叶片遮住。',
        question: '如果有人建议把遮挡的叶片全摘掉，先问哪两个问题？',
        answer: '先查两组果串的暴露时段与强度，再查高温期间是否已有晒伤迹象。叶幕管理需要在光照、通风和遮阴之间取舍，不能只凭一张照片决定全地块摘叶。',
      },
    ],
  },
  'foundation-3': {
    title: '从酒窖记录判断发生了什么',
    cases: [
      {
        id: 'foundation-winemaking-fermentation-evidence',
        title: '发酵罐冒泡，下一步查什么？',
        observation: '罐内开始冒泡，酒窖日志还没有补上当天的检测记录。',
        question: '哪一项只是观察？哪两项记录可以帮助确认酒精发酵在进行？',
        answer: '冒泡是观察。对照前后测量，查糖是否减少、酒精是否增加。即使有气泡，也要看实际测量才知道发酵进度和余糖情况。',
      },
      {
        id: 'foundation-winemaking-vessel-evidence',
        title: '记录写着「橡木桶」，能确定有明显木香吗？',
        observation: '甲酒技术表写「橡木桶熟成」，乙酒写「不锈钢罐熟成」。两张表都没有品鉴记录。',
        question: '哪项工艺已经确认？若要解释甲酒木香强弱，还需要什么？',
        answer: '能确认两款酒各自使用的熟成容器。判断甲酒的木香，先实际品鉴，再查桶的新旧、接触时间及使用比例。知道容器可以帮助提出问题，木香强弱仍需核对。',
      },
    ],
  },
};

export default function FoundationPrecourseEvidencePractice({conceptId, practiceReturn}) {
  const {title, cases} = practices[conceptId];
  const heading = `${conceptId}-evidence-practice`;
  return h('section', {'aria-labelledby':heading},
    h('h3', {id:heading}, title),
    h('p', null, '以下为虚构记录。先说出你能确认的一条信息，再写下下一步要查什么。'),
    cases.map(({id, title, observation, question, answer}) =>
      h('details', {key:id, id},
        h('summary', {id:id + '-title'}, title),
        h('p', null, observation),
        h('p', null, h('strong', null, '自查　'), question),
        h('details', null,
          h('summary', null, '展开参考判断'),
          h('p', null, answer)),
        h(FoundationPrecoursePracticeReturn, {caseId:id, practiceReturn}))));
}
