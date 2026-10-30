# Implementation and next architecture boundary

## Product flow

SOMM100 home → courses → independent CMS Program → KNOW / UNDERSTAND / RECALL / FINAL CHECK. Stage 1 → Core Text Reading / Knowledge Expansion → reveal-first practice → self-review → saved progress and scheduled review. Standalone quick challenges, videos and learning habits are also accessible directly.

Home, Courses, Challenge, Videos and My Learning are the primary mobile tabs. Tasting, Service, Foundation, Content Studio and Sources remain directly reachable through the menu. Failed saves display an error; success is shown only after a server response.

## Current architecture

React/Vinext responsive client → same-origin JSON API → private Sites identity + D1 SQL. Content is versioned structured JSON, independent of presentation, and is served at `GET /api/curriculum`. A future website/native client can consume the same contract after an appropriate authentication layer is established.

| Entity | Current implementation | Next extension |
|---|---|---|
| User | D1 `users`, server identity, name, role field | Independent student identity, enrollment and tested account lifecycle |
| Course/module | `data/curriculum.json`: stable course/module IDs, title, version and review state | Multi-course catalog and enrollment |
| Learning unit | Stable KB IDs, bilingual title, body, category, sources, linked outcomes | Versioned content records and ordered module relationships |
| Knowledge | `knowledge-network.json`: named nodes, links, source URLs and core-reading/media mappings | Typed edges, geography, producer/wine nodes, editorial UI |
| Question | Stable IDs, type, options/reference answer, stage, country, module, unit and provenance | Structured image/map/matching item types and reviewed exam-stage tags |
| Attempt | D1 `attempts`, user/question ID, submitted answer, score, method and timestamp | Pagination and content-version snapshots |
| Progress | D1 `progress`, composite user/unit key and completion time | Reading position, multi-module progress and detailed history |
| Review | D1 `reviews`, streak, due time and latest mastery flag | Tunable scheduling with teacher-visible evidence |
| Bookmark | D1 `bookmarks`, composite user/question key | Knowledge/media bookmarks |
| Training | D1 `training`, kind and versioned JSON payload | Recording, teacher review and Journal integration contract |
| Media | Files in `public/media`, provenance in JSON | Object storage, rights status, captions, resolution and video metadata |
| Editorial draft | D1 `drafts`, author ID, title, body and update time | Teacher/editor/admin authorization, revision/review/publication states |

## API

`GET /api/learning` returns the current user's completed units, recent attempts, reviews, bookmarks, training and drafts. Attempts currently return the most recent 1,000; training returns the most recent 100. These limits must become pagination before larger cohorts/long-term analytics. Current dashboard statistics describe the returned records.

`POST /api/learning` accepts validated actions: `complete`, `bookmark`, `answer`, `training`, `draft`. MCQ scores are computed from server curriculum; client-provided scores are never trusted. Short-answer scores require an explicit self-rating and are stored as `self-assessed`. Attempt request IDs support retry without normal duplicate inserts. Draft updates verify ownership. Attempt + review writes are batched.

The private hosting boundary supplies `oai-authenticated-user-id`; production has no anonymous fallback. The development preview identity only exists behind `import.meta.env.DEV`. This assumption must be replaced/revalidated if moving hosting. The endpoint checks Origin for mutations, restricts IDs and field sizes, scopes data to the server user and uses `Cache-Control: no-store`. No user-selectable account ID is accepted. A role column alone is not a permission system; multi-user publishing is intentionally not exposed.

`GET /api/curriculum` returns schema version 2, course, lessons, questions, checklist, knowledge network, editorial notes, media provenance, learning stages and video metadata. The private Site access layer gates this read. Practice reference answers are available to learners by design; this is not a secure proctored examination platform.

## Platform sequence

1. Validate this Web/PWA learning flow and academic content on actual phones.
2. Establish production hosting/authentication/media delivery appropriate to Chinese users, shared versioned APIs and teacher permissions. Link SOMM100 Website to the same catalog; preserve `somm100.cn` until domain work is explicitly undertaken.
3. Develop iOS with native learning/offline/recording value using shared APIs; selected reading can use WKWebView. Assess HarmonyOS ArkTS/ArkUI with ArkWeb for reading and native training components. A Web build is not a native package.
4. Integrate tasting-session IDs and agreed observation fields with Wine Tasting Journal, rather than duplicate that product.

These are engineering recommendations supported by the official sources in `platform-research.md`, not tested native deliverables.

## Next concrete backlog

- Teacher review Module 01 explanations, 16 adapted MCQs and original reference answers; preserve original IDs and source versions.
- Read blocked WPS/Youdao originals through a usable authorized connector/export; reconcile discrepancies with Notion instead of overwriting it.
- Turn the existing Alsace course into the second complete module, with verified map/media rights and exercises.
- Add course-level selection, typed knowledge links and database-backed published content. Current single-module UI needs generalization once the second course is reviewed.
- Add map/image/matching questions and complete service scenarios with meaningful scoring rubrics.
- Establish independent student accounts, teacher/admin permissions, publication workflow, pagination, audit logging and backups before cohort rollout.
- Test mainland access, Safari and HarmonyOS browser/PWA behavior, weak networks and accessibility on real devices.

## v0.2 learning habits and media

`GET /api/habits` returns the current account's settings, study totals by date, check-ins, streak and saved video links. `POST /api/habits` accepts validated settings, absolute study-session duration, eligible daily check-in, add-link and remove-own-link actions. `GET /api/habits?calendar=1` returns an attachment containing a recurring iCalendar event generated from saved preferences, using Asia/Shanghai and folded UTF-8 lines.

| Table | Identity / behavior |
|---|---|
| learning_settings | User primary key; validated JSON preferences |
| study_sessions | Session primary key, owner and China calendar date; absolute seconds updated with MAX to make retries idempotent |
| checkins | Composite user/date key; eligible learning or at least 60 seconds focus required |
| learning_videos | User-owned metadata and original HTTPS link; no downloaded media |

Migration 0001 adds these tables and preserves migration 0000 and existing records. Calendar exports do not create an OS subscription; the user must import the event and manage it in their calendar. Turning off the in-app reminder cannot delete a calendar event. External videos cannot be monitored for viewing time. Session timing is approximate foreground elapsed seconds with minute/pause saves; abrupt process termination can lose the final unsaved interval. It is not an attendance proctoring system. Totals currently read all per-user study days/check-ins; pagination/retention is part of cohort-scale work.
