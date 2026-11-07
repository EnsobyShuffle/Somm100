import assert from 'node:assert/strict';
import {register} from 'node:module';
register('./foundation-render-loader.mjs',import.meta.url);
const {JSDOM}=await import('jsdom');
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:'https://test.invalid/somm100/foundation.html'});
globalThis.window=dom.window;globalThis.document=dom.window.document;
globalThis.CustomEvent=dom.window.CustomEvent;globalThis.IS_REACT_ACT_ENVIRONMENT=true;
window.HTMLElement.prototype.scrollIntoView=function(){};
window.matchMedia=()=>({matches:true});
const {default:React,act}=await import('react');
const {createRoot}=await import('react-dom/client');
const {default:Page}=await import('../app/FoundationPage.tsx');
const {default:Focus}=await import('../app/FoundationFocus.tsx');
const root=createRoot(document.getElementById('root'));
const errors=[],oldError=console.error;console.error=(...args)=>errors.push(args.map(String).join(' '));
try{
 // Existing full-app page and focus page use identical storage keys on one origin.
 await act(async()=>root.render(React.createElement(Page,{go:()=>{}})));
 const input=document.querySelector('#foundation-d1-quiz input[type=radio]');
 await act(async()=>input.click());
 const key='somm100.foundation.d1-quiz.v1',saved=JSON.parse(window.localStorage.getItem(key));
 await act(async()=>root.render(null));
 await act(async()=>root.render(React.createElement(Focus)));
 assert(document.querySelector('h1'));
 assert(document.querySelector('#foundation-d1-quiz input[type=radio]').checked);
 assert.deepEqual(JSON.parse(window.localStorage.getItem(key)),saved);
 const appLink=[...document.querySelectorAll('a')].find(x=>x.textContent==='打开完整 App');
 assert.equal(appLink.href,'https://test.invalid/somm100/index.html#foundation');
 assert(document.querySelector('header svg image'));
 assert.match(document.querySelector('main').textContent,/不会自动同步/);
 await act(async()=>root.render(null));
 await act(async()=>root.render(React.createElement(Page,{go:()=>{}})));
 assert(document.querySelector('#foundation-d1-quiz input[type=radio]').checked);
 assert.deepEqual(JSON.parse(window.localStorage.getItem(key)),saved);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({status:'PASS',sameOriginRecordRoundTrip:true,brandPreserved:true,fullAppLink:true,scope:'React/jsdom only; no real cross-page navigation or phone test'},null,2));
}finally{await act(async()=>root.unmount());console.error=oldError;dom.window.close();}
