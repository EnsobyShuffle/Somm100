import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const dir=new URL('../../data/',import.meta.url);
const read=n=>JSON.parse(readFileSync(new URL(n,dir),'utf8'));
const grapes=read('grape-varieties.json').map(g=>({id:g.id,name:g.name,zh:g.zh,aliases:g.aliases,summary:g.summary,text:[g.name,g.zh,...g.aliases.map(a=>a.name),...(g.classificationNames||[]),...g.countries,...g.regions.map(r=>r.name),...g.genetics.parents].join(' ')}));
const wines=read('grape-wines.json').map(w=>({id:w.id,name:w.name,producer:w.producer,country:w.country,region:w.region,grapeNames:w.grapeNames,description:w.description,imageUrl:w.imageUrl,libraryWineId:w.libraryWineId}));
writeFileSync(new URL('grape-index.json',dir),JSON.stringify(grapes)+'\n');
writeFileSync(new URL('grape-wine-index.json',dir),JSON.stringify(wines)+'\n');
if(existsSync(new URL('region-dossiers.json',dir))){
 const regions=read('region-dossiers.json');
 const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 for(const r of regions){
  const short=r.name.replace(/\s+(?:DOCG|DOC|AOC|AOP)$/,'');
  if(short===r.name)continue;
  const other=regions.some(x=>x.id!==r.id&&x.country===r.country&&[x.name,...x.aliases].some(a=>norm(a)===norm(short)));
  const sameBase=regions.filter(x=>x.country===r.country&&norm(x.name.replace(/\s+(?:DOCG|DOC|AOC|AOP)$/, ''))===norm(short));
  if(!other&&sameBase.length===1&&!r.aliases.some(a=>norm(a)===norm(short)))r.aliases.push(short);
 }
 const index=regions.map(r=>({id:r.id,name:r.name,country:r.country,kind:r.kind,...(r.parentId?{parentId:r.parentId}:{}),aliases:r.aliases,intro:r.intro,grapeIds:r.grapes.map(g=>g.grapeId),questionCount:r.questions.length}));
 writeFileSync(new URL('region-dossiers.json',dir),JSON.stringify(regions,null,2)+'\n');
 writeFileSync(new URL('region-index.json',dir),JSON.stringify(index,null,2)+'\n');
}
