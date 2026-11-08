// Full extracted page integration, using real React and disposable jsdom storage.
import assert from 'node:assert/strict';
import {register} from 'node:module';
register('./foundation-render-loader.mjs',import.meta.url);
const {JSDOM}=await import(process.env.FOUNDATION_DOM_MODULE || 'jsdom');
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:'https://foundation-test.invalid/#foundation'});
globalThis.window=dom.window;globalThis.document=dom.window.document;
globalThis.CustomEvent=dom.window.CustomEvent;globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const scrolls=[];
window.HTMLElement.prototype.scrollIntoView=function(options){scrolls.push({id:this.id,...options});};
window.matchMedia=()=>({matches:true});
const {default:React,act}=await import('react');
const {createRoot}=await import('react-dom/client');
const {default:Page}=await import('../app/FoundationPage.tsx');
const diagnostics=[],routes=[];const originalError=console.error;
console.error=(...args)=>diagnostics.push(args.map(String).join(' '));
const root=createRoot(document.getElementById('root'));
try{
 await act(async()=>root.render(React.createElement(Page,{go:path=>routes.push(path)})));
 assert.equal(document.querySelector('h1').textContent,'先理解一瓶酒，再走进课堂。');
 const chapters=[...document.querySelectorAll('.foundation-chapter')];
 assert.deepEqual(chapters.map(x=>x.id),Array.from({length:8},(_,i)=>'foundation-'+i));
 const links=chapters.flatMap(x=>[...x.querySelectorAll('a')]);
 assert.equal(links.length,10);assert(links.every(x=>new URL(x.href).hostname==='mp.weixin.qq.com'));
 const top=document.querySelector('.button-row');
 const targets=['foundation-study-title','foundation-bridge-title','foundation-d1-title','foundation-d1-quiz-title','foundation-d2-title','foundation-d2-quiz-title','foundation-france-title','foundation-d3-title','foundation-d3-quiz-title','foundation-d4-title','foundation-d4-quiz-title','foundation-sparkling-title'];
 assert.equal(top.querySelectorAll('button').length,targets.length);
 for(const [i,button] of [...top.querySelectorAll('button')].entries()){
   assert(document.getElementById(targets[i]));
   await act(async()=>button.click());assert.deepEqual(scrolls.at(-1),{id:targets[i],behavior:'instant',block:'start'});assert.equal(document.activeElement.id,targets[i]);
 }
 for(const a of document.querySelectorAll('a[href^="#foundation-"]')){
   await act(async()=>a.click());assert.deepEqual(scrolls.at(-1),{id:a.hash.slice(1),behavior:'instant',block:'start'});assert.equal(document.activeElement.id,a.hash.slice(1));
   assert.equal(window.location.hash,'#foundation','Concept navigation must not replace app route');
 }
 for(const label of ['← 选择课程','服务情境练习','葡萄酒练习']){
   const button=[...document.querySelectorAll('button')].find(b=>b.textContent===label);
   assert(button);await act(async()=>button.click());
 }
 assert.deepEqual(routes,['courses','service','practice']);
 assert(document.getElementById('foundation-cohort-title'));
 const cohort=document.querySelector('[aria-labelledby="foundation-cohort-title"]');
 const cities=[...cohort.querySelectorAll('.foundation-cohort-city')];
 assert.deepEqual(cities.map(card=>card.querySelector('h3').textContent), ['北京','上海','成都','深圳','广州']);
 assert.deepEqual(cities.map(card=>card.querySelector('.foundation-cohort-instructor').textContent),
   ['李晓龙 Xiaolong Li','张聪 Christian Zhang','胡映霞 Cassie Hu','吴耀亨 Henri Wu','薛维隆 Powell Xue']);
 assert.deepEqual(cities.map(card=>[...card.querySelectorAll('time')].map(date=>date.dateTime)), [
   ['2026-11-23','2026-11-24','2026-12-07','2026-12-08','2027-01-11'],
   ['2026-11-26','2026-11-27','2026-12-10','2026-12-11','2027-01-12'],
   ['2026-11-29','2026-11-30','2026-12-13','2026-12-14','2027-01-14'],
   ['2026-12-02','2026-12-03','2026-12-16','2026-12-17','2027-01-18'],
   ['2026-12-04','2026-12-05','2026-12-18','2026-12-19','2027-01-19'],
 ]);
 assert.deepEqual([...cohort.querySelectorAll('.foundation-cohort-tuition dd')].map(value=>value.textContent.replace(/[^0-9]/g,'')), ['6800','7800']);
 const registration=cohort.querySelector('.foundation-cohort-registration');
 assert.equal(registration.href,'https://forms.cloud.microsoft/r/hR8HQT3gXc?origin=lprLink');
 assert.equal(registration.target,'_blank');
 assert(registration.relList.contains('noopener'));
 assert.equal(cohort.querySelector('form'),null,'Registration uses the verified external form');
 await act(async()=>[...cohort.querySelectorAll('button')].find(button=>button.textContent==='查看学费与报名').click());
 assert.equal(document.activeElement.id,'foundation-registration-title');
 assert.equal(window.location.hash,'#foundation');
 assert(document.getElementById('foundation-backup'));
 const saved=new Map();
 for(const day of [1,2,3,4]){
   const radio=document.querySelector(`#foundation-d${day}-quiz input[type=radio]`);
   assert(radio&&!radio.disabled);
   await act(async()=>radio.click());assert(radio.checked);
   const key=`somm100.foundation.d${day}-quiz.v1`;
   saved.set(key,JSON.parse(window.localStorage.getItem(key)));
 }
 await act(async()=>root.render(null));
 await act(async()=>root.render(React.createElement(Page,{go:path=>routes.push(path)})));
 for(const [key,value] of saved)assert.deepEqual(JSON.parse(window.localStorage.getItem(key)),value);
 for(const day of [1,2,3,4])assert(document.querySelector(`#foundation-d${day}-quiz input[type=radio]`).checked);
 assert.deepEqual(diagnostics,[]);
 console.log(JSON.stringify({status:'PASS',concepts:8,originalArticleLinks:10,sectionDestinations:12,focusedDestinations:20,reducedMotion:'instant',routeCallbacks:routes,quizRecordsRestored:4,limits:'jsdom only; no browser layout/network/deployment claim'},null,2));
}finally{await act(async()=>root.unmount());console.error=originalError;dom.window.close();}
