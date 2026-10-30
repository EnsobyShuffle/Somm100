'use client';
import React,{useEffect,useState} from 'react';
import {ArrowRight,CheckCircle2,LogOut,UserRound,ShieldCheck} from 'lucide-react';
import {getSession} from '../lib/learning-client';
import type {AccountSession} from '../lib/account';
import './account.css';
export function useAccount(){
 const [account,setAccount]=useState<AccountSession|null>(null),[error,setError]=useState('');
 function refresh(){setError('');getSession().then(setAccount).catch(e=>setError(e.message))}
 useEffect(refresh,[]);
 return {account,error,refresh};
}
export function Account({session,go}:{session:ReturnType<typeof useAccount>;go:(page:string)=>void}){
 const {account,error,refresh}=session;
 const [mode,setMode]=useState<'login'|'register'>(()=>typeof location!=='undefined'&&location.hash.includes('mode=register')?'register':'login');
 const [name,setName]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 useEffect(()=>{if(account?.name)setName(account.name)},[account?.name]);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage('');try{const r=await fetch('/api/account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})});const data=await r.json() as {error?:string};if(!r.ok)throw Error(data.error||'保存失败');location.reload()}catch(e){setMessage(e instanceof Error?e.message:'保存失败');setBusy(false)}}
 const signIn='/signin-with-chatgpt?return_to='+encodeURIComponent('/#account'+(mode==='register'?'?mode=register':''));
 return <div className="account-layout"><section className="account-story"><span className="eyebrow">YOUR SOMM100</span><h1>每一次学习，<br/><em>都值得留下。</em></h1><p>从一个问题，到一段持续成长的旅程。</p><div className="account-benefits"><p><CheckCircle2 size={19}/> 保存答题、收藏与复习安排</p><p><CheckCircle2 size={19}/> 在不同设备继续课程学习</p><p><CheckCircle2 size={19}/> 累积学习时长与打卡记录</p></div><span className="account-brandline">LEARN · TASTE · EXPLORE</span></section><section className="account-card">
 {error?<><h2>暂时无法连接账号</h2><p role="alert">{error}</p><button className="button" onClick={refresh}>重新连接</button></>:!account?<p role="status">正在读取账号…</p>:account.registered?<><span className="account-icon"><UserRound size={25}/></span><span className="eyebrow">MY ACCOUNT</span><h2>{account.name}</h2><p className="account-email">{account.email}</p><div className="account-connected"><CheckCircle2 size={17}/> 已登录 · 学习记录按账号保存</div><form onSubmit={submit}><label htmlFor="account-name">你的称呼</label><input id="account-name" value={name} onChange={e=>setName(e.target.value)} maxLength={60} required autoComplete="nickname"/><button className="button secondary" disabled={busy||!name.trim()||name.trim()===account.name}>{busy?'保存中…':'保存称呼'}</button></form><button className="button" onClick={()=>go('progress')}>查看我的学习 <ArrowRight size={17}/></button><a className="account-signout" href={'/signout-with-chatgpt?return_to='+encodeURIComponent('/#account')} target="_top"><LogOut size={16}/> 退出登录</a></>:<><div className="account-tabs" role="group" aria-label="账号入口"><button aria-pressed={mode==='login'} onClick={()=>setMode('login')}>登录</button><button aria-pressed={mode==='register'} onClick={()=>setMode('register')}>注册</button></div><h2>{account.authenticated?'完成 SOMM100 注册':mode==='register'?'开始你的学习旅程':'欢迎回来。'}</h2>{account.authenticated?<><p>已验证身份：<span className="account-email">{account.email}</span></p><form onSubmit={submit}><label htmlFor="account-name">怎么称呼你？</label><input id="account-name" value={name} onChange={e=>setName(e.target.value)} maxLength={60} required autoComplete="nickname" placeholder="填写姓名或昵称"/><p className="account-small">注册后，新的课程与练习记录将保存到你的账号。</p><button className="button" disabled={busy||!name.trim()}>{busy?'正在创建…':'创建 SOMM100 账号'} <ArrowRight size={17}/></button></form></>:<><p>{mode==='register'?'使用 ChatGPT 验证身份，再设置你的 SOMM100 称呼。':'使用注册时的同一个 ChatGPT 账号继续学习。'}</p><a className="button account-auth-link" href={signIn} target="_top">{mode==='register'?'使用 ChatGPT 注册':'使用 ChatGPT 登录'} <ArrowRight size={17}/></a><p className="account-small"><ShieldCheck size={15}/> 身份验证在 ChatGPT 完成，无需向 SOMM100 提供密码。</p></>}<button className="account-guest" onClick={()=>go('home')}>继续以游客身份浏览 →</button></>}
 {message&&<p className="account-error" role="alert">{message}</p>}
 <div className="account-storage-note"><strong>记录保存范围</strong><p>登录后同步课程进度、答题、收藏、复习、训练与学习打卡。游客记录保留在原浏览器，不会自动合并到账号。</p><p>独立品鉴日记、英语练习与阅读笔记仍保存在本机，可使用各页面的导出功能备份。</p></div>
 </section></div>
}
