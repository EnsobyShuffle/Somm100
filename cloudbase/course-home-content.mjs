const htmlEntities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'};
const escapeHtml = value => String(value).replace(/[&<>"]/g, char => htmlEntities[char]);
const yuan = new Intl.NumberFormat('zh-CN', {style: 'currency', currency: 'CNY', maximumFractionDigits: 0});
const stages = ['第一阶段', '第二阶段', '第三阶段'];

export function renderCourseHome(html, cohort, concepts) {
  const cityCards = cohort.cities.map(city => {
    const schedule = city.stages.map((dates, index) => {
      const times = dates.map(date => {
        const day = escapeHtml(date);
        return `<time datetime="${day}">${day.replaceAll('-', '/')}</time>`;
      }).join('、');
      return `<div><dt>${stages[index]}</dt><dd>${times}</dd></div>`;
    }).join('');
    return `<li><h3>${escapeHtml(city.city)}</h3>
      <p>主讲老师／班主任　${escapeHtml(city.instructor)}<br>${escapeHtml(city.bio)}</p><dl>${schedule}</dl></li>`;
  }).join('\n');
  const tuition = cohort.tuition.map(({label, amountCny}) =>
    `<li>${escapeHtml(label)} <strong>${yuan.format(amountCny)}</strong></li>`).join('');
  const cohortPreview = `<p>每日上课时间 ${escapeHtml(cohort.classHours)}。教学主题、考核日期和教室安排以课程方通知为准。</p>
    <ul class="cards cohort-cards">${cityCards}</ul>
    <h3>学费（人民币）</h3>
    <ul class="cohort-tuition">${tuition}</ul>
    <p>课程设计　${escapeHtml(cohort.courseDesigner)}　课程顾问　${escapeHtml(cohort.courseAdvisor)}</p>
    <p class="label">${escapeHtml(cohort.sourceLabel)}</p>`;
  const enrollment = `<a class="action" href="${escapeHtml(cohort.registrationUrl)}" target="_blank" rel="noopener noreferrer">打开第22期报名表 ↗</a>
    <a href="${escapeHtml(cohort.sourceUrl)}" target="_blank" rel="noopener noreferrer">招生原文 ↗</a>`;

  const readingGroups = concepts.filter(({articles}) => articles.length > 0)
    .map(({title, intro, articles}) => {
      const entries = articles.map(({title, whyRead, url}) =>
        `<li><strong>${escapeHtml(title)}</strong><p>${escapeHtml(whyRead)}</p>
          <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">打开《${escapeHtml(title)}》公众号原文 ↗</a></li>`).join('\n');
      return `<details class="reading-group"><summary>${escapeHtml(title)} · ${articles.length} 篇</summary>
        <p>${escapeHtml(intro)}</p><ul>${entries}</ul></details>`;
    }).join('\n');

  return html.replace('<!-- course-home-cohort -->', () => cohortPreview)
    .replace('<!-- course-home-reading -->', () => readingGroups)
    .replace('<!-- course-home-enrollment -->', () => enrollment);
}
