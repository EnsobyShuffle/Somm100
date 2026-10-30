import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(p,'utf8')),save=(p,d)=>writeFileSync(p,JSON.stringify(d,null,2)+'\n');
const base='research/rully-completion-20261029/';
const files=['dureuil-villaine','jacqueson-ninot','defaix-briday','belleville-folie','mages-ponsot-jacques','suremain-final','bressande-final'];
const batches=files.map(f=>read(base+f+'.json'));
const census=existsSync(base+'census-additions.json')?read(base+'census-additions.json'):{census:[],producers:[],sources:[],verification:{pending:true}};
const atlas=read(base+'region-climats.json');
const db=read('data/producers.json'),cards=read('data/grape-wines.json'),grapes=read('data/grape-varieties.json'),regions=read('data/region-dossiers.json');
const old=read('research/content-release-20261029/rully-native.json');
const originalIds=old.producers.flatMap(p=>p.wines.map(w=>w.id));
const patches=[...batches.flatMap(b=>b.producers),...census.producers];
const sourceMap=new Map(db.sources.map(s=>[s.id,s]));
for(const s of [...batches.flatMap(b=>b.sources),...atlas.sources,...census.sources]){
 if(!s.id||!/^https?:\/\//.test(s.url))throw Error('Invalid source '+JSON.stringify(s));
 sourceMap.set(s.id,{...sourceMap.get(s.id),...s});
}
const sourceIds=new Set(sourceMap.keys()),grapeMap=new Map(grapes.map(g=>[g.id,g]));
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const cl=atlas.climats;
const matches=w=>{
 const explicit=w.climatNames||[];
 if(explicit.length)return cl.filter(c=>explicit.some(n=>[c.name,...c.aliases].some(a=>normalize(a)===normalize(n))));
 if(!/premier cru|1er cru/i.test(w.denomination||w.name))return [];
 if(w.id==='wine-fr-de-villaine-rully-1er-cuvee-ronde')return cl.filter(c=>['Margotés','Grésigny','Montpalais','Cloux','Raclot','Rabourcé'].includes(c.name));
 const name=' '+normalize(w.name)+' ';
 const found=cl.filter(c=>[c.name,...c.aliases].some(a=>name.includes(' '+normalize(a)+' ')));
 return found.filter(c=>!found.some(other=>other!==c&&[other.name,...other.aliases].some(a=>normalize(a).endsWith(' '+normalize(c.name)))));
};
for(const p of patches){
 if(!p.translations?.en||!p.sections.length)throw Error('Incomplete producer '+p.id);
 for(const w of p.wines){
  if(w.status!=='source-reviewed')throw Error('Unreviewed wine '+w.id);
  if(!w.translations?.en)throw Error('Missing English '+w.id);
  for(const key of ['place','grape','method','detail','vintageScope'])if(!w[key]||!w.translations.en[key])throw Error('Missing '+key+' '+w.id);
  for(const id of w.sourceIds)if(!sourceIds.has(id))throw Error('Unknown source '+id);
  for(const id of w.grapeIds)if(!grapeMap.has(id))throw Error('Unknown grape '+id);
  w.climatIds=matches(w).map(c=>c.id);
  if(w.technicalVintage&&!w.vintage)w.vintage=w.technicalVintage;
  const fields=w.translations.en;
  const card={id:w.id,libraryWineId:w.id,producerId:p.id,name:w.name,producer:p.name,country:'France',region:w.denomination||'Rully',regionId:'fr-rully',grapeNames:w.grapeIds.map(id=>grapeMap.get(id).name),description:w.detail,composition:w.grape,style:w.detail,serving:w.serving||'具体饮用建议见酒款正文；按年份、酒龄和瓶况调整。',vintage:w.vintage||null,officialUrl:w.officialUrl||sourceMap.get(w.sourceIds[0]).url,sources:w.sourceIds.map(id=>({title:sourceMap.get(id).title,url:sourceMap.get(id).url,note:'来源核对：2026-10-29；技术年份及未标年份资料范围见正文。'})),reviewed:'2026-10-29',status:'source-reviewed',sourceVerifiedAt:'2026-10-29',climatIds:w.climatIds,en:{description:fields.detail,composition:fields.grape,style:fields.detail,serving:fields.serving||'See the wine profile; adjust service to the vintage, maturity and bottle condition.'}};
  for(const key of ['imageUrl','imageSourceUrl','imageCredit','imageType','imageScope'])if(w[key])card[key]=w[key];
  const i=cards.findIndex(c=>c.id===w.id);if(i>=0)cards[i]={...cards[i],...card};else cards.push(card);
 }
 const i=db.producers.findIndex(x=>x.id===p.id);if(i>=0)db.producers[i]=p;else db.producers.push(p);
}
for(const row of census.census)if(row.name==='Domaine De Suremain Eric'){row.producerId='producer-fr-eric-de-suremain';row.profileStatus='source-reviewed-profile';}
const rullyProducers=db.producers.filter(p=>p.regionIds?.includes('fr-rully'));
const wineEntries=rullyProducers.flatMap(p=>p.wines.map(w=>({...w,producerId:p.id,producer:p.name})));
for(const id of originalIds)if(!wineEntries.some(w=>w.id===id))throw Error('Lost original wine '+id);
for(const c of cl)c.wineMatches=wineEntries.filter(w=>w.climatIds?.includes(c.id)).map(w=>({id:w.id,name:w.name,producerId:w.producerId,producer:w.producer}));
const r=atlas.region;
r.wines=wineEntries.map(w=>({name:w.name,producer:w.producer,url:'#library?type=wine&id='+w.id,note:{en:w.translations.en.detail,zh:w.detail}}));
// Detailed climat facts are rendered by the compact reference component.
r.sections=r.sections.filter(s=>s.id!=='climats');
r.questions=[];r.reviewed='2026-10-29';
const i=regions.findIndex(x=>x.id==='fr-rully');regions[i]=r;
for(const link of r.grapes){const g=grapeMap.get(link.grapeId);if(!g)throw Error('Unknown legal grape '+link.grapeId);if(!g.regions.some(x=>x.name==='Rully'&&x.country==='France'))g.regions.push({name:'Rully',country:'France',note:link.role.zh});}
db.sources=[...sourceMap.values()];db.checkedAt='2026-10-29';
const facts={reviewedAt:'2026-10-29',originalWineCount:originalIds.length,reviewedOriginalCount:originalIds.filter(id=>wineEntries.some(w=>w.id===id&&w.status==='source-reviewed')).length,producerCount:rullyProducers.length,wineCount:wineEntries.length,climatCount:cl.length,linkedClimatCount:cl.filter(c=>c.wineMatches.length).length,imageCount:wineEntries.filter(w=>w.imageUrl).length,censusCount:census.census.length,scope:'Published Rully wine dossiers, complete Premier Cru identity list, appellation reference, and dated BIVB operator directory. The directory is not an exhaustive worldwide producer or vintage census.'};
save('data/producers.json',db);save('data/grape-wines.json',cards);save('data/grape-varieties.json',grapes);save('data/region-dossiers.json',regions);
save('data/rully-reference.json',{...facts,climats:cl,census:census.census,sources:[...atlas.sources,...census.sources],censusVerification:census.verification});
save(base+'release-manifest.json',{...facts,originalWineIds:originalIds,producerIds:rullyProducers.map(p=>p.id),newWineIds:wineEntries.filter(w=>!originalIds.includes(w.id)).map(w=>w.id),verification:batches.map(b=>b.verification),census:census.verification});
if(census.census.length)save('data/france-library-progress.json',{updatedAt:'2026-10-29',nextVillage:'Mercurey',villages:[{id:'fr-rully',name:'Rully',status:'reference-release-complete',...facts}],maintenance:['New vintages and source changes','Unpublished technical parameters','Additional producers outside the current reference selection']});
console.log(JSON.stringify(facts,null,2));
