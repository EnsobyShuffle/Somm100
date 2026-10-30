import json,hashlib,re
from pathlib import Path
BASE=Path('/workspace/sites/somm100-france-grapes');OUT=BASE/'research/italy-linked/northwest.json'
D={k:[] for k in ['grapes','translations','existingUpdates','regions','wines','evidence','unresolved','corrections']}
existing={g['id']:g for g in json.load(open(BASE/'data/grape-varieties.json'))}
def b(en,zh=None):
 if zh is None:en,zh=en.split('||',1)
 return {'en':en,'zh':zh}
S={
'piemonte':'https://www.piemonteland.it/vitigni/',
'genetics':'https://www.nature.com/articles/s41598-020-72799-6',
'aosta':'https://www.regione.vda.it/agricoltura/prodotti_tipici/vinidoc_i.aspx',
'aostawine':'https://www.lovevda.it/en/food-and-wine/wines',
'liguria':'https://www.enotecaregionaleliguria.it/?page_id=25567',
'franciacorta':'https://franciacorta.wine/en/consortium/regulations/',
'frangeo':'https://franciacorta.wine/en/wine/geology-climate/',
'frangrape':'https://franciacorta.wine/en/wine/vitigni-modello/',
'franmethod':'https://franciacorta.wine/en/wine/method/',
'lugana':'https://www.consorziolugana.it/lugana-faq',
'luganageo':'https://www.consorziolugana.it/news/il-consorzio-tutela-lugana-doc-veleggia-sullonda-della-crescita',
'oltrepo':'https://www.classeseoltrepopavese.it/consorzio/',
'oltrepowine':'https://www.classeseoltrepopavese.it/en/wines/',
'valtellina':'https://www.buonalombardia.regione.lombardia.it/wps/portal/site/buonalombardia/DettaglioRedazionale/vini/docg/eee',
'fojanini':'https://air.unimi.it/retrieve/6afb926d-c8a3-44cf-9614-ce7a25d3fec9/Failla%20e%20Bongiolatti%202022.pdf',
'valtenesi':'https://www.consorziovaltenesi.it/vini-3/',
'groppello':'https://www.consorziovaltenesi.it/groppello/',
'vcr':'https://vivairauscedo.com/contributi/download/tabella-varieta.pdf',
'scanzo':'https://consorziomoscatodiscanzo.it/il-moscato/',
'scanzomethod':'https://consorziomoscatodiscanzo.it/il-processo-di-produzione/',
'scanzohistory':'https://consorziomoscatodiscanzo.it/la-nostra-storia/',
'barolo':'https://www.langhevini.it/le-denominazioni-tutelate-dal-consorzio/barolo-docg/',
'barbaresco':'https://www.langhevini.it/wp-content/uploads/2019/05/DOCG-Barbaresco-.pdf',
'gavi':'https://www.consorziogavi.com/en/gavi-docg-2/',
'roero':'https://www.consorziodelroero.it/en/typology/',
'roerorules':'https://www.consorziodelroero.it/en/production-regulations/',
'roerogeo':'https://www.consorziodelroero.it/en/municipalities/',
'gattinara':'https://consnebbiolialtop.it/it/denominazioni/gattinara',
'ghemme':'https://www.rina.org/it/-/media/Files/agroqualita/vini/piemonte2/disciplinare_DOCG_Ghemme.pdf',
'ghemme2026':'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52026XC01258',
'ghemmewine':'https://www.viniioppa.it/it/i-nostri-vini/ghemme.html',
'tortona':'https://collitortonesi.com/wp-content/uploads/2025/09/Disciplinare_ColliTortonesi.pdf',
'pelaverga':'https://www.verdunopelaverga.it/profilo-del-vino/',
'pelavergapdf':'https://www.verdunopelaverga.it/wp-content/uploads/2025-ITA-CARTELLA-STAMPA-VERDUNO-PELAVERGA-DOC.pdf',
'cinque':'https://www.enotecaregionaleliguria.it/?page_id=26074',
'riviera':'https://www.enotecaregionaleliguria.it/?page_id=26068',
'dolceacqua':'https://www.enotecaregionaleliguria.it/?page_id=26046',
'luni':'https://www.enotecaregionaleliguria.it/?page_id=26076',
'lumassina':'https://www.agriligurianet.it/en/vetrina/prodotti-e-produzioni/vino/prodotti-tipicivino/item/310-vino-lumassina-mataossu.html',
'carema':'https://www.erbalucecarema.it/carema-vini/',
'caluso':'https://www.erbalucecarema.it/caluso/',
'canavese':'https://www.erbalucecarema.it/canavese-doc/',
}
def url(k):return S.get(k,k)
def source(k):return {'title':k.title()+' · primary source' if k in S else k,'url':url(k)}
def save():
 json.dump(D,open(OUT,'w'),ensure_ascii=False,indent=2)
 print('checkpoint',len(D['grapes']),len(D['regions']))
def G(id,name,color,reg,aliases,origin,viti,vin,taste,similar,keys,gen=None,img=None):
 origin,viti,vin,taste,similar=map(b,[origin,viti,vin,taste,similar]);gen=gen or ('unknown',[],b('Complete parentage is not established in the consulted sources.||所查来源未建立完整亲本关系。'))
 g={'id':id,'name':name,'zh':name,'color':color,'countries':['Italy'],'origin':origin['zh'],'summary':origin['zh']+' '+taste['zh'],'viticulture':viti['zh'],'winemaking':vin['zh'],'taste':taste['zh'],'confusions':similar['zh'],'aliases':[{'name':a[0],'context':b(a[1])['zh']} for a in aliases],'regions':[{'name':reg,'country':'Italy','note':origin['zh']}],'genetics':{'type':gen[0],'parents':gen[1],'note':gen[2]['zh']},'sources':[source(k) for k in keys],'reviewed':'2026-10-26','editorialBatch':'italy-northwest','referenceRows':[]}
 for sec,lab,txt in [('origin','Origin||起源',origin),('parentage','Parentage||亲本',gen[2]),('viticulture','Viticulture||栽培',viti),('vinification','Winemaking||酿造',vin),('tasting','Tasting||品鉴',taste),('similar','Distinction||辨析',similar)]:g['referenceRows'].append({'section':sec,'label':b(lab),'text':txt,'sourceUrls':[url(k) for k in keys]})
 if img:g.update(imageUrl=img[0],originalImageUrl=img[0],imageCredit=img[1],imageSourceUrl=url(keys[0]))
 D['grapes'].append(g);D['translations'].append({'id':id,'origin':origin['en'],'summary':origin['en']+' '+taste['en'],'viticulture':viti['en'],'winemaking':vin['en'],'taste':taste['en'],'confusions':similar['en'],'geneticsNote':gen[2]['en'],'aliases':[{'name':a[0],'context':b(a[1])['en']} for a in aliases],'regions':[{'name':reg,'note':origin['en']}],'species':'Vitis vinifera','originCountry':'Italy'})
BIO='https://www.biodiversita-agricola.piemonte.it/';TOR='https://www.torinodoc.com/';ACQ='https://enotecaregionaleacqui.it/'
G('baratuciat','Baratuciat','white','Piemonte',[('Berlon ’d ciat','Villarbasse historical name.||Villarbasse 历史名称。')],
'Lower Val di Susa white documented at Villarbasse in 1877, revived in modern Piemonte.||下 Val di Susa 白葡萄，1877 年见于 Villarbasse 记录，近代在 Piemonte 复兴。',
'Vigorous, suited to long pruning; thick-skinned berries and moderately compact bunches. Disease observations do not establish general resistance.||长势旺盛，适合长梢修剪；果皮厚，果穗中等紧实。个别病害观察不代表全面抗病。',
'Crop control and picking maturity are important for balancing its retained acidity in dry whites.||控制产量及采收成熟度有助平衡干白中的保留酸度。',
'Pronounced freshness with a recognisable aromatic expression; exact aromas vary with maturity.||清新感突出并有一定芳香表现，具体香气随成熟度变化。',
'Historical local names require provenance, not automatic synonym matching.||历史地方名须附地点背景，不能自动与相似名称合并。',[BIO+'baratuciat'])
G('bianchetto-di-saluzzo','Bianchetto di Saluzzo','white','Piemonte',[('Bianchèt','Saluzzese vernacular.||Saluzzese 地方名称。')],
'Saluzzo white described in 1835. Confirmed conservation accessions survive; present commercial production is not established.||1835 年已描述的 Saluzzo 白葡萄。保种材料可确认存续，当前商业生产未证实。',
'Medium-high vigour, low basal fertility, compact small-to-medium bunches and relatively thick skins.||中强长势，基部芽结实性低，中小紧实果穗，果皮较厚。',
'Historical wine use is documented, but the accession source gives no modern commercial cellar benchmark.||有历史酿酒记录，种质来源未提供当代商业酿造标杆。',
'Neutral, pleasant berry flavour is recorded; this is not an independently verified wine tasting note.||记录果实较中性且适口，不能当作独立验证的成酒品鉴。',
'Distinguish Saluzzo material from historical Bianchetta names at Sciolze.||须与 Sciolze 历史 Bianchetta 同名材料区分。',[BIO+'bianchetto-di-saluzzo'])
G('barbera-ciaria','Barbera Ciaria','red','Piemonte',[],
'Western Roero rarity described in 1926, retained around Sommariva Perno and in conservation collections.||1926 年已描述的西部 Roero 稀有品种，于 Sommariva Perno 及保种收藏中保存。',
'Medium vigour, low fertility, large compact winged bunches and late ripening.||中等长势、结实性低、果穗大且紧密带副穗、晚熟。',
'No reliable modern commercial vinification benchmark is established by the regional accession record.||地方种质档案未建立可靠当代商业酿造标杆。',
'Acidic berries are documented; a standard finished-wine profile remains unverified.||记录果实酸味突出，标准成酒风格仍待核实。',
'The name does not establish a mutation or synonym relationship with Barbera.||名称不能证明与 Barbera 为突变或同义关系。',[BIO+'barbera-ciaria'])
G('barbassese','Barbassese','white','Piemonte',[('Uva della Madonna','Historical local name.||历史地方名称。'),('Carica l’Asino','Ambiguous name also applied to Barbera Bianca.||有歧义，也曾用于 Barbera Bianca。')],
'Described near Acqui Terme in 1875; now a highly endangered Alessandria white.||1875 年已描述于 Acqui Terme 附近，如今为 Alessandria 极稀有白葡萄。',
'Medium vigour, generous cropping, large bunches, early ripening and bunch-rot susceptibility.||中等长势、丰产、果穗大、早熟，并对果穗腐烂敏感。',
'Historical wine use is recorded; no current varietal commercial protocol is substantiated here.||有历史酿酒用途，尚未证实当前单品种商业工艺。',
'Neutral berry flavour is described; do not invent a finished-wine aroma profile.||果实风味记录为中性，不宜虚构成酒香气。',
'Carica l’Asino is not a safe one-to-one synonym because Barbera Bianca also bears the name.||Carica l’Asino 不是可靠一对一同义词，Barbera Bianca 亦用此名。',[BIO+'barbassese'])
G('doux-d-henry','Doux d’Henry','red','Piemonte',[],
'Traditional Pinerolese grape around Pinerolo, Bibiana and neighbouring foothill valleys; historically also eaten fresh.||Pinerolo、Bibiana 及邻近山前谷地的 Pinerolese 传统葡萄，历史上也鲜食。',
'Vigorous and long-pruned; functionally female flowers need compatible pollination. Poor set and millerandage make yields variable; loose bunches reduce rot pressure.||长势旺盛，长梢修剪；功能性雌花需合适授粉。坐果不良及大小粒使产量波动，疏松果穗降低腐烂压力。',
'Typically made as a youthful, lightly structured dry red.||通常酿年轻饮用、结构轻盈的干红。',
'Pale colour, freshness and fragrant fruit are local style references.||浅色、清新感及芬芳果香为地方风格参考。',
'Doux in the name does not require a sweet finished wine.||名称中的 Doux 不意味着成酒必须为甜型。',[TOR+'doux-dhenry/'])
G('ner-d-ala','Ner d’Ala','red','Piemonte',[('Vernassa','Canavese local usage.||Canavese 地方用名。')],
'Alto Canavese red, used with Nebbiolo around Carema.||Alto Canavese 红葡萄，在 Carema 一带与 Nebbiolo 配合。',
'Very vigorous; long pruning and pergola training suit it. Compact bunches can rot on fertile sites.||长势很强，适合长梢修剪及棚架；肥沃地块上紧密果穗可能腐烂。',
'Traditionally blended; small varietal examples show its own colour and spice.||传统上混酿，少量单品种酒展示其自身色泽及香料感。',
'Vivid colour and spicy notes are reported in local examples.||地方实例记录鲜明色泽与香料气息。',
'Distinct from Neretto di Bairo despite generic black-grape local names.||不同于 Neretto di Bairo，不能因泛指黑葡萄的地方用名合并。',[TOR+'ner-dala/'])
G('neretto-di-bairo','Neretto di Bairo','red','Piemonte',[('Neretto','Ambiguous abbreviated local name.||有歧义的地方简称。')],
'Traditional Canavese grape associated with Bairo and mixed vineyards.||与 Bairo 及混种园相关的 Canavese 传统品种。',
'Strong vigour but low basal fertility favours long pruning and pergola canavesana. Rain at flowering can impair fruit set.||长势强但基部芽结实性低，适合长梢修剪及 pergola canavesana；花期雨水影响坐果。',
'Used in Canavese red blends, with rare varietal bottlings generally intended for early drinking.||用于 Canavese 红酒混酿，少量单独装瓶通常适合早饮。',
'Producer-specific wine evidence is more reliable than a universal aromatic description.||具体生产者酒款证据比统一香气描述更可靠。',
'Do not merge unrelated Italian Neretto names or confuse with Ner d’Ala.||不能合并意大利各 Neretto 同名葡萄，亦须与 Ner d’Ala 区分。',[TOR+'neretto/'])
G('albarossa','Albarossa','red','Piemonte',[],
'Bred by Giovanni Dalmasso at Conegliano in 1938; Piemonte became its principal modern wine reference.||Giovanni Dalmasso 于 1938 年在 Conegliano 育成；Piemonte 成为主要当代葡萄酒参考。',
'A cultivated breeding selection whose agronomy must be assessed independently of either parent.||人工育种品种，农艺特性须独立评估，不能照搬任一亲本。',
'Made as dry red including oak-aged examples; Marenco supplies an identified producer reference.||用于干红，包括橡木熟成实例；Marenco 提供明确参考。',
'Colour and structure feature in contemporary examples, modified by extraction and oak.||当代实例强调色泽及结构，受萃取和橡木影响。',
'Nebbiolo di Dronero in the old pedigree meant Chatus, not Nebbiolo.||旧亲本名称 Nebbiolo di Dronero 指 Chatus，而非 Nebbiolo。',['https://www.viniastimonferrato.it/en/vitigni/albarossa/','https://marencovini.com/prodotto/albarossa/'],('bred-cross',['Barbera','Chatus'],b('Barbera × Chatus.||Barbera × Chatus。')))
G('barbera-bianca','Barbera Bianca','white','Piemonte',[('Carica l’Asino','Ambiguous with Barbassese.||与 Barbassese 用名存在歧义。'),('Carialoso','Local abbreviated name.||地方简称。')],
'Rare Alessandria white recovered around Strevi by Marenco from the 1990s.||Alessandria 稀有白葡萄，Marenco 自 1990 年代在 Strevi 一带推动恢复。',
'Modest vigour, good productivity, mid-season maturity; berries can shrivel at ripeness.||长势较温和、产量较好、中期成熟，成熟时果粒可皱缩。',
'Recovered for white-wine production with acidity an important practical consideration.||恢复用于白酒生产，酸度为重要酿造考量。',
'Marked freshness is documented; exact aromas require an identified bottle.||清新感突出，具体香气须依明确酒款判断。',
'Not a proven white mutation of Barbera. Carica l’Asino has also named Barbassese.||并非已证实的 Barbera 白色突变，Carica l’Asino 也曾指 Barbassese。',[ACQ+'carica-lasino-o-barbera-bianca/'],('unknown',['Timorasso'],b('Timorasso is reported as one parent; the second remains unresolved in the consulted account.||来源报告 Timorasso 为一个亲本，另一个未解决。')))
G('lambrusca-di-alessandria','Lambrusca di Alessandria','red','Piemonte',[('Moretto','Tortona/Novi usage.||Tortona／Novi 用名。'),('Croetto','Monferrato usage.||Monferrato 用名。'),('Crovìn','Monferrato usage.||Monferrato 用名。')],
'Old red of Alessandria, Tortona, Novi and adjacent Monferrato.||Alessandria、Tortona、Novi 及邻近 Monferrato 的古老红葡萄。',
'Vigorous, robust and reliably productive in the regional account.||地方资料描述其长势强、适应性较好且产量可靠。',
'Traditionally contributed colour and acidity to red blends.||传统上为红酒混酿提供色泽与酸度。',
'Colour and acidity are supported reference points; no universal aroma profile is established.||色泽及酸度为有据参考，未建立统一香气描述。',
'Vitis vinifera, not Vitis labrusca; not interchangeable with the distinct Emilia Lambrusco grapes.||属于 Vitis vinifera，非 Vitis labrusca；不可与 Emilia 各 Lambrusco 品种互换。',[ACQ+'lambrusca-di-alessandria/'])
G('malvasia-moscata','Malvasia Moscata','white','Piemonte',[('Grec','Roero usage.||Roero 用名。'),('Mosella','Tortona usage.||Tortona 用名。')],
'Aromatic Piemontese white preserved under local names in Roero and Tortona.||Piemonte 芳香型白葡萄，在 Roero 及 Tortona 有地方名称。',
'Upright shoots, generous yields and useful sugar–acid balance are reported.||记录为枝条直立、较丰产，糖酸平衡有优势。',
'Dry aromatic white is a contemporary option; sweetness is not inherent in the name.||当代可酿芳香型干白，名称不预设甜度。',
'Muscat-like perfume supported by retained acidity.||Muscat 类芳香由保留酸度支撑。',
'Malvasia names encompass distinct cultivars; do not replace it with Moscato Bianco or Malvasia di Casorzo.||Malvasia 涵盖不同品种，不可替换为 Moscato Bianco 或 Malvasia di Casorzo。',[ACQ+'malvasia-moscata/'],('unknown',['Muscat Blanc à Petits Grains'],b('Reported as a descendant of Moscato Bianco; the full parental pair is not asserted.||来源报告为 Moscato Bianco 后代，不据此断言完整双亲。')))
G('nascetta','Nascetta','white','Piemonte',[('Nas-cëtta','Novello local spelling.||Novello 地方拼写。'),('Anascetta','Historical variant.||历史变体。')],
'Novello/Langhe white documented in nineteenth-century wine accounts and revived locally.||19 世纪葡萄酒记录中的 Novello／Langhe 白葡萄，近代于当地恢复。',
'Irregular growth and inconsistent yields complicate management; useful sugar and acidity can be retained.||枝叶生长不整齐及产量波动增加管理难度，可兼具糖分与酸度。',
'Historical sweet wines do not prescribe current style; dry wine is central to the revival.||历史甜酒不限定当代风格，干白是复兴核心。',
'Structured whites can develop floral and honeyed notes with ageing.||结构型白酒可随陈年展现花香及蜂蜜感。',
'The consulted ampelographic account does not establish a complete pedigree.||所查葡萄品种学资料未建立完整亲本。',[ACQ+'nascetta/'])
G('slarina','Slarina','red','Piemonte',[('Cellerina','Recorded local synonym.||记录地方同义名。'),('Cenerina','Recorded local synonym.||记录地方同义名。')],
'Old Alessandria-area red also recorded towards Oltrepò, now recovered for varietal wine.||Alessandria 古老红葡萄，记录延至 Oltrepò，如今恢复单品种生产。',
'Medium vigour, useful fertility and productivity below the local Barbera reference.||中等长势、结实性尚好，产量低于地方 Barbera 参照。',
'Modern recovery includes dry varietal wines; extraction and maturation vary by producer.||当代恢复包含单品种干红，萃取与熟成依生产者而异。',
'A single revival bottling should not define a universal sensory profile.||不能由单一复兴酒款定义统一感官特征。',
'Historical Balsamina usage is ambiguous and can overlap with Vespolina.||历史 Balsamina 用名有歧义，可能与 Vespolina 重叠。',[ACQ+'slarina/','https://creafuturo.crea.gov.it/14343/?cat=184'])
G('montanera','Montanera','red','Piemonte',[('Negrera','Biella usage, distinct from Trentino Negrara.||Biella 用名，区别于 Trentino Negrara。'),('Corvino','Valtellina usage, not Corvina.||Valtellina 用名，非 Corvina。')],
'Northwestern grape recovered through CNR research and registered nationally in 2015.||经 CNR 研究恢复的西北品种，2015 年国家登记。',
'Early-to-mid ripening, upright shoots and elongated compact bunches; downy mildew susceptibility is reported.||早中期成熟、枝条直立、长形紧密果穗；记录对霜霉病敏感。',
'Recovery trials highlight suitability for relatively supple red wines.||恢复试验指出适合酿较柔和红酒。',
'Relatively modest tannin is a documented reference.||相对适中的单宁为有据参考。',
'Distinct from Montanera Saluzzese/Cardìn, Trentino Negrara and Corvina Veronese.||不同于 Montanera Saluzzese／Cardìn、Trentino Negrara 及 Corvina Veronese。',['https://almanacco.cnr.it/it/articolo/1222/montanera-il-vitigno-ritrovato'])
G('uvalino','Uvalino','red','Piemonte',[],
'Asti-area rarity restored commercially by Cascina Castlet at Costigliole d’Asti.||Asti 稀有品种，由 Costigliole d’Asti 的 Cascina Castlet 推动商业恢复。',
'Late harvesting characterises the producer reference; detailed resistance claims need independent accession data.||生产者参考强调晚采，具体抗病断言仍须独立种质资料。',
'Uceline is a dry Monferrato Rosso using selected dried grapes; the method does not define all Uvalino.||Uceline 为采用精选风干果实的 Monferrato Rosso 干红，工艺不定义所有 Uvalino。',
'Concentration reflects fruit drying as well as grape and site.||浓缩感除品种与地块外，也来自果实风干。',
'Uvalino is not Uva Rara despite the shared generic grape word.||Uvalino 并非 Uva Rara，不能因词根相同混同。',['https://www.cascinacastlet.com/sites/default/files/uceline-it.pdf','https://www.cascinacastlet.com/sites/default/files/scheda-informazioni-uvalino.pdf'])
G('quagliano','Quagliano','red','Piemonte',[],
'Traditional Saluzzo-hills grape in Cuneo, retained in Colline Saluzzesi wine production.||Cuneo 的 Saluzzo 丘陵传统葡萄，仍用于 Colline Saluzzesi 葡萄酒。',
'Accession identity is documented in VitisDB; picking depends on the intended still or sparkling style.||VitisDB 记录种质身份，采收取决于静止或起泡目标风格。',
'Sweet still and sparkling Colline Saluzzesi Quagliano are the established PDO references.||甜型静止与起泡 Colline Saluzzesi Quagliano 为主要 PDO 参考。',
'Fragrant fruit and sweetness typify the traditional dessert-wine reference.||芬芳果味及甜度构成传统餐后酒参考。',
'Distinct from Pelaverga Grosso, another Saluzzese grape.||与另一 Saluzzese 葡萄 Pelaverga Grosso 不同。',['https://vitisdb.it/varieties/show/1201','https://www.visitlmr.it/it/vini/colline-saluzzesi-quagliano-doc'],img=('https://vitisdb.it/accessionimages/thumbnail/15943?name=bunch','VitisDB · Quagliano accession 15943'))
save()
GR='https://grosjeanvins.it/vitigni-valle-aosta/'
G('fumin','Fumin','red','Valle d’Aosta',[],
'Local Aosta Valley red recovered from traditional blending into varietal bottlings.||Valle d’Aosta 地方红葡萄，从传统混酿恢复至单品种装瓶。',
'Late ripening makes warm, well-exposed sites important; Grosjean reports late-season harvesting.||晚熟使温暖向阳地块重要，Grosjean 记录较晚采收。',
'Both blends and varietal wines occur; long wood ageing is a producer choice.||可混酿或单独酿造，较长木桶熟成属于生产者选择。',
'Dark fruit, spice and substantial structure occur in producer references.||生产者参考表现深色果实、香料及充实结构。',
'Not a synonym of Petit Rouge or Cornalin d’Aoste.||不是 Petit Rouge 或 Cornalin d’Aoste 同义名。',[GR+'fumin/','https://lescretes.it/en/wines/red/fumin/'],img=('https://grosjeanvins.it/files/2023/01/Fumin.jpg','Grosjean Vins · Fumin'))
G('petit-rouge','Petit Rouge','red','Valle d’Aosta',[],
'Central-valley red particularly associated with Torrette and Enfer d’Arvier.||中谷地红葡萄，尤其关联 Torrette 与 Enfer d’Arvier。',
'Local distribution extends from Saint-Vincent towards Arvier, particularly sunny slopes.||地方分布由 Saint-Vincent 延至 Arvier，常见于向阳坡地。',
'Steel and wood-aged examples exist; Torrette field blends are not pure Petit Rouge.||有不锈钢及木桶熟成实例，Torrette 混种混酿不等于纯 Petit Rouge。',
'Red-fruit freshness is a reference; accompanying varieties affect body and tannin.||红果清新感可作参考，搭配品种影响酒体及单宁。',
'Oriou is a historical local grouping/name requiring context, not automatic synonymy.||Oriou 属须附背景的历史地方分组或称呼，不能自动视为同义关系。',[GR+'petit-rouge/','https://coenfer.com/i-vitigni-autoctoni/'],img=('https://grosjeanvins.it/files/2023/01/Petit-Rouge.jpg','Grosjean Vins · Petit Rouge'))
G('prie-rouge','Prié Rouge','pink','Valle d’Aosta',[('Prëmetta','Common local name.||常见地方名。'),('Premetta','Unaccented spelling.||无重音拼写。')],
'Aosta Valley pink-berried grape commonly known as Prëmetta.||Valle d’Aosta 粉红果皮葡萄，常称 Prëmetta。',
'Thin fragile skins make fungal disease and rot management important.||果皮薄且脆弱，真菌病害及腐烂管理重要。',
'Grosjean’s reference uses steel fermentation and maturation; the fruit gives naturally pale wine.||Grosjean 参考采用不锈钢发酵熟成，果实使成酒天然浅色。',
'Coral colour can coexist with real tannin; raspberry and rosehip are producer notes.||珊瑚浅色可伴明显单宁，覆盆子与玫瑰果为生产者参考风味。',
'Shared naming does not establish a colour mutation of Prié Blanc.||共同词根不能证明为 Prié Blanc 颜色突变。',[GR+'premetta/'],img=('https://grosjeanvins.it/files/2023/01/Premetta.jpg','Grosjean Vins · Prëmetta'))
G('prie-blanc','Prié Blanc','white','Valle d’Aosta',[],
'Defining white of Morgex and La Salle in the upper Aosta Valley.||上 Valle d’Aosta 的 Morgex 与 La Salle 标志性白葡萄。',
'Low pergolas exploit a protected near-ground environment; many vineyards are own-rooted, but this must be checked by site.||低棚架利用较受保护的近地环境；许多葡萄园自根，但须按地块核实。',
'Blanc de Morgex et de La Salle supplies still and sparkling wine references.||Blanc de Morgex et de La Salle 提供静止及起泡参考。',
'Fresh Alpine whites vary with harvest and cellar treatment.||清新阿尔卑斯白酒风格随采收及酿造变化。',
'Prié Rouge is a separate identity; the name alone proves no mutation relationship.||Prié Rouge 为不同身份，名称本身不证明突变关系。',['https://www.lovevda.it/en/food-and-wine/wines/blanc-de-morgex-et-de-la-salle-doc','aosta'])
G('mayolet','Mayolet','red','Valle d’Aosta',[],
'Local central-valley red grown from Saint-Vincent towards Avise on both valley sides.||中谷地地方红葡萄，在 Saint-Vincent 至 Avise 一带谷地两侧栽培。',
'Early ripening is a useful distinction in this Alpine environment.||在阿尔卑斯环境中早熟是重要特点。',
'Both blends and varietal wines occur; Di Barrò supplies a varietal reference.||可混酿或单独酿造，Di Barrò 提供单品种参考。',
'Floral and red-fruit notes are reported for the Di Barrò example.||Di Barrò 实例记录花香及红果。',
'Distinct from Petit Rouge and Fumin despite shared geography.||虽共享产地，仍不同于 Petit Rouge 与 Fumin。',['https://www.dibarro.com/it/vini/mayolet','https://coenfer.com/i-vitigni-autoctoni/','https://www.ao.camcom.it/sites/default/files/contenuto_redazione/allegati/guidaenogastronomica_11_it.pdf'])
G('vuillermin','Vuillermin','red','Valle d’Aosta',[],
'Rare traditional valley red recovered by growers including La Vrille and Les Granges.||罕见传统谷地红葡萄，由 La Vrille、Les Granges 等恢复。',
'Producer evidence establishes cultivation; it does not establish universal yield or disease-resistance claims.||生产者证据确认栽培，但不建立普遍产量或抗病断言。',
'La Vrille offers a 100% Vuillermin wine; details are producer- and vintage-specific.||La Vrille 提供 100% Vuillermin 酒款，细节依生产者及年份。',
'Sensory conclusions should be anchored to identified bottles rather than generic Alpine descriptors.||感官结论须依据明确酒款，不套用泛泛阿尔卑斯描述。',
'Not synonymous with Vien de Nus.||不是 Vien de Nus 同义词。',['https://www.lavrille.it/vuillermin/','https://www.lovevda.it/en/database/4/wine/nus/les-granges-s-s-winery/6916'])
G('vien-de-nus','Vien de Nus','red','Valle d’Aosta',[],
'Local red of Nus and neighbouring central-valley communes.||Nus 及邻近中谷地市镇的地方红葡萄。',
'Cultivation is documented by regional sources and Les Granges; detailed phenology still needs an accession source.||大区及 Les Granges 证实栽培，详细物候仍需种质资料。',
'Nus Rouge blends Vien de Nus with Petit Rouge and other permitted grapes.||Nus Rouge 将 Vien de Nus 与 Petit Rouge 及其他获准葡萄混酿。',
'The official dry, fruity, supple-tannin Nus Rouge description refers to the blend, not pure Vien de Nus.||官方所述干型、果味及柔和单宁为 Nus Rouge 混酿描述，并非纯 Vien de Nus。',
'Nus Malvoisie is based on Pinot Gris, not Vien de Nus.||Nus Malvoisie 以 Pinot Gris 为基础，非 Vien de Nus。',['https://www.lovevda.it/en/food-and-wine/wines/nus-rouge-doc','https://www.lovevda.it/en/database/4/wine/nus/les-granges-s-s-winery/6916'])
G('albarola','Albarola','white','Liguria',[('Bianchetta Genovese','Genetic synonym in CNR VitisDB; legal/historical labels can remain separate.||CNR VitisDB 支持遗传同义；法律或历史标签可能分列。'),('Albarola Trebbiana','Recorded synonym.||记录同义名。'),('Calcattela','Recorded synonym.||记录同义名。')],
'Coastal white of Liguria and northwestern Toscana, used in blends and Colli di Luni varietal wine.||Liguria 与 Toscana 西北沿海白葡萄，用于混酿及 Colli di Luni 单品种酒。',
'Bunch-rot susceptibility matters in humid coastal settings; identity is documented in VitisDB.||潮湿沿海须注意果穗腐烂敏感性，VitisDB 记录身份。',
'Blended with Bosco and Vermentino in Cinque Terre; Colli di Luni Albarola requires at least 85%.||Cinque Terre 与 Bosco、Vermentino 混酿；Colli di Luni Albarola 至少 85%。',
'Fresh dry-white component; Sciacchetrà sweetness reflects drying and vinification.||清新干白组分，Sciacchetrà 甜度来自风干及酿造。',
'Bianchetta Genovese is not Bianchetta Trevigiana. Modern genetic identity can differ from older morphology-based naming.||Bianchetta Genovese 不是 Bianchetta Trevigiana，现代遗传身份可异于旧形态学分类。',['https://vitisdb.it/varieties/show/8159','cinque','luni','https://www.cersaa.it/wp-content/uploads/2017/04/LaRAF_Botrite_0617_Rev2.pdf'],img=('https://vitisdb.it/accessionimages/thumbnail/15643?name=bunch','VitisDB · Albarola accession 15643'))
G('bosco','Bosco','white','Liguria',[],
'White closely associated with Cinque Terre on eastern Liguria’s coast.||与 Liguria 东海岸 Cinque Terre 紧密相关的白葡萄。',
'Terrace cultivation and healthy fruit selection are key contexts; no general disease-resistance claim is made.||梯田栽培及健康果实筛选重要，不作普遍抗病断言。',
'Cinque Terre requires at least 40% Bosco; dried selected fruit contributes to Sciacchetrà.||Cinque Terre 要求 Bosco 至少 40%，精选果实风干用于 Sciacchetrà。',
'Dry white and sweet dried-grape examples require separate tasting descriptions.||干白与风干甜酒须分开描述品鉴。',
'The wine name Sciacchetrà does not describe a separate grape.||Sciacchetrà 酒名并非独立葡萄。',['cinque'])
G('lumassina','Lumassina','white','Liguria',[('Mataossu','Savona-area local name.||Savona 地方用名。'),('Mataosso','Spelling variant.||变体拼写。'),('Buzzetto','Local name.||地方名称。')],
'Traditional white of Savona and Finale in western Liguria.||Liguria 西部 Savona 与 Finale 传统白葡萄。',
'Current regional cultivation is documented; botrytis susceptibility makes healthy fruit important.||有地区栽培记录，灰霉敏感性使健康果实重要。',
'Traditional brief skin contact can add texture; Colline Savonesi is an IGT context, not a DOC.||传统短浸皮可添质地，Colline Savonesi 属 IGT 背景而非 DOC。',
'Light body, fresh acidity, wild-flower/herbal notes and sometimes slight phenolic grip.||轻酒体、清新酸度、野花草本气息，有时略具酚类抓口感。',
'Mataossu and Buzzetto should not automatically be counted as extra varieties.||Mataossu 与 Buzzetto 不应自动另计品种。',['lumassina','https://www.cersaa.it/wp-content/uploads/2017/04/LaRAF_Botrite_0617_Rev2.pdf'])
G('erbamat','Erbamat','white','Lombardia',[('Albamatta','Historical Brescian name.||Brescia 历史名称。')],
'Historic Brescian white described in sixteenth-century writing, revived through Franciacorta research.||16 世纪文献记载的 Brescia 历史白葡萄，经 Franciacorta 研究复兴。',
'Late ripening, high retained acidity and restrained aroma distinguish it from earlier-ripening sparkling-base varieties.||晚熟、保留高酸及克制香气使其不同于较早熟起泡基酒品种。',
'Permitted up to 10% in eligible Franciacorta categories; excluded from Satèn.||适用 Franciacorta 类别最多可用 10%，Satèn 排除。',
'Acidity and relative neutrality matter more than an invented signature perfume.||酸度及相对中性比虚构固定芳香更重要。',
'Distinct from Erbaluce.||不同于 Erbaluce。',['frangrape','https://franciacorta.wine/zh-hans/region/origins-history/'])
G('groppello-gentile','Groppello Gentile','red','Lombardia',[],
'Brescian western-Garda red associated with Valtènesi.||Brescia 的 Garda 西岸红葡萄，关联 Valtènesi。',
'Compact knot-like bunches explain the Groppello name; thin blue-violet skins are described.||紧密如结的果穗解释 Groppello 名称，果皮薄而蓝紫。',
'Important in local rosé; short extraction preserves lighter colour and texture.||对地方桃红重要，短萃取保留浅色及轻盈质地。',
'Delicate fruit and freshness are rosé references, modified by blend and cellar choices.||细致果味与清新感为桃红参考，受混酿及酿造影响。',
'Gentile and Mocasina are distinct cultivar records, not two clones of one entry.||Gentile 与 Mocasina 为独立品种记录，非同一记录的两个克隆。',['groppello','valtenesi','vcr'])
G('groppello-di-mocasina','Groppello di Mocasina','red','Lombardia',[],
'Brescian Garda Groppello identity separately listed from Gentile.||Brescia 的 Garda 地区 Groppello 身份，登记上与 Gentile 分列。',
'VCR lists separate propagation material; exact agronomic differences need cultivar-specific trials.||VCR 单列繁殖材料，具体农艺差异需专门试验。',
'Relevant to local Groppello-based wines; a generic Groppello label may not identify the exact cultivar.||关联地方 Groppello 葡萄酒，泛称 Groppello 酒标未必确认具体品种。',
'Collective Groppello descriptions do not establish a unique universal Mocasina tasting profile.||集体 Groppello 描述不能建立 Mocasina 独有统一品鉴。',
'Maintain separate Gentile and Mocasina records while sharing the Groppello search term.||Gentile 与 Mocasina 分列，可共享 Groppello 搜索词。',['vcr','valtenesi'])
for id,name,als,orig in [
('pignola-valtellinese','Pignola Valtellinese',[('Pignolo Spano','Historical northeastern Piemonte name.||Piemonte 东北历史名称。')],'Valtellina red also historically found in northeastern Piemonte.||Valtellina 红葡萄，历史上亦见于 Piemonte 东北。'),
('rossola-nera','Rossola Nera',[],'Traditional minor Valtellina red.||Valtellina 传统少量红葡萄。'),
('nebbiolo-rose','Nebbiolo Rosé',[('Chiavennaschino','Valtellina name.||Valtellina 名称。')],'Distinct northwestern grape found in Nebbiolo districts including Valtellina.||包括 Valtellina 在内的 Nebbiolo 地区出现的独立西北葡萄。')]:
 G(id,name,'red','Lombardia',als,orig,
 'Identity and regional presence are established by genetic and local research; do not copy Nebbiolo phenology.||遗传及地方研究确认身份与地区存在，不能照搬 Nebbiolo 物候。',
 'Usually a minor component of local mixed vineyards; independent bottlings require producer confirmation.||通常为地方混种园少量组成，独立装瓶须按生产者确认。',
 'The genetic study does not establish a sensory profile; Nebbiolo tasting notes cannot be transferred automatically.||遗传研究不建立感官风格，不能自动套用 Nebbiolo 品鉴。',
 'Not a Nebbiolo synonym or colour mutation. Pignola is distinct from Friulian Pignolo.||非 Nebbiolo 同义名或颜色突变，Pignola 亦不同于 Friuli 的 Pignolo。',['genetics','fojanini'],('unknown',[],b('The 2020 SSR/SNP study supports full-sibling relationships among Nebbiolo, Nebbiolo Rosé, Pignola and Rossola Nera; the named parental pair remains unresolved.||2020 SSR／SNP 研究支持 Nebbiolo、Nebbiolo Rosé、Pignola、Rossola Nera 为全同胞关系，具名双亲仍未确定。')))
G('moscato-di-scanzo','Moscato di Scanzo','red','Lombardia',[],
'Red aromatic grape tied to Scanzorosciate in the Bergamo hills.||与 Bergamo 丘陵 Scanzorosciate 紧密相关的红色芳香葡萄。',
'Steep well-exposed hills and healthy selected fruit support dried-grape production.||陡峭向阳丘陵与健康精选果实支持风干酒生产。',
'Sole grape of the DOCG: selected fruit is dried before fermentation into sweet red wine.||DOCG 唯一葡萄，精选果实先风干再发酵为甜红。',
'Aromatic concentrated sweet red, with drying and maturation adding complexity.||芳香浓缩甜红，风干与熟成增加复杂度。',
'Not interchangeable with Moscato Bianco or Moscato Rosa.||不能与 Moscato Bianco 或 Moscato Rosa 互换。',['scanzo','scanzomethod'])
save()
T={'overview':'Overview||概述','history':'History||历史','geography':'Geography||地理','climate':'Climate||气候','soils':'Geology & soils||地质与土壤','grapes':'Grapes||葡萄','viticulture':'Viticulture||栽培','law':'Appellations & classification||产区与分级','vinification':'Winemaking & styles||酿造与风格','producers':'Producers & wines||生产者与酒款','service':'Tasting & service||品鉴与侍酒'}
def sid(k):return 'src-'+hashlib.sha1(url(k).encode()).hexdigest()[:10]
def R(id,name,kind,parent,intro,items,grapes,aliases=None,questions=False):
 # item=(section, bilingual label, bilingual body, [source keys], optional bilingual question)
 keys=list(dict.fromkeys(k for x in items for k in x[3]))
 r={'id':id,'name':name,'country':'Italy','kind':kind,'aliases':aliases or [],'intro':b(intro),'facts':[{'label':b(x[1]),'body':b(x[2])} for x in items[:3]],'sections':[],'grapes':[],'wines':[],'sources':[{'id':sid(k),'title':source(k)['title'],'url':url(k)} for k in keys],'reviewed':'2026-10-26','questions':[]}
 if parent:r['parentId']=parent
 for sec,title in T.items():
  rows=[x for x in items if x[0]==sec]
  if rows:r['sections'].append({'id':sec,'title':b(title),'rows':[{'label':b(x[1]),'body':b(x[2])} for x in rows],'refs':list(dict.fromkeys(sid(k) for x in rows for k in x[3]))})
 for gid in grapes:r['grapes'].append({'grapeId':gid,'role':b('Regional grape; see its specific PDO and cultivation record.||地区葡萄，具体 PDO 及栽培情况见关联档案。'),'sourceIds':[sid(keys[0])]})
 if questions:
  for i,x in enumerate(items):
   assert len(x)>4
   r['questions'].append({'id':f'{i+1:02d}','level':'foundation' if i<10 else 'advanced','group':{'law':'law','producers':'people','service':'service'}.get(x[0],'place'),'q':b(x[4]),'a':b(x[2]),'refs':[sid(k) for k in x[3]]})
 D['regions'].append(r);return r
def I(sec,label,body,refs,q=None):return(sec,label,body,refs.split('|'),q) if q else(sec,label,body,refs.split('|'))
P=[
I('overview','Scope||范围','Piemonte is an administrative region containing multiple independent PDOs.||Piemonte 是包含多个独立 PDO 的行政大区。','piemonte','Is Piemonte a single appellation?||Piemonte 是单一法定产区吗？'),
I('grapes','Barolo||Barolo','Barolo is made from Nebbiolo.||Barolo 使用 Nebbiolo。','barolo','Which grape defines Barolo?||Barolo 的核心葡萄？'),
I('grapes','Gavi||Gavi','Gavi is made from Cortese.||Gavi 使用 Cortese。','gavi','Which grape defines Gavi?||Gavi 的核心葡萄？'),
I('grapes','Roero white||Roero 白酒','Arneis defines Roero’s principal white category.||Arneis 定义 Roero 主要白酒类别。','roero','Which white grape defines Roero?||Roero 核心白葡萄？'),
I('grapes','Verduno Pelaverga||Verduno Pelaverga','Pelaverga Piccolo is the principal grape, not Pelaverga Grosso.||主要葡萄为 Pelaverga Piccolo，非 Pelaverga Grosso。','pelavergapdf','Which Pelaverga is used in Verduno Pelaverga?||Verduno Pelaverga 使用哪个 Pelaverga？'),
I('grapes','Colli Tortonesi||Colli Tortonesi','Timorasso is central to the modern revival of Colli Tortonesi white wine.||Timorasso 为 Colli Tortonesi 白酒当代复兴核心。','tortona','Which white grape is central to the Colli Tortonesi revival?||Colli Tortonesi 白酒复兴核心葡萄？'),
I('geography','Nascetta||Nascetta','Nascetta is particularly associated with Novello in the Langhe.||Nascetta 尤其关联 Langhe 的 Novello。',ACQ+'nascetta/','Where is Nascetta particularly associated?||Nascetta 特别关联哪里？'),
I('geography','Quagliano||Quagliano','Colline Saluzzesi provides the principal Quagliano PDO reference.||Colline Saluzzesi 提供主要 Quagliano PDO 参考。','https://www.visitlmr.it/it/vini/colline-saluzzesi-quagliano-doc','Where is Quagliano an established PDO reference?||Quagliano 的 PDO 参考在哪里？'),
I('geography','Alto Piemonte||Alto Piemonte','Gattinara belongs to Alto Piemonte, not the southern Langhe.||Gattinara 属 Alto Piemonte，而非南部 Langhe。','gattinara','Is Gattinara in the Langhe?||Gattinara 位于 Langhe 吗？'),
I('geography','Tanaro||Tanaro','The Tanaro is central to the Roero/Langhe geographical distinction.||Tanaro 河对 Roero／Langhe 地理区分重要。','roerogeo','Which river helps distinguish Roero from Langhe?||区分 Roero 与 Langhe 的重要河流？'),
I('history','Albarossa breeding||Albarossa 育种','Albarossa is Barbera × Chatus, bred at Conegliano in 1938.||Albarossa 为 Barbera × Chatus，1938 年在 Conegliano 育成。','https://www.viniastimonferrato.it/en/vitigni/albarossa/','What is Albarossa’s corrected parentage and breeding location?||Albarossa 校正亲本及育种地？'),
I('history','Nebbiolo di Dronero||Nebbiolo di Dronero','In Albarossa’s old pedigree this name referred to Chatus, not Nebbiolo.||在 Albarossa 旧亲本中，此名指 Chatus，非 Nebbiolo。','https://www.viniastimonferrato.it/en/vitigni/albarossa/','Why is Nebbiolo di Dronero misleading in Albarossa’s pedigree?||该亲本名称为何易误导？'),
I('grapes','Pelaverga identities||Pelaverga 身份','Pelaverga Piccolo and Pelaverga Grosso are distinct cultivars.||Pelaverga Piccolo 与 Grosso 为不同品种。','pelavergapdf','Are Pelaverga Piccolo and Grosso synonyms?||两种 Pelaverga 是同义名吗？'),
I('grapes','Becuét||Becuét','Becuét is the Val di Susa name linked to Persan.||Becuét 为关联 Persan 的 Val di Susa 地方名。',TOR+'becuet/','What canonical identity does Becuét represent?||Becuét 对应何种标准身份？'),
I('grapes','Bian Ver||Bian Ver','Bian Ver belongs with Verdesse.||Bian Ver 应归于 Verdesse。','genetics','What is Bian Ver’s identity?||Bian Ver 对应何种品种？'),
I('viticulture','Conservation||保种','A surviving Bianchetto di Saluzzo accession confirms preserved material, not necessarily commercial production.||Bianchetto di Saluzzo 种质存续证明材料保存，不一定证明商业生产。',BIO+'bianchetto-di-saluzzo','Does a surviving accession prove a commercial vineyard?||存续种质能证明商业葡萄园吗？'),
I('viticulture','Doux d’Henry||Doux d’Henry','Functionally female flowers require suitable pollination; poor set can cause variable yields.||功能性雌花需合适授粉，坐果不良使产量波动。',TOR+'doux-dhenry/','What complicates Doux d’Henry fruit set?||Doux d’Henry 坐果难点？'),
I('viticulture','Neretto pruning||Neretto 修剪','Low basal-bud fertility favours long pruning for Neretto di Bairo.||Neretto di Bairo 基部芽结实性低，适合长梢修剪。',TOR+'neretto/','Why use long pruning for Neretto di Bairo?||为何适合长梢修剪？'),
I('grapes','Barbera Bianca||Barbera Bianca','The shared name does not establish a white mutation of Barbera.||同名不能证明为 Barbera 白色突变。',ACQ+'carica-lasino-o-barbera-bianca/','Is Barbera Bianca proven to be a Barbera colour mutation?||是否已证实为 Barbera 颜色突变？'),
I('grapes','Carica l’Asino||Carica l’Asino','This ambiguous name has applied to Barbera Bianca and Barbassese.||有歧义的名称曾用于 Barbera Bianca 及 Barbassese。',BIO+'barbassese'+'|'+ACQ+'carica-lasino-o-barbera-bianca/','Why must Carica l’Asino be qualified?||此名称为何须附背景？'),
I('grapes','Lambrusca||Lambrusca','Lambrusca di Alessandria is Vitis vinifera, not Vitis labrusca.||Lambrusca di Alessandria 属 Vitis vinifera，非 Vitis labrusca。',ACQ+'lambrusca-di-alessandria/','Is Lambrusca di Alessandria Vitis labrusca?||它属于 Vitis labrusca 吗？'),
I('soils','Gattinara||Gattinara','Volcanic porphyry distinguishes Gattinara’s geological reference.||火山斑岩为 Gattinara 重要地质特征。','gattinara','What geology characterises Gattinara?||Gattinara 的地质参考？'),
I('soils','Roero||Roero','Marine sedimentary sands are a characteristic Roero reference.||海相沉积砂为 Roero 典型参考。','roerogeo','What parent material is associated with Roero?||Roero 相关母质是什么？'),
I('law','Roero Arneis||Roero Arneis','At least 95% Arneis.||至少 95% Arneis。','roerorules','What is Roero Arneis’s minimum grape proportion?||Roero Arneis 最低比例？'),
I('law','Roero red||Roero 红酒','At least 95% Nebbiolo.||至少 95% Nebbiolo。','roerorules','What is Roero red’s minimum Nebbiolo proportion?||Roero 红酒最低 Nebbiolo 比例？'),
I('law','Barolo maturation||Barolo 熟成','Minimum 38 months, including 18 in wood.||最低 38 个月，其中 18 个月木质容器。','barolo','What is Barolo’s standard minimum maturation?||Barolo 普通款最低熟成？'),
I('law','Barbaresco maturation||Barbaresco 熟成','Minimum 26 months, including 9 in wood.||最低 26 个月，其中 9 个月木质容器。','barbaresco','What is Barbaresco’s standard minimum maturation?||Barbaresco 普通款最低熟成？'),
I('producers','Uceline||Uceline','Cascina Castlet uses selected dried Uvalino grapes for Uceline.||Cascina Castlet 使用精选风干 Uvalino 酿 Uceline。','https://www.cascinacastlet.com/sites/default/files/uceline-it.pdf','What process distinguishes Uceline’s producer reference?||Uceline 生产者参考的关键工艺？'),
I('vinification','Malvasia Moscata||Malvasia Moscata','Dry aromatic wine is possible; the grape name does not require sweetness.||可以酿芳香型干白，品种名不要求甜度。',ACQ+'malvasia-moscata/','Must Malvasia Moscata be sweet?||Malvasia Moscata 必须甜吗？'),
I('service','Peppery red reference||胡椒红酒参考','Verduno Pelaverga’s peppery expression is associated with rotundone research reported in 2021.||Verduno Pelaverga 胡椒表现关联 2021 年报告的 rotundone 研究。','pelaverga','Which compound is linked to Verduno Pelaverga’s pepper aroma?||哪种化合物关联其胡椒香？')]
pr=R('it-piemonte','Piemonte','region',None,'Northwestern region spanning Langhe, Roero, Monferrato, Alto Piemonte and Alpine foothill grape traditions.||西北大区，涵盖 Langhe、Roero、Monferrato、Alto Piemonte 及阿尔卑斯山前葡萄传统。',P,[g['id'] for g in D['grapes'] if g['regions'][0]['name']=='Piemonte']+['nebbiolo','barbera','dolcetto','arneis','cortese','erbaluce','timorasso','grignolino','brachetto','freisa','bonarda-piemontese','pelaverga-grosso','pelaverga-piccolo','ruche','croatina','uva-rara','vespolina','malvasia-di-casorzo','malvasia-di-schierano','vermentino','chatus','hibou-noir','gouais-blanc','verdesse','persan','muscat-blanc-a-petits-grains'],['Piedmont'],True)
save()
A=[
I('geography','Valley axis||谷地轴线','The Dora Baltea forms the principal vineyard corridor.||Dora Baltea 构成主要葡萄园轴线。','aostawine','Which river defines the vineyard corridor?||哪条河定义葡萄园轴线？'),
I('grapes','Morgex||Morgex','Prié Blanc defines the upper-valley white reference.||Prié Blanc 定义上谷地白酒参考。','aosta','Which grape defines Morgex and La Salle?||Morgex 及 La Salle 核心葡萄？'),
I('grapes','Prëmetta||Prëmetta','Prëmetta is Prié Rouge.||Prëmetta 即 Prié Rouge。',GR+'premetta/','What is Prëmetta’s canonical identity?||Prëmetta 的标准身份？'),
I('grapes','Torrette||Torrette','Petit Rouge is central to Torrette.||Petit Rouge 为 Torrette 核心葡萄。',GR+'petit-rouge/','Which grape is central to Torrette?||Torrette 核心葡萄？'),
I('grapes','Nus Rouge||Nus Rouge','Vien de Nus is a principal component.||Vien de Nus 为主要组成。','https://www.lovevda.it/en/food-and-wine/wines/nus-rouge-doc','Which local grape is central to Nus Rouge?||Nus Rouge 核心地方葡萄？'),
I('grapes','Malvoisie||Malvoisie','Nus Malvoisie refers to Pinot Gris.||Nus Malvoisie 指 Pinot Gris。','aosta','What is Malvoisie in Nus?||Nus 的 Malvoisie 是什么？'),
I('grapes','Picotendro||Picotendro','Picotendro is the local Nebbiolo name.||Picotendro 为 Nebbiolo 地方名。','aostawine','Which grape is Picotendro?||Picotendro 是哪种葡萄？'),
I('history','DOC||DOC','The regional DOC was established in 1985.||大区 DOC 建立于 1985 年。','aosta','When was the regional DOC established?||大区 DOC 建立于何时？'),
I('grapes','Fumin||Fumin','Fumin is a red grape.||Fumin 为红葡萄。',GR+'fumin/','Is Fumin a white grape?||Fumin 是白葡萄吗？'),
I('overview','Entity distinction||实体区分','The administrative region and the protected wine denomination are separate entity types.||行政大区与受保护葡萄酒名称属于不同实体类型。','aosta','Are the administrative region and DOC identical entities?||行政大区与 DOC 为同一实体吗？'),
I('law','Seven geographical names||七地理名称','Blanc de Morgex et de La Salle, Enfer d’Arvier, Torrette, Nus, Chambave, Arnad-Montjovet and Donnas.||Blanc de Morgex et de La Salle、Enfer d’Arvier、Torrette、Nus、Chambave、Arnad-Montjovet、Donnas。','aosta','Name the seven geographical DOC references.||列出七个 DOC 地理参考名称。'),
I('viticulture','Low pergolas||低棚架','Low pergolas use the relatively protected near-ground environment in the upper valley.||低棚架利用上谷地相对受保护的近地环境。','https://www.lovevda.it/en/food-and-wine/wines/blanc-de-morgex-et-de-la-salle-doc','Why are low pergolas associated with the upper valley?||上谷地为何常见低棚架？'),
I('viticulture','Own roots||自根','Many upper-valley vineyards are own-rooted, but status must be checked by vineyard.||许多上谷地园为自根，但须按园核实。','https://www.lovevda.it/en/food-and-wine/wines/blanc-de-morgex-et-de-la-salle-doc','Can all Prié Blanc be described as ungrafted?||可称所有 Prié Blanc 均自根吗？'),
I('climate','Fumin maturity||Fumin 成熟','Warm, exposed sites help late Fumin reach maturity.||温暖向阳地块帮助晚熟 Fumin 成熟。',GR+'fumin/','What site conditions matter for Fumin maturity?||Fumin 成熟需要何种地块条件？'),
I('service','Pale colour||浅色','Prëmetta can be pale coral yet have appreciable tannin.||Prëmetta 可呈浅珊瑚色但有明显单宁。',GR+'premetta/','Does pale Prëmetta necessarily have little tannin?||浅色 Prëmetta 必然少单宁吗？'),
I('viticulture','Skin health||果皮健康','Thin fragile Prëmetta skins increase the importance of disease and rot management.||Prëmetta 薄而脆弱的皮使病害及腐烂管理重要。',GR+'premetta/','What skin trait affects Prëmetta management?||何种果皮特点影响管理？'),
I('grapes','Prié identities||Prié 身份','Shared naming alone does not prove a Prié Blanc–Prié Rouge mutation relationship.||共同名称不能证明 Prié Blanc 与 Rouge 的突变关系。','genetics','Do the Prié names alone prove a mutation relationship?||Prié 名称本身证明突变关系吗？'),
I('grapes','Cornalin d’Aoste||Cornalin d’Aoste','Cornalin d’Aoste corresponds to Humagne Rouge.||Cornalin d’Aoste 对应 Humagne Rouge。','genetics','What cross-border identity is Cornalin d’Aoste?||Cornalin d’Aoste 的跨境身份？'),
I('grapes','Cornalin du Valais||Cornalin du Valais','Swiss Cornalin du Valais is distinct from Cornalin d’Aoste/Humagne Rouge.||瑞士 Cornalin du Valais 不同于 Cornalin d’Aoste／Humagne Rouge。','genetics','Why must the two Cornalin names be distinguished?||为何区分两个 Cornalin 名称？'),
I('vinification','Torrette blend||Torrette 混酿','A Torrette tasting note describes a blend, not necessarily pure Petit Rouge.||Torrette 品鉴描述混酿，不一定描述纯 Petit Rouge。',GR+'petit-rouge/','Can Torrette directly define pure Petit Rouge’s taste?||Torrette 能直接定义纯 Petit Rouge 风味吗？'),
I('vinification','Nus blend||Nus 混酿','Petit Rouge accompanies Vien de Nus in Nus Rouge.||Nus Rouge 中 Petit Rouge 与 Vien de Nus 配合。','https://www.lovevda.it/en/food-and-wine/wines/nus-rouge-doc','Which grape accompanies Vien de Nus in Nus Rouge?||Nus Rouge 中与 Vien de Nus 配合的葡萄？'),
I('producers','La Vrille||La Vrille','La Vrille provides a 100% Vuillermin reference.||La Vrille 提供 100% Vuillermin 参考。','https://www.lavrille.it/vuillermin/','Which producer offers a varietal Vuillermin reference?||哪个生产者提供单品种 Vuillermin？'),
I('producers','Grosjean||Grosjean','Grosjean documents Fumin, Petit Rouge and Prëmetta separately.||Grosjean 分别记录 Fumin、Petit Rouge、Prëmetta。',GR+'fumin/'+'|'+GR+'premetta/','Which producer documents Fumin and Prëmetta separately?||哪个生产者分别记录两品种？'),
I('producers','Di Barrò||Di Barrò','Di Barrò provides a varietal Mayolet reference.||Di Barrò 提供单品种 Mayolet 参考。','https://www.dibarro.com/it/vini/mayolet','Which producer supplies a Mayolet reference?||哪个生产者提供 Mayolet 参考？'),
I('viticulture','Mayolet timing||Mayolet 物候','Mayolet is relatively early ripening.||Mayolet 相对早熟。','https://www.ao.camcom.it/sites/default/files/contenuto_redazione/allegati/guidaenogastronomica_11_it.pdf','Is Mayolet relatively early or late ripening?||Mayolet 早熟还是晚熟？'),
I('viticulture','Fumin timing||Fumin 物候','Fumin is late ripening.||Fumin 晚熟。',GR+'fumin/','What maturation timing distinguishes Fumin?||Fumin 的成熟时间特点？'),
I('vinification','Fumin wood||Fumin 木桶','Long wood ageing is a producer choice, not a requirement arising solely from the grape name.||较长木桶熟成是生产者选择，并非品种名本身要求。',GR+'fumin/','Must Fumin use wood solely because of its grape identity?||Fumin 是否因品种身份就必须用木桶？'),
I('geography','Elevation||海拔','Upper-valley cultivation near Morgex reaches roughly 1,200 metres.||Morgex 附近上谷地栽培约可达 1,200 米。','aostawine','What approximate elevation is reached near Morgex?||Morgex 附近约可达多高？'),
I('vinification','Morgex styles||Morgex 风格','Blanc de Morgex et de La Salle includes still and sparkling references.||Blanc de Morgex et de La Salle 有静止及起泡参考。','https://www.lovevda.it/en/food-and-wine/wines/blanc-de-morgex-et-de-la-salle-doc','Name the upper-valley sparkling white reference.||上谷地白色起泡参考？'),
I('service','Nus Rouge||Nus Rouge','The regional reference describes a dry fruity red, paired locally with meat and cheese.||大区参考为干型果味红酒，当地配肉类及奶酪。','https://www.lovevda.it/en/food-and-wine/wines/nus-rouge-doc','What is Nus Rouge’s broad style and local food context?||Nus Rouge 大致风格及地方配餐？')]
ar=R('it-valle-daosta','Valle d’Aosta','region',None,'Alpine valley with distinct local grapes and a regional DOC containing geographical and varietal identities.||阿尔卑斯谷地，拥有独特地方葡萄及包含地理、品种身份的大区 DOC。',A,[g['id'] for g in D['grapes'] if g['regions'][0]['name']=='Valle d’Aosta']+['nebbiolo','humagne-rouge','petite-arvine','pinot-noir','pinot-gris','chardonnay','gamay','muscat-blanc-a-petits-grains','muller-thurgau'],['Aosta Valley','Vallée d’Aoste'],True)
save()
L=[
I('overview','Scope||范围','Liguria is an administrative coastal region with multiple DOCs and IGTs.||Liguria 是沿海行政大区，含多个 DOC 与 IGT。','liguria','Is Liguria one appellation?||Liguria 是一个法定产区吗？'),
I('geography','Ponente||Ponente','Ponente denotes western Liguria.||Ponente 指 Liguria 西部。','liguria','What does Ponente denote?||Ponente 指哪里？'),
I('geography','Levante||Levante','Levante denotes eastern Liguria.||Levante 指 Liguria 东部。','liguria','What does Levante denote?||Levante 指哪里？'),
I('grapes','Cinque Terre||Cinque Terre','Bosco is the required leading grape.||Bosco 为必需主要葡萄。','cinque','Which grape leads Cinque Terre?||Cinque Terre 主要葡萄？'),
I('vinification','Sciacchetrà||Sciacchetrà','Sciacchetrà is Cinque Terre’s sweet dried-grape wine.||Sciacchetrà 为 Cinque Terre 风干甜酒。','cinque','What is Sciacchetrà?||Sciacchetrà 是什么？'),
I('grapes','Dolceacqua||Dolceacqua','Rossese, linked to Tibouren, defines Dolceacqua.||关联 Tibouren 的 Rossese 定义 Dolceacqua。','dolceacqua|genetics','Which grape defines Dolceacqua?||Dolceacqua 核心葡萄？'),
I('geography','Colli di Luni||Colli di Luni','Colli di Luni crosses Liguria and Toscana.||Colli di Luni 跨 Liguria 与 Toscana。','luni','Which regions share Colli di Luni?||Colli di Luni 跨哪两个大区？'),
I('grapes','Mataossu||Mataossu','Mataossu is a local name for Lumassina.||Mataossu 为 Lumassina 地方名。','lumassina','What is Mataossu?||Mataossu 是什么？'),
I('grapes','Bianchetta Genovese||Bianchetta Genovese','Modern VitisDB identity work links Bianchetta Genovese with Albarola.||现代 VitisDB 身份研究关联 Bianchetta Genovese 与 Albarola。','https://vitisdb.it/varieties/show/8159','What identity includes Bianchetta Genovese?||Bianchetta Genovese 对应何种身份？'),
I('geography','Lumassina area||Lumassina 地区','Savona and Finale are key local references.||Savona 与 Finale 为重要地方参考。','lumassina','Where is Lumassina particularly associated?||Lumassina 特别关联哪里？'),
I('history','Dolceacqua DOC||Dolceacqua DOC','DOC recognition dates to 1972.||1972 年获 DOC。','dolceacqua','When did Dolceacqua obtain DOC recognition?||Dolceacqua 何时获 DOC？'),
I('history','Cinque Terre DOC||Cinque Terre DOC','DOC recognition dates to 1973.||1973 年获 DOC。','cinque','When did Cinque Terre obtain DOC recognition?||Cinque Terre 何时获 DOC？'),
I('history','Colli di Luni DOC||Colli di Luni DOC','DOC recognition dates to 1989.||1989 年获 DOC。','luni','When did Colli di Luni obtain DOC recognition?||Colli di Luni 何时获 DOC？'),
I('law','Bosco||Bosco','At least 40% Bosco in Cinque Terre.||Cinque Terre 至少 40% Bosco。','cinque','What is Cinque Terre’s minimum Bosco share?||最低 Bosco 比例？'),
I('law','Vermentino/Albarola||Vermentino／Albarola','Cinque Terre allows Vermentino and/or Albarola together up to 40%.||Cinque Terre 的 Vermentino 及／或 Albarola 合计最多 40%。','cinque','What is their combined maximum share in Cinque Terre?||两者合计最高比例？'),
I('law','Other Cinque Terre whites||其他 Cinque Terre 白葡萄','Other permitted whites may contribute up to 20%.||其他获准白葡萄最多 20%。','cinque','What is the other-white allowance in Cinque Terre?||其他白葡萄最高比例？'),
I('law','Dolceacqua Rossese||Dolceacqua Rossese','Dolceacqua requires at least 95% Rossese.||Dolceacqua 至少 95% Rossese。','dolceacqua','What is Dolceacqua’s minimum Rossese share?||最低 Rossese 比例？'),
I('law','Riviera Pigato||Riviera Pigato','Riviera Ligure di Ponente Pigato requires at least 95%.||Riviera Ligure di Ponente Pigato 至少 95%。','riviera','What is Riviera Pigato’s minimum grape share?||Riviera Pigato 最低比例？'),
I('law','Riviera Vermentino||Riviera Vermentino','Riviera Ligure di Ponente Vermentino requires at least 95%.||Riviera Ligure di Ponente Vermentino 至少 95%。','riviera','What is Riviera Vermentino’s minimum share?||Riviera Vermentino 最低比例？'),
I('law','Riviera Rossese||Riviera Rossese','Riviera Ligure di Ponente Rossese requires at least 90%.||Riviera Ligure di Ponente Rossese 至少 90%。','riviera','What is Riviera Rossese’s minimum share?||Riviera Rossese 最低比例？'),
I('law','Riviera Granaccia||Riviera Granaccia','Riviera Ligure di Ponente Granaccia requires at least 90%.||Riviera Ligure di Ponente Granaccia 至少 90%。','riviera','What is Riviera Granaccia’s minimum share?||Riviera Granaccia 最低比例？'),
I('law','Riviera Moscato||Riviera Moscato','Riviera Ligure di Ponente Moscato requires 100%.||Riviera Ligure di Ponente Moscato 要求 100%。','riviera','What is Riviera Moscato’s grape share?||Riviera Moscato 比例？'),
I('law','Luni Vermentino||Luni Vermentino','Colli di Luni Vermentino requires at least 90%.||Colli di Luni Vermentino 至少 90%。','luni','What is Luni Vermentino’s minimum share?||Luni Vermentino 最低比例？'),
I('law','Luni Albarola||Luni Albarola','Colli di Luni Albarola requires at least 85%.||Colli di Luni Albarola 至少 85%。','luni','What is Luni Albarola’s minimum share?||Luni Albarola 最低比例？'),
I('law','Luni Rosso||Luni Rosso','Sangiovese must comprise at least 50%.||Sangiovese 至少 50%。','luni','Which grape leads Colli di Luni Rosso and at what minimum?||Luni Rosso 主要葡萄及最低比例？'),
I('geography','Cinque Terre subzones||Cinque Terre 分区','Costa de Sera, Costa de Campu and Costa de Posa.||Costa de Sera、Costa de Campu、Costa de Posa。','cinque','Name the three Cinque Terre subzones.||列出三个 Cinque Terre 分区。'),
I('geography','Riviera subzones||Riviera 分区','Riviera dei Fiori, Finalese and Albenganese are relevant subzone references.||Riviera dei Fiori、Finalese、Albenganese 为相关分区参考。','riviera','Name Riviera Ligure di Ponente’s subzone references.||列出 Riviera 分区参考。'),
I('viticulture','Identity distinction||身份区分','Bianchetta Genovese is not Bianchetta Trevigiana.||Bianchetta Genovese 不是 Bianchetta Trevigiana。','https://vitisdb.it/varieties/show/8159','Are the Genovese and Trevigiana Bianchetta names interchangeable?||两种 Bianchetta 可互换吗？'),
I('grapes','Pigato||Pigato','Pigato is linked to the Vermentino identity; preserve the local wine name without adding a duplicate grape.||Pigato 关联 Vermentino，保留地方酒名而不重复计品种。','genetics','Does Pigato automatically add a distinct genetic variety?||Pigato 自动增加独立遗传品种吗？'),
I('service','Lumassina texture||Lumassina 质地','Brief traditional skin contact can add a slight phenolic grip to otherwise fresh light whites.||传统短浸皮可为清新轻白酒添加轻微酚类抓口感。','lumassina','What traditional practice can explain Lumassina’s slight phenolic grip?||何种传统工艺解释 Lumassina 抓口感？')]
lr=R('it-liguria','Liguria','region',None,'Coastal region linking western Rossese/Pigato wines to eastern Bosco–Albarola blends and cross-border Colli di Luni.||沿海大区，连接西部 Rossese／Pigato 酒、东部 Bosco–Albarola 混酿及跨界 Colli di Luni。',L,['albarola','bosco','lumassina','vermentino','tibouren','dolcetto','garnacha-tinta','genovese','pagadebiti','muscat-blanc-a-petits-grains','sangiovese','trebbiano-toscano','ciliegiolo'],questions=True)
M=[
I('grapes','Chiavennasca||Chiavennasca','Chiavennasca is Nebbiolo.||Chiavennasca 即 Nebbiolo。','valtellina','Which grape is Chiavennasca?||Chiavennasca 是什么品种？'),
I('geography','Franciacorta lake||Franciacorta 湖泊','Lake Iseo lies north of Franciacorta.||Iseo 湖位于 Franciacorta 北侧。','frangeo','Which lake is north of Franciacorta?||Franciacorta 北侧是哪座湖？'),
I('geography','Lugana lake||Lugana 湖泊','Lugana lies at southern Lake Garda.||Lugana 位于 Garda 湖南部。','lugana','Which lake borders Lugana?||Lugana 靠近哪座湖？'),
I('geography','Lugana boundary||Lugana 边界','Lugana is shared by Lombardia and Veneto.||Lugana 跨 Lombardia 与 Veneto。','lugana','Which regions share Lugana?||Lugana 跨哪两个大区？'),
I('geography','Oltrepò||Oltrepò','Oltrepò lies south of the Po.||Oltrepò 位于 Po 河以南。','oltrepo','Is Oltrepò north or south of the Po?||Oltrepò 在 Po 河以北还是以南？'),
I('grapes','Moscato di Scanzo||Moscato di Scanzo','Moscato di Scanzo is a red aromatic grape.||Moscato di Scanzo 为红色芳香葡萄。','scanzo','What colour and aromatic type is Moscato di Scanzo?||Moscato di Scanzo 颜色及芳香类型？'),
I('grapes','Turbiana||Turbiana','Turbiana is the principal local grape name in Lugana.||Turbiana 为 Lugana 主要葡萄地方名。','lugana','What is Lugana’s principal local grape name?||Lugana 主要葡萄地方名？'),
I('grapes','Valtènesi||Valtènesi','Groppello is the emblematic local grape group.||Groppello 为标志性地方葡萄群。','valtenesi','Which grape group is associated with Valtènesi?||Valtènesi 关联哪组葡萄？'),
I('vinification','Sforzato||Sforzato','Sforzato is a dry red made from dried grapes.||Sforzato 为风干葡萄酿成的干红。','valtellina','Is Sforzato necessarily sweet?||Sforzato 必然为甜型吗？'),
I('vinification','Franciacorta method||Franciacorta 方法','Traditional method with secondary fermentation in bottle.||传统法，瓶中二次发酵。','franmethod','What method defines Franciacorta?||何种方法定义 Franciacorta？'),
I('law','Valtellina subzones||Valtellina 分区','Maroggia, Sassella, Grumello, Inferno and Valgella.||Maroggia、Sassella、Grumello、Inferno、Valgella。','valtellina','Name Valtellina Superiore’s five subzones.||列出 Valtellina Superiore 五分区。'),
I('law','Valtellina Nebbiolo||Valtellina Nebbiolo','Valtellina Superiore requires at least 90% Nebbiolo.||Valtellina Superiore 至少 90% Nebbiolo。','valtellina','What is the minimum Nebbiolo share?||最低 Nebbiolo 比例？'),
I('geography','Lugana communes||Lugana 市镇','Sirmione, Desenzano, Lonato, Pozzolengo and Peschiera del Garda.||Sirmione、Desenzano、Lonato、Pozzolengo、Peschiera del Garda。','lugana','Name Lugana’s five communes.||列出 Lugana 五市镇。'),
I('geography','Whole commune||全境纳入','Sirmione is wholly included; specified parts of the other four communes are included.||Sirmione 全境纳入，其他四市镇为指定部分。','lugana','Which Lugana commune is wholly included?||哪个市镇全境纳入？'),
I('law','Turbiana proportion||Turbiana 比例','Lugana requires at least 90% Turbiana.||Lugana 至少 90% Turbiana。','lugana','What is Lugana’s minimum Turbiana share?||Lugana 最低 Turbiana 比例？'),
I('history','Lugana DOC||Lugana DOC','Lugana received DOC status in 1967.||Lugana 于 1967 年获 DOC。','lugana','When was Lugana DOC recognised?||Lugana DOC 何时认可？'),
I('law','Lugana Superiore||Lugana Superiore','Minimum 12 months maturation.||最低熟成 12 个月。','lugana','What is Lugana Superiore’s minimum maturation?||Superiore 最低熟成？'),
I('law','Lugana Riserva||Lugana Riserva','Minimum 24 months, including at least 6 in bottle.||最低 24 个月，含至少 6 个月瓶陈。','lugana','What is Lugana Riserva’s minimum maturation?||Riserva 最低熟成？'),
I('law','Lugana categories||Lugana 类别','Basic, Superiore, Riserva, Vendemmia Tardiva and Spumante.||基础款、Superiore、Riserva、Vendemmia Tardiva、Spumante。','lugana','Name Lugana’s five categories.||列出 Lugana 五类别。'),
I('soils','Monte Orfano||Monte Orfano','Monte Orfano has a substrate distinct from Franciacorta’s principal morainic landscape.||Monte Orfano 基底不同于 Franciacorta 主要冰碛景观。','frangeo','Why distinguish Monte Orfano geologically?||为何地质上区分 Monte Orfano？'),
I('viticulture','Erbamat maturity||Erbamat 成熟','Late ripening with retained high acidity is Erbamat’s principal sparkling-base interest.||晚熟保留高酸为 Erbamat 的主要起泡基酒价值。','frangrape','What trait makes Erbamat relevant to sparkling bases?||Erbamat 对起泡基酒的主要价值？'),
I('law','Satèn||Satèn','Erbamat is excluded from Satèn.||Satèn 排除 Erbamat。','frangrape','May Satèn contain Erbamat?||Satèn 可含 Erbamat 吗？'),
I('law','Erbamat limit||Erbamat 上限','Eligible Franciacorta categories allow at most 10% Erbamat.||适用 Franciacorta 类别最多 10% Erbamat。','frangrape','What is Erbamat’s maximum permitted share?||Erbamat 最高比例？'),
I('grapes','Groppello identities||Groppello 身份','Gentile and Mocasina are separate cultivars, not merely two clones.||Gentile 与 Mocasina 为不同品种，并非仅两个克隆。','vcr','Are Gentile and Mocasina merely clones of one grape?||Gentile 与 Mocasina 只是克隆吗？'),
I('grapes','Nebbiolo Rosé||Nebbiolo Rosé','Nebbiolo Rosé is genetically distinct, not a proven colour mutation.||Nebbiolo Rosé 遗传上独立，并非已证实颜色突变。','genetics','Is Nebbiolo Rosé a Nebbiolo colour mutation?||Nebbiolo Rosé 是颜色突变吗？'),
I('grapes','Rossola kinship||Rossola 亲缘','The 2020 study supports full-sibling relationships with Nebbiolo, Nebbiolo Rosé and Pignola.||2020 研究支持其与 Nebbiolo、Nebbiolo Rosé、Pignola 为全同胞关系。','genetics','What kinship is supported for Rossola Nera?||Rossola Nera 获支持的亲缘？'),
I('geography','Oltrepò valleys||Oltrepò 谷地','Versa, Scuropasso, Coppa and Staffora.||Versa、Scuropasso、Coppa、Staffora。','oltrepo','Which four valleys structure Oltrepò?||Oltrepò 四条重要谷地？'),
I('producers','Consortium scope||协会范围','The Oltrepò consortium represents seven denomination identities, including Bonarda, Buttafuoco and Sangue di Giuda.||Oltrepò 协会代表七个名称身份，包括 Bonarda、Buttafuoco、Sangue di Giuda。','oltrepo','Does the Oltrepò consortium represent only one wine category?||Oltrepò 协会仅代表一个酒类别吗？'),
I('vinification','Scanzo drying||Scanzo 风干','Red aromatic fruit is dried before fermentation into a concentrated sweet red.||红色芳香果实先风干，再酿浓缩甜红。','scanzomethod','What separates Moscato di Scanzo from fresh Moscato sparkling wine?||Moscato di Scanzo 与清新 Moscato 起泡的区别？'),
I('service','Drying and sweetness||风干与甜度','Dry Sforzato and sweet Moscato di Scanzo need different service contexts despite both using dried fruit.||干型 Sforzato 与甜型 Moscato di Scanzo 虽都用风干果实，侍酒场景不同。','valtellina|scanzo','Why are Sforzato and Moscato di Scanzo not equivalent dessert wines?||两者为何不是同类餐后酒？')]
mr=R('it-lombardia','Lombardia','region',None,'Northern region spanning Alpine Nebbiolo, Garda whites and rosés, Franciacorta and Oltrepò sparkling traditions.||北部大区，涵盖阿尔卑斯 Nebbiolo、Garda 白酒桃红及 Franciacorta、Oltrepò 起泡传统。',M,[g['id'] for g in D['grapes'] if g['regions'][0]['name']=='Lombardia']+['nebbiolo','chardonnay','pinot-noir','pinot-blanc','pinot-gris','verdicchio','croatina','barbera','uva-rara','vespolina','riesling','welschriesling','cabernet-sauvignon','merlot','muscat-blanc-a-petits-grains'],['Lombardy'],True)
save()
# PDO facts remain separate from administrative-region records.
def AP(slug,name,parent,grapes,key,rows,aliases=None,kind='appellation'):
 items=[I(s,l,t,ref or key) for s,l,t,ref in rows]
 return R('it-'+slug,name,kind,parent,items[0][2],items,grapes,aliases or [name.split(' DOC')[0]])
def F(sec,label,text,ref=None):return(sec,label,text,ref)
AP('barolo','Barolo DOCG','it-piemonte',['nebbiolo'],'barolo',[
F('overview','Identity||身份','Langhe dry-red PDO made from Nebbiolo.||以 Nebbiolo 酿造的 Langhe 干红 PDO。'),
F('history','DOC||DOC','DOC recognition in 1966.||1966 年获 DOC。'),F('history','DOCG||DOCG','DOCG status in 1980.||1980 年获 DOCG。'),
F('geography','Area||区域','Eleven communes contribute wholly or partly.||涉及十一个市镇的全部或部分。'),
F('geography','Core communes||核心市镇','Barolo, La Morra, Monforte d’Alba, Serralunga d’Alba and Castiglione Falletto are key references.||Barolo、La Morra、Monforte d’Alba、Serralunga d’Alba、Castiglione Falletto 为主要参考。'),
F('grapes','Composition||组成','100% Nebbiolo.||100% Nebbiolo。'),
F('law','Standard maturation||普通熟成','38 months, including 18 in wood.||38 个月，含 18 个月木质容器。'),
F('law','Riserva||Riserva','62 months, including 18 in wood.||62 个月，含 18 个月木质容器。'),
F('law','MGA||MGA','Additional geographical mentions identify origin; they are not a ranked cru hierarchy.||附加地理名称标示来源，不构成分级 cru 体系。'),
F('vinification','Wood||木质容器','A minimum period in wood is compulsory; a specific new-oak flavour is not.||规定木质容器最低时间，并不要求某种新橡木风味。'),
F('service','Comparison||比较','Barbaresco shares Nebbiolo but has shorter minimum maturation: 26 months including 9 in wood.||Barbaresco 共享 Nebbiolo，但最低熟成为 26 个月、含 9 个月木质容器。','barbaresco')])
AP('barbaresco','Barbaresco DOCG','it-piemonte',['nebbiolo'],'barbaresco',[
F('overview','Identity||身份','Langhe Nebbiolo dry-red PDO distinct from Barolo.||与 Barolo 独立的 Langhe Nebbiolo 干红 PDO。'),
F('history','DOCG||DOCG','DOCG status dates to 1980.||DOCG 始于 1980 年。'),
F('geography','Communes||市镇','Barbaresco, Neive and Treiso form the core.||Barbaresco、Neive、Treiso 构成核心。'),
F('geography','Alba||Alba','San Rocco Seno d’Elvio in Alba is included.||包括 Alba 的 San Rocco Seno d’Elvio。'),
F('grapes','Composition||组成','100% Nebbiolo.||100% Nebbiolo。'),
F('law','Standard||普通款','Minimum 26 months maturation.||最低熟成 26 个月。'),F('law','Wood||木质容器','At least 9 months in wood.||至少 9 个月木质容器。'),
F('law','Riserva||Riserva','Minimum 50 months, including 9 in wood.||最低 50 个月，含 9 个月木质容器。'),
F('vinification','Categories||类别','Standard and Riserva use the same grape; the latter has a longer legal maturation.||普通与 Riserva 使用同一葡萄，后者规定熟成更长。'),
F('service','Interpretation||理解','Shorter legal ageing than Barolo does not by itself prove a universally lighter structure.||法定熟成短于 Barolo 并不单独证明所有酒结构更轻。')])
AP('gattinara','Gattinara DOCG','it-piemonte',['nebbiolo','vespolina','uva-rara'],'gattinara',[
F('overview','Identity||身份','Alto Piemonte Nebbiolo-led dry red.||Alto Piemonte 的 Nebbiolo 主导干红。'),
F('history','DOCG||DOCG','Recognised in 1990.||1990 年认可。'),
F('geography','Boundary||边界','The municipality of Gattinara defines the production area.||生产区由 Gattinara 市镇界定。'),
F('soils','Rock||岩石','Ignimbritic porphyry associated with the ancient Valsesia volcanic system.||与古 Valsesia 火山系统相关的熔结凝灰质斑岩。'),
F('viticulture','Slopes||坡地','Many vineyards occupy steep ridges with hard compact soils weathered near the surface.||许多葡萄园位于陡脊，土壤硬实而表层风化。'),
F('grapes','Nebbiolo||Nebbiolo','90–100% Nebbiolo, locally Spanna.||90–100% Nebbiolo，当地称 Spanna。'),
F('grapes','Vespolina||Vespolina','Maximum 4%.||最多 4%。'),F('grapes','Uva Rara||Uva Rara','Permitted with Vespolina within a combined maximum 10%.||与 Vespolina 合计最多 10%。'),
F('law','Standard||普通款','35 months, including 24 in wood.||35 个月，含 24 个月木质容器。'),
F('law','Riserva||Riserva','47 months, including 36 in wood.||47 个月，含 36 个月木质容器。'),
F('vinification','Blend||混酿','Pure Nebbiolo and permitted local blends both comply with the composition range.||纯 Nebbiolo 及获准地方混酿均可符合组成范围。'),
F('producers','References||参考','Antoniolo, Nervi and Travaglini appear in the consortium producer list.||协会名单包括 Antoniolo、Nervi、Travaglini。'),
F('service','Sensory reference||感官参考','The consortium describes a dry garnet red with violet and spice nuances.||协会描述为干型石榴红色，带紫罗兰与香料细节。')])
S['ghemmehistory']='https://www.enotecaregionaledigattinara.it/denominazioni/ghemme-docg'
AP('ghemme','Ghemme DOCG','it-piemonte',['nebbiolo','vespolina','uva-rara'],'ghemme2026',[
F('overview','Identity||身份','Novara-side Alto Piemonte Nebbiolo PDO.||Novara 一侧的 Alto Piemonte Nebbiolo PDO。'),
F('history','DOC||DOC','DOC recognised in 1969.||1969 年获 DOC。','ghemmehistory'),F('history','DOCG||DOCG','DOCG recognised in 1997.||1997 年获 DOCG。','ghemmehistory'),
F('geography','Communes||市镇','Ghemme and Romagnano Sesia in Novara province.||Novara 省的 Ghemme 与 Romagnano Sesia。'),
F('soils','Landscape||地形','Morainic hills are part of the official geographical account.||官方地理描述包括冰碛丘陵。'),
F('grapes','Nebbiolo||Nebbiolo','Nebbiolo is locally also called Spanna.||Nebbiolo 当地也称 Spanna。'),
F('grapes','Complementary grapes||辅助葡萄','Vespolina and Uva Rara are traditional complementary varieties.||Vespolina 与 Uva Rara 为传统辅助品种。','ghemme'),
F('law','2026 amendment||2026 修订','An approved standard amendment was published at EU level in 2026.||2026 年欧盟公布已批准标准修订。'),
F('law','Vigna||Vigna','Vigna is an additional vineyard mention, not a different grape identity.||Vigna 为附加葡萄园标示，不是另一葡萄。'),
F('vinification','Standard and Riserva||普通与 Riserva','Riserva is distinguished by longer maturation.||Riserva 以较长熟成区分。','ghemme'),
F('producers','Ioppa||Ioppa','Ioppa’s Ghemme reference states 85% Nebbiolo and 15% Vespolina; this describes that producer wine.||Ioppa Ghemme 参考标示 85% Nebbiolo、15% Vespolina，这是该生产者酒款组成。','ghemmewine')])
S['gavihistory']='https://www.produttoridelgavi.com/en/history'
AP('gavi','Gavi DOCG','it-piemonte',['cortese'],'gavi',[
F('overview','Identity||身份','Southeastern Piemonte white PDO made from Cortese.||Piemonte 东南部以 Cortese 酿造的白酒 PDO。'),
F('history','Recognition||认可','DOC recognition in 1974; DOCG in 1998.||1974 年获 DOC，1998 年获 DOCG。','gavihistory'),
F('geography','Province||省份','Eleven communes in Alessandria province.||Alessandria 省十一个市镇。'),
F('geography','Communes I||市镇一','Bosio, Capriata d’Orba, Carrosio, Francavilla Bisio and Gavi.||Bosio、Capriata d’Orba、Carrosio、Francavilla Bisio、Gavi。'),
F('geography','Communes II||市镇二','Novi Ligure, Parodi Ligure, Pasturana, San Cristoforo, Serravalle Scrivia and Tassarolo.||Novi Ligure、Parodi Ligure、Pasturana、San Cristoforo、Serravalle Scrivia、Tassarolo。'),
F('grapes','Composition||组成','100% Cortese.||100% Cortese。'),
F('law','Names||名称','Gavi and Cortese di Gavi are protected naming forms.||Gavi 与 Cortese di Gavi 为受保护名称形式。'),
F('law','Categories||类别','Still, frizzante, spumante and Riserva categories.||静止、微起泡、起泡及 Riserva 类别。'),
F('vinification','Style distinction||风格区分','Cortese supports both still and sparkling wines; the category must be retained in the bottle record.||Cortese 可酿静止与起泡，酒款须保留类别。'),
F('producers','Consortium||协会','Consorzio Tutela del Gavi operates across the eleven-commune denomination.||Consorzio Tutela del Gavi 覆盖十一个市镇产区。','https://www.consorziogavi.com/consorzio/')])
S['roeroage']='https://www.consorziodelroero.it/blog/vino/roero-docg-5-cose-assolutamente-sapere/'
AP('roero','Roero DOCG','it-piemonte',['nebbiolo','arneis'],'roerorules',[
F('overview','Identity||身份','DOCG with Nebbiolo red and Arneis white categories.||含 Nebbiolo 红酒及 Arneis 白酒类别的 DOCG。'),
F('history','Consortium||协会','The current Roero producers’ consortium was formed in 2014.||现 Roero 生产者协会成立于 2014 年。','roeroage'),
F('geography','Tanaro||Tanaro','The Roero reference landscape lies north of the Tanaro relative to the principal Langhe.||相对主要 Langhe，Roero 参考景观位于 Tanaro 以北。','roerogeo'),
F('geography','Communes||市镇','Nineteen communes form the regional framework.||十九个市镇构成地区框架。','roerogeo'),
F('soils','Sand||砂质','Marine-origin sandy terrain is characteristic.||海相来源砂质地形具有代表性。','roeroage'),
F('grapes','Red||红酒','At least 95% Nebbiolo.||至少 95% Nebbiolo。'),F('grapes','White||白酒','At least 95% Arneis.||至少 95% Arneis。'),
F('grapes','Allowance||补充比例','Up to 5% suitable non-aromatic grapes of the corresponding colour.||最多 5% 适宜同色非芳香葡萄。','roero'),
F('law','Red maturation||红酒熟成','20 months including at least 6 in wood.||20 个月，含至少 6 个月木质容器。','roeroage'),
F('law','Red Riserva||红酒 Riserva','32 months including at least 6 in wood.||32 个月，含至少 6 个月木质容器。','roeroage'),
F('vinification','Sparkling||起泡','Roero Arneis Spumante is distinct from still Roero Arneis.||Roero Arneis Spumante 不同于静止 Arneis。','roero'),
F('producers','Cascina Val del Prete||Cascina Val del Prete','The consortium lists this producer and its local wines.||协会列有该生产者及地方酒款。','https://www.consorziodelroero.it/en/producers/cascina-valdelprete/')])
AP('colli-tortonesi','Colli Tortonesi DOC','it-piemonte',['timorasso','cortese','barbera','croatina','uva-rara'],'tortona',[
F('overview','Identity||身份','Multi-style Tortona PDO, not a synonym for Timorasso.||多风格 Tortona PDO，并非 Timorasso 同义词。'),
F('history','Document version||文档版本','The consulted consortium specification was published in September 2025.||所查协会规范于 2025 年 9 月公布。'),
F('geography','Place||地点','Tortona hills in Alessandria province.||Alessandria 省 Tortona 丘陵。'),
F('grapes','Timorasso||Timorasso','The Timorasso category requires at least 95% of the grape.||Timorasso 类别至少 95% 该葡萄。'),
F('grapes','Other whites||其他白葡萄','Cortese belongs to the wider DOC’s white-grape framework.||Cortese 属较广 DOC 白葡萄框架。'),
F('grapes','Reds||红葡萄','Barbera, Croatina and Uva Rara are relevant red identities.||Barbera、Croatina、Uva Rara 为相关红葡萄身份。'),
F('vinification','Categories||类别','White varietal and red categories require separate wine records.||白色单品种与红酒类别须分开建档。'),
F('law','Derthona||Derthona','Derthona is an established territorial wine term; this dossier does not assert unverified 2026 subzone enactment.||Derthona 为已建立地域酒用语，本档案不声称未经核实的 2026 分区生效。'),
F('producers','Consortium||协会','Consorzio Tutela Vini Colli Tortonesi provides the local collective framework.||Consorzio Tutela Vini Colli Tortonesi 提供地方集体框架。','https://collitortonesi.com/il-consorzio/')])
AP('verduno-pelaverga','Verduno Pelaverga DOC','it-piemonte',['pelaverga-piccolo'],'pelavergapdf',[
F('overview','Identity||身份','Small Langhe dry-red PDO based on Pelaverga Piccolo.||以 Pelaverga Piccolo 为基础的小型 Langhe 干红 PDO。'),
F('history','DOC||DOC','Recognised in 1995.||1995 年认可。'),
F('history','Aroma research||香气研究','Research reported in 2021 links peppery expression to rotundone.||2021 年报告研究将胡椒表现关联 rotundone。','pelaverga'),
F('geography','Communes||市镇','Verduno plus specified parts of Roddi and La Morra.||Verduno 加 Roddi 与 La Morra 指定部分。'),
F('grapes','Minimum||最低比例','At least 85% Pelaverga Piccolo.||至少 85% Pelaverga Piccolo。'),
F('grapes','Distinction||区分','Pelaverga Grosso is a separate cultivar.||Pelaverga Grosso 为不同品种。'),
F('law','Other grapes||其他葡萄','The remaining allowance is for permitted local red grapes; blending is not compulsory.||余量为获准地方红葡萄许可，不强制混酿。'),
F('vinification','Vessel||容器','No particular ageing vessel is prescribed by the designation.||该名称未规定特定熟成容器。'),
F('service','Style||风格','A lighter-coloured dry red with a notable peppery reference.||较浅色干红，胡椒感为重要参考。','pelaverga'),
F('producers','Association||协会','The local producers’ association provides a collective technical press dossier.||地方生产者协会提供集体技术资料。')])
save()
AP('valle-daosta-doc','Valle d’Aosta DOC','it-valle-daosta',['prie-blanc','petit-rouge','fumin','mayolet','vuillermin','vien-de-nus','prie-rouge','nebbiolo','pinot-gris','muscat-blanc-a-petits-grains'],'aosta',[
F('overview','Identity||身份','Regional DOC with geographical and varietal wine categories, separate from the administrative region.||含地理及品种酒类别的大区 DOC，与行政大区分开。'),
F('history','Recognition||认可','Established in 1985.||1985 年建立。'),
F('geography','Upper valley||上谷地','Blanc de Morgex et de La Salle is the upper-valley white reference.||Blanc de Morgex et de La Salle 为上谷地白酒参考。'),
F('geography','Central valley||中谷地','Enfer d’Arvier, Torrette, Nus and Chambave provide distinct geographical references.||Enfer d’Arvier、Torrette、Nus、Chambave 为不同地理参考。'),
F('geography','Lower valley||下谷地','Arnad-Montjovet and Donnas complete the seven geographical identities.||Arnad-Montjovet 与 Donnas 构成七地理身份的其余部分。'),
F('grapes','Morgex||Morgex','Prié Blanc defines Blanc de Morgex et de La Salle.||Prié Blanc 定义 Blanc de Morgex et de La Salle。'),
F('grapes','Torrette||Torrette','Petit Rouge is a key Torrette component.||Petit Rouge 为 Torrette 重要组成。',GR+'petit-rouge/'),
F('grapes','Nus||Nus','Vien de Nus and Petit Rouge contribute to Nus Rouge.||Vien de Nus 与 Petit Rouge 组成 Nus Rouge。','https://www.lovevda.it/en/food-and-wine/wines/nus-rouge-doc'),
F('law','Malvoisie||Malvoisie','Nus Malvoisie refers to Pinot Gris, not a Malvasia grape.||Nus Malvoisie 指 Pinot Gris，非 Malvasia 葡萄。'),
F('vinification','Styles||风格','Still, sparkling and specialty sweet wines require separate category identities.||静止、起泡及特色甜酒须分开类别身份。'),
F('producers','Vuillermin||Vuillermin','La Vrille supplies a 100% Vuillermin reference.||La Vrille 提供 100% Vuillermin 参考。','https://www.lavrille.it/vuillermin/'),
F('service','Prëmetta||Prëmetta','Pale Prëmetta wines can retain substantial tannin.||浅色 Prëmetta 酒可保留明显单宁。',GR+'premetta/')],['Vallée d’Aoste DOC'])
AP('cinque-terre','Cinque Terre DOC','it-liguria',['bosco','vermentino','albarola'],'cinque',[
F('overview','Identity||身份','Eastern Ligurian coastal PDO for dry white and sweet dried-grape Sciacchetrà.||Liguria 东部海岸干白及风干甜酒 Sciacchetrà PDO。'),
F('history','Recognition||认可','DOC recognised in 1973.||1973 年获 DOC。'),
F('geography','Core communes||核心市镇','Riomaggiore, Vernazza and Monterosso.||Riomaggiore、Vernazza、Monterosso。'),
F('geography','Additional areas||其他地区','Specified Tramonti di Biassa and Campiglia vineyard areas are included.||包括指定 Tramonti di Biassa 与 Campiglia 葡萄园地区。'),
F('viticulture','Terraces||梯田','Steep coastal terraces create demanding access and labour conditions.||陡峭海岸梯田使交通及劳动条件严苛。'),
F('grapes','Bosco||Bosco','At least 40%.||至少 40%。'),
F('grapes','Vermentino/Albarola||Vermentino／Albarola','Together at most 40%.||合计最多 40%。'),
F('grapes','Other whites||其他白葡萄','Other permitted whites at most 20%.||其他获准白葡萄最多 20%。'),
F('law','Subzones||分区','Costa de Sera, Costa de Campu and Costa de Posa.||Costa de Sera、Costa de Campu、Costa de Posa。'),
F('vinification','Dry white||干白','Fresh-fruit white vinification is distinct from the dried-grape sweet category.||鲜果白酒酿造区别于风干甜型。'),
F('vinification','Sciacchetrà||Sciacchetrà','Selected fruit dries before fermentation into the concentrated sweet style.||精选果实先风干，再酿浓缩甜型。'),
F('service','Sweetness||甜度','Dry Cinque Terre and sweet Sciacchetrà need different food and serving contexts.||干型 Cinque Terre 与甜型 Sciacchetrà 的配餐及侍酒场景不同。')],['Cinque Terre','Cinque Terre Sciacchetrà'])
AP('riviera-ligure-di-ponente','Riviera Ligure di Ponente DOC','it-liguria',['vermentino','tibouren','garnacha-tinta','muscat-blanc-a-petits-grains'],'riviera',[
F('overview','Identity||身份','Western Ligurian multi-category PDO rather than one fixed blend.||Liguria 西部多类别 PDO，并非一种固定混酿。'),
F('history','DOC||DOC','Recognised in 1988.||1988 年认可。'),
F('geography','Provinces||省份','Specified parts of Imperia, Savona and Genova.||Imperia、Savona、Genova 指定部分。'),
F('geography','Subzones||分区','Riviera dei Fiori, Finalese and Albenganese apply to specified categories.||Riviera dei Fiori、Finalese、Albenganese 适用于指定类别。'),
F('grapes','Pigato||Pigato','Minimum 95%.||最低 95%。'),F('grapes','Vermentino||Vermentino','Minimum 95%.||最低 95%。'),
F('grapes','Rossese||Rossese','Minimum 90%.||最低 90%。'),F('grapes','Granaccia||Granaccia','Minimum 90%.||最低 90%。'),
F('grapes','Moscato||Moscato','100% for the Moscato category.||Moscato 类别 100%。'),
F('law','Distinct Rossese PDO||不同 Rossese PDO','Riviera Rossese is separate from Rossese di Dolceacqua.||Riviera Rossese 与 Rossese di Dolceacqua 分开。'),
F('vinification','Colour categories||颜色类别','Both red and white categories exist; the exact grape-labelled wine determines the reference.||含红白类别，须依据具体品种标示酒判断。'),
F('service','Pigato comparison||Pigato 比较','Pigato and Vermentino can be compared as local wine expressions without automatically counting different genetic cultivars.||可比较 Pigato 与 Vermentino 地方酒表达，不自动计为不同遗传品种。','genetics')])
AP('dolceacqua','Rossese di Dolceacqua DOC','it-liguria',['tibouren'],'dolceacqua',[
F('overview','Identity||身份','Western Ligurian dry red based on Rossese.||Liguria 西部 Rossese 主导干红。'),
F('history','DOC||DOC','Recognised in 1972.||1972 年认可。'),
F('geography','Position||位置','Inland western Liguria near the French border.||法国边界附近的 Liguria 西部内陆。'),
F('grapes','Main grape||主要葡萄','At least 95% Rossese.||至少 95% Rossese。'),
F('grapes','Other reds||其他红葡萄','At most 5% other permitted red grapes.||其他获准红葡萄最多 5%。'),
F('law','Superiore alcohol||Superiore 酒精','Minimum 13% for Superiore.||Superiore 最低 13%。'),
F('law','Superiore release||Superiore 上市','Not before 1 November of the year after harvest.||不得早于采收翌年 11 月 1 日。'),
F('vinification','Category||类别','Dry still red; Superiore combines higher alcohol and later release requirements.||干型静止红，Superiore 有较高酒精及延后上市要求。'),
F('service','Identity||身份','Rossese red links to Tibouren; Rossese Bianco is not automatically a colour form of the same grape.||Rossese 红葡萄关联 Tibouren，Rossese Bianco 不能自动视为同一葡萄颜色类型。','genetics')],['Dolceacqua','Rossese di Dolceacqua'])
AP('colli-di-luni','Colli di Luni DOC','it-liguria',['vermentino','albarola','sangiovese','trebbiano-toscano'],'luni',[
F('overview','Identity||身份','Cross-border Liguria–Toscana white-and-red PDO.||跨 Liguria 与 Toscana 的红白酒 PDO。'),
F('history','DOC||DOC','Recognised in 1989.||1989 年认可。'),
F('geography','Liguria||Liguria','La Spezia province.||La Spezia 省。'),F('geography','Toscana||Toscana','Specified Massa-Carrara territory.||指定 Massa-Carrara 地区。'),
F('grapes','Vermentino||Vermentino','Varietal category requires at least 90%.||单品种类别至少 90%。'),
F('grapes','Albarola||Albarola','Varietal category requires at least 85%.||单品种类别至少 85%。'),
F('grapes','Rosso||Rosso','Sangiovese at least 50%.||Sangiovese 至少 50%。'),
F('grapes','Bianco||Bianco','Vermentino at least 35%; Trebbiano Toscano 25–40%.||Vermentino 至少 35%，Trebbiano Toscano 25–40%。'),
F('law','Categories||类别','Generic Bianco and varietal Vermentino have different composition rules.||普通 Bianco 与品种 Vermentino 组成规则不同。'),
F('vinification','Wine families||酒款类别','Blended white, varietal white and red require separate records.||混酿白、单品种白及红酒须分别记录。'),
F('service','Comparison||比较','Identify the category before comparison: Sangiovese Rosso and Vermentino are different grape and colour references.||比较前先确认类别，Sangiovese Rosso 与 Vermentino 的葡萄及颜色参考不同。')])
AP('franciacorta','Franciacorta DOCG','it-lombardia',['chardonnay','pinot-noir','pinot-blanc','erbamat'],'franciacorta',[
F('overview','Identity||身份','Traditional-method sparkling PDO south of Lake Iseo.||Iseo 湖以南传统法起泡 PDO。','franmethod'),
F('history','Erbamat recovery||Erbamat 恢复','Historical Brescian Erbamat entered regulated use after recovery and research.||历史 Brescia Erbamat 经恢复研究后进入受规使用。','frangrape'),
F('geography','Lake and hills||湖泊丘陵','Lake Iseo lies north; Monte Orfano is a distinct southern feature.||北侧为 Iseo 湖，Monte Orfano 为南部独特地貌。','frangeo'),
F('soils','Moraines||冰碛','The principal landscape is glacial and morainic.||主要景观属冰川及冰碛形成。','frangeo'),
F('soils','Monte Orfano||Monte Orfano','Its substrate differs from the principal morainic amphitheatre.||其基底不同于主要冰碛环状地形。','frangeo'),
F('grapes','Main grapes||主要葡萄','Chardonnay and Pinot Noir.||Chardonnay 与 Pinot Noir。','franmethod'),
F('grapes','Pinot Blanc||Pinot Blanc','Maximum 50%, subject to category rules.||最高 50%，另受类别规则限制。','franmethod'),
F('grapes','Erbamat||Erbamat','Maximum 10% in eligible categories; excluded from Satèn.||适用类别最高 10%，Satèn 排除。','frangrape'),
F('viticulture','Harvest||采收','Hand harvesting; maximum grape yield 10 tonnes/ha in the consortium account.||手工采收，协会说明葡萄最高产量每公顷 10 吨。','franmethod'),
F('vinification','Pressing||压榨','Gentle pressing supplies base wines for cuvée assembly and bottle fermentation.||轻柔压榨获得基酒，用于调配及瓶中二次发酵。','franmethod'),
F('law','Basic lees ageing||基础酒泥陈酿','At least 18 months.||至少 18 个月。','franmethod'),
F('law','Vintage||年份款','At least 30 months.||至少 30 个月。','franmethod'),
F('law','Riserva||Riserva','At least 60 months.||至少 60 个月。','franmethod'),
F('law','Rosé||Rosé','The consulted current consortium rules require at least 35% Pinot Noir.||所查协会现行规范要求至少 35% Pinot Noir。'),
F('service','Assessment||评估','Lees ageing, dosage and grape composition are separate sensory variables.||酒泥熟成、补糖及葡萄组成是不同感官变量。')])
AP('lugana','Lugana DOC','it-lombardia',['verdicchio'],'lugana',[
F('overview','Identity||身份','Southern Lake Garda white PDO shared by Lombardia and Veneto.||Garda 湖南部跨 Lombardia 与 Veneto 的白酒 PDO。'),
F('history','DOC||DOC','Recognised in 1967.||1967 年认可。'),
F('geography','Communes||市镇','Sirmione, Desenzano, Lonato, Pozzolengo and Peschiera del Garda.||Sirmione、Desenzano、Lonato、Pozzolengo、Peschiera del Garda。'),
F('geography','Boundary||边界','All Sirmione; specified parts of the other four communes.||Sirmione 全境，其他四市镇指定部分。'),
F('soils','Clay||黏土','Clay-rich land south of the lake is a key terroir reference.||湖南部富黏土土地为重要风土参考。','luganageo'),
F('grapes','Turbiana||Turbiana','At least 90% Turbiana.||至少 90% Turbiana。'),
F('grapes','Other whites||其他白葡萄','At most 10% permitted non-aromatic whites.||获准非芳香白葡萄最多 10%。'),
F('law','Categories||类别','Basic, Superiore, Riserva, Vendemmia Tardiva and Spumante.||基础款、Superiore、Riserva、Vendemmia Tardiva、Spumante。'),
F('law','Basic release||基础款上市','Not before 15 January after harvest.||不得早于采收翌年 1 月 15 日。'),
F('law','Superiore||Superiore','Minimum 12 months maturation.||最低熟成 12 个月。'),
F('law','Riserva||Riserva','Minimum 24 months, including 6 in bottle.||最低 24 个月，含 6 个月瓶陈。'),
F('vinification','Styles||风格','Still, late-harvest and sparkling categories are distinct.||静止、晚采及起泡类别不同。'),
F('service','Identity||身份','Retain Turbiana as the local legal/cultural name while linking the canonical grape record.||保留 Turbiana 地方法律文化名，同时关联标准葡萄档案。')])
save()
S['valdenom']='https://www.vinidivaltellina.it/en/vini/denominazioni/'
S['sforzato']='https://vinidivaltellina.it/en/vini/sforzato-di-valtellina-docg/'
S['sforspec']='https://www.vinidivaltellina.it/site/assets/files/1256/sforzato_di_valtellina_o_sfursat_di_valtellina.pdf'
AP('valtellina','Valtellina','it-lombardia',['nebbiolo','pignola-valtellinese','rossola-nera','nebbiolo-rose'],'valdenom',[
F('overview','Scope||范围','Alpine wine district containing independent protected red-wine denominations.||含独立受保护红酒名称的阿尔卑斯葡萄酒地区。'),
F('history','Local name||地方名','Chiavennasca is the local Nebbiolo name.||Chiavennasca 为 Nebbiolo 地方名。','valtellina'),
F('geography','Province||省份','Sondrio province in Alpine Lombardia.||阿尔卑斯 Lombardia 的 Sondrio 省。','valtellina'),
F('geography','Slope||坡向','Key vineyards occupy the Rhaetian side of the valley.||重要葡萄园位于谷地 Rhaetian 一侧。'),
F('viticulture','Terraces||梯田','Steep terraces make vineyard work labour-intensive.||陡峭梯田使葡萄园劳动密集。','fojanini'),
F('grapes','Main grape||主要葡萄','Nebbiolo defines the major dry reds.||Nebbiolo 定义主要干红。'),
F('grapes','Minor grapes||少量葡萄','Pignola Valtellinese, Rossola Nera and Nebbiolo Rosé are distinct local identities.||Pignola Valtellinese、Rossola Nera、Nebbiolo Rosé 为不同地方身份。','genetics'),
F('law','Superiore subzones||Superiore 分区','Maroggia, Sassella, Grumello, Inferno and Valgella.||Maroggia、Sassella、Grumello、Inferno、Valgella。'),
F('law','Independent PDOs||独立 PDO','Valtellina Superiore and Sforzato di Valtellina are separate denominations.||Valtellina Superiore 与 Sforzato di Valtellina 为独立名称。'),
F('vinification','Fruit treatment||果实处理','Sforzato uses dried fruit; Superiore is the fresh-fruit reference.||Sforzato 使用风干果实，Superiore 为鲜果参考。'),
F('producers','Research||研究','Fondazione Fojanini and University of Milan work documents local viticulture and clonal material.||Fondazione Fojanini 与米兰大学研究记录地方栽培及克隆材料。','fojanini')],kind='subregion')
AP('valtellina-superiore','Valtellina Superiore DOCG','it-valtellina',['nebbiolo'],'valdenom',[
F('overview','Identity||身份','Nebbiolo-led Alpine dry-red PDO with five named subzones.||Nebbiolo 主导、有五个具名分区的阿尔卑斯干红 PDO。'),
F('history','Local terminology||地方用语','Chiavennasca names Nebbiolo locally.||当地以 Chiavennasca 称 Nebbiolo。','valtellina'),
F('geography','District||地区','Rhaetian-side vineyard district in Sondrio province.||Sondrio 省 Rhaetian 一侧葡萄园地区。'),
F('viticulture','Terraces||梯田','Steep hillside terraces are a central vineyard feature.||陡坡梯田为重要葡萄园特点。','fojanini'),
F('viticulture','Yield||产量','Maximum 8 tonnes of grapes per hectare.||葡萄最高每公顷 8 吨。'),
F('grapes','Nebbiolo||Nebbiolo','At least 90% Nebbiolo.||至少 90% Nebbiolo。','valtellina'),
F('law','Subzones||分区','Maroggia, Sassella, Grumello, Inferno and Valgella.||Maroggia、Sassella、Grumello、Inferno、Valgella。'),
F('law','Maturation||熟成','Minimum 24 months, including at least one year in wood.||最低 24 个月，含至少一年木质容器。'),
F('law','Riserva||Riserva','Minimum 36 months maturation.||最低熟成 36 个月。'),
F('vinification','Fruit||果实','Fresh-grape dry red, distinct from Sforzato’s dried-grape method.||鲜果干红，不同于 Sforzato 风干法。'),
F('service','Comparison||比较','Named subzone and maturation category are separate dimensions of the wine.||具名分区与熟成类别为不同酒款维度。')])
AP('sforzato-di-valtellina','Sforzato di Valtellina DOCG','it-valtellina',['nebbiolo'],'sforspec',[
F('overview','Identity||身份','Dry red made from dried Nebbiolo grapes.||风干 Nebbiolo 酿成的干红。','sforzato'),
F('history','Name||名称','Sfursat is the local form of Sforzato.||Sfursat 为 Sforzato 地方形式。'),
F('geography','Area||区域','Valtellina in Sondrio province.||Sondrio 省 Valtellina。'),
F('viticulture','Selection||筛选','Healthy grapes are selected for drying.||精选健康葡萄用于风干。'),
F('viticulture','Yield||产量','Maximum fresh-grape yield 8 tonnes/ha.||鲜果最高每公顷 8 吨。'),
F('grapes','Nebbiolo||Nebbiolo','Minimum 90%; other permitted non-aromatic red grapes at most 10%.||最低 90%，其他获准非芳香红葡萄最多 10%。'),
F('vinification','Drying||风干','Drying concentrates the fruit before fermentation.||发酵前风干浓缩果实。'),
F('law','Pressing date||压榨日期','Ordinarily not before 1 December; an officially authorised earlier start can apply under specified conditions.||通常不得早于 12 月 1 日，特定条件下可官方批准提前。'),
F('law','Maturation||熟成','Minimum 20 months, including 12 in wood.||最低 20 个月，含 12 个月木质容器。'),
F('law','Wine yield||酒液产量','Finished-wine yield is capped at 40 hl/ha.||成酒最高每公顷 40 百升。'),
F('producers','Rainoldi||Rainoldi','Rainoldi’s producer reference matures in 25- and 56-hl oak casks for 20 months.||Rainoldi 参考酒以 25 及 56 百升橡木桶熟成 20 个月。','https://rainoldi.com/en/wines/sforzato-of-valtellina/'),
F('service','Dryness||干型','Dried fruit does not mean a sweet finished wine; the consortium identifies this as dry red.||风干果实不等于甜型成酒，协会明确为干红。','sforzato')],['Sforzato di Valtellina','Sfursat di Valtellina'])
AP('oltrepo-pavese','Oltrepò Pavese DOC','it-lombardia',['croatina','barbera','uva-rara','vespolina','pinot-noir','riesling','welschriesling','pinot-gris','chardonnay'],'oltrepo',[
F('overview','Scope||范围','Broad DOC within a district that also contains several independent DOC and DOCG names.||较广 DOC 所在地区同时含多个独立 DOC 与 DOCG。'),
F('history','Local naming||地方用名','Local Bonarda wine is associated with Croatina, not automatically Bonarda Piemontese.||地方 Bonarda 酒关联 Croatina，不自动对应 Bonarda Piemontese。'),
F('geography','Position||位置','Pavia province south of the Po.||Po 河以南 Pavia 省。'),
F('geography','Valleys||谷地','Versa, Scuropasso, Coppa and Staffora.||Versa、Scuropasso、Coppa、Staffora。'),
F('grapes','Local reds||地方红葡萄','Croatina, Barbera, Uva Rara and Vespolina have traditional roles.||Croatina、Barbera、Uva Rara、Vespolina 有传统角色。'),
F('grapes','Pinot Noir||Pinot Noir','Pinot Noir supports both red and sparkling-base wines.||Pinot Noir 支持红酒及起泡基酒。','oltrepowine'),
F('law','Separate names||独立名称','Bonarda, Buttafuoco and Sangue di Giuda are separate protected identities.||Bonarda、Buttafuoco、Sangue di Giuda 为独立受保护身份。'),
F('law','Metodo Classico||Metodo Classico','Oltrepò Pavese Metodo Classico DOCG is independent from Oltrepò Pavese DOC.||Oltrepò Pavese Metodo Classico DOCG 与 DOC 独立。'),
F('vinification','Range||范围','Still, lightly sparkling and sparkling wines occur across the district’s distinct categories.||地区不同类别含静止、微起泡及起泡酒。','oltrepowine'),
F('producers','Consortium||协会','The consortium represents seven denomination identities.||协会代表七个名称身份。'),
F('service','Comparison||比较','Identify sweetness and sparkle before comparing local red wines and Pinot Noir traditional-method wines.||比较地方红与 Pinot Noir 传统法酒前，先确认甜度与起泡状态。')],['Oltrepò Pavese','Oltrepo Pavese'])
AP('moscato-di-scanzo','Moscato di Scanzo DOCG','it-lombardia',['moscato-di-scanzo'],'scanzo',[
F('overview','Identity||身份','Concentrated sweet red dried-grape PDO.||浓缩风干甜红 PDO。'),
F('history','DOCG||DOCG','DOCG recognition in 2009.||2009 年获 DOCG。','scanzohistory'),
F('geography','Commune||市镇','Scanzorosciate in the Bergamo hills.||Bergamo 丘陵的 Scanzorosciate。'),
F('viticulture','Slopes||坡地','Steep well-exposed hillsides and healthy fruit selection are central.||陡峭向阳丘陵及健康果实筛选重要。','scanzomethod'),
F('grapes','Composition||组成','100% Moscato di Scanzo, a red aromatic grape.||100% 红色芳香葡萄 Moscato di Scanzo。'),
F('vinification','Drying||风干','Selected grapes dry before fermentation.||精选葡萄先风干再发酵。','scanzomethod'),
F('law','Name||名称','The grape and DOCG share a name but are different entity types.||葡萄与 DOCG 同名但实体类型不同。'),
F('producers','Consortium||协会','Consorzio Moscato di Scanzo represents the local production identity.||Consorzio Moscato di Scanzo 代表地方生产身份。'),
F('service','Style||风格','Sweetness and concentration distinguish this from fresh Moscato sparkling wine.||甜度与浓度使其不同于清新 Moscato 起泡酒。')])
S['valtenesilaw']='https://www.consorziovaltenesi.it/wp-content/uploads/2024/02/Disciplinare-DOC-Riviera-del-Garda-Classico-e-sottozona-Valtenesi-Provvedimento.pdf'
AP('valtenesi','Riviera del Garda Classico DOC · Valtènesi','it-lombardia',['groppello-gentile','groppello-di-mocasina','barbera','sangiovese'],'valtenesi',[
F('overview','Scope||范围','Valtènesi is a specified subzone within Riviera del Garda Classico DOC.||Valtènesi 为 Riviera del Garda Classico DOC 内指定分区。','valtenesilaw'),
F('history','Naming||名称','Historical standalone Valtènesi labels must be distinguished from the current DOC framework.||历史独立 Valtènesi 酒标须与现行 DOC 框架区分。','valtenesilaw'),
F('geography','Lake||湖泊','Western Lake Garda on the Brescian side.||Garda 湖西岸、Brescia 一侧。'),
F('grapes','Groppello||Groppello','Groppello is the emblematic local grape group.||Groppello 为标志性地方葡萄群。','groppello'),
F('grapes','Separate cultivars||不同品种','Gentile and Mocasina are distinct records.||Gentile 与 Mocasina 为独立记录。','vcr'),
F('viticulture','Bunches||果穗','Compact knot-like bunches explain the Groppello name.||紧密如结的果穗解释 Groppello 名称。','groppello'),
F('vinification','Rosé||桃红','Careful extraction underlies the regional rosé expression.||谨慎萃取构成地区桃红表达基础。'),
F('law','Entity||实体','Subzone and parent DOC remain linked but distinct.||分区与父级 DOC 关联但保持区分。','valtenesilaw'),
F('producers','Consortium||协会','Consorzio Valtènesi supplies the local wine reference.||Consorzio Valtènesi 提供地方酒参考。'),
F('service','Blending||混酿','A collective Groppello blend description does not define pure Mocasina’s sensory profile.||集体 Groppello 混酿描述不定义纯 Mocasina 感官风格。')],['Valtènesi','Valtenesi'])
AP('carema','Carema DOC','it-piemonte',['nebbiolo'],'carema',[
F('overview','Identity||身份','Mountain-foot Nebbiolo PDO at the Aosta Valley border.||Aosta Valley 边界山前 Nebbiolo PDO。'),
F('history','DOC||DOC','DOC since 1967.||1967 年起为 DOC。'),
F('history','Local forms||地方类型','Picutener and Pugnet are local Nebbiolo forms, not automatically separate cultivars.||Picutener 与 Pugnet 为 Nebbiolo 地方类型，不自动分成独立品种。'),
F('geography','Slope||坡地','Monte Maletto slopes at approximately 350–700 metres.||Monte Maletto 坡地，约 350–700 米。'),
F('soils','Terrain||地形','Morainic rocks and dry-stone terraces.||冰碛岩石与干砌石梯田。'),
F('viticulture','Pergolas||棚架','Pergolas stand on tapered stone pillars.||棚架由渐细石柱支撑。'),
F('climate','Stored heat||蓄热','Stone structures absorb daytime heat and release it at night.||石结构白天吸热、夜间释放。'),
F('grapes','Nebbiolo||Nebbiolo','Nebbiolo is the defining grape.||Nebbiolo 为核心葡萄。'),
F('law','Standard||普通款','24 months, including 12 in oak or chestnut.||24 个月，含 12 个月橡木或栗木。'),
F('law','Riserva||Riserva','36 months, including 12 in wood.||36 个月，含 12 个月木质容器。'),
F('vinification','Vessel size||容器容量','Required oak/chestnut vessels have a maximum capacity of 40 hl in the consortium account.||协会说明规定橡木／栗木容器最高 40 百升。'),
F('law','Cellar zone||酒窖区域','Vinification and ageing zone includes Carema and Ivery in Pont-Saint-Martin as specified.||指定酿造熟成区包括 Carema 与 Pont-Saint-Martin 的 Ivery。'),
F('producers','Cooperative||合作社','Cantina dei Produttori Nebbiolo di Carema lists a 100% Nebbiolo oak-aged wine.||Cantina dei Produttori Nebbiolo di Carema 列有 100% Nebbiolo 橡木熟成酒。','https://www.erbalucecarema.it/cantine/cantina-dei-produttori-nebbiolo-di-carema/')])
AP('erbaluce-di-caluso','Erbaluce di Caluso DOCG','it-piemonte',['erbaluce'],'caluso',[
F('overview','Identity||身份','Erbaluce-based Canavese PDO covering dry, sparkling and passito styles.||Canavese 的 Erbaluce PDO，含干型、起泡及 passito。'),
F('history','Local white||地方白葡萄','Erbaluce is the characteristic white of Canavese.||Erbaluce 为 Canavese 特征白葡萄。','https://www.cittametropolitana.torino.it/node/3046'),
F('geography','District||地区','Canavese in the Torino area.||Torino 一带 Canavese。'),
F('geography','Boundary||边界','The white-wine boundary is narrower than Canavese DOC.||白酒边界窄于 Canavese DOC。','canavese'),
F('grapes','Identity||身份','Erbaluce is distinct from Erbamat.||Erbaluce 不同于 Erbamat。'),
F('viticulture','Passito selection||Passito 筛选','Healthy selected bunches are retained for drying.||精选健康果穗用于风干。'),
F('vinification','Still||静止','Dry still white is one expression.||一类表达为干型静止白。'),
F('vinification','Sparkling||起泡','Spumante uses the traditional method exclusively.||Spumante 仅使用传统法。'),
F('vinification','Drying||风干','Ventilated rooms, racks or hanging bunches are used for passito drying.||Passito 在通风室内以架子或悬挂果穗风干。'),
F('law','Passito release||Passito 上市','At least three years from 1 November after harvest.||自采收后 11 月 1 日起至少三年。'),
F('law','Passito Riserva||Passito Riserva','At least four years.||至少四年。'),
F('service','Still wine||静止酒','Fresh dry white with floral and lightly almond-like references.||清新干白，参考花香与轻微杏仁感。'),
F('service','Passito||Passito','Sweet concentrated dried-fruit style differs from the dry and sparkling categories.||甜型浓缩风干果实风格不同于干白及起泡。')],['Erbaluce di Caluso','Caluso'])
AP('canavese','Canavese DOC','it-piemonte',['nebbiolo','barbera','bonarda-piemontese','freisa','neretto-di-bairo','erbaluce'],'canavese',[
F('overview','Scope||范围','Broad northern Piemonte DOC with red, rosé, white and sparkling categories.||Piemonte 北部较广 DOC，含红、桃红、白及起泡类别。'),
F('history','Mixed vineyards||混种园','Traditional mixed vineyards are reflected in the DOC red blends.||传统混种园反映于 DOC 红酒混酿。'),
F('geography','Provinces||省份','Specified communes in Torino, Biella and Vercelli.||Torino、Biella、Vercelli 指定市镇。'),
F('grapes','Rosso core||Rosso 核心','Nebbiolo, Barbera, Bonarda, Freisa and Neretto separately or together at least 60%.||Nebbiolo、Barbera、Bonarda、Freisa、Neretto 单独或合计至少 60%。'),
F('grapes','Other reds||其他红葡萄','Up to 40% other permitted non-aromatic red grapes.||其他获准非芳香红葡萄最多 40%。'),
F('law','Barbera||Barbera','At least 85% in the named category.||具名类别至少 85%。'),
F('law','Nebbiolo||Nebbiolo','At least 85% in the named category.||具名类别至少 85%。'),
F('vinification','Rosato||Rosato','Gentle pressing and brief maceration of the red-grape base.||红葡萄基础轻柔压榨及短浸皮。'),
F('vinification','Novello||Novello','Youthful fruit-led category from the same broad red-grape framework.||同一较广红葡萄框架中的年轻果味类别。'),
F('vinification','Sparkling||起泡','The consortium describes tank-method white and rosé sparkling wines.||协会描述罐式法白色及桃红起泡。'),
F('law','Bianco boundary||Bianco 边界','Broader than the Caluso white-wine area.||范围广于 Caluso 白酒区。'),
F('producers','Consortium||协会','The Caluso–Carema–Canavese consortium represents three distinct local denominations.||Caluso–Carema–Canavese 协会代表三个独立地方名称。'),
F('service','Category||类别','Rosso, Rosato, Novello and sparkling styles require separate tasting contexts.||Rosso、Rosato、Novello 及起泡须分开品鉴背景。')])
save()
def extend(rid,sec,label,text,refs,editorial=False):
 r=next(x for x in D['regions'] if x['id']==rid);ss=next((s for s in r['sections'] if s['id']==sec),None)
 if ss is None:ss={'id':sec,'title':b(T[sec]),'rows':[],'refs':[]};r['sections'].append(ss)
 ss['rows'].append({'label':b(label),'body':b(text)})
 if editorial:ss['editorial']=True
 for k in refs.split('|'):
  z=sid(k)
  if z not in ss['refs']:ss['refs'].append(z)
  if not any(s['id']==z for s in r['sources']):r['sources'].append({'id':z,'title':source(k)['title'],'url':url(k)})
S.update({'langheclimate':'https://www.langhevini.it/en/clima/','langheplace':'https://www.langhevini.it/en/langhe/','roeroclimate':'https://www.consorziodelroero.it/en/geology-and-climate/','roerohistory':'https://www.consorziodelroero.it/en/origins-and-history/','unesco':'https://www.consorziodelroero.it/il-territorio/','piedmontmap':'https://www.piemonteland.it/','aostaclimate':'https://cf.regione.vda.it/en/climate-influencing-factors-in-aosta-valley','aostaroute':'https://vdastradadeivignetialpini.it/en/homepage-english/','ligurialand':'https://www.enit.it/it/enoturismo-in-liguria','lombclimate':'https://www.arpalombardia.it/temi-ambientali/meteo-e-clima/clima/il-clima-in-lombardia/'})
for sec,l,t,k in [
('history','Early wine culture||早期葡萄酒文化','The Roero consortium traces local wine culture to pre-Roman Ligurian settlement; this is a regional historical account rather than a dated origin for individual grapes.||Roero 协会将地方葡萄酒文化追溯至罗马前 Ligurian 聚落；这是地区历史说明，不是单个品种起源日期。','roerohistory'),
('history','Protected landscapes||受保护景观','Langhe-Roero and Monferrato wine landscapes entered the UNESCO World Heritage list in June 2014.||Langhe-Roero 与 Monferrato 葡萄酒景观于 2014 年 6 月列入 UNESCO 世界遗产。','unesco'),
('history','Modern appellations||现代产区','Barolo moved from DOC recognition in 1966 to DOCG in 1980; this modern legal history is separate from much older viticulture.||Barolo 于 1966 年获 DOC、1980 年获 DOCG，现代法律历史须与更古老栽培史分开。','barolo'),
('geography','Southern mountains||南部山系','The Langhe lie in southern Piemonte at the foot of the Maritime Alps and Ligurian Apennines.||Langhe 位于 Piemonte 南部、Maritime Alps 与 Ligurian Apennines 山麓。','langheplace'),
('geography','Alba and Tanaro||Alba 与 Tanaro','Lower Langhe hills extend south from Alba on the Tanaro’s right bank towards the Ligurian mountains.||Lower Langhe 丘陵由 Alba 沿 Tanaro 右岸向南延至 Ligurian 山地。','https://paesaggiopiemonte.regione.piemonte.it/cms/articoli/vedi-tutte/12-cose-belle/193-basse-langhe-a-spasso-per-castelli-tra-i-vigneti.html'),
('geography','Monferrato||Monferrato','The historical Monferrato landscape lies largely in Alessandria and partly Asti, framed by the Po to the north and Tanaro, Belbo and Bormida to the south.||历史 Monferrato 景观主要在 Alessandria、部分在 Asti，北侧 Po，南侧 Tanaro、Belbo、Bormida。','piedmontmap'),
('geography','Northern foothills||北部山前','Alto Piemonte’s Gattinara is tied to the Sesia area; Carema lies farther west at the Aosta Valley boundary.||Alto Piemonte 的 Gattinara 关联 Sesia 一带；Carema 更靠西，位于 Aosta Valley 边界。','gattinara|carema'),
('climate','Langhe||Langhe','Cold-temperate subcontinental conditions are modified by Alpine shelter and mild humid air from the Ligurian Sea.||偏凉温带亚大陆性条件受阿尔卑斯屏障及 Ligurian 海温和湿润气流调节。','langheclimate'),
('climate','Barolo airflow||Barolo 气流','The Barolo zone is relatively sheltered from wind while receiving Alpine currents and warm humid air rising from the Tanaro valley.||Barolo 相对避风，同时受阿尔卑斯气流及 Tanaro 谷地上升暖湿气流影响。','langheclimate'),
('climate','Roero water||Roero 水分','Roero is relatively dry; its permeable sandy ground and limited temporary reserves make winter water recharge important.||Roero 相对干燥，砂地高渗透性及有限短期储水使冬季补水重要。','roeroclimate'),
('soils','Marine sediments||海相沉积','Langhe and Roero contain marine sedimentary formations, but their sandstone, marl and clay proportions differ by site.||Langhe 与 Roero 含海相沉积地层，砂岩、泥灰岩及黏土比例随地块变化。','langheclimate|roeroclimate'),
('viticulture','Exposure and hazards||坡向与灾害','Roero’s thermal contrasts and storm/hail risk make slope exposure important; a single regional temperature label cannot describe every vineyard.||Roero 温差及风暴冰雹风险使坡向重要，单一地区气温标签不能描述所有葡萄园。','roeroclimate'),
('viticulture','Mountain labour||山地劳动','Carema’s dry-stone terraces and stone-supported pergolas are a distinct mountain viticulture system, unlike mechanisable lowland rows.||Carema 干砌梯田及石柱棚架构成独特山地栽培体系，不同于可机械化平地行植。','carema'),
('producers','Northern references||北部参考','Antoniolo, Nervi and Travaglini are consortium-listed Gattinara producers.||Antoniolo、Nervi、Travaglini 为协会列明的 Gattinara 生产者。','gattinara'),
('producers','Revival references||复兴参考','Marenco provides an Albarossa reference; Cascina Castlet’s Uceline documents Uvalino recovery and fruit drying.||Marenco 提供 Albarossa 参考；Cascina Castlet 的 Uceline 记录 Uvalino 恢复及风干。','https://marencovini.com/prodotto/albarossa/|https://www.cascinacastlet.com/sites/default/files/uceline-it.pdf')]:extend('it-piemonte',sec,l,t,k)
# Add the same relevant climate/geology evidence to the individual PDO dossiers.
for rid in ['it-barolo','it-barbaresco']:
 extend(rid,'climate','Alpine and maritime influences||阿尔卑斯及海洋影响','The Langhe’s subcontinental setting is modified by Alpine shelter and moist Ligurian air.||Langhe 亚大陆性环境受阿尔卑斯屏障及 Ligurian 湿润气流调节。','langheclimate')
 extend(rid,'soils','Sedimentary terrain||沉积地形','The regional geological framework comprises marine sedimentary strata; individual sites differ in marl and sandstone expression.||地区地质框架为海相沉积地层，具体地块泥灰岩与砂岩表现不同。','langheclimate')
extend('it-roero','climate','Water balance||水分平衡','Sandy permeability and limited reserves make seasonal water recharge important in relatively dry Roero.||砂质渗透性及有限储水使相对干燥 Roero 的季节补水重要。','roeroclimate')
for sec,l,t,k in [
('geography','Borders and basin||边界与流域','The wine area follows the Dora Baltea basin to Pont-Saint-Martin, with France west and Switzerland north.||葡萄酒地区沿 Dora Baltea 流域至 Pont-Saint-Martin，西邻法国、北邻瑞士。','aostaroute'),
('climate','Alpine barrier||阿尔卑斯屏障','High mountains limit incoming moisture, leaving inner valleys drier; high-altitude zones are colder and wetter than the sheltered central valley.||高山限制外来湿气，使内谷较干；高海拔区比受屏障保护的中谷地更冷湿。','aostaclimate'),
('climate','Day and night||昼夜','Low rainfall, ventilation and marked day–night temperature differences shape the vineyard environment.||少雨、通风及明显昼夜温差塑造葡萄园环境。','aostawine'),
('viticulture','Adret||Adret','Much vineyard area occupies the sunny Adret on the Dora Baltea’s orographic left.||许多葡萄园位于 Dora Baltea 地形左岸向阳 Adret。','aostaroute'),
('soils','Glacial landscape||冰川景观','Glaciers shaped the valley system; vineyard elevation, slope and deposits vary within the main corridor.||冰川塑造谷地体系，主要走廊内葡萄园海拔、坡地及沉积物各异。','https://www.vievini.it/en/territorio.php')]:extend('it-valle-daosta',sec,l,t,k)
for sec,l,t,k in [
('climate','Mediterranean setting||地中海环境','Western coastal winegrowing is strongly linked to Mediterranean conditions; inland slope and altitude remain local modifiers.||西部沿海栽培紧密关联地中海条件，内陆坡地及海拔仍有地方调节。','ligurialand'),
('viticulture','Terrace labour||梯田劳动','Steep terraces above the Mediterranean, especially Cinque Terre, create labour-intensive vineyard access.||尤其 Cinque Terre 的地中海上方陡梯田使入园及管理劳动密集。','ligurialand'),
('geography','Val di Magra||Val di Magra','The eastern Colli di Luni context includes the Val di Magra cultural landscape, distinct from western Ponente.||东部 Colli di Luni 背景包含 Val di Magra 文化景观，不同于西部 Ponente。','ligurialand')]:extend('it-liguria',sec,l,t,k)
for sec,l,t,k in [
('climate','Regional setting||地区环境','The Po plain is a temperate transition between Mediterranean and central/western European continental–oceanic climates; Alpine, hill and lake districts require separate interpretation.||Po 平原属地中海与欧洲中西部大陆海洋气候间温带过渡，阿尔卑斯、丘陵及湖区须分别理解。','lombclimate'),
('soils','Contrasting districts||地区对比','Franciacorta’s principal moraines contrast with southern Garda’s clay-rich Lugana ground.||Franciacorta 主要冰碛与 Garda 南部 Lugana 富黏土地形形成对比。','frangeo|luganageo'),
('history','Scanzo recognition||Scanzo 认可','Moscato di Scanzo obtained DOCG recognition in 2009, a distinct development from Lugana’s 1967 DOC.||Moscato di Scanzo 于 2009 年获 DOCG，与 Lugana 1967 DOC 为不同发展。','scanzohistory|lugana'),
('producers','Rainoldi||Rainoldi','Rainoldi supplies an identified Sforzato reference, with fruit drying and large-cask maturation.||Rainoldi 提供明确 Sforzato 参考，包含风干及大木桶熟成。','https://rainoldi.com/en/wines/sforzato-of-valtellina/')]:extend('it-lombardia',sec,l,t,k)
# Replace selected identity-review questions with regional history/climate questions while retaining 10+20 levels.
for n,sec,qq,aa,kk in [
(11,'history','When were Langhe-Roero and Monferrato wine landscapes inscribed by UNESCO?||葡萄酒景观何时列入 UNESCO？','June 2014.||2014 年 6 月。','unesco'),
(12,'geography','Which mountain systems frame southern Langhe?||南部 Langhe 由哪些山系构成背景？','The Maritime Alps and Ligurian Apennines.||Maritime Alps 与 Ligurian Apennines。','langheplace'),
(14,'climate','Which two broad air influences modify the Langhe’s subcontinental setting?||哪两类气流影响调节 Langhe 亚大陆性环境？','Alpine influence and mild humid Ligurian Sea air.||阿尔卑斯影响与 Ligurian 海温和湿润气流。','langheclimate'),
(15,'geography','Which rivers frame the historical Monferrato landscape?||哪些河流界定历史 Monferrato 景观？','Po to the north; Tanaro, Belbo and Bormida to the south.||北侧 Po，南侧 Tanaro、Belbo、Bormida。','piedmontmap'),
(19,'climate','Why is winter water recharge important in Roero?||Roero 为何冬季补水重要？','Permeable sandy soils and limited reserves occur in a relatively dry climate.||相对干燥气候下砂土渗透高且储水有限。','roeroclimate'),
(20,'viticulture','What vineyard structures characterise Carema?||Carema 有何典型葡萄园结构？','Dry-stone terraces and pergolas supported by stone pillars.||干砌梯田及石柱支撑棚架。','carema')]:
 q=pr['questions'][n-1];q.update(q=b(qq),a=b(aa),refs=[sid(kk)],group='law' if sec=='law' else 'place')
# Precisely identified external producer references; these are not yet complete internal bottle records.
def W(rid,name,prod,u,txt):next(r for r in D['regions'] if r['id']==rid)['wines'].append({'name':name,'producer':prod,'url':u,'note':b(txt)})
W('it-piemonte','Albarossa','Marenco','https://marencovini.com/prodotto/albarossa/','Producer reference for Barbera × Chatus.||Barbera × Chatus 生产者参考。')
W('it-piemonte','Uceline','Cascina Castlet','https://www.cascinacastlet.com/sites/default/files/uceline-it.pdf','Uvalino with a fruit-drying step.||包含果实风干的 Uvalino。')
W('it-valle-daosta','Fumin','Les Crêtes','https://lescretes.it/en/wines/red/fumin/','Identified varietal red.||明确单品种红酒。')
W('it-valle-daosta-doc','Vuillermin','La Vrille','https://www.lavrille.it/vuillermin/','100% Vuillermin reference.||100% Vuillermin 参考。')
W('it-ghemme','Ghemme DOCG','Ioppa',S['ghemmewine'],'Producer states Nebbiolo and Vespolina.||生产者标示 Nebbiolo 与 Vespolina。')
W('it-sforzato-di-valtellina','Sforzato di Valtellina DOCG','Rainoldi','https://rainoldi.com/en/wines/sforzato-of-valtellina/','Dried fruit and large-oak maturation.||风干果实及大橡木桶熟成。')
save()
exec((BASE/'research/italy-linked/northwest_extend.py').read_text())
# Bidirectional links and additive updates; canonical data remains untouched.
new={g['id']:g for g in D['grapes']};translations={g['id']:g for g in D['translations']}
def add_reg_grape(rid,gid,en,zh,key):
 r=next(r for r in D['regions'] if r['id']==rid)
 if not any(g['grapeId']==gid for g in r['grapes']):r['grapes'].append({'grapeId':gid,'role':b(en,zh),'sourceIds':[sid(key)]})
 if not any(s['id']==sid(key) for s in r['sources']):r['sources'].append({'id':sid(key),'title':source(key)['title'],'url':url(key)})
for gid in ['pignola-valtellinese','nebbiolo-rose']:
 add_reg_grape('it-piemonte',gid,'Northwestern historical cultivation documented by the 2020 genetic study.','2020 遗传研究记录的西北历史栽培。','genetics')
for g in D['grapes']:
 rn=g['regions'][0]['name'];r=next(r for r in D['regions'] if r['kind']=='region' and r['name']==rn)
 gg=next(x for x in r['grapes'] if x['grapeId']==g['id']);u=g['sources'][0]['url'];gg['sourceIds']=[sid(u)]
 if not any(s['id']==sid(u) for s in r['sources']):r['sources'].append({'id':sid(u),'title':g['name']+' · primary source','url':u})
updates={}
for r in D['regions']:
 for gg in r['grapes']:
  gid=gg['grapeId'];ss=[s for s in r['sources'] if s['id'] in gg['sourceIds']]
  if gid in new and not any(x['name']==r['name'] for x in new[gid]['regions']):
   new[gid]['regions'].append({'name':r['name'],'country':'Italy','note':gg['role']['zh']});translations[gid]['regions'].append({'name':r['name'],'note':gg['role']['en']})
  if gid in existing:
   u=updates.setdefault(gid,{'id':gid,'countriesAdd':[],'aliasesAdd':[],'regionsAdd':[],'sourcesAdd':[]})
   if 'Italy' not in existing[gid]['countries']:u['countriesAdd']=['Italy']
   if not any(x['name']==r['name'] for x in existing[gid].get('regions',[])) and not any(x['name']==r['name'] for x in u['regionsAdd']):u['regionsAdd'].append({'name':r['name'],'country':'Italy','note':gg['role']['zh'],'enNote':gg['role']['en']})
   for s in ss:
    if not any(x['url']==s['url'] for x in u['sourcesAdd']):u['sourcesAdd'].append({'title':s['title'],'url':s['url']})
for gid,als in {
'persan':[('Becuét','Val di Susa name; not another cultivar.','Val di Susa 地方名，并非另一品种。')],
'verdesse':[('Bian Ver','Piemontese local identity.','Piemonte 地方身份。')],
'chatus':[('Nebbiolo di Dronero','Historical name referring to Chatus, not Nebbiolo.','指 Chatus 的历史名称，非 Nebbiolo。')],
'garnacha-tinta':[('Granaccia','Western Ligurian name.','Liguria 西部名称。')],
'genovese':[('Cimixià','Ligurian local name.','Liguria 地方名。')]
}.items():
 if gid not in existing:continue
 u=updates.setdefault(gid,{'id':gid,'countriesAdd':[],'aliasesAdd':[],'regionsAdd':[],'sourcesAdd':[]})
 for n,en,zh in als:
  if not any(a['name'].casefold()==n.casefold() for a in existing[gid].get('aliases',[])):u['aliasesAdd'].append({'name':n,'context':zh,'enContext':en})
D['existingUpdates']=list(updates.values())
next(r for r in D['regions'] if r['id']=='it-gavi')['aliases']=['Gavi','Cortese di Gavi']
vr=next(r for r in D['regions'] if r['id']=='it-valtenesi');vr['kind']='subregion'
D['evidence']=[
{'topic':'Source research','note':'Primary sources actually consulted through web retrieval include regional authorities, consorzi, CNR/VitisDB, VCR, original 2020 genetic research and identified producer pages. Context was recovered after scratch pruning; source facts and exact URLs were retained, with regional climate and additional PDO facts newly retrieved on 2026-10-26.'},
{'topic':'Identity reconciliation','sourceUrls':[S['genetics'],'https://vitisdb.it/varieties/show/8159',TOR+'becuet/'],'note':'Do not duplicate Bian Ver/Verdesse, Becuét/Persan, Pigato/Vermentino, Rossese/Tibouren or Albarola/Bianchetta Genovese. Historical/legal labels may differ from genetic identity.'},
{'topic':'Photographs','sourceUrls':[g['imageSourceUrl'] for g in D['grapes'] if 'imageUrl' in g],'note':'Five exact cultivar/accession or producer-labelled images; original source and attribution retained. No generic grape substitute, no assertion of a separate commercial reuse licence.'},
{'topic':'Franciacorta Rosé','sourceUrls':[S['franciacorta'],'https://franciacorta.wine/en/wine/types-pairings/franciacorta-rose/'],'note':'Consulted current consortium rules and category page specify minimum 35% Pinot Noir, not 50%.'},
{'topic':'Ghemme law','sourceUrls':[S['ghemme2026'],S['ghemme']],'note':'2026 approved EU amendment found; precise changed alcohol/composition/ageing figures withheld where consolidated current wording could not be fully retrieved.'}
]
D['corrections']=[
{'topic':'Nebbiolo relatives','grapeIds':['nebbiolo','nebbiolo-rose','pignola-valtellinese','rossola-nera'],'sourceUrls':[S['genetics']],'note':'Original 2020 SSR/SNP paper supports full-sibling relationships among these four; do not repeat older parent–offspring or colour-mutation claims. Named parental pair unresolved.'},
{'topic':'Albarola identity','grapeIds':['albarola'],'sourceUrls':['https://vitisdb.it/varieties/show/8159'],'note':'CNR VitisDB confirms Bianchetta Genovese synonymy; older CREA morphology-based descriptions may separate historical names. Do not confuse Bianchetta Trevigiana.'}
]
D['unresolved']=[
{'scope':'Piemonte rare grapes','names':['Neretta Cuneese','Malvasia Nera Lunga','Rossese Bianco','Gamba di Pernice','Bussanello','Moscato Nero di Acqui','Plassa','Passau'],'reason':'Dedicated accession, cultivation and wine dossiers remain; not counted as complete entries.'},
{'scope':'Valle d’Aosta conservation','names':['Roussin','Bonda','Neyret','Crovassa'],'reason':'Dedicated IAR/VitisDB identity, cultivation and viticulture reconciliation remains.'},
{'scope':'Lombardia rare grapes','names':['Moradella','Cassina / Uva della Cascina'],'reason':'Registry permission alone does not establish commercial planting or complete wine data.'},
{'scope':'Additional Piemonte PDO dossiers','names':['Dolcetto d’Alba','Freisa di Chieri','Grignolino del Monferrato Casalese','Malvasia di Casorzo','Malvasia di Castelnuovo Don Bosco','Colline Saluzzesi','Pinerolese','Valsusa'],'reason':'Separate detailed profiles still needed; not silently redirected to Piemonte administrative overview.'},
{'scope':'Additional Liguria PDO dossiers','names':['Pornassio','Val Polcevera','Golfo del Tigullio-Portofino'],'reason':'Separate detailed PDO dossiers pending.'},
{'scope':'Additional Lombardia PDO dossiers','names':['Oltrepò Pavese Metodo Classico','Bonarda dell’Oltrepò Pavese','Buttafuoco dell’Oltrepò Pavese','Sangue di Giuda dell’Oltrepò Pavese','Valcalepio','Riviera del Garda Classico'],'reason':'Independent parent/legal entities remain; current district/subzone profiles are not replacements.'},
{'scope':'Current legal reconciliation','names':['Derthona','Ghemme','Oltrepò Classese'],'reason':'Derthona/2026 subzone status, Ghemme consolidated changed thresholds and Classese proposals require operative legal-version checks before exact assertions.'},
{'scope':'Individual wines','names':[],'reason':'Identified producer references are attached, but no claim that all have become full independent internal wine records.'}
]
D['evidence'].append({'topic':'Core Piemonte PDO extension','sourceUrls':[S[k] for k in ['asti2026','freisa2021','ruche2020','brachettolaw','barberaastilaw','nizzalaw','doglianilaw','ovadalaw','altalangalaw','grignolinolaw','monferratolaw']],'note':'Eleven core PDO dossiers and one historical-district profile added from primary sources. Asti March 2026 PDF was visually checked and text decoded locally. Monferrato historical district and Monferrato DOC are separate records. Annual yield-management measures may impose lower operative ceilings.'})
D['corrections'].extend([
{'topic':'Asti 2026 specification','grapeIds':['muscat-blanc-a-petits-grains','brachetto'],'sourceUrls':[S['asti2026']],'note':'White Asti/Moscato d’Asti composition is minimum 97% Moscato Bianco; 2026 adds Rosé with 70–90% Moscato Bianco and 10–30% Brachetto. Do not assert all Asti is 100% Muscat or necessarily sweet. National effect 23 March 2026; do not invent separate EU-publication date.'},
{'topic':'Freisa d’Asti 2021 amendment','grapeIds':['freisa'],'sourceUrls':[S['freisa2021'],S['freisaupdate']],'note':'2021 amendment supersedes older consortium PDF: Freisa minimum 90%, with Superiore six-month minimum wood ageing and release from 1 November following harvest.'},
{'topic':'Brachetto d’Acqui / Acqui identity','grapeIds':['brachetto'],'sourceUrls':[S['brachettolaw']],'note':'One legal PDO with two names. Minimum Brachetto 97%; includes dry-to-sweet still red/rosé, extra-brut-to-sweet sparkling red/rosé and sweet red Passito. Older blanket 100%/sweet-only descriptions are incomplete.'},
{'topic':'Ruchè Riserva','grapeIds':['ruche'],'sourceUrls':[S['ruche2020']],'note':'Use operative 2020 specification rather than linked 2014 PDF. Riserva requires 24 months including 12 in wood; bare Vigna does not by itself impose Riserva ageing.'}
])
# Integrity checks against the current baseline and source-ID graph.
assert len(new)==33 and not(set(new)&set(existing))
allids=set(new)|set(existing)
for g in D['grapes']:
 assert len(g['referenceRows'])>=6
 urls={s['url'] for s in g['sources']}
 assert all(u in urls for rr in g['referenceRows'] for u in rr['sourceUrls'])
for r in D['regions']:
 known={s['id'] for s in r['sources']}
 assert all(g['grapeId'] in allids for g in r['grapes'])
 assert all(k in known for s in r['sections'] for k in s['refs'])
 assert all(k in known for g in r['grapes'] for k in g['sourceIds'])
 assert all(k in known for q in r['questions'] for k in q['refs']),r['id']
 assert len(r['sections'])>=5,(r['id'],len(r['sections']))
 if r['kind']=='region':
  assert len(r['questions'])==30 and sum(q['level']=='foundation' for q in r['questions'])==10
  assert sum(len(s['rows']) for s in r['sections'])>=20
save()
print('FINAL',len(D['grapes']),'new grapes;',len(D['regions']),'profiles;',len(D['existingUpdates']),'additive updates;',sum(len(r['questions']) for r in D['regions']),'questions; photos',sum('imageUrl' in g for g in D['grapes']))
