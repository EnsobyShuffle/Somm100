'use client';
import {useMemo,useState} from 'react';
import {ArrowUpRight,Search,MapPin} from 'lucide-react';
import records from '../data/wine-map-library.json';
import './wine-map-library.css';

type MapRecord={id:string;title:string;country:string;region:string;village:string;images:number;media:string;source:string;record:string;note?:string};
const countryNames:Record<string,string>={Australia:'澳大利亚',Austria:'奥地利',China:'中国',France:'法国',Germany:'德国',Greece:'希腊',Hungary:'匈牙利',Italy:'意大利','South Africa':'南非','United States':'美国','未标注':'待分类'};

export function WineMapLibrary(){
 const [country,setCountry]=useState('全部国家');
 const [search,setSearch]=useState('');
 const all=records as MapRecord[];
 const countries=['全部国家',...Array.from(new Set(all.map(r=>r.country))).sort((a,b)=>(countryNames[a]||a).localeCompare(countryNames[b]||b,'zh-CN'))];
 const shown=useMemo(()=>all.filter(r=>(country==='全部国家'||r.country===country)&&(!search||`${r.title} ${r.country} ${r.region} ${r.village}`.toLowerCase().includes(search.toLowerCase()))),[all,country,search]);
 const grouped=useMemo(()=>countries.filter(c=>c!=='全部国家'&&(country==='全部国家'||country===c)).map(c=>({country:c,items:shown.filter(r=>r.country===c)})).filter(g=>g.items.length),[countries,country,shown]);
 return <section className="wine-map-library" aria-label="资料库地图目录">
  <div className="wml-intro"><div><span className="eyebrow">CURATED MAP RECORDS</span><h2>资料库现有地图</h2><p>共 {all.length} 条葡萄酒地图档案。先按国家找，再进入产区或村庄；资料不全的地方明确标出来。</p></div><div className="wml-summary"><b>{all.length}</b><span>地图档案</span></div></div>
  <div className="wml-pending-source"><div><b>还有一个待导入来源</b><p>CMS Resource Library 里登记了本地 “Wine Maps” 文件夹，状态仍是 TO COLLECT；文件清单尚未进入 Notion，因此不计入上面的 {all.length} 条。</p></div><a href="https://app.notion.com/p/3f717d16de4c81ba9a99f94b51e3a9d7?pvs=204" target="_blank" rel="noreferrer">查看文件夹登记 <ArrowUpRight size={14}/></a></div>
  <div className="wml-toolbar"><label className="wml-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索国家、产区、村庄或地图名称" aria-label="搜索地图资料"/></label><label className="wml-country">国家<select value={country} onChange={e=>setCountry(e.target.value)}>{countries.map(c=><option key={c} value={c}>{c==='全部国家'?c:countryNames[c]||c}</option>)}</select></label></div>
  {!grouped.length&&<div className="wml-empty">没有找到对应地图。</div>}
  {grouped.map(group=><section className="wml-country-group" key={group.country}><div className="wml-country-title"><span className="eyebrow">COUNTRY</span><h3>{countryNames[group.country]||group.country}<small>{group.country}</small></h3><span>{group.items.length} 份</span></div><div className="wml-grid">{group.items.map((r,i)=><article className="wml-card" key={r.id}><div className="wml-card-top"><span className="wml-index">{String(i+1).padStart(2,'0')}</span><MapPin size={15}/></div><div className="wml-hierarchy"><span>{countryNames[r.country]||r.country}</span>{r.region&&<><i>›</i><span>{r.region}</span></>}{r.village&&<><i>›</i><b>{r.village}</b></>}</div><h4>{r.title}</h4><p className="wml-level">{r.village?'村庄 / 具体地名':r.region?'产区':'国家总览'}</p><div className="wml-status"><span>{r.media}</span>{r.images>0&&<small>{r.images} 张归档图片</small>}</div>{r.note&&<p className="wml-note">{r.note}</p>}<div className="wml-links">{r.source?<a href={r.source} target="_blank" rel="noreferrer">原始来源 <ArrowUpRight size={14}/></a>:<span className="wml-no-source">原始来源链接未存</span>}<a href={r.record} target="_blank" rel="noreferrer">资料库记录 <ArrowUpRight size={14}/></a></div></article>)}</div></section>)}
  <p className="wml-footnote">目录依据 Wine Library 中 Material Type = Map 的记录整理；已排除一条非葡萄酒的“客户体验地图”。图片数指归档记录中的图片数量，不等于地图张数。点“资料库记录”查看归档图文，点“原始来源”回到公开原页面。</p>
 </section>
}
