import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {loadTypeScript} from './load-typescript.mjs';
const read=n=>JSON.parse(readFileSync(new URL('../data/'+n,import.meta.url),'utf8'));
const {resolveRegion,regionGrapeIds,filterRegions}=await loadTypeScript('../lib/region-library.ts');
const {regionHref,resolveGrape,normalizeGrape}=await loadTypeScript('../lib/grape-library.ts');
const {getReviewSet}=await loadTypeScript('../lib/region-review.ts');
const regions=read('region-dossiers.json'),index=read('region-index.json'),grapes=read('grape-varieties.json'),audit=read('linked-country-audit.json');
assert(regions.length>=100,'substantial connected France/Italy coverage');
assert.deepEqual(index.map(r=>r.id),regions.map(r=>r.id));
assert.equal(new Set(regions.map(r=>r.id)).size,regions.length);
const italianNames=['Piemonte',"Valle d’Aosta",'Liguria','Lombardia','Veneto','Trentino-Alto Adige','Friuli-Venezia Giulia','Emilia-Romagna','Toscana','Umbria','Marche','Lazio','Abruzzo','Molise','Campania','Basilicata','Puglia','Calabria','Sicilia','Sardegna'];
for(const name of italianNames){const r=resolveRegion(regions,name,'Italy');assert(r,name+' admin overview resolves');assert.equal(r.kind,'region');assert(r.sections.length>=8,name+' substantive template');for(const [level,n] of [['foundation',10],['advanced',20]])assert.equal(getReviewSet(r.questions,level).length,0,name+' '+level+' generated bank retired')}
for(const r of regions){
 const sources=new Set(r.sources.map(s=>s.id));assert.equal(sources.size,r.sources.length);assert(r.sections.length>=5,r.id+' section coverage');assert(r.intro.en&&r.intro.zh);
 for(const s of r.sections){assert(s.rows.length&&s.title.en&&s.title.zh,r.id+' section');assert(s.refs.length||s.editorial,r.id+' evidence');for(const id of s.refs)assert(sources.has(id),r.id+' source '+id);for(const row of s.rows)assert(row.body.en&&row.body.zh&&row.label.en&&row.label.zh)}
 for(const c of r.grapes){const g=grapes.find(g=>g.id===c.grapeId);assert(g,r.id+' grape '+c.grapeId);assert(g.countries.includes(r.country));assert(g.regions.some(x=>normalizeGrape(x.name)===normalizeGrape(r.name)&&x.country===r.country),r.id+' reciprocal region link');assert(c.sourceIds.length);c.sourceIds.forEach(id=>assert(sources.has(id)));assert.equal(regionHref(r.name,r.country),'#library?type=region&id='+r.id,r.id+' direct grape-to-region route')}
 if(r.parentId){const parent=regions.find(p=>p.id===r.parentId);assert(parent&&parent.country===r.country);assert(r.grapes.every(g=>regionGrapeIds(index,parent.id).has(g.grapeId)),r.id+' parent descendant grapes')}
 assert.equal(new Set(r.questions.map(q=>q.q.en)).size,r.questions.length,r.id+' distinct questions');
 for(const q of r.questions){assert(q.q.en&&q.q.zh&&q.a.en&&q.a.zh);assert(q.refs.length);q.refs.forEach(id=>assert(sources.has(id)));assert(!/\p{Script=Han}/u.test(q.a.en))}
}
for(const id of audit.newGrapeIds){assert(grapes.some(g=>g.id===id));assert(regions.some(r=>r.country==='Italy'&&r.grapes.some(g=>g.grapeId===id)),id+' linked to Italy')}
assert(filterRegions(index,'','Italy').every(r=>r.country==='Italy'));
assert(filterRegions(index,'','France','appellation').every(r=>r.kind==='appellation'&&r.country==='France'));
const ambiguous=[{id:'a',name:'A',country:'Italy',aliases:['Shared']},{id:'b',name:'B',country:'Italy',aliases:['Shared']}];assert.equal(resolveRegion(ambiguous,'Shared'),undefined);
for(const name of ['Barolo','Barbaresco','Etna'])assert(resolveRegion(regions,name,'Italy'),name+' reference destination');
assert(resolveGrape(grapes,'Pecorino'));assert(resolveGrape(grapes,'Passerina'));
const ui=readFileSync(new URL('../app/RegionDossier.tsx',import.meta.url),'utf8');assert(ui.includes('hidden={!open[q.id]}'),'answers start hidden');assert(ui.includes("'somm100.region.'+r.id+'.review.v1'"),'review marks scoped by region');
assert(!audit.italianRegistryComplete&&!audit.allItalianAppellationsComplete,'honest coverage scope');
console.log(`PASS: ${regions.length} linked region dossiers; all 20 Italian regions; ${audit.newGrapeIds.length} new grape identities; sourced bilingual links and retired generated Review sets.`);
