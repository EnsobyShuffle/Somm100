export const D3_QUIZ_STORAGE_KEY = 'somm100.foundation.d3-quiz.v1';

// Reuse the versioned review record parser with one question per navigation unit.
export function quizProgressData(data) {
  return {units: data.questions.map(q => ({id:q.id, number:q.number, checks:[], questions:[q]}))};
}

export function quizResult(data, progress) {
  const answered = data.questions.filter(q => progress.answers[q.id]);
  const correct = answered.filter(q => progress.answers[q.id].latest === q.answer);
  return {total:data.questions.length, answered:answered.length, correct:correct.length,
    needsReview:answered.filter(q => progress.answers[q.id].latest !== q.answer).map(q => q.number)};
}
