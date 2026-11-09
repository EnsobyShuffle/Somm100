'use client';
import React, {useEffect, useState} from 'react';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import FoundationBridge from './FoundationBridge';
import FoundationBackup from './FoundationBackup';
import FoundationStudy from './FoundationStudy';
import FoundationConcepts from './FoundationConcepts';
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
<div className="button-row"><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-study-title')}>课前预习</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-bridge-title')}>课堂间学习路径</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d1-title')}>D1 课堂后复习</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d1-quiz-title')}>D1 综合自测</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d2-title')}>D2 葡萄品种复习</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d2-quiz-title')}>D2 综合自测</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-france-title')}>法国专题复习</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d3-title')}>D3 欧洲产区</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d3-quiz-title')}>D3 综合自测</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d4-title')}>D4 工艺与世界产区</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d4-quiz-title')}>D4 综合自测</button><button className="button secondary" onClick={()=>focusFoundationTarget('foundation-sparkling-title')}>起泡酒练习</button></div><FoundationCohort/><FoundationBackup onRestored={onRestored}/><FoundationBridge/><FoundationStudy/><FoundationConcepts/>
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
 <details id="foundation-assessment-oral">
  <summary>口试自练｜同为雷司令，怎样读出两瓶酒的区别？</summary>
  <p>用约一分钟向同学解释这两款酒。先说共同品种，再分别说明两瓶的产地线索与干甜线索。这个时长供自练参考。</p>
  <ul>
   <li>德国案例（D3 第11节）　Gauer 2024 Riesling Spätlese trocken</li>
   <li>奥地利案例（D3 第12节）　Domäne Wachau 2025 Riesling Smaragd Terrassen</li>
  </ul>
  <details>
   <summary>展开参考回答</summary>
   <p>两款都是雷司令。德国案例的 Spätlese 是 Prädikat，干型依据是 trocken。奥地利案例来自瓦豪，Smaragd 是 Vinea Wachau 的干型风格标示。想确认具体酒款的原产地标示或残糖数字，继续读酒标及技术表。</p>
  </details>
  <p className="fine-print">这是课程复习用的原创练习。展开答案不会计分或改变学习进度。</p>
 </details>
 <details id="foundation-assessment-blind">
  <summary>盲品自练｜先记录证据，再给判断</summary>
  <p>请同伴遮住酒标并编号。可先用一款酒练习，也可以直接做下面的文字题。</p>
  <ol>
   <li><strong>记观察</strong>　写下闻到的香气，分别记录甜度、酸度、酒体和适用的单宁感。拿不准的项目标为「待复核」。</li>
   <li><strong>给判断</strong>　先给一个风格判断，用两条观察支持，再写一种仍说得通的解释。</li>
   <li><strong>揭标复盘</strong>　把酒标或技术表能确认的内容写在另一栏，再改写一句下次能用的品鉴笔记。</li>
  </ol>
  <p><strong>文字练习</strong>　A 杯是浅金色白葡萄酒。甜感明显，酸度高，闻到杏干与蜂蜜。你能先判断什么？要分辨冰酒与贵腐甜酒，还需要查什么？</p>
  <details>
   <summary>展开参考分析</summary>
   <p>可以先判断是甜型白葡萄酒，同时记录高酸和果香。杏干或蜂蜜可出现在不同甜酒中。揭标后查酒款名称及酿造资料，分别寻找藤上自然冻结和贵腐果筛选的证据，再决定哪种解释成立。</p>
  </details>
  <p className="fine-print">这是原创自练。正式考核的酒款、题型和评分以课程方通知为准。</p>
 </details>
 <details id="foundation-assessment-team">
  <summary>团队酒单自练｜从两份草案到组内核对</summary>
  <p>先约定一个餐厅场景，写下菜单方向和客人常见需求。每位组员先提名一款酒，说明它在酒单上解决什么需求。</p>
  <ol>
   <li><strong>分开起草</strong>　分别准备 12 款杯卖酒和 40 款主酒单酒款。先写清每组希望覆盖的风格，再挑酒款。</li>
   <li><strong>逐款核实</strong>　记录生产者、酒款名、年份或无年份、产地与风格。每款补一句选酒理由，标出还需要核实的资料。</li>
   <li><strong>交叉复核</strong>　交换草案，分别清点两份酒单，检查各自的重复项和风格缺口。请同学追问一款酒的选择理由，再据此修改。</li>
  </ol>
  <p className="fine-print">数量来自第22期招生资料。上述字段和复核步骤供自练，正式提交要求以课程方通知为准。</p>
 </details>
 <div className="button-row">
  <button className="button secondary" onClick={()=>go('service')}>服务情境练习</button>
  <button className="button secondary" onClick={()=>go('practice')}>葡萄酒练习</button>
 </div>
</section></>);
}

function PageTitle({eyebrow,title,desc}:{eyebrow:string,title:string,desc:string}){return <div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div>}
