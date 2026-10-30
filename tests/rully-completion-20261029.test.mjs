import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const db=read('data/producers.json'),cards=read('data/grape-wines.json'),regions=read('data/region-dossiers.json'),grapes=read('data/grape-varieties.json');
const ref=read('data/rully-reference.json'),manifest=read('research/rully-completion-20261029/release-manifest.json');
const prior=JSON.parse(execFileSync('git',['show','da2afbc1ef797896f3cc42b5d9748098308a0f1e:data/producers.json'],{maxBuffer:30*1024*1024}));
for(const p of prior.producers.filter(p=>!p.regionIds?.includes('fr-rully')))assert.deepEqual(db.producers.find(x=>x.id===p.id),p,'Unrelated producer preserved '+p.id);
const ps=db.producers.filter(p=>p.regionIds?.includes('fr-rully')),ws=ps.flatMap(p=>p.wines),wineMap=new Map(ws.map(w=>[w.id,w]));
assert.equal(ps.length,20);assert.equal(ws.length,148);assert.equal(wineMap.size,148);
const sourceIds=new Set(db.sources.map(s=>s.id)),grapeIds=new Set(grapes.map(g=>g.id));
for(const p of ps){
 assert(p.intro.length>30&&p.translations.en.intro.length>50,p.id+' bilingual producer');
 for(const s of p.sections)for(const id of s.sourceIds)assert(sourceIds.has(id),id);
 for(const w of p.wines){
  assert.equal(w.status,'source-reviewed');assert.equal(w.sourceVerifiedAt,'2026-10-29');
  for(const key of ['place','grape','method','detail','vintageScope']){
   assert(w[key]?.trim().length>0,w.id+' '+key);assert(w.translations.en[key]?.trim().length>0,w.id+' English '+key);
   assert.doesNotMatch(w[key]+w.translations.en[key],/vintage_records|TODO|待补充正文/);
  }
  assert(w.sourceIds.length);for(const id of w.sourceIds)assert(sourceIds.has(id),id);
  for(const id of w.grapeIds)assert(grapeIds.has(id),id);
  const card=cards.find(c=>c.libraryWineId===w.id);assert(card,w.id+' native card');assert.equal(card.regionId,'fr-rully');
  for(const id of w.climatIds)assert(ref.climats.some(c=>c.id===id&&c.wineMatches.some(x=>x.id===w.id)),w.id+' reciprocal climat');
 }
}
assert.equal(manifest.originalWineIds.length,93);for(const id of manifest.originalWineIds)assert(wineMap.has(id),id+' retained');
assert.equal(ref.climats.length,23);assert.equal(new Set(ref.climats.map(c=>c.id)).size,23);assert.equal(ref.climats.filter(c=>c.commune==='Chagny').length,2);
for(const c of ref.climats){assert(c.intro.en&&c.intro.zh);assert(c.wineMatches.length>0,c.name+' linked wine');assert(c.facts.length);for(const id of c.sourceIds)assert(ref.sources.some(s=>s.id===id),id);for(const w of c.wineMatches)assert(wineMap.get(w.id)?.climatIds.includes(c.id));}
const w=id=>wineMap.get(id);
assert.equal(w('wine-fr-de-villaine-rully-1er-cuvee-ronde').climatIds.length,6);
assert.equal(w('wine-fr-de-villaine-rully-blanc-les-saint-jacques').climatIds.length,0);
assert.deepEqual(w('wine-fr-de-villaine-rully-1er-rouge-les-champs-cloux').climatIds,['fr-rully-climat-champs-cloux']);
assert(!ref.climats.some(c=>/Stellaris/.test(c.name)));
assert(w('wine-fr-saint-jacques-rully-1er-blanc-stellaris-campus').climatIds.length===2);
assert.equal(ref.census.length,68);const local=ref.census.filter(c=>c.locality==='rully');assert.equal(local.length,14);for(const c of local)assert(ps.some(p=>p.id===c.producerId),c.name);
const r=regions.find(r=>r.id==='fr-rully');assert.equal(r.wines.length,148);assert.deepEqual(r.questions,[]);assert.match(JSON.stringify(r),/8[ ,]?000/);
assert(r.grapes.some(g=>g.grapeId==='pinot-gris'));assert(grapes.find(g=>g.id==='pinot-gris').regions.some(r=>r.name==='Rully'));
assert.equal(read('data/france-library-progress.json').nextVillage,'Mercurey');
console.log('PASS: Rully 20 producers / 148 wines; original 93 retained and bilingual; 23 climats; reciprocal links; all 14 local BIVB entries; unrelated profiles preserved; next Mercurey.');
