'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {Play, Search, X} from 'lucide-react';
import bilibiliAccounts from '../data/wine-channel-bilibili-accounts.json';
import youtubeAccounts from '../data/wine-channel-source-accounts.json';
import bilibili from '../data/wine-channel.json';
import legacy from '../data/video-library.json';
import youtube from '../data/wine-channel-youtube-featured-01.json';
import mickey from '../data/wine-channel-mickey.json';
import dictionary from '../data/knowledge-dictionary.json';
import {findTerm, normalizeTerm} from '../lib/term-lookup';
import BilibiliPlayer from './BilibiliPlayer';
import {bilibiliPlayerUrl} from '../lib/bilibili-playback';
import './wine-channel.css';
import './wine-channel-player.css';

type Platform = 'Bilibili' | 'YouTube';
type Video = {
  id: string; title: string; url: string; publisher?: string; creatorId?: string; creator?: string;
  platform?: string; tags?: string[]; coverUrl?: string; durationSeconds?: number; publishedAt?: string;
  learningPrompt?: string; ownership?: string; topic?: string; personal?: boolean;
};
type Habits = {
  data: {videos: Video[]}; saving: boolean;
  save: (action: Record<string, unknown>, notice: string) => Promise<unknown>;
};
const channels = {
  Bilibili: bilibiliAccounts.accounts.map(c => ({...c, description: c.description})),
  YouTube: youtubeAccounts.accounts.map(c => ({...c, description: c.focus})),
};
export function videoKey(v: Video) {
  return v.url.match(/BV[a-zA-Z0-9]{10}/)?.[0] || v.url;
}
const bilibiliVideos: Video[] = [...bilibili.videos, ...legacy.videos, ...mickey.videos];
const catalog: Video[] = [...new Map(bilibiliVideos.map(v => [videoKey(v),v])).values(), ...youtube.videos];
const platformNames: Platform[] = ['Bilibili', 'YouTube'];
const topics: Record<string,string> = {viticulture:'葡萄种植',vinification:'葡萄酒酿造',regions:'国家与产区',grape_varieties:'葡萄品种',tasting:'品鉴',service:'侍酒服务',mixed:'葡萄酒文化'};
const platformIcons: Record<Platform,string> = {Bilibili: 'M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z', YouTube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'};

function mediaId(v: Video) {
  try {
    const u = new URL(v.url);
    if (u.protocol !== 'https:' || u.username || u.password) return;
    if (u.hostname === 'www.youtube.com' && u.pathname === '/watch') {
      const id = u.searchParams.get('v') || '';
      if (/^[\w-]{11}$/.test(id)) return {platform:'YouTube', id};
    }
    if (['www.bilibili.com','m.bilibili.com','bilibili.com'].includes(u.hostname)) {
      const id = u.pathname.match(/\/video\/(BV[A-Za-z0-9]{10})(?:\/|$)/)?.[1];
      if (id) return {platform:'Bilibili', id};
    }
  } catch { return; }
}
export function playerUrl(v: Video) {
  const media = mediaId(v);
  if (!media) return null;
  return media.platform === 'YouTube'
    ? 'https://www.youtube-nocookie.com/embed/'+media.id+'?rel=0&playsinline=1&autoplay=1'
    : bilibiliPlayerUrl(media.id, v.url);
}
function runtime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2,'0');
  return minutes < 60 ? minutes+':'+secs : Math.floor(minutes/60)+':'+String(minutes%60).padStart(2,'0')+':'+secs;
}
function VideoCard({video:v, playing, onPlay, onTag, onRemove}: {
  video: Video; playing: boolean; onPlay: (id: string|null) => void; onTag: (tag:string) => void; onRemove?: () => void;
}) {
  const [failed,setFailed] = useState(false);
  const media = mediaId(v), player = playerUrl(v);
  const image = v.coverUrl || (media?.platform === 'YouTube' ? 'https://i.ytimg.com/vi/'+media.id+'/hqdefault.jpg' : '');
  const poster = <>
    {image && !failed ? <img src={image} alt="" loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/> : <span className="wc-cover-type">{v.publisher || v.platform}</span>}
    <span className="wc-play"><Play size={24} fill="currentColor" aria-hidden="true"/></span>
    {!!v.durationSeconds && <span className="wc-duration">{runtime(v.durationSeconds)}</span>}
  </>;
  return <article className="wc-video">
    {playing && media?.platform === 'Bilibili' ? <BilibiliPlayer key={v.id} bvid={media.id} video={v} close={()=>onPlay(null)}/>
      : playing && player ? <div className="wc-player">
      <iframe title={v.title} src={player} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>
      <div><a href={v.url} target="_blank" rel="noreferrer">在 {v.platform} 打开原片</a><button onClick={()=>onPlay(null)}>关闭播放</button></div>
    </div> : player ? <button className="wc-cover" aria-label={'播放 '+v.title} onClick={()=>onPlay(v.id)}>{poster}</button>
      : <a className="wc-cover" href={v.url} target="_blank" rel="noreferrer" aria-label={'打开 '+v.title}>{poster}</a>}
    <div className="wc-video-copy">
      <div className="wc-byline"><span>{v.publisher || v.creator}{v.platform && ' · '+v.platform}</span>{v.publishedAt && <time dateTime={v.publishedAt}>{v.publishedAt.slice(0,10)}</time>}</div>
      <h3>{player?<button onClick={()=>onPlay(v.id)}>{v.title}</button>:<a href={v.url} target="_blank" rel="noreferrer">{v.title}</a>}</h3>
      <div className="wc-tags">{(v.tags?.length?v.tags:[topics[v.topic || '']].filter(Boolean)).map(tag=><button key={tag} onClick={()=>onTag(tag)}>{tag}</button>)}</div>
      {v.learningPrompt && <details><summary>学习提示</summary><p>{v.learningPrompt}</p></details>}
      {onRemove && <button className="wc-link" onClick={onRemove}>移除我的链接</button>}
    </div>
  </article>;
}
function readRoute() {
  if (typeof window === 'undefined') return {platform: 'Bilibili' as Platform, creator: ''};
  const p = new URLSearchParams(location.hash.split('?')[1]);
  return {platform:(p.get('platform') === 'youtube' ? 'YouTube':'Bilibili') as Platform, creator:p.get('creator') || ''};
}
export default function WineChannel({h}:{h:Habits}) {
  const [route,setRoute] = useState(readRoute);
  const [query,setQuery] = useState(''), [playing,setPlaying] = useState<string|null>(null);
  const {platform,creator} = route;
  const sources = channels[platform];
  const current = sources.find(c => c.id === creator);
  useEffect(()=>{
    function read() {setRoute(readRoute());setQuery('');setPlaying(null);}
    window.addEventListener('hashchange',read);
    return ()=>window.removeEventListener('hashchange',read);
  },[]);
  const personal = useMemo(()=>(h.data.videos || []).map(v=>({...v,publisher:v.creator || v.publisher,personal:true})),[h.data.videos]);
  const collection = useMemo(()=>{
    if (creator === 'own') return personal.filter(v=>v.ownership==='own');
    if (creator === 'personal') return personal;
    if (current) return catalog.filter(v=>v.platform===platform && (v.creatorId===current.id || v.publisher===current.name));
    if (creator === 'all') return catalog.filter(v=>v.platform===platform);
    return creator ? [] : [...catalog,...personal];
  },[creator,current,platform,personal]);
  const searched = normalizeTerm(query);
  const results = useMemo(()=>{
    if (!searched) return collection;
    const term = findTerm(dictionary,searched);
    const keys = [...new Set([searched,...(term?[term.zh,term.en,...term.aliases]:[])].filter(Boolean).map(normalizeTerm))];
    return collection.filter(v=>{
      const haystack=normalizeTerm([v.title,v.publisher,topics[v.topic || ''],...(v.tags || [])].filter(Boolean).join(' '));
      return keys.some(key=>haystack.includes(key)) || searched.split(' ').every(word=>haystack.includes(word));
    });
  },[collection,searched]);
  function go(p:Platform, id='') {
    setQuery('');setPlaying(null);
    const params = new URLSearchParams({platform:p.toLowerCase()});
    if (id) params.set('creator',id);
    location.hash='videos?'+params;
    window.scrollTo(0,0);
  }
  function search(value:string) {setQuery(value);setPlaying(null);}
  function selectTag(tag:string) {search(tag);document.getElementById('wc-video-search')?.scrollIntoView({block:'center'});}
  const listing = Boolean(searched || creator);
  return <section className="wc-page" aria-label="Wine Channel">
    <header className="wc-head"><h1>Wine Channel</h1><p>葡萄酒视频</p></header>
    <nav className="wc-platforms" aria-label="视频平台">{platformNames.map(name=><button key={name} aria-current={name===platform?'page':undefined} onClick={()=>go(name)}>
      <svg className={'wc-logo wc-logo-'+name.toLowerCase()} viewBox="0 0 24 24" aria-hidden="true"><path d={platformIcons[name]}/></svg>{name}
    </button>)}</nav>
    {creator && <div className="wc-context"><button className="wc-link" onClick={()=>go(platform)}>返回创作者</button><h2>{current?.name || ({personal:'我的链接',own:'SOMM HOUSE',all:'全部视频'}[creator]) || '未找到创作者'}</h2></div>}
    <label className="wc-search"><Search size={20} aria-hidden="true"/><input id="wc-video-search" type="search" autoComplete="off" value={query} onChange={e=>search(e.target.value)} aria-label={creator?'搜索当前视频列表':'搜索两个平台的视频'} placeholder={creator?'搜索此列表的视频':'搜索视频、产区、酒庄或主题'}/>{query && <button aria-label="清除搜索" onClick={()=>search('')}><X size={16}/></button>}</label>
    {listing ? <>
      <div className="wc-result-line"><span role="status">{results.length} 条视频</span>{current?.url && <a className="wc-link" href={current.url} target="_blank" rel="noreferrer">作者主页</a>}</div>
      {results.length ? <div className="wc-videos">{results.map(v=><VideoCard key={v.id} video={v} playing={playing===v.id} onPlay={setPlaying} onTag={selectTag} onRemove={v.personal?()=>h.save({type:'remove-video',id:v.id},'已移除该学习链接'):undefined}/>)}</div>
        : <p className="wc-empty">{searched?'没有找到匹配的视频。':current?'暂未收录这位创作者的视频。':'此列表暂无视频。'}</p>}
    </> : <>

      <div className="wc-creators" aria-label="创作者">{sources.map(c=><button className="wc-creator" key={c.id} onClick={()=>go(platform,c.id)}>
        <strong>{c.name}</strong><span>{c.description}</span>
      </button>)}</div>
    </>}
    <footer className="wc-footer">视频由原平台播放，保留作者署名与原片链接。</footer>
  </section>;
}
