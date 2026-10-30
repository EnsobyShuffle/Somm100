import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const base=new URL('../../data/',import.meta.url),read=n=>JSON.parse(readFileSync(new URL(n,base),'utf8'));
const normalize=s=>s.replace(/[œŒ]/g,'oe').replace(/[æÆ]/g,'ae').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'").replace(/ß/g,'ss').replace(/ı/g,'i').replace(/ł/g,'l').toLowerCase().replace(/[-\s]+/g,' ').trim();
const args=process.argv.slice(2),dry=args.includes('--dry-run'),files=args.filter(a=>a!=='--dry-run');assert(files.length,'Pass batch JSON paths');
const grapes=read('grape-varieties.json'),translations=read('grape-reference-translations.json'),wines=read('grape-wines.json'),regions=read('region-dossiers.json');
const original={grapes:grapes.length,regions:regions.length,wines:wines.length};
const byId=new Map(grapes.map(g=>[g.id,g])),enById=new Map(translations.map(t=>[t.id,t]));
const batches=files.map(file=>({file,batch:JSON.parse(readFileSync(file,'utf8'))}));
const newIds=[],unresolved=[],evidence=[],corrections=[];
const url=u=>assert(/^https?:\/\//.test(u),'Invalid source URL '+u);
const bilingual=(v,at)=>assert(v?.en?.trim()&&v?.zh?.trim()&&!/\p{Script=Han}/u.test(v.en),at+' bilingual');
function resolve(name){const n=normalize(name),direct=grapes.find(g=>g.id===name||normalize(g.name)===n);if(direct)return direct;const match=grapes.filter(g=>g.aliases.some(a=>normalize(a.name)===n));return match.length===1?match[0]:undefined}
for(const {file,batch:b} of batches){
 assert(Array.isArray(b.grapes)&&Array.isArray(b.translations)&&Array.isArray(b.regions),file+' batch arrays');
 assert.deepEqual(b.grapes.map(g=>g.id).sort(),b.translations.map(g=>g.id).sort(),file+' translation identities');
 for(const g of b.grapes){
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(g.id),g.id+' identifier');assert(!byId.has(g.id)&&!resolve(g.name),g.id+' duplicate identity '+resolve(g.name)?.id);
  const t=b.translations.find(t=>t.id===g.id);
  for(const f of ['name','zh','origin','summary','viticulture','winemaking','taste','confusions','reviewed'])assert(typeof g[f]==='string'&&g[f].trim(),g.id+' '+f);
  for(const f of ['origin','summary','viticulture','winemaking','taste','confusions','geneticsNote','species','originCountry'])assert(typeof t[f]==='string'&&t[f].trim()&&!/\p{Script=Han}/u.test(t[f]),g.id+' en '+f);
  assert(['white','red','pink'].includes(g.color)&&g.countries.length&&g.regions.length&&g.sources.length,g.id+' grape fields');
  assert(['unknown','mutation','bred-cross','natural-cross'].includes(g.genetics.type)&&Array.isArray(g.genetics.parents)&&g.genetics.note,g.id+' genetics');
  assert.deepEqual(g.aliases.map(a=>a.name),t.aliases.map(a=>a.name),g.id+' aliases');assert.deepEqual(g.regions.map(a=>a.name),t.regions.map(a=>a.name),g.id+' regions');
  for(const a of t.aliases)assert(a.context&&!/\p{Script=Han}/u.test(a.context),g.id+' alias English');for(const r of t.regions)assert(r.note&&!/\p{Script=Han}/u.test(r.note),g.id+' region English');
  const urls=new Set(g.sources.map(s=>s.url));for(const u of urls)url(u);
  for(const row of g.referenceRows||[]){assert(['origin','parentage','viticulture','vinification','tasting','similar'].includes(row.section),g.id+' row section');bilingual(row.label,g.id);bilingual(row.text,g.id);assert(row.sourceUrls.length,g.id+' row evidence');row.sourceUrls.forEach(u=>assert(urls.has(u),g.id+' row source '+u))}
  if(g.originalImageUrl&&!g.imageUrl)g.imageUrl=g.originalImageUrl;
  grapes.push(g);translations.push(t);byId.set(g.id,g);enById.set(g.id,t);newIds.push(g.id);
 }
 unresolved.push(...(b.unresolved||[]));evidence.push(...(b.evidence||[]));corrections.push(...(b.corrections||[]));
}
for(const {batch:b} of batches){
 for(const u of b.existingUpdates||[]){
  const g=byId.get(u.id),t=enById.get(u.id);assert(g,u.id+' missing existing grape');
  for(const c of u.countriesAdd||[])if(!g.countries.includes(c))g.countries.push(c);
  for(const a of u.aliasesAdd||[])if(!g.aliases.some(x=>normalize(x.name)===normalize(a.name))){assert(a.enContext||a.context.en,u.id+' missing alias translation');g.aliases.push({name:a.name,context:typeof a.context==='string'?a.context:a.context.zh});if(t)t.aliases.push({name:a.name,context:a.enContext||a.context.en})}
  for(const r of u.regionsAdd||[])if(!g.regions.some(x=>normalize(x.name)===normalize(r.name)&&x.country===r.country)){assert(r.enNote||r.note.en,u.id+' missing region translation');g.regions.push({name:r.name,country:r.country,note:typeof r.note==='string'?r.note:r.note.zh});if(!g.countries.includes(r.country))g.countries.push(r.country);if(t)t.regions.push({name:r.name,note:r.enNote||r.note.en})}
  for(const s of u.sourcesAdd||[]){url(s.url);if(!g.sources.some(x=>x.url===s.url))g.sources.push(s)}
 }
 for(const w of b.wines||[]){assert(!wines.some(x=>x.id===w.id||normalize(x.producer+' '+x.name)===normalize(w.producer+' '+w.name)),w.id+' duplicate wine');assert(w.name&&w.producer&&w.officialUrl&&w.sources?.length&&w.grapeNames?.length&&w.en,w.id+' wine fields');url(w.officialUrl);for(const n of w.grapeNames)assert(resolve(n),w.id+' unknown grape '+n);wines.push(w)}
 for(const r of b.regions){
  assert(!regions.some(x=>x.id===r.id),r.id+' duplicate region');assert(r.name&&r.country&&['region','appellation','subregion'].includes(r.kind),r.id+' identity');bilingual(r.intro,r.id);assert(r.sources.length&&r.facts.length&&r.sections.length>=5,r.id+' minimum dossier coverage');
  r.aliases||=[];r.wines||=[];r.questions||=[];const refs=new Set(r.sources.map(s=>s.id));assert(refs.size===r.sources.length,r.id+' duplicate source');r.sources.forEach(s=>url(s.url));
  const checkRefs=(list,where,optional=false)=>{assert(Array.isArray(list)&&(list.length||optional),r.id+' '+where+' missing evidence');for(const id of list)assert(refs.has(id),r.id+' '+where+' unresolved source '+id)};
  for(const f of r.facts){bilingual(f.label,r.id);bilingual(f.body,r.id)}
  assert(new Set(r.sections.map(s=>s.id)).size===r.sections.length,r.id+' duplicate sections');
  for(const s of r.sections){bilingual(s.title,r.id);if(s.lead)bilingual(s.lead,r.id);assert(s.rows.length,r.id+' empty section');for(const row of s.rows){bilingual(row.label,r.id);bilingual(row.body,r.id)}checkRefs(s.refs,s.id,!!s.editorial)}
  const linked=new Set();for(const g of r.grapes){assert(byId.has(g.grapeId),r.id+' unknown grape '+g.grapeId);assert(!linked.has(g.grapeId),r.id+' repeated grape '+g.grapeId);linked.add(g.grapeId);bilingual(g.role,r.id);checkRefs(g.sourceIds,g.grapeId)}
  assert(new Set(r.questions.map(q=>q.id)).size===r.questions.length,r.id+' duplicate question IDs');assert(new Set(r.questions.map(q=>q.q.en)).size===r.questions.length,r.id+' duplicate question text');
  for(const q of r.questions){assert(['foundation','advanced'].includes(q.level)&&['place','law','people','service'].includes(q.group),r.id+' question type');bilingual(q.q,r.id);bilingual(q.a,r.id);if(q.note)bilingual(q.note,r.id);checkRefs(q.refs,q.id)}
  for(const w of r.wines){assert(w.name&&w.producer,r.id+' wine');url(w.url);bilingual(w.note,r.id)}
  regions.push(r);
 }
}
const regionById=new Map(regions.map(r=>[r.id,r]));
for(const r of regions){
 const seen=new Set([r.id]);let p=r;while(p.parentId){const parent=regionById.get(p.parentId);assert(parent&&parent.country===r.country,r.id+' missing/mismatched parent '+p.parentId);assert(!seen.has(parent.id),r.id+' parent cycle');seen.add(parent.id);p=parent}
 for(const relation of r.grapes){const g=byId.get(relation.grapeId),t=enById.get(relation.grapeId);if(!g.countries.includes(r.country))g.countries.push(r.country);if(!g.regions.some(x=>normalize(x.name)===normalize(r.name)&&x.country===r.country)){g.regions.push({name:r.name,country:r.country,note:relation.role.zh});if(t)t.regions.push({name:r.name,note:relation.role.en})}for(const sid of relation.sourceIds){const s=r.sources.find(x=>x.id===sid);if(!g.sources.some(x=>x.url===s.url))g.sources.push({title:s.title,url:s.url})}}
}
for(const id of newIds)assert(regions.some(r=>r.country==='Italy'&&r.grapes.some(g=>g.grapeId===id)),id+' not linked to an Italian dossier');
for(const g of grapes){const t=enById.get(g.id);if(t){assert.deepEqual(g.aliases.map(a=>a.name),t.aliases.map(a=>a.name),g.id+' final alias alignment');assert.deepEqual(g.regions.map(a=>a.name),t.regions.map(a=>a.name),g.id+' final region alignment')}}
const sort=(a,b)=>a.id.localeCompare(b.id);grapes.sort(sort);translations.sort(sort);regions.sort(sort);
const index=regions.map(r=>({id:r.id,name:r.name,country:r.country,kind:r.kind,parentId:r.parentId,aliases:r.aliases,intro:r.intro,grapeIds:r.grapes.map(g=>g.grapeId),questionCount:r.questions.length}));
const audit={reviewed:'2026-10-26',baseline:original,addedGrapes:newIds.length,addedRegions:regions.length-original.regions,addedWines:wines.length-original.wines,newGrapeIds:newIds,totalGrapes:grapes.length,regionDossiers:regions.length,questions:regions.reduce((n,r)=>n+r.questions.length,0),countryCounts:Object.fromEntries(['France','Italy'].map(c=>[c,{grapes:grapes.filter(g=>g.countries.includes(c)).length,regionDossiers:regions.filter(r=>r.country===c).length,connections:regions.filter(r=>r.country===c).reduce((n,r)=>n+r.grapes.length,0),questions:regions.filter(r=>r.country===c).reduce((n,r)=>n+r.questions.length,0)}])),unresolved,evidence,correctionsPendingReview:corrections,italianRegistryComplete:false,allItalianAppellationsComplete:false};
if(!dry){for(const [name,value] of Object.entries({'grape-varieties.json':grapes,'grape-reference-translations.json':translations,'grape-wines.json':wines,'region-dossiers.json':regions,'region-index.json':index,'linked-country-audit.json':audit}))writeFileSync(new URL(name,base),JSON.stringify(value,null,2)+'\n')}
console.log(JSON.stringify({dryRun:dry,...audit,unresolved:unresolved.length,evidence:evidence.length,correctionsPendingReview:corrections.length,newGrapeIds:undefined},null,2));
