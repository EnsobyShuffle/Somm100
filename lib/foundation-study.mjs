export const FOUNDATION_STORAGE_KEY = 'somm100.foundation.study.v1';
export const emptyFoundationProgress = () => ({version: 1, pace: 8, period: 1, checks: {}, answers: {}});

export function normalizeFoundationProgress(value, data) {
  const result = emptyFoundationProgress();
  if (!value || value.version !== 1) return result;
  result.pace = value.pace === 4 ? 4 : 8;
  result.period = Number.isInteger(value.period) && value.period >= 1 && value.period <= result.pace ? value.period : 1;
  for (const week of data.weeks) for (const check of week.checks) {
    if (value.checks?.[check.id] === true) result.checks[check.id] = true;
  }
  for (const question of data.questions) {
    const entry = value.answers?.[question.id];
    if (entry && [entry.first, entry.latest].every(n => Number.isInteger(n) && n >= 0 && n < question.options.length)) {
      result.answers[question.id] = {first: entry.first, latest: entry.latest};
    }
  }
  return result;
}

export function recordFoundationAnswer(progress, question, choice) {
  if (!Number.isInteger(choice) || choice < 0 || choice >= question.options.length) return progress;
  return {...progress, answers: {...progress.answers, [question.id]: {
    first: progress.answers[question.id]?.first ?? choice, latest: choice
  }}};
}

export function foundationWeekResult(week, data, progress) {
  const questions = data.questions.filter(q => q.week === week.number);
  const answered = questions.filter(q => progress.answers[q.id] !== undefined);
  const review = answered.filter(q => progress.answers[q.id].latest !== q.answer);
  return {total: questions.length, answered: answered.length, review: review.length,
    ready: questions.length > 0 && answered.length === questions.length && review.length === 0};
}

// Shuffle displayed choices only; stored choices always retain their source indexes.
export function foundationOptions(question) {
  const indexes = question.options.map((_, i) => i);
  let seed = 2166136261;
  for (const char of question.id) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619) >>> 0;
  for (let i = indexes.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = Math.floor((seed / 4294967296) * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}
