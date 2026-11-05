export const D2_STORAGE_KEY = 'somm100.foundation.d2-review.v1';
export const emptyD2Progress = () => ({version: 1, unit: 1, checks: {}, answers: {}});

export function normalizeD2Progress(value, data) {
  const result = emptyD2Progress();
  if (!value || value.version !== 1) return result;
  if (data.units.some(u => u.number === value.unit)) result.unit = value.unit;
  for (const unit of data.units) {
    for (const check of unit.checks) if (value.checks?.[check.id] === true) result.checks[check.id] = true;
    for (const question of unit.questions) {
      const entry = value.answers?.[question.id];
      if (entry && [entry.first, entry.latest].every(n => Number.isInteger(n) && n >= 0 && n < question.options.length)) {
        result.answers[question.id] = {first: entry.first, latest: entry.latest};
      }
    }
  }
  return result;
}

export function d2UnitResult(unit, progress) {
  const checked = unit.checks.filter(c => progress.checks[c.id] === true).length;
  const answered = unit.questions.filter(q => progress.answers[q.id] !== undefined).length;
  const correct = unit.questions.filter(q => progress.answers[q.id]?.latest === q.answer).length;
  return {checked, answered, correct, reviewed: checked === unit.checks.length && answered === unit.questions.length && correct === unit.questions.length};
}

export function readD2Progress(storage, data, storageKey = D2_STORAGE_KEY) {
  try {
    const raw = storage.getItem(storageKey);
    const value = raw ? JSON.parse(raw) : null;
    if (value && value.version !== 1) throw new Error('Unsupported record');
    return {progress: normalizeD2Progress(value, data), canSave: true, error: ''};
  } catch {
    return {progress: emptyD2Progress(), canSave: false, error: '本机复习记录无法读取。本次可以练习，但不会覆盖旧记录或保存新进度。'};
  }
}

export function writeD2Progress(storage, progress, storageKey = D2_STORAGE_KEY) {
  try {
    storage.setItem(storageKey, JSON.stringify(progress));
    return '';
  } catch {
    return '本机保存失败。当前作答仍在本页面中，请勿关闭页面。';
  }
}
