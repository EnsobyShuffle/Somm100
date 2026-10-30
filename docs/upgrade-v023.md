# SOMM100 v0.2.3 · 2026-10-25

User corrections supersede v0.2.2 working brand/News separation. App brand is SOMM100. Navigation: Discover (Wine News), SOMM100 course, CMS, Tasting Notes, Wine Quiz, Wine Maps, Wine Channel, English Study. News is part of Wine Channel and surfaced on Discover. Headlines use direct module names. Current public no-login audience, original records and D1 authorization remain unchanged.

## Shipped behavior

- CMS has Introductory / Certified, Advanced and Master entrances. Intro and CS remain stable question data labels but share a UI pool of 80. AS 8 and MS 8 unchanged. Four-stage curriculum remains intact.
- QuizStudy supports one-card-at-a-time and paginated tap-to-reveal list, random rounds, topic, country/region, question type, due, review, bookmark and Dismissed filters. MS enforces short answer. Current geography maps Alsace questions to France; other questions are general. Argentina, Chile, Champagne and staged South America content are not falsely listed as available banks.
- Got it = self-rating 2, Review again = 0, using existing scheduling. Dismiss now follows latest learner wording: reversible per-browser exclusion, no shared question deletion. Older permanent editorial Dismiss notes describe a distinct, unimplemented editor feature. Dismissed state migrates old browser stores lazily and preserves records. Restore available. No backend schema change.
- Journal: two centered Open/Blind buttons replace Add→mode modal. Open retains photo, type and details. Overall Note generates a deterministic editable draft from entered fields, without inventing attributes. Saved as fields.overallNote with existing IndexedDB/export format. Original Library HTML unchanged.
- English Study: independent pilot with 3 authored service/tasting expression exercises, answer drafting, revealable examples, vocabulary, self-checks and local save. Optional browser en-GB TTS; no claimed pronunciation assessment or recording.

## Research delivered

`data/video-library.json`: 25 distinct Bilibili video links (original 8 + 17). Metadata/search-index verified, playback and full content review not performed. Nora profile and 2 videos identified; Miki and Somehouse identities pending, no substitutes. Self-owned vs external classification supports manually saved links; no unverified Somehouse video seeded. Adelaide collection is third-party uploaded, not an official university account.

`data/news-sources.json`: 50 distinct candidate source platforms plus 4 dated reading links. International editorial, country/region official, and educational sources distinguished. Wine Folly is educational rather than a pure news feed. Each retains evidence URL, date and review/access status. No article/image replication or automatic collection; sources not yet selected by Henry. Discover contains manual current-reading cards and searchable source directory. Wine Channel has Videos / Wine News tabs.

`docs/wine-maps-proposal.md`: sourced map library → verified geographic layers/knowledge cards → map exercises, with Alsace, Champagne and Burgundy prioritized. Current two-region orientation implementation is preserved, not advertised as complete maps.

## Validation and boundaries

TypeScript and three suites cover grading, review, video URLs, study settings and browser persistence. Added tests cover combined 80-question Intro/CS pool, MS short-only, legacy Dismiss migration/idempotence/exclusion/restore and independent browser data. Dataset tests updated to 25 unique video URLs.

Preview browser: CMS combined entrances; MS France filter yields two existing Alsace questions; reveal → Dismiss reduces pool and Restore works; Open Tasting directly opens fields; Overall generate and save; English response saving and example reveal; Nora search yields two videos; Wine Channel news search Argentina yields official source. Screenshot saved with source. Browser TTS audio, photo upload, actual video playback, JSON migration across origins, mainland network and phone hardware remain unverified.
