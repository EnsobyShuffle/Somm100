# SOMM100 Wine Channel — YouTube + Bilibili Source Directory
Date: 2026-11-24 · Status: **GitHub release candidate only — NOT Tencent production deployed**

## User instruction / output
Continue the exact Nora-style Wine Channel that already exists. Split into **Bilibili** and **YouTube** sections; bring in all already indexed source accounts, only backfill Bilibili accounts not already represented. Preserve the original Nora, 槟客文化 and SOMM HOUSE channel cards, covers, searches, original links and user data. User requested publication to the **existing www.somm100.cn** official site; do not build a new website, redirect domains or use the former Netlify project. Current turn authorizes a content upload, but actual production release still requires verified access and a recoverable production baseline.

## This change in GitHub
Branch: `feat/wine-channel-youtube-bilibili-20261124`, based on `migration/tencent-somm100` at `3162373228ffcbf3aac58ce21277a771a7bfbdb4`.

- `data/wine-channel-source-accounts.json`: 142 previously indexed external video **source profiles** (original 97 + later 45). These include **139 accounts with a YouTube channel link** and 3 entries that are other video-source references without an independent YouTube channel link (Jamie Goode / Wineanorak, Winestories / Mauro Fermariello, Les Caves de Pyrène / Real Wine Fair). Keep the distinction; none of the 14 candidates or 3 excluded original channels were included.
- `data/wine-channel-bilibili-accounts.json`: 10 previously retained Bilibili core sources. Preserve existing original Nora / 槟客 / 亨利的逐未旅途 72 listed video records in `data/wine-channel.json`; keep `data/video-library.json` (25 historical user links) unchanged. Formerly excluded, merely conditional, and identity-unverified institution pages are not promoted to approved channel cards.
- `data/wine-channel-youtube-featured-01.json`: 145 distinct archival original YouTube watch links across 7 high-priority sources: LITTLEWINE 5, Skurnik 6, Wine With Jimmy 20, SevenFifty Daily 30, GuildSomm 8, WSET School London 41, The Unknown Winecaster 35. Some channel/source identity claims need independent playback verification. These are **research-selected original external links**, not content watched or licensed by SOMM100.
- `app/WineChannel.tsx`, `app/wine-channel.css`: light-background platform tabs, searchable source cards, per-creator views, lazy official YouTube nocookie iframe on explicit click, platform thumbnails from the original YouTube host, and preservation of existing Bilibili playback behavior.
- `tests/wine-channel-source-directory.test.mjs`: counts, exclusion boundaries, deduplication and URL-format integrity checks.

## Count and audit truth
`Source account indexed` is **not** `full uploader content copied`, `video watched`, `rights cleared`, or `course published`. The 142 source profiles are all represented at account level; 145 clip links are actually imported for video-detail cards. For the remaining source profiles, the account page currently provides the original channel link and source-index count, not a claim that individual video URLs have been imported. This is intentional to avoid inventing videos or publishing unselected/restricted content.

Original YouTube accounts 97 archived / 3 excluded; later additions 45. Bilibili 35 research pages include 10 core, 13 conditional, 7 identity-unverified and 5 excluded from long-term whole-account work. Do not quietly restore excluded/pending channels.

## QA performed
- Checked the new index against live Notion schema and all 142 indexed account rows.
- Verified JSON parsing and identity/URL uniqueness for 142 account entries, 10 Bilibili core entries and 145 featured clip links.
- Verified all 145 featured YouTube video IDs belong to a public account record and there are no duplicate link IDs.
- Verified React code retains the Nora-style Bilibili original gallery and existing `data/wine-channel.json`; first-pass static review completed.
- **NOT completed in this environment:** `node --test` or TypeScript/compiler build against the full GitHub checkout; desktop/mobile browser playback QA; current Tencent CloudBase production inventory/rollback snapshot; any remote upload.

## Release gate for current website owner (Shuffle)
Existing official deployment: www.somm100.cn via Tencent CloudBase environment `shuffle-platform-d6eoe6y06c6f4ea` and existing application `somm100`. The migration branch's `cloudbaserc.json` still has `deployPath: /somm100`, while later production evidence used root `/`; **do not upload an old ZIP or assume paths match**. Confirm current site build/assets, storage root, active deploy, backup/rollback and access in Tencent first. Merge only the Wine Channel delta with the current actual production source, test responsive Bilibili/YouTube tabs and existing Nora/Somehouse, then deploy by the current authorized CloudBase owner.

Suggested verification commands on an authorized checkout:
```bash
node --test tests/wine-channel.test.mjs tests/wine-channel-source-directory.test.mjs
npm run build:cloudbase
```
Then test the rendered `#videos?platform=bilibili` and `#videos?platform=youtube` on preview, check thumbnails, account links, restricted player fallback, no unexpected network failures, and ensure no private Notion source links in the public bundle.

**Do not** touch `main`, production data, DNS, old Netlify, another CloudBase application or user learning records. The developer-side staging commit is not itself production publication.

## Remaining feature work
- Finish full video watch-ID enumeration and human content/rights review for the other 135 video source archives.
- Restore or clear identity gaps for the 3 non-channel external source profiles.
- Expand Bilibili individual video listings only after selected-video and rights checks; never rehost video files.
