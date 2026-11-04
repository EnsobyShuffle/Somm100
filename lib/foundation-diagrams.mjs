// Original teaching diagrams distilled from the existing, source-mapped lessons.
// Semantic HTML preserves every label on narrow screens and for screen readers.
export const foundationDiagrams = {
  'foundation-france-05': {
    title: '罗讷河南北对照：先分区域，再连接品种',
    intro: '两组卡片对照阅读，不表示距离、产区边界或河流两岸。实际位置请配合下方官方地图。',
    layout: 'rhone-comparison',
    groups: [
      {title: '北罗讷｜以 Syrah 建立红酒线索', ordered: false, nodes: [
        ['核心红品种', 'Syrah。先联系 Côte-Rôtie、Hermitage、Cornas。'],
        ['白葡萄也要认识', 'Condrieu 对应 Viognier；Marsanne 和 Roussanne 也是重要白品种。'],
        ['复习问题', '能否在地图上找到上述地名，并把红、白葡萄的线索分开？']
      ]},
      {title: '南罗讷｜以 Grenache 与混酿建立线索', ordered: false, nodes: [
        ['气候线索', '地中海气候影响更明显。'],
        ['常见红酒组合', 'Grenache、Syrah、Mourvèdre，简称 GSM。'],
        ['产区锚点', '先找到 Châteauneuf-du-Pape，再回看它与北部产区的位置关系。']
      ]}
    ],
    takeaway: '北部红酒先记 Syrah；南部先理解 Grenache 和混酿，再深入到具体产区。',
    note: 'GSM 不是固定比例，也不代表所有南罗讷酒都只使用这三个品种。这是知识对照图，不是完整品种或法规清单。'
  },
  'foundation-d1-05': {
    title: '嫁接：一株葡萄藤，两个部分各司其职',
    intro: '从地上往地下看，区分接穗与砧木的作用。',
    layout: 'graft',
    groups: [{title: '植株结构', ordered: false, nodes: [
      ['接穗｜地上部分', '例如赤霞珠：长出枝叶并结出相应品种的果实。'],
      ['嫁接口｜连接位置', '接穗与砧木连接，共同生长。'],
      ['砧木｜提供根系', '选择时考虑根瘤蚜抗性，以及土壤、水分和长势适应。']
    ]}],
    takeaway: '接到抗性砧木上的赤霞珠，果实品种仍是赤霞珠。',
    note: '这是功能示意，不表示实际比例。嫁接不是所有葡萄园的唯一方式，也不是品质高低的排名。'
  },
  'foundation-d1-06': {
    title: '酒精发酵：糖去了哪里？',
    intro: '跟着糖的转化看发酵，同时留意酵母与温度。',
    layout: 'fermentation',
    groups: [
      {title: '转化过程', ordered: true, nodes: [
        ['葡萄汁中的糖', '发酵的原料。'],
        ['酵母利用糖', '温度等条件会影响发酵过程。']
      ]},
      {title: '主要结果｜同时产生', ordered: false, nodes: [
        ['酒精', '形成酒的酒精度。'],
        ['二氧化碳', '发酵产生的气体。'],
        ['热', '发酵会放热，需要关注温度。']
      ]}
    ],
    takeaway: '没有被转化的糖可以留在酒中，成为残糖。',
    note: '这是简化概念图，不是完整化学反应式。葡萄很甜，不等于最后一定酿成甜酒；潜在酒精度也不等于实际酒精度。'
  },
  'foundation-d1-07': {
    title: '红、白、桃红：重点看果皮何时离开',
    intro: '沿每一列从上往下读，比较典型工艺中的果皮接触与压榨顺序。',
    layout: 'wine-process',
    groups: [
      {title: '典型红葡萄酒', tone: 'red', ordered: true, nodes: [
        ['红葡萄', '多数品种的颜色主要来自果皮。'],
        ['带皮发酵与浸渍', '果汁与果皮接触，提取颜色和单宁。'],
        ['分离酒液、压榨', '再把酒液与固体部分分开。']
      ]},
      {title: '典型白葡萄酒', tone: 'white', ordered: true, nodes: [
        ['葡萄', '既可以是白葡萄，也可以是适当处理的红葡萄。'],
        ['压榨并分离果皮', '先取得汁液，减少果皮接触。'],
        ['汁液发酵', '通常不与果皮一起发酵。']
      ]},
      {title: '桃红的一种常见路径', tone: 'rose', ordered: true, nodes: [
        ['红葡萄短时接触果皮', '获得较浅的颜色。'],
        ['分离果皮与汁液', '缩短浸渍时间。'],
        ['汁液发酵', '完成酒精发酵。']
      ]}
    ],
    takeaway: '决定颜色的关键之一是果皮接触；不能只看葡萄本身是红色还是白色。',
    note: '仅比较典型流程，省略了许多实际工序。桃红另有直接压榨等方法；白葡萄带皮发酵也可酿成橙酒。颜色深浅不等于品质等级。'
  },
  'foundation-d1-09': {
    title: '读产区名称：从哪里来，按什么规则写',
    intro: '把产地、名称使用规则和酒标信息分开判断。',
    layout: 'origin',
    groups: [{title: '三个阅读问题', ordered: true, nodes: [
      ['产地｜它来自哪里？', '先定位酒标上的地理名称。'],
      ['规则｜这个名称怎样使用？', '相应体系可能规定产区边界、品种、产量或酿造方法。'],
      ['酒标｜这瓶酒具体写了什么？', '再核对实际标注，不把不同国家的术语直接等同。']
    ]}],
    takeaway: '产区名称提供来源和规则线索，不能单凭名称判定一定更好喝。',
    note: '这是阅读框架，不是法规清单。不同体系的规则不同；具体酒款的要求须以对应产区的现行规则为准。'
  },
  'foundation-d2-01': {
    title: '学品种：把结构、环境与风格连起来',
    intro: '围绕一个品种，按这条学习路径比较酒款；它不是固定风味公式。',
    layout: 'grape-framework',
    groups: [{title: '同品种比较路径', ordered: true, nodes: [
      ['品种', '先确定正在学习和比较的对象。'],
      ['气候与成熟度', '比较它在不同环境中的表现。'],
      ['结构', '观察酸度、单宁、酒体和酒精感。'],
      ['风格与酿造', '把香气放回成熟度、酿造等语境解释。'],
      ['经典产区', '把前面的观察放回具体产地比较。']
    ]}],
    takeaway: '比较两款同品种酒：结构哪里不同？气候或酿造可能怎样参与形成差异？',
    note: '同一品种也有多种表达。气候不是唯一因素；不能靠一个香气词直接锁定品种或产地。'
  }
};

export function renderFoundationDiagram(h, unitId) {
  const diagram = foundationDiagrams[unitId];
  if (!diagram) return null;
  const titleId = `${unitId}-diagram-title`;
  return h('figure', {className: `foundation-diagram foundation-diagram--${diagram.layout}`, 'aria-labelledby': titleId},
    h('figcaption', {id: titleId}, diagram.title),
    h('p', {className: 'foundation-diagram-intro'}, diagram.intro),
    h('div', {className: 'foundation-diagram-groups'}, diagram.groups.map((group, groupIndex) =>
      h('section', {key: groupIndex, className: `foundation-diagram-group${group.tone ? ` foundation-diagram-group--${group.tone}` : ''}`},
        h('h5', null, group.title),
        h(group.ordered ? 'ol' : 'ul', {className: `foundation-diagram-nodes${group.ordered ? ' foundation-diagram-nodes--steps' : ''}`},
          group.nodes.map(([title, text], nodeIndex) => h('li', {key: nodeIndex},
            group.ordered ? h('span', {className: 'foundation-diagram-number', 'aria-hidden': true}, String(nodeIndex + 1).padStart(2, '0')) : null,
            h('strong', null, title), h('p', null, text))))))),
    h('p', {className: 'foundation-diagram-takeaway'}, h('strong', null, '抓住重点：'), diagram.takeaway),
    h('p', {className: 'foundation-diagram-note'}, diagram.note));
}
