'use client';
import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Library, Newspaper, Pause, Play, ScrollText, Target, Wine } from 'lucide-react';
import './discover-home.css';

const issueRoute = 'home?daily=2026-10-24';
const slides = [
 {title:'Learn, Taste, Explore',cta:'探索课程',page:'foundation',image:'/media/mosel-vineyard.png'},
 {title:'SOMM100 Wine Daily',cta:'阅读本期',page:issueRoute,image:'/media/grapes/pinot-noir.jpg'},
];
const destinations = [
 {zh:'侍酒师100课程',en:'SOMM100',page:'foundation',icon:BookOpen},
 {zh:'侍酒师分级课程',en:'CMS',page:'cms',icon:GraduationCap},
 {zh:'葡萄酒知识库',en:'Wine Library',page:'library',icon:Library},
 {zh:'品鉴笔记',en:'Wine Tasting',page:'journal',icon:Wine},
 {zh:'葡萄酒练习',en:'Wine Quiz',page:'practice',icon:Target},
 {zh:'葡萄酒新闻',en:'Wine Daily',page:issueRoute,icon:Newspaper},
 {zh:'葡萄酒文章',en:'Wine Articles',page:'articles',icon:ScrollText},
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

export function DiscoverLanding({go, headline}: {go: (page: string) => void; headline: string}) {
 function navigate(page: string) {
  if (page === 'foundation') window.location.assign('/course.html');
  else go(page);
 }
 return <div className="discover-home">
  <div className="page-title"><h1>Discover <span lang="zh-CN">发现</span></h1></div>
  <DiscoverCarousel go={navigate}/>
  <nav className="discover-destinations" aria-label="首页栏目">{destinations.map(item=>
   <button key={item.page} onClick={()=>navigate(item.page)}><item.icon size={24} strokeWidth={1.5}/>
    <span><strong>{item.zh}</strong><small>{item.en}</small></span>
   </button>)}</nav>
  <button className="discover-daily-cover" onClick={()=>go(issueRoute)}>
   <img src="/media/oak-cellar.jpg" alt="" loading="lazy"/>
   <span><small>24 OCT 2026</small><strong>SOMM100 Wine Daily</strong><span>{headline}</span></span>
  </button>
 </div>;
}
