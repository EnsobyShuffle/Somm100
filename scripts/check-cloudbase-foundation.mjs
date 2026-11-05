// Offline release checks. Does not deploy or claim browser/network acceptance.
import assert from 'node:assert/strict';
import {readFileSync, readdirSync, statSync, lstatSync, existsSync} from 'node:fs';
import {resolve, relative, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root = fileURLToPath(new URL('../dist-cloudbase/', import.meta.url));
assert(existsSync(join(root, 'index.html')), 'Run npm run build:cloudbase first');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]);
assert(refs.some(p=>p.endsWith('.js')), 'Missing app entry');
function localAsset(ref) {
  assert(ref.startsWith('./'), `Expected mount-relative asset: ${ref}`);
  const path = resolve(root, ref.split(/[?#]/)[0]);
  assert(!relative(root, path).startsWith('..'), `Escaped output: ${ref}`);
  assert(existsSync(path) && statSync(path).isFile(), `Missing asset: ${ref}`);
  for (const mount of ['/', '/somm100/']) {
    const url = new URL(ref, `https://example.invalid${mount}`);
    assert(url.pathname.startsWith(mount), `Asset escaped mount: ${ref}`);
  }
}
refs.forEach(localAsset);
const manifest = JSON.parse(readFileSync(join(root, 'manifest.webmanifest'),'utf8'));
assert.equal(manifest.scope, './'); assert.equal(manifest.start_url, './');
manifest.icons.forEach(icon=>localAsset(icon.src));
for (const file of ['sw.js','offline.html']) localAsset('./'+file);
function walk(dir) {
  return readdirSync(dir).flatMap(name=>{
    const path=join(dir,name); assert(!lstatSync(path).isSymbolicLink(), `Symlink in output: ${path}`);
    return statSync(path).isDirectory()?walk(path):[path];
  });
}
const files=walk(root);
for (const file of files) {
  const path=relative(root,file).replaceAll('\\','/');
  assert(!path.split('/').some(p=>p.startsWith('.')),`Hidden output: ${path}`);
  assert(!/\.(?:tsx?|map|pem|key|env)$/.test(path),`Unexpected source/private output: ${path}`);
  assert(!/^(?:tests|docs|research|node_modules)\//.test(path),`Non-public directory: ${path}`);
}
const scripts=files.filter(p=>p.endsWith('.js')&&p.includes('/assets/'));
const bundle=scripts.map(p=>readFileSync(p,'utf8')).join('\n');
const markers=['foundation-burgundy-map-title','勃艮第五个学习锚点｜由北向南','霞多丽的两组变量｜气候与酿造分开看','黑皮诺与赤霞珠｜用同一组问题比较结构','赤霞珠的两个案例｜波尔多左岸与纳帕谷','西拉的两种表达｜北罗讷与巴罗萨谷','foundation-bridge-title','somm100.foundation.bridge.v1','foundation-backup','somm100-foundation-backup','foundation-study-title','foundation-d1-title','foundation-d2-title','foundation-france-title','foundation-cohort-title','foundation-label-title','foundation-rhone-map-title',
  'foundation-d2-quiz-title','somm100.foundation.d2-quiz.v1','foundation-d1-quiz-title','somm100.foundation.d1-quiz.v1','foundation-d4-quiz-title','somm100.foundation.d4-quiz.v1','foundation-d3-quiz-title','somm100.foundation.d3-quiz.v1','foundation-open-review',
  'foundation-d3-title','foundation-d4-title','somm100.foundation.d3-review.v1','somm100.foundation.d4-review.v1',
  'somm100.foundation.study.v1','somm100.foundation.d1-review.v1','somm100.foundation.d2-review.v1','somm100.foundation.france-review.v1'];
markers.forEach(marker=>assert(bundle.includes(marker),`Missing Foundation feature/key: ${marker}`));
const entry=refs.find(p=>p.endsWith('.js'));
const bytes=readFileSync(resolve(root,entry));
console.log(JSON.stringify({status:'PASS',scope:'offline-build-only',files:files.length,entry,entryBytes:bytes.length,
  entrySha256:createHash('sha256').update(bytes).digest('hex'),foundationMarkers:markers.length,
  mounts:['/','/somm100/'],deployed:false,browserVerified:false},null,2));
