export const AUTO_ADVANCE_DELAY=700;

export function canAdvanceQuizCard(question:{type:string;canSelfAssess?:boolean}|undefined,correct=false,grade?:string,revealed=false){
 if(!question)return false;
 if(question.type==='mcq')return correct;
 // Incomplete source cards cannot be graded; reviewing the available answer unlocks navigation.
 return question.canSelfAssess===false?revealed:grade==='Got it';
}

export function quizSwipeDirection(dx:number,dy:number,durationMs:number):'previous'|'next'|null{
 // Match the requested direction: left reviews the previous card, right advances.
 if(durationMs>1000||Math.abs(dx)<56||Math.abs(dx)<Math.abs(dy)*1.5)return null;
 return dx<0?'previous':'next';
}
