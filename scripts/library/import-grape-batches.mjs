/** Import researched bilingual records; fail before writing on identity/schema conflicts. */
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const data=new URL('../../data/',import.meta.url);
const read=name=>JSON.parse(readFileSync(new URL(name,data),'utf8'));
const js=ts.transpileModule(readFileSync(new URL('../../lib/grape-library.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {normalizeGrape,resolveGrape}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const files=process.argv.slice(2);assert(files.length,'Pass researched batch JSON paths');
const grapes=read('grape-varieties.json'),translations=read('grape-reference-translations.json'),wines=read('grape-wines.json');
const originalCount=grapes.length,originalWineCount=wines.length;
const evidence=[];
for(const file of files){
 const batch=JSON.parse(readFileSync(file,'utf8'));
 assert(Array.isArray(batch.grapes)&&Array.isArray(batch.translations)&&Array.isArray(batch.wines),file+' batch shape');
 assert.deepEqual(batch.grapes.map(g=>g.id).sort(),batch.translations.map(g=>g.id).sort(),file+' translation identity');
 for(const g of batch.grapes){
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(g.id),g.id+' identifier');
  assert(!grapes.some(x=>x.id===g.id||normalizeGrape(x.name)===normalizeGrape(g.name)),g.id+' duplicate identity');
  const possible=resolveGrape(grapes,g.name);
  assert(!possible,g.id+' canonical name already resolves to '+possible?.id+'; resolve synonym identity before import');
  for(const field of ['name','zh','origin','summary','viticulture','winemaking','taste','confusions','reviewed'])assert(typeof g[field]==='string'&&g[field].trim(),g.id+' '+field);
  assert(['white','red','pink'].includes(g.color));assert(g.countries.length&&g.regions.length&&g.sources.length);
  assert(['unknown','mutation','bred-cross','natural-cross'].includes(g.genetics.type));assert(g.genetics.note&&Array.isArray(g.genetics.parents));
  const en=batch.translations.find(t=>t.id===g.id);
  assert(en.species&&typeof en.originCountry==='string');
  assert.deepEqual(g.aliases.map(a=>a.name),en.aliases.map(a=>a.name));
  assert.deepEqual(g.regions.map(r=>r.name),en.regions.map(r=>r.name));
  for(const text of [en.origin,en.summary,en.viticulture,en.winemaking,en.taste,en.geneticsNote,en.confusions,...en.aliases.map(a=>a.context),...en.regions.map(r=>r.note)])assert(typeof text==='string'&&text.trim()&&!/\p{Script=Han}/u.test(text),g.id+' invalid English');
  for(const region of g.regions)assert(g.countries.includes(region.country),g.id+' region country missing');
  const urls=new Set(g.sources.map(s=>s.url));
  for(const url of urls)assert(/^https?:\/\//.test(url),g.id+' source URL');
  for(const r of g.referenceRows||[]){
   assert(['origin','parentage','viticulture','vinification','tasting','similar'].includes(r.section));
   assert(r.label.en&&r.label.zh&&r.text.en&&r.text.zh&&r.sourceUrls.length,g.id+' sourced detailed row');
   assert(!/\p{Script=Han}/u.test(r.text.en));for(const url of r.sourceUrls)assert(urls.has(url),g.id+' missing source '+url);
  }
  if(g.originalImageUrl&&!g.imageUrl)g.imageUrl=g.originalImageUrl;
  grapes.push(g);translations.push(en);
 }
 for(const w of batch.wines){
  assert(!wines.some(x=>x.id===w.id||normalizeGrape(x.producer+' '+x.name)===normalizeGrape(w.producer+' '+w.name)),w.id+' duplicate wine');
  for(const field of ['name','producer','country','region','description','composition','style','serving','officialUrl','reviewed'])assert(typeof w[field]==='string'&&w[field].trim(),w.id+' '+field);
  assert(w.sources.length&&w.grapeNames.length&&w.en,w.id+' evidence/bilingual fields');
  for(const field of ['description','composition','style','serving'])assert(w.en[field]&&!/\p{Script=Han}/u.test(w.en[field]),w.id+' English '+field);
  wines.push(w);
 }
 evidence.push(...(batch.evidence||[]));
}
for(const w of wines)for(const name of w.grapeNames)assert(resolveGrape(grapes,name),w.id+' unresolved/ambiguous grape '+name);
const sort=(a,b)=>a.id.localeCompare(b.id,'en');grapes.sort(sort);translations.sort(sort);
writeFileSync(new URL('grape-varieties.json',data),JSON.stringify(grapes,null,2)+'\n');
writeFileSync(new URL('grape-reference-translations.json',data),JSON.stringify(translations,null,2)+'\n');
writeFileSync(new URL('grape-wines.json',data),JSON.stringify(wines,null,2)+'\n');
const report={reviewed:'2026-10-25',addedGrapes:grapes.length-originalCount,addedWines:wines.length-originalWineCount,grapeIds:grapes.filter(g=>g.editorialBatch?.startsWith('expansion-')).map(g=>g.id),evidence};
writeFileSync(new URL('grape-expansion-audit.json',data),JSON.stringify(report,null,2)+'\n');
console.log(`Imported ${report.addedGrapes} grapes and ${report.addedWines} individual wines. Total: ${grapes.length} grapes, ${wines.length} wines.`);
