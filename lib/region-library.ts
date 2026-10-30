export type Bilingual={en:string;zh:string};
export type RegionIndex={id:string;name:string;country:string;kind:string;parentId?:string;aliases:string[];intro:Bilingual;grapeIds:string[];questionCount:number};
export type RegionDossier=Omit<RegionIndex,'grapeIds'|'questionCount'>&{
 facts:{label:Bilingual;body:Bilingual}[];
 sections:{id:string;title:Bilingual;lead?:Bilingual;editorial?:boolean;rows:{label:Bilingual;body:Bilingual}[];refs:string[]}[];
 grapes:{grapeId:string;role:Bilingual;sourceIds:string[]}[];
 wines:{name:string;producer:string;url:string;note:Bilingual}[];
 sources:{id:string;title:string;url:string}[];reviewed:string;coverage?:Bilingual;
 questions:{id:string;level:'foundation'|'advanced';group:'place'|'law'|'people'|'service';q:Bilingual;a:Bilingual;note?:Bilingual;refs:string[]}[];
};
export function normalizeRegion(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'").replace(/[‐‑‒–—−]/g,'-').toLowerCase().replace(/[-\s]+/g,' ').trim()}
export function resolveRegion<T extends Pick<RegionIndex,'id'|'name'|'country'|'aliases'>>(regions:T[],name:string,country=''){
 const key=normalizeRegion(name),pool=country?regions.filter(r=>r.country===country):regions;
 const exact=pool.filter(r=>r.id===name||normalizeRegion(r.name)===key);if(exact.length===1)return exact[0];if(exact.length>1)return;
 const aliases=pool.filter(r=>(r.aliases||[]).some(a=>normalizeRegion(a)===key));return aliases.length===1?aliases[0]:undefined;
}
export function regionDossierHref(id:string,lang?:string){return '#library?type=region&id='+encodeURIComponent(id)+(lang?'&lang='+lang:'')}
export function regionDescendantIds(regions:RegionIndex[],id:string){const ids=new Set([id]);let changed=true;while(changed){changed=false;for(const r of regions)if(r.parentId&&ids.has(r.parentId)&&!ids.has(r.id)){ids.add(r.id);changed=true}}return ids}
export function regionGrapeIds(regions:RegionIndex[],id:string){const ids=regionDescendantIds(regions,id);return new Set(regions.filter(r=>ids.has(r.id)).flatMap(r=>r.grapeIds))}
export function filterRegions(regions:RegionIndex[],query='',country='',kind='',parent=''){
 const words=normalizeRegion(query).split(/\s+/).filter(Boolean),ids=parent?regionDescendantIds(regions,parent):null;
 return regions.filter(r=>(!country||r.country===country)&&(!kind||r.kind===kind)&&(!ids||ids.has(r.id))&&words.every(q=>normalizeRegion([r.name,r.country,...r.aliases,r.intro.en,r.intro.zh].join(' ')).includes(q))).sort((a,b)=>a.country.localeCompare(b.country)||a.name.localeCompare(b.name));
}
