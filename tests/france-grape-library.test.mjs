import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const read=n=>JSON.parse(readFileSync(new URL('../data/'+n,import.meta.url),'utf8'));
import {loadTypeScript} from './load-typescript.mjs';
const {resolveGrape}=await loadTypeScript('../lib/grape-library.ts');
const {filterFrenchGrapes,frenchGrapeIds}=await loadTypeScript('../lib/france-grape-library.ts');
const grapes=read('grape-varieties.json'),regions=read('france-grape-regions.json'),catalogue=read('france-grape-catalogue.json');
const ids=new Set(grapes.map(g=>g.id));
assert.equal(catalogue.entries.filter(e=>e.scope==='national').length,361);
assert.equal(catalogue.entries.filter(e=>e.scope==='departmental').length,11);
assert.equal(catalogue.entries.filter(e=>e.scope==='temporary').length,8);
assert.equal(catalogue.pendingResearchCodes.length,26);
for(const e of catalogue.entries)assert(ids.has(e.grapeId),e.name+' unlinked legal name');
assert.equal(catalogue.entries.find(e=>e.name==='Auxerrois').grapeId,'auxerrois-blanc','legal white name must not resolve to Malbec');
assert.equal(resolveGrape(grapes,'Castets')?.id,'maturana-tinta');
assert.equal(resolveGrape(grapes,'Riminèse')?.id,'albana');
assert.equal(resolveGrape(grapes,'Corbeau')?.id,'douce-noire');
assert.equal(resolveGrape(grapes,'Bonarda'),undefined,'ambiguous regional alias must not silently choose a grape');
assert.equal(resolveGrape(grapes,'UD.109-033')?.id,'pinot-iskra');
const french=frenchGrapeIds(grapes,regions,catalogue);
assert(french.has('cabernet-volos'),'classification alone must be discoverable without inventing planting');
assert(!grapes.find(g=>g.id==='cabernet-volos').countries.includes('France'),'do not turn French classification into cultivated-country evidence');
for(const id of ['noah','othello','isabella','jacquez','clinton','herbemont']){assert(french.has(id));assert(!catalogue.entries.some(e=>e.grapeId===id),'excluded historic hybrid must not enter permitted lists');}
for(const m of regions){
 assert.equal(new Set(m.entries.map(e=>e.grapeId)).size,m.entries.length,m.id+' duplicate grape');
 const sourceUrls=new Set(m.sources.map(s=>s.url));
 for(const e of m.entries){assert(ids.has(e.grapeId));assert(e.note.en&&e.note.zh&&e.sourceUrls.length);for(const u of e.sourceUrls)assert(sourceUrls.has(u),m.id+' missing evidence');}
}
assert(filterFrenchGrapes(grapes,regions,catalogue,'Gringet','','','savoie').some(g=>g.id==='gringet'));
assert(!filterFrenchGrapes(grapes,regions,catalogue,'Gringet','','','bordeaux').length,'region filtering must narrow, not union, results');
assert(filterFrenchGrapes(grapes,regions,catalogue,'Tressallier').some(g=>g.id==='sacy'));
assert(filterFrenchGrapes(grapes,regions,catalogue,'','pink').every(g=>g.color==='pink'));
assert(!filterFrenchGrapes(grapes,regions,catalogue,'','','','unknown-region').length);
assert(filterFrenchGrapes(grapes,regions,catalogue,'','','O').some(g=>g.id==='oeillade-noire'),'ligature initial belongs under O');
console.log(`PASS: 380 French classification names, ${regions.length} regional groups, ${french.size} French-associated dossiers; synonym identity, legal scope, historical exclusions and combined filters.`);
