const DAY_MS = 24 * 60 * 60 * 1000;

// The source uses ISO calendar dates, so UTC arithmetic keeps the same day in every browser.
export function bridgeCalendar(firstStageEnd, secondStageStart) {
  const start = Date.parse(firstStageEnd) + DAY_MS;
  const end = Date.parse(secondStageStart) - DAY_MS;
  const days = (end - start) / DAY_MS + 1;
  if (!Number.isInteger(days) || days < 2) return null;

  const middle = start + Math.ceil(days / 2) * DAY_MS;
  const iso = timestamp => new Date(timestamp).toISOString().slice(0, 10);
  return {
    days,
    ranges: [[iso(start), iso(middle - DAY_MS)], [iso(middle), iso(end)]],
  };
}
