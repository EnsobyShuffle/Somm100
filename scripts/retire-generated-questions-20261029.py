"""Apply the owner's 2026-10-29 source restriction; never touch learner storage.

Input: original Henritage Quizlet set 891549861 extracted from the user's archive.
Re-running preserves stable question IDs. Previous content remains in Git history.
"""
import hashlib
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
read = lambda p: json.loads(p.read_text())
write = lambda p, v: p.write_text(json.dumps(v, ensure_ascii=False, indent=2) + '\n')
raw = read(Path(sys.argv[1]))
assert str(raw['set_id']) == '891549861' and raw['author'] == 'Henritage'
assert len(raw['rows']) == 46
path = ROOT / 'data/curriculum.json'
data = read(path)
report = read(ROOT / 'data/quizlet-import-20261028.json')
retired = set(report['originalQuestionHashes'])
cms = [q for q in data['questions'] if q.get('sourceBatch') == 'quizlet-20261028']
assert len(cms) == 9192
raw_hashes = {q['id']: hashlib.sha256(json.dumps(q, ensure_ascii=False, sort_keys=True).encode()).hexdigest() for q in cms}
url = raw['source_url'].split('?')[0]
owned = []
for i, row in enumerate(raw['rows'], 1):
    prompt, answer = [s['text'] for s in row['sides']]
    owned.append(dict(id=row['question_id'], track='SOMM100', type='short', difficulty='SOMM100',
        stage='SOMM100', prompt=prompt, answer=answer, topic='viticulture' if 3 <= i <= 23 else 'vinification',
        country='general', region='', lessonId=None, moduleId=None, module='D1 · 种植与酿造',
        sourceUrl=url, sourceBatch='henritage-somm100-20261026', sourceOwner='Henritage',
        sourceRefs=[dict(setId='891549861', index=i)], sourceContentHash=row['content_sha256'],
        sourceExtractedAt=raw['extracted_at'], origin='Henritage Quizlet · original wording',
        reviewStatus='source-unverified', canSelfAssess=True, contentNotes=[], promptImages=[], answerImages=[]))
data['questions'] = owned + cms
active = {q['id'] for q in data['questions']}
previous_policy = ROOT/'data/question-source-policy.json'
removed = read(previous_policy)['removedSupplemental'] if previous_policy.exists() else []
def prune(v, file, loc=''):
    if isinstance(v, dict):
        for k, x in v.items():
            if k == 'questions' and isinstance(x, list) and file != 'data/curriculum.json':
                if x and isinstance(x[0], dict):
                    removed.append(dict(file=file, path=loc+'.questions', count=len(x)))
                    v[k] = []
                elif x and isinstance(x[0], str): v[k] = [q for q in x if q in active]
            elif k == 'questionIds' and isinstance(x, list): v[k] = [q for q in x if q in active]
            elif k == 'related' and isinstance(x, list): v[k] = [q for q in x if q not in retired]
            else: prune(x, file, loc+'.'+k)
    elif isinstance(v, list):
        for i, x in enumerate(v): prune(x, file, loc+f'[{i}]')
prune(data, 'data/curriculum.json')
write(path, data)
for path in (ROOT/'data').rglob('*.json'):
    rel = str(path.relative_to(ROOT))
    if rel == 'data/curriculum.json': continue
    d = read(path)
    before = json.dumps(d)
    if rel == 'data/spain/questions.json':
        removed.append(dict(file=rel, count=len(d), duplicateOf='data/spain-library.json'))
        d = []
    else: prune(d, rel)
    if rel == 'data/cms-learning.json':
        for m in d['modules']:
            m['resources']['questions']['notes'] = []
            m['resources']['questions']['sections'] = []
    if json.dumps(d) != before: write(path, d)
path = ROOT/'data/region-bouzeron.ts'
text = path.read_text()
match = re.search(r'const q=[\s\S]+?export const questions:RegionQuestion\[\]=\[([\s\S]+)\];\s*$', text)
if match:
    removed.append(dict(file=str(path.relative_to(ROOT)), count=match.group(1).count(" q('")))
    path.write_text(text[:match.start()]+'// Self-authored review questions retired by the owner on 2026-10-29.\nexport const questions:RegionQuestion[]=[];\n')
for name in ['italy-ms', 'italy-grapes']:
    path=ROOT/f'public/releases/{name}/index.html'
    text=path.read_text(); match=re.search(r'const DATA\s*=\s*',text)
    d,end=json.JSONDecoder().raw_decode(text[match.end():])
    removed.append(dict(file=str(path.relative_to(ROOT)), count=len(d['ms_question_bank']), duplicateOf='italy-ms' if name=='italy-grapes' else None))
    d['ms_question_bank']=[]
    text=text[:match.end()]+json.dumps(d,ensure_ascii=False,separators=(',',':'))+text[match.end()+end:]
    text=text.replace(".join('');document.querySelector('#stats').textContent=items.length+' questions';", ".join('')||'<p>Self-authored questions have been removed. <a href=\"/#practice\" target=\"_top\">Open the sourced Wine Quiz bank</a></p>';document.querySelector('#stats').textContent=items.length+' questions';")
    if name=='italy-grapes':
        start=text.index('function buildGrapeQuizBank(){'); end=text.index('const grapeQuizBank=',start)
        text=text[:start]+'// No automatic question generation: only owner-approved original sources.\nfunction buildGrapeQuizBank(){return []}\n'+text[end:]
        start=text.index('function openTestSetup('); end=text.index('\nfunction ',start+1)
        text=text[:start]+"function openTestSetup(){window.top.location.href='/#practice'}\n"+text[end:]
    path.write_text(text)
path=ROOT/'public/releases/south-america-ms/index.html'
text=path.read_text(); match=re.search(r'window.SOMM100_QUESTIONS\s*=\s*',text)
if match:
    d,end=json.JSONDecoder().raw_decode(text[match.end():])
    removed.append(dict(file=str(path.relative_to(ROOT)), count=len(d)))
    text=text[:match.end()]+'[]'+text[match.end()+end:]
    text=text.replace("const INITIAL = window.SOMM100_QUESTIONS || [];", "const INITIAL = window.SOMM100_QUESTIONS || []; // Generated bank retired; personal imports remain on this device.")
    path.write_text(text)
policy=dict(effectiveDate='2026-10-29', retiredQuestionIds=sorted(retired),
    allowedSourceFamilies=['user-youdao-original', 'quizlet-henritage', 'approved-cms-extraction-20261028'],
    approvedCmsSetIds=[s['set_id'] for s in read(ROOT/'data/quizlet-sources.json')['sources']],
    approvedHenritageSetIds=['891549861'], removedCentralCount=282,
    removedSupplemental=list({(r['file'],r.get('path','')):r for r in removed if r['count']}.values()), preservedCmsCount=len(cms), importedSomm100Count=len(owned), total=len(data['questions']),
    languageRules={'SOMM100':'zh with English proper names','IC':'en + zh','AS':'en only','MS':'en only'},
    cmsOriginalHashes=raw_hashes)
write(ROOT/'data/question-source-policy.json',policy)
write(ROOT/'data/henritage-sources.json',dict(sources=[dict(set_id='891549861', title=raw['title'],creator='Henritage',level='SOMM100',url=url,extracted=46,extractedAt=raw['extracted_at'],folder='Somm 100',folderId='128792755')]))
print(json.dumps({k:v for k,v in policy.items() if k not in ['cmsOriginalHashes','retiredQuestionIds']},ensure_ascii=False))
