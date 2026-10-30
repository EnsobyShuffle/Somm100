import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import ts from 'typescript';
const data=JSON.parse(readFileSync(new URL('../data/curriculum.json',import.meta.url)));
const cms=JSON.parse(readFileSync(new URL('../data/cms-learning.json',import.meta.url)));
const source=readFileSync(new URL('../lib/cms-navigation.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {activeNavigation,cmsHref,readCmsRoute}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
assert.equal(activeNavigation('foundation'),'foundation');
for(const page of ['cms','cms-module','theory','lesson','explore','tasting','service'])assert.equal(activeNavigation(page),'cms');
assert.deepEqual(readCmsRoute(cmsHref('module02','expansion','M2-EXP03',2)),{moduleId:'module02',resource:'expansion',section:'M2-EXP03',stage:2});
assert.deepEqual(readCmsRoute('#cms-module?module=invalid&stage=99&resource=x'),{moduleId:'module01',stage:1,resource:'core',section:''});
assert.equal(new Set(data.questions.map(q=>q.id)).size,data.questions.length);
assert.equal(data.questions.filter(q=>q.id.startsWith('M2-Q')).length,0);
assert.equal(data.checklist.filter(k=>k.moduleId==='module02').length,28);
assert.equal(data.questions.filter(q=>/^Q\d+$/.test(q.id)).length,0);
for(const m of cms.modules){
 for(const key of ['guide','core','expansion','checklist','questions'])assert(m.resources[key].url.startsWith('https://app.notion.com/'));
 const tracked=m.resources.core.sections.filter(s=>s.track);assert(tracked.length>0);for(const s of tracked)assert(data.readings.some(r=>r.id===s.id&&r.moduleId===m.id));
 for(const id of m.questionIds)assert(data.questions.some(q=>q.id===id));
 for(const id of m.checklistIds)assert(data.checklist.some(k=>k.id===id));
 for(const key of ['guide','core','expansion'])for(const s of m.resources[key].sections){
  assert(s.blocks.length>0,s.id+' is empty');
  for(const id of s.questionIds||[])assert(m.questionIds.includes(id),s.id+' has an unrelated question');
  for(const b of s.blocks){if(b.type==='image'&&b.src.startsWith('/media/'))assert(existsSync(new URL('../public'+b.src,import.meta.url)),b.src)}
 }
}
assert(data.questions.filter(q=>q.moduleId==='module02').every(q=>q.lessonId.startsWith('M2-')&&q.origin.includes('self-authored')));
console.log('PASS: separate navigation, deep links, all published chapter source packs, retired self-authored questions, non-colliding IDs, section-question mappings and local images.');
