import assert from 'node:assert/strict';
import {register} from 'node:module';
import test from 'node:test';
register('../scripts/foundation-render-loader.mjs', import.meta.url);
const {playerUrl} = await import('../app/WineChannel.tsx');

const recorded = [
  ['BV1Ub4y1d7XE', 631129623, 354355065],
  ['BV1xM4y1u7Ab', 931212365, 354868993],
  ['BV19U4y1V79Y', 673536075, 350497755],
];

test('the three filmed lessons request their verified first part in the mobile embed', () => {
  for (const [bvid, aid, cid] of recorded) {
    const url = new URL(playerUrl({url: 'https://www.bilibili.com/video/' + bvid + '/'}));
    assert.equal(url.origin + url.pathname, 'https://player.bilibili.com/player.html');
    for (const [key, value] of Object.entries({aid, bvid, cid, p: 1, autoplay: true})) {
      assert.equal(url.searchParams.get(key), String(value));
    }
  }
});

test('a saved later part never plays the catalog’s first part by mistake', () => {
  const url = new URL(playerUrl({url: 'https://m.bilibili.com/video/BV1Ub4y1d7XE/?p=2'}));
  assert.equal(url.searchParams.get('p'), '2');
  assert.equal(url.searchParams.has('cid'), false);
});

test('unindexed personal links still use the official player', () => {
  const url = new URL(playerUrl({url: 'https://www.bilibili.com/video/BV1234567890/'}));
  assert.equal(url.searchParams.get('bvid'), 'BV1234567890');
  assert.equal(url.searchParams.has('aid'), false);
  assert.equal(url.searchParams.has('cid'), false);
  assert.equal(playerUrl({url: 'https://example.org/video/BV1234567890/'}), null);
});

test('a withdrawn source is distinguished from an unindexed personal link', async () => {
  const {wasUnavailable} = await import('../lib/bilibili-playback.ts');
  assert.equal(wasUnavailable('BV15r4y1f7gn'), true);
  assert.equal(wasUnavailable('BV1234567890'), false);
  assert.equal(wasUnavailable(recorded[0][0]), false);
});
