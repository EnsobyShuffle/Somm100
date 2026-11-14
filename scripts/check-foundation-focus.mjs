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
 const cohort=JSON.parse(readFileSync(new URL('../data/foundation-cohort22.json',import.meta.url),'utf8'));
 const concepts=JSON.parse(readFileSync(new URL('../data/foundation-concepts.json',import.meta.url),'utf8'));
 const readingConcepts=concepts.filter(({articles})=>articles.length);
 let shortcutCount=0;
 for(const mount of ['/','/somm100/']){
   const courseHome=new JSDOM(courseHomeHtml,{url:'https://test.invalid'+mount+'course.html'});
   try{
     const home=courseHome.window.document;
     assert.equal(home.querySelector('h1').textContent,'侍酒师100课程');
     assert.equal(home.scripts.length,0);
     assert.deepEqual([...home.querySelectorAll('main h2')].map(heading=>heading.textContent),
       ['课程介绍','文章导读','学习入口']);
     const enrollment=[...home.querySelectorAll('.course-actions a')];
     assert.deepEqual(enrollment.slice(0,2).map(link=>link.href),[cohort.registrationUrl,cohort.sourceUrl]);
     assert.equal(home.querySelectorAll('.course-resources a[href^="./releases/"]').length,6);
     const preview=home.querySelector('.cohort-preview');
     assert.equal(preview.open,false);
     preview.querySelector('summary').click();
     assert.equal(preview.open,true);
     assert(preview.textContent.includes(cohort.classHours));
     const cityCards=[...preview.querySelectorAll('.cohort-cards > li')];
     assert.equal(cityCards.length,5);
     cityCards.forEach((card,index)=>{
       const city=cohort.cities[index];
       assert.equal(card.querySelector('h3').textContent,city.city);
       assert(card.querySelector('p').textContent.includes(city.instructor));
       assert(card.querySelector('p').textContent.includes(city.bio));
       const stages=[...card.querySelectorAll('dl > div')].map(stage=>
         [...stage.querySelectorAll('time')].map(time=>time.dateTime));
       assert.deepEqual(stages,city.stages);
       const calendar=card.querySelector('a.cohort-calendar-link');
       assert(calendar.hasAttribute('download'));
       assert.equal(new URL(calendar.href).pathname,`${mount}cohort-22-calendar/${city.calendarSlug}.ics`);
       assert.equal(calendar.textContent,`下载${city.city}面授日历（.ics）`);
       const review=card.querySelector('a.cohort-review-link');
       assert.equal(review.textContent,`查看${city.city}课间复习`);
       assert.equal(new URL(review.href).searchParams.get('city'),city.calendarSlug);
       assert.equal(review.hash,'#foundation-cohort-bridge-title');
     });
     const fees=[...preview.querySelectorAll('.cohort-tuition strong')].map(fee=>Number(fee.textContent.replace(/\D/g,'')));
     assert.deepEqual(fees,cohort.tuition.map(({amountCny})=>amountCny));
     const readingGroups=[...home.querySelectorAll('.reading-group')];
     assert.equal(readingGroups.length,5);
     readingGroups.forEach((group,index)=>{
       const concept=readingConcepts[index];
       const summary=group.querySelector('summary');
       assert(summary.textContent.startsWith(concept.title));
       assert.equal(group.open,false);
       summary.click();
       assert.equal(group.open,true);
       const conceptLink=group.querySelector('a.reading-concept-link');
       assert.equal(conceptLink.getAttribute('href'),`./foundation.html#${concept.id}`);
       assert.equal(conceptLink.textContent,'阅读站内概念与口头自查');
       assert.equal(conceptLink.target,'');
       const entries=[...group.querySelectorAll('li')].map(item=>({
         title:item.querySelector('strong').textContent,
         whyRead:item.querySelector('p').textContent,
         url:item.querySelector('a').getAttribute('href'),
       }));
       assert.deepEqual(entries,concept.articles);
     });
     const articleLinks=[...home.querySelectorAll('.reading-group ul a')];
     assert.equal(articleLinks.length,17);
     assert(articleLinks.every(link=>new URL(link.href).origin==='https://mp.weixin.qq.com'));
     const links=[...home.querySelectorAll('a[href^="./foundation.html#"], .cohort-review-link')];
     assert.equal(links.length,15+readingConcepts.length+cohort.cities.length);
     for (const id of ['foundation-sparkling-assessment-title', 'foundation-assessment-recommendation-title', 'foundation-assessment-team-pours-title']) {
       assert(links.some(link => link.hash === `#${id}`), `Missing course home practice link: ${id}`);
     }
     for(const link of links){
       const targetUrl=new URL(link.href);
       assert.equal(targetUrl.pathname,mount+'foundation.html');
       await act(async()=>root.render(null));
       window.history.replaceState(null,'',targetUrl);
       await act(async()=>root.render(React.createElement(Focus)));
       const id=targetUrl.hash.slice(1);
       assert.equal(document.activeElement.id,id);
       assert.equal(scrolledTo,id);
       if (id==='foundation-cohort-bridge-title') {
         const city=cohort.cities.find(item=>item.calendarSlug===targetUrl.searchParams.get('city'));
         const first=document.getElementById(id).parentElement;
         const second=document.getElementById('foundation-cohort-final-bridge-title').parentElement;
         assert.equal(first.querySelector('select').value,city?.city??'');
         assert.equal(document.getElementById('foundation-prep-city').value,city?.city??'');
         for (const [index,window] of [first,second].entries()) {
           const dates=[...window.querySelectorAll('[role="status"] time')].map(time=>time.dateTime);
           assert.deepEqual(dates,city?[city.stages[index].at(-1),city.stages[index+1][0]]:[]);
         }
       }
       if (link.classList.contains('reading-concept-link')) {
         const concept=readingConcepts.find(item=>item.id===id);
         const section=document.getElementById(id);
         assert.equal(section.querySelector('h2').textContent,concept.title);
         assert(section.textContent.includes(concept.question));
         const answer=[...section.querySelectorAll('details')].find(item=>item.querySelector('summary')?.textContent==='查看参考答案');
         assert.equal(answer.open,false);
         await act(async()=>answer.querySelector('summary').click());
         assert(answer.textContent.includes(concept.answer));
       }
       if (id==='foundation-assessment-main-list-audit-title') {
         assert(document.getElementById('foundation-assessment-team').open);
         assert(document.getElementById('foundation-assessment-main-list-audit').open);
         assert(!document.getElementById('foundation-assessment-main-list-audit-answer').open);
       }
       if (id==='foundation-assessment-team-handoff-title') {
         assert(document.getElementById('foundation-assessment-team').open);
         const handoff=document.getElementById('foundation-assessment-team-handoff');
         assert(handoff.open && !handoff.querySelector('details').open);
         assert(!document.getElementById('foundation-assessment-main-list-audit').open);
       }
       assert.deepEqual(JSON.parse(window.localStorage.getItem(key)),saved);
       shortcutCount++;
     }
   }finally{courseHome.window.close();}
 }
 await act(async()=>root.render(null));
 window.history.replaceState(null,'','?city=unknown#foundation-cohort-bridge-title');
 await act(async()=>root.render(React.createElement(Focus)));
 assert.equal(document.getElementById('foundation-prep-city').value,'');
 assert.equal(document.activeElement.id,'foundation-cohort-bridge-title');
 await act(async()=>root.render(null));
 await act(async()=>root.render(React.createElement(Page,{go:()=>{}})));
 assert(document.querySelector('#foundation-d1-quiz input[type=radio]').checked);
 assert.deepEqual(JSON.parse(window.localStorage.getItem(key)),saved);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({status:'PASS',sameOriginRecordRoundTrip:true,brandPreserved:true,fullAppLink:true,courseHomeScriptFree:true,cohortCities:5,cohortDates:25,calendars:5,articleGuides:17,shortcutsChecked:shortcutCount,scope:'React/jsdom only; no real cross-page navigation or phone test'},null,2));
}finally{await act(async()=>root.unmount());console.error=oldError;dom.window.close();}
