import json,pathlib,re
P=pathlib.Path(__file__).parent;D=P.parent.parent/'data';p=P/'france.json';d=json.load(open(p));R={x['id'][3:]:x for x in d['regions']};T=lambda a,b:{'en':a,'zh':b}
def wine(id,name,producer,url,en,zh):
 r=R[id]
 if not any(x['name']==name and x['producer']==producer for x in r['wines']):r['wines'].append(dict(name=name,producer=producer,url=url,note=T(en,zh)))
def src(id,key,title,url):
 r=R[id]
 if not any(x['id']==key for x in r['sources']):r['sources'].append(dict(id=key,title=title,url=url))
# Exact producer/cuvee references; root can link existing canonical bottles by precise identity.
wine('alsace','Sylvaner Grand Cru Zotzenberg','Boeckel','https://www.boeckel-alsace.com/sylvaner-grand-cru-zotzenberg-s24.html','Site-specific Sylvaner Grand Cru example.','特定地块 Sylvaner Grand Cru 实例。')
wine('alsace','Crémant d’Alsace Rosé','Louis Sipp','https://www.sipp.com/en/cremant-dalsace-rose-s99.html','Pinot Noir; dry traditional-method sparkling wine.','Pinot Noir；干型传统法起泡。')
wine('bourgogne','Bouzeron','Domaine de Villaine','https://www.de-villaine.com/en/wines/1/bouzeron','Village Aligoté reference, distinct from regional Bourgogne Aligoté.','村庄 Aligoté 参照，不同于大区 Bourgogne Aligoté。')
wine('bourgogne','Beaune Clos des Mouches Premier Cru Rouge','Joseph Drouhin','https://www.drouhin.com/en_US/wine/beaune-clos-des-mouches-premier-cru-rouge/2023','Pinot Noir red; source concerns 2023.','Pinot Noir 红；来源为 2023。')
wine('bourgogne','Morey-Saint-Denis Premier Cru Clos des Monts Luisants','Domaine Ponsot','https://domaine-ponsot.com/produit/morey-saint-denis-monts-luisants-en/','Aligoté reference in Côte de Nuits.','Côte de Nuits 的 Aligoté 参照。')
wine('rhone-valley','Condrieu','E. Guigal','https://www.guigal.com/en/wine/condrieu/','Viognier; northern Rhône white.','Viognier；北 Rhône 白。')
wine('rhone-valley','Châteauneuf-du-Pape Rouge','Château de Beaucastel','https://m.familleperrin.com/01LV0E','Southern Rhône red blend.','南 Rhône 红调配。')
wine('jura-franche-comte','Côtes du Jura Vin Jaune','Domaine Clavelin','https://www.clavelin.fr/vin/vin-jaune-cotes-du-jura','Savagnin, sous voile, 62 cl clavelin.','Savagnin，酒膜陈年，62 cl clavelin。')
wine('languedoc','Picardan','Domaine Ampelhus','https://domaineampelhus.fr/produit/picardan/','Rare white-grape reference; preserve the actual bottle category.','稀有白品种参照；保留实际瓶装类别。')
wine('languedoc','Le Canaguier','Domaine d’Aupilhac','https://www.aupilhac-laboutique.com/produit/le-canaguier/','Producer-specific cuvée, not a standard regional blend.','酒庄特定 cuvée，不是标准地区调配。')
wine('gaillac','Ondenc Sec','Domaine Plageoles','https://www.vins-plageoles.com/nos-vins/ondenc-sec/','Côtes du Tarn IGP; not Gaillac AOC despite estate location.','Côtes du Tarn IGP；虽酒庄位于该区，不是 Gaillac AOC。')
for name,path in [('Braucol','braucol'),('Duras','duras'),('Prunelart','prunelart')]:
 url='https://www.vins-plageoles.com/nos-vins/'+path+'/'
 src('gaillac',path,'Domaine Plageoles · '+name,url);wine('gaillac',name,'Domaine Plageoles',url,'Gaillac local-grape reference; retain producer spelling.','Gaillac 地方品种参照；保留酒庄拼写。')
wine('pacherenc-du-vic-bilh','Larmes Célestes','Alain Brumont','https://www.brumont.fr/en/wine/25/larmes-celestes','Pacherenc du Vic-Bilh sweet-white reference.','Pacherenc du Vic-Bilh 甜白参照。')
src('pacherenc-du-vic-bilh','brumont','Alain Brumont · Larmes Célestes','https://www.brumont.fr/en/wine/25/larmes-celestes')
for producer,url,key in [('Domaine Marquis d’Angerville','https://www.domainedangerville.fr/bourgogne-aligote/','angerville'),('Domaine Pierre Morey','https://www.morey-meursault.fr/en/wine/bourgogne-aligote/','morey'),('Sylvain Morey','https://www.sylvainmorey.com/wines/bourgogne-aligote-2023/','sylvain')]:
 src('bourgogne-aligote',key,producer+' · Bourgogne Aligoté',url)
 wine('bourgogne-aligote','Bourgogne Aligoté',producer,url,'Regional Aligoté bottling; vintage and élevage are producer-specific.','大区 Aligoté 酒款；年份与陈年处理依酒庄。')
r=R['bourgogne-aligote']
if not any(s['id']=='producers' for s in r['sections']):r['sections'].append(dict(id='producers',title=T('Producers & wines','酒庄与酒款'),rows=[dict(label=T(x['producer'],x['producer']),body=x['note']) for x in r['wines']],refs=['angerville','morey','sylvain']))
# Direct Champagne primary source replaces the inherited cross-region VIFA citation.
src('champagne','voltis','Comité Champagne · Voltis in the 2025 vintage, September 2026','https://levigneronchampenois.comitechampagne.fr/vin/le-voltis-lors-du-millesime-2025')
for association in R['champagne']['grapes']:
 if association['grapeId']=='voltis':association['sourceIds']=['voltis']
sec=next(s for s in R['champagne']['sections'] if s['id']=='grapes')
if not any(x['label']['en']=='Voltis experimental conditions' for x in sec['rows']):
 sec['rows'].append(dict(label=T('Voltis experimental conditions','Voltis 试验条件'),body=T('The Comité Champagne’s September 2026 account describes a VIFA convention, at most 5% of the holding’s planted area (excluding untreated zones) and at most 10% in a blend; monitoring and sample provision are required.','Comité Champagne 2026 年 9 月资料说明：VIFA 协议下，最多占酒庄种植面积 5%（不含不处理区域），最多占调配 10%；要求技术跟踪及样品提供。')))
if 'voltis' not in sec['refs']:sec['refs'].append('voltis')
q=R['champagne']['questions'][29]
q.update(q=T('What planting and blending limits does the September 2026 Comité Champagne account state for Voltis?','Comité Champagne 2026 年 9 月资料列 Voltis 种植及调配上限多少？'),a=T('At most 5% of the holding’s planted area, excluding untreated zones, and 10% of the blend.','最多占酒庄种植面积 5%（不含不处理区域），占调配最多 10%。'),refs=['voltis'],group='law')
if not any(x['id']=='champagne-2026-pno' for x in d['unresolved']):d['unresolved'].append(dict(id='champagne-2026-pno',reason='INAO June 2026 proposed specifications mention additional VIFA changes; proposed texts are not treated as proof of final authorisation. Reconcile final homologation before adding Serelis/Orellis associations.',sourceUrls=['https://extranet.inao.gouv.fr/fichier/pno-CDC-Champagne-cn260618.pdf','https://extranet.inao.gouv.fr/fichier/pno-CDC-CoteauxChampenois-260618.pdf']))

# Source reachability and scope distinctions from direct checks are recorded, not hidden.
src('alsace','vorbourg','CIVA · Vorbourg','https://www.vinsalsace.com/en/grands-crus/vorbourg/')
for s in R['alsace']['sections']:
 if s['id']=='appellations' and 'vorbourg' not in s['refs']:s['refs'].append('vorbourg')
for s in R['gaillac']['sections']:
 if s['id']=='appellations' and 'b' not in s['refs']:s['refs'].append('b')
for s in R['jurancon']['sections']:
 if s['id']=='soils' and 'b' not in s['refs']:s['refs'].append('b')
# Existing group labels carry heritage and experimental associations; do not recast those as legal lists.
d['evidence']=[dict(regionId=r['id'],sourceUrls=[s['url'] for s in r['sources']],associationCount=len(r['grapes']),factualRows=sum(len(s['rows']) for s in r['sections'] if not s.get('editorial')),reviewQuestions=len(r['questions'])) for r in d['regions']]
d['corrections']=[dict(id='fr-cognac-charentes',note='Kept kind=region because the dossier explicitly covers Charentes geography and separate Cognac/wine identities. Armagnac, Champagne and Pays d’Oc use kind=appellation.'),dict(id='france-topic-scope',note='Four heritage/trial groupings remain topics; not promoted to geographic regions or AOCs.'),dict(id='france-existing-bouzeron',note='Existing Bouzeron dossier is untouched and not duplicated.'),dict(id='france-source-access',note='Some official legal/PDF URLs return 403 to automated full-page retrieval; indexed official text and independent primary producer/interprofessional sources were used. No claim of a complete current legal audit.'),dict(id='france-champagne-maturation',note='15 months total/12 months lees for NV and three years total for vintage; rejected producer pages that incorrectly label total minima as all-on-lees minima.'),dict(id='france-bugey',note='Bugey and Roussette du Bugey are two AOCs; named geographical/colour expressions are not counted as independent AOCs.'),dict(id='france-corsica',note='Corse geographical additions are not counted as five extra independent PDOs.')]
# Validate content relationships and language separation, not implementation-mirroring UI tests.
grapes={x['id'] for x in json.load(open(D/'grape-varieties.json'))}
errors=[]
for r in d['regions']:
 ids={s['id'] for s in r['sources']}
 if len(ids)!=len(r['sources']):errors.append([r['id'],'duplicate source id'])
 for s in r['sections']:
  if not s['refs'] and not s.get('editorial'):errors.append([r['id'],s['id'],'empty refs'])
  for k in s['refs']:
   if k not in ids:errors.append([r['id'],s['id'],k])
 for q in r['questions']:
  for k in q['refs']:
   if k not in ids:errors.append([r['id'],'question',q['id'],k])
 for x in r['grapes']:
  if x['grapeId'] not in grapes:errors.append([r['id'],'grape',x['grapeId']])
  for k in x['sourceIds']:
   if k not in ids:errors.append([r['id'],'grape ref',k])
 def language(o):
  if isinstance(o,dict):
   if 'en' in o and 'zh' in o:
    if not o['en'] or not o['zh'] or re.search('[\u4e00-\u9fff]',o['en']):errors.append([r['id'],'language',o])
   for v in o.values():language(v)
  elif isinstance(o,list):
   for v in o:language(v)
 language(r)
assert not errors,errors
assert len(d['regions'])==46
assert sum(len(r['questions']) for r in d['regions'])==360
assert all(len([q for q in r['questions'] if q['level']=='foundation'])==10 for r in d['regions'] if r['questions'])
assert all(len([q for q in r['questions'] if q['level']=='advanced'])==20 for r in d['regions'] if r['questions'])
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(dict(regions=len(d['regions']),questions=sum(len(r['questions']) for r in d['regions']),associations=sum(len(r['grapes']) for r in d['regions']),wineReferences=sum(len(r['wines']) for r in d['regions']),factualRows=sum(e['factualRows'] for e in d['evidence']),errors=errors)))
