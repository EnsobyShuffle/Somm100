import assert from 'node:assert/strict';
import {register} from 'node:module';
import {readFileSync} from 'node:fs';
register('./foundation-render-loader.mjs',import.meta.url);
const {JSDOM}=await import('jsdom');
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:'https://test.invalid/somm100/foundation.html'});
globalThis.window=dom.window;globalThis.document=dom.window.document;
globalThis.CustomEvent=dom.window.CustomEvent;globalThis.IS_REACT_ACT_ENVIRONMENT=true;
let scrolledTo;
window.HTMLElement.prototype.scrollIntoView=function(){scrolledTo=this.id;};
window.matchMedia=()=>({matches:true});
const {default:React,act}=await import('react');
const {createRoot}=await import('react-dom/client');
const {default:Page}=await import('../app/FoundationPage.tsx');
const {default:Focus}=await import('../app/FoundationFocus.tsx');
const root=createRoot(document.getElementById('root'));
const errors=[],oldError=console.error;console.error=(...args)=>errors.push(args.map(String).join(' '));
try{
 // Existing full-app page and focus page use identical storage keys on one origin.
 await act(async()=>root.render(React.createElement(Page,{go:()=>{}})));
 const input=document.querySelector('#foundation-d1-quiz input[type=radio]');
 await act(async()=>input.click());
 const key='somm100.foundation.d1-quiz.v1',saved=JSON.parse(window.localStorage.getItem(key));
 await act(async()=>root.render(null));
 await act(async()=>root.render(React.createElement(Focus)));
 assert(document.querySelector('h1'));
 assert(document.querySelector('#foundation-d1-quiz input[type=radio]').checked);
 assert.deepEqual(JSON.parse(window.localStorage.getItem(key)),saved);
 const appLink=[...document.querySelectorAll('a')].find(x=>x.textContent==='打开完整 App');
 assert.equal(appLink.href,'https://test.invalid/somm100/index.html#foundation');
 assert(document.querySelector('header svg image'));
 assert.match(document.querySelector('main').textContent,/不会自动同步/);
 assert.equal(document.querySelector('header a[href="./course.html"]').href,
   'https://test.invalid/somm100/course.html');
 const courseHomeHtml=readFileSync(new URL('../dist-cloudbase/course.html',import.meta.url),'utf8');
 let shortcutCount=0;
 for(const mount of ['/','/somm100/']){
   const courseHome=new JSDOM(courseHomeHtml,{url:'https://test.invalid'+mount+'course.html'});
   try{
     const home=courseHome.window.document;
     assert.equal(home.querySelector('h1').textContent,'侍酒师100课程');
     assert.equal(home.scripts.length,0);
     assert.deepEqual([...home.querySelectorAll('main h2')].map(heading=>heading.textContent),
       ['课程介绍','文章导读','学习入口']);
     const links=[...home.querySelectorAll('a[href^="./foundation.html#"]')];
     assert.equal(links.length,10);
     for(const link of links){
       const targetUrl=new URL(link.href);
       assert.equal(targetUrl.pathname,mount+'foundation.html');
       await act(async()=>root.render(null));
       window.history.replaceState(null,'',targetUrl);
       await act(async()=>root.render(React.createElement(Focus)));
       const id=targetUrl.hash.slice(1);
       assert.equal(document.activeElement.id,id);
       assert.equal(scrolledTo,id);
       assert.deepEqual(JSON.parse(window.localStorage.getItem(key)),saved);
       shortcutCount++;
     }
   }finally{courseHome.window.close();}
 }
 await act(async()=>root.render(null));
 await act(async()=>root.render(React.createElement(Page,{go:()=>{}})));
 assert(document.querySelector('#foundation-d1-quiz input[type=radio]').checked);
 assert.deepEqual(JSON.parse(window.localStorage.getItem(key)),saved);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({status:'PASS',sameOriginRecordRoundTrip:true,brandPreserved:true,fullAppLink:true,courseHomeScriptFree:true,shortcutsChecked:shortcutCount,scope:'React/jsdom only; no real cross-page navigation or phone test'},null,2));
}finally{await act(async()=>root.unmount());console.error=oldError;dom.window.close();}
