"""A bounded, independently checked bilingual estate/wine release; no seed import."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=root/'data/producers.json'
db=json.loads(path.read_text())
sources=[]
def source(key,title,url):
    sid='fr28-'+key
    sources.append({'id':sid,'title':title,'url':url,'type':'酒庄官方','checkedAt':'2026-10-28'})
    return sid
th=source('tempier-history','Domaine Tempier · History','https://www.domainetempier.com/lhistoire-tempier/')
tt=source('tempier-terroirs','Domaine Tempier · Terroirs','https://www.domainetempier.com/les-terroirs/')
sh=source('simone-history','Château Simone · History','https://chateau-simone.fr/histoire')
sa=source('simone-palette','Château Simone · Palette','https://chateau-simone.fr/en/aoc-palette')
scope_zh='2026-10-28 核对酒庄官网。首版档案；配比和工艺按未标年份的酒庄说明整理，不能替代具体年份技术表。'
scope_en='Estate sources checked 28 October 2026. First-edition profile; undated house specifications do not establish every vintage’s blend or production.'
def section(zh,en,ztext,etext,refs):
    return {'title':zh,'text':ztext,'sourceIds':refs},{'title':en,'text':etext,'sourceIds':refs}
def producer(pid,name,appellation,village,website,intro,en_intro,parts):
    return {'id':pid,'name':name,'country':'France','region':'Provence','regionIds':['fr-'+appellation.lower()],'appellation':appellation,'village':village,'website':website,'intro':intro,'scope':scope_zh,'relatedProducerIds':[],'newsIds':[],'sections':[p[0] for p in parts],'wines':[],'questions':[],'gaps':['逐年份技术表、酒瓶图片及完整服务建议持续补充。'],'translations':{'en':{'intro':en_intro,'scope':scope_en,'sections':[p[1] for p in parts],'gaps':['Dated vintage sheets, licensed bottle images and service guidance remain to be added.']}}}
tempier=producer('producer-fr-domaine-tempier','Domaine Tempier','Bandol','Le Plan du Castellet','https://www.domainetempier.com/','Bandol 的 Peyraud 家族酒庄。以 Mourvèdre 为核心，通过单一地块酒表达不同园址。','A Peyraud-family Bandol estate, with Mourvèdre-led wines and separate site bottlings.',[
 section('历史','History','Lulu Tempier 与 Lucien Peyraud 于 1940 年入驻。1943 年开始系统重植 Mourvèdre、Cinsault、Grenache；1960 年代，Jean-Marie 与 François 逐步将 La Tourtine、La Migoua 等地块分开酿造。','Lulu Tempier and Lucien Peyraud settled here in 1940. Replanting began in 1943. In the 1960s, Jean-Marie and François developed separate vinification for La Tourtine, La Migoua and later Cabassaou.',[th]),
 section('葡萄园','Vineyards','官网描述约 60 公顷的多地块体系。La Tourtine 约 5.5 公顷，向南、风强；La Migoua 约 11 公顷，位于 Beausset-Vieux，地质构造复杂；Cabassaou 约 1.5 公顷，避 Mistral 风、温暖，梯田土层浅。面积为酒庄描述，并非土地权属证明。','The estate describes about 60 ha across varied sites. La Tourtine is a windy south-facing 5.5 ha site; La Migoua spans 11 ha in geologically complex Beausset-Vieux; sheltered Cabassaou covers about 1.5 ha of shallow-soiled terraces. These figures describe sites, not legal ownership.',[tt]),
 section('酒款','Wines','本批收录三款地块红酒、Bandol Blanc 和 Bandol Rosé。基础红酒的旧名称与现行 Lulu & Lucien 酒标须另行对照年份。','This release includes three site reds, Bandol Blanc and Bandol Rosé. The historic basic-red name and current Lulu & Lucien label require a separate vintage identity check.',[tt])])
simone=producer('producer-fr-chateau-simone','Château Simone','Palette','Meyreuil','https://chateau-simone.fr/','位于 Aix-en-Provence 附近 Meyreuil 的 Rougier 家族酒庄，酿造 Palette 白、红和桃红。','A Rougier-family estate at Meyreuil near Aix-en-Provence, producing white, red and rosé Palette.',[
 section('历史','History','Rougier 家族自 1830 年持有酒庄。Palette 为独立产区；不应将 Château Simone 与整个 Palette 产区视为同一实体。','The Rougier family has owned the property since 1830. Château Simone is an estate within Palette, not another name for the entire appellation.',[sh,sa]),
 section('产区与葡萄园','Appellation & vineyards','Palette 位于 Aix-en-Provence 以东，石灰岩地质是关键背景。官网所述约 50 公顷是整个产区的面积，不能写成 Château Simone 自有葡萄园面积。酒庄酒款资料强调北向石灰质坡地和老藤。','Palette lies east of Aix-en-Provence on limestone-based terrain. The roughly 50 ha cited on the appellation page refers to the appellation, not the estate’s holdings. Estate wine sheets emphasize north-facing slopes and old vines.',[sa]),
 section('酒款','Wines','本批收录 Palette Blanc、Rouge 和 Rosé。Les Grands Carmes 是另外的系列，必须独立核对产地和酒标。','The three profiles are Palette Blanc, Rouge and Rosé. Les Grands Carmes is a separate range whose origin and labels must be checked independently.',[sh])])
def wine(p,slug,name,url,grapes,zh,en):
    sid=source(slug,p['name']+' · '+name,url)
    # Four parallel fields: place, grape, method, detail; no invented vintage or image.
    fields=['place','grape','method','detail']
    row={'id':'wine-fr-'+slug,'name':name,**dict(zip(fields,zh)),'sourceIds':[sid],'status':'source-listed','vintageScope':scope_zh,'grapeIds':grapes,'regionId':p['regionIds'][0],'denomination':p['appellation']+' AOC','translations':{'en':{**dict(zip(fields,en)),'vintageScope':scope_en}}}
    p['wines'].append(row)
red_zh='人工采收、分选，去梗破碎；本土酵母发酵约 3–4 周，foudre 熟成至少 18 个月。'
red_en='Sorted, destemmed fruit; native-yeast fermentation for 3–4 weeks, followed by at least 18 months in foudres.'
wine(tempier,'domaine-tempier-bandol-cabassaou','Cabassaou','https://www.domainetempier.com/vins-tempier/cuvee-cabassaou/',['monastrell','syrah','cinsault'],['La Tourtine 下方避风、温暖的梯田。','酒庄常规说明：Mourvèdre 92–94%，其余 Syrah、少量 Cinsault。',red_zh,'结构紧密、浓度高；酒庄强调其陈年潜力。'],['Warm, sheltered terraces below La Tourtine.','House composition: 92–94% Mourvèdre, with Syrah and a little Cinsault.',red_en,'A concentrated, tightly structured red described by the estate as suitable for extended cellaring.'])
wine(tempier,'domaine-tempier-bandol-la-migoua','La Migoua','https://www.domainetempier.com/vins-tempier/cuvee-la-migoua/',['monastrell','cinsault','garnacha-tinta','syrah'],['Beausset-Vieux 高处、地质复杂的园址。','常规说明：Mourvèdre 约 55%、Cinsault 约 25%、Grenache 约 15%，余为 Syrah。',red_zh,'口感饱满，强度与清新感并存。'],['An elevated, geologically complex site in Beausset-Vieux.','House composition: about 55% Mourvèdre, 25% Cinsault, 15% Grenache, plus Syrah.',red_en,'A broad-textured red combining intensity with freshness.'])
wine(tempier,'domaine-tempier-bandol-la-tourtine','La Tourtine','https://www.domainetempier.com/vins-tempier/cuvee-la-tourtine/',['monastrell','garnacha-tinta','cinsault'],['Le Castellet 附近约 5.5 公顷向阳、风大的高坡地。','常规说明：Mourvèdre 约 85%，配 Grenache、Cinsault。',red_zh,'兼具力量与精细结构的地块红酒。'],['A sunny, windy 5.5 ha hillside near Le Castellet.','House composition: about 85% Mourvèdre, with Grenache and Cinsault.',red_en,'A site red combining power with a refined structure.'])
wine(tempier,'domaine-tempier-bandol-bandol-blanc','Bandol Blanc','https://www.domainetempier.com/vins-tempier/bandol-blanc/',['clairette-blanche','trebbiano-toscano','vermentino','bourboulenc','marsanne'],['La Laidière、La Migoua、Petit Moulin 等较凉爽、晚熟地块。','Clairette 约 60%、Ugni Blanc 约 30%，配 Rolle、Bourboulenc、Marsanne。','在罐与 foudre 中酿造，装瓶前熟成约 10 个月。','保有南部白酒的质感和清新感，陈年可出现蜂蜜、海洋类气息。'],['Cooler, later-ripening sites including La Laidière, La Migoua and Petit Moulin.','House composition: 60% Clairette, 30% Ugni Blanc, plus Rolle, Bourboulenc and Marsanne.','Vinified in tanks and foudres; approximately ten months before bottling.','Fresh yet textured; the estate describes honeyed and marine development with age.'])
wine(tempier,'domaine-tempier-bandol-bandol-rose','Bandol Rosé','https://www.domainetempier.com/vins-tempier/bandol-rose/',['monastrell','garnacha-tinta','cinsault'],['来自酒庄多种黏土、石灰质地块。','常规说明：Mourvèdre 约 50%，配 Grenache、Cinsault。','浸皮、直接压榨、低温澄清；不锈钢或混凝土罐发酵，熟成约 6–8 个月。','结构感和新鲜度并存；酒庄描述较长陈年后可发展出蜜饯柑橘等气息。'],['A blend of the estate’s varied clay-limestone sites.','House composition: about 50% Mourvèdre, with Grenache and Cinsault.','Skin contact, direct pressing and cold settling; steel or concrete fermentation, then 6–8 months before bottling.','A structured, fresh rosé with potential for candied-citrus development during extended ageing.'])
place_zh='Meyreuil 的北向石灰质碎石坡地；酒庄技术资料所述平均藤龄超过 50 年。'
place_en='North-facing limestone-scree slopes at Meyreuil; the estate sheet gives an average vine age above 50 years.'
wine(simone,'chateau-simone-palette-palette-blanc','Palette Blanc','https://chateau-simone.fr/en/chateau-simone-white',['clairette-blanche','garnacha-blanca','bourboulenc','trebbiano-toscano'],[place_zh,'未标年份配方：Clairette 80%、Grenache Blanc 10%、Bourboulenc 5%、Ugni Blanc 3%、Muscat Blanc 2%。','轻度破碎、立式液压压榨、本土酵母发酵，木桶与细酒泥熟成。官网对熟成阶段的表述不够明确，暂不合并为固定总月数。','年轻时有花果香与木桶气息，具陈年潜力。'],[place_en,'Undated recipe: 80% Clairette, 10% Grenache Blanc, 5% Bourboulenc, 3% Ugni Blanc, 2% Muscat Blanc.','Light crushing, vertical hydraulic pressing and native yeast; oak and fine-lees maturation. The source’s stage durations are ambiguous, so no total is asserted.','Floral-fruited when young, with an oak contribution and ageing potential.'])
blend_zh='未标年份配方：Grenache 45%、Mourvèdre 30%、Cinsault 5%，其余 20% 包括 Syrah、Castet、Manosquin、Carignan、Muscat 类。'
blend_en='Undated recipe: 45% Grenache, 30% Mourvèdre, 5% Cinsault; 20% secondary grapes including Syrah, Castet, Manosquin, Carignan and Muscats.'
wine(simone,'chateau-simone-palette-palette-rouge','Palette Rouge','https://chateau-simone.fr/en/chateau-simone-red',['garnacha-tinta','monastrell','cinsault','syrah','carignan'],[place_zh,blend_zh,'去梗、轻度破碎、小罐发酵，浸渍 15–21 天；官网描述先小木桶 8 个月、再不同桶龄橡木桶一年，装瓶不过滤。','深红色，香气复杂，单宁结构明显，适合陈年。'],[place_en,blend_en,'Destemmed and lightly crushed; small-tank fermentation and 15–21 days’ maceration. The house sheet specifies eight months in casks, then one year in oak barrels; unfiltered bottling.','A deeply coloured, complex red with substantial tannin and ageing potential.'])
wine(simone,'chateau-simone-palette-palette-rose','Palette Rosé','https://chateau-simone.fr/en/chateau-simone-rose',['garnacha-tinta','monastrell','cinsault','syrah','carignan'],[place_zh,blend_zh,'轻度破碎、部分去梗、立式液压压榨，并混入部分放血汁；小橡木桶中带细酒泥熟成，倒罐自然澄清。','颜色较深，酒体和果味强度明显；属于传统深色桃红风格。'],[place_en,blend_en,'Light crushing, partial destemming and vertical pressing, blended with some saignée juice; small-oak-cask maturation on fine lees and settling by racking.','A deeply coloured traditional rosé with marked body and fruit intensity.'])
for p in [tempier,simone]:
    db['producers']=[x for x in db['producers'] if x['id']!=p['id']]+[p]
source_ids={s['id'] for s in sources}
db['sources']=[s for s in db['sources'] if s['id'] not in source_ids]+sources
db['checkedAt']='2026-10-28'
grapes={g['id'] for g in json.loads((root/'data/grape-varieties.json').read_text())}
for p in [tempier,simone]:
    for w in p['wines']:
        assert set(w['grapeIds'])<=grapes, set(w['grapeIds'])-grapes
path.write_text(json.dumps(db,ensure_ascii=False,indent=2)+'\n')
grape_records={g['id']:g for g in json.loads((root/'data/grape-varieties.json').read_text())}
cards_path=root/'data/grape-wines.json'
cards=json.loads(cards_path.read_text())
regions_path=root/'data/region-dossiers.json'
regions=json.loads(regions_path.read_text())
for p in [tempier,simone]:
    region=next(r for r in regions if r['id']==p['regionIds'][0])
    for w in p['wines']:
        s=next(s for s in sources if s['id']==w['sourceIds'][0])
        card={'id':w['id'],'name':w['name'],'producer':p['name'],'producerId':p['id'],'libraryWineId':w['id'],'regionId':w['regionId'],'grapeNames':[grape_records[g]['name'] for g in w['grapeIds']],'country':'France','region':w['denomination'],'description':w['detail'],'composition':w['grape'],'style':w['detail'],'serving':'按具体年份、酒龄与瓶况调整。','vintage':None,'officialUrl':s['url'],'sources':[{'title':s['title'],'url':s['url'],'note':scope_zh}],'reviewed':'2026-10-28'}
        cards=[c for c in cards if c['id']!=w['id']]+[card]
        region['wines']=[v for v in region['wines'] if not(v['producer']==p['name'] and v['name']==w['name'])]+[{'name':w['name'],'producer':p['name'],'url':'#library?type=wine&id='+w['id'],'note':{'zh':w['detail'],'en':w['translations']['en']['detail']}}]
cards_path.write_text(json.dumps(cards,ensure_ascii=False,indent=2)+'\n')
regions_path.write_text(json.dumps(regions,ensure_ascii=False,indent=2)+'\n')
print('Imported 2 bilingual producers and 8 source-checked wine profiles; 0 seeds.')
