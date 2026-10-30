import translations from '../data/quiz-translations.json';

export type QuizLanguage = 'zh' | 'bilingual' | 'en';
export function quizLanguage(track:string, level:string):QuizLanguage {
  return track==='SOMM100'?'zh':['AS','MS'].includes(level)?'en':'bilingual';
}
export function questionText(question:any) {
  const mode=quizLanguage(question.track||'CMS',question.difficulty);
  const translation=(translations as Record<string,{prompt:string;answer:string}>)[question.id];
  return {mode,prompt:question.prompt,answer:question.answer,
    promptZh:mode==='bilingual'?translation?.prompt:undefined,
    answerZh:mode==='bilingual'?translation?.answer:undefined,
    translationPending:mode==='bilingual'&&!translation};
}
export const englishTopics:Record<string,string>={viticulture:'Viticulture',vinification:'Vinification',alsace:'Alsace',service:'Service',tasting:'Tasting',regions:'Countries & regions',grape_varieties:'Grape varieties',mixed:'Mixed topics'};
