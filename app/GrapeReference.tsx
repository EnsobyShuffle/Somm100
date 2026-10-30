'use client';
import React,{useEffect,useState} from 'react';
import {getGrapeReference} from './grape-reference-data';
import {splitReferenceText,withReferenceLanguage} from '../lib/grape-reference';

type Language='en'|'zh';
const languageKey='somm100-grape-reference-language';

export function GrapeReference({id,saved=false,onSave}:{id:string;saved?:boolean;onSave?:()=>void}){
 const profile=getGrapeReference(id)!;
 const [imageFailed,setImageFailed]=useState(false);
 useEffect(()=>setImageFailed(false),[id]);
 const [language,setLanguage]=useState<Language>('en');
 useEffect(()=>{
  function read(){
   const explicit=new URLSearchParams(location.hash.split('?')[1]).get('lang');
   let stored:string|null=null;try{stored=localStorage.getItem(languageKey)}catch{}
   setLanguage(explicit==='en'||explicit==='zh'?explicit:stored==='zh'?'zh':'en');
  }
  read();addEventListener('hashchange',read);return()=>removeEventListener('hashchange',read);
 },[id]);
 function change(next:Language){
  setLanguage(next);try{localStorage.setItem(languageKey,next)}catch{}
  const q=new URLSearchParams(location.hash.split('?')[1]);q.set('id',id);q.set('lang',next);
  history.replaceState(null,'',location.hash.split('?')[0]+'?'+q.toString());
 }
 const label=(en:string,zh:string)=>language==='en'?en:zh;
 const inline=(text:string)=>splitReferenceText(text,profile.inlineLinks).map((part,i)=>part.href?<a className="gr-inline-link" href={withReferenceLanguage(part.href,language)} target={part.href.startsWith('https:')?'_blank':undefined} rel={part.href.startsWith('https:')?'noreferrer':undefined} key={i}>{part.text}</a>:part.text);
 const jump=(id:string)=>document.getElementById('gr-'+id)?.scrollIntoView({behavior:'smooth',block:'start'});
 return <div className="gr-reference" lang={language==='en'?'en':'zh-CN'}>
  <div className="gr-topline"><nav aria-label={label('Breadcrumb','导航路径')}><a href="#library">Wine Library</a><span>/</span><a href="#grapes">{label('Grape Varieties','葡萄品种')}</a><span>/</span><span>{profile.name}</span></nav><div className="gr-reader-actions">{onSave&&<button className="gr-bookmark" aria-pressed={saved} onClick={onSave}>{saved?label('Saved','已收藏'):label('Save','收藏')}</button>}<div className="gr-languages" role="group" aria-label="Language"><button aria-pressed={language==='en'} onClick={()=>change('en')}>English</button><button aria-pressed={language==='zh'} onClick={()=>change('zh')}>中文</button></div></div></div>
  <header className="gr-header"><h1>{profile.name}</h1><p className="gr-meta">{profile.color[language]}<span>·</span><i>{profile.species}</i>{profile.country[language]&&<><span>·</span>{profile.country[language]}</>}</p>{profile.image&&!imageFailed&&<figure><img src={profile.image} alt={profile.name} onError={()=>setImageFailed(true)}/>{profile.imageSource&&<figcaption><a href={profile.imageSource} target="_blank" rel="noreferrer">{profile.imageCredit||label('Image source','图片来源')}</a></figcaption>}</figure>}<p className="gr-intro">{inline(profile.intro[language])}</p><p className="gr-key-references"><strong>{label('Key references','核心参照')}:</strong> {inline(profile.keyReferences[language])}</p></header>
  <nav className="gr-sections" aria-label={label('Contents','目录')}>{profile.sections.map(s=><button key={s.id} onClick={()=>jump(s.id)}>{s.title[language]}</button>)}<button onClick={()=>jump('wines')}>{label('Wines','酒款')}</button><button onClick={()=>jump('sources')}>{label('Sources','来源')}</button></nav>
  <article>
   {profile.sections.map(s=><section id={'gr-'+s.id} key={s.id} className="gr-section"><h2>{s.title[language]}</h2><dl>{s.rows.map((r,i)=><div className="gr-row" key={i}><dt>{inline(r.label[language])}</dt><dd>{r.text[language].split('\n').map((p,j,ps)=><p key={j}>{inline(p)} {j===ps.length-1&&<span className="gr-row-refs">{r.sources.map(ref=>{const n=profile.sources.findIndex(s=>s.id===ref);const source=profile.sources[n];return source?<a key={ref} href={source.url} title={source.title} aria-label={source.title} target="_blank" rel="noreferrer">[{n+1}]</a>:null})}</span>}</p>)}</dd></div>)}</dl></section>)}
   <section id="gr-wines" className="gr-section"><h2>{label('Wines','酒款')} <small>{profile.wines.length}</small></h2><div className="gr-wine-links">{profile.wines.map(w=><a key={w.id} href={withReferenceLanguage(w.href,language)} target={w.href.startsWith('https:')?'_blank':undefined} rel={w.href.startsWith('https:')?'noreferrer':undefined}>{w.producer} · {w.name}<span aria-hidden="true">{w.href.startsWith('https:')?'↗':'→'}</span></a>)}</div>{!profile.wines.length&&<p className="gr-empty-wines">{label('No individual wine profiles are linked yet.','暂未关联独立酒款档案。')}</p>}</section>
   <section id="gr-sources" className="gr-section gr-source-section"><h2>{label('Sources','来源')}</h2><ol>{profile.sources.map(s=><li key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></li>)}</ol><p>{label(profile.standardised?'Source record reviewed':'Reviewed',profile.standardised?'原资料核对日期':'核对日期')} {profile.reviewed}. {label('Wine selection: SOMM100 editorial references; not a score ranking.','酒款为 SOMM100 编辑选例，不按评分排序。')}</p></section>
  </article>
 </div>
}
