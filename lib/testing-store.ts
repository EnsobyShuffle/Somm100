import {curriculum,grade,scheduleReview} from './learning';
import {chinaDay,defaultSettings,streakFor,validateSettings,validateVideo} from './habits';
import cmsData from '../data/cms-learning.json';
import {validateChapterPlan,type ChapterPlans} from './chapter-plan';
const KEY='somm100-device-test-v1';
const id=()=>typeof crypto.randomUUID==='function'?crypto.randomUUID():'test-'+Date.now()+'-'+Math.random().toString(36).slice(2);
export function newTestState(){return {chapterPlans:{} as ChapterPlans,readings:[] as string[],checks:[] as string[],dismissed:[] as string[],completed:[] as string[],completionDates:{} as Record<string,string>,attempts:[] as any[],reviews:[] as any[],bookmarks:[] as string[],training:[] as any[],drafts:[] as any[],settings:{...defaultSettings},sessions:[] as any[],checkins:[] as string[],videos:[] as any[]}}
export function testView(s:ReturnType<typeof newTestState>,path:string,now=new Date()):any{
 if(path==='/api/learning')return {chapterPlans:s.chapterPlans||{},readings:s.readings||[],checks:s.checks||[],dismissed:s.dismissed||[],user:{name:'免登录测试',preview:true},completed:s.completed,attempts:s.attempts,reviews:s.reviews,bookmarks:s.bookmarks,training:s.training,drafts:s.drafts};
 const today=chinaDay(now),days:Record<string,number>={};for(const x of s.sessions)days[x.day]=(days[x.day]||0)+x.seconds;
 const todaySeconds=days[today]||0;
 return {settings:s.settings,studyDays:Object.entries(days).map(([day,seconds])=>({day,seconds})).sort((a,b)=>b.day.localeCompare(a.day)),checkins:s.checkins,videos:s.videos,today,todaySeconds,totalSeconds:Object.values(days).reduce((a,b)=>a+b,0),streak:streakFor(s.checkins,today),canCheckIn:todaySeconds>=60||Object.values(s.completionDates).includes(today)||[...s.attempts,...s.training].some(a=>chinaDay(new Date(a.created_at))===today)};
}
export function applyTestAction(s:ReturnType<typeof newTestState>,path:string,b:any,now=new Date()):any{
 const stamp=now.toISOString();let feedback:any=null;
 if(path==='/api/learning'){
  if(b.type==='chapter-plan'||b.type==='chapter-reminder-seen'){
   if(!cmsData.modules.some(m=>m.id===b.moduleId))throw Error('章节不存在');
   s.chapterPlans=s.chapterPlans||{};const previous=s.chapterPlans[b.moduleId];
   if(b.type==='chapter-reminder-seen'){if(previous)previous.acknowledgedAt=stamp;}
   else if(b.plan===null)delete s.chapterPlans[b.moduleId];
   else {const p=validateChapterPlan(b.plan);s.chapterPlans[b.moduleId]={...p,updatedAt:stamp,revision:(previous?.revision||0)+1,calendarUid:previous?.calendarUid||id(),...(previous?.remindAt===p.remindAt&&previous?.reminderEnabled===p.reminderEnabled&&previous?.acknowledgedAt?{acknowledgedAt:previous.acknowledgedAt}:{})};}
  }
  else if(b.type==='read'){if(!curriculum.readings.some(r=>r.id===b.readingId))throw Error('阅读小节不存在');s.readings=s.readings||[];if(!s.readings.includes(b.readingId))s.readings.push(b.readingId);s.completionDates[b.readingId]=chinaDay(now)}
  else if(b.type==='check'){if(!curriculum.checklist.some(k=>k.id===b.knowledgePointId))throw Error('检查项不存在');s.checks=(s.checks||[]).filter(id=>id!==b.knowledgePointId);if(b.active)s.checks.push(b.knowledgePointId)}
  else if(b.type==='complete'){if(!curriculum.lessons.some(l=>l.id===b.lessonId))throw Error('章节不存在');if(!s.completed.includes(b.lessonId))s.completed.push(b.lessonId);s.completionDates[b.lessonId]=chinaDay(now)}
  else if(b.type==='bookmark'){if(!curriculum.questions.some(q=>q.id===b.questionId))throw Error('题目不存在');s.bookmarks=s.bookmarks.filter(q=>q!==b.questionId);if(b.active)s.bookmarks.push(b.questionId)}
  else if(b.type==='dismiss'){if(!curriculum.questions.some(q=>q.id===b.questionId))throw Error('题目不存在');s.dismissed=(s.dismissed||[]).filter(id=>id!==b.questionId);if(b.active)s.dismissed.push(b.questionId)}
  else if(b.type==='answer'){
   const q:any=curriculum.questions.find(q=>q.id===b.questionId);if(!q)throw Error('题目不存在');
   const g=grade(q,b.answer,b.rating),old=s.attempts.find(a=>a.id===b.requestId);if(old&&old.question_id!==q.id)throw Error('答题编号冲突');
   if(!old){const previous=s.reviews.find(r=>r.question_id===q.id),next=scheduleReview(previous?.streak||0,g.score===g.maxScore,now);s.attempts.unshift({id:b.requestId||id(),question_id:q.id,answer:String(b.answer),score:g.score,max_score:g.maxScore,method:g.method,created_at:stamp});s.reviews=s.reviews.filter(r=>r.question_id!==q.id);s.reviews.push({question_id:q.id,streak:next.streak,due_at:next.dueAt,last_score:g.score===g.maxScore?1:0})}
   feedback={...(old?{score:old.score,maxScore:old.max_score,method:old.method}:g),answer:q.answer,correct:q.correct,lessonId:q.lessonId};
  }else if(b.type==='training'){if(!['tasting','service'].includes(b.kind)||!b.payload)throw Error('训练记录无效');s.training.unshift({id:id(),kind:b.kind,payload:JSON.stringify(b.payload),created_at:stamp})}
  else if(b.type==='draft'){if(!b.title?.trim()||!b.body?.trim())throw Error('请填写标题与正文');const draftId=b.id||id();s.drafts=s.drafts.filter(d=>d.id!==draftId);s.drafts.unshift({id:draftId,title:b.title,body:b.body,updated_at:stamp});feedback={draftId}}
  else throw Error('不支持的操作');
 }else{
  if(b.type==='settings')s.settings=validateSettings(b.settings);
  else if(b.type==='study'){if(!Number.isInteger(b.seconds)||b.seconds<1||b.seconds>14400)throw Error('学习时长无效');const previous=s.sessions.find(x=>x.id===b.id);if(previous)previous.seconds=Math.max(previous.seconds,b.seconds);else s.sessions.push({id:b.id,day:b.day||chinaDay(now),seconds:b.seconds})}
  else if(b.type==='checkin'){if(!testView(s,path,now).canCheckIn)throw Error('先完成一道题、一项学习，或至少 1 分钟专注，再来打卡。');const day=chinaDay(now);if(!s.checkins.includes(day))s.checkins.unshift(day)}
  else if(b.type==='video'){const v=validateVideo(b);if(!s.videos.some(x=>x.url===v.url))s.videos.unshift({...v,id:id(),created_at:stamp})}
  else if(b.type==='remove-video')s.videos=s.videos.filter(v=>v.id!==b.id);
  else throw Error('不支持的操作');
 }
 return {...testView(s,path,now),feedback};
}
// Temporary device-only test mode: no account IDs and no server writes.
export async function testFetch(path:string,options?:RequestInit){
 try{const raw=localStorage.getItem(KEY),s=raw?JSON.parse(raw):newTestState();let result;
 if(options?.method==='POST'){result=applyTestAction(s,path,JSON.parse(String(options.body)));localStorage.setItem(KEY,JSON.stringify(s))}else result=testView(s,path);
 return {ok:true,json:async()=>result};
 }catch(e){return {ok:false,json:async()=>({error:'本机记录未保存：'+(e instanceof Error?e.message:'请检查浏览器存储空间')})}}
}
