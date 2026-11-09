import assert from 'node:assert/strict';
import {register} from 'node:module';
register('./foundation-render-loader.mjs',import.meta.url);
const {JSDOM}=await import(process.env.FOUNDATION_DOM_MODULE || 'jsdom');
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:'https://test.invalid/somm100/foundation.html'});
globalThis.window=dom.window;globalThis.document=dom.window.document;
globalThis.CustomEvent=dom.window.CustomEvent;globalThis.IS_REACT_ACT_ENVIRONMENT=true;
window.HTMLElement.prototype.scrollIntoView=function(){};
window.matchMedia=()=>({matches:true});
const {default:React,act}=await import('react');
const {createRoot}=await import('react-dom/client');
const {default:Page}=await import('../app/FoundationPage.tsx');
const {createFoundationBackup}=await import('../lib/foundation-backup.mjs');
const root=createRoot(document.getElementById('root'));
const errors=[],oldError=console.error;console.error=(...args)=>errors.push(args.map(String).join(' '));
const downloads=[];
const oldClick=window.HTMLAnchorElement.prototype.click;
window.HTMLAnchorElement.prototype.click=function(){downloads.push(this.download)};
const oldCreate=URL.createObjectURL,oldRevoke=URL.revokeObjectURL;
URL.createObjectURL=()=> 'blob:test-backup';URL.revokeObjectURL=()=>{};
const days=['d1','d2','d3','d4'];
const reviewTitles=['foundation-study-title','foundation-d1-title','foundation-d2-title','foundation-france-title','foundation-d3-title','foundation-d4-title'];
const check=title=>document.querySelector(`section[aria-labelledby="${title}"] input[type=checkbox]`);
async function bridgeDay(value){const select=document.querySelector('#foundation-bridge-day');await act(async()=>{select.value=String(value);select.dispatchEvent(new window.Event('change',{bubbles:true}))})}
const key=day=>`somm100.foundation.${day}-quiz.v1`;
const radios=day=>[...document.querySelectorAll(`#foundation-${day}-quiz input[type=radio]`)];
const backupUI=()=>document.getElementById('foundation-backup');
const restoreButton=()=>[...backupUI().querySelectorAll('button')].find(b=>b.textContent==='恢复所选记录');
async function upload(value){
 const input=backupUI().querySelector('input[type=file]'),text=typeof value==='string'?value:JSON.stringify(value);
 Object.defineProperty(input,'files',{configurable:true,value:[{size:Buffer.byteLength(text),text:async()=>text}]});
 await act(async()=>input.dispatchEvent(new window.Event('change',{bubbles:true})));
}
function snapshot(){return Object.fromEntries(Object.entries(window.localStorage))}
function records(){return Object.fromEntries(days.map(day=>[day,JSON.parse(window.localStorage.getItem(key(day)))]))}
try{
 await act(async()=>root.render(React.createElement(Page,{go:()=>{}})));
 // Produce import/current fixtures through real quiz controls; do not handcraft answer schemas.
 for(const title of reviewTitles)await act(async()=>check(title).click());
 await bridgeDay(2);
 for(const day of days)await act(async()=>radios(day)[1].click());
 const imported=createFoundationBackup(window.localStorage),importedRecords=records();
 for(const title of reviewTitles)await act(async()=>check(title).click());
 await bridgeDay(1);
 for(const day of days)await act(async()=>radios(day)[0].click());
 const currentRecords=records(),current=snapshot();
 // Invalid files neither write nor remount the course.
 const originalRadio=radios('d1')[0];
 await upload('{broken');
 assert.deepEqual(snapshot(),current);assert.equal(radios('d1')[0],originalRadio);
 assert.equal(restoreButton(),undefined);
 // Merely previewing, and restoring with default conflict policy, retain current answers.
 await upload(imported);assert.deepEqual(snapshot(),current);
 assert.match(backupUI().textContent,/尚未写入/);
 assert.equal(backupUI().querySelector('input[type=checkbox]').checked,false);
 await act(async()=>restoreButton().click());
 assert.deepEqual(records(),currentRecords);
 // Existing readers omit false checklist entries on mount; unchecked remains unchecked.
 for(const title of reviewTitles)assert.equal(check(title).checked,false);
 for(const day of days)assert(radios(day)[0].checked);
 // Explicit replacement must refresh all four visible quizzes without a manual reload.
 await upload(imported);
 await act(async()=>backupUI().querySelector('input[type=checkbox]').click());
 await act(async()=>restoreButton().click());
 for(const day of days)assert(radios(day)[1].checked,`${day}: restored answer must be visible immediately`);
 assert.deepEqual(records(),importedRecords);
 assert.deepEqual(snapshot(),imported.records);
 for(const title of reviewTitles)assert(check(title).checked,`${title}: restored check must be visible`);
 assert.equal(document.querySelector('#foundation-bridge-day').value,'2');
 assert.match(document.getElementById('foundation-restore-status').textContent,/课程进度已重新读取/);
 assert.equal(document.activeElement.id,'foundation-restore-status');
 // Navigation writes state too: it must retain the restored answer, not the old mounted value.
 for(const day of days){
  const next=[...document.querySelectorAll(`#foundation-${day}-quiz button`)].find(b=>b.textContent==='下一题');
  await act(async()=>next.click());
  assert.deepEqual(JSON.parse(window.localStorage.getItem(key(day))).answers,importedRecords[day].answers);
 }
 // A changed record after preview requires a new explicit decision; no restore/remount/download.
 await upload(imported);
 await act(async()=>backupUI().querySelector('input[type=checkbox]').click());
 await act(async()=>radios('d1')[0].click());
 const beforeStale=snapshot(),staleRadio=radios('d1')[0],downloadCount=downloads.length;
 await act(async()=>restoreButton().click());
 assert.deepEqual(snapshot(),beforeStale);assert.equal(radios('d1')[0],staleRadio);
 assert.equal(backupUI().querySelector('input[type=checkbox]').checked,false);
 assert.equal(downloads.length,downloadCount);
 assert.match(backupUI().textContent,/变化|改变|更新/);
 // Storage failure leaves the visible session mounted and stored records rolled back.
 await act(async()=>backupUI().querySelector('input[type=checkbox]').click());
 const storagePrototype=Object.getPrototypeOf(window.localStorage),setItem=storagePrototype.setItem;
 let failed=false;
 storagePrototype.setItem=function(k,v){if(k===key('d2')&&!failed){failed=true;throw Error('simulated quota failure')}return setItem.call(this,k,v)};
 try{await act(async()=>restoreButton().click())}finally{storagePrototype.setItem=setItem}
 assert(failed);assert.deepEqual(snapshot(),beforeStale);assert.equal(radios('d1')[0],staleRadio);
 assert.match(backupUI().textContent,/失败|未完成/);
 assert.deepEqual(errors,[]);
 assert(downloads.every(name=>name.includes('-before-restore-')));
 console.log(JSON.stringify({status:'PASS',invalidFileNoMutation:true,previewNoWrites:true,defaultConflictPreserved:true,immediateQuizRefresh:days,immediateReviewRefresh:reviewTitles.length,bridgeDayRestored:true,allElevenRecordsPreserved:true,postRestoreNavigationPreservesAnswers:true,stalePreviewGuard:true,failedWriteRollbackNoRemount:true,statusFocused:true,scope:'React/jsdom; download initiation stubbed, no real file download/browser/mobile verification'},null,2));
}finally{
 await act(async()=>root.unmount());console.error=oldError;
 window.HTMLAnchorElement.prototype.click=oldClick;URL.createObjectURL=oldCreate;URL.revokeObjectURL=oldRevoke;dom.window.close();
}
