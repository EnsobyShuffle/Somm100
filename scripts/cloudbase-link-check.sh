#!/usr/bin/env bash
# CloudBase native pipeline — connection check ONLY. No upload, no changes.
set -euo pipefail

EXPECTED_ENV='shuffle-platform-d6eoe6y06c6f4ea'
EXPECTED_APP='somm100'

if [[ ! -f cloudbaserc.json ]]; then
  echo 'ERROR: Missing cloudbaserc.json'; exit 2
fi

node --input-type=module <<'NODE'
import fs from 'node:fs';
const cfg=JSON.parse(fs.readFileSync('cloudbaserc.json','utf8'));
if(cfg.envId !== 'shuffle-platform-d6eoe6y06c6f4ea') {
 console.error('ERROR: Unexpected CloudBase envId'); process.exit(2);
}
if(!Array.isArray(cfg.hosting) || !cfg.hosting.some(h=>h.name==='somm100')) {
 console.error('ERROR: Missing existing SOMM100 hosting declaration'); process.exit(2);
}
const path=cfg.hosting.find(h=>h.name==='somm100').deployPath;
console.log('CHECK: expected environment and app configuration present');
console.log('REPO DEPLOY PATH:',path);
console.log('WARNING: Historical official domain deployment used /; this repo declares '+path+'. Root vs subpath must be confirmed from production before enabling upload.');
NODE

if [[ ! -f dist-cloudbase/index.html ]]; then
 echo 'BUILD_NOT_READY: run pnpm run build:cloudbase in pipeline Build command first'; exit 2
fi
echo 'CHECK: build output exists, no public upload scheduled'

if command -v tcb >/dev/null 2>&1; then
  echo 'CloudBase CLI available:'
  tcb --version
  echo 'READ ONLY: check existing static hosting service (never upload):'
  if tcb hosting detail -e "$EXPECTED_ENV"; then
    echo 'HOSTING_READ_OK'
  else
    echo 'HOSTING_READ_FAILED_OR_PERMISSION_MISSING'
  fi
  echo 'READ ONLY: inspect whether SOMM100 is a versioned app:'
  if tcb app info "$EXPECTED_APP" -e "$EXPECTED_ENV"; then
    echo 'APP_INFO_READ_OK'
  else
    echo 'APP_INFO_UNAVAILABLE (may be static file hosting; check console)'
  fi
else
 echo 'ERROR: CloudBase CLI unavailable in this runner'; exit 2
fi
echo 'CONNECTION_CHECK_FINISHED_NO_DEPLOYMENT'
