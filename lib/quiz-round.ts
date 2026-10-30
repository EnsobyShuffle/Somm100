export const ROUND_SIZES=[10,20,30,50,100] as const;
type Question={id:string;type:string};
function shuffled<T>(list:T[],random:()=>number){const result=[...list];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
export function buildQuizRound<T extends Question>(questions:T[],requested:number,mixedSomm100=false,random:()=>number=Math.random){
 const unique=[...new Map(questions.map(q=>[q.id,q])).values()];
 const target=Math.min(Math.max(0,Math.floor(requested)),unique.length);
 let selected:T[];
 if(mixedSomm100){
  const choices=shuffled(unique.filter(q=>q.type==='mcq'),random),written=shuffled(unique.filter(q=>q.type==='short'),random),choiceTarget=Math.round(target*.7);
  selected=[...choices.slice(0,choiceTarget),...written.slice(0,target-choiceTarget)];
  const ids=new Set(selected.map(q=>q.id));
  selected.push(...shuffled(unique.filter(q=>!ids.has(q.id)),random).slice(0,target-selected.length));
  selected=shuffled(selected,random);
 }else selected=shuffled(unique,random).slice(0,target);
 return {ids:selected.map(q=>q.id),requested,actual:selected.length,mcq:selected.filter(q=>q.type==='mcq').length,short:selected.filter(q=>q.type==='short').length,limited:selected.length<requested};
}
