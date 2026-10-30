import { normalizeTerm } from './term-lookup';
import { cmsHref } from './cms-navigation';
import readingVocabulary from '../data/cms-reading-vocabulary.json';

export const plainReadingText = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*+/g, '').trim();
export type CourseTerm = {
  id: string; en: string; zh: string; aliases: string[]; category: string; entityType: string;
  definition: { en: string; zh: string }; examples: { en: string; zh: string }[];
  relatedTerms: string[]; sources: { title: string; url: string }[]; reviewedAt: string;
  courseSource: true; ipa?: string;
};
export type ReadingTranslation = { en: string; zh: string; sectionId: string; title: string; href: string };

// Reuse explicit bilingual pairs already present in the user's CMS learning稿.
// These are source-text references, never newly generated sentence translations.
export function buildCourseTranslationIndex(modules: any[]) {
  const terms: CourseTerm[] = [], passages: ReadingTranslation[] = [];
  const seen = new Set<string>();
  for (const module of modules) for (const resourceName of ['core', 'expansion']) {
    for (const section of module.resources[resourceName]?.sections || []) {
      const href = cmsHref(module.id, resourceName, section.id);
      const source = { title: `Module ${module.number} · ${section.title}`, url: href };
      const blocks = section.blocks || [];
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const en = plainReadingText(block.text || ''), next = blocks[i + 1];
        const zh = plainReadingText(next?.text || '');
        if (block.type === 'paragraph' && next?.type === 'paragraph' && en.length >= 35 && !/[\u3400-\u9fff]/.test(en) && /[a-zA-Z]/.test(en) && (zh.match(/[\u3400-\u9fff]/g)?.length || 0) > 12) {
          passages.push({ en, zh, sectionId: section.id, title: source.title, href });
        }
        // Only explicit short term/translation pairs; no inference from prose.
        if (!['paragraph', 'list'].includes(block.type)) continue;
        for (const text of [block.text || '', ...(block.items || [])]) for (const match of text.matchAll(/\*\*([^*\n｜]{2,75})｜([^*\n｜]{1,65})\*\*/g)) {
          const en = match[1].replace(/[：:]$/, '').trim();
          const zh = match[2].split(/[：:]/)[0].trim();
          const key = normalizeTerm(en);
          if (!/^[a-zA-ZÀ-ž]/.test(en) || /[\u3400-\u9fff]/.test(en) || !/[\u3400-\u9fff]/.test(zh) || en.split(/\s+/).length > 7 || /Book|Figure|Core Text|Wine Terms|Breakdown|Exam Focus|What to|Extension|Knowledge|English|Certified|Stage|Reading|AS★/i.test(en) || /^(what|why|how|effect|tasting|level|required|optional|chinese|technical|additional|archive|think in|protection examples|general trend|definition of)/i.test(en) || seen.has(key)) continue;
          seen.add(key);
          const explanation = plainReadingText(text.slice(match.index! + match[0].length).split(/；\s*\*\*/)[0]).replace(/^[：:\s]+/, '');
          terms.push({ id: 'cms-term-' + terms.length, en, zh, aliases: [], category: 'CMS 术语对照', entityType: 'Term', definition: { en, zh: explanation || zh }, examples: [], relatedTerms: [], sources: [source], reviewedAt: '', courseSource: true });
        }
      }
    }
  }
  for (const word of readingVocabulary) {
    if (seen.has(normalizeTerm(word.en))) continue;
    terms.push({ id: 'cms-vocabulary-' + word.en, en: word.en, zh: word.zh, aliases: [], category: 'CMS 阅读词汇', entityType: 'Term', definition: { en: word.en, zh: '课程阅读译名；请结合所在段落理解其在葡萄酒语境中的含义。' }, examples: [], relatedTerms: [], sources: [{ title: word.title, url: cmsHref(word.moduleId, word.resource, word.sectionId) }], reviewedAt: '', courseSource: true });
  }
  return { terms, passages };
}
export function readingTranslation(passages: ReadingTranslation[], query: string, sectionId = '', paragraph = '') {
  const q = normalizeTerm(query);
  if (!q || q.length < 2) return undefined;
  const candidates = sectionId ? passages.filter(p => p.sectionId === sectionId) : passages;
  const exact = candidates.find(p => normalizeTerm(p.en) === q || normalizeTerm(p.zh) === q);
  if (exact) return { passage: exact, exact: true };
  // Context must be a known paragraph, not an arbitrary short-query guess.
  if (!sectionId || !paragraph) return undefined;
  const p = candidates.find(p => normalizeTerm(p.en) === normalizeTerm(paragraph) && normalizeTerm(p.en).includes(q));
  return p ? { passage: p, exact: false } : undefined;
}
