'use client';
import {useEffect,useState} from 'react';
import {Bell,CalendarDays,Check,X} from 'lucide-react';
import {chapterProgress,chapterCalendar,chinaDateTime,dueChapterPlans,type ChapterPlan as Plan} from '../lib/chapter-plan';
import {cmsHref} from '../lib/cms-navigation';
import cmsData from '../data/cms-learning.json';

export function ChapterProgress({module,state}:{module:any,state:any}) {
  const p=chapterProgress(module,state);
  return <div className="chapter-progress"><div className="chapter-progress-heading"><span>章节完成进度</span><strong>{p.percent}%</strong></div><progress aria-label={'Module '+module.number+' 章节完成进度'} value={p.done} max={p.total||1}/><div className="chapter-progress-parts">{p.groups.map(g=><span key={g.label}>{g.label} {g.done}/{g.total}</span>)}</div><small>按完成项计算；练习计已作答题数，不代表正确率。</small></div>;
}
function PlanEditor({module,plan,save,onClose}:{module:any,plan?:Plan,save:any,onClose:()=>void}) {
  const [startDate,setStartDate]=useState(plan?.startDate||''),[targetDate,setTargetDate]=useState(plan?.targetDate||'');
  const [enabled,setEnabled]=useState(plan?.reminderEnabled||false),[time,setTime]=useState(plan?.remindAt?chinaDateTime(new Date(plan.remindAt)):'');
  const [busy,setBusy]=useState(false),[error,setError]=useState('');
  async function submit(e:React.FormEvent) {
    e.preventDefault();setError('');
    const moment=time?new Date(time+':00+08:00'):null;
    if(moment&&!Number.isFinite(moment.getTime())){setError('请输入有效的提醒时间');return;}
    setBusy(true);
    const result=await save({type:'chapter-plan',moduleId:module.id,plan:{startDate,targetDate,reminderEnabled:enabled,remindAt:moment?moment.toISOString():''}},'章节学习安排已保存');
    setBusy(false);if(result)onClose();else setError('未保存，请检查日期和上方提示后重试。');
  }
  async function clear() {setBusy(true);const result=await save({type:'chapter-plan',moduleId:module.id,plan:null},'已清除本章时间安排，学习进度保留');setBusy(false);if(result)onClose();else setError('未清除，请重试。');}
  return <form className="chapter-plan-form" onSubmit={submit} aria-label={'Module '+module.number+' 学习安排'}>
    <div className="chapter-plan-fields"><label>开始日期（选填）<input type="date" value={startDate} max={targetDate||undefined} onChange={e=>setStartDate(e.target.value)}/></label><label>目标完成日期（选填）<input type="date" value={targetDate} min={startDate||undefined} onChange={e=>setTargetDate(e.target.value)}/></label></div>
    <label className="chapter-plan-toggle"><input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)}/>开启本章学习提醒</label>
    {enabled&&<label>提醒日期与时间 · 北京时间<input type="datetime-local" required value={time} min={startDate?startDate+'T00:00':undefined} max={targetDate?targetDate+'T23:59':undefined} onChange={e=>setTime(e.target.value)}/></label>}
    <p className="fine-print">日期可以留空、随时调整。提醒在 App 打开时出现；关闭页面后，可将已保存的提醒加入手机日历。</p>
    {error&&<p className="chapter-plan-error" role="alert">{error}</p>}
    <div className="button-row"><button type="submit" className="button" disabled={busy}><Check size={15}/>{busy?'保存中…':'保存安排'}</button><button type="button" className="chip" disabled={busy} onClick={onClose}>取消</button>{plan&&<button type="button" className="text-button" disabled={busy} onClick={clear}>清除安排</button>}</div>
  </form>;
}
export function ChapterPlan({module,state,save}:{module:any,state:any,save:any}) {
  const plan:Plan|undefined=state.chapterPlans?.[module.id];const [editing,setEditing]=useState(false),[message,setMessage]=useState('');
  const p=chapterProgress(module,state),today=chinaDateTime(new Date()).slice(0,10);
  const status=p.complete?'已完成':plan?.targetDate&&plan.targetDate<today?'已过目标日期，可调整':p.done?'学习中':plan?.startDate&&plan.startDate>today?'已安排':'尚未开始';
  function calendar() {
    try {const content=chapterCalendar(module,plan!,location.origin+'/'+cmsHref(module.id)),blob=new Blob([content],{type:'text/calendar;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='SOMM100-'+module.id+'-reminder.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage('请打开下载的文件并导入手机日历。');}catch(e){setMessage((e as Error).message);}
  }
  return <section className="chapter-plan" aria-label={'Module '+module.number+' 进度与时间安排'}>
    <ChapterProgress module={module} state={state}/>
    <div className="chapter-plan-top"><span className="chapter-plan-status">{status}</span><button className="text-button" aria-expanded={editing} onClick={()=>setEditing(!editing)}><CalendarDays size={15}/>{editing?'收起':plan?'调整时间':'设置学习时间'}</button></div>
    {plan&&(plan.startDate||plan.targetDate)&&<p className="chapter-plan-dates">{plan.startDate&&<span>开始 {plan.startDate}</span>}{plan.targetDate&&<span>目标完成 {plan.targetDate}</span>}</p>}
    {plan?.reminderEnabled&&plan.remindAt&&<div className="chapter-plan-reminder"><p><Bell size={14}/>{chinaDateTime(new Date(plan.remindAt)).replace('T',' ')} · 北京时间{plan.acknowledgedAt?' · 已处理':''}{p.complete?' · 本章已完成，不再提示':''}</p>{!p.complete&&<button className="text-button" onClick={calendar}>加入手机日历</button>}<small>日历事件独立保存；修改或关闭这里的提醒后，请同步调整日历。</small></div>}
    {editing&&<PlanEditor key={module.id+String(plan?.revision||0)} module={module} plan={plan} save={save} onClose={()=>setEditing(false)}/>}
    {message&&<p className="fine-print" role="status">{message}</p>}
  </section>;
}
export function ChapterReminders({state,save,go}:{state:any,save:any,go:any}) {
  const [now,setNow]=useState(()=>new Date()),[busy,setBusy]=useState('');
  useEffect(()=>{const tick=()=>{if(document.visibilityState==='visible')setNow(new Date());};const timer=setInterval(tick,30000);document.addEventListener('visibilitychange',tick);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',tick);};},[]);
  const due=dueChapterPlans(cmsData.modules,state,now);
  async function acknowledge(module:any,start=false){setBusy(module.id);const r=await save({type:'chapter-reminder-seen',moduleId:module.id});setBusy('');if(r&&start)go(cmsHref(module.id).slice(1));}
  if(!due.length)return null;
  return <aside className="chapter-reminders" aria-label="到期的章节学习提醒"><div className="chapter-reminders-title"><Bell size={17}/><strong>章节学习提醒</strong><span>{due.length} 章</span></div>{due.map(m=><div className="chapter-reminder-item" key={m.id}><div><b>Module {m.number} · {m.title}</b><small>计划时间 {chinaDateTime(new Date(state.chapterPlans[m.id].remindAt)).replace('T',' ')} · 已完成 {chapterProgress(m,state).percent}%</small></div><div className="button-row"><button className="chip" disabled={!!busy} onClick={()=>acknowledge(m,true)}>开始学习</button><button className="text-button" disabled={!!busy} onClick={()=>acknowledge(m)}>知道了 <X size={13}/></button></div></div>)}</aside>;
}
