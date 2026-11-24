'use client';
import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Library, Newspaper, Pause, Play, ScrollText, Target, Wine } from 'lucide-react';
import './discover-home.css';

const daily = '/wine-daily.html';
const courses = '/course.html';
const destinations = [
  { zh: '侍酒师100课程', en: 'SOMM100', href: courses, icon: BookOpen },
  { zh: '侍酒师分级课程', en: 'CMS', href: '#cms', icon: GraduationCap },
  { zh: '葡萄酒知识库', en: 'Wine Library', href: '#library', icon: Library },
  { zh: '品鉴笔记', en: 'Wine Tasting', href: '#journal', icon: Wine },
  { zh: '葡萄酒练习', en: 'Wine Quiz', href: '#practice', icon: Target },
  { zh: '葡萄酒日报', en: 'Wine Daily', href: daily, icon: Newspaper },
  { zh: '葡萄酒文章', en: 'Wine Articles', href: '#articles', icon: ScrollText },
  { zh: '葡萄酒视频', en: 'Wine Channel', href: '#videos', icon: Play },
];

const features = [
  { en: 'Learn, Taste, Explore', zh: '探索课程', href: courses, image: '/media/mosel-vineyard.png' },
  { en: 'SOMM100 Wine Daily', zh: '阅读日报', href: daily, image: '/media/grapes/pinot-noir.jpg' },
];
const channels = [
  { en: 'Wine Daily', zh: '阅读葡萄酒日报', href: daily, image: '/media/grapes/pinot-noir.jpg' },
  { en: 'Wine Channel', zh: '观看葡萄酒视频', href: '#videos', image: '/media/ferment-cap.jpg' },
  { en: 'Wine Articles', zh: '浏览公众号文章', href: '#articles', image: '/media/oak-cellar.jpg' },
  { en: 'Wine Quiz', zh: '进入葡萄酒练习', href: '#practice', image: '/media/library/rp-louro.jpg' },
  { en: 'Wine Library', zh: '查阅葡萄酒知识库', href: '#library', image: '/media/library/valdeorras.jpg' },
];

function Carousel({ slides, compact = false }: { slides: typeof features; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (paused || reduced || hovered) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % slides.length);
    }, compact ? 5200 : 7500);
    return () => window.clearInterval(timer);
  }, [paused, reduced, hovered, slides, compact]);
  const slide = slides[index];
  return <section className={compact ? 'discover-rotation' : 'discover-feature'} aria-label={compact ? '栏目轮播' : '首页推荐'} aria-roledescription="轮播"
    onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
    onPointerLeave={() => setHovered(false)}
    onFocusCapture={event => { if (event.target.matches(':focus-visible') && !event.target.closest('[data-playback]')) setPaused(true); }}>
    <a className="discover-slide" href={slide.href} aria-label={slide.en + ' · ' + slide.zh}>
      <img key={slide.image} src={slide.image} alt="" />
      <div className="discover-slide-copy"><h2>{slide.en}</h2><span>{slide.zh}</span></div>
    </a>
    <div className="discover-controls">{slides.map((entry, i) =>
      <button key={entry.en} aria-label={'显示 ' + entry.en} aria-pressed={index === i} onClick={() => { setIndex(i); setPaused(true); }}><i/></button>
    )}{!reduced && <button data-playback aria-label={paused ? '播放轮播' : '暂停轮播'} onClick={() => setPaused(!paused)}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button>}</div>
  </section>;
}

export function DiscoverLanding(_props: { go: (page: string) => void; headline: string }) {
  return <div className="discover-home">
    <div className="discover-title"><h1>Discover <span lang="zh-CN">发现</span></h1></div>
    <div className="discover-covers"><Carousel slides={features}/><Carousel slides={channels} compact/></div>
    <nav className="discover-destinations" aria-label="首页栏目">{destinations.map(item =>
      <a key={item.href} href={item.href}><item.icon size={20} strokeWidth={1.5}/><span><strong>{item.zh}</strong><small>{item.en}</small></span></a>
    )}</nav>
  </div>;
}
