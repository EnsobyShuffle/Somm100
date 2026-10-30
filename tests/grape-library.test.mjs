import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import ts from 'typescript';
import {loadTypeScript} from './load-typescript.mjs';
const lib=await loadTypeScript('../lib/grape-library.ts');
const grapes=JSON.parse(readFileSync(new URL('../data/grape-varieties.json',import.meta.url)));
const wines=JSON.parse(readFileSync(new URL('../data/grape-wines.json',import.meta.url)));
const frenchClassified=new Set(JSON.parse(readFileSync(new URL('../data/france-grape-catalogue.json',import.meta.url))).entries.map(e=>e.grapeId));
const regionExample={regions:[{name:'Bourgogne',country:'France'},{name:'BOURGOGNE',country:'France'},{name:'Napa Valley',country:'United States'},{name:'Bulgaria',country:'Bulgaria'},{name:'France · national classification',country:'France',associationType:'classification'}]};
assert.deepEqual(lib.grapeDirectoryPreview({...regionExample,countries:['France','United States']}).map(r=>r.name),['Bourgogne','Napa Valley']);
assert.deepEqual(lib.grapeDirectoryPreview({...regionExample,countries:['France','United States','Italy','Germany','Australia']}),[],'Widespread varieties show countries only');
assert.equal(lib.grapeDirectoryPreview({...regionExample,countries:['France','United States','Italy','Germany','Australia']},'France').length,1);
assert.deepEqual(lib.grapeDirectoryRegions(regionExample).map(r=>r.name),['Bourgogne','Napa Valley']);
assert.deepEqual(lib.grapeDirectoryRegions(regionExample,'France').map(r=>r.name),['Bourgogne']);
assert.deepEqual(lib.grapeDirectoryRegions(regionExample,'Italy'),[]);
assert.deepEqual(lib.grapeDirectoryRegions({regions:[{name:'France',country:'France',associationType:'classification'}]}),[],'national classification alone must not become a region association');
assert(grapes.length>=200);assert.equal(new Set(grapes.map(g=>g.id)).size,grapes.length);
assert.equal(new Set(grapes.map(g=>lib.normalizeGrape(g.name))).size,grapes.length);
for(const g of grapes){
 for(const key of ['name','zh','summary','viticulture','winemaking','taste','origin','confusions'])assert(typeof g[key]==='string'&&g[key].length>0,`${g.id}: ${key}`);
 assert(['white','red','pink'].includes(g.color),g.id);assert(g.sources.length&&g.regions.length&&g.countries.length,g.id);
 assert(Array.isArray(g.aliases)&&Array.isArray(g.genetics.parents));assert(g.genetics.note);assert(['unknown','mutation','bred-cross','natural-cross'].includes(g.genetics.type));
 for(const s of g.sources)assert(/^https?:\/\//.test(s.url),g.id+' invalid source URL');
 if(g.imageUrl?.startsWith('/'))assert(existsSync(new URL('../public'+g.imageUrl,import.meta.url)),g.id+' missing photo');
 for(const r of g.regions)assert(g.countries.includes(r.country)||(r.associationType==='classification'&&r.country==='France'&&frenchClassified.has(g.id)),g.id+' country missing from filter or explicit classified scope');
}
for(const [query,id] of [['Primitivo','zinfandel'],['Alvarinho','albarino'],['Gouveio','godello'],['Pinot Grigio','pinot-gris'],['Ull de Llebre','tempranillo'],['Mazuelo','carignan'],['Trollinger','schiava-grossa']]){
 assert.equal(lib.filterGrapes(grapes,query)[0]?.id,id,query+' alias search');assert.equal(lib.resolveGrape(grapes,query)?.id,id,query+' canonical resolution');
}
assert(lib.filterGrapes(grapes,'','','','A').every(g=>lib.normalizeGrape(g.name).startsWith('a')));
assert(lib.filterGrapes(grapes,'','Spain','white').every(g=>g.countries.includes('Spain')&&g.color==='white'));
assert(lib.filterGrapes(grapes,'assyrtiko').length);assert(lib.filterGrapes(grapes,'赤霞珠').some(g=>g.id==='cabernet-sauvignon'));
assert.equal(lib.filterGrapes(grapes,'no-such-grape-777').length,0);
assert(lib.filterGrapes(grapes,'sauvignon','France','red').some(g=>g.id==='cabernet-sauvignon'));
const ambiguous=[{id:'one',name:'One',zh:'一',aliases:[{name:'Shared'}]},{id:'two',name:'Two',zh:'二',aliases:[{name:'Shared'}]}];
assert.equal(lib.resolveGrape(ambiguous,'Shared'),undefined,'ambiguous alias must not silently resolve');
assert.equal(lib.resolveGrape(ambiguous,'one').id,'one');
for(const [alias,id] of [['Brancellao','alvarelhao'],['Borraçal','caino-tinto'],['Gouveio Real','gouveio-real'],['Auxerrois Blanc','auxerrois-blanc']])assert.equal(lib.resolveGrape(grapes,alias)?.id,id,alias+' identity');
assert.equal(lib.resolveGrape(grapes,'Auxerrois'),undefined,'regional Auxerrois ambiguity must remain visible');
assert.equal(lib.resolveGrape(grapes,'Bonarda'),undefined,'Bonarda must not silently merge distinct varieties');
assert.notEqual(lib.resolveGrape(grapes,'Gouveio Real')?.id,lib.resolveGrape(grapes,'Gouveio')?.id);
const unresolved=[];
for(const w of wines){assert(w.id&&w.name&&w.description&&w.composition&&w.officialUrl&&w.sources.length);for(const n of w.grapeNames)if(!lib.resolveGrape(grapes,n))unresolved.push([w.id,n]);if(w.imageUrl?.startsWith('/'))assert(existsSync(new URL('../public'+w.imageUrl,import.meta.url)),w.id+' photo');}
assert.deepEqual(unresolved,[],'all wine-to-grape links must resolve');
for(const w of wines.filter(w=>w.en))for(const key of ['description','composition','style','serving'])assert(w.en[key]&&!/\p{Script=Han}/u.test(w.en[key]),w.id+' English '+key);
assert.equal(grapes.find(g=>g.id==='pinot-gris').genetics.type,'mutation');
assert.equal(grapes.find(g=>g.id==='cabernet-sauvignon').genetics.parents.length,2);
console.log(`PASS: ${grapes.length} unique grape dossiers, ${wines.length} wine records; aliases/diacritics, multi-country filters, color/A-Z, ambiguous names, source fields and internal wine/photo links.`);

const index=JSON.parse(readFileSync(new URL('../data/grape-index.json',import.meta.url)));const wineIndex=JSON.parse(readFileSync(new URL('../data/grape-wine-index.json',import.meta.url)));assert.deepEqual(index.map(g=>g.id),grapes.map(g=>g.id));assert.deepEqual(wineIndex.map(w=>w.id),wines.map(w=>w.id));assert.equal(lib.filterGrapes(grapes,'Falanghina').length,2);assert.equal(lib.resolveGrape(grapes,'Falanghina'),undefined);console.log('PASS: search indexes synchronized; ambiguous Falanghina identity remains two records.');

const references=JSON.parse(readFileSync(new URL('../data/grape-reference-profiles.json',import.meta.url)));
for(const p of references){
 assert(lib.resolveGrape(grapes,p.id));assert(p.intro.en&&p.intro.zh);assert.equal(p.wines.length,10);assert.equal(new Set(p.wines.map(w=>w.url)).size,10);
 const sourceIds=new Set(p.sources.map(s=>s.id));
 for(const section of p.sections){assert(section.title.en&&section.title.zh);for(const row of section.rows){assert(row.label.en&&row.label.zh&&row.text.en&&row.text.zh);assert(!/[\u4e00-\u9fff]/.test(row.text.en),'English body must remain English');for(const id of row.sources)assert(sourceIds.has(id),'unresolved reference '+id);for(const link of row.links){if(link.href.startsWith('#grapes?id='))assert(lib.resolveGrape(grapes,decodeURIComponent(link.href.split('id=')[1])),'unresolved grape link');}}}
}
assert.equal(lib.resolveGrape(grapes,'Alligotet')?.id,'aligote');
console.log('PASS: bilingual Aligoté rows, source references, ten distinct wine links and canonical parent links.');
