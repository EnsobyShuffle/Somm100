import {curriculum} from './learning';
import cmsData from '../data/cms-learning.json';
import {validateChapterPlan} from './chapter-plan';
export function learningExtras(rows:any[]){
 const result={chapterPlans:{} as Record<string,any>,readings:[] as string[],checks:[] as string[],dismissed:[] as string[]};
 for(const row of rows){if(row.kind==='chapter-plan')result.chapterPlans[row.item_id]=JSON.parse(row.payload);else if(row.kind==='read')result.readings.push(row.item_id);else if(row.kind==='check')result.checks.push(row.item_id);else if(row.kind==='dismiss')result.dismissed.push(row.item_id)}
 return result;
}
export async function saveLearningItem(db:any,userId:string,body:any,now:string){
 const kind=body.type==='chapter-reminder-seen'?'chapter-plan':body.type;
 if(!['read','check','dismiss','chapter-plan'].includes(kind))return false;
 const itemId=kind==='read'?body.readingId:kind==='check'?body.knowledgePointId:kind==='dismiss'?body.questionId:body.moduleId;
 const valid=kind==='read'?curriculum.readings.some(x=>x.id===itemId):kind==='check'?curriculum.checklist.some(x=>x.id===itemId):kind==='dismiss'?curriculum.questions.some(x=>x.id===itemId):cmsData.modules.some(x=>x.id===itemId);
 if(!valid)throw Error('学习条目不存在');
 let payload:any=true;
 if(kind==='chapter-plan'){
  const old=await db.prepare('SELECT payload FROM learning_items WHERE user_id=? AND kind=? AND item_id=?').bind(userId,kind,itemId).first();
  const previous=old?JSON.parse(old.payload):null;
  if(body.type==='chapter-reminder-seen'){if(!previous)return true;payload={...previous,acknowledgedAt:now}}
  else if(body.plan!==null){const plan=validateChapterPlan(body.plan);payload={...plan,updatedAt:now,revision:(previous?.revision||0)+1,calendarUid:previous?.calendarUid||crypto.randomUUID(),...(previous?.remindAt===plan.remindAt&&previous?.reminderEnabled===plan.reminderEnabled&&previous?.acknowledgedAt?{acknowledgedAt:previous.acknowledgedAt}:{})}}
 }
 if((['check','dismiss'].includes(kind)&&body.active!==true)||(kind==='chapter-plan'&&body.plan===null))await db.prepare('DELETE FROM learning_items WHERE user_id=? AND kind=? AND item_id=?').bind(userId,kind,itemId).run();
 else await db.prepare('INSERT INTO learning_items (user_id,kind,item_id,payload,updated_at) VALUES (?,?,?,?,?) ON CONFLICT(user_id,kind,item_id) DO UPDATE SET payload=excluded.payload,updated_at=excluded.updated_at').bind(userId,kind,itemId,JSON.stringify(payload),now).run();
 return true;
}
