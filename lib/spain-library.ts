import raw from '../data/spain-library.json';

export type SpainSource={id:string;title:string;url:string;kind?:string;checkedAt?:string};
export type SpainStudySection={heading:string;paragraphs:string[];sourceIds:string[];status?:string;sourceDate?:string};
export type SpainRegion={id:string;name:string;kind:string;traditionalTerm?:string;parent:string;grapeIds:string[];overview:string;climate:string;soils:string;subregions:string[];regulations:string[];studySections?:SpainStudySection[];producerIds:string[];sourceIds:string[];verification?:string;scope?:string};
export type SpainProducer={id:string;name:string;aliases?:string[];regionIds:string[];location:string;story:string;wineIds:string[];sourceIds:string[];verification?:string};
export type SpainWine={id:string;name:string;producerId:string;regionId:string;denomination:string;grapeIds:string[];grapeText:string;style:string;notes:string;status:string;sourceIds:string[];verification?:string};
export type SpainGrape={id:string;name:string;color:string;aliases:string[];classificationNames?:string[];regionIds:string[];summary:string;signature:string[];confusions:string[];sourceIds:string[];verification?:string};
export type SpainQuestion={id:string;level:string;q:string;a:string;sourceIds:string[];regionIds?:string[]};
export type SpainData={updatedAt:string;grapes:SpainGrape[];regions:SpainRegion[];producers:SpainProducer[];wines:SpainWine[];sources:SpainSource[];questions:SpainQuestion[];corrections:{topic:string;old:string;new:string;sourceIds:string[]}[];coverage:Record<string,number>;gaps:string[];gapDetails?:{topic:string;detail:string;sourceIds:string[]}[]};
export const spain=raw as unknown as SpainData;
export const spainRegionHref=(id:string)=>'#library?type=region&id='+encodeURIComponent(id);
export const spainWineHref=(id:string)=>'#library?type=wine&id='+encodeURIComponent(id);
export const spainProducerHref=(id:string)=>'#producers?id='+encodeURIComponent(id);
export const spainGrapeHref=(id:string)=>'#grapes?id='+encodeURIComponent(id);
export const spainKind:Record<string,string>={'DO':'DO','DOCa':'DOCa / DOQ','DOQ':'DOQ','DOP':'DOP','DO-subcategory':'DO Penedès 起泡酒类别','DOP Pago':'Vino de Pago','IGP':'IGP / Vino de la Tierra',geographic:'地理区域',organization:'生产者组织','autonomous-community':'自治区 · 种植许可'};
export const spainRegion=(id:string)=>spain.regions.find(r=>r.id===id);
export const spainProducer=(id:string)=>spain.producers.find(p=>p.id===id);
export const spainWinesForRegion=(id:string)=>spain.wines.filter(w=>w.regionId===id);
