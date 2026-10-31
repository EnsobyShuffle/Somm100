#!/usr/bin/env python3
"""Package the built public website only; never upload source or credentials."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import subprocess
import zipfile

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--github-commit', help='Verified GitHub source SHA (local and GitHub histories may differ)')
args = parser.parse_args()
if args.github_commit and not re.fullmatch(r'[0-9a-f]{40}', args.github_commit):
    parser.error('--github-commit must be a full 40-character Git SHA')
config = json.loads((root / 'cloudbaserc.json').read_text())
hosting = next(item for item in config['hosting'] if item['name'] == 'somm100')
public = (root / hosting['outputDir']).resolve()
if not public.is_relative_to(root) or public == root:
    raise SystemExit('Build output must be a directory inside the project, not the source root')
local_commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
output = root / 'cloudbase-artifacts'
if not (public / 'index.html').is_file():
    raise SystemExit('Run npm run build:cloudbase first')
output.mkdir(exist_ok=True)
manifest = []
for item in sorted(public.rglob('*')):
    if item.is_symlink():
        raise SystemExit(f'Symlink refused: {item}')
    if not item.is_file():
        continue
    relative = item.relative_to(public)
    if any(part.startswith('.') for part in relative.parts):
        raise SystemExit(f'Unexpected hidden public file: {relative}')
    if item.suffix in ('.pem', '.key', '.env', '.map'):
        raise SystemExit(f'Unexpected private/build file: {relative}')
    raw = item.read_bytes()
    manifest.append({'path': relative.as_posix(), 'bytes': len(raw),
                     'sha256': hashlib.sha256(raw).hexdigest()})
archive = output / 'SOMM100_CloudBase_Web.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for item in manifest:
        bundle.write(public / item['path'], item['path'])
report = {'source': 'EnsobyShuffle/Somm100',
          'sourceBranch': 'migration/tencent-somm100',
          'localSourceCommit': local_commit,
          'githubSourceCommit': args.github_commit,
          'generatedAt': datetime.now(timezone.utc).isoformat(),
          'environmentId': config['envId'],
          'region': config['region'], 'path': hosting['deployPath'],
          'storageMode': 'existing-browser-local',
          'deployed': False, 'mainlandNetworkVerified': False,
          'files': manifest}
(output / 'manifest.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'archive': str(archive), 'files': len(manifest),
                  'uncompressedBytes': sum(x['bytes'] for x in manifest),
                  'archiveBytes': archive.stat().st_size}, ensure_ascii=False))
