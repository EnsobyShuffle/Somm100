'use client';
import React,{useEffect,useState} from 'react';
import {BookOpen,Check,Map as MapIcon,Layers} from 'lucide-react';
import curriculum from '../data/curriculum.json';
import cmsData from '../data/cms-learning.json';
import stages from '../data/learning-stages.json';
import {cmsHref,readCmsRoute,readCmsLevel} from '../lib/cms-navigation';
import {RecallCards} from './Upgrade';
import {QuizStudy} from './QuizStudy';
import {ChapterPlan} from './ChapterPlan';
import {StudyNotes} from './StudyNotes';
import {chapterProgress} from '../lib/chapter-plan';
import './cms-learning.css';

const modules:any[]=cmsData.modules;
const resourceNames=[['core','Core Text Reading','核心阅读'],['expansion','Understanding and Extension','理解与延伸'],['guide','Syllabus Guide','考纲导读'],['checklist','Knowledge Checklist','成果检查'],['questions','Question Bank','章节题库']];
function safeHref(url:string){return /^(https?:\/\/|#[a-z])/i.test(url)?url:undefined;}
function learningLink(url:string){
 for(const m of modules){
  if(url.split('?')[0]===m.sourceUrl)return cmsHref(m.id);
  for(const [key,v] of Object.entries(m.resources) as [string,any][])if(url.split('?')[0]===v.url.split('?')[0])return cmsHref(m.id,key);
 }
 return safeHref(url);
}
function Inline({text}:{text:string}){
 const parts=text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*\n]+\*)/g);
 return <>{parts.map((part,i)=>{
  const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if(link){const href=learningLink(link[2]);return href?<a key={i} href={href} target={href.startsWith('#')?undefined:'_blank'} rel={href.startsWith('#')?undefined:'noreferrer'}>{link[1]}</a>:<span key={i}>{link[1]}</span>}
  if(part.startsWith('**'))return <strong key={i}>{part.slice(2,-2)}</strong>;
  if(part.startsWith('*'))return <em key={i}>{part.slice(1,-1)}</em>;
  return <React.Fragment key={i}>{part}</React.Fragment>;
 })}</>;
}
function Figure({block}:{block:any}){
 const [failed,setFailed]=useState(false);
 return <figure className="cms-figure">{block.src&&!failed?<a href={block.src} target="_blank" rel="noreferrer" aria-label={'放大图片：'+block.caption}><img src={block.src} alt={block.caption} loading="lazy" onError={()=>setFailed(true)}/></a>:<a href={block.sourceUrl} target="_blank" rel="noreferrer">在原稿查看图片</a>}<figcaption><Inline text={block.caption}/>{block.licenseUrl&&<a href={block.licenseUrl} target="_blank" rel="noreferrer">{block.license}</a>}<a href={block.sourceUrl} target="_blank" rel="noreferrer">原图来源</a></figcaption></figure>;
}
function Reading({blocks}:{blocks:any[]}){return <div className="cms-reading">{blocks.map((b,i)=>b.type==='heading'?<h3 key={i}><Inline text={b.text}/></h3>:b.type==='note'?<aside className="cms-editor-note" key={i}><Inline text={b.text}/></aside>:b.type==='list'?<ul key={i}>{b.items.map((t:string,j:number)=><li key={j}><Inline text={t}/></li>)}</ul>:b.type==='table'?<div className="cms-table-wrap" key={i}><table><tbody>{b.rows.map((row:string[],j:number)=><tr key={j}>{row.map((cell,k)=>j===0?<th key={k}><Inline text={cell}/></th>:<td key={k}><Inline text={cell}/></td>)}</tr>)}</tbody></table></div>:b.type==='image'?<Figure key={i} block={b}/>:<p key={i}><Inline text={b.text}/></p>)}</div>}
function ReadingProgress({module,state}:{module:any,state:any}){
 const ids=module.resources.core.sections.filter((s:any)=>s.track).map((s:any)=>s.id);const done=ids.filter((id:string)=>(state.readings||[]).includes(id)).length;
 return <div className="cms-reading-progress"><span>{done} / {ids.length} 节核心阅读</span><progress value={done} max={ids.length}/></div>;
}
export function CmsHome({state,go,challenge,level=''}:{state:any,go:any,challenge:any,level?:string}){
 const chosen=({IC:{title:'IS / CS',en:'Introductory / Certified',description:'沿着核心阅读建立知识框架，再用练习检查理解。'},AS:{title:'AS',en:'Advanced',description:'从理解与延伸出发，练习分析、比较与解释。'},MS:{title:'MS',en:'Master',description:'进入专题练习，结合品鉴与服务训练巩固综合判断。'}} as Record<string,{title:string;en:string;description:string}>)[level];
 const directory=level==='AS'?modules.filter(m=>m.resources.expansion.sections.length>0):modules;
 const entryResource=level==='AS'?'expansion':'core';
 return <div className="cms-learning"><button className="back-link" onClick={()=>go('courses')}>← 选择课程</button><div className="page-title cms-home-heading"><span className="eyebrow">COURSES · CMS{chosen?' · '+chosen.en:''}</span><h1>{chosen?.title||'CMS'}</h1><p>{chosen?.description||'选择学习层级，按自己的节奏安排章节。'}</p></div>
 {chosen?<div className="course-level-practice"><div><span className="eyebrow">WINE QUIZ</span><h2>{chosen.title} · 专题练习</h2><p>按本级别进入题库，回忆、收藏并安排复习。</p></div><button className="button" onClick={()=>challenge(level)}>进入 {chosen.title} 练习 →</button></div>:<section className="cms-level-section cms-level-first" aria-label="CMS 学习层级"><div className="cms-level-grid">{[['IC','IS / CS','Introductory / Certified','基础与应用'],['AS','AS','Advanced','分析与比较'],['MS','MS','Master','深入推理']].map(([id,short,name,zh])=><button key={id} onClick={()=>challenge(id)}><span className="eyebrow">{short}</span><h3>{name}</h3><p>{zh}</p><span className="cms-level-action">按此级别练习 · {curriculum.questions.filter(q=>q.track==='CMS'&&(id==='IC'?['Intro','CS'].includes(q.difficulty):q.difficulty===id)).length} 题</span></button>)}</div></section>}
 <section className="cms-chapter-directory" aria-labelledby="cms-directory-title"><h2 id="cms-directory-title">{level==='AS'?'理解与延伸':level==='MS'?'核心阅读参考':'课程目录'}</h2><ol>{directory.map(m=>{const p=chapterProgress(m,state);return <li key={m.id}><a className="cms-chapter-row" href={cmsHref(m.id,entryResource,'',1,level)}><span className="cms-chapter-number" aria-label={'Module '+m.number}>{m.number}</span><div className="cms-chapter-name"><h3>{m.title}</h3><span>{m.zh}</span></div><div className="cms-chapter-progress"><div><span>学习进度</span><strong>{p.percent}%</strong></div><progress aria-label={'Module '+m.number+' 章节完成进度'} value={p.done} max={p.total||1}/></div></a></li>})}</ol></section>
 <div className="cms-source-status">当前章节以 Introductory / Certified 为基础，含 AS 延伸。中英双语学习稿待教师终审；自编题已移除，Wine Quiz 仅接入指定来源原题；Quizlet 学习题不代表 CMS 官方真题。</div>
 <div className="cms-training-links"><button className="chip" onClick={()=>go('tasting')}>Deductive Tasting · 品鉴训练</button><button className="chip" onClick={()=>go('service')}>Practical / Service · 服务训练</button></div></div>;
}
function Checklist({module,state,save}:{module:any,state:any,save:any}){
 const [busy,setBusy]=useState('');const items=curriculum.checklist.filter(k=>module.checklistIds.includes(k.id));
 return <section className="cms-checklist"><h2>Knowledge Checklist <small>成果检查</small></h2><p>能够闭卷解释、比较或应用，再勾选。已掌握 {(state.checks||[]).filter((id:string)=>module.checklistIds.includes(id)).length} / {items.length}。</p>{items.map((k:any,i:number)=>{
 const lid=k.lessonId||curriculum.lessons.find(l=>l.knowledgePoints.includes(k.id))?.id;const section=[...module.resources.expansion.sections,...(module.resources.expansion.archivedSections||[])].find((s:any)=>s.lessonId===lid);
 return <div className="cms-check-item" key={k.id}><label><input type="checkbox" checked={(state.checks||[]).includes(k.id)} disabled={busy===k.id} onChange={async e=>{setBusy(k.id);await save({type:'check',knowledgePointId:k.id,active:e.target.checked});setBusy('')}}/><span><strong>{String(i+1).padStart(2,'0')}</strong><span>{k.body.replace(/^KP\d+\s*(\[[^\]]+\])?\s*/,'').split(/Study →|Read →/)[0].trim()}</span></span></label><small className="cms-check-reference">{k.body.match(/(?:Study →|Read →)[\s\S]*/)?.[0]}</small><div className="cms-check-links">{section&&<a href={cmsHref(module.id,'expansion',section.id)}>回看知识</a>}<a href={cmsHref(module.id,'questions')}>章节练习</a></div></div>;
 })}</section>;
}
function ResourceNotes({resource}:{resource:any}){return <details className="cms-resource-notes"><summary>Study instructions · 使用方法与完成标准</summary><Reading blocks={resource.notes||[]}/></details>}
function KnowledgeLinks({module}:{module:any}){return <div className="cms-knowledge-links"><span className="eyebrow">EXPLORE</span>{module.id==='module02'?<><a href="https://www.vinsalsace.com/en/carte/" target="_blank" rel="noreferrer"><MapIcon size={16}/> Alsace · CIVA 官方地图</a><a href="#grapes">Riesling · Gewurztraminer · Pinot Gris · Muscat</a><a href="#producers">Producers · 酒庄资料</a></>:<><a href="#regions">Wine Regions · 产区资料</a><a href="#grapes">Grape Varieties · 品种资料</a><a href="#maps">Wine Maps · 葡萄酒地图</a></>}</div>}
export function CmsModule({state,save,go,openLesson}:{state:any,save:any,go:any,openLesson:any}){
 const [route,setRoute]=useState(readCmsRoute(''));const [level,setLevel]=useState('');const [busy,setBusy]=useState(false);
 useEffect(()=>{const read=()=>{setRoute(readCmsRoute(location.hash));setLevel(readCmsLevel(location.hash))};read();addEventListener('hashchange',read);return()=>removeEventListener('hashchange',read)},[]);
 const courseHref=(moduleId='module01',resource='core',section='',stage=1)=>cmsHref(moduleId,resource,section,stage,level);
 const module=modules.find(m=>m.id===route.moduleId)!;const resource=module.resources[route.resource];
 const sections=resource.sections||[];const section=sections.find((s:any)=>s.id===route.section)||(resource.archivedSections||[]).find((s:any)=>s.id===route.section)||sections.find((s:any)=>s.track)||sections[0];
 const chapterQuestions=curriculum.questions.filter(q=>module.questionIds.includes(q.id)).sort((a,b)=>Number(a.id.startsWith('ADV'))-Number(b.id.startsWith('ADV')));
 const questions=chapterQuestions.filter(q=>!(state.dismissed||[]).includes(q.id));
 const defaults=questions.filter(q=>q.type==='short').slice(0,3);
 const exercises=section?.questionIds?.map((id:string)=>questions.find(q=>q.id===id)).filter(Boolean).slice(0,3)||defaults;
 const index=sections.indexOf(section);const s=stages.stages[route.stage-1];
 const weak=questions.filter(q=>state.reviews.some((r:any)=>r.question_id===q.id&&!r.last_score));
 function jump(resource:string,section='',stage=route.stage){location.hash=courseHref(module.id,resource,section,stage);window.scrollTo({top:0,behavior:'instant'})}
 const noteContext={moduleId:module.id,moduleTitle:'Module '+module.number+' · '+module.title,stage:route.stage,resource:route.resource,sectionId:route.stage===1?section?.id||'':'',title:route.stage===1?(section?.title||resource.title):s.en,href:courseHref(module.id,route.resource,route.stage===1?section?.id||'':'',route.stage)};
 const sourceFooter=<footer className="cms-source-footer"><span>Source · 原始学习资料</span><a href={resource.url} target="_blank" rel="noreferrer">{resource.title.replace(/^[^A-Za-z0-9\u4e00-\u9fff]+/,'')}</a><small>资料来源与审核状态按本章原稿标示；本页学习稿保留出处，教师复核中。</small></footer>;
 return <div className="cms-learning"><div className="cms-breadcrumb"><a href={level?'#cms?level='+level:'#cms'}>{level==='IC'?'IS / CS':level||'CMS'}</a><span>/</span>{modules.map(m=><a key={m.id} aria-current={m.id===module.id?'page':undefined} href={courseHref(m.id)}>Module {m.number}</a>)}</div><header className="cms-module-heading"><div><span className="eyebrow">MODULE {module.number} · INTRODUCTORY / CERTIFIED</span><h1>{module.title}</h1><p>{module.zh} <span>· {module.pages}</span></p></div><ReadingProgress module={module} state={state}/></header><StudyNotes context={noteContext}/><div className="cms-module-schedule"><ChapterPlan key={module.id} module={module} state={state} save={save}/></div><nav className="stage-tabs" aria-label="CMS 四阶段">{stages.stages.filter(x=>module.contentStatus!=='reading-overview'||x.id===1).map(x=><a key={x.id} aria-current={route.stage===x.id?'step':undefined} className={route.stage===x.id?'selected':''} href={courseHref(module.id,route.resource,'',x.id)}><span>STAGE {x.id} · {x.en}</span><b>{x.zh}</b></a>)}</nav><div className="cms-stage-caption"><strong>{s.en}</strong><p>{s.body}</p></div>
 {route.stage===1&&<><nav className="cms-resource-tabs" aria-label="章节学习资料">{resourceNames.filter(([id])=>id==='core'||id==='questions'&&module.questionIds.length>0||id==='checklist'&&module.checklistIds.length>0||['guide','expansion'].includes(id)&&module.resources[id].sections.length>0).map(([id,en,zh])=><a key={id} className={route.resource===id?'selected':''} aria-current={route.resource===id?'page':undefined} href={courseHref(module.id,id)}>{en}<small>{zh}</small></a>)}</nav>
 {['core','expansion','guide'].includes(route.resource)&&<div className="cms-reader-layout"><aside className="cms-toc"><label>本章目录<select aria-label="选择阅读小节" value={section?.id} onChange={e=>jump(route.resource,e.target.value)}>{sections.map((x:any)=><option key={x.id} value={x.id}>{x.title}</option>)}</select></label><div className="cms-toc-items">{sections.map((x:any)=><a className={x.id===section?.id?'selected':''} href={courseHref(module.id,route.resource,x.id)} key={x.id}>{((state.readings||[]).includes(x.id)||(x.lessonId&&route.resource==='expansion'&&state.completed.includes(x.lessonId)))&&<Check size={13}/>}<span>{x.title}</span></a>)}</div></aside><article className="cms-article" data-cms-section={section?.id} key={module.id+route.resource+section?.id}><span className="eyebrow">{resourceNames.find(r=>r[0]===route.resource)?.[1]}</span><h2>{section?.title}</h2>{route.resource==='core'&&<div className="cms-reading-context">{['module01','module02'].includes(module.id)?'教材英文与中文译文按原稿顺序保留；术语与编者解析分别标示。':module.contentStatus==='reading-overview'?'首版阅读提纲 · 按产区、品种和风格建立章节结构。':'章节学习稿 · 按本章主题阅读，题目集中在 Question Bank。'}{module.id==='module02'&&<>原书法规及数字须结合 <a href={courseHref(module.id,'core',sections.find((x:any)=>x.title.startsWith('Essential editorial'))?.id)}>勘误说明</a> 阅读。</>}</div>}<Reading blocks={section?.blocks||[]}/>{route.resource==='expansion'&&<KnowledgeLinks module={module}/>}{route.resource!=='core'&&exercises.length>0&&<RecallCards key={section?.id} items={exercises} save={save} label="Quick recall · 先回答，再揭晓"/>}{section?.track&&<div className="cms-reader-actions"><button className="button" disabled={busy||(route.resource==='core'?(state.readings||[]).includes(section.id):state.completed.includes(section.lessonId))} onClick={async()=>{setBusy(true);await save(route.resource==='core'?{type:'read',readingId:section.id}:{type:'complete',lessonId:section.lessonId},'学习进度已保存');setBusy(false)}}><Check size={16}/>{(route.resource==='core'?(state.readings||[]).includes(section.id):state.completed.includes(section.lessonId))?'已完成':'标记本节已完成'}</button>{module.questionIds.length>0&&<button className="button secondary" onClick={()=>jump('questions')}>本章全部练习</button>}</div>}{sourceFooter}<div className="cms-reading-pager"><button disabled={index<=0} onClick={()=>jump(route.resource,sections[index-1].id)}>上一节</button><span>{index+1} / {sections.length}</span><button disabled={index>=sections.length-1} onClick={()=>jump(route.resource,sections[index+1].id)}>下一节</button></div></article></div>}
 {route.resource==='checklist'&&<><ResourceNotes resource={resource}/><Checklist module={module} state={state} save={save}/>{sourceFooter}</>}
 {route.resource==='questions'&&<><p className="subtle-note">本章自编题已移除，指定来源原题尚未完成章节映射。<a href="#practice">打开 Wine Quiz 原题集</a></p><QuizStudy key={module.id} questions={chapterQuestions} state={state} save={save} initialLevel="all" openLesson={openLesson} heading={'Module '+module.number+' · Question Bank'}/>{sourceFooter}</>}
 </>}
 {route.stage===2&&<><section className="white-panel"><h2>Understand & apply <small>理解与应用</small></h2><p>从本章原有解析和情境题出发，用自己的话解释，再将判断用于品鉴与服务。</p><div className="cms-application-grid">{module.resources.expansion.sections.map((x:any)=><a key={x.id} href={courseHref(module.id,'expansion',x.id)}><Layers size={17}/><span>{x.title}</span></a>)}</div><div className="button-row"><button className="button secondary" onClick={()=>go('videos')}>Wine Channel · 学习视频</button><button className="button secondary" onClick={()=>go('service')}>Service · 口头表达练习</button></div></section><RecallCards items={chapterQuestions.filter(q=>q.type==='short').slice(-5)} save={save} label="Apply · 解释你的判断"/></>}
 {route.stage===3&&<><div className="subtle-note">本章 {questions.length} 道可练习题 · {weak.length} 道最近尚未掌握。点击揭晓、自评、收藏或 Dismiss，记录与 Wine Quizzes 共用。</div><QuizStudy key={module.id+'recall'} questions={chapterQuestions} state={state} save={save} initialLevel="all" openLesson={openLesson} heading="Recall · 复习强化"/></>}
 {route.stage===4&&<><div className="cms-final-summary"><h2>Final check <small>检查与补漏</small></h2><p>{weak.length?`${weak.length} 道题需要再次巩固。先回到对应阅读，再独立作答。`:'按清单闭卷解释，再用章节题库检查掌握情况。'}</p><button className="button" onClick={()=>jump('questions','',1)}>开始章节测试</button></div><Checklist module={module} state={state} save={save}/>{weak.length>0&&<RecallCards items={weak.filter(q=>q.type==='short').slice(0,8)} save={save} label="需要再学 · 本章错题"/>}</>}
 </div>;
}
export function CmsProgress({state,save}:{state:any,save:any}){return <section className="cms-progress-section"><h2>CMS · 章节学习</h2><div className="cms-module-grid">{modules.map(m=><article key={m.id} className="cms-module-card"><a href={cmsHref(m.id)} className="cms-module-title-link"><span className="eyebrow">MODULE {m.number}</span><h3>{m.title}</h3></a><ChapterPlan module={m} state={state} save={save}/><a className="cms-enter" href={cmsHref(m.id)}>继续学习</a></article>)}</div></section>}
