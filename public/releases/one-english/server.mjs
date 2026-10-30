/* Optional ONE English deployment server; set OPENAI_API_KEY ONLY on the server. */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const DIR=path.dirname(fileURLToPath(import.meta.url));
const PORT=Number(process.env.PORT)||3000;
const TOKEN=process.env.OPENAI_API_KEY||'';
const AI_ACCESS_CODE=process.env.AI_ACCESS_CODE||'';
const AI_MODEL=process.env.OPENAI_MODEL||'gpt-4.1-mini';
const allowed=new Map(Object.entries({'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js','/content.js':'content.js','/manifest.webmanifest':'manifest.webmanifest','/sw.js':'sw.js','/icon.svg':'icon.svg','/icon-192.png':'icon-192.png','/icon-512.png':'icon-512.png'}));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const dailyByIp=new Map();
function json(res,status,data){let text=JSON.stringify(data);res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Length':Buffer.byteLength(text)});res.end(text)}
async function readBody(req){return new Promise((resolve,reject)=>{let buf='',size=0;req.on('data',chunk=>{size+=chunk.length;if(size>35000){reject(Error('Input too long'));req.destroy()}else buf+=chunk.toString('utf8')});req.on('end',()=>resolve(buf));req.on('error',reject)})}
const instructions=`You are ONE English, a patient and engaging English conversation teacher for adult Chinese-speaking learners.
Keep the conversation natural and useful in everyday life, work, travel, and restaurants. Ask one question at a time. Speak mostly in English, adjusted to the learner's CEFR level. For A0/A1, use very short sentences, and offer a brief Chinese hint where helpful. Provide gentle, precise corrections AFTER acknowledging the learner's meaning; never over-correct. Encourage learner speaking rather than long lectures. For B1/B2 use authentic follow-up questions. If the learner asks to practice a scene, adopt the scene role. Do not claim to grade pronunciation from transcribed text. Keep replies under 110 English words unless explicitly asked for more. Never request passwords, private personal information or payment details.`;
async function createAI(messages,level){const input=messages.map(m=>({role:m.role,content:m.content}));let response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${TOKEN}`},body:JSON.stringify({model:AI_MODEL,instructions:`${instructions}\nLearner starting level: ${level}.`,input,max_output_tokens:350}),signal:AbortSignal.timeout(22000)});if(!response.ok){let t=await response.text();throw new Error(`Model request failed (${response.status}): ${t.slice(0,200)}`)}let body=await response.json();return (body.output||[]).flatMap(o=>(o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text)).join('\n').trim()}
async function onRequest(req,res){let url;try{url=new URL(req.url,'http://localhost')}catch{return json(res,400,{error:'Bad path'})}
if(url.pathname==='/api/health'&&req.method==='GET')return json(res,200,{ai:Boolean(TOKEN),version:'0.1'});
if(url.pathname==='/api/chat'&&req.method==='POST'){
 if(!TOKEN)return json(res,503,{error:'AI backend not configured'});
 if(AI_ACCESS_CODE&&req.headers['x-ai-access-code']!==AI_ACCESS_CODE)return json(res,401,{error:'Invalid access code'});
 let ip=(req.headers['x-forwarded-for']||req.socket.remoteAddress||'unknown').toString().split(',')[0].trim();let day=new Date().toISOString().slice(0,10);let counts=dailyByIp.get(ip);if(!counts||counts.day!==day){counts={day,calls:0};dailyByIp.set(ip,counts)}
 if(counts.calls>=100)return json(res,429,{error:'Daily conversation limit reached'});
 let body;try{body=JSON.parse(await readBody(req))}catch(e){return json(res,400,{error:'Invalid JSON'})}
 let messages=(Array.isArray(body.messages)?body.messages:[]).slice(-20).filter(m=>(m.role==='user'||m.role==='assistant')&&typeof m.content==='string').map(m=>({role:m.role,content:m.content.slice(0,1800)}));
 if(!messages.length||messages[messages.length-1].role!=='user')return json(res,400,{error:'A user message is required'});
 let level=['A0','A1','A2','B1','B2'].includes(body.level)?body.level:'A1';counts.calls++;
 try{let reply=await createAI(messages,level);return json(res,200,{reply:reply||'Could you say a little more?'})}catch(e){console.error('AI request failed:',e.message.slice(0,150));return json(res,502,{error:'AI is temporarily unavailable'})}
 }
if(req.method!=='GET'&&req.method!=='HEAD')return json(res,405,{error:'Method not allowed'});
let filepath=allowed.get(url.pathname);if(!filepath)return json(res,404,{error:'Not found'});
try{const buf=await fs.readFile(path.join(DIR,filepath));res.writeHead(200,{'Content-Type':types[path.extname(filepath)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache','Content-Security-Policy':"default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"});if(req.method==='HEAD')res.end();else res.end(buf)}catch{json(res,404,{error:'File unavailable'})}
}
http.createServer((req,res)=>onRequest(req,res).catch(err=>{console.error(err);if(!res.headersSent)json(res,500,{error:'Server error'})})).listen(PORT,'0.0.0.0',()=>console.log(`ONE English listening on port ${PORT}; generative AI ${TOKEN?'enabled':'disabled'}`));
