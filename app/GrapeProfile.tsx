'use client';
import React, {useEffect, useState} from 'react';
import profiles from '../data/grape-profiles.json';

type Language = 'both' | 'en' | 'zh';
type Layout = 'reference' | 'parallel' | 'outline';
type Bilingual = {en:string;zh:string};
const layouts:Layout[]=['reference','parallel','outline'];
const languages:Language[]=['both','en','zh'];
const names:Record<Layout,Bilingual>={reference:{en:'Reference',zh:'参考档案'},parallel:{en:'Parallel',zh:'双栏对照'},outline:{en:'Outline',zh:'紧凑纲要'}};

function Dual({value,language,className=''}:{value:Bilingual;language:Language;className?:string}){
 return <div className={'gp-dual '+className}>{language!=='zh'&&<div lang="en">{value.en}</div>}{language!=='en'&&<div lang="zh-CN">{value.zh}</div>}</div>
}

export function GrapeProfile({id}:{id:string}){
 const profile=profiles.profiles.find(p=>p.id===id)!;
 const [layout,setLayout]=useState<Layout>('reference');
 const [language,setLanguage]=useState<Language>('both');
 const [activeSection,setActiveSection]=useState('names');
 useEffect(()=>{
  function read(){
   const query=new URLSearchParams(location.hash.split('?')[1]);
   let stored:any={};try{stored=JSON.parse(localStorage.getItem('somm100-grape-reader')||'{}')}catch{}
   const nextLayout=query.get('layout')||stored.layout;
   const nextLanguage=query.get('lang')||stored.language;
   setLayout(layouts.includes(nextLayout)?nextLayout:'reference');
   setLanguage(languages.includes(nextLanguage)?nextLanguage:'both');
  }
  read();addEventListener('hashchange',read);return()=>removeEventListener('hashchange',read);
 },[]);
 function change(nextLayout:Layout,nextLanguage:Language){
  setLayout(nextLayout);setLanguage(nextLanguage);
  try{localStorage.setItem('somm100-grape-reader',JSON.stringify({layout:nextLayout,language:nextLanguage}))}catch{}
  const query=new URLSearchParams(location.hash.split('?')[1]);
  query.set('type','grape');query.set('id',id);query.set('layout',nextLayout);query.set('lang',nextLanguage);
  history.replaceState(null,'','#library?'+query.toString());
 }
 const label=(en:string,zh:string)=>language==='en'?en:language==='zh'?zh:en+' · '+zh;
 function jump(section:string){setActiveSection(section);document.getElementById('gp-'+section)?.scrollIntoView({behavior:'smooth',block:'start'})}
 function RowSources({ids}:{ids:string[]}){return <span className="gp-row-sources">{ids.map(id=>{const index=profile.sources.findIndex(s=>s.id===id);const source=profile.sources[index];return source?<a key={id} href={source.url} target="_blank" rel="noreferrer" title={source.title} aria-label={source.title}>[{index+1}]</a>:null})}</span>}
 const toc=[...profile.sections.map(s=>({id:s.id,title:s.title})),{id:'wines',title:{en:'Top 10 wines',zh:'十款代表酒'}},{id:'recall',title:{en:'Questions',zh:'练习题'}}];
 return <div className={'grape-profile gp-'+layout+' gp-lang-'+language}>
  <div className="gp-controls">
   <div className="gp-layout-picker" role="group" aria-label="选择排版 / Layout">
    {layouts.map((option,i)=><button key={option} aria-pressed={layout===option} onClick={()=>change(option,language)}><span>{String.fromCharCode(65+i)}</span>{label(names[option].en,names[option].zh)}</button>)}
   </div>
   <div className="gp-language-picker" role="group" aria-label="阅读语言 / Language">
    {languages.map(l=><button key={l} aria-pressed={language===l} onClick={()=>change(layout,l)}>{l==='both'?'EN / 中文':l==='en'?'English':'中文'}</button>)}
   </div>
  </div>
  <header className="gp-header">
   <div className="gp-title"><span className="eyebrow">{label('GRAPE VARIETIES','葡萄品种')}</span><h1>{profile.name}{language!=='en'&&<span lang="zh-CN">{profile.zh}</span>}</h1><div className="gp-other-name">{profile.otherName}</div><Dual value={profile.subtitle} language={language} className="gp-subtitle"/><Dual value={profile.intro} language={language} className="gp-intro"/></div>
   <figure className="gp-photo"><img src={'/media/library/'+profile.image} alt={label('Godello grape bunch','Godello 果穗')}/><figcaption><a href="https://dovaldeorras.gal/en/territorio/" target="_blank" rel="noreferrer">© D.O. Valdeorras ↗</a></figcaption></figure>
  </header>
  <div className="gp-body">
   <nav className="gp-contents" aria-label={label('Article contents','文章目录')}>
    <span className="eyebrow">{label('CONTENTS','目录')}</span>
    {toc.map((s,i)=><button key={s.id} className={activeSection===s.id?'active':''} onClick={()=>jump(s.id)}><small>{String(i+1).padStart(2,'0')}</small>{language==='zh'?s.title.zh:s.title.en}</button>)}
   </nav>
   <article className="gp-article">
    {profile.sections.map((section,index)=><section key={section.id} id={'gp-'+section.id} className="gp-section">
     <div className="gp-section-heading"><span>{String(index+1).padStart(2,'0')}</span><h2>{language!=='zh'&&<span lang="en">{section.title.en}</span>}{language!=='en'&&<span lang="zh-CN">{section.title.zh}</span>}</h2></div>
     {layout==='parallel'&&language==='both'&&<div className="gp-column-labels"><span>ENGLISH</span><span>中文</span></div>}
     <div className="gp-rows">{section.rows.map(row=><div className="gp-row" key={row.id}>
      <h3><Dual value={row.label} language={language}/></h3>
      <div className="gp-row-main"><Dual value={row.text} language={language}/>
       <div className="gp-row-footer">{row.links.length>0&&<div className="gp-related">{row.links.map(link=><a href={link.url} key={link.url} {...(link.url.startsWith('http')?{target:'_blank',rel:'noreferrer'}:{})}>{link.label} {link.url.startsWith('http')?'↗':'→'}</a>)}</div>}<RowSources ids={row.sourceIds}/></div>
      </div>
     </div>)}</div>
    </section>)}
    <section id="gp-wines" className="gp-section gp-wines">
     <div className="gp-section-heading"><span>08</span><h2>{language!=='zh'&&<span>Top 10 wines</span>}{language!=='en'&&<span>十款代表酒</span>}</h2></div>
     <div className="gp-wine-tags" aria-label={label('Ten wine links','十款酒链接')}>{profile.wines.map(w=><a key={w.id} href={w.href} {...(w.href.startsWith('http')?{target:'_blank',rel:'noreferrer'}:{})}>{w.producer} · {w.name}<span aria-hidden="true">{w.href.startsWith('http')?'↗':'→'}</span></a>)}</div>
     <a className="gp-market-link" href="https://www.wine-searcher.com/find/godello" target="_blank" rel="noreferrer">Wine-Searcher ↗</a>
    </section>
    <section id="gp-recall" className="gp-section gp-recall">
     <div className="gp-section-heading"><span>09</span><h2>{language!=='zh'&&<span>Questions</span>}{language!=='en'&&<span>练习题</span>}</h2></div>
     <small>{label('Study from the approved original source sets.','自编题已移除，请进入指定来源原题集。')}</small>
     <a className="button" href="#practice">{label('Wine Quiz','Wine Quiz · 原始题集')}</a>
    </section>
    <details className="gp-sources"><summary>{label('Sources & original articles','资料来源与原文')} <span>{profile.sources.length} ↗</span></summary><ol>{profile.sources.map((source,i)=><li key={source.id}><a href={source.url} target="_blank" rel="noreferrer"><span>[{i+1}]</span> {source.title} ↗</a></li>)}</ol><p>{label('Top 10: SOMM100 editorial selection; not ordered by critic scores.','Top 10 为 SOMM100 编辑选酒，不按酒评分数排序。')}</p></details>
    <footer className="gp-end"><span>SOMM100 / WINE LIBRARY</span><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>{label('Back to top','返回顶部')} ↑</button></footer>
   </article>
  </div>
 </div>
}
