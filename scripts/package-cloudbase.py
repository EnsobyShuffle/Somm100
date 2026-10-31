#!/usr/bin/env python3
"""Package the built public website only; never upload source or credentials."""
import hashlib
import json
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parents[1]
public = root / 'dist-cloudbase'
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
          'sourceCommit': '56ec515c3ff67e97e95f6d66475561d0d87367fd',
          'environmentId': 'shuffle-platform-d6eoe6y06c6f4ea',
          'region': 'ap-shanghai', 'path': '/',
          'storageMode': 'existing-browser-local',
          'deployed': False, 'mainlandNetworkVerified': False,
          'files': manifest}
(output / 'manifest.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'archive': str(archive), 'files': len(manifest),
                  'uncompressedBytes': sum(x['bytes'] for x in manifest),
                  'archiveBytes': archive.stat().st_size}, ensure_ascii=False))
