'use client';
import React, {useEffect, useState} from 'react';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
import FoundationBridge from './FoundationBridge';
import FoundationBackup from './FoundationBackup';
import FoundationStudy from './FoundationStudy';
import FoundationConcepts from './FoundationConcepts';
import FoundationAssessmentPractice from './FoundationAssessmentPractice';
import {openReviewRecap} from './FoundationReviewRecap';
import FoundationCohort from './FoundationCohort';
import FoundationDirectory from './FoundationDirectory';
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

type FoundationPageProps = {go:(page:string)=>void; initialTarget?:string};
type RestoreResult = {written:number;skipped:number};

export default function FoundationPage({go,initialTarget}:FoundationPageProps){
 useEffect(()=>{
  if(initialTarget?.startsWith('foundation-'))focusFoundationTarget(initialTarget);
 },[initialTarget]);
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
<FoundationDirectory/><FoundationCohort/><FoundationBackup onRestored={onRestored}/><FoundationBridge/><FoundationStudy/><FoundationConcepts/>
<FoundationD1Review/><FoundationD1Quiz/><FoundationD2Review/><FoundationD2Quiz/><FoundationFranceReview/><FoundationD3Review/><FoundationD3Quiz/><FoundationD4Review/><FoundationD4Quiz/><FoundationSparklingPractice/>
<section className="white-panel foundation-study" aria-labelledby="foundation-course-title">
 <h2 id="foundation-course-title">进入正式课程之后</h2>
 <p>将基础理解用于品鉴、服务、推荐与餐酒搭配。第22期为五天面授；逐日教学安排及对应学习资料仍在核对，尚未完整开放。</p>
 <h3 id="foundation-assessment-title">第22期｜考核范围与复习索引</h3>
 <ul>
  <li><strong>考核项目</strong>　招生资料列出笔试、盲品、口试、餐酒搭配和侍酒服务实操，范围也包括烈酒、利口酒、清酒与白酒。</li>
  <li><strong>团队酒单作业</strong>　设计 12 款杯卖酒及 40 款主酒单酒款。可先分开列清单，再与同组学员核对数量和选酒理由。</li>
 </ul>
 <p>葡萄酒部分可按主题回看。服务、餐酒搭配与其他酒水可用下方情境自练，再和讲师的当期课堂资料对照。</p>
 <div className="button-row foundation-assessment-links">
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d1-title')}>复习葡萄酒基础</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d2-title')}>复习葡萄品种</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d3-title')}>复习欧洲产区</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-d4-title')}>复习工艺与世界产区</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-assessment-written-title')}>笔试案例自练</button>
  <button className="button secondary" aria-controls="foundation-assessment-oral" onClick={()=>openReviewRecap('foundation-assessment-oral')}>口试证据练习</button>
  <button className="button secondary" aria-controls="foundation-assessment-blind" onClick={()=>openReviewRecap('foundation-assessment-blind')}>盲品证据复盘</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-assessment-practice-title')}>餐厅情境自练</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-assessment-service-roleplay-title')}>服务实操自练</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-assessment-pairing-title')}>餐酒搭配对照练习</button>
  <button className="button secondary" onClick={()=>focusFoundationTarget('foundation-assessment-drink-comparison-title')}>四类酒水辨析</button>
 </div>
 <p className="fine-print">考核范围来自本页的第22期招生资料。复习索引按主题整理，具体日期、评分标准和提交方式以当期课程方通知为准。</p>
 <section className="foundation-week" aria-labelledby="foundation-assessment-written-title">
  <h4 id="foundation-assessment-written-title">笔试案例自练｜葡萄更甜，成酒就更甜吗？</h4>
  <p>同一块地的同一葡萄品种分两次采收。下面是虚构的练习资料。先逐条写下判断和依据，再展开参考答案。</p>
  <dl>
   <div><dt>甲批</dt><dd>采收时葡萄汁糖度较低。酒精发酵后，成酒检测结果为残糖 2 克／升，酒精度 11.5% vol.</dd></div>
   <div><dt>乙批</dt><dd>晚十天采收，采收时葡萄汁糖度较高。酒精发酵后，成酒检测结果为残糖 2 克／升，酒精度 13.0% vol.</dd></div>
  </dl>
  <ol>
   <li>两批谁的葡萄汁糖度更高？哪一批成酒的残糖更多？分别指出依据。</li>
   <li>用发酵解释，为什么葡萄汁糖度更高的乙批，成酒残糖仍可能和甲批相同？</li>
   <li>同伴只看到两瓶背标上的酒精度。写出一项他能确认的信息，以及判断成酒残糖还要查的资料。</li>
  </ol>
  <details id="foundation-assessment-written-answer">
   <summary>展开笔试案例参考答案</summary>
   <ol>
    <li>采收记录显示乙批葡萄汁糖度较高。成酒检测显示两批的残糖相同，均为 2 克／升。</li>
    <li>酒精发酵时，酵母消耗可发酵的糖，产生酒精和二氧化碳。起始糖更多，发酵消耗掉的糖也可以更多，因此成酒残糖可以相同。案例没有给出完整工艺记录，无法单独确定酒精度差异的成因。</li>
    <li>背标可确认两瓶各自标示的酒精度。要核对残糖，查对应酒款和批次的技术表或检测结果。</li>
   </ol>
  </details>
  <p className="fine-print">这套原创案例供课后复习。可回看 D1 的发酵与酒标单元。作答请记在自己的笔记中，页面不计分。</p>
 </section>
 <details id="foundation-assessment-oral">
  <summary id="foundation-assessment-oral-title">口试自练｜同为雷司令，怎样读出两瓶酒的区别？</summary>
  <p>用约一分钟向同学解释这两款酒。先说共同品种，再分别说明两瓶的产地线索与干甜线索。这个时长供自练参考。</p>
  <ul>
   <li>德国案例（D3 第11节）　Gauer 2024 Riesling Spätlese trocken</li>
   <li>奥地利案例（D3 第12节）　Domäne Wachau 2025 Riesling Smaragd Terrassen</li>
  </ul>
  <details>
   <summary>展开参考回答</summary>
   <p>两款都是雷司令。德国案例的 Spätlese 是 Prädikat，干型依据是 trocken。奥地利案例来自瓦豪，Smaragd 是 Vinea Wachau 的干型风格标示。想确认具体酒款的原产地标示或残糖数字，继续读酒标及技术表。</p>
  </details>
  <h4>同伴追问｜资料只给了一半</h4>
  <p>以下是两张虚构资料卡。同伴任选一张提问，学员用三句话作答。先给判断，再说手头证据，最后说明还要核实什么。</p>
  <details id="foundation-oral-alcohol">
   <summary>追问一｜13.5% vol. 能说明哪杯更甜吗？</summary>
   <p>甲酒背标写 13.5% vol.，乙酒写 11.5% vol.。两张卡都没有干甜说明或残糖数据。同伴说「甲度数高，糖肯定更多」。</p>
   <details>
    <summary>展开示范回答</summary>
    <p>现在无法判断哪瓶残糖更多。背标只确认甲的标示酒精度较高，成酒残糖是另一项指标。我会查对应批次的技术表来比较残糖，再用并排品尝比较甜感。</p>
   </details>
  </details>
  <details id="foundation-oral-variety">
   <summary>追问二｜同是白诗南，风格就一样吗？</summary>
   <p>两瓶正标都写 Chenin Blanc。甲的技术表注明干型，乙只有葡萄品种名。同伴说「这两瓶应该都是干型」。</p>
   <details>
    <summary>展开示范回答</summary>
    <p>两瓶标示的品种都是白诗南，甲的干型来自技术表。乙的干甜目前未知，同一品种可以做成不同风格。我会查乙的具体酒款和批次资料，核实它的干甜描述或残糖数据。</p>
   </details>
  </details>
  <p><strong>同伴自查　</strong>回答是否把已知事实、尚待核实的信息和核实办法说清楚？</p>
  <p className="fine-print">这是课程复习用的原创练习。展开答案不会计分或改变学习进度。</p>
 </details>
 <details id="foundation-assessment-blind">
  <summary id="foundation-assessment-blind-title">盲品自练｜先记录证据，再给判断</summary>
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
  <div id="foundation-assessment-blind-oak">
   <h4>对照练习｜两杯都有香草气息，都用了新桶吗？</h4>
   <p>这两杯是虚构样本。甲杯闻到香草和烘烤气息，口感饱满。乙杯也闻到香草，果味更鲜明。先各写一句观察、一项关于木材接触的推测，并写下要查的酿造资料。</p>
   <details id="foundation-assessment-blind-oak-record">
    <summary>揭晓模拟酿造记录</summary>
    <ul>
     <li>甲批中 30% 在新橡木桶熟成，其余在不锈钢罐熟成。</li>
     <li>乙批在不锈钢罐中熟成，使用了橡木片。</li>
    </ul>
    <p>按记录改写你的判断。哪杯确认有一部分酒经过新桶熟成？能否凭香草气息判断新桶用量？</p>
    <details id="foundation-assessment-blind-oak-answer">
     <summary>展开参考复盘</summary>
     <p>甲杯有 30% 的酒经过新桶熟成，比例来自模拟酿造记录。乙杯使用了橡木片。香草气息可以记录为观察，熟成容器和用桶比例需用对应批次的酿造资料核实。</p>
    </details>
   </details>
  </div>
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
  <div id="foundation-assessment-team-audit">
   <h4>酒单复核｜12 行里有几款能卖？</h4>
   <p>这是一份虚构的训练草案。杯卖草案有 12 行，前 8 行已核对，分别对应 8 款可售酒，且与后 4 行的酒款均不重复。余下 4 行如下。</p>
   <ul>
    <li><strong>第 9 行</strong>　山谷酒庄「晨雾」干白 2023，库存已确认。</li>
    <li><strong>第 10 行</strong>　同一生产者、同一酒款和年份，名称用另一种译法，库存记录与第 9 行相同。</li>
    <li><strong>第 11 行</strong>　海岸酒庄「潮线」干红 2022，库存为零。</li>
    <li><strong>第 12 行</strong>　丘陵酒庄「微风」起泡酒，年份字段空白，实物未核对。</li>
   </ul>
   <p>和同伴各做一遍复核。算出目前已确认可售的不同酒款数，写下每条待处理记录的下一步，再说明这份杯卖核对能否用来确认 40 款主酒单已完成。</p>
   <details id="foundation-assessment-team-audit-answer">
    <summary>展开酒单复核参考</summary>
    <ol>
     <li>8 款已核对，再加第 9 行，共 9 款已确认可售。第 10 行合并到第 9 行，第 11 行标为缺货，补货确认前安排候选替代。</li>
     <li>第 12 行待查实物和库存。酒标若明确标注年份就填写，核实为无年份再标注无年份。</li>
     <li>主酒单另做一轮核对。分别清点两份酒单，按课程方确认的规则处理两份清单之间的重叠。</li>
    </ol>
   </details>
  </div>
  <p className="fine-print">数量来自第22期招生资料。上述字段和复核步骤供自练，正式提交要求以课程方通知为准。</p>
 </details>
 <FoundationAssessmentPractice/>
 <h3 id="foundation-certificate-title">结课与证书</h3>
 <p>第22期招生资料列出 SOMM100 初级侍酒师证书和见习侍酒师证书。初级证书涉及符合要求的餐饮行业在职经历。应届实习生适用见习证书规则，达到相关全职工作条件后可申请转换。</p>
 <p className="fine-print">以上为 SOMM100 项目证书。申请条件、材料和办理方式请向课程方确认。</p>
 <div className="button-row">
  <button className="button secondary" onClick={()=>go('service')}>服务情境练习</button>
  <button className="button secondary" onClick={()=>go('practice')}>葡萄酒练习</button>
 </div>
</section></>);
}

function PageTitle({eyebrow,title,desc}:{eyebrow:string,title:string,desc:string}){return <div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div>}
