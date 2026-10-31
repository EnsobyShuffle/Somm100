'use client';

import React, {useEffect, useState} from 'react';
import legacy from '../data/video-library.json';
import catalog from '../data/wine-channel.json';
import './wine-channel.css';
import {validateVideo} from '../lib/habits';

type Video = {
  id: string; title: string; url: string; publisher?: string; publisherUrl?: string;
  creator?: string; creatorId?: string; topic?: string; tags?: string[];
  platform?: string; coverUrl?: string; embedUrl?: string; durationSeconds?: number;
  publishedAt?: string; learningPrompt?: string; personal?: boolean; ownership?: string;
};
type Creator = {id:string; name:string; url?:string; description:string; initial:string; topics?:string[]};
type Habits = {
  data: {videos: Video[]}; saving: boolean;
  save: (action: Record<string, unknown>, notice: string) => Promise<unknown>;
};
const topics: Record<string,string> = {viticulture:'葡萄种植',vinification:'葡萄酒酿造',regions:'国家与产区',grape_varieties:'葡萄品种',tasting:'品鉴',service:'侍酒服务',mixed:'综合'};
export function videoKey(video: Video) {return video.url.match(/BV[a-zA-Z0-9]{10}/)?.[0] || video.url;}
export function playerUrl(video: Video) {
  if (!video.embedUrl) return null;
  try {
    const url = new URL(video.embedUrl);
    const bvid = videoKey(video);
    if (url.origin !== 'https://player.bilibili.com' || url.pathname !== '/player.html' || url.searchParams.get('bvid') !== bvid || !/^BV[a-zA-Z0-9]{10}$/.test(bvid)) return null;
    url.searchParams.set('autoplay','0');
    return url.toString();
  } catch {return null;}
}
function duration(seconds?: number) {
  if (!seconds) return '';
  const m = Math.floor(seconds / 60), s = String(seconds % 60).padStart(2,'0');
  return m >= 60 ? `${Math.floor(m / 60)}:${String(m % 60).padStart(2,'0')}:${s}` : `${m}:${s}`;
}
function Cover({video}: {video:Video}) {
  const [failed,setFailed] = useState(false);
  return <a className="wc-cover" href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`${video.title} · 在 B 站或原平台打开`}>
    {video.coverUrl && !failed ? <img src={video.coverUrl} alt={video.title} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/> : <span className="wc-cover-fallback">{video.publisher || '我的学习链接'}<small>{failed?'封面暂不可用 · 点击打开原片':'打开原视频'}</small></span>}
    {duration(video.durationSeconds) && <span className="wc-duration">{duration(video.durationSeconds)}</span>}
  </a>;
}
export default function WineChannel({h}:{h:Habits}) {
  const [selected,setSelected] = useState(''), [query,setQuery] = useState(''), [topic,setTopic] = useState('all');
  const [playing,setPlaying] = useState<string|null>(null), [add,setAdd] = useState(false);
  const [title,setTitle] = useState(''), [url,setUrl] = useState(''), [creator,setCreator] = useState('');
  const [newTopic,setNewTopic] = useState('regions'), [own,setOwn] = useState(false), [error,setError] = useState('');
  useEffect(()=>{
    const read=()=>{setSelected(new URLSearchParams(location.hash.split('?')[1]).get('creator') || '');setPlaying(null);setTopic('all');setQuery('');};
    read();addEventListener('hashchange',read);return()=>removeEventListener('hashchange',read);
  },[]);
  const personal: Video[] = (h.data.videos || []).map(v=>({...v,publisher:v.creator || v.publisher,personal:true}));
  const additions: Video[] = catalog.videos;
  const curated: Video[] = [...additions,...legacy.videos.filter(v=>!additions.some(a=>videoKey(a)===videoKey(v)))];
  const creators: Creator[] = [...catalog.creators];
  curated.forEach(v=>{
    if (creators.some(c=>c.name===v.publisher)) return;
    creators.push({id:v.id,name:v.publisher || '其他视频',url:v.publisherUrl,description:'已收录的视频与原平台链接。',initial:(v.publisher || '影').slice(0,1)});
  });
  const current = creators.find(c=>c.id===selected);
  const scoped = selected==='own' ? personal.filter(v=>v.ownership==='own') : selected==='personal' ? personal : selected==='all' ? [...curated,...personal] : current ? curated.filter(v=>v.publisher===current.name) : [];
  const filtered = scoped.filter(v=>(topic==='all'||v.topic===topic)&&[v.title,v.publisher,...(v.tags||[])].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  function openCreator(id:string) {location.hash=id?'videos?creator='+encodeURIComponent(id):'videos';}
  function clearFilters() {setQuery('');setTopic('all');setPlaying(null);}
  async function addVideo(e:React.FormEvent) {
    e.preventDefault();setError('');
    let payload;
    try {payload=validateVideo({title:title.trim(),url:url.trim(),creator:creator.trim(),topic:newTopic,ownership:own?'own':'external'});}
    catch(e) {setError((e as Error).message);return;}
    const result=await h.save({type:'video',...payload},'视频链接已加入你的学习库');
    if(result){setTitle('');setUrl('');setCreator('');setAdd(false);openCreator('personal');}
  }
  return <div className="wc-page">
    <header className="page-heading"><div><span className="eyebrow">WATCH & LEARN</span><h1>Wine Channel</h1><p>葡萄酒视频</p></div><button className="button secondary" onClick={()=>setAdd(!add)} aria-expanded={add}>{add?'收起添加':'添加视频链接'}</button></header>
    {add && <form className="white-panel add-video wc-form" onSubmit={addVideo}>
      <h2>我的视频链接</h2><label>标题<input required maxLength={120} value={title} onChange={e=>setTitle(e.target.value)}/></label>
      <label>原视频链接<input required type="url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.bilibili.com/video/…"/></label>
      <label>发布者（选填）<input maxLength={80} value={creator} onChange={e=>setCreator(e.target.value)}/></label>
      <label>主题<select value={newTopic} onChange={e=>setNewTopic(e.target.value)}>{Object.entries(topics).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
      <label className="check-row"><input type="checkbox" checked={own} onChange={e=>setOwn(e.target.checked)}/>Somehouse / SOMM100 自有内容</label>
      <p className="fine-print">保存到你的学习库。微信视频号可能需要在微信打开。</p>{error&&<p role="alert">{error}</p>}
      <button className="button" disabled={h.saving||!title.trim()||!url.trim()}>{h.saving?'正在保存…':'保存链接'}</button>
    </form>}
    {!selected ? <>
      <div className="wc-section-heading"><h2>创作者</h2><div className="wc-actions"><button className="text-button" onClick={()=>openCreator('personal')}>我的链接 · {personal.length}</button><button className="text-button" onClick={()=>openCreator('own')}>Somehouse · 自有内容</button><button className="text-button" onClick={()=>openCreator('all')}>全部视频 · {curated.length + personal.length}</button></div></div>
      <div className="wc-creators">{creators.map(c=><button className="wc-creator" key={c.id} onClick={()=>openCreator(c.id)}>
        <span className="wc-initial" aria-hidden="true">{c.initial}</span><span className="wc-creator-copy"><strong>{c.name}</strong><span>{c.description}</span><small>{curated.filter(v=>v.publisher===c.name).length} 条已收录视频{c.topics?.length?' · '+c.topics.join(' / '):''}</small></span><span className="wc-dots" aria-hidden="true">…</span>
      </button>)}</div>
      <details className="wc-pending"><summary>待接入的指定作者</summary>{legacy.creators.filter(c=>c.status==='identity_pending'&&!catalog.creators.some(known=>known.id===c.id)).map(c=><p key={c.id}><b>{c.name}</b> · 原发布账号待确认。</p>)}</details>
    </> : <>
      <button className="back-link" onClick={()=>openCreator('')}>返回创作者</button>
      <div className="wc-section-heading"><div><h2>{current?.name || (selected==='own'?'Somehouse · 自有内容':selected==='personal'?'我的视频链接':selected==='all'?'全部视频':'未找到此创作者')}</h2>{current && <p>{current.description}</p>}</div>{current?.url&&<a className="text-button" href={current.url} target="_blank" rel="noopener noreferrer">B 站账号主页</a>}</div>
      <div className="wc-filters"><label className="wc-search">搜索视频<input value={query} onChange={e=>{setQuery(e.target.value);setPlaying(null);}} placeholder="片名、主题、产区…"/></label><label>主题<select value={topic} onChange={e=>{setTopic(e.target.value);setPlaying(null);}}><option value="all">全部主题</option>{Object.entries(topics).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label><span role="status">{filtered.length} 条视频</span></div>
      <div className="wc-videos">{filtered.map(v=><article className="wc-video" key={v.id}>
        <Cover video={v}/><div className="wc-video-body"><span className="eyebrow">{v.publisher || '我的学习链接'}</span><h3><a href={v.url} target="_blank" rel="noopener noreferrer">{v.title}</a></h3>
          <div className="wc-meta"><span>{topics[v.topic || ''] || '葡萄酒视频'}</span>{v.publishedAt&&<time dateTime={v.publishedAt}>{new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'numeric',day:'numeric'}).format(new Date(v.publishedAt))}</time>}</div>
          <div className="wc-actions"><a className="text-button" href={v.url} target="_blank" rel="noopener noreferrer">{v.platform==='Bilibili'?'在 B 站观看':'打开原视频'}</a>{playerUrl(v)&&<button className="text-button" aria-expanded={playing===v.id} onClick={()=>setPlaying(playing===v.id?null:v.id)}>{playing===v.id?'关闭播放器':'站内播放'}</button>}</div>
          {playing===v.id&&playerUrl(v)&&<div className="wc-player"><iframe src={playerUrl(v)!} title={v.title+' · B站播放器'} allow="fullscreen; picture-in-picture" allowFullScreen/><p>播放器由 B 站提供。如无法播放，请使用上方「在 B 站观看」。</p></div>}
          {v.learningPrompt&&<details className="wc-study"><summary>学习提示</summary><p>{v.learningPrompt}</p></details>}
          {v.personal&&<button className="text-button wc-remove" disabled={h.saving} onClick={()=>h.save({type:'remove-video',id:v.id},'已移除该学习链接')}>移除我的链接</button>}
        </div>
      </article>)}</div>
      {!filtered.length&&<div className="empty-state"><p>{query||topic!=='all'?'没有匹配的视频。':selected==='own'?'原发布账号待确认。你可以添加自有视频链接并保存到学习库。':selected==='personal'?'还没有保存个人视频链接。':'此账号暂未收录视频。'}</p>{(query||topic!=='all')&&<button className="button secondary" onClick={clearFilters}>清除筛选</button>}</div>}
    </>}
    <footer className="wc-footer">视频与封面来自原发布平台，保留作者署名与原片链接。点击后才加载站内播放器；原片可用性由 B 站决定。打开链接不会自动记为学习完成。</footer>
  </div>;
}
