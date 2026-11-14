// Full extracted page integration, using real React and disposable jsdom storage.
import assert from 'node:assert/strict';
import {mock} from 'node:test';
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
const {default:studyData}=await import('../data/foundation-study.json');
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
 assert.equal(links.length,17);
 assert(links.every(link=>new URL(link.href).origin==='https://mp.weixin.qq.com'));
 assert.deepEqual(links.map(link=>[link.textContent,link.getAttribute('href'),link.nextElementSibling.textContent]),
   sourceMap.articles.map(({title,url,whyRead})=>[`${title} ↗`,url,`为什么看：${whyRead}`]));
 assert(links.every(link=>link.target==='_blank'&&link.relList.contains('noopener')));
 const study=document.querySelector('[aria-labelledby="foundation-study-title"]');
 const firstCheck=study.querySelector('input[type="checkbox"]');
 await act(async()=>firstCheck.click());
 const prepRecord=window.localStorage.getItem(FOUNDATION_STORAGE_KEY);
 assert(firstCheck.checked);
 assert(prepRecord);
 const grapeCards=[...document.querySelectorAll('#foundation-5 section[aria-labelledby="foundation-grape-cards-title"] details')];
 assert.deepEqual(grapeCards.map(card=>card.id),
   ['chardonnay','sauvignon-blanc','riesling','pinot-noir','cabernet-sauvignon','syrah'].map(id=>'foundation-grape-'+id));
 for (const card of grapeCards) {
   assert(!card.open);
   await act(async()=>card.querySelector('summary').click());
   assert(card.open);
   assert.deepEqual([...card.querySelectorAll('dt')].map(term=>term.textContent),
     ['结构','气候与成熟度','酿造选择','经典产区']);
   assert([...card.querySelectorAll('dd')].every(value=>value.textContent.trim()));
   assert.match(card.querySelector('p').textContent,/口头自查/);
 }
 assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),prepRecord);
 const labelPractice=document.querySelector('#foundation-7 section[aria-labelledby="foundation-precourse-label-title"]');
 const labelCases=[...labelPractice.querySelectorAll(':scope > details')];
 assert.deepEqual(labelCases.map(item=>item.id),[
   'foundation-label-vintage-check','foundation-label-bottler-check','foundation-label-region-check',
 ]);
 for (const item of labelCases) {
   const answer=item.querySelector('details');
   assert(!item.open && !answer.open);
   assert.equal(item.querySelectorAll('dt').length,2);
   await act(async()=>item.querySelector('summary').click());
   assert(item.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
   assert.match(answer.querySelector('p').textContent,/核实|待查/);
 }
 assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),prepRecord);
 const styleChapter=document.getElementById('foundation-4');
 const styleLink=[...styleChapter.querySelectorAll('a')].find(link=>link.textContent.includes('为什么学习品酒'));
 assert.deepEqual([...new URL(styleLink.href).searchParams.keys()],['__biz','mid','idx','sn']);
 const stylePractice=styleChapter.querySelector('[aria-labelledby="foundation-precourse-style-title"]');
 const styleCases=[...stylePractice.querySelectorAll(':scope > details')];
 assert.deepEqual(styleCases.map(item=>item.id),[
   'foundation-style-fruit-sweetness','foundation-style-acidity-tannin','foundation-style-body-alcohol',
 ]);
 for (const [index,item] of styleCases.entries()) {
   const answer=item.querySelector('details');
   assert(!item.open && !answer.open);
   await act(async()=>item.querySelector('summary').click());
   assert(item.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
   assert.match(answer.querySelector('p').textContent,[/香气栏.*甜度栏/,/酸度.*单宁/,/13% vol\..*轻盈.*较饱满/][index]);
 }
 assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),prepRecord);
 const placePractice=document.querySelector('#foundation-6 [aria-labelledby="foundation-precourse-place-title"]');
 const placeCases=[...placePractice.querySelectorAll(':scope > details')];
 assert.deepEqual(placeCases.map(item=>item.id),[
   'foundation-place-scale','foundation-place-climate','foundation-place-label-conventions',
 ]);
 for (const [index,item] of placeCases.entries()) {
   const answer=item.querySelector('details');
   assert(!item.open && !answer.open);
   await act(async()=>item.querySelector('summary').click());
   assert(item.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
   assert.match(answer.querySelector('p').textContent,[/法国.*卢瓦尔河谷.*桑塞尔/,/降雨.*高温和水分/,/地名.*霞多丽/][index]);
 }
 assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),prepRecord);
 const evidenceGroups=[...document.querySelectorAll('#foundation-2-evidence-practice, #foundation-3-evidence-practice')];
 assert.deepEqual(evidenceGroups.map(group=>group.closest('.foundation-chapter').id),['foundation-2','foundation-3']);
 const evidenceCases=evidenceGroups.flatMap(group=>[...group.parentElement.querySelectorAll(':scope > details')]);
 assert.deepEqual(evidenceCases.map(item=>item.id),[
   'foundation-vineyard-drainage','foundation-vineyard-canopy',
   'foundation-winemaking-fermentation-evidence','foundation-winemaking-vessel-evidence',
 ]);
 const evidencePatterns=[/排水.*成熟/,/光照.*通风.*遮阴/,/糖.*酒精/,/桶的新旧.*接触时间/];
 for (const [index,item] of evidenceCases.entries()) {
   const answer=item.querySelector('details');
   assert(!item.open && !answer.open);
   await act(async()=>item.querySelector('summary').click());
   assert(item.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
   assert.match(answer.querySelector('p').textContent,evidencePatterns[index]);
 }
 assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),prepRecord);
 const [paceSelect,weekSelect]=study.querySelectorAll(':scope > .foundation-study-controls > label select');
 const chooseStudyOption=async (select,value)=>await act(async()=>{
   select.value=String(value);
   select.dispatchEvent(new window.Event('change',{bubbles:true}));
 });
 let practiceShortcuts=0;
 for (const pace of [8,4]) {
   await chooseStudyOption(paceSelect,pace);
   for (const [week,amount] of [[3,2],[4,1],[5,4],[7,6]]) {
     await chooseStudyOption(weekSelect,pace===4?Math.ceil(week/2):week);
     const shortcuts=[...document.querySelectorAll(`#foundation-week-${week} .foundation-week-practice button`)];
     assert.equal(shortcuts.length,amount);
     const saved=window.localStorage.getItem(FOUNDATION_STORAGE_KEY);
     for (const shortcut of shortcuts) {
       const id=shortcut.getAttribute('aria-controls');
       const item=document.getElementById(id);
       const answer=item.querySelector('details');
       await act(async()=>{item.open=false;answer.open=false;});
       await act(async()=>shortcut.click());
       assert(item.open && !answer.open);
       assert.equal(document.activeElement.id,`${id}-title`);
       assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),saved);
       await act(async()=>answer.querySelector('summary').click());
       const back=[...item.querySelectorAll('button')].find(button=>button.textContent==='返回本周练习入口');
       assert(back);
       assert.equal([...document.querySelectorAll('button')].filter(button=>button.textContent==='返回本周练习入口').length,1);
       await act(async()=>back.click());
       assert.equal(document.activeElement,shortcut);
       assert.equal(shortcut.tabIndex,0);
       assert(item.open && answer.open);
       assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),saved);
       practiceShortcuts++;
     }
   }
 }
 assert.equal(practiceShortcuts,26);
 let readingRoundTrips=0;
 for (const pace of [8,4]) {
   await chooseStudyOption(paceSelect,pace);
   for (const week of studyData.weeks) {
     await chooseStudyOption(weekSelect,pace===4?Math.ceil(week.number/2):week.number);
     const saved=window.localStorage.getItem(FOUNDATION_STORAGE_KEY);
     for (const conceptId of week.concepts) {
       const start=document.getElementById(`${week.id}-read-${conceptId}`);
       await act(async()=>start.click());
       assert.equal(document.activeElement.id,conceptId);
       const back=[...document.getElementById(conceptId).querySelectorAll('button')]
         .find(button=>button.textContent==='返回本周阅读入口');
       assert(back);
       await act(async()=>back.click());
       assert.equal(document.activeElement,start);
       assert.equal(start.tabIndex,0);
       assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),saved);
       readingRoundTrips++;
     }
   }
 }
 assert.equal(readingRoundTrips,2*studyData.weeks.reduce((total,week)=>total+week.concepts.length,0));
 await chooseStudyOption(paceSelect,8);
 await chooseStudyOption(weekSelect,1);
 assert(![...document.querySelectorAll('button')].some(button=>button.textContent==='返回本周练习入口'));
 const genericBack=[...document.getElementById('foundation-6').querySelectorAll('button')]
   .find(button=>button.textContent==='回到本周预习');
 assert(genericBack);
 await act(async()=>genericBack.click());
 assert.equal(document.activeElement.id,'foundation-study-title');
 assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),prepRecord);
 const cityPrep=document.querySelector('[aria-labelledby="foundation-prep-city-title"]');
 const prepCity=cityPrep.querySelector('select');
 const selectPrepCity=async value=>await act(async()=>{
   prepCity.value=value;
   prepCity.dispatchEvent(new window.Event('change',{bubbles:true}));
 });
 const beforeCityPrep=Object.entries(window.localStorage);
 mock.timers.enable({apis:['Date'],now:new Date('2026-11-09T16:30:00Z')});
 try {
   assert.deepEqual([...prepCity.options].map(option=>option.value),['','北京','上海','成都','深圳','广州']);
   for(const [city,date,days] of [
     ['北京','2026-11-23',13], ['上海','2026-11-26',16], ['成都','2026-11-29',19],
     ['深圳','2026-12-02',22], ['广州','2026-12-04',24],
   ]){
     await selectPrepCity(city);
     assert.equal(cityPrep.querySelector('time').dateTime,date);
     assert.match(cityPrep.querySelector('[role="status"]').textContent,new RegExp('距开课 '+days+' 天'));
   }
   for(const [index,button] of [...cityPrep.querySelectorAll('button')].entries()){
     await act(async()=>button.click());
     assert.equal(document.activeElement.id,'foundation-'+[1,4,7][index]);
     assert.equal(window.location.hash,'#foundation');
   }
   assert.equal(cityPrep.querySelectorAll('button').length,3);
   const quickChecks=[...cityPrep.querySelectorAll('details')];
   assert.deepEqual(quickChecks.map(check=>check.id),[
     'foundation-prep-quick-process','foundation-prep-quick-style','foundation-prep-quick-label',
   ]);
   for(const [index,check] of quickChecks.entries()){
     assert.equal(check.open,false);
     await act(async()=>check.querySelector('summary').click());
     assert.equal(check.open,true);
     assert.match(check.querySelector('p').textContent,[/在藤上.*采收.*装瓶/,/香气栏.*酸度栏.*酒体栏.*甜度暂留空/,/2022.*13% vol\..*背标/][index]);
   }
   mock.timers.setTime(Date.parse('2026-10-22T00:00:00Z'));
   await selectPrepCity('深圳');
   assert.match(cityPrep.textContent,/4 周节奏/);
   assert.equal(cityPrep.querySelectorAll('details').length,0);
   mock.timers.setTime(Date.parse('2026-09-20T00:00:00Z'));
   await selectPrepCity('北京');
   assert.match(cityPrep.textContent,/8 周节奏/);
   mock.timers.setTime(Date.parse('2026-12-02T00:00:00Z'));
   await selectPrepCity('深圳');
   assert.match(cityPrep.textContent,/今天开课/);
   assert.equal(cityPrep.querySelectorAll('details').length,3);
   mock.timers.setTime(Date.parse('2026-12-05T00:00:00Z'));
   await selectPrepCity('广州');
   assert.match(cityPrep.textContent,/首日面授已过/);
   assert.equal(cityPrep.querySelectorAll('details').length,0);
   await act(async()=>cityPrep.querySelector('button').click());
   assert.equal(document.activeElement.id,'foundation-cohort-bridge-title');
   const selectedBridge=document.querySelector('[aria-labelledby="foundation-cohort-bridge-title"]');
   assert.equal(selectedBridge.querySelector('select').value,'广州');
   assert.match(selectedBridge.querySelector('[role="status"]').textContent,/广州｜.*12 个完整日历日/);
   for (const [now, message, target] of [
     ['2026-12-19T15:59:00Z', /首日面授已过/, 'foundation-cohort-bridge-title'],
     ['2026-12-19T16:00:00Z', /第二阶段的面授日期已过/, 'foundation-cohort-final-bridge-title'],
     ['2027-01-19T15:59:00Z', /今天是本城最后一次面授/, 'foundation-cohort-final-bridge-title'],
     ['2027-01-19T16:00:00Z', /公布的面授日期已过/, 'foundation-assessment-title'],
   ]) {
     mock.timers.setTime(Date.parse(now));
     await selectPrepCity('');
     await selectPrepCity('广州');
     assert.match(cityPrep.querySelector('[role="status"]').textContent,message);
     assert.equal(cityPrep.querySelectorAll('details').length,0);
     await act(async()=>cityPrep.querySelector('button').click());
     assert.equal(document.activeElement.id,target);
     assert.equal(selectedBridge.querySelector('select').value,'广州');
   }
   await selectPrepCity('');
   assert.equal(cityPrep.querySelector('time'),null);
   assert.deepEqual(Object.entries(window.localStorage),beforeCityPrep);
 } finally {mock.timers.reset();}
 const firstConceptButton=[...study.querySelectorAll('button')].find(button=>button.textContent==='阅读｜学习葡萄酒之前');
 assert(firstConceptButton);
 await act(async()=>firstConceptButton.click());
 assert.equal(document.activeElement.id,'foundation-0');
 for(const chapter of chapters){
   const details=chapter.querySelector(':scope > details');
   assert.match(chapter.textContent,/口头自查/);
   assert(details.querySelector('p').textContent.trim());
   assert.equal(details.open,false);
   await act(async()=>details.querySelector('summary').click());
   assert.equal(details.open,true);
   await act(async()=>chapter.querySelector('button').click());
   assert.equal(document.activeElement.id,chapter.id==='foundation-0'?firstConceptButton.id:'foundation-study-title');
   assert.equal(window.location.hash,'#foundation');
   assert.equal(window.localStorage.getItem(FOUNDATION_STORAGE_KEY),prepRecord);
 }
 const readiness=study.querySelector('#foundation-readiness-overview');
 const groups=[...readiness.querySelectorAll('ol > li')];
 assert.equal(groups.length,8);
 assert(!readiness.open);
 await act(async()=>readiness.querySelector('summary').click());
 assert(readiness.open);
 const reviewList=readiness.querySelector('#foundation-readiness-review');
 assert.match(reviewList.querySelector('summary').textContent,/0 道/);
 assert.deepEqual(groups.map(group=>group.querySelector('p').textContent),
   [3,3,3,3,3,6,4,6].map(count=>count+' 题未答'));
 const setStudyPace=async pace=>await act(async()=>{
   const select=study.querySelector(':scope > .foundation-study-controls select');
   select.value=String(pace);
   select.dispatchEvent(new window.Event('change',{bubbles:true}));
 });
 async function openReadinessGroup(number) {
   await act(async()=>groups[number-1].querySelector('button').click());
   const quiz=study.querySelector(`#foundation-week-${number}-questions`);
   assert(quiz.open);
   assert.equal(document.activeElement.id,quiz.id+'-title');
   return quiz;
 }
 await openReadinessGroup(8);
 assert.equal(JSON.parse(window.localStorage.getItem(FOUNDATION_STORAGE_KEY)).period,8);
 const first=studyData.questions.find(q=>q.week===8);
 const wrong=(first.answer+1)%first.options.length;
 await act(async()=>study.querySelector(`input[name="${first.id}"][value="${wrong}"]`).click());
 assert.match(reviewList.querySelector('summary').textContent,/1 道/);
 await openReadinessGroup(1);
 await act(async()=>reviewList.querySelector('summary').click());
 const openReviewQuestion=async()=>{
   await act(async()=>reviewList.querySelector('button').click());
   assert.equal(document.activeElement.id,first.id);
   assert(document.activeElement.closest('details').open);
 };
 await openReviewQuestion();
 assert.equal(JSON.parse(window.localStorage.getItem(FOUNDATION_STORAGE_KEY)).period,8);
 await openReadinessGroup(1);
 await setStudyPace(4);
 await openReviewQuestion();
 const quiz=study.querySelector('#foundation-week-8-questions');
 assert.equal(JSON.parse(window.localStorage.getItem(FOUNDATION_STORAGE_KEY)).period,4);
 assert(study.querySelector('#foundation-week-7'));
 await openReadinessGroup(7); // Same compact period must still open and focus the selected group.
 await openReviewQuestion(); // Same compact period can focus an individual question too.
 const lastGroup=studyData.questions.filter(q=>q.week===8);
 const choose=async(q,choice)=>await act(async()=>quiz.querySelector(`input[name="${q.id}"][value="${choice}"]`).click());
 assert.equal(groups[7].querySelector('p').textContent,'5 题未答，1 题建议再看');
 for(const q of lastGroup) await choose(q,q.answer);
 assert.match(reviewList.querySelector('summary').textContent,/0 道/);
 assert.equal(reviewList.querySelectorAll('button').length,0);
 assert.equal(groups[7].querySelector('p').textContent,'本组已准备好');
 await act(async()=>[...quiz.querySelectorAll('button')].find(button=>button.textContent==='回到准备度总览').click());
 assert.equal(document.activeElement.id,'foundation-readiness-overview-title');
 const record=JSON.parse(window.localStorage.getItem(FOUNDATION_STORAGE_KEY));
 assert.deepEqual(record.answers[first.id],{first:wrong,latest:first.answer});
 assert.deepEqual(record.checks,JSON.parse(prepRecord).checks);
 assert.equal(window.location.hash,'#foundation');

 const getStudyProgress=()=>JSON.parse(window.localStorage.getItem(FOUNDATION_STORAGE_KEY));
 const returnLabel='回到刚才的准备度题';
 let readinessReviewRoundTrips=0;
 let readinessPracticeRoundTrips=0;
 for (const pace of [4,8]) {
   await setStudyPace(pace);
   for (const q of studyData.questions) {
     const group=await openReadinessGroup(q.week);
     const fieldset=group.querySelector(`#${q.id}`);
     const wrongChoice=(q.answer+1)%q.options.length;
     await act(async()=>fieldset.querySelector(`input[value="${wrongChoice}"]`).click());
     const practice=[...fieldset.querySelectorAll('button')].find(button=>button.textContent==='做一道相关案例');
     assert.equal(Boolean(practice),Boolean(q.reviewPracticeId));
     if (practice) {
       const exercise=document.getElementById(q.reviewPracticeId);
       const answer=exercise.querySelector('details');
       const beforePractice=getStudyProgress();
       await act(async()=>{exercise.open=false;answer.open=false;});
       await act(async()=>practice.click());
       assert.equal(document.activeElement.id,`${q.reviewPracticeId}-title`);
       assert(exercise.open && !answer.open);
       const back=[...exercise.querySelectorAll('button')].find(button=>button.textContent===returnLabel);
       assert(back);
       await openReadinessGroup(q.week===1?8:1);
       await act(async()=>back.click());
       assert.equal(document.activeElement.id,q.id);
       assert(document.activeElement.closest('details').open);
       assert.deepEqual(getStudyProgress(),beforePractice);
       readinessPracticeRoundTrips++;
     }
     const currentFieldset=document.getElementById(q.id);
     const review=Array.from(currentFieldset.querySelectorAll('button')).find(button=>
       q.reviewConceptId ? button.textContent.startsWith('回看概念｜') : button.textContent==='返回本周知识提要');
     assert(review);
     const reviewId=q.reviewConceptId ?? `foundation-week-${q.week}-digest`;
     const before=getStudyProgress();
     await act(async()=>review.click());
     assert.equal(document.activeElement.id,reviewId);
     assert.deepEqual(getStudyProgress(),before);
     const destination=document.getElementById(reviewId);
     const scope=q.reviewConceptId ? destination : destination.closest('article');
     const back=Array.from(scope.querySelectorAll('button')).find(button=>button.textContent===returnLabel);
     assert(back);
     if (pace===4 && q.week===7 && q===studyData.questions.find(question=>question.week===7)) {
       await openReadinessGroup(1);
       await setStudyPace(8);
     }
     await act(async()=>back.click());
     assert.equal(document.activeElement.id,q.id);
     assert(document.activeElement.closest('details').open);
     assert.equal(scrolls.at(-1).id,q.id);
     assert.deepEqual(getStudyProgress().answers,before.answers);
     assert.deepEqual(getStudyProgress().checks,before.checks);
     await act(async()=>document.activeElement.querySelector(`input[value="${q.answer}"]`).click());
     assert.deepEqual(getStudyProgress().answers[q.id],{first:before.answers[q.id].first,latest:q.answer});
     assert.equal(window.location.hash,'#foundation');
     if (getStudyProgress().pace!==pace) await setStudyPace(pace);
     readinessReviewRoundTrips++;
   }
 }
 assert.equal(readinessReviewRoundTrips,62);
 assert.equal(readinessPracticeRoundTrips,8);
 assert.equal(studyData.questions.filter(q=>q.reviewConceptId).length,25);
 assert.match(reviewList.querySelector('summary').textContent,/0 道/);

 const directory=document.querySelector('nav[aria-labelledby="foundation-directory-title"]');
 const stageTargets=['foundation-study-title','foundation-cohort-bridge-title','foundation-assessment-title','foundation-cohort-title'];
 const topicTargets=['d1','d2','d3','d4'].flatMap(day=>
   ['title','quiz-title','recap-title'].map(suffix=>`foundation-${day}-${suffix}`));
 topicTargets.push('foundation-bridge-title','foundation-france-title','foundation-sparkling-title');
 const topicDisclosure=directory.querySelector('details');
 const stages=[...directory.querySelectorAll(':scope > div button')];
 const topics=[...topicDisclosure.querySelectorAll('button:not(.foundation-directory-resume)')];
 assert.deepEqual(stages.map(button=>button.querySelector('strong').textContent),['课前预习','课间复习','考核与结课','五城班期与报名']);
 assert.equal(topicDisclosure.open,false);
 const topicCards=[...topicDisclosure.querySelectorAll('.foundation-directory-topic')];
 assert.equal(topicCards.length,4);
 for(const card of topicCards){
   assert.deepEqual([...card.querySelectorAll('.foundation-directory-actions button')].map(button=>button.textContent),['提要','自测','案例']);
   const recapId=card.querySelector('button[aria-controls]').getAttribute('aria-controls');
   assert.equal(document.getElementById(recapId).open,false);
 }
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
     const recapId=button.getAttribute('aria-controls');
     if(recapId)assert.equal(document.getElementById(recapId).open,true);
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
 for(const label of ['← 选择课程','服务情境练习','葡萄酒练习','课程口头自练']){
   const button=[...document.querySelectorAll('button')].find(b=>b.textContent===label);
   assert(button);await act(async()=>button.click());
 }
 assert.deepEqual(routes,['courses','service','practice','foundation-recall']);
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
 for(const city of cities){
   const stages=[...city.querySelectorAll('.foundation-cohort-days')];
   assert.deepEqual(stages.map(stage=>stage.children.length),[2,2,1]);
   assert.deepEqual(stages.flatMap(stage=>[...stage.children].map(day=>day.firstChild.textContent)),
     ['第 1 天','第 2 天','第 3 天','第 4 天','第 5 天']);
 }
 const payment=cohort.querySelector('#foundation-cohort-payment');
 assert.match(payment.textContent,/报名时先付.*3,000.*余款须在考试日前结清.*游学在结清费用后安排/);
 assert.match(payment.nextElementSibling.textContent,/收款渠道和退款安排请向课程方确认/);
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
 const sparklingAssessment=assessment.querySelector('[aria-labelledby="foundation-sparkling-assessment-title"]');
 const sparklingSteps=[...sparklingAssessment.querySelectorAll('ol > li')];
 assert.deepEqual(sparklingSteps.map(step=>step.querySelector('h5').textContent.split('｜')[0]),['盲品','笔试','口试']);
 const sparklingRecord=sparklingAssessment.querySelector('#foundation-sparkling-assessment-written-record');
 const sparklingWritten=sparklingAssessment.querySelector('#foundation-sparkling-assessment-written');
 assert(!sparklingRecord.open && !sparklingWritten.open);
 await act(async()=>sparklingRecord.querySelector('summary').click());
 assert(sparklingRecord.open && !sparklingWritten.open);
 assert.match(sparklingRecord.textContent,/装瓶后.*耐压罐/);
 for(const [step,name] of sparklingSteps.map((step,index)=>[step,['blind','written','oral'][index]])){
   const answer=step.querySelector(`#foundation-sparkling-assessment-${name}`);
   assert(!answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
 }
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);
 const fieldTrip=cohort.querySelector('[aria-labelledby="foundation-cohort-field-trip-title"]');
 const fieldTripButton=[...cohort.querySelectorAll('button')].find(button=>button.textContent==='查看产区游学');
 await act(async()=>fieldTripButton.click());
 assert.equal(document.activeElement.id,'foundation-cohort-field-trip-title');
 assert.deepEqual([...fieldTrip.querySelectorAll('time')].map(el=>el.dateTime),['2027-03-14','2027-03-17']);
 assert.match(fieldTrip.textContent,/三晚住宿和餐饮.*自理往返交通费用/);
 const fieldReview=fieldTrip.querySelector('details');
 assert.equal(fieldReview.open,false);
 await act(async()=>fieldReview.querySelector('summary').click());
 assert(fieldReview.open);
 assert.equal(fieldReview.querySelectorAll('ol > li').length,3);
 const tripExample=fieldReview.querySelector('#foundation-field-trip-worked-example');
 assert(!tripExample.open);
 await act(async()=>tripExample.querySelector('summary').click());
 assert(tripExample.open && fieldReview.open);
 assert.deepEqual([...tripExample.querySelectorAll('dt')].map(term=>term.textContent),
   ['葡萄园证据','酒窖证据','杯中观察']);
 assert.match(tripExample.textContent,/确认是否使用甲地葡萄/);
 assert.match(tripExample.textContent,/熟成容器仍待查/);
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);

 const team=assessment.querySelector('#foundation-assessment-team');
 const audit=team.querySelector('#foundation-assessment-team-audit');
 const auditAnswer=audit.querySelector('details');
 assert(!team.open && !auditAnswer.open);
 const teamLink=assessment.querySelector('button[aria-controls="foundation-assessment-team"]');
 assert(teamLink);
 await act(async()=>teamLink.click());
 assert.equal(document.activeElement.id,'foundation-assessment-team-title');
 assert(team.open && !auditAnswer.open);
 assert.equal(audit.querySelectorAll(':scope > ul > li').length,4);
 await act(async()=>auditAnswer.querySelector('summary').click());
 assert(auditAnswer.open);
 assert.equal(auditAnswer.querySelectorAll('li').length,3);
 assert.match(auditAnswer.textContent,/9 款已确认可售/);
 assert.match(auditAnswer.textContent,/主酒单另做一轮核对/);
 const mainList=team.querySelector('#foundation-assessment-main-list-audit');
 const mainListAnswer=mainList.querySelector('details');
 assert(!mainList.open && !mainListAnswer.open);
 await act(async()=>mainList.querySelector('summary').click());
 assert(mainList.open && !mainListAnswer.open);
 assert.equal(mainList.querySelectorAll('ul > li').length,4);
 await act(async()=>mainListAnswer.querySelector('summary').click());
 assert(mainListAnswer.open && auditAnswer.open);
 assert.match(mainListAnswer.textContent,/共 37 款.*仍需补足三款/s);
 const handoff=team.querySelector('#foundation-assessment-team-handoff');
 const handoffAnswer=handoff.querySelector('details');
 assert(!handoff.open && !handoffAnswer.open);
 await act(async()=>handoff.querySelector('summary').click());
 assert(handoff.open && !handoffAnswer.open);
 await act(async()=>handoffAnswer.querySelector('summary').click());
 assert(handoffAnswer.open && mainListAnswer.open && auditAnswer.open);
 assert.match(handoffAnswer.textContent,/合并去重后为 49 款/);
 assert.match(handoffAnswer.textContent,/提交规则待确认/);
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);

 const pours=assessment.querySelector('[aria-labelledby="foundation-assessment-team-pours-title"]');
 const pourCases=[...pours.querySelectorAll(':scope > details')];
 assert.equal(pourCases.length,2);
 for(const [index,item] of pourCases.entries()){
   const answer=item.querySelector('details');
   assert(!item.open && !answer.open);
   await act(async()=>item.querySelector('summary').click());
   assert(item.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
   assert.match(answer.textContent,[/1,000 毫升，还可接 8 杯/,/还可接 2 杯.*请客人确认/][index]);
 }
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);

 await act(async()=>[...cohort.querySelectorAll('button')].find(button=>button.textContent==='查看考核范围与复习索引').click());
 assert.equal(document.activeElement.id,'foundation-assessment-title');
 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='笔试案例自练').click());
 assert.equal(document.activeElement.id,'foundation-assessment-written-title');
 const written=assessment.querySelector('[aria-labelledby="foundation-assessment-written-title"]');
 assert.equal(written.querySelectorAll(':scope > dl dt').length,2);
 assert.equal(written.querySelectorAll(':scope > ol > li').length,3);
 const writtenAnswer=written.querySelector('details');
 assert(!writtenAnswer.open);
 await act(async()=>writtenAnswer.querySelector('summary').click());
 assert(writtenAnswer.open);
 assert.equal(writtenAnswer.querySelectorAll('li').length,3);
 assert.match(writtenAnswer.textContent,/残糖相同，均为 2 克／升/);
 const writtenCases = [
   ['foundation-written-chardonnay', 'foundation-d2-02'],
   ['foundation-written-santorini-tokaj', 'foundation-d3-13'],
   ['foundation-written-fortification', 'foundation-d4-05'],
 ];
 for (const [id] of writtenCases) {
   const exercise = written.querySelector(`#${id}`);
   const answer = exercise.querySelector('details');
   assert(!exercise.open && !answer.open);
   assert.equal(exercise.querySelectorAll('dt').length, 2);
   assert.equal(exercise.querySelectorAll(':scope > ol > li').length, 3);
   await act(async () => exercise.querySelector('summary').click());
   assert(exercise.open && !answer.open);
   await act(async () => answer.querySelector('summary').click());
   assert(answer.open);
   assert.equal(answer.querySelectorAll('li').length, 3);
 }
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);
 const blind=assessment.querySelector('#foundation-assessment-blind');
 const oakRecord=blind.querySelector('#foundation-assessment-blind-oak-record');
 const oakAnswer=blind.querySelector('#foundation-assessment-blind-oak-answer');
 assert(!blind.open && !oakRecord.open && !oakAnswer.open);
 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='盲品证据复盘').click());
 assert(blind.open && !oakRecord.open && !oakAnswer.open);
 assert.equal(document.activeElement.id,'foundation-assessment-blind-title');
 await act(async()=>oakRecord.querySelector('summary').click());
 assert(oakRecord.open && !oakAnswer.open);
 await act(async()=>oakAnswer.querySelector('summary').click());
 assert(oakAnswer.open);
 assert.match(oakAnswer.textContent,/30%.*橡木片.*对应批次/);
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);
 const oral=assessment.querySelector('#foundation-assessment-oral');
 assert(!oral.open);
 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='口试证据练习').click());
 assert(oral.open);
 assert.equal(document.activeElement.id,'foundation-assessment-oral-title');
 for(const [id,evidence] of [['alcohol',/标示酒精度.*成酒残糖/],['variety',/白诗南.*干甜目前未知/]]){
   const card=oral.querySelector(`#foundation-oral-${id}`);
   const answer=card.querySelector('details');
   assert(!card.open && !answer.open);
   await act(async()=>card.querySelector('summary').click());
   assert(card.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
   assert.match(answer.textContent,evidence);
 }
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);
 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='餐厅情境自练').click());
 assert.equal(document.activeElement.id,'foundation-assessment-practice-title');
 const practice = assessment.querySelector('[aria-labelledby="foundation-assessment-practice-title"]');
 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='服务实操自练').click());
 assert.equal(document.activeElement.id,'foundation-assessment-service-roleplay-title');
 const service=practice.querySelector('[aria-labelledby="foundation-assessment-service-roleplay-title"]');
 assert.equal(service.querySelectorAll(':scope > details').length,2);
 for(const [id,outcome] of [['glass',/客人确认后再倒酒/],['bottle',/保留原瓶供复核/]]){
   const scenario=service.querySelector(`#foundation-service-${id}-check`);
   const answer=scenario.querySelector('details');
   assert(!scenario.open && !answer.open);
   await act(async()=>scenario.querySelector('summary').click());
   assert(scenario.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
   assert.match(answer.textContent,outcome);
 }
 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='点单变更自练').click());
 assert.equal(document.activeElement.id,'foundation-assessment-recommendation-title');
 const recommendation=practice.querySelector('[aria-labelledby="foundation-assessment-recommendation-title"]');
 assert.equal(recommendation.querySelectorAll(':scope > details').length,2);
 for(const [id,outcome] of [['budget',/每杯 ¥58.*共 ¥116.*确认/],['order-change',/核对气泡水价格.*7 号桌.*一杯甲款干白和一份气泡水.*点单记录已更新/]]){
   const scenario=recommendation.querySelector(`#foundation-recommendation-${id}`);
   const answer=scenario.querySelector(`#foundation-recommendation-${id}-answer`);
   assert(!scenario.open && !answer.open);
   await act(async()=>scenario.querySelector('summary').click());
   assert(scenario.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
   assert.match(answer.textContent,outcome);
 }
 assert.deepEqual(Object.entries(window.localStorage),recordsBeforePractice);
 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='四类酒水辨析').click());
 assert.equal(document.activeElement.id,'foundation-assessment-drink-comparison-title');
 const comparison=practice.querySelector('[aria-labelledby="foundation-assessment-drink-comparison-title"]');
 assert.match(comparison.textContent,/虚构/);
 assert.deepEqual([...comparison.querySelectorAll('article h5')].map(el=>el.textContent),
   ['A｜威士忌','B｜橙味利口酒','C｜日本清酒','D｜白酒']);
 assert.equal(comparison.querySelectorAll(':scope > ol > li').length,3);
 const comparisonAnswer=comparison.querySelector('details');
 assert.equal(comparisonAnswer.open,false);
 await act(async()=>comparisonAnswer.querySelector('summary').click());
 assert.equal(comparisonAnswer.open,true);
 assert.equal(comparisonAnswer.querySelectorAll('li').length,3);
 assert.match(comparisonAnswer.textContent,/52% vol\./);
 assert.match(comparisonAnswer.textContent,/厂商资料/);

 await act(async()=>[...assessment.querySelectorAll('button')].find(button=>button.textContent==='餐酒搭配对照练习').click());
 assert.equal(document.activeElement.id,'foundation-assessment-pairing-title');
 const pairing = practice.querySelector('[aria-labelledby="foundation-assessment-pairing-title"]');
 assert.equal(pairing.querySelectorAll('article').length,2);
 for(const [id,evidence] of [['mushroom',/涩感/],['dessert',/果味/]]){
   const observation = pairing.querySelector(`#foundation-pairing-${id}-observation`);
   const answer = pairing.querySelector(`#foundation-pairing-${id}-answer`);
   assert.match(observation.textContent,evidence);
   assert(!observation.open && !answer.open);
   await act(async()=>observation.querySelector('summary').click());
   assert(observation.open && !answer.open);
   await act(async()=>answer.querySelector('summary').click());
   assert(answer.open);
 }

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
 const finalBridge=document.querySelector('[aria-labelledby="foundation-cohort-final-bridge-title"]');
 const citySelect=compactBridge.querySelector('select');
 const bridgeDay=document.getElementById('foundation-bridge-day');
 const finalClassPrep=finalBridge.querySelector('#foundation-final-class-prep');
 assert.equal(finalClassPrep.querySelector('summary').id,'foundation-final-class-prep-title');
 assert(!finalClassPrep.open);
 assert.equal(finalClassPrep.querySelectorAll('ol > li').length,3);
 assert.match(finalClassPrep.textContent,/自选复盘.*考核时间.*课程方通知/s);
 assert.equal(bridgeDay.options.length,21);
 assert.equal(bridgeDay.value,'21');
 assert.equal(compactBridge.querySelectorAll('time').length,0);
 assert.equal(finalBridge.querySelectorAll('time').length,0);
 const bridgeRecord=window.localStorage.getItem(FOUNDATION_BRIDGE_KEY);
 assert.match(compactBridge.textContent,/约两周复习与预习/);
 assert.match(bridgeDay.closest('section').textContent,/21 天自选学习资源/);
 const datesIn=(section, selector)=>[...section.querySelectorAll(selector)].map(time=>time.dateTime);
 for(const [city,firstStart,firstEnd,secondStart,secondEnd,thirdStart,finalDays] of [
   ['北京','2026-11-23','2026-11-24','2026-12-07','2026-12-08','2027-01-11',33],
   ['上海','2026-11-26','2026-11-27','2026-12-10','2026-12-11','2027-01-12',31],
   ['成都','2026-11-29','2026-11-30','2026-12-13','2026-12-14','2027-01-14',30],
   ['深圳','2026-12-02','2026-12-03','2026-12-16','2026-12-17','2027-01-18',31],
   ['广州','2026-12-04','2026-12-05','2026-12-18','2026-12-19','2027-01-19',30],
 ]){
   const cityButton=[...cohort.querySelectorAll('article button')].find(button=>button.textContent===`查看${city}课间复习`);
   assert(cityButton);
   await act(async()=>cityButton.click());
   assert.equal(document.activeElement.id,'foundation-cohort-bridge-title');
   assert.equal(citySelect.value,city);
   assert.equal(prepCity.value,city);
   assert.equal(cityPrep.querySelector('time').dateTime,firstStart);
   assert.match(compactBridge.querySelector('[role="status"]').textContent,new RegExp(city+'｜.*12 个完整日历日'));
   assert.deepEqual(datesIn(compactBridge,'[role="status"] time'),[firstEnd,secondStart]);
   assert.match(finalBridge.querySelector('[role="status"]').textContent,new RegExp(city+'｜.*'+finalDays+' 个完整日历日'));
   assert.deepEqual(datesIn(finalBridge,'[role="status"] time'),[secondEnd,thirdStart]);
   if(city==='北京'){
     assert.deepEqual(datesIn(compactBridge,'article time'),['2026-11-25','2026-11-30','2026-12-01','2026-12-06']);
     assert.deepEqual(datesIn(finalBridge,'article time'),['2026-12-09','2026-12-25','2026-12-26','2027-01-10']);
   }
   assert.equal(bridgeDay.value,'21');
 }
 await act(async()=>{
   citySelect.value='深圳';
   citySelect.dispatchEvent(new window.Event('change',{bubbles:true}));
 });
 assert.match(finalBridge.querySelector('[role="status"]').textContent,/深圳｜.*31 个完整日历日/);
 assert.equal(prepCity.value,'深圳');
 assert.equal(window.localStorage.getItem(FOUNDATION_BRIDGE_KEY),bridgeRecord);
 const compactTargets=['foundation-d1-title','foundation-d2-title','foundation-france-title','foundation-d1-quiz-title','foundation-d2-quiz-title','foundation-d3-title','foundation-d4-title'];
 const compactButtons=[...compactBridge.querySelectorAll('button')];
 assert.equal(compactButtons.length,compactTargets.length);
 for(const [i,button] of compactButtons.entries()){
   await act(async()=>button.click());
   assert.equal(document.activeElement.id,compactTargets[i]);
 }
 const finalTargets=['foundation-d3-title','foundation-d4-title','foundation-d3-quiz-title','foundation-d4-quiz-title','foundation-assessment-title','foundation-assessment-practice-title','foundation-sparkling-assessment-title','foundation-assessment-team-pours-title'];
 const finalButtons=[...finalBridge.querySelectorAll('article button')];
 assert.equal(finalButtons.length,finalTargets.length);
 for(const [i,button] of finalButtons.entries()){
   await act(async()=>button.click());
   assert.equal(document.activeElement.id,finalTargets[i]);
 }
 assert(pourCases.every(item=>item.open && item.querySelector('details').open));
 await act(async()=>finalClassPrep.querySelector('summary').click());
 assert(finalClassPrep.open);
 const sample=finalClassPrep.querySelector('details');
 assert(!sample.open);
 await act(async()=>sample.querySelector('summary').click());
 assert(sample.open);
 assert.deepEqual([...sample.querySelectorAll('dt')].map(item=>item.textContent),['知识','服务','酒单']);
 const noteTargets=['foundation-sparkling-assessment-title','foundation-assessment-recommendation-title','foundation-assessment-team-pours-title'];
 const noteLinks=[...finalClassPrep.querySelectorAll('button')];
 assert.equal(noteLinks.length,noteTargets.length);
 const noteRecords=Object.entries(window.localStorage);
 for(const [index,button] of noteLinks.entries()){
   await act(async()=>button.click());
   assert.equal(document.activeElement.id,noteTargets[index]);
   assert(finalClassPrep.open && sample.open);
 }
 assert.deepEqual(Object.entries(window.localStorage),noteRecords);
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

 for (const [id, unitId] of writtenCases) {
   const exercise = document.getElementById(id);
   await act(async () => exercise.querySelector('summary').click());
   const reviewKey = `somm100.foundation.${unitId.split('-')[1]}-review.v1`;
   const before = JSON.parse(window.localStorage.getItem(reviewKey));
   await act(async () => exercise.querySelector('button').click());
   assert.equal(document.activeElement.id, unitId);
   assert.equal(scrolls.at(-1).id, unitId);
   assert.equal(window.location.hash, '#foundation');
   assert.deepEqual(JSON.parse(window.localStorage.getItem(reviewKey)), {
     ...before, unit: Number(unitId.split('-').at(-1)),
   });
 }
 const remountedSparkling=document.querySelector('[aria-labelledby="foundation-sparkling-assessment-title"]');
 const openRecord=remountedSparkling.querySelector('#foundation-sparkling-assessment-written-record');
 const openAnswer=remountedSparkling.querySelector('#foundation-sparkling-assessment-written');
 const sparklingLinks=[...remountedSparkling.querySelectorAll('button')];
 assert.equal(sparklingLinks.length,2);
 await act(async()=>openRecord.querySelector('summary').click());
 await act(async()=>openAnswer.querySelector('summary').click());
 const d4StorageKey='somm100.foundation.d4-review.v1';
 const beforeSparklingLinks=new Map(Object.entries(window.localStorage));
 for(const [index,button] of sparklingLinks.entries()){
   const unit=index+3;
   const targetId=`foundation-d4-0${unit}`;
   await act(async()=>button.click());
   assert.equal(document.activeElement.id,targetId);
   assert.equal(scrolls.at(-1).id,targetId);
   assert(openRecord.open && openAnswer.open);
   assert.equal(window.location.hash,'#foundation');
   const expected=new Map(beforeSparklingLinks);
   expected.set(d4StorageKey,JSON.stringify({...JSON.parse(expected.get(d4StorageKey)),unit}));
   assert.deepEqual(new Map(Object.entries(window.localStorage)),expected);
 }
 assert.deepEqual(diagnostics,[]);
 console.log(JSON.stringify({status:'PASS',concepts:8,oralChecksAndReturns:8,originalArticleLinks:17,grapeCards:6,precourseLabelCases:3,precourseStyleCases:3,precoursePlaceCases:3,precourseEvidenceCases:4,practiceShortcuts,sectionDestinations:19,focusedDestinations:46,directRecapDestinations:4,writtenCaseQuestions:12,sparklingAssessmentSteps:3,writtenCaseReviewJumps:3,blindEvidenceComparison:true,oralEvidenceScenarios:2,readinessGroups:8,readinessNavigationPaces:[4,8],readinessReviewQuestionJumps:3,readinessReviewRoundTrips,fieldTripReviewSteps:3,drinkComparisonCases:3,pairingComparisonCases:2,serviceRoleplayScenarios:2,teamAuditRows:4,cityPrepOptions:5,cohortScheduledDays:25,cohortBridgeWindows:10,paymentTermsSourceVerified:true,assessmentScenarios:3,reducedMotion:'instant',routeCallbacks:routes,quizRecordsRestored:4,limits:'jsdom only; no browser layout/network/deployment claim'},null,2));
}finally{await act(async()=>root.unmount());console.error=originalError;dom.window.close();}
