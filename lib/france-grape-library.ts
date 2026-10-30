import {Grape,filterGrapes} from './grape-library';

export type FrenchConnection={grapeId:string;name:string;status:string;note:{en:string;zh:string};sourceUrls:string[]};
export type FrenchRegion={id:string;name:string;en:string;zh:string;entries:FrenchConnection[];sources:{title:string;url:string}[]};
export type FrenchCatalogue={reviewed:string;sourceUrl:string;entries:{name:string;grapeId:string;scope:string;departments?:string[]}[]};
export const frenchStatus:Record<string,string>={principal:'主要品种',complementary:'补充品种',historic:'历史记录',revival:'保育／复兴',experimental:'试验／育种'};

/** Country scope includes classified varieties and documented regional history,
 * without rewriting their growing-country or AOC-authorisation records. */
export function frenchGrapeIds(grapes:Grape[],regions:FrenchRegion[],catalogue:FrenchCatalogue){
 return new Set([...grapes.filter(g=>g.countries.includes('France')).map(g=>g.id),...regions.flatMap(r=>r.entries.map(e=>e.grapeId)),...catalogue.entries.map(e=>e.grapeId)]);
}
export function filterFrenchGrapes(grapes:Grape[],regions:FrenchRegion[],catalogue:FrenchCatalogue,query='',color='',letter='',area=''){
 const region=area?regions.find(r=>r.id===area):undefined;
 const ids=area?new Set(region?.entries.map(e=>e.grapeId)||[]):frenchGrapeIds(grapes,regions,catalogue);
 return filterGrapes(grapes.filter(g=>ids.has(g.id)),query,'',color,letter);
}
