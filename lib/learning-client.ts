import {testFetch} from './testing-store';
import type {AccountSession} from './account';
let sessionPromise:Promise<AccountSession>|undefined;
export function getSession():Promise<AccountSession>{
  // CloudBase phase one retains the existing guest experience; no fake identity
  // or trust in the old platform's incoming authentication headers.
  if(import.meta.env?.VITE_SOMM100_LOCAL_ONLY)return Promise.resolve({authenticated:false,registered:false});
  if(!sessionPromise)sessionPromise=fetch('/api/account',{cache:'no-store',credentials:'same-origin'}).then(async r=>{const data=await r.json() as AccountSession & {error?:string};if(!r.ok)throw Error(data.error||'账号读取失败');return data}).catch(e=>{sessionPromise=undefined;throw e});
  return sessionPromise!;
}
export async function learningFetch(path:string,options?:RequestInit){
  try{
    const session=await getSession();
    // Never silently write account activity into a guest store after a network or authentication failure.
    if(session.registered){
      const response=await fetch(path,{...options,credentials:'same-origin',cache:'no-store'});
      if(response.status===401)throw Error('登录已失效，请重新登录后保存。当前内容尚未保存。');
      return response;
    }
    return testFetch(path,options);
  }catch(e){return {ok:false,json:async()=>({error:e instanceof Error?e.message:'连接失败，请重试'})}}
}
export async function focusStorageKey(){const session=await getSession();return session.registered?'somm100-account-focus:'+session.id:'somm100-device-test-focus'}
