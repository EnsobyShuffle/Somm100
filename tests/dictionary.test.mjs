import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(readFileSync(new URL(p,root),'utf8'));
const terms=read('data/knowledge-dictionary.json');
const source=read('content/knowledge-dictionary.json');
const js=ts.transpileModule(readFileSync(new URL('lib/term-lookup.ts',root),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {findTerm,normalizeTerm,searchTerms}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
assert(terms.length>300,'Shared dictionary should replace the 22-entry prototype');
assert.equal(new Set(terms.map(t=>t.id)).size,terms.length);
assert.equal(new Set(terms.map(t=>normalizeTerm(t.en))).size,terms.length);
const lookupOwners=new Map();
for(const term of terms){
 for(const key of [term.en,term.zh,...term.aliases].map(normalizeTerm)){
  assert(!lookupOwners.has(key)||lookupOwners.get(key)===term.id,`Ambiguous lookup key: ${key}`);
  lookupOwners.set(key,term.id);
 }
}
assert.deepEqual(terms,read('data/wine-term-reference.json'),'Compatibility export must not drift');
const publishedIds=new Set(terms.map(t=>t.id));
for(const entry of source.entries){if(entry.mergedInto||!['Reviewed','Approved'].includes(entry.status))assert(!publishedIds.has(entry.id),'Unreviewed or merged record leaked');}
for(const entry of terms){assert(entry.definition.en&&entry.definition.zh&&entry.sources.length,entry.en);assert(!JSON.stringify(entry).includes('app.notion.com'),'Editorial URLs should not be shipped');}
assert.equal(findTerm(terms,' ELEVAGE. ').en,'Élevage');
assert.equal(findTerm(terms,'物候').en,'Phenology');
assert.notEqual(findTerm(terms,'sur lie').id,findTerm(terms,'lees').id,'Ageing technique is not sediment');
assert.notEqual(findTerm(terms,'fine lees')?.id,findTerm(terms,'lees').id,'A subset must not overwrite its broader category');
assert.notEqual(findTerm(terms,'Plasmopara viticola')?.id,findTerm(terms,'downy mildew').id,'Pathogen is not disease');
assert.notEqual(findTerm(terms,'Erysiphe necator')?.id,findTerm(terms,'powdery mildew').id,'Pathogen is not disease');
assert.notEqual(findTerm(terms,'Botrytis cinerea').id,findTerm(terms,'grey rot').id,'Fungus is not its disease form');
assert.equal(findTerm(terms,'managed to').en,'manage to');
assert.equal(findTerm(terms,'I’m afraid that is not available today.').en,"I'm afraid that is not available today.");
assert.equal(findTerm(terms,'coq au vin').cuisine,'法国');
assert.equal(findTerm(terms,'tiramisu').cuisine,'意大利');
assert(terms.filter(t=>t.category==='菜名').length>=300,'The classic menu library should cover at least 300 dishes');
assert.notEqual(findTerm(terms,'cottage pie').id,findTerm(terms,"shepherd's pie").id,'Beef and lamb pies must remain separate dishes');
assert.notEqual(findTerm(terms,'risotto').id,findTerm(terms,'Milanese risotto').id,'A specific preparation is not its entire dish family');
assert.equal(findTerm(terms,'smorrebrod').en,'Smørrebrød','Danish spelling needs a usable ASCII alias');
assert.equal(findTerm(terms,'oeufs en meurette').en,'œufs en meurette','French ligatures need an ASCII alias');
assert.equal(findTerm(terms,'bacalhau a bras').cuisine,'葡萄牙');
assert.equal(findTerm(terms,'quenelles de brochet').zh,'法式狗鱼茸丸','Pike must not be mistranslated as mullet or barracuda');
for(const entry of source.entries.filter(e=>['expansion-2','expansion-3','expansion-4'].includes(e.origin)&&e.status==='Reviewed')){
 assert(entry.examples.some(e=>e.en&&e.zh),'New menu and service entries need a bilingual example');
 if(entry.category==='菜名')assert(entry.cuisine,'Menu entries need a cuisine for browsing');
}
for(const [a,b] of [['crispy','crunchy'],['savoury','umami'],['smoky','smoke'],['cure','marinate'],['pancetta','guanciale'],['puff pastry','filo pastry'],['Liège waffle','Brussels waffle']]){
 assert.notEqual(findTerm(terms,a).id,findTerm(terms,b).id,`${a} and ${b} are related, not interchangeable`);
}
assert.equal(findTerm(terms,'savory').en,'savoury');
assert.equal(findTerm(terms,'caramelized').en,'caramelise');
assert.equal(findTerm(terms,'arugula').en,'rocket');
assert.equal(findTerm(terms,'phyllo pastry').en,'filo pastry');
assert(findTerm(terms,'risotto alla Milanese').relatedTerms.includes('saffron'));
assert(findTerm(terms,'puff pastry').relatedTerms.includes('flaky'));
assert.equal(findTerm(terms,'crispy').category,'风味与口感');
for(const entry of source.entries.filter(e=>e.origin==='expansion-4')){
 for(const name of entry.relatedTerms){
  const target=findTerm(terms,name);
  assert(target && target.id!==entry.id,`Broken or self-related term: ${entry.en} -> ${name}`);
 }
}
assert.equal(findTerm(terms,'béarnaise').id,findTerm(terms,'bearnaise').id);
assert.equal(findTerm(terms,'must I decant this wine?'),undefined,'No unsafe sentence-to-word interpretation');
assert.equal(findTerm(terms,'nonexistent777'),undefined);
assert.equal(findTerm(terms,'Cabernet Franc').en,'Cabernet Franc');
assert(searchTerms(terms,'béar').some(t=>normalizeTerm(t.en)==='bearnaise'));
assert(!searchTerms(terms,'nonexistent777').length);
for(const word of read('data/english-course.json').words)assert(findTerm(terms,word.en),`English course term disconnected: ${word.en}`);
console.log(`PASS: ${terms.length} reviewed shared terms; all 51 English-course words resolve; drafts excluded; aliases, accents, canonical priority and unknown queries verified.`);
