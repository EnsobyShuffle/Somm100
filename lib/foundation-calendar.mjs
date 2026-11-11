const formatUtc = date => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

export function foundationCalendarFile(cohort, city) {
  return `cohort-${cohort.cohort}-calendar/${city.calendarSlug}.ics`;
}

export function buildFoundationCalendar(cohort, city, generatedAt) {
  const [start, end] = cohort.classHours.split('–');
  const localToUtc = (date, time) => formatUtc(new Date(`${date}T${time}:00+08:00`));
  const stamp = formatUtc(generatedAt);
  const events = city.stages.flat().flatMap((date, index) => {
    const day = index + 1;
    return [
      'BEGIN:VEVENT',
      `UID:somm100-${cohort.cohort}-${city.calendarSlug}-${day}@somm100.cn`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${localToUtc(date, start)}`,
      `DTEND:${localToUtc(date, end)}`,
      `SUMMARY:SOMM100 第${cohort.cohort}期｜${city.city}｜面授第 ${day} 天`,
      'DESCRIPTION:教学与考核安排以课程方通知为准。',
      'END:VEVENT',
    ];
  });
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SOMM100//Foundation Course//ZH-CN', ...events, 'END:VCALENDAR', ''].join('\r\n');
}
