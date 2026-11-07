// Analyze all statically and dynamically reachable JavaScript, not just entry bytes.
import assert from 'node:assert/strict';
import {build} from 'vite';
import {fileURLToPath} from 'node:url';
import {relative} from 'node:path';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
const result=await build({configFile:root+'vite.config.cloudbase.ts',logLevel:'silent',build:{write:false}});
const output=(Array.isArray(result)?result:[result]).flatMap(x=>x.output);
const chunks=new Map(output.filter(x=>x.type==='chunk').map(x=>[x.fileName,x]));
const entry=[...chunks.values()].find(x=>x.isEntry&&x.facadeModuleId?.endsWith('/foundation.html'));
assert(entry,'Foundation HTML entry missing');
const fullApp=[...chunks.values()].find(x=>x.isEntry&&x.facadeModuleId?.endsWith('/index.html'));
assert(fullApp?.code.includes('打开课程专注阅读 →')&&fullApp.code.includes('./foundation.html'),'Full-app focus link missing');
const seen=new Set();
function visit(name){if(seen.has(name))return;const chunk=chunks.get(name);assert(chunk,`Missing chunk ${name}`);seen.add(name);[...chunk.imports,...chunk.dynamicImports].forEach(visit);}
visit(entry.fileName);
const modules=[...new Set([...seen].flatMap(name=>Object.keys(chunks.get(name).modules)))].map(id=>relative(root,id).replaceAll('\\','/'));
for(const forbidden of ['app/LearningApp.tsx','data/curriculum.json','data/producers.json','data/cms-learning.json','data/wine-library.json'])assert(!modules.includes(forbidden),`Full app preload: ${forbidden}`);
assert(modules.includes('app/FoundationPage.tsx'));
const assets=[...seen].map(name=>{
  const code=chunks.get(name).code;
  const hash=createHash('sha256').update(code).digest('hex');
  assert.equal(createHash('sha256').update(readFileSync(root+'dist-cloudbase/'+name)).digest('hex'),hash,'Build/report mismatch');
  return {name,bytes:Buffer.byteLength(code),sha256:hash};
});
const html=readFileSync(root+'dist-cloudbase/foundation.html','utf8');
for(const ref of [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1])){
  assert(ref.startsWith('./'),`Nonrelative asset/link ${ref}`);
  for(const mount of ['/','/somm100/'])assert(new URL(ref,'https://test.invalid'+mount+'foundation.html').pathname.startsWith(mount));
  readFileSync(new URL(ref,'file://'+root+'dist-cloudbase/foundation.html'));
}
const totalJavaScriptBytes=assets.reduce((sum,a)=>sum+a.bytes,0);
assert(totalJavaScriptBytes<1000000,'Foundation JS exceeds 1MB regression budget');
console.log(JSON.stringify({status:'PASS',entry:entry.fileName,assets,totalJavaScriptBytes,sharedFullAppDataExcluded:true,mounts:['/','/somm100/'],limits:'Uncompressed JS bytes; excludes CSS/images. Not network timing, phone or deployment acceptance.'},null,2));
