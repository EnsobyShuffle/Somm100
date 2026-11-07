import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {foundationDiagrams,renderFoundationDiagram} from '../lib/foundation-diagrams.mjs';
const data=JSON.parse(readFileSync(new URL('../data/foundation-d1.json',import.meta.url)));
const ids=['foundation-d1-01','foundation-d1-02','foundation-d1-03'];
const h=(tag,props,...children)=>({tag,props:props||{},children:children.flat(Infinity).filter(x=>x!==null)});
function nodes(tree){return typeof tree==='object'?[tree,...tree.children.flatMap(nodes)]:[]}
function words(tree){return typeof tree==='object'?tree.children.map(words).join(' '):String(tree)}
test('three new diagrams resolve existing stable lesson IDs and render labelled figures',()=>{
 for(const id of ids){
  assert(data.units.some(unit=>unit.id===id));
  const figure=renderFoundationDiagram(h,id),all=nodes(figure);
  assert.equal(figure.tag,'figure');
  assert(all.some(n=>n.tag==='figcaption'&&n.props.id===figure.props['aria-labelledby']));
  for(const group of foundationDiagrams[id].groups)for(const pair of group.nodes)for(const text of pair)assert(words(figure).includes(text));
  assert.equal(all.filter(n=>n.tag==='a'||n.tag==='img'||n.tag==='iframe').length,0);
 }
 assert.equal(renderFoundationDiagram(h,'missing-unit'),null);
});
test('growth sequence stays ordered, without fixed months or equating veraison with harvest',()=>{
 const diagram=foundationDiagrams['foundation-d1-02'];
 assert.deepEqual(diagram.groups[0].nodes.map(x=>x[0]),['休眠','萌芽','开花','坐果','转色','成熟','采收']);
 assert.equal(nodes(renderFoundationDiagram(h,'foundation-d1-02')).filter(n=>n.tag==='ol').length,1);
 assert.match(diagram.note,/转色不等于/);
});
test('grape structure and environment remain qualified, separate factors',()=>{
 const grape=foundationDiagrams['foundation-d1-01'],environment=foundationDiagrams['foundation-d1-03'];
 assert.equal(grape.groups[0].nodes.length,4);
 assert(grape.groups[0].nodes.some(x=>x[0].startsWith('梗')));
 assert.match(grape.note,/不是植物解剖图/);
 assert.match(environment.note,/不是固定风味公式/);
 assert.equal(environment.groups.length,2);
 assert.equal(environment.groups.flatMap(g=>g.nodes).length,6);
});
test('every diagram uses the shared semantic renderer; D1 component already wires current unit',()=>{
 for(const id of Object.keys(foundationDiagrams)){
  const d=foundationDiagrams[id],tree=renderFoundationDiagram(h,id);
  assert(d.title&&d.intro&&d.takeaway&&d.note);
  assert(nodes(tree).some(n=>n.tag==='figcaption'));
  assert(d.groups.every(g=>g.nodes.every(p=>p.length===2&&p.every(s=>typeof s==='string'&&s.length))));
 }
 const source=readFileSync(new URL('../app/FoundationD1Review.js',import.meta.url),'utf8');
 assert(source.includes('h(FoundationDiagram, {unitId: unit.id})'));
});
