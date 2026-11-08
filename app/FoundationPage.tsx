'use client';
import React, {useEffect, useState} from 'react';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import FoundationBridge from './FoundationBridge';
import FoundationBackup from './FoundationBackup';
import FoundationStudy from './FoundationStudy';
import FoundationCohort from './FoundationCohort';
import FoundationD1Review from './FoundationD1Review';
import FoundationD3Review from './FoundationD3Review';
import FoundationD2Quiz from './FoundationD2Quiz';
import FoundationD1Quiz from './FoundationD1Quiz';
import FoundationD3Quiz from './FoundationD3Quiz';
import FoundationD4Quiz from './FoundationD4Quiz';
import FoundationD4Review from './FoundationD4Review';
import FoundationD2Review from './FoundationD2Review';
import FoundationSparklingPractice from './FoundationSparklingPractice';
import FoundationFranceReview from './FoundationFranceReview';

type FoundationPageProps = {go:(page:string)=>void};
type RestoreResult = {written:number;skipped:number};

export default function FoundationPage({go}:FoundationPageProps){
 const [restore,setRestore]=useState({revision:0,message:''});
 useEffect(()=>{
  if(restore.revision)focusFoundationTarget('foundation-restore-status');
 },[restore.revision]);
 function onRestored(result:RestoreResult){
  setRestore(previous=>({revision:previous.revision+1,message:`已恢复 ${result.written} 组，保留／跳过 ${result.skipped} 组。课程进度已重新读取，请确认恢复前备份已下载。`}));
 }
 // Remount only after a successful restore so every local progress hook reads the new records.
 // Keeping old sibling state alive would let the next answer/navigation overwrite restored data.
 return <>{restore.message&&<p id="foundation-restore-status" role="status" tabIndex={-1}>{restore.message}</p>}<FoundationContent key={restore.revision} go={go} onRestored={onRestored}/></>;
}

function FoundationContent({go,onRestored}:FoundationPageProps&{onRestored:(result:RestoreResult)=>void}){
 return (<><button className="back-link" onClick={()=>go('courses')}>← 选择课程</button><PageTitle eyebrow="SOMM100 FOUNDATION" title="先理解一瓶酒，再走进课堂。" desc="从葡萄园到酒瓶，建立自己的知识框架。课前先理解基础概念，服务、推荐与餐酒搭配在正式课程中逐步学习。"/>
<div className="button-row"><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-study-title')}>课前预习</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-bridge-title')}>21 天学习路径</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d1-title')}>D1 课堂后复习</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d1-quiz-title')}>D1 综合自测</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d2-title')}>D2 葡萄品种复习</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d2-quiz-title')}>D2 综合自测</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-france-title')}>法国专题复习</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d3-title')}>D3 欧洲产区</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d3-quiz-title')}>D3 综合自测</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d4-title')}>D4 工艺与世界产区</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d4-quiz-title')}>D4 综合自测</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-sparkling-title')}>起泡酒练习</button></div><FoundationCohort/><FoundationBackup onRestored={onRestored}/><FoundationBridge/><FoundationStudy/><section className="white-panel"><h3>学习目录</h3><ol><li><a href="#foundation-0" onClick={e=>{e.preventDefault();focusFoundationTarget('foundation-0')}}>学习葡萄酒之前</a></li><li><a href="#foundation-1" onClick={e=>{e.preventDefault();focusFoundationTarget('foundation-1')}}>葡萄酒从哪里来</a></li><li><a href="#foundation-2" onClick={e=>{e.preventDefault();focusFoundationTarget('foundation-2')}}>葡萄与葡萄园</a></li><li><a href="#foundation-3" onClick={e=>{e.preventDefault();focusFoundationTarget('foundation-3')}}>葡萄怎么变成酒</a></li><li><a href="#foundation-4" onClick={e=>{e.preventDefault();focusFoundationTarget('foundation-4')}}>为什么葡萄酒喝起来不一样</a></li><li><a href="#foundation-5" onClick={e=>{e.preventDefault();focusFoundationTarget('foundation-5')}}>核心葡萄品种</a></li><li><a href="#foundation-6" onClick={e=>{e.preventDefault();focusFoundationTarget('foundation-6')}}>葡萄酒来自哪里</a></li><li><a href="#foundation-7" onClick={e=>{e.preventDefault();focusFoundationTarget('foundation-7')}}>怎么读懂一瓶酒</a></li></ol><p className="fine-print">延伸阅读打开公众号原文，可能需要在微信中查看。先理解概念，再按需要阅读；每周自查和选择题在上方学习路径中。</p></section>
<section className="foundation-chapter" id="foundation-0" key="foundation-0"><span className="eyebrow">课前学习 · 1 / 8</span><h2>学习葡萄酒之前</h2><p>先建立关系：品种、产地、年份、种植与酿造共同影响一瓶酒。学习时先问为什么，再记名称。</p><h3>继续阅读</h3><ul><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247483757&amp;idx=1&amp;sn=3b22e4054ad636522f33e6cb8539f06d&amp;chksm=cf837ca1f8f4f5b78dc99251b4b934f3e9f936010eb82fad4742edd743fa0055b89e3cbfce31&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">聊聊葡萄酒的学习 ↗</a><p className="fine-print">为什么看：先调整学习方法，避免把学习变成名词记忆。</p></li><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247483757&amp;idx=2&amp;sn=d8d2068a4f09dc9ec23d1c10fad7e16a&amp;chksm=cf837ca1f8f4f5b7391670a7dd9e8adbd3e8ca714795aa9445130758c9fa79f76495694908d2&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">葡萄酒学习的框架 ↗</a><p className="fine-print">为什么看：把葡萄、地方、年份和酿造连成一张知识框架。</p></li></ul></section>
<section className="foundation-chapter" id="foundation-1" key="foundation-1"><span className="eyebrow">课前学习 · 2 / 8</span><h2>葡萄酒从哪里来</h2><p>从葡萄树、生长环境、成熟、采收，到酿造、熟化和装瓶，先看懂整条路径。</p></section>
<section className="foundation-chapter" id="foundation-2" key="foundation-2"><span className="eyebrow">课前学习 · 3 / 8</span><h2>葡萄与葡萄园</h2><p>认识果皮、果肉和籽，理解生长周期，以及温度、阳光、水分和人的管理如何影响成熟。</p><h3>继续阅读</h3><ul><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247484065&amp;idx=2&amp;sn=3151f02bfdb33b0155170f9fd10304e5&amp;chksm=cf837f6df8f4f67bcf5f0893f37fc0f8b2a47b6b118c14b9d1889cf86c4d45c428411ecc130d&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">影响葡萄种植的因素 ↗</a><p className="fine-print">为什么看：理解环境因素如何共同影响葡萄成熟。</p></li><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247484065&amp;idx=3&amp;sn=19f13610cfad0acae1fb53972e487b9d&amp;chksm=cf837f6df8f4f67b084fad3fe08a23f75a588a3c6e1c047b2cf8978fdd153c35c4fd477abe1f&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">土壤 ↗</a><p className="fine-print">为什么看：从排水、保水与根系环境理解土壤，不套用风味公式。</p></li><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247484065&amp;idx=4&amp;sn=9f337f244ee142b2c973b1b81e0221f4&amp;chksm=cf837f6df8f4f67b48f8edff273b5f7748014a2219d8329fda044091d97ea39fb16c7919d1ea&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">葡萄的生长季节 ↗</a><p className="fine-print">为什么看：按时间顺序认识葡萄树一年发生的变化。</p></li><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247484065&amp;idx=5&amp;sn=4d3250cca6b9396704266b50ac5d5c81&amp;chksm=cf837f6df8f4f67bdd6afe5961a6d8cde96b5995bdf4133a981bce0546f2043786a6084d0a62&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">老藤、有机种植、生物动力法 ↗</a><p className="fine-print">为什么看：认识种植者的选择，不把种植方式当成品质保证。</p></li><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247484357&amp;idx=1&amp;sn=0aa169c8cadd41763f4d6e1224103b9a&amp;chksm=cf837e09f8f4f71fce763e7d190490b260dd5daa330b8bf61f7750938730f03d33d33d2ce8df&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">解析一个葡萄 ↗</a><p className="fine-print">为什么看：连接果皮、果肉与糖、酸、颜色和单宁。</p></li></ul></section>
<section className="foundation-chapter" id="foundation-3" key="foundation-3"><span className="eyebrow">课前学习 · 4 / 8</span><h2>葡萄怎么变成酒</h2><p>理解酵母把糖转化为酒精，并比较红、白葡萄酒的果皮接触与压榨方式。再认识酒泥、橡木和熟化。</p><h3>继续阅读</h3><ul><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247484357&amp;idx=2&amp;sn=caed74c69ec3cff5924f067218245675&amp;chksm=cf837e09f8f4f71fea8fc4c616fc825b6f743160992c4c056ac53a6f9b48dfcfd7ac4c7ace9d&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">红葡萄酒的酿造 ↗</a><p className="fine-print">为什么看：看懂果皮接触、发酵和压榨的关系。</p></li><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247484357&amp;idx=4&amp;sn=e80cbf08ad786abebbc8ca1463ddf73b&amp;chksm=cf837e09f8f4f71f94375b3423e0f84a1450d1d662f48864025533f2a7ed4130b81f3c3ac200&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">白葡萄酒的酿造 ↗</a><p className="fine-print">为什么看：比较白葡萄酒与红葡萄酒的基本酿造流程。</p></li><li><a href="http://mp.weixin.qq.com/s?__biz=Mzg4Nzk3NTA3NQ==&amp;mid=2247484357&amp;idx=3&amp;sn=a39a2911d24d51609cab0bdb4e5253bf&amp;chksm=cf837e09f8f4f71ff813d63d94bb0f85ded75bc99f7e726b38a3af6c89712f05a1ee142ec027&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">橡木桶 ↗</a><p className="fine-print">为什么看：理解橡木如何影响风格，而不是把过桶等同于高级。</p></li></ul></section>
<section className="foundation-chapter" id="foundation-4" key="foundation-4"><span className="eyebrow">课前学习 · 5 / 8</span><h2>为什么葡萄酒喝起来不一样</h2><p>认识甜度、酸度、单宁、酒精、酒体与香气，把风格与前面的种植和酿造联系起来。</p></section>
<section className="foundation-chapter" id="foundation-5" key="foundation-5"><span className="eyebrow">课前学习 · 6 / 8</span><h2>核心葡萄品种</h2><p>先认识 Chardonnay、Sauvignon Blanc、Riesling、Pinot Noir、Cabernet Sauvignon 和 Syrah；品种给出风格范围，不是固定答案。</p></section>
<section className="foundation-chapter" id="foundation-6" key="foundation-6"><span className="eyebrow">课前学习 · 7 / 8</span><h2>葡萄酒来自哪里</h2><p>从国家、产区到葡萄园建立地理方向，认识法国主要产区；先理解环境和品种的联系。</p></section>
<section className="foundation-chapter" id="foundation-7" key="foundation-7"><span className="eyebrow">课前学习 · 8 / 8</span><h2>怎么读懂一瓶酒</h2><p>从酒标寻找生产者、产地、年份、葡萄品种和酒精度。区分标签写明的信息与仍需核实的判断。</p></section>
<FoundationD1Review/><FoundationD1Quiz/><FoundationD2Review/><FoundationD2Quiz/><FoundationFranceReview/><FoundationD3Review/><FoundationD3Quiz/><FoundationD4Review/><FoundationD4Quiz/><FoundationSparklingPractice/>
<section className="white-panel foundation-study" aria-labelledby="foundation-course-title">
 <h2 id="foundation-course-title">进入正式课程之后</h2>
 <p>将基础理解用于品鉴、服务、推荐与餐酒搭配。第22期为五天面授；逐日教学安排及对应学习资料仍在核对，尚未完整开放。</p>
 <h3 id="foundation-assessment-title">第22期｜考核范围与复习索引</h3>
 <ul>
  <li><strong>考核项目</strong>　招生资料列出笔试、盲品、口试、餐酒搭配和侍酒服务实操，范围也包括烈酒、利口酒、清酒与白酒。</li>
  <li><strong>团队酒单作业</strong>　设计 12 款杯卖酒及 40 款主酒单酒款。可先分开列清单，再与同组学员核对数量和选酒理由。</li>
 </ul>
 <p>葡萄酒部分可按主题回看已有复习单元。实操和其他酒类请结合讲师的当期课堂资料。</p>
 <div className="button-row">
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d1-title')}>复习葡萄酒基础</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d2-title')}>复习葡萄品种</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d3-title')}>复习欧洲产区</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d4-title')}>复习工艺与世界产区</button>
 </div>
 <p className="fine-print">考核范围来自本页的第22期招生资料。复习索引按主题整理，具体日期、评分标准和提交方式以当期课程方通知为准。</p>
 <div className="button-row">
  <button className="button secondary" onClick={()=>go('service')}>服务情境练习</button>
  <button className="button secondary" onClick={()=>go('practice')}>葡萄酒练习</button>
 </div>
</section></>);
}

function PageTitle({eyebrow,title,desc}:{eyebrow:string,title:string,desc:string}){return <div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div>}
