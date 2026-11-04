# Foundation checkpoint — 2026-11-04 Rhône comparison and map guide

Base: 10d540769d95edd5c812fa080236222ec98b7ccf on migration/tencent-somm100.

## Delivered increment
- Fresh branch/checkpoint/source map/France component and data/diagram renderer/CSS/Netlify guard read. No intervening branch update at start.
- Read resource matrix 40717d16de4c81c2910decdcecc94d7d and both linked candidates.
- France candidate 3fe17d16de4c81368988dbaf72730fdd is SOMM-095 WORLD wine map, 553x311; metadata does not establish a suitable France-region map. Its pixels were not inspected; not published.
- Rhône candidate 3fb17d16de4c8161b60ff956897c6334 contains advanced historical CMS notes and two attached images. Image identity/clarity/rights remain unverified; no private note text or images copied to student UI.
- Added original Rhône north/south conceptual comparison using existing Foundation France-05 summary. Clearly NOT geographic map, boundaries or relative distances.
- Added app/FoundationRhoneMapGuide.js with attributed external official Inter Rhône map (2025 edition), three location tasks, native expandable answer guide and official resource-page fallback.
- Official resource page https://www.vins-rhone.com/en/wine-school/educational-resources and PDF https://www.vins-rhone.com/sites/vignoble/files/documentation/2025-04/CARTE-VVDR-A3-2025-sans%20villes.pdf fetched through web search on 2026-11-04. PDF text contains all cities and appellations used in exercise. External link only; no map rehosted or blanket reuse licence inferred.
- Mounted existing diagram wrapper and new guide only in France review (guide only unit 05). No record schema, ID, score, instructor, image, cohort date or unrelated module changes.
- Updated provenance with inspected metadata, suitability decisions and exact limits. Six teaching diagrams total now.

## Course state
D1: 10 units / 71 checks / 30 MCQs, four diagrams.
D2: 9 units / 64 checks / 27 MCQs, one diagram.
France: 6 units / 38 checks / 18 MCQs, NEW Rhône comparison and three unscored map tasks.
D3 and D4: pre-course preview only, formal daily material pending.
D5: current cohort dates recorded; material/assessment placement pending.
Historical D6: not present in current five-day cohort source; no sixth day invented.
All actual day-content allocation remains to be verified.

## Verification / status
- node --check passed for France review, new guide and diagram renderer.
- Isolated static preview generated from the same renderer, guide function and CSS, NOT full React application. Desktop screenshot inspected; native details answer expansion verified.
- Narrow iframe 390px outer / 375px content: both comparison columns stack at equal x; document scrollWidth 375 equals clientWidth 375; screenshot inspected.
- Existing progress code/data unchanged; prior 24-test pass remains prior evidence, not rerun this round.
- Complete checkout/React/Vite dependencies not restored. No production build, full app interaction test, physical phone or mainland network QA. Official PDF web fetch does not establish student browser availability.
- Saved source/checkpoint changes; atomic GitHub commit and readback follow. Tencent deployment/live acceptance NOT verified. No newly verified live domain.
- Preserve [skip netlify] and ignore = "exit 0". No Netlify, billing, ICP/domain or paused task action.

## Next breakpoint
1. Find a genuine France overview map with verified content/use scope; world-map candidate is not a substitute. Embedded Rhône geographic map remains open despite external guide.
2. Read real wine-label sources for D1-10 before creating annotation; retain existing images/instructor text.
3. Confirm actual five-day teaching allocation; no invented D3–D6.
4. Restore full build workspace from authoritative branch, build:cloudbase, then verify deployed SHA and full Foundation UI.
5. Continue Foundation only; substantive work delivered, no dependency-only stall.

---

# Foundation checkpoint — 2026-11-04 teaching diagrams

Base: 0faa53d739ae79098fb7a12fc09ac9fd60a92dde on migration/tencent-somm100. Preserve the cohort 22 five-classroom-day correction.

## Actual increment
- Read current remote HEAD, Foundation/CloudBase checkpoints, source map, D1/D2 lesson data/components, CSS and Netlify guard; HEAD rechecked before commit.
- Added lib/foundation-diagrams.mjs and app/FoundationDiagram.js: FIVE original semantic HTML diagrams, integrated immediately after the matching review unit prose.
- D1-05 graft/rootstock functional structure; D1-06 fermentation inputs/process/concurrent outputs; D1-07 typical red/white/one rosé pathway comparison; D1-09 origin/rules/label reading framework; D2-01 variety/climate/structure/style/region learning path.
- All text adapted from existing source-mapped condensed lessons. Added teachingDiagrams provenance in data/foundation-source-map.json, retaining source verification limitations. No third-party image or private textbook reproduced.
- Explicit caveats retain process exceptions, distinction between potential/actual alcohol, varied rosé methods, and no origin/colour quality ranking. No numerical regulations or fabricated official day allocation.
- Semantic figures/lists expose all labels as selectable readable text; steps have visual connectors; graft layers show distinct roles; fermentation outputs are parallel rather than sequential. Scoped styles stack comparison columns below 700px.
- Removed remaining stale six-day wording in D1/D2 introductory copy. Existing IDs, checklist/question counts, local storage, lecturers, images and unrelated modules unchanged.

## Current course content status
| Item | Status |
| --- | --- |
| D1 | 10 reviews / 71 checks / 30 MCQs; four new diagrams; actual cohort day allocation pending |
| D2 | 9 grape reviews / 64 checks / 27 MCQs; one new learning-framework diagram; day allocation pending |
| France | 6 shared reviews / 38 checks / 18 MCQs; maps and day allocation pending |
| D3 | Pre-course preview only; formal daily material pending |
| D4 | Pre-course preview only; formal daily material pending |
| D5 | Latest cohort date exists; teaching/assessment allocation pending |
| Historical D6 | Not in current five-day source; no sixth day invented |

## Validation and delivery
- node --check: renderer, wrapper and both modified review components passed.
- Existing tests rerun in france-work: 24/24 passed (pre-course/D1/D2/France, first/latest answers, storage isolation, corrupt/future data and review completion).
- Isolated static QA uses the EXACT renderer with an HTML serializer and the same CSS, not the full React app. Preview served through supported sites-preview and inspected in cloud browser.
- Desktop viewport 1363px: all five figures present, no horizontal overflow; screenshot inspected grafting and three-column wine process.
- Narrow QA iframe: 390px outer width / 375px content width with scrollbar; all five figures present, scrollWidth equals clientWidth, no horizontal overflow; screenshot inspected readable grafting layout. This is narrow browser layout QA, NOT physical phone testing.
- Runtime wrapper/build integration not verified: complete authoritative checkout and React/Vite dependencies still absent in this focused workspace. Isolated preview and Node syntax tests are NOT a production build.
- Saved seven source/checkpoint files; atomic GitHub commit and remote readback follow checkpoint creation. Tencent deployment and online acceptance unverified; no newly verified live URL.
- Commit retains [skip netlify], unchanged netlify.toml ignore = "exit 0". No old Netlify, charges, domain/ICP or paused-task actions. Preview/QA harness is scratch-only and excluded from GitHub commit.

## Next breakpoint
1. Read resource matrix map sources for France overview and Rhône north/south; verify actual asset content and use scope. Current diagrams do not fill those geography gaps.
2. Prepare a genuine wine-label annotation using a verified permitted image; do not call origin/rules concept diagram a real label illustration.
3. Locate confirmed five-day classroom teaching allocation and retain original instructor bios/images. Historical D3–D6 remains non-authoritative.
4. Restore supported full build workspace on the latest deployment branch, run build:cloudbase, full Foundation UI/record restore checks, then verify Tencent deployment SHA and live pages.
5. Continue Foundation only; substantive increment delivered, other paused tasks remain paused.

---

# Foundation checkpoint — 2026-11-04 cohort 22 source reconciliation

Base: f0948edac9f0fac79c071a9a78145ade5c22b27e on migration/tencent-somm100. Current source corrects the historical six-day assumption.

## Actual increment
- Freshly read branch HEAD, Foundation/CloudBase checkpoints, source map, LearningApp, D1/D2 components, styles, data and Netlify guard.
- Read resource-gap matrix 40717d16de4c81c2910decdcecc94d7d. It explicitly calls for diagrams, map/media and verified playability; no candidate asset is marked delivered.
- Read complete current Library HTML SOMM100_Yichel_公众号排版_讲师介绍补全版.html, libfile_73efd088c36c819184f2422d15af1764, version 3, modified 2026-11-04T11:51:36.800823Z, has_more false. Full source has instructor bios, embedded images, cohort schedule, fees and registration information.
- Material finding: cohort 22 has FIVE classroom days in THREE stages, plus FOUR field-trip days. Do not continue presenting historical six-day framework as current timetable.
- Added data/foundation-cohort22.json and app/FoundationCohort.js, mounted in existing Foundation. Five city cards show complete years, stages and daily time; responsive grid avoids wide schedule table on phone.
- Neutralized four stale six-day labels in LearningApp. Existing D1/D2/France review IDs and progress unchanged; content allocation remains unconfirmed.
- No instructor bios, images, prices, refund terms, payment or registration links changed. Do not shorten or rewrite original instructor material when subsequently integrating it.
- Source article: https://mp.weixin.qq.com/s/ry29Vvs8tSHyR3xgekgySg . Link copied from supplied source; live accessibility not tested. Current source schedule shown with instruction to confirm near course start.

## Current content status
| Item | Status |
| --- | --- |
| D1 | 10 review units, 71 checks, 30 MCQs; actual cohort day allocation pending |
| D2 | 9 grape review units, 64 checks, 27 MCQs; actual cohort day allocation pending |
| France | 6 shared review units, 38 checks, 18 MCQs; maps and day allocation pending |
| D3 | Pre-course preview only; formal daily material pending |
| D4 | Pre-course preview only; formal daily material pending |
| D5 | Class date exists for each city; teaching materials/assessment placement pending |
| Historical D6 | Not present in current five-day cohort source; do not fabricate a sixth date |

## Validation and status
- node --check app/FoundationCohort.js passed.
- Parsed source HTML schedule rows and compared all five city ranges with JSON. All 25 dates valid, unique per city, ascending; stage lengths 2+2+1; inclusive field-trip span 4 days (2027-03-14 to 2027-03-17).
- react/typescript/vite still NOT_INSTALLED in current workspace. Production build, browser/phone rendering, source link accessibility and Tencent deployment not verified.
- This is a display/content change; no learning-record writes added. Existing 24 logic tests passed in previous commit; not represented as rerun here.
- Saved files; atomic commit/readback follow checkpoint creation. No newly verified live URL.
- Preserve [skip netlify] and netlify.toml ignore = "exit 0"; no Netlify, cloud billing, domain, ICP or other paused-task action.

## Next breakpoint
1. Prioritize original code-native diagrams for D1-05 graft/rootstock, D1-06 fermentation, D1-07 red/white/rose, D1-09 origin/rules/label, D2-01 learning framework; validate against actual current lesson content.
2. Follow resource matrix map links; verify use scope and clarity before displaying third-party images. Do not call source availability deployment.
3. Keep original instructor bios and all existing images intact. If integrating enrollment section, use source version 3 or newer; no paraphrased replacement of user-approved text.
4. Find actual five-day cohort teaching allocation; old D3–D6 frame is not authority for latest class schedule.
5. Restore supported complete build workspace; run build:cloudbase and mobile/browser QA before claiming deployment/acceptance.

---

# Foundation checkpoint — 2026-11-04 France shared review

Base: 478b1da156e846be8271750ea5763ac2adc3b3a3 on migration/tencent-somm100. Supersedes previous France-pending status below.

## Delivered code/content
- Freshly read current branch source map, LearningApp, D2 review/helper, prior Foundation and CloudBase checkpoints and Netlify guard. Branch HEAD rechecked unchanged before commit.
- Read all six canonical F01–F06 Notion pages. Their original IDs, edit timestamps and unverified metadata are recorded in foundation-source-map.json under franceReview.sources.
- Added data/foundation-france.json: 6 original condensed summaries, 38 source-derived checklist items and 18 source MCQs with answer keys. Subjects: French geography/climate overview, Bordeaux, Burgundy, Loire, Rhône and Alsace.
- Added FoundationFranceReview.js and foundation-france.mjs; integrated separate navigation and review section into existing Foundation page. Separate browser-local storage somm100.foundation.france-review.v1 preserves pre-course, D1 and D2 data.
- Existing D2 explanatory copy now points to shared France review. No fixed day assignment inferred; no classroom completion claim.
- Retained lecturers, course images, brand, existing records and unrelated modules. No private linked textbook copied. No Notion backend links inserted into student navigation.
- No map asset yet: overview explicitly says text review does not establish map-location competence.

## Six-day state
| Day | Status |
| --- | --- |
| D1 | Existing 10 review units / 71 checks / 30 questions; standalone quiz, classroom schedule and media pending |
| D2 | Existing 9 grape units / 64 checks / 27 questions; shared France now independently integrated, exact day assignment still unconfirmed |
| D3 | Pre-course preview only; formal content and timetable pending |
| D4 | Pre-course preview only; formal content and timetable pending |
| D5 | Verified timetable and materials missing |
| D6 | Verified timetable and materials missing |

## Verification
- node --test tests/*.test.mjs in france-work: 24/24 passed after correcting France storage constant references discovered by round-trip test.
- node --check for new France component and updated D2 component: passed.
- Tests cover source counts/unique IDs, sixth-unit restore, self-check + correct-answer completion, first/latest attempts, isolation from all three prior modules, malformed/future records and unavailable storage. Previous 18 tests rerun successfully.
- Source extraction validated 3 questions, 4 options and actual answer keys for each of six sources.
- Current workspace was pruned; fetched needed files from authoritative GitHub commit. react/typescript/vite resolution: NOT_INSTALLED. No complete production build, browser rendering, phone QA or Tencent deployment verification this run. Syntax/unit tests do not substitute for those.
- Saved implementation; atomic Git commit and file readback follow checkpoint preparation. Deployment and live acceptance remain unverified, no new verified URL.
- Netlify ignore = "exit 0" retained; commit message includes [skip netlify]. No old Netlify access, charges, authorization changes or domain/ICP actions.

## Next breakpoint
1. Read resource-gap matrix 40717d16de4c81c2910decdcecc94d7d. Locate usable map/media and verified original article links without pretending current text is a map.
2. Read latest course/lecturer Library source (updated HTML libfile_73efd088c36c819184f2422d15af1764 or latest DOCX libfile_ae6faf4682748191aca9747251a22b2a) before using enrollment details; preserve original instructor descriptions and existing images.
3. Locate and verify D3–D6 and actual six-day timetable. Do not invent schedules or fees.
4. Restore complete supported build workspace for this branch, run build:cloudbase and browser/mobile tests, then independently verify Tencent deployed SHA and URL.
5. Continue Foundation only; substantive progress achieved, other paused tasks remain paused.

---

# Foundation latest checkpoint — 2026-11-04, D2 grape review integration

Base: b6bbfeaa54351a8b80e5cdf35562a1429b48f91d on migration/tencent-somm100.
All seven changed files belong to one atomic commit; previous D1 checkpoint is preserved below.

## Actual increment
- Read latest branch, LearningApp, D1 component/helper, pre-course helper, source map, Foundation and CloudBase checkpoints, and Netlify guard before editing. Rechecked HEAD before commit; no concurrent branch change observed.
- Read all nine canonical D2 digest pages from the D1–D2 inventory, including actual checklists, questions and answer keys.
- data/foundation-d2.json: nine original condensed summaries (two sections per unit), 64 source checklist items and 27 source MCQs. Covers learning method, six core grapes and second-level white/red grape relationships.
- app/FoundationD2Review.js and lib/foundation-d2.mjs: integrated into existing Foundation view with direct navigation. Unit selection, checklist, first/latest attempts, feedback, retry, return-to-body and progress display.
- Separate storage key somm100.foundation.d2-review.v1. Existing pre-course/D1 records and IDs retained. This is browser-local progress, not account sync or attendance.
- France is explicitly still pending. This package does not represent a complete D2 classroom day or verified six-day timetable.
- Existing brand, lecturers, images, CMS/WSET/other modules and public article links unchanged.
- No private linked historical textbook originals reproduced; student summaries are original. Source metadata remains unverified; extraction does not replace teaching QA.

## Evidence and sources
- Nine source URLs, last-edited timestamps and metadata recorded under d2Review.sources in data/foundation-source-map.json.
- Canonical inventory: https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd
- Question/checklist extraction: nine sources, three questions with four options and a valid source answer key per source.

## Six-day status
| Day | Actual code/content status |
| --- | --- |
| D1 | Existing 10 condensed reviews, 71 checks, 30 MCQs; classroom schedule/media and standalone 25-question quiz pending |
| D2 | NEW nine grape reviews, 64 checks, 27 MCQs; six France units and exact D1/D2 placement pending |
| D3 | Pre-course preview only; formal content/timetable unconfirmed |
| D4 | Pre-course preview only; formal content/timetable unconfirmed |
| D5 | Verified timetable/materials missing |
| D6 | Verified timetable/materials missing |

## Validation and delivery limits
- node --test tests/*.test.mjs in the focused workspace: 18/18 passed (six pre-course, six D1, six D2).
- node --check app/FoundationD2Review.js: passed.
- D2 tests include ninth-unit restore, review completion requiring all checks/correct answers, first/latest retry preservation, storage isolation from both prior modules, corrupted/future records and blocked/quota storage.
- LearningApp changes limited to one component import, one navigation button and one component mount.
- react, typescript and vite resolution checks: NOT_INSTALLED in this workspace. Complete production build and mobile/browser interaction QA have NOT run; pure logic/syntax checks do not prove rendering.
- Saved code and source provenance. Commit/readback performed separately after this checkpoint is prepared.
- Tencent deployment NOT verified. No newly verified live URL. No Netlify connection/check/publish, billing, DNS, domain or ICP actions. Keep ignore = "exit 0" and [skip netlify].

## Next breakpoint
1. Read France F01–F06: 40717d16de4c812a91a9e646c9e10af3, 40717d16de4c81df9eabe257fe06ffb5, 40717d16de4c81558f88ddcb1d61593e, 40717d16de4c8178ab75e37868eb8ee3, 40717d16de4c8172833dcff7d2cd3fca, 40717d16de4c817cba87daed923a5a5d. Keep shared placement explicitly unconfirmed until evidence.
2. Read resource-gap matrix 40717d16de4c81c2910decdcecc94d7d and current Library course/lecturer document before using enrollment details. Do not invent D3–D6 or fees/dates.
3. Restore complete supported build workspace for the same GitHub branch and dependencies, run build:cloudbase, browser/mobile QA and independently verify actual Tencent deployment.
4. This run made substantive progress; continue the Foundation task only. Do not reactivate unrelated paused tasks.

---

# Foundation latest checkpoint — 2026-11-04, D1 review integration

Base: a765ffa312cf564036a96d6a831550dd71db1431 on migration/tencent-somm100.
This checkpoint and all D1 code/data ship together in one atomic commit.

## Actual changes

- Read current LearningApp, FoundationStudy, progress helper, source map, Foundation and CloudBase checkpoints, and Netlify guard. Latest branch initially remained a765ffa.
- Read all 10 canonical D1 student digest pages linked by the inventory, including checklist, extension questions and answer explanations.
- Added data/foundation-d1.json: 10 short original teaching summaries (3 sections each), 71 source-derived checklist items, 30 source-derived multiple-choice questions and answer feedback. This is condensed review, not a full textbook or classroom delivery.
- Added app/FoundationD1Review.js and lib/foundation-d1.mjs. Existing Foundation view now offers direct pre-course / D1 review navigation; review is labeled classroom follow-up, separate from pre-course.
- Reused existing option-shuffle/answer tracking functions and scoped mobile styles. Separate storage key somm100.foundation.d1-review.v1; existing weekly progress remains untouched. Unknown/future/corrupt storage is preserved and not overwritten.
- Retains first/latest answers, review counts, retry feedback and return-to-body action. No account/cloud sync, instructor reporting, calendar enrollment or attendance completion claim.
- Existing eight concept IDs, 10 public article links, pre-course 8 weeks/30 checks/31 questions, lecturers, images and unrelated course modules remain unchanged.

## Sources

All 10 source URLs and edit/verification metadata are recorded in data/foundation-source-map.json under d1Review.sources.
Canonical parent: https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd

- D1-01: 40717d16de4c81d7bbd8fba68936ecab — grape components
- D1-02: 40717d16de4c81cb9b72c529baeec3b4 — annual cycle
- D1-03: 40717d16de4c81b581a8d85b7ff77709 — maturity/environment
- D1-04: 40717d16de4c8143b199fb57a899a5f5 — vineyard choices
- D1-05: 40717d16de4c8129ae41fc99ca760455 — grafting/rootstock
- D1-06: 40717d16de4c814c93b7c56d250d1aea — fermentation
- D1-07: 40717d16de4c81a089b3d25c9e5e74a0 — skin contact
- D1-08: 40717d16de4c81bca48fff8dbdb56587 — MLF/lees/maturation
- D1-09: 40717d16de4c81a790eec02320cffcb1 — origin systems (concepts only; no numeric regulations)
- D1-10: 40717d16de4c81108c65e16da8465979 — labels

Source Notion pages have unverified metadata. Read/extraction is not final factual or teaching QA. Linked private historical materials were not copied into student content; backend Notion links are not student navigation. Condensed prose avoids absolute soil/flavor, low-yield/quality or oak/quality claims.

## Six-day status

| Day | Actual status |
| --- | --- |
| D1 | 10 review summaries + 71 checklist items + 30 extension MCQs integrated in code; classroom timetable/media and separate 25-question Course Quiz still pending |
| D2 | 9 digest and 6 shared France units identified previously; child content integration pending; France exact D1/D2 placement unconfirmed |
| D3 | Pre-course preview only; formal curriculum/timetable pending |
| D4 | Pre-course preview only; formal curriculum/timetable pending |
| D5 | Verified timetable/materials missing |
| D6 | Verified timetable/materials missing |

## Validation

- node --test tests/foundation-study.test.mjs tests/foundation-d1.test.mjs: 12/12 passed.
- node --check app/FoundationD1Review.js: passed.
- Tests cover 10/71/30 mapping and IDs, unit 10 restore, review gating, first/latest answers, dedicated storage key with pre-course data untouched, invalid record and quota failures, plus all 6 pre-course regression tests.
- Source parsing validated 3 questions / 4 options per D1 page and 30 actual source answer keys.
- LearningApp diff restricted to new component import, two navigation buttons and D1 component mount. Netlify guard remains ignore = "exit 0"; commit contains [skip netlify].
- Full checkout/dependencies remain unavailable after workspace cleanup. Current resolution checks: typescript, react and vite not installed. Full build:cloudbase, mobile/browser rendering, storage UI refresh/focus/scroll and Tencent deployment NOT verified. Node syntax and pure logic tests are not production build evidence.
- No domain, DNS, ICP, billing, Netlify or Tencent configuration actions this run.

## Next breakpoint

1. Read D2-01 through D2-09 and shared France F-01 through F-06 child pages from canonical inventory; import a coherent D2 review package separately.
2. Read resource-gap matrix 40717d16de4c81c2910decdcecc94d7d. Import verified images/videos and grape original links without removing existing course images.
3. Read Library latest course/lecturer document before introducing any enrollment facts. Do not invent D3–D6 timetable, fees or dates.
4. Obtain complete supported build workspace, run build:cloudbase and browser/mobile QA; then verify actual Tencent deployment independently. Do not call this commit live.

