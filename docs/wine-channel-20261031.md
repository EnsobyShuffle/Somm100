# Wine Channel — creator directory, 31 October 2026

The channel opens with creator accounts. Each account opens its own video list, with real original covers where verified, original video links, search and topic filters. Nora and 槟客文化 lead the directory. Other existing creators remain available; Miki and Somehouse stay explicitly pending identity confirmation.

## Scope and provenance

- Original baseline: `fdae6980ec60ddda99309572d384ec872669432d` from the actual `EnsobyShuffle/Somm100` main branch. Netlify's Deploys screen confirmed the same commit is currently published.
- `data/video-library.json` stays intact: 25 existing video records and IDs.
- `data/wine-channel.json`: eight additional videos, five by nora的葡萄酒世界 (UID 506969146), three by 槟客文化 (UID 348903504). Combined curated count: 33; personal links are additional and remain in the user's existing store.
- `research/wine-channel-source-verification-20261031.json` maps each addition to its exact original page, author/UID, Open Graph cover/player URL, duration and publication date. Chinese titles were cross-checked in Bilibili search and related-video labels; localized English extraction titles are kept in evidence.
- This is link/preview indexing, not a reupload. No video was downloaded or republished. Cover URLs are the original page's public sharing previews; rights are not represented as transferred to SOMM100. Videos have not been watched in full or certified for educational accuracy.

## Interaction

- `#videos` opens accounts; `#videos?creator=nora` and `#videos?creator=bingke` open creator lists. Browser Back restores the account directory.
- Covers and titles open the original platform. Missing/failed cover images retain a text fallback and the same usable original link.
- Only videos with verified original `player.bilibili.com/player.html` metadata offer inline playback. An iframe is created only after clicking, with `autoplay=0`; only one is mounted at a time. Filtering/navigating closes it. Original Bilibili links remain visible whether playback works or not.
- Existing personal add/remove and Somehouse own-content filtering are retained. Validation reuses `lib/habits.ts`; invalid protocols, hosts and embedded credentials are rejected.
- Narrow-screen CSS switches creator and video grids to one column. Keyboard focus styles and labeled player frames are included. Actual device visual/playback checks remain pending.

## Verification

- `node --test tests/wine-channel.test.mjs`: original-page evidence correspondence, BV deduplication, original-host links and author identity checks.
- Focused TypeScript check for `app/WineChannel.tsx` passes.
- Temporary React interaction harness passed account/deep-link navigation, 33 curated plus personal links, search/clear, lazy single-player lifecycle, broken-cover fallback, personal save/remove, own-content filtering, malicious URL rejection and cleanup.
- `pnpm run build:netlify` succeeds with the existing locked dependencies and Netlify config; large-bundle warnings are pre-existing architecture concerns.
- Repository-wide TypeScript reports the pre-existing missing Sites-specific `.openai/hosting.json` import in `vite.config.ts`. No such file is invented or added. Netlify uses `vite.config.netlify.ts`.
- The existing `tests/habits.test.mjs` fails on a stale assertion that `data/curriculum.json` contains Intro/CS/AS/MS question banks. That data and test are unchanged by this patch; retired banks must not be restored to satisfy it. Its preceding date/settings/video-safety checks passed. New channel tests pass.

## Publishing and continuation

Formal host: `https://somm100.netlify.app/`; project `somm100`; existing GitHub `main` auto-publishing is enabled. At inspection, Netlify explicitly paused production deploys due to exhausted billing-cycle credits. Trigger deploy is disabled. No billing changes or alternate sites were created. The new channel cannot be claimed live until this clears and a production deployment is verified.

The hourly task should read `research/wine-channel-checkpoint.json`, reconcile current main, resume the next creator/BV, and update the same catalog. Avoid creating duplicates from the legacy catalog. Pending candidates are not automatically user-approved creators. Recheck publication availability each run; preserve unfinished work even when deployment is blocked.

Rollback, if needed after a future publication: revert only the Wine Channel change commit, rebuild through the same Netlify workflow, and verify `#videos`. The original catalog and all user records are preserved. Do not reset main to the historical source recovery ZIP or delete other agents' newer commits.
