import React from 'react';

const cases = [
  {
    id: 'foundation-assessment-service-check',
    title: '服务自练｜发现年份不一致，怎样继续？',
    scenario: '酒单上写着 2021，拿到桌边的同款酒却标着 2022，客人还没有确认。和同伴分别扮演侍酒师和客人，演练从发现差异到重新确认订单。',
    task: '先写下要核对的两份信息，再说一句给客人的解释和一句给同事的交接。',
    answer: '先暂停开瓶，核对订单或酒单所列年份与手中酒标，并请同事确认库存。向客人说明两个年份不同，待查清可选酒款和价格，再请客人决定。交接时说清桌号、原订单、实际年份和客人是否已确认。',
    check: '有没有在开瓶前停下来？有没有说清差异，并得到客人确认后再继续？',
  },
  {
    id: 'foundation-assessment-pairing',
    title: '餐酒搭配自练｜菜没换，酱汁换了',
    scenario: '同一份烤鸡有两个版本。甲用柠檬和香草，乙刷带甜味和辣味的酱汁。备选 A 是酸度较高的干白，备选 B 是略带甜味、酒精感较轻的白葡萄酒。',
    task: '为两道菜各选一个先试的搭配。说出是哪一项味道改变了选择，以及试喝时要留意什么。',
    answer: '甲可先试 A，比较柠檬与酒的酸度能否相衬。乙可先试 B，观察轻甜是否接得住酱汁的甜味，并留意入口后辣感是否更突出。分别尝一口菜再喝酒，根据实际反应调整。',
    check: '能否讲清酱汁怎样改变判断，并说出一个会让自己改选的试喝结果？',
  },
  {
    id: 'foundation-assessment-other-drinks',
    title: '其他酒水自练｜把酒标和待查信息分开',
    scenario: '三张练习标签只分别写了「米与米麴」「苦橙味」「谷物蒸馏」。同伴问你每款的类别、甜度和酒精度。',
    task: '把每张标签明示的信息抄下来，再为每款列出一个要查的字段。用一句话告诉同伴下一步怎么核实。',
    answer: '第一张只记录原料，第二张只记录风味，第三张只记录原料类别和蒸馏线索。逐款读完整背标或厂商资料，确认产品类别、标示酒精度和甜度信息。若资料缺甜度，就保留待查，不能从苦橙味推断糖分。',
    check: '是否把标签事实和推断分开？有没有找到可以确认的来源，并把缺失项留空？',
  },
];

export default function FoundationAssessmentPractice() {
  return (
    <section aria-labelledby="foundation-assessment-practice-title">
      <h3 id="foundation-assessment-practice-title">餐厅情境自练</h3>
      <p>两人一组轮流回答。先说自己的做法，再展开参考思路，用自查问题做一次复盘。</p>
      {cases.map(({id, title, scenario, task, answer, check}) => (
        <details key={id} id={id}>
          <summary>{title}</summary>
          <p>{scenario}</p>
          <p><strong>练习　</strong>{task}</p>
          <details>
            <summary>展开参考思路</summary>
            <p>{answer}</p>
          </details>
          <p><strong>自查　</strong>{check}</p>
        </details>
      ))}
      <p className="fine-print">以上为课后自练，展开参考思路不计分。正式考核方式与评分以当期通知为准。</p>
    </section>
  );
}
