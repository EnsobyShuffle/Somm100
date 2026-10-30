import {ArrowUpRight,BookOpen,CheckCircle2,Clock3,Download,FileText,Globe2,Map,PlayCircle,Wine} from 'lucide-react';
import './recent-releases.css';
import producerData from '../data/producers.json';
import rullyRelease from '../data/rully-reference.json';
const franceProducers=producerData.producers.filter(p=>p.country==='France');
const franceWineCount=franceProducers.reduce((n,p)=>n+p.wines.length,0);

type Release={title:string;category:string;description:string;href:string;label:string;icon:any;meta?:string};
const live:Release[]=[
 {title:'Rully · Regional Reference',category:'WINE LIBRARY · COMPLETED 2026-10-29',description:'原有 93 款酒已逐款核对并补齐中英文正文，新增酒款同时接入。23 个一级园均已建立地块资料与站内酒款连接，BIVB 目录中位于 Rully 的 14 条生产者记录均已接入站内档案。',href:'#library?type=region&id=fr-rully',label:'打开 Rully 完整资料',icon:Wine,meta:rullyRelease.producerCount+' 家酒庄 · '+rullyRelease.wineCount+' 款酒 · 23 个一级园 · 下一村庄 Mercurey'},
 {title:'Module 01 · Understanding and Extension',category:'CMS · UPDATED 2026-10-28',description:'16 个延伸主题已更新摘要、原始阅读链接和真实图片；正文集中阅读，练习集中在题库。原有章节笔记和进度 ID 保留，新延伸主题单独记录完成。',href:'#cms-module?module=module01&resource=expansion',label:'打开新版延伸阅读',icon:BookOpen,meta:'16 个主题 · 7 张有许可的图片 · 25 条阅读链接'},
 {title:'France · Producers & Wines',category:'WINE LIBRARY · UPDATED 2026-10-29',description:'已接入法国酒庄与酒款正文，包含 Provence、Corsica、Roussillon、Beaujolais 与 Rully。可从产区进入酒庄，再到酒款和葡萄品种。原有中英文档案保留；新增资料标注语言、来源与年份适用范围。',href:'#producers?country=France',label:'打开法国酒庄档案',icon:Wine,meta:franceProducers.length+' 家酒庄 · '+franceWineCount+' 款关联酒款 · 首版持续扩充'},
 {title:'CMS · Spain & Portugal',category:'CMS · READING OVERVIEW',description:'补入 10 Spain、11 Portugal 的首版阅读提纲。法国南部改为 09A Provence & Corsica、09B Languedoc & Roussillon、09C Southwest France；原有链接和笔记继续对应原章节。',href:'#cms-module?module=module10-spain',label:'打开 Spain',icon:BookOpen,meta:'20 节阅读提纲 · 29 个编号模块，其中 09 分 A/B/C'},
 {title:'Italy · Regional Grape Atlas',category:'WINE LIBRARY · GRAPES',description:'按意大利 20 个大区浏览本地品种、同义名和已关联的 DOC/DOCG；保留意大利大区顺序。',href:'/releases/italy-grapes/',label:'打开品种图谱',icon:Globe2,meta:'261 个品种标签 · 321 个大区分布 · 独立预览版'},
 {title:'Italy · MS Producers & Wines',category:'SOMM100 · MASTER SOMMELIER',description:'意大利 MS 复习预览：区域、生产者、酒款与回忆题。名称正在和主站 canonical ID 对齐，先作为独立学习预览开放。',href:'/releases/italy-ms/',label:'打开意大利 MS',icon:Wine,meta:'80 家生产者索引 · 111 款酒索引 · 10 道回忆题'},
 {title:'South America · MS Theory',category:'SOMM100 · MASTER SOMMELIER',description:'南美离线学习应用，作为新增的 MS 理论学习入口。',href:'/releases/south-america-ms/',label:'打开南美模块',icon:BookOpen,meta:'离线 HTML 预览'},
 {title:'ONE English · Editorial v0.2',category:'ENGLISH · SEPARATE COURSE',description:'独立的每日英语课程，含单词复习、实用句、分级阅读和情境口语。与主站餐饮/侍酒英语课程并行，不覆盖原课程。',href:'/releases/one-english/',label:'开始学习 English',icon:BookOpen,meta:'v0.2 版面更新 · 保留原有本机学习记录'},
 {title:'Wine Atlas · Flat Map V2',category:'WINE MAPS · INTERACTIVE PREVIEW',description:'可拖动、缩放的平面酒图预览。产区边界和葡萄园地块数据仍在补齐，当前按交互原型开放。',href:'/releases/wine-atlas-v2/',label:'打开地图 V2',icon:Map,meta:'实验版 · 不作为法定边界地图'},
 {title:'Tasting Notes · V1.6',category:'TASTING NOTES · NEW VERSION',description:'最新独立品鉴记录版本，可直接在浏览器使用。主站内嵌版数据与此独立页面的本机记录各自保存。',href:'/releases/tasting-notes-v16/',label:'打开 V1.6',icon:Wine,meta:'浏览器本机记录'},
 {title:'CMS · Modules 03–08',category:'CMS CERTIFIED · FIRST PASS',description:'Bordeaux、Burgundy & Beaujolais、Champagne、Other Sparkling Wines、Loire Valley、Rhône Valley 已进入主站 CMS 目录。03–05 含短答题库与成果清单；06–08 含首版阅读与学习成果检查。',href:'#cms-module?module=module03&stage=1&resource=core',label:'进入 Module 03',icon:BookOpen,meta:'Module 03–05：150 道短答 · 126 项检查；Module 06–08：首版学习稿'},
 {title:'CMS · Modules 09–29',category:'CMS CERTIFIED · FIRST PASS',description:'法国南部至德国、奥地利、希腊、中欧、澳新、美加、南美、南非，以及加强酒、烈酒、搭配、商业、品鉴和服务模块，已进入 CMS 目录。各模块保留首版主稿章节与学习目标；法规复核、正式 checklist 和认证级题库仍待导入。',href:'#cms-module?module=module09&stage=1&resource=core',label:'进入 Module 09',icon:BookOpen,meta:'法国南部 09A–C + 12–29 · 首版阅读，非全部完成'},
];
const queue=[
 {title:'CMS · Full Text & Extension Coverage',area:'课程正文与素材',status:'逐模块补齐',detail:'最新 02–29 Core Text 页面多数为简短提纲，不能以页面存在判定完整教材已完成。本次保留线上较详细内容；下一轮补实质正文、主题图片与延伸，之后再横向补 checklist 和题库。'},
 {title:'New World · MS Research Handoff',area:'澳新、美洲、南非',status:'研究稿待接入',detail:'澳大利亚、新西兰、美国、南非、智利、阿根廷交接稿已盘点。先核对其与现有课程及国家档案的重复和缺口，再按产区、品种、酒庄、酒款接入。'},
 {title:'Foundation · Pre-learning',area:'SOMM100 基础课',status:'待原课件对齐',detail:'课前预习与 D1–D4 的学习安排需要对齐原有课件；现有需求说明不等于已完成的课程内容。'},
 {title:'Wine Atlas · V3',area:'地图',status:'原型待地图核验',detail:'V3 地块交互原型已取得，但示意地块不能作为真实法定边界；先核对数据再替换现有入口。'},
 {title:'France · Mercurey',area:'逐村庄完成产区、酒庄与酒款',status:'下一村庄',detail:'Rully 本轮资料已收尾：'+rullyRelease.producerCount+' 家酒庄、'+rullyRelease.wineCount+' 款酒，23 个一级园均有站内酒款连接，核对日期 2026-10-29。下一村庄为 Mercurey，按同一结构整理产区、地块、生产者和酒款。Rully 后续新增年份、图片及未公开参数作为维护更新，不再阻塞村庄推进。'},
 {title:'Germany · Wine Library 2026-10-26',area:'品种、产区、法规',status:'待审核 / 待映射',detail:'整理稿包含 119 条技术登记品种、13 个产区、26 个 Landwein 索引和 70 道复习题；线上 schema 尚未核对，法规与覆盖缺口仍需复核。'},
 {title:'China · Wine Library v0.1',area:'中国葡萄酒',status:'待接入',detail:'初版研究库：18 个产区、12 家生产者、8 款酒、7 个年份记录，另有来源、地图资源与研究队列。先接主站区域 / 生产者 / 酒款关系，再开放学习页。'},
 {title:'CMS Certified · Question Banks & Checklists',area:'CMS 课程',status:'内容补齐与审核',detail:'Modules 09–29 当前上线的是已映射到课程目录的 Stage 0–1 首版阅读，正式逐项 checklist、认证级题库、现行法规核对，以及 Map / Producer / Dictionary 关联仍需按模块补齐。'},
 {title:'Wine Channel · Sourcebook & Video Inventory',area:'视频频道',status:'已盘点 / 待选片',detail:'最新盘点为 774 个视频、23 份字幕，当前没有已就绪的上线视频。先完成授权、字幕和内容核对，再接入课程；来源账号数量不等于可用课程视频数量。'},
 {title:'Quizlet Migration Checkpoint',area:'练习与复习',status:'迁移检查点',detail:'已取得 141 组、20,605 张卡片及 617 张图片的迁移包。仍需去重、答案核对、授权和主站题目 ID 对齐；这些尚未计入线上可练习题数。'},
];
const resource=[
 {title:'绍兴酒学习指南',href:'/releases/resources/Into_Shaoxing_Wine_Study_Guide.pdf',label:'打开 PDF'},
];
export function RecentReleases(){return <div className="recent-releases">
 <header className="page-title"><span className="eyebrow">CONTENT AUDIT & RELEASE · 2026-10-29</span><h1>近期新增与发布</h1><p>对照课程原稿、研究资料和线上内容，记录本次实际发布与尚待补齐的部分。</p></header>
 <div className="recent-release-summary"><CheckCircle2 size={18}/><span><b>{live.length} 个可直接打开的学习入口</b><small>独立预览先开放；数据型内容按来源、字段和重复记录核对后再并入主知识库。</small></span></div>
 <section className="recent-section"><div className="recent-section-title"><div><span className="eyebrow">OPEN NOW</span><h2>现在可以直接学习</h2></div><span>{live.length} 项</span></div><div className="recent-card-grid">{live.map(item=><article className="recent-card" key={item.href}><div className="recent-card-top"><item.icon size={19}/><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.description}</p><small>{item.meta}</small><a className="recent-open" href={item.href} target="_blank" rel="noreferrer">{item.label}<ArrowUpRight size={15}/></a></article>)}</div></section>
 <section className="recent-section"><div className="recent-section-title"><div><span className="eyebrow">INTEGRATION QUEUE</span><h2>已经检查，正在整合</h2></div><span>{queue.length} 组</span></div><div className="recent-queue">{queue.map(item=><article className="recent-queue-row" key={item.title}><div><span className="eyebrow">{item.area}</span><h3>{item.title}</h3><p>{item.detail}</p></div><span className="recent-status"><Clock3 size={13}/>{item.status}</span></article>)}</div></section>
 <section className="recent-section"><div className="recent-section-title"><div><span className="eyebrow">REFERENCE FILES</span><h2>配套资料</h2></div></div><div className="recent-resource-list">{resource.map(item=><a href={item.href} key={item.href} target="_blank" rel="noreferrer"><FileText size={17}/><span>{item.title}</span><b>{item.label}<Download size={14}/></b></a>)}</div><p className="recent-footnote">主站 Wine Library、Wine Regions、Grape Varieties、Wine Maps、Wine Channel、English Study、Tasting Notes 与现有 CMS 课程继续保留；上方展示的是最近新增的学习预览和接入状态。</p></section>
 </div>}
