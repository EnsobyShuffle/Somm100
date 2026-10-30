import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url)));
const cms=read('data/cms-learning.json'),curr=read('data/curriculum.json'),db=read('data/producers.json');
const modules=new Map(cms.modules.map(m=>[m.id,m]));
// A changed display number must never redirect existing notes/progress to another country.
for(const [id,number,title] of [['module09','09A','Provence & Corsica'],['module10','09B','Languedoc & Roussillon'],['module11','09C','Southwest France'],['module10-spain','10','Spain'],['module11-portugal','11','Portugal']]){
 assert.equal(modules.get(id).number,number);assert.equal(modules.get(id).title,title);
}
assert.equal(new Set(cms.modules.map(m=>m.number)).size,31);
const m1=modules.get('module01');
assert.deepEqual(m1.resources.core.sections.map(s=>s.id),Array.from({length:16},(_,i)=>'M1-READ'+String(i+1).padStart(2,'0')));
const exp=m1.resources.expansion;
assert.equal(exp.sections.length,16);
assert(exp.archivedSections.some(s=>s.id==='M1-EXP01'&&s.lessonId==='KB01'));
assert(curr.lessons.some(l=>l.id==='KB01'),'historical lesson records remain valid');
assert(!m1.lessonIds.includes('KB01'),'new topic completion cannot be inferred from old KB completion');
assert(!/youtube\.com|youtu\.be|notion-file-block:\/\//i.test(JSON.stringify(exp.sections.map(s=>s.blocks.map(({reference,...b})=>b)))));
const images=exp.sections.flatMap(s=>s.blocks).filter(b=>b.type==='image');
assert.equal(images.length,7);
for(const b of images){assert(existsSync(new URL('../public'+b.src,import.meta.url)));assert(b.licenseUrl.startsWith('https://'));assert(b.credit);}
const cards=read('data/grape-wines.json'),regions=read('data/region-dossiers.json'),grapes=read('data/grape-varieties.json');
const released=db.producers.filter(p=>['producer-fr-domaine-tempier','producer-fr-chateau-simone'].includes(p.id));
assert.equal(released.length,2);assert.equal(released.flatMap(p=>p.wines).length,8);
for(const p of released){
 assert(p.sections.length>=3&&p.translations.en.sections.length>=3);
 for(const s of p.sections)for(const id of s.sourceIds)assert(db.sources.some(s=>s.id===id));
 for(const w of p.wines){
  assert(w.translations.en.method&&w.method);assert.equal(w.status,'source-listed');
  assert(cards.some(c=>c.id===w.id&&c.libraryWineId===w.id));
  assert(regions.find(r=>r.id===w.regionId).wines.some(v=>v.url.includes(w.id)));
  for(const id of w.grapeIds)assert(grapes.some(g=>g.id===id));
  for(const id of w.sourceIds)assert(db.sources.some(s=>s.id===id));
 }
}
assert.equal(new Set(cards.map(w=>w.id)).size,cards.length);
assert(!released.flatMap(p=>p.wines).some(w=>w.id.endsWith('bandol-rouge')),'unresolved legacy red identity remains held');
const source=readFileSync(new URL('../lib/profile-language.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {localizedProfile,profileLanguage}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
assert.equal(profileLanguage('#library?lang=en'),'en');assert.equal(profileLanguage('#library?lang=bad'),'zh');
const wine=released[0].wines[0];assert.equal(localizedProfile(wine,'en').id,wine.id);assert.equal(localizedProfile(wine,'en').detail,wine.translations.en.detail);assert.equal(localizedProfile(wine,'zh').detail,wine.detail);
const html=readFileSync(new URL('../public/releases/one-english/index.html',import.meta.url),'utf8');
assert(html.includes("const STORAGE='one_english_v01'"),'existing local English progress key retained');
for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
console.log('PASS: stable curriculum identities, independent extension progress, licensed media, bilingual French grape/region/producer/wine links and English upgrade syntax.');
