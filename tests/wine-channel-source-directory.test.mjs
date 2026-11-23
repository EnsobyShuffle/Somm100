import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=(p)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const sources=read('../data/wine-channel-source-accounts.json');
const bilibili=read('../data/wine-channel-bilibili-accounts.json');
const featured=read('../data/wine-channel-youtube-featured-01.json');
const existing=read('../data/wine-channel.json');

test('every indexed YouTube source is represented exactly once, with candidate and exclusions omitted',()=>{
  assert.equal(sources.accounts.length,142);
  assert.equal(new Set(sources.accounts.map(x=>x.id)).size,sources.accounts.length);
  assert.equal(new Set(sources.accounts.map(x=>x.name)).size,sources.accounts.length);
  for(const p of sources.accounts){
    assert(['Original 100','Later addition'].includes(p.collection));
    assert.equal(p.recordState,'Indexed - first pass');
    if(p.url)assert(/^https:\/\/www\.youtube\.com\//.test(p.url));
  }
});
test('Bilibili list includes only the ten approved core sources and preserves Nora IDs',()=>{
  assert.equal(bilibili.accounts.length,10);
  assert.equal(new Set(bilibili.accounts.map(x=>x.id)).size,10);
  for(const id of ['nora','bingke','somehouse']) {
    assert(bilibili.accounts.some(x=>x.id===id));
    assert(existing.creators.some(x=>x.id===id));
  }
  for(const rejected of ['葡萄酒迪先森','Claire的品酒小记','朱利安的微醺视界'])
    assert(!bilibili.accounts.some(x=>x.name.includes(rejected)));
});
test('all featured YouTube links reference a channel in the indexed source registry',()=>{
  assert(featured.videos.length>50);
  const keys=new Set(sources.accounts.map(x=>x.id));
  const ids=new Set();
  for(const v of featured.videos){
    assert(keys.has(v.creatorId),v.creatorId);
    assert.equal(v.platform,'YouTube');
    assert.match(v.url,/^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/);
    assert(!ids.has(v.id),'duplicate ID: '+v.id);
    ids.add(v.id);
  }
});
test('existing live Nora/Bingke/SOMMHOUSE gallery keeps its original source records',()=>{
  assert(existing.videos.some(x=>x.creatorId==='nora'));
  assert(existing.videos.some(x=>x.creatorId==='bingke'));
  assert(existing.videos.some(x=>x.creatorId==='somehouse'));
});
