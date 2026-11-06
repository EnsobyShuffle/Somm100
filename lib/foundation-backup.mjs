import {FOUNDATION_STORAGE_KEY} from './foundation-study.mjs';
import {D1_STORAGE_KEY} from './foundation-d1.mjs';
import {D2_STORAGE_KEY} from './foundation-d2.mjs';
import {FRANCE_STORAGE_KEY} from './foundation-france.mjs';
import {D1_QUIZ_STORAGE_KEY,D2_QUIZ_STORAGE_KEY,D3_QUIZ_STORAGE_KEY,D4_QUIZ_STORAGE_KEY} from './foundation-quiz.mjs';
export const FOUNDATION_BRIDGE_KEY = 'somm100.foundation.bridge.v1';
export const FOUNDATION_BACKUP_KEYS=Object.freeze([FOUNDATION_STORAGE_KEY,D1_STORAGE_KEY,D2_STORAGE_KEY,FRANCE_STORAGE_KEY,
  'somm100.foundation.d3-review.v1','somm100.foundation.d4-review.v1',D1_QUIZ_STORAGE_KEY,D2_QUIZ_STORAGE_KEY,D3_QUIZ_STORAGE_KEY,D4_QUIZ_STORAGE_KEY,FOUNDATION_BRIDGE_KEY]);
export const FOUNDATION_BACKUP_LIMIT=2*1024*1024;
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
function record(raw){
  if(typeof raw!=='string')throw Error('备份记录格式不正确。');
  let value;try{value=JSON.parse(raw)}catch{throw Error('记录内容无法读取，已保留原数据。')}
  if(!object(value)||value.version!==1||!object(value.checks)||!object(value.answers))throw Error('记录版本或结构不受支持，已保留原数据。');
  return raw;
}
export function parseFoundationBackup(input){
  const text=typeof input==='string'?input:JSON.stringify(input);
  if(typeof text!=='string'||new TextEncoder().encode(text).length>FOUNDATION_BACKUP_LIMIT)throw Error('备份文件过大。');
  let value;try{value=JSON.parse(text)}catch{throw Error('这不是可读取的 JSON 备份。')}
  if(!object(value)||value.format!=='somm100-foundation-backup'||value.version!==1||!object(value.records))throw Error('请选择 SOMM100 课程专用备份；旧版全站记录文件不能在此恢复。');
  const records={};
  for(const [key,raw] of Object.entries(value.records)){
    if(!FOUNDATION_BACKUP_KEYS.includes(key))throw Error('备份含有课程范围以外的记录，未作修改。');
    records[key]=record(raw);
  }
  return {format:value.format,version:1,exportedAt:typeof value.exportedAt==='string'?value.exportedAt:'',records};
}
export function createFoundationBackup(storage,now=new Date()){
  const records={};
  for(const key of FOUNDATION_BACKUP_KEYS){const raw=storage.getItem(key);if(raw!==null)records[key]=record(raw)}
  return parseFoundationBackup({format:'somm100-foundation-backup',version:1,exportedAt:now.toISOString(),records});
}
export function inspectFoundationBackup(storage,input){
  const backup=parseFoundationBackup(input);
  const snapshot=Object.fromEntries(FOUNDATION_BACKUP_KEYS.map(key=>[key,storage.getItem(key)]));
  const items=Object.entries(backup.records).map(([key,raw])=>{
    const current=snapshot[key];
    return {key,raw,current,status:current===null?'new':current===raw?'same':'conflict'};
  });
  return {backup,snapshot,items,added:items.filter(x=>x.status==='new').length,same:items.filter(x=>x.status==='same').length,conflicts:items.filter(x=>x.status==='conflict').length};
}
export function assertFoundationBackupSnapshot(storage,snapshot){
  if(!object(snapshot)||FOUNDATION_BACKUP_KEYS.some(key=>
    !Object.hasOwn(snapshot,key)||storage.getItem(key)!==snapshot[key])){
    const error=Error('本机课程记录已变化，尚未恢复。请查看更新后的预览，再决定是否替换。');
    error.code='FOUNDATION_PREVIEW_CHANGED';throw error;
  }
}
export function restoreFoundationBackup(storage,input,{replaceExisting=false,expectedSnapshot}={}){
  // The UI supplies its preview snapshot. Refuse stale replacement decisions.
  if(expectedSnapshot!==undefined)assertFoundationBackupSnapshot(storage,expectedSnapshot);
  const plan=inspectFoundationBackup(storage,input);
  // Validate and capture the current records before making any write.
  const before=createFoundationBackup(storage);
  const changes=plan.items.filter(x=>x.status==='new'||(replaceExisting&&x.status==='conflict'));
  const attempted=[];
  try{
    for(const item of changes){attempted.push(item);storage.setItem(item.key,item.raw)}
  }catch{
    let failed=false;
    for(const item of attempted.reverse())try{if(item.current===null)storage.removeItem(item.key);else storage.setItem(item.key,item.current)}catch{failed=true}
    throw Error(failed?'恢复中断，部分回退未能完成。请保留页面与恢复前备份，不要关闭页面。':'恢复未完成，已回退本次修改；原有记录保留。');
  }
  return {written:changes.length,skipped:plan.items.length-changes.length,before};
}
