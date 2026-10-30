import linkedRegions from '../data/region-index.json';
import {resolveRegion,type RegionIndex} from './region-library';
import spanishIndex from '../data/spain-index.json';
const spanishRegions=spanishIndex.regions as {id:string;name:string;aliases?:string[]}[];
export type Source = {title:string;url:string;note?:string};
export type Grape = {id:string;name:string;zh:string;color:string;countries:string[];origin:string;aliases:{name:string;context:string}[];summary:string;viticulture:string;winemaking:string;taste:string;regions:{name:string;country:string;note:string;associationType?:string}[];genetics:{type:string;parents:string[];note:string};confusions:string;sources:Source[];reviewed:string;imageUrl?:string;imageCredit?:string;imageSourceUrl?:string;image?:string;[key:string]:unknown};
export function normalizeGrape(value:string){return value.replace(/[œŒ]/g,'oe').replace(/[æÆ]/g,'ae').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'").replace(/ß/g,'ss').replace(/ı/g,'i').replace(/ł/g,'l').toLowerCase().replace(/[-\s]+/g,' ').trim()}
export const countryLabels:Record<string,string>={'Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那',Montenegro:'黑山',Albania:'阿尔巴尼亚',Belgium:'比利时',Denmark:'丹麦',India:'印度',Luxembourg:'卢森堡',Peru:'秘鲁',Sweden:'瑞典',Ukraine:'乌克兰',France:'法国',Italy:'意大利',Spain:'西班牙',Portugal:'葡萄牙',Germany:'德国',Austria:'奥地利',Switzerland:'瑞士',Greece:'希腊',Hungary:'匈牙利',Croatia:'克罗地亚',Slovenia:'斯洛文尼亚',Slovakia:'斯洛伐克',Czechia:'捷克','Czech Republic':'捷克',Romania:'罗马尼亚',Bulgaria:'保加利亚',Georgia:'格鲁吉亚',Armenia:'亚美尼亚',Turkey:'土耳其',Türkiye:'土耳其',Japan:'日本',China:'中国','South Africa':'南非',Australia:'澳大利亚','New Zealand':'新西兰','United States':'美国',USA:'美国',Canada:'加拿大',Argentina:'阿根廷',Chile:'智利',Uruguay:'乌拉圭',Brazil:'巴西',Mexico:'墨西哥',England:'英格兰','United Kingdom':'英国',Russia:'俄罗斯',Serbia:'塞尔维亚','North Macedonia':'北马其顿',Lebanon:'黎巴嫩',Cyprus:'塞浦路斯',Israel:'以色列',Moldova:'摩尔多瓦'};
export function grapeNames(g:Grape){return [g.name,g.zh,...g.aliases.map(a=>a.name)]}
export function grapeSearchText(g:Grape){return normalizeGrape([...grapeNames(g),...(Array.isArray(g.classificationNames)?g.classificationNames:[]),...g.countries.flatMap(c=>[c,countryLabels[c]||'']),...g.regions.map(r=>r.name),...g.genetics.parents].join(' '))}
export function resolveGrape(grapes:Grape[],name:string){const key=normalizeGrape(name);const canonical=grapes.find(g=>g.id===name||normalizeGrape(g.name)===key||normalizeGrape(g.zh)===key);if(canonical)return canonical;const matches=grapes.filter(g=>g.aliases.some(a=>normalizeGrape(a.name)===key));return matches.length===1?matches[0]:undefined}
export function filterGrapes(grapes:Grape[],query='',country='',color='',letter=''){
 const q=normalizeGrape(query);const terms=q.split(/\s+/).filter(Boolean);
 return grapes.filter(g=>(!country||g.countries.includes(country))&&(!color||g.color===color)&&(!letter||normalizeGrape(g.name)[0]===letter.toLowerCase())&&terms.every(t=>grapeSearchText(g).includes(t))).sort((a,b)=>{
  const score=(g:Grape)=>q?(normalizeGrape(g.name)===q||normalizeGrape(g.zh)===q?0:g.aliases.some(n=>normalizeGrape(n.name)===q)?1:normalizeGrape(g.name).startsWith(q)?2:3):0;
  return score(a)-score(b)||a.name.localeCompare(b.name,'en',{sensitivity:'base'});
 });
}
export function grapeHref(id:string){return '#grapes?id='+encodeURIComponent(id)}
export function grapeDirectoryRegions(grape:Grape,country=''){
 const seen=new Set<string>();
 return grape.regions.filter(r=>{
  if(r.associationType==='classification'||normalizeGrape(r.name)===normalizeGrape(r.country)||r.name===countryLabels[r.country]||(country&&r.country!==country))return false;
  const key=r.country+'|'+normalizeGrape(r.name);
  if(seen.has(key))return false;
  seen.add(key);return true;
 });
}
export function grapeDirectoryPreview(grape:Grape,country=''){
 const regions=grapeDirectoryRegions(grape,country);
 // Directory is a scan-friendly overview; widespread varieties keep countries only.
 if(!country&&(grape.countries.length>=5||regions.length>6))return [];
 return regions.slice(0,2);
}
export function regionHref(name:string,country:string){const linked=resolveRegion(linkedRegions as RegionIndex[],name,country);if(linked)return '#library?type=region&id='+linked.id;const region=country==='Spain'?spanishRegions.find(r=>normalizeGrape(r.name)===normalizeGrape(name)||r.aliases?.some(a=>normalizeGrape(a)===normalizeGrape(name))):undefined;return region?'#library?type=region&id='+region.id:'#grapes?region='+encodeURIComponent(name)+'&country='+encodeURIComponent(country)}
