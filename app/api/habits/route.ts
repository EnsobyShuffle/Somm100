import {env} from 'cloudflare:workers';
import {chinaDay,previousDay,defaultSettings,streakFor,validateSettings,validateVideo,reminderCalendar} from '../../../lib/habits';
import {requestIdentity,validRequestOrigin} from '../../../lib/account';
export const dynamic='force-dynamic';
const response=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const userId=(r:Request)=>requestIdentity(r)?.id;
async function state(id:string){
 const db=env.DB!,today=chinaDay(),since=today+'T00:00:00+08:00';
 const [settings,days,checks,videos,activity]=await Promise.all([
 db.prepare('SELECT payload FROM learning_settings WHERE user_id=?').bind(id).first<any>(),
 db.prepare('SELECT study_date AS day,SUM(seconds) AS seconds FROM study_sessions WHERE user_id=? GROUP BY study_date ORDER BY study_date DESC').bind(id).all<any>(),
 db.prepare('SELECT check_date AS day FROM checkins WHERE user_id=? ORDER BY check_date DESC').bind(id).all<any>(),
 db.prepare('SELECT * FROM learning_videos WHERE user_id=? ORDER BY created_at DESC').bind(id).all<any>(),
 db.prepare('SELECT (SELECT COUNT(*) FROM attempts WHERE user_id=? AND created_at>=?)+(SELECT COUNT(*) FROM progress WHERE user_id=? AND completed_at>=?)+(SELECT COUNT(*) FROM training WHERE user_id=? AND created_at>=?)+(SELECT COUNT(*) FROM learning_items WHERE user_id=? AND kind=? AND updated_at>=?) AS count').bind(id,new Date(since).toISOString(),id,new Date(since).toISOString(),id,new Date(since).toISOString(),id,'read',new Date(since).toISOString()).first<any>()
 ]);
 const seconds=Number(days.results.find(d=>d.day===today)?.seconds||0),checkDays=checks.results.map(d=>d.day);
 return {settings:settings?{...defaultSettings,...JSON.parse(settings.payload)}:defaultSettings,studyDays:days.results,checkins:checkDays,videos:videos.results,today,todaySeconds:seconds,totalSeconds:days.results.reduce((a,d)=>a+Number(d.seconds),0),streak:streakFor(checkDays,today),canCheckIn:seconds>=60||Number(activity?.count)>0};
}
export async function GET(r:Request){const id=userId(r);if(!id)return response({error:'请先登录'},401);try{const data=await state(id);if(new URL(r.url).searchParams.get('calendar')==='1')return new Response(reminderCalendar(data.settings),{headers:{'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':'attachment; filename="SOMM100-study-reminder.ics"','Cache-Control':'no-store'}});return response(data)}catch(e){console.error('Habit read',String(e));return response({error:'学习习惯数据暂时无法读取'},503)}}
export async function POST(r:Request){
 const id=userId(r);if(!id)return response({error:'请先登录'},401);
 if(!validRequestOrigin(r))return response({error:'请求来源无效'},403);
 let b:any;try{const raw=await r.text();if(raw.length>10000)return response({error:'内容过长'},413);b=JSON.parse(raw)}catch{return response({error:'请求格式无效'},400)}
 const db=env.DB!,now=new Date().toISOString(),today=chinaDay();
 try{
 if(b.type==='settings'){
 const s=validateSettings(b.settings);await db.prepare('INSERT INTO learning_settings (user_id,payload,updated_at) VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET payload=excluded.payload,updated_at=excluded.updated_at').bind(id,JSON.stringify(s),now).run();
 }else if(b.type==='study'){
 if(typeof b.id!=='string'||!/^[a-zA-Z0-9_-]{8,120}$/.test(b.id)||!Number.isInteger(b.seconds)||b.seconds<1||b.seconds>14400)throw Error('学习时长记录无效');
 const studyDate=b.day||today;if(![today,previousDay(today)].includes(studyDate))throw Error('学习记录日期无效');
 const existing=await db.prepare('SELECT user_id,study_date FROM study_sessions WHERE id=?').bind(b.id).first<any>();
 if(existing&&(existing.user_id!==id||existing.study_date!==studyDate))return response({error:'学习记录不匹配，请开始新一轮计时'},409);
 await db.prepare('INSERT INTO study_sessions (id,user_id,study_date,seconds,updated_at) VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET seconds=MAX(study_sessions.seconds,excluded.seconds),updated_at=excluded.updated_at').bind(b.id,id,studyDate,b.seconds,now).run();
 }else if(b.type==='checkin'){
 const s=await state(id);if(!s.canCheckIn)return response({error:'先完成一道题、一项学习，或至少 1 分钟专注，再来打卡。'},400);
 await db.prepare('INSERT OR IGNORE INTO checkins (user_id,check_date,created_at) VALUES (?,?,?)').bind(id,today,now).run();
 }else if(b.type==='video'){
 const v=validateVideo(b);const exists=await db.prepare('SELECT id FROM learning_videos WHERE user_id=? AND url=?').bind(id,v.url).first();
 if(!exists)await db.prepare('INSERT INTO learning_videos (id,user_id,title,url,topic,platform,creator,created_at) VALUES (?,?,?,?,?,?,?,?)').bind(crypto.randomUUID(),id,v.title,v.url,v.topic,v.platform,v.creator,now).run();
 }else if(b.type==='remove-video'){
 if(typeof b.id!=='string')throw Error('视频记录无效');await db.prepare('DELETE FROM learning_videos WHERE user_id=? AND id=?').bind(id,b.id).run();
 }else return response({error:'不支持的操作'},400);
 return response(await state(id));
 }catch(e){console.error('Habit write',String(e));const message=e instanceof Error?e.message:'';return response({error:/请|仅支持|无效/.test(message)?message:'保存未完成，请重试'},400)}
}
