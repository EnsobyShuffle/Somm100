export type ReviewLevel = 'foundation' | 'advanced';

export const reviewLevels = [
  { id: 'foundation', label: 'SOMM100 / IS / CS', count: 10 },
  { id: 'advanced', label: 'AS / MS', count: 20 },
] as const;

// Rotate through the bank without repeating a question within a set.
// Keep source order so topic filters and question numbering remain predictable.
export function getReviewSet<T extends { id: string; level: ReviewLevel }>(bank: T[], level: ReviewLevel, round = 0): T[] {
  const pool = bank.filter(question => question.level === level);
  const count = reviewLevels.find(option => option.id === level)!.count;
  if (pool.length <= count) return pool;
  const start = (Math.max(0, Math.floor(round)) * count) % pool.length;
  const selected = new Set(Array.from({ length: count }, (_, index) => pool[(start + index) % pool.length].id));
  return pool.filter(question => selected.has(question.id));
}
