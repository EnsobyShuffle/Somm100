'use client';
import React from 'react';
import {BrandMark} from './BrandMark';
import FoundationLoadBoundary from './FoundationLoadBoundary';
import {foundationFullAppUrl} from '../lib/foundation-entry.mjs';
import cohort from '../data/foundation-cohort22.json';
import './foundation-focus.css';
const FoundationPage=React.lazy(()=>import('./FoundationPage'));
export default function FoundationFocus(){
  const target=window.location.hash.slice(1);
  const citySlug=new URLSearchParams(window.location.search).get('city');
  const city=target==='foundation-cohort-bridge-title'
    ? cohort.cities.find(entry=>entry.calendarSlug===citySlug)?.city
    : undefined;
  function go(page:string){window.location.assign(foundationFullAppUrl(page,window.location.href));}
  return <div className="foundation-focus">
    <header className="foundation-focus-header">
      <a className="foundation-focus-brand" href="./index.html#home" aria-label="SOMM100 首页"><BrandMark/></a>
      <nav aria-label="课程入口">
        <a href="./course.html">课程首页</a>
        <a href="./index.html#foundation">打开完整 App</a>
      </nav>
    </header>
    <main className="foundation-focus-main">
      <p className="fine-print">课程专注阅读 · 学习记录保存在当前浏览器。其他设备或不同网址不会自动同步。</p>
      <FoundationLoadBoundary onBack={()=>go('courses')}><FoundationPage go={go} initialTarget={target} initialCohortCity={city}/></FoundationLoadBoundary>
    </main>
  </div>;
}
