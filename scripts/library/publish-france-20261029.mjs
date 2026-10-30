import {readFileSync,writeFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const save=(p,d)=>writeFileSync(p,JSON.stringify(d,null,2)+'\n');
const db=read('data/producers.json'),cards=read('data/grape-wines.json'),regions=read('data/region-dossiers.json'),grapes=read('data/grape-varieties.json');
const copy=read('research/content-release-20261029/notion-publication-copy.json');
const rully=read('research/content-release-20261029/rully-native.json');
const before={producers:db.producers.length,wines:db.producers.flatMap(p=>p.wines).length,cards:cards.length,regions:regions.length};
const cleanUrl=u=>u?.trim().replace(/["'<>]+$/g,'')||'';
const sources=new Map(db.sources.map(s=>[s.id,s]));
for(const s of [...copy.sources,...rully.sources]){const url=cleanUrl(s.url);if(!/^https?:\/\//.test(url))throw Error('Invalid source '+s.id);if(!sources.has(s.id))sources.set(s.id,{...s,url});}
const knownGrapes=new Map(grapes.map(g=>[g.id,g]));
const existingWineIds=new Set(db.producers.flatMap(p=>p.wines.map(w=>w.id)));
for(const p of copy.producers){
 if(db.producers.some(x=>x.id===p.id))continue;
 const wines=copy.wines.filter(w=>w.producerId===p.id&&!existingWineIds.has(w.id)).map(w=>({id:w.id,name:w.name.replace(new RegExp('^'+p.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s*[—–-]\\s*'),''),place:w.vineyard,grape:w.composition,method:w.method,detail:[w.description,w.style].filter(Boolean).join('\n'),sourceIds:w.sources.map(s=>s.id),status:'research-draft-english',contentLanguage:'en',vintage:w.vintage,vintageScope:w.vintageScope,grapeIds:w.grapeIds,regionId:w.regionId||undefined,geographicContextRegionId:w.geographicContextRegionId||undefined,denomination:w.denomination||'',sourcesReviewedIndependently:false}));
 const related=p.id==='producer-fr-domaines-ott'?copy.producers.filter(x=>x.id.startsWith(p.id+'-')).map(x=>x.id):p.id.startsWith('producer-fr-domaines-ott-')?['producer-fr-domaines-ott']:[];
 db.producers.push({id:p.id,name:p.name,country:'France',region:p.region,regionIds:[p.regionId].filter(Boolean),appellation:p.appellation,village:p.village||'',website:cleanUrl(p.website),intro:p.intro,scope:'English first edition. Chinese translation and vintage-specific expansion are in progress.',status:'research-draft-english',contentLanguage:'en',relatedProducerIds:related,newsIds:[],sections:p.sections,wines,questions:[],gaps:['Chinese translation','Bottle photographs','Additional vintage-specific technical sheets'],provenance:{researchSource:p.notionSource,published:'2026-10-29',sourceVerification:'Existing sourced research; this release checks mapping, identity and dated scope.'}});
 for(const w of copy.wines.filter(w=>w.producerId===p.id)){
  const native=wines.find(x=>x.id===w.id);if(!native||cards.some(c=>c.id===w.id))continue;
  cards.push({id:w.id,name:native.name,producer:p.name,producerId:p.id,libraryWineId:w.id,regionId:w.regionId||undefined,geographicContextRegionId:w.geographicContextRegionId||undefined,grapeNames:w.grapeIds.map(id=>knownGrapes.get(id)?.name).filter(Boolean),country:'France',region:w.denomination||w.region,description:w.description,composition:w.composition,style:w.style,serving:w.serving||'Consult the producer’s advice for the specific vintage and bottle condition.',vintage:w.vintage,officialUrl:cleanUrl(w.officialUrl||w.sources[0]?.url),sources:w.sources.map(s=>({title:s.title,url:cleanUrl(s.url),note:'Existing source research · first edition; vintage qualifications apply.'})),reviewed:'2026-10-29',status:'research-draft-english'});
 }
}
for(const p of rully.producers)if(!db.producers.some(x=>x.id===p.id))db.producers.push(p);
for(const c of rully.grapeWines)if(!cards.some(x=>x.id===c.id||x.libraryWineId===c.libraryWineId))cards.push(c);
for(const r of rully.regions)if(!regions.some(x=>x.id===r.id))regions.push(r);
for(const r of rully.regions)for(const link of r.grapes){
 const g=knownGrapes.get(link.grapeId);if(!g)throw Error('Unknown grape '+link.grapeId);
 if(!g.regions.some(x=>x.country===r.country&&x.name===r.name))g.regions.push({name:r.name,country:r.country,note:link.role.zh});
}
const importedIds=new Set([...copy.producers,...rully.producers].map(p=>p.id));
for(const p of db.producers.filter(p=>importedIds.has(p.id))){
 for(const w of p.wines){
  const regionId=w.regionId||w.geographicContextRegionId;
  const r=regions.find(r=>r.id===regionId);if(!r||r.wines.some(x=>x.url?.includes(w.id)))continue;
  r.wines.push({name:w.name,producer:p.name,url:'#library?type=wine&id='+w.id,note:{en:w.regionId?'Producer wine profile; see the stated vintage and source scope.':'Geographic context; see the wine profile for its stated legal origin.',zh:w.regionId?'酒款独立档案；年份与资料适用范围见正文。':'地理背景关联；酒款法定产地见独立档案。'}});
 }
}
db.sources=[...sources.values()];db.checkedAt='2026-10-29';
save('data/producers.json',db);save('data/grape-wines.json',cards);save('data/region-dossiers.json',regions);save('data/grape-varieties.json',grapes);
const france=db.producers.filter(p=>p.country==='France');
const after={producers:db.producers.length,wines:db.producers.flatMap(p=>p.wines).length,cards:cards.length,regions:regions.length};
const report={date:'2026-10-29',before,after,added:Object.fromEntries(Object.keys(before).map(k=>[k,after[k]-before[k]])),france:{producers:france.length,producerWines:france.flatMap(p=>p.wines).length,grapeWineCards:cards.filter(w=>w.country==='France').length,regions:regions.filter(r=>r.country==='France').length},rully:rully.summary,holds:[...(copy.holds||[]),...(rully.holds||[])]};
save('research/content-release-20261029/release-manifest.json',report);console.log(JSON.stringify(report,null,2));
