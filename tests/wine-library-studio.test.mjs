import assert from 'node:assert/strict';
import {test} from 'node:test';
import {loadTypeScript} from './load-typescript.mjs';
const {readStudio,writeStudio,upsertStudioEntry,studioStorageKey}=await loadTypeScript('../lib/wine-library-studio.ts');
const legacy={kind:'region',values:{name:'Bourgogne',sources:'Source retained'},completed:false,updatedAt:'2026-10-30T16:56:41Z'};
test('previous workbench records retain values and library completion after editing',()=>{
 const state=readStudio(JSON.stringify({entries:[legacy],libraryDone:{region:true}}));
 assert.equal(state.entries[0].values.sources,'Source retained');
 const changed={...state.entries[0],completed:true,values:{...state.entries[0].values,overview:'Updated'}};
 state.entries=upsertStudioEntry(state.entries,changed);
 assert.equal(state.entries.length,1);
 const values=new Map();writeStudio({setItem:(k,v)=>values.set(k,v)},state);
 assert.deepEqual(readStudio(values.get(studioStorageKey)),state);
 assert.equal(state.libraryDone.region,true);
 assert.equal(readStudio(JSON.stringify([legacy])).entries.length,1);
});
test('unreadable records and failed writes are reported without silently replacing old data',()=>{
 assert.throws(()=>readStudio('{broken'));
 assert.throws(()=>readStudio(JSON.stringify({entries:[{...legacy,values:null}]})));
 const state=readStudio(JSON.stringify([legacy])),before=JSON.stringify(state);
 assert.throws(()=>writeStudio({setItem:()=>{throw Error('quota')}},state),/quota/);
 assert.equal(JSON.stringify(state),before);
 let writes=0;
 assert.throws(()=>writeStudio({setItem:()=>writes++},{entries:[legacy],libraryDone:{region:'true'}}));
 assert.equal(writes,0);
});
