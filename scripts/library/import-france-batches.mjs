/** Import researched bilingual records; fail before writing on identity/schema conflicts. */
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const data=new URL('../../data/',import.meta.url);
const read=name=>JSON.parse(readFileSync(new URL(name,data),'utf8'));
const js=ts.transpileModule(readFileSync(new URL('../../lib/grape-library.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {normalizeGrape,resolveGrape}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const files=process.argv.slice(2);assert(files.length,'Pass researched batch JSON paths');
const grapes=read('grape-varieties.json'),translations=read('grape-reference-translations.json'),wines=read('grape-wines.json');
const originalCount=grapes.length,originalWineCount=wines.length;
const prior=existsSync(new URL('grape-france-audit.json',data))?read('grape-france-audit.json'):{};
const evidence=[...(prior.evidence||[])], skipped=[...(prior.skipped||[])], regionMaps=existsSync(new URL('france-grape-regions.json',data))?read('france-grape-regions.json'):[], existingUpdates=[];
const originalIds=new Set(grapes.map(g=>g.id));
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
  assert(['white','red','pink'].includes(g.color));assert(g.countries.length&&Array.isArray(g.regions)&&g.sources.length,g.id+' country/region/source shape');
  assert(['unknown','mutation','bred-cross','natural-cross'].includes(g.genetics.type));assert(g.genetics.note&&Array.isArray(g.genetics.parents));
  const en=batch.translations.find(t=>t.id===g.id);
  assert(en.species&&typeof en.originCountry==='string');
  assert.deepEqual(g.aliases.map(a=>a.name),en.aliases.map(a=>a.name));
  assert.deepEqual(g.regions.map(r=>r.name),en.regions.map(r=>r.name));
  for(const text of [en.origin,en.summary,en.viticulture,en.winemaking,en.taste,en.geneticsNote,en.confusions,...en.aliases.map(a=>a.context),...en.regions.map(r=>r.note)])assert(typeof text==='string'&&text.trim()&&!/\p{Script=Han}/u.test(text),g.id+' invalid English');
  for(const region of g.regions)assert(g.countries.includes(region.country)||(region.associationType==='classification'&&region.country==='France'),g.id+' region country missing');
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
 evidence.push(...(batch.evidence||[])); skipped.push(...(batch.skipped||[])); regionMaps.push(...(batch.regionMaps||[])); existingUpdates.push(...(batch.existingUpdates||[]));
}
for(const u of existingUpdates){
 const g=grapes.find(g=>g.id===u.id),en=translations.find(t=>t.id===u.id);assert(g&&(en||g.id==='aligote'),'Existing update '+u.id);
 for(const c of u.countriesAdd||[])if(!g.countries.includes(c))g.countries.push(c);
 for(const r of u.regionsAdd||[]){if(!g.regions.some(x=>x.name===r.name&&x.country===r.country)){assert(r.enNote&&!/\p{Script=Han}/u.test(r.enNote));g.regions.push({name:r.name,country:r.country,note:r.note});en?.regions.push({name:r.name,note:r.enNote});} if(!g.countries.includes(r.country))g.countries.push(r.country);}
 for(const a of u.aliasesAdd||[])if(!g.aliases.some(x=>normalizeGrape(x.name)===normalizeGrape(a.name))){assert(a.enContext&&!/\p{Script=Han}/u.test(a.enContext));g.aliases.push({name:a.name,context:a.context});en?.aliases.push({name:a.name,context:a.enContext});}
 for(const source of u.sourcesAdd||[])if(!g.sources.some(x=>x.url===source.url))g.sources.push(source);
}
const mapIds=new Set();
for(const m of regionMaps){
 assert(!mapIds.has(m.id),'Duplicate region map '+m.id);mapIds.add(m.id);assert(m.name&&m.en&&m.zh&&m.sources.length);
 const known=new Set(m.sources.map(s=>s.url));const ids=new Set();
 for(const e of m.entries){assert(grapes.some(g=>g.id===e.grapeId),m.id+' unknown grape '+e.grapeId);assert(!ids.has(e.grapeId),m.id+' duplicate '+e.grapeId);ids.add(e.grapeId);assert(['principal','complementary','historic','revival','experimental'].includes(e.status));assert(e.note.en&&e.note.zh&&e.sourceUrls.length);for(const url of e.sourceUrls)assert(known.has(url),m.id+' missing source '+url);}
}
// Add evidenced region connections to each linked dossier, preserving existing text.
for(const m of regionMaps)for(const e of m.entries){
 const g=grapes.find(g=>g.id===e.grapeId),en=translations.find(t=>t.id===e.grapeId);
 if(!en)continue; // Aligoté retains its separately curated bilingual reference.
 if(!g.regions.some(r=>r.name===m.name&&r.country==='France')){
  g.regions.push({name:m.name,country:'France',note:e.note.zh});en.regions.push({name:m.name,note:e.note.en});
  if(!g.countries.includes('France'))g.countries.push('France');
 }
 for(const url of e.sourceUrls)if(!g.sources.some(s=>s.url===url)){const source=m.sources.find(s=>s.url===url);g.sources.push({...source,note:'法国区域关联来源。'});}
}
for(const w of wines)for(const name of w.grapeNames)assert(resolveGrape(grapes,name),w.id+' unresolved/ambiguous grape '+name);
const sort=(a,b)=>a.id.localeCompare(b.id,'en');grapes.sort(sort);translations.sort(sort);
writeFileSync(new URL('grape-varieties.json',data),JSON.stringify(grapes,null,2)+'\n');
writeFileSync(new URL('grape-reference-translations.json',data),JSON.stringify(translations,null,2)+'\n');
writeFileSync(new URL('grape-wines.json',data),JSON.stringify(wines,null,2)+'\n');
const report={reviewed:'2026-10-25',addedGrapes:(prior.addedGrapes||0)+grapes.length-originalCount,addedWines:(prior.addedWines||0)+wines.length-originalWineCount,grapeIds:[...(prior.grapeIds||[]),...grapes.filter(g=>!originalIds.has(g.id)).map(g=>g.id)],regionCount:regionMaps.length,connections:regionMaps.reduce((n,m)=>n+m.entries.length,0),updatedIds:[...new Set([...(prior.updatedIds||[]),...existingUpdates.map(u=>u.id)])],skipped,evidence};
writeFileSync(new URL('grape-france-audit.json',data),JSON.stringify(report,null,2)+'\n');
writeFileSync(new URL('france-grape-regions.json',data),JSON.stringify(regionMaps,null,2)+'\n');
console.log(`Imported ${report.addedGrapes} grapes and ${report.addedWines} individual wines. Total: ${grapes.length} grapes, ${wines.length} wines.`);
