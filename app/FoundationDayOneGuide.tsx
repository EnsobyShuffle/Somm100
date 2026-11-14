import React from 'react';
import concepts from '../data/foundation-concepts.json';
import dayOne from '../data/foundation-d1.json';
import FoundationVideoStudy from './FoundationVideoStudy';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';

const topics = {
  'foundation-d1-01': {title:'葡萄的结构', concept:'foundation-2', articles:['解析一个葡萄'], check:'果肉里的糖、果皮里的色素和单宁，分别可能影响成酒的什么？'},
  'foundation-d1-02': {title:'葡萄树的生长周期', concept:'foundation-2', articles:['葡萄的生长季节'], check:'从萌芽到采收，大致有哪些阶段？'},
  'foundation-d1-03': {title:'环境与葡萄成熟', concept:'foundation-2', articles:['影响葡萄种植的因素','土壤'], check:'同一品种换了地方，哪些条件可能改变成熟速度？'},
  'foundation-d1-04': {title:'葡萄园管理', concept:'foundation-2', articles:[], check:'葡萄园通风不足时，调整枝叶有什么用？'},
  'foundation-d1-05': {title:'根瘤蚜、嫁接与砧木', concept:'foundation-2', articles:[], check:'嫁接时，哪一部分负责扎根，哪一部分负责结果？'},
  'foundation-d1-06': {title:'酒精发酵', concept:'foundation-3', articles:[], check:'葡萄汁里的糖在发酵中变成了什么？'},
  'foundation-d1-07': {title:'红白葡萄酒怎么酿', concept:'foundation-3', articles:['红葡萄酒的酿造','白葡萄酒的酿造'], check:'典型红酒和白酒分别在什么时候把果皮与酒液分开？'},
  'foundation-d1-08': {title:'发酵后的处理与熟成', concept:'foundation-3', articles:['橡木桶'], check:'酸感变柔和与增加橡木气息，分别可能涉及什么处理？'},
  'foundation-d1-09': {title:'地理名称与产区规则', concept:'foundation-6', articles:[], check:'看到一个法定产区名，可以确认什么？'},
  'foundation-d1-10': {title:'酒标上的线索', concept:'foundation-7', articles:[], check:'拿到一张酒标，哪些信息能直接读出，哪些需要另查？'},
};

const varietyExamples = concepts.find(({id})=>id==='foundation-5')!.articles
  .filter(({title})=>title.startsWith('不知道霞多丽') || title.startsWith('圈内必知：除了勃艮第'));

export default function FoundationDayOneGuide(){
  return <section className="white-panel foundation-study foundation-day-one" aria-labelledby="foundation-day-one-title">
    <h2 id="foundation-day-one-title">Day 1｜知识清单</h2>
    <p>先认识葡萄的种类，再看它的结构、生长和酿造，最后练习读酒标。</p>
    <ol className="foundation-day-one-list">
      <li>
        <details id="foundation-prep-grape-types">
          <summary>葡萄的种类</summary>
          <p>先分清两个词。<strong>葡萄种</strong>是植物分类，例如欧洲葡萄种（<i>Vitis vinifera</i>），是酿酒葡萄的主要来源。<strong>葡萄品种</strong>是葡萄栽培中使用的具体名称，例如霞多丽和黑皮诺，两者都属于欧洲葡萄种。</p>
          <p>日常也会按用途区分鲜食葡萄和酿酒葡萄，按果皮颜色区分浅色和深色葡萄。读到「霞多丽」或「黑皮诺」时，先知道这是品种名。霞多丽是浅色品种，黑皮诺是深色品种。深色品种也能酿白酒，取汁时减少与果皮的接触即可减少颜色浸出。</p>
          <p><strong>想一想</strong>　欧洲葡萄种、霞多丽和黑皮诺，哪个是葡萄种，哪两个是品种？</p>
          <details className="foundation-day-one-answer">
            <summary>查看答案</summary>
            <p>欧洲葡萄种是葡萄种。霞多丽和黑皮诺是它下面的两个栽培品种。下一节看果皮、果肉、籽和梗，理解这些部位怎样影响成酒。</p>
          </details>
          <ul className="foundation-day-one-readings">
            {varietyExamples.map(({title,whyRead,url})=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{title} ↗</a><p>{whyRead}</p></li>)}
          </ul>
        </details>
      </li>
      {dayOne.units.map(unit=>{
        const topic=topics[unit.id as keyof typeof topics];
        const concept=concepts.find(item=>item.id===topic.concept);
        const readings=concept?.articles.filter(article=>topic.articles.includes(article.title)) ?? [];
        return <li key={unit.id}>
          <details id={`foundation-prep-${unit.id}`}>
            <summary>{topic.title}</summary>
            <p>{unit.sections[0].text}</p>
            <p><strong>想一想</strong>　{topic.check}</p>
            <details className="foundation-day-one-answer">
              <summary>展开讲解与练习</summary>
              {unit.sections.slice(1).map(({heading,text})=><p key={heading}>{text}</p>)}
              <p>{unit.practice}</p>
            </details>
            {readings.length>0 && <ul className="foundation-day-one-readings">
              {readings.map(({title,whyRead,url})=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{title} ↗</a><p>{whyRead}</p></li>)}
            </ul>}
            <FoundationVideoStudy unitId={unit.id} idPrefix="foundation-prep-"/>
            {concept && <button type="button" className="button secondary" onClick={()=>focusFoundationTarget(concept.id)}>继续读｜{concept.title}</button>}
          </details>
        </li>;
      })}
    </ol>
  </section>;
}
