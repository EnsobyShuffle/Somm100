// Run: node scripts/check-foundation-rendering.mjs
// Requires project React/react-dom and jsdom@26.1.0 in the validation environment.
// FOUNDATION_DOM_MODULE may identify an externally installed jsdom module URL.
// CSS is ignored: this verifies real React DOM/effects/storage, NOT visual layout.
import assert from 'node:assert/strict';
import {foundationDiagrams} from '../lib/foundation-diagrams.mjs';
import {register} from 'node:module';
register('./foundation-render-loader.mjs', import.meta.url);
const {JSDOM} = await import(process.env.FOUNDATION_DOM_MODULE || 'jsdom');
const dom = new JSDOM('<!doctype html><div id="root"></div>', {url:'https://foundation-test.invalid/'});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
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
};
const expectedDiagramExercises = new Set(['foundation-d3-07', 'foundation-d3-09', 'foundation-d3-11', 'foundation-d3-12', 'foundation-d3-13', 'foundation-d4-06', 'foundation-d4-08']);
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
  assert.deepEqual(diagnostics, [], 'No React warnings or errors');
  console.log(JSON.stringify({status:'PASS',scope:'React SSR and jsdom; no browser layout or online acceptance',
    results,totalUnits:results.reduce((sum,row)=>sum+row.units,0)}, null, 2));
} finally {
  console.error = originalError;
  dom.window.close();
  delete globalThis.window;
  delete globalThis.document;
  delete globalThis.IS_REACT_ACT_ENVIRONMENT;
}
