import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {FOUNDATION_BACKUP_KEYS as keys,FOUNDATION_BACKUP_LIMIT,createFoundationBackup,parseFoundationBackup,inspectFoundationBackup,restoreFoundationBackup} from '../lib/foundation-backup.mjs';
const json=name=>JSON.parse(readFileSync(new URL('../data/'+name+'.json',import.meta.url)));
function storage(initial=[]){const records=new Map(initial);return {records,getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,v),removeItem:k=>records.delete(k)}}
const raw=(n=1)=>JSON.stringify({version:1,unit:n,checks:{},answers:{}});
function fixture(){
 const records={};
 for(const key of keys){
  const module=key.split('.')[2],quiz=module.endsWith('-quiz');
  if (module==='bridge') {records[key]=raw(21);continue;}
  const data=json(module==='study'?'foundation-study':'foundation-'+module.replace('-review',''));
  const q=quiz?data.questions.at(-1):module==='study'?data.questions.at(-1):data.units.at(-1).questions.at(-1);
  const value=module==='study'?{version:1,pace:4,period:4,checks:{},answers:{}}:{version:1,unit:quiz?data.questions.length:data.units.at(-1).number,checks:{},answers:{}};
  value.answers[q.id]={first:(q.answer+1)%4,latest:q.answer};records[key]=JSON.stringify(value);
 }
 return {format:'somm100-foundation-backup',version:1,exportedAt:'2026-11-05T15:40:00.000Z',records};
}
test('all eleven Foundation records round-trip exact first/latest answers and selected final units',()=>{
 const backup=fixture(),from=storage(Object.entries(backup.records)),out=createFoundationBackup(from,new Date(backup.exportedAt));
 assert.deepEqual(out,backup);assert.equal(Object.keys(out.records).length,11);
 const to=storage([['other-course','do not touch']]);
 assert.equal(restoreFoundationBackup(to,JSON.stringify(out)).written,11);
 for(const key of keys)assert.equal(to.getItem(key),from.getItem(key));
 assert.equal(to.getItem('other-course'),'do not touch');
});
test('partial version1 backup only fills empty records by default, preserving conflicts and absent keys',()=>{
 const s=storage([[keys[0],raw(8)],[keys[2],raw(9)]]);
 const backup={...fixture(),records:{[keys[0]]:raw(2),[keys[1]]:raw(3)}};
 const before=Array.from(s.records);const plan=inspectFoundationBackup(s,backup);
 assert.deepEqual(Array.from(s.records),before);assert.equal(plan.added,1);assert.equal(plan.conflicts,1);
 const result=restoreFoundationBackup(s,backup);assert.equal(result.written,1);assert.equal(result.skipped,1);
 assert.equal(s.getItem(keys[0]),raw(8));assert.equal(s.getItem(keys[1]),raw(3));assert.equal(s.getItem(keys[2]),raw(9));
});
test('explicit replacement returns exact recovery snapshot and never deletes records omitted by file',()=>{
 const s=storage([[keys[0],raw(8)],[keys[2],raw(9)]]);
 const result=restoreFoundationBackup(s,{...fixture(),records:{[keys[0]]:raw(2)}},{replaceExisting:true});
 assert.equal(result.before.records[keys[0]],raw(8));assert.equal(result.written,1);assert.equal(s.getItem(keys[0]),raw(2));assert.equal(s.getItem(keys[2]),raw(9));
});
test('foreign keys, future versions, corrupt records and legacy global exports cause zero writes',()=>{
 for(const bad of ['{broken',{exportedAt:'old',attempts:[]},{...fixture(),version:9},{...fixture(),records:{'somm100-device-test':'private'}},{...fixture(),records:{[keys[0]]:'{bad'}},{...fixture(),records:{[keys[0]]:'{"version":2,"checks":{},"answers":{}}'}}]){
  const s=storage([[keys[0],raw(1)]]),before=Array.from(s.records);assert.throws(()=>restoreFoundationBackup(s,bad));assert.deepEqual(Array.from(s.records),before);
 }
});
test('blocked read and future local records stop restore before any write',()=>{
 const s=storage([[keys[0],'{"version":8,"checks":{},"answers":{}}']]);
 assert.throws(()=>restoreFoundationBackup(s,fixture(),{replaceExisting:true}));assert.equal(s.records.size,1);
 assert.throws(()=>createFoundationBackup({getItem:()=>{throw Error('blocked')}}));
});
test('failed second write rolls back earlier writes and retains unrelated records',()=>{
 const s=storage([[keys[0],raw(9)],['unrelated','keep']]);const before=Array.from(s.records);let writes=0;
 const original=s.setItem;s.setItem=(k,v)=>{if(++writes===2)throw Error('quota');return original(k,v)};
 assert.throws(()=>restoreFoundationBackup(s,{...fixture(),records:{[keys[0]]:raw(2),[keys[1]]:raw(3)}},{replaceExisting:true}),/已回退/);
 assert.deepEqual(Array.from(s.records),before);
});
test('rollback failure is reported explicitly instead of claiming intact original data',()=>{
 const s=storage([[keys[0],raw(9)]]);s.setItem=()=>{throw Error('blocked')};
 assert.throws(()=>restoreFoundationBackup(s,{...fixture(),records:{[keys[0]]:raw(2)}},{replaceExisting:true}),/部分回退未能完成/);
});
test('oversized backup is rejected and identical records are not rewritten',()=>{
 assert.throws(()=>parseFoundationBackup(' '.repeat(FOUNDATION_BACKUP_LIMIT+1)),/过大/);
 const s=storage([[keys[0],raw(2)]]);s.setItem=()=>{throw Error('must not write')};
 assert.equal(restoreFoundationBackup(s,{...fixture(),records:{[keys[0]]:raw(2)}}).written,0);
});
