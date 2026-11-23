# SOMM100 · CloudBase ↔ GitHub publication connection
**2026-11-24 · safe phase 1: connection / read-only verification. Not deployed.**

## Why this route
The existing public repository `EnsobyShuffle/Somm100` has the Wine Channel integration in [draft PR #11](https://github.com/EnsobyShuffle/Somm100/pull/11), branch `feat/wine-channel-youtube-bilibili-20261124`. The current Tencent production state is **not** guaranteed to equal this repository. A previous CloudBase successful deploy and the historic `cloudbaserc.json` conflict on site root: production served `/`; old repo config still specifies `/somm100`. Never blindly upload an old ZIP or run `tcb deploy` against production.

CloudBase native [Pipeline](https://docs.cloudbase.net/pipeline/console) supports connecting an external *public* Git repository. Its container already has an authenticated CloudBase CLI, so **no Tencent API SecretId / SecretKey needs to be placed in this chat or the repo**. The user authenticates once in the CloudBase console. Prefer this over credential copying or new-site migration.

## Step 1 — Create a NON-PUBLISHING native CloudBase pipeline
Open **https://tcb.cloud.tencent.com/dev** and choose the existing environment `shuffle-platform-d6eoe6y06c6f4ea`.

Go to **流水线管理 → 创建流水线** and choose:

| Field | Exact value |
| --- | --- |
| Pipeline name | `somm100-wine-link-check` |
| Trigger type | Git repository → public repository |
| Git URL | `https://github.com/EnsobyShuffle/Somm100.git` |
| Branch | `feat/wine-channel-youtube-bilibili-20261124` |
| Auto-deploy on push | **OFF** |
| Working directory | `./` |
| Builder | Node.js **22 or higher**, Linux |
| Install command | `corepack enable && corepack prepare pnpm@11.25.0 --activate && pnpm install --frozen-lockfile` |
| Build command | `pnpm run build:cloudbase` |
| **Deployment command** | **`bash scripts/cloudbase-link-check.sh`** (READ ONLY; do not leave default `tcb deploy --yes`!) |

Click the pipeline's run/deploy action only after confirming the deployment command is **exactly the no-op read-only script** above.

Expected log markers:
- `CHECK: expected environment and app configuration present`
- `CHECK: build output exists, no public upload scheduled`
- `HOSTING_READ_OK` if credentials can read hosting
- `APP_INFO_READ_OK` if the versioned application exists and is readable
- `CONNECTION_CHECK_FINISHED_NO_DEPLOYMENT`

If no GitHub authorization option is available, the public Git repository URL above requires no private GitHub OAuth. If CloudBase cannot fetch it, the pipeline log should identify the source access problem. Do not pass user passwords or keys into chat.

## Step 2 — safely resolve actual production deployment type
CloudBase can host the site in two distinct forms. Don't mistake the two:
- **Static hosting file directory** at a `deployPath` (visible under 静态网站托管 → 文件管理)
- **Versioned app** `somm100` (visible under 应用, has versions and its own app URL)

This repository declares `hosting: [{name:"somm100",deployPath:"/somm100"}]` while later real-domain usage was at `/`. The read-only check prints current source configuration, but the authoritative live *root mapping and deployment ID* must be checked in the CloudBase console. Before enabling a write pipeline, record the current deploy ID/time, actual host target, existing app version, build assets and restore point.

The read-only script never deploys, deletes, pays, creates resources or edits database/DNS.

## Step 3 — turn into the permanent publish channel (after Step 2)
Use the same existing CloudBase environment and the present website application, NOT a new website. Pin a **release branch based on the verified current production source** (include the Wine Channel-only delta from PR #11). Select the matching published form and root path; only then replace the read-only deploy command with the correct `tcb hosting deploy dist-cloudbase ... --verify` or `tcb app deploy` command for the actual live target. Preview the build, verify Nora, 槟客, SOMM HOUSE, the Bilibili and YouTube tabs, all protected course modules and mobile playback. Perform a one-time manually approved deploy with rollback available.

Only **after** a successful production release should Git webhook auto-deployment be considered. Limit auto-deploy to a dedicated approved release branch; don't connect it to `main` or all feature pushes.

## Readiness / public release report
- [x] GitHub Wine Channel staging PR #11 exists
- [x] 142 indexed YouTube/video source profiles, 10 Bilibili core profiles, 145 researched YouTube video URLs staged in repository
- [x] Read-only CloudBase pipeline script is committed in the feature branch
- [x] GitHub build-only workflow is prepared; it has NO deploy access
- [ ] User one-time binds CloudBase Git pipeline to public repository
- [ ] CloudBase runner builds and prints connection check markers
- [ ] Actual current site root/version/rollback verified
- [ ] Release candidate reconciled to live; QA passed
- [ ] Authorized production deploy receipt on www.somm100.cn

Sources: official CloudBase docs [pipeline console](https://docs.cloudbase.net/pipeline/console), [Git repo hosting](https://docs.cloudbase.net/hosting/web-hosting), [CLI static hosting deploy](https://docs.cloudbase.net/cli-v1/hosting/deploy).
