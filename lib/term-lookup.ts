export const normalizeTerm=(text:string)=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’‘]/g,"'").replace(/[‐‑–—]/g,'-').replace(/^[\s.,;:!?()“”"'。；，：]+|[\s.,;:!?()“”"'。；，：]+$/g,'').replace(/\s+/g,' ');
type SearchableTerm={en:string;zh:string;aliases:string[]};
// A canonical name takes precedence over another entry's alias. Never infer a
// definition from a substring: "must" in a sentence is not necessarily grape must.
export function findTerm<T extends SearchableTerm>(terms:T[],query:string){
 const q=normalizeTerm(query);if(!q)return undefined;
 return terms.find(t=>normalizeTerm(t.en)===q)||terms.find(t=>normalizeTerm(t.zh)===q)||terms.find(t=>t.aliases.some(s=>normalizeTerm(s)===q));
}
export function resolveTerm<T extends SearchableTerm>(terms:T[],query:string){
 const exact=findTerm(terms,query);if(exact)return {entry:exact,form:false};
 const q=normalizeTerm(query);if(!/^[a-z'-]+(?: [a-z'-]+){0,3}$/.test(q))return undefined;
 const words=q.split(' '),word=words.pop()!;
 const forms:string[]=[];
 const irregular:Record<string,string>={leaves:'leaf',berries:'berry',bodies:'body',fungi:'fungus'};
 if(irregular[word])forms.push(irregular[word]);
 if(word.endsWith("'s"))forms.push(word.slice(0,-2));
 if(word.endsWith('ies'))forms.push(word.slice(0,-3)+'y');
 if(/(?:ches|shes|sses|xes|zes)$/.test(word))forms.push(word.slice(0,-2));
 if(word.endsWith('s')&&!/(ss|us|is)$/.test(word))forms.push(word.slice(0,-1));
 // Inflection resolution is explicit in the UI and only returns an existing entry.
 const matches=forms.map(f=>findTerm(terms,[...words,f].join(' '))).filter((x):x is T=>!!x);
 const unique=matches.filter((x,i)=>matches.indexOf(x)===i);
 return unique.length===1?{entry:unique[0],form:true}:undefined;
}
export function termsInSelection<T extends SearchableTerm>(terms:T[],query:string){
 const q=normalizeTerm(query);if(q.length<4)return [];
 const contains=(key:string)=>{const k=normalizeTerm(key);if(k.length<3||k===q)return false;let from=0,index=-1;while((index=q.indexOf(k,from))!==-1){const left=q[index-1]||'',right=q[index+k.length]||'';if(!/[a-z0-9]/i.test(left)&&!/[a-z0-9]/i.test(right))return true;from=index+1}return false};
 return terms.filter(t=>normalizeTerm(t.en)!=='must'&&[t.en,...t.aliases].some(contains)).sort((a,b)=>b.en.length-a.en.length).slice(0,8);
}
export function searchTerms<T extends SearchableTerm>(terms:T[],query:string){
 const q=normalizeTerm(query);if(!q)return terms;
 return terms.map(t=>({t,keys:[t.en,t.zh,...t.aliases].map(normalizeTerm)})).filter(({keys})=>keys.some(k=>k.includes(q))).sort((a,b)=>{
  const score=(keys:string[])=>keys.some(k=>k===q)?0:keys.some(k=>k.startsWith(q))?1:2;
  return score(a.keys)-score(b.keys)||a.t.en.localeCompare(b.t.en,'en');
 }).map(({t})=>t);
}
