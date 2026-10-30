"""Apply the reviewed October 28 batch without reassigning existing learning IDs."""
import ast, copy, hashlib, json, re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
research = root / 'research/content-release-20261028'
read = lambda path: json.loads(path.read_text())
cms = read(root / 'data/cms-learning.json')
curr = read(root / 'data/curriculum.json')
pages = read(research / 'core-pages.json')
extension = read(research / 'module01-extension.json')
mods = {m['id']: m for m in cms['modules']}

# Reuse only the pure source-format parser, never the old two-module importer.
tree = ast.parse((root / 'scripts/import-cms-learning.py').read_text())
pure = ast.Module(body=[n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name in ('plain', 'rich')], type_ignores=[])
media = {}
for m in cms['modules']:
    for resource in m['resources'].values():
        for section in resource.get('sections', []):
            for block in section['blocks']:
                if block['type'] == 'image' and block.get('reference') and block.get('src'):
                    media[block['reference']] = {'file': block['src']}
namespace = {'re': re, 'media': media, 'known': {p['url'].split('?')[0]: p['sourceTitle'] for p in pages}}
exec(compile(pure, '<pure-notion-parser>', 'exec'), namespace)
rich = namespace['rich']
def parse(page, pattern, prefix):
    body = page['text'].split('<content>', 1)[1].rsplit('</content>', 1)[0]
    body = re.sub(r'<br\s*/?>', '\n', body)
    matches = list(re.finditer(pattern, body, re.M))
    sections = []
    for i, match in enumerate(matches):
        title = match[1]
        if re.search(r'Source Alignment|What is intentionally NOT here', title, re.I):
            continue
        text = body[match.end():matches[i+1].start() if i+1 < len(matches) else len(body)]
        sections.append({'id': prefix + str(i+1).zfill(2), 'title': title, 'blocks': rich(text, page['url']), 'track': True})
    return sections

# Module 01 keeps all 16 original reading IDs and their progress/notes.
m1 = mods['module01']
page = next(p for p in pages if p['id'] == '3fb17d16-de4c-8133-95c9-f702a67f5d58')
sections = parse(page, r'^# (.+)$', 'M1-READ')
assert len(sections) == 16
old = {s['id']: s for s in m1['resources']['core']['sections']}
for section in sections:
    prior = old[section['id']]
    for key in ('lessonId', 'questionIds'):
        if key in prior: section[key] = prior[key]
    # If a source attachment changed, retain the known matching section image.
    prior_images = [b for b in prior['blocks'] if b['type'] == 'image']
    for block in section['blocks']:
        if block['type'] == 'image' and not block.get('src'):
            match = next((b for b in prior_images if b.get('caption') == block.get('caption')), None)
            assert match, 'Unresolved source image: ' + str(block)
            block['src'] = match['src']
m1['resources']['core'].update(sections=sections, lastEdited=page['page_last_edited_at'], sha256=hashlib.sha256(page['text'].encode()).hexdigest())

# The 16 new extension topics are different from the old ten knowledge blocks.
# Preserve old records and deep links; do not transfer completion to new material.
exp = m1['resources']['expansion']
old_exp = exp.get('archivedSections', []) or exp['sections']
new_sections = copy.deepcopy(extension['sections'])
new_ids = {s['id'] for s in new_sections}
exp['archivedSections'] = [s for s in old_exp if s['id'] not in new_ids]
for i, section in enumerate(new_sections, 1):
    lid = f'M1-EXT20261028-{i:02}'
    section.update(track=True, lessonId=lid, questionIds=[])
    if not any(l['id'] == lid for l in curr['lessons']):
        curr['lessons'].append({'id': lid, 'moduleId': 'module01', 'title': section['title'], 'en': section['title'].split('｜')[0], 'body': '\n\n'.join(b.get('text', '') for b in section['blocks'] if b.get('text')), 'minutes': 5, 'category': 'Viticulture & Vinification', 'sourceUrl': extension['sourceUrl'], 'reviewStatus': 'teacher-review-pending', 'knowledgePoints': [], 'related': []})
exp.update(title='Understanding and Extension', url=extension['sourceUrl'], lastEdited=extension['sourceLastEdited'], sections=new_sections)
m1['lessonIds'] = [s['lessonId'] for s in new_sections]

# Old module10/11 URLs continue to mean Languedoc/Southwest, including saved notes.
for mid, number in [('module09', '09A'), ('module10', '09B'), ('module11', '09C')]:
    mods[mid]['number'] = number
for number, country, zh in [('10', 'Spain', '西班牙'), ('11', 'Portugal', '葡萄牙')]:
    mid = f'module{number}-{country.lower()}'
    page = next(p for p in pages if p['sourceTitle'].startswith(number + '｜Core Text'))
    sections = parse(page, r'^## (.+)$', 'M' + number + '-' + country.upper() + '-READ-')
    resources = {'core': {'title': 'Core Text Reading · ' + country, 'url': page['url'], 'lastEdited': page['page_last_edited_at'], 'sections': sections}}
    for key, title in [('guide', 'Syllabus Guide'), ('expansion', 'Understanding and Extension'), ('checklist', 'Knowledge Checklist'), ('questions', 'Question Bank')]:
        resources[key] = {'title': title, 'url': page['url'], 'sections': [], 'notes': []}
    mods[mid] = {'id': mid, 'number': number, 'title': country, 'zh': zh, 'pages': 'Reading overview · 首版阅读提纲', 'plannedDates': [], 'sourceUrl': page['url'], 'resources': resources, 'lessonIds': [], 'questionIds': [], 'checklistIds': [], 'contentStatus': 'reading-overview', 'reviewStatus': 'teacher-review-pending'}
cms['modules'] = sorted(mods.values(), key=lambda m: m['number'])
cms['updatedAt'] = '2026-10-28'
cms['version'] = 5
# Retain historical IDs accepted by the API, including archived readings.
readings = {r['id']: r for r in curr['readings']}
for m in cms['modules']:
    for s in m['resources']['core']['sections']:
        if s.get('track'): readings[s['id']] = {'id': s['id'], 'moduleId': m['id'], 'title': s['title']}
curr['readings'] = list(readings.values())
for path, data in [('cms-learning.json', cms), ('curriculum.json', curr)]:
    (root / 'data' / path).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'chapters': len(cms['modules']), 'newReadingSections': 20, 'module01ExtensionTopics': len(new_sections), 'module01LicensedImages': extension['counts']}, ensure_ascii=False))
