// Reviewed identity corrections. No generic overwrites of unrelated research fields.
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const base=new URL('../../data/',import.meta.url),read=n=>JSON.parse(readFileSync(new URL(n,base),'utf8'));
const regions=read('region-dossiers.json');
const grapes=read('grape-varieties.json'),translations=read('grape-reference-translations.json'),audit=read('linked-country-audit.json'),applied=[];
for(const correction of audit.correctionsPendingReview){
 if(correction.id==='graciano'&&correction.field==='aliases'&&correction.newValue===null){
  const name=typeof correction.oldValue==='string'?correction.oldValue:correction.oldValue.name;assert.equal(name,'Bovale Sardo');
  for(const list of [grapes,translations]){const g=list.find(g=>g.id==='graciano');g.aliases=g.aliases.filter(a=>a.name!==name)}
  applied.push({...correction,status:'applied',reviewed:'2026-10-26'});
 }else if(correction.id==='malvasia-aromatica'&&correction.field==='aliases[Malvasia di Lipari].context'){
  const g=grapes.find(g=>g.id===correction.id),t=translations.find(g=>g.id===correction.id);
  const a=g.aliases.find(a=>a.name==='Malvasia di Lipari'),en=t.aliases.find(a=>a.name==='Malvasia di Lipari');assert(a&&en);
  a.context=correction.newValue;en.context=correction.newEnValue;applied.push({...correction,status:'applied',reviewed:'2026-10-26'});
 }else if(correction.topic==='Nebbiolo relatives'){
  const g=grapes.find(g=>g.id==='nebbiolo');assert.equal(g.genetics.type,'unknown');assert.equal(g.genetics.parents.length,0);
  applied.push({...correction,status:'reviewed-existing-unknown-parents-preserved-new-relative-records-carry-sibling-evidence'});
 }else if(correction.topic==='Albarola identity'){
  const g=grapes.find(g=>g.id==='albarola');assert(g.aliases.some(a=>a.name==='Bianchetta Genovese'));
  applied.push({...correction,status:'reviewed-new-canonical-record-already-consolidates-alias'});
 }else if(['Asti 2026 specification','Freisa d’Asti 2021 amendment','Brachetto d’Acqui / Acqui identity','Ruchè Riserva'].includes(correction.topic)){
  for(const u of correction.sourceUrls)assert(regions.some(r=>r.sources.some(s=>s.url===u)),correction.topic+' dossier source');
  applied.push({...correction,status:'reviewed-current-rules-retained-in-exact-appellation-records'});
 }else if(correction.id==='spergola-vernaccia-di-oristano'){
  assert(!grapes.some(g=>g.id==='spergola'));assert(grapes.find(g=>g.id==='vernaccia-di-oristano')?.aliases.some(a=>a.name==='Spergola'));
  applied.push({...correction,status:'reviewed-single-canonical-identity-with-accession-qualification'});
 }else if(['taurasi-ageing','pentro-blend','greco-sparkling','fiano-approval','vesuvio-2025','casauria-docg','camaiola-identity','forastera-identity'].includes(correction.id)){
  assert(correction.resolution&&correction.sourceUrls.length);for(const u of correction.sourceUrls)assert([...regions,...grapes].some(r=>r.sources.some(s=>s.url===u)),correction.id+' evidence missing');
  applied.push({...correction,status:'reviewed-source-reconciliation-retained-in-imported-dossiers'});
 }else if(['fr-cognac-charentes','france-topic-scope','france-existing-bouzeron','france-source-access','france-champagne-maturation','france-bugey','france-corsica'].includes(correction.id)){
  assert(!regions.some(r=>r.id==='bouzeron'),'do not replace curated Bouzeron');
  applied.push({...correction,status:'reviewed-scope-or-source-note-retained'});
 }else throw new Error('Unreviewed correction: '+JSON.stringify(correction));
}
audit.correctionsReviewed=applied;audit.correctionsPendingReview=[];
for(const [name,value] of Object.entries({'grape-varieties.json':grapes,'grape-reference-translations.json':translations,'linked-country-audit.json':audit}))writeFileSync(new URL(name,base),JSON.stringify(value,null,2)+'\n');
console.log('Reviewed corrections:',applied.length);
