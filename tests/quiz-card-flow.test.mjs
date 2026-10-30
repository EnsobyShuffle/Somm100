import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {loadTypeScript} from './load-typescript.mjs';
const navigation=await loadTypeScript('../lib/quiz-navigation.ts'),study=await loadTypeScript('../lib/quiz-study.ts'),round=await loadTypeScript('../lib/quiz-round.ts');
// Deterministic hook harness: exercise the actual component's event handlers,
// saved-state updates and effect cleanup without adding a browser dependency.
let slots=[],cursor=0,effects=[],pendingEffects=[],timers=new Map(),timerId=0;
const hooks={createElement:(type,props,...children)=>({type,props:{...props,children}}),Fragment:'fragment',
 useState(initial){const i=cursor++;if(!(i in slots))slots[i]=typeof initial==='function'?initial():initial;return [slots[i],value=>{slots[i]=typeof value==='function'?value(slots[i]):value}]},
 useRef(initial){const i=cursor++;return slots[i]??(slots[i]={current:initial})},
 useEffect(callback,deps){const i=cursor++,old=effects[i];if(!old||deps.some((d,n)=>!Object.is(d,old.deps[n])))pendingEffects.push(()=>{old?.cleanup?.();effects[i]={deps,cleanup:callback()}})}
};
const imports={'react':{__esModule:true,default:hooks,...hooks},'lucide-react':{Check:'check',X:'x'},'./Upgrade':{topics:{}},'../lib/quiz-formats':{applyQuizFormats:q=>q},'../lib/quiz-round':round,'../lib/quiz-study':study,'../lib/quiz-navigation':navigation,'../data/quizlet-sources.json':{default:{sources:[]}},'../data/henritage-sources.json':{default:{sources:[]}},'../lib/quiz-language':{englishTopics:{},quizLanguage:()=> 'zh',questionText:q=>({...q,mode:'zh'})}};
const mod={exports:{}};
const code=ts.transpileModule(readFileSync(new URL('../app/QuizStudy.tsx',import.meta.url),'utf8'),{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
vm.runInNewContext(code,{exports:mod.exports,require:name=>{assert.ok(imports[name],name);return imports[name]},crypto:{randomUUID:()=> 'test-request'},setTimeout:fn=>{timers.set(++timerId,fn);return timerId},clearTimeout:id=>timers.delete(id),requestAnimationFrame:()=>{},Date,Map,Set,window:{matchMedia:()=>({matches:true})}});
const questions=[1,2,3].map(n=>({id:'q'+n,type:'mcq',prompt:'Question '+n,answer:'Correct '+n,options:['Correct '+n,'Wrong '+n],correct:0,track:'SOMM100',difficulty:'SOMM100',country:'通用'}));
let state={bookmarks:[],dismissed:[],reviews:[]},failSave=false,tree;
const save=async payload=>{if(failSave)return null;state={...state,reviews:[...state.reviews.filter(r=>r.question_id!==payload.questionId),{question_id:payload.questionId,last_score:payload.answer===0?1:0,due_at:'2099-01-01'}]};return state};
function render(){cursor=0;tree=mod.exports.QuizStudy({questions,state,save,openLesson:()=>{}});while(pendingEffects.length)pendingEffects.shift()();return tree}
function flatten(node){if(!node||typeof node!=='object')return [];return [node,...(node.props?.children||[]).flat(Infinity).flatMap(flatten)]}
function label(node){if(Array.isArray(node))return node.map(label).join('');if(node==null||typeof node==='boolean')return '';if(typeof node!=='object')return String(node);return label(node.props?.children)}
function button(name){const b=flatten(tree).find(n=>n.type==='button'&&label(n)===name);assert.ok(b,'button '+name);return b}
const progress=()=>label(flatten(tree).find(n=>n.props?.['aria-label']==='题目进度'));
async function click(name){const b=button(name);assert.equal(!!b.props.disabled,false,name+' enabled');await b.props.onClick();render()}
function tick(){const work=[...timers.values()];timers.clear();work.forEach(fn=>fn());render()}
function arrow(key){const region=flatten(tree).find(n=>n.props?.role==='region');region.props.onKeyDown({key,target:region,currentTarget:region,preventDefault(){}});render()}
render();assert.equal(button('下一张').props.disabled,true);
await click('Wrong 1');assert.equal(progress(),'1 / 3');tick();assert.equal(progress(),'1 / 3');assert.equal(button('下一张').props.disabled,true);
await click('Correct 1');assert.equal(progress(),'1 / 3');tick();assert.equal(progress(),'2 / 3');
arrow('ArrowLeft');assert.equal(progress(),'1 / 3');tick();assert.equal(progress(),'1 / 3');arrow('ArrowRight');assert.equal(progress(),'2 / 3');arrow('ArrowRight');assert.equal(progress(),'2 / 3');
failSave=true;await click('Correct 2');tick();assert.equal(progress(),'2 / 3');failSave=false;
await click('Wrong 2');await click('再学一次');assert.equal(progress(),'1 / 1');await click('Correct 2');tick();assert.equal(progress(),'1 / 1');assert.match(label(tree),/已到最后一题/);
await click('全部题目');await click('Correct 1');await click('逐条揭晓');tick();assert.ok(!flatten(tree).some(n=>n.props?.['aria-label']==='题目进度'));
console.log('PASS: wrong stays, saved correct advances once, revisits do not advance, unanswered forward blocked, failed saves stay, review membership survives score changes, mode changes cancel timers.');
