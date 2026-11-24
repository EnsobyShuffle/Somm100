'use client';
import React,{useEffect,useState} from 'react';
import {BookOpen,GraduationCap,Library,Newspaper,Pause,Play,ScrollText,Target,Wine} from 'lucide-react';
import './discover-courses.css';
import {NewsExpansion} from './Producers';
import directory from '../data/news-sources.json';
export function NewsSources(){const [search,setSearch]=useState(''),[type,setType]=useState('all'),[region,setRegion]=useState('all'),[limit,setLimit]=useState(12);const sources:any[]=(directory as any).sources||[];const shown=sources.filter(s=>(type==='all'||s.type===type)&&(region==='all'||s.region===region)&&`${s.name} ${s.region} ${s.focus}`.toLowerCase().includes(search.toLowerCase()));return <section><div className="section-head"><div><span className="eyebrow">WINE NEWS · SOURCE DIRECTORY</span><h2>新闻来源</h2></div><span>{sources.length} 个候选来源</span></div><p>先建立来源库，再筛选内容。包含行业媒体、产区官方发布和学习平台；这里展示原站入口，不是自动更新的新闻流。</p><div className="study-filters"><label>搜索<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="名称、国家、主题"/></label><label>类型<select value={type} onChange={e=>setType(e.target.value)}><option value="all">全部类型</option>{[...new Set(sources.map(s=>s.type))].map(t=><option key={t} value={t}>{t}</option>)}</select></label><label>国家 / 地区<select value={region} onChange={e=>setRegion(e.target.value)}><option value="all">全部地区</option>{[...new Set(sources.map(s=>s.region))].map(r=><option key={r} value={r}>{r}</option>)}</select></label></div><p>{shown.length} 个结果 · 候选来源，待编辑筛选</p><div className="news-source-grid">{shown.slice(0,limit).map(s=><article className="white-panel" key={s.id}><span className="eyebrow">{s.region} · {s.language}</span><h3>{s.name}</h3><span className="tiny-tag">{s.type}</span><p>{s.focus}</p><small>{s.reviewStatus}</small><a className="text-button" href={s.url} target="_blank" rel="noreferrer">打开来源 ↗</a></article>)}</div>{shown.length>limit&&<button className="button secondary" onClick={()=>setLimit(n=>n+12)}>显示更多来源（{shown.length-limit}）</button>}{!shown.length&&<p>没有匹配来源，试试其他筛选。</p>}</section>}
const issueRoute = 'home?daily=2026-10-24';
const slides = [
 {title:'Learn, Taste, Explore',cta:'探索课程',page:'courses',image:'/media/mosel-vineyard.png'},
 {title:'SOMM100 Wine Daily',cta:'阅读本期',page:issueRoute,image:'/media/grapes/pinot-noir.jpg'},
];
const destinations = [
 {zh:'侍酒师100课程',en:'SOMM100',page:'foundation',icon:BookOpen},
 {zh:'侍酒师分级课程',en:'CMS',page:'cms',icon:GraduationCap},
 {zh:'葡萄酒知识库',en:'Wine Library',page:'library',icon:Library},
 {zh:'品鉴笔记',en:'Wine Tasting',page:'journal',icon:Wine},
 {zh:'葡萄酒练习',en:'Wine Quiz',page:'practice',icon:Target},
 {zh:'葡萄酒新闻',en:'Wine Daily',page:issueRoute,icon:Newspaper},
 {zh:'葡萄酒文章',en:'Wine Articles',page:'home?view=articles',icon:ScrollText},
 {zh:'葡萄酒视频',en:'Wine Channel',page:'videos',icon:Play},
];

function DiscoverCarousel({go}:{go:(page:string)=>void}){
 const [index,setIndex]=useState(0);
 const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(false);
 const [interacting,setInteracting]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>setReduced(media.matches);
  sync();
  media.addEventListener('change',sync);
  return ()=>media.removeEventListener('change',sync);
 },[]);
 useEffect(()=>{
  if(paused||reduced||interacting)return;
  const timer=window.setInterval(()=>{
   if(!document.hidden)setIndex(current=>(current+1)%slides.length);
  },6000);
  return ()=>window.clearInterval(timer);
 },[paused,reduced,interacting]);
 const slide=slides[index];
 return <section className="discover-feature" aria-label="首页推荐" aria-roledescription="轮播"
   onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)}
   onFocusCapture={event=>{if(event.target.matches(':focus-visible')&&!event.target.closest('[data-toggle-playback]'))setPaused(true)}}>
  <img key={slide.image} src={slide.image} alt="" />
  <div className="discover-feature-copy"><h2>{slide.title}</h2><button onClick={()=>go(slide.page)}>{slide.cta}</button></div>
  <div className="discover-feature-controls">
   {slides.map((item,i)=><button key={item.title} aria-label={'显示 '+item.title} aria-pressed={index===i} onClick={()=>{setIndex(i);setPaused(true)}}><span/></button>)}
   {!reduced&&<button data-toggle-playback onClick={()=>setPaused(!paused)} aria-label={paused?'播放轮播':'暂停轮播'}>{paused?<Play size={14}/>:<Pause size={14}/>}</button>}
  </div>
 </section>;
}

export function Discover({go}:{go:(page:string)=>void}){
 const [view,setView]=useState('home');
 useEffect(()=>{
  const read=()=>{
   const params=new URLSearchParams(location.hash.split('?')[1]);
   setView(params.get('daily')==='2026-10-24'?'daily':params.get('view')==='articles'?'articles':'home');
  };
  read();window.addEventListener('hashchange',read);
  return ()=>window.removeEventListener('hashchange',read);
 },[]);
 if(view==="daily")return <><button className="back-link" onClick={()=>{go('home')}}>← Discover · 发现</button><div className="page-title"><span className="eyebrow">24 OCTOBER 2026 · 阅读选辑</span><h1>SOMM100 Wine Daily</h1><p>葡萄酒世界的消息，简短阅读，继续探索。</p></div><div className="daily-reading">{directory.articles.map((a:any,i:number)=><article className="daily-article" key={a.id}><span className="eyebrow">{String(i+1).padStart(2,'0')} / {a.topic} · {a.date} · {a.source}</span><h2>{a.title}</h2>{(a.paragraphs||[a.summary]).map((text:string,j:number)=><p key={j}>{text}</p>)}<a className="daily-original" href={a.url} target="_blank" rel="noreferrer">阅读原文 ↗</a><NewsExpansion articleId={a.id} compact/></article>)}</div><SourceLinks/></>;
 if(view==='articles')return <>
  <button className="back-link" onClick={()=>go('home')}>返回发现</button>
  <div className="page-title"><h1>葡萄酒文章</h1></div>
  <div className="discover-articles">{directory.articles.map(a=><article key={a.id}>
   <small>{a.source} · {a.date}</small><h2><a href={a.url} target="_blank" rel="noreferrer">{a.title}</a></h2>
   <p>{a.summary}</p>
  </article>)}</div>
 </>;
 return <div className="discover-home">
  <div className="page-title"><h1>Discover <span lang="zh-CN">发现</span></h1></div>
  <DiscoverCarousel go={go}/>
  <nav className="discover-destinations" aria-label="首页栏目">{destinations.map(item=>
   <button key={item.page} onClick={()=>go(item.page)}><item.icon size={24} strokeWidth={1.5}/>
    <span><strong>{item.zh}</strong><small>{item.en}</small></span>
   </button>)}</nav>
  <button className="discover-daily-cover" onClick={()=>go(issueRoute)}>
   <img src="/media/oak-cellar.jpg" alt="" loading="lazy"/>
   <span><small>24 OCT 2026</small><strong>SOMM100 Wine Daily</strong><span>{directory.articles[0].title}</span></span>
  </button>
 </div>;
}
function SourceLinks(){return <details className="discover-source-links"><summary>新闻来源</summary><div>{directory.sources.map(s=><a key={s.id} href={s.url} target="_blank" rel="noreferrer">{s.name} ↗</a>)}</div></details>}
