'use client';
import React,{useState} from 'react';
import {FOUNDATION_BACKUP_LIMIT,assertFoundationBackupSnapshot,createFoundationBackup,inspectFoundationBackup,restoreFoundationBackup} from '../lib/foundation-backup.mjs';
const h=React.createElement;
function downloadBackup(backup,suffix=''){
  const url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download=`somm100-foundation${suffix}-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export default function FoundationBackup({onRestored}={}){
  const [preview,setPreview]=useState(null),[replace,setReplace]=useState(false),[message,setMessage]=useState(''),[restored,setRestored]=useState(false),[reading,setReading]=useState(false);
  async function readFile(event){
    const file=event.target.files?.[0];event.target.value='';setPreview(null);setReplace(false);setMessage('');if(!file)return;
    setReading(true);
    try{
      if(file.size>FOUNDATION_BACKUP_LIMIT)throw Error('备份文件过大。');
      const plan=inspectFoundationBackup(window.localStorage,await file.text());setPreview(plan);
    }catch(e){setMessage(e.message||'无法读取备份。')}
    finally{setReading(false)}
  }
  return h('details',{className:'white-panel foundation-study',id:'foundation-backup'},
    h('summary',null,'备份／恢复本机课程进度'),
    h('p',null,'包含课前预习、D1–D4 与法国专题复习、四套课程自测和桥接学习日。只处理本浏览器的课程记录；下载后可在另一浏览器或新域名的同一功能中恢复。'),
    h('p',{className:'fine-print'},'这份备份不含其他课程、品鉴、笔记和自由题库记录。旧版“导出我的记录”文件不含这里的课程进度，不能在此恢复。'),
    h('div',{className:'button-row'},h('button',{type:'button',className:'button secondary',disabled:restored||reading,onClick:()=>{
      try{const backup=createFoundationBackup(window.localStorage);downloadBackup(backup);setMessage(`已发起下载，包含 ${Object.keys(backup.records).length} 组记录，请确认文件已保存。`)}catch(e){setMessage(e.message||'下载未完成。')}
    }},'下载课程备份'),h('label',null,'选择课程备份文件',h('input',{type:'file',accept:'.json,application/json',disabled:restored||reading,onChange:readFile}))),
    reading&&h('p',{role:'status'},'正在读取文件…'),
    preview&&!restored&&h('div',null,
      h('p',null,`备份包含 ${preview.items.length} 组记录：本机空白 ${preview.added} 组，内容相同 ${preview.same} 组，已有不同记录 ${preview.conflicts} 组。尚未写入。`),
      h('label',{className:'foundation-check'},h('input',{type:'checkbox',checked:replace,onChange:e=>setReplace(e.target.checked)}),'替换本机已有的不同记录（默认保留）'),
      h('p',{className:'fine-print'},'恢复时先下载本机现状备份，再写入所选记录；文件未包含的记录保持原样。'),
      h('div',{className:'button-row'},h('button',{type:'button',className:'button',disabled:!preview.items.length,onClick:()=>{
        try{
          assertFoundationBackupSnapshot(window.localStorage,preview.snapshot);
          const before=createFoundationBackup(window.localStorage);downloadBackup(before,'-before-restore');
          const result=restoreFoundationBackup(window.localStorage,preview.backup,{replaceExisting:replace,expectedSnapshot:preview.snapshot});
          setMessage(`已恢复 ${result.written} 组，保留／跳过 ${result.skipped} 组。请确认恢复前备份已下载。`);setRestored(true);
          onRestored?.(result);
        }catch(e){
          if(e.code==='FOUNDATION_PREVIEW_CHANGED'){
            setReplace(false);
            try{setPreview(inspectFoundationBackup(window.localStorage,preview.backup))}
            catch{setPreview(null)}
          }
          setMessage(e.message||'恢复未完成。')
        }
      }},'恢复所选记录'),h('button',{type:'button',className:'button secondary',onClick:()=>{setPreview(null);setReplace(false)}},'取消'))),
    message&&h('p',{role:'status'},message),
    restored&&h('button',{type:'button',className:'button',onClick:()=>window.location.reload()},'刷新并读取恢复记录'));
}
