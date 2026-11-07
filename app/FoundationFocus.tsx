'use client';
import React from 'react';
import {BrandMark} from './BrandMark';
import FoundationLoadBoundary from './FoundationLoadBoundary';
import {foundationFullAppUrl} from '../lib/foundation-entry.mjs';
import './foundation-focus.css';
const FoundationPage=React.lazy(()=>import('./FoundationPage'));
export default function FoundationFocus(){
  function go(page:string){window.location.assign(foundationFullAppUrl(page,window.location.href));}
  return <div className="foundation-focus">
    <header className="foundation-focus-header">
      <a className="foundation-focus-brand" href="./index.html#home" aria-label="SOMM100 首页"><BrandMark/></a>
      <a href="./index.html#foundation">打开完整 App</a>
    </header>
    <main className="foundation-focus-main">
      <p className="fine-print">课程专注阅读 · 学习记录保存在当前浏览器。其他设备或不同网址不会自动同步。</p>
      <FoundationLoadBoundary onBack={()=>go('courses')}><FoundationPage go={go}/></FoundationLoadBoundary>
    </main>
  </div>;
}
