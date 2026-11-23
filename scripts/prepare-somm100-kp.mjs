#!/usr/bin/env node
/**
 * Build only cleared student-facing SOMM100 content from PRIVATE Notion exports.
 *
 * Required input: the SOMM100_D1/D2/FR/D3/D4_STUDENT_BREAKDOWN_*.json
 * files previously saved in the private Notion Course Import Staging page.
 *
 * The importer never requests a public Notion URL, embeds private credentials,
 * or changes existing course/quiz/CMS files. In preview mode, output stays
 * private and can never be copied into a public static hosting directory.
 */
import {readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync} from 'node:fs';
import {resolve, dirname, basename, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {compileSomm100Course} from '../lib/somm100-course-content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const option = (key, fallback = null) => {
  const at = args.indexOf(key);
  return at >= 0 ? args[at + 1] : fallback;
};
const mode = option('--mode', 'private-preview');
const source = resolve(option('--input', resolve(root, 'private-course-import')));
const defaultTarget = mode === 'production'
  ? resolve(root, 'public/course-content/somm100-student.json')
  : resolve(root, 'private-course-import/compiled-preview.json');
const target = resolve(option('--output', defaultTarget));

if (!['private-preview', 'production'].includes(mode)) throw new Error('Invalid --mode');
if (!existsSync(source)) throw new Error('Private course export directory not found: ' + source);
if (mode === 'private-preview' && (
  target.startsWith(resolve(root, 'public') + sep) ||
  target.startsWith(resolve(root, 'dist-cloudbase') + sep))) {
  throw new Error('Private previews cannot be placed in public hosting assets');
}
if (mode === 'production' && target !== defaultTarget) {
  throw new Error('Production target must be the designated course-content output');
}

const files = readdirSync(source)
  .filter(name => /^SOMM100_(?:D1|D2|FR|D3|D4)_STUDENT_BREAKDOWN_\d+\.json$/.test(name))
  .sort();
if (!files.length) throw new Error('No private SOMM100 student-breakdown shards found');
const shards = files.map(name => {
  const shard = JSON.parse(readFileSync(resolve(source, name), 'utf8'));
  if (!Array.isArray(shard.records) || shard.not_published !== true) {
    throw new Error('Not a private SOMM100 export: ' + name);
  }
  return shard;
});
const result = compileSomm100Course(shards, {mode});
if (mode === 'production' && result.entries.length === 0) {
  throw new Error('No teacher-approved / rights-cleared SOMM100 lessons. Refusing empty public release.');
}
mkdirSync(dirname(target), {recursive: true});
writeFileSync(target, JSON.stringify(result, null, 2) + '\n');
process.stdout.write(JSON.stringify({
  mode, files: files.length, included: result.stats.imported,
  withheld: result.stats.withheld, destination: target,
  teacherReviewRequired: mode !== 'production',
}, null, 2) + '\n');
