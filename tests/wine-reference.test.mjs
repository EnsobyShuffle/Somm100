import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import ts from 'typescript';
const read=n=>JSON.parse(readFileSync(new URL('../data/'+n,import.meta.url)));
const wines=read('wine-profiles.json').profiles,grapes=read('grape-varieties.json'),refs=read('grape-reference-profiles.json'),terms=read('wine-term-reference.json');
const ids=new Set(wines.map(w=>w.id));assert.equal(ids.size,wines.length);
for(const w of wines){
 assert(w.vintages.some(v=>v.year===w.defaultVintage),w.id+' default vintage');
 const sources=new Set(w.sources.map(s=>s.id));assert.equal(sources.size,w.sources.length);
 for(const v of w.vintages){assert(/^\d{4}$/.test(v.year)||v.year==='Cuvée');for(const id of v.sources)assert(sources.has(id),w.id+' vintage source');assert(v.composition&&v.season.en&&v.season.zh)}
 for(const row of [...w.sections.flatMap(s=>s.rows),...w.vintages.flatMap(v=>v.rows)]){assert(row.text.en&&row.text.zh);for(const id of row.sources)assert(sources.has(id),w.id+' row source')}
 for(const id of w.relatedIds)assert(ids.has(id),w.id+' related wine '+id);
 if(w.image)assert(w.image.startsWith('/')&&existsSync(new URL('../public'+w.image,import.meta.url)),w.id+' local image');
 if(w.grapeIds)for(const id of w.grapeIds)assert(grapes.some(g=>g.id===id));
}
for(const wine of refs[0].wines)assert(ids.has(wine.id),'Aligoté wine must open internal profile');
assert.equal(wines.find(w=>w.id==='naudin-clou34').appellation,'Vin de France');
assert.equal(wines.find(w=>w.id==='pataille-bourgogne-aligote').vintages.length,2,'Pataille vintages must remain separate');
for(const id of ['rp-sortes','rp-louro','rp-antiga','rp-soro'])assert(wines.some(w=>w.id===id||w.aliases.includes(id)),'existing wine retained');
const js=ts.transpileModule(readFileSync(new URL('../lib/term-lookup.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {findTerm}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
assert.equal(findTerm(terms,'  ELEVAGE. ').en,'Élevage');assert.equal(findTerm(terms,'物候').en,'Phenology');assert.equal(findTerm(terms,'nonexistent777'),undefined);
for(const term of terms){assert(term.definition.en&&term.definition.zh&&term.sources.length);for(const source of term.sources)assert(/^https:\/\//.test(source.url))}
console.log(`PASS: ${wines.length} wine profiles, internal Aligoté links, retained existing wines, vintage scopes, local imagery and ${terms.length} bilingual term records.`);
