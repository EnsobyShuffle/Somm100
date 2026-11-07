import test from 'node:test';
import assert from 'node:assert/strict';
import {foundationFullAppUrl} from '../lib/foundation-entry.mjs';
test('Focus entry returns to the same origin and mount for every supported action',()=>{
 for(const mount of ['/','/somm100/'])for(const page of ['home','courses','foundation','service','practice','account']){
  const url=new URL(foundationFullAppUrl(page,'https://test.invalid'+mount+'foundation.html?preview=1#foundation'));
  assert.equal(url.origin,'https://test.invalid');assert.equal(url.pathname,mount+'index.html');assert.equal(url.hash,'#'+page);assert.equal(url.search,'');
 }
});
test('Unknown return destinations fall back to courses',()=>{
 for(const page of ['https://evil.invalid','../other','',null])assert.equal(foundationFullAppUrl(page,'https://test.invalid/somm100/foundation.html'),'https://test.invalid/somm100/index.html#courses');
});
