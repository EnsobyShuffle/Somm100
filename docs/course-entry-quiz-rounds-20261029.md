# Course entry and SOMM100 round format · 2026-10-29

Base: published v50, source 0a5de1105486419e1037ccadf2d95ff27b005065.

Mobile Courses now always opens the four-way chooser: SOMM100, IS/CS, AS and MS. SOMM100 leads to its existing Foundation page. The CMS choices have level-specific learning home pages: IC core reading, AS existing expansion reading, MS topic practice and clearly labelled core-reading reference. No new syllabus or course content is invented. Chosen CMS level is encoded in the URL, forwarded through chapter navigation and used by the practice entry. Courses stays highlighted on course pages and returns to the chooser even after a level is selected.

Challenge cards no longer show the technical question ID/level header. Original source/set/card references remain available in details. Round sizes are exactly 10, 20, 30, 50 and 100.

The user's latest instruction explicitly requests mostly multiple choice with 30% short answer for SOMM100. This change adds a separate presentation layer for 32 of the 46 existing Henritage D1 questions; 14 remain short answer. It does not restore the retired AI-written questions, create new question IDs, replace original question text/answers, or rewrite source hashes. The new distractor options are presentation additions, not copied Quizlet original options. Correct choices map to the original source answer. The source answers remain unverified; this is a format change, not an academic review. A source hash/answer change invalidates the associated choice presentation instead of silently using stale grading.

SOMM100 mixed rounds aim for 70% multiple choice and 30% short answer: 10=7+3, 20=14+6, 30=21+9. Rounds never duplicate an ID. Requested sizes 50 and 100 currently include all 46 eligible questions (32+14) and display the actual total. Topic/source/bookmark filters and an explicit single-type filter are respected; any shortage uses available matching questions and displays actual composition.

Automatic scoring uses the same presentation data in guest and account handlers. Existing attempts, bookmarks and review IDs remain valid. CMS questions, English AS/MS rules, source bank and images are unchanged.

Validation: TypeScript; existing CMS route/content, source-policy, guest records, grading, account isolation and source-hash/import regression checks; mixed-round tests for ratio, capping, uniqueness, filtered pools and original immutability. Browser QA at 390×844 through a temporary local iframe checks the actual responsive app, Courses chooser, AS learning entry, return to Courses, hidden IDs, all five sizes, 20=14+6 and automatic scoring. The QA harness is removed before packaging.
