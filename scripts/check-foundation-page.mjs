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
const {default:sourceMap}=await import('../data/foundation-source-map.json');
const {FOUNDATION_STORAGE_KEY}=await import('../lib/foundation-study.mjs');
const {FOUNDATION_BRIDGE_KEY}=await import('../lib/foundation-backup.mjs');
const diagnostics=[],routes=[];const originalError=console.error;
console.error=(...args)=>diagnostics.push(args.map(String).join(' '));
const root=createRoot(document.getElementById('root'));
try{
 window.localStorage.setItem(FOUNDATION_BRIDGE_KEY,JSON.stringify({version:1,unit:21,checks:{},answers:{}}));
 await act(async()=>root.render(React.createElement(Page,{go:path=>routes.push(path)})));
 assert.equal(document.querySelector('h1').textContent,'先理解一瓶酒，再走进课堂。');
 const chapters=[...document.querySelectorAll('.foundation-chapter')];
 assert.deepEqual(chapters.map(x=>x.id),Array.from({length:8},(_,i)=>'foundation-'+i));
 const links=chapters.flatMap(x=>[...x.querySelectorAll('a')]);
 assert.equal(links.length,10);assert(links.every(x=>new URL(x.href).hostname==='mp.weixin.qq.com'));
 assert.deepEqual(links.map(link=>[link.textContent,link.getAttribute('href'),link.nextElementSibling.textContent]),
   sourceMap.articles.map(({title,url,whyRead})=>[`${title} ↗`,url,`为什么看：${whyRead}`]));
 assert(links.every(link=>link.target==='_blank'&&link.relList.contains('noopener')));
 const study=document.querySelector('[aria-labelledby="foundation-study-title"]');
 const firstCheck=study.querySelector('input[type="checkbox"]');
 await act(async()=>firstCheck.click());
 const prepRecord=window.localStorage.getItem(FOUNDATION_STORAGE_KEY);
 assert(firstCheck.checked);
 assert(prepRecord);
 const firstConceptButton=[...study.querySelectorAll('button')].find(button=>button.textContent==='阅读｜学习葡萄酒之前');
 assert(firstConceptButton);
 await act(async()=>firstConceptButton.click());
 assert.equal(document.activeElement.id,'foundation-0');
 for(const chapter of chapters){
   const details=chapter.querySelector('details');
   assert.match(chapter.textContent,/口头自查/);
   assert(details.querySelector('p').textContent.trim());
   assert.equal(details.open,false);
   await act(async()=>details.querySelector('summary').click());
   assert.equal(details.open,true);
   await act(async()=>chapter.querySelector('button').click());
   assert.equal(document.activeElement.id,'foundation-study-title');
   assert.equal(window.location.hash,'#foundation');
   assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),prepRecord);
 }
 const directory=document.querySelector('nav[aria-labelledby="foundation-directory-title"]');
 const stageTargets=['foundation-study-title','foundation-cohort-bridge-title','foundation-assessment-title','foundation-cohort-title'];
 const topicTargets=['foundation-bridge-title','foundation-d1-title','foundation-d1-quiz-title','foundation-d2-title','foundation-d2-quiz-title','foundation-france-title','foundation-d3-title','foundation-d3-quiz-title','foundation-d4-title','foundation-d4-quiz-title','foundation-sparkling-title'];
 const topicDisclosure=directory.querySelector('details');
 const stages=[...directory.querySelectorAll(':scope > div button')];
 const topics=[...topicDisclosure.querySelectorAll('button')];
 assert.deepEqual(stages.map(button=>button.querySelector('strong').textContent),['课前预习','课间复习','考核与结课','五城班期与报名']);
 assert.equal(topicDisclosure.open,false);
 const recordsBeforeDirectory=Object.entries(window.localStorage);
 for(const [buttons,targets] of [[stages,stageTargets],[topics,topicTargets]]){
   assert.equal(buttons.length,targets.length);
   if(buttons===topics){
     await act(async()=>topicDisclosure.querySelector('summary').click());
     assert.equal(topicDisclosure.open,true);
   }
   for(const [i,button] of buttons.entries()){
     await act(async()=>button.click());
     assert.deepEqual(scrolls.at(-1),{id:targets[i],behavior:'instant',block:'start'});
     assert.equal(document.activeElement.id,targets[i]);
     assert.equal(window.location.hash,'#foundation');
   }
 }
 await act(async()=>topicDisclosure.querySelector('summary').click());
 assert.equal(topicDisclosure.open,false);
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforeDirectory);
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
 await act(async()=>[...cohort.querySelectorAll('button')].find(button=>button.textContent==='查看第22期课间复习').click());
 assert.equal(document.activeElement.id,'foundation-cohort-bridge-title');
 const assessment = document.querySelector('[aria-labelledby="foundation-course-title"]');
 const certificate=assessment.querySelector('#foundation-certificate-title');
 assert.match(certificate.nextElementSibling.textContent,/初级侍酒师证书.*见习侍酒师证书/);
 const recordsBeforePractice = Object.entries(window.localStorage);
 await act(async()=>[...cohort.querySelectorAll('button')].find(button=>button.textContent==='查看考核范围与复习索引').click());
 assert.equal(document.activeElement.id,'foundation-assessment-title');
 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='餐厅情境自练').click());
 assert.equal(document.activeElement.id,'foundation-assessment-practice-title');
 const practice = assessment.querySelector('[aria-labelledby="foundation-assessment-practice-title"]');
 const scenarios = [...practice.querySelectorAll(':scope > details')];
 assert.deepEqual(scenarios.map(scenario=>scenario.id),[
   'foundation-assessment-service-check',
   'foundation-assessment-pairing',
   'foundation-assessment-other-drinks',
 ]);
 for(const scenario of scenarios){
   const answer = scenario.querySelector('details');
   assert(!scenario.open && !answer.open);
   assert.match(scenario.textContent,/练习.*自查/s);
   await act(async()=>scenario.querySelector('summary').click());
   assert(scenario.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(scenario.open && answer.open);
 }
 assert.equal(window.location.hash,'#foundation');
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);
 const compactBridge=document.querySelector('[aria-labelledby="foundation-cohort-bridge-title"]');
 const citySelect=compactBridge.querySelector('select');
 const bridgeDay=document.getElementById('foundation-bridge-day');
 assert.equal(bridgeDay.options.length,21);
 assert.equal(bridgeDay.value,'21');
 assert.equal(compactBridge.querySelectorAll('time').length,0);
 const bridgeRecord=window.localStorage.getItem(FOUNDATION_BRIDGE_KEY);
 for(const [city,dates] of [
   ['深圳',['2026-12-04','2026-12-09','2026-12-10','2026-12-15']],
   ['北京',['2026-11-25','2026-11-30','2026-12-01','2026-12-06']],
 ]){
   await act(async()=>{
     citySelect.value=city;
     citySelect.dispatchEvent(new window.Event('change',{bubbles:true}));
   });
   assert.match(compactBridge.querySelector('[role="status"]').textContent,new RegExp(city+'｜.*12'));
   assert.deepEqual([...compactBridge.querySelectorAll('time')].map(time=>time.dateTime),dates);
   assert.equal(bridgeDay.value,'21');
 }
 const compactTargets=['foundation-d1-title','foundation-d2-title','foundation-france-title','foundation-d1-quiz-title','foundation-d2-quiz-title','foundation-d3-title','foundation-d4-title'];
 const compactButtons=[...compactBridge.querySelectorAll('button')];
 assert.equal(compactButtons.length,compactTargets.length);
 for(const [i,button] of compactButtons.entries()){
   await act(async()=>button.click());
   assert.equal(document.activeElement.id,compactTargets[i]);
 }
 assert.equal(window.location.hash,'#foundation');
 assert.equal(window.localStorage.getItem(FOUNDATION_BRIDGE_KEY),bridgeRecord);
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
 console.log(JSON.stringify({status:'PASS',concepts:8,oralChecksAndReturns:8,originalArticleLinks:10,sectionDestinations:15,focusedDestinations:25,assessmentScenarios:3,reducedMotion:'instant',routeCallbacks:routes,quizRecordsRestored:4,limits:'jsdom only; no browser layout/network/deployment claim'},null,2));
}finally{await act(async()=>root.unmount());console.error=originalError;dom.window.close();}
