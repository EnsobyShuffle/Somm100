export type ChapterPlan = {
  startDate: string; targetDate: string; reminderEnabled: boolean; remindAt: string;
  updatedAt: string; revision: number; calendarUid: string; acknowledgedAt?: string;
};
export type ChapterPlans = Record<string, ChapterPlan>;
export function validDay(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number(value.slice(0,4)) >= 1900 && Number(value.slice(0,4)) <= 9999 &&
    Number.isFinite(Date.parse(value+'T00:00:00Z')) && new Date(value+'T00:00:00Z').toISOString().slice(0,10) === value;
}
export function chinaDateTime(date: Date) { return new Date(date.getTime()+8*3600000).toISOString().slice(0,16); }
export function validateChapterPlan(input: any) {
  if (!input || typeof input.startDate !== 'string' || typeof input.targetDate !== 'string' || typeof input.reminderEnabled !== 'boolean' || typeof input.remindAt !== 'string') throw Error('请检查章节学习安排');
  for (const day of [input.startDate,input.targetDate]) if (day && !validDay(day)) throw Error('请输入有效的日期');
  if (input.startDate && input.targetDate && input.startDate > input.targetDate) throw Error('目标完成日期不能早于开始日期');
  const moment = input.remindAt ? new Date(input.remindAt) : null;
  if (moment && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(input.remindAt) || !Number.isFinite(moment.getTime()) || moment.toISOString() !== input.remindAt)) throw Error('请输入有效的提醒时间');
  if (input.reminderEnabled && !moment) throw Error('请先选择提醒日期与时间');
  const reminderDay = moment ? chinaDateTime(moment).slice(0,10) : '';
  if (input.reminderEnabled && input.startDate && reminderDay < input.startDate) throw Error('提醒日期不能早于开始日期');
  if (input.reminderEnabled && input.targetDate && reminderDay > input.targetDate) throw Error('提醒日期不能晚于目标完成日期');
  return {startDate:input.startDate,targetDate:input.targetDate,reminderEnabled:input.reminderEnabled,remindAt:moment ? moment.toISOString() : ''};
}
export function chapterProgress(module: any, state: any) {
  const readings = new Set(state.readings || []), completed = new Set(state.completed || []), checks = new Set(state.checks || []);
  const attempts = new Set((state.attempts || []).map((a:any)=>a.question_id));
  const groups = [
    {label:'核心阅读',ids:module.resources.core.sections.filter((s:any)=>s.track).map((s:any)=>s.id),done:readings},
    {label:'知识延伸',ids:module.lessonIds,done:completed},
    {label:'练习作答',ids:module.questionIds,done:attempts},
    {label:'成果检查',ids:module.checklistIds,done:checks}
  ].map(g=>{const ids=[...new Set<string>(g.ids)];return {label:g.label,total:ids.length,done:ids.filter(id=>g.done.has(id)).length};});
  const total=groups.reduce((n,g)=>n+g.total,0),done=groups.reduce((n,g)=>n+g.done,0);
  return {groups,total,done,percent:total ? Math.floor(done/total*100) : 0,complete:total>0 && done===total};
}
export function dueChapterPlans(modules: any[], state: any, now = new Date()) {
  return modules.filter(m=>{
    const p:ChapterPlan|undefined=state.chapterPlans?.[m.id];
    return p?.reminderEnabled && !p.acknowledgedAt && p.remindAt && Number.isFinite(Date.parse(p.remindAt)) && Date.parse(p.remindAt)<=now.getTime() && !chapterProgress(m,state).complete;
  }).sort((a,b)=>state.chapterPlans[a.id].remindAt.localeCompare(state.chapterPlans[b.id].remindAt));
}
const escapeText=(s:string)=>s.replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
const stamp=(s:string)=>new Date(s).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
export function chapterCalendar(module:any, plan:ChapterPlan, url:string) {
  const p=validateChapterPlan(plan);
  if (!p.reminderEnabled || !p.remindAt) throw Error('请先保存已开启的章节提醒');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SOMM100//Chapter Study//ZH','CALSCALE:GREGORIAN','BEGIN:VEVENT',
    'UID:'+plan.calendarUid+'@somm100.local','SEQUENCE:'+plan.revision,'DTSTAMP:'+stamp(plan.updatedAt),'DTSTART:'+stamp(p.remindAt),'DURATION:PT30M',
    'SUMMARY:'+escapeText('SOMM100 · '+module.title),
    'DESCRIPTION:'+escapeText('按自己的节奏继续本章学习。'+(p.targetDate?'目标完成日期：'+p.targetDate+'。':'')+'\n'+url),
    'URL:'+url,'BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:'+escapeText('学习提醒 · '+module.title),'END:VALARM','END:VEVENT','END:VCALENDAR',''];
  return lines.map(line=>{let folded='',length=0;for(const char of line){const bytes=new TextEncoder().encode(char).length;if(length+bytes>75){folded+='\r\n ';length=1;}folded+=char;length+=bytes;}return folded;}).join('\r\n');
}
