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

const drinkCards = [
  {name: 'A｜威士忌', process: '谷物发酵后蒸馏，并在木桶中熟成', abv: '43% vol.'},
  {name: 'B｜橙味利口酒', process: '基酒加入橙皮风味和糖', abv: '25% vol.'},
  {name: 'C｜日本清酒', process: '米、米曲与水酿造', abv: '15% vol.'},
  {name: 'D｜白酒', process: '高粱经糖化、发酵和蒸馏', abv: '52% vol.'},
];

const pairingCases = [
  {
    id: 'foundation-pairing-mushroom',
    title: '菌菇酱牛排｜用试配修正初选',
    dish: '炭烤牛排配浓菌菇酱，酱汁鲜味明显。客人希望搭配一款喝起来柔和的干红。',
    wines: 'A 酒体较饱满、单宁较强。B 酒体中等、单宁较柔和。两款均为干红。',
    observation: '试配记录显示，吃带酱汁的一口后，A 的涩感比单喝时明显，B 的果味仍然清晰，涩感变化较小。',
    task: '先按菜、酒和客人偏好选一款。读完试配记录后再决定推荐哪杯，并用一句话向客人解释。',
    answer: '可推荐 B。比如「您希望口感柔和，这杯干红和菌菇酱一起尝时，果味仍清晰，收口也更柔和。」若想知道酱汁起了什么作用，用同一杯酒对照尝带酱和不带酱的两口牛排。',
  },
  {
    id: 'foundation-pairing-dessert',
    title: '柠檬挞｜甜度和酸度都要核对',
    dish: '柠檬挞酸味鲜明，馅料也有明显甜味。客人希望酒喝起来清爽。',
    wines: 'A 是酸度较高的干型起泡酒。B 是酸度较高、甜感明显的白葡萄酒。',
    observation: '试配记录显示，吃过柠檬挞后，A 喝起来比单喝时更尖，果味也变弱。B 仍能尝到果味，收口保持清爽。',
    task: '先选一杯试配，写下要观察的两项变化。读完记录后说明推荐哪杯。如果换成甜度明显更低的柠檬挞，哪一步要重做？',
    answer: '根据这次记录推荐 B。可对照酒的酸感和果味，看酸感有没有变尖、果味是否还清晰。换配方后，把两杯都与新版柠檬挞重试，再按新的口感和客人偏好决定。',
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
      <section className="foundation-week" aria-labelledby="foundation-assessment-pairing-title">
        <h4 id="foundation-assessment-pairing-title">餐酒搭配对照练习</h4>
        <p>用两组模拟记录练习餐酒搭配。先读菜品、酒款和客人偏好，写下初选，再展开试配记录。两题都可以只用文字完成。</p>
        {pairingCases.map(({id, title, dish, wines, observation, task, answer}) => (
          <article key={id} className="foundation-week" aria-labelledby={`${id}-title`}>
            <h5 id={`${id}-title`}>{title}</h5>
            <p><strong>菜品与客人偏好　</strong>{dish}</p>
            <p><strong>备选酒款　</strong>{wines}</p>
            <p><strong>练习　</strong>{task}</p>
            <details id={`${id}-observation`}>
              <summary>查看模拟试配记录</summary>
              <p>{observation}</p>
              <details id={`${id}-answer`}>
                <summary>展开参考判断</summary>
                <p>{answer}</p>
              </details>
            </details>
          </article>
        ))}
        <p><strong>自查　</strong>能否说清初选的依据、试配时实际出现的变化，以及哪项变化会让你改选？</p>
      </section>
      <section className="foundation-week" aria-labelledby="foundation-assessment-drink-comparison-title">
        <h4 id="foundation-assessment-drink-comparison-title">四类酒水辨析</h4>
        <p>下面是四张虚构的产品资料卡。练习只比较卡片上的酒款。</p>
        <div className="foundation-cohort-grid">
          {drinkCards.map(({name, process, abv}) => (
            <article key={name} className="foundation-cohort-city">
              <h5>{name}</h5>
              <dl>
                <div><dt>工艺线索</dt><dd>{process}</dd></div>
                <div><dt>标示酒精度</dt><dd>{abv}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <ol>
          <li>找出两张把蒸馏写作主要生产步骤的资料卡，再指出哪张写明用米和米曲酿造、哪张写明用基酒调配。</li>
          <li>客人希望选这四款中酒精度较低、喝起来偏干的一款。你现在能确认哪一项？还需要查什么？</li>
          <li>同伴说「这款白酒度数最高，所以一定属于某种香型」。请用一句话解释为什么还要查背标或厂商资料。</li>
        </ol>
        <details id="foundation-assessment-drink-comparison-answer">
          <summary>展开四款酒水的参考判断</summary>
          <ol>
            <li>A 和 D 都写明发酵后蒸馏。C 的线索是用米和米曲酿造。B 的成品线索是以基酒加风味和糖调配。</li>
            <li>只看标示酒精度，C 在这四款中最低。偏干与否还要查这款酒的风味说明、技术资料，或实际品尝。</li>
            <li>D 的 52% vol. 说明这瓶酒标示的酒精度。要确认香型，继续查背标或厂商资料。</li>
          </ol>
        </details>
      </section>
      <p className="fine-print">以上为课后自练，展开参考思路不计分。正式考核方式与评分以当期通知为准。</p>
    </section>
  );
}
