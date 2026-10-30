# SOMM100 customer accounts · 2026-10-29

Based on production source v47 (8f61d2d81297653b7e6bcbbe014e7546cd1a4e29).

The public App now offers a registration/login entry and an account page. Identity uses the existing Sites-hosted ChatGPT authentication routes. First-time authenticated customers set a SOMM100 display name. Existing users retain their stable Sites user ID, role, creation date and all prior learning records. Updating a name never modifies roles or ownership. Standalone password, email-code and phone-code login are not implemented.

Guest study remains available using the existing browser store. A registered session reads/writes existing D1 learning and habit endpoints. No automatic guest import occurs. Failures in session lookup or authenticated saving never silently fall back to the guest store. Focus timer drafts use separate account-scoped browser keys. Sign-out uses the platform route with top-level navigation.

A single additive migration, 0002_secret_the_hood, adds learning_items for section reading, checklist, personal dismiss and chapter-plan/reminder state. Existing tables, questions, source IDs, media and records are untouched. Learning/history, bookmarks, review scheduling, training, teaching drafts, settings, focus time, check-ins and video bookmarks persist per account. Independent Wine Tasting Journal, English exercises and study notes remain local; the account screen states this limit.

Wine Quiz combines Random, SOMM100, Introductory/Certified, Advanced and Master in one row. Country/region is one grouped selector; keyword search joins topic/type in the main filter row. Round size sits beside the random-round button. Source/quality filters remain in a disclosure. The top Aa trigger is removed while existing selection/dictionary interactions remain.

Validation: TypeScript; account API integration against in-memory SQLite using all committed migrations; client failure isolation; existing guest store, grading, habits, chapter-plan and Quizlet import regression tests. Covered anonymous 401s, same-origin validation, profile input, identity/role preservation, cross-user attempts/drafts/focus collisions, duplicate submission, separate bookmarks/dismiss, reading eligibility for check-in, and no guest fallback on network/auth failure. The existing 282 questions plus 9,192 imported entries (9,474 total), 16,456 source mappings and 41 imported images pass the unchanged import test.

Managed preview initially failed because a clean checkout lacked its execution profile. The supported configuration helper selected managed-linux and the preview was restarted. Browser navigation still timed out while initial compilation was running. Real hosted sign-in and multi-device synchronization require verification against the deployed site; local tests simulate platform-provided identity headers and do not validate the external identity provider.
