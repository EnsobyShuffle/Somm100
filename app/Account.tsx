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
 const [name,setName]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 useEffect(()=>{if(account?.name)setName(account.name)},[account?.name]);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage('');try{const r=await fetch('/api/account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})});const data=await r.json() as {error?:string};if(!r.ok)throw Error(data.error||'保存失败');location.reload()}catch(e){setMessage(e instanceof Error?e.message:'保存失败');setBusy(false)}}
 return <div className="account-layout"><section className="account-story"><span className="eyebrow">YOUR SOMM100</span><h1>每一次学习，<br/><em>都值得留下。</em></h1><p>从一个问题，到一段持续成长的旅程。</p><div className="account-benefits"><p><CheckCircle2 size={19}/> 保存答题、收藏与复习安排</p><p><CheckCircle2 size={19}/> 在不同设备继续课程学习</p><p><CheckCircle2 size={19}/> 累积学习时长与打卡记录</p></div><span className="account-brandline">LEARN · TASTE · EXPLORE</span></section><section className="account-card">
 {error?<><h2>暂时无法连接账号</h2><p role="alert">{error}</p><button className="button" onClick={refresh}>重新连接</button></>:!account?<p role="status">正在读取账号…</p>:account.registered?<><span className="account-icon"><UserRound size={25}/></span><span className="eyebrow">MY ACCOUNT</span><h2>{account.name}</h2><p className="account-email">{account.email}</p><div className="account-connected"><CheckCircle2 size={17}/> 已登录 · 学习记录按账号保存</div><form onSubmit={submit}><label htmlFor="account-name">你的称呼</label><input id="account-name" value={name} onChange={e=>setName(e.target.value)} maxLength={60} required autoComplete="nickname"/><button className="button secondary" disabled={busy||!name.trim()||name.trim()===account.name}>{busy?'保存中…':'保存称呼'}</button></form><button className="button" onClick={()=>go('progress')}>查看我的学习 <ArrowRight size={17}/></button></>:<><h2>账号登录正在接入</h2><p>我们会提供中国用户方便使用的手机号验证码或微信登录。当前账号登录尚未开放，你可以继续以游客身份浏览。</p><button className="account-guest" onClick={()=>go('home')}>继续以游客身份浏览 →</button></>}
 {message&&<p className="account-error" role="alert">{message}</p>}
 <div className="account-storage-note"><strong>记录保存范围</strong><p>当前学习记录保存在本机；手机号或微信登录接通后，再开放跨设备同步。</p><p>独立品鉴日记、英语练习与阅读笔记仍保存在本机，可使用各页面的导出功能备份。</p></div>
 </section></div>
}
