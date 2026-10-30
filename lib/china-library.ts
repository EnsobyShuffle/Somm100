import index from '../data/china-index.json';
export const chinaIndex=index.records;
export const chinaHref=(id?:string,kind?:string)=>id?`#library?country=China&type=${kind||chinaIndex.find(e=>e.id===id)?.kind||'region'}&id=${encodeURIComponent(id)}`:'#library?country=China';
export const chinaSearchEntries=[...chinaIndex].sort((a,b)=>['producer','wine','vintage','site','region'].indexOf(a.kind)-['producer','wine','vintage','site','region'].indexOf(b.kind)).map(e=>({id:chinaHref(e.id,e.kind).slice(1),title:e.name,sub:[e.en,e.entityType||e.kind,e.status].filter(Boolean).join(' · '),kind:'library',text:e.searchText}));
export const chinaProducerCards=chinaIndex.filter(e=>e.kind==='producer').map(e=>({id:e.id,name:e.name,aliases:[e.en,...e.aliases],country:'China',region:'云南相关 Producer 网络',appellation:e.areas.join(' / '),village:'',website:'',intro:e.summary,scope:e.entityType+' · '+e.status,relatedProducerIds:[],newsIds:[],sections:[],wines:[],questions:[],gaps:[],status:e.status}));
