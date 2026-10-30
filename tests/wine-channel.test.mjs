import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = file => JSON.parse(readFileSync(new URL(file,import.meta.url),'utf8'));
const catalog = read('../data/wine-channel.json');
const existing = read('../data/video-library.json');
const evidence = read('../research/wine-channel-source-verification-20261031.json');
const bv = url => url.match(/BV[a-zA-Z0-9]{10}/)?.[0];

test('new videos have distinct original BV IDs, and do not replace existing learning links',()=>{
  const ids = catalog.videos.map(v=>v.bvid);
  assert.equal(new Set(ids).size,ids.length);
  for (const v of catalog.videos) {
    assert.equal(bv(v.url),v.bvid);
    assert(!existing.videos.some(old=>bv(old.url)===v.bvid));
  }
});
test('cover, author, player, duration and publication date match original page evidence',()=>{
  for (const v of catalog.videos) {
    const e=evidence.videos.find(e=>e.url===v.url);
    assert(e,`missing evidence: ${v.bvid}`);
    assert.equal(v.publisher,e.author);
    assert.equal(v.coverUrl,e.ogImage);
    assert.equal(v.embedUrl,e.ogVideo);
    assert.equal(v.durationSeconds,e.durationSeconds);
    assert.equal(v.publishedAt,e.publishedAt);
    assert.equal(v.verification.playbackTested,false);
    assert.equal(v.verification.fullContentReviewed,false);
  }
});
test('public links use the original platform and creator identity is consistent',()=>{
  for (const v of catalog.videos) {
    assert.equal(new URL(v.url).origin,'https://www.bilibili.com');
    const embed=new URL(v.embedUrl);
    assert.equal(embed.origin,'https://player.bilibili.com');
    assert.equal(embed.searchParams.get('bvid'),v.bvid);
    assert(/^i\d+\.hdslb\.com$/.test(new URL(v.coverUrl).hostname));
    const c=catalog.creators.find(c=>c.id===v.creatorId);
    assert(c);
    assert.equal(c.name,v.publisher);
    assert.equal(c.url,v.publisherUrl);
    const uid=new URL(c.url).pathname.split('/').filter(Boolean).at(-1);
    assert(new URL(evidence.videos.find(e=>e.url===v.url).publisherUrl).pathname.split('/').includes(uid));
  }
});
