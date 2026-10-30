# CMS Module 01 / Module 02 integration

SOMM100 Foundation and CMS are separate courses. The active-navigation bug included `foundation` in the CMS group, causing both sidebar items to be selected. `activeNavigation` now resolves one course independently. Historical CMS reading links continue to resolve into the new module views.

## Sources actually read

The two active Notion module entries, their ten formal child pages, the four-stage Chapter Action Plan, the earlier study plan, and the more detailed Round 1 Calendar Draft 5 were retrieved. No Notion source was edited or deleted. The source page URLs, last-edited metadata and content hashes are stored in `data/cms-learning.json`.

- Module 01: https://app.notion.com/p/3f817d16de4c812b827edbfee9600691
- Module 02: https://app.notion.com/p/3fe17d16de4c818e9ffdc3c92823a19b
- Four stages: https://app.notion.com/p/3fa17d16de4c8120afe1c96ccaf3c195
- Draft 5: https://app.notion.com/p/3f917d16de4c8157a732d36ae20e263a

The formal pages contain user-uploaded textbook extracts and translations, terms, editorial explanations and corrections. The import preserves their order and wording. It does not replace the book with summaries. Original images were downloaded from 40 stable Notion image references; original credits and source links remain. `data/cms-media.json` records each local asset's provenance. Images from external references in the expansion text remain external where no matching recovered asset exists.

## Coverage

| Material | Module 01 | Module 02 |
| --- | --- | --- |
| Core reading sections | 16 | 20 |
| Knowledge breakdown units | 10 | 9 |
| Original checklist outcomes | 28 | 28 |
| Original short questions | 64 | 36 |
| Existing additional exercises | 25 | 7 |
| Chapter practice pool | 89 | 43 |

Module 01 additionally includes all 16 deeper-expansion groups and their source links. Introduction, glossary, editorial-correction and after-reading sections are present but not counted as core reading completions. Guide and checklist/question-bank study instructions are retained.

Stage 1 starts with Core Text Reading and Knowledge Expansion as requested, with the syllabus guide, checklist and chapter question bank alongside. Stage 2 uses the existing explanations and application questions; Stage 3 uses the shared flashcard/list study engine; Stage 4 combines the chapter checklist and incorrectly recalled questions. This does not claim new teacher PPTs or complete AS/MS courses.

## Record compatibility

Original Module 01 KB, KP and Q IDs are retained. Alsace uses `M2-` identifiers so similarly numbered outcomes and questions do not collide. All 96 existing practice IDs remain. The 36 original Alsace questions bring the total to 132. Existing local records are kept; new `readings` and `checks` arrays migrate lazily. Answers feed the existing error and spaced-review system. No login was introduced.

The existing quiz used `crypto.randomUUID()` unconditionally; it failed on the HTTP preview. It now uses the same fallback approach as other local learning features. Alsace service exercises retain their regional context in filters.

## Remaining source qualifications

- Current Youdao and WPS original documents were not directly re-read this turn. Accessible formal Notion materials are the merged content, not proof of a full synchronization of those services.
- Teacher sign-off, OCR/translation review and full legal-fact review remain pending, as in the original pages.
- Alsace source numbering skips 02 and 16. All available sections were imported; no missing original prose was invented. Chapter reading materials give pp.80–84, while the older calendar gives pp.80–83; the module uses the formal reading page range and the calendar remains identifiable as Draft 5.
- Study dates and the June 2027 exam window are provisional. The older plan is not silently treated as the current timetable.
- An official CIVA page was independently read to cross-check the existing 1962 AOC correction: https://www.vinsalsace.com/en/gouts-et-couleurs/aoc/aoc-alsace/ . The Grand Cru page timed out; this is not a full fresh verification of every external resource.

## Validation

Navigation and content-link regression tests cover course separation, module deep links, preserved IDs, 36 imported Alsace questions, source-pack coverage and local image references. Storage tests cover lazy migration, duplicate reading prevention, checklist isolation, validation and Alsace error scheduling. TypeScript and production build checks are part of packaging.

Browser QA covers independent SOMM100/CMS navigation, reading completion, persisted checklist state after refresh, answer reveal, self-assessment, error filtering and Stage 4 remediation. A 390px viewport has a 375px content area with no horizontal overflow; the mobile contents selector and recovered Alsace image load successfully. This is viewport QA, not native device testing.
