"""Import source-backed Spain research without replacing existing country dossiers."""
import json,re,unicodedata,copy,pathlib,subprocess
ROOT=pathlib.Path(__file__).resolve().parents[2]
DATA=ROOT/'data'; BASE=ROOT/'.sites-runtime/spain-base'; BASE.mkdir(parents=True,exist_ok=True)
FILES=['grape-varieties','grape-reference-translations','grape-wines','producers','wine-library','grape-coverage','wine-profiles']
for f in FILES:
 p=BASE/(f+'.json')
 if not p.exists():p.write_bytes((DATA/(f+'.json')).read_bytes())
def read(name):return json.loads((BASE/(name+'.json')).read_text())
def write(name,obj): (DATA/(name+'.json')).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
def norm(s):return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',str(s)).encode('ascii','ignore').decode().lower())
def slug(s):return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',str(s)).encode('ascii','ignore').decode().lower()).strip('-')
def unique(xs):return list(dict.fromkeys(x for x in xs if x))
def text(v):return '；'.join(str(x) for x in v) if isinstance(v,list) else str(v or '')
def merge_entity(a,b):
 for k,v in b.items():
  if isinstance(v,list):
   old=a.setdefault(k,[])
   for item in v:
    if item not in old:old.append(copy.deepcopy(item))
  elif not a.get(k):a[k]=copy.deepcopy(v)
 return a
grapes=read('grape-varieties');translations=read('grape-reference-translations');raw_wines=read('grape-wines');native_producers=read('producers');library=read('wine-library');coverage=read('grape-coverage');dossiers=read('wine-profiles')
gmap={g['id']:g for g in grapes};tmap={t['id']:t for t in translations}
sources=[];source_by_url={}
def source_id(s,prefix=''):
 url=s['url'];known=source_by_url.get(url)
 if known:return known
 sid='es-'+slug(prefix+'-'+str(s.get('id') or s.get('title') or len(sources)))
 if any(x['id']==sid for x in sources):sid+='-'+str(len(sources))
 sources.append({**s,'id':sid});source_by_url[url]=sid;return sid
packs=[]
def remap_sources(value,mapping):
 if isinstance(value,dict):
  for key,item in value.items():
   if key=='sourceIds':
    missing=[sid for sid in item if sid not in mapping]
    if missing:raise ValueError('Unresolved pack sources: '+str(missing))
    value[key]=[mapping[sid] for sid in item]
   else:remap_sources(item,mapping)
 elif isinstance(value,list):
  for item in value:remap_sources(item,mapping)
for filename in ['northwest','northeast','south-islands']+sorted(p.stem for p in (DATA/'spain').glob('gap-*.json'))+sorted(p.stem for p in (DATA/'spain').glob('review-*.json')):
 p=DATA/'spain'/(filename+'.json')
 if not p.exists():raise FileNotFoundError(p)
 b=json.loads(p.read_text());sm={s['id']:source_id(s,filename) for s in b['sources']}
 remap_sources(b,sm)
 packs.append(b)
def source_note(s):
 kind=s.get('kind','archive')
 if kind=='official':return '产区管理机构或生产者原文；具体数据按所列年份理解。'
 if kind in ['importer','primary-trade']:return '生产者授权进口商或行业一手资料；具体数据按所列年份理解。'
 if kind in ['producer-registry','producer-submitted']:return '生产者登记或提交的资料；按原页范围与日期理解。'
 if kind=='reference':return '此前已收录的年份档案来源，保留对应年份语境。'
 return '既有学习笔记；保留历史背景，时效性事实按所列补充来源核对。'
def sourced(ids):return [dict(title=s['title'],url=s['url'],note=source_note(s)) for s in sources if s['id'] in ids]
def source_urls(ids):return {s['url'] for s in sources if s['id'] in ids}
def find_grape(record):
 if record.get('id') in gmap:return record['id']
 key=norm(record.get('name',''))
 matches=[g['id'] for g in grapes if norm(g['name'])==key]
 if len(matches)==1:return matches[0]
 matches=[g['id'] for g in grapes if any(norm(a['name'])==key for a in g['aliases'])]
 return matches[0] if len(matches)==1 else None
canonical_staged_ids={'malvasia-de-sitges':'malvasia-aromatica','picapoll-blanco':'picapoll-blanc','picapoll-negro':'picapoll-negre','macabeo':'viura','bonicaire':'trepat'}
gids=dict(canonical_staged_ids);network_grapes={};staged_regions={};staged_producers={};staged_wines=[];corrections=[];gaps=[]
for b in packs:
 for g in b.get('grapes',[]):
  gid=canonical_staged_ids.get(g['id']) or find_grape(g) or g['id'];gids[g['id']]=gid;gids[slug(g['name'])]=gid
  item=copy.deepcopy(g);item['id']=gid
  item['aliases']=[x['name'] if isinstance(x,dict) else x for x in item.get('aliases',[])]
  if g['id']=='malvasia-de-sitges':
   item['name']='Malvasía Aromática';item['aliases']=unique(item['aliases']+['Malvasia de Sitges'])
  if g['id']=='rojal':
   item['name']='Rojal Tinta'
   item['confusions']=item.get('confusions',[])+['红葡萄 Rojal Tinta 与白葡萄 Alarije 的地方别名 Rojal 是同名歧义，不合并。']
   item.setdefault('en',{})['confusions']='Red Rojal Tinta must not be merged with the white variety Alarije, which is also called Rojal in some regional classifications.'
  item['color']=item.get('color','Red').lower()
  item['signature']=item.get('signature',[]);item['confusions']=item.get('confusions',[])
  if isinstance(item['confusions'],str):item['confusions']=[item['confusions']]
  if gid in network_grapes:merge_entity(network_grapes[gid],item)
  else:network_grapes[gid]=item
 for r in b.get('regions',[]):
  if r['id'] in staged_regions:merge_entity(staged_regions[r['id']],r)
  else:staged_regions[r['id']]=copy.deepcopy(r)
 for p in b['producers']:
  if p['id'] in staged_producers:merge_entity(staged_producers[p['id']],p)
  else:staged_producers[p['id']]=copy.deepcopy(p)
 staged_wines.extend(copy.deepcopy(b['wines']));corrections.extend(b.get('corrections',[]));gaps.extend(b.get('gaps',[]))

# Reviewed amendments are explicit; regular additions never silently replace a richer record.
for b in packs:
 for category,updates in b.get('updates',{}).items():
  records={'grapes':network_grapes,'regions':staged_regions,'producers':staged_producers}.get(category)
  for update in updates:
   targets=[w for w in staged_wines if w['id']==update['id']] if category=='wines' else [records.get(gids.get(update['id'],update['id'])) if category=='grapes' else records.get(update['id'])]
   if not targets or targets[0] is None:raise ValueError('Review update has no target: '+category+' '+update['id'])
   for target in targets:
    for key,value in update.items():
     if key=='id':continue
     if key in ['sourceIds','regionIds','producerIds','wineIds','relatedProducerIds','sections','studySections','sourceStudies','aliases']:
      current=target.setdefault(key,[])
      for item in value:
       if item not in current:current.append(copy.deepcopy(item))
     else:target[key]=copy.deepcopy(value)

# Keep traditional PDO terms and DO subcategories distinct from DO and organisations.
for r in staged_regions.values():
 if r['id'] in ['valles-de-benavente','valtiendas','sierra-de-salamanca']:
  r['kind']='DOP';r['traditionalTerm']='Vino de Calidad'
 if r['id']=='classic-penedes':r['kind']='DO-subcategory'
 if r['parent'] in ['Penedès','penedes']:r['parent']='Catalunya'
 if r['parent']=='rioja' or r['id']=='rioja':r['parent']='Rioja'
 if r['id']=='navarra':r['parent']='Navarra'
 if r['id']=='catalunya':r['parent']='Catalunya'
 if r['id']=='cava':r['parent']='跨地区 · Cava'
 if r['parent'] in ['Tenerife / Islas Canarias','Islas Canarias'] or r['id']=='islas-canarias':r['parent']='Canarias'
 if r['parent']=='Central Spain':r['parent']='中央山地 · Gredos'

# Connect previously published Spanish vintage references to the expanded graph.
# Their existing bilingual pages and vintage-specific composition remain authoritative.
prior_references={
 'do-ferreiro-albarino':('do-ferreiro','rias-baixas','Albariño 2024','Val do Salnés, Rías Baixas'),
 'toro-albala-don-px-seleccion-1980':('toro-albala','montilla-moriles','Don PX Selección 1980','Montilla-Moriles'),
 'belondrade-y-lurton':('belondrade','rueda','Belondrade y Lurton 2024','La Seca, Rueda'),
 'emilio-rojo-2022':('vina-mein-emilio-rojo','ribeiro','Emilio Rojo 2022','Ibedo / Valle del Avia, Ribeiro'),
 'descendientes-palacios-petalos':('descendientes-j-palacios','bierzo','Pétalos 2021','Bierzo'),
 'montrubi-gaintus-radical-2021':('montrubi','penedes','Gaintus Radical 2021','Penedès'),
 'ponce-buena-pinta-2022':('ponce','manchuela','Buena Pinta 2022','Manchuela')}
for w in raw_wines:
 if w['id'] not in prior_references:continue
 pid,rid,display,location=prior_references[w['id']]
 sids=[source_id({**s,'id':w['id']+'-'+str(i),'kind':'reference','checkedAt':w.get('reviewed')},'existing') for i,s in enumerate(w['sources'])]
 grape_ids=unique([find_grape({'name':name}) for name in w['grapeNames']])
 staged_wines.append({'id':w['id'],'name':display,'producerId':pid,'regionId':rid,'denomination':w['region'],'grapeIds':grape_ids,'grapeText':w['composition'],'style':w['style'],'notes':w['description'],'status':'archive','sourceIds':sids,'verification':'previous-reference','vintage':w.get('vintage'),'referenceWineId':w['id']})
 if pid not in staged_producers:
  staged_producers[pid]={'id':pid,'name':w['producer'],'regionIds':[rid],'location':location,'story':'从 '+display+' 的既有年份资料认识 '+w['producer']+'：'+w['description'],'wineIds':[],'sourceIds':sids,'verification':'previous-reference','website':w['officialUrl']}

# Legal permit names remain an independently auditable layer, never a DNA assertion.
official={'id':'boe-2026-classification','title':'BOE · RD 684/2026 · Anexo XXI · 17 个自治区酿酒葡萄许可名录','url':'https://www.boe.es/boe/dias/2026/08/27/pdfs/BOE-A-2026-18205.pdf','kind':'official','checkedAt':'2026-10-26'}
official_id=source_id(official,'national')
rows=json.loads((DATA/'spain/official-classification-2026.json').read_text())
comm_names={
'Comunidad Autónoma de Andalucía':'Andalucía','Comunidad Autónoma de Aragón':'Aragón','Comunidad Autónoma del Principado de Asturias':'Asturias','Comunidad Autónoma de las Illes Balears':'Illes Balears','Comunidad Autónoma de Canarias':'Canarias','Comunidad Autónoma de Cantabria':'Cantabria','Comunidad Autónoma de Castilla-La Mancha':'Castilla-La Mancha','Comunidad Autónoma de Castilla y León':'Castilla y León','Comunidad de Castilla y León':'Castilla y León','Comunidad Autónoma de Cataluña':'Catalunya','Comunidad Autónoma de Extremadura':'Extremadura','Comunidad Autónoma de Galicia':'Galicia','Comunidad de Madrid':'Madrid','Comunidad Autónoma de la Región de Murcia':'Murcia','Comunidad Foral de Navarra':'Navarra','Comunidad Autónoma del País Vasco':'País Vasco','Comunidad Autónoma de La Rioja':'La Rioja','Comunitat Valenciana':'Comunitat Valenciana'}
explicit={
'agudelo':'chenin-blanc','blauerlimberger':'blaufrankisch','garnachatinta':'garnacha-tinta','garnachablanca':'garnacha-blanca','garnacharoja':'grenache-gris','garnachatintorera':'alicante-bouschet','mazuela':'carignan','carinenablanca':'carignan-blanc','carinenagris':'carignan-gris','hondarrabizuri':'hondarrabi-zuri','meren zao':'trousseau','merenzao':'trousseau','maturanatinta':'maturana-tinta','loureira':'loureiro','macabeo':'viura','monastrell':'monastrell','moscateldealejandria':'muscat-of-alexandria','moscateldegranomenudo':'muscat-blanc-a-petits-grains','palominofino':'palomino','listanblancodecanarias':'palomino','tintilladerota':'graciano','sumolltinto':'sumoll','bermejuela':'marmajuelo','moll':'prensal-blanc','gual':'malvasia-fina','rojaltinta':'rojal','albillodorado':'albilla-dorada','ratinogallega':'ratino','rufeteserranoblanco':'rufete-blanco','souson':'vinhao','vijariegonegro':'sumoll','xarellorosado':'xarello-vermell','malvasiaaromatica':'malvasia-aromatica','malvasiadesitges':'malvasia-aromatica','picapollblanco':'picapoll-blanc','picapolltinto':'picapoll-negre','picapollnegro':'picapoll-negre','verdello':'verdelho','incrociomanzoni':'manzoni-bianco','garro':'mando','plantafinadepedralba':'mayorquin'}
ambiguous={'bastardonegro','torrontes'}
# VIVC 12633 identifies Bonicaire as Trepat. Preserve both legal labels in the
# raw classification rows while linking them to one cultivar dossier.
explicit['bonicaire']='trepat'
catalogue=[];comm_records={}
for record in rows:
 primary=record['names'][0].rstrip('.');key=norm(primary)
 names=[x.rstrip('.') for x in record['names']]
 community=comm_names.get(record['community'],re.sub(r'^Comunidad Autónoma (de |del |de las )','',record['community']))
 rid='es-community-'+slug(community)
 target=explicit.get(key)
 if target and target not in gmap and target not in network_grapes:target=None
 if key in ambiguous:target='es-catalogue-'+slug(primary)
 if not target:
  target=next((id for id,g in network_grapes.items() if norm(g['name'])==key),None) or find_grape({'name':primary})
 if not target:
  matches=unique([id for name in names[1:] for id,g in network_grapes.items() if norm(g['name'])==norm(name)])
  target=matches[0] if len(matches)==1 else None
 if not target:target=slug(primary)
 native=gmap.get(target);study=network_grapes.get(target)
 if not study:
  study={'id':target,'name':native['name'] if native else primary,'color':native['color'] if native else ('white' if record['code']=='B' else 'red'),'aliases':[],'regionIds':[],'summary':native['summary'] if native else f'{primary} 见于西班牙 2026 年自治区酿酒葡萄分类名录。本条确认法定名称和许可范围；不据名称推断起源、亲缘或酒款配方。','signature':[],'confusions':[],'sourceIds':[official_id],'verification':'classification-only'}
  network_grapes[target]=study
 study['sourceIds']=unique(study['sourceIds']+[official_id]);study['regionIds']=unique(study.get('regionIds',[])+[rid])
 study.setdefault('classificationNames',[])
 for name in names:
  if name not in study['classificationNames']:study['classificationNames'].append(name)
 if target=='es-catalogue-bastardo-negro':
  study['confusions']=unique(study['confusions']+['Bastardo Negro 在各地使用存在歧义；官方名录的同列名称不自动证明与 Trousseau、Alfrocheiro 或 Tinta Negra 的遗传同一性。按自治区和原标签核对。'])
 if target=='es-catalogue-torrontes':
  study['confusions']=unique(study['confusions']+['西班牙多个自治区的法定名称 Torrontés 不自动等于阿根廷 Torrontés Riojano；地区品种材料的身份需分别核实。'])
 if rid not in comm_records:
  comm_records[rid]={'id':rid,'name':community,'kind':'autonomous-community','parent':'Spain · Autonomías','grapeIds':[],'overview':f'{community} 自治区级酿酒葡萄种植许可索引。以 2026 年 8 月 27 日 BOE 公布的 Anexo XXI 为依据，供检查少见品种与法定名称使用。','climate':'此页覆盖自治区的行政许可范围；同一自治区内部存在多个不同气候与海拔带，具体风土见下级产区专题。','soils':'自治区不是单一风土单元；不将其中某一 DO 的土壤推广到全区。','subregions':[],'regulations':['自治区许可不等于已在所有下级 DO / IGP 中获准使用。','名录同列名称按法律原文保留；分子亲缘与同义名结论需要独立品种学证据。','红／白标记沿用名录；灰色或粉红果皮优先保留既有品种档案的颜色。'],'producerIds':[],'sourceIds':[official_id],'verification':'official','scope':'classification'}
 comm_records[rid]['grapeIds']=unique(comm_records[rid]['grapeIds']+[target])
 catalogue.append({**record,'communityName':community,'communityId':rid,'grapeId':target})
staged_regions.update(comm_records)

# Materialise native grape dossiers, preserving richer earlier dossiers.
for gid,g in network_grapes.items():
 g['regionIds']=unique(g.get('regionIds',[]));g['sourceIds']=unique(g['sourceIds']);g['aliases']=unique(g.get('aliases',[]))
 if gid not in gmap:
  en=g.get('en',{});known=g.get('verification')!='classification-only'
  origin=g.get('origin') or (f'西班牙 {g["name"]} 的品种记录；现有资料可确认其地区关联，具体起源未独立核实。')
  gen=g.get('genetics') or {'type':'unknown','parents':[],'note':'本轮未获得足以确认亲本组合的证据。'}
  if gen.get('type') not in ['unknown','mutation','bred-cross','natural-cross']:gen['type']='unknown'
  ng={'id':gid,'name':g['name'],'zh':g.get('zh') or g['name'],'color':g['color'].lower(),'countries':['Spain'],'origin':origin,'summary':g['summary'],'viticulture':g.get('viticulture') or '本轮依据产区与品种名录建立关联，尚未核实该品种的物候、产量与病害敏感度。','winemaking':g.get('winemaking') or '酿酒用途见关联产区与酒款；未从自治区级许可推断具体 DO 生产规范。','taste':g.get('taste') or text(g.get('signature')) or '暂无可靠的独立品种感官描述；不以混酿酒的风味反推单一品种特征。','confusions':text(g.get('confusions')) or '同名、同列法定名称与遗传同一性分别核对。','aliases':[{'name':n,'context':'西班牙地区使用名称；具体地域与辨析见本档案。'} for n in g['aliases'] if norm(n)!=norm(g['name'])],'regions':[],'genetics':gen,'sources':sourced(g['sourceIds']),'reviewed':'2026-10-26','editorialBatch':'spain-2026','contentStatus':g.get('verification','archive')}
  if g.get('imageUrl'):ng.update({k:g[k] for k in ['imageUrl','imageCredit','imageSourceUrl'] if k in g})
  gmap[gid]=ng;grapes.append(ng)
  et={'id':gid,'summary':en.get('summary') or f'{g["name"]} is recorded in the Spanish wine-grape classification or regional sources. This entry documents the name and regional links; sensory and genetic details require separate evidence.','origin':en.get('origin') or 'Documented in Spanish regional sources. Classification does not establish a variety’s geographical origin.','viticulture':en.get('viticulture') or 'Phenology, yield and disease susceptibility have not been independently established in this record.','winemaking':en.get('winemaking') or 'Wine uses are documented through the linked regions and cuvées; regional planting permission is not a PDO production rule.','taste':en.get('taste') or 'No independently verified varietal sensory description is included. Blended-wine notes are not assigned to a single component grape.','geneticsNote':en.get('geneticsNote') or 'Parentage has not been independently verified for this entry.','confusions':en.get('confusions') or 'Legal names, local homonyms and molecular identity must be distinguished.','aliases':en.get('aliases') or [{'name':a['name'],'context':'Regional name; consult the source and locality before treating similarly named grapes as identical.'} for a in ng['aliases']],'regions':[],'species':en.get('species') or ('Classification record; species not independently verified' if not known else 'Vitis vinifera'),'originCountry':en.get('originCountry','')}
  tmap[gid]=et;translations.append(et)
 ng=gmap[gid];et=tmap.get(gid)
 if g.get('classificationNames'):ng['classificationNames']=unique(g['classificationNames'])
 if g.get('sourceStudies'):
  ng['sourceStudies']=[{**study,'sources':sourced(study.get('sourceIds',[]))} for study in g['sourceStudies']]
 if 'Spain' not in ng['countries']:ng['countries'].append('Spain')
 for alias in g.get('aliases',[]):
  if norm(alias)!=norm(ng['name']) and not any(norm(a['name'])==norm(alias) for a in ng['aliases']):
   ng['aliases'].append({'name':alias,'context':'西班牙地区名称；对应语境与来源见本轮西班牙关联资料。'})
   if et:et['aliases'].append({'name':alias,'context':'Regional Spanish name; use the linked sources for its local context.'})
 for source in sourced(g['sourceIds']):
  if not any(s['url']==source['url'] for s in ng['sources']):ng['sources'].append(source)
 for rid in g['regionIds']:
  r=staged_regions.get(rid)
  if not r:continue
  if not any(x['name']==r['name'] and x['country']=='Spain' for x in ng['regions']):
   classification=r['kind']=='autonomous-community'
   note=('自治区级种植许可；不能直接视为任何 DO / IGP 的获准品种。' if classification else '西班牙区域资料关联；详见产区中的品种角色、Producer 和酒款。')
   ng['regions'].append({'name':r['name'],'country':'Spain','note':note,'associationType':'classification' if classification else 'regional'})
   if et:et['regions'].append({'name':r['name'],'note':'Autonomous-community planting permission, not a PDO or PGI grape authorisation.' if classification else 'Regional reference; open the linked dossier for grape roles, producers and wines.'})

def resolve_gid(value):
 if value in gids:return gids[value]
 if value in gmap:return value
 matched=find_grape({'name':value.replace('-',' ')})
 if matched:return matched
 raise ValueError('Unresolved grape '+value)
for r in staged_regions.values():
 r['grapeIds']=unique([resolve_gid(x) for x in r.get('grapeIds',[])])
 for key,default in [('climate',''),('soils',''),('subregions',[]),('regulations',[]),('producerIds',[]),('sourceIds',[]),('parent','Spain')]:r.setdefault(key,default)
 for gid in r['grapeIds']:
  if gid not in network_grapes:
   ng=gmap[gid];network_grapes[gid]={'id':gid,'name':ng['name'],'color':ng['color'],'aliases':[a['name'] for a in ng['aliases']],'regionIds':[],'summary':ng['summary'],'signature':[],'confusions':[ng['confusions']],'sourceIds':r['sourceIds'],'verification':'archive'}
  network_grapes[gid]['regionIds']=unique(network_grapes[gid].get('regionIds',[])+[r['id']])

# Existing producer and wine identities take priority over new import spellings.
native_pm={p['id']:p for p in native_producers['producers']};pids={};new_pm={}
for pid,p in staged_producers.items():
 match=next((o['id'] for o in native_pm.values() if norm(o['name'])==norm(p['name'])),None)
 canonical=match or pid;pids[pid]=canonical;p['id']=canonical
 if canonical in new_pm:merge_entity(new_pm[canonical],p)
 else:new_pm[canonical]=p
wine_keys={};dossier_alias={}
for w in dossiers['profiles']:
 for a in w.get('aliases',[]):dossier_alias[a]=w['id']
 for p in native_producers['producers']:
  if norm(p['name'])==norm(w['producer']):wine_keys[(p['id'],norm(w['name']))]=w['id']
for p in native_producers['producers']:
 for w in p['wines']:wine_keys.setdefault((p['id'],norm(w['name'])),dossier_alias.get(w['id'],w['id']))
for w in raw_wines:
 p=next((p for p in new_pm.values() if norm(p['name'])==norm(w['producer'])),None)
 if p:wine_keys.setdefault((p['id'],norm(w['name'])),dossier_alias.get(w['id'],w['id']))
wids={};wmap={}
for w in staged_wines:
 old=w['id'];w['producerId']=pids.get(w['producerId'],w['producerId']);key=(w['producerId'],norm(w['name']))
 w['id']=wine_keys.get(key,old);wine_keys[key]=w['id'];wids[old]=w['id'];w['grapeIds']=unique([resolve_gid(g) for g in w.get('grapeIds',[])])
 w['sourceIds']=unique(w['sourceIds'])
 if w['id'] in wmap:merge_entity(wmap[w['id']],w)
 else:wmap[w['id']]=w
reference_wines={wid:wid for wid in prior_references}
gravonia=next((w for w in raw_wines if w['id']=='lopez-heredia-vina-gravonia'),None)
gravonia_id='lopez-de-heredia-vina-gravonia-crianza'
if gravonia and gravonia_id in wmap:
 reference_wines[gravonia_id]=gravonia['id']
 gravonia.update({'libraryWineId':gravonia_id,'producerId':'lopez-de-heredia','regionId':'rioja'})
for p in new_pm.values():p['wineIds']=unique([w['id'] for w in wmap.values() if w['producerId']==p['id']]);p['regionIds']=unique(p.get('regionIds',[])+[w['regionId'] for w in wmap.values() if w['producerId']==p['id']])
for r in staged_regions.values():
 r['producerIds']=unique([pids.get(p,p) for p in r['producerIds']]+[p['id'] for p in new_pm.values() if r['id'] in p['regionIds']])
 for w in wmap.values():
  if w['regionId']==r['id']:r['grapeIds']=unique(r['grapeIds']+w['grapeIds'])
for w in wmap.values():
 if w['producerId'] not in new_pm:raise ValueError('Unknown producer '+w['producerId'])
 if w['regionId'] not in staged_regions:raise ValueError('Unknown region '+w['regionId']+' '+w['name'])
 for gid in w['grapeIds']:
  if gid in network_grapes:network_grapes[gid]['regionIds']=unique(network_grapes[gid]['regionIds']+[w['regionId']])

def official_url(ids):
 for kind in ['official','producer-submitted','importer','primary-trade','producer-registry']:
  url=next((s['url'] for s in sources if s['id'] in ids and s.get('kind')==kind),None)
  if url:return url
 return None
for p in new_pm.values():
 real_regions=[staged_regions[r]['name'] for r in p['regionIds'] if r in staged_regions]
 producer_source=official_url(p['sourceIds'])
 p.setdefault('website',producer_source or next((s['url'] for s in sources if s['id'] in p['sourceIds']),''))
 nw=[]
 for wid in p['wineIds']:
  w=wmap[wid];source=official_url(w['sourceIds']) or p['website'];region=staged_regions[w['regionId']]
  item={'id':w['id'],'name':w['name'],'place':w.get('place') or region['name'],'grape':w['grapeText'],'method':w.get('method') or w['style'],'detail':w['notes'],'sourceIds':w['sourceIds'],'status':{'current':'现行系列','historic':'历史酒款','label-dependent':'产区标示依年份／批次','archive':'原笔记收录；当期系列待复核'}.get(w.get('status'),w.get('status','原笔记收录')),'vintageScope':w.get('vintageScope') or '本条配比、熟成和产区标示按所列来源及年份理解；年份技术表不自动适用于其他年份或批次。','grapeIds':w['grapeIds'],'regionId':w['regionId'],'denomination':w['denomination'],'verification':w.get('verification','archive')}
  nw.append(item)
  raw={'id':w['id'],'libraryWineId':w['id'],'name':w['name'],'producer':p['name'],'producerId':p['id'],'grapeNames':[gmap[g]['name'] for g in w['grapeIds']],'country':'Spain','region':w['denomination'] or region['name'],'regionId':w['regionId'],'description':w['notes'],'composition':w['grapeText'],'style':w['style'],'serving':'按具体酒款类型、年份与瓶况选择温度与醒酒时间；本页未把通用建议当作酒庄技术参数。','vintage':None,'officialUrl':source,'sourceTitle':'资料与原文','imageUrl':'','sources':sourced(w['sourceIds']),'reviewed':'2026-10-26','verification':w.get('verification','archive')}
  existing=next((o for o in raw_wines if dossier_alias.get(o['id'],o['id'])==w['id'] or (norm(o['producer'])==norm(p['name']) and norm(o['name'])==norm(w['name']))),None)
  if existing:
   existing.update({'libraryWineId':w['id'],'producerId':p['id'],'regionId':w['regionId']})
  else:raw_wines.append(raw)
 if p['id'] in native_pm:
  native=native_pm[p['id']];native['regionIds']=unique(native.get('regionIds',[])+p['regionIds'])
  native['aliases']=unique(native.get('aliases',[])+p.get('aliases',[]))
  native['relatedProducerIds']=unique(native.get('relatedProducerIds',[])+[pids.get(pid,pid) for pid in p.get('relatedProducerIds',[])])
  for section in p.get('sections',[]):
   if not any(s.get('text')==section['text'] for s in native['sections']):native['sections'].append(copy.deepcopy(section))
  for w in nw:
   old=next((a for a in native['wines'] if a['id']==w['id'] or norm(a['name'])==norm(w['name'])),None)
   if old:old.update({'grapeIds':w['grapeIds'],'regionId':w['regionId'],'denomination':w['denomination']})
   else:native['wines'].append(w)
 else:
  native={'id':p['id'],'name':p['name'],'country':'Spain','region':staged_regions[p['regionIds'][0]]['parent'] if p['regionIds'] else 'Spain','regionIds':p['regionIds'],'appellation':' / '.join(real_regions),'village':p['location'],'website':p['website'],'intro':p['story'],'scope':f'本轮关联 {len(nw)} 款酒。按实际酒款产区整理；历年停产款与全部批次不标称穷尽。','relatedProducerIds':[],'newsIds':[],'sections':[{'title':'人物、土地与风格','text':p['story'],'sourceIds':p['sourceIds']},{'title':'产区与酒款脉络','text':' / '.join(real_regions)+'。酒款卡片分别保留品种、标示产区与系列定位，具体配比不跨年份套用。','sourceIds':p['sourceIds']}],'wines':nw,'questions':[],'gaps':['年份配比、限量批次、现货及售价按具体酒款原文另行核实。']}
  if p.get('sections'):native['sections']=copy.deepcopy(p['sections'])
  native['aliases']=p.get('aliases',[])
  native['relatedProducerIds']=[pids.get(pid,pid) for pid in p.get('relatedProducerIds',[])]
  native_producers['producers'].append(native);native_pm[p['id']]=native
for source in sources:
 if not any(s['id']==source['id'] for s in native_producers['sources']):native_producers['sources'].append({**source,'type':source.get('kind','archive')})
native_producers['checkedAt']='2026-10-26'
# One canonical product link; retain earlier bilingual / illustrated references.
raw_by_canonical={}
for w in raw_wines:
 key=w.get('libraryWineId') or w['id']
 previous=raw_by_canonical.get(key)
 if not previous or (w.get('en') and not previous.get('en')):raw_by_canonical[key]=w
raw_wines=list(raw_by_canonical.values())
for r in staged_regions.values():
 if r['kind']=='autonomous-community':continue
 new={'id':r['id'],'name':r['name'],'area':'Spain · '+r['parent'],'intro':r['overview'],'facts':[['产区类别',r['kind']],['区域',r['parent']]],'sections':[{'title':'风土','text':r['climate']+' '+r['soils'],'sourceIds':r['sourceIds']}],'grapeIds':r['grapeIds'],'producerIds':r['producerIds'],'regionIds':[],'wineIds':[w['id'] for w in wmap.values() if w['regionId']==r['id']],'questions':[],'sourceIds':r['sourceIds'],'image':'','imageAlt':''}
 old=next((x for x in library['regions'] if x['id']==r['id']),None)
 if old:
  for key in ['grapeIds','producerIds','wineIds','sourceIds']:old[key]=unique(old.get(key,[])+new[key])
 else:library['regions'].append(new)
for s in sources:
 if not any(a['id']==s['id'] for a in library['sources']):library['sources'].append(s)
library['updatedAt']='2026-10-26'
# Attach regional edges back to native dossiers after resolving all IDs.
for gid,study in network_grapes.items():
 native=gmap[gid];en=tmap.get(gid)
 study['regionIds']=unique(study['regionIds']+[r['id'] for r in staged_regions.values() if gid in r['grapeIds']])
 study['aliases']=unique([a['name'] for a in native['aliases']]+study['aliases'])
 for rid in study['regionIds']:
  if rid not in staged_regions:raise ValueError('Unknown grape region '+rid+' '+gid)
  r=staged_regions[rid]
  if not any(v['name']==r['name'] and v['country']=='Spain' for v in native['regions']):
   native['regions'].append({'name':r['name'],'country':'Spain','note':'西班牙区域关联：详见产区、Producer 与酒款。'})
   if en:en['regions'].append({'name':r['name'],'note':'Spanish regional association; see the linked region, producer and wine records.'})

question_file=DATA/'spain/questions.json';questions=json.loads(question_file.read_text()) if question_file.exists() else []
# Question source IDs refer to region IDs so editorial revisions keep citations aligned.
question_producers={'022':'lopez-de-heredia','023':'marques-de-murrieta','024':'la-rioja-alta','028':'vega-sicilia','030':'pintia','031':'descendientes-j-palacios','032':'rafael-palacios','036':'alvaro-palacios','037':'clos-i-terrasses','043':'juve-camps'}
for q in questions:
 q['sourceIds']=unique([sid for rid in q.get('regionIds',[]) for sid in staged_regions.get(rid,{}).get('sourceIds',[])]+new_pm.get(question_producers.get(q['id'][-3:]),{}).get('sourceIds',[]))
gap_details=[g for g in gaps if isinstance(g,dict)]
gaps=[g for g in gaps if isinstance(g,str) and not any(g.startswith(prefix) for prefix in ['Galicia 的 Barbanza e Iria','Bajo Aragón 与 Ribera del Gállego','地区总览已覆盖本分工','Sierra de Salamanca、Valtiendas','外部关联 rue'])]
missing_producers=[r['name'] for r in staged_regions.values() if r['kind']!='autonomous-community' and not r['producerIds']]
if missing_producers:gaps.append('以下产区已有背景与品种资料，尚未完成可靠的 Producer 与酒款关联：'+'、'.join(missing_producers)+'。')
gaps=[g.replace('Guímaro、Dominio do Bibei、Do Ferreiro、Forjas del Salnés、Valdesil、Raúl Pérez、Castro Ventosa、Belondrade、José Pariente 等重要生产者仍值得下一批独立官方酒款资料扩展；本批没有宣称生产者全集。','部分 Producer 的独立酒款与年份资料仍可继续扩充；当前目录不标称生产者全集。').replace('地区 grapeIds','产区中的葡萄关联').replace('grapeIds 留空','品种构成暂留待核实') for g in gaps]
out={'updatedAt':'2026-10-26','grapes':sorted(network_grapes.values(),key=lambda x:norm(x['name'])),'regions':list(staged_regions.values()),'producers':sorted(new_pm.values(),key=lambda x:norm(x['name'])),'wines':list(wmap.values()),'sources':sources,'questions':questions,'corrections':corrections,'gaps':unique(gaps),'gapDetails':gap_details}
out['coverage']={'grapeRecords':len(network_grapes),'classificationOnlyGrapes':sum(x.get('verification')=='classification-only' for x in network_grapes.values()),'regionRecords':len(staged_regions)-len(comm_records),'autonomousCommunityIndexes':len(comm_records),'producerRecords':len(new_pm),'wineRecords':len(wmap),'officialClassificationRows':len(catalogue),'sourceRecords':len(sources),'archiveOnlyWineRecords':sum(x.get('verification')!='official' for x in wmap.values()),'archiveStatusWines':sum(x.get('status')=='archive' for x in wmap.values()),'historicWines':sum(x.get('status')=='historic' for x in wmap.values()),'labelDependentWines':sum(x.get('status')=='label-dependent' for x in wmap.values())}
sidset={s['id'] for s in sources}
source_kinds={s['id']:s.get('kind','archive') for s in sources}
for gap in gap_details:
 assert all(sid in sidset for sid in gap.get('sourceIds',[])),('invalid gap source',gap.get('topic'))
out['coverage']['archiveOnlyWineRecords']=sum(bool(w['sourceIds']) and all(source_kinds[sid]=='archive' for sid in w['sourceIds']) for w in wmap.values())
out['coverage']['officiallySourcedWineRecords']=sum(any(source_kinds[sid]=='official' for sid in w['sourceIds']) for w in wmap.values())
for category in ['grapes','regions','producers','wines']:
 for record in out[category]:
  assert record['sourceIds'],(category,record['id'],'missing sources')
  assert all(x in sidset for x in record['sourceIds']),(category,record['id'],'invalid source')
  for key in ['sections','studySections','sourceStudies']:
   for section in record.get(key,[]):
    assert section.get('sourceIds'),(category,record['id'],key,'missing source')
    assert all(x in sidset for x in section['sourceIds']),(category,record['id'],key,'invalid source')
for r in out['regions']:
 assert all(p in new_pm for p in r['producerIds']),(r['id'],'invalid producer')
 assert all(g in network_grapes for g in r['grapeIds']),(r['id'],'invalid grape')
for p in out['producers']:
 assert all(pid in native_pm for pid in p.get('relatedProducerIds',[])),(p['id'],'invalid related producer')
write('spain-library',out)
write('spain-index',{'reviewed':'2026-10-26','counts':out['coverage'],'regions':[{k:r[k] for k in ['id','name','parent','kind','grapeIds']} for r in out['regions']],'grapes':[{'id':g['id'],'name':g['name'],'verification':g.get('verification')} for g in out['grapes']],'referenceWines':reference_wines})
write('spain-classification-source',{'source':official,'effective':'2026-08-27','checked':'2026-10-26','scope':'Autonomous-community planting permissions; not individual PDO/PGI rules or proof of genetic synonymy.','rows':catalogue})
grapes.sort(key=lambda x:norm(x['name']));translations.sort(key=lambda x:norm(x['id']))
write('grape-varieties',grapes);write('grape-reference-translations',translations);write('grape-wines',raw_wines);write('producers',native_producers);write('wine-library',library)
coverage.update({'reviewed':'2026-10-26','grapeDossiers':len(grapes),'aliasRecords':sum(len(g['aliases']) for g in grapes),'wineDossiers':len(raw_wines),'spain':out['coverage'],'globalCatalogueComplete':False,'perGrapeWineCoverageComplete':False})
coverage['bilingualReferenceProfiles']=len(translations)+len([g for g in grapes if g['id'] not in tmap and g['id']=='aligote']);coverage['uniformReferenceTemplateProfiles']=coverage['bilingualReferenceProfiles']
write('grape-coverage',coverage)
print(json.dumps(out['coverage'],ensure_ascii=False));print('Native total grapes:',len(grapes),'Native wines:',len(raw_wines))
