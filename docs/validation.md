# v0.1 validation

Validated in the managed development preview; test records are separate from production data.

## Observed browser flows

- Home and theory render with actual teaching images and content.
- Complete KB01 → navigate/refresh → 1 of 10 units, 10% progress retained.
- Incorrect MCQ01 → 0/1 automatic result, unmastered list and next-day review record.
- Favorite MCQ01 → refresh → favorite retained.
- Q01 written answer → reveal reference → explicit 2/2 self-assessment → next question. Progress shows one automatic result and one self-assessment separately.
- Content studio draft → save → appears in saved drafts. Server returns the draft ID for subsequent edits.
- Service response + two checks → save → training history count becomes 1.
- Responsive 390×844 iframe inspection → mobile navigation and readable hero. This is layout inspection, not a real-device test.

## Bugs fixed during verification

- HTTP development preview lacked `crypto.randomUUID`; a non-security request ID fallback now keeps quiz start working there.
- Q33's extracted answer had been joined to its prompt; split at the original answer marker and retain the source ID.
- Corresponding exercises now include short questions, avoiding an empty exercise list for units without an MCQ.
- Saved drafts retain their ID, so repeated saves edit that draft.
- Lesson hashes carry the selected unit for reloadable reading links.
- Mobile hero typography and width revised after screenshot inspection.

## Automated checks

`tests/learning.test.mjs` checks valid/invalid automatic answers, explicit short-answer self-rating, review reset/growth, unique question IDs, linked lessons/questions, source URLs, nonempty content and checklist IDs. TypeScript and production build are required before publication.

## Not yet verified

Actual iPhone/HarmonyOS devices, native binaries, mainland reachability, cross-account/cross-device operation, production end-user writes, long-duration timer behavior, full offline learning, load testing and teacher publication authorization. These are not implied by a successful build or responsive screenshot.

# v0.2 validation

Observed in the managed development preview, using disposable local preview records:

- SOMM100 homepage contains brand, daily focus and independent discovery entries. Courses opens a separate CMS Program.
- All four source-defined learning stages render. Stage 1 Core Text / Knowledge Expansion switch to actual retained content, with separate reveal-answer cards.
- Answer cards initially hide answers; reveal and 1/2 self-assessment save to learning history and unmastered/review records.
- MS + Alsace filtering yields two actual questions. A mental/oral response can reveal the rubric without typed text, then explicitly save a self-rating.
- Focus session paused at 107 seconds, saved as 1 minute 47 seconds. Check-in persisted on reload and streak became 1.
- Settings goal 30 minutes, default AS and enabled reminder at 21:45 survived reload.
- A genuine Bilibili link saved with a QA label and appeared after reload. The QA record exists only in preview data.
- 390 × 844 iframe inspected visually, with working mobile Courses → CMS navigation. Desktop and mobile screenshots are included in this directory. This is responsive inspection, not real-device testing.
- TypeScript, learning tests and habits tests passed after changes. Calendar generation checks next eligible day, timezone, duration, weekly recurrence, alarm and 75-octet UTF-8 line folding.

Issues fixed: time-input event persistence; unsaved preferences resetting during a focus autosave; concurrent focus-save handling; China-midnight session rollover; strict self-rating validation; source-status notes; refreshed v0.2 links/export contract. Calendar export uses a server attachment from the saved settings.

Verification limits: browser download observation timed out for both client and server calendar exports, so successful calendar download/import is not claimed. The generated file format passed checks, but phone download, calendar import and actual alarm delivery need real-device acceptance. Bilibili metadata/URLs are verified; playback and full-video pedagogical review are not. Production user writes, iOS/HarmonyOS devices, mainland access and long-running/multiple-tab timing are still unverified.

## v0.2.1 login-free testing

All UI learning/habit reads and writes now use a dedicated browser-local store; the original authenticated APIs and D1 records are unchanged. UI tests: enter CMS, reveal answer, save 2/2 self-assessment, check in, reload, verify check-in remains and progress shows one answer. Independent stores, replayed submissions, storage quota failure and existing grading/review tests pass. Shared URL access is controlled by the Site public policy; this exposes teaching content but not users' cloud records. Real-device storage durability remains dependent on browser settings.
