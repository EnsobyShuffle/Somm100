'use client';
import React,{useEffect,useState} from 'react';
import data from '../data/wine-profiles.json';
import editorial from '../data/wine-editorial.json';
import {wineTextSegments,type WineLink} from '../lib/wine-profile';
import './wine-dossier.css';

type Pair={en:string;zh:string};
type Language='en'|'zh'|'both';
type Template='dossier'|'technical'|'reading';
type Row={label:Pair;text:Pair;sources:string[]};
type Rating={score:string;scale:string;publication:string;critic?:string;date?:string;sourceId:string};
type CriticNote=Rating&{quote:string;summary:Pair;sourceLabel:Pair};
type Selling={pitch:Pair;rows:Row[]};
type Supplement={sources:{id:string;title:string;url:string;scope:string}[];notes:Pair[];selling:Selling;vintages:Record<string,{ratings:Rating[];criticNotes:CriticNote[];cellarNotes?:Row[]}>};
type BaseWine=(typeof data.profiles)[number];
type Vintage=BaseWine['vintages'][number]&{ratings?:Rating[];criticNotes?:CriticNote[];cellarNotes?:Row[]};
type Wine=Omit<BaseWine,'vintages'>&{vintages:Vintage[];selling?:Selling;producerUrl?:string;grapeIds?:string[]};
const extras=editorial as Record<string,Supplement>;
const profiles:Wine[]=data.profiles.map(w=>{const extra=extras[w.id];return {...w,sources:[...w.sources,...(extra?.sources||[])],notes:[...w.notes,...(extra?.notes||[])],selling:extra?.selling,vintages:w.vintages.map(v=>({...v,...extra?.vintages[v.year]}))}});
const templates:Template[]=['dossier','technical','reading'];
const languages:Language[]=['both','en','zh'];
const templateNames:Record<Template,Pair>={dossier:{en:'Dossier',zh:'酒款档案'},technical:{en:'Technical',zh:'技术资料'},reading:{en:'Reading',zh:'连续阅读'}};
export const findWineDossier=(id:string)=>profiles.find(p=>p.id===id||p.aliases.some(alias=>alias===id));
function LinkedText({text,links=[]}:{text:string;links?:WineLink[]}){return <>{wineTextSegments(text,links).map((part,i)=>part.url?<a className="wd-inline-link" href={part.url} key={i} {...(part.url.startsWith('http')?{target:'_blank',rel:'noreferrer'}:{})}>{part.text}</a>:<React.Fragment key={i}>{part.text}</React.Fragment>)}</>}
function Text({value,language,className='',links}:{value:Pair;language:Language;className?:string;links?:WineLink[]}){return <div className={'wd-text '+className}>{language!=='zh'&&<div lang="en"><LinkedText text={value.en} links={links}/></div>}{language!=='en'&&<div lang="zh-CN"><LinkedText text={value.zh} links={links}/></div>}</div>}

export function WineDossier({id}:{id:string}){
 const wine=findWineDossier(id)!;
 const [template,setTemplate]=useState<Template>('dossier'),[language,setLanguage]=useState<Language>('both'),[year,setYear]=useState(wine.defaultVintage);
 const vintage=wine.vintages.find(v=>v.year===year)||wine.vintages[0];
 const dated=/^\d{4}$/.test(vintage.year);
 const producerUrl=wine.producerUrl||'#producers?id=rafael-palacios';
 const inlineLinks=[...wine.links,{name:wine.producer,url:producerUrl}];
 useEffect(()=>{function read(){
  const q=new URLSearchParams(location.hash.split('?')[1]);let saved:any={};try{saved=JSON.parse(localStorage.getItem('somm100-wine-reader')||'{}')}catch{}
  const t=q.get('template')||saved.template,l=q.get('lang')||saved.language;
  setTemplate(templates.includes(t)?t:'dossier');setLanguage(languages.includes(l)?l:'both');
  setYear(wine.vintages.some(v=>v.year===q.get('vintage'))?q.get('vintage')!:wine.defaultVintage);
 }read();addEventListener('hashchange',read);return()=>removeEventListener('hashchange',read)},[wine.id]);
 function choose(t:Template,l:Language,y:string){
  setTemplate(t);setLanguage(l);setYear(y);
  try{localStorage.setItem('somm100-wine-reader',JSON.stringify({template:t,language:l}))}catch{}
  const q=new URLSearchParams(location.hash.split('?')[1]);q.set('template',t);q.set('lang',l);q.set('vintage',y);
  history.replaceState(null,'',location.hash.split('?')[0]+'?'+q.toString());
 }
 const label=(en:string,zh:string)=>language==='en'?en:language==='zh'?zh:en+' · '+zh;
 const cite=(ids:string[])=><span className="wd-cites">{[...new Set(ids)].map(id=>{const index=wine.sources.findIndex(s=>s.id===id),source=wine.sources[index];return source?<a key={id} href={source.url} title={source.title} aria-label={source.title} target="_blank" rel="noreferrer">[{index+1}]</a>:null})}</span>;
 const heading=(title:Pair)=><h2>{language!=='zh'&&<span lang="en">{title.en}</span>}{language!=='en'&&<span lang="zh-CN">{title.zh}</span>}</h2>;
 const rows=(items:Row[])=><dl className="wd-rows">{items.map((row,i)=><div className="wd-row" key={i}><dt><Text value={row.label} language={language}/></dt><dd><Text value={row.text} language={language} links={inlineLinks}/>{cite(row.sources)}</dd></div>)}</dl>;
 const tastingLink=<a className="wd-context-link" href="#journal">{label('Write a tasting note','记录我的品鉴')}</a>;
 const searchLink=<a className="wd-context-link" href={'https://www.wine-searcher.com/find/'+encodeURIComponent(wine.producer+' '+wine.name)} target="_blank" rel="noreferrer">Wine-Searcher</a>;
 const topFacts=[{label:{en:'Appellation',zh:'法定产区'},value:wine.appellation},{label:{en:'Grape',zh:'葡萄品种'},value:vintage.composition},{label:{en:'Style',zh:'类型'},value:label(wine.type.en,wine.type.zh)},{label:{en:'Bottle / closure',zh:'容量／瓶塞'},value:vintage.bottle+' · '+(language==='en'?vintage.closure.en:vintage.closure.zh)}];
 const metrics=[['Alcohol','酒精度',vintage.abv],['Acidity','酸度',vintage.acidity],['Residual sugar','残糖',vintage.rs],['pH','pH',vintage.ph]];
 const firstSections=wine.sections.filter(s=>s.id==='wine'||s.id==='vineyard');
 const lastSections=wine.sections.filter(s=>s.id!=='wine'&&s.id!=='vineyard'&&!(s.id==='tasting'&&vintage.criticNotes?.length));
 function Section({section}:{section:{id:string;title:Pair;rows:Row[]}}){return <section className={'wd-section wd-section-'+section.id} id={'wd-'+section.id}>{heading(section.title)}<div>{rows(section.rows)}{section.id==='tasting'&&tastingLink}</div></section>}
 return <div className={'wine-dossier wd-'+template+' wd-lang-'+language}>
  <nav className="wd-breadcrumb" aria-label="Wine profile breadcrumb"><a href="#library">Wine Library</a><span>/</span><a href="#library?type=wines">Wines</a><span>/</span><b>{wine.name}</b></nav>
  <div className="wd-controls"><div className="wd-templates" role="group" aria-label="酒款模板 / Wine templates">{templates.map((t,i)=><button key={t} aria-pressed={t===template} onClick={()=>choose(t,language,vintage.year)}><span>{String.fromCharCode(65+i)}</span><span className="wd-template-label">{language!=='zh'&&templateNames[t].en}{language!=='en'&&<small>{templateNames[t].zh}</small>}</span></button>)}</div><div className="wd-languages" role="group" aria-label="酒款语言 / Wine language">{languages.map(l=><button key={l} aria-pressed={l===language} onClick={()=>choose(template,l,vintage.year)}>{l==='both'?'EN / 中文':l==='en'?'English':'中文'}</button>)}</div></div>
  <header className="wd-header">
   <figure className="wd-bottle">{wine.image?<><img src={wine.image} alt={wine.producer+' '+wine.name+' — reference bottle image'}/><figcaption><a href={wine.imageSource} target="_blank" rel="noreferrer">{label('Reference image','参考瓶图')}</a></figcaption></>:<div className="wd-no-image">{label('Bottle photograph pending','瓶图待补')}</div>}</figure>
   <div className="wd-header-copy"><div className="wd-kicker"><span>WINE PROFILE</span><a href={producerUrl} {...(producerUrl.startsWith('http')?{target:'_blank',rel:'noreferrer'}:{})}>{wine.producer}</a></div><div className="wd-title"><h1>{wine.name}</h1>{dated&&<span className="wd-year">{vintage.year}</span>}</div><p className="wd-origin">{wine.origin}</p>
    {!!vintage.ratings?.length&&<section className="wd-ratings" aria-label={label('Wine ratings','酒评评分')}><div className="wd-ratings-label">{label('Wine ratings','酒评评分')} <span>{vintage.year}</span></div><div className="wd-rating-list">{vintage.ratings.map((r,i)=><a className="wd-rating" key={i} href={wine.sources.find(s=>s.id===r.sourceId)?.url} target="_blank" rel="noreferrer" title={label('View rating source','查看评分来源')}><strong>{r.score}<small>/{r.scale}</small></strong><span>{r.publication}</span>{r.critic&&<small>{r.critic}</small>}{r.date&&<small>{r.date}</small>}</a>)}</div></section>}
    <Text value={wine.intro} language={language} className="wd-intro" links={inlineLinks}/>
    <dl className="wd-facts">{topFacts.map((f,i)=><div key={i}><dt>{label(f.label.en,f.label.zh)}</dt><dd>{f.label.en==='Appellation'&&['Bourgogne Aligoté','Bourgogne Aligoté AOC','Bouzeron','Bouzeron AOC'].includes(wine.appellation)?<a href={'#grapes?region='+encodeURIComponent(wine.appellation.replace(/ AOC$/,''))+'&country=France'}>{f.value}</a>:f.label.en==='Appellation'&&wine.links.some(l=>l.name==='Valdeorras')?<a href={wine.links.find(l=>l.name==='Valdeorras')!.url}>{f.value}</a>:f.label.en==='Grape'?<a href={'#grapes?id='+(wine.grapeIds?.[0]||'godello')}>{f.value}</a>:f.value}</dd></div>)}</dl>
   </div>
  </header>
  <div className="wd-vintage-strip"><div className="wd-year-control"><span>{label(dated?'Vintage':'Scope',dated?'年份':'资料范围')}</span><div role="group" aria-label="年份 / Vintage">{wine.vintages.map(v=><button key={v.year} aria-pressed={v.year===vintage.year} onClick={()=>choose(template,language,v.year)}>{/^\d{4}$/.test(v.year)?v.year:label('Cuvée profile','酒款通用资料')}</button>)}</div></div><div className="wd-analysis">{metrics.map(([en,zh,value])=><div key={en}><small>{label(en,zh)}</small><b>{value}</b></div>)}</div><a className="wd-sheet-link" href={wine.sources.find(s=>s.id===vintage.sources[0])?.url} target="_blank" rel="noreferrer">{label(dated?'Vintage source':'Technical source',dated?'年份来源':'技术资料来源')}</a></div>
  <div className="wd-content">
   {firstSections.map(section=><Section key={section.id} section={section}/>)}
   <section className="wd-section wd-section-cellar" id="wd-cellar">{heading({en:'Vinification & élevage',zh:'酿造与熟成'})}{dated&&<span className="wd-vintage-badge">{vintage.year}</span>}{rows([...vintage.rows,...(vintage.cellarNotes||[])])}</section>
   <section className="wd-section wd-section-vintage" id="wd-vintage">{heading(dated?{en:'Vintage conditions',zh:'年份条件'}:{en:'Scope',zh:'资料范围'})}{dated&&<span className="wd-vintage-badge">{vintage.year}</span>}<Text value={vintage.season} language={language} className="wd-season" links={inlineLinks}/>{cite(vintage.sources)}</section>
   {!!vintage.criticNotes?.length&&<section className="wd-section wd-section-critics" id="wd-critics">{heading({en:'Critics’ tasting notes',zh:'酒评人品鉴'})}<div>{vintage.criticNotes.map((n,i)=><article className="wd-critic-note" key={i}><header><b>{n.critic||n.publication}</b><span>{n.critic?n.publication+' · ':''}{vintage.year}{n.date?' · '+n.date:''}</span><strong>{n.score}<small>/{n.scale}</small></strong></header>{language!=='zh'&&<blockquote lang="en">“{n.quote}”</blockquote>}<Text value={n.summary} language={language} links={inlineLinks}/><a className="wd-note-source" href={wine.sources.find(s=>s.id===n.sourceId)?.url} target="_blank" rel="noreferrer">{label(n.sourceLabel.en,n.sourceLabel.zh)}</a></article>)}{tastingLink}</div></section>}
   {wine.selling&&<section className="wd-section wd-section-selling" id="wd-selling">{heading({en:'How to sell this bottle',zh:'如何推荐这款酒'})}<div><p className="wd-editorial">{label('SOMM100 · Service language','SOMM100 · 对客表达')}</p><Text value={wine.selling.pitch} language={language} links={inlineLinks} className="wd-sales-pitch"/>{rows(wine.selling.rows)}{searchLink}</div></section>}
   {lastSections.map(section=><Section key={section.id} section={section}/>)}
  </div>
  <div className="wd-bottom">
   <div className="wd-other-wines"><span>{label('Other wines','其他酒款')}</span><div>{wine.relatedIds.map(id=>{const w=findWineDossier(id);return w?<a key={id} href={'#library?type=wine&id='+id}>{w.producer} · {w.name}</a>:null})}</div></div>
   <section className="wd-resources" id="wd-resources"><header><h2>{label('Sources','资料来源')}</h2><a className="wd-official-link" href={wine.officialUrl} target="_blank" rel="noreferrer">{label(wine.id.startsWith('rp-')?'Producer website':'Wine source',wine.id.startsWith('rp-')?'酒庄官网':'酒款来源')} · {wine.producer}</a></header><p className="wd-resource-image">{label('Bottle image','瓶图来源')} · <a href={wine.imageSource} target="_blank" rel="noreferrer">{wine.imageCredit}</a></p>{!wine.selling&&searchLink}
    <details className="wd-source-list"><summary>{label('References & vintage notes','引用资料与年份说明')}<span>{wine.sources.length} ＋</span></summary>{wine.notes.map((n,i)=><Text key={i} value={n} language={language} className="wd-source-note"/>)}<ol>{wine.sources.map((source,i)=><li key={source.id}><a href={source.url} target="_blank" rel="noreferrer"><span>[{i+1}]</span>{source.title}</a><small>{source.scope}</small></li>)}</ol><p>{label('Bottle photographs identify the wine; the pictured label may show a different vintage. Critic summaries are attributed; SOMM100 service suggestions are separate.','瓶图用于识别酒款，标签年份可能不同。酒评摘要保留署名；SOMM100 侍酒与推荐建议另行标注。')}</p></details>
   </section><footer className="wd-footer"><span>SOMM100 / WINE LIBRARY</span></footer>
  </div>
 </div>
}
