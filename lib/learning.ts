import data from '../data/curriculum.json';
import {applyQuizFormats} from './quiz-formats';
export const curriculum = {...data,questions:applyQuizFormats(data.questions)};
export function grade(question: any, answer: unknown, rating?: unknown) {
  if (question.canSelfAssess === false) throw new Error('原卡答案尚不完整，请先查看来源；此条目暂不计入答题记录。');
  if (question.type === 'mcq') {
    if (!Number.isInteger(answer) || Number(answer)<0 || Number(answer)>=question.options.length) throw new Error('请选择一个选项');
    return {score:answer===question.correct?1:0,maxScore:1,method:'automatic'};
  }
  if(typeof answer!=='string' || !answer.trim() || answer.length>6000) throw new Error('请先填写你的回答');
  if(typeof rating!=='number'||![0,1,2].includes(rating)) throw new Error('请对照参考答案完成自评');
  return {score:Number(rating),maxScore:2,method:'self-assessed'};
}
export function scheduleReview(streak:number, passed:boolean, now=new Date()) {
  const nextStreak=passed?Math.min(streak+1,6):0;
  const days=passed?[1,3,7,14,30,60][nextStreak-1]:1;
  return {streak:nextStreak,dueAt:new Date(now.getTime()+days*86400000).toISOString()};
}
