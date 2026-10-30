"""Merge separately researched batches, validating stable identities and retaining prior media.
Usage: python3 scripts/library/import-grapes.py <research-directory>
Run with complete, independently reviewed batches before publication.
"""
import json,sys,unicodedata
from pathlib import Path
root=Path(__file__).resolve().parents[2];source=Path(sys.argv[1]);records=[]
for batch in ['france','italy','iberia','world','extension','ancestors']:
 p=source/(batch+'.json')
 if not p.exists():
  print('Not yet available:',batch);continue
 for g in json.loads(p.read_text()):
  g['editorialBatch']=batch
  records.append(g)
def norm(s):return ''.join(c for c in unicodedata.normalize('NFD',s.lower()) if not unicodedata.combining(c))
ids=set();names=set()
for g in records:
 assert g['id'] not in ids, 'Duplicate id '+g['id'];ids.add(g['id'])
 assert norm(g['name']) not in names,'Duplicate canonical '+g['name'];names.add(norm(g['name']))
 g['countries']=list(dict.fromkeys({'USA':'United States','US':'United States','Czech Republic':'Czechia','Türkiye':'Turkey'}.get(x,x) for x in g['countries']))
 g['regions']=[dict(r,name=part.strip()) for r in g['regions'] for part in r['name'].split(' / ') if part.strip()]
 for r in g['regions']:
  r['country']={'USA':'United States','US':'United States','Czech Republic':'Czechia','Türkiye':'Turkey'}.get(r['country'],r['country'])
  if r['country'] not in g['countries']:g['countries'].append(r['country'])
 for key in ['name','zh','origin','summary','viticulture','winemaking','taste','confusions','sources','regions','genetics']:
  assert g.get(key), f'{g["id"]} missing {key}'
 assert g['color'] in ['white','red','pink'],g['id']
 if g.get('imageSource') and not g.get('imageSourceUrl'):g['imageSourceUrl']=g['imageSource']
 if 'image' in g and not g.get('imageUrl') and isinstance(g['image'],str) and g['image'].startswith('http'):g['imageUrl']=g['image']
 oldPhoto={'godello':'godello.png','loureiro':'loureira.png','treixadura':'treixadura.png','dona-blanca':'dona-branca.png'}.get(g['id'])
 if oldPhoto:g.update(imageUrl='/media/library/'+oldPhoto,imageCredit='D.O. Valdeorras',imageSourceUrl='https://dovaldeorras.gal/en/territorio/')
 if g['id']=='falanghina-beneventana':g['summary']='与内陆 Sannio 的复兴紧密相关，是 Falanghina 名称之下的独立遗传身份。Beneventana 与沿海 Flegrea 的区别，是认识这个名称的重要起点。'
 if g['id']=='falanghina-flegrea':g['summary']='Campi Flegrei 的传统白葡萄，以细致花果与清晰酸度见长。它与 Falanghina Beneventana 具有不同遗传身份，不能仅凭相同简称合并。'
 if g['id']=='terrantez':g['summary']='Madeira 珍稀品种，以细腻、复杂且有张力的陈年酒受到重视。它拥有独立的身份与风格，不能被笼统的 Malvasia 名称覆盖。'
 if g['id']=='godello':
  g['sources'].append({'title':'Plantgrape · Gouveio / Godello','url':'https://www.plantgrape.fr/en/varieties/fruit-varieties/465','note':'正式同义名、亲缘与栽培性状；Montpellier 遗传分析支持 Castellana blanc × Savagnin。'})
  g['genetics']={'type':'natural-cross','parents':['Castellana Blanca','Savagnin'],'note':'Plantgrape 根据 Montpellier 的遗传分析，记载其来源为 Castellana blanc × Savagnin；Godello 与 Gouveio 是正式同义名。这里指遗传亲本，不是酒液混酿。'}
records.sort(key=lambda g:norm(g['name']))
(root/'data/grape-varieties.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Imported',len(records),'canonical records')
