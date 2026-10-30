import json,copy
from pathlib import Path
db=json.load(open('data/producers.json'))
ps=[copy.deepcopy(p) for p in db['producers'] if p['id'] in ['producer-fr-dureuil-janthial','producer-fr-domaine-de-villaine']]
sources={s['id']:copy.deepcopy(s) for s in db['sources']}
evidence=[]
def add(id,title,url,ref):
 sources[id]={'id':id,'title':title,'url':url,'type':'official_producer','verifiedAt':'2026-10-29','verification':'Official source opened and checked against this dossier.'}
 evidence.append({'id':id,'url':url,'ref':ref})
 return id
def section(zh,en,z,e,ids):return ({'title':zh,'text':z,'sourceIds':ids},{'title':en,'text':e,'sourceIds':ids})
dj=next(p for p in ps if p['id']=='producer-fr-dureuil-janthial')
dj['status']='source-reviewed';dj['sourceVerifiedAt']='2026-10-29'
dj['scope']='官网系列与逐款技术表已核对。技术表保留原始日期；其面积、种植年与酿造参数不自动代表每个新年份。'
dj['translations']['en']['scope']='Estate portfolio and individual technical sheets checked. Historical sheet dates remain explicit; specifications do not automatically apply to every subsequent vintage.'
dj['intro']='Céline 与 Vincent Dureuil 自 1994 年接掌的 Rully 家族酒庄，葡萄园超过 20 ha，分布于 Côte Chalonnaise、Côte de Beaune 与 Côte de Nuits。Rully 系列涵盖村庄级和多个一级园，白、红葡萄酒均有逐款技术资料。'
dj['translations']['en']['intro']='A Rully family estate run by Céline and Vincent Dureuil since 1994, with more than 20 ha across the Côte Chalonnaise, Côte de Beaune and Côte de Nuits. Its Rully portfolio spans village wines and several Premier Cru sites in both colours.'
about=add('fr-rully29-dureuil_about','Dureuil-Janthial · Estate','https://www.dureuil-janthial.fr/en/','turn1016view1')
portfolio=add('fr-rully29-dureuil_web','Dureuil-Janthial · Wine portfolio','https://www.dureuil-janthial.fr/les-vins/','turn1016view0')
for sec in dj['sections']:sec['sourceIds']=[about,portfolio]
for sec in dj['translations']['en']['sections']:sec['sourceIds']=[about,portfolio]
dj['sections'][1]['text']='Céline 与 Vincent Dureuil 于 1994 年承接家族酒庄。官网将 Janthial 家族在 Rully 的历史追溯至十三世纪。'
dj['translations']['en']['sections'][1]['text']='Céline and Vincent Dureuil took over in 1994. The estate traces the Janthial family’s roots in Rully to the thirteenth century.'
dj['sections'][2]['text']=dj['sections'][2]['text'].replace('约 20 ha','超过 20 ha')
dj['translations']['en']['sections'][2]['text']=dj['translations']['en']['sections'][2]['text'].replace('approximately 20 ha','more than 20 ha')
refs=['turn1028view0','turn1022view1','turn1022view2','turn1022view3','turn1022view4','turn1025view0','turn1025view1','turn1025view2','turn1025view3','turn1025view4','turn1025view5','turn1028view2','turn1028view3','turn1028view4','turn1028view5']
for w,ref in zip(dj['wines'],refs):
 sid=w['sourceIds'][0];s=sources[sid];add(sid,'Dureuil-Janthial · '+w['name']+' · Technical sheet',s['url'],ref)
 sources[sid]['type']='official_producer_historical_technical_sheet'
 w['status']='source-reviewed';w['sourceVerifiedAt']='2026-10-29'
 w['vintageScope']='官网现仍链接的历史技术表（2019 年版式；Cloux 文件于 2022 年上传）。种植年、面积和桶陈参数按该表记录，并非某个当前年份的保证。'
 w['translations']['en']['vintageScope']='Historical estate sheet still linked in its portfolio (2019 document template; Cloux uploaded in 2022). Plantings, area and élevage are sheet-specific, not a guarantee for a current vintage.'
 white='chardonnay' in w['grapeIds']
 w['serving']='酒庄技术表建议约 12°C。' if white else '酒庄技术表建议约 16°C。'
 w['translations']['en']['serving']='Estate sheet: approximately 12°C.' if white else 'Estate sheet: approximately 16°C.'
 if 'gresigny' in w['id']:
  w['place']=w['place'].replace('朝东南','南部朝东')
  w['translations']['en']['place']=w['translations']['en']['place'].replace('South-east','South, east-facing').replace('southeast','east')
 if w['id'].endswith('rouge-1er-cloux'):
  w['place']=w['place'].replace('朝东至东南','酒庄地块朝东（所在坡地总体朝东至东南）')
  w['translations']['en']['place']='Estate parcel faces east; the wider slope beneath Raclot and Rabourcé faces east to southeast. Clay-limestone soil; planted 1936; historical area 0.0871 ha.'
  w['detail']+=' 技术表所列规格为 150 cl。'
  w['translations']['en']['detail']+=' The technical sheet lists a 150 cl format.'
dv=next(p for p in ps if p['id']=='producer-fr-domaine-de-villaine')
dv.update(website='https://www.de-villaine.com/en/',status='source-reviewed',sourceVerifiedAt='2026-10-29')
dv['intro']='位于 Bouzeron 的家族酒庄，以 Aligoté、Chardonnay 与 Pinot Noir 展现 Côte Chalonnaise 的村庄与地块差异。Rully 白葡萄酒包括 Les Saint-Jacques 和六个一级园；红葡萄酒包括 Cloux 与 Les Champs Cloux。'
dv['translations']['en']['intro']='A family estate based in Bouzeron, working with Aligoté, Chardonnay and Pinot Noir across the Côte Chalonnaise. Its Rully whites include Les Saint-Jacques and six Premier Cru sites; the red portfolio includes Cloux and Les Champs Cloux.'
dv['scope']='按酒庄官网及 2021–2024 年份报告整理；Cuvée Ronde 单独保留为 2021 年霜冻背景下的混合一级园酒。'
dv['translations']['en']['scope']='Based on the estate website and 2021–2024 vintage reports. Cuvée Ronde is retained separately as the frost-driven 2021 Premier Cru blend.'
estate=add('rully-complete-villaine-estate','Domaine de Villaine · Estate','https://www.de-villaine.com/en/domaine','turn1022view5')
organic=add('rully-complete-villaine-organic','Domaine de Villaine · Cultivation','https://www.de-villaine.com/en/philosophy-organic-cultivation','turn1022view6')
cellar=add('rully-complete-villaine-cellar','Domaine de Villaine · Winemaking','https://www.de-villaine.com/en/philosophy-wine-making-process','turn1029view0')
people=add('rully-complete-villaine-people','Domaine de Villaine · People and philosophy','https://www.de-villaine.com/en/philosophy-men-gestures','turn1029view1')
add('fr-rully29-villaine_2324','Domaine de Villaine · 2023–2024 vintage report',sources['fr-rully29-villaine_2324']['url'],'turn1016view3')
add('fr-rully29-villaine_2122','Domaine de Villaine · 2021–2022 vintage report',sources['fr-rully29-villaine_2122']['url'],'turn1016view4')
pairs=[section('历史与人物','History & people','Aubert 与 Pamela de Villaine 于 1971 年开始在 Bouzeron 经营。官网人物资料列有 Aubert、Pamela、Pierre de Benoist 与 Thierry Devaux；Pierre 的风土文章强调土壤、葡萄材料和人的长期实践。','Aubert and Pamela de Villaine began their Bouzeron project in 1971. The estate’s people page features Aubert, Pamela, Pierre de Benoist and Thierry Devaux; Pierre’s essay stresses soil, vine material and the grower’s accumulated practice.',['fr-rully29-n_villaine',people]),section('葡萄园','Vineyards','基地位于 Bouzeron 的山谷坡地，土壤较贫瘠、富含石灰质。Rully 系列将村庄级、六个白葡萄酒一级园和红葡萄酒地块分别呈现，不能将某一园的土壤或树龄推广至全庄。','The Bouzeron base lies on slopes with nutrient-poor, limestone-rich soils. Rully village, six white Premier Cru sites and individual red parcels are treated separately; soil or vine-age details belong to the named parcel.',[estate,'fr-rully29-villaine_2324']),section('栽培','Viticulture','酒庄官网称自 1986 年获 Qualicé-France 有机认证，施肥限于植物性有机堆肥，并以修剪、选种及必要时疏果控制产量。2022 年份报告同时记述有机与生物动力实践；认证沿革与具体年份实践分别理解。','The estate reports organic certification by Qualicé-France from 1986, vegetal compost and yield control through vine selection, pruning and occasional thinning. Its 2022 report also describes biodynamic practices; certification history and vintage practices are distinct statements.',[organic,'fr-rully29-villaine_2122']),section('酿造与熟成','Vinification & élevage','人工采收并严格分选；按酒款采用大木桶、橡木小桶、罐或其组合，控制新桶以避免遮盖果味。白葡萄酒容器与红葡萄酒整串比例均按酒款、年份记录。','Hand harvest and strict sorting precede vinification. Tuns, barrels and tanks are used selectively, with restrained new oak. White-wine vessels and red whole-bunch proportions are recorded by cuvée and vintage.',[cellar]),section('Rully 系列','Rully portfolio','Les Saint-Jacques 是村庄级酒，不能与 Clos Saint-Jacques 一级园混同。2021 Cuvée Ronde 将六个白葡萄酒一级园混合，属于严重春霜后的特殊发行，并非第七个单一一级园。','Les Saint-Jacques is village-level and distinct from the Premier Cru Clos Saint-Jacques. Cuvée Ronde 2021 combines six white Premier Cru sites following severe spring frost; it is not a seventh single-climat bottling.',['fr-rully29-villaine_2122','fr-rully29-villaine_stjacques'])]
dv['sections']=[a for a,b in pairs];dv['translations']['en']['sections']=[b for a,b in pairs]
# Each row: suffix, year, site ZH/EN, method ZH/EN, sensory ZH/EN, source URL, web evidence.
rows=[
('blanc-les-saint-jacques',2024,'朝东坡脚、Clos Saint-Jacques 一级园下方的村庄级地块；1990 年栽植，深层粉砂质土。','Village parcel below Clos Saint-Jacques on an east-facing slope; planted 1990, with deep silty soil.','2024：主要于大木桶及三年旧桶中酿造、带酒泥熟成；酒庄以约每株四串控制果实与叶幕平衡。','2024: mainly foudre and three-year-old barrels, with lees ageing; the estate targets roughly four bunches per vine.','酒庄对 2024 的描述强调清新、晶莹和脆爽果味，建议年轻时饮用。官网通用服务建议约 12–14°C，可配鱼、白肉或温和山羊奶酪。','The estate describes a fresh, crisp 2024 for youthful drinking. General estate service guidance is 12–14°C with fish, white meat or mild goat cheese.','https://de-villaine.com/en/wines/2/rully-les-saint-jacques','turn1030view7'),
('1er-blanc-margotes',2023,'Rully 最南端、邻近 Grésigny；石灰岩与略含泥灰质的底土，较凉爽多风。','Southern end of Rully beside Grésigny; limestone and slightly marly subsoil, with a cool, windy setting.','2023：在橡木大桶中酿造与熟成。','2023: vinification and ageing in oak foudre.','酒庄描述白花、桃、榅桲与鲜杏仁，口感兼具丰富度和白垩感。','Estate notes describe floral, peach, quince and fresh-almond aromas with richness and chalky tension.','https://www.de-villaine.com/en/wines/12/rully-1er-cru-margotes','turn1030view0'),
('1er-blanc-gresigny',2023,'Margotés 北侧同一石灰岩带；2023 资料将 Chardonnay 葡萄藤描述为约 80 年树龄。','North of Margotés on the same limestone vein; the 2023 account describes Chardonnay vines around 80 years old.','官网年份页未提供该款的精确容器、新桶比例或熟成月数；不套用邻近地块的参数。','The vintage page does not specify vessels, new-oak percentage or ageing months for this cuvée.','酒庄描述桃、杏与核果感，口感饱满而细致，并指出超过十年的陈年潜力。','The estate describes peach and apricot, a full yet fine palate and potential beyond ten years.','https://www.de-villaine.com/en/wines/9/rully-1er-cru-gresigny','turn1030view1'),
('1er-blanc-montpalais',2023,'石灰质地块；2023 酒庄资料称园内约 12% 为 Chardonnay Muscaté。','Limestone site; the 2023 estate account identifies approximately 12% Chardonnay Muscaté among the vines.','年份页未刊载该款桶型、熟成时长或新桶比例。Chardonnay Muscaté 属于 Chardonnay 的芳香型材料，不能改记为 Muscat 混酿。','The page gives no vessel, ageing duration or new-oak percentage. Chardonnay Muscaté is aromatic Chardonnay material, not a declared Muscat blend.','酒庄描述荔枝、奇异果、梨与辛香，成熟果实和酸度并存；建议年轻饮用并略作提前开瓶。','Estate notes combine lychee, kiwi, pear and spice with fresh acidity; youthful drinking and brief aeration are suggested.','https://de-villaine.com/en/wines/11/rully-1er-cru-montpalais','turn1030view2'),
('1er-blanc-cloux',2023,'朝东葡萄园，黏土石灰质土。','East-facing vineyard on clay-limestone soils.','2023：在橡木桶与 demi-muid 中熟成。','2023: matured in barrels and demi-muids.','酒庄描述较丰富但不过分丰腴，带鲜杏仁、咸鲜张力与清爽苦味收尾。','The estate describes richness without opulence, almond notes, saline tension and a refreshing bitter finish.','https://www.de-villaine.com/en/wines/15/rully-1er-cru-cloux-blanc','turn1030view6'),
('1er-blanc-raclot',2023,'石灰质地块；2023 资料将其描述为较年轻葡萄藤。','Limestone site described as young vines in the 2023 account.','2023：使用橡木桶与 demi-muid；酒庄指出发表品评时木质感仍在整合。','2023: barrels and demi-muids; oak was still integrating when the estate note was written.','花果香明显，酒庄强调酸度、成熟果实与咸鲜感的平衡。','Estate notes emphasize floral fruit, mineral tension and balance between acidity, ripe fruit and salinity.','https://www.de-villaine.com/en/wines/18/rully-1er-cru-raclot','turn1030view3'),
('1er-blanc-rabource',2023,'含白色黏土，日照充足，是酒庄描述中 Rully 较为向阳的地块。','White-clay soils and a particularly sunny Rully setting in the estate’s account.','2023：以大型木质容器酿造，新桶占比低于 8%。','2023: large wooden vessels, with less than 8% new barrels.','酒庄描述芳香丰厚、白垩感与轻微烘烤气息，余味有密度并具陈年潜力。','Estate notes describe aromatic richness, chalk, light toast and a dense finish with ageing potential.','https://www.de-villaine.com/en/wines/17/rully-1er-cru-rabource','turn1030view5'),
('1er-rouge-cloux',2023,'Cloux 一级园的 Pinot Noir 红葡萄酒，与同名 Chardonnay 白葡萄酒分别建档。','Pinot Noir from Cloux Premier Cru, separate from the Chardonnay bottling of the same climat.','2021：酒庄记述 80% 整串；2023 页面未给出整串比例，因此不将 2021 的比例用于 2023。','2021: 80% whole bunch according to the estate report. The 2023 page gives no proportion, so the 2021 figure is not transferred.','2023 酒庄描述果味纯净、汁感圆润、兼具清新与力量；陈年可发展辛香。','The 2023 estate note emphasizes pure fruit, roundness, freshness and restrained power, developing spice with age.','https://www.de-villaine.com/en/wines/16/rully-1er-cru-cloux-rouge','turn1030view4'),
('1er-rouge-les-champs-cloux',2023,'Les Champs Cloux 一级园，Pinot Noir；与 Cloux 分别列名。','Pinot Noir from Les Champs Cloux Premier Cru; distinct from Cloux.','2023：20% 整串酿造。该比例来自 2023 年份报告。','2023: vinified with 20% whole bunches, as stated in that vintage report.','酒庄描述果味主导、带近似碘的气息、清新且单宁抛光；建议在发表报告时至其后三年内饮用。','Estate notes describe fruit-led freshness, an iodine-like nuance and polished tannins, with a suggested window of publication to three years later.','https://www.de-villaine.com/f/news/tasting-comments-vintages-2023-2024-35.pdf','turn1016view3'),
('1er-cuvee-ronde',2021,'2021 春霜后将 Margotés、Grésigny、Montpalais、Cloux、Raclot 与 Rabourcé 六个白葡萄酒一级园混合。','Following the 2021 frost, six white Premier Cru sites were blended: Margotés, Grésigny, Montpalais, Cloux, Raclot and Rabourcé.','酒庄报告记述相关一级园预估产量损失 65–70%；决定混酿。报告未提供统一新桶或熟成时长。','The estate reports an estimated 65–70% volume loss in these sites and the decision to blend; no common oak percentage or duration is supplied.','酒庄描述鲜明酸度与持续感，开瓶可能略有还原。此款与将 Les Saint-Jacques、Les Clous Aimé 混合的另一款 Cuvée Ronde 不同。','The estate describes energy, persistence and slight opening reduction. This differs from the separate Cuvée Ronde combining Les Saint-Jacques and Les Clous Aimé.','https://www.de-villaine.com/f/news/wine-description-vintage-2021-2022-34.pdf','turn1016view4')]
for suffix,year,pz,pe,mz,me,dz,de,url,ref in rows:
 w=next(w for w in dv['wines'] if w['id']=='wine-fr-de-villaine-rully-'+suffix)
 sid=add('rully-complete-villaine-'+suffix,'Domaine de Villaine · '+w['name']+' · '+str(year),url,ref)
 w.update(place=pz,method=mz,detail=dz,vintage=year,status='source-reviewed',sourceVerifiedAt='2026-10-29',vintageScope=f'主要年份：{year}。其他年份的技术数据已另行注明；品评与饮用窗口为酒庄当时的描述。',sourceIds=[sid])
 w['translations']['en'].update(place=pe,method=me,detail=de,vintageScope=f'Primary vintage: {year}. Other vintage specifications are explicitly dated. Tasting and drinking-window notes are the estate’s contemporary assessment.')
 if suffix=='1er-rouge-cloux':w['sourceIds'].append('fr-rully29-villaine_2122')
 if suffix=='1er-blanc-montpalais':w['grape']='Chardonnay；酒庄称其中约 12% 为 Chardonnay Muscaté（2023）。';w['translations']['en']['grape']='Chardonnay, including approximately 12% Chardonnay Muscaté according to the 2023 estate account.'
used={s for p in ps for sec in p['sections'] for s in sec['sourceIds']}|{s for p in ps for w in p['wines'] for s in w['sourceIds']}
out={'producers':ps,'sources':[sources[s] for s in used],'verification':{'checkedWineIds':[w['id'] for p in ps for w in p['wines']],'newWines':[],'sourceEvidence':evidence,'corrections':['Dureuil Grésigny estate parcel faces east, not southeast.','De Villaine wine-specific vinification replaces generic vintage_records instructions.','Cuvée Ronde 2021 remains a distinct historical six-Premier-Cru blend.']}}
Path('research/rully-completion-20261029/dureuil-villaine.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
