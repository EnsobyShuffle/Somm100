import snapshot from '../data/knowledge-dictionary.json';
export type DictionaryEntry={
 id:string;en:string;zh:string;aliases:string[];category:string;entityType:string;cuisine?:string;
 definition:{en:string;zh:string};sources:{title:string;url:string}[];
 status:'Reviewed'|'Approved';reviewedAt:string;ipa?:string;
 examples:{en:string;zh:string}[];relatedTerms:string[];
};
export const dictionary:DictionaryEntry[]=snapshot as DictionaryEntry[];
export function openDictionary(query:string){
 window.dispatchEvent(new CustomEvent('somm100:dictionary',{detail:{query}}));
}
