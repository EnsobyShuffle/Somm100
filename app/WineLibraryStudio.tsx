'use client';
import React,{useEffect,useMemo,useState} from 'react';
import {Check,Clipboard,FilePlus2,RotateCcw,Sparkles} from 'lucide-react';
import {readStudio,writeStudio,upsertStudioEntry,studioStorageKey,type StudioEntry as Entry} from '../lib/wine-library-studio';
import './wine-library-studio.css';

const kinds=[
 {id:'region',label:'区域',en:'Regions',count:17,fields:[['name','区域名称'],['country','国家'],['overview','区域概况'],['subregions','下辖产区'],['grapes','主要品种'],['sources','来源与链接']]},
 {id:'appellation',label:'法定产区',en:'Appellations',count:362,fields:[['name','产区名称'],['region','所属区域'],['rules','法规与分级'],['grapes','法定品种'],['overview','产区概况'],['sources','法规来源与链接']]},
 {id:'producer',label:'酒庄',en:'Producers',count:604,fields:[['name','酒庄名称'],['appellation','所属产区'],['history','历史与发展'],['vineyards','葡萄园与地块'],['winemaking','种植与酿造'],['wines','代表酒款'],['website','官方网站'],['sources','来源与链接']]},
 {id:'wine',label:'酒款',en:'Individual Wines',count:1036,fields:[['name','酒款名称'],['producer','生产者'],['appellation','产区'],['grapes','葡萄品种'],['vineyard','葡萄园或地块'],['method','种植、酿造与熟成'],['vintage','年份信息（如适用）'],['sources','来源与链接']]},
 {id:'grape',label:'葡萄品种',en:'Grape Varieties',count:72,fields:[['name','品种名称'],['aliases','别名与拼写'],['color','颜色与类别'],['regions','主要产区'],['profile','品种特征'],['sources','来源与链接']]},
];
const blankValues=(kind:string)=>Object.fromEntries((kinds.find(k=>k.id===kind)?.fields||[]).map(([key])=>[key,''])) as Record<string,string>;
export default function WineLibraryStudio(){
 const [kind,setKind]=useState(kinds[0].id),[values,setValues]=useState<Record<string,string>>(blankValues(kinds[0].id)),[completed,setCompleted]=useState(false),[entries,setEntries]=useState<Entry[]>([]),[libraryDone,setLibraryDone]=useState<Record<string,boolean>>({}),[output,setOutput]=useState(''),[notice,setNotice]=useState('');
 const [ready,setReady]=useState(false),[editingId,setEditingId]=useState<string|undefined>();
 const forms=React.useRef<Record<string,{values:Record<string,string>;completed:boolean;editingId?:string}>>({});
 const selected=kinds.find(k=>k.id===kind)!;
 useEffect(()=>{try{const saved=readStudio(localStorage.getItem(studioStorageKey));setEntries(saved.entries);setLibraryDone(saved.libraryDone);setReady(true)}catch{setNotice('本机工作台读取失败，已停止保存以保护原有记录。请保留此浏览器的数据。')}},[]);
 function persist(next:Entry[],done=libraryDone){if(!ready)return false;try{writeStudio(localStorage,{entries:next,libraryDone:done});setEntries(next);setLibraryDone(done);return true}catch{setNotice('保存失败：浏览器存储不可用或空间不足。填写内容仍保留在表单中，请先复制生成的草稿。');return false}}

 const counts=useMemo(()=>Object.fromEntries(kinds.map(k=>[k.id,entries.filter(e=>e.kind===k.id).length])),[entries]);
 const changeKind=(id:string)=>{if(id===kind)return;forms.current[kind]={values,completed,editingId};const saved=forms.current[id];setKind(id);setValues(saved?.values||blankValues(id));setCompleted(saved?.completed||false);setEditingId(saved?.editingId);setOutput('');setNotice('')};
 const saveEntry=()=>{if(!values.name?.trim()){setNotice('先填写名称，再保存条目。');return}const id=editingId||(typeof crypto.randomUUID==='function'?crypto.randomUUID():Array.from(crypto.getRandomValues(new Uint32Array(4)),n=>n.toString(16)).join('-'));const next=upsertStudioEntry(entries,{id,kind,values:{...values},completed,updatedAt:new Date().toISOString()});if(persist(next)){setEditingId(id);setNotice('条目已保存在当前浏览器。')}};
 const toggleLibraryDone=(id:string,checked:boolean)=>{if(persist(entries,{...libraryDone,[id]:checked}))setNotice('本库完成状态已保存。')};
 const toggleEntry=(id:string,checked:boolean)=>{const next=entries.map(e=>e.id===id?{...e,completed:checked,updatedAt:new Date().toISOString()}:e);if(persist(next)){if(editingId===id)setCompleted(checked);for(const form of Object.values(forms.current))if(form.editingId===id)form.completed=checked;setNotice('条目完成状态已保存。')}};
 const editEntry=(entry:Entry)=>{forms.current[kind]={values,completed,editingId};setKind(entry.kind);setValues({...entry.values});setCompleted(entry.completed);setEditingId(entry.id);setOutput('');setNotice('正在编辑已保存条目。')};
 const generate=()=>{const body=selected.fields.map(([key,label])=>values[key]?.trim()?`### ${label}\n${values[key].trim()}`:null).filter(Boolean).join('\n\n');if(!values.name?.trim()){setNotice('先填写名称，再生成内容。');return}setOutput(`# ${values.name.trim()}\n\n${body}\n\n---\n审核状态：${completed?'已完成初审':'待审核'}\n内容类型：${selected.label}\n生成时间：${new Date().toLocaleString('zh-CN')}`);setNotice('已根据你填写的信息生成内容草稿；请核对来源与事实后再发布。');};
 const copy=async()=>{try{await navigator.clipboard.writeText(output);setNotice('生成内容已复制。')}catch{setNotice('复制失败，请手动选择并复制内容。')}};
 const reset=()=>{setValues(blankValues(kind));setCompleted(false);setOutput('');setEditingId(undefined);setNotice('已清空当前编辑内容，已保存的条目仍保留。')};
 return <section className="wl-studio white-panel">
  <div className="wl-studio-heading"><div><span className="eyebrow">WINE LIBRARY · CONTENT WORKSPACE</span><h2>Wine Library 内容工作台</h2><p>五类主表同屏查看；填写条目信息、标记完成状态，并生成可审核的内容草稿。</p></div><span className="wl-snapshot">法国基线快照 · 2026.10.27</span></div>
  <div className="wl-studio-cards">{kinds.map((k,i)=><div key={k.id} className={'wl-studio-card '+(kind===k.id?'active':'')}><button type="button" className="wl-studio-card-select" onClick={()=>changeKind(k.id)} aria-pressed={kind===k.id}><span className="wl-studio-card-top"><span>0{i+1} / {k.en}</span>{kind===k.id&&<Check size={15}/>}</span><b>{k.label}</b><span className="wl-studio-card-count">{k.count.toLocaleString()} <small>条基线记录</small></span></button><span className="wl-studio-card-meta">本工作台新增 {counts[k.id]||0} 条 · {entries.some(e=>e.kind===k.id&&e.completed)?'有已完成条目':'暂无已完成条目'}</span><label className="wl-library-done"><input type="checkbox" disabled={!ready} checked={!!libraryDone[k.id]} onChange={e=>toggleLibraryDone(k.id,e.target.checked)}/>{libraryDone[k.id]?'本库盘点已完成':'标记本库已完成'}</label></div>)}</div>
  <div className="wl-studio-editor"><div className="wl-studio-editor-head"><div><span className="eyebrow">{selected.en.toUpperCase()}</span><h3>填写{selected.label}资料</h3></div><button className="text-button" type="button" onClick={reset}><RotateCcw size={15}/> 清空当前表单</button></div>
   <div className="wl-studio-fields">{selected.fields.map(([key,label])=><label className="answer-label" key={key}>{label}{key==='name'||key==='website'?<input value={values[key]||''} onChange={e=>setValues({...values,[key]:e.target.value})} placeholder={`填写${label}`}/>:<textarea rows={key==='sources'?2:3} value={values[key]||''} onChange={e=>setValues({...values,[key]:e.target.value})} placeholder={`填写${label}；没有核实的信息先留空`}/>}</label>)}</div>
   <label className="wl-complete-toggle"><input type="checkbox" checked={completed} onChange={e=>setCompleted(e.target.checked)}/><span><b>本条资料已完成</b><small>仅表示本条填写工作完成；发布前仍需来源核查和审核。</small></span></label>
   <div className="button-row"><button className="button" type="button" disabled={!ready} onClick={saveEntry}><FilePlus2 size={16}/> {editingId?'保存修改':'保存条目'}</button><button className="button secondary" type="button" onClick={generate}><Sparkles size={16}/> 生成内容</button></div>
   {notice&&<p className="wl-studio-notice" role="status">{notice}</p>}
   {output&&<section className="wl-generated"><div><div><span className="eyebrow">GENERATED DRAFT</span><h3>生成的内容草稿</h3></div><button className="chip" type="button" onClick={copy}><Clipboard size={14}/> 复制</button></div><pre>{output}</pre></section>}
   {entries.length>0&&<details className="wl-studio-saved" open><summary>本机已保存的条目 · {entries.length}</summary><div>{entries.map(e=><div className="wl-saved-entry" key={e.id}><label><input type="checkbox" disabled={!ready} checked={e.completed} onChange={event=>toggleEntry(e.id,event.target.checked)} aria-label={e.values.name+' 已完成'}/><b>{e.values.name}</b></label><small>{kinds.find(k=>k.id===e.kind)?.label} · {e.completed?'已完成':'未完成'}</small><button className="text-button" onClick={()=>editEntry(e)}>继续填写</button></div>)}</div></details>}
   <p className="fine-print">基线数量为 Notion 法国数据的历史快照，不代表当前实时同步或审核通过数量。此工作台保存至当前浏览器；生成内容不会自动发布到网站或回写 Notion。</p>
  </div>
 </section>
}
