import React, {useState} from 'react';

const samples = [
  {
    name: '记录 A',
    description: '装入酒瓶后，基酒与酵母和糖一起密封。发酵结束后，酒继续与酒泥接触。转瓶使沉淀集中到瓶颈，再除渣。',
    vessel: '酒瓶',
    clue: '酒在装瓶后才进行第二次发酵；瓶颈聚集沉淀是另一条线索。香槟采用这种瓶中发酵的方法。',
  },
  {
    name: '记录 B',
    description: '基酒进入一个密闭耐压罐，在罐内加入酵母和糖。产生的二氧化碳保留在酒中，起泡完成后才装瓶。',
    vessel: '耐压罐',
    clue: '装瓶发生在起泡之后。常见的 Prosecco DOC 起泡酒采用这种 Martinotti 法。',
  },
];

function VesselQuestion({sample}: {sample: typeof samples[number]}) {
  const [answer, setAnswer] = useState('');
  return <fieldset>
    <legend>{sample.name}</legend>
    <p>{sample.description}</p>
    <p>第二次发酵发生在哪里？</p>
    {['酒瓶', '耐压罐'].map(option =>
      <label className="foundation-check" key={option}>
        <input type="radio" name={sample.name} checked={answer === option} onChange={() => setAnswer(option)} />
        <span>{option}</span>
      </label>
    )}
    <p aria-live="polite">{answer && ((answer === sample.vessel ? '判断正确。' : '再看看装瓶的时机。') + sample.clue)}</p>
  </fieldset>;
}

export default function FoundationSparklingPractice() {
  return <section id="foundation-sparkling" aria-labelledby="foundation-sparkling-title" className="white-panel foundation-study">
    <h2 id="foundation-sparkling-title">起泡酒练习｜气泡在哪里形成？</h2>
    <p>读两份酿造记录，留意装瓶发生在第二次发酵之前还是之后。</p>
    {samples.map(sample => <VesselQuestion key={sample.name} sample={sample} />)}
    <details><summary>对照官方工艺说明</summary>
      <p><a href="https://www.champagne.fr/en/about-champagne/how-champagne-is-made/bottling-and-second-fermentation" target="_blank" rel="noreferrer">香槟委员会｜装瓶与第二次发酵</a></p>
      <p><a href="https://www.prosecco.wine/en/prosecco/discover/winemaking/" target="_blank" rel="noreferrer">Prosecco DOC 协会｜起泡工艺</a></p>
    </details>
  </section>;
}
