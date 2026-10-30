import {env} from 'cloudflare:workers';
import {requestIdentity,accountName,validRequestOrigin} from '../../../lib/account';
export const dynamic='force-dynamic';
const response=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store, private','Vary':'Cookie'}});
export async function GET(request:Request){
  const identity=requestIdentity(request);
  if(!identity)return response({authenticated:false,registered:false});
  try{
    const profile=await env.DB!.prepare('SELECT name,created_at FROM users WHERE id=?').bind(identity.id).first<any>();
    return response({authenticated:true,registered:!!profile,id:identity.id,email:identity.email,name:profile?.name||identity.name,createdAt:profile?.created_at});
  }catch{return response({error:'暂时无法读取账号，请重试。学习记录未被更改。'},503)}
}
export async function POST(request:Request){
  const identity=requestIdentity(request);
  if(!identity)return response({error:'请先通过 ChatGPT 登录'},401);
  if(!validRequestOrigin(request))return response({error:'请求来源无效'},403);
  let name:string;
  try{
    const raw=await request.text();if(raw.length>2000)return response({error:'内容过长'},413);
    name=accountName(JSON.parse(raw).name);
  }catch(e){return response({error:e instanceof Error&&/称呼/.test(e.message)?e.message:'请填写有效的称呼'},400)}
  try{
    // A repeat registration updates only the display name. Ownership, roles and history remain unchanged.
    await env.DB!.prepare('INSERT INTO users (id,name,role,created_at) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name').bind(identity.id,name,'student',new Date().toISOString()).run();
    return GET(request);
  }catch{return response({error:'账号保存未完成，请重试'},503)}
}
