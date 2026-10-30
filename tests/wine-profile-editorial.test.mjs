import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

const read = name => JSON.parse(readFileSync(new URL('../data/'+name, import.meta.url)));
const profiles = read('wine-profiles.json').profiles;
const editorial = read('wine-editorial.json');
for (const [id, extra] of Object.entries(editorial)) {
  const wine = profiles.find(w => w.id === id);
  assert(wine, 'Supplement needs an existing wine: '+id);
  const sourceIds = [...wine.sources, ...extra.sources].map(s=>s.id);
  assert.equal(sourceIds.length, new Set(sourceIds).size, 'Source IDs must be unique');
  for (const [year, vintage] of Object.entries(extra.vintages)) {
    assert(wine.vintages.some(v=>v.year===year), 'Rating must match an existing vintage');
    for (const rating of [...vintage.ratings, ...vintage.criticNotes]) {
      assert(sourceIds.includes(rating.sourceId), 'Every score must link to a source');
      assert(['20','100'].includes(rating.scale), 'Preserve the original rating scale');
      assert(rating.score && rating.publication);
    }
    for (const note of vintage.criticNotes) {
      assert(note.summary.en && note.summary.zh && note.sourceLabel.en && note.sourceLabel.zh);
      assert(note.quote.split(/\s+/).length <= 10, 'Keep quoted excerpts brief');
    }
    for (const row of vintage.cellarNotes || []) for(const source of row.sources) assert(sourceIds.includes(source));
  }
  assert(extra.selling.pitch.en && extra.selling.pitch.zh);
  for(const row of extra.selling.rows) assert(row.label.en && row.label.zh && row.text.en && row.text.zh);
}
const wa = year => editorial['rp-sortes'].vintages[year].ratings.find(r=>r.publication==='The Wine Advocate');
assert.equal(wa('2023').score,'96');
assert.equal(wa('2022').score,'95+');
assert.equal(editorial['rp-sortes'].vintages['2023'].ratings.find(r=>r.publication==='JancisRobinson.com').scale,'20');
assert.equal(editorial['rp-louro'].vintages['2023'].criticNotes[0].date,'2024-07');

const js = ts.transpileModule(readFileSync(new URL('../lib/wine-profile.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {wineTextSegments} = await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const text = 'Rafael Palacios makes Godello in Valdeorras; Santa Cruz stays plain.';
const segments = wineTextSegments(text,[{name:'Rafael Palacios',url:'#producers?id=rafael-palacios'},{name:'Godello',url:'#grapes?id=godello'},{name:'Valdeorras',url:'#regions?id=valdeorras'}]);
assert.equal(segments.map(s=>s.text).join(''),text);
assert.equal(segments.filter(s=>s.url).length,3);
assert(segments.some(s=>s.text.includes('Santa Cruz')&&!s.url));
assert.deepEqual(wineTextSegments('A+B and AAB',[{name:'A+B',url:'#known'}]).filter(s=>s.url),[{text:'A+B',url:'#known'}]);
assert.equal(wineTextSegments('Rafael Palacios',[{name:'Rafael',url:'#short'},{name:'Rafael Palacios',url:'#long'}])[0].url,'#long');
assert(!/[→↗]/.test(readFileSync(new URL('../app/WineDossier.tsx',import.meta.url),'utf8')));
console.log('PASS: four editorial profiles, vintage-scoped scores, bilingual critic attribution, original scales and contextual entity links.');
