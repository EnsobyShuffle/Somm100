// Real React/jsdom integration; no browser geometry or online verification.
// Run with the same dependencies as check-foundation-rendering.mjs.
import assert from 'node:assert/strict';
import {register} from 'node:module';
register('./foundation-render-loader.mjs', import.meta.url);
const {JSDOM} = await import(process.env.FOUNDATION_DOM_MODULE || 'jsdom');
const dom = new JSDOM('<!doctype html><div id="root"></div>', {url:'https://foundation-test.invalid/'});
globalThis.window=dom.window;
globalThis.document=dom.window.document;
globalThis.CustomEvent=dom.window.CustomEvent;
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const frames=[];
window.requestAnimationFrame=callback=>frames.push(callback);
window.HTMLElement.prototype.scrollIntoView=function(){};
window.matchMedia=()=>({matches:true});
const {default:React,act}=await import('react');
const {default:Directory}=await import('../app/FoundationDirectory.tsx');
const {createRoot}=await import('react-dom/client');
const diagnostics=[];
const originalError=console.error;
console.error=(...args)=>diagnostics.push(args.map(String).join(' '));
const results=[];
try {
  for (const day of [1,2,3,4]) {
    window.localStorage.clear();
    const prefix=`foundation-d${day}`;
    const key=`somm100.foundation.d${day}-quiz.v1`;
    const {default:Quiz}=await import(`../app/FoundationD${day}Quiz.js`);
    const {default:Review}=await import(`../app/FoundationD${day}Review.js`);
    const {default:France}=await import('../app/FoundationFranceReview.js');
    const {default:data}=await import(`../data/foundation-d${day}-quiz.json`);
    const root=createRoot(document.getElementById('root'));
    await act(async()=>root.render(React.createElement(React.Fragment,null,
      React.createElement(Directory),React.createElement(Quiz),React.createElement(Review),day===2?React.createElement(France):null)));
    assert.equal(document.activeElement,document.body,'Mount must not steal focus');
    const quiz=document.getElementById(prefix+'-quiz');
    const card=document.querySelector(`[aria-labelledby="${prefix}-directory-label"]`);
    assert.equal(card.querySelector('[role="status"]').textContent.trim(),
      `已答 0 / ${data.questions.length} 题，待复习 0 题。`);
    async function select(number) {
      await act(async()=>{
        const el=quiz.querySelector('select'); el.value=String(number);
        el.dispatchEvent(new window.Event('change',{bubbles:true}));
      });
    }
    async function click(button) {
      assert.ok(button && !button.disabled,'Expected enabled control');
      await act(async()=>button.click());
      await act(async()=>{while(frames.length)frames.shift()(0);});
    }
    const buttonNamed=name=>[...quiz.querySelectorAll('button')].find(b=>b.textContent===name);
    await click(buttonNamed('下一题'));
    assert.equal(document.activeElement.id,data.questions.find(q=>q.number===Number(quiz.querySelector('select').value)).id);
    await click(buttonNamed('上一题'));
    assert.equal(quiz.querySelector('select').value,'1');
    let links=0;
    for (const q of data.questions) {
      await select(q.number);
      const radios=[...quiz.querySelectorAll('input[type=radio]')];
      // Two different choices: first and latest identities must survive every round trip.
      await click(radios[0]); await click(radios[1]);
      const before=JSON.parse(window.localStorage.getItem(key));
      assert.notEqual(before.answers[q.id].first,before.answers[q.id].latest);
      const reviewButtons=[...quiz.querySelectorAll('button')].filter(b=>b.textContent.startsWith('复习｜'));
      assert.equal(reviewButtons.length,q.unitIds.length);
      for (let i=0;i<reviewButtons.length;i++) {
        // React may replace buttons after changing questions; query the current DOM.
        await click([...quiz.querySelectorAll('button')].filter(b=>b.textContent.startsWith('复习｜'))[i]);
        const unitId=q.unitIds[i];
        const article=document.getElementById(unitId);
        assert.ok(article,`${q.id}: correct review article ${unitId}`);
        const panel=article.closest('section.foundation-study');
        assert.equal(document.activeElement.id,unitId.startsWith('foundation-france')?'foundation-france-title':unitId);
        const reviewKey=`somm100.${unitId.startsWith('foundation-france')?'foundation.france':`foundation.d${day}`}-review.v1`;
        const reviewProgress=JSON.parse(window.localStorage.getItem(reviewKey));
        assert.deepEqual(reviewProgress.checks,{},'Opening review does not complete checks');
        assert.deepEqual(reviewProgress.answers,{},'Opening review does not answer review questions');
        // Move away first so returning has to restore the original question.
        await select(q.number===1?2:1);
        const back=[...panel.querySelectorAll('button')].find(b=>b.textContent===`返回 D${day} 自测第 ${q.number} 题`);
        await click(back);
        assert.equal(quiz.querySelector('select').value,String(q.number));
        assert.equal(document.activeElement.id,data.questions.find(q=>q.number===Number(quiz.querySelector('select').value)).id);
        assert.deepEqual(JSON.parse(window.localStorage.getItem(key)).answers,before.answers);
        links++;
      }
    }
    await click(buttonNamed('下一道待复习题'));
    assert.equal(document.activeElement.id,data.questions.find(q=>q.number===Number(quiz.querySelector('select').value)).id);
    const pending=JSON.parse(window.localStorage.getItem(key));
    const selected=data.questions.find(q=>q.number===pending.unit);
    assert.notEqual(pending.answers[selected.id].latest,selected.answer);
    const firstPending=data.questions.find(q=>pending.answers[q.id]?.latest!==q.answer && pending.answers[q.id]);
    await select(data.questions.length);
    const beforeResume=JSON.parse(window.localStorage.getItem(key));
    await click(card.querySelector('.foundation-directory-resume'));
    assert.equal(quiz.querySelector('select').value,String(firstPending.number));
    assert.equal(document.activeElement.id,firstPending.id);
    assert.deepEqual(JSON.parse(window.localStorage.getItem(key)).answers,beforeResume.answers);
    const wrongBefore=Object.values(beforeResume.answers).length;
    assert.equal(wrongBefore,data.questions.length);
    const reviewCount=Number(card.querySelector('[role="status"]').textContent.match(/待复习 (\d+)/)[1]);
    await click([...quiz.querySelectorAll('input[type=radio]')].find(input=>
      input.closest('label').textContent.endsWith(firstPending.options[firstPending.answer])));
    assert.equal(Number(card.querySelector('[role="status"]').textContent.match(/待复习 (\d+)/)[1]),reviewCount-1);
    const afterCorrection=JSON.parse(window.localStorage.getItem(key)).answers[firstPending.id];
    assert.equal(afterCorrection.first,beforeResume.answers[firstPending.id].first);
    assert.equal(afterCorrection.latest,firstPending.answer);
    await select(data.questions.length);
    // Unrecognized return events cannot change the selected question or progress.
    const snapshot=window.localStorage.getItem(key);
    await act(async()=>window.dispatchEvent(new CustomEvent('foundation-return-quiz',{
      detail:{prefix,number:1,questionId:'nonexistent-question'}})));
    assert.equal(window.localStorage.getItem(key),snapshot);
    assert.equal(JSON.parse(snapshot).unit,data.questions.length);
    await act(async()=>root.unmount());
    results.push({day,questions:data.questions.length,reviewRoundTrips:links,answersPreserved:true,directoryResume:true,directoryCountUpdates:true,
      noAutomaticReviewCompletion:true,invalidReturnIgnored:true,questionNavigationFocus:true});
  }
  for(const raw of ['{bad json',JSON.stringify({version:99,unit:2,answers:{}})]){
    window.localStorage.clear();
    const key='somm100.foundation.d1-quiz.v1';
    window.localStorage.setItem(key,raw);
    const {default:Quiz}=await import('../app/FoundationD1Quiz.js');
    const root=createRoot(document.getElementById('root'));
    await act(async()=>root.render(React.createElement(React.Fragment,null,
      React.createElement(Directory),React.createElement(Quiz))));
    const card=document.querySelector('[aria-labelledby="foundation-d1-directory-label"]');
    assert(card.querySelector('[role="status"]').textContent.includes('本机记录保存或读取异常'));
    await act(async()=>card.querySelector('.foundation-directory-resume').click());
    assert.equal(window.localStorage.getItem(key),raw,'Corrupt or future records must survive resume navigation');
    await act(async()=>root.unmount());
  }
  assert.deepEqual(diagnostics,[],'No React warnings/errors');
  console.log(JSON.stringify({status:'PASS',scope:'real React/jsdom events; scroll stubbed; not phone or online acceptance',
    results,totalQuestions:results.reduce((n,r)=>n+r.questions,0),totalRoundTrips:results.reduce((n,r)=>n+r.reviewRoundTrips,0)},null,2));
} finally {
  console.error=originalError;
  dom.window.close();
  delete globalThis.window; delete globalThis.document; delete globalThis.CustomEvent;
  delete globalThis.IS_REACT_ACT_ENVIRONMENT;
}
