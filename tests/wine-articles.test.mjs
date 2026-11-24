import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const { accounts, articles } = JSON.parse(readFileSync(new URL('../data/wine-articles.json', import.meta.url)));

test('each entry has a publisher, title, and distinct WeChat article identity', () => {
  const accountsById = new Set(accounts.map(account => account.id));
  const seen = new Set();
  for (const article of articles) {
    assert.ok(accountsById.has(article.account));
    assert.ok(article.title.trim());
    const url = new URL(article.url);
    assert.equal(url.origin, 'https://mp.weixin.qq.com');
    let key = url.pathname;
    if (key === '/s') {
      for (const name of ['__biz', 'mid', 'idx', 'sn']) assert.ok(url.searchParams.get(name));
      assert.match(url.searchParams.get('mid'), /^\d+$/);
      assert.match(url.searchParams.get('idx'), /^\d+$/);
      assert.match(url.searchParams.get('sn'), /^[0-9a-f]{32}$/i);
      key = ['__biz', 'mid', 'idx'].map(name => url.searchParams.get(name)).join('/');
    } else {
      assert.match(key, /^\/s\/[\w-]+$/);
      assert.equal(url.search, '');
    }
    assert.ok(!seen.has(key), article.url);
    seen.add(key);
  }
});

test('the historical Austrian account stays attributed and provisional titles retain their label', () => {
  const austrian = accounts.find(account => account.name === '奥地利葡萄酒Austrian Wine');
  assert.ok(articles.some(article => article.account === austrian.id && article.edition?.includes('历史号')));
  assert.ok(articles.some(article => article.note === '目录题名 · 原题待核'));
  assert.ok(articles.some(article => article.note === '目录题名 · 原文待核'));
});
