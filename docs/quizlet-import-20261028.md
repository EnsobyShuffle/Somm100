# Quizlet import — 28 October 2026

The existing SOMM100 Wine Quiz now includes the 21 requested Quizlet sets: 10 direct links and 11 additional sets from the supplied search page 6. The 16,456 source cards were merged within each level into 9,192 entries (CS 4,814; AS 1,772; MS 2,606). Five cross-level duplicates remain in their respective levels. All 282 existing questions, their IDs and content are unchanged; the combined bank has 9,474 entries.

Introductory / Level 1 material remains identified as foundation material within CS. Two sets with no explicit level retain an inferred-CS note. Generic sets are kept under a mixed topic instead of guessing geography from isolated words. The Bordeaux, New Zealand and Portugal specialist sets retain their declared geography.

## Data and provenance

- `data/curriculum.json`: incremental question records; deterministic `QL-<level>-<content hash>` IDs. Reimporting the same archive adds no duplicates.
- `data/quizlet-sources.json`: all 21 source URLs, titles, creators, listed/extracted counts and classification notes.
- `data/quizlet-import-20261028.json`: review-entry-to-App-ID mappings, aggregate counts, and hashes of all 282 pre-existing question objects.
- `public/media/quizlet-20261028/`: 41 image files used by 43 cards. Prompt and answer image placement is taken from the original card sides; answer images are revealed with the answer.
- `scripts/import-quizlet-20261028.py`: import from the extracted `Quizlet_Sommelier_CS_AS_MS_20261028` archive directory. The source archive is preserved separately with the original ordered TXT/JSON sets.

No translations, invented answers or wine-fact corrections were added. The 35 unique single-sided entries and one literal `#NAME?` source answer remain searchable under “答案待整理”. They can be bookmarked or dismissed, but cannot record a mastery self-assessment until an answer is available. Seven image-only answers remain valid self-assessment cards.

## Learning behavior

Wine Quiz adds source-set selection, content-status filtering, keyword search and expandable provenance. Existing level, random round, card/list, bookmark, Dismiss/restore and review behavior is reused. The existing browser storage key, old IDs and D1 schema are unchanged. This release does not add cross-device synchronization.

## Validation

The production build passed. TypeScript and `quizlet-import`, `learning`, `testing-store` and `habits` tests passed. The import test verifies all legacy hashes, unique IDs, all 16,456 source references, every image file, per-level/per-source filters, incomplete-answer handling, image-only answers and old/new learning records in the same state. Managed preview reported running but the browser received `ERR_CONNECTION_REFUSED`. After publication, the production browser verified 9,474 total entries, the 2,606-entry imported MS filter, source/keyword selection, and an image-only answer remaining hidden until reveal and loading at its original 500-pixel width. A recovery metadata error for set 249811021 was corrected to the originally verified creator, davishrlw.
