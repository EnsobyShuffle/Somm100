import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('../../',import.meta.url);
const read=n=>JSON.parse(readFileSync(new URL(n,root),'utf8'));
const write=(n,x)=>writeFileSync(new URL(n,root),JSON.stringify(x,null,2)+'\n');
const patch=read('research/italy-linked/islands-final-corrections.json');
const grapes=read('data/grape-varieties.json'),translations=read('data/grape-reference-translations.json'),regions=read('data/region-dossiers.json'),index=read('data/region-index.json'),audit=read('data/linked-country-audit.json');
const sections={origin:'origin',viticulture:'viticulture',winemaking:'vinification',confusions:'similar',geneticsNote:'parentage'};
for(const p of patch.grapePatches){
 const g=grapes.find(g=>g.id===p.id),t=translations.find(g=>g.id===p.id);
 if(!g||!t)throw new Error('Missing identity '+p.id);
 for(const [field,value]of Object.entries(p.fields)){
  if(field==='geneticsNote')g.genetics.note=value.zh;else g[field]=value.zh;
  t[field]=value.en;
  for(const row of g.referenceRows||[])if(row.section===sections[field]){row.text=value;row.sourceUrls=p.sourceUrls;}
 }
 for(const alias of p.aliasesAdd||[])for(const [record,lang]of [[g,'zh'],[t,'en']]){const existing=record.aliases.find(a=>a.name===alias.name);if(existing)existing.context=alias.context[lang];else record.aliases.push({name:alias.name,context:alias.context[lang]});}
 for(const record of [g,t])record.regions=record.regions.filter(r=>!(p.regionsRemove||[]).includes(r.name));
 if(p.geneticsKeep)Object.assign(g.genetics,p.geneticsKeep);
 for(const url of p.sourceUrls)if(!g.sources.some(s=>s.url===url))g.sources.push({title:url.includes('cnr.it')?'Fanelli et al. (2021) · Calabrian grape identity':'Accession identity and parentage evidence',url});
}
for(const p of patch.regionPatches){
 const r=regions.find(r=>r.id===p.id);r.grapes=r.grapes.filter(g=>!p.removeGrapeIds.includes(g.grapeId));
 const row=p.sectionRowAdd,s=r.sections.find(s=>s.id===row.sectionId);
 if(!s.rows.some(x=>x.label.en===row.label.en))s.rows.push({label:row.label,body:row.body});
 s.refs=[...new Set([...s.refs,...row.refs])];
 index.find(x=>x.id===r.id).grapeIds=r.grapes.map(g=>g.grapeId);
}
for(const p of patch.unresolvedAdd)if(!audit.unresolved.some(x=>x.topic===p.topic))audit.unresolved.push(p);
for(const p of patch.grapePatches)if(!audit.correctionsReviewed.some(x=>x.topic==='Accession qualification: '+p.id))audit.correctionsReviewed.push({topic:'Accession qualification: '+p.id,grapeIds:[p.id],note:p.reason,sourceUrls:p.sourceUrls,status:'applied-and-primary-source-verified'});
for(const c of Object.keys(audit.countryCounts))audit.countryCounts[c].connections=regions.filter(r=>r.country===c).reduce((n,r)=>n+r.grapes.length,0);
for(const [name,value]of Object.entries({'grape-varieties.json':grapes,'grape-reference-translations.json':translations,'region-dossiers.json':regions,'region-index.json':index,'linked-country-audit.json':audit}))write('data/'+name,value);
console.log('Applied 3 accession-specific identity corrections and removed the unverified Calabria–Guarnaccia edge.');
