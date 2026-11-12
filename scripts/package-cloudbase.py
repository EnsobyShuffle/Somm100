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
parser.add_argument('--course-lookup-assets', type=Path,
                    help='Directory containing the verified production course lookup JS and CSS')
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

# These are the two assets already served by www.somm100.cn on both course pages.
# Preserve their published bytes and existing API route when assembling that release.
lookup_assets = {
    'static-word-lookup-Cg57t2VV.js': '047328bcd090a36ffda72c4f9d94b7852057e8a06fd781d9e055a1b4b992aa99',
    'static-word-lookup-PZF57Ufx.css': '9e9a2265bee7db38d575dd46946ee519fc5f39a98523c1a93805e0c0e4b3baed',
}
lookup_directory = 'assets/static-word-lookup'
release_files = {}
if args.course_lookup_assets:
    for name, expected in lookup_assets.items():
        source = args.course_lookup_assets / name
        if not source.is_file():
            raise SystemExit(f'Missing production course lookup asset: {name}')
        raw = source.read_bytes()
        if hashlib.sha256(raw).hexdigest() != expected:
            raise SystemExit(f'Production course lookup checksum mismatch: {name}')
        destination = f'{lookup_directory}/{name}'
        if (public / destination).exists():
            raise SystemExit(f'Production course lookup conflicts with built file: {destination}')
        release_files[destination] = raw
    js, css = lookup_assets
    for page in ('course.html', 'foundation.html'):
        html = (public / page).read_text(encoding='utf-8')
        if html.count('</head>') != 1 or html.count('</body>') != 1 or 'data-somm100-static-word-lookup' in html:
            raise SystemExit(f'Unexpected HTML structure for course lookup: {page}')
        html = html.replace('</head>', f'<link data-somm100-static-word-lookup rel="stylesheet" href="./{lookup_directory}/{css}">\n</head>')
        html = html.replace('</body>', f'<script data-somm100-static-word-lookup type="module" src="./{lookup_directory}/{js}"></script>\n</body>')
        release_files[page] = html.encode('utf-8')

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
    path = relative.as_posix()
    raw = release_files[path] if path in release_files else item.read_bytes()
    manifest.append({'path': path, 'bytes': len(raw),
                     'sha256': hashlib.sha256(raw).hexdigest()})
for path, raw in sorted(release_files.items()):
    if not (public / path).is_file():
        manifest.append({'path': path, 'bytes': len(raw),
                         'sha256': hashlib.sha256(raw).hexdigest()})
archive = output / 'SOMM100_CloudBase_Web.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for item in manifest:
        path = item['path']
        if path in release_files:
            bundle.writestr(path, release_files[path])
        else:
            bundle.write(public / path, path)
report = {'source': 'EnsobyShuffle/Somm100',
          'sourceBranch': 'migration/tencent-somm100',
          'localSourceCommit': local_commit,
          'githubSourceCommit': args.github_commit,
          'generatedAt': datetime.now(timezone.utc).isoformat(),
          'environmentId': config['envId'],
          'region': config['region'], 'path': hosting['deployPath'],
          'storageMode': 'existing-browser-local',
          'deployed': False, 'mainlandNetworkVerified': False,
          'preservedCourseLookupAssets': list(lookup_assets) if args.course_lookup_assets else [],
          'files': manifest}
(output / 'manifest.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'archive': str(archive), 'files': len(manifest),
                  'uncompressedBytes': sum(x['bytes'] for x in manifest),
                  'archiveBytes': archive.stat().st_size}, ensure_ascii=False))
