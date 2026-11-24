'use client';

import React, { useEffect, useMemo, useState } from 'react';
import archive from '../data/wine-articles.json';
import houseArchive from '../data/wine-articles-house.json';
import barrelCellar from './article-covers/barrel-cellar.webp';
import champagneFlutes from './article-covers/champagne-flutes.webp';
import './wine-articles.css';

// Editorial photographs, separate from each publisher's own identity.
// Barrel cellar: Wikimedia Commons, Kakheti and Gori - Kakheti8239.jpg, lumoplank (CC0).
// Champagne: Wikimedia Commons, Champagne flutes glasses bubbles.jpg, Jon Sullivan (public domain).
const covers: Record<string, string> = { '1': barrelCellar, '7': champagneFlutes };

type Article = {
  account: string;
  title: string;
  url: string;
  topic: string;
  date?: string;
  note?: string;
  edition?: string;
};

const articles: Article[] = archive.articles;
const accounts = archive.accounts.map(account => {
  const posts = articles.filter(article => article.account === account.id);
  const topics = new Map<string, number>();
  for (const post of posts) {
    if (post.topic !== '综合') topics.set(post.topic, (topics.get(post.topic) ?? 0) + 1);
  }
  const focus = [...topics].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name]) => name);
  return { ...account, posts, focus };
}).sort((a, b) => Number(b.id === 'house') - Number(a.id === 'house') || b.posts.length - a.posts.length);

const indexed = accounts.filter(account => account.posts.length > 0);
const pending = accounts.filter(account => account.posts.length === 0);
const byId = new Map(accounts.map(account => [account.id, account]));
const pageSize = 30;
const accountLink = (id: string) => '#articles?account=' + encodeURIComponent(id);

function readAccount() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.hash.split('?')[1]).get('account') ?? '';
}

function ArticleList({ items, showAccount, directory }: {
  items: Article[];
  showAccount: boolean;
  directory?: React.ReactNode;
}) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [limit, setLimit] = useState(pageSize);
  const topics = useMemo(() => [...new Set(items.map(article => article.topic))].sort((a,b) => a.localeCompare(b,'zh-CN')), [items]);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return items.filter(article => (!topic || article.topic === topic) &&
      [article.title, article.topic, article.edition, article.note]
        .join(' ').toLocaleLowerCase().includes(term));
  }, [items, query, topic]);

  return <>
    <div className="wa-filters">
      <label>搜索文章<input type="search" value={query} placeholder="输入文章标题或主题，如「种植」"
        onChange={event => { setQuery(event.target.value); setLimit(pageSize); }} /></label>
      <label>主题<select value={topic} onChange={event => { setTopic(event.target.value); setLimit(pageSize); }}>
        <option value="">全部主题</option>
        {topics.map(value => <option key={value}>{value}</option>)}
      </select></label>
    </div>
    {directory && !query.trim() && !topic ? directory : <>
    <p className="wa-result-count" role="status">{filtered.length} 条原文链接</p>
    <ul className="wa-list">
      {filtered.slice(0, limit).map(article => <li key={article.url}>
        <a className="wa-title" href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
        <div className="wa-meta">
          {showAccount && <a href={accountLink(article.account)}>{byId.get(article.account)?.name}</a>}
          {article.edition && <span>{article.edition}</span>}
          {article.date && <time dateTime={article.date}>{article.date}</time>}
          <span>{article.topic}</span>
          {article.note && <span className="wa-note">{article.note}</span>}
        </div>
      </li>)}
    </ul>
    {!filtered.length && <p>没有匹配的文章。</p>}
    {filtered.length > limit && <button className="wa-button" onClick={() => setLimit(limit + pageSize)}>
      再显示 {Math.min(pageSize, filtered.length - limit)} 条
    </button>}
    </>}
  </>;
}

const chronological = [...articles].sort((a,b) => (b.date ?? '').localeCompare(a.date ?? '') || Number(Boolean(a.note)) - Number(Boolean(b.note)));
export default function WineArticles() {
  const [selected, setSelected] = useState(readAccount);
  useEffect(() => {
    const read = () => { setSelected(readAccount()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);
  const account = byId.get(selected);
  return <section className="wa-page" aria-label="Wine Articles">
    <header className="wa-header">
      <h1>Wine Articles</h1>
      <p>葡萄酒文章</p>
    </header>
    {!selected ? <>
      <ArticleList items={chronological} showAccount directory={<>
      <div className="wa-grid" aria-label="公众号目录">
        {indexed.map(item => <a className={covers[item.id] ? "wa-card wa-photographic" : "wa-card wa-print"} href={accountLink(item.id)} key={item.id}>
          <span className="wa-card-body"><strong>{item.name}</strong><small>{item.id === 'house' ? houseArchive.length + ' 篇归档 · ' : ''}{item.posts.length} 条原文链接</small>
            {item.focus.length > 0 && <span>{item.focus.join(' · ')}</span>}
          </span>
          {covers[item.id] && <img className="wa-cover" src={covers[item.id]} alt="" decoding="async" />}
        </a>)}
      </div>
      <details className="wa-pending"><summary>待补原文链接的来源 · {pending.length}</summary>
        <ul>{pending.map(item => <li key={item.id}>{item.name}</li>)}</ul>
      </details>
      </>} />
    </> : <>
      <a className="wa-back" href="#articles">返回公众号目录</a>
      <div className="wa-heading"><div><h2>{selected === 'all' ? '全部文章' : account?.name ?? '未找到这个账号'}</h2></div></div>
      {covers[selected] && <img className="wa-cover wa-detail-cover" src={covers[selected]} alt="" decoding="async" />}
      {selected === 'house' && <details className="wa-archive"><summary>原稿目录 · {houseArchive.length} 篇</summary>
        <ul>{houseArchive.map(item => <li key={item.title}>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a> : <span>{item.title} <small>微信链接待补</small></span>}</li>)}</ul>
      </details>}
      {selected === 'all' || account?.posts.length
        ? <ArticleList key={selected} items={account?.posts ?? chronological} showAccount={selected === 'all'} />
        : account && <p>这个来源正在补充微信原文链接。</p>}
    </>}
  </section>;
}
