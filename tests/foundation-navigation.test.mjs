import test from 'node:test';
import assert from 'node:assert/strict';
import {focusFoundationTarget} from '../lib/foundation-navigation.mjs';
function fixture(tabindex){
 const events=[],attributes=new Map(tabindex===undefined?[]:[['tabindex',tabindex]]);
 const target={hasAttribute:k=>attributes.has(k),setAttribute:(k,v)=>attributes.set(k,v),focus:options=>events.push(['focus',options]),scrollIntoView:options=>events.push(['scroll',options])};
 return {target,attributes,events,doc:{getElementById:id=>id==='target'?target:null}};
}
test('requested navigation focuses without an extra scroll and respects reduced motion',()=>{
 const f=fixture();
 assert.equal(focusFoundationTarget('target',f.doc,{matchMedia:q=>{assert.equal(q,'(prefers-reduced-motion: reduce)');return {matches:true}}}),true);
 assert.equal(f.attributes.get('tabindex'),'-1');
 assert.deepEqual(f.events,[['focus',{preventScroll:true}],['scroll',{behavior:'auto',block:'start'}]]);
});
test('normal navigation preserves existing tab order and works without matchMedia',()=>{
 const f=fixture('0');focusFoundationTarget('target',f.doc,{});
 assert.equal(f.attributes.get('tabindex'),'0');assert.equal(f.events[1][1].behavior,'smooth');
});
test('missing targets and server rendering are harmless and do not focus anything',()=>{
 const f=fixture();assert.equal(focusFoundationTarget('missing',f.doc,{}),false);assert.deepEqual(f.events,[]);
 assert.equal(focusFoundationTarget('missing',null,null),false);
});
