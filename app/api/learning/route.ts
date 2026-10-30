import { env } from 'cloudflare:workers';
import { curriculum, grade, scheduleReview } from '../../../lib/learning';
import {requestIdentity,validRequestOrigin} from '../../../lib/account';
import {learningExtras,saveLearningItem} from '../../../lib/learning-items';
export const dynamic = 'force-dynamic';
function response(data:unknown,status=200) {return Response.json(data,{status,headers:{'Cache-Control':'no-store'}})}
const identity=requestIdentity;
async function state(user:any){
  const db=env.DB!;
  const [p,a,r,b,t,d,extras,profile]=await Promise.all([
    db.prepare('SELECT * FROM progress WHERE user_id=?').bind(user.id).all(),
    db.prepare('SELECT * FROM attempts WHERE user_id=? ORDER BY created_at DESC LIMIT 1000').bind(user.id).all(),
    db.prepare('SELECT * FROM reviews WHERE user_id=?').bind(user.id).all(),
    db.prepare('SELECT question_id FROM bookmarks WHERE user_id=?').bind(user.id).all(),
    db.prepare('SELECT * FROM training WHERE user_id=? ORDER BY created_at DESC LIMIT 100').bind(user.id).all(),
    db.prepare('SELECT * FROM drafts WHERE user_id=? ORDER BY updated_at DESC').bind(user.id).all(),
    db.prepare('SELECT * FROM learning_items WHERE user_id=?').bind(user.id).all(),
    db.prepare('SELECT name FROM users WHERE id=?').bind(user.id).first<any>()
  ]);
  return {...learningExtras(extras.results),user:{name:profile?.name||user.name,preview:false},completed:p.results.map((x:any)=>x.lesson_id),attempts:a.results,reviews:r.results,bookmarks:b.results.map((x:any)=>x.question_id),training:t.results,drafts:d.results};
}
export async function GET(request:Request){
  const user=identity(request); if(!user)return response({error:'请先登录以保存学习记录'},401);
  try{return response(await state(user))}catch(error){console.error('Learning read failed',String(error));return response({error:'学习记录暂时无法读取，请稍后重试'},503)}
}
export async function POST(request:Request){
  const user=identity(request);if(!user)return response({error:'请先登录'},401);
  if(!validRequestOrigin(request))return response({error:'请求来源无效'},403);
  if(Number(request.headers.get('content-length')||0)>70000)return response({error:'内容过长'},413);
  let body:any;try{const raw=await request.text();if(raw.length>70000)return response({error:'内容过长'},413);body=JSON.parse(raw);if(!body||typeof body!=='object')throw Error('Invalid body')}catch{return response({error:'请求格式无效'},400)}
  const db=env.DB; if(!db)return response({error:'学习数据库尚未就绪'},503);
  const now=new Date().toISOString();
  try{
    await db.prepare('INSERT OR IGNORE INTO users (id,name,role,created_at) VALUES (?,?,?,?)').bind(user.id,user.name,'student',now).run();
    let feedback:any=null;
    if(await saveLearningItem(db,user.id,body,now)){
    }else if(body.type==='complete'){
      if(!curriculum.lessons.some(l=>l.id===body.lessonId))return response({error:'章节不存在'},400);
      await db.prepare('INSERT OR IGNORE INTO progress (user_id,lesson_id,completed_at) VALUES (?,?,?)').bind(user.id,body.lessonId,now).run();
    }else if(body.type==='bookmark'){
      if(!curriculum.questions.some(q=>q.id===body.questionId))return response({error:'题目不存在'},400);
      if(body.active)await db.prepare('INSERT OR IGNORE INTO bookmarks (user_id,question_id) VALUES (?,?)').bind(user.id,body.questionId).run();
      else await db.prepare('DELETE FROM bookmarks WHERE user_id=? AND question_id=?').bind(user.id,body.questionId).run();
    }else if(body.type==='answer'){
      const q:any=curriculum.questions.find(q=>q.id===body.questionId);if(!q)return response({error:'题目不存在'},400);
      if(typeof body.requestId!=='string'||body.requestId.length>100)return response({error:'答题编号无效'},400);
      const g=grade(q,body.answer,body.rating);
      const old:any=await db.prepare('SELECT * FROM attempts WHERE id=?').bind(body.requestId).first();
      if(old && (old.user_id!==user.id||old.question_id!==q.id))return response({error:'答题编号冲突'},409);
      if(!old){
        const previous:any=await db.prepare('SELECT streak FROM reviews WHERE user_id=? AND question_id=?').bind(user.id,q.id).first();
        const next=scheduleReview(previous?.streak||0,g.score===g.maxScore);
        await db.batch([
          db.prepare('INSERT INTO attempts (id,user_id,question_id,answer,score,max_score,method,created_at) VALUES (?,?,?,?,?,?,?,?)').bind(body.requestId,user.id,q.id,String(body.answer),g.score,g.maxScore,g.method,now),
          db.prepare('INSERT INTO reviews (user_id,question_id,streak,due_at,last_score) VALUES (?,?,?,?,?) ON CONFLICT(user_id,question_id) DO UPDATE SET streak=excluded.streak,due_at=excluded.due_at,last_score=excluded.last_score').bind(user.id,q.id,next.streak,next.dueAt,g.score===g.maxScore?1:0)
        ]);
      }
      feedback={...(old?{score:old.score,maxScore:old.max_score,method:old.method}:g),answer:q.answer,correct:q.correct,lessonId:q.lessonId};
    }else if(body.type==='training'){
      if(!['tasting','service'].includes(body.kind)||typeof body.payload!=='object'||!body.payload)return response({error:'训练记录无效'},400);
      const payload=JSON.stringify(body.payload);if(payload.length>30000)return response({error:'训练记录过长'},400);
      await db.prepare('INSERT INTO training (id,user_id,kind,payload,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),user.id,body.kind,payload,now).run();
    }else if(body.type==='draft'){
      if(typeof body.title!=='string'||!body.title.trim()||body.title.length>120||typeof body.body!=='string'||!body.body.trim()||body.body.length>20000)return response({error:'请填写标题与正文（正文最多 20,000 字符）'},400);
      const draftId=typeof body.id==='string'?body.id:crypto.randomUUID();
      const existing:any=await db.prepare('SELECT user_id FROM drafts WHERE id=?').bind(draftId).first();
      if(existing&&existing.user_id!==user.id)return response({error:'无权修改此草稿'},403);
      await db.prepare('INSERT INTO drafts (id,user_id,title,body,updated_at) VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,body=excluded.body,updated_at=excluded.updated_at').bind(draftId,user.id,body.title,body.body,now).run();
      feedback={draftId};
    }else return response({error:'不支持的操作'},400);
    return response({...await state(user),feedback});
  }catch(error){console.error('Learning write failed',String(error));return response({error:error instanceof Error&&/请选择|请先填写|请对照|不存在|无效|计划|时间|日期|提醒|目标/.test(error.message)?error.message:'保存未完成，请重试；未显示成功前请保留当前内容'},500)}
}
