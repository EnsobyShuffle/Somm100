// Inventory integrity only; this does not verify wine facts, UI or deployment.
import {readFileSync} from 'node:fs';
function validateManifest(m){
if(m.units.length!==28||new Set(m.units.map(u=>u.id)).size!==28)throw Error("Unit identity");
for(const [day,count,checks] of [[3,13,72],[4,15,93]]){
const us=m.units.filter(u=>u.sourceDay===day);
if(us.length!==count||us.reduce((n,u)=>n+u.checkCount,0)!==checks)throw Error("Unit totals");
if(us.some((u,i)=>u.number!==i+1||u.questionCount!==3||u.answerCount!==3||!u.answerNumbersMatch||u.currentCohortDayConfirmed||u.studentUiIntegrated))throw Error("Unit validation");
}
for(const q of m.quizzes){if(q.questionCount!==(q.day===3?30:45)||q.mapping.length!==q.questionCount)throw Error("Quiz count");for(const r of q.mapping)if(!r.unitIds.length||r.unitIds.some(id=>!m.units.some(u=>u.id===id)))throw Error("Missing unit link");}
return {units:28,checks:165,unitQuestions:84,standaloneQuizQuestions:75,mappingReferencesValid:true};
}
const manifest=JSON.parse(readFileSync(new URL('../docs/qa/foundation-d34-source-inventory-20261105.json',import.meta.url),'utf8'));
console.log(JSON.stringify(validateManifest(manifest),null,2));
