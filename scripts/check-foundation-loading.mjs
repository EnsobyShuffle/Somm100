import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import Boundary from '../app/FoundationLoadBoundary.js';

const dom = new JSDOM('<!doctype html><div id="root"></div>', {url:'https://foundation-test.invalid/'});
globalThis.window=dom.window;
globalThis.document=dom.window.document;
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const record='{"answers":{"d1-q01":{"first":1,"latest":2}}}';
window.localStorage.setItem('somm100.foundation.d1-quiz.v1', record);
const caught=[], diagnostics=[];
const originalError=console.error;
console.error=(...args)=>diagnostics.push(args.map(String).join(' '));
let back=0, reload=0, imports=0;
const root=createRoot(document.getElementById('root'), {onCaughtError:error=>caught.push(error.message)});
const render=child=>root.render(React.createElement(Boundary,{onBack:()=>back++},child));
const button=name=>[...document.querySelectorAll('button')].find(el=>el.textContent===name);
try {
  let resolve;
  const delayed=new Promise(r=>{resolve=r;});
  const Lazy=React.lazy(()=>{imports++;return delayed;});
  await act(async()=>render(React.createElement(Lazy)));
  assert.match(document.querySelector('[role=status]').textContent,/正在加载/);
  assert.equal(document.activeElement,document.body);
  await act(async()=>button('返回课程').click());
  assert.equal(back,1);
  await act(async()=>resolve({default:()=>React.createElement('p',{id:'ready'},'课程已准备好')}));
  assert.equal(document.getElementById('ready').textContent,'课程已准备好');
  assert.equal(document.querySelector('[role=status]'),null);
  assert.equal(imports,1);

  let reject;
  const failure=new Promise((_,r)=>{reject=r;});
  const Broken=React.lazy(()=>{imports++;return failure;});
  await act(async()=>render(React.createElement(Broken)));
  await act(async()=>reject(new Error('test chunk unavailable')));
  assert.equal(document.activeElement.id,'foundation-load-error');
  assert.match(document.querySelector('[role=alert]').textContent,/重新载入/);
  assert.equal(document.querySelector('[role=status]'),null);
  assert.deepEqual(caught,['test chunk unavailable']);
  assert.equal(reload,0,'No automatic reload loop');
  await act(async()=>button('返回课程').click());
  assert.equal(back,2);
  await act(async()=>{
    // jsdom Location cannot reload. Stub only the explicit reload action.
    globalThis.window={location:{reload:()=>reload++}};
    try {button('重新载入').click();} finally {globalThis.window=dom.window;}
  });
  assert.equal(reload,1);
  await act(async()=>render(React.createElement(Broken)));
  assert.equal(imports,2,'Failed lazy import must not be falsely retried');
  assert.equal(window.localStorage.getItem('somm100.foundation.d1-quiz.v1'),record);
  await act(async()=>root.render(null));
  await act(async()=>render(React.createElement('p',{id:'returned'},'返回课程后可再次进入')));
  assert.ok(document.getElementById('returned'));
  assert.deepEqual(diagnostics,[]);
  console.log(JSON.stringify({status:'PASS',checks:['pending status and back action','deferred lazy resolution','rejected lazy recovery and focus','explicit reload only','no cached import retry loop','local record unchanged','boundary remount recovery'],limitations:['jsdom; no real network or page reload','no browser layout or online deployment']},null,2));
} finally {
  await act(async()=>root.unmount());
  console.error=originalError;
  dom.window.close();
}
