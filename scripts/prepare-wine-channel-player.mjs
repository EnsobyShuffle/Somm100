import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

// Production has a newer catalog and YouTube player than this source branch.
// Integrate just the Bilibili component into its verified channel module.
const [indexFile, channelFile, entryFile, outputDir] = process.argv.slice(2);
assert(indexFile && channelFile && entryFile && outputDir, 'Expected current index.html, channel module, application entry, and output directory');
const root = fileURLToPath(new URL('../', import.meta.url));
const hash = value => createHash('sha256').update(value).digest('hex');
const index = await readFile(indexFile, 'utf8');
const baseline = await readFile(channelFile, 'utf8');
const originalImport = './assets/wc-catalogue-2c524a0b225010.js';
const reviewedModules = new Map([
  ['2c524a0b2250106b4e393fe667056cc39c3f80a7ea731179aa338bd517dff982', originalImport],
  ['1ee9d6133d63aed9127b0d01c62701e8699602dcbde62029e2e023a889253009', './wc-catalogue-1ee9d6133d63ae.js'],
  ['33822e9872160b846d70d67ad914c2d8bc4d3d111641441066ad3e6c8af98f49', './assets/wc-catalogue-33822e9872160b.js']
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
const priorComponent = 'const BilibiliPlayer = (() => {';
const priorDispatchEnd = 'function ExistingChannelPlayer({video, close}) {';
let playerModule;
if (baseline.includes(priorComponent)) {
  assert.equal(baseline.split(priorComponent).length, 2);
  assert.equal(baseline.split(priorDispatchEnd).length, 2);
  const start = baseline.indexOf(priorComponent);
  const end = baseline.indexOf(priorDispatchEnd);
  assert(end > start);
  playerModule = baseline.slice(0, start) + dispatch + baseline.slice(end + priorDispatchEnd.length);
} else {
  playerModule = baseline.replace(marker, () => dispatch);
}
const styleMarker = ';document.head.appendChild(style);';
assert.equal(playerModule.split(styleMarker).length, 2);
const playerStyles = await readFile(path.join(root, 'app/wine-channel-player.css'), 'utf8');
const updated = playerModule.replace(styleMarker, () => ';style.textContent+=' + JSON.stringify(playerStyles) + styleMarker);
const filename = 'wc-catalogue-' + hash(updated).slice(0,14) + '.js';
// A WebView without import-map support follows the application's literal dynamic import.
const entry = await readFile(entryFile, 'utf8');
const entryPath = './assets/app-wc-live-1606d0b377d2ff.js';
assert.equal(hash(entry), '1606d0b377d2ff3955023a3a22c71e7a1d620faf1f31064f4064add91fd46679');
const oldImport = 'import("./wc-catalogue-2c524a0b225010.js")';
assert.equal(entry.split(oldImport).length, 2);
const nextEntry = entry.replace(oldImport, 'import("./' + filename + '")');
const nextEntryName = 'app-wc-live-' + hash(nextEntry).slice(0,14) + '.js';
const importMap = /(<script type="importmap">)([^<]*)(<\/script>)/g;
assert.equal([...index.matchAll(importMap)].length, 1, 'Expected one existing import map');
const nextIndex = index.replace('src="' + entryPath + '"', 'src="./assets/' + nextEntryName + '"').replace(importMap, (_, start, data, end) => {
  const map = JSON.parse(data);
  assert.equal(map.imports[originalImport] ?? originalImport, reviewedPath, 'Capture the current active channel module');
  assert.equal(map.imports['./assets/app-BIt4G_MB.js'], entryPath);
  map.imports['./assets/app-BIt4G_MB.js'] = './assets/' + nextEntryName;
  map.imports[originalImport] = './assets/' + filename;
  return start + JSON.stringify(map) + end;
});
await mkdir(path.join(outputDir, 'assets'), {recursive: true});
await writeFile(path.join(outputDir, 'assets', filename), updated);
await writeFile(path.join(outputDir, 'assets', nextEntryName), nextEntry);
await writeFile(path.join(outputDir, 'index.html'), nextIndex);
console.log(filename);
