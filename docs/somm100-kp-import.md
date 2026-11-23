# SOMM100 Course｜Knowledge Breakdown import

This integration extends the **existing** SOMM100 Foundation/Course UI. It does **not** create a second course, touch CMS Certified data, or change CloudBase hosting routes.

## Verified sources

- Sole Notion database: SOMM100 Course｜Knowledge Points · Breakdown · Extension.
- Private Course Import Staging (2026-11-24): 17 student-text shards containing **176 extracted candidate explanations**, plus two Extension candidate inventories.
- Source days: D1 (54), D2 (55), France shared (17), D3 (22), D4 (28).
- Another 17 metadata-labelled candidates did not pass the explicit student-section extraction and remain in Notion for review.
- These are **unreviewed** teaching drafts, not 176 approved lessons.

## Safe integration

1. The existing app/FoundationPage.tsx mounts FoundationKnowledgeBreakdown.
2. The reader fetches ./course-content/somm100-student.json. If the file is absent or not a validated approved package, the existing website continues unaffected.
3. Build tooling reads private Notion export shards from the untracked /private-course-import/ directory and validates provenance, duplicate IDs and student-content boundaries.
4. The production compiler only emits entries with public_ready: true, teacher_review: 已审核 (or approved), and rights_cleared: true. Old research paragraphs and unapproved media are withheld.
5. Generated student JSON is gitignored. **Do not add course text or exported JSON to this public repository.**

Example, for a local **non-public preview** after the Notion export shards have been made available to the build machine:

    node scripts/prepare-somm100-kp.mjs --mode private-preview

The output is a private local preview manifest and never enters static hosting.

After individual teacher approvals and media/rights checks, produce a public course-data file in the approved, authenticated release environment:

    node scripts/prepare-somm100-kp.mjs --mode production

Then build the existing CloudBase static application using its already configured build command. Confirm the actual connected CloudBase source revision, deployment root and output before publishing. No script here performs a CloudBase deployment or configures a credential.

## Current release boundary

- The source GitHub repository is public. The Notion exports are not.
- The latest independently verified CloudBase app in the prior handover (somm100-004, 2026-11-16) deployed at /, while an old cloudbaserc.json says /somm100. Do not reuse the old path or old full-site ZIP blindly.
- The active production bundle may include changes not reflected in the GitHub migration branch. Compare it before any production merge/deploy.
- The work in this branch is course-import code, not a claim that 176 draft lessons are live on www.somm100.cn.
- D5/D6 are intentionally omitted pending verified contemporary course syllabus/PPT; CMS/MS material remains separate.

## QA

Run the dependency-free contract tests:

    node --test tests/somm100-course-import.test.mjs

The tests verify that unreviewed lessons, high-level research, duplicated KP IDs, and executable markup cannot enter a published student package.

The 21-day bridge, existing D1–D4 quizzes and other Foundation components are unchanged.
