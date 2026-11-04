# Foundation progress — 2026-11-04, weekly path and readiness increment

Base commit: 588aa9cb2d4da04d8493dc619437e7b99e734384 on migration/tencent-somm100. This checkpoint ships in the same atomic commit as the implementation.

## This increment

- Read current app/LearningApp.tsx, foundation-source-map.json, prior FOUNDATION_PROGRESS.md, CLOUDBASE_MIGRATION.md and netlify.toml before editing. No concurrent changes observed at initial read.
- Replaced the incorrect week mapping with the actual 8-week pre-course path. Week 6 = six core grapes; week 7 = France and labels; week 8 = first D3/D4 preview. Four-week mode pairs weeks 1–2, 3–4, 5–6, 7–8.
- Added app/FoundationStudy.js, scoped mobile styles, data/foundation-study.json and lib/foundation-study.mjs. The existing Foundation route imports the component; all eight foundation-0 through foundation-7 concept IDs and ten article links remain.
- Added 8 short original knowledge summaries, 30 source-derived self-check items, and all 31 existing readiness questions with the source answer key. No new official day assignments or exam pass line.
- Corrected previous open-ended reflection prompts: removed them from the Foundation student UI in accordance with the source's choice-only rule.
- Added why-read guidance to all 10 existing original WeChat links. No private Notion student entrance.
- Student selects pace and current week; only the selected one/two source-week units display. Self-check and first/latest question answers use the separate localStorage key somm100.foundation.study.v1. No existing learning keys or user records touched. No cloud/account/instructor sync.
- Wrong answers show the correct concept and a return-to-week-summary button; retry preserves the first answer. An incomplete question group cannot show ready. Display choices are deterministically shuffled while source answer indexes stay stable.
- Read/parse failure or unsupported stored version preserves the old raw record and disables writes. Quota/write failure is surfaced in the UI. Browser execution of these cases remains pending.

## Source evidence read directly this run

1. Pre-course path: https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746
   - eight weekly goals, 30 checklist entries, pace pairing, choice-only rule.
2. D1–D2 inventory: https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd
   - confirms a 10-D1 / 9-D2 / 6-France digest inventory and existing quizzes; child digest contents not imported this run.
   - France is shared D1–D2 material; exact day placement explicitly remains unconfirmed.
3. Readiness V0.1: https://app.notion.com/p/40717d16de4c81a4bd1df5ceede99a46
   - actual 31 prompts, 124 options, 31 answer-key mappings and eight-week question distribution read and extracted.
4. Existing framework and guided-source links remain in data/foundation-source-map.json. Updated map schema 2 distinguishes source weeks from eight concept node indexes. Source pages have Notion unverified metadata; extraction does not equal final teaching/fact QA.

## Six formal days

| Day | Verified material | Remaining |
| --- | --- | --- |
| D1 | Knowledge inventory read: 10 digests identified | Child texts/media/quiz import and current timetable |
| D2 | Inventory read: 9 digests and 6 shared France units identified | Child texts/media/quiz import; France exact day placement |
| D3 | First-preview topics only, per pre-course path | Current day timetable and full lessons |
| D4 | First-preview topics only, per pre-course path | Current day timetable and full lessons |
| D5 | No new verified material | Current timetable and lesson sources |
| D6 | No new verified material | Current timetable and lesson sources |

## Validation and delivery boundary

- node --test tests/foundation-study.test.mjs: 6 passed, 0 failed. Covers source data structure, first/latest answer preservation, incomplete/wrong readiness state, JSON round trip, corrupt-record filtering, stable option permutations.
- node --check app/FoundationStudy.js: passed.
- Source extraction checks: 8 weeks, 30 checklist IDs, 31 questions with 4 options each, all answer keys parsed. Existing eight concept IDs and ten original reading URLs retained. Surrounding LearningApp source unchanged except the new component import and Foundation block.
- Full repository dependencies are unavailable in this scratch workspace; no installed TSX compiler was found. Full build:cloudbase, browser/mobile render, refresh/scroll/storage-failure interaction QA and external article accessibility remain NOT VERIFIED. Plain JS syntax and pure state tests are not a production build.
- No Tencent deployment or current public-page verification performed. GitHub commit is not evidence of a deployed/accepted update.
- No Netlify access or release. Keep [skip netlify] on this commit and netlify.toml ignore = "exit 0".
- No fees, dates, refunds, registration links, lecturers or existing images changed. No other paused course task resumed.

## Next breakpoint

1. Obtain a complete supported checkout of the SAME authoritative branch and its dependencies; run build:cloudbase and mobile/browser interactions (pace switch, select, retry, refresh, unavailable storage).
2. Read canonical D1 child digests linked by the inventory, then D2 and France. Import reviewed short student summaries/learning loops, not historical private textbook originals. Keep these formal/bridge materials distinct from pre-course.
3. Read resource gap matrix 40717d16de4c81c2910decdcecc94d7d and restore six grape original article links. France/world map assets still missing; do not claim map-learning complete.
4. Read current Library course/lecturer documents before introducing course registration data; preserve lecturers and images. Six-day timetable remains a dependency.
5. Verify actual Tencent build commit and tested URL independently. No domain/ICP status change inferred in this content task.

Previous implementation a49b0dc added introductory concepts. This increment supersedes its incorrect week schedule and reflection-only checks, without claiming complete six-day teaching content.
