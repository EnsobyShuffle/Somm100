import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

const read=name=>JSON.parse(readFileSync(new URL('../data/'+name,import.meta.url),'utf8'));
import {loadTypeScript} from './load-typescript.mjs';
const {getGrapeReference}=await loadTypeScript('../app/grape-reference-data.ts');
const {splitReferenceText,withReferenceLanguage,applySourcedReferenceRows}=await loadTypeScript('../lib/grape-reference.ts');
const grapes=read('grape-varieties.json'),translations=read('grape-reference-translations.json');
assert.deepEqual(translations.map(g=>g.id).sort(),grapes.filter(g=>g.id!=='aligote').map(g=>g.id).sort(),'every remaining grape needs a separate English version');
assert.equal(new Set(translations.map(g=>g.id)).size,translations.length);
for(const en of translations){
 const raw=grapes.find(g=>g.id===en.id);
 assert.deepEqual(en.aliases.map(a=>a.name),raw.aliases.map(a=>a.name),en.id+' alias identity/order');
 assert.deepEqual(en.regions.map(r=>r.name),raw.regions.map(r=>r.name),en.id+' region identity/order');
 for(const text of [en.summary,en.origin,en.viticulture,en.winemaking,en.taste,en.geneticsNote,en.confusions,...en.aliases.map(a=>a.context),...en.regions.map(r=>r.note)]){
  assert(typeof text==='string'&&text.trim(),en.id+' empty translation');
  assert(!/\p{Script=Han}/u.test(text),en.id+' English narrative contains Chinese');
 }
}
const knownWineIds=new Set([...read('grape-wines.json').map(w=>w.id),...read('wine-profiles.json').profiles.flatMap(w=>[w.id,...w.aliases]),...read('producers.json').producers.flatMap(p=>p.wines.map(w=>w.id))]);
for(const raw of grapes){
 const p=getGrapeReference(raw.id);assert(p,raw.id+' uniform profile missing');
 assert(p.intro.en&&p.intro.zh&&p.name===raw.name);
 for(const sectionId of ['origin','synonyms','parentage','viticulture','regions','vinification','tasting','similar'])assert(p.sections.some(s=>s.id===sectionId),raw.id+' missing '+sectionId);
 const sources=new Set(p.sources.map(s=>s.id));assert.equal(sources.size,p.sources.length);
 for(const section of p.sections)for(const row of section.rows){
  assert(row.text.en&&row.text.zh,raw.id+' bilingual row');
  assert(!/\p{Script=Han}/u.test(row.text.en),raw.id+' English detail must remain English');
  for(const id of row.sources)assert(sources.has(id),raw.id+' citation target');
 }
 for(const detail of raw.referenceRows||[]){
  const section=p.sections.find(s=>s.id===detail.section);const row=section.rows.find(r=>r.label.en===detail.label.en);
  assert(row&&row.text.en===detail.text.en&&row.text.zh===detail.text.zh,raw.id+' researched detail retained');
  assert.deepEqual(row.sources.map(id=>p.sources.find(s=>s.id===id).url),detail.sourceUrls);
 }
 for(const w of p.wines){
  if(w.href.startsWith('#')){const params=new URLSearchParams(w.href.split('?')[1]);assert(knownWineIds.has(params.get('wine')||params.get('id')),raw.id+' broken wine link '+w.href)}
  else assert(w.href.startsWith('https://'));
 }
}
const godello=getGrapeReference('godello');
assert(godello.sections.some(s=>s.rows.some(r=>r.text.en.includes('1,500-litre foudre'))),'preserve cuvée-specific detail');
assert(godello.sections.some(s=>s.rows.some(r=>r.text.en.includes('1975'))),'preserve history');
for(const wine of read('grape-profiles.json').profiles.find(g=>g.id==='godello').wines)assert(godello.wines.some(w=>w.producer===wine.producer&&w.name===wine.name),'preserve Godello wine '+wine.name);
assert.notEqual(getGrapeReference('frontenac').species,'Vitis vinifera','do not classify hybrids as vinifera');
assert.equal(getGrapeReference('aligote').wines.length,10);
const unknown=grapes.find(g=>!g.genetics.parents.length&&g.id!=='aligote');
assert.equal(getGrapeReference(unknown.id).sections.find(s=>s.id==='parentage').rows[0].text.zh,unknown.genetics.note,'retain unknown parentage qualification');
const parts=splitReferenceText('Chardonnay、Bouzeron AOC与Bouzeron; XChardonnay ChardonnayX.',[{label:'Chardonnay',href:'#grapes?id=chardonnay'},{label:'Bouzeron',href:'#region'},{label:'Bouzeron AOC',href:'#aoc'}]);
assert.deepEqual(parts.filter(p=>p.href).map(p=>p.text),['Chardonnay','Bouzeron AOC','Bouzeron']);
assert.equal(withReferenceLanguage('https://example.com/wine?lang=fr','zh'),'https://example.com/wine?lang=fr','external source URLs must not change');
assert.equal(new URLSearchParams(withReferenceLanguage('#grapes?id=godello&lang=en','zh').split('?')[1]).get('lang'),'zh');
assert.throws(()=>applySourcedReferenceRows({id:'test',sources:[],sections:[{id:'origin',rows:[]}]},[{section:'origin',label:{en:'Origin',zh:'起源'},text:{en:'Text',zh:'资料'},sourceUrls:['https://example.com/missing']}]),/source missing/,'unknown row citations must fail import/render');
const synonym=getGrapeReference('cabernet-sauvignon').inlineLinks.find(l=>l.label==='Primitivo');assert.equal(synonym?.href,'#grapes?id=zinfandel','unambiguous synonyms link to canonical grape');
console.log(`PASS: ${grapes.length} uniform bilingual profiles; complete translations, conservative taxonomy, preserved Godello detail, valid citations and wine routes, inline link boundaries.`);
