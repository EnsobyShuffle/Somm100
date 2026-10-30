# English Study — v0.3

Updated 2026-10-25. Extends the existing SOMM100 Site in place; other modules and the public audience are preserved.

## Delivered

- Five internal learning tracks (not CEFR certifications): zero foundation, everyday/travel, restaurant, sommelier, professional communication.
- 24 original three-turn guided scenarios. User answers, completion self-assessment and optional oral-practice acknowledgment persist locally.
- Six pronunciation lessons: alphabet vs sounds, IPA and stress, vowels, consonants, word endings/numbers, connected speech. Forty-four conventional British teaching phonemes with original example-word choices; device TTS reads words, not isolated phonemes. British Council external reference for individual-sound recordings.
- 51 original vocabulary entries including manage to, accomplish, execution and carry out; contextual cards, meaning selection, dictation and cloze, favourites, daily new-word goals and self-rated review scheduling.
- Review schedule: again = 10 minutes; hard = 1 day; good progresses 1/3/7/14/30 days. This is a simple transparent schedule, not a validated adaptive model.
- Browser recording and playback: local object URLs only, maximum 60 seconds, tracks closed on stop/unmount. Browser speech recognition is optional and clearly separated from local recording. Device/browser availability varies.
- Existing `somm100-english-v1` data is preserved; written responses migrate to matching first-turn answer fields, and original records remain in the v2 export. Progress remains browser-local, exportable JSON.
- Existing focus timer and reminder settings linked from English Study.

## AI integration and remaining activation

The UI checks `/api/english/chat`. A real server-side Responses API integration is present, but is deliberately unavailable until both `OPENAI_API_KEY` and `OPENAI_ENGLISH_MODEL` are configured in Sites runtime secrets/settings. No API credential was present and no real model response has been tested. No simulated or fixed response is presented as AI.

The OpenAI Developers plugin has been offered to the owner; installation and API project/key approval must be completed before secret configuration. Use the plugin's API-key workflow; never place a key in the browser or repository. Select and verify an available model as part of activation, set the two runtime values, and deploy this source version again.

When activated, the endpoint requires Sites-authenticated identity and same-origin requests, validates bounded role/content input, limits context to 24 messages and 14,000 text characters, and uses server-side scenario prompts. Per-user daily cap = 40 requests; site cap = 200 requests, UTC reset. A small D1 usage table is created lazily on the first configured, authenticated request. Prompts and model text are not stored in D1. Failed upstream requests also count toward caps. OpenAI calls use store:false; no claim is made about zero retention. Model feedback separates language and professional accuracy and does not score pronunciation from text.

## Sources reviewed

- https://www.baicizhan.com/download — reference for common vocabulary-learning patterns; no proprietary content, artwork or account integration copied.
- https://learnenglish.britishcouncil.org/apps/learnenglish-sounds-right — external pronunciation resource; original audio/chart not copied.
- https://developers.openai.com/api/docs/guides/text — Responses API implementation reference.

## Validation

TypeScript no-emit check, dedicated English data/migration/review/request tests, mocked API tests for unavailable configuration, identity, origin, validation, success, upstream failure and quota rejection, and production build passed. Live model verification awaits activation. Microphone recording and browser speech recognition still require actual-device testing. The initial preview failed because the checkout-local execution profile was absent; the official Sites profile helper repaired it to managed-linux without modifying app code.
