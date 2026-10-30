import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

async function load(path) {
  const code=ts.transpileModule(readFileSync(new URL(path,import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
  return import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
}
const {questions}=await load('../data/region-bouzeron.ts');
const {getReviewSet}=await load('../lib/region-review.ts');
assert.equal(questions.length,0,'Self-authored Bouzeron bank must remain retired');
assert.deepEqual(getReviewSet(questions,'foundation'),[]);
assert.deepEqual(getReviewSet(questions,'advanced'),[]);
// Synthetic ID-only fixtures exercise rotation without reintroducing quiz content.
const fixture=[...Array.from({length:13},(_,i)=>({id:'f'+i,level:'foundation'})),...Array.from({length:24},(_,i)=>({id:'a'+i,level:'advanced'}))];
for(const [level,count] of [['foundation',10],['advanced',20]]){
 const reached=new Set();
 for(let r=0;r<24;r++){const set=getReviewSet(fixture,level,r);assert.equal(set.length,count);assert.equal(new Set(set.map(q=>q.id)).size,count);assert(set.every(q=>q.level===level));set.forEach(q=>reached.add(q.id));}
 assert.equal(reached.size,fixture.filter(q=>q.level===level).length);
 assert.notDeepEqual(getReviewSet(fixture,level,0),getReviewSet(fixture,level,1));
}
assert.deepEqual(getReviewSet([],'foundation'),[]);
console.log('PASS: retired source bank, empty-state support, unique rotation and level isolation.');
