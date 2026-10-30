import json
from pathlib import Path
D=Path(__file__).parent
B={k:[] for k in ['grapes','translations','existingUpdates','regions','wines','evidence','unresolved','corrections']}
def bi(e,z):return {'en':e,'zh':z}
def row(e,z,a,b):return {'label':bi(e,z),'body':bi(a,b)}
S={}
def src(k,title,url):S[k]={'id':k,'title':title,'url':url}
C='https://mc-4cf22472-b2a7-42f7-8f97-1a7c-cdn-endpoint.azureedge.net/it/-/media/Files/agroqualita/vini/'
for k,title,url in [
('camp','Regione Campania · Vitienologia in Campania, 2022','https://agricoltura.regione.campania.it/pubblicazioni/pdf/VITIENOLOGIA_IN_CAMPANIA.pdf'),('irp','Regione Campania / Federico II · Vitigni storici d’Irpinia','https://agricoltura.regione.campania.it/pubblicazioni/pdf/vitigni-storici-irpinia.pdf'),('reg','Regione Campania · regional grape classification, February 2026','https://agricoltura.regione.campania.it/viticoltura/pdf/DRD_69-03-02-26.pdf'),('campwine','Regione Campania · DOP and IGP wines','https://agricoltura.regione.campania.it/viticoltura/vini.htm'),
('coda','VCR · Coda di Volpe','https://www.vivairauscedo.com/en/product-sheet/coda-di-volpe/'),('pied','VCR · Piedirosso','https://www.vivairauscedo.com/en/product-sheet/piedirosso/'),('cuomo','Marisa Cuomo · vineyards and varieties','https://www.marisacuomo.com/azienda/'),('fiorduva','Marisa Cuomo · Fiorduva','https://www.marisacuomo.com/vini/furore-bianco-fiorduva/'),('dambra','Casa D’Ambra · estate wines','https://www.dambravini.com/'),('bianco','Casa D’Ambra · Biancolella','https://dambravini.com/biancolella_casadambra.php'),('ischiab','Casa D’Ambra · Ischia Bianco','https://dambravini.com/en/ischiabianco_casadambra.php'),('vestini','Vestini Campagnano · variety recovery','https://www.vestinicampagnano.it/azienda/'),('volturno','Terre del Volturno · production specification','https://agricoltura.regione.campania.it/viticoltura/disciplinari/IGT_Terre_Volturno.pdf'),
('asprinio','Regione Campania · Aversa','https://agricoltura.regione.campania.it/viticoltura/aversa.html'),('aspriniostudy','Landi et al. · Asprinio training systems, 2022','https://pmc.ncbi.nlm.nih.gov/articles/PMC9368296/'),('caprettone','National grape register · Caprettone entry','https://www.vesuvio.wine/wp-content/uploads/2021/01/Schede-varietali-Caprettone.pdf'),('vesuvio','Consorzio Vesuvio · territory','https://www.vesuvio.wine/il-territorio-consorzio-tutela-vini-vesuvio/'),
('abruzzo','Consorzio Vini d’Abruzzo · territory','https://www.vinidabruzzo.it/territorio/'),('abruzzodoc','Abruzzo DOC · production specification','https://www.vinidabruzzo.it/wp-content/uploads/2024/04/ABRUZZO-o-DABRUZZO-DOC.pdf'),('cococciola','Costa dei Trabocchi · Cococciola','https://destinazionecostadeitrabocchi.it/consigli/cococciola-20847'),('montonico','Slow Food biodiversity project · Montonico','https://www.fondazioneslowfood.com/it/presidi-slow-food/uva-montonico/'),('montonico2','Comune di Bisenti · Montonico','https://www.comune.bisenti.te.it/vivere_il_comune/luoghi/luogo_3.html'),('arsarp','ARSARP germplasm bank · Tintilia','https://www.arsarp.it/bancadelgermoplasma/bancadati/arboree/tintilia/'),('molise','RINA · Molise specifications','https://www.rina.org/it/vini-molise'),
('guarnaccino','600 Grotte · Guarnaccino','https://www.600grotte.it/il-guarnaccino'),('grottewine','600 Grotte · wines','https://www.600grotte.it/en-gb/vini'),('alsia','ALSIA · recovery of Basilicata grape diversity','https://alsia.it/opencms/opencms/agrifoglio/agrifoglio_online/dettaglio/articolo/Il-recupero-della-biodiversita-viticola-della-Basilicata/'),('alsia2','ALSIA · Val d’Agri historic grapes','https://www.alsia.it/opencms/opencms/agrifoglio/agrifoglio_online/dettaglio/articolo/Val-dAgri-recupero-e-valorizzazione-di-antichi-vitigni-autoctoni/'),('baswine','RINA · Basilicata specifications','https://www.rina.org/it/vini-basilicata'),
('mdalaw','Montepulciano d’Abruzzo · consolidated 2023 specification','https://www.vinidabruzzo.it/wp-content/uploads/2024/02/Montepulciano-dAbruzzo-Disciplinare.pdf'),('tdalaw','Trebbiano d’Abruzzo · consolidated specification','https://www.vinidabruzzo.it/wp-content/uploads/2024/02/Trebbiano-dAbruzzo-Disciplinare.pdf'),('cdalaw','Cerasuolo d’Abruzzo · consolidated specification','https://www.vinidabruzzo.it/wp-content/uploads/2024/02/Cerasuolo-dAbruzzo-Disciplinare.pdf'),('ctlaw','Colline Teramane · consolidated 2023 specification','https://www.vinidabruzzo.it/wp-content/uploads/2024/02/Colline-Teramane-Montepulciano-dAbruzzo-Disciplinare.pdf'),('ablist','Consorzio Vini d’Abruzzo · protected wines','https://www.vinidabruzzo.it/vini-tutelati/?lang=en'),('casauria','MASAF · Casauria stock reclassification','https://www.masaf.gov.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/24375'),('caslaw','Casauria DOCG · 2025 registered specification','https://scresources.rina.org/it/food/DOCG-Casauria_disciplinare-di-produzione.pdf'),('mda2026','Montepulciano d’Abruzzo · September 2026 amendment','https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticoloDefault/originario?atto.codiceRedazionale=26A04940&atto.dataPubblicazioneGazzetta=2026-09-23&atto.tipoProvvedimento=DECRETO'),
('tintlaw','Tintilia del Molise · specification',C+'molise/disciplinari-molise/disciplinare_tintilia_doc.pdf'),('pentlaw','Pentro di Isernia · 2014 consolidated specification',C+'molise/disciplinari-molise/disciplinare_pentro_doc.pdf'),('biflaw','Biferno · specification',C+'molise/disciplinari-molise/disciplinare_biferno_doc.pdf?hash=E41BACBE07FF5FFC8CB189C31C738427&rev=-1'),('vdclaw','Aglianico del Vulture DOC · specification',C+'basilicata/disciplinari-basilicata/Aglianico-del-Vulture.pdf'),('vdglaw','Aglianico del Vulture Superiore DOCG · specification',C+'basilicata/disciplinari-basilicata/Aglianico-del-Vulture-superiore.pdf'),('matlaw','Matera DOC · specification',C+'basilicata/disciplinari-basilicata/Matera.pdf'),('agrilaw','Terre dell’Alta Val d’Agri · specification',C+'basilicata/disciplinari-basilicata/Terre-dellAlta-Val-dAgri.pdf?hash=57619B19EB843BD30FFCE5BE53CF6040&rev=-1'),
('taurasilaw','Taurasi · approved consolidated specification, 2020','https://agricoltura.regione.campania.it/viticoltura/disciplinari/approvazione_GURI_Taurasi.pdf'),('taurasipage','Regione Campania · Taurasi','https://agricoltura.regione.campania.it/viticoltura/taurasi.html'),('grecolaw','MASAF · approved Greco di Tufo specification, 2020','https://www.masaf.gov.it/flex/cm/pages/ServeAttachment.php/L/IT/D/9%252F5%252F7%252FD.b714653c197c0878d942/P/BLOB%3AID%3D14984/E/pdf?mode=download'),('fiano','Consorzio Irpinia · Fiano di Avellino','https://consorziovinidirpinia.it/vini/fiano-di-avellino-docg-vino/'),('fianolaw','Fiano di Avellino · EU amendment approval, June 2025','https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticoloDefault/originario?atto.codiceRedazionale=25A03321&atto.dataPubblicazioneGazzetta=2025-06-11&atto.tipoProvvedimento=COMUNICATO'),('sannio','Consorzio Sannio · denominations','https://www.sanniodop.it/pagine/static.aspx?IdArticolo=254'),('sanniolaw','Falanghina del Sannio · specification','https://agricoltura.regione.campania.it/viticoltura/disciplinari/DOC_Falanghina_Sannio.pdf'),('flegrei','Regione Campania · Campi Flegrei landscape','https://agricoltura.regione.campania.it/Tipici/flegrei.html'),('flegreilaw','Campi Flegrei · specification','https://agricoltura.regione.campania.it/viticoltura/disciplinari/DOC_Campi_Flegrei.pdf'),('ischialaw','Ischia · specification','https://agricoltura.regione.campania.it/viticoltura/disciplinari/DOC_Ischia.pdf'),('amalfilaw','Costa d’Amalfi · specification','https://agricoltura.regione.campania.it/viticoltura/disciplinari/DOC_Amalfi.pdf'),('aversalaw','Aversa · specification','https://agricoltura.regione.campania.it/viticoltura/disciplinari/DOC_Aversa.pdf'),('veslaw','Vesuvio · EU 2025 approved specification','https://agricoltura.regione.campania.it/viticoltura/disciplinari/DOC_Vesuvio_2025.pdf'),
('pepe','Emidio Pepe · estate and methods','https://www.emidiopepe.com/'),('pepewines','Emidio Pepe · wine declarations','https://www.emidiopepe.com/landing-page/'),('norante','Di Majo Norante · Tintilia','https://www.dimajonorante.com/en/wines/tintilia'),('cipressi','Claudio Cipressi · Tintilia recovery','https://www.claudiocipressi.it/tintilia-cipressi/'),('radici','Mastroberardino · Radici Taurasi','https://mastroberardino.com/radici-taurasi-docg-vino-rosso/'),('paternoster','Paternoster · Don Anselmo','https://paternosterwine.it/en/vini/don-anselmo-aglianico-del-vulture-superiore-docg/')]:src(k,title,url)
def save():
 (D/'south.json').write_text(json.dumps(B,ensure_ascii=False,indent=2)+'\n')
def grape(i,n,col,reg,refs,txt,aliases=[],places=[]):
 # Six prose pairs: origin, summary, viticulture, vinification, tasting, distinctions.
 vals=[x.split('|') for x in txt.strip().splitlines()];assert len(vals)==6,(i,len(vals))
 keys=['origin','summary','viticulture','winemaking','taste','confusions'];d=dict(zip(keys,vals))
 gn=bi('A complete verified parental pair is not established by the sources used here.','本次所用来源未建立经确认的完整双亲组合。')
 g={'id':i,'name':n,'zh':n,'color':col,'countries':['Italy'],**{k:v[1] for k,v in d.items()},'aliases':[{'name':a,'context':z} for a,e,z in aliases],'regions':[{'name':reg,'country':'Italy','note':'已记录的地方栽培或保育区域。'}]+[{'name':p,'country':'Italy','note':z} for p,e,z in places],'genetics':{'type':'unknown','parents':[],'note':gn['zh']},'sources':[{k:v for k,v in S[s].items() if k!='id'} for s in refs],'reviewed':'2026-10-26','editorialBatch':'italy-south'}
 g['referenceRows']=[]
 for section,key,en,zh in [('origin','origin','Origin','起源'),('parentage',None,'Parentage','亲缘'),('viticulture','viticulture','Viticulture','栽培'),('vinification','winemaking','Vinification','酿造'),('tasting','taste','Tasting','品鉴'),('similar','confusions','Identity & distinctions','身份与区别')]:
  g['referenceRows'].append({'section':section,'label':bi(en,zh),'text':gn if key is None else bi(*d[key]),'sourceUrls':[S[s]['url'] for s in refs]})
 e={'id':i,**{k:v[0] for k,v in d.items()},'geneticsNote':gn['en'],'aliases':[{'name':a,'context':e} for a,e,z in aliases],'regions':[{'name':reg,'note':'Documented local cultivation or conservation area.'}]+[{'name':p,'note':e} for p,e,z in places],'species':'Vitis vinifera','originCountry':'Italy'}
 B['grapes'].append(g);B['translations'].append(e)
grape('cococciola','Cococciola','white','Abruzzo',['cococciola','abruzzodoc'],'''
Long recorded around Chieti, especially Vacri and Villamagna.|长期记录于 Chieti，尤其 Vacri、Villamagna。
Late-ripening local white used for fresh dry wines and sparkling bases.|晚熟地方白葡萄，用于清新干白及起泡基酒。
Large round berries, substantial skins and large irregular bunches; pergola abruzzese is traditional. Harvest commonly reaches late September–early October locally.|大圆果粒、厚实果皮、大而不规则果穗；传统采用 pergola abruzzese，当地通常九月底至十月初采收。
Abruzzo DOC has a named Cococciola category; still and sparkling production are documented.|Abruzzo DOC 有 Cococciola 品种类别；已记录静止、起泡用途。
Fresh acidity, restrained fruit and floral notes; oak and sweetness are wine-specific.|清新酸度、克制果香花香；木桶、甜度须按酒款判断。
A distinct variety, not Trebbiano Abruzzese despite historic blending use.|虽曾参与地方混酿，但与 Trebbiano Abruzzese 不同。
''',places=[('Abruzzo DOC','Named varietal category.','品种标示类别。')])
grape('montonico','Montonico','white','Abruzzo',['montonico','montonico2','abruzzodoc'],'''
Preserved around Bisenti and Poggio delle Rose, Cermignano, in Teramo.|保育于 Teramo 的 Bisenti、Cermignano 的 Poggio delle Rose。
A dual-purpose grape with a long table-grape history, now used for local still and sparkling whites.|兼具鲜食历史的地方葡萄，现用于静止白酒及起泡。
Traditionally productive, with robust bunches; preservation vineyards sit below Gran Sasso. Harvest timing differs between still and sparkling objectives.|传统较丰产，果穗结实；保育园在 Gran Sasso 山麓，静止及起泡用途影响采收。
Abruzzo DOC offers a Montonico category; sparkling use highlights retained acidity.|Abruzzo DOC 设 Montonico 类别；起泡用途强调保留酸度。
Fresh, restrained white-fruit expression rather than an assumed intensely aromatic profile.|清新、克制白果表达，不能假定为强芳香型。
Do not merge with Calabria’s Mantonico Bianco merely because spellings resemble one another.|不能因拼写近似而并入 Calabria 的 Mantonico Bianco。
''',aliases=[('Montonico Bianco','White-grape catalogue wording.','白葡萄目录用名。')],places=[('Abruzzo DOC','Named category.','专名类别。')])
grape('tintilia','Tintilia','red','Molise',['arsarp','tintlaw','norante'],'''
Recorded in Molise by the early nineteenth century; ARSARP documents Acquaviva Collecroce and Ferrazzano material.|十九世纪初已在 Molise 记载；ARSARP 记录 Acquaviva Collecroce、Ferrazzano 材料。
Local red reference for acidity, phenolic structure and spice; not necessarily a heavily extracted wine.|以酸度、酚类结构、香料为参照的地方红葡萄，并不必然重萃取。
Small-to-medium loose bunches, thick skins and unreliable fruit set. Powdery mildew and wet-season downy mildew remain risks.|中小型疏松穗、厚皮、坐果不稳定；仍有白粉病及湿季霜霉病风险。
Tintilia del Molise DOC permits red, red Riserva and rosé; steel or wood choices vary by producer.|Tintilia del Molise DOC 允许红、红 Riserva、桃红；钢罐或木桶依酒庄选择。
ARSARP notes fresh acidity and pepper/clove-like spice, with substantial phenolics.|ARSARP 记录清新酸度、胡椒／丁香类香料及显著酚类。
Tintilia is not Tintore di Tramonti, Spanish Tintilla, or a generic term for teinturier grapes.|不是 Tintore di Tramonti、西班牙 Tintilla，也不是染色葡萄统称。
''',aliases=[('Tintiglia','Historic Molise spelling.','Molise 历史拼写。')],places=[('Tintilia del Molise','Dedicated DOC.','专属 DOC。'),('Pentro di Isernia','20–25% of modern red/rosé blend.','现代红／桃红配比 20–25%。')])
grape('piedirosso','Piedirosso','red','Campania',['pied','dambra','veslaw'],'''
Strongly associated with Naples, Vesuvius and Ischia, with wider Campanian cultivation.|深度关联 Napoli、Vesuvio、Ischia，也见于 Campania 其他地区。
Important fragrant red, often less tannic than Aglianico, used alone and in blends.|重要芳香红葡萄，常较 Aglianico 单宁温和，单酿、混酿皆有。
VCR describes good vigour, drooping growth, medium-early budbreak and medium-late ripening; long moderate pruning suits it. Red stalks are characteristic.|VCR 描述生长势强、枝条下垂、中早萌芽、中晚熟，适合适度长梢修剪；红果梗具特色。
Varietal red, rosé and blends, particularly with Aglianico; extraction determines final weight.|酿单品种红、桃红及混酿，常配 Aglianico；萃取影响厚度。
Floral/red-fruited, sometimes gently spicy, with useful acidity and comparatively modest tannin.|花香、红果，或轻柔香料，有用酸度及相对适中单宁。
Per’ e Palummo is a local name for Piedirosso, not a separate Ischia grape.|Per’ e Palummo 是地方名，不是独立 Ischia 品种。
''',aliases=[("Per' e Palummo",'Campanian name referring to red stalks resembling pigeon feet.','Campania 名称，指似鸽脚的红果梗。')],places=[('Campi Flegrei','Principal local red.','主要地方红葡萄。'),('Ischia','Varietal and blended red.','单酿及混酿红酒。'),('Vesuvio','Principal red.','主要红葡萄。')])
grape('coda-di-volpe','Coda di Volpe Bianca','white','Campania',['coda','camp','grecolaw'],'''
Long-established Campanian white named for the bent tip of its bunch.|Campania 传统白葡萄，名称来自弯曲果穗末端。
Important in Irpinia and Sannio as a varietal white and supporting component.|在 Irpinia、Sannio 既作单酿也作辅助葡萄。
VCR records late budbreak, medium-late ripening, modest vigour and large compact or semi-compact bunches. Wet sites face botrytis and sour rot.|VCR 记录晚萌芽、中晚熟、适中生长势、大而紧或半紧穗；湿地有灰霉、酸腐风险。
Dry whites; permitted as a complementary grape in Greco di Tufo and Fiano di Avellino.|用于干白；Greco di Tufo、Fiano di Avellino 允许作辅助。
Golden hues and floral character occur; the VCR material description favours youthful drinking, not universal great weight.|可有金色、花香；VCR 材料描述偏年轻饮用，不能一概设定厚重。
Distinct from Caprettone, Pallagrello Bianco and the recovered Galluccio Coda di Pecora Bianca.|与 Caprettone、Pallagrello Bianco、Galluccio 保育 Coda di Pecora Bianca 不同。
''',aliases=[('Coda di Volpe','Common shortened name.','常见简称。')],places=[('Greco di Tufo','Up to 15%.','最多 15%。'),('Fiano di Avellino','Permitted complementary grape.','获准辅助品种。')])
grape('asprinio','Asprinio','white','Campania',['aspriniostudy','asprinio','aversalaw','alsia2'],'''
Centred on Aversa in Caserta and northern Naples.|核心在 Caserta、Napoli 北部 Aversa。
High-acid white associated with still and sparkling wine and alberata aversana.|高酸白葡萄，关联静止、起泡及 alberata aversana。
Traditional vines climb living tree supports, requiring tall ladders and skilled harvest labour; lower modern systems also exist.|传统藤攀活树，需高梯、熟练采收；也有现代低架。
Aversa still wine requires at least 85% Asprinio; Aversa spumante requires 100%.|Aversa 静止酒至少 85% Asprinio，spumante 要求 100%。
Dry, incisive acidity and relatively restrained aromatics provide a useful southern white benchmark.|干型、鲜明酸度、较克制香气，是南部白酒参照。
Do not automatically identify Basilicata’s recovered Asprinio di Ruoti with the Aversa grape.|不能自动将 Basilicata 保育 Asprinio di Ruoti 等同 Aversa 品种。
''',aliases=[('Asprinio Bianco','Catalogue wording.','目录用名。')],places=[('Aversa','Principal grape.','主品种。')])
grape('biancolella','Biancolella','white','Campania',['bianco','ischiab','camp','ischialaw'],'''
Strongly rooted on Ischia, with other Tyrrhenian island and coastal records.|深植 Ischia，也有其他第勒尼安岛屿、海岸记录。
Principal Ischia white, bottled alone or blended with Forastera.|Ischia 主白葡萄，单酿或配 Forastera。
Steep volcanic island sites require hand work; Casa D’Ambra records low trellis/Guyot and September harvesting for its cited Biancolella.|陡峭火山岛地需手工；Casa D’Ambra 所引酒记录低架／Guyot、九月采收。
Controlled-temperature white fermentation is documented; varietal DOC category requires at least 85%.|已记录控温白酒发酵；品种 DOC 类别至少 85%。
Casa D’Ambra describes white fruit, flowers, a dry palate and almond-like finish for its wine.|Casa D’Ambra 对具体酒描述白果、花香、干型口感、杏仁式收尾。
Biancolellone and Biancolella Riccia sampled profiles are not identical in regional research; do not merge all similar names blindly.|地区研究中 Biancolellone、Biancolella Riccia 材料谱并非完全一致，不盲并近名。
''',places=[('Ischia','Principal white.','主要白葡萄。'),('Costa d’Amalfi','White blend component.','白酒混酿成分。')])
grape('forastera','Forastera','white','Campania',['ischiab','dambra','camp','ischialaw'],'''
Long-established on Ischia; the name alone does not establish a foreign birthplace.|Ischia 历史葡萄；名称本身不能确定外国原产地。
Companion to Biancolella in island blends, also made as varietal wine.|岛屿混酿中配 Biancolella，也可单酿。
Casa D’Ambra records volcanic vineyards at 100–500 m and low trellis for its Biancolella–Forastera blend.|Casa D’Ambra 混酿记录 100–500 米火山园、低棚架。
Still dry white, often temperature-managed; the named Forastera DOC category requires at least 85%.|静止干白，常控温；Forastera 专名 DOC 类别至少 85%。
Fresh restrained white-fruit expression; do not transfer every blend aroma to Forastera alone.|清新克制白果表现；不能把混酿全部香气归给单一 Forastera。
Distinct from Biancolella and from Forastera Blanca of the Canary Islands; retain separate canonical records.|与 Biancolella、加那利 Forastera Blanca 不同，应保留独立档案。
''',places=[('Ischia','Principal local white.','主要地方白葡萄。')])
save()
for i,n,col in [('pallagrello-bianco','Pallagrello Bianco','white'),('pallagrello-nero','Pallagrello Nero','red')]:
 grape(i,n,col,'Campania',['vestini','volturno','camp'],f'''
Recovered around Caiazzo and northern Caserta, associated with the area’s historic royal vineyard culture.|复兴于 Caiazzo、Caserta 北部，关联当地历史王室葡萄园文化。
A revived Caserta {'white used in varietal bottlings' if col=='white' else 'red bottled alone or with Casavecchia'}.|复兴的 Caserta {'白葡萄，见单品种装瓶' if col=='white' else '红葡萄，可单酿或配 Casavecchia'}。
The local name refers to rounded berries; modern production uses recovered local material. Regional classification does not establish a universal yield or ripening date.|地方名指圆果粒；现代生产使用保育材料，地区分类不能确定普遍产量、成熟日期。
Terre del Volturno IGT explicitly permits the named varietal category, with at least 85% of the cultivar.|Terre del Volturno IGT 明确设品种类别，至少 85% 该葡萄。
{'A structured dry-white reference in producer bottlings; lees and wood choices influence texture.' if col=='white' else 'Dry red expressions with fruit and structural weight; extraction and maturation vary by producer.'}|{'酒庄有结构型干白参照；酒泥、木桶影响质地。' if col=='white' else '干红果味及结构表现；萃取、熟成随酒庄而异。'}
Pallagrello Bianco and Nero are separate cultivar identities, not an assumed colour-mutation pair. Bianco is not Coda di Volpe.|Pallagrello Bianco、Nero 是独立身份，不假定色变亲缘；Bianco 不是 Coda di Volpe。
''',places=[('Terre del Volturno','Named varietal IGT.','专名品种 IGT。')])
grape('casavecchia','Casavecchia','red','Campania',['vestini','camp','volturno'],'''
Recovered in northern Caserta around Pontelatone and neighbouring hill districts.|保育于 Caserta 北部 Pontelatone 及邻近丘陵。
A distinctive local red revived in varietal wines and blends with Pallagrello Nero.|特色地方红葡萄，复兴于单酿及与 Pallagrello Nero 的混酿。
Modern recovery depends on selected surviving local vines; historic survival stories do not establish exact ancient ancestry.|现代保育依存留地方藤；历史存活故事不能证明精确古代血统。
Named Terre del Volturno IGT category and a dedicated Casavecchia di Pontelatone DOC reference.|有 Terre del Volturno IGT 专名类别及 Casavecchia di Pontelatone DOC 参照。
Structured dry reds; bottle-specific fruit, tannin and oak need assessment rather than a single universal ageing claim.|结构型干红；果味、单宁、木桶须按瓶款评价，不设统一陈年断言。
Distinct from Pallagrello Nero. A name meaning old house does not identify every abandoned-vine genotype.|与 Pallagrello Nero 不同；“老屋”语义不能识别所有荒园基因型。
''',places=[('Terre del Volturno','Varietal and blended reds.','单酿及混酿红酒。'),('Casavecchia di Pontelatone','Dedicated DOC reference.','专属 DOC 参照。')])
grape('fenile','Fenile','white','Campania',['cuomo','fiorduva','reg'],'''
Rare Amalfi coast white, associated especially with Furore.|稀少 Amalfi 海岸白葡萄，尤其关联 Furore。
A local blending grape, contributing 30% to the documented Fiorduva blend.|地方混酿葡萄，所引 Fiorduva 占 30%。
The producer records hillside terraces and pergola-related training; its Fiorduva fruit comes from dolomitic limestone sites at 200–550 m.|酒庄记录坡地梯田及 pergola 类整形；Fiorduva 来源白云质石灰岩地 200–550 米。
Fiorduva uses late-picked fruit and barrel fermentation; these are cuvée practices, not compulsory Fenile treatment.|Fiorduva 晚采、桶发酵，是该 cuvée 做法，不是 Fenile 强制工艺。
The blend’s rich texture cannot be assigned entirely to Fenile without a varietal trial.|没有单品种试验，不能把混酿丰厚质地全归 Fenile。
Fenile is distinct from Ginestra and Ripolo; the names describe separate components in Fiorduva.|与 Ginestra、Ripolo 不同，是 Fiorduva 独立成分。
''',places=[('Costa d’Amalfi','Local white component.','地方白葡萄成分。')])
grape('ginestra','Ginestra','white','Campania',['reg','fiorduva','caprettone','camp'],'''
Rare Campanian white associated with Amalfi coast vineyards.|关联 Amalfi 海岸园的稀少 Campania 白葡萄。
A local white component: the Fiorduva producer sheet specifies 30% Ginestra.|地方白葡萄成分；Fiorduva 酒庄表明确 30% Ginestra。
Conserved local material grows in steep coastal sites; copying Fenile’s entire morphological description would be unjustified.|保育地方材料生长陡峭海岸地；不能复制 Fenile 整套形态描述。
Used in dry white blends including late-picked, barrel-fermented Fiorduva.|用于干白混酿，包括晚采、桶发酵 Fiorduva。
Aromatic contribution is best checked in a specific wine; the entire blend’s dried-fruit profile is not a single-grape benchmark.|香气贡献须按具体酒核对；混酿干果表现不等于单葡萄标准。
Distinct from Falanghina and Caprettone. Proposed genetic relationships are not established full parentage or synonymy.|与 Falanghina、Caprettone 不同；推测遗传关系不等于完整双亲或同义。
''',places=[('Costa d’Amalfi','Local white component.','地方白葡萄成分。')])
grape('ripolo','Ripolo','white','Campania',['cuomo','fiorduva','reg'],'''
Rare local white concentrated around Furore and Positano.|集中于 Furore、Positano 的稀少白葡萄。
Low-yielding Amalfi variety; producer spelling Ripoli accounts for 40% of Fiorduva.|低产 Amalfi 品种；酒庄拼写 Ripoli，在 Fiorduva 占 40%。
Poor fertility and light bunches produce small, sometimes irregular crops in described local material.|所述地方材料结实能力低、穗轻，产量少且可能不稳定。
Used in rich dry blends; late harvest and barrel fermentation are documented at Fiorduva cuvée level.|用于丰厚干白；晚采、桶发酵记录属于 Fiorduva cuvée。
Do not assign the whole blend’s dried-apricot aroma or texture to Ripolo alone.|不能把整款混酿杏干味或质地全归 Ripolo。
Ripoli is the local producer spelling here; neither Ripolo nor Ripoli is Ribolla Gialla.|Ripoli 是此处酒庄地方拼写；两者均非 Ribolla Gialla。
''',aliases=[('Ripoli','Producer spelling, including Fiorduva.','酒庄拼写，包括 Fiorduva。')],places=[('Costa d’Amalfi','White blend component.','白酒混酿成分。')])
grape('pepella','Pepella','white','Campania',['cuomo','reg','campwine'],'''
Minor white of the Amalfi hinterland, especially Tramonti and Ravello.|Amalfi 内陆少量白葡萄，尤其 Tramonti、Ravello。
Heritage cultivar with markedly uneven berry size, retained in old vineyards and local blends.|果粒大小极不均一的传统品种，保留于老园、地方混酿。
Tiny peppercorn-like berries coexist with larger berries; old scattered vines and pergola cultivation are documented.|微小胡椒粒状果与大果并存；有零散老藤、pergola 记录。
White blending and biodiversity microvinification; a producer-page rosso typo does not change the grape’s colour.|白酒混酿、生物多样性微酿；酒庄页 rosso 笔误不改变葡萄颜色。
Sources used do not establish a reliable varietal tasting benchmark; blend notes stay at wine level.|所用来源未建立可靠单品种品鉴标准；混酿描述保留酒款层面。
A white grape, not a red grape inferred from its pepper-associated name.|是白葡萄，不能因胡椒相关名称推断红葡萄。
''',places=[('Costa d’Amalfi','Minor white cultivar.','少量白品种。')])
grape('caprettone','Caprettone','white','Campania',['caprettone','vesuvio','veslaw'],'''
Vesuvian variety around Torre del Greco and Boscotrecase, separately registered in 2014.|Torre del Greco、Boscotrecase 周边 Vesuvio 品种，2014 年独立登记。
Principal Vesuvian white identity, now with a named Vesuvio DOC category.|主要 Vesuvio 白葡萄身份，现有专名 Vesuvio DOC 类别。
Register trials found very low basal bud fertility and ripening about ten days after Fiano in the same trial; large leaves and winged cylindrical bunches.|目录试验显示基部芽结实率极低，同试验比 Fiano 晚熟约十天；大叶、带翼圆柱穗。
Still and sparkling named Vesuvio categories require at least 85% Caprettone under the 2025 specification.|2025 规范的静止、起泡 Caprettone 专名类别至少 85%。
Register pulp is uncoloured and lacks distinctive Muscat flavour; actual wine aroma depends on the bottle.|目录记果肉无色、无特殊 Muscat 味；酒香依具体瓶款。
Distinct from Coda di Volpe. Reported relationships with Ginestra/Piedirosso are not treated here as a verified full parental pair.|与 Coda di Volpe 不同；与 Ginestra／Piedirosso 关系报道不在本档视作经证实完整双亲。
''',places=[('Vesuvio','Principal white and varietal category.','主要白葡萄、品种类别。')])
grape('catalanesca','Catalanesca','white','Campania',['camp','vesuvio','reg','campwine'],'''
Historic Monte Somma grape on northern Vesuvian slopes, used for eating and wine.|Monte Somma 历史葡萄，位于 Vesuvio 北坡，兼鲜食酿酒。
Local white with its own Catalanesca del Monte Somma IGP reference.|地方白葡萄，有 Catalanesca del Monte Somma IGP 参照。
Traditional high supports survive; exposure and harvest timing matter more than a generic volcanic-soil description.|保留传统高架；坡向、采收比泛泛火山土描述更具体。
Dry white and late-picked styles occur; the separate IGP must not automatically be labelled Vesuvio DOC.|有干白、晚采风格；独立 IGP 不能自动标成 Vesuvio DOC。
Ripe white-fruit expression varies with harvest and maturation; precise aroma needs a cited cuvée.|成熟白果随采收、熟成变化，精确香气需具体 cuvée。
Name alone does not prove Catalan origin; Uva del Conte/Mezza Catalanesca is a different recovered identity.|名称不证明加泰罗尼亚原产；Uva del Conte／Mezza Catalanesca 是不同保育身份。
''',places=[('Catalanesca del Monte Somma','Named IGP.','专名 IGP。')])
grape('sciascinoso','Sciascinoso','red','Campania',['irp','cuomo','veslaw'],'''
Traditional Campanian red recorded in Irpinia and coastal vineyards.|Irpinia、海岸园有记录的传统 Campania 红葡萄。
A colour- and acidity-contributing grape used in blends and varietal Irpinia wine.|为混酿贡献颜色、酸度，也有 Irpinia 单品种酒。
Regional research describes vigorous growth but limited fertility; substantial bunch weight may still give useful cropping.|地区研究描述强生长势、较低结实能力；穗重仍可带来一定产量。
Used in coastal red/rosé blends and Irpinia varietal wines; balance of harvest and extraction is important.|用于海岸红／桃红混酿、Irpinia 品种酒；采收、萃取平衡重要。
Freshness and colour are noted; oak in a blend is not a varietal signature.|有清新度、颜色贡献；混酿木桶不是品种特征。
Sampled Cascolo was identified as Sciascinoso; Olivella is historically ambiguous and must not force indiscriminate merges.|所测 Cascolo 鉴定为 Sciascinoso；Olivella 历史歧义，不能无差别合并。
''',aliases=[('Cascolo','Identity of sampled Irpinia material.','受测 Irpinia 材料身份。')],places=[('Irpinia','Named varietal DOC reference.','品种 DOC 参照。'),('Costa d’Amalfi','Red/rosé component.','红／桃红成分。')])
grape('tintore','Tintore','red','Campania',['cuomo','irp','reg'],'''
Traditional grape of Tramonti in the Amalfi hinterland.|Amalfi 内陆 Tramonti 传统葡萄。
Deeply coloured local red retained in old vines and used alone or in blends.|保留于老藤的深色地方红葡萄，可单酿混酿。
Old pergola vineyards are a conservation reference; longevity is not proof of a specific ancient pedigree.|老 pergola 园是保育参照，藤龄不证明古代具体谱系。
Dry reds with strong colour contribution; extraction should suit the fruit rather than simply maximize density.|干红贡献显著颜色，萃取应适应果实而非只追求浓度。
Dark colour and structure are documented; tannin, freshness and oak vary by wine.|已记录深色、结构，单宁、清新度、木桶随酒变化。
Tintore di Tramonti is not Tintilia del Molise and is not a generic label for all teinturier grapes.|Tintore di Tramonti 非 Tintilia del Molise，也非染色葡萄统称。
''',aliases=[('Tintore di Tramonti','Geographical local name.','地方地理名称。')],places=[('Costa d’Amalfi','Tramonti red reference.','Tramonti 红酒参照。')])
grape('roviello','Roviello','white','Campania',['irp','reg'],'''
Rovello Bianco appears in nineteenth-century Irpinia records; surviving material is associated with Taurasi and Bonito.|十九世纪 Irpinia 记录 Rovello Bianco；存留材料关联 Taurasi、Bonito。
Rare white known as Greco Musc’, with an independent genotype and useful acidity.|称 Greco Musc’ 的稀少白葡萄，独立基因型、有用酸度。
Moderate vigour, compact winged bunches and thick skins; September ripening and relatively high must acidity in the studied sites.|生长势中等、紧密带翼穗、厚皮；受测地九月熟、果汁酸度较高。
Revived in dry varietal whites; exact recovered material matters when reading a Greco-named bottle.|复兴于单酿干白；读 Greco 名称酒须核对实际保育材料。
Acidity can support structured whites; aromas and longevity remain bottle- and vintage-specific.|酸度可支持结构型白酒；香气、寿命依瓶款年份。
Genetically distinct from Greco; Greco Musc’, Rovello Bianco and Roviello belong to this Irpinian identity.|遗传上与 Greco 不同；上述三个名属于此 Irpinia 身份。
''',aliases=[('Greco Musc’','Irpinian local name, not Greco.','Irpinia 地方名，非 Greco。'),('Rovello Bianco','Historical name.','历史名。'),('Greco Muscio','Alternate local spelling.','另一地方拼写。')],places=[('Irpinia','Heritage cultivation, not automatic DOC varietal entitlement.','传统种植，不自动获 DOC 品种资格。')])
grape('coda-di-pecora-bianca','Coda di Pecora Bianca','white','Campania',['camp','reg'],'''
Recovered around Galluccio in northern Caserta.|保育于 Caserta 北部 Galluccio。
Recently recovered white with an original genetic profile and promising trial freshness.|近期保育白葡萄，有独立遗传谱，试验呈清新度。
Small green-yellow berries, medium pyramidal bunches; 2019–2021 observations are site-specific.|小型绿黄果、中型金字塔穗；2019–2021 观察属于特定地点。
Experimental white microvinifications preceded regional classification; DOC permission must be checked separately.|试验白酒微酿先于地区分类；DOC 许可另核。
Trials note citrus, apple, herbs and mild smoky nuances; these characterize studied wines only.|试验记柑橘、苹果、草本、轻烟熏，仅描述受测酒。
The recovered Galluccio genotype differs from Coda di Volpe; older Coda di Pecora wording was sometimes applied to other material.|Galluccio 基因型不同于 Coda di Volpe；旧 Coda di Pecora 名有时指其他材料。
''',aliases=[('Coda di Pecora','Short form; accession context matters.','简称，需具体材料语境。')])
grape('camaiola','Camaiola','red','Campania',['camp','reg'],'''
Sannio variety historically called Barbera del Sannio locally.|Sannio 品种，地方历史称 Barbera del Sannio。
Independent cultivar whose modern name corrects confusion with Piedmont Barbera.|独立品种，现代名纠正与 Piemonte Barbera 混淆。
Recognition rests on recovered local vines and identity research; Barbera’s phenology must not be copied into this dossier.|认可基于保育地方藤、身份研究，不能套用 Barbera 物候。
Local red-wine production; older bottles with Barbera wording need regional context.|用于地方红酒，旧 Barbera 标签须结合区域语境。
The sources used do not justify borrowing Barbera acidity/tannin profiles; a specific producer benchmark remains to be documented.|所用来源不足以沿用 Barbera 酸度单宁，具体酒庄品鉴参照仍待记录。
Camaiola is distinct from Barbera; Barbera del Sannio refers here to the local genotype.|Camaiola 与 Barbera 不同，Barbera del Sannio 在此指地方基因型。
''',aliases=[('Barbera del Sannio','Old name for the local genotype.','地方基因型旧称。')],places=[('Sannio','Local cultivation; not blanket DOC permission.','地方种植，非泛化 DOC 许可。')])
grape('uva-del-conte','Uva del Conte','white','Campania',['camp','reg'],'''
Recovered around Torre del Greco; nationally registered in 2025 and regionally classified in February 2026.|保育于 Torre del Greco，2025 国家登记、2026 二月地区分类。
Distinct Vesuvian white formerly confused with Falanghina and Catalanesca names.|独立 Vesuvio 白葡萄，过去与 Falanghina、Catalanesca 名混淆。
Large green-yellow thick-skinned berries and winged cylindrical bunches; 2010–2012 trials retained substantial acidity.|大型绿黄厚皮果、带翼圆柱穗；2010–2012 试验保留较高酸度。
Studied through white microvinification; cultivation registration does not grant every PDO blend entitlement.|经白酒微酿研究，栽培登记不赋予所有 PDO 配比资格。
Trial total acidity was approximately 6.5–6.9 g/L as tartaric acid, analytical evidence rather than a legal or universal sensory value.|试验总酸约 6.5–6.9 g/L 酒石酸当量，是分析证据而非法规或普遍感官值。
Falanghina Vesuviana was a misidentification of this material; Mezza Catalanesca is a historical local name, not Catalanesca identity.|Falanghina Vesuviana 是该材料误称；Mezza Catalanesca 为历史地方名，非 Catalanesca 身份。
''',aliases=[('Mezza Catalanesca','Historical Torre del Greco name.','Torre del Greco 历史名。')],places=[('Vesuvio','Geographical recovery area, not DOC authorization.','地理保育区，非 DOC 授权。')])
grape('aglianicone','Aglianicone','red','Campania',['camp','irp','reg','campwine'],'''
Historic southern red preserved especially in Cilento and the upper Ofanto area.|南部历史红葡萄，尤其保留于 Cilento、Ofanto 上游。
Distinct local cultivar with recurrent mistaken identifications caused by similar names.|独立地方品种，近似名称反复导致误认。
Regional germplasm work establishes distinct material; a reliable full phenology/disease schedule is not established by this dossier.|地区种质工作确认独立材料，本档未建立可靠完整物候、病害表。
Local southern reds and recovery trials; check the precise cultivar behind historic labels.|地方南部红酒及保育试验，历史标签须核对具体品种。
A verified producer benchmark remains necessary before assigning fixed aroma or ageing ranges.|设固定香气或陈年范围前仍需核实酒庄参照。
Not automatically Aglianico. S. Andrea di Conza material once called Aglianicone proved Uva di Troia; that does not synonymize every Aglianicone accession.|不自动等于 Aglianico；S. Andrea di Conza 旧称材料鉴为 Uva di Troia，不等于全部 Aglianicone 同义。
''',places=[('Cilento','Documented local cultivation.','已记录地方种植。')])
grape('guarnaccino','Guarnaccino','red','Basilicata',['guarnaccino','grottewine','alsia'],'''
Recovered and commercially revived in Chiaromonte, in southern Basilicata’s Pollino area.|保育、商业复兴于 Basilicata 南部 Pollino 区 Chiaromonte。
Rare red with documented varietal red and rosé bottlings at 600 Grotte.|稀少红葡萄，600 Grotte 有单酿红、桃红记录。
The producer documents clay-based hillside vineyards; broad resistance publicity is not proof of particular resistance genes.|酒庄记录黏土坡园，泛抗性宣传不证明具体抗性基因。
Steel-aged red wines and gently pressed rosé are documented; exact duration varies by cuvée.|有钢罐熟成红酒、轻压榨桃红，具体时长依 cuvée。
The producer emphasizes freshness, dark fruit and spice in red wines, lighter fruit expression in rosé.|酒庄强调红酒清新、深色水果、香料，桃红较轻柔果香。
Do not merge with Guarnaccia, Vernaccia or Grenache from name resemblance; ancient Enotrian stories do not establish genetic continuity.|不因近名并入 Guarnaccia、Vernaccia、Grenache；古 Enotri 故事不证明遗传连续性。
''',aliases=[('Guarnaccino Nero','Colour-qualified name.','颜色限定名。'),('Guarnaccino Nero di Chiaromonte','Geographic local name.','地理地方名。')],places=[('Chiaromonte','Modern recovery centre.','现代保育核心。')])
B['unresolved']=[{'name':n,'reason':'Regional registration is documented; a complete cultivar identity, viticulture and wine dossier still requires primary evidence.','sourceUrls':[S['reg']['url']]} for n in ['Agostina','Castagnara','Ingannapastore','Reginella','Sabato','Suppezza','Cavalla','Olivella Nera','Tronto']]
B['unresolved'] += [{'name':n,'reason':'ALSIA recovery documented; later registration, identity and agronomy require reconciliation.','sourceUrls':[S['alsia']['url'],S['alsia2']['url']]} for n in ['Cassano','Colatamurro','Giosana','Iusana','Santa Sofia','Aglianico Bianco','Asprinio di Ruoti']]
save()
TT={'overview':bi('Overview','概览'),'history':bi('History','历史'),'geography':bi('Geography','地理'),'climate':bi('Climate','气候'),'soils':bi('Geology & soils','地质与土壤'),'grapes':bi('Grapes','葡萄品种'),'viticulture':bi('Viticulture','栽培'),'law':bi('Appellations & classification','法定产区与分级'),'vinification':bi('Winemaking & styles','酿造与风格'),'producers':bi('Producers & wines','酒庄与酒款'),'service':bi('Tasting & service','品鉴与侍酒')}
R={}
def profile(i,name,typ,intro,lines,links,parent=None,aliases=[]):
 secs={};refs=[]
 for line in lines.strip().splitlines():
  sid,ref,le,lz,en,zh=line.split('|');ss=ref.split(',')
  if sid not in secs:secs[sid]={'id':sid,'title':TT[sid],'rows':[],'refs':[]}
  secs[sid]['rows'].append(row(le,lz,en,zh));secs[sid]['refs']=list(dict.fromkeys(secs[sid]['refs']+ss));refs+=ss
  if sid=='service':secs[sid]['editorial']=True
 gg=[]
 for gid,ref,en,zh in links:gg.append({'grapeId':gid,'role':bi(en,zh),'sourceIds':[ref]});refs.append(ref)
 r={'id':i,'name':name,'country':'Italy','kind':'region' if typ=='Administrative region' else 'appellation','aliases':aliases,'intro':bi(*intro),'facts':[row('Classification','分类',typ,'行政大区' if typ=='Administrative region' else typ),row('Country','国家','Italy','意大利')],'sections':list(secs.values()),'grapes':gg,'wines':[],'sources':[S[k] for k in dict.fromkeys(refs)],'reviewed':'2026-10-26','questions':[]}
 if parent:r['parentId']=parent;r['facts'].append(row('Region','大区',R[parent]['name'],R[parent]['name']))
 B['regions'].append(r);R[i]=r;return r
def wg(rid,n,p,ref,en,zh):
 r=R[rid];r['wines'].append({'name':n,'producer':p,'url':S[ref]['url'],'note':bi(en,zh)})
 if not any(s['id']==ref for s in r['sources']):r['sources'].append(S[ref])
def local_links(region):
 out=[]
 for g in B['grapes']:
  if g['regions'][0]['name']==region:
   ref=next(k for k,s in S.items() if s['url']==g['sources'][0]['url'])
   out.append((g['id'],ref,'Documented local cultivation or recovery.','已记录地方种植或保育。'))
 return out
profile('it-abruzzo','Abruzzo','Administrative region',('Adriatic central Italian region between mountains and coast, combining Montepulciano reds, Cerasuolo rosé and distinct white-grape traditions.','亚得里亚海与山地间的意大利中部大区，融合 Montepulciano 红酒、Cerasuolo 桃红及不同白葡萄传统。'),'''
overview|abruzzo|Frame|框架|An administrative region with numerous independent denominations.|行政大区，包含多个独立法定产区。
overview|ablist|Core wines|核心酒|Montepulciano d’Abruzzo, Cerasuolo d’Abruzzo and Trebbiano d’Abruzzo are separate DOCs.|Montepulciano d’Abruzzo、Cerasuolo d’Abruzzo、Trebbiano d’Abruzzo 为不同 DOC。
history|mdalaw,tdalaw|Recognition|认可|Montepulciano DOC dates to 1968; Trebbiano DOC to 1972.|Montepulciano DOC 为 1968 年，Trebbiano DOC 为 1972 年。
history|cdalaw,ctlaw|Later milestones|后续节点|Colline Teramane became DOCG in 2003; Cerasuolo obtained independent DOC status in 2010.|Colline Teramane 于 2003 年成 DOCG，Cerasuolo 于 2010 年独立 DOC。
geography|abruzzo|Mountains|山地|Gran Sasso and Majella are major inland reference points; the Adriatic lies east.|Gran Sasso、Majella 为重要内陆参照，亚得里亚海在东侧。
geography|mdalaw|Provinces|省份|Delimited wine zones occur in Teramo, Pescara, Chieti and L’Aquila.|Teramo、Pescara、Chieti、L’Aquila 均有划定产酒区。
climate|ctlaw|Coast to hills|海岸至丘陵|Mountain proximity promotes ventilation and diurnal variation; coastal and inland ripening conditions differ.|近山促进通风、昼夜温差，海岸与内陆成熟条件有别。
climate|ctlaw|Seasonality|季节性|Teramo’s legal geographic account describes wetter autumn and a July rainfall minimum.|Teramo 规范地理说明描述秋季较湿、七月降雨最低。
soils|ctlaw|Teramo|Teramo|Clay-silt hills with looser coastal interlayers; not a uniform limestone landscape.|黏粉土丘陵夹沿海较疏松层，并非一致石灰岩地貌。
soils|tdalaw|Interior|内陆|Terre Aquilane includes older fluvial-alluvial terraces with loose deposits and variable depth.|Terre Aquilane 有较老河流冲积阶地、疏松沉积及不同深度。
grapes|tdalaw|Trebbiano identities|Trebbiano 身份|The white DOC admits Trebbiano Abruzzese and/or Trebbiano Toscano as principal grapes.|白酒 DOC 主葡萄可为 Trebbiano Abruzzese 和／或 Trebbiano Toscano。
grapes|cococciola,montonico,abruzzodoc|Local whites|地方白葡萄|Cococciola centres on Chieti; Montonico on Bisenti/Cermignano; Pecorino and Passerina have named Abruzzo DOC categories.|Cococciola 核心 Chieti，Montonico 核心 Bisenti／Cermignano；Pecorino、Passerina 有 Abruzzo DOC 类别。
viticulture|abruzzo|Training|整形|Pergola abruzzese remains characteristic alongside modern trellised vineyards.|Pergola abruzzese 仍具特色，也有现代棚架园。
viticulture|ctlaw|Teramo limits|Teramo 限制|Colline Teramane DOCG vineyards may not exceed 550 m; maximum grape yield is 9.5 t/ha.|Colline Teramane DOCG 园不超过 550 米，葡萄最高 9.5 吨／公顷。
vinification|mdalaw,cdalaw|One grape, two colours|同品种两颜色|Montepulciano supports both red wines and Cerasuolo rosé, with different extraction.|Montepulciano 可酿红酒、Cerasuolo 桃红，萃取不同。
vinification|abruzzodoc|White range|白酒范围|Abruzzo DOC includes a wider grape and sparkling range than Trebbiano d’Abruzzo alone.|Abruzzo DOC 品种、起泡范围比单独 Trebbiano d’Abruzzo 更广。
law|mdalaw,ctlaw|Red blends|红酒配比|Basic Montepulciano DOC minimum 85%; Colline Teramane minimum 90%, with Sangiovese up to 10%.|基础 Montepulciano DOC 至少 85%；Colline Teramane 至少 90%，Sangiovese 最多 10%。
law|caslaw,ablist|DOCGs|DOCG|Casauria now has independent DOCG registration; Tullum is another Abruzzo DOCG.|Casauria 已独立登记 DOCG，Tullum 也是 Abruzzo DOCG。
producers|pepe,pepewines|Emidio Pepe|Emidio Pepe|Torano Nuovo estate documents separate Montepulciano, Trebbiano and Cerasuolo bottles; decanting practices are producer-specific.|Torano Nuovo 酒庄分别记录三类酒；换瓶去沉淀为酒庄实践。
service|cdalaw,mdalaw|Comparison|比较|Compare Montepulciano red and Cerasuolo to separate grape identity from extraction; deeper pink does not prove sweetness.|比较红酒、Cerasuolo 区分品种与萃取，较深粉红不证明甜度。
''',local_links('Abruzzo')+[('montepulciano','mdalaw','Principal red and rosé grape.','主要红、桃红葡萄。'),('trebbiano-abruzzese','tdalaw','White DOC principal.','白酒 DOC 主品种。'),('trebbiano-toscano','tdalaw','White DOC principal.','白酒 DOC 主品种。'),('sangiovese','ctlaw','Colline Teramane complement.','Colline Teramane 辅助。'),('pecorino','abruzzodoc','Named category.','专名类别。'),('passerina','abruzzodoc','Named category.','专名类别。')])
profile('it-molise','Molise','Administrative region',('Small Adriatic and inland region connecting Montepulciano and Aglianico blends with the recovered local Tintilia grape.','兼有亚得里亚海岸与内陆的小型大区，连接 Montepulciano、Aglianico 混酿及保育地方 Tintilia。'),'''
overview|molise|Denominations|法定名称|Molise DOC coexists with Biferno, Pentro di Isernia and Tintilia del Molise.|Molise DOC 与 Biferno、Pentro di Isernia、Tintilia del Molise 并存。
overview|molise|IGTs|IGT|Osco/Terre degli Osci and Rotae are the regional IGT references.|Osco／Terre degli Osci、Rotae 为地区 IGT 参照。
history|biflaw,pentlaw|Early DOCs|早期 DOC|Biferno and Pentro were recognized in 1983.|Biferno、Pentro 均于 1983 年认可。
history|tintlaw|Tintilia|Tintilia|DOC recognized in 2011; the specification cites Raffaele Pepe’s 1810 manuscript.|DOC 于 2011 年认可；规范援引 Raffaele Pepe 1810 手稿。
geography|biflaw,pentlaw|Provinces|省份|Biferno is in Campobasso; Pentro in Isernia.|Biferno 位于 Campobasso，Pentro 位于 Isernia。
geography|tintlaw|Tintilia area|Tintilia 范围|Listed municipalities in both provinces; eligible vineyards must be on hills at least 200 m high.|包含两省指定市镇，合资格园须丘陵且海拔至少 200 米。
climate|molise|Coast and interior|海岸与内陆|Lower coastal settings have more maritime influence; Isernia hills provide a cooler inland context.|较低海岸地海洋影响更强，Isernia 丘陵为较凉内陆环境。
soils|tintlaw|Hill soils|丘陵土|Drained calcareous hill soils occur in the Tintilia geographic account.|Tintilia 地理说明含排水良好石灰质丘陵土。
soils|tintlaw|Other deposits|其他沉积|Sandy-clayey coastal hills and piedmont alluvium add variation in texture and depth.|砂黏质海岸丘陵、山麓冲积物增加质地深度差异。
grapes|tintlaw,biflaw|Red grapes|红葡萄|Tintilia is local; Montepulciano and Aglianico connect Molise to neighbouring regions.|Tintilia 属地方特色，Montepulciano、Aglianico 连接邻区。
grapes|pentlaw|White labels|白酒名称|Pentro’s legal Falanghina wording alone does not determine Beneventana or Flegrea genotype.|Pentro 法规 Falanghina 名称本身不能确定 Beneventana／Flegrea 基因型。
viticulture|arsarp|Tintilia fruiting|Tintilia 结实|Loose bunches and thick skins coexist with unreliable fruit set and modest crops.|疏松穗、厚皮与坐果不稳定、低产并存。
viticulture|arsarp,tintlaw|Health and yield|健康产量|Mildew risks remain despite rusticity; Tintilia DOC maximum yield is 8 t/ha.|适应力不等于无霉病风险；Tintilia DOC 最高 8 吨／公顷。
vinification|tintlaw|Tintilia types|Tintilia 类型|Rosso, Rosso Riserva and Rosato; Riserva needs two years from 1 November of harvest year.|Rosso、Rosso Riserva、Rosato；Riserva 自采收年 11 月 1 日起两年。
vinification|tintlaw|Conversion|出酒率|Tintilia red/rosé maximum grape-to-wine yield 70%; Riserva 55%.|Tintilia 红／桃红最高出酒率 70%，Riserva 55%。
law|biflaw|Biferno blend|Biferno 配比|Red/rosé: Montepulciano 70–80%, Aglianico 10–20%.|红／桃红 Montepulciano 70–80%、Aglianico 10–20%。
law|pentlaw|Pentro blend|Pentro 配比|Current red/rosé: Montepulciano 75–80%, Tintilia 20–25%; obsolete Sangiovese summaries must not substitute for the law.|现红／桃红 Montepulciano 75–80%、Tintilia 20–25%，不用过时 Sangiovese 摘要取代法规。
law|tintlaw|Tintilia share|Tintilia 比例|Dedicated DOC requires at least 95% Tintilia.|专属 DOC 要求至少 95% Tintilia。
producers|norante,cipressi|References|参照|Di Majo Norante documents 100% Tintilia; Claudio Cipressi is associated with recovery at San Felice del Molise.|Di Majo Norante 记录 100% Tintilia；Claudio Cipressi 关联 San Felice del Molise 保育。
service|arsarp|Tasting|品鉴|Assess acidity, phenolic grip and pepper/clove spice together; do not treat bottle alcohol as the DOC minimum.|同时看酸度、酚类收敛、胡椒丁香；不把瓶款酒精当 DOC 最低值。
''',local_links('Molise')+[('montepulciano','pentlaw','Core red/rosé grape.','核心红／桃红葡萄。'),('aglianico','biflaw','Biferno component.','Biferno 成分。'),('trebbiano-toscano','biflaw','Biferno white principal.','Biferno 白酒主品种。')])
profile('it-campania','Campania','Administrative region',('Tyrrhenian region combining inland Irpinia and Sannio, volcanic Naples, islands, Caserta and the Amalfi coast. Local cultivar identities are fundamental.','第勒尼安大区，兼有 Irpinia、Sannio 内陆，Napoli 火山区、岛屿、Caserta、Amalfi 海岸，地方品种精确身份至关重要。'),'''
overview|campwine|Provinces|省份|Avellino, Benevento, Caserta, Napoli and Salerno form distinct wine landscapes.|Avellino、Benevento、Caserta、Napoli、Salerno 各有不同葡萄酒地貌。
overview|campwine|DOCGs|DOCG|Taurasi, Greco di Tufo, Fiano di Avellino and Aglianico del Taburno are the four DOCG references.|四个 DOCG 参照为 Taurasi、Greco di Tufo、Fiano di Avellino、Aglianico del Taburno。
history|irp|Identity recovery|身份恢复|Regional work distinguishes Roviello/Greco Musc’ from Greco and identifies sampled Cascolo as Sciascinoso.|地区研究将 Roviello／Greco Musc’ 与 Greco 区分，所测 Cascolo 鉴为 Sciascinoso。
history|caprettone,reg|Registration|登记|Caprettone separately registered in 2014; Uva del Conte entered the regional list in February 2026.|Caprettone 2014 独立登记，Uva del Conte 2026 二月进入地区名录。
geography|grecolaw,sannio|Interior|内陆|Irpinia surrounds Avellino’s valleys and hills; Sannio centres on Benevento.|Irpinia 关联 Avellino 河谷丘陵，Sannio 核心 Benevento。
geography|flegrei,ischialaw,amalfilaw|Coast|海岸|Campi Flegrei is near Naples, Ischia is an island DOC, and Amalfi includes Furore, Ravello and Tramonti.|Campi Flegrei 近 Napoli，Ischia 为岛屿 DOC，Amalfi 含 Furore、Ravello、Tramonti。
climate|taurasilaw,radici|Late harvest|晚采|Inland Aglianico’s long cycle can extend to late October–November; altitude and exposure affect ripening.|内陆 Aglianico 长周期可至十月末、十一月；海拔坡向影响成熟。
soils|flegrei|Volcanic materials|火山材料|Campi Flegrei has tuff, ash, pumice and lapilli; some sandy sites retain ungrafted vines.|Campi Flegrei 有凝灰岩、灰、浮石、火山砾，部分砂地留自根藤。
soils|taurasilaw,fiorduva|Sedimentary materials|沉积材料|Irpinia also has clay, marl and limestone; Fiorduva sites are described as dolomitic limestone.|Irpinia 也有黏土、泥灰、石灰岩；Fiorduva 地块为白云质石灰岩。
grapes|camp,reg|Separate identities|独立身份|Coda di Volpe, Caprettone and Pallagrello Bianco are separate; Camaiola is distinct from Piedmont Barbera.|Coda di Volpe、Caprettone、Pallagrello Bianco 独立；Camaiola 非 Piemonte Barbera。
grapes|ischialaw,pied|Island grapes|岛屿葡萄|Biancolella and Forastera anchor Ischia whites; Per’ e Palummo is Piedirosso.|Biancolella、Forastera 主导 Ischia 白酒；Per’ e Palummo 即 Piedirosso。
viticulture|asprinio|Alberata|树上栽培|Asprinio climbs living tree supports in alberata aversana, requiring tall ladders and skilled harvesting.|Asprinio 以 alberata aversana 攀活树，需高梯、熟练采收。
viticulture|reg|Legal scope|法律范围|Regional cultivar registration does not automatically authorize every PDO blend.|地区品种登记不自动授权所有 PDO 配比。
vinification|grecolaw|Greco sparkling|Greco 起泡|Traditional-method bottle refermentation: minimum 18 months on lees, 36 for Spumante Riserva.|传统法瓶中再发酵，酒泥至少 18 月，Spumante Riserva 36 月。
vinification|fiorduva|Fiorduva|Fiorduva|Fenile 30%, Ginestra 30%, Ripoli 40%; late-picked barrel-fermented dry white.|Fenile 30%、Ginestra 30%、Ripoli 40%；晚采桶发酵干白。
law|taurasilaw|Taurasi|Taurasi|Aglianico minimum 85%; three years including one in wood, Riserva four including 18 months wood; clock starts 1 December of harvest year.|Aglianico 至少 85%；三年含一年木桶，Riserva 四年含十八月木桶；采收年 12 月 1 日起算。
law|fianolaw|Fiano amendment|Fiano 修订|Traditional-method sparkling categories received final EU amendment approval in June 2025, following the earlier proposal.|传统法起泡类别在早前提案后于 2025 六月获最终欧盟修订批准。
law|veslaw|Vesuvio 2025|Vesuvio 2025|Named Caprettone, Falanghina, Piedirosso and Aglianico categories each require at least 85% of the named grape.|Caprettone、Falanghina、Piedirosso、Aglianico 专名各至少 85% 对应葡萄。
producers|radici,dambra,vestini|References|参照|Mastroberardino Radici, Casa D’Ambra’s island wines and Vestini Campagnano’s recovered varieties supply different benchmarks.|Mastroberardino Radici、Casa D’Ambra 岛酒、Vestini Campagnano 保育葡萄提供不同参照。
service|pied,radici|Structural comparison|结构比较|Compare fragrant, often less tannic Piedirosso with structured Aglianico, then assess vintage and extraction.|对比芳香常较温和 Piedirosso 与结构型 Aglianico，再评年份萃取。
''',local_links('Campania')+[('aglianico','taurasilaw','Taurasi principal.','Taurasi 主品种。'),('fiano','fiano','Avellino principal white.','Avellino 主白葡萄。'),('greco','grecolaw','Tufo principal white.','Tufo 主白葡萄。'),('falanghina-beneventana','camp','Inland Falanghina identity.','内陆 Falanghina 身份。'),('falanghina-flegrea','camp','Phlegraean Falanghina identity.','Phlegraean Falanghina 身份。')])
profile('it-basilicata','Basilicata','Administrative region',('Southern region whose vineyards span Vulture’s Aglianico, warmer Matera, inland Alta Val d’Agri and heritage-grape recovery around Pollino.','南部大区，涵盖 Vulture Aglianico、较暖 Matera、内陆 Alta Val d’Agri 及 Pollino 传统葡萄保育。'),'''
overview|baswine|Denominations|法定产区|Vulture DOC and Superiore DOCG are separate; Matera, Grottino di Roccanova and Terre dell’Alta Val d’Agri broaden the regional picture.|Vulture DOC、Superiore DOCG 独立；另有 Matera、Grottino di Roccanova、Terre dell’Alta Val d’Agri。
overview|vdclaw,matlaw|Scope|范围|Vulture is one northern zone, not a proxy for all Basilicata climates or soils.|Vulture 只是北部一区，不能代表全 Basilicata 气候土壤。
history|vdclaw,vdglaw|Recognition|认可|Vulture DOC dates to 1971; Superiore DOCG to 2010.|Vulture DOC 始于 1971，Superiore DOCG 为 2010。
history|alsia|Recovery|保育|ALSIA investigates old local accessions; names and later registrations need genetic reconciliation.|ALSIA 调查老地方材料；名称、后续登记需遗传核对。
geography|vdclaw|North|北部|Vulture vineyards lie in Potenza province around an extinct volcano, with a 200–700 m legal vineyard band.|Vulture 园在 Potenza 省死火山周边，法定海拔 200–700 米。
geography|matlaw,agrilaw,guarnaccino|Other zones|其他区|Matera has Ionian coastal and hill settings; Alta Val d’Agri centres on Viggiano, Grumento Nova and Moliterno; Guarnaccino on Chiaromonte.|Matera 有爱奥尼亚海岸丘陵；Alta Val d’Agri 核心三个市镇；Guarnaccino 核心 Chiaromonte。
climate|vdclaw|Vulture season|Vulture 季节|Dry summers precede wetter October–November, when late Aglianico may still be harvested.|旱夏后十至十一月较湿，晚熟 Aglianico 仍可能采收。
climate|matlaw|Matera warmth|Matera 温暖|Ionian–Metapontine and Bradano areas are among the region’s warmest, with marked summer drought.|Ionian–Metapontine、Bradano 为地区最暖区之一，夏旱明显。
soils|vdclaw|Vulture deposits|Vulture 沉积|Volcanic and sedimentary deposits alternate; tuff supports summer water storage.|火山、沉积材料交替，凝灰岩有助夏季蓄水。
soils|matlaw|Matera deposits|Matera 沉积|Coastal plains, marine terraces and Bradanic hills include calcareous sands and conglomerates.|海岸平原、海成阶地、Bradanic 丘陵含石灰质砂及砾岩。
grapes|vdclaw,grottewine|Local grapes|地方葡萄|Aglianico is central to Vulture; Guarnaccino has documented Chiaromonte red and rosé bottlings.|Aglianico 核心 Vulture；Guarnaccino 有 Chiaromonte 红、桃红装瓶。
grapes|matlaw,agrilaw|Other varieties|其他品种|Merlot/Cabernet Sauvignon dominate Alta Val d’Agri reds; Matera also uses Sangiovese, Primitivo and Greco.|Merlot／Cabernet Sauvignon 主导 Alta Val d’Agri；Matera 另用 Sangiovese、Primitivo、Greco。
viticulture|vdclaw|Training|整形|Traditional alberello and simple trellises are permitted in Vulture.|Vulture 允许传统 alberello、简单棚架。
viticulture|vdclaw,vdglaw|Yield|产量|Vulture DOC maximum 10 t/ha; Superiore DOCG 8 t/ha.|Vulture DOC 最高 10 吨／公顷，Superiore DOCG 8 吨／公顷。
vinification|vdclaw|DOC sparkling|DOC 起泡|The DOC includes red sparkling with bottle refermentation and at least nine months processing.|DOC 含瓶中再发酵红起泡，制作至少九个月。
vinification|vdglaw|DOCG categories|DOCG 类别|Superiore and Riserva are still red categories; the DOC’s sparkling type does not transfer automatically.|Superiore、Riserva 为静止红类别，DOC 起泡不自动转入。
law|vdglaw|Release|上市|Superiore starts 1 November in the third year after harvest, with 12 months wood/12 bottle; Riserva fifth year with 24 wood/12 bottle.|Superiore 采收后第三年 11 月 1 日起，12 月木桶／12 月瓶陈；Riserva 第五年、24／12 月。
law|matlaw|Matera blends|Matera 配比|Rosso minimum Sangiovese 60%/Primitivo 30%; Moro minimum Cabernet Sauvignon 60%/Primitivo 20%/Merlot 10%.|Rosso 至少 Sangiovese 60%／Primitivo 30%；Moro 至少 Cabernet Sauvignon 60%／Primitivo 20%／Merlot 10%。
producers|paternoster,grottewine|Examples|实例|Paternoster Don Anselmo currently carries Superiore DOCG; 600 Grotte documents Il Nero, Nostos and Rhodalys from Guarnaccino.|Paternoster Don Anselmo 当前 Superiore DOCG；600 Grotte 有 Guarnaccino 的 Il Nero、Nostos、Rhodalys。
service|vdclaw,vdglaw|Bottle identity|瓶款身份|Check DOC versus DOCG and still versus sparkling; assess tannin, acidity and actual vintage development before aeration.|核对 DOC／DOCG、静止／起泡，醒酒前评单宁酸度及实际年份发展。
''',local_links('Basilicata')+[('aglianico','vdclaw','Vulture grape.','Vulture 葡萄。'),('merlot','agrilaw','Alta Val d’Agri core.','Alta Val d’Agri 核心。'),('cabernet-sauvignon','matlaw','Matera Moro and Alta Val d’Agri.','Matera Moro、Alta Val d’Agri。'),('sangiovese','matlaw','Matera Rosso core.','Matera Rosso 核心。'),('zinfandel','matlaw','Primitivo categories.','Primitivo 类别。'),('greco','matlaw','Matera Greco.','Matera Greco。')])
wg('it-abruzzo','Montepulciano d’Abruzzo','Emidio Pepe','pepewines','Estate red; preserve vintage-specific classification.','酒庄红酒，保留年份分类。')
wg('it-abruzzo','Trebbiano d’Abruzzo','Emidio Pepe','pepewines','Separate white-wine reference.','独立白酒参照。')
wg('it-molise','Tintilia del Molise','Di Majo Norante','norante','100% Tintilia in the producer sheet.','酒庄表为 100% Tintilia。')
wg('it-campania','Radici Taurasi','Mastroberardino','radici','100% Aglianico from Montemarano and Mirabella Eclano.','100% Aglianico，来自 Montemarano、Mirabella Eclano。')
wg('it-campania','Fiorduva','Marisa Cuomo','fiorduva','Fenile 30%, Ginestra 30%, Ripoli 40%.','Fenile 30%、Ginestra 30%、Ripoli 40%。')
wg('it-basilicata','Don Anselmo','Paternoster','paternoster','Current Superiore DOCG; older bottles retain original designation.','现 Superiore DOCG，旧瓶保留原标示。')
wg('it-basilicata','Il Nero','600 Grotte','grottewine','Guarnaccino red, steel ageing documented.','Guarnaccino 红酒，记录钢罐熟成。')
save()
profile('it-montepulciano-dabruzzo','Montepulciano d’Abruzzo','DOC / PDO',('Broad Abruzzo red-wine DOC based on Montepulciano, separate from the Tuscan town of that name.','以 Montepulciano 为主的广域 Abruzzo 红酒 DOC，与 Tuscany 同名城镇分开。'),'''
history|mdalaw|Recognition|认可|DOC recognized in 1968.|1968 年认可 DOC。
history|cdalaw,mda2026|Changes|变化|Cerasuolo became independent in 2010; the September 2026 amendment followed separate Casauria registration.|Cerasuolo 2010 独立，2026 九月修订发生于 Casauria 独立登记后。
geography|mdalaw|Area|范围|Delimited hill sites in all four Abruzzo provinces, with additional subzone annexes.|Abruzzo 四省划定丘陵，另有子区附录。
climate|mdalaw|Variation|差异|Coastal and inland hills differ in maritime exposure, elevation and mountain influence.|海岸、内陆丘陵海洋影响、海拔、山地作用不同。
soils|mdalaw|Sediments|沉积|Clay-rich marine deposits, sands and alluvium occur across the broad area.|广域有富黏土海相沉积、砂及冲积物。
grapes|mdalaw|Blend|配比|Minimum 85% Montepulciano; eligible non-aromatic red varieties may complete the blend.|至少 85% Montepulciano，其余可用合资格非芳香红葡萄。
vinification|mdalaw|Style|风格|Still red; maceration, extraction and oak differ by producer and designation.|静止红酒，浸渍萃取木桶随酒庄标示不同。
law|ctlaw,caslaw|Independent DOCGs|独立 DOCG|Colline Teramane and Casauria are independent denominations, not interchangeable labels for the basic DOC.|Colline Teramane、Casauria 独立，不与基础 DOC 标签互换。
producers|pepewines|Emidio Pepe|Emidio Pepe|The estate documents separate red Montepulciano, white Trebbiano and Cerasuolo bottles.|酒庄分别记录红 Montepulciano、白 Trebbiano、Cerasuolo。
service|mdalaw|Assessment|评价|Evaluate fruit, tannin and oak separately; the DOC does not mandate one extraction level.|分别评价果味单宁木桶，DOC 不规定统一萃取程度。
''',[('montepulciano','mdalaw','Minimum 85%.','至少 85%。')],'it-abruzzo')
profile('it-trebbiano-dabruzzo','Trebbiano d’Abruzzo','DOC / PDO',('Still-white DOC allowing two different Trebbiano grapes as principals.','允许两种不同 Trebbiano 作主品种的静止白酒 DOC。'),'''
history|tdalaw|Recognition|认可|DOC recognized in 1972; the cited consolidated text includes 2023 changes.|1972 年认可，所引整合文本含 2023 修订。
geography|tdalaw|Area|范围|Delimited Abruzzo hill areas with provincial subzone annexes.|Abruzzo 划定丘陵及省级子区附录。
soils|tdalaw|Terre Aquilane|Terre Aquilane|Older fluvial-alluvial terraces and loose deposits distinguish this inland context.|较老河流冲积阶地及疏松沉积构成内陆特色。
grapes|tdalaw|Principal varieties|主葡萄|Trebbiano Abruzzese and/or Trebbiano Toscano together at least 85%.|Trebbiano Abruzzese 和／或 Trebbiano Toscano 合计至少 85%。
grapes|tdalaw|Complement|辅助|Other authorized non-aromatic white grapes may contribute up to 15%.|其他获准非芳香白葡萄最多 15%。
law|tdalaw|Provincial names|省级名|Terre di Chieti, Terre Aquilane/Terre de L’Aquila, Colline Pescaresi and Colline Teramane have Superiore/Riserva provisions.|四省级参照有 Superiore／Riserva 条款。
vinification|tdalaw|Designation|标示|Still white; annex ageing and production rules apply when provincial Superiore/Riserva names are used.|静止白酒；使用省级 Superiore／Riserva 须遵附录熟成生产规则。
producers|pepe,pepewines|Estate reference|酒庄参照|Emidio Pepe offers a documented bottle-development reference without establishing universal Trebbiano longevity.|Emidio Pepe 提供瓶陈发展参照，不代表所有 Trebbiano 寿命。
service|tdalaw|Identity|身份|The label does not guarantee 100% Trebbiano Abruzzese or an intrinsically neutral wine.|标签不保证 100% Trebbiano Abruzzese，也不意味着必然中性。
''',[('trebbiano-abruzzese','tdalaw','Principal permitted white.','获准主白葡萄。'),('trebbiano-toscano','tdalaw','Principal permitted white.','获准主白葡萄。')],'it-abruzzo')
profile('it-cerasuolo-dabruzzo','Cerasuolo d’Abruzzo','DOC / PDO',('Independent Montepulciano-based Abruzzo rosé DOC.','以 Montepulciano 为主的独立 Abruzzo 桃红 DOC。'),'''
history|cdalaw|Independence|独立|Originally a Montepulciano DOC type, independently recognized in 2010.|原属 Montepulciano DOC 类型，2010 独立认可。
geography|cdalaw|Area|范围|Suitable sites across the four Abruzzo provinces; coastal and inland hills provide different settings.|四省适宜地块，海岸内陆丘陵环境不同。
soils|cdalaw|Sediments|沉积|Clay-rich coastal hills contrast with inland alluvial terraces.|富黏土海岸丘陵与内陆冲积阶地有别。
grapes|cdalaw|Blend|配比|Montepulciano minimum 85%; eligible non-aromatic red complements maximum 15%.|Montepulciano 至少 85%，合资格非芳香红葡萄最多 15%。
vinification|cdalaw|Extraction|萃取|Rosé production limits extraction compared with red wine; colour depth is not residual sugar.|桃红较红酒限制萃取，颜色深度不等于残糖。
law|cdalaw|Subzones|子区|Provincial Superiore references include Terre di Chieti, Terre Aquilane, Colline Pescaresi and Colline Teramane.|省级 Superiore 包括 Terre di Chieti、Terre Aquilane、Colline Pescaresi、Colline Teramane。
producers|pepewines|Example|实例|Emidio Pepe publishes a distinct Cerasuolo declaration.|Emidio Pepe 单独公布 Cerasuolo 资料。
service|cdalaw|Style|风格|Cherry/red fruit and fresh acidity are useful references; distinguish this rosé from Sicily’s Cerasuolo di Vittoria.|樱桃红果、清新酸度为参照，与 Sicily 的 Cerasuolo di Vittoria 分开。
''',[('montepulciano','cdalaw','Minimum 85%.','至少 85%。')],'it-abruzzo')
profile('it-colline-teramane','Colline Teramane Montepulciano d’Abruzzo','DOCG / PDO',('Teramo hill DOCG, with the current name order established in 2023.','Teramo 丘陵 DOCG，2023 年确立当前词序。'),'''
history|ctlaw|Recognition|认可|DOCG recognized in 2003.|2003 年认可 DOCG。
history|ctlaw|Name|名称|The 2023 name places Colline Teramane before Montepulciano d’Abruzzo.|2023 名称将 Colline Teramane 放前。
geography|ctlaw|Area|范围|Delimited Teramo municipalities between Adriatic influence and Gran Sasso/Monti della Laga foothills.|Teramo 划定市镇，位海洋影响与 Gran Sasso／Monti della Laga 山麓间。
geography|ctlaw|Altitude|海拔|Hill/plateau vineyards cannot exceed 550 m; wet valley floors are excluded.|丘陵高原园不超过 550 米，排除湿谷底。
climate|ctlaw|Seasonality|季节性|Autumn is wetter than July; mountain proximity contributes ventilation and day–night variation.|秋较七月湿，近山促进通风、昼夜温差。
soils|ctlaw|Texture|质地|Clay-silt hills with looser coastal interlayers.|黏粉土丘陵夹海岸疏松层。
grapes|ctlaw|Blend|配比|Montepulciano at least 90%, Sangiovese at most 10%.|Montepulciano 至少 90%、Sangiovese 最多 10%。
viticulture|ctlaw|Yield|产量|Maximum 9.5 t/ha with no production overrun.|最高 9.5 吨／公顷，不允许超额生产。
viticulture|ctlaw|Planting|种植|New/replanted vineyards require at least 3,000 vines/ha.|新种重种至少每公顷 3,000 株。
viticulture|ctlaw|Training|整形|Horizontal roof systems are excluded for new planting, except open pergolette.|新园禁水平顶棚，开放 pergolette 除外。
vinification|ctlaw|Standard ageing|常规熟成|One year including two months in bottle, from 1 November of harvest year.|自采收年 11 月 1 日起一年，其中两月瓶陈。
vinification|ctlaw|Riserva ageing|Riserva 熟成|Three years including one year wood and two months bottle, from the same date.|同日起三年，其中一年木桶、两月瓶陈。
vinification|ctlaw|Conversion|出酒率|Maximum 70%; enrichment is prohibited.|最高 70%，禁止 enrichment。
law|ctlaw|Types|类型|Standard and Riserva; not the same as a similarly named provincial subzone of another DOC.|常规、Riserva；不同于其他 DOC 同名省级子区。
service|ctlaw|Profile|风格|Dry red fruit, spice and tannic structure; standard total alcohol minimum 12.5%.|干型红果、香料、单宁结构；常规总酒精最低 12.5%。
''',[('montepulciano','ctlaw','Minimum 90%.','至少 90%。'),('sangiovese','ctlaw','Maximum 10%.','最多 10%。')],'it-abruzzo',['Montepulciano d’Abruzzo Colline Teramane','Colline Teramane'])
profile('it-casauria','Casauria','DOCG / PDO',('Independent DOCG registered in 2025, succeeding the former Montepulciano d’Abruzzo Casauria subzone.','2025 登记独立 DOCG，承接原 Montepulciano d’Abruzzo Casauria 子区。'),'''
history|caslaw|Registration|登记|Registered under EU Regulation 2025/2261, published November 2025.|欧盟条例 2025/2261 登记，2025 十一月公布。
history|casauria|Older stocks|旧库存|MASAF issued 2026 arrangements for qualifying older stock reclassification.|MASAF 于 2026 年安排符合条件旧库存重新分类。
geography|caslaw|Province|省份|Eight whole and ten partial municipalities in Pescara, including Castiglione a Casauria and Bolognano.|Pescara 八个完整、十个部分市镇，包括 Castiglione a Casauria、Bolognano。
geography|caslaw|Altitude|海拔|Up to 500 m, exceptionally 600 m for south-facing sites; wet valley floors excluded.|最高 500 米，朝南例外 600 米，排除湿谷底。
grapes|caslaw|Blend|配比|Montepulciano minimum 90%; eligible non-aromatic Abruzzo red complements maximum 10%.|Montepulciano 至少 90%，获准 Abruzzo 非芳香红葡萄最多 10%。
viticulture|caslaw|Yield|产量|Maximum 9 t/ha; minimum natural alcohol 13%.|最高 9 吨／公顷，自然潜在酒精最低 13%。
viticulture|caslaw|Planting|种植|New trellised planting minimum 3,500 vines/ha; pergola minimum 3,200.|新棚架至少 3,500 株／公顷，pergola 至少 3,200。
viticulture|caslaw|Systems|系统|Pergola abruzzese and single/double trellis are permitted.|允许 pergola abruzzese、单双棚架。
vinification|caslaw|Ageing|熟成|Standard 18 months, Riserva 24 months, from 1 November of harvest year.|常规十八月、Riserva 二十四月，采收年 11 月 1 日起。
vinification|caslaw|Conversion|出酒率|Finished-wine conversion maximum 70%.|成酒出酒率最高 70%。
law|caslaw|Alcohol|酒精|Minimum total alcohol 13% standard and 13.5% Riserva.|最低总酒精常规 13%、Riserva 13.5%。
law|caslaw|Production territory|生产范围|Vinification/ageing in defined communes; qualified historic operators have a wider Pescara exception.|酿造熟成在划定市镇，合格历史业者有较广 Pescara 例外。
service|caslaw|Sensory reference|感官参照|Dry, full red wine, ripe red fruit, spice and tannin, with softer texture developing through ageing.|干型饱满红酒，成熟红果香料单宁，陈年质地可柔化。
''',[('montepulciano','caslaw','Minimum 90%.','至少 90%。')],'it-abruzzo')
profile('it-tintilia-del-molise','Tintilia del Molise','DOC / PDO',('Tintilia-focused DOC across specified hills in both Molise provinces.','以 Tintilia 为核心，跨 Molise 两省指定丘陵的 DOC。'),'''
history|tintlaw|Recognition|认可|Established in 2011; the history cites Raffaele Pepe’s 1810 manuscript.|2011 建立，历史援引 Raffaele Pepe 1810 手稿。
geography|tintlaw|Area|范围|Listed Campobasso and Isernia municipalities; minimum vineyard elevation 200 m.|指定 Campobasso、Isernia 市镇，园最低 200 米。
soils|tintlaw|Landscapes|地貌|Calcareous hills, sandy-clayey coastal hills and piedmont alluvium.|石灰质丘陵、砂黏质海岸丘陵、山麓冲积物。
grapes|tintlaw|Blend|配比|At least 95% Tintilia; eligible non-aromatic complements at most 5%.|至少 95% Tintilia，合资格非芳香辅助最多 5%。
viticulture|tintlaw|Yield|产量|Maximum 8 t/ha across the three types.|三类型均最高 8 吨／公顷。
vinification|tintlaw|Conversion|出酒率|Rosso/Rosato maximum 70%; Rosso Riserva 55%.|Rosso／Rosato 最高 70%，Rosso Riserva 55%。
vinification|tintlaw|Riserva|Riserva|Minimum two years from 1 November of harvest year; the clause does not impose a wood minimum.|采收年 11 月 1 日起至少两年，该条不设木桶最低期。
law|tintlaw|Types|类型|Rosso, Rosso Riserva and Rosato.|Rosso、Rosso Riserva、Rosato。
producers|norante|Example|实例|Di Majo Norante’s bottle is 100% Tintilia, above the DOC minimum.|Di Majo Norante 为 100% Tintilia，超过 DOC 最低值。
service|arsarp|Assessment|判断|Acidity, phenolic grip and pepper/clove spice are useful references.|酸度、酚类收敛、胡椒丁香为参照。
''',[('tintilia','tintlaw','Minimum 95%.','至少 95%。')],'it-molise')
profile('it-biferno','Biferno','DOC / PDO',('Campobasso DOC with distinct red/rosé and white blends.','Campobasso DOC，红桃红与白酒有不同配比。'),'''
history|biflaw|Recognition|认可|DOC recognized in 1983.|1983 认可 DOC。
geography|biflaw|Area|范围|Delimited municipalities in Campobasso province, associated with the Biferno river landscape.|Campobasso 指定市镇，关联 Biferno 河流地貌。
grapes|biflaw|Red/rosé|红桃红|Montepulciano 70–80%, Aglianico 10–20%; other grapes within the legal balance.|Montepulciano 70–80%、Aglianico 10–20%，余量按法规。
grapes|biflaw|White|白酒|Trebbiano Toscano 70–80%, other authorized whites 20–30%.|Trebbiano Toscano 70–80%，其他白葡萄 20–30%。
vinification|biflaw|Riserva|Riserva|At least three years from 1 November of harvest year.|自采收年 11 月 1 日起至少三年。
law|biflaw|Types|类型|Bianco, Rosato, Rosso, Rosso Superiore and Rosso Riserva.|Bianco、Rosato、Rosso、Rosso Superiore、Rosso Riserva。
law|biflaw|Vintage|年份|Vintage indication is compulsory.|必须标年份。
service|biflaw|Comparison|比较|White and red use different principal varieties; red and rosé share grapes but differ in extraction.|白红主葡萄不同，红桃红共享葡萄而萃取不同。
''',[('montepulciano','biflaw','70–80% red/rosé.','红桃红 70–80%。'),('aglianico','biflaw','10–20% red/rosé.','红桃红 10–20%。'),('trebbiano-toscano','biflaw','70–80% white.','白酒 70–80%。')],'it-molise')
profile('it-pentro-di-isernia','Pentro di Isernia','DOC / PDO',('Isernia DOC with a modern Montepulciano–Tintilia red blend.','Isernia DOC，现代红酒以 Montepulciano—Tintilia 配比为核心。'),'''
history|pentlaw|Recognition|认可|DOC recognized in 1983.|1983 认可 DOC。
history|pentlaw|Transition|过渡|The 2014 specification allowed old vineyards ten years from 1 August 2014 to adapt.|2014 规范给予旧园自 2014 年 8 月 1 日起十年调整。
geography|pentlaw|Area|范围|Listed hill communes in Isernia province.|Isernia 省指定丘陵市镇。
grapes|pentlaw|Red/rosé|红桃红|Montepulciano 75–80%, Tintilia 20–25%, eligible red complement up to 5%.|Montepulciano 75–80%、Tintilia 20–25%，合资格红辅助最多 5%。
grapes|pentlaw|White|白酒|Falanghina 80%, Trebbiano Toscano 15–20%, other eligible whites up to 5%.|Falanghina 80%、Trebbiano Toscano 15–20%，其他最多 5%。
vinification|pentlaw|Rosso|Rosso|One year from 1 November of harvest year, including six months oak.|采收年 11 月 1 日起一年，其中六月橡木。
vinification|pentlaw|Riserva|Riserva|The text requires four years including two years oak followed by six months bottle; its separate earliest-release clause conflicts and needs control-body clarification.|文本要求四年含两年橡木再六月瓶陈，另条最早上市日期有冲突，须控制机构澄清。
law|pentlaw|Name|名称|Pentro is an authorized shortened name; old Sangiovese-based summaries are obsolete.|Pentro 为获准简称，旧 Sangiovese 核心摘要过时。
service|pentlaw|White analysis|白酒分析|Dry, fresh white with minimum legal total acidity 6 g/L.|干型清新白酒，法定总酸最低 6 g/L。
''',[('montepulciano','pentlaw','75–80% red/rosé.','红桃红 75–80%。'),('tintilia','pentlaw','20–25% red/rosé.','红桃红 20–25%。'),('trebbiano-toscano','pentlaw','15–20% white.','白酒 15–20%。')],'it-molise',['Pentro'])
save()
profile('it-taurasi','Taurasi','DOCG / PDO',('Inland Irpinia red-wine DOCG centred on late-ripening Aglianico, with substantial compulsory maturation.','Irpinia 内陆红酒 DOCG，以晚熟 Aglianico 为核心，要求较长法定熟成。'),'''
history|taurasilaw|Recognition|认可|DOC on 26 March 1970; DOCG on 11 March 1993.|1970 年 3 月 26 日认可 DOC，1993 年 3 月 11 日升级 DOCG。
history|taurasilaw|Consolidation|法规整理|The approved October 2020 text consolidates Taurasi and Taurasi Riserva rules.|2020 年 10 月批准文本汇总 Taurasi 与 Taurasi Riserva 规范。
geography|taurasilaw|Administrative area|行政范围|Seventeen whole communes in Avellino province, including Taurasi, Montemarano, Castelfranci, Paternopoli and Mirabella Eclano.|涵盖 Avellino 省 17 个完整市镇，包括 Taurasi、Montemarano、Castelfranci、Paternopoli、Mirabella Eclano。
geography|taurasilaw|Other communes|其余市镇|Bonito, Castelvetere sul Calore, Fontanarosa, Lapio, Luogosano, Montefalcione, Montemiletto, Pietradefusi, Sant’Angelo all’Esca, San Mango sul Calore, Torre le Nocelle and Venticano complete the zone.|其余为 Bonito、Castelvetere sul Calore、Fontanarosa、Lapio、Luogosano、Montefalcione、Montemiletto、Pietradefusi、Sant’Angelo all’Esca、San Mango sul Calore、Torre le Nocelle、Venticano。
soils|taurasipage,radici|Soil diversity|土壤差异|Clay-rich sites and lighter sandy-loam sites coexist. Radici distinguishes clay at Montemarano from sandy loam at Mirabella Eclano; the denomination is not one uniform soil type.|富黏土与较轻砂质壤土并存。Radici 区分 Montemarano 黏土与 Mirabella Eclano 砂质壤土，整个法定区并非单一土质。
grapes|taurasilaw|Blend|配比|Aglianico at least 85%; other authorized non-aromatic red varieties from Avellino province up to 15%.|Aglianico 至少 85%；Avellino 省其他获准非芳香红葡萄最多 15%。
viticulture|taurasilaw|Site eligibility|地块资格|Insufficiently sunny or humid valley-floor sites are excluded. Emergency irrigation is permitted.|排除日照不足或潮湿谷底地块，允许应急灌溉。
viticulture|taurasilaw|Yield|产量|Maximum grape yield 10 t/ha.|葡萄最高产量 10 t/ha。
viticulture|taurasilaw|Ripeness|成熟度|Minimum natural potential alcohol: 11.5% for Taurasi and 12% for Riserva grapes.|葡萄最低自然潜在酒精度：Taurasi 11.5%，Riserva 12%。
law|taurasilaw|Classification|分类|Taurasi and Taurasi Riserva are dry red DOCG wines within the same protected denomination.|Taurasi 与 Taurasi Riserva 均为同一保护名称下的干红 DOCG。
law|taurasilaw|Finished wine|成酒指标|Minimum total alcohol 12% for Taurasi, 12.5% for Riserva; minimum total acidity 5 g/L for both.|最低总酒精度 Taurasi 12%、Riserva 12.5%；两者总酸最低 5 g/L。
law|taurasilaw|Vigna|Vigna|The vineyard name must be registered, with separate vinification and storage and matching records.|葡萄园名称须登记；酿造、储存及相关记录须分开。
vinification|taurasilaw|Standard maturation|标准熟成|At least three years, including one year in wood.|至少三年，其中一年木桶。
vinification|taurasilaw|Riserva maturation|Riserva 熟成|At least four years, including eighteen months in wood.|至少四年，其中十八个月木桶。
vinification|taurasilaw|Clock starts|起算日期|Mandatory ageing begins on 1 December of the harvest year.|法定熟成自采收年 12 月 1 日起算。
vinification|taurasilaw|Conversion|出酒率|Maximum grape-to-wine conversion 70% at first racking and 65% after compulsory ageing.|首次倒罐最高出酒率 70%，法定熟成后 65%。
producers|radici|Radici|Radici|Mastroberardino uses 100% Aglianico from Montemarano and Mirabella Eclano; the producer reports 24 months wood and 24 months bottle ageing.|Mastroberardino 采用 Montemarano、Mirabella Eclano 的 100% Aglianico；酒庄注明 24 个月木桶及 24 个月瓶陈。
producers|radici|Estate viticulture|酒庄栽培|Radici vineyards average about 450 m, spur-pruned cordon, around 4,000 vines/ha and 5 t/ha; harvest is late October to early November. These are producer choices.|Radici 葡萄园平均约 450 米，短梢修剪单臂蔓，约 4,000 株/ha、5 t/ha，10 月下旬至 11 月初采收；均为酒庄实践。
service|taurasipage|Service|侍酒|A 16–18°C starting point suits mature reds; assess sediment and tannin before decanting. Roasted red meat, game and aged hard cheese are reference pairings.|成熟红酒可从 16–18°C 起侍，依据沉淀与单宁决定醒酒；烤红肉、野味、熟成硬奶酪可作配餐参照。
''',[('aglianico','taurasilaw','At least 85%; structure and late ripening define the appellation.','至少 85%，结构与晚熟为产区核心。')],'it-campania')
wg('it-taurasi','Radici Taurasi DOCG','Mastroberardino','radici','100% Aglianico; producer-specific vineyard and ageing details.','100% Aglianico；葡萄园及熟成资料为酒庄特定实践。')
profile('it-greco-di-tufo','Greco di Tufo','DOCG / PDO',('Greco-led still and traditional-method sparkling DOCG in the Sabato valley of Irpinia.','Irpinia Sabato 河谷，以 Greco 为主的静止及传统法起泡 DOCG。'),'''
history|grecolaw|Recognition|认可|DOC recognized in 1970; DOCG in 2003.|1970 年认可 DOC，2003 年升级 DOCG。
geography|grecolaw|Eight communes|八个市镇|Tufo, Altavilla Irpina, Chianche, Montefusco, Prata di Principato Ultra, Petruro Irpino, Santa Paolina and Torrioni, all in Avellino province.|Tufo、Altavilla Irpina、Chianche、Montefusco、Prata di Principato Ultra、Petruro Irpino、Santa Paolina、Torrioni，均位于 Avellino 省。
geography|grecolaw|Landscape|地貌|The Sabato river and surrounding hills organize the production area.|Sabato 河及周边丘陵构成产区地理骨架。
soils|grecolaw|Geology|地质|Clay-calcareous materials and volcanic contributions vary across the hills; the place-name alone does not establish identical tuff soils everywhere.|丘陵中黏土石灰质母质与火山物质影响各异；地名本身不能证明所有地块都是相同凝灰岩土。
grapes|grecolaw|Blend|配比|Greco at least 85%; Coda di Volpe Bianca may supply up to 15%.|Greco 至少 85%；Coda di Volpe Bianca 可占最多 15%。
viticulture|grecolaw|Yield|产量|Maximum grape yield 10 t/ha.|葡萄最高产量 10 t/ha。
law|grecolaw|Types|类型|Still Greco di Tufo, still Riserva, Spumante and Spumante Riserva.|静止 Greco di Tufo、静止 Riserva、Spumante、Spumante Riserva。
law|grecolaw|Still analysis|静止酒指标|Minimum total alcohol 11.5% for standard wine and 12% for Riserva; minimum total acidity 5 g/L.|标准酒最低总酒精度 11.5%，Riserva 12%；总酸最低 5 g/L。
law|grecolaw|Sparkling analysis|起泡酒指标|Minimum total alcohol 12% and total acidity 6 g/L for the sparkling categories.|起泡类型最低总酒精度 12%，总酸 6 g/L。
vinification|grecolaw|Still Riserva|静止 Riserva|At least twelve months of ageing from 1 November of harvest year.|自采收年 11 月 1 日起至少十二个月熟成。
vinification|grecolaw|Sparkling method|起泡方法|Bottle fermentation by the traditional method is compulsory; tank fermentation is not the approved alternative.|必须传统瓶中二次发酵，罐式法不是获准替代方法。
vinification|grecolaw|Lees ageing|酒泥陈年|At least eighteen months from tirage for Spumante, thirty-six months for Spumante Riserva.|Spumante 自装瓶二发起至少十八个月；Spumante Riserva 三十六个月。
service|grecolaw|Assessment|判断|Compare still and sparkling wines separately: acidity is shared, while pressure, lees development and texture distinguish the styles.|静止与起泡应分别比较：均重视酸度，但气压、酒泥发展与质地不同。
''',[('greco','grecolaw','At least 85%.','至少 85%。'),('coda-di-volpe','grecolaw','Permitted complement up to 15%.','允许辅助最多 15%。')],'it-campania')
profile('it-fiano-di-avellino','Fiano di Avellino','DOCG / PDO',('Fiano-centred Irpinia DOCG, with still wines and traditional-method sparkling categories approved in 2025.','以 Fiano 为核心的 Irpinia DOCG，含静止酒及 2025 年批准的传统法起泡类型。'),'''
history|fiano|Recognition|认可|DOC in 1978 and DOCG in 2003.|1978 年 DOC，2003 年 DOCG。
history|fianolaw|EU amendment|欧盟修订|Regulation 2025/1086 approved the Union amendment in June 2025; the earlier proposal date is not the approval date.|欧盟 2025/1086 号法规于 2025 年 6 月批准修订；较早提案日期不是批准日期。
geography|fiano|Scope|范围|Twenty-six communes in Avellino province, with contrasting altitude and exposure across inland Irpinia.|Avellino 省二十六个市镇，Irpinia 内陆不同海拔、坡向形成差异。
grapes|fiano|Principal grape|主要葡萄|Fiano at least 85%.|Fiano 至少 85%。
grapes|fiano|Complements|辅助葡萄|Greco, Coda di Volpe Bianca and Trebbiano Toscano may make up the permitted balance, collectively up to 15%.|Greco、Coda di Volpe Bianca、Trebbiano Toscano 可合计占其余最多 15%。
law|fiano,fianolaw|Categories|类别|Still Fiano di Avellino and Riserva, plus Spumante Metodo Classico and Spumante Metodo Classico Riserva under the approved amendment.|静止 Fiano di Avellino、Riserva，以及批准修订后的 Spumante Metodo Classico、Spumante Metodo Classico Riserva。
vinification|fianolaw,fiano|Sparkling|起泡|The new categories use bottle fermentation by the traditional method, creating a different maturation framework from the still wine.|新增类型采用传统瓶中二次发酵，与静止酒有不同熟成框架。
vinification|fiano|Still style|静止风格|Still Fiano can develop texture and bottle complexity; producer decisions on lees and vessels should be recorded bottle by bottle.|静止 Fiano 可发展质地与瓶陈复杂度；酒泥及容器选择须逐款记录酒庄资料。
service|fiano|Tasting focus|品鉴重点|Assess acidity, texture and development separately from oak influence; richer mature examples suit fuller dishes than youthful light styles.|酸度、质地、发展与橡木影响分开判断；饱满成熟酒款适合比清新年轻款更浓郁的菜肴。
''',[('fiano','fiano','At least 85%.','至少 85%。'),('greco','fiano','Permitted complement.','允许辅助。'),('coda-di-volpe','fiano','Permitted complement.','允许辅助。'),('trebbiano-toscano','fiano','Permitted complement.','允许辅助。')],'it-campania')
profile('it-falanghina-del-sannio','Falanghina del Sannio','DOC / PDO',('Benevento white-wine DOC spanning dry, sparkling and concentrated late-harvest styles.','Benevento 白酒 DOC，涵盖干型、起泡与浓缩晚收风格。'),'''
history|sanniolaw|Recognition|认可|Established as a separate DOC on 30 September 2011.|2011 年 9 月 30 日成为独立 DOC。
geography|sanniolaw|Province|省份|The production zone lies in Benevento province.|产区位于 Benevento 省。
geography|sanniolaw|Subzones|子区|Guardia Sanframondi or Guardiolo, Sant’Agata dei Goti, Solopaca and Taburno.|Guardia Sanframondi 或 Guardiolo、Sant’Agata dei Goti、Solopaca、Taburno。
grapes|sanniolaw|Blend|配比|Falanghina at least 85%; other eligible non-aromatic Benevento white grapes up to 15%.|Falanghina 至少 85%；Benevento 其他合资格非芳香白葡萄最多 15%。
grapes|camp|Identity|身份|Falanghina Beneventana is the key inland reference. A legal mention of Falanghina alone should not be used to collapse it with Falanghina Flegrea.|内陆主要参照为 Falanghina Beneventana；法规单写 Falanghina 不应成为合并 Falanghina Flegrea 的依据。
law|sanniolaw|Still and sweet categories|静止及甜型类别|Still white, Vendemmia Tardiva and Passito are separate authorized types.|静止白、Vendemmia Tardiva、Passito 是分别获准的类型。
law|sanniolaw|Sparkling categories|起泡类别|Spumante, Spumante di Qualità and Spumante di Qualità Metodo Classico.|Spumante、Spumante di Qualità、Spumante di Qualità Metodo Classico。
vinification|sanniolaw|Second fermentation|二次发酵|Tank fermentation is allowed for the ordinary and quality sparkling categories; Metodo Classico uses bottle fermentation.|普通及优质起泡类别允许罐式二发；Metodo Classico 使用瓶中二发。
vinification|sanniolaw|Concentration|浓缩|Late harvest and dried-grape production create distinct concentration paths and must retain their specific category rules.|晚收及干化葡萄是不同浓缩路径，须保留各类型独立规范。
service|sanniolaw|Comparison|比较|Assess still wine, sparkling wine and concentrated styles in separate flights, with sweetness and acidity considered together.|静止、起泡、浓缩风格分别品鉴，甜度与酸度结合判断。
''',[('falanghina-beneventana','camp','Principal Sannio identity; legal Falanghina minimum 85%.','Sannio 主要身份；法规 Falanghina 至少 85%。')],'it-campania')
profile('it-campi-flegrei','Campi Flegrei','DOC / PDO',('Maritime volcanic DOC west of Naples, closely associated with Falanghina Flegrea and Piedirosso.','Napoli 西部海洋影响火山 DOC，紧密关联 Falanghina Flegrea 与 Piedirosso。'),'''
history|flegreilaw|Recognition|认可|DOC recognized on 3 October 1994.|1994 年 10 月 3 日认可 DOC。
geography|flegrei,flegreilaw|Landscape|地貌|The Phlegraean area west of Naples combines coastal exposure, hills and volcanic craters.|Napoli 西侧 Phlegraean 地带结合海岸、丘陵与火山口。
soils|flegrei|Volcanic materials|火山物质|Tuff, ash, pumice and lapilli contribute to variable, often loose soils; selected sandy sites sustain ungrafted vines.|凝灰岩、火山灰、浮石及火山砾形成不同、常疏松土壤，部分砂质地块保留自根藤。
grapes|flegreilaw|Bianco|Bianco|Falanghina 50–70%; eligible white complements within the permitted balance.|Falanghina 50–70%，其余合资格白葡萄按余量规范。
grapes|flegreilaw|Rosso|Rosso|Piedirosso at least 50%, Aglianico at least 30%, other eligible red grapes up to 20%.|Piedirosso 至少 50%，Aglianico 至少 30%，其他合资格红葡萄最多 20%。
grapes|flegreilaw,camp|Named varieties|标示品种|Named Falanghina and Piedirosso wines require at least 90% of the named grape. Falanghina Flegrea is the local identity reference.|标示 Falanghina 或 Piedirosso 至少含所标葡萄 90%；当地 Falanghina 身份参照为 Falanghina Flegrea。
law|flegreilaw|Types|类型|Bianco and Rosso coexist with varietal wines, Piedirosso Riserva, Rosato and Passito, and Falanghina Spumante and Passito.|含 Bianco、Rosso、品种酒、Piedirosso Riserva、Rosato、Passito，以及 Falanghina Spumante、Passito。
vinification|flegreilaw|Style families|风格系列|Red extraction, rosé production, dried-grape wines and sparkling fermentation create distinct profiles from the same local grape base.|红酒萃取、桃红、干化葡萄与起泡发酵，使相同地方葡萄形成不同酒型。
service|pied,camp|Structural contrast|结构对照|Piedirosso commonly shows a lighter tannic frame than Aglianico; blend composition and extraction must inform comparisons.|Piedirosso 单宁结构通常比 Aglianico 轻，比较时须纳入配比与萃取。
''',[('falanghina-flegrea','camp','Local white reference; legal Falanghina blend rules apply.','地方白葡萄参照，适用法规 Falanghina 配比。'),('piedirosso','flegreilaw','Principal red grape and named varietal.','主要红葡萄及标示品种。'),('aglianico','flegreilaw','At least 30% of basic Rosso.','基础 Rosso 至少 30%。')],'it-campania')
profile('it-ischia','Ischia','DOC / PDO',('Island DOC off Naples, with distinctive Biancolella–Forastera white blends and local red varieties.','Napoli 外海岛屿 DOC，以 Biancolella—Forastera 白葡萄配比与地方红葡萄为特色。'),'''
history|ischialaw|Recognition|认可|DOC recognized on 3 March 1966.|1966 年 3 月 3 日认可 DOC。
geography|ischialaw|Area|范围|The production area is the island of Ischia in Naples province.|产区为 Napoli 省 Ischia 岛。
soils|dambra,ischiab|Island vineyards|岛屿葡萄园|Volcanic island slopes are central. Casa D’Ambra documents vineyards from 100–500 m for its Ischia Bianco.|火山岛坡地为核心；Casa D’Ambra 记录其 Ischia Bianco 葡萄园海拔 100–500 米。
grapes|ischialaw|Bianco blend|白酒配比|Forastera 45–70%, Biancolella 30–55%, with other eligible white grapes up to 15%.|Forastera 45–70%，Biancolella 30–55%，其他合资格白葡萄最多 15%。
grapes|ischialaw|Rosso blend|红酒配比|Guarnaccia 40–50%, Piedirosso 40–50%, with eligible red complements up to 15%. Guarnaccia identity remains a separate register task.|Guarnaccia 40–50%，Piedirosso 40–50%，其他合资格红葡萄最多 15%；Guarnaccia 身份另待登记册核对。
grapes|ischialaw|Varietal labels|品种标签|Named Biancolella, Forastera and Piedirosso wines require at least 85% of the named grape.|标示 Biancolella、Forastera、Piedirosso 的酒须至少含相应葡萄 85%。
law|ischialaw|Types|类型|Bianco, including Superiore and Spumante, Rosso and named varietal wines; Piedirosso also has a Passito type.|Bianco 含 Superiore、Spumante，另有 Rosso 与品种酒；Piedirosso 另设 Passito。
viticulture|ischiab|Producer example|酒庄实例|Casa D’Ambra describes low trellis with Guyot pruning for its Ischia Bianco vineyards; this is a producer example.|Casa D’Ambra 的 Ischia Bianco 葡萄园注明低架 Guyot 修剪；属酒庄实例。
vinification|ischiab|Producer blend|酒庄配比|Casa D’Ambra Ischia Bianco uses equal parts Biancolella and Forastera, a specific compliant blend rather than the general DOC formula.|Casa D’Ambra Ischia Bianco 为 Biancolella、Forastera 各半，属符合法规的具体配比，而非全部 DOC 的固定配方。
service|ischiab,bianco|Comparison|比较|Compare the two-grape Ischia Bianco with the producer’s Biancolella to study blend effect and varietal expression.|对比同庄双品种 Ischia Bianco 与 Biancolella，可研究混酿作用及品种表达。
''',[('biancolella','ischialaw','30–55% basic white; at least 85% varietal.','基础白 30–55%；品种酒至少 85%。'),('forastera','ischialaw','45–70% basic white; at least 85% varietal.','基础白 45–70%；品种酒至少 85%。'),('piedirosso','ischialaw','40–50% basic red; at least 85% varietal.','基础红 40–50%；品种酒至少 85%。')],'it-campania')
wg('it-ischia','Ischia Bianco','Casa D’Ambra','ischiab','Equal Biancolella and Forastera.','Biancolella、Forastera 各半。')
wg('it-ischia','Biancolella Ischia DOC','Casa D’Ambra','bianco','Estate Biancolella reference.','酒庄 Biancolella 参照。')
profile('it-costa-damalfi','Costa d’Amalfi','DOC / PDO',('Salerno coastal DOC with Furore, Ravello and Tramonti subzones and a remarkable surviving local grape heritage.','Salerno 海岸 DOC，含 Furore、Ravello、Tramonti 子区，并保留重要地方葡萄遗产。'),'''
history|amalfilaw|Recognition|认可|DOC established on 10 August 1995; the specification was subsequently amended, including in 2011.|1995 年 8 月 10 日设 DOC，之后包括 2011 年有规范修订。
geography|amalfilaw|Subzones|子区|Furore, Ravello and Tramonti have separate delimited subzones.|Furore、Ravello、Tramonti 各有独立划界子区。
geography|cuomo,fiorduva|Coast and inland|海岸与内陆|Furore includes steep sea-facing terraces; Tramonti lies farther inland. They should not be treated as one uniform growing environment.|Furore 有陡峭向海梯田，Tramonti 更偏内陆，不应视为统一种植环境。
soils|fiorduva|Fiorduva sites|Fiorduva 地块|Marisa Cuomo documents dolomitic limestone at 200–550 m with southern exposure for Fiorduva.|Marisa Cuomo 注明 Fiorduva 地块为白云质石灰岩、海拔 200–550 米、南向。
grapes|amalfilaw|White base|白酒基础|Basic white, passito and sparkling, and Ravello/Tramonti whites, require Falanghina and/or Biancolella at least 40%. Furore has a separate white formula.|基础白、Passito、起泡及 Ravello/Tramonti 白酒要求 Falanghina 和／或 Biancolella 至少 40%；Furore 白酒另有配方。
grapes|cuomo,irp|Local heritage|地方遗产|Fenile, Ginestra, Ripolo and Pepella are important white-grape references; Tintore is closely associated with Tramonti.|Fenile、Ginestra、Ripolo、Pepella 为重要地方白葡萄参照；Tintore 紧密关联 Tramonti。
law|amalfilaw|Styles|风格|White, white Passito and Spumante, red, red Passito and rosé are distinguished in the specification.|法规区分白酒、白 Passito、Spumante、红酒、红 Passito 与桃红。
viticulture|fiorduva|Terrace management|梯田管理|Fiorduva vineyards employ pergola/raggiera and espalier systems on terraces; the estate reports very late harvest into late October.|Fiorduva 梯田采用 pergola/raggiera 与篱架；酒庄注明非常晚采，至 10 月下旬。
vinification|fiorduva|Fiorduva blend|Fiorduva 配比|30% Fenile, 30% Ginestra and 40% Ripoli; this wine-specific blend must not replace the general DOC rules.|30% Fenile、30% Ginestra、40% Ripoli；该酒特定配比不可替代全 DOC 规范。
vinification|fiorduva|Fiorduva cellar|Fiorduva 酿造|Super-ripe grapes, low-temperature fermentation in oak barrels and approximately three months fermentation are producer-reported choices.|过熟葡萄、橡木桶低温发酵、约三个月发酵期，均为酒庄所述选择。
service|fiorduva|Assessment|判断|Compare richness, acidity and oak influence independently; Fiorduva represents a concentrated premium style within a broader denomination.|分别判断饱满度、酸度与橡木；Fiorduva 是广泛法定区内的浓缩高端风格实例。
''',[('biancolella','amalfilaw','Principal white component.','主要白葡萄组成。'),('fenile','fiorduva','30% of Fiorduva.','Fiorduva 30%。'),('ginestra','fiorduva','30% of Fiorduva.','Fiorduva 30%。'),('ripolo','fiorduva','Ripoli label spelling; 40% of Fiorduva.','酒标拼写 Ripoli；Fiorduva 40%。'),('pepella','cuomo','Local white heritage grape.','地方传统白葡萄。'),('tintore','irp','Tramonti red heritage grape.','Tramonti 传统红葡萄。')],'it-campania')
wg('it-costa-damalfi','Furore Bianco Fiorduva','Marisa Cuomo','fiorduva','30% Fenile, 30% Ginestra, 40% Ripoli.','30% Fenile、30% Ginestra、40% Ripoli。')
save()
profile('it-aversa','Aversa','DOC / PDO',('Asprinio-based white and sparkling DOC across the Aversa plain, including the historic alberata training tradition.','Aversa 平原以 Asprinio 为主的白及起泡 DOC，包含历史 alberata 树附式栽培传统。'),'''
history|aversalaw|Recognition|认可|DOC recognized on 31 July 1993.|1993 年 7 月 31 日认可 DOC。
geography|aversalaw|Scope|范围|Nineteen communes in Caserta province, plus Giugliano in Campania, Qualiano and Sant’Antimo in Naples province.|Caserta 省十九市镇，加 Napoli 省 Giugliano in Campania、Qualiano、Sant’Antimo。
grapes|aversalaw|Still white|静止白酒|Asprinio at least 85%; eligible white complements up to 15%.|Asprinio 至少 85%；其他合资格白葡萄最多 15%。
grapes|aversalaw|Sparkling|起泡酒|Asprinio 100%.|Asprinio 100%。
viticulture|asprinio,aspriniostudy|Alberata|Alberata|Vines climb living poplar supports, reaching heights that require ladders for vineyard work and harvest.|葡萄攀附活杨树支撑，形成需梯子作业、采收的高架系统。
viticulture|aspriniostudy|Training comparison|架式比较|Modern lower training systems also exist; the Asprinio study compares alberata with espalier rather than treating all Aversa vineyards as alberata.|现代低架系统亦存在；Asprinio 研究比较 alberata 与篱架，并非所有 Aversa 葡萄园均为 alberata。
law|aversalaw|Classification|分类|Aversa is the protected DOC name; Asprinio identifies its principal grape and traditional wine identity.|Aversa 为受保护 DOC 名，Asprinio 说明主要葡萄与传统酒身份。
vinification|aversalaw,aspriniostudy|Style|风格|High natural acidity supports both dry still wines and sparkling production; the pure-variety requirement is stricter for sparkling.|高天然酸度支持干型静止与起泡酿造，起泡的纯品种要求更严格。
service|aspriniostudy|Tasting focus|品鉴重点|Use acidity and restrained aroma as structural reference points; compare training and cellar choices only where bottle-specific evidence is available.|以酸度与克制香气为结构参照，架式与酒窖选择须有酒款具体证据再比较。
''',[('asprinio','aversalaw','At least 85% still, 100% sparkling.','静止至少 85%，起泡 100%。')],'it-campania',['Asprinio di Aversa'])
profile('it-vesuvio','Vesuvio','DOC / PDO',('Somma–Vesuvius DOC with Lacryma Christi styles and expanded varietal categories under the 2025 specification.','Somma–Vesuvius DOC，含 Lacryma Christi 风格及 2025 规范扩展的品种类别。'),'''
history|veslaw|Recognition|认可|DOC approved on 13 January 1983.|1983 年 1 月 13 日批准 DOC。
history|veslaw|Current amendment|当前修订|Regulation EU 2025/1903 was published on 22 September 2025 and incorporated in the regional consolidated specification.|欧盟 2025/1903 法规于 2025 年 9 月 22 日公布，纳入大区汇总规范。
geography|veslaw|Area|范围|The entire communes of Boscotrecase, Trecase and San Sebastiano al Vesuvio, and delimited portions of surrounding Naples communes.|完整 Boscotrecase、Trecase、San Sebastiano al Vesuvio 及周边 Napoli 市镇划定部分。
geography|vesuvio|Mountain setting|山体环境|Vineyards surround the Somma–Vesuvius complex, with altitude and exposure changing around its slopes.|葡萄园环绕 Somma–Vesuvius 山体，坡面海拔、朝向各异。
soils|veslaw|Eligibility|资格|The specification identifies well-exposed sloping volcanic soils rich in potassium as suitable.|规范将朝向良好的坡地、富钾火山土列为适宜条件。
grapes|veslaw|White blend|白酒配比|Caprettone and/or Coda di Volpe at least 45%; Falanghina and/or Greco up to 35%; other eligible whites up to 20%.|Caprettone 和／或 Coda di Volpe 至少 45%；Falanghina 和／或 Greco 最多 35%；其他合资格白葡萄最多 20%。
grapes|veslaw|Red and rosé blend|红桃红配比|Piedirosso at least 50%; the legal text lists Sciascinoso Olivella and/or Aglianico up to 30%; other eligible red grapes up to 20%.|Piedirosso 至少 50%；法规列 Sciascinoso Olivella 和／或 Aglianico 最多 30%；其他合资格红葡萄最多 20%。
grapes|veslaw|Varietal types|品种类型|Caprettone, Falanghina, Piedirosso and Aglianico types each require at least 85% of the named grape.|Caprettone、Falanghina、Piedirosso、Aglianico 类型各须所标葡萄至少 85%。
grapes|caprettone,reg|Identity|身份|Caprettone has its own register entry and must remain distinct from Coda di Volpe. Catalanesca cultivation on Monte Somma does not make it a named Vesuvio DOC type.|Caprettone 有独立登记，不可与 Coda di Volpe 合并。Monte Somma 种植 Catalanesca 不代表其为 Vesuvio DOC 标示品种类型。
viticulture|veslaw|Yields|产量|Basic wines and named varietal wines have a 10 t/ha maximum; Lacryma Christi white/red Superiore and red Riserva have 8.5 t/ha.|基础及标示品种酒最高 10 t/ha；Lacryma Christi 白红 Superiore、红 Riserva 为 8.5 t/ha。
law|veslaw|Lacryma Christi|Lacryma Christi|An authorized designation within Vesuvio DOC, covering white, red, rosé and specified sparkling/concentrated categories; it is not a separate DOC.|为 Vesuvio DOC 内获准名称，涵盖白红桃红及指定起泡、浓缩类型，非独立 DOC。
law|veslaw|White additions|白酒类别|Lacryma Christi includes white Superiore, Passito and Liquoroso in addition to its still and sparkling white categories.|Lacryma Christi 除静止、起泡白外，还含白 Superiore、Passito、Liquoroso。
vinification|veslaw|Style distinctions|风格区分|Traditional still wines, sparkling fermentation, grape drying and fortified Liquoroso require separate production and analytical specifications.|传统静止、起泡发酵、葡萄干化、加强 Liquoroso 适用各自生产及分析规范。
service|veslaw|Comparisons|比较|Compare like categories: a Lacryma Christi red Riserva, a dry white and a white Liquoroso have different structural and service needs.|应同类比较：Lacryma Christi 红 Riserva、干白、白 Liquoroso 的结构及侍酒需求不同。
''',[('caprettone','veslaw','White principal; named type at least 85%.','白酒主要葡萄；标示类型至少 85%。'),('coda-di-volpe','veslaw','Shares the minimum 45% white component with Caprettone.','与 Caprettone 共享白酒至少 45% 主组成。'),('piedirosso','veslaw','At least 50% basic red/rosé; named type at least 85%.','基础红桃红至少 50%，标示类型至少 85%。'),('aglianico','veslaw','Red complement and named type.','红酒辅助及标示品种。'),('greco','veslaw','White complement.','白酒辅助。'),('sciascinoso','veslaw','Red blend component under the legal Sciascinoso Olivella wording.','法规 Sciascinoso Olivella 措辞下的红酒组成。')],'it-campania',['Lacryma Christi del Vesuvio'])
profile('it-terre-del-volturno','Terre del Volturno','IGT / PGI',('Caserta-centred geographical indication important for recovered Pallagrello and Casavecchia wines.','以 Caserta 为核心的地理标志，Pallagrello、Casavecchia 保育酒款的重要载体。'),'''
history|volturno|Recognition|认可|IGT recognized in November 1995.|1995 年 11 月认可 IGT。
history|vestini|Recovery|保育|Vestini Campagnano documents recovery and renewed vinification of Pallagrello Bianco, Pallagrello Nero and Casavecchia.|Vestini Campagnano 记录 Pallagrello Bianco、Pallagrello Nero、Casavecchia 的保育与重新酿造。
geography|volturno|Area|范围|Delimited Caserta communes include Caiazzo, Castel Campagnano and Pontelatone; Giugliano in Campania, Qualiano and Sant’Antimo extend the zone into Naples province.|指定 Caserta 市镇包括 Caiazzo、Castel Campagnano、Pontelatone；Giugliano in Campania、Qualiano、Sant’Antimo 将范围延至 Napoli 省。
grapes|volturno|Varietal wines|品种酒|Named varietal wines require at least 85% of the named grape; Pallagrello Bianco, Pallagrello Nero and Casavecchia are key local examples.|标示品种酒至少含所标葡萄 85%；Pallagrello Bianco、Pallagrello Nero、Casavecchia 为重要地方实例。
grapes|camp|Identity|身份|Pallagrello Bianco is distinct from Coda di Volpe; the white and red Pallagrello names do not alone prove a colour-mutation relationship.|Pallagrello Bianco 与 Coda di Volpe 不同；白红 Pallagrello 同名本身不能证明色变关系。
law|volturno|Types|类型|White, red and rosé, including permitted Amabile and Frizzante versions; white/red Passito and red Novello are also specified.|白红桃红，含获准 Amabile、Frizzante；另有白红 Passito 与红 Novello。
law|volturno|Separate denomination|独立法定区|Terre del Volturno IGT must not be merged with Casavecchia di Pontelatone DOC.|不可与 Casavecchia di Pontelatone DOC 合并。
vinification|volturno,vestini|Interpretation|表达|The IGT accommodates both blends and varietal expressions; bottle records should retain producer proportions and exact legal designation.|IGT 容纳混酿与品种表达；酒款档案须保留酒庄配比及精确法定标示。
service|camp|Study pairing|学习对照|Compare Pallagrello Bianco and Nero as separate cultivars, then Casavecchia as a separate red identity.|Pallagrello Bianco 与 Nero 按独立品种比较，再以 Casavecchia 作另一红葡萄对照。
''',[('pallagrello-bianco','volturno','Local varietal wine; minimum 85% when named.','地方品种酒；标示时至少 85%。'),('pallagrello-nero','volturno','Local varietal wine; minimum 85% when named.','地方品种酒；标示时至少 85%。'),('casavecchia','volturno','Local varietal wine; minimum 85% when named.','地方品种酒；标示时至少 85%。')],'it-campania')
profile('it-aglianico-del-vulture','Aglianico del Vulture','DOC / PDO',('Northern Basilicata Aglianico DOC, including still and red sparkling wines, separate from the Superiore DOCG.','Basilicata 北部 Aglianico DOC，含静止与红起泡，与 Superiore DOCG 分开。'),'''
history|vdclaw|Recognition|认可|DOC recognized in 1971.|1971 年认可 DOC。
history|vdglaw|Superiore separation|Superiore 独立|Aglianico del Vulture Superiore became a separate DOCG in 2010.|Aglianico del Vulture Superiore 于 2010 年成为独立 DOCG。
geography|vdclaw|Area|范围|Fifteen communes in Potenza province; three outlying Atella territories are excluded by the boundary clause.|Potenza 省十五市镇；边界条款排除 Atella 三块外飞地。
geography|vdclaw|Elevation|海拔|Eligible vineyards are between 200 and 700 m.|合资格葡萄园海拔 200–700 米。
climate|vdclaw|Season|季节|Summer dryness and substantial day–night variation coexist with rain risk during the late October–November harvest period.|夏季干燥及明显昼夜温差，与 10 月下旬至 11 月采收期降雨风险并存。
soils|vdclaw|Vulture substrate|Vulture 母质|Volcanic materials coexist with sedimentary formations. Porous tuff can retain water useful during the dry season.|火山物质与沉积岩层并存，多孔凝灰岩可保存旱季所需水分。
grapes|vdclaw|Legal identity|法定身份|The specification permits Aglianico del Vulture N. and/or Aglianico N.; the library links the Aglianico cultivar without inventing a second grape.|法规允许 Aglianico del Vulture N. 和／或 Aglianico N.；库内关联 Aglianico 品种，不另造第二品种。
viticulture|vdclaw|Yield and training|产量与架式|Maximum 10 t/ha; alberello and simple trellised systems are traditional references.|最高 10 t/ha；alberello 与简单篱架为传统架式参照。
law|vdclaw|Types|类型|Still red and red Spumante; Superiore belongs to the separate DOCG.|静止红与红 Spumante；Superiore 属另一 DOCG。
law|vdclaw|Analysis|指标|Minimum total alcohol 12.5%; still wine may range from dry to abboccato with residual sugar up to 10 g/L.|最低总酒精度 12.5%；静止酒可干至 abboccato，残糖最多 10 g/L。
vinification|vdclaw|Release|上市|Still DOC wine cannot be released before 1 September of the year after harvest.|静止 DOC 不得早于采收翌年 9 月 1 日上市。
vinification|vdclaw|Spumante|Spumante|Red sparkling wine uses bottle refermentation and at least nine months of processing; approved sweetness spans Brut to Extra Dry.|红起泡采用瓶中二发，制作期至少九个月；获准甜度从 Brut 至 Extra Dry。
service|vdclaw|Study comparison|学习对照|Compare the DOC and Superiore DOCG by yield, maturation and release dates before assessing producer extraction and oak choices.|比较 DOC、Superiore DOCG 时先核产量、熟成、上市日期，再判断酒庄萃取与橡木选择。
''',[('aglianico','vdclaw','Exclusive grape identity under the legal Aglianico wording.','法规 Aglianico 名称下的唯一葡萄身份。')],'it-basilicata')
profile('it-aglianico-del-vulture-superiore','Aglianico del Vulture Superiore','DOCG / PDO',('Still-red Aglianico DOCG with lower yields and longer compulsory maturation than the neighbouring DOC category.','静止红 Aglianico DOCG，产量更低，法定熟成长于相邻 DOC 类别。'),'''
history|vdglaw|Recognition|认可|DOCG established in 2010.|2010 年设 DOCG。
geography|vdglaw|Area|范围|The same fifteen-commune Vulture production zone in Potenza province, with the specified Atella exclusions.|Potenza 省同一十五市镇 Vulture 产区，保留指定 Atella 排除范围。
geography|vdglaw|Elevation|海拔|Eligible sites occupy the 200–700 m band.|合资格地块海拔 200–700 米。
soils|vdglaw|Substrate|母质|Volcanic materials and sedimentary layers create varied soils around Vulture; the DOCG is not one identical volcanic soil.|Vulture 周边火山物质与沉积层形成不同土壤，DOCG 并非单一相同火山土。
grapes|vdglaw|Variety|品种|Aglianico del Vulture N. and/or Aglianico N. in the legal text.|法规采用 Aglianico del Vulture N. 和／或 Aglianico N. 名称。
viticulture|vdglaw|Yield|产量|Maximum 8 t/ha, lower than the DOC’s 10 t/ha.|最高 8 t/ha，低于 DOC 的 10 t/ha。
law|vdglaw|Conversion|出酒率|Maximum conversion 65%, corresponding to 52 hl/ha at the maximum grape yield.|最高出酒率 65%，在最高葡萄产量下为 52 hl/ha。
law|vdglaw|Analysis|指标|Still red only; minimum total alcohol 13.5% and total acidity 4.5 g/L.|仅静止红，最低总酒精度 13.5%，总酸 4.5 g/L。
vinification|vdglaw|Superiore release|Superiore 上市|Not before 1 November of the third year after harvest; at least twelve months in wood and twelve months in bottle.|不得早于采收后第三年 11 月 1 日；至少十二个月木桶及十二个月瓶陈。
vinification|vdglaw|Riserva release|Riserva 上市|Not before 1 November of the fifth year after harvest; at least twenty-four months wood and twelve months bottle.|不得早于采收后第五年 11 月 1 日；至少二十四个月木桶及十二个月瓶陈。
producers|paternoster|Don Anselmo|Don Anselmo|Paternoster currently identifies Don Anselmo as Aglianico del Vulture Superiore DOCG. Historical DOC-labelled vintages must retain their original category.|Paternoster 当前将 Don Anselmo 标为 Aglianico del Vulture Superiore DOCG；历史 DOC 酒标年份应保留原分类。
service|vdglaw|Mature wine|成熟酒|Assess tannin, development and sediment before decanting; the compulsory maturation period does not itself guarantee peak drinking maturity.|醒酒前评估单宁、发展及沉淀；达到法定熟成年限不代表已在最佳适饮期。
''',[('aglianico','vdglaw','Exclusive grape identity.','唯一葡萄身份。')],'it-basilicata')
wg('it-aglianico-del-vulture-superiore','Don Anselmo Aglianico del Vulture Superiore DOCG','Paternoster','paternoster','Current producer designation; historical labels remain vintage-specific.','酒庄当前分类；历史酒标按年份保留。')
profile('it-matera','Matera','DOC / PDO',('Matera-province DOC with specified Sangiovese, Primitivo, Greco and international-variety blends across warmer southeastern Basilicata.','涵盖 Basilicata 东南部较暖区域的 Matera 省 DOC，规范 Sangiovese、Primitivo、Greco 及国际品种配比。'),'''
history|matlaw|Recognition|认可|DOC established in July 2005 and expanded in the 2011 specification.|2005 年 7 月设 DOC，2011 年规范扩展。
geography|matlaw|Scope|范围|The entire province of Matera, from inland hills to the Ionian coastal plain.|覆盖整个 Matera 省，从内陆丘陵至爱奥尼亚海岸平原。
geography|matlaw|Landforms|地貌|Metapontine coastal plain, marine terraces and Bradanic hills create several growing environments.|Metapontine 海岸平原、海成阶地、Bradanic 丘陵构成多个栽培环境。
climate|matlaw|Warm sectors|温暖地带|The Metapontine and Bradano sectors are among the warmest; summer drought is a defining constraint.|Metapontine、Bradano 地带较暖，夏季干旱为重要约束。
soils|matlaw|Sedimentary diversity|沉积多样性|Calcareous sands, conglomerates, marls and clays differ across the province; these are not all Vulture volcanic soils.|钙质砂、砾岩、泥灰岩及黏土在省内各异，并非全为 Vulture 火山土。
grapes|matlaw|Rosso|Rosso|Sangiovese at least 60%, Primitivo at least 30%, eligible red complements up to 10%.|Sangiovese 至少 60%，Primitivo 至少 30%，其他合资格红葡萄最多 10%。
grapes|matlaw|Moro|Moro|Cabernet Sauvignon at least 60%, Primitivo at least 20%, Merlot at least 10%; other eligible red grapes up to 10%.|Cabernet Sauvignon 至少 60%，Primitivo 至少 20%，Merlot 至少 10%；其他合资格红葡萄最多 10%。
grapes|matlaw|Primitivo and rosé|Primitivo 与桃红|Primitivo and Primitivo Passito require at least 90% Primitivo; Rosato also requires at least 90%.|Primitivo、Primitivo Passito 至少含 Primitivo 90%；Rosato 同样至少 90%。
grapes|matlaw|Greco|Greco|Named Greco requires at least 85% Greco.|标示 Greco 至少含 Greco 85%。
law|matlaw|Categories|类别|The denomination also provides white, white Passito and white/rosé sparkling categories alongside its specified reds.|除指定红酒外，亦设白酒、白 Passito、白及桃红起泡类型。
vinification|matlaw|Style families|风格系列|Still, sparkling and dried-grape styles require separate cellar practices and analysis; Moro is a blend category, not a grape name.|静止、起泡、干化葡萄风格须分别处理工艺及指标；Moro 为混酿类别，非葡萄名称。
service|matlaw|Study comparison|学习对照|Compare Rosso with Moro to assess the change from Sangiovese-led to Cabernet-led structure, keeping Primitivo’s role visible.|比较 Rosso 与 Moro，可研究 Sangiovese 主导至 Cabernet 主导的结构变化，并保留 Primitivo 作用。
''',[('sangiovese','matlaw','At least 60% Rosso.','Rosso 至少 60%。'),('zinfandel','matlaw','Primitivo local name; principal component of several types.','地方名称 Primitivo，多种类型的重要组成。'),('cabernet-sauvignon','matlaw','At least 60% Moro.','Moro 至少 60%。'),('merlot','matlaw','At least 10% Moro.','Moro 至少 10%。'),('greco','matlaw','At least 85% named Greco.','标示 Greco 至少 85%。')],'it-basilicata')
profile('it-terre-dellalta-val-dagri','Terre dell’Alta Val d’Agri','DOC / PDO',('Interior Potenza valley DOC structured around Merlot and Cabernet Sauvignon, with a distinctive Malvasia contribution to rosé.','Potenza 内陆河谷 DOC，以 Merlot、Cabernet Sauvignon 为骨架，桃红特别要求 Malvasia 组成。'),'''
history|agrilaw|Recognition|认可|DOC established in September 2003.|2003 年 9 月设 DOC。
geography|agrilaw|Communes|市镇|Viggiano, Grumento Nova and Moliterno in Potenza province.|Potenza 省 Viggiano、Grumento Nova、Moliterno。
climate|agrilaw|Season|季节|Interior valley conditions combine autumn/spring rain, dry summers and marked day–night temperature variation.|内陆河谷兼有秋春降雨、干燥夏季及明显昼夜温差。
grapes|agrilaw|Red|红酒|Merlot at least 50%, Cabernet Sauvignon at least 30%, eligible other red grapes up to 20%.|Merlot 至少 50%，Cabernet Sauvignon 至少 30%，其他合资格红葡萄最多 20%。
grapes|agrilaw|Rosé|桃红|Merlot at least 50%, Cabernet Sauvignon at least 20%, Malvasia di Basilicata at least 10%; permitted complements up to 20%.|Merlot 至少 50%，Cabernet Sauvignon 至少 20%，Malvasia di Basilicata 至少 10%；允许辅助最多 20%。
law|agrilaw|Categories|类别|Rosso, Rosso Riserva and Rosato; this DOC is distinct from Aglianico del Vulture.|Rosso、Rosso Riserva、Rosato；该 DOC 与 Aglianico del Vulture 不同。
vinification|agrilaw|Rosso maturation|Rosso 熟成|Minimum twelve months from 1 November of harvest year.|自采收年 11 月 1 日起至少十二个月。
vinification|agrilaw|Riserva maturation|Riserva 熟成|Minimum twenty-four months, including six months in wood.|至少二十四个月，其中六个月木桶。
service|agrilaw|Blend interpretation|配比理解|The rosé contains a compulsory white-grape contribution; its recipe must not be copied from the red blend.|桃红含强制白葡萄组成，不可照搬红酒配比。
''',[('merlot','agrilaw','At least 50% red and rosé.','红桃红至少 50%。'),('cabernet-sauvignon','agrilaw','At least 30% red, 20% rosé.','红至少 30%，桃红至少 20%。')],'it-basilicata')
save()
def quiz(rid,lines):
 r=R[rid]
 for n,line in enumerate(lines.strip().splitlines(),1):
  group,refs,qe,qz,ae,az=line.split('|');ss=refs.split(',')
  r['questions'].append({'id':f'{rid}-q{n:02d}','level':'foundation' if n<=10 else 'advanced','group':group,'q':bi(qe,qz),'a':bi(ae,az),'refs':ss})
  for s in ss:
   if not any(x['id']==s for x in r['sources']):r['sources'].append(S[s])
 assert len(r['questions'])==30,(rid,len(r['questions']))
quiz('it-abruzzo','''
place|abruzzo|Which sea borders Abruzzo’s eastern vineyards?|Abruzzo 东部葡萄园临哪片海？|The Adriatic Sea.|亚得里亚海。
place|abruzzo|Which two mountain massifs are major influences on Abruzzo’s vineyard landscape?|哪两座山体显著影响 Abruzzo 葡萄园地貌？|Gran Sasso and Majella.|Gran Sasso 与 Majella。
law|mdalaw|Which grape defines Montepulciano d’Abruzzo DOC?|哪种葡萄定义 Montepulciano d’Abruzzo DOC？|Montepulciano.|Montepulciano。
law|cdalaw|What colour/style is Cerasuolo d’Abruzzo DOC?|Cerasuolo d’Abruzzo DOC 属何酒色风格？|Rosé based on Montepulciano.|以 Montepulciano 为主的桃红。
law|tdalaw|Which two Trebbiano identities may supply the principal portion of Trebbiano d’Abruzzo?|Trebbiano d’Abruzzo 主组成允许哪两种 Trebbiano？|Trebbiano Abruzzese and Trebbiano Toscano.|Trebbiano Abruzzese、Trebbiano Toscano。
place|cococciola|Which Abruzzo province is particularly associated with Cococciola?|Abruzzo 哪个省特别关联 Cococciola？|Chieti.|Chieti。
place|montonico,montonico2|Which Teramo localities are core references for Montonico conservation?|Teramo 哪些地方是 Montonico 保育核心？|Bisenti and Cermignano.|Bisenti、Cermignano。
place|ctlaw|In which province is Colline Teramane Montepulciano d’Abruzzo DOCG?|Colline Teramane Montepulciano d’Abruzzo DOCG 位于哪省？|Teramo.|Teramo。
law|cdalaw|When did Cerasuolo d’Abruzzo become a separate DOC?|Cerasuolo d’Abruzzo 何时成为独立 DOC？|2010.|2010 年。
people|pepe|In which Abruzzo commune is Emidio Pepe based?|Emidio Pepe 位于 Abruzzo 哪个市镇？|Torano Nuovo in Teramo province.|Teramo 省 Torano Nuovo。
law|mdalaw|What is the minimum Montepulciano share in the basic Montepulciano d’Abruzzo DOC blend?|基础 Montepulciano d’Abruzzo DOC 最低 Montepulciano 比例？|85%.|85%。
law|ctlaw|What is the minimum Montepulciano share for Colline Teramane DOCG?|Colline Teramane DOCG 的最低 Montepulciano 比例？|90%.|90%。
law|ctlaw|Which grape may complete Colline Teramane’s blend, and to what maximum?|Colline Teramane 允许哪种辅助葡萄，最高多少？|Sangiovese, up to 10%.|Sangiovese，最多 10%。
law|tdalaw|What is the combined minimum for Trebbiano Abruzzese and/or Trebbiano Toscano in basic Trebbiano d’Abruzzo?|基础 Trebbiano d’Abruzzo 两种 Trebbiano 合计最低多少？|85%.|85%。
law|tdalaw|Does Trebbiano d’Abruzzo on a label guarantee 100% Trebbiano Abruzzese?|酒标 Trebbiano d’Abruzzo 是否保证 100% Trebbiano Abruzzese？|No. Trebbiano Toscano and authorized complements are permitted under the blend rules.|否，配比规范允许 Trebbiano Toscano 及合资格辅助葡萄。
law|ctlaw|What is the current protected name order following the 2023 Colline Teramane amendment?|2023 修订后 Colline Teramane 受保护名词序是什么？|Colline Teramane Montepulciano d’Abruzzo.|Colline Teramane Montepulciano d’Abruzzo。
law|caslaw,ablist|Which 2025 recognition makes an older claim of only two Abruzzo DOCGs obsolete?|2025 哪项认可使 Abruzzo 仅有两个 DOCG 的旧说法过时？|Casauria became an independent DOCG.|Casauria 成为独立 DOCG。
law|casauria,caslaw|How should a historical Montepulciano d’Abruzzo Casauria label be catalogued after the new DOCG?|新 DOCG 设立后，历史 Montepulciano d’Abruzzo Casauria 酒标如何入库？|Retain the vintage’s original legal label; do not retroactively relabel every old bottle Casauria DOCG.|保留该年份原法定酒标，不把所有老瓶追溯改为 Casauria DOCG。
law|cdalaw|What is Cerasuolo d’Abruzzo’s minimum Montepulciano proportion?|Cerasuolo d’Abruzzo 最低 Montepulciano 比例？|85%.|85%。
law|tdalaw|Name the four provincial Trebbiano d’Abruzzo subzones in the amended framework.|列出修订架构下四个省域 Trebbiano d’Abruzzo 子区。|Colline Pescaresi, Colline Teramane, Terre de L’Aquila and Terre di Chieti.|Colline Pescaresi、Colline Teramane、Terre de L’Aquila、Terre di Chieti。
place|abruzzo|Why is a single coastal climate description insufficient for Abruzzo?|为何单一海岸气候不能概括 Abruzzo？|Altitude, inland distance and the Gran Sasso–Majella mountain system create substantial differences from the Adriatic coastal hills.|海拔、距海距离及 Gran Sasso—Majella 山系使内陆与亚得里亚海丘陵明显不同。
place|mdalaw,tdalaw|Which sedimentary soil materials recur in Abruzzo’s hilly appellation descriptions?|Abruzzo 丘陵产区常见哪些沉积土壤物质？|Clay and marl, with proportions and texture varying by site.|黏土、泥灰岩，比例与质地因地块而异。
place|abruzzo|What is the pergola abruzzese?|什么是 pergola abruzzese？|A traditional overhead vine-training system associated with the region.|本区传统顶棚式葡萄架式。
place|montonico|Should Montonico be merged with Mantonico Bianco because the names resemble each other?|Montonico 是否应因名称近似而并入 Mantonico Bianco？|No. They remain distinct identities in the library.|否，库内保留不同身份。
law|abruzzodoc|Which broader DOC provides named Cococciola and Montonico wines?|哪个较广 DOC 设 Cococciola、Montonico 标示品种酒？|Abruzzo DOC.|Abruzzo DOC。
law|abruzzodoc|Name two other important local white-grape labels in Abruzzo DOC.|再列两种 Abruzzo DOC 重要地方白葡萄标示。|Pecorino and Passerina.|Pecorino、Passerina。
service|mdalaw,cdalaw|What cellar distinction separates Montepulciano red from Cerasuolo rosé despite a shared main grape?|共享主要葡萄时，Montepulciano 红与 Cerasuolo 桃红有何酒窖差别？|Skin contact and extraction differ, producing different colour, tannin and structure.|浸皮与萃取不同，形成不同酒色、单宁及结构。
service|cdalaw|Does Cerasuolo’s relatively deep rosé colour prove sweetness?|Cerasuolo 较深桃红色能否证明甜度高？|No. Colour does not determine residual sugar.|不能，颜色不决定残糖。
people|pepe,pepewines|Are Emidio Pepe’s cellar methods mandatory rules for every Abruzzo producer?|Emidio Pepe 酒窖方法是否强制适用于所有 Abruzzo 酒庄？|No. They are producer-specific practices, distinct from appellation requirements.|否，为酒庄实践，须与法定产区要求分开。
law|ablist|Besides Colline Teramane and Casauria, which named DOCG is in Abruzzo?|除 Colline Teramane、Casauria 外，Abruzzo 另有哪个 DOCG？|Tullum, also called Terre Tollesi.|Tullum，亦称 Terre Tollesi。
''')
quiz('it-molise','''
place|molise|What are Molise’s two provinces?|Molise 两个省是什么？|Campobasso and Isernia.|Campobasso、Isernia。
law|molise|Name Molise’s four DOC denominations in this framework.|列出本架构中 Molise 四个 DOC。|Biferno, Molise, Pentro di Isernia and Tintilia del Molise.|Biferno、Molise、Pentro di Isernia、Tintilia del Molise。
place|arsarp|Which recovered local red grape is a key Molise identity?|哪种复兴地方红葡萄是 Molise 重要身份？|Tintilia.|Tintilia。
law|tintlaw|When was Tintilia del Molise DOC recognized?|Tintilia del Molise DOC 何时认可？|2011.|2011 年。
place|biflaw|Which province contains Biferno DOC’s production area?|Biferno DOC 产区位于哪个省？|Campobasso.|Campobasso。
place|pentlaw|Which province contains Pentro di Isernia DOC?|Pentro di Isernia DOC 位于哪个省？|Isernia.|Isernia。
law|tintlaw|What are Tintilia del Molise’s three main wine types?|Tintilia del Molise 三种主要酒型是什么？|Rosso, Rosso Riserva and Rosato.|Rosso、Rosso Riserva、Rosato。
law|tintlaw|What is the minimum Tintilia content in Tintilia del Molise DOC?|Tintilia del Molise DOC 最低 Tintilia 含量？|95%.|95%。
people|norante|Name a producer with an officially documented 100% Tintilia wine.|列一个官方资料注明 100% Tintilia 酒款的酒庄。|Di Majo Norante.|Di Majo Norante。
service|arsarp|Which spice notes are useful references for Tintilia?|Tintilia 可参照哪些香料气息？|Pepper and clove, alongside fruit and structure.|胡椒、丁香，并结合果香与结构。
place|tintlaw|What is the minimum elevation for Tintilia del Molise vineyards?|Tintilia del Molise 葡萄园最低海拔？|200 m.|200 米。
law|tintlaw|What is Tintilia del Molise’s maximum grape yield?|Tintilia del Molise 葡萄最高产量？|8 t/ha.|8 t/ha。
law|tintlaw|What is the maximum grape-to-wine conversion for Tintilia Riserva?|Tintilia Riserva 最高出酒率？|55%.|55%。
law|tintlaw|What is the maximum conversion for ordinary Tintilia Rosso and Rosato?|普通 Tintilia Rosso、Rosato 最高出酒率？|70%.|70%。
law|biflaw|Give the main Biferno red/rosé proportions.|Biferno 红桃红主要配比是什么？|Montepulciano 70–80% and Aglianico 10–20%.|Montepulciano 70–80%，Aglianico 10–20%。
law|biflaw|Which grape forms 70–80% of Biferno Bianco?|Biferno Bianco 哪种葡萄占 70–80%？|Trebbiano Toscano.|Trebbiano Toscano。
law|pentlaw|What are the modern Pentro red/rosé principal proportions?|现代 Pentro 红桃红主要配比是什么？|Montepulciano 75–80% and Tintilia 20–25%.|Montepulciano 75–80%，Tintilia 20–25%。
law|pentlaw|Why should an old Sangiovese-led Pentro summary not be copied as the current rule?|为何不能把旧 Sangiovese 主导 Pentro 摘要复制为现行规则？|The 2014 consolidated specification uses Montepulciano and Tintilia and provided a vineyard transition period.|2014 汇总规范改用 Montepulciano、Tintilia，并设葡萄园过渡期。
law|pentlaw|From what date did Pentro’s ten-year vineyard adaptation period run?|Pentro 十年葡萄园调整期从何日开始？|1 August 2014.|2014 年 8 月 1 日。
law|pentlaw|What is the specified Falanghina share of Pentro Bianco?|Pentro Bianco 指定 Falanghina 比例？|80%.|80%。
law|pentlaw|What is Trebbiano Toscano’s range in Pentro Bianco?|Pentro Bianco 的 Trebbiano Toscano 比例范围？|15–20%.|15–20%。
law|pentlaw,camp|Does the legal name Falanghina alone establish the Beneventana or Flegrea genotype?|法规单写 Falanghina 是否足以确认 Beneventana 或 Flegrea 基因型？|No. The cultivar identity requires more specific evidence.|否，品种身份需更具体证据。
place|tintlaw|Which soil materials recur in Tintilia del Molise’s hill environment?|Tintilia del Molise 丘陵环境常见什么土壤物质？|Calcareous materials with sandy and clay components, varying by site.|钙质母质与砂、黏土组成，随地块变化。
place|arsarp|Which reproductive issue can limit Tintilia yields?|Tintilia 哪项结实问题可能限制产量？|Irregular fruit set and small/uneven berries can reduce production.|坐果不稳及小粒、不均匀果粒可能减产。
place|arsarp|Should Tintilia’s local adaptation be described as immunity to fungal disease?|Tintilia 地方适应性是否应写成免疫真菌病害？|No. Adaptation does not establish immunity; disease response needs specific evidence.|否，适应性不等于免疫，抗病表现需具体证据。
people|arsarp|Which early nineteenth-century author is cited in Tintilia’s Molise documentation?|Tintilia Molise 文献引用哪位十九世纪初作者？|Raffaele Pepe, in 1810.|Raffaele Pepe，1810 年。
people|cipressi|Which commune is associated with Claudio Cipressi’s Tintilia recovery work?|Claudio Cipressi Tintilia 保育工作关联哪个市镇？|San Felice del Molise.|San Felice del Molise。
law|norante,tintlaw|Does Di Majo Norante’s 100% Tintilia recipe mean the DOC requires 100%?|Di Majo Norante 的 100% Tintilia 是否表示 DOC 强制 100%？|No. The DOC minimum is 95%; the producer chooses 100%.|否，DOC 最低 95%，酒庄选择 100%。
service|arsarp|What structural traits should be assessed alongside Tintilia’s spice?|除 Tintilia 香料外须评估何种结构？|Acidity, phenolic grip and tannin balance.|酸度、酚类收敛及单宁平衡。
law|molise|Which two Molise IGT names complement the DOC framework?|哪两个 Molise IGT 名补充 DOC 架构？|Osco or Terre degli Osci, and Rotae.|Osco 或 Terre degli Osci，以及 Rotae。
''')
save()
quiz('it-campania','''
place|campwine|Name Campania’s five provinces/metropolitan areas.|列出 Campania 五个省／都会区。|Avellino, Benevento, Caserta, Naples and Salerno.|Avellino、Benevento、Caserta、Napoli、Salerno。
law|taurasilaw|Which grape is the principal component of Taurasi?|Taurasi 主要葡萄是什么？|Aglianico.|Aglianico。
law|grecolaw|Which grape defines Greco di Tufo?|哪种葡萄定义 Greco di Tufo？|Greco.|Greco。
law|fiano|Which grape defines Fiano di Avellino?|哪种葡萄定义 Fiano di Avellino？|Fiano.|Fiano。
place|sanniolaw|In which province is Falanghina del Sannio DOC?|Falanghina del Sannio DOC 位于哪省？|Benevento.|Benevento。
place|ischialaw|Which two grapes form the core of Ischia Bianco?|Ischia Bianco 哪两种葡萄为核心？|Forastera and Biancolella.|Forastera、Biancolella。
place|pied|Per’e Palummo is a local name for which grape?|Per’e Palummo 是哪种葡萄的地方名称？|Piedirosso.|Piedirosso。
place|asprinio,aspriniostudy|Which grape is associated with Aversa’s alberata training?|Aversa alberata 架式关联哪种葡萄？|Asprinio.|Asprinio。
place|amalfilaw|Name Costa d’Amalfi’s three subzones.|列出 Costa d’Amalfi 三个子区。|Furore, Ravello and Tramonti.|Furore、Ravello、Tramonti。
people|fiorduva|Who produces Furore Bianco Fiorduva?|谁酿造 Furore Bianco Fiorduva？|Marisa Cuomo.|Marisa Cuomo。
law|taurasilaw|What is Taurasi’s minimum Aglianico share?|Taurasi 最低 Aglianico 比例？|85%.|85%。
law|taurasilaw|What is standard Taurasi’s compulsory maturation, and when does the clock start?|普通 Taurasi 法定熟成多久，何时起算？|Three years including one year wood, from 1 December of harvest year.|三年含一年木桶，自采收年 12 月 1 日起算。
law|taurasilaw|What is Taurasi Riserva’s compulsory maturation?|Taurasi Riserva 法定熟成多久？|Four years including eighteen months wood.|四年含十八个月木桶。
law|grecolaw|Which grape may form up to 15% of Greco di Tufo?|哪种葡萄可占 Greco di Tufo 最多 15%？|Coda di Volpe Bianca.|Coda di Volpe Bianca。
place|grecolaw|How many communes comprise Greco di Tufo’s zone?|Greco di Tufo 产区含多少市镇？|Eight.|八个。
place|grecolaw|Which river is central to Greco di Tufo’s geography?|Greco di Tufo 地理核心河流是什么？|The Sabato.|Sabato 河。
law|grecolaw|What is still Greco di Tufo Riserva’s minimum ageing period and start date?|静止 Greco di Tufo Riserva 最低熟成与起算日？|Twelve months from 1 November of harvest year.|自采收年 11 月 1 日起十二个月。
law|grecolaw|Can Greco di Tufo Spumante use tank fermentation under the approved specification?|获准规范下 Greco di Tufo Spumante 可否罐式二发？|No. Traditional bottle fermentation is required.|不可，必须传统瓶中二发。
law|grecolaw|What are the minimum lees periods for Greco di Tufo Spumante and Spumante Riserva?|Greco di Tufo Spumante、Spumante Riserva 最低酒泥陈年多久？|Eighteen and thirty-six months respectively, from tirage.|自装瓶二发起分别十八、三十六个月。
law|fianolaw|When was the EU amendment adding Fiano di Avellino’s sparkling framework approved?|增加 Fiano di Avellino 起泡架构的欧盟修订何时批准？|June 2025, not the earlier proposal year.|2025 年 6 月，不是较早提案年份。
place|caprettone,camp|Should Caprettone be catalogued as Coda di Volpe?|Caprettone 是否应归作 Coda di Volpe？|No. Caprettone has a separate register identity.|否，Caprettone 有独立登记身份。
place|irp|Which cultivar identity is associated with Greco Musc’, and is it ordinary Greco?|Greco Musc’ 关联哪个品种，是否普通 Greco？|Roviello; it is distinct from Greco.|Roviello，与 Greco 不同。
place|camp,reg|Is the Sannio grape now registered as Camaiola the same as Piemonte Barbera?|Sannio 现登记为 Camaiola 的葡萄是否 Piemonte Barbera？|No. Historical Barbera del Sannio usage must not collapse it with Barbera.|否，历史 Barbera del Sannio 用名不可导致与 Barbera 合并。
people|fiorduva|What is Fiorduva’s stated three-grape blend?|Fiorduva 注明的三葡萄配比？|30% Fenile, 30% Ginestra and 40% Ripoli.|30% Fenile、30% Ginestra、40% Ripoli。
place|fiorduva|What geology and elevation does Marisa Cuomo report for Fiorduva sites?|Marisa Cuomo 注明 Fiorduva 地块何种地质与海拔？|Dolomitic limestone at 200–550 m.|白云质石灰岩，海拔 200–550 米。
place|flegrei|Which volcanic materials are relevant to Campi Flegrei soils?|Campi Flegrei 土壤关联哪些火山物质？|Tuff, ash, pumice and lapilli.|凝灰岩、火山灰、浮石、火山砾。
law|reg,veslaw|Does regional grape authorization automatically authorize a named varietal in every DOC?|大区允许栽培是否自动允许在所有 DOC 标示该品种？|No. Each denomination’s own specification controls its grape composition and named types.|否，各法定区规范单独控制配比与品种类型。
people|radici|Which two areas supply Mastroberardino’s Radici Taurasi?|Mastroberardino Radici Taurasi 来自哪两个地方？|Montemarano and Mirabella Eclano.|Montemarano、Mirabella Eclano。
place|sanniolaw|Name Falanghina del Sannio’s four subzones.|列出 Falanghina del Sannio 四个子区。|Guardia Sanframondi/Guardiolo, Sant’Agata dei Goti, Solopaca and Taburno.|Guardia Sanframondi／Guardiolo、Sant’Agata dei Goti、Solopaca、Taburno。
service|pied,camp|How does Piedirosso commonly compare structurally with Aglianico?|Piedirosso 与 Aglianico 通常有何结构差别？|Piedirosso commonly has a lighter tannic frame; blend, site and extraction still matter.|Piedirosso 单宁结构通常更轻，仍须考虑配比、地块与萃取。
''')
quiz('it-basilicata','''
place|vdclaw|Where within Basilicata is the Vulture wine area?|Vulture 酒区位于 Basilicata 何处？|Northern Basilicata, in Potenza province.|Basilicata 北部 Potenza 省。
place|vdclaw|What is Monte Vulture’s geological origin?|Monte Vulture 地质起源是什么？|An extinct volcanic complex.|死火山群。
law|vdclaw|Which grape defines Aglianico del Vulture?|哪种葡萄定义 Aglianico del Vulture？|Aglianico, including the specification’s Aglianico del Vulture wording.|Aglianico，含规范中 Aglianico del Vulture 名称。
law|vdglaw|Which Vulture designation is DOCG?|Vulture 哪个名称为 DOCG？|Aglianico del Vulture Superiore.|Aglianico del Vulture Superiore。
law|vdclaw|When was Aglianico del Vulture DOC recognized?|Aglianico del Vulture DOC 何时认可？|1971.|1971 年。
law|vdglaw|When was Aglianico del Vulture Superiore DOCG established?|Aglianico del Vulture Superiore DOCG 何时设立？|2010.|2010 年。
place|guarnaccino|Which commune is closely associated with Guarnaccino?|Guarnaccino 紧密关联哪个市镇？|Chiaromonte.|Chiaromonte。
law|agrilaw|Which two international varieties form Alta Val d’Agri’s red blend core?|Alta Val d’Agri 红酒以哪两种国际品种为核心？|Merlot and Cabernet Sauvignon.|Merlot、Cabernet Sauvignon。
people|paternoster|Who produces Don Anselmo?|谁酿造 Don Anselmo？|Paternoster.|Paternoster。
people|guarnaccino,grottewine|Which producer provides a direct Guarnaccino wine reference?|哪个酒庄提供直接 Guarnaccino 酒款参照？|600 Grotte.|600 Grotte。
place|vdclaw,vdglaw|What is the eligible elevation band for Vulture’s DOC and DOCG vineyards?|Vulture DOC、DOCG 葡萄园合资格海拔带？|200–700 m.|200–700 米。
place|vdclaw|How many communes are included, and what Atella qualification applies?|产区包括多少市镇，Atella 有何限制？|Fifteen communes; three outlying Atella territories are excluded.|十五市镇；排除 Atella 三块外飞地。
law|vdclaw,vdglaw|Compare maximum grape yields for Aglianico del Vulture DOC and Superiore DOCG.|比较 Vulture DOC、Superiore DOCG 葡萄最高产量。|10 t/ha for DOC and 8 t/ha for DOCG.|DOC 10 t/ha，DOCG 8 t/ha。
law|vdglaw|What is DOCG’s maximum conversion and corresponding wine yield at 8 t/ha?|DOCG 最高出酒率及 8 t/ha 下对应酒产量？|65%, giving 52 hl/ha.|65%，对应 52 hl/ha。
law|vdglaw|What is the earliest release for Aglianico del Vulture Superiore?|Aglianico del Vulture Superiore 最早上市日？|1 November of the third year after harvest.|采收后第三年 11 月 1 日。
law|vdglaw|What wood and bottle minima apply to ordinary Superiore?|普通 Superiore 最低木桶、瓶陈多久？|Twelve months wood and twelve months bottle.|十二个月木桶、十二个月瓶陈。
law|vdglaw|What is the earliest release for Superiore Riserva?|Superiore Riserva 最早上市日？|1 November of the fifth year after harvest.|采收后第五年 11 月 1 日。
law|vdglaw|What wood and bottle minima apply to Superiore Riserva?|Superiore Riserva 最低木桶、瓶陈多久？|Twenty-four months wood and twelve months bottle.|二十四个月木桶、十二个月瓶陈。
law|vdclaw,vdglaw|Which Vulture designation permits red sparkling wine?|哪个 Vulture 名称允许红起泡？|Aglianico del Vulture DOC; the Superiore DOCG is still red only.|Aglianico del Vulture DOC；Superiore DOCG 仅静止红。
law|vdclaw|What is the minimum processing period for Vulture DOC Spumante?|Vulture DOC Spumante 最低制作期多久？|Nine months, with bottle refermentation.|九个月，采用瓶中二发。
law|vdclaw|When may still Aglianico del Vulture DOC first be released?|静止 Aglianico del Vulture DOC 最早何时上市？|1 September of the year after harvest.|采收翌年 9 月 1 日。
place|vdclaw|Why is autumn weather particularly important for Vulture Aglianico?|为何秋季天气对 Vulture Aglianico 特别重要？|Late ripening carries harvest into late October or November, when rain can affect fruit condition and picking decisions.|晚熟使采收延至十月下旬或十一月，降雨影响果况与采收决策。
place|vdclaw|How can porous tuff help vineyards during summer dryness?|多孔凝灰岩如何帮助葡萄园应对夏旱？|It can retain water and release it gradually to the rooting zone.|可保水并逐步供给根区。
place|matlaw|Why should Matera’s soils not be described simply as Vulture volcanic soils?|为何不可把 Matera 土壤简单写成 Vulture 火山土？|Matera includes sedimentary plains, terraces and hills with calcareous sands, conglomerates, marls and clays.|Matera 包含沉积平原、阶地、丘陵，有钙质砂、砾岩、泥灰岩及黏土。
law|matlaw|What are Matera Rosso’s main grape minima?|Matera Rosso 主要葡萄最低比例？|Sangiovese 60% and Primitivo 30%.|Sangiovese 60%，Primitivo 30%。
law|matlaw|What are Matera Moro’s three principal grape minima?|Matera Moro 三种主要葡萄最低比例？|Cabernet Sauvignon 60%, Primitivo 20%, Merlot 10%.|Cabernet Sauvignon 60%，Primitivo 20%，Merlot 10%。
law|agrilaw|What are Terre dell’Alta Val d’Agri red wine’s main minima?|Terre dell’Alta Val d’Agri 红酒主要葡萄最低比例？|Merlot 50% and Cabernet Sauvignon 30%.|Merlot 50%，Cabernet Sauvignon 30%。
law|agrilaw|Which white grape must contribute at least 10% to Alta Val d’Agri Rosato?|Alta Val d’Agri Rosato 必须至少含 10% 哪种白葡萄？|Malvasia di Basilicata.|Malvasia di Basilicata。
place|agrilaw|Name the three communes of Terre dell’Alta Val d’Agri DOC.|列出 Terre dell’Alta Val d’Agri DOC 三个市镇。|Viggiano, Grumento Nova and Moliterno.|Viggiano、Grumento Nova、Moliterno。
people|paternoster|How should older DOC-labelled Don Anselmo vintages be catalogued despite the current DOCG listing?|当前列 DOCG 时，旧 DOC 酒标 Don Anselmo 年份应如何入库？|Retain each bottle’s original vintage-specific designation rather than retroactively assigning DOCG.|保留每瓶该年份原分类，不追溯改为 DOCG。
''')
save()
# Additional legal depth recovered from the Ministry's consolidated text.
src('fianofull','MASAF · Fiano di Avellino consolidated 2025 specification (document copy)','https://accademiavino.it/sites/default/files/disciplinari/Fiano%20di%20Avellino.pdf')
def extra(rid,lines):
 r=R[rid]
 for line in lines.strip().splitlines():
  sid,refs,le,lz,en,zh=line.split('|');ss=refs.split(',')
  s=next((s for s in r['sections'] if s['id']==sid),None)
  if s is None:
   s={'id':sid,'title':TT[sid],'rows':[],'refs':[]};r['sections'].append(s)
  s['rows'].append(row(le,lz,en,zh));s['refs']=list(dict.fromkeys(s['refs']+ss))
  for key in ss:
   if not any(x['id']==key for x in r['sources']):r['sources'].append(S[key])
extra('it-fiano-di-avellino','''
soils|fianofull|Substrate|母质|Ash and pumice deposits overlie clays or marls in parts of the area; sandstone, limestone, alluvial and detrital formations also occur.|部分地带灰、浮石覆盖黏土或泥灰岩；另有砂岩、石灰岩、冲积及碎屑层。
climate|fianofull|Inland conditions|内陆条件|Cold winters, spring frost risk, pronounced summer day–night variation and predominantly autumn/winter rainfall distinguish the inland hills.|寒冷冬季、春霜风险、明显夏季昼夜温差及秋冬为主降雨，构成内陆丘陵特征。
viticulture|fianofull|Planting and yield|种植与产量|New and replanted vineyards require vertical training and at least 2,500 vines/ha; maximum grape yield is 10 t/ha.|新植、重植园须垂直架式、至少 2,500 株/ha；葡萄最高 10 t/ha。
viticulture|fianofull|Site and irrigation|地块与灌溉|Well-exposed hills are eligible; humid or poorly sunny valley floors are excluded. Emergency irrigation is allowed.|允许朝向良好丘陵，排除潮湿或日照不足谷底；允许应急灌溉。
vinification|fianofull|Still Riserva|静止 Riserva|At least twelve months from 1 November of harvest year.|自采收年 11 月 1 日起至少十二个月。
vinification|fianofull|Sparkling maturation|起泡熟成|Bottle fermentation only; Spumante requires at least eighteen months from tirage, Spumante Riserva thirty-six months.|仅瓶中二发；Spumante 自装瓶二发起至少十八个月，Spumante Riserva 三十六个月。
law|fianofull|Analysis|指标|Still wine requires total acidity at least 5 g/L and alcohol 11.5%, or 12% for Riserva. Sparkling requires acidity 6 g/L and alcohol 12%.|静止总酸至少 5 g/L、总酒精度 11.5%，Riserva 12%；起泡总酸 6 g/L、总酒精度 12%。
law|fianofull|Apianum|Apianum|The traditional mention Apianum is permitted; it does not replace the protected denomination.|允许传统标示 Apianum，但不可取代受保护产区名。
''')
extra('it-terre-dellalta-val-dagri','''
geography|agrilaw|Elevation|海拔|Vineyards may be planted up to 800 m; the geographic link describes typical vineyards between 600 and 800 m.|葡萄园允许至 800 米；地理关联章节描述典型葡萄园在 600–800 米。
soils|agrilaw|Valley formation|河谷形成|The intermontane valley has Pleistocene lake deposits overlain by recent alluvium; silty-sandy and silty-clay textures with stony material recur.|山间谷地含更新世湖相沉积及较新冲积覆盖，常见含石的粉砂—砂质、粉砂—黏质土。
viticulture|agrilaw|Density and training|密度与架式|New/replanted vineyards require at least 3,000 vines/ha. Simple trellising is the reference; pergola and tendone are excluded from alternative approvals.|新植、重植至少 3,000 株/ha，以简单篱架为参照；其他架式审批排除 pergola、tendone。
viticulture|agrilaw|Yield|产量|Maximum 12 t/ha for all three types.|三个类型均最高 12 t/ha。
law|agrilaw|Conversion|出酒率|Maximum wine conversion 70%, equivalent to 84 hl/ha at the yield limit.|最高出酒率 70%，产量上限下相当于 84 hl/ha。
vinification|agrilaw|Rosé release|桃红上市|Rosato is released after 1 March of the year following harvest.|Rosato 于采收翌年 3 月 1 日之后上市。
''')
# Preserve precise legal start-date language.
for s in R['it-terre-dellalta-val-dagri']['sections']:
 for rr in s['rows']:
  if rr['label']['en']=='Rosso maturation':rr['body']=bi('At least twelve months from 1 November following the harvest.','自采收后 11 月 1 日起至少十二个月。')
  if rr['label']['en']=='Riserva maturation':rr['body']=bi('At least twenty-four months, including six months in wood, from 1 November following the harvest.','自采收后 11 月 1 日起至少二十四个月，其中六个月木桶。')
# Source-identified cultivar photographs only.
for gid,key,url,credit in [
 ('piedirosso','pied','https://www.vivairauscedo.com/wp-content/uploads/2020/12/PIEDIROSSO-VCR-147.jpg','Vivai Cooperativi Rauscedo · Piedirosso VCR147'),
 ('coda-di-volpe','coda','https://www.vivairauscedo.com/wp-content/uploads/2021/02/CODA-DI-VOLPE-2.jpg','Vivai Cooperativi Rauscedo · Coda di Volpe')]:
 g=next(g for g in B['grapes'] if g['id']==gid)
 g.update(imageUrl=url,originalImageUrl=url,imageCredit=credit,imageSourceUrl=S[key]['url'])
# Reciprocal region associations for both existing and new cultivar records.
new={g['id']:g for g in B['grapes']};eng={e['id']:e for e in B['translations']};updates={}
for r in B['regions']:
 for link in r['grapes']:
  gid=link['grapeId'];region={'name':r['name'],'country':'Italy','note':link['role']['zh'],'enNote':link['role']['en']}
  refs=[next(s for s in r['sources'] if s['id']==ref) for ref in link['sourceIds']]
  if gid in new:
   g=new[gid];e=eng[gid]
   if not any(v['name']==r['name'] for v in g['regions']):
    g['regions'].append({k:v for k,v in region.items() if k!='enNote'});e['regions'].append({'name':r['name'],'note':region['enNote']})
   for ref in refs:
    if not any(s['url']==ref['url'] for s in g['sources']):g['sources'].append({'title':ref['title'],'url':ref['url']})
  else:
   u=updates.setdefault(gid,{'id':gid,'countriesAdd':['Italy'],'aliasesAdd':[],'regionsAdd':[],'sourcesAdd':[]})
   if not any(v['name']==r['name'] for v in u['regionsAdd']):u['regionsAdd'].append(region)
   for ref in refs:
    if not any(s['url']==ref['url'] for s in u['sourcesAdd']):u['sourcesAdd'].append({'title':ref['title'],'url':ref['url']})
B['existingUpdates']=list(updates.values())
for id,issue,result,refs in [
 ('taurasi-ageing','Some promotional summaries use 1 January after harvest.','Approved 2020 Taurasi specification starts ageing on 1 December of harvest year.',['taurasilaw']),
 ('pentro-blend','Old overview prose retains a Sangiovese-led Pentro blend.','Use the 2014 law: Montepulciano 75–80%, Tintilia 20–25%; the ten-year vineyard transition began 1 August 2014.',['pentlaw']),
 ('greco-sparkling','Promotional FAQ descriptions can imply tank fermentation or one uniform lees minimum.','Approved law requires traditional bottle fermentation: 18 months Spumante, 36 months Spumante Riserva.',['grecolaw']),
 ('fiano-approval','A proposal date was liable to be confused with EU approval.','Union amendment approved June 2025; consolidated law now includes traditional-method sparkling and Riserva.',['fianolaw','fianofull']),
 ('vesuvio-2025','Older summaries omit the expanded categories and updated composition.','Use the consolidated specification incorporating EU 2025/1903.',['veslaw']),
 ('casauria-docg','Old Abruzzo counts and subzone maps omit independent Casauria.','Casauria became an independent DOCG in 2025; retain original denomination for historic bottles.',['caslaw','casauria']),
 ('camaiola-identity','Historical Barbera del Sannio usage could be mistaken for Piemonte Barbera.','Camaiola remains a distinct cultivar in this batch.',['camp','reg']),
 ('forastera-identity','A new Spain record named Forastera Blanca might be conflated with Ischia Forastera.','Ischia Forastera remains distinct; no canonical synonym merge was justified.',['camp','ischialaw'])]:
 B['corrections'].append({'id':id,'issue':issue,'resolution':result,'sourceUrls':[S[s]['url'] for s in refs]})
B['evidence'].append({'batch':'italy-south','reviewed':'2026-10-26','scope':['Abruzzo','Molise','Campania','Basilicata'],'newGrapes':25,'regionDossiers':26,'administrativeRegionDossiers':4,'selectedDenominationDossiers':22,'bilingualReviewQuestions':120,'identityPolicy':'Existing 732-grape baseline checked; 25 new canonical identities retained. Pecorino and Passerina are owned by the central Italy batch. Unknown parents and unresolved local-name identities are not invented.','coverage':'Selected primary-source dossiers; not a claim of exhaustive grape-register or all-denomination coverage.','sourceUrls':list(dict.fromkeys(s['url'] for s in S.values()))})
B['unresolved'].append({'name':'Pentro Riserva release chronology','status':'needs control-body clarification','reason':'The consolidated text describes four years maturation including two years oak and six months bottle, but a separate earliest-release statement appears inconsistent. Do not derive an exact release date until clarified.','sourceUrls':[S['pentlaw']['url']]})
for r in B['regions']:
 r['coverage']=bi('Primary-source regional overview and selected linked denominations; this is not an exhaustive inventory of every authorized grape or wine designation.','依据一手资料的区域概览与精选关联产区，非所有获准葡萄或葡萄酒名称的穷尽清单。')
 # Stable conventional reading order, independent of enrichment order.
 order=list(TT)
 r['sections'].sort(key=lambda s:order.index(s['id']))
save()
B['unresolved'].extend([
 {'name':'Guarnaccia (Ischia DOC)','status':'identity verification before canonical addition','reason':'Mandatory 40–50% component of basic Ischia Rosso. Do not merge with similarly named mainland grapes or Grenache without register/genetic evidence.','sourceUrls':[S['ischialaw']['url']]},
 {'name':'Malvasia di Basilicata','status':'identity verification before canonical addition','reason':'Mandatory minimum 10% of Terre dell’Alta Val d’Agri Rosato. No unverified merge with Malvasia Bianca Lunga or another Malvasia.','sourceUrls':[S['agrilaw']['url']]}
])
save()

print(json.dumps({k:len(v) for k,v in B.items()}))
