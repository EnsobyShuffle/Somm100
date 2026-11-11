import assert from 'node:assert/strict';
import {register} from 'node:module';
register('./foundation-render-loader.mjs', import.meta.url);

const {JSDOM} = await import('jsdom');
const dom = new JSDOM('<!doctype html><div id="root"></div>', {url: 'https://test.invalid/#foundation-recall'});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.localStorage = dom.window.localStorage;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const {default: React, act, useState} = await import('react');
const {createRoot} = await import('react-dom/client');
const {default: Quiz} = await import('../app/FoundationRecallQuiz.tsx');
const {default: curriculum} = await import('../data/curriculum.json');
const {testFetch, newTestState} = await import('../lib/testing-store.ts');

const questions = curriculum.questions.filter(q => q.track === 'SOMM100' && q.type === 'short');
const root = createRoot(document.getElementById('root'));
const key = 'somm100-device-test-v1';
const savedRecord = () => JSON.parse(localStorage.getItem(key));
localStorage.setItem(key, JSON.stringify({...newTestState(), bookmarks: [questions[0].id, 'unrelated-bookmark']}));
function Harness({bookmarks: initial}) {
  const [bookmarks, setBookmarks] = useState(initial);
  async function save(change) {
    const response = await testFetch('/api/learning', {method: 'POST', body: JSON.stringify(change)});
    if (!response.ok) return null;
    const result = await response.json();
    setBookmarks(result.bookmarks);
    return result;
  }
  return React.createElement(Quiz, {questions, bookmarks, loading: false, save});
}

const click = async element => act(async () => element.click());
const all = selector => [...document.querySelectorAll(selector)];
const view = number => all('.foundation-recall-views button')[number];
const prompts = () => all('.foundation-recall-question');
const stars = () => all('.foundation-recall-star');
const answer = prompt => document.getElementById(prompt.getAttribute('aria-controls'));
const mount = () => act(async () => root.render(React.createElement(Harness, {bookmarks: savedRecord().bookmarks})));

try {
  await mount();
  assert.equal(prompts().length, 46);
  assert.equal(view(1).textContent, '收藏（1）');
  assert.deepEqual(all('.foundation-recall-item').map(item => item.value), Array.from({length: 46}, (_, i) => i + 1));
  assert(all('.foundation-recall-answer').every(panel => panel.hidden && panel.querySelector('a').textContent === '来源'));
  const [first, second] = prompts();
  await click(first);
  await click(second);
  assert(!answer(first).hidden && !answer(second).hidden);
  await click(first);
  assert(answer(first).hidden && !answer(second).hidden);
  assert.equal(second.getAttribute('aria-expanded'), 'true');
  assert.equal(stars()[1].type, 'button');
  await click(stars()[1]);
  assert.equal(stars()[1].textContent, '★');
  assert.equal(stars()[1].getAttribute('aria-pressed'), 'true');
  assert(!answer(second).hidden);
  assert.equal(view(1).textContent, '收藏（2）');
  assert.equal(window.location.hash, '#foundation-recall');
  await act(async () => root.render(null));
  await mount();
  assert.equal(view(1).textContent, '收藏（2）');
  assert(all('.foundation-recall-answer').every(panel => panel.hidden));
  await click(view(1));
  assert.equal(stars().length, 2);
  await click(stars()[0]);
  await click(stars()[0]);
  assert.equal(view(1).textContent, '收藏（0）');
  assert.match(document.querySelector('.foundation-recall').textContent, /当前题集还没有收藏/);
  assert.deepEqual(savedRecord().bookmarks, ['unrelated-bookmark']);
  await click(view(0));
  assert.equal(prompts().length, 46);
  await click(prompts()[0]);
  const setItem = window.Storage.prototype.setItem;
  window.Storage.prototype.setItem = function (name, value) {
    if (name === key) throw new Error('test storage failure');
    return setItem.call(this, name, value);
  };
  try {
    await click(stars()[0]);
    assert.equal(stars()[0].textContent, '☆');
    assert.equal(view(1).textContent, '收藏（0）');
    assert.match(document.querySelector('[role="alert"]').textContent, /收藏更新失败/);
    assert(!answer(prompts()[0]).hidden);
    assert.deepEqual(savedRecord().bookmarks, ['unrelated-bookmark']);
  } finally {
    window.Storage.prototype.setItem = setItem;
  }
  const longSet = Array.from({length: 100}, (_, i) => ({
    id: 'test-'+i, topic: 'test-group-'+Math.floor(i / 2),
    prompt: 'Test prompt '+i, answer: 'Test answer '+i, sourceUrl: 'https://test.invalid/source',
  }));
  await act(async () => root.render(React.createElement(Quiz, {
    questions: longSet, bookmarks: [], loading: false, save: async () => null,
  })));
  assert.equal(prompts().length, 100);
  assert.equal(all('.foundation-recall-group').length, 50);
  assert.equal(all('.foundation-recall-item').at(-1).value, 100);
  assert.equal(all('.foundation-recall-answer[hidden] a').length, 100);
  console.log(JSON.stringify({
    status: 'PASS', actualQuestions: 46, fixtureQuestions: 100, fixtureTopics: 50,
    independentAnswerAndBookmark: true, legacyBookmarkRetained: true,
    remountPersistence: true, emptySavedView: true, saveFailureRollback: true,
    scope: 'React and existing guest store in jsdom; no physical browser viewport acceptance',
  }));
} finally {
  await act(async () => root.unmount());
  dom.window.close();
}
