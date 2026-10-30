import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const source=JSON.parse(readFileSync(new URL('content/knowledge-dictionary.json',root),'utf8'));
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’‘]/g,"'").replace(/[‐‑–—]/g,'-').trim().replace(/\s+/g,' ');
const entries=source.entries.filter(e=>!e.mergedInto&&['Reviewed','Approved'].includes(e.status));
const ids=new Set(),names=new Set();
for(const e of entries){
 if(ids.has(e.id)||names.has(normalize(e.en)))throw Error('Duplicate canonical entry: '+e.en);
 ids.add(e.id);names.add(normalize(e.en));
 if(!e.definition.en?.trim()||!e.definition.zh?.trim()||!e.reviewedAt||!e.sources.length)throw Error('Incomplete reviewed entry: '+e.en);
 for(const s of e.sources){if(new URL(s.url).protocol!=='https:'||!s.title)throw Error('Invalid source: '+e.en);}
}
const snapshot=entries.map(({id,en,zh,aliases,category,entityType,cuisine,definition,sources,status,reviewedAt,ipa,examples,relatedTerms})=>({id,en,zh,aliases,category,entityType,...(cuisine?{cuisine}:{}),definition,sources,status,reviewedAt,...(ipa?{ipa}:{}),examples:examples||[],relatedTerms:relatedTerms||[]})).sort((a,b)=>a.en.localeCompare(b.en,'en'));
writeFileSync(new URL('data/knowledge-dictionary.json',root),JSON.stringify(snapshot,null,2)+'\n');
// Keep the old data filename as a generated compatibility export for callers
// outside this checkout. Both files are built from the same reviewed content.
writeFileSync(new URL('data/wine-term-reference.json',root),JSON.stringify(snapshot,null,2)+'\n');
console.log(`Published snapshot: ${snapshot.length} reviewed terms; ${source.entries.length-snapshot.length} retained for editorial follow-up.`);
