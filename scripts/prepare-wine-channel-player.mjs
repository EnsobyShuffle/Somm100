import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

// Production has a newer catalog and YouTube player than this source branch.
// Integrate just the Bilibili component into its verified channel module.
const [indexFile, channelFile, outputDir] = process.argv.slice(2);
assert(indexFile && channelFile && outputDir, 'Expected current index.html, channel module, and output directory');
const root = fileURLToPath(new URL('../', import.meta.url));
const hash = value => createHash('sha256').update(value).digest('hex');
const index = await readFile(indexFile, 'utf8');
const baseline = await readFile(channelFile, 'utf8');
const originalImport = './assets/wc-catalogue-2c524a0b225010.js';
const reviewedModules = new Map([
  ['2c524a0b2250106b4e393fe667056cc39c3f80a7ea731179aa338bd517dff982', originalImport],
  ['1ee9d6133d63aed9127b0d01c62701e8699602dcbde62029e2e023a889253009', './wc-catalogue-1ee9d6133d63ae.js']
]);
const reviewedPath = reviewedModules.get(hash(baseline));
assert(reviewedPath, 'The production channel changed. Review its player before integrating.');
assert(index.includes('src="./assets/app-wc-live-1606d0b377d2ff.js"'), 'Review the updated production entry point');

const [{output}] = await build({
  root, configFile: false, logLevel: 'warn', publicDir: false,
  build: {
    write: false, minify: false,
    lib: {entry: path.join(root, 'app/BilibiliPlayer.tsx'), formats: ['cjs']},
    rolldownOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {exports: 'named'}
    }
  }
});
assert.equal(output.length, 1);
assert.equal(output[0].type, 'chunk');
const marker = 'function ChannelPlayer({video, close}) {';
assert.equal(baseline.split(marker).length, 2);
const dispatch = `const BilibiliPlayer = (() => {
  const exports = {};
  const module = {exports};
  ${output[0].code}
  return module.exports.default;
})();
function ChannelPlayer({video, close}) {
  const media = $(video);
  if (media?.platform === 'Bilibili') {
    return a.jsx(BilibiliPlayer, {bvid: media.id, video, close}, video.id);
  }
  return a.jsx(ExistingChannelPlayer, {video, close}, video.id);
}
function ExistingChannelPlayer({video, close}) {`;
const updated = baseline.replace(marker, () => dispatch);
const filename = 'wc-catalogue-' + hash(updated).slice(0,14) + '.js';
const importMap = /(<script type="importmap">)([^<]*)(<\/script>)/g;
assert.equal([...index.matchAll(importMap)].length, 1, 'Expected one existing import map');
const nextIndex = index.replace(importMap, (_, start, data, end) => {
  const map = JSON.parse(data);
  assert.equal(map.imports[originalImport] ?? originalImport, reviewedPath, 'Capture the current active channel module');
  map.imports[originalImport] = './assets/' + filename;
  return start + JSON.stringify(map) + end;
});
await mkdir(path.join(outputDir, 'assets'), {recursive: true});
await writeFile(path.join(outputDir, 'assets', filename), updated);
await writeFile(path.join(outputDir, 'index.html'), nextIndex);
console.log(filename);
