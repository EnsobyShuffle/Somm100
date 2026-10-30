import curated from '../data/grape-reference-profiles.json';
import translations from '../data/grape-reference-translations.json';
import rawGrapes from '../data/grape-varieties.json';
import rawWines from '../data/grape-wines.json';
import producerData from '../data/producers.json';
import wineProfiles from '../data/wine-profiles.json';
import detailedGrapes from '../data/grape-profiles.json';
import {Grape,normalizeGrape} from '../lib/grape-library';
import {buildGrapeReference,GrapeReferenceProfile,GrapeTranslation,LinkedWine} from '../lib/grape-reference';
const grapes=rawGrapes as Grape[],english=new Map((translations as GrapeTranslation[]).map(g=>[g.id,g]));
const dossierIds=new Set(wineProfiles.profiles.flatMap(w=>[w.id,...w.aliases]));
const linkedWines:LinkedWine[]=rawWines.map(w=>({id:w.id,name:w.name,producer:w.producer,grapeNames:w.grapeNames,href:dossierIds.has(w.id)||(w as any).libraryWineId?'#library?type=wine&id='+((w as any).libraryWineId||w.id):'#grapes?wine='+w.id,url:w.officialUrl}));
for(const p of producerData.producers)for(const w of p.wines){
 const names=grapes.filter(g=>[g.name,...g.aliases.map(a=>a.name)].some(n=>n.length>3&&normalizeGrape(w.grape).includes(normalizeGrape(n)))).map(g=>g.name);
 linkedWines.push({id:w.id,name:w.name,producer:p.name,grapeNames:names,href:'#library?type=wine&id='+w.id});
}
const cache=new Map<string,GrapeReferenceProfile>();
function appendSourceStudies(profile:GrapeReferenceProfile,grape:Grape){
 const studies=grape.sourceStudies as {title:{en:string;zh:string};text:{en:string;zh:string};sources:{title:string;url:string}[]}[]|undefined;
 if(!studies?.length)return profile;
 const rows=studies.map((study,i)=>{
  const refs=study.sources.map((source,j)=>{
   const existing=profile.sources.find(s=>s.url===source.url);if(existing)return existing.id;
   const id=grape.id+'-review-'+i+'-'+j;profile.sources.push({...source,id});return id;
  });
  return {label:study.title,text:study.text,sources:refs,links:[]};
 });
 profile.sections.push({id:'source-studies',title:{en:'Source notes and distinctions',zh:'原笔记与重点辨析'},rows});
 return profile;
}
function preserveDetailedProfile(profile:GrapeReferenceProfile){
 const detailed=detailedGrapes.profiles.find(g=>g.id===profile.id);if(!detailed)return profile;
 const prefix=profile.id+'-';
 const rows=(id:string)=>detailed.sections.find(s=>s.id===id)?.rows.map(r=>({label:r.label,text:r.text,sources:r.sourceIds.map(s=>prefix+s),links:r.links.map(l=>({label:l.label,href:l.url}))}))||[];
 const names=rows('names');
 profile.intro=detailed.intro;
 profile.sources.push(...detailed.sources.map(s=>({...s,id:prefix+s.id})));
 profile.sections=profile.sections.map(s=>{
  if(s.id==='origin')return {...s,rows:[...s.rows,...rows('history')]};
  if(s.id==='synonyms')return {...s,rows:[names[0],...s.rows.filter(r=>!names[0].text.en.includes(r.label.en))]};
  if(s.id==='parentage')return {...s,rows:[names[1]]};
  const richer=rows(s.id);return richer.length?{...s,rows:richer}:s;
 });
 const service=rows('service');if(service.length)profile.sections.push({id:'service',title:{en:'Service',zh:'侍酒服务'},rows:service});
 const wines=detailed.wines.map(w=>{
  const existing=profile.wines.find(x=>normalizeGrape(x.producer+' '+x.name)===normalizeGrape(w.producer+' '+w.name));
  return existing||{id:w.id,producer:w.producer,name:w.name,href:w.href,url:w.officialUrl};
 });
 const seen=new Set(wines.map(w=>normalizeGrape(w.producer+' '+w.name)));
 profile.wines=[...wines,...profile.wines.filter(w=>!seen.has(normalizeGrape(w.producer+' '+w.name)))];
 profile.inlineLinks=[...profile.sections.flatMap(s=>s.rows.flatMap(r=>r.links)),...profile.wines.map(w=>({label:w.name,href:w.href})),...profile.inlineLinks];
 return profile;
}
export function getGrapeReference(id:string){
 const ready=cache.get(id);if(ready)return ready;
 const custom=curated.find(p=>p.id===id);
 if(custom){const p={...custom,wines:custom.wines.map(w=>({...w,href:'#library?type=wine&id='+w.id}))} as GrapeReferenceProfile;cache.set(id,p);return p}
 const grape=grapes.find(g=>g.id===id),en=english.get(id);if(!grape||!en)return undefined;
 const p=appendSourceStudies(preserveDetailedProfile(buildGrapeReference(grape,en,grapes,linkedWines)),grape);cache.set(id,p);return p;
}
