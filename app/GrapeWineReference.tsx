'use client';
import React,{useEffect,useState} from 'react';
import {Grape,grapeHref,regionHref,resolveGrape,normalizeGrape} from '../lib/grape-library';
import {withReferenceLanguage} from '../lib/grape-reference';

type Copy={description:string;composition:string;style:string;serving:string};
type Wine=Copy&{id:string;name:string;producer:string;producerId?:string;country:string;region:string;vintage:number|null;officialUrl:string;reviewed:string;imageUrl?:string;imageCredit?:string;imageSourceUrl?:string;grapeNames:string[];sources:{title:string;url:string}[];en:Copy};
export function GrapeWineReference({wine,grapes}:{wine:Wine;grapes:Grape[]}){
 const [language,setLanguage]=useState<'en'|'zh'>('en'),[imageFailed,setImageFailed]=useState(false);
 useEffect(()=>{const q=new URLSearchParams(location.hash.split('?')[1]);let stored='en';try{stored=localStorage.getItem('somm100-grape-reference-language')||'en'}catch{}setLanguage((q.get('lang')||stored)==='zh'?'zh':'en');setImageFailed(false)},[wine.id]);
 const t=(en:string,zh:string)=>language==='en'?en:zh,copy=language==='en'?wine.en:wine;
 const region=grapes.flatMap(g=>g.regions).filter(r=>r.country===wine.country&&normalizeGrape(wine.region).includes(normalizeGrape(r.name))).sort((a,b)=>b.name.length-a.name.length)[0];
 function change(next:'en'|'zh'){setLanguage(next);try{localStorage.setItem('somm100-grape-reference-language',next)}catch{}history.replaceState(null,'',withReferenceLanguage(location.hash,next))}
 const section=(id:string,en:string,zh:string,text:string)=><section className="gr-section" id={id}><h2>{t(en,zh)}</h2><p className="gr-wine-copy">{text}</p></section>;
 return <div className="gr-reference" lang={language==='en'?'en':'zh-CN'}>
  <div className="gr-topline"><nav aria-label={t('Breadcrumb','导航路径')}><a href="#library">Wine Library</a><span>/</span><span>{t('Wines','酒款')}</span><span>/</span><span>{wine.name}</span></nav><div className="gr-languages" role="group" aria-label="Language"><button aria-pressed={language==='en'} onClick={()=>change('en')}>English</button><button aria-pressed={language==='zh'} onClick={()=>change('zh')}>中文</button></div></div>
  <header className="gr-header"><p className="gr-meta">{wine.producer}</p><h1>{wine.name}</h1><p className="gr-meta">{wine.country}<span>·</span><a className="gr-inline-link" href={withReferenceLanguage(regionHref(region?.name||wine.region,wine.country),language)}>{wine.region}</a>{wine.vintage&&<><span>·</span>{wine.vintage}</>}</p>
   {wine.imageUrl&&!imageFailed&&<figure><img src={wine.imageUrl} alt={wine.producer+' '+wine.name} onError={()=>setImageFailed(true)}/><figcaption><a href={wine.imageSourceUrl||wine.officialUrl} target="_blank" rel="noreferrer">{wine.imageCredit||wine.producer}</a></figcaption></figure>}
   <p className="gr-intro">{copy.description}</p>{wine.producerId&&<a className="gr-inline-link" href={'#producers?id='+wine.producerId}>{t('Producer profile','Producer 档案')} →</a>}
  </header>
  {section('wine-composition','Grape composition','品种构成',copy.composition)}
  {section('wine-style','Style & vinification','风格与酿造',copy.style)}
  {section('wine-serving','Service','侍酒服务',copy.serving)}
  <section className="gr-section"><h2>{t('Grape varieties','葡萄品种')}</h2><div className="gr-wine-links">{wine.grapeNames.map(name=>{const grape=resolveGrape(grapes,name);return grape?<a href={withReferenceLanguage(grapeHref(grape.id),language)} key={name}>{name}<span>→</span></a>:<p key={name}>{name}</p>})}</div></section>
  <section className="gr-section gr-source-section"><h2>{t('Sources','来源')}</h2><ol>{wine.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></li>)}</ol><p>{t('Reviewed','核对日期')} {wine.reviewed}. {wine.vintage?t('Vintage-specific record.','此档案对应所注明年份。'):t('Cuvée-level reference; check the producer’s technical sheet for a specific vintage.','酒款级档案；具体年份以酒庄对应技术资料为准。')}</p></section>
 </div>
}
