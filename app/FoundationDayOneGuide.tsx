import React from 'react';
import concepts from '../data/foundation-concepts.json';
import dayOne from '../data/foundation-d1.json';
import prepResources from '../data/foundation-d1-prep-resources.json';
import FoundationVideoStudy from './FoundationVideoStudy';
import FoundationDiagram from './FoundationDiagram';

const topics = {
  'foundation-d1-01': {
    title:'葡萄的结构', concept:'foundation-2', articles:['解析一个葡萄'],
    check:'果肉里的糖、果皮里的色素和单宁，分别可能影响成酒的什么？',
    answer:'糖为发酵提供原料，影响潜在酒精度。色素影响酒的颜色，单宁会影响涩感。',
  },
  'foundation-d1-02': {
    title:'葡萄树的生长周期', concept:'foundation-2', articles:['葡萄的生长季节'],
    check:'从萌芽到采收，大致有哪些阶段？',
    answer:'萌芽 → 开花 → 坐果 → 转色 → 成熟 → 采收。开花之后形成幼果，转色通常出现在成熟过程的早期。',
  },
  'foundation-d1-03': {
    title:'环境与葡萄成熟', concept:'foundation-2', articles:['影响葡萄种植的因素','土壤'],
    check:'同一品种换了地方，哪些条件可能改变成熟速度？',
    answer:'温度、日照和水分都会影响成熟。比较两个地块时，可以先看坡向带来的日照差异，再看海拔带来的温度差异和土壤的排水情况。',
  },
  'foundation-d1-04': {
    title:'葡萄园管理', concept:'foundation-2', articles:[],
    check:'葡萄园通风不足时，调整枝叶有什么用？',
    answer:'让果串周围的空气更容易流通，潮湿时更容易干。光照太强的地块也要保留适当遮阴。',
  },
  'foundation-d1-05': {
    title:'根瘤蚜、嫁接与砧木', concept:'foundation-2', articles:[],
    check:'嫁接时，哪一部分负责扎根，哪一部分负责结果？',
    answer:'下方的砧木提供根系，上方的接穗长出枝叶和果实。葡萄品种由接穗决定。',
  },
  'foundation-d1-06': {
    title:'酒精发酵', concept:'foundation-3', articles:['红葡萄酒的酿造'],
    check:'葡萄汁里的糖在发酵中变成了什么？',
    answer:'酵母利用糖产生酒精和二氧化碳，过程会释放热量。没有被利用的糖会留在酒里，成为残糖。',
  },
  'foundation-d1-07': {
    title:'红白葡萄酒怎么酿', concept:'foundation-3', articles:['红葡萄酒的酿造','白葡萄酒的酿造'],
    check:'典型红酒和白酒分别在什么时候把果皮与酒液分开？',
    answer:'典型红酒先带皮发酵，再压榨分离果皮。典型白酒先压榨分离果汁，再用果汁发酵。',
  },
  'foundation-d1-08': {
    title:'发酵后的处理与熟成', concept:'foundation-3', articles:['橡木桶'],
    check:'酸感变柔和与增加橡木气息，分别可能涉及什么处理？',
    answer:'苹果酸乳酸转化通常会让酸感更柔和。在橡木桶中发酵或熟成可能带来木材气息，效果取决于桶龄和接触时间等条件。',
  },
  'foundation-d1-09': {
    title:'地理名称与产区规则', concept:'foundation-6', articles:[],
    check:'看到一个法定产区名，可以确认什么？',
    answer:'先记录酒标声明的产地，再查该名称对应的规则。产地范围、允许的葡萄品种和酿造要求，以该产区的实际规定为准。',
  },
  'foundation-d1-10': {
    title:'酒标上的线索', concept:'foundation-7', articles:[],
    check:'拿到一张酒标，哪些信息能直接读出，哪些需要另查？',
    answer:'酒标印出的生产者、产地、年份或酒精度可以直接记录。品种或酿造方法没有写明时，可以查产区规则或酒庄资料。',
  },
};

const processDiagrams: Record<string, string> = {
  'foundation-d1-06': '看图｜糖去了哪里',
  'foundation-d1-07': '看图｜红、白、桃红何时压榨',
};

const varietyExamples = concepts.find(({id})=>id==='foundation-5')!.articles
  .filter(({title})=>title.startsWith('不知道霞多丽') || title.startsWith('圈内必知：除了勃艮第'));

const firstTopicId = 'foundation-prep-grape-types';

export default function FoundationDayOneGuide({onRead}: {onRead: (conceptId: string, buttonId: string) => void}){
  return <section className="white-panel foundation-study foundation-day-one" aria-labelledby="foundation-day-one-title">
    <h2 id="foundation-day-one-title">Day 1｜知识清单</h2>
    <p>先认识葡萄的种类，再看它的结构、生长和酿造，最后练习读酒标。</p>
    <ol className="foundation-day-one-list">
      <li>
        <details id={firstTopicId}>
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
        const resources=prepResources[unit.id as keyof typeof prepResources];
        const readings=[
          ...(concept?.articles.filter(article=>topic.articles.some(title=>title===article.title)) ?? []),
          ...(resources && 'articles' in resources ? resources.articles : []),
        ];
        const videos=resources && 'videos' in resources ? resources.videos : [];
        const diagramLabel=processDiagrams[unit.id];
        const itemId=`foundation-prep-${unit.id}`;
        const buttonId=`${itemId}-read`;
        return <li key={unit.id}>
          <details id={itemId}>
            <summary>{topic.title}</summary>
            <p>{unit.sections[0].text}</p>
            <p><strong>想一想</strong>　{topic.check}</p>
            <details className="foundation-day-one-answer">
              <summary>查看答案与练习</summary>
              <p><strong>参考答案</strong>　{topic.answer}</p>
              {unit.sections.slice(1).map(({heading,text})=><p key={heading}>{text}</p>)}
              <p><strong>课前练习</strong>　{unit.practice}</p>
            </details>
            {diagramLabel && <details className="foundation-day-one-answer">
              <summary>{diagramLabel}</summary>
              <FoundationDiagram unitId={unit.id} idPrefix="foundation-prep-"/>
              {unit.id==='foundation-d1-07' && <>
                <p><strong>看图自查</strong>　同一批深色葡萄分成两份。甲立刻压榨，取澄清的汁发酵。乙连皮发酵，再压榨。哪一份更容易得到较深的酒色？</p>
                <details>
                  <summary>查看答案</summary>
                  <p>乙。酒液和果皮接触的时间较长，更容易浸出色素。甲较早把果汁和果皮分开，可能得到浅色酒。实际酒色还受品种和接触条件影响。</p>
                </details>
              </>}
            </details>}
            {readings.length>0 && <ul className="foundation-day-one-readings">
              {readings.map(({title,whyRead,url})=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{title} ↗</a><p>{whyRead}</p></li>)}
            </ul>}
            {videos.length>0 && <ul className="foundation-day-one-readings">
              {videos.map(({title,url,publisher,seconds,whyWatch})=><li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                <p>B站 · {publisher} · {seconds < 60 ? `${seconds} 秒` : `${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒`}</p>
                <p>{whyWatch}</p>
              </li>)}
            </ul>}
            <FoundationVideoStudy unitId={unit.id} idPrefix="foundation-prep-"/>
            {concept && <button type="button" id={buttonId} className="button secondary" tabIndex={0} aria-controls={concept.id}
              onClick={()=>onRead(concept.id,buttonId)}>继续读｜{concept.title}</button>}
          </details>
        </li>;
      })}
    </ol>
  </section>;
}
