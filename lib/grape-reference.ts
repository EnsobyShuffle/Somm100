import {Grape,normalizeGrape,resolveGrape,countryLabels,grapeHref,regionHref} from './grape-library';
export type Pair={en:string;zh:string};
export type ReferenceLink={label:string;href:string};
export type ReferenceRow={label:Pair;text:Pair;sources:string[];links:ReferenceLink[]};
export type ReferenceWine={id:string;producer:string;name:string;href:string;url?:string};
export type GrapeReferenceProfile={id:string;name:string;species:string;color:Pair;country:Pair;intro:Pair;keyReferences:Pair;image:string;imageSource:string;imageCredit:string;reviewed:string;sources:{id:string;title:string;url:string}[];sections:{id:string;title:Pair;rows:ReferenceRow[]}[];inlineLinks:ReferenceLink[];wines:ReferenceWine[];standardised?:boolean};
export type GrapeTranslation={id:string;summary:string;origin:string;viticulture:string;winemaking:string;taste:string;geneticsNote:string;confusions:string;aliases:{name:string;context:string}[];regions:{name:string;note:string}[];species:string;originCountry?:string};
export type LinkedWine={id:string;name:string;producer:string;grapeNames:string[];href:string;url?:string};
export type SourcedReferenceRow={section:string;label:Pair;text:Pair;sourceUrls:string[]};
const pair=(en:string,zh:string):Pair=>({en,zh});
const row=(enLabel:string,zhLabel:string,en:string,zh:string):ReferenceRow=>({label:pair(enLabel,zhLabel),text:pair(en,zh),sources:[],links:[]});
const nameLinkCache=new WeakMap<Grape[],ReferenceLink[]>();
const wineLinkCache=new WeakMap<Grape[],WeakMap<LinkedWine[],Map<string,LinkedWine[]>>>();
function winesByGrape(grapes:Grape[],wines:LinkedWine[]){
 let lists=wineLinkCache.get(grapes);if(!lists){lists=new WeakMap();wineLinkCache.set(grapes,lists)}
 const cached=lists.get(wines);if(cached)return cached;
 const index=new Map<string,LinkedWine[]>();
 for(const wine of wines){
  const ids=new Set(wine.grapeNames.map(name=>resolveGrape(grapes,name)?.id).filter((id):id is string=>!!id));
  for(const id of ids){const entries=index.get(id)||[];entries.push(wine);index.set(id,entries)}
 }
 lists.set(wines,index);return index;
}
function uniqueLinks(links:ReferenceLink[]){const seen=new Set<string>();return links.filter(l=>{if(!l.label||seen.has(l.label))return false;seen.add(l.label);return true})}
function libraryNameLinks(grapes:Grape[]){
 const cached=nameLinkCache.get(grapes);if(cached)return cached;
 const labels=[...new Set(grapes.flatMap(g=>[g.name,...g.aliases.map(a=>a.name)]))];
 const links=labels.flatMap(label=>{const grape=resolveGrape(grapes,label);return grape?[{label,href:grapeHref(grape.id)}]:[]});
 nameLinkCache.set(grapes,links);return links;
}
export function applySourcedReferenceRows(profile:GrapeReferenceProfile,rows:SourcedReferenceRow[]=[]){
 if(!rows.length)return profile;
 const sourceIds=new Map(profile.sources.map(s=>[s.url,s.id]));
 for(const section of profile.sections){
  const detailed=rows.filter(r=>r.section===section.id);if(!detailed.length)continue;
  section.rows=detailed.map(r=>({label:r.label,text:r.text,links:[],sources:r.sourceUrls.map(url=>{
   const id=sourceIds.get(url);if(!id)throw Error(profile.id+': detailed reference source missing: '+url);return id;
  })}));
 }
 return profile;
}
export function buildGrapeReference(g:Grape,en:GrapeTranslation,grapes:Grape[],wines:LinkedWine[]):GrapeReferenceProfile{
 if(g.id!==en.id)throw Error('Grape translation identity mismatch');
 const sources=g.sources.map((s,i)=>({id:'source-'+(i+1),title:s.title,url:s.url}));
 const country=en.originCountry||'';
 const nameLinks=libraryNameLinks(grapes).filter(link=>link.href!==grapeHref(g.id));
 for(const parent of g.genetics.parents){const resolved=resolveGrape(grapes,parent);if(resolved&&resolved.id!==g.id)nameLinks.push({label:parent,href:grapeHref(resolved.id)})}
 const regionLinks=g.regions.map(r=>({label:r.name,href:regionHref(r.name,r.country)}));
 const regionGroups=new Map<string,{name:string;enNotes:string[];zhNotes:string[]}>();
 for(const r of g.regions){const href=regionHref(r.name,r.country);const group=regionGroups.get(href)||{name:r.name,enNotes:[],zhNotes:[]};const translated=en.regions.find(x=>x.name===r.name)?.note||'';if(translated&&!group.enNotes.includes(translated))group.enNotes.push(translated);if(r.note&&!group.zhNotes.includes(r.note))group.zhNotes.push(r.note);regionGroups.set(href,group)}
 const distinctRegions=[...regionGroups.values()];
 const matched=winesByGrape(grapes,wines).get(g.id)||[];
 const seen=new Set<string>();const references=matched.filter(w=>{const key=normalizeGrape(w.producer+' '+w.name);if(seen.has(key))return false;seen.add(key);return true});
 const synonyms=g.aliases.filter(a=>normalizeGrape(a.name)!==normalizeGrape(g.name));
 const synonymRows=synonyms.length?synonyms.map(a=>row(a.name,a.name,en.aliases.find(x=>x.name===a.name)?.context||'',a.context)):[row('Synonyms','同义名','No verified synonyms are included in this record.','本档案暂未收录已核实的同义名。')];
 const parentText=g.genetics.parents.join(' × ');
 const parentRows=[row(g.genetics.type==='mutation'?'Mutation':'Parents',g.genetics.type==='mutation'?'变异':'亲本',parentText?parentText+'\n'+en.geneticsNote:en.geneticsNote,parentText?parentText+'\n'+g.genetics.note:g.genetics.note)];
 const profile:GrapeReferenceProfile={id:g.id,name:g.name,species:en.species,color:g.color==='white'?pair('White','白葡萄'):g.color==='pink'?pair('Pink / grey','粉红／灰葡萄'):pair('Red','红葡萄'),country:pair(country,countryLabels[country]||country),intro:pair(en.summary,g.summary),keyReferences:pair(distinctRegions.map(r=>r.name).join('; '),distinctRegions.map(r=>r.name).join('；')),image:g.imageUrl||'',imageSource:g.imageSourceUrl||'',imageCredit:g.imageCredit||'',reviewed:g.reviewed,sources,standardised:true,
  inlineLinks:uniqueLinks([...regionLinks,...nameLinks,...references.filter(w=>references.filter(other=>other.name===w.name).length===1).map(w=>({label:w.name,href:w.href}))]),
  sections:[
   {id:'origin',title:pair('Origin','起源'),rows:[row('Origin & history','起源与历史',en.origin,g.origin)]},
   {id:'synonyms',title:pair('Synonyms','同义名'),rows:synonymRows},
   {id:'parentage',title:pair('Parentage','亲缘'),rows:parentRows},
   {id:'viticulture',title:pair('Viticulture','葡萄种植'),rows:[row('Characteristics','品种特征',en.viticulture,g.viticulture)]},
   {id:'regions',title:pair('Regions & Appellations','产区与法定产区'),rows:distinctRegions.map(r=>row(r.name,r.name,r.enNotes.join('\n'),r.zhNotes.join('\n')))},
   {id:'vinification',title:pair('Vinification','酿造'),rows:[row('Vinification & élevage','酿造与熟成',en.winemaking,g.winemaking)]},
   {id:'tasting',title:pair('Tasting','品鉴'),rows:[row('Structure, aromas & flavours','结构、香气与风味',en.taste,g.taste)]},
   {id:'similar',title:pair('Similar Varieties & Distinctions','相近品种与辨析'),rows:[row('Distinctions','辨析',en.confusions,g.confusions)]}
  ],wines:references.map(w=>({id:w.id,producer:w.producer,name:w.name,href:w.href,url:w.url}))};
 return applySourcedReferenceRows(profile,(g.referenceRows||[]) as SourcedReferenceRow[]);
}
const textLinkCache=new WeakMap<ReferenceLink[],{pattern:RegExp;hrefs:Map<string,string>}>();
export function splitReferenceText(text:string,links:ReferenceLink[]):{text:string;href?:string}[]{
 let matcher=textLinkCache.get(links);
 if(!matcher){
  const unique=uniqueLinks(links).sort((a,b)=>b.label.length-a.label.length);
  if(!unique.length)return [{text}];
  matcher={pattern:new RegExp('(?<![\\p{Script=Latin}\\p{M}\\d])('+unique.map(l=>l.label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?![\\p{Script=Latin}\\p{M}\\d])','gu'),hrefs:new Map(unique.map(l=>[l.label,l.href]))};
  textLinkCache.set(links,matcher);
 }
 const pieces:{text:string;href?:string}[]=[];let position=0;
 for(const match of text.matchAll(matcher.pattern)){const i=match.index!;if(i>position)pieces.push({text:text.slice(position,i)});pieces.push({text:match[0],href:matcher.hrefs.get(match[0])});position=i+match[0].length}
 if(position<text.length)pieces.push({text:text.slice(position)});return pieces;
}
export function withReferenceLanguage(href:string,language:string){if(!href.startsWith('#'))return href;const [path,query='']=href.split('?');const params=new URLSearchParams(query);params.set('lang',language);return path+'?'+params.toString()}
