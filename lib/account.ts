export type AccountSession = { authenticated:boolean; registered:boolean; id?:string; name?:string; email?:string; createdAt?:string };

export function requestIdentity(request:Request) {
  const id=request.headers.get('oai-authenticated-user-id');
  const email=request.headers.get('oai-authenticated-user-email');
  if(!id||!email)return null;
  let name='SOMM100 学习者';
  if(request.headers.get('oai-authenticated-user-full-name-encoding')==='percent-encoded-utf-8'){
    try{name=decodeURIComponent(request.headers.get('oai-authenticated-user-full-name')||'')||name}catch{}
  }
  return {id,email,name};
}
export function accountName(value:unknown) {
  if(typeof value!=='string')throw Error('请填写称呼');
  const name=value.trim();
  if(!name||name.length>60||/[\u0000-\u001f\u007f]/.test(name))throw Error('称呼需要 1–60 个字符');
  return name;
}
export function validRequestOrigin(request:Request){
  const origin=request.headers.get('origin');
  return (!origin||origin===new URL(request.url).origin)&&request.headers.get('sec-fetch-site')!=='cross-site';
}
