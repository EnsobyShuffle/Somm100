// Offline diagnostics only: never writes output or deploys a build.
// Usage: node scripts/audit-cloudbase-entry.mjs > report.json
import {build} from 'vite';
import {fileURLToPath} from 'node:url';
import {relative} from 'node:path';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
const results=await build({
  configFile:fileURLToPath(new URL('../vite.config.cloudbase.ts',import.meta.url)),
  logLevel:'silent',build:{write:false},
});
const outputs=(Array.isArray(results)?results:[results]).flatMap(r=>r.output);
const entries=outputs.filter(o=>o.type==='chunk'&&o.isEntry);
if(entries.length!==1)throw Error('Expected one CloudBase entry');
const entry=entries[0];
const modules=Object.entries(entry.modules).map(([id,m])=>({
  path:relative(root,id).replaceAll('\\','/'),renderedLength:m.renderedLength,
})).sort((a,b)=>b.renderedLength-a.renderedLength);
if(!modules.length||!modules.every(m=>Number.isFinite(m.renderedLength)))throw Error('Missing module size metadata');
const directImports=entry.imports;
console.log(JSON.stringify({
  scope:'offline-build-entry-audit',entry:entry.fileName,
  entryBytes:Buffer.byteLength(entry.code),entrySha256:createHash('sha256').update(entry.code).digest('hex'),
  directImports,topModules:modules.slice(0,15),
  foundationModules:modules.filter(m=>/^(app|lib|data)\/foundation/i.test(m.path)),
  limitations:['renderedLength is bundler module metadata, not compressed transferred bytes',
    'entry size excludes other imported chunks, CSS, images and runtime requests',
    'not a browser timing, mobile performance or deployment measurement'],
},null,2));
