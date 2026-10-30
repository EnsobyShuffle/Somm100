/** Reconcile each legal name to a single canonical grape, without creating duplicate dossiers. */
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const data=new URL('../../data/',import.meta.url),read=n=>JSON.parse(readFileSync(new URL(n,data),'utf8'));
const source=read('france-classification-source.json'),grapes=read('grape-varieties.json');
const norm=s=>s.replace(/œ/gi,'oe').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const aliases=new Map();for(const g of grapes)for(const n of [g.name,...g.aliases.map(a=>a.name)]){const k=norm(n);if(!aliases.has(k))aliases.set(k,new Set());aliases.get(k).add(g.id);}
const overrides={'Auxerrois':'auxerrois-blanc','Muscat d’Alexandrie':'muscat-of-alexandria'};
const entries=source.entries.map(e=>{const id=e.grapeId||overrides[e.name];let matches=id?[id]:[...(aliases.get(norm(e.name))||[])];assert.equal(matches.length,1,e.name+' needs one evidenced canonical identity, got '+matches.join(','));assert(grapes.some(g=>g.id===matches[0]),e.name+' unknown ID '+matches[0]);return {...e,grapeId:matches[0]};});
assert.equal(entries.filter(e=>e.scope==='national').length,361);assert.equal(entries.filter(e=>e.scope==='departmental').length,11);assert.equal(entries.filter(e=>e.scope==='temporary').length,8);
const report={...source,entries,nationalNames:361,departmentalNames:11,temporaryProfiledNames:8,unprofiledExperimentalAccessions:source.pendingResearchCodes.length,permanentNameReconciliationComplete:true,historicalRegionalCoverageExhaustive:false};
writeFileSync(new URL('france-grape-catalogue.json',data),JSON.stringify(report,null,2)+'\n');console.log('French legal-name reconciliation: 361 national + 11 departmental + 8 named temporary; '+report.unprofiledExperimentalAccessions+' research accessions remain explicitly unprofiled.');
