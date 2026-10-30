import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const db=read('data/producers.json'),cards=read('data/grape-wines.json'),regions=read('data/region-dossiers.json'),grapes=read('data/grape-varieties.json');
const baseline=JSON.parse(execFileSync('git',['show','c44772b8cff6d18e2b80e5ffd1bd87f99eab03bb:data/producers.json'],{maxBuffer:20*1024*1024}));
for(const p of baseline.producers)assert.deepEqual(db.producers.find(x=>x.id===p.id),p,'Existing producer preserved: '+p.id);
const ids=new Set(db.producers.map(p=>p.id));assert.equal(ids.size,db.producers.length);
const allWines=db.producers.flatMap(p=>p.wines),wineIds=new Set(allWines.map(w=>w.id));assert.equal(wineIds.size,allWines.length);
const added=db.producers.filter(p=>!baseline.producers.some(x=>x.id===p.id));assert(added.length>=13);
const regionIds=new Set([...regions.map(r=>r.id),'bouzeron']),grapeIds=new Set(grapes.map(g=>g.id)),sourceIds=new Set(db.sources.map(s=>s.id));
for(const p of added){
 assert.equal(p.country,'France');assert(p.intro.length>50&&p.sections.length>=2,p.id+' substantive profile');
 for(const id of p.regionIds||[])assert(regionIds.has(id),p.id+' region '+id);
 for(const s of p.sections)for(const id of s.sourceIds)assert(sourceIds.has(id),p.id+' source '+id);
 for(const w of p.wines){
  assert(w.sourceIds.length,w.id+' evidence');
  for(const id of w.sourceIds)assert(sourceIds.has(id),w.id+' source '+id);
  for(const id of w.grapeIds||[])assert(grapeIds.has(id),w.id+' grape '+id);
  for(const id of [w.regionId,w.geographicContextRegionId].filter(Boolean))assert(regionIds.has(id),w.id+' region '+id);
  assert(cards.some(c=>c.libraryWineId===w.id),w.id+' grape-directory entry');
 }
}
const etoile=allWines.find(w=>w.id==='wine-fr-domaines-ott-cotes-de-provence-etoile');
assert(etoile);assert.match(etoile.denomination,/Vin de France/i);assert.equal(etoile.regionId,undefined);assert.equal(etoile.geographicContextRegionId,'fr-provence');assert.match(etoile.vintageScope,/2024/);
assert(!wineIds.has('wine-fr-domaine-tempier-bandol-bandol-rouge'),'Ambiguous legacy label stays held');
for(const p of added)for(const id of p.relatedProducerIds)assert(ids.has(id),'Producer relation '+id);
for(const s of db.sources.filter(s=>added.some(p=>p.sections.some(x=>x.sourceIds.includes(s.id))||p.wines.some(w=>w.sourceIds.includes(s.id))))){assert.doesNotMatch(s.url,/["<>]/);new URL(s.url);}
console.log(`PASS: ${added.length} new French producer profiles; original profiles unchanged; IDs, source references, grape/region links, dated Étoile origin and held legacy identity verified.`);
