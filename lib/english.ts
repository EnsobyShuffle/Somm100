export type Review = {due:number; interval:number; count:number; last:number;first?:number};
export type EnglishState = {version:2;level:number;goal:number;reviews:Record<string,Review>;saved:string[];completed:string[];phonics:number[];answers:Record<string,string>;legacy:Record<string,unknown>};
export const emptyEnglish:EnglishState={version:2,level:0,goal:5,reviews:{},saved:[],completed:[],phonics:[],answers:{},legacy:{}};
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
export function loadEnglish(value:unknown,legacy:unknown={}):EnglishState{
 if(!record(value)||value.version!==2)return {...emptyEnglish,reviews:{},saved:[],completed:[],phonics:[],answers:{},legacy:record(legacy)?legacy:{}};
 const reviews:Record<string,Review>={};
 if(record(value.reviews))for(const [k,r] of Object.entries(value.reviews))if(record(r)&&[r.due,r.interval,r.count,r.last].every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0))reviews[k]={due:Number(r.due),interval:Number(r.interval),count:Number(r.count),last:Number(r.last),first:typeof r.first==='number'&&Number.isFinite(r.first)&&r.first>=0?r.first:Number(r.last)};
 return {version:2,level:[0,1,2,3,4].includes(Number(value.level))?Number(value.level):0,goal:[5,10,15].includes(Number(value.goal))?Number(value.goal):5,reviews,saved:Array.isArray(value.saved)?value.saved.filter(x=>typeof x==='string'):[],completed:Array.isArray(value.completed)?value.completed.filter(x=>typeof x==='string'):[],phonics:Array.isArray(value.phonics)?value.phonics.filter(x=>Number.isInteger(x)&&x>=0&&x<6):[],answers:record(value.answers)?Object.fromEntries(Object.entries(value.answers).filter(([,v])=>typeof v==='string')) as Record<string,string>:{},legacy:record(value.legacy)?value.legacy:record(legacy)?legacy:{}};
}
export function reviewWord(previous:Review|undefined,rating:'again'|'hard'|'good',now=Date.now()):Review{
 const intervals=[1,3,7,14,30];const previousDays=previous?.interval||0;
 const days=rating==='good'?(intervals.find(x=>x>previousDays)||30):rating==='hard'?1:0;
 return {first:previous?.first||previous?.last||now,due:now+(rating==='again'?10*60*1000:days*86400000),interval:days,count:(previous?.count||0)+1,last:now};
}
export function normalizeAnswer(s:string){return s.trim().toLocaleLowerCase().replace(/[’‘]/g,"'").replace(/[‐‑–—]/g,'-').replace(/\s+/g,' ').replace(/[.!?]+$/,'');}
export function validateChat(body:unknown,ids:string[]){
 if(!record(body)||typeof body.scenarioId!=='string'||!ids.includes(body.scenarioId)||!Number.isInteger(body.level)||Number(body.level)<0||Number(body.level)>4||!Array.isArray(body.messages)||body.messages.length<1||body.messages.length>24)throw Error('对话格式无效');
 const messages=body.messages.map((m:unknown)=>{if(!record(m)||!['user','assistant'].includes(String(m.role))||typeof m.content!=='string'||!m.content.trim()||m.content.length>1600)throw Error('对话格式无效');return {role:m.role as 'user'|'assistant',content:m.content.trim()};});
 if(messages.at(-1)?.role!=='user'||messages.reduce((n,m)=>n+m.content.length,0)>14000)throw Error('请开始一轮新对话');
 return {scenarioId:body.scenarioId,level:Number(body.level),messages};
}
