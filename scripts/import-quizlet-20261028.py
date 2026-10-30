"""Incrementally import the verified 21-set archive; never renumber existing questions.

Usage: python3 scripts/import-quizlet-20261028.py /absolute/path/to/extracted/archive
"""
import collections
import hashlib
import json
from pathlib import Path
import re
import shutil
import sys
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
if (ROOT / 'data/question-source-policy.json').exists():
    raise SystemExit('Historical importer retired: use the current source-policy reconciliation; do not overwrite the original import audit.')
SOURCE = Path(sys.argv[1]).resolve()
BATCH = 'quizlet-20261028'
normalize = lambda s: re.sub(r'\s+', ' ', unicodedata.normalize('NFC', s)).strip()
read = lambda p: json.loads(p.read_text())
digest = lambda v: hashlib.sha256(json.dumps(v, ensure_ascii=False, sort_keys=True).encode()).hexdigest()

curriculum_path = ROOT / 'data/curriculum.json'
data = read(curriculum_path)
original = {q['id']: digest(q) for q in data['questions'] if q.get('sourceBatch') != BATCH}
catalog = read(SOURCE / 'catalog.json')
# The original extraction verified this creator. The recovery DOM selector
# accidentally selected a linked folder title on this one set.
for source in catalog:
    if source['set_id'] == '249811021':
        source['creator'] = 'davishrlw'
assert len(catalog) == 21 and sum(s['extracted'] for s in catalog) == 16456
media = {m['src']: m['file'] for m in read(SOURCE / 'media.json')}
raw = {s['set_id']: read(SOURCE / s['level'] / 'originals' / (s['set_id'] + '.json')) for s in catalog}
by_id = {q['id']: q for q in data['questions']}
existing = {(q['difficulty'], normalize(q['prompt']), normalize(q['answer'])): q
            for q in data['questions'] if q.get('sourceBatch') != BATCH}
mapping = []
new_ids = []
for level in ['CS', 'AS', 'MS']:
    for entry in read(SOURCE / level / 'review.json'):
        first = entry['sources'][0]
        card = raw[first['set_id']]['cards'][first['index'] - 1]
        identity = [level, [{'text': normalize(s['text']), 'images': [i['src'] for i in s['images'] if i.get('src', '').startswith('http')]} for s in card['sides']]]
        qid = 'QL-' + level + '-' + digest(identity)[:16]
        previous = existing.get((level, normalize(entry['question']), normalize(entry['answer']))) if not entry['images'] else None
        if previous:
            mapping.append({'entryId': entry['id'], 'questionId': previous['id'], 'reusedExisting': True})
            continue
        def images(side):
            return [{'src': '/media/quizlet-20261028/' + Path(media[i['src']]).name,
                     'originalUrl': i['src'], 'alt': '原题配图' if side == 0 else '原答案配图'}
                    for i in card['sides'][side].get('images', []) if i.get('src') in media] if len(card['sides']) > side else []
        prompt_images, answer_images = images(0), images(1)
        incomplete = len(card['sides']) < 2 or (not entry['answer'].strip() and not answer_images) or entry['answer'].strip() == '#NAME?'
        notes = []
        if len(card['sides']) < 2:
            notes.append('原卡仅有单面内容，未提供独立答案；保留原文待整理。')
        elif entry['answer'].strip() == '#NAME?':
            notes.append('原答案为 #NAME?，尚待核对。')
        elif not entry['answer'].strip() and not answer_images:
            notes.append('原卡答案为空，尚待补充。')
        if 'IS' in entry['sourceLevels']:
            notes.append('原题集标为 Introductory / Level 1，收于 CS 基础补充。')
        if '未明确' in entry['sourceLevels']:
            notes.append('原题集未明确难度，暂归 CS。')
        country, region, topic = 'general', '', 'mixed'
        source_ids = {s['set_id'] for s in entry['sources']}
        if '36532435' in source_ids:
            country, region, topic = 'France', 'Bordeaux', 'regions'
        elif '44513935' in source_ids:
            country, topic = 'New Zealand', 'regions'
        elif '53054787' in source_ids:
            country, topic = 'Portugal', 'regions'
        q = {'id': qid, 'prompt': entry['question'], 'answer': entry['answer'],
             'sourceUrl': first['url'], 'origin': 'Quizlet community flashcards · original wording',
             'reviewStatus': 'source-incomplete' if incomplete else 'source-unverified',
             'type': 'short', 'stage': {'CS': 'Certified', 'AS': 'Advanced', 'MS': 'Master'}[level],
             'country': country, 'region': region, 'module': 'Quizlet', 'lessonId': None,
             'difficulty': level, 'topic': topic, 'moduleId': None, 'track': 'CMS', 'knowledgePoints': [],
             'sourceBatch': BATCH, 'importEntryId': entry['id'],
             'sourceRefs': [{'setId': s['set_id'], 'index': s['index']} for s in entry['sources']],
             'sourceLevels': entry['sourceLevels'], 'contentNotes': notes,
             'promptImages': prompt_images, 'answerImages': answer_images, 'canSelfAssess': not incomplete}
        if qid in by_id:
            assert by_id[qid] == q, 'Imported content changed for stable ID ' + qid
        else:
            data['questions'].append(q)
            by_id[qid] = q
            new_ids.append(qid)
        mapping.append({'entryId': entry['id'], 'questionId': qid, 'reusedExisting': False})

assert all(digest(by_id[qid]) == sha for qid, sha in original.items())
assert len(by_id) == len(data['questions'])
curriculum_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
target = ROOT / 'public/media/quizlet-20261028'
target.mkdir(parents=True, exist_ok=True)
for file in set(media.values()):
    shutil.copy2(SOURCE / file, target / Path(file).name)
imported = [q for q in data['questions'] if q.get('sourceBatch') == BATCH]
sources = {'batch': BATCH, 'date': '2026-10-28', 'rawCards': 16456, 'entries': 9192,
           'imageFiles': len(set(media.values())), 'sources': catalog}
(ROOT / 'data/quizlet-sources.json').write_text(json.dumps(sources, ensure_ascii=False, indent=2) + '\n')
report = {'batch': BATCH, 'sets': 21, 'rawCards': 16456, 'reviewEntries': len(mapping),
          'imported': len(imported), 'existingQuestionsPreserved': len(original),
          'originalQuestionHashes': original, 'totalQuestions': len(data['questions']),
          'byLevel': dict(collections.Counter(q['difficulty'] for q in imported)),
          'needsReview': dict(collections.Counter(q['difficulty'] for q in imported if not q['canSelfAssess'])),
          'sourceMappings': mapping}
(ROOT / 'data/quizlet-import-20261028.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({k: v for k, v in report.items() if k not in ['originalQuestionHashes', 'sourceMappings']}, ensure_ascii=False))
print('New questions:', len(new_ids))
