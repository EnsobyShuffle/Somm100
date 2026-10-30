import json,pathlib
P=pathlib.Path(__file__).parent
D=P.parent.parent/'data'
G={x['id']:x for x in json.load(open(D/'france-grape-regions.json'))}
T=lambda en,zh:{'en':en,'zh':zh}
N={'overview':('Overview','概览'),'history':('History','历史'),'geography':('Geography','地理'),'climate':('Climate','气候'),'soils':('Geology & soils','地质与土壤'),'grapes':('Grapes & viticulture','葡萄与栽培'),'winemaking':('Winemaking & styles','酿造与风格'),'appellations':('Appellations & classification','产区与分级'),'producers':('Producers & wines','酒庄与酒款'),'service':('Tasting & service','品鉴与侍酒')}
path=P/'france.json'
d=json.load(open(path)) if path.exists() else {k:[] for k in ['grapes','translations','existingUpdates','regions','wines','evidence','unresolved','corrections']}
regs={x['id'][3:]:x for x in d['regions']}
def save():
 d['regions']=list(regs.values());path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def profile(id,name,kind,sourceblock,rows,service=None):
 sources=[]
 for line in sourceblock.strip().split('\n'):
  key,title,url=line.split('|');sources.append(dict(id=key,title=title,url=url))
 for item in G.get(id,{}).get('sources',[]):
  if item['url'] not in [s['url'] for s in sources]:sources.append(dict(id='g'+str(len(sources)+1),**item))
 byurl={s['url']:s['id'] for s in sources}
 reg=dict(id='fr-'+id,name=name,country='France',kind=kind,aliases=[G.get(id,{}).get('name',name)],intro=T('',''),facts=[],sections=[],grapes=[],wines=[],sources=sources,reviewed='2026-10-26',questions=regs.get(id,{}).get('questions',[]),coverage=T('Independent regional reference; current legal numerical tables and full review coverage remain incomplete.','独立产区参考；现行法规数值表及完整复习覆盖尚未完成。'))
 for line in rows.strip().split('\n'):
  sec,en,zh,ben,bzh,keys=line.split('|');s=next((x for x in reg['sections'] if x['id']==sec),None)
  if s is None:s=dict(id=sec,title=T(*N[sec]),rows=[],refs=[]);reg['sections'].append(s)
  s['rows'].append(dict(label=T(en,zh),body=T(ben,bzh)))
  for key in keys.split(','):
   if key not in s['refs']:s['refs'].append(key)
 reg['intro']=reg['sections'][0]['rows'][0]['body']
 reg['facts']=[dict(label=T('Country','国家'),body=T('France','法国')),dict(label=T('Scope','范围'),body=T('Appellation' if kind=='appellation' else 'Geographical wine region','法定产区' if kind=='appellation' else '地理葡萄酒区域'))]
 for e in G.get(id,{}).get('entries',[]):
  reg['grapes'].append(dict(grapeId=e['grapeId'],role=e['note'],sourceIds=[byurl[u] for u in e['sourceUrls']],associationStatus=e['status']))
 if service:reg['sections'].append(dict(id='service',title=T(*N['service']),editorial=True,rows=[dict(label=T('Service comparison','侍酒比较'),body=T(*service))],refs=[]))
 regs[id]=reg;save()
def quiz(id,block):
 out=[]
 for i,line in enumerate(block.strip().split('\n')):
  qe,qz,ae,az,keys,group=line.split('|')
  out.append(dict(id=f'{i+1:02}',level='foundation' if i<10 else 'advanced',group=group,q=T(qe,qz),a=T(ae,az),refs=keys.split(',')))
 assert len(out)==30,(id,len(out))
 regs[id]['questions']=out;regs[id]['coverage']=T('Expanded regional reference with 10 foundation and 20 advanced review questions. Exhaustive current legal tables and every subappellation are not yet covered.','扩充产区参考，附 10 基础、20 进阶复习题；尚未涵盖全部现行法规数值及每个子产区。');save()
profile('champagne','Champagne','appellation','''
a|Comité Champagne · Appellation|https://www.champagne.fr/en/about-champagne/a-great-blended-wine/champagne-designation
b|INAO · Champagne|https://inao.gouv.fr/en/node/32212
c|Comité Champagne · Maturation|https://www.champagne.fr/en/about-champagne/how-champagne-is-made/maturation
p|Comité Champagne · Pressing|https://www.champagne.fr/en/about-champagne/how-champagne-is-made/pressing
v|Jean Vesselle · Technical visit|https://www.champagnejeanvesselle.com/en/technical-visit/champagne/visite-technique-2
t|Taittinger · Ageing|https://www.taittinger.com/en/webzine/how-to-age-champagne
r|Comité Champagne · Chardonnay rose|https://www.champagne.fr/fr/approfondir/mediaroom/communique-presse-champagne/le-chardonnay-rose-un-cepage-oublie-qui-retrouve
''','''
overview|Identity|身份|Northeastern French sparkling-wine appellation based on cool-climate grapes, blending and bottle fermentation; neighbouring still-wine AOCs are separate.|法国东北部起泡酒产区，以凉爽气候葡萄、调配和瓶中发酵为核心；相邻静止酒 AOC 另列。|a,b
history|Delimitation|划界|The 1927 law established the delimited vineyard area; AOC recognition followed in 1936.|1927 年法律界定葡萄园范围，1936 年获 AOC。|a,b
geography|Vineyard sectors|葡萄园片区|Montagne de Reims, Vallée de la Marne, Côte des Blancs and Côte des Bar provide the main geographical reference points.|Montagne de Reims、Vallée de la Marne、Côte des Blancs、Côte des Bar 是主要地理参照。|a
climate|Oceanic / continental|海洋性／大陆性|Oceanic and continental influences combine; spring frost, rainfall and slow ripening affect viticulture.|海洋性与大陆性结合；春霜、降雨、缓慢成熟影响栽培。|a
soils|Chalk and other formations|白垩及其他地层|Chalk is important alongside limestone, marl, clay and sand; Côte des Bar is not geologically identical to Côte des Blancs.|除白垩外，还有石灰岩、泥灰岩、黏土、砂；Côte des Bar 地质不等于 Côte des Blancs。|a,b
grapes|Principal plantings|主要种植|Chardonnay, Pinot Noir and Meunier dominate; minority grapes require separate identification.|Chardonnay、Pinot Noir、Meunier 为主，少量品种须另作识别。|r
grapes|Minority heritage grapes|少量传统品种|Arbane, Petit Meslier, Pinot Blanc and Pinot Gris retain authorised minority roles.|Arbane、Petit Meslier、Pinot Blanc、Pinot Gris 保留获准的少量角色。|r
grapes|Chardonnay rose|Chardonnay rose|Recognised as a principal authorised variety in July 2025; this legal category does not imply large plantings.|2025 年 7 月获认可为法定主要品种；法律类别不表示种植面积很大。|r
winemaking|Pressing marc|压榨批次|A 4,000 kg marc corresponds to 2,550 L of permitted must: 2,050 L cuvée and 500 L taille.|每 4,000 kg 一批葡萄对应 2,550 L 许可汁液：2,050 L cuvée、500 L taille。|v
winemaking|Cuvée / taille|Cuvée／taille|These are successive press fractions, not finished-wine quality ranks. Keeping them separate creates blending options.|这是连续压榨分段，不是成酒质量分级；分开保存提供调配选择。|p
winemaking|Assemblage|调配|Base-wine lots are assembled before tirage; grape, site and reserve-wine choices influence the final style.|基酒在 tirage 前调配；品种、地块、储备酒选择影响成酒风格。|a,c
winemaking|Tirage|Tirage|Bottling with the fermentation preparation starts the bottle-fermentation stage and maturation clock.|装瓶加入发酵准备物，启动瓶中发酵阶段及陈年计时。|c
winemaking|Non-vintage minimum|无年份最低陈年|At least 15 months before release, including at least 12 months on lees.|上市前至少 15 个月，其中至少 12 个月接触酒泥。|c,t
winemaking|Vintage minimum|年份酒最低陈年|Vintage Champagne requires at least three years; many producers mature wines longer.|年份 Champagne 至少三年；许多生产者延长陈年。|c
winemaking|Autolysis|自溶|Yeast autolysis contributes texture and mature aromas during lees ageing.|酵母自溶在酒泥陈年中贡献质感与成熟香气。|c
winemaking|Oxygen exchange|氧交换|Slow oxygen exchange also participates in maturation; lees time alone does not reveal dosage.|缓慢氧交换也参与成熟；酒泥时间本身不能说明补糖量。|c
appellations|Coteaux Champenois|Coteaux Champenois|A separate still-wine appellation, not an unsparkling version within Champagne AOC.|独立静止酒产区，不是 Champagne AOC 内的无气泡版本。|a,b
appellations|Rosé des Riceys|Rosé des Riceys|A distinct still-rosé appellation whose geographical and production identity must be retained.|独立静止桃红产区，须保留其地理与生产身份。|b
producers|Jean Vesselle|Jean Vesselle|The estate's technical account provides a concrete reference for cuvée and taille press fractions.|酒庄技术资料为 cuvée 与 taille 提供具体生产实例。|v
producers|Taittinger|Taittinger|Its ageing account separates legal minima from the longer maturation selected by a house.|其陈年资料区分法定最低要求与酒庄自选的更长陈年。|t
''',('Compare dosage, reserve wines and lees age independently.','分别比较补糖、储备酒与酒泥陈年。'))
profile('alsace','Alsace','region','''
a|CIVA · Alsace AOC|https://www.vinsalsace.com/en/gouts-et-couleurs/aoc/aoc-alsace/
b|CIVA · Regional dossier|https://www.vinsalsace.com/assets/files/presse/dossier_presse_fr.pdf
c|CIVA · Grapes|https://www.vinsalsace.com/fr/gouts-et-couleurs/cepages/
z|CIVA · Zotzenberg|https://www.vinsalsace.com/en/grands-crus/zotzenberg/
r|French regulation · 4 July 2024|https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049892619
p|Boeckel · Sylvaner Zotzenberg|https://www.boeckel-alsace.com/sylvaner-grand-cru-zotzenberg-s24.html
t|Trimbach · Réserve wines|https://www.trimbach.fr/en/vins-alsace/vins-alsace-gamme-reserve
s|Louis Sipp · Crémant Rosé|https://www.sipp.com/en/cremant-dalsace-rose-s99.html
''','''
overview|Identity|身份|Alsace is a vineyard corridor east of the Vosges; grape, site and sweetness are separate dimensions.|Alsace 为 Vosges 东侧葡萄园带；品种、地块、甜度须分别理解。|a,b
history|AOC recognition|AOC 认可|Alsace AOC was recognised in 1962, followed by separate Grand Cru developments.|Alsace AOC 于 1962 年认可，后续另有 Grand Cru 发展。|a
geography|Vineyard corridor|葡萄园带|Vineyards extend from the Strasbourg area toward Thann, between the Vosges and Rhine plain.|葡萄园从 Strasbourg 一带向 Thann 延伸，介于 Vosges 与莱茵平原。|b
climate|Rain shadow|雨影|The Vosges shelter the eastern slopes, favouring relatively dry conditions; exposure alters ripening.|Vosges 遮蔽东侧坡地，形成相对干燥条件；坡向改变成熟。|b
soils|Geological mosaic|地质组合|Granite, sandstone, limestone, marl, schist and volcanic formations create strong site contrasts.|花岗岩、砂岩、石灰岩、泥灰岩、片岩与火山岩形成显著地块差异。|b
grapes|White references|白品种重点|Riesling, Gewürztraminer, Pinot Gris and Muscat are central aromatic references.|Riesling、Gewürztraminer、Pinot Gris、Muscat 为核心芳香参照。|c
grapes|Pinot Blanc / Auxerrois|Pinot Blanc／Auxerrois|They are distinct varieties; regional blends and labelling may involve both.|两者是不同品种；地方调配与酒标可能涉及两者。|c
grapes|Pinot Noir|Pinot Noir|Pinot Noir supplies red and rosé wines, including authorised red Grand Cru sites.|Pinot Noir 生产红、桃红，也用于获准红 Grand Cru 地块。|c,r
winemaking|Sweetness range|甜度范围|Still whites range from dry to sweet; varietal aroma cannot establish residual sugar.|静止白酒从干到甜；品种香气不能确定残糖。|b
winemaking|Vendanges Tardives|Vendanges Tardives|A regulated late-harvest mention, not a grape name.|受监管晚采标示，不是葡萄名。|b
winemaking|Sélection de Grains Nobles|Sélection de Grains Nobles|Selected concentrated berries affected by noble rot are central to SGN.|挑选受贵腐影响的浓缩果粒是 SGN 核心。|b
winemaking|Crémant|Crémant|Crémant d’Alsace is a separate bottle-fermented sparkling appellation.|Crémant d’Alsace 为独立瓶中发酵起泡产区。|b
appellations|Grand Cru structure|Grand Cru 结构|There are 51 named Grand Cru sites with individual specifications; exceptions prevent one universal grape rule.|51 个具名 Grand Cru 各有规范；存在例外，不能用统一品种规则概括。|z,r
appellations|Named Alsace places|Alsace 具名产地|Certain communal and lieu-dit indications have tighter conditions without automatically becoming Grand Cru.|某些市镇、地块标示有更严条件，但不自动成为 Grand Cru。|a
appellations|Zotzenberg|Zotzenberg|Mittelbergheim's Zotzenberg permits Sylvaner Grand Cru; this is a site-specific exception.|Mittelbergheim 的 Zotzenberg 可用 Sylvaner 酿 Grand Cru，是地块特例。|z,p
soils|Zotzenberg geology|Zotzenberg 地质|Jurassic and Oligocene marl-limestone retain moisture; the slopes face east and south.|侏罗纪、渐新世泥灰岩石灰岩保水，坡向东及南。|z
appellations|Red Grand Cru sites|红 Grand Cru 地块|Hengst, Kirchberg de Barr and Vorbourg permit Pinot Noir reds; Vorbourg's recognition was added in 2024.|Hengst、Kirchberg de Barr、Vorbourg 允许 Pinot Noir 红酒；Vorbourg 认可于 2024 年加入。|r
producers|Boeckel|Boeckel|Sylvaner Grand Cru Zotzenberg provides a bottle reference for the local exception.|Sylvaner Grand Cru Zotzenberg 为地块例外提供酒款实例。|p
producers|Trimbach|Trimbach|Réserve examples include Pinot Gris and Gewurztraminer; record the specific wine's sweetness and composition.|Réserve 实例有 Pinot Gris、Gewurztraminer；应记录具体酒款甜度及组成。|t
producers|Louis Sipp|Louis Sipp|Crémant d’Alsace Rosé uses Pinot Noir from around Ribeauvillé and is a dry sparkling reference.|Crémant d’Alsace Rosé 用 Ribeauvillé 周边 Pinot Noir，为干型起泡参照。|s
''',('Check sweetness before choosing food pairings.','配餐前核对甜度。'))
profile('bourgogne','Bourgogne','region','''
a|BIVB · Climate|https://www.bourgogne-wines.com/wine-and-terroir/our-natural-assets/climatology/an-ideal-climate-for-producing-great-wines%2C2483%2C9268.html
b|Climats association · Definitions|https://climats-bourgogne.fr/fr/faq-lexique-liens_209.html
c|French agriculture ministry · Bourgogne|https://agriculture.gouv.fr/la-richesse-du-vignoble-de-bourgogne
h|BIVB · Chablis Grand Cru|https://www.chablis-wines.com/explore/chablis-appellations/chablis-grand-cru/chablis-grand-cru%2C1820%2C7663.html
l|BIVB · Bourgogne Aligoté|https://www.bourgogne-wines.com/wine-and-terroir/bourgogne-and-its-appellations/gallery_files/site/321/402/79294/79302.pdf
v|Domaine de Villaine · Bouzeron|https://www.de-villaine.com/en/wines/1/bouzeron
d|Joseph Drouhin · Clos des Mouches Rouge 2023|https://www.drouhin.com/en_US/wine/beaune-clos-des-mouches-premier-cru-rouge/2023
p|Domaine Ponsot · Clos des Monts Luisants|https://domaine-ponsot.com/produit/morey-saint-denis-monts-luisants-en/
''','''
overview|Identity|身份|A hierarchy of regional, village and vineyard names connects grape varieties to specific sites.|大区、村庄及葡萄园名称层级，将品种与特定地块相连。|b,c
history|Vineyard organisation|葡萄园组织|Monastic organisation and later appellation delimitation shaped the historical Climats.|修道院组织及后续法定划界塑造历史 Climats。|b
geography|Northern sectors|北部片区|Chablis and Grand Auxerrois are separate study areas north of the Côte d’Or.|Chablis 与 Grand Auxerrois 为 Côte d’Or 以北独立学习片区。|c
geography|Côte d’Or|Côte d’Or|Côte de Nuits and Côte de Beaune form the central Côte d’Or sequence.|Côte de Nuits、Côte de Beaune 构成 Côte d’Or 主轴。|c
geography|Southern sectors|南部片区|Côte Chalonnaise leads south toward Mâconnais.|Côte Chalonnaise 向南连接 Mâconnais。|c
climate|Semi-continental|半大陆性|Spring frost is important, especially in the north; southern influences increase toward Mâconnais.|春霜尤其影响北部；向 Mâconnais 南方影响加强。|a
soils|Geological foundations|地质基础|Jurassic limestones and marls, clay content and slope deposits differ between sites.|侏罗纪石灰岩、泥灰岩、黏土含量及坡积物因地块而变。|c
grapes|Principal grapes|主要品种|Pinot Noir and Chardonnay dominate; Aligoté adds a distinct white-wine identity.|Pinot Noir、Chardonnay 为主；Aligoté 增加独立白酒身份。|c,l
winemaking|Cellar variation|酿造差异|Whole-bunch use, extraction, lees and oak vary by producer; they are not fixed by the word Bourgogne.|整串、萃取、酒泥、用桶因酒庄而变，并非 Bourgogne 一词即可确定。|d,p
appellations|Hierarchy|层级|Regional, village, village Premier Cru and Grand Cru form the familiar hierarchy.|大区、村庄、村庄 Premier Cru、Grand Cru 为常用层级。|b,c
appellations|Climat|Climat|A named, delimited vineyard identity incorporating place and human history; not meteorological climate.|具名划定葡萄园身份，包含地理及人文历史；不是气象气候。|b
appellations|Premier Cru|Premier Cru|A vineyard designation within a village appellation, not a region-wide producer ranking.|村庄产区内葡萄园标示，不是全区酒庄排名。|b,d
appellations|Chablis hierarchy|Chablis 层级|Petit Chablis, Chablis, Chablis Premier Cru and Chablis Grand Cru are distinct label levels.|Petit Chablis、Chablis、Chablis Premier Cru、Chablis Grand Cru 为不同酒标层级。|h
appellations|Seven Climats|七个 Climats|One Chablis Grand Cru AOC contains Blanchot, Bougros, Les Clos, Grenouilles, Les Preuses, Valmur and Vaudésir.|一个 Chablis Grand Cru AOC 含 Blanchot、Bougros、Les Clos、Grenouilles、Les Preuses、Valmur、Vaudésir。|h
geography|Grand Cru hillside|Grand Cru 坡地|The Chablis Grand Cru hillside lies on the Serein's right bank northeast of town.|Chablis Grand Cru 山坡位于 Serein 右岸、镇东北方。|h
appellations|Bourgogne Aligoté|Bourgogne Aligoté|A regional Aligoté appellation recognised in 1937.|1937 年认可的大区 Aligoté 产区。|l
appellations|Bouzeron|Bouzeron|The village Aligoté identity is separate from regional Bourgogne Aligoté.|村庄 Aligoté 身份独立于大区 Bourgogne Aligoté。|v
producers|Domaine de Villaine|Domaine de Villaine|Bouzeron supplies a direct village Aligoté reference.|Bouzeron 为村庄 Aligoté 的直接实例。|v
producers|Joseph Drouhin|Joseph Drouhin|Beaune Clos des Mouches Premier Cru Rouge is a named Pinot Noir reference, distinct from the estate's white of the same Climat.|Beaune Clos des Mouches Premier Cru Rouge 为具名 Pinot Noir 实例，与同地块白酒分开。|d
producers|Domaine Ponsot|Domaine Ponsot|Morey-Saint-Denis Premier Cru Clos des Monts Luisants is an Aligoté wine: village reputation alone cannot identify the grape.|Morey-Saint-Denis Premier Cru Clos des Monts Luisants 为 Aligoté；不能仅由村庄声誉推断品种。|p
''',('Compare neighbouring sites with a fixed producer and vintage.','固定酒庄与年份比较相邻地块。'))
profile('bordeaux','Bordeaux','region','''
a|CIVB · Appellations|https://www.bordeaux.com/en/designations/
b|Médoc · Soils and climate|https://www.medoc-bordeaux.com/en/appellations-en/soil-and-climate/?age_legal=true
c|CIVB · Grapes|https://www.bordeaux.com/en/grape-varieties/
k|CIVB · Classifications|https://www.bordeaux.com/en/classifications/
f|CIVB · 1855 classification|https://www.bordeaux.com/en/classifications/classifications-1855/
g|Conseil des Grands Crus Classés en 1855|https://gcc-1855.fr/en/
l|DBR Lafite · Château Lafite Rothschild|https://www.lafite.com/domaines/chateau-lafite-rothschild/contact/
''','''
overview|Identity|身份|An Atlantic wine region of separate appellations, red blends, dry whites, sweet wines and multiple estate-classification systems.|大西洋葡萄酒区，含独立产区、红调配、干白、甜酒及多种酒庄分级。|a,k
history|1855 context|1855 背景|The Paris Universal Exhibition under Napoleon III prompted the famous 1855 classification.|Napoléon III 时期巴黎世博会促成著名 1855 分级。|f
geography|River framework|河流框架|Garonne and Dordogne join in the Gironde estuary; left- and right-bank identities depend on this geography.|Garonne、Dordogne 汇成 Gironde 河口；左右岸身份取决于此地理。|a
geography|Médoc communes|Médoc 村庄|Saint-Estèphe, Pauillac, Saint-Julien and Margaux lie along the Médoc bank; Moulis and Listrac lie farther inland.|Saint-Estèphe、Pauillac、Saint-Julien、Margaux 位于 Médoc 河侧；Moulis、Listrac 更内陆。|a,b
climate|Atlantic influence|大西洋影响|Oceanic moderation and rainfall make ripening and disease management vintage-dependent.|海洋调节与降雨使成熟、病害管理依年份而变。|b
soils|Gravel terraces|砾石河阶|Médoc gravel terraces are important, but not universal across the left bank.|Médoc 砾石河阶重要，但并非整个左岸通用。|b
soils|Clay-limestone sectors|黏土石灰质片区|Saint-Estèphe, Moulis and Listrac include clay-limestone terrain, complicating simple bank stereotypes.|Saint-Estèphe、Moulis、Listrac 含黏土石灰质，不能只靠左右岸刻板概括。|b
grapes|Red structure|红品种结构|Cabernet Sauvignon is central in Médoc; Merlot and Cabernet Franc are especially important in right-bank blends.|Cabernet Sauvignon 对 Médoc 重要；Merlot、Cabernet Franc 对右岸调配尤其重要。|c
grapes|White structure|白品种结构|Sauvignon Blanc, Sémillon and Muscadelle underpin major white-wine styles.|Sauvignon Blanc、Sémillon、Muscadelle 构成主要白酒风格基础。|c
winemaking|Dry and sweet whites|干白与甜白|Dry white and noble-rot sweet-wine production pursue different harvest and fermentation outcomes.|干白与贵腐甜酒追求不同采收及发酵结果。|a,c
appellations|1855 red scope|1855 红酒范围|Médoc estates plus Château Haut-Brion in Graves form the red classification.|Médoc 酒庄加 Graves 的 Château Haut-Brion 构成红酒名单。|f
appellations|Five red ranks|红酒五级|The red classification has five ranks, from first to fifth growth; estates are ranked, not Burgundy-style Climats.|红酒由一级至五级，分级对象为酒庄，而非 Bourgogne 式 Climats。|g
appellations|Sweet-white list|甜白名单|Sauternes and Barsac have a separate 1855 sweet-white classification.|Sauternes、Barsac 有独立 1855 甜白分级。|f
appellations|Graves|Graves|Graves has its own classification separate from the 1855 system.|Graves 有独立于 1855 的自身分级。|k
appellations|Saint-Émilion|Saint-Émilion|Its estate classification is periodically revised; Saint-Émilion Grand Cru AOC alone does not mean Grand Cru Classé.|酒庄分级定期修订；Saint-Émilion Grand Cru AOC 本身不等于 Grand Cru Classé。|k
appellations|Crus Bourgeois|Crus Bourgeois|A separate Médoc classification for red wines; it is not a subset of the 1855 list.|Médoc 红酒另一分级，不是 1855 名单子集。|k
appellations|Crus Artisans|Crus Artisans|A distinct Médoc classification associated with smaller craft-oriented estates; not a grape or a synonym for Cru Bourgeois.|与较小手工经营酒庄相关的 Médoc 独立分级；不是品种，也不是 Cru Bourgeois 同义词。|k
appellations|AOC versus rank|产区与等级|Appellation describes protected origin; classification describes a separate historical estate-ranking context.|法定产区描述受保护产地；分级是另一历史酒庄等级体系。|k,f
producers|Château Lafite Rothschild|Château Lafite Rothschild|Located in Pauillac and a first growth in the 1855 classification.|位于 Pauillac，为 1855 一级庄。|l,g
producers|Château Haut-Brion|Château Haut-Brion|The Graves exception in the red 1855 classification illustrates why geography and ranking must both be retained.|1855 红酒分级的 Graves 例外，说明须同时保留地理与等级。|f
''',('Use the actual bottle, vintage and maturation when planning decanting.','按具体酒款、年份及成熟状态安排醒酒。'))
profile('loire-valley','Loire Valley','region','''
a|InterLoire · Regional guide|https://www.vinsdeloire.fr/sites/interloire/files/2024-10/vins-de-loire-livret-pro-210x210-fr-version-num-2.pdf
b|InterLoire · Appellation guide|https://www.vinsdeloire.fr/sites/interloire/files/2025-11/guide-appellations-2024-bd_compressed.pdf
m|InterLoire · Vineyard map|https://www.vinsdeloire.fr/sites/interloire/files/inline-files/carte-vignobles-de-loire-010324.pdf
c|BIVC · Centre-Loire terroirs|https://www.vins-centre-loire.com/en/nos-terroirs/
h|Domaine Huet · Estate and vineyards|https://domainehuet.com/
i|InterLoire · Val de Loire IGP|https://www.vinsdeloire.fr/fr/vins-loire/igp-val-loire/tout-sur-ligp-val-loire
''','''
overview|Identity|身份|A west–east sequence of independent wine regions along the Loire and its tributaries, not one appellation.|沿 Loire 与支流由西向东的一系列独立酒区，不是单一法定产区。|a
history|River trade|河运|River trade and monastic vineyards helped establish distinct local wine economies.|河运与修道院葡萄园帮助形成不同地方酒业。|a
geography|Regional sequence|区域顺序|Nantais → Anjou-Saumur → Touraine → Centre-Loire.|Nantais→Anjou-Saumur→Touraine→Centre-Loire。|a,m
climate|West to east|由西向东|Oceanic influence dominates westward; continental influence increases inland to the east.|西部海洋性明显，向东内陆大陆性加强。|a
soils|Western contrasts|西部对照|Nantais crystalline rocks and Anjou schist differ from the chalky tuffeau of Saumur and Touraine.|Nantais 结晶岩、Anjou 片岩，与 Saumur、Touraine 白垩质 tuffeau 不同。|a
soils|Centre-Loire families|Centre-Loire 土壤类群|Marly terres blanches, stony limestone caillottes and flint-rich clays are distinct geological families.|泥灰岩 terres blanches、多石石灰质 caillottes、富燧石黏土为不同类群。|c
soils|Quincy|Quincy|Alluvial sand and gravel terraces contrast with the marl and flint of other Centre-Loire sites.|冲积砂砾河阶与其他 Centre-Loire 地块泥灰岩、燧石不同。|c
grapes|Regional anchors|区域重点|Melon de Bourgogne, Chenin Blanc, Cabernet Franc and Sauvignon Blanc anchor different regional identities.|Melon de Bourgogne、Chenin Blanc、Cabernet Franc、Sauvignon Blanc 对应不同区域身份。|a,b
appellations|Muscadet|Muscadet|Muscadet uses Melon de Bourgogne, not Muscat; Muscadet Sèvre-et-Maine includes named communal crus.|Muscadet 用 Melon de Bourgogne，不是 Muscat；Muscadet Sèvre-et-Maine 有具名村庄 crus。|b,m
appellations|Savennières|Savennières|A key Anjou Chenin white-wine identity.|Anjou 重要 Chenin 白酒身份。|b
appellations|Layon|Layon|Coteaux du Layon and related sweet-wine identities require separate study of concentration and protected names.|Coteaux du Layon 及相关甜酒须另学浓缩方式、受保护名称。|b
appellations|Cabernet Franc centres|Cabernet Franc 核心|Saumur-Champigny, Chinon, Bourgueil and Saint-Nicolas-de-Bourgueil are distinct red-wine references.|Saumur-Champigny、Chinon、Bourgueil、Saint-Nicolas-de-Bourgueil 为不同红酒参照。|b
appellations|Vouvray / Montlouis|Vouvray／Montlouis|Separate Chenin appellations on opposite Loire banks near Tours; both include still and sparkling expressions.|Tours 附近 Loire 两岸的独立 Chenin 产区，兼有静止、起泡。|b,m
appellations|Sancerre / Pouilly-Fumé|Sancerre／Pouilly-Fumé|Sauvignon Blanc reference points; Sancerre also makes Pinot Noir red and rosé.|Sauvignon Blanc 核心；Sancerre 亦有 Pinot Noir 红、桃红。|b,c
winemaking|Sparkling identities|起泡身份|Crémant de Loire, Saumur and Vouvray have separate rules despite shared bottle-fermentation principles.|Crémant de Loire、Saumur、Vouvray 虽同有瓶中发酵，规则各异。|b
winemaking|Style diversity|风格多样|Dry, sweet, still and sparkling wines coexist; no single Loire recipe covers them all.|干、甜、静止、起泡并存，没有统一 Loire 配方。|a,b
appellations|Val de Loire IGP|Val de Loire IGP|The broad IGP is distinct from the many AOCs and descends from the earlier Jardin de la France designation.|广域 IGP 独立于各 AOC，源自早期 Jardin de la France 名称。|i
producers|Domaine Huet|Domaine Huet|Founded in 1928 by Victor and Gaston Huet at Vouvray, with Chenin as its reference grape.|1928 年由 Victor、Gaston Huet 在 Vouvray 创立，以 Chenin 为核心。|h
producers|Three vineyards|三个葡萄园|Le Haut-Lieu, Le Mont and Clos du Bourg are the estate's principal site identities.|Le Haut-Lieu、Le Mont、Clos du Bourg 为主要地块。|h
soils|Huet site contrasts|Huet 地块对照|Le Haut-Lieu: deeper clay; Le Mont: flint-bearing soils; Clos du Bourg: limestone.|Le Haut-Lieu：较深黏土；Le Mont：含燧石；Clos du Bourg：石灰岩。|h
''',('Compare dry and sweet Chenin while holding producer and site constant.','固定酒庄及地块比较干、甜 Chenin。'))
profile('rhone-valley','Rhône Valley','region','''
a|Inter Rhône · Territory and terroir|https://www.vins-rhone.com/en/territory-and-terroir
b|Syndicat Côtes du Rhône · Hierarchy|https://www.cotesdurhone.com/en/appellations/cotes-du-rhone-and-cotes-du-rhone-villages
c|Inter Rhône · Cornas|https://www.vins-rhone.com/en/cotes-du-rhone-cru-aoc-cornas
p|Inter Rhône · Saint-Péray|https://www.vins-rhone.com/en/cotes-du-rhone-cru-aoc-saint-peray
g|E. Guigal · Condrieu|https://www.guigal.com/en/wine/condrieu/
f|Famille Perrin · Beaucastel Rouge|https://m.familleperrin.com/01LV0E
''','''
overview|Identity|身份|A north–south wine corridor with many independent AOCs; Rhône Valley geography is broader than Côtes du Rhône AOC.|南北向葡萄酒走廊，含许多独立 AOC；Rhône Valley 地理范围广于 Côtes du Rhône AOC。|a,b
history|Appellation development|产区发展|Côtes du Rhône gained AOC status in 1937; individual crus have their own recognition histories.|Côtes du Rhône 于 1937 年获 AOC；各 cru 有独立认可史。|b
geography|Northern and southern sectors|南北片区|The river corridor links the Vienne area with Avignon; steep northern slopes contrast with wider southern landscapes.|河流走廊连接 Vienne 与 Avignon；北部陡坡与南部较开阔地貌不同。|a
climate|Climate gradient|气候梯度|Northern conditions are more continental; the south is Mediterranean with important Mistral influence.|北部较大陆性，南部地中海性，Mistral 影响重要。|a
soils|Northern foundations|北部地质|Granite-derived slopes are important but not universal; limestone and sedimentary deposits also occur.|花岗岩风化坡地重要，但并非处处如此；也有石灰岩及沉积物。|a,p
soils|Southern mosaic|南部组合|Clay, limestone, sand and rounded galets vary across southern appellations.|黏土、石灰岩、砂、圆砾 galets 随南部产区变化。|a
grapes|Red contrast|红品种对照|Syrah anchors northern reds; Grenache and multivariety blends become central in the south.|Syrah 为北部红酒核心；南部 Grenache 及多品种调配更突出。|a,c,f
grapes|White contrast|白品种对照|Viognier defines Condrieu and Château-Grillet; Marsanne and Roussanne define other northern white identities.|Viognier 对应 Condrieu、Château-Grillet；其他北部白酒侧重 Marsanne、Roussanne。|c,p,g
appellations|Hierarchy|层级|Côtes du Rhône → Côtes du Rhône Villages → individual crus is the familiar hierarchy.|Côtes du Rhône→Côtes du Rhône Villages→独立 crus 为常用层级。|b
appellations|Eight northern crus|北部八 crus|Côte-Rôtie, Condrieu, Château-Grillet, Saint-Joseph, Crozes-Hermitage, Hermitage, Cornas and Saint-Péray.|Côte-Rôtie、Condrieu、Château-Grillet、Saint-Joseph、Crozes-Hermitage、Hermitage、Cornas、Saint-Péray。|b
appellations|Cornas|Cornas|Red wine from Syrah alone; AOC recognition dates to 1938.|仅 Syrah 红酒；1938 年获 AOC。|c
geography|Cornas position|Cornas 位置|Right bank in Ardèche, between Saint-Joseph to the north and Saint-Péray to the south.|Ardèche 的右岸，北邻 Saint-Joseph、南邻 Saint-Péray。|c
soils|Cornas terms|Cornas 术语|Gores are decomposed-granite soils; chaillées are dry-stone terrace walls.|Gores 为风化花岗岩土壤；chaillées 为干砌石梯田墙。|c
geography|Cornas exposures|Cornas 坡向|Steep east- and southeast-facing slopes form protected vineyard settings.|陡峭东、东南坡形成受遮蔽葡萄园环境。|c
appellations|Saint-Péray|Saint-Péray|Still and traditional-method sparkling whites use Marsanne and Roussanne near Valence on the right bank.|Valence 附近右岸，用 Marsanne、Roussanne 酿静止及传统法起泡白酒。|p
soils|Saint-Péray diversity|Saint-Péray 多样性|Crussol limestone, granite, loess, clay and alluvium refute a single-soil northern Rhône model.|Crussol 石灰岩、花岗岩、黄土、黏土、冲积物反驳北 Rhône 单一土壤模型。|p
history|Saint-Péray sparkling|Saint-Péray 起泡史|Louis-Alexandre Faure made the cited first sparkling wine in 1829; AOC recognition followed in 1936.|记载首款起泡酒由 Louis-Alexandre Faure 于 1829 年制作；1936 年获 AOC。|p
winemaking|Blending variation|调配差异|Single-variety Cornas contrasts with northern whites and southern red blends; permitted composition is appellation-specific.|单品种 Cornas 与北部白、南部红调配不同；许可组成依产区而定。|c,p,f
producers|E. Guigal|E. Guigal|Condrieu is a direct producer reference for Viognier.|Condrieu 为 Viognier 的直接酒庄实例。|g
producers|Château de Beaucastel|Château de Beaucastel|Châteauneuf-du-Pape Rouge illustrates the southern multivariety blend tradition.|Châteauneuf-du-Pape Rouge 展示南部多品种调配传统。|f
''',('Contrast Cornas, Condrieu and Châteauneuf-du-Pape using actual grape and cellar data.','依据实际品种及酿造资料比较 Cornas、Condrieu、Châteauneuf-du-Pape。'))
profile('jura-franche-comte','Jura & Franche-Comté','region','''
a|Jura Tourism · Appellations|https://www.jura-tourism.com/vivre-le-jura/deguster/vins-du-jura/vins-jura-appellations/
b|Jura Tourism · Vin jaune|https://www.jura-tourism.com/vivre-le-jura/deguster/vins-du-jura/vins-jura-appellations/vin-jaune/
c|CIVJ · Professional guide|https://www.jura-vins.com/medias/documents-a-telecharger/docs-utiles/CIVJ_PLQ_Pro_2009_GB_web.pdf
v|Domaine Clavelin · Vin jaune|https://www.clavelin.fr/vin/vin-jaune-cotes-du-jura
p|Domaine de la Pinte · Estate|https://lapinte.fr/qui-sommes-nous/
m|Domaine Maire · Vin jaune|https://www.domainemaire.com/fr/nos-vins.r-460/grandes-parcelles.r-469/vin-jaune-cotes-du-jura.v-18776.html?id_millesime=24
''','''
overview|Identity|身份|Jura combines local grapes, topped-up whites and sous-voile styles; wider Franche-Comté heritage extends beyond these AOCs.|Jura 结合地方品种、添桶白酒与酒膜风格；更广 Franche-Comté 传统不限于这些 AOC。|a
history|Arbois|Arbois|AOC recognition in 1936 places Arbois among the earliest French wine appellations.|1936 年认可使 Arbois 成为法国最早一批葡萄酒 AOC。|a
geography|Western foothills|西侧山麓|Vineyards cluster around Arbois, Poligny and Lons-le-Saunier on the western Jura foothills.|葡萄园聚集于 Jura 西侧山麓 Arbois、Poligny、Lons-le-Saunier 周边。|a,c
climate|Inland conditions|内陆条件|Cold winters, warm summers and significant rainfall shape the vineyard cycle.|寒冬、温暖夏季及较多降雨塑造生长周期。|c
soils|Marl and limestone|泥灰岩与石灰岩|Blue and grey marls and limestone provide key geological references.|蓝、灰泥灰岩及石灰岩为主要地质参照。|c
grapes|White grapes|白品种|Chardonnay and Savagnin are the principal white references.|Chardonnay、Savagnin 为主要白品种参照。|a
grapes|Red grapes|红品种|Poulsard, Trousseau and Pinot Noir form the core red-grape set.|Poulsard、Trousseau、Pinot Noir 构成红品种核心。|a
winemaking|Ouillé|Ouillé|Topping up limits headspace and oxygen exposure; Savagnin can be made ouillé without becoming vin jaune.|添桶减少顶部空间与氧接触；Savagnin 可以添桶酿造，并不成为 vin jaune。|a
winemaking|Sous voile|Sous voile|A surface yeast veil produces biological ageing distinct from simple air oxidation.|表面酵母膜形成生物陈年，与简单空气氧化不同。|b,v
winemaking|Vin jaune grape|Vin jaune 品种|Vin jaune is made from Savagnin.|Vin jaune 用 Savagnin。|b
winemaking|Vin jaune ageing|Vin jaune 陈年|The reference duration is six years and three months from harvest, including long ageing without topping up under voile.|参照期限为采收后六年三个月，其中长时间不添桶、酒膜下陈年。|c,m
winemaking|Clavelin|Clavelin|The traditional bottle holds 62 cl; this does not establish a fixed evaporation percentage.|传统酒瓶容量 62 cl；不能据此断言固定蒸发比例。|v,m
winemaking|Vin de paille|Vin de paille|Harvested grapes are dried to concentrate must; this is not the same process as fortification or voile ageing.|采收后葡萄干燥浓缩汁液；与强化、酒膜陈年不同。|a,c
winemaking|Macvin|Macvin|A mistelle combining grape must and grape spirit; not a Savagnin synonym.|葡萄汁与葡萄烈酒组成的 mistelle；不是 Savagnin 同义名。|a,c
winemaking|Marc du Jura|Marc du Jura|Distilled grape-pomace spirit, distinct from Macvin and vin jaune.|葡萄渣蒸馏酒，与 Macvin、vin jaune 不同。|a,c
appellations|Four vin jaune areas|四个 vin jaune 产地|Arbois, Côtes du Jura, L’Étoile and Château-Chalon are the geographical vin jaune references.|Arbois、Côtes du Jura、L’Étoile、Château-Chalon 为 vin jaune 地理参照。|b
appellations|Château-Chalon|Château-Chalon|An individual appellation, not a synonym for all Jura vin jaune.|独立产区，不是全部 Jura vin jaune 的同义名。|b
appellations|Arbois-Pupillin|Arbois-Pupillin|Pupillin is a geographical designation associated with Arbois, not an additional grape.|Pupillin 为 Arbois 相关地理标示，不是另一品种。|p
producers|Domaine Clavelin|Domaine Clavelin|Côtes du Jura Vin Jaune provides a specific Savagnin and 62 cl clavelin reference.|Côtes du Jura Vin Jaune 为 Savagnin 与 62 cl clavelin 的具体实例。|v
producers|Domaine de la Pinte|Domaine de la Pinte|The Arbois estate works across Arbois, Arbois-Pupillin, Château-Chalon, Crémant and Macvin identities.|Arbois 酒庄涉及 Arbois、Arbois-Pupillin、Château-Chalon、Crémant、Macvin。|p
''',('Compare ouillé and sous-voile Savagnin before generalising about Jura oxidation.','先比较添桶及酒膜 Savagnin，再讨论 Jura 氧化风格。'))
profile('savoie','Savoie','region','''
a|Savoie wine organisation · Grapes|https://vindesavoie.fr/cepages
b|Vignobles Auvergne-Rhône-Alpes · Savoie|https://www.vignobles-aura.com/vignoble/savoie/
r|INAO · Roussette de Savoie Monthoux|https://www.inao.gouv.fr/produit/roussette-de-savoie-monthoux-16757
e|EU · Roussette de Savoie 2024|https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52024XC05918
s|INAO · Seyssel|https://www.inao.gouv.fr/produit/seyssel-13180
q|André et Michel Quenard · Estate|https://www.am-quenard.fr/
''','''
overview|Identity|身份|An Alpine mosaic of lake shores, valleys and steep slopes with sharply local grape identities.|阿尔卑斯湖岸、谷地与陡坡组合，品种身份具有鲜明地方性。|a,b
history|Local vineyard identities|地方葡萄园身份|Historic local vineyard names predate the modern Savoie and Roussette de Savoie framework.|历史地方葡萄园名早于现代 Savoie、Roussette de Savoie 体系。|b
geography|Principal sectors|主要片区|Combe de Savoie, Chautagne, Lac du Bourget, Léman shores and Ayze require separate mapping.|Combe de Savoie、Chautagne、Lac du Bourget、Léman 湖岸、Ayze 须分别定位。|b
climate|Mesoclimate|局地气候|Altitude, slope aspect and lake moderation matter alongside the general Alpine influence.|海拔、坡向、湖泊调节与整体阿尔卑斯影响同样重要。|b
soils|Geological diversity|地质多样性|Limestone scree, moraine, clay-marl, alluvium and local schist-bearing materials create varied sites.|石灰岩崩积、冰碛、黏土泥灰岩、冲积物及局部片岩形成不同地块。|b
grapes|Jacquère|Jacquère|Central to light-bodied local whites, especially Apremont, Abymes and Chignin references.|地方轻盈白酒核心，重点参照 Apremont、Abymes、Chignin。|a
grapes|Altesse|Altesse|The grape behind Roussette de Savoie.|Roussette de Savoie 对应品种。|r,e
grapes|Mondeuse|Mondeuse|A central red grape, with Arbin an important geographical reference.|核心红品种，Arbin 为重要地理参照。|a,b
grapes|Bergeron|Bergeron|The Savoyard name for Roussanne; distinct from Altesse.|Roussanne 的 Savoie 名，与 Altesse 不同。|a,q
grapes|Other local traditions|其他地方传统|Chasselas on Léman shores and Gringet around Ayze broaden the regional identity.|Léman 湖岸 Chasselas、Ayze 周边 Gringet 扩展地区身份。|a,b
appellations|Roussette de Savoie|Roussette de Savoie|An Altesse white appellation separate from Savoie AOC.|Altesse 白酒产区，独立于 Savoie AOC。|r,e
appellations|Four additions|四个附加名|Frangy, Marestel, Monterminod and Monthoux can supplement Roussette de Savoie under their own conditions.|Frangy、Marestel、Monterminod、Monthoux 可按各自条件附加于 Roussette de Savoie。|r,e
appellations|Chignin-Bergeron|Chignin-Bergeron|A Roussanne identity; not an Altesse wine.|Roussanne 身份，不是 Altesse 酒。|a,q
appellations|Arbin|Arbin|A geographical wine name for Mondeuse, not a different grape.|Mondeuse 的地理酒名，不是另一品种。|a,b
appellations|Seyssel|Seyssel|Separate from Savoie and Bugey; still whites and sparkling wines have distinct grape conditions.|独立于 Savoie、Bugey；静止白及起泡有不同品种条件。|s
winemaking|Seyssel still wines|Seyssel 静止酒|Altesse is the still-wine reference unless the Molette variety is explicitly indicated.|静止酒以 Altesse 为参照，明确标示 Molette 时例外。|s
winemaking|Seyssel sparkling|Seyssel 起泡|Molette and Altesse may be joined by Chasselas in sparkling blends.|起泡调配中 Molette、Altesse 可加入 Chasselas。|s
history|Seyssel chronology|Seyssel 年表|Local wine is documented from 1145; AOC recognition dates to 1942.|当地葡萄酒文献可追至 1145 年；1942 年获 AOC。|s
producers|André et Michel Quenard|André et Michel Quenard|The family estate sits at Chignin-Torméry on the Torméry hillside.|家族庄位于 Chignin-Torméry 的 Torméry 坡地。|q
producers|Producer appellations|酒庄产区|Its Vin de Savoie Chignin and Chignin-Bergeron wines illustrate local identities; do not conflate every producer named Quenard.|Vin de Savoie Chignin、Chignin-Bergeron 展示地方身份；不能混同所有名为 Quenard 的酒庄。|q
''',('Compare Jacquère, Altesse and Roussanne for structure and weight.','从结构及酒体比较 Jacquère、Altesse、Roussanne。'))
profile('provence','Provence','region','''
a|CIVP · Côtes de Provence|https://www.vinsdeprovence.com/les-appellations/cotes-de-provence
b|Regional tourism · Independent appellations|https://provence-alpes-cotedazur.com/en/things-to-do/wine-and-gastronomy/the-independent-designations-and-pgi-in-provence-alpes-cote-dazur/
c|INAO · Bandol|https://www.inao.gouv.fr/en/node/67
d|Maison des Vins de Bandol · Vineyard|https://www.maisondesvins-bandol.com/en/vineyard.cfm
p|INAO · Palette|https://inao.gouv.fr/produit/palette-rose-20023
s|Domaine Saint Jean · Bellet|https://saint-jean-bellet.com/
t|Clos Cibonne · Wines|https://www.clos-cibonne.com/gb/gamme-crus-classes-provence.html
''','''
overview|Identity|身份|Mediterranean southeastern France, with several independent AOCs and red, white and rosé traditions.|法国东南地中海区域，含多个独立 AOC 及红、白、桃红传统。|a,b
history|Côtes de Provence recognition|Côtes de Provence 认可|Côtes de Provence was recognised in 1977; other Provençal AOCs have their own histories.|Côtes de Provence 于 1977 年认可；其他 AOC 各有历史。|a
geography|Côtes de Provence extent|Côtes de Provence 范围|Parts of Var, Bouches-du-Rhône and Alpes-Maritimes; not the whole Provence wine region.|涉及 Var、Bouches-du-Rhône、Alpes-Maritimes 部分地区，不等于整个 Provence 酒区。|a
climate|Mediterranean conditions|地中海条件|Warm dry summers, wind and coastal or inland differences affect ripening and water balance.|温暖干燥夏季、风及海岸内陆差异影响成熟与水分。|a
soils|Limestone sectors|石灰岩片区|Northern and western Côtes de Provence are predominantly limestone.|Côtes de Provence 北、西侧主要为石灰岩。|a
soils|Crystalline sectors|结晶岩片区|Maures and Estérel in southern/eastern sectors provide crystalline-rock contrasts.|南、东侧 Maures、Estérel 提供结晶岩对照。|a
appellations|Named terroirs|具名风土|Sainte-Victoire, Fréjus, La Londe, Pierrefeu and Notre-Dame des Anges are named Côtes de Provence expressions; verify each current legal wording.|Sainte-Victoire、Fréjus、La Londe、Pierrefeu、Notre-Dame des Anges 为具名表达，各自现行法定措辞须核对。|a
appellations|Independent AOCs|独立 AOC|Bandol, Cassis, Palette and Bellet are separate from Côtes de Provence.|Bandol、Cassis、Palette、Bellet 独立于 Côtes de Provence。|b,c,p
appellations|Bandol|Bandol|AOC recognition dates to 1941; Mourvèdre is central, especially in structured reds.|1941 年获 AOC；Mourvèdre 为核心，尤其结构型红酒。|c
geography|Bandol communes|Bandol 市镇|Bandol, Le Beausset, La Cadière-d’Azur, Le Castellet, Évenos, Ollioules, Saint-Cyr-sur-Mer and Sanary-sur-Mer.|Bandol、Le Beausset、La Cadière-d’Azur、Le Castellet、Évenos、Ollioules、Saint-Cyr-sur-Mer、Sanary-sur-Mer。|d
grapes|Mourvèdre|Mourvèdre|Bandol's key red grape does not describe its separate white-wine composition.|Bandol 核心红品种不能用来概括其白酒组成。|c
grapes|Tibouren|Tibouren|Clos Cibonne documents a specific Tibouren tradition rather than generic Grenache rosé.|Clos Cibonne 记录特定 Tibouren 传统，不能泛化为 Grenache 桃红。|t
winemaking|Colour categories|酒色类别|Bandol makes red, rosé and white; different colour rules must be kept separate.|Bandol 生产红、桃红、白；不同酒色规则须分开。|c
winemaking|Élevage variation|陈年处理差异|Clos Cibonne's Tradition and Prestige ranges illustrate differences in élevage within Provence.|Clos Cibonne Tradition、Prestige 系列体现 Provence 内不同陈年处理。|t
geography|Bellet|Bellet|Bellet's hillsides are near Nice, unlike the more westerly Bandol vineyards.|Bellet 坡地靠近 Nice，与更西侧 Bandol 不同。|s,b
soils|Poudingue|Poudingue|Bellet includes rounded pebbles cemented as conglomerate, often on terraced slopes.|Bellet 含圆砾胶结砾岩，常见梯田坡地。|s
appellations|Palette|Palette|A small independent appellation near Aix-en-Provence, with its own grape specification.|Aix-en-Provence 附近小型独立产区，有自身品种规范。|p
producers|Clos Cibonne|Clos Cibonne|The Le Pradet estate's Tibouren Tradition and Prestige Caroline/Olivier are named producer references.|Le Pradet 酒庄的 Tibouren Tradition、Prestige Caroline／Olivier 为具名酒款参照。|t
producers|Domaine Saint Jean|Domaine Saint Jean|An actual Bellet producer reference with a hillside and poudingue account.|Bellet 实际酒庄参照，提供坡地与 poudingue 资料。|s
appellations|Geography versus appellation|地理与法定产区|A Provençal location does not automatically authorise Côtes de Provence on a label.|位于 Provence 不自动获准在酒标使用 Côtes de Provence。|a,b
''',('Assess rosé by grape, texture and élevage as well as colour.','除颜色外，按品种、质感与陈年处理评估桃红。'))
profile('languedoc','Languedoc','region','''
a|Languedoc syndicate · Terroir|https://www.languedoc-aoc.com/une-forte-identite-de-terroir
b|CIVL · Languedoc|https://languedoc-wines.com/en/appellations/pdo-languedoc/
c|CIVL · Pic Saint Loup|https://languedoc-wines.com/appellations/pic-saint-loup/
l|Languedoc syndicate · Appellations|https://www.languedoc-aoc.com/les-appellations
d|Pays d’Oc IGP · Grapes|https://www.paysdoc-vin.com/les-cepages/
p|Domaine Ampelhus · Picardan|https://domaineampelhus.fr/produit/picardan/
u|Domaine d’Aupilhac · Le Canaguier|https://www.aupilhac-laboutique.com/produit/le-canaguier/
r|Pierre Cros · Wines|https://www.pierrecros.fr/vins.php?gamme=noscuvyoes&la=fr&v=pierrecros&vinid=801&wines=description
''','''
overview|Identity|身份|A Mediterranean wine region containing many AOCs and IGPs; broad regional geography differs from Languedoc AOC.|地中海酒区，含多个 AOC、IGP；广义地区与 Languedoc AOC 不同。|a,b
history|2007 name change|2007 名称变化|Languedoc AOC replaced Coteaux du Languedoc in 2007; historical labels retain historical names.|Languedoc AOC 于 2007 年替代 Coteaux du Languedoc；历史酒标保留当时名称。|b
geography|Coast and foothills|海岸与山麓|Coastal plains, inland hills and the Cévennes foothills create strongly contrasting sites.|海岸平原、内陆丘陵、Cévennes 山麓形成明显不同地块。|a,c
climate|Mediterranean variation|地中海差异|Summer dryness and sunshine are moderated by elevation, exposure and distance from the sea.|夏季干旱与日照受海拔、坡向、距海远近调节。|a,c
soils|Multiple formations|多种地层|Limestone, clay, schist, sandstone and alluvial materials vary by appellation and site.|石灰岩、黏土、片岩、砂岩、冲积物依产区地块而变。|a,l
grapes|Red AOC references|红 AOC 品种|Grenache, Syrah and Mourvèdre are principal references in the regional Languedoc AOC summary.|大区 Languedoc AOC 摘要列 Grenache、Syrah、Mourvèdre 为主要参照。|a
grapes|Regional diversity|地区多样性|Carignan, Cinsaut and local white grapes broaden the regional picture; permissions differ by AOC.|Carignan、Cinsaut 及地方白品种扩展地区面貌，许可依 AOC 不同。|a,l
appellations|Regional blend|大区调配|The syndicate describes multivariety Languedoc AOC wines; this is not a universal recipe for every nearby appellation.|工会说明 Languedoc AOC 为多品种酒；不是每个邻近产区通用配方。|a
appellations|Major independent names|主要独立名|Corbières, Minervois, Saint-Chinian, Faugères, La Clape and Terrasses du Larzac require separate dossiers.|Corbières、Minervois、Saint-Chinian、Faugères、La Clape、Terrasses du Larzac 须独立档案。|l
appellations|Pic Saint Loup|Pic Saint Loup|Separate AOC recognition came in 2017.|2017 年获独立 AOC 认可。|c
geography|Pic Saint Loup position|Pic Saint Loup 位置|North of Montpellier near the Cévennes foothills; distinct from hotter coastal plains.|Montpellier 以北、Cévennes 山麓附近，与更热海岸平原不同。|c
soils|Pic Saint Loup massif|Pic Saint Loup 山体|The limestone massif is a clear local geographical and geological anchor.|石灰岩山体是明确地方地理、地质定位。|c
appellations|Picpoul de Pinet|Picpoul de Pinet|A distinct protected appellation; retain the complete geographical name rather than treating it as a broad synonym for all Piquepoul wine.|独立受保护产区，应保留完整地理名，不是全部 Piquepoul 酒的泛称。|l
appellations|Limoux identities|Limoux 身份|Limoux's still and sparkling appellation identities must be distinguished rather than grouped as one wine style.|Limoux 静止及起泡产区身份须分开，不能归为一种风格。|l
appellations|Pays d’Oc|Pays d’Oc|A broad IGP with extensive varietal labelling; not a synonym for Languedoc AOC.|广域 IGP，广泛使用品种标示，不是 Languedoc AOC 同义名。|d
winemaking|Wine category|酒款类别|A rare-grape bottling's actual IGP, AOC or Vin de France category must be read from its own producer information.|稀有品种酒实际 IGP、AOC 或 Vin de France 类别须查自身酒庄资料。|p,u,r
grapes|Conservation distinction|保育区别|Experimental or conservation planting does not establish appellation authorisation.|试验或保育种植不等于法定产区许可。|r,a
producers|Domaine Ampelhus|Domaine Ampelhus|Picardan provides a concrete rare white-grape bottle reference.|Picardan 提供具体稀有白品种酒款实例。|p
producers|Domaine d’Aupilhac|Domaine d’Aupilhac|Le Canaguier is a specific cuvée whose producer sheet determines composition.|Le Canaguier 为特定 cuvée，组成由酒庄资料确定。|u
producers|Pierre Cros|Pierre Cros|The estate's rare-variety work broadens the region beyond its dominant commercial grapes.|酒庄稀有品种实践扩展地区范围，超出主流商业品种。|r
''',('Compare inland and coastal wines without assuming that every warm-climate wine has the same structure.','比较内陆与海岸酒，不预设所有暖区酒结构相同。'))
profile('roussillon','Roussillon','region','''
a|CIVR · Côtes du Roussillon|https://www.roussillon.wine/vins-et-terroirs/nos-aoc-et-igp/aop-cotes-du-roussillon/
b|CIVR · Rivesaltes|https://www.roussillon.wine/vins-et-terroirs/nos-aoc-et-igp/aop-rivesaltes/
c|CIVR · Regional dossier|https://www.roussillon.wine/wp-content/uploads/2023/05/dossier-de-presse-2022-gb-_compressed.pdf
d|CIVR · AOP and IGP|https://www.roussillon.wine/vins-et-terroirs/nos-aoc-et-igp/
e|CIVR · Terroirs|https://uk.winesofroussillon.com/explore/
m|Mas Amiel · Sweet wines|https://eu.masamiel.com/collections/vin-doux
''','''
overview|Identity|身份|A southern French region combining dry wines and fortified vins doux naturels beside the Mediterranean and Pyrenees.|地中海与比利牛斯旁法国南部地区，兼有干酒及强化 vins doux naturels。|c,d
history|Sweet-wine heritage|甜酒传统|Banyuls, Maury and Rivesaltes were early modern appellation identities associated with vin doux naturel.|Banyuls、Maury、Rivesaltes 为与 vin doux naturel 相关的早期现代法定身份。|c
geography|River valleys|河谷|Agly, Têt and Tech structure the vineyard geography.|Agly、Têt、Tech 构成葡萄园地理主轴。|a
geography|Boundaries|周边地貌|Corbières, Canigou, Albères and the Mediterranean frame the region.|Corbières、Canigou、Albères 与地中海界定周边。|a
climate|Mediterranean / wind|地中海／风|Dry sunny conditions and strong winds interact with altitude and maritime exposure.|干燥日照、强风与海拔、面海程度共同作用。|c
soils|Schist contrasts|片岩对照|Maury's inland schist and Banyuls/Collioure's sea-facing schist terraces differ in mesoclimate.|Maury 内陆片岩与 Banyuls／Collioure 面海片岩梯田局地气候不同。|e
soils|Other formations|其他地层|Clay, limestone, gravel and sandy materials prevent a one-soil regional description.|黏土、石灰岩、砾石、砂质材料使全区单一土壤描述不成立。|a,e
grapes|Grenache family|Grenache 家族|Grenache Noir, Blanc and Gris have separate roles across dry and fortified styles.|Grenache Noir、Blanc、Gris 在干、强化酒中各有角色。|b,c
grapes|Muscat|Muscat|Muscat-based sweet wines have a different aromatic grape basis from Grenache-led VDN.|Muscat 甜酒的芳香品种基础不同于 Grenache 主导 VDN。|c,d
appellations|Dry names|干酒名称|Collioure, Côtes du Roussillon, Côtes du Roussillon Villages and Maury sec are key dry-wine identities.|Collioure、Côtes du Roussillon、Côtes du Roussillon Villages、Maury sec 为重点干酒身份。|c,d
appellations|VDN names|VDN 名称|Banyuls, Banyuls Grand Cru, Maury, Rivesaltes and Muscat de Rivesaltes are key sweet fortified references.|Banyuls、Banyuls Grand Cru、Maury、Rivesaltes、Muscat de Rivesaltes 为强化甜酒重点。|c,d
winemaking|Mutage|Mutage|Grape spirit interrupts fermentation, retaining grape sugar; naturel does not mean unfortified.|葡萄烈酒中断发酵、保留葡萄糖；naturel 不表示未强化。|c
winemaking|Oxidative versus fruit-preserving|氧化与保留果味|VDN may emphasise fresh fruit or prolonged oxidative ageing; fortification alone does not establish either style.|VDN 可重鲜果或长期氧化陈年，强化本身不能确定风格。|b,m
appellations|Rivesaltes Grenat|Rivesaltes Grenat|Grenat uses Grenache Noir and emphasises a different expression from ambré and tuilé.|Grenat 用 Grenache Noir，表达不同于 ambré、tuilé。|b
appellations|Rivesaltes Tuilé|Rivesaltes Tuilé|The cited official summary requires at least 50% Grenache Noir; tuilé is a style designation, not a grape.|所引官方摘要规定至少 50% Grenache Noir；tuilé 为风格名，不是品种。|b
appellations|Muscat coverage|Muscat 范围|Muscat de Rivesaltes includes the Banyuls and Maury areas; overlapping geography does not make the wines identical.|Muscat de Rivesaltes 覆盖 Banyuls、Maury 地区；地域重合不使酒相同。|d
appellations|Banyuls / Collioure|Banyuls／Collioure|The coastal wine landscape supports distinct fortified and dry appellation identities.|同一海岸葡萄酒景观支持不同强化、干酒产区身份。|c,e
producers|Mas Amiel|Mas Amiel|Produces both dry wines and VDN; not every bottle from the estate is sweet.|兼做干酒与 VDN，并非全庄酒都是甜酒。|m
producers|Vintage / oxidative ranges|年份／氧化系列|Its sweet-wine collection includes vintage and long oxidative-ageing expressions.|甜酒系列含年份型及长期氧化陈年型。|m
producers|Age statements|年龄标示|20-, 30- and 40-year oxidative sweet wines are age expressions, not interchangeable with harvest vintage.|20、30、40 年氧化甜酒为年龄表达，不能与采收年份互换。|m
''',('Contrast fruit-preserving VDN and oxidative VDN with different dishes.','针对保果味与氧化型 VDN 安排不同配餐。'))
profile('corsica','Corsica','region','''
a|Corsican wine board · AOP IGP VSIG|https://www.vinsdecorse.com/en/naturally-singular/aop-igp-and-vsig
b|Corsica tourism · Appellations|https://www.visit-corsica.com/en/Explore-Corsica/Our-inspirations/Wine-inspirations/Numerous-appellations-including-9-PDOs
c|Ajaccio tourism · PDO wines|https://www.ajaccio-tourisme.com/en/discover/heritage-and-identity/ajaccio-pdo-wines-the-mark-of-an-exceptional-terroir/
p|INAO · Patrimonio|https://www.inao.gouv.fr/produit/patrimonio-rose-16826
l|French specification · Patrimonio|https://www.legifrance.gouv.fr/loda/id/JORFTEXT000024278448/
d|Domaine Comte Abbatucci · Native wines|https://www.domaine-abbatucci.com/en/local-wines
v|Domaine Comte Abbatucci · Parcel wines|https://www.domaine-abbatucci.com/fr/vins-de-terroir/parcellaires
''','''
overview|Identity|身份|A mountainous Mediterranean island with distinct coastal, inland and local-variety identities.|多山地中海岛屿，海岸、内陆及地方品种身份各异。|a,b
history|Modern appellations|现代法定产区|Patrimonio recognition dates to 1968 and Ajaccio to 1984; local viticultural history is much older.|Patrimonio 于 1968 年、Ajaccio 于 1984 年认可，地方栽培史更早。|c,p,l
geography|Mountain and sea|山与海|Altitude, slope aspect and maritime exposure separate vineyard settings around the island.|海拔、坡向、面海程度使全岛葡萄园环境不同。|a,b
climate|Mediterranean variation|地中海差异|Summer dryness is modified by mountains, winds and coastal exposure.|夏季干燥受山地、风与海岸暴露调节。|a,b
soils|Ajaccio granite|Ajaccio 花岗岩|Western Ajaccio has a granite-based setting.|西部 Ajaccio 以花岗岩环境为重点。|c
soils|Patrimonio limestone|Patrimonio 石灰岩|Limestone-rich northern Patrimonio contrasts with western granitic areas.|北部 Patrimonio 富石灰质，与西部花岗岩区对照。|p,l
grapes|Niellucciu|Niellucciu|A key Patrimonio red identity; retain the canonical variety link rather than duplicating local spelling.|Patrimonio 关键红品种身份；保留标准品种链接，不因地方拼写重复建种。|a,p
grapes|Sciaccarellu|Sciaccarellu|Central to Ajaccio's red-wine identity.|Ajaccio 红酒身份核心。|c
grapes|Vermentinu|Vermentinu|A central island white reference, with regional spelling linked to the canonical variety.|岛屿核心白品种参照；地方拼写连接标准品种。|a,d
appellations|Protected identities|受保护身份|Ajaccio, Patrimonio, Corse and Muscat du Cap Corse have distinct protected identities.|Ajaccio、Patrimonio、Corse、Muscat du Cap Corse 各有受保护身份。|a
appellations|Corse additions|Corse 附加名|Calvi, Coteaux du Cap Corse, Figari, Porto-Vecchio and Sartène are geographical additions in the Corse framework.|Calvi、Coteaux du Cap Corse、Figari、Porto-Vecchio、Sartène 为 Corse 体系内附加地理名。|a
appellations|Counting caution|计数区别|Some regional summaries count those additions as appellations; this does not make all nine independent PDOs.|部分概述将附加名计作产区，不表示九项全为独立 PDO。|a,b
geography|Patrimonio communes|Patrimonio 市镇|Barbaggio, Farinole, Oletta, Patrimonio, Poggio-d’Oletta, Saint-Florent and Santo-Pietro-di-Tenda.|Barbaggio、Farinole、Oletta、Patrimonio、Poggio-d’Oletta、Saint-Florent、Santo-Pietro-di-Tenda。|l
geography|Patrimonio position|Patrimonio 位置|The Gulf of Saint-Florent provides the northern geographical reference.|Saint-Florent 湾为北部地理参照。|p,l
grapes|Rare varieties|稀有品种|Abbatucci cultivates numerous native varieties, documenting conservation and actual wine use.|Abbatucci 栽培多种本地品种，记录保育与实际酿酒使用。|d
appellations|Use versus permission|使用与许可|Estate cultivation alone does not prove Ajaccio AOC authorisation for every rare variety.|酒庄栽培本身不证明每种稀有品种均获 Ajaccio AOC 许可。|d,c
history|Abbatucci revival|Abbatucci 复兴|The estate traces native-variety work to the 1960s and its first Collection wines to 2006.|酒庄将本地品种工作追至 1960 年代，首批 Collection 酒为 2006 年。|d
producers|Ranges|系列|Faustine, Parcellaires and Collections are wine ranges, not grape classifications.|Faustine、Parcellaires、Collections 是酒系列，不是品种分级。|d
producers|Collection names|Collection 酒名|Diplomate d’Empire, Général de la Révolution and Ministre Impérial are cuvées, not grapes.|Diplomate d’Empire、Général de la Révolution、Ministre Impérial 为 cuvée，不是葡萄。|d
producers|Monte Bianco|Monte Bianco|A Sciaccarello parcel wine; retain the actual bottle category instead of assuming every estate wine is Ajaccio AOC.|Sciaccarello 单地块酒；保留实际瓶装类别，不能预设全庄酒皆 Ajaccio AOC。|v
''',('Compare Sciaccarellu and Niellucciu with matched vintage and extraction.','在相近年份及萃取下比较 Sciaccarellu、Niellucciu。'))
def small(id,name,kind,url,body,second=None):
 pairs=[x.split('~') for x in body.strip().split('\n')]
 keys=['overview','history','geography','climate','soils','grapes','winemaking','appellations']
 labels=[('Identity','身份'),('Development','发展'),('Location','位置'),('Climate','气候'),('Geology','地质'),('Grape structure','品种结构'),('Styles','风格'),('Legal distinction','法律区别')]
 rows=[]
 for sec,(lab,lzh),(en,zh) in zip(keys,labels,pairs):rows.append('|'.join([sec,lab,lzh,en,zh,'a']))
 # Original variety associations are retained with status; these are not legal authorisation inferred from geography.
 grp=G.get(id,{})
 extraSources=[]
 for idx,e in enumerate(grp.get('entries',[])[:4]):
  key='x'+str(idx);extraSources.append('|'.join([key,e['name']+' regional evidence',e['sourceUrls'][0]]));rows.append('|'.join(['grapes',e['name'],e['name'],e['note']['en'],e['note']['zh'],key]))
 s='a|Official regional / producer reference|'+url
 if second:s+='\nb|Additional primary reference|'+second
 if extraSources:s+='\n'+'\n'.join(extraSources)
 profile(id,name,kind,s,'\n'.join(rows))
small('cahors','Cahors','appellation','https://www.vignobles-sudouest.fr/project/aop-cahors/','''
A Lot-valley red appellation centred on Malbec.~以 Malbec 为核心的 Lot 河谷红酒产区。
AOC recognition dates to 1971.~1971 年获 AOC。
Lot river terraces and higher limestone causses around Cahors.~Cahors 周边 Lot 河阶与较高石灰岩 causses。
Atlantic influence combines with warmer inland conditions.~大西洋影响与较温暖内陆条件结合。
Alluvial terraces contrast with limestone plateau soils.~冲积河阶与石灰岩高地土壤形成对照。
Malbec is central; Merlot and Tannat may complement it.~Malbec 为核心，Merlot、Tannat 可辅助。
Structured reds vary with terrace/plateau origin and extraction.~结构型红酒随河阶／高地来源及萃取不同。
Cahors AOC is red wine; white estate wines require another designation.~Cahors AOC 为红酒；酒庄白酒须另一名称。
''')
small('fronton','Fronton','appellation','https://www.vignobles-sudouest.fr/project/aop-fronton/','''
A red and rosé appellation distinguished by Négrette.~以 Négrette 为特色的红、桃红产区。
AOC recognition dates to 1975.~1975 年获 AOC。
Three old terraces on the Tarn's left bank, north of Toulouse.~Toulouse 北方 Tarn 左岸三层古河阶。
Oceanic and Mediterranean influences meet, with Autan wind.~海洋及地中海影响交汇，有 Autan 风。
Boulbènes, rougets and gravels distinguish terrace soils.~Boulbènes、rougets、砾石区分河阶土壤。
Négrette forms the core regional identity; permitted complements differ from a varietal-only rule.~Négrette 为地区核心，许可辅助品种意味着并非一概单品种。
Red and rosé styles express the aromatic grape with differing extraction.~红、桃红以不同萃取表达芳香品种。
Fronton is independent of Gaillac and the broad Toulouse wine geography.~Fronton 独立于 Gaillac 及广义 Toulouse 葡萄酒地理。
''')
small('gaillac','Gaillac','appellation','https://www.vignobles-sudouest.fr/project/aop-gaillac/','''
A Tarn-region appellation with unusually diverse local grapes and wine styles.~Tarn 地区产区，地方品种及风格多样。
White AOC recognition dates to 1938 and red to 1970.~白酒 AOC 1938 年认可，红酒 1970 年。
Vineyards lie along the Tarn and adjoining slopes around Gaillac.~葡萄园沿 Tarn 及 Gaillac 周边坡地。
Oceanic influence intersects with Mediterranean warmth and Autan wind.~海洋影响与地中海温暖、Autan 风交汇。
Gravel terraces, limestone slopes and clay-rich sites differ.~砾石河阶、石灰岩坡、富黏土地块不同。
Mauzac, Loin de l’Œil, Ondenc, Duras, Fer and Prunelard are key local references.~Mauzac、Loin de l’Œil、Ondenc、Duras、Fer、Prunelard 为地方重点。
Still wines, perlé whites and ancestral sparkling wines are separate expressions; ancestral fermentation starts in tank and finishes in bottle.~静止、perlé 白、祖传法起泡分别理解；祖传法发酵先槽内后瓶内。
A local grape does not prove Gaillac AOC: Plageoles Ondenc Sec is Côtes du Tarn IGP.~地方品种不证明 Gaillac AOC；Plageoles Ondenc Sec 为 Côtes du Tarn IGP。
''','https://www.vins-plageoles.com/nos-vins/ondenc-sec/')
small('madiran','Madiran','appellation','https://www.vignobles-sudouest.fr/project/aop-madiran/','''
A southwestern red appellation strongly associated with Tannat.~与 Tannat 密切相关的西南红酒产区。
AOC recognition dates to 1948.~1948 年获 AOC。
The foothill area crosses Gers, Hautes-Pyrénées and Pyrénées-Atlantiques.~山麓范围跨 Gers、Hautes-Pyrénées、Pyrénées-Atlantiques。
Atlantic rainfall and Pyrenean influence include warming foehn episodes.~大西洋降雨与比利牛斯影响，包括温暖焚风。
Clay, limestone and gravel-rich sites form distinct soil groups.~黏土、石灰岩、富砾石地块构成不同土组。
Tannat is central; Cabernet varieties can complement it.~Tannat 为核心，Cabernet 类可辅助。
Tannin management, extraction and maturation affect the structure of reds.~单宁管理、萃取与陈年影响红酒结构。
Madiran is red; Pacherenc du Vic-Bilh provides a separate white identity over the shared territory.~Madiran 为红酒；重合区域白酒另有 Pacherenc du Vic-Bilh 身份。
''')
small('pacherenc-du-vic-bilh','Pacherenc du Vic-Bilh','appellation','https://www.vignobles-sudouest.fr/project/aop-pacherenc-du-vic-bilh/','''
Dry and sweet whites sharing territory with Madiran red wines.~与 Madiran 红酒共享地域的干、甜白酒。
AOC recognition dates to 1948.~1948 年获 AOC。
The Madiran-area foothills span parts of three southwestern départements.~Madiran 一带山麓跨西南三个省的部分地区。
Autumn conditions and foehn can favour late picking and concentration.~秋季条件、焚风可有利晚采及浓缩。
Clay, limestone and gravel sectors vary across the hills.~黏土、石灰岩、砾石片区随丘陵变化。
Petit and Gros Manseng, Courbu and Petit Courbu are principal references; Arrufiac and Sauvignon have complementary roles.~Petit／Gros Manseng、Courbu、Petit Courbu 为主要参照；Arrufiac、Sauvignon 辅助。
Sec distinguishes dry wine; sweet expressions use concentrated later-picked grapes.~Sec 区分干酒；甜型用较晚采收的浓缩葡萄。
Pacherenc and Madiran are separate AOCs, not white and red grapes.~Pacherenc、Madiran 为独立 AOC，不是白、红葡萄名。
''')
small('marcillac','Marcillac','appellation','https://www.vignobles-sudouest.fr/project/aop-marcillac/','''
An Aveyron red and rosé appellation associated with Fer, locally Mansois.~Aveyron 红、桃红产区，关联 Fer，当地称 Mansois。
AOC recognition dates to 1990.~1990 年获 AOC。
Steep vineyards occupy the Marcillac basin near Rodez, often around 300–600 m.~陡坡葡萄园位于 Rodez 附近 Marcillac 盆地，常在约 300–600 米。
Oceanic, continental and Mediterranean influences interact with sheltered topography.~海洋、大陆、地中海影响与遮蔽地形交互。
Iron-rich red rougiers are a defining geological reference.~富铁红色 rougiers 为关键地质参照。
Fer / Mansois is central; the local synonym is not another variety.~Fer／Mansois 为核心；地方同义名不是另一品种。
Peppery red-fruit reds and rosés differ with extraction and maturation.~胡椒、红果红酒及桃红依萃取陈年不同。
Marcillac is a defined AOC, not every historic Aveyron vineyard.~Marcillac 为划定 AOC，不等于所有历史 Aveyron 葡萄园。
''')
small('irouleguy','Irouléguy','appellation','https://www.vignobles-sudouest.fr/project/aop-irouleguy/','''
French Basque foothill appellation producing red, rosé and white wines.~法国 Basque 山麓产区，产红、桃红、白。
AOC recognition dates to 1970.~1970 年获 AOC。
Terraced slopes lie around Saint-Jean-Pied-de-Port and Saint-Étienne-de-Baïgorry.~梯田坡地位于 Saint-Jean-Pied-de-Port、Saint-Étienne-de-Baïgorry 周边。
Wet Atlantic conditions combine with mountain exposure and foehn.~湿润大西洋条件与山地坡向、焚风结合。
Triassic red sandstone, limestone and clay are key formations.~三叠纪红砂岩、石灰岩、黏土为关键地层。
Tannat and Cabernets anchor reds; Manseng and Courbu-family grapes anchor whites.~Tannat、Cabernet 为红核心；Manseng、Courbu 类为白核心。
Steep-site farming and grape ripeness affect firm reds and fresh whites.~陡坡栽培、成熟度影响紧实红酒及清新白酒。
Irouléguy is independent of Jurançon despite shared southwestern grapes.~虽共享西南品种，Irouléguy 独立于 Jurançon。
''')
small('saint-mont','Saint Mont','appellation','https://www.vignobles-sudouest.fr/project/aop-saint-mont/','''
Gascon appellation combining red, rosé and white wines with active local-grape conservation.~Gascon 产区，兼红、桃红、白及活跃地方品种保育。
Reorganisation in the 1970s and 1981 recognition preceded AOC status in 2011.~1970 年代重组、1981 年认可，后于 2011 年获 AOC。
Vineyards lie in Gers around the Adour river system.~葡萄园位于 Gers 的 Adour 水系周边。
Atlantic influence varies with exposure and inland position.~大西洋影响随坡向、内陆位置变化。
Clay-limestone and gravelly or sandy sectors create varied sites.~黏土石灰质、砾石及砂质片区形成不同地块。
Tannat is a red anchor; Gros Manseng, Petit Courbu and Arrufiac are white references.~Tannat 为红重点；Gros Manseng、Petit Courbu、Arrufiac 为白参照。
White blends and structured reds are distinct productions; conservation parcels are separate evidence.~白调配、结构红为不同生产；保育地块证据另列。
A heritage grape found in Saint Mont does not automatically become an AOC-permitted grape.~在 Saint Mont 发现历史品种，不自动表示其获 AOC 许可。
''')
small('tursan','Tursan','appellation','https://www.vignobles-sudouest.fr/project/aop-tursan/','''
A Landes-area appellation whose Baroque-based whites distinguish it locally.~Landes 一带产区，Baroque 白酒具有地方特色。
AOC recognition dates to 2011.~2011 年获 AOC。
Rolling country in Landes near the Adour and adjoining Gers.~Adour 附近 Landes 及相邻 Gers 的起伏地区。
Atlantic moderation and rainfall affect vineyard management.~大西洋调节及降雨影响葡萄园管理。
Clay-limestone, sandy, gravel and pebble-rich soils form the principal contrasts.~黏土石灰质、砂质、砾石及多卵石土为主要对照。
Baroque and Gros Manseng are key whites; Tannat and Cabernet Franc anchor reds.~Baroque、Gros Manseng 为白重点；Tannat、Cabernet Franc 为红核心。
Red, rosé and dry white styles coexist.~红、桃红、干白并存。
Baroque is distinct from Gros Manseng; colour-specific composition must be retained.~Baroque 与 Gros Manseng 不同，须保留各酒色组成。
''')
small('cotes-du-marmandais','Côtes-du-Marmandais','appellation','https://www.vignobles-sudouest.fr/project/aop-cotes-du-marmandais/','''
A Garonne-side appellation with local Abouriou alongside Bordeaux-family grapes.~Garonne 两岸产区，地方 Abouriou 与 Bordeaux 系品种并存。
Modern regional identity preserves local diversity alongside Merlot and Cabernets.~现代地区身份在 Merlot、Cabernet 之外保留地方多样性。
Both Garonne banks around Marmande in Lot-et-Garonne.~Lot-et-Garonne 的 Marmande 附近 Garonne 两岸。
Oceanic influence combines with sunshine and Autan episodes.~海洋影响与日照、Autan 风相结合。
Right-bank clay-limestone molasse contrasts with left-bank alluvium and boulbènes.~右岸黏土石灰质 molasse 与左岸冲积物、boulbènes 对照。
Merlot and Cabernets mix with Abouriou; Sauvignon Blanc and Gris are white references.~Merlot、Cabernet 与 Abouriou 调配；Sauvignon Blanc、Gris 为白参照。
Red, rosé and white wines; Abouriou proportions vary by cuvée.~红、桃红、白并存；Abouriou 比例随 cuvée。
Distinct from Bordeaux and Côtes de Duras despite proximity.~虽相近，仍独立于 Bordeaux、Côtes de Duras。
''')
small('cotes-de-gascogne','Côtes de Gascogne IGP','appellation','https://www.vignobles-sudouest.fr/project/igp-cotes-de-gascogne/','''
A major Gascon wine IGP, particularly associated with aromatic whites.~Gascon 重要葡萄酒 IGP，尤其关联芳香白酒。
Diversification from distillation grapes helped establish modern table-wine production.~蒸馏葡萄用途多样化帮助建立现代葡萄酒生产。
Gers and adjoining Landes and Lot-et-Garonne overlap historic Armagnac territory.~Gers 及相邻 Landes、Lot-et-Garonne，与历史 Armagnac 地域重合。
Oceanic influence is stronger in the west, with inland variation.~西部海洋影响较强，内陆有所变化。
Bas-Armagnac sands and Ténarèze clay-limestone form major contrasts.~Bas-Armagnac 砂土与 Ténarèze 黏土石灰质为主要对照。
Colombard and Gros Manseng are key, with Ugni Blanc and Sauvignon among complements.~Colombard、Gros Manseng 为重点，Ugni Blanc、Sauvignon 等辅助。
Protective winemaking favours fresh whites; late-picked Manseng can produce sweetness.~保护性酿造突出清新白；晚采 Manseng 可酿甜。
Wine IGP, separate from Armagnac spirit and Floc de Gascogne.~葡萄酒 IGP，与 Armagnac 蒸馏酒、Floc de Gascogne 分开。
''')
small('bearn','Béarn','appellation','https://inao.gouv.fr/produit/bearn-rose-20047','''
Foothill red, rosé and white wines, with Raffiat de Moncade a white distinction.~山麓红、桃红、白酒，Raffiat de Moncade 为白酒特色。
Vineyards around medieval settlements survived contraction into the modern appellation.~中世纪聚落周边葡萄园经历萎缩，发展为现代产区。
Reference places include Orthez, Bellocq and Salies-de-Béarn near the gave de Pau.~定位包括 gave de Pau 附近 Orthez、Bellocq、Salies-de-Béarn。
Humid Atlantic conditions meet Pyrenean topography.~湿润大西洋条件与比利牛斯地形相遇。
River terraces and foothill sedimentary slopes differ by site.~河阶及山麓沉积坡地因地块不同。
Tannat and Cabernets are red references; Raffiat de Moncade and Manseng grapes matter in whites.~Tannat、Cabernet 为红参照；Raffiat de Moncade、Manseng 对白重要。
Extraction separates red and rosé styles; white blends retain distinct composition.~萃取区分红、桃红；白调配有独立组成。
Béarn, Jurançon and Madiran are separate AOCs despite shared regional geography.~Béarn、Jurançon、Madiran 虽共享地区地理，仍为独立 AOC。
''')
small('jurancon','Jurançon','appellation','https://www.inao.gouv.fr/en/node/35440','''
Pyrenean-foothill dry and sweet whites retaining strong acidity.~比利牛斯山麓干、甜白酒，保留鲜明酸度。
Béarn wine traditions predate the modern appellation; the cited specification was homologated in 2025.~Béarn 葡萄酒传统早于现代产区；所引规范于 2025 年核准。
Hills south and southwest of Pau.~Pau 以南及西南丘陵。
Wet oceanic conditions may be moderated by warm autumn foehn.~湿润海洋条件可受秋季温暖焚风调节。
Poudingue, clay and siliceous/calcareous materials vary by site.~Poudingue、黏土、硅质／石灰质材料随地块变化。
Petit and Gros Manseng are central; Courbu, Petit Courbu, Camaralet and Lauzet add diversity.~Petit／Gros Manseng 为核心，Courbu、Petit Courbu、Camaralet、Lauzet 增加多样性。
Sweet wine can use passerillé concentration; sweetness is not automatically evidence of noble rot.~甜酒可用风干浓缩；甜度不自动证明贵腐。
Sec identifies dry wine; Vendanges Tardives has separate production conditions.~Sec 标示干酒，Vendanges Tardives 有单独生产条件。
''','https://www.jurancon-lapeyre.fr/la-geologie-du-clos-lapeyre/')
small('bergerac-duras','Bergerac / Duras','region','https://www.vins-bergeracduras.fr/nos-cepages/','''
Neighbouring southwestern appellations with Bordeaux-family grapes and independent identities.~西南相邻产区，使用 Bordeaux 系品种但身份独立。
Dordogne trade and established local vineyards shaped wine production outside Bordeaux.~Dordogne 贸易与地方葡萄园塑造 Bordeaux 之外的生产。
Bergerac follows the Dordogne; Duras lies southwest in Lot-et-Garonne.~Bergerac 沿 Dordogne，Duras 在西南 Lot-et-Garonne。
Oceanic influence and autumn river humidity can favour noble rot in suitable years.~海洋影响及秋季河流湿度在合适年份有利贵腐。
Clay-limestone slopes contrast with gravel and alluvial sectors.~黏土石灰质坡地与砾石、冲积片区对照。
Merlot, Cabernet Franc and Cabernet Sauvignon dominate reds; Sémillon, Sauvignon and Muscadelle are white references.~Merlot、Cabernet Franc、Cabernet Sauvignon 为红主轴；Sémillon、Sauvignon、Muscadelle 为白参照。
Monbazillac and Saussignac emphasise sweet wines; Pécharmant is a red-wine identity.~Monbazillac、Saussignac 重点为甜酒；Pécharmant 为红酒身份。
Bergerac, Côtes de Bergerac, Côtes de Duras, Monbazillac, Montravel, Pécharmant, Rosette and Saussignac have separate rules.~Bergerac、Côtes de Bergerac、Côtes de Duras、Monbazillac、Montravel、Pécharmant、Rosette、Saussignac 规则独立。
''')
small('lorraine','Lorraine','region','https://vins-de-lorraine.fr/les-appellations-des-vins-de-lorraine/','''
Northeastern regional umbrella containing distinct Toul, Moselle and Meuse wine identities.~东北区域总称，包含 Toul、Moselle、Meuse 不同酒区身份。
Contraction through industrialisation, disease and war preceded modern revival; Côtes de Toul gained AOC in 1998.~工业化、病害、战争造成萎缩，后现代复兴；Côtes de Toul 1998 年获 AOC。
Toul lies west of Nancy; Moselle vineyards extend farther north, while Meuse is a separate IGP context.~Toul 在 Nancy 以西，Moselle 葡萄园更北，Meuse 另属 IGP。
Cool inland conditions favour sheltered slopes and careful frost management.~凉爽内陆条件使遮蔽坡地、避霜重要。
Sedimentary clay-limestone slopes are central in the Toul area.~Toul 一带以沉积黏土石灰质坡为核心。
Gamay, Pinot Noir and Auxerrois are key Toul references; Moselle has different permissions.~Gamay、Pinot Noir、Auxerrois 为 Toul 重点，Moselle 许可不同。
Toul vin gris uses direct pressing; white and red wines also exist.~Toul vin gris 用直接压榨，也生产白、红酒。
Lorraine is not one AOC; Côtes de Toul, Moselle and Côtes de Meuse must remain separate.~Lorraine 不是单一 AOC，Côtes de Toul、Moselle、Côtes de Meuse 须分开。
''','https://www.aoc-cotesdetoul.fr/')
small('beaujolais','Beaujolais','region','https://www.beaujolais.com/decouvrir/nos-12-appellations/','''
Gamay-focused region south of Mâcon, encompassing early-drinking and ageworthy cru wines.~Mâcon 以南以 Gamay 为核心，兼早饮及可陈年 cru 酒。
Gamay and regional trade shaped its identity; nouveau is one expression, not the whole region.~Gamay 与区域贸易塑造身份，nouveau 只是一种表达。
The ten crus occupy the northern sector; regional Beaujolais extends south toward Lyon.~十 crus 位于北部，大区 Beaujolais 向南延伸至 Lyon 方向。
Continental, oceanic and Mediterranean influences intersect.~大陆、海洋、地中海影响交汇。
Northern granite contrasts with clay-limestone and other southern formations.~北部花岗岩与南部黏土石灰质等地层对照。
Gamay dominates reds; Chardonnay supplies whites.~Gamay 主导红酒，Chardonnay 酿白。
Whole-bunch and semi-carbonic techniques coexist with destemming and conventional extraction.~整串、半二氧化碳浸渍与去梗、常规萃取并存。
The ten crus are Brouilly, Côte de Brouilly, Régnié, Morgon, Chiroubles, Fleurie, Moulin-à-Vent, Chénas, Juliénas and Saint-Amour; Beaujolais and Beaujolais-Villages are separate regional levels.~十 crus 为 Brouilly、Côte de Brouilly、Régnié、Morgon、Chiroubles、Fleurie、Moulin-à-Vent、Chénas、Juliénas、Saint-Amour；另有 Beaujolais、Beaujolais-Villages 大区层级。
''','https://www.beaujolais.com/en/cepage/gamay/')
small('centre-loire','Centre-Loire','region','https://www.vins-centre-loire.com/en/nos-terroirs/','''
A group of inland Loire appellations, particularly known for Sauvignon Blanc, with important red and other white identities.~Loire 内陆产区群，以 Sauvignon Blanc 突出，也有重要红酒及其他白酒。
Independent appellation histories developed around river crossings and local trade.~独立产区史围绕河流渡口、地方贸易发展。
Sancerre and Pouilly face one another across the Loire; Quincy and Reuilly lie farther west.~Sancerre、Pouilly 隔 Loire 相望，Quincy、Reuilly 更西。
Temperate continental conditions bring frost risk and variable ripening.~温和大陆性条件带来霜冻及成熟波动。
Terres blanches are marl-rich clay-limestone; caillottes are stony limestone; flint clay and Quincy's sand/gravel terraces differ.~Terres blanches 为富泥灰岩黏土石灰质，caillottes 为多石石灰质；燧石黏土、Quincy 砂砾河阶不同。
Sauvignon Blanc and Pinot Noir are central; Chasselas and Pinot Gris have specific local roles.~Sauvignon Blanc、Pinot Noir 为核心，Chasselas、Pinot Gris 各有地方角色。
Sancerre includes white, red and rosé; Pouilly-Fumé is a Sauvignon white identity.~Sancerre 有白、红、桃红，Pouilly-Fumé 为 Sauvignon 白酒身份。
Pouilly-Fumé and Pouilly-sur-Loire are distinct; the latter is associated with Chasselas.~Pouilly-Fumé 与 Pouilly-sur-Loire 不同，后者关联 Chasselas。
''','https://www.vins-centre-loire.com/files/Dossier-Vins-Centre-Loire-FR.pdf')
small('auvergne-allier','Auvergne / Allier','region','https://www.vignobles-aura.com/vignoble/saint-pourcain/','''
A Massif Central regional grouping containing distinct Auvergne and Saint-Pourçain identities.~Massif Central 区域组合，含不同 Auvergne、Saint-Pourçain 身份。
Saint-Pourçain's historic trade reputation predates its 2009 AOC recognition.~Saint-Pourçain 历史贸易声誉早于 2009 年 AOC。
Saint-Pourçain-sur-Sioule anchors the Allier vineyards; Auvergne sites extend farther south.~Saint-Pourçain-sur-Sioule 为 Allier 定位，Auvergne 葡萄园更南。
Continental and elevation effects shape ripening and frost exposure.~大陆性、海拔影响成熟及霜冻暴露。
Alluvial, limestone and granitic sectors at Saint-Pourçain should not be reduced to all-volcanic Auvergne.~Saint-Pourçain 冲积、石灰岩、花岗岩片区不能简化成全火山 Auvergne。
Tressallier is a distinctive Saint-Pourçain white reference alongside Chardonnay; Gamay and Pinot Noir are important reds.~Tressallier 与 Chardonnay 为 Saint-Pourçain 白酒重点，Gamay、Pinot Noir 为重要红品种。
Blended whites and red/rosé wines follow separate composition rules.~调配白酒与红、桃红有不同组成规则。
A regional grouping, not one appellation; Saint-Pourçain AOC must be recorded independently.~区域组合不是单一产区，Saint-Pourçain AOC 须独立记录。
''','https://www.moulins-tourisme.com/sejours/ou-acheter-des-produits-du-terroir/vignoble-du-saint-pourcain/')
small('cognac-charentes','Cognac / Charentes','region','https://www.cognac.fr/en/discover/the-cognac-region/cognac-grapes-varieties/','''
Charentais viticultural territory containing Cognac spirit production and separate wine identities; this profile is geographic, not a single wine AOC.~Charentes 栽培区域，含 Cognac 蒸馏酒及独立葡萄酒身份；本页为地理区域，不是单一葡萄酒 AOC。
Distillation and maritime trade shaped the regional vineyard economy.~蒸馏及海运贸易塑造地区葡萄园经济。
Six Cognac crus are Grande Champagne, Petite Champagne, Borderies, Fins Bois, Bons Bois and Bois Ordinaires.~Cognac 六 crus：Grande Champagne、Petite Champagne、Borderies、Fins Bois、Bons Bois、Bois Ordinaires。
Atlantic moderation supports relatively acidic grapes for distillation wine.~大西洋调节有利较高酸度的蒸馏基酒葡萄。
Chalky Champagne terrains contrast with Borderies and outer-cru soil mosaics.~白垩质 Champagne 地区与 Borderies、外圈 cru 土壤组合不同。
Ugni Blanc dominates, with Folle Blanche, Colombard, Montils, Sémillon and Folignan among authorised references.~Ugni Blanc 为主，另有 Folle Blanche、Colombard、Montils、Sémillon、Folignan 等获准参照。
Low-alcohol high-acid base wine is distilled and matured as Cognac; base wine is not a finished Cognac spirit.~低酒精高酸基酒蒸馏、陈年成为 Cognac，基酒不等于成品蒸馏酒。
Cognac is a protected spirit identity; Grande Champagne here is unrelated to sparkling Champagne AOC.~Cognac 为受保护蒸馏酒身份；此处 Grande Champagne 与起泡 Champagne AOC 无关。
''','https://www.cognac.fr/en/discover/a-unique-spirit/exceptional-spirit/')
small('armagnac','Armagnac','appellation','https://www.armagnac.fr/cepages-et-terroir','''
Protected Gascon grape-spirit identity with three principal terroirs.~受保护 Gascon 葡萄蒸馏酒身份，有三大风土区。
Long distillation traditions preceded the modern appellation framework.~长期蒸馏传统早于现代法定体系。
Bas-Armagnac, Armagnac-Ténarèze and Haut-Armagnac span Gers, Landes and Lot-et-Garonne.~Bas-Armagnac、Armagnac-Ténarèze、Haut-Armagnac 跨 Gers、Landes、Lot-et-Garonne。
Atlantic influence varies west to east across the Gascon hills.~大西洋影响由西向东随 Gascon 丘陵变化。
Sandy Bas-Armagnac contrasts with clay-limestone Ténarèze and more calcareous eastern areas.~砂质 Bas-Armagnac 与黏土石灰质 Ténarèze、更石灰质东部对照。
Ugni Blanc, Baco, Folle Blanche and Colombard are key grape references.~Ugni Blanc、Baco、Folle Blanche、Colombard 为重点品种。
Continuous Armagnac distillation is central; pot-still distillation is also permitted. Oak ageing changes the spirit after distillation.~连续 Armagnac 蒸馏重要，也许可壶式蒸馏；蒸馏后橡木陈年改变酒体。
Armagnac spirit, Floc de Gascogne and Côtes de Gascogne wine are different protected categories.~Armagnac 蒸馏酒、Floc de Gascogne、Côtes de Gascogne 葡萄酒为不同类别。
''','https://www.armagnac.fr/distillation-et-vieillissement')
small('ajaccio','Ajaccio','appellation','https://www.ajaccio-tourisme.com/en/discover/heritage-and-identity/ajaccio-pdo-wines-the-mark-of-an-exceptional-terroir/','''
Western Corsican appellation with a strong Sciaccarellu identity.~Corsica 西部产区，Sciaccarellu 身份突出。
AOC recognition dates to 1984.~1984 年获 AOC。
Vineyard sites extend around the Ajaccio area and surrounding western hills.~葡萄园围绕 Ajaccio 及西部周边丘陵。
Mediterranean warmth is modified by sea breezes and altitude.~地中海温暖受海风、海拔调节。
Granite-derived soils are the regional reference.~花岗岩风化土为地区参照。
Sciaccarellu, Niellucciu and Vermentinu are core local names.~Sciaccarellu、Niellucciu、Vermentinu 为核心地方名。
Red, rosé and white styles require separate grape composition.~红、桃红、白风格须分别看品种组成。
Ajaccio is an independent PDO, not a geographical addition to Corse.~Ajaccio 为独立 PDO，不是 Corse 附加地理名。
''')
small('patrimonio','Patrimonio','appellation','https://www.inao.gouv.fr/produit/patrimonio-rose-16826','''
Northern Corsican appellation associated with Niellucciu and limestone-rich sites.~Corsica 北部产区，关联 Niellucciu 与富石灰质地块。
AOC recognition dates to 1968.~1968 年获 AOC。
Around the Gulf of Saint-Florent, across seven specified communes.~Saint-Florent 湾周边，跨七个规定市镇。
Mediterranean conditions combine maritime exposure, wind and hillside differences.~地中海条件结合面海、风、坡地差异。
Limestone and clay-rich terrain contrasts with western Corsican granite.~石灰岩及富黏土地形与 Corsica 西部花岗岩对照。
Niellucciu anchors reds and rosés; Vermentinu is the white reference.~Niellucciu 为红、桃红核心；Vermentinu 为白参照。
Colour and extraction separate red, rosé and white identities.~酒色、萃取区分红、桃红、白身份。
Distinct from Muscat du Cap Corse even where production territories overlap.~即使生产地域重合，仍独立于 Muscat du Cap Corse。
''','https://www.legifrance.gouv.fr/loda/id/JORFTEXT000024278448/')
small('muscat-du-cap-corse','Muscat du Cap Corse','appellation','https://inao.gouv.fr/produit/muscat-du-cap-corse-6423','''
Corsican vin doux naturel appellation based on Muscat.~以 Muscat 为基础的 Corsica vin doux naturel 产区。
AOC recognition dates to 1993.~1993 年获 AOC。
Cap Corse and associated northern island communes form the designated territory.~Cap Corse 与相关北部市镇构成指定范围。
Mediterranean sunlight and maritime exposure influence ripening.~地中海日照、面海程度影响成熟。
Northern Corsican sites have varied formations; a single island-wide soil claim is inappropriate.~Corsica 北部地块地层多样，不能用全岛统一土壤概括。
Muscat Blanc à Petits Grains is the defining grape reference.~Muscat Blanc à Petits Grains 为决定性品种参照。
Mutage retains grape sugar in a fortified sweet wine; it is not a dry Muscat style.~Mutage 保留葡萄糖，形成强化甜酒，不是干型 Muscat。
Independent from Patrimonio and the Corse Coteaux du Cap Corse geographical addition.~独立于 Patrimonio 及 Corse 的 Coteaux du Cap Corse 附加名。
''','https://www.inao.gouv.fr/en/node/1751')
small('bandol','Bandol','appellation','https://www.inao.gouv.fr/en/node/67','''
Provençal appellation particularly associated with Mourvèdre reds and rosés.~Provence 产区，尤其关联 Mourvèdre 红、桃红。
AOC recognition dates to 1941.~1941 年获 AOC。
Eight communes surround Bandol between coastal and inland hills.~八个市镇围绕 Bandol，跨海岸及内陆丘陵。
Mediterranean warmth, maritime influence and wind interact.~地中海温暖、海洋影响及风交互。
Limestone and marl slopes, often terraced, are key references.~石灰岩、泥灰岩坡地常成梯田，为重点参照。
Mourvèdre is central to reds; white-wine grapes require separate treatment.~Mourvèdre 为红酒核心，白品种须另列。
Red, rosé and white wines coexist; structured reds often receive extended wood maturation.~红、桃红、白并存，结构红常有较长木桶陈年。
Bandol is independent of Côtes de Provence; colour-specific rules cannot be interchanged.~Bandol 独立于 Côtes de Provence，各酒色规则不可互换。
''','https://www.maisondesvins-bandol.com/en/vineyard.cfm')
small('bellet','Bellet','appellation','https://saint-jean-bellet.com/','''
Small independent appellation on the hills above Nice.~Nice 上方丘陵的小型独立产区。
The local vineyard tradition survives within a strongly urbanised coastal setting.~地方葡萄园传统在高度城市化海岸环境中保留。
Terraced vineyard slopes overlook the Nice area.~梯田坡地俯瞰 Nice 一带。
Sea and mountain air moderate Mediterranean conditions.~海洋及山地气流调节地中海条件。
Poudingue conglomerates contain cemented rounded pebbles.~Poudingue 为圆砾胶结砾岩。
Rolle, Braquet and Folle Noire are key local references with different wine roles.~Rolle、Braquet、Folle Noire 为地方重点，酒中角色不同。
White, rosé and red styles cannot be reduced to generic Provençal rosé.~白、桃红、红不能简化为泛泛 Provence 桃红。
Bellet is independent of Côtes de Provence; local grapes are not interchangeable synonyms.~Bellet 独立于 Côtes de Provence，地方品种不是可互换同义名。
''')
small('palette','Palette','appellation','https://inao.gouv.fr/produit/palette-rose-20023','''
Small Provençal appellation near Aix-en-Provence with diverse traditional grapes.~Aix-en-Provence 附近小型 Provence 产区，有多样传统品种。
Historic estate vineyards underpin its modern appellation identity.~历史酒庄葡萄园支持现代产区身份。
The Arc valley near Aix provides the geographical setting.~Aix 附近 Arc 河谷为地理环境。
Mediterranean conditions interact with local valley exposure.~地中海条件与地方谷地朝向交互。
Limestone-based formations are key local references.~石灰岩地层为地方重点。
Clairette and other traditional white grapes matter; red and rosé compositions are distinct.~Clairette 等传统白品种重要，红、桃红组成不同。
Dry white, red and rosé wines have their own production conditions.~干白、红、桃红各有生产条件。
Palette is an independent AOC, not a Côtes de Provence village designation.~Palette 为独立 AOC，不是 Côtes de Provence 村庄标示。
''')
small('pays-doc','Pays d’Oc IGP','appellation','https://www.paysdoc-vin.com/les-cepages/','''
Broad southern French wine IGP with a strong varietal-wine identity.~法国南部广域葡萄酒 IGP，品种酒身份突出。
The Vin de Pays d’Oc framework developed into the modern IGP category.~Vin de Pays d’Oc 体系发展为现代 IGP。
The Mediterranean wine territory spans much of Languedoc-Roussillon.~地中海酒区范围跨 Languedoc-Roussillon 大部分地区。
Coastal and inland sites differ in heat, wind and elevation.~海岸、内陆地块在热量、风、海拔上不同。
A broad mosaic of limestone, clay, sand and other materials prevents one terroir prescription.~石灰岩、黏土、砂等广泛组合，不存在单一风土配方。
A wide authorised grape range includes international and local varieties.~广泛许可品种包含国际及地方品种。
Varietal and blended wines in multiple colours permit diverse producer approaches.~多酒色单品种、调配允许不同酒庄方法。
Pays d’Oc IGP is distinct from Languedoc AOC and other regional AOCs.~Pays d’Oc IGP 不同于 Languedoc AOC 及其他地区 AOC。
''')
small('bugey','Bugey','region','https://vinsdubugey.net/fr/','''
Ain foothill vineyards between Jura and Savoie, with distinct still and sparkling traditions.~Ain 山麓葡萄园，介 Jura、Savoie 之间，静止起泡传统各异。
Bugey and Roussette du Bugey gained AOC recognition in 2009.~Bugey、Roussette du Bugey 于 2009 年获 AOC。
Cerdon, Montagnieu and Belley are the main geographical sectors; Manicle is a specific named terroir.~Cerdon、Montagnieu、Belley 为主要片区，Manicle 为特定具名风土。
Mountain influence meets the warmer Rhône corridor; slope exposure matters.~山地影响与较暖 Rhône 走廊相遇，坡向重要。
Limestone, marl, slope scree and glacial deposits vary locally.~石灰岩、泥灰岩、崩积物、冰川沉积随地变化。
Chardonnay, Altesse, Gamay, Pinot Noir, Mondeuse and Poulsard have distinct roles.~Chardonnay、Altesse、Gamay、Pinot Noir、Mondeuse、Poulsard 各有角色。
Cerdon is an ancestral rosé sparkling reference; other sparkling wines use different conditions.~Cerdon 为祖传法桃红起泡重点；其他起泡条件不同。
Bugey and Roussette du Bugey are two AOCs; multiple colour/geographical expressions do not make each an independent AOC.~Bugey、Roussette du Bugey 为两个 AOC，多个酒色／地理表达不等于各为独立 AOC。
''','https://vinsdubugey.net/en/terroir/')
small('coteaux-du-gier','Coteaux du Gier','subregion','https://www.lesdeplaude.com/terroir-c%C3%A9pages/','''
A revived vineyard area around the Gier valley, important for rare local grapes.~Gier 谷地周边复兴葡萄园区，对稀有地方品种重要。
Domaine des Deplaude's revival work includes Mornen and Chouchillon.~Domaine des Deplaude 复兴工作涉及 Mornen、Chouchillon。
Slopes around Tartaras between the Lyon and Saint-Étienne areas.~Lyon、Saint-Étienne 之间 Tartaras 周边坡地。
Continental and warmer southern influences intersect in the valley.~大陆及较暖南方影响在谷地交汇。
Schist and mica-schist form the producer's principal soil references.~片岩、云母片岩为酒庄主要土壤参照。
Mornen and Chouchillon are rare references alongside better-known grapes.~Mornen、Chouchillon 为稀有重点，与较知名品种并存。
Producer-specific cuvées document revival rather than a uniform regional recipe.~酒庄特定 cuvée 记录复兴，不是统一地区配方。
This is a geographical revival area, not an invented independent Coteaux du Gier AOC.~这是地理复兴区，不虚构独立 Coteaux du Gier AOC。
''')
small('coteaux-du-lyonnais','Coteaux du Lyonnais','appellation','https://www.vignobles-aura.com/vignoble/coteaux-du-lyonnais/','''
Small wine appellation west and southwest of Lyon.~Lyon 西、西南的小型葡萄酒产区。
Modern producers and a cooperative maintain and renew a long local vineyard tradition.~现代酒庄、合作社保留并更新长期地方葡萄园传统。
Hillside sites lie between the Lyon urban area and surrounding uplands.~坡地位于 Lyon 城区与周边高地之间。
Continental, oceanic and Mediterranean influences meet.~大陆、海洋、地中海影响交汇。
Granitic and other local formations differ by vineyard sector.~花岗岩及其他地方地层随葡萄园片区不同。
Gamay anchors red and rosé; Chardonnay is the white reference.~Gamay 为红、桃红核心，Chardonnay 为白参照。
Fresh reds and rosés coexist with dry whites; cellar choices vary by producer.~清新红、桃红与干白并存，酿法依酒庄。
Independent from Beaujolais despite the shared Gamay emphasis.~虽同重 Gamay，仍独立于 Beaujolais。
''')
small('hautes-alpes','Hautes-Alpes IGP','appellation','https://inao.gouv.fr/produit/hautes-alpes-blanc-7857','''
Alpine departmental wine IGP with an important Mollard heritage.~阿尔卑斯省级葡萄酒 IGP，Mollard 传统重要。
The earlier Vin de Pays framework dates to 1968 in the INAO account.~INAO 记载前身 Vin de Pays 体系可追至 1968 年。
Highland valleys of Hautes-Alpes, distinct from Savoie and Isère.~Hautes-Alpes 高地河谷，独立于 Savoie、Isère。
Altitude and day–night temperature variation shape ripening.~海拔、昼夜温差塑造成熟。
Mountain-derived alluvium and slope deposits vary by valley.~山地冲积物、坡积物随河谷变化。
Mollard is a historic local red reference; other authorised grapes broaden production.~Mollard 为历史地方红重点，其他许可品种扩展生产。
Red, rosé and white wines reflect different sites and varieties.~红、桃红、白体现不同地块与品种。
Hautes-Alpes is a wine IGP, not an AOC synonymous with all Alpine wines.~Hautes-Alpes 为葡萄酒 IGP，不是所有阿尔卑斯酒的 AOC 泛称。
''','https://www.vinigp.fr/igp-departementales/igp-hautes-alpes/')
small('isere-dauphine','Isère / Dauphiné','region','https://gb.vins-coteaux-alpins.fr/10/igp-isere/','''
Regional vineyard geography containing Isère IGP and distinct local sectors.~地区葡萄园地理，含 Isère IGP 及不同地方片区。
Local grape revival preserves Dauphinois heritage after historical vineyard contraction.~历史葡萄园萎缩后，本地品种复兴保留 Dauphinois 传统。
Grésivaudan lies between Chartreuse and Belledonne; Balmes Dauphinoises is farther northwest around Bourgoin-Jallieu.~Grésivaudan 介 Chartreuse、Belledonne；Balmes Dauphinoises 更西北，在 Bourgoin-Jallieu 周边。
Continental conditions combine hot days, cooler nights and southern influences.~大陆条件结合热昼、凉夜及南方影响。
Grésivaudan has moraine and limestone scree; Balmes includes molasse, gravels and poudingue.~Grésivaudan 有冰碛、石灰岩崩积；Balmes 含 molasse、砾石、poudingue。
Persan, Verdesse, Étraire de la Dui and other local grapes preserve regional diversity.~Persan、Verdesse、Étraire de la Dui 等地方品种保留多样性。
White and red styles are producer- and grape-specific rather than one Alpine formula.~白、红风格依酒庄品种，不是单一阿尔卑斯配方。
Dauphiné geography is broader than a single legal Isère denomination.~Dauphiné 地理范围广于单一 Isère 法律名称。
''')
small('seyssel','Seyssel','appellation','https://www.inao.gouv.fr/produit/seyssel-13180','''
Small Rhône-crossing appellation for still and sparkling white wines.~横跨 Rhône 的小产区，酿静止及起泡白。
Local wine is documented from 1145; AOC recognition dates to 1942.~当地酒文献可追至 1145 年；1942 年获 AOC。
Corbonod and the two communes named Seyssel in Ain and Haute-Savoie.~Corbonod 及 Ain、Haute-Savoie 两个名为 Seyssel 的市镇。
Steep Rhône-facing slopes create local conditions within Alpine foothills.~面向 Rhône 陡坡在阿尔卑斯山麓形成地方气候。
Limestone-derived and glacial slope deposits provide geological references.~石灰岩来源及冰川坡地沉积为地质参照。
Still Altesse is the reference unless Molette is explicitly indicated; sparkling may also include Chasselas.~静止以 Altesse 为参照，明确 Molette 时例外；起泡可含 Chasselas。
Still white and mousseux require separate treatment.~静止白与 mousseux 须分别理解。
Seyssel is independent of Savoie and Bugey AOCs.~Seyssel 独立于 Savoie、Bugey AOC。
''')
small('bourgogne-aligote','Bourgogne Aligoté','appellation','https://www.bourgogne-wines.com/wine-and-terroir/bourgogne-and-its-appellations/gallery_files/site/321/402/79294/79302.pdf','''
Regional Bourgogne white appellation dedicated to Aligoté.~专门对应 Aligoté 的 Bourgogne 大区白酒产区。
Aligoté is documented in Burgundy from the seventeenth century; the AOC was recognised in 1937.~Aligoté 在 Burgundy 文献可追至十七世纪；AOC 于 1937 年认可。
The regional appellation spans eligible Bourgogne vineyard territory rather than one village.~大区产区跨合格 Bourgogne 葡萄园地域，不是单一村庄。
Semi-continental conditions and site exposure affect ripening and acidity.~半大陆性条件、地块朝向影响成熟酸度。
Limestone, marl and clay proportions vary among sites.~石灰岩、泥灰岩、黏土比例随地块。
Aligoté is the sole grape; Aligoté doré and vert terminology does not establish separate canonical varieties.~Aligoté 为单一品种；doré、vert 术语不构成独立标准品种。
Usually dry and high in acidity; stainless steel, lees work and oak vary by producer.~通常干、高酸；不锈钢、酒泥处理、橡木依酒庄。
Bourgogne Aligoté is regional; Bouzeron is a separate village AOC and must not be collapsed into it.~Bourgogne Aligoté 为大区，Bouzeron 为独立村庄 AOC，不能合并。
''','https://www.de-villaine.com/en/wines/1/bouzeron')
regs['bourgogne-aligote']['grapes']=[dict(grapeId='aligote',role=T('Sole grape of Bourgogne Aligoté AOC.','Bourgogne Aligoté AOC 单一品种。'),sourceIds=['a'],associationStatus='principal')]
d['unresolved']=[dict(id=x,reason='Topic/heritage or trial grouping, not an independent geographical region dossier.') for x in ['aveyron-heritage','garonne-quercy-heritage','france-resistant-variety-trials','southwest-pyrenean-heritage']]+[dict(id='france-scope',reason='All 45 geographical groups plus Bourgogne Aligoté covered; not all French AOCs. 34 shorter dossiers still need deeper producer coverage, current numerical legal audit and review banks. Maps/photos are not supplied; existing Bouzeron is untouched.')]
save()
