// Run: node scripts/check-foundation-rendering.mjs
// Requires project React/react-dom and jsdom@26.1.0 in the validation environment.
// FOUNDATION_DOM_MODULE may identify an externally installed jsdom module URL.
// CSS is ignored: this verifies real React DOM/effects/storage, NOT visual layout.
import assert from 'node:assert/strict';
import {foundationDiagrams} from '../lib/foundation-diagrams.mjs';
import {foundationOptions} from '../lib/foundation-study.mjs';
import {register} from 'node:module';
register('./foundation-render-loader.mjs', import.meta.url);
const {JSDOM} = await import(process.env.FOUNDATION_DOM_MODULE || 'jsdom');
const dom = new JSDOM('<!doctype html><div id="root"></div>', {url:'https://foundation-test.invalid/'});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const originalCustomEvent = globalThis.CustomEvent;
globalThis.CustomEvent = dom.window.CustomEvent;
// jsdom has no layout: record scroll requests, verify actual DOM focus separately.
const scrollRequests = [];
dom.window.HTMLElement.prototype.scrollIntoView = function(options) { scrollRequests.push({id:this.id, ...options}); };
dom.window.matchMedia = () => ({matches:true});
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const {default:React, act} = await import('react');
const {createRoot} = await import('react-dom/client');
const {renderToStaticMarkup} = await import('react-dom/server');
const specs = [
  ['d1', 'FoundationD1Review', 10],
  ['d2', 'FoundationD2Review', 9],
  ['france', 'FoundationFranceReview', 6],
  ['d3', 'FoundationD3Review', 13],
  ['d4', 'FoundationD4Review', 15],
];
const expectedDiagramSources = {
  'foundation-d2-03': 2,
  'foundation-d2-04': 2,
  'foundation-d3-04': 2,
  'foundation-d3-05': 2,
  'foundation-d3-07': 4,
  'foundation-d3-09': 3,
  'foundation-d3-11': 3,
  'foundation-d3-12': 4,
  'foundation-d3-13': 3,
  'foundation-d4-04': 3,
  'foundation-d4-06': 3,
  'foundation-d4-07': 3,
  'foundation-d4-08': 3,
  'foundation-d4-10': 3,
  'foundation-d4-11': 2,
  'foundation-d4-12': 3,
  'foundation-d4-13': 3,
  'foundation-d4-14': 3,
  'foundation-d4-15': 2,
};
const expectedDiagramExercises = new Set([
  'foundation-d3-07', 'foundation-d3-09', 'foundation-d3-11', 'foundation-d3-12', 'foundation-d3-13',
  'foundation-d4-06', 'foundation-d4-08', 'foundation-d4-10', 'foundation-d4-11', 'foundation-d4-12',
  'foundation-d4-13', 'foundation-d4-14', 'foundation-d4-15'
]);
const container = document.getElementById('root');
const results = [];
const diagnostics = [];
const originalError = console.error;
console.error = (...args) => diagnostics.push(args.map(String).join(' '));
try {
  for (const [area, componentName, expectedCount] of specs) {
    const {default:Component} = await import(`../app/${componentName}.js`);
    const {default:data} = await import(`../data/foundation-${area}.json`);
    assert.equal(data.units.length, expectedCount);
    const markup = renderToStaticMarkup(React.createElement(Component));
    assert.ok(markup.includes(data.units[0].learningObjective || data.units[0].title), `${area}: initial SSR objective`);
    assert.ok(!markup.includes('app.notion.com'), `${area}: no internal Notion entry`);
    window.localStorage.clear();
    const key = `somm100.foundation.${area}-review.v1`;
    const first = data.units[0];
    const seed = {version:1, unit:1, checks:{[first.checks[0].id]:true},
      answers:{[first.questions[0].id]:{first:0, latest:1}}};
    window.localStorage.setItem(key, JSON.stringify(seed));
    let root = createRoot(container);
    await act(async () => root.render(React.createElement(Component)));
    assert.equal(document.activeElement, document.body, `${area}: loading never steals focus`);
    const recap = container.querySelector(`#foundation-${area}-recap`);
    const recapCounts = {d1:5, d2:5, d3:6, d4:7};
    assert.equal(Boolean(recap), area in recapCounts, 'D1–D4 have integrated recaps');
    if (recap) {
      const caseCount = recapCounts[area];
      const jumpUnit = {d1:3, d2:2, d3:3, d4:4}[area];
      const jumpId = `foundation-${area}-0${jumpUnit}`;
      assert.equal(recap.open, false);
      assert.equal(recap.querySelectorAll('ol > li').length, caseCount);
      const answers = [...recap.querySelectorAll('details')];
      assert.equal(answers.length, caseCount);
      assert.ok(answers.every(answer => !answer.open));
      const before = window.localStorage.getItem(key);
      await act(async () => recap.querySelector('summary').click());
      await act(async () => answers[0].querySelector('summary').click());
      assert.equal(answers[0].open, true);
      assert.equal(window.localStorage.getItem(key), before, 'Reading answers must not change progress');
      const jump = recap.querySelector('button');
      await act(async () => jump.click());
      assert.equal(document.activeElement.id, jumpId);
      assert.deepEqual(JSON.parse(window.localStorage.getItem(key)), {...JSON.parse(before), unit:jumpUnit});
      jump.focus();
      await act(async () => jump.click());
      assert.equal(document.activeElement.id, jumpId, 'Reopening the active unit must still focus it');
      const reviewTargets = {
        d1:[3, 1, 7, 6, 10, 8, 2, 4, 5, 3],
        d2:[2, 3, 5, 6, 4, 7, 8, 1, 9, 7],
        d3:[3, 5, 4, 8, 8, 9, 9, 13, 6, 7, 11, 12],
      }[area];
      if (reviewTargets) {
        recap.open = false;
        const recapLink = container.querySelector(`button[aria-controls="foundation-${area}-recap"]`);
        await act(async () => recapLink.click());
        assert.equal(recap.open, true);
        assert.equal(document.activeElement.id, `foundation-${area}-recap-title`);
        assert.equal(recap.querySelectorAll('button').length, reviewTargets.length);
        for (const [index, target] of reviewTargets.entries()) {
          await act(async () => recap.querySelectorAll('button')[index].click());
          assert.equal(document.activeElement.id, `foundation-${area}-${String(target).padStart(2, '0')}`);
        }
        const after = JSON.parse(window.localStorage.getItem(key));
        assert.deepEqual({...after, unit:1}, JSON.parse(before));
      }
    }
    for (const unit of data.units) {
      const select = container.querySelector('select');
      assert.ok(select && !select.disabled, `${unit.id}: effects enabled selection`);
      await act(async () => {
        select.value = String(unit.number);
        select.dispatchEvent(new window.Event('change', {bubbles:true}));
      });
      const article = document.getElementById(unit.id);
      assert.ok(article, `${unit.id}: active article`);
      const cellarStudy = article.querySelector('.foundation-cellar-study');
      assert.equal(Boolean(cellarStudy), unit.id === 'foundation-d1-08');
      if (cellarStudy) {
        const links = [...cellarStudy.querySelectorAll('a')];
        assert.deepEqual(links.map(link => new URL(link.href).hostname),
          ['www.louismicheletfils.com', 'www.ridgewine.com', 'www.melkaestates.com']);
        const before = window.localStorage.getItem(key);
        const answers = cellarStudy.querySelector('details');
        assert.equal(answers.open, false);
        await act(async () => answers.querySelector('summary').click());
        assert.equal(answers.open, true);
        assert.match(answers.textContent, /搅动酒泥是另一个操作/);
        assert.equal(window.localStorage.getItem(key), before, 'Cellar case review must not change progress');
      }
      const videoStudy = article.querySelector('.foundation-video-study');
      const hasVideoStudy = ['foundation-d1-02', 'foundation-d1-07', 'foundation-d4-03'].includes(unit.id);
      assert.equal(Boolean(videoStudy), hasVideoStudy, `${unit.id}: optional video placement`);
      if (videoStudy) {
        const heading = document.getElementById(videoStudy.getAttribute('aria-labelledby'));
        assert.ok(heading && videoStudy.contains(heading));
        const links = [...videoStudy.querySelectorAll('a')];
        assert.equal(links.length, 2);
        assert.ok(links.every(link => link.protocol === 'https:' && link.target === '_blank' && link.relList.contains('noopener')));
        assert.match(links[1].textContent, /官方图文/);
        assert.equal(videoStudy.querySelector('iframe, video, input'), null);
        const answers = videoStudy.querySelector('details');
        const before = window.localStorage.getItem(key);
        assert.equal(answers.open, false);
        await act(async () => answers.querySelector('summary').click());
        assert.equal(answers.open, true);
        assert.equal(window.localStorage.getItem(key), before, 'Opening observation answers does not change progress');
      }
      if (unit.id === 'foundation-d1-10') {
        const examples = article.querySelector('[aria-labelledby="foundation-label-examples-title"]');
        assert.ok(examples, 'D1-10: public label examples appear in the review');
        assert.equal(examples.querySelectorAll('article').length, 2);
        const links = [...examples.querySelectorAll('a')];
        assert.deepEqual(links.map(link => new URL(link.href).hostname),
          ['www.chablis-wines.com', 'www.cloudybay.com', 'www.chablis-wines.com']);
        assert.ok(links.every(link => link.target === '_blank' && link.relList.contains('noopener')));
        assert.equal(examples.querySelectorAll('img,iframe').length, 0);
        const answers = examples.querySelector('details');
        assert.equal(answers.open, false);
        const before = window.localStorage.getItem(key);
        await act(async () => answers.querySelector('summary').click());
        assert.equal(answers.open, true);
        assert.match(answers.textContent, /查資料確認|查资料确认/);
        assert.match(answers.textContent, /13\.5% 酒精度/);
        assert.equal(window.localStorage.getItem(key), before, 'Reading answers does not change progress');
      }
      const diagram=foundationDiagrams[unit.id];
      const expectedSources = expectedDiagramSources[unit.id];
      if (area === 'd2' || expectedSources) assert.ok(diagram, `${unit.id}: comparison diagram exists`);
      if(diagram){
        const figure=article.querySelector('figure.foundation-diagram');
        assert.ok(figure, `${unit.id}: diagram mounted in real React DOM`);
        assert.equal(figure.getAttribute('aria-labelledby'), `${unit.id}-diagram-title`);
        for(const text of [diagram.title,diagram.intro,diagram.takeaway,diagram.note,...diagram.groups.flatMap(g=>[g.title,...g.nodes.flat()])]){
          assert.ok(figure.textContent.includes(text), `${unit.id}: diagram text ${text}`);
        }
        if (expectedSources) {
          const links = [...figure.querySelectorAll('.foundation-diagram-sources a')];
          assert.equal(links.length, expectedSources, `${unit.id}: comparison source count`);
          assert.ok(links.every(link =>
            link.protocol === 'https:' && link.hostname !== 'app.notion.com' &&
            link.target === '_blank' && link.relList.contains('noopener')));
          assert.deepEqual(links.map(link => [link.textContent, link.getAttribute('href')]), diagram.sources);
        }
        if (expectedDiagramExercises.has(unit.id)) {
          const exercise = figure.querySelector('.foundation-diagram-exercise');
          assert.ok(exercise.textContent.includes(diagram.exercise.prompt));
          const details = exercise.querySelector('details');
          assert.equal(details.open, false);
          assert.ok(details.textContent.includes(diagram.exercise.answer));
          const before = window.localStorage.getItem(key);
          await act(async () => details.querySelector('summary').click());
          assert.equal(details.open, true);
          assert.equal(window.localStorage.getItem(key), before, 'Opening the diagram answer preserves progress');
        }
      }
      if (unit.number !== 1) {
        assert.equal(document.activeElement, article, `${unit.id}: navigation moves focus to content`);
        assert.deepEqual(scrollRequests.at(-1), {id:unit.id,behavior:'instant',block:'start'});
      }
      for (const field of ['learningObjective', 'preparation', 'practice']) {
        assert.ok(unit[field] && article.textContent.includes(unit[field]), `${unit.id}: ${field}`);
      }
      assert.ok(article.textContent.includes('不在页面保存或自动评分'), `${unit.id}: written exercise boundary`);
      assert.equal(article.querySelectorAll('input[type=checkbox]').length, unit.checks.length);
      assert.equal(article.querySelectorAll('input[type=radio]').length,
        unit.questions.reduce((count,q) => count + q.options.length, 0));
      assert.ok(!container.innerHTML.includes('app.notion.com'));
      const saved = JSON.parse(window.localStorage.getItem(key));
      assert.equal(saved.unit, unit.number);
      assert.deepEqual(saved.checks, seed.checks, `${unit.id}: navigation preserves checks`);
      assert.deepEqual(saved.answers, seed.answers, `${unit.id}: navigation preserves first/latest answers`);
    }
    for (const [label, number] of [['上一节', data.units.length-1], ['下一节', data.units.length]]) {
      const button = [...container.querySelectorAll('button')].find(el => el.textContent === label);
      await act(async () => button.click());
      assert.equal(document.activeElement.id, data.units[number-1].id, `${area}: ${label} focuses new content`);
    }
    // Exercise an actual checkbox and radio event, then remount from persisted state.
    const checkbox = container.querySelector('article input[type=checkbox]');
    const radio = container.querySelector('article input[type=radio]');
    await act(async () => checkbox.click());
    await act(async () => radio.click());
    const saved = JSON.parse(window.localStorage.getItem(key));
    assert.equal(Object.keys(saved.checks).length, 2);
    assert.equal(Object.keys(saved.answers).length, 2);
    await act(async () => root.unmount());
    root = createRoot(container);
    await act(async () => root.render(React.createElement(Component)));
    assert.equal(container.querySelector('select').value, String(data.units.at(-1).number));
    assert.equal(container.querySelector('article input[type=checkbox]').checked, true);
    assert.equal(container.querySelector('article input[type=radio]').checked, true);
    assert.deepEqual(JSON.parse(window.localStorage.getItem(key)), saved);
    await act(async () => root.unmount());
    // Corrupt records must remain untouched while temporary learning remains usable.
    window.localStorage.setItem(key, '{invalid-json');
    root = createRoot(container);
    await act(async () => root.render(React.createElement(Component)));
    assert.ok(container.querySelector('[role=alert]'), `${area}: unreadable record is explained`);
    await act(async () => container.querySelector('article input[type=checkbox]').click());
    assert.equal(window.localStorage.getItem(key), '{invalid-json', `${area}: never overwrite unreadable records`);
    await act(async () => root.unmount());
    results.push({area,units:expectedCount,ssr:true,dom:true,navigation:true,focus:true,recordPreservation:true,remount:true,corruptRecordProtection:true,missingGuidance:[],diagramsVerified:data.units.filter(u=>foundationDiagrams[u.id]).length});
  }
  for (const [day, unitId, questionReviewLabel, otherUnit] of [
    ['D1', '01', /^复习｜一颗葡萄/, 8],
    ['D2', '01', /^复习｜学习葡萄品种/, 7],
    ['D3', '03', /^复习｜Piedmont/, 9],
    ['D4', '04', /^复习｜Prosecco/, 10],
  ]) {
    const prefix = 'foundation-' + day.toLowerCase();
    const {default:Quiz} = await import(`../app/Foundation${day}Quiz.js`);
    const {default:Review} = await import(`../app/Foundation${day}Review.js`);
    const {default:quizData} = await import(`../data/${prefix}-quiz.json`);
    const originalQuestion = quizData.questions.find(q => q.unitIds.includes(`${prefix}-${unitId}`));
    const quizKey = `somm100.foundation.${day.toLowerCase()}-quiz.v1`;
    const wrong = (originalQuestion.answer + 1) % originalQuestion.options.length;
    const [otherQuestion, correctedQuestion] = quizData.questions.filter(q=>q.id!==originalQuestion.id);
    const otherWrong = (otherQuestion.answer + 1) % otherQuestion.options.length;
    const quizSeed = {version:1, unit:originalQuestion.number, checks:{}, answers:{
      [originalQuestion.id]:{first:wrong, latest:wrong},
      [otherQuestion.id]:{first:otherWrong, latest:otherWrong},
      [correctedQuestion.id]:{first:(correctedQuestion.answer+1)%correctedQuestion.options.length, latest:correctedQuestion.answer}
    }};
    window.localStorage.clear();
    window.localStorage.setItem(quizKey, JSON.stringify(quizSeed));
    const roundTripRoot = createRoot(container);
    await act(async () => roundTripRoot.render(React.createElement(React.Fragment, null,
      React.createElement(Review), React.createElement(Quiz))));
    const clickButton = async (scope, pattern) => {
      const button = [...scope.querySelectorAll('button')].find(b => pattern.test(b.textContent));
      assert.ok(button && !button.disabled, String(pattern));
      await act(async () => button.click());
    };
    const quiz = document.getElementById(prefix + '-quiz');
    const review = document.getElementById(prefix + '-review');
    const recap = document.getElementById(prefix + '-recap');
    const pending = document.getElementById(prefix + '-quiz-review-list');
    assert.equal(pending.open, false);
    assert.equal(pending.querySelector('summary').textContent, '待复习清单（2 题）');
    const beforeOpen = window.localStorage.getItem(quizKey);
    await act(async()=>pending.querySelector('summary').click());
    assert.equal(pending.open, true);
    assert.equal(window.localStorage.getItem(quizKey), beforeOpen);
    const pendingNumbers = ()=>[...pending.querySelectorAll('button')].map(b=>Number(b.textContent.match(/^第 (\d+) 题/)[1]));
    assert.deepEqual(pendingNumbers(),[originalQuestion.number,otherQuestion.number].sort((a,b)=>a-b));
    const pendingLabel = q=>new RegExp(`^第 ${q.number} 题`);
    await clickButton(pending, pendingLabel(originalQuestion));
    assert.equal(document.activeElement.id, originalQuestion.id, 'The current pending question receives focus');
    await clickButton(pending, pendingLabel(otherQuestion));
    assert.equal(document.activeElement.id, otherQuestion.id);
    assert.deepEqual(JSON.parse(window.localStorage.getItem(quizKey)).answers, quizSeed.answers);
    await clickButton(pending, pendingLabel(originalQuestion));
    await clickButton(quiz, questionReviewLabel);
    assert.equal(document.activeElement.id, `${prefix}-${unitId}`);
    const lessonActions = document.activeElement.previousElementSibling;
    assert.ok(lessonActions.querySelector(`button[aria-controls="${recap.id}"]`), 'Recap action is adjacent to the lesson');
    const returnLabel = new RegExp(`^返回 ${day} 自测第`);
    assert.match(lessonActions.textContent, new RegExp(`返回 ${day} 自测第`));
    const reviewKey = `somm100.foundation.${day.toLowerCase()}-review.v1`;
    const beforeRecap = window.localStorage.getItem(reviewKey);
    await clickButton(lessonActions, new RegExp(`^回到 ${day} 综合复盘$`));
    assert.equal(recap.open, true);
    assert.equal(document.activeElement.id, recap.id + '-title');
    assert.equal(window.localStorage.getItem(reviewKey), beforeRecap);
    await clickButton(recap, new RegExp(`回看第 ${otherUnit} 节`));
    assert.equal(document.activeElement.id, `${prefix}-${String(otherUnit).padStart(2, '0')}`);
    const newReviewUnits = {D1:[[2,4],[5,3]], D2:[[8,1],[9,7]], D3:[[6,7],[11,12]], D4:[[9,11],[9,12]]}[day];
    if (newReviewUnits) {
      const cases = [...recap.querySelectorAll(':scope > ol > li')];
      assert.equal(cases.length, {D1:5,D2:5,D3:6,D4:7}[day]);
      for (const [index, lessonNumbers] of newReviewUnits.entries()) {
        const card = cases[cases.length - newReviewUnits.length + index];
        const answer = card.querySelector('details');
        const savedReview = JSON.parse(window.localStorage.getItem(reviewKey));
        assert(!answer.open);
        await act(async()=>answer.querySelector('summary').click());
        assert(answer.open);
        assert.equal(window.localStorage.getItem(reviewKey), JSON.stringify(savedReview));
        for (const number of lessonNumbers) {
          await clickButton(card, new RegExp(`回看第 ${number} 节`));
          assert.equal(document.activeElement.id, `${prefix}-${String(number).padStart(2, '0')}`);
        }
        const afterJumps = JSON.parse(window.localStorage.getItem(reviewKey));
        assert.deepEqual(afterJumps.answers,savedReview.answers);
        assert.deepEqual(afterJumps.checks,savedReview.checks);
      }
    }
    await clickButton(review, returnLabel);
    assert.equal(document.activeElement.id, originalQuestion.id);
    assert.equal(document.activeElement.tagName, 'FIELDSET');
    assert.deepEqual(JSON.parse(window.localStorage.getItem(quizKey)), quizSeed);
    await clickButton(quiz, questionReviewLabel);
    await clickButton(quiz, /^下一题$/);
    await clickButton(review, returnLabel);
    assert.equal(document.activeElement.id, originalQuestion.id, 'Return restores the exact question after changing selection');
    assert.deepEqual(JSON.parse(window.localStorage.getItem(quizKey)), quizSeed);
    for (const q of [originalQuestion, otherQuestion]) {
      await clickButton(pending, pendingLabel(q));
      const radios = quiz.querySelectorAll('input[type="radio"]');
      await act(async()=>radios[foundationOptions(q).indexOf(q.answer)].click());
      const savedAnswers = JSON.parse(window.localStorage.getItem(quizKey)).answers;
      assert.deepEqual(savedAnswers[q.id], {first:quizSeed.answers[q.id].first, latest:q.answer});
      assert.ok(!pendingNumbers().includes(q.number), 'Corrected questions leave the pending list');
    }
    assert.match(pending.textContent, /最近一次都答对了/);
    await act(async () => roundTripRoot.unmount());
  }
  assert.deepEqual(diagnostics, [], 'No React warnings or errors');
  console.log(JSON.stringify({status:'PASS',scope:'React SSR and jsdom; no browser layout or online acceptance',
    results,pendingQuizListsVerified:4,recapCasesVerified:8,recapJumpsVerified:16,totalUnits:results.reduce((sum,row)=>sum+row.units,0)}, null, 2));
} finally {
  console.error = originalError;
  dom.window.close();
  delete globalThis.window;
  delete globalThis.document;
  globalThis.CustomEvent = originalCustomEvent;
  delete globalThis.IS_REACT_ACT_ENVIRONMENT;
}
