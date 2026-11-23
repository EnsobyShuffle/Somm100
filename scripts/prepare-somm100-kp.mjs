#!/usr/bin/env node
import {readFileSync, readdirSync, mkdirSync, realpathSync, mkdtempSync, writeFileSync, renameSync, rmSync} from 'node:fs';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import {createHash} from 'node:crypto';
import {compileSomm100Course} from '../lib/somm100-course-content.mjs';

const root = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const {values} = parseArgs({options: {mode: {type:'string',default:'private-preview'}, input:{type:'string'}}});
const mode = values.mode;
const targetDir = join(root, 'private-course-import');
const source = resolve(values.input ?? targetDir);
const names = readdirSync(source);
const read = name => JSON.parse(readFileSync(join(source, name), 'utf8'));

const manifests = names.filter(name => /^SOMM100_PRIVATE_COURSE_IMPORT_MANIFEST_[\d-]+\.json$/.test(name));
if (manifests.length !== 1) throw new Error('Expected one private course import manifest');
const manifest = read(manifests[0]);
const sourceDatabase = 'https://app.notion.com/p/41d17d16de4c81d49413d720ea528fb5';
const inventories = names.filter(name => /^SOMM100_KP_IMPORT_INDEX_[\d-]+\.json$/.test(name));
if (manifest.schema !== 'SOMM100.private.course.import-manifest.v1' ||
    manifest.source_database !== sourceDatabase || inventories.length !== 1) throw new Error('Unknown course source');
const inventory = read(inventories[0]);
if (inventory.source !== sourceDatabase || inventory.schema !== 'SOMM100.course-import-index.v1')
  throw new Error('Wrong source inventory');
const byId = new Map(inventory.records.map(row => [row.id, row]));
if (byId.size !== inventory.records.length) throw new Error('Duplicate entry in source inventory');
const files = names.filter(name => /^SOMM100_(?:D[1-4]|FR)_STUDENT_BREAKDOWN_\d+\.json$/.test(name)).sort();
const batches = manifest.batches;
if (!Array.isArray(batches) || batches.length !== files.length ||
    new Set(batches.map(b => b.filename)).size !== files.length) throw new Error('Incomplete shard set');
const shards = files.map(name => {
  const shard = read(name);
  const expected = batches.find(b => b.filename === name);
  if (!expected || shard.not_published !== true || expected.saved !== shard.records?.length ||
      (expected.day === 'FR' ? 'D1-D2法国共用' : expected.day) !== shard.day || expected.part !== shard.batch)
    throw new Error('Shard differs from manifest: ' + name);
  for (const row of shard.records) {
    const origin = byId.get(row.id);
    if (origin?.student_candidate !== true || origin.placeholder !== false || origin.url !== row.source ||
        origin.day !== row.day || origin.title !== row.title) throw new Error('KP outside student inventory: ' + row.id);
  }
  return shard;
});
const indexes = names.filter(name => /^SOMM100_EXTENSION_CANDIDATES_.+\.json$/.test(name)).map(read);
const result = compileSomm100Course(shards, {mode, extensionIndexes:indexes});
if (mode === 'production' && !result.entries.length) throw new Error('No cleared student lessons');
mkdirSync(targetDir, {recursive:true, mode:0o700});
if (realpathSync(targetDir) !== targetDir) throw new Error('Private output directory cannot be a symlink');
const target = join(targetDir, mode === 'production' ? 'student-release.json' : 'compiled-preview.json');
const temporary = mkdtempSync(join(targetDir,'.compile-'));
try {
  const bytes = JSON.stringify(result) + '\n';
  const file = join(temporary,'result');
  writeFileSync(file, bytes, {mode:0o600,flag:'wx'});
  renameSync(file, target);
  console.log(JSON.stringify({mode, files:files.length, ...result.stats, sha256:createHash('sha256').update(bytes).digest('hex')}));
} finally {
  rmSync(temporary, {recursive:true,force:true});
}
