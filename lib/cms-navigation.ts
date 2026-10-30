export function activeNavigation(page:string){
 if(['cms','cms-module','theory','lesson','explore','tasting','service'].includes(page))return 'cms';
 return page==='producers'?'library':page;
}
export function cmsHref(moduleId='module01',resource='core',section='',stage=1,level=''){
 const p=new URLSearchParams({module:moduleId,stage:String(stage),resource});
 if(section)p.set('section',section);
 if(['IC','AS','MS'].includes(level))p.set('level',level);
 return '#cms-module?'+p.toString();
}
export function readCmsRoute(hash:string){
 const p=new URLSearchParams(hash.split('?')[1]);
 const requested=p.get('module')||'module01',moduleId=(/^(?:module(?:0[1-9]|[12][0-9])|module10-spain|module11-portugal)$/.test(requested))?requested:'module01';
 return {moduleId,stage:[1,2,3,4].includes(Number(p.get('stage')))?Number(p.get('stage')):1,resource:['guide','core','expansion','checklist','questions'].includes(p.get('resource')||'')?p.get('resource')!:'core',section:p.get('section')||''};
}

export function readCmsLevel(hash:string){const level=new URLSearchParams(hash.split('?')[1]).get('level')||'';return ['IC','AS','MS'].includes(level)?level:'';}
export function isCoursePage(page:string){return ['courses','foundation','cms','cms-module','theory','lesson','explore','tasting','service'].includes(page);}
