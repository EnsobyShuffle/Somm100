# Foundation Knowledge Breakdown

The 17 Notion student shards contain 176 rows and 174 distinct KPs. Day 1 has 52, Day 2 has 55, their shared France chapter has 17, Day 3 has 22 and Day 4 has 28. The first two Day 1 shards overlap on D1-02-KP04 and D1-02-KP05. The original Notion staging page retains both the source shards and the reconciled private files.

## Import

Run `node scripts/prepare-somm100-kp.mjs --input /path/to/private/exports` with the manifest, source shards and optional Extension indexes. The preview retains the complete original excerpts and teacher annotations under the ignored private-course-import directory. A conflicting duplicate aborts the import. All 236 current Extension candidate records carry an internal-only permission.

For a student release use the same command with `--mode production`. It produces private-course-import/student-release.json and prints its SHA-256. Student records require student_ready, teacher_review and rights_cleared. Previously reviewed public_ready records are also supported. Related articles need their own article_title, article_url, teacher_status, access_verified, rights_cleared and student_publication_allowed. Mixed teacher/student notes should be reviewed against their original source. Text and indexes stay outside public assets.

## Tencent runtime

The existing Foundation view and focused reader share the same component. Set VITE_SOMM100_COURSE_ENV and VITE_SOMM100_COURSE_PUBLISHABLE_KEY after verifying the existing environment's hosted student login. The publishable key is a client key. Server credentials must never use a VITE_ variable. A missing configuration leaves the existing course available.

The event function in cloudfunctions/somm100FoundationRead reads the current CloudBase invocation identity. Configure SOMM100_FOUNDATION_UIDS from the authorized Foundation enrollment roster (comma- or whitespace-separated CloudBase UIDs). Configure SOMM100_FOUNDATION_RELEASE_FILE and SOMM100_FOUNDATION_RELEASE_SHA256 for a versioned, server-readable object. All client and anonymous storage reads, including direct underlying object access, must be denied before placing private files there. Keep the verified object and digest from the prior release for rollback. The function checks enrollment before downloading, then checks the digest and student schema. No file identifier, enrollment list or private Notion URL is returned to the browser.

Deploy the event function independently of the static web root. Verify real enrolled, unenrolled, and signed-out sessions before enabling the client. The live index on 24 November also loads beer and liqueur routes absent from the migration branch. The legacy /somm100 hosting configuration is unsuitable for publishing the current root. Compare and preserve the actual remote files before making an incremental release.

## Checks

Run `node --test tests/somm100-course-import.test.mjs tests/foundation-*.test.mjs` and `npm run build:cloudbase`. The CloudBase build rejects the legacy public course JSON, including ignored files left in a developer checkout.
