import formats from '../data/somm100-quiz-formats.json';
// This layer changes only the exercise format. The source bank, wording, hashes and history IDs remain intact.
export function applyQuizFormats<T extends {id:string;track?:string;type:string;answer?:string;sourceContentHash?:string}>(questions:T[]):(T & {options?:string[];correct?:number;originalType?:string;choicePresentation?:string})[]{
 return questions.map(question=>{
  const format=(formats as Record<string,{options:string[];correct:number;sourceAnswer:string;sourceContentHash:string}>)[question.id];
  if(question.track!=='SOMM100'||!format||question.answer!==format.sourceAnswer||question.sourceContentHash!==format.sourceContentHash)return question;
  return {...question,originalType:'short',type:'mcq',options:format.options,correct:format.correct,choicePresentation:'multiple-choice-from-original'};
 });
}
