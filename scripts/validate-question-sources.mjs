import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url)));
const policy=read('data/question-source-policy.json'),data=read('data/curriculum.json');
const retired=new Set(policy.retiredQuestionIds);
for(const q of data.questions){
 assert(!retired.has(q.id),'Retired generated question: '+q.id);
 const cms=q.sourceBatch==='quizlet-20261028'&&q.track==='CMS'&&q.sourceRefs?.every(s=>policy.approvedCmsSetIds.includes(s.setId));
 const owned=q.sourceOwner==='Henritage'&&q.sourceRefs?.every(s=>policy.approvedHenritageSetIds.includes(s.setId));
 // Youdao imports require an explicit original-note inventory and source-card mapping before admission.
 assert((cms||owned)&&q.sourceRefs?.length&&q.sourceUrl,'Unapproved or untraceable source: '+q.id);
 assert(!['AS','MS'].includes(q.difficulty)||!/[\u3400-\u9fff]/.test(q.prompt+q.answer),'AS/MS requires English original text: '+q.id);
}
for(const path of ['data/region-dossiers.json','data/producers.json','data/wine-library.json','data/grape-profiles.json','data/spain-library.json']){
 const visit=v=>{if(!v||typeof v!=='object')return;for(const [k,x] of Object.entries(v)){if(k==='questions'&&Array.isArray(x))assert.equal(x.length,0,'Retired supplemental bank: '+path);else visit(x)}};
 visit(read(path));
}
console.log('PASS: only approved original question sources; retired banks remain empty; AS/MS content is English.');
