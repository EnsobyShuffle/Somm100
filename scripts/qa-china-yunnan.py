"""Release invariants for the additive Yunnan Notion import."""
import collections, hashlib, json, pathlib, re, subprocess, unicodedata
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
data = json.loads((ROOT/'data/china-library.json').read_text())
images = json.loads((ROOT/'data/china-images.json').read_text())
audit = json.loads((ROOT/'research/china-yunnan-20261029/relationship-audit.json').read_text())
records = data['records']
by_id = {e['id']: e for e in records}
by_notion = {e['notionId']: e for e in records}
assert len(records) == len(by_id) == len(by_notion) == 162
assert data['counts'] == {'producer':36,'wine':50,'vintage':24,'region':34,'site':18}
assert len(images) == len({i['id'] for i in images}) == 18

def norm(s):
    return re.sub(r'[\s·／/—–_\-]+','', ''.join(c for c in unicodedata.normalize('NFD',s.lower()) if not unicodedata.combining(c)))

priority = ['Ao Yun','霄岭红葡萄酒','红坡霞多丽','霄岭之道','云上霄岭','霄岭干白','圣域红','圣域传奇霞多丽','圣域传奇赤霞珠','圣域荣中赤霞珠','海拔2600霞多丽','海拔2600','海拔2000','海拔1800','三星玫瑰蜜','老树25年玫瑰蜜','老树25年水晶','云中舞','法国野','宝庄干红','宝庄霞多丽','Sulu','Bucun','Agape Siyongong','硕日拉姆玫瑰蜜','硕日拉姆桃红','硕日拉姆霞多丽','水乳大地','大地颂歌','六千里赤霞珠','依云霞多丽','中国桶赤霞珠','珍藏霞多丽','花落祥云典藏冰酒','雪山秘境西拉','白马雪山德钦臻藏霞多丽','白马雪山德钦霞多丽','腊普藏云谷冰酒','扎西大扎西2560','扎西2300','扎西珍藏霞多丽','木杺红葡萄酒','木杺霞多丽','木杺 Cuvée Spéciale','小圃高海拔赤霞珠','醉生梦只此高峰','醉生梦高山冰酒','茨中秘境玫瑰蜜']
for term in priority:
    assert any(norm(term) in norm(e['searchText']) for e in records if e['kind']=='wine'), term
for name in ['西当','斯农','朔日','阿东','茨中','巴东','江坡','荣中','哈充','叶日','红坡','日咀','明永','九龙顶','东水','苏鲁','布村','斯永贡']:
    assert any(name in e['name'] for e in records if e['kind']=='site'), name
for r in data['relations']:
    assert r['from'] in by_id and r['to'] in by_id
    assert r in by_id[r['from']]['relations'] and r in by_id[r['to']]['relations']
    if r['vintage']:
        assert r['vintage'] in range(1900,2100)
for e in records:
    if e['kind']=='wine':
        assert len([r for r in e['relations'] if r['kind']=='wine' and r['to']==e['id']]) == 1, e['name']
    if e['kind']=='vintage':
        assert len([r for r in e['relations'] if r['kind']=='vintage' and r['to']==e['id']]) == 1, e['name']
for id in ['cn-prod-065','cn-prod-066','cn-prod-067','cn-prod-061']:
    assert by_id[id]['status']=='签约／建设中'
for id in ['cn-prod-050','cn-prod-049','cn-prod-048']:
    assert by_id[id]['status']=='当前状态待核'
for id in ['cn-p-006','cn-prod-033','cn-prod-034','cn-prod-051','cn-prod-052','cn-prod-053','cn-prod-037','cn-prod-054']:
    assert by_id[id]['kind']=='producer'
assert '宁夏' in by_id['cn-prod-057']['areas']
assert '山东' in by_id['cn-prod-055']['areas']
assert '烟台' in by_id['cn-prod-055']['properties']['所在地'] and '云南德钦' in by_id['cn-prod-055']['properties']['所在地']
for edit in audit['wineDisplayEdits']:
    assert by_notion[edit['notionId']]['properties'][edit['field']] == edit['displayValue']
assert by_id['cn-v-005']['properties']['品种与比例'].startswith('72%')
assert '72%' not in by_id['cn-w-005']['properties']['常用品种／风格']
for im in images:
    assert im['src'].startswith('/media/china/')
    with Image.open(ROOT/'public'/im['src'].lstrip('/')) as image:
        assert image.size == (im['width'],im['height'])
        image.verify()
    for field,kind in [('producerNotionIds','producer'),('wineNotionIds','wine'),('vintageNotionIds','vintage')]:
        for id in im[field]:
            assert by_notion[id]['kind']==kind
            if kind=='vintage':
                assert by_notion[id]['properties']['年份'] in im['depictedYears']
assert not any(by_id['cn-v-005']['notionId'] in im['vintageNotionIds'] for im in images)

# Every pre-existing data asset, DB schema and API route must remain byte-identical.
baseline = '28928060a98d929d26c261177097447bec15764b'
existing = subprocess.check_output(['git','ls-tree','-r','--name-only',baseline,'data','db','app/api'],cwd=ROOT,text=True).splitlines()
for path in existing:
    original = subprocess.check_output(['git','show',f'{baseline}:{path}'],cwd=ROOT)
    assert (ROOT/path).read_bytes() == original, 'Unrelated data modified: '+path
report = {'passed':True,'baselineCommit':baseline,'counts':data['counts'],'images':len(images),'priorityQueries':len(priority),'bidirectionalEdges':len(data['relations']),'unchangedExistingDataAndApiFiles':len(existing),'separateWineAndVintage':True,'imageVintageMatches':True,'noDatabaseWrites':True}
(ROOT/'research/china-yunnan-20261029/data-qa.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False))
