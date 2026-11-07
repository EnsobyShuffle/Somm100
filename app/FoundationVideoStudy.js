import React from 'react';

const h = React.createElement;
const videos = {
  'foundation-d1-02': {
    title: '同一株葡萄藤，从冬剪到采收前',
    source: '勃艮第葡萄酒行业协会（BIVB）',
    video: 'https://www.bourgogne-wines.com/our-resources/media,3181,14293.html?args=Y29tcF9pZD0yMzA5JmFjdGlvbj1maWNoZV9tZWRpYSZpZD0zMTEmfA%3D%3D',
    reading: 'https://www.bourgogne-wines.com/winegrowers-and-expertise/bourgogne-vines/a-sup_the-lifecycle-of-the-vine/a-journey-through-time-the-lifecycle-of-the-vine,2525,9395.html',
    task: '找出两个你能辨认的生长阶段，各记下一个画面证据。再把冬剪放到时间线上，标为人的工作。',
    answer: '坐果可以从小果粒形成辨认，转色可以从果粒逐渐变色辨认。冬剪是栽培操作。转色发生在成熟和采收之前。',
  },
  'foundation-d1-07': {
    title: '香槟采收与压榨：果皮和果汁何时分开',
    source: '香槟委员会（Comité Champagne）',
    video: 'https://www.champagne.fr/en/find-out-more/mediaroom/champagne-multimedia-library/educational-clips-champagne-harvest-and-grape',
    reading: 'https://www.champagne.fr/en/about-champagne/how-champagne-is-made/pressing',
    task: '画出这一个案例里的采收、压榨、取汁和发酵顺序。用一句话解释深色果皮的葡萄为何也能酿成白色基酒。',
    answer: '香槟白色基酒可用深色果皮的葡萄。轻柔压榨并及时分离果汁与果皮，可以减少色素浸出。这个案例用于理解果皮接触，红葡萄酒带皮发酵可用本节流程图对照。',
  },
  'foundation-d4-03': {
    title: '香槟酿造：找出瓶中二次发酵',
    source: '香槟委员会（Comité Champagne）',
    video: 'https://www.champagne.fr/en/find-out-more/mediaroom/champagne-multimedia-library/educational-clips-champagne-production',
    reading: 'https://www.champagne.fr/en/about-champagne/how-champagne-is-made/bottling-and-second-fermentation',
    task: '在时间线上标出装瓶、瓶中二次发酵和酒泥陈年。圈出产生二氧化碳并把它留在瓶中的一步。',
    answer: '基酒装瓶时加入糖和酵母，二次发酵产生的二氧化碳留在密闭瓶中。随后进行酒泥陈年。下一节可对照罐式法，比较二次发酵发生在哪里。',
  },
};

function externalLink(href, label) {
  return h('a', {href, target: '_blank', rel: 'noopener noreferrer'}, label);
}

export default function FoundationVideoStudy({unitId}) {
  const resource = videos[unitId];
  if (!resource) return null;

  const titleId = `${unitId}-video-study`;
  return h('section', {className: 'foundation-video-study', 'aria-labelledby': titleId},
    h('h4', {id: titleId}, `视频观察｜${resource.title}`),
    h('p', null, resource.task),
    h('p', null, externalLink(resource.video, `打开${resource.source}视频页 ↗`)),
    h('p', null, externalLink(resource.reading, '视频打不开？看同主题官方图文 ↗')),
    h('details', null,
      h('summary', null, '核对观察结果'),
      h('p', null, resource.answer)));
}
