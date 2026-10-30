import json,re,unicodedata,pathlib
D=pathlib.Path(__file__).parent;OUT=D/'northeast.json';DATE='2026-10-26'
B={k:[] for k in ['grapes','translations','existingUpdates','regions','wines','evidence','unresolved','corrections']}
def bi(en,zh):return {'en':en,'zh':zh}
def pair(s):return s.split('~',1)
def slug(s):return re.sub('[^a-z0-9]+','-',unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower()).strip('-')
def save():OUT.write_text(json.dumps(B,ensure_ascii=False,indent=2)+'\n')
def grape(name,color,area,url,origin,vit,vin,taste,identity,aliases='',parents='',ped='',typ='unknown'):
 id=slug(name); o,v,w,t,c=map(pair,[origin,vit,vin,taste,identity]);p=pair(ped) if ped else ['The cited source does not establish complete parentage.','所引资料未确立完整亲本关系。'];a=aliases.split('|') if aliases else []
 en={'id':id,'origin':o[0],'summary':o[0]+' '+t[0],'viticulture':v[0],'winemaking':w[0],'taste':t[0],'geneticsNote':p[0],'confusions':c[0],'aliases':[{'name':x,'context':'Documented local or historical name.'} for x in a],'regions':[{'name':area,'note':o[0]}],'species':'Vitis vinifera','originCountry':'Italy'}
 g={'id':id,'name':name,'zh':name,'color':color,'countries':['Italy'],'origin':o[1],'summary':o[1]+t[1],'viticulture':v[1],'winemaking':w[1],'taste':t[1],'confusions':c[1],'aliases':[{'name':x,'context':'文献记录的地方或历史名称。'} for x in a],'regions':[{'name':area,'country':'Italy','note':o[1]}],'genetics':{'type':typ,'parents':parents.split('|') if parents else [],'note':p[1]},'sources':[{'title':('VCR' if 'vivairauscedo' in url else 'ERSA FVG' if 'ersa.fvg' in url else 'Regione Emilia-Romagna' if 'regione.emilia' in url else 'Primary technical source')+' · '+name,'url':url}],'reviewed':DATE,'editorialBatch':'italy-northeast','referenceRows':[]}
 for section,label,texts in [('origin',('Origin & history','起源与历史'),o),('parentage',('Parentage','亲本'),p),('viticulture',('Cultivation & phenology','栽培与物候'),v),('vinification',('Winemaking','酿造'),w),('tasting',('Tasting profile','品鉴特征'),t),('similar',('Identity','品种区分'),c)]:g['referenceRows'].append({'section':section,'label':bi(*label),'text':bi(*texts),'sourceUrls':[url]})
 B['grapes'].append(g);B['translations'].append(en);save()
V='https://www.vivairauscedo.com/scheda-prodotto/'
# Primary VCR sheets were read in the retained research session; exact URLs and facts restored.
VCR=[
('Ancellotta','red','Emilia-Romagna','Grown especially in Emilia, also Veneto, Friuli and lower Trentino.~主要种植于 Emilia，也见于 Veneto、Friuli 与 Trentino 南部。','Early-medium budding, medium-late ripening; vigorous, with small berries and coloured pulp. Cold wet flowering can cause coulure.~中早萌芽、中晚成熟；长势强、小果粒、果肉带色，冷湿花期易落花。','A colour component in Lambrusco blends; varietal wines also exist.~为 Lambrusco 混酿提供颜色，也有单品种酒。','Deep colour and stable anthocyanins; moderate alcohol.~颜色深、花色苷稳定，酒精适中。','Not itself a Lambrusco variety.~本身不是 Lambrusco 品种。',''),
('Durella','white','Veneto','Native to the Vicenza hills, with cultivation in adjoining Verona.~源自 Vicenza 丘陵，也种植于邻近 Verona。','Late budding, vigorous, thick-skinned; suited to expanded training and long pruning.~晚萌芽、长势强、厚皮，适合展开架形及长梢修剪。','High acidity suits sparkling production in the Lessini area.~高酸适合 Lessini 地区起泡酒生产。','Lightly perfumed, high-acid white with moderate alcohol.~香气细致、高酸、酒精适中的白酒。','Durella is the grape; Durello appears in wine names.~Durella 是品种，Durello 见于酒名。',''),
('Fortana','red','Emilia-Romagna','Traditional Emilia-Romagna grape, particularly adapted to Adriatic coastal sands.~Emilia-Romagna 传统品种，尤其适应亚得里亚海海岸沙土。','Late budding, vigorous and hardy; large bunches and berries. Medium pruning suits sandy sites.~晚萌芽、长势强、适应性好，大穗大粒；沙地可中梢修剪。','Local reds and frizzante; permitted supporting roles in some Lambrusco blends.~用于本地红酒及微起泡，也在部分 Lambrusco 混酿中辅助。','Fresh, savoury, clearly acidic and tannic, usually modest in alcohol.~清新、咸鲜、酸及单宁明显，酒精通常较低。','Not a Lambrusco synonym; Bosco Eliceo is a denomination.~不是 Lambrusco 同义名；Bosco Eliceo 是产区。',''),
('Glera Lunga','white','Veneto','Historic Conegliano-Valdobbiadene material preserved through clonal selection.~Conegliano-Valdobbiadene 历史材料，通过克隆选择保留。','Early budding, medium-late ripening; elongated berries. Sensitive to drought, winter cold and mildew; long pruning.~早萌芽、中晚熟、长果粒；对干旱、冬寒和霉菌病敏感，宜长梢。','A complementary variety in Glera-led sparkling blends.~Glera 起泡混酿中的辅助品种。','Persistent acidity, structure and vegetal nuances.~酸度持久、有结构及植物气息。','Separate from Glera; the historical tondo/lungo distinction is material.~与 Glera 不同，历史 tondo／lungo 区分不能抹去。','Prosecco Lungo'),
('Lambrusco Maestri','red','Emilia-Romagna','Especially associated with Reggio Emilia and Parma.~尤其与 Reggio Emilia、Parma 联系。','Very vigorous and fertile; medium-late ripening, favours moisture-retaining soils and medium-long pruning.~长势及结实力强，中晚熟，适合保水土及中长梢。','Dry or sweeter frizzante and local Lambrusco blends.~用于干型或带甜微起泡及本地 Lambrusco 混酿。','Deep colour, freshness and body.~色深、清新、有酒体。','Maestri and Marani are separate varieties.~Maestri 与 Marani 为不同品种。',''),
('Lambrusco Marani','red','Emilia-Romagna','Traditional in Reggio Emilia and Modena.~传统种植于 Reggio Emilia 与 Modena。','Medium budding, medium-late ripening; vigorous, productive; susceptible to green shot berries and phytoplasmas.~中期萌芽、中晚熟，长势强且丰产，易青粒及植原体病害。','Commonly blended for local red frizzante.~常混酿本地红色微起泡酒。','Ruby, fragrant, fresh and savoury.~宝石红、芳香、清新鲜活。','Distinct from Lambrusco Maestri and Salamino.~不同于 Lambrusco Maestri、Salamino。',''),
('Lambrusco Viadanese','red','Emilia-Romagna','Principally linked to Mantova, also used in Emilia blends.~主要与 Mantova 联系，也用于 Emilia 混酿。','Medium budding, medium-late ripening; compact bunches, thick skins, deep fertile soils preferred; phytoplasma susceptibility.~中期萌芽、中晚熟、紧穗厚皮，偏好深厚肥沃土，对植原体病敏感。','Local Lambrusco blends and frizzante reds.~用于本地 Lambrusco 混酿及红色微起泡。','Good aromatic intensity and acidity, moderate alcohol.~香气与酸度良好，酒精适中。','Distinct from Maestri and Sorbara.~不同于 Maestri、Sorbara。',''),
('Manzoni Bianco','white','Veneto','Luigi Manzoni crossing selected at Conegliano in the 1930s; number 6.0.13.~1930 年代 Luigi Manzoni 在 Conegliano 选育，编号 6.0.13。','Limited vigour, medium-early ripening, small thick-skinned berries and relative bunch-rot tolerance.~长势有限、中早熟、小粒厚皮，相对耐穗腐。','Still whites and sparkling bases; Guyot or spur cordon are suitable.~用于静止白酒及起泡基酒，适用 Guyot 或短梢水平蔓。','Fresh, structured, fine floral and restrained fruit character.~清新、有结构、细花香与克制果香。','A vinifera crossing, not an interspecific resistant hybrid.~欧亚种内杂交，并非种间抗病杂交。','Incrocio Manzoni 6.0.13'),
('Marzemino','red','Trentino','Origin uncertain; strongly associated with Vallagarina, also Veneto and Lombardia.~起源未定，与 Vallagarina 紧密相关，也见于 Veneto、Lombardia。','Medium-early budding, medium ripening, very vigorous; sensitive to powdery mildew and sour rot.~中早萌芽、中期熟、长势很强，对白粉病与酸腐敏感。','Dry varietal reds and passito; extended maceration increases structure.~单品种干红及风干酒，延长浸渍可增加结构。','Ruby-purple, fruit, violet and a bitter nuance.~宝石红至紫红，果香、紫罗兰及微苦。','Historical names containing Marzemino do not prove genetic identity.~含 Marzemino 的历史名称不能自动证明遗传同一。',''),
('Ortrugo','white','Emilia-Romagna','Long-established in Piacenza.~Piacenza 历史品种。','Medium budding and ripening; productive, compact large bunches; botrytis, sour rot and magnesium deficiency risks.~萌芽成熟均居中，丰产、大紧穗；须注意灰霉、酸腐与缺镁。','Still, frizzante and spumante; Guyot is suitable.~可酿静止、微起泡及起泡，Guyot 适用。','Straw-coloured, lightly scented, moderate body.~稻草黄、香气较淡、酒体适中。','Not the Malvasia grown in the same district.~不是同地区的 Malvasia。',''),
('Raboso Piave','red','Veneto','Traditional in Treviso and Padova; called Friularo around Bagnoli-Conselve.~传统种植于 Treviso、Padova，Bagnoli-Conselve 称 Friularo。','Early budding, late ripening, vigorous and productive; spring frost and powdery mildew risks.~早萌芽、晚熟、长势强且丰产，有春霜及白粉病风险。','Ageworthy reds and blending for acid, colour and tannin.~用于有陈年力红酒，亦为混酿提供酸、色及单宁。','Deep colour, high acidity and tannin; sour-cherry fruit at ripeness.~色深、高酸高单宁，成熟时有酸樱桃。','Distinct from Raboso Veronese; Friularo is not Friulano.~不同于 Raboso Veronese；Friularo 不是 Friulano。','Friularo'),
('Verdiso','white','Veneto','Grown in the Conegliano and Valdobbiadene hills.~种植于 Conegliano、Valdobbiadene 丘陵。','Medium vigour and soft skins; prefers exposed hillside sites and long pruning.~中等长势、软皮，喜向阳丘陵与长梢。','Glera blends and Torchiato di Fregona.~用于 Glera 混酿及 Torchiato di Fregona。','Fresh, delicately perfumed and savoury.~清新、细致芳香、鲜活。','Verdiso and Verduzzo are separate grapes.~Verdiso 与 Verduzzo 是不同品种。',''),
('Verduzzo Friulano','white','Friuli-Venezia Giulia','Probably native to Friuli, also grown in adjoining Veneto.~可能原生 Friuli，也种植于邻近 Veneto。','Medium budding, medium-late ripening; thick skins relatively resist botrytis. Good exposure and medium-long pruning.~中期萌芽、中晚熟，厚皮相对耐灰霉；需好光照及中长梢。','Dry plains whites and sweet hillside wines; Ramandolo is the sweet reference.~可酿平原干白、丘陵甜酒，Ramandolo 为甜酒参照。','Structured and sometimes tannic, with honey and apricot in ripe sweet styles.~有结构，有时单宁明显；成熟甜酒有蜂蜜及杏脯。','Not Verduzzo Trevigiano; Verduzzo Giallo refers to Friulano material.~不是 Verduzzo Trevigiano；Verduzzo Giallo 指 Friulano 材料。','Verduzzo Giallo'),
('Verduzzo Trevigiano','white','Veneto','Grown on eastern Veneto plains.~种植于 Veneto 东部平原。','Vigorous, productive, thin-skinned; deep clay-rich soils, expanded training and long pruning.~长势强、丰产、薄皮，适用深厚含黏土土壤、展开架形及长梢。','Fresh white wine and blending component.~用于清新白酒或混酿。','Light aroma, moderate alcohol and good fixed acidity.~香气较淡、酒精适中、固定酸良好。','Distinct from Verduzzo Friulano; not the Ramandolo grape.~不同于 Verduzzo Friulano，不是 Ramandolo 品种。','')]
for n,c,a,o,v,w,t,i,als in VCR:
 kw={'parents':'Riesling|Pinot Blanc','ped':'VCR records Riesling × Pinot Blanc.~VCR 记录 Riesling × Pinot Blanc。','typ':'bred-cross'} if n=='Manzoni Bianco' else {}
 grape(n,c,a,V+slug(n)+'/',o,v,w,t,i,als,**kw)
E='https://agricoltura.regione.emilia-romagna.it/produzioni-agroalimentari/agricoltura-sostenibile/agrobiodiversita/schede-specie-vegetali/vite/'
ER=[
('Centesimino','red','centesimino','Savignôn Rosso','Recovered around Oriolo and Faenza through Pietro Pianori, nicknamed Centesimino, in the twentieth century.~20 世纪由绰号 Centesimino 的 Pietro Pianori 在 Oriolo、Faenza 一带恢复。','Buds after Sangiovese; locally harvested late September. Fertile, vigorous and susceptible to downy mildew.~萌芽晚于 Sangiovese，本地九月下旬采；结实力与长势强，易霜霉病。','Still, frizzante and passito documented.~有静止、微起泡及风干酒。','Rose, violet and orange blossom despite neutral-tasting berries.~果粒味道中性，酒却有玫瑰、紫罗兰及橙花。','Neither Alicante nor a red Sauvignon mutation.~既非 Alicante，也非 Sauvignon 的红色变异。'),
('Famoso','white','famoso','Rambella|Uva Rambella','Historic Romagna grape recovered especially around Ravenna and Forlì.~Romagna 历史品种，尤其在 Ravenna、Forlì 恢复。','Vigorous and productive; poor hillsides reduce yields and enhance aroma; moderate mildew sensitivity.~强势丰产，贫瘠丘陵可减产增香，对霉菌病中等敏感。','Aromatic dry whites; historically also a table grape.~芳香干白，历史上兼鲜食。','Muscat-like flowers, stone fruit, citrus and sage; moderate acid.~类似 Muscat 花香、核果、柑橘及鼠尾草，中酸。','Distinguish Famoso di Cesena from historical Famoso di Pesaro.~须区分 Famoso di Cesena 与历史 Famoso di Pesaro。'),
('Fogarina','red','fogarina','','Gualtieri and the Reggio Emilia low plains.~Gualtieri 及 Reggio Emilia 低平原。','Very late October ripening, historically November; moderate-low vigour, thick skins.~十月极晚熟，历史有十一月采；中低长势、厚皮。','Local red and passito wines.~本地红酒与风干酒。','Currant, cherry, flowers and spice, moderate body and astringency.~醋栗、樱桃、花与香料，中等酒体和涩感。','A separate grape from the Lambruschi in Reggiano.~与 Reggiano 各 Lambrusco 分开。'),
('Lambrusco Barghi','red','barghi','','Local Reggio Emilia variety.~Reggio Emilia 地方品种。','Early April budding, late September maturity locally; vigorous, reliably productive, thick-skinned.~当地四月初萌芽、九月下旬熟，长势强、产量稳定、厚皮。','Local Lambrusco wines and Reggiano blends.~用于本地 Lambrusco 及 Reggiano 混酿。','Ruby-violet, blackberry, raspberry, cherry and spice; limited astringency.~红紫色、黑莓、覆盆子、樱桃和香料，涩感较轻。','Distinct Lambrusco identity, not a name for Reggiano generally.~独立 Lambrusco 身份，不是 Reggiano 统称。'),
('Lambrusco Benetti','red','lambrusco-benetti','','Conserved around Campogalliano and Carpi, Modena.~保育于 Modena 的 Campogalliano、Carpi。','Buds before Sorbara, ripens early October; basal fertility supports short pruning; drought-sensitive.~萌芽早于 Sorbara，十月初熟；基部结实好可短梢，不耐旱。','Conservation vinifications; DOC eligibility must be separately established.~有保育酿造，具体 DOC 资格须独立确认。','Ruby and floral with noticeable acidity and some bitterness.~宝石红、花香，酸度明显且略苦。','Not Lambrusco Salamino.~不是 Lambrusco Salamino。'),
('Lambrusco del Pellegrino','red','lambrusco-di-fiorano','Lambrusco di Fiorano|Lambruscone|Lambrusco Oliva Grosso','Historical Modena foothill grape; nationally registered in 2016.~Modena 山麓历史品种，2016 年进入国家名录。','Medium-late budding, late harvest; berries detach readily and coulure can occur.~中晚萌芽、晚采，果粒易脱落，可落花。','Rare conservation plantings; historic use for colour and body in blends.~保育种植稀少，历史用于混酿增色增体。','Historical descriptions emphasize colour and body; a consistent modern varietal profile is not established.~历史记载重颜色与酒体，尚无一致现代单品种品鉴特征。','Not Lambrusco Oliva; Brugnola and Prugnola are listed as erroneous synonyms.~不是 Lambrusco Oliva；Brugnola、Prugnola 被列为错误同义名。'),
('Lambrusco Oliva','red','lambrusco-oliva','Lambrusco Mazzone|Olivone','Emilia plantings; Olivone is recorded around Mantova.~种植于 Emilia；Mantova 记录 Olivone 名称。','Late September–October maturity, vigorous, drooping, irregular crops; fragile pre-flowering shoots.~九月底至十月熟，强势下垂、产量不稳，花前新梢脆。','Local blending and historically sweet filtered wines.~本地混酿，历史亦用于甜味过滤酒。','Colour and phenolic structure; bitterness depends on extraction.~提供颜色和酚类结构，苦味取决萃取。','Separate from Lambrusco del Pellegrino despite historical oliva names.~尽管历史名含 oliva，仍与 Lambrusco del Pellegrino 分开。'),
('Maligia','white','maligia','Malisa|Malise','Historic Imola and Bologna white grape.~Imola 与 Bologna 历史白品种。','Vigorous, productive, useful basal fertility; later than local Trebbiano Romagnolo, powdery mildew risk on hills.~强势丰产、基部结实好，晚于本地 Trebbiano Romagnolo，丘陵有白粉病风险。','Historically blended with Albana or briefly sun-dried.~历史与 Albana 混酿或短时日晒。','Sugar-rich ripe fruit and historically noted aroma.~成熟果实糖高，历史记录提到明显香气。','Comparison with Sauvignon aroma does not prove identity.~香气比作 Sauvignon 不证明同一品种。'),
('Negretto','red','negretto','Negrettino Bolognese','Traditional Bologna and Ravenna grape.~Bologna、Ravenna 传统品种。','Hardy, productive, suited to spur pruning; local maturity in late September.~适应性强、丰产、宜短梢，当地九月下旬熟。','Blending for colour and softness.~用于混酿增色及柔化。','Deep colour, good sugar and relatively low acidity.~色深、糖分好、酸相对低。','Not the French Négrette.~不是法国 Négrette。'),
('Sgavetta','red','sgavetta','','Local Modena and Reggio Emilia grape.~Modena、Reggio Emilia 地方品种。','Strong vigour and productivity; locally early April budding, late September harvest; thick blue-black skins, coulure risk.~强势丰产；当地四月初萌芽九月底采；蓝黑厚皮，有落花风险。','Young still and frizzante red blends.~用于年轻静止及微起泡红混酿。','Fruity red with useful colour.~果味红酒，可提供颜色。','Not a generic Lambrusco name.~不是 Lambrusco 泛称。'),
('Spergola','white','spergola','','Scandiano white grape in Reggio Emilia hills.~Reggio Emilia 丘陵 Scandiano 白品种。','Relatively early budding, late September harvest; well-drained hills, low basal fertility.~相对早萌芽，九月底采；喜排水好丘陵，基部结实力低。','Still and sparkling whites in Colli di Scandiano e di Canossa.~用于 Colli di Scandiano e di Canossa 静止及起泡白。','Freshness and acidity support sparkling styles.~清新与酸度适合起泡。','Molecular work distinguishes it from Sauvignon Blanc.~分子研究确认不同于 Sauvignon Blanc。'),
('Trebbianina','white','trebbiano-di-spagna','Trebbiano di Spagna','Historic Modena and Reggio grape; nationally registered in 2009.~Modena、Reggio 历史品种，2009 年国家登记。','Vigorous, late ripening; functionally female flowers, reflected stamens and better fertility beyond the basal nodes.~强势晚熟，功能性雌花、雄蕊反卷，非最基部芽位结实较佳。','Balsamic must and white wines; acid supports traditional-method sparkling.~用于香醋葡萄汁及白酒，酸适合传统法起泡。','High acid, moderate body, white flowers, citrus, orchard fruit and possible bitter finish.~高酸、中体、白花、柑橘、果园水果，可微苦。','Neither proof of Spanish origin nor Trebbiano Toscano.~名称不证明西班牙起源，也不是 Trebbiano Toscano。'),
('Uva Tosca','red','uva-tosca','','Historic Emilia Apennine hill and mountain grape.~Emilia 亚平宁丘陵山区历史品种。','Moderate vigour and yield, late harvest; poor exposed soils, long pruning; powdery mildew and uneven fruit-set risks.~中等长势产量、晚采；宜向阳贫土长梢，有白粉病及坐果不均风险。','Young reds, rosés and frizzante blends.~用于年轻红、桃红及微起泡混酿。','Pale, tart, savoury and modest in alcohol.~浅色、酸鲜、咸鲜、低酒精。','The name does not prove Tuscan origin; not Sangiovese.~名称不证明托斯卡纳起源，也非 Sangiovese。')]
for n,c,u,a,o,v,w,t,i in ER:
 kw={'parents':'Coccalona Nera','ped':'Regional research supports Coccalona Nera (Orsolina) as one parent; the other remains unknown.~地方研究支持 Coccalona Nera（Orsolina）为一方亲本，另一方未知。','typ':'natural-cross'} if n=='Lambrusco del Pellegrino' else {}
 grape(n,c,'Emilia-Romagna',E+u+'/@@download/file',o,v,w,t,i,a,**kw)
F='https://www.ersa.fvg.it/cms/aziende/sperimentazione/Colture-arboree/vite/biodiversita/'
ERSA=[
('Cjanorie','red','cianorie','Cianorie','Historic Gemona-area Friuli grape.~Friuli 的 Gemona 一带历史品种。','Early budding, very late ripening, vigorous and productive; thin skins, low colour phenolics.~早萌芽、极晚熟、强势丰产，薄皮、色素酚少。','Light, low-colour ERSA trial wines; acid balance varies with site and ripeness.~ERSA 试验酒轻盈浅色，酸平衡随地块及成熟度变化。','Separate conservation identity; not a generic red Friuli synonym.~独立保育身份，不是 Friuli 红品种统称。'),
('Cividin','white','cividin','','Historic eastern Friuli, Natisone, Gorizia and Karst grape.~Friuli 东部、Natisone、Gorizia 与 Karst 历史品种。','Early budding, very late ripening, low basal fertility; compact bunches of small berries.~早萌芽、极晚熟、基部结实低、小粒紧穗。','High acid with floral, citrus and occasional tropical notes in trials.~试验酒高酸、花香、柑橘，有时热带果香。','Historical co-planting with Glera does not imply synonymy.~历史与 Glera 混植不等于同义。'),
('Cordenossa','red','cordenossa','','Historic western Friuli around San Vito, Casarsa and Pordenone.~Friuli 西部 San Vito、Casarsa、Pordenone 历史品种。','Early budding, very late ripening, high vigour and fertility; loose bunches, small thin-skinned berries.~早萌芽、极晚熟、长势及结实力高，松穗、小粒薄皮。','Limited colour, evident tannin and medium acidity; modest alcohol in trials.~试验酒颜色少、单宁明显、中酸、酒精较低。','A separate local variety; historical blends do not establish parentage.~独立地方品种，历史混酿不证明亲本。'),
('Sagrestana','white','sagrestana','','Recovered from old vines near Clamara, Buttrio hill, in 2001.~2001 年从 Buttrio 山丘 Clamara 附近老藤恢复。','Medium budding, very late ripening; low basal fertility but potential high yield.~中期萌芽、极晚熟，基部结实低但潜在产量高。','Structured trial wines, ripe fruit and boxwood; grapes retain acidity.~试验酒有结构、熟果及黄杨气息，葡萄保酸。','The proposed Verduzzo Friulano × Picolit parentage is an unconfirmed local hypothesis.~所谓 Verduzzo Friulano × Picolit 亲本仍是未证实地方假说。')]
for n,c,u,a,o,v,t,i in ERSA:grape(n,c,'Friuli-Venezia Giulia',F+u+'/',o,v,'ERSA documents conservation vinifications; denomination eligibility is a separate question.~ERSA 记录保育酿造，法定产区资格须另行确认。',t,i,a)
EXTRA=[
('Boschera','white','Veneto','https://www.fondazioneslowfood.com/en/ark-of-taste-slow-food/boschera-grape/','Uva del Prete','Traditional near Vittorio Veneto at the Venetian Prealps.~传统种植于威尼托前阿尔卑斯山麓 Vittorio Veneto。','Low-yielding, compact bunches, thick yellow-green skins and high acidity.~低产、紧穗、黄绿厚皮、高酸。','Dried with Glera and Verdiso for Torchiato di Fregona; rare dry and bottle-refermented examples.~与 Glera、Verdiso 风干酿 Torchiato di Fregona，也有少量干白及瓶再发酵。','Fresh, tart fruit-scented whites; concentrated sweetness in passito.~清新酸鲜果香白酒，风干版浓缩甜润。','Sparkling use does not imply Prosecco DOC eligibility.~用于起泡不代表可用于 Prosecco DOC。'),
('Raboso Veronese','red','Veneto','https://www.moletto.com/uve/raboso-veronese/','','Established in Treviso and Venezia despite its Veronese name.~虽名 Veronese，种植重心为 Treviso 与 Venezia。','Hardy, late-ripening, compact cylindrical bunches, thick blue-black skin; earlier than Raboso Piave.~适应强、晚熟、圆柱紧穗、蓝黑厚皮，早于 Raboso Piave 成熟。','Still red and Raboso blends.~用于静止红酒及 Raboso 混酿。','Good colour with less acid and tannin than Raboso Piave.~颜色好，酸及单宁低于 Raboso Piave。','Distinct offspring of Raboso Piave and Marzemina Bianca.~Raboso Piave 与 Marzemina Bianca 的独立后代。'),
('Casetta','red','Trentino','https://www.albinoarmani.com/wp-content/uploads/2020/07/Casetta_FojaTonda_Valdadige_Terradeiforti_DOC-ITA.pdf','Foja Tonda','Traditional Valdadige grape between Trento and Verona; revived by Albino Armani.~Trento、Verona 间 Valdadige 传统品种，由 Albino Armani 复兴。','The producer uses pergola and Guyot on stony morainic and alluvial sites.~所引酒庄在石质冰碛及冲积地采用 pergola、Guyot。','Armani uses gentle pumpovers and large oak, a producer example rather than a universal rule.~Armani 轻柔淋皮及大橡木桶为酒庄范例，非统一规则。','Structured, plum, sour cherry, cinnamon and tobacco, developing balsamic notes.~有结构、李子、酸樱桃、肉桂、烟草，陈年香脂。','Foja Tonda is Casetta, not Enantio.~Foja Tonda 是 Casetta，不是 Enantio。'),
('Enantio','red','Trentino','https://vinideltrentino.com/portfolio/enantio/','Lambrusco a Foglia Frastagliata','Historic southern Vallagarina grape, once dominant on the valley floor.~Vallagarina 南部历史品种，过去谷底占主导。','Trentino pergola and Guyot documented; surviving local plantings are a conservation focus.~采用 Trentino pergola、Guyot，现存本地园为保育重点。','Still structured reds.~用于有结构的静止红酒。','Ruby, dry, fresh and distinctly tannic, with body.~宝石红、干型清新、明显单宁、有酒体。','Keep separate from Emilia Lambruschi despite the historical name.~尽管旧称 Lambrusco，须与 Emilia 各品种分开。'),
('Rebo','red','Trentino','https://vinideltrentino.com/en/portfolio/rebo-2/','','Rebo Rigotti bred it at San Michele all’Adige; institutional accounts date the crossing to 1948.~Rebo Rigotti 在 San Michele all’Adige 育成，机构记录杂交于 1948 年。','Documented Trentino cultivation; the cited source does not establish detailed phenology.~有 Trentino 种植记录，所引资料未确立具体物候。','Trentino DOC reds, approachable young and capable of bottle ageing.~用于 Trentino DOC 红酒，年轻可饮，也可瓶陈。','Coloured, full-bodied, fragrant fruit and structure.~颜色深、酒体丰满、果香与结构兼具。','Merlot × Teroldego is a vinifera crossing, not interspecific.~Merlot × Teroldego 为欧亚种内杂交，非种间。'),
('Vitovska','white','Friuli-Venezia Giulia','https://www.zidarich.it/pdf/schedatecnica_vitovska.pdf','','Traditional Carso/Kras white near Trieste and adjoining Slovenia.~Trieste 及邻近斯洛文尼亚 Carso／Kras 传统白品种。','Zidarich documents Guyot and bush vines on limestone/terra rossa at Prepotto; late September–early October harvest.~Zidarich 在 Prepotto 石灰岩／红土用 Guyot、杯状，九月底至十月初采。','Zidarich skin-ferments and ages in large oak; not all Vitovska must use this method.~Zidarich 带皮发酵及大桶陈年，并非所有 Vitovska 必须如此。','Its skin-contact reference is golden, cooked-fruited, saline and fresh at the finish.~所引浸皮酒金色、熟果、咸鲜、收尾清新。','Carso is a place/denomination, not a grape synonym.~Carso 是地理／产区名，不是品种同义名。'),
('Moscato Rosa','red','Alto Adige','https://www.altoadigewines.com/images/datasheets/moscatorosa.pdf','Rosenmuskateller','Historic Alto Adige and Trentino aromatic grape; older sources propose Dalmatian origin.~Alto Adige、Trentino 历史芳香品种，旧文献提出达尔马提亚起源。','Female flowers, low irregular yields and rot-prone thin skins; warm ventilated sites needed.~雌花、低且不稳产量、薄皮易腐，需温暖通风地。','Late-harvest or dried-grape sweet reds.~用于晚采或风干甜红。','Rose petal, red currant, spice and sweetness.~玫瑰花瓣、红醋栗、香料与甜味。','Not Moscato Giallo or a generic rosé Moscato blend.~不是 Moscato Giallo 或泛称 Moscato 桃红混酿。'),
('Oseleta','red','Veneto','https://media.masi.it/media/media/3pikfzrj/cpb_osar_en.pdf','','Rare Veronese grape replanted by Masi in the 1980s.~罕见 Verona 品种，Masi 于 1980 年代重植。','The producer maintains revived Oseleta vineyards; detailed phenology is not stated in this wine sheet.~酒庄保留复兴 Oseleta 园，酒款资料未说明详细物候。','Osar is a varietal reference; also contributes structure to blends.~Osar 为单品种参照，亦为混酿提供结构。','Very deep colour, marked tannin and concentrated body.~色极深、单宁突出、酒体浓缩。','Not a synonym for Corvina.~不是 Corvina 同义名。'),
('Schiava Gentile','red','Trentino','https://www.cavit.it/wp-content/uploads/2022/12/bottega-vinai-schiava-gentile.pdf','Kleinvernatsch','Historic Trentino-Alto Adige variety; Cavit sources Vallagarina around Rovereto.~Trentino-Alto Adige 历史品种，Cavit 取自 Rovereto 周边 Vallagarina。','Medium bunches, thin heavily bloomed skins, juicy neutral flesh.~中穗、果粉厚而薄皮、多汁中性果肉。','Brief skin contact and steel maturation preserve delicacy in the Cavit example.~Cavit 范例用短浸皮及钢罐陈年保留细致。','Light, fragrant reds/rosés; raspberry and almond-like bitterness.~轻盈芳香红／桃红，覆盆子与杏仁样微苦。','Separate from Schiava Grossa and Grigia; Vernatsch alone is ambiguous.~与 Schiava Grossa、Grigia 分开，仅 Vernatsch 不够精确。'),
('Vespaiola','white','Veneto','https://www.breganzedoc.it/i-vini/','','Closely linked to Breganze in the Vicenza foothills.~与 Vicenza 山麓 Breganze 紧密联系。','Retained acidity matters when drying grapes for Torcolato; detailed phenology needs another technical source.~风干酿 Torcolato 时保酸重要，具体物候仍需技术来源。','Dry Breganze Vespaiolo and sweet dried-grape Torcolato.~酿干型 Breganze Vespaiolo 及风干甜酒 Torcolato。','Fresh dry whites and concentrated sweet wines balanced by acidity.~清新干白及以酸平衡浓缩甜味的甜酒。','Vespaiola is the variety; Vespaiolo and Torcolato are wine names.~Vespaiola 为品种，Vespaiolo、Torcolato 为酒名。')]
for n,c,a,u,als,o,v,w,t,i in EXTRA:
 kw={'parents':'Merlot|Teroldego','ped':'Merlot × Teroldego, according to the Trentino consortium.~Trentino 协会记载 Merlot × Teroldego。','typ':'bred-cross'} if n=='Rebo' else {'parents':'Raboso Piave|Marzemina Bianca','ped':'The grower cites genetic work establishing this natural crossing.~种植者引用遗传研究确立这一自然杂交。','typ':'natural-cross'} if n=='Raboso Veronese' else {}
 grape(n,c,a,u,o,v,w,t,i,als,**kw)
# Sources already read during the retained research session. Legal rules are deliberately scoped.
S={
'soave':('Consorzio Soave · production rules','https://www.ilsoave.com/en/regulations/'),
'soave-full':('Consorzio Soave · denomination distinctions','https://www.ilsoave.com/en/disciplinare/'),
'soave-soils':('Consorzio Soave · soils','https://www.ilsoave.com/en/soils/'),
'valpo':('Consorzio Valpolicella · territory','https://www.consorziovalpolicella.it/en/the-area/'),
'amarone':('Consorzio Valpolicella · Amarone','https://www.consorziovalpolicella.it/en/types-of-wines/amarone-della-valpolicella-docg/'),
'ripasso':('Consorzio Valpolicella · Ripasso','https://www.consorziovalpolicella.it/en/types-of-wines/valpolicella-ripasso-doc/'),
'recioto':('Gazzetta Ufficiale · Recioto DOCG','https://www.gazzettaufficiale.it/atto/serie_generale/caricaDettaglioAtto/originario?atto.codiceRedazionale=10A04282&atto.dataPubblicazioneGazzetta=2010-04-13&elenco30giorni=false'),
'bardolino':('Consorzio Bardolino · territory','https://consorziobardolino.it/en/production-area/'),
'bardolino-zones':('Consorzio Bardolino · subzones','https://consorziobardolino.it/i-vini-del-consorzio/sottozone/'),
'prosecco':('Consorzio Prosecco DOC · specification','https://www.prosecco.wine/en/prosecco/production-regulation/'),
'cv':('Consorzio Conegliano Valdobbiadene · types','https://www.prosecco.it/it/conegliano-valdobbiadene-prosecco-superiore-docg/tipologie/'),
'cv-history':('Consorzio Conegliano Valdobbiadene · denomination','https://www.prosecco.it/en/prosecco-superiore-docg/'),
'rive':('Consorzio Conegliano Valdobbiadene · Rive','https://www.prosecco.it/en/press-release/prosecco-on-the-rive-bank/'),
'asolo':('Consorzio Asolo Montello · Asolo Prosecco','https://www.asolomontello.it/asolo-prosecco-docg/'),
'asolo-law':('Consorzio Asolo Montello · specification','https://www.asolomontello.it/am2020/wp-content/uploads/2023/10/disciplinare-asolo-prosecco-EN.pdf'),
'breganze':('Consorzio Breganze · wines','https://www.breganzedoc.it/i-vini/'),
'breganze-history':('Consorzio Breganze · history','https://www.breganzedoc.it/il-consorzio/'),
'trentino':('Consorzio Vini del Trentino','https://vinideltrentino.com/'),
'trentino-growers':('Vignaioli del Trentino · wines','https://vignaiolideltrentino.it/i-vini/'),
'trento':('Istituto Trento DOC · wine types','https://www.trentodoc.com/en/trentodoc/'),
'trento-place':('Istituto Trento DOC · territory','https://www.trentodoc.com/en/territory-and-denomination/'),
'trento-grapes':('Istituto Trento DOC · varieties','https://www.trentodoc.com/en/territory-and-denomination/grapes-and-varieties/'),
'rotaliano':('Cantina Sociale Trento · Nativi Teroldego Rotaliano','https://www.cantinasocialetrento.it/documenti/schede-vino/schede-vino_eng/19-teroldego-nativi.pdf'),
'alto':('Consorzio Alto Adige · terroir','https://www.altoadigewines.com/en/our-wine/terroir'),
'alto-soils':('Consorzio Alto Adige · geology','https://www.altoadigewines.com/en/our-wine/geology-soils'),
'alto-climate':('Consorzio Alto Adige · climate','https://www.altoadigewines.com/en/our-wine/climate-topography'),
'alto-zones':('Consorzio Alto Adige · origins','https://www.altoadigewines.com/en/news/grounded-in-origin'),
'alto-uga':('Consorzio Alto Adige · 2025 technical presentation','https://www.altoadigewines.com/images/2025_ppp_suedtirolwein_en.pdf'),
'collio':('Consorzio Collio · Collio Bianco','https://www.collio.it/en/vino/collio-bianco/'),
'co':('Consorzio Friuli Colli Orientali · denomination','https://www.colliorientali.com/en/designations/friuli-colli-orientali/'),
'co-law':('CEVIQ · Friuli Colli Orientali specification','https://www.ceviq.it/wp-content/uploads/bsk-pdf-manager/2024/01/Friuli-Colli-Orientali.pdf'),
'ramandolo':('CEVIQ · Ramandolo specification including 2024 amendment','https://www.ceviq.it/wp-content/uploads/bsk-pdf-manager/2025/02/Ramandolo.pdf'),
'rosazzo':('Abbazia di Rosazzo · estate wines','https://www.abbaziadirosazzo.it/en/the-wine-cellar/wines-of-the-abbey-of-rosazzo'),
'rosazzo-law':('UNI.DOC FVG · Rosazzo specification','https://www.unidocfvg.it/wp-content/uploads/2015/05/DOCG-Rosazzo.pdf'),
'picolit-law':('UNI.DOC FVG · Picolit specification','https://www.unidocfvg.it/wp-content/uploads/2015/05/DOCG-Colli-Orientali-del-Friuli-Picolit.pdf'),
'carso-law':('UNI.DOC FVG · Carso/Kras specification','https://www.unidocfvg.it/wp-content/uploads/2015/09/DOC_Carso_o_Carso-Kras.pdf'),
'grave-law':('UNI.DOC FVG · Friuli Grave specification','https://www.unidocfvg.it/wp-content/uploads/2015/05/DOC-Friuli-Grave.pdf'),
'ersa':('ERSA FVG · grape biodiversity','https://www.ersa.fvg.it/cms/aziende/sperimentazione/Colture-arboree/vite/biodiversita/'),
'bulfon':('PromoTurismoFVG · Cantina Bulfon','https://www.turismofvg.it/en/food-and-wine/cantina-bulfon'),
'lambrusco':('Consorzio Lambrusco · denominations','https://lambrusco.net/en/denominations/'),
'sorbara':('Consorzio Lambrusco · Sorbara','https://lambrusco.net/en/denominations/lambrusco-sorbara/'),
'grasparossa':('Consorzio Lambrusco · Grasparossa','https://lambrusco.net/en/denominations/lambrusco-grasparossa-di-castelvetro-en/'),
'salamino':('Consorzio Lambrusco · Salamino','https://lambrusco.net/en/denominations/lambrusco-salamino-di-santa-croce-en/'),
'modena':('Consorzio Lambrusco · Modena','https://lambrusco.net/en/denominations/modena-en/'),
'reggiano':('Consorzio Lambrusco · Reggiano','https://lambrusco.net/en/denominations/reggiano-en/'),
'scandiano':('Consorzio Lambrusco · Scandiano/Canossa','https://lambrusco.net/en/denominations/colli-di-scandiano-e-di-canossa-en/'),
'albana':('Consorzio Vini Romagna · Albana','https://www.consorziovinidiromagna.it/vini/albana/'),
'sangiovese':('Consorzio Vini Romagna · Sangiovese','https://www.consorziovinidiromagna.it/vini/sangiovese/'),
'er':('Regione Emilia-Romagna · grape biodiversity','https://agricoltura.regione.emilia-romagna.it/produzioni-agroalimentari/agricoltura-sostenibile/agrobiodiversita/specie-vegetali/vite')}
G={g['id']:g for g in B['grapes']};T={t['id']:t for t in B['translations']}
for g in B['grapes']:S['g-'+g['id']]=(g['sources'][0]['title'],g['sources'][0]['url'])
titles={k:pair(v) for k,v in {'overview':'Overview~概述','history':'History~历史','geography':'Geography~地理','climate':'Climate~气候','soils':'Geology & soils~地质与土壤','grapes':'Grapes & viticulture~品种与栽培','law':'Appellations & classification~法定产区与分类','vinification':'Winemaking & styles~酿造与风格','producers':'Producers & wines~酒庄与酒款','service':'Tasting & service~品鉴与侍酒'}.items()}
def reg(id,name,kind,parent,intro,rows,edges,aliases=''):
 sections=[]
 for key,title in titles.items():
  rr=[x for x in rows if x[0]==key]
  if rr:sections.append({'id':key,'title':bi(*title),'rows':[{'label':bi(*pair(x[1])),'body':bi(*pair(x[2]))} for x in rr],'refs':list(dict.fromkeys(x[3] for x in rr))})
 sources=list(dict.fromkeys([x[3] for x in rows]+[x[1] for x in edges]));classification='DOCG' if name.endswith('DOCG') else 'DOC' if name.endswith('DOC') else 'Administrative region' if kind=='region' else 'Geographical wine territory'
 r={'id':id,'name':name,'country':'Italy','kind':kind,'aliases':aliases.split('|') if aliases else [],'intro':bi(*pair(intro)),'facts':[{'label':bi('Classification','分类'),'body':bi(classification,{'Administrative region':'行政大区','Geographical wine territory':'地理葡萄酒区域'}.get(classification,classification))}],'sections':sections,'grapes':[{'grapeId':g,'role':bi(*pair(role)),'sourceIds':[s]} for g,s,role in edges],'wines':[],'sources':[{'id':s,'title':S[s][0],'url':S[s][1]} for s in sources],'reviewed':DATE,'questions':[]}
 if parent:r['parentId']=parent
 B['regions'].append(r);save();return r
def edge(ids,src,role='Documented local grape or specified appellation component.~有记录的本地品种或法定产区组分。'):return [(g,src,role) for g in ids.split()]
VR=[
('overview','Scope~范围','Veneto is an administrative region, not a single DOC.~Veneto 是行政大区，不是单一 DOC。','prosecco'),
('overview','Districts~区域','Verona, Vicenza and Treviso have different grape and wine traditions.~Verona、Vicenza、Treviso 品种及酒文化不同。','valpo'),
('history','Soave~Soave','DOC recognition dates to 1968.~1968 年获得 DOC。','soave'),
('history','Prosecco~Prosecco','The modern Prosecco DOC was established in 2009.~现代 Prosecco DOC 始于 2009 年。','prosecco'),
('history','Amarone~Amarone','Amarone became a separate DOCG in 2010.~Amarone 于 2010 年成为独立 DOCG。','valpo'),
('geography','Verona~Verona','Soave lies east of Verona; Valpolicella occupies valleys north of the city.~Soave 在 Verona 东侧，Valpolicella 位于城市北侧山谷。','valpo'),
('geography','Garda~Garda','Bardolino follows the eastern side of Lake Garda.~Bardolino 位于 Garda 湖东侧。','bardolino'),
('climate','Local moderation~局部调节','Lake Garda and the Lessini hills affect exposure and air movement in western Veneto.~Garda 湖与 Lessini 丘陵影响 Veneto 西部朝向与空气流动。','valpo'),
('soils','Soave~Soave','Volcanic and limestone hills coexist; Soave is not uniformly basalt.~火山与石灰岩丘陵并存，Soave 非全部玄武岩。','soave-soils'),
('soils','Bardolino~Bardolino','Glacial morainic hills shape the Bardolino territory.~冰川冰碛丘陵塑造 Bardolino 地貌。','bardolino'),
('grapes','White core~白品种核心','Garganega leads Soave; Glera leads Prosecco.~Garganega 主导 Soave，Glera 主导 Prosecco。','soave'),
('grapes','Local whites~本地白品种','Durella retains high acid; Vespaiola underpins Breganze Vespaiolo and Torcolato.~Durella 保有高酸；Vespaiola 酿 Breganze Vespaiolo 与 Torcolato。','g-durella'),
('grapes','Reds~红品种','Corvina, Corvinone and Rondinella are central Valpolicella identities.~Corvina、Corvinone、Rondinella 为 Valpolicella 核心。','valpo'),
('grapes','Manzoni~Manzoni','Manzoni Bianco is Riesling × Pinot Blanc, selected at Conegliano.~Manzoni Bianco 为 Riesling × Pinot Blanc，在 Conegliano 选育。','g-manzoni-bianco'),
('vinification','Appassimento~风干','Amarone and Recioto use dried grapes; dry-style Amarone contrasts with sweet Recioto.~两者使用风干葡萄，干型风格 Amarone 与甜 Recioto 对比。','amarone'),
('vinification','Ripasso~Ripasso','Valpolicella wine undergoes re-fermentation on Amarone or Recioto marc.~Valpolicella 酒在 Amarone 或 Recioto 酒渣上再发酵。','ripasso'),
('law','Prosecco origins~Prosecco 产地','Prosecco DOC, Conegliano Valdobbiadene DOCG and Asolo DOCG are separate.~Prosecco DOC、Conegliano Valdobbiadene DOCG、Asolo DOCG 各自独立。','asolo'),
('law','Bardolino subzones~Bardolino 子区','Montebaldo, La Rocca and Sommacampagna.~Montebaldo、La Rocca、Sommacampagna。','bardolino-zones'),
('law','Cross-regional DOC~跨区 DOC','Prosecco DOC also covers four Friuli-Venezia Giulia provinces.~Prosecco DOC 还覆盖 Friuli-Venezia Giulia 四省。','prosecco'),
('producers','Osar~Osar','Masi Osar is a varietal Oseleta IGT reference, not Amarone.~Masi Osar 为 Oseleta 单品种 IGT 参照，非 Amarone。','g-oseleta'),
('service','Style distinction~风格区分','Amarone’s dried-grape concentration does not make it a sweet Recioto.~Amarone 的风干浓缩不等于甜型 Recioto。','amarone'),
('service','Acid and tannin~酸与单宁','Raboso Piave is a high-acid, tannic reference distinct from lighter local reds.~Raboso Piave 为高酸高单宁参照，不同于较轻本地红酒。','g-raboso-piave')]
veneto=reg('it-veneto','Veneto','region',None,'Northeastern Italian region joining Garda, Verona, Vicenza and Treviso wine territories.~意大利东北大区，连接 Garda、Verona、Vicenza 与 Treviso 葡萄酒区域。',VR,edge('garganega','soave')+edge('glera','prosecco')+edge('corvina corvinone rondinella molinara','valpo'),'Venetia')
TR=[
('overview','Two provinces~两个省份','Trentino and Alto Adige/Südtirol retain distinct wine cultures.~Trentino 与 Alto Adige／Südtirol 保留不同葡萄酒文化。','trentino'),
('overview','Scope~范围','The administrative region contains several DOCs, not one uniform appellation.~行政大区含多个 DOC，并非统一法定产区。','trentino'),
('history','San Michele~San Michele','San Michele all’Adige is the research centre associated with Rebo Rigotti’s crossing.~San Michele all’Adige 是与 Rebo Rigotti 杂交有关的研究中心。','g-rebo'),
('history','Moscato Rosa~Moscato Rosa','Moscato Rosa wine was exhibited in Bolzano in 1886.~1886 年 Bolzano 展览已有 Moscato Rosa 酒。','g-moscato-rosa'),
('geography','Adige~Adige','The Adige/Etsch valley connects many vineyard districts.~Adige／Etsch 河谷连接多个葡萄园地区。','alto-climate'),
('geography','Rotaliana~Rotaliana','Campo Rotaliano is the Teroldego reference north of Trento.~Trento 北部 Campo Rotaliano 是 Teroldego 参照区域。','rotaliano'),
('climate','Gradient~梯度','Elevation, exposure and valley airflow matter alongside latitude.~海拔、朝向及谷风与纬度同样重要。','alto-climate'),
('climate','Cool and warm~冷暖对比','Eisacktal and Vinschgau contrast with warmer Bolzano and southern sites.~Eisacktal、Vinschgau 与更暖 Bolzano、南部地块对比。','alto-zones'),
('soils','Mosaic~多样性','Alluvial, glacial, limestone and volcanic materials create diverse sites.~冲积、冰川、石灰岩及火山材料形成多样地块。','alto-soils'),
('soils','Noce~Noce','Noce gravelly alluvium defines the Rotaliana reference site.~Noce 砾石冲积物是 Rotaliana 核心地块特征。','rotaliano'),
('grapes','Local reds~本地红品种','Teroldego, Lagrein, Marzemino and the Schiava varieties require separate records.~Teroldego、Lagrein、Marzemino 及各 Schiava 须分开。','trentino-growers'),
('grapes','White range~白品种范围','Nosiola accompanies Chardonnay, Pinot Blanc and alpine aromatic varieties.~Nosiola 与 Chardonnay、Pinot Blanc 及高山芳香品种并存。','trentino-growers'),
('grapes','Training~整枝','Pergola, Guyot and spur cordon are documented in Trentino sparkling vineyards.~Trentino 起泡园有 pergola、Guyot、短梢水平蔓。','trento-grapes'),
('grapes','Rebo~Rebo','Rebo is a vinifera crossing of Merlot and Teroldego.~Rebo 为 Merlot 与 Teroldego 欧亚种内杂交。','g-rebo'),
('vinification','Trento~Trento','Bottle fermentation and lees ageing define the traditional-method sparkling style.~瓶中二次发酵、酒泥陈年定义传统法起泡。','trento'),
('vinification','Sweet red~甜红','Moscato Rosa makes aromatic sweet reds from late-picked or dried grapes.~Moscato Rosa 可用晚采或风干葡萄酿芳香甜红。','g-moscato-rosa'),
('law','Trento and Trentino~Trento 与 Trentino','Trento DOC and Trentino DOC are separate denominations.~Trento DOC 与 Trentino DOC 是不同产区。','trentino'),
('law','UGA~UGA','Alto Adige’s additional geographical units define origin and grape choices.~Alto Adige 附加地理单元限定产地及品种选择。','alto-uga'),
('law','Lees periods~酒泥时间','Trento minimums: non-vintage 15 months, vintage 24, riserva 36.~Trento 最低：无年份 15 个月、年份 24、riserva 36。','trento'),
('producers','Local references~本地参照','Cavit Schiava Gentile and Armani Foja Tonda show different red identities.~Cavit Schiava Gentile、Armani Foja Tonda 展示不同红品种。','g-casetta'),
('service','Schiava~Schiava','Cavit suggests 12–14°C for its light Schiava Gentile.~Cavit 为轻盈 Schiava Gentile 建议 12–14°C。','g-schiava-gentile'),
('service','Casetta~Casetta','Armani suggests 16–18°C for its structured Foja Tonda.~Armani 为有结构 Foja Tonda 建议 16–18°C。','g-casetta')]
taa=reg('it-trentino-alto-adige','Trentino-Alto Adige','region',None,'Alpine administrative region comprising Trentino and Alto Adige/Südtirol, with distinct provincial wine territories.~阿尔卑斯行政大区，由 Trentino 与 Alto Adige／Südtirol 构成，各有不同省级葡萄酒区域。',TR,edge('teroldego nosiola schiava-grossa chardonnay pinot-blanc pinot-gris muller-thurgau kerner gewurztraminer goldmuskateller','trentino-growers')+edge('lagrein','alto-zones'),'Trentino Alto Adige|Trentino-Alto Adige/Südtirol')
FR=[
('overview','Scope~范围','Collio and Friuli Colli Orientali are separate DOCs within the region.~Collio、Friuli Colli Orientali 是大区内不同 DOC。','co'),
('overview','Styles~风格','Dry whites, local reds, sweet whites and skin-contact wines coexist.~干白、本地红、甜白及浸皮酒并存。','co'),
('history','Collio~Collio','DOC recognition in 1968.~1968 年获得 DOC。','collio'),
('history','Ramandolo~Ramandolo','DOCG recognition in 2001, not 2011.~2001 年获得 DOCG，不是 2011 年。','ramandolo'),
('geography','Eastern hills~东部丘陵','Collio is around Gorizia; Colli Orientali lies in Udine province.~Collio 在 Gorizia 周边，Colli Orientali 位于 Udine 省。','co'),
('geography','Karst~喀斯特','The Trieste Karst has Vitovska, Malvasia Istriana and Terrano traditions.~Trieste 喀斯特有 Vitovska、Malvasia Istriana、Terrano 传统。','carso-law'),
('climate','Ramandolo~Ramandolo','Monte Bernadia shelters south-facing, rainy hill sites around Nimis and Tarcento.~Monte Bernadia 保护 Nimis、Tarcento 周边向南且多雨丘陵。','ramandolo'),
('climate','Site exposure~朝向','Hill exposure and drainage matter; regional plains and steep terraces are not equivalent sites.~丘陵朝向及排水重要，平原与陡坡梯田并非等同。','ramandolo'),
('soils','Ponca~Ponca','Eocene marl and sandstone flysch underpins the Collio reference.~Collio 参照地质为始新世泥灰岩、砂岩 flysch。','collio'),
('soils','Karst~Karst','Limestone and red residual soils occur in the Karst plateau.~Karst 高原有石灰岩及红色残积土。','carso-law'),
('grapes','White identities~白品种身份','Friulano, Ribolla Gialla, Picolit and Verduzzo Friulano are distinct.~Friulano、Ribolla Gialla、Picolit、Verduzzo Friulano 各自独立。','co'),
('grapes','Red identities~红品种身份','Pignolo, Schioppettino, Tazzelenghe and Refosco dal Peduncolo Rosso are separate.~Pignolo、Schioppettino、Tazzelenghe、Refosco dal Peduncolo Rosso 须分开。','co'),
('grapes','Conservation~保育','ERSA documents Cividin, Cjanorie, Cordenossa and Sagrestana materials.~ERSA 记录 Cividin、Cjanorie、Cordenossa、Sagrestana 材料。','ersa'),
('vinification','Ramandolo~Ramandolo','Sweet 100% Verduzzo Friulano; optional grape drying and wood vessels are regulated.~100% Verduzzo Friulano 甜酒，风干及木容器按规范可用。','ramandolo'),
('vinification','Skin contact~浸皮','Zidarich Vitovska illustrates skin fermentation and oak; it does not define all regional whites.~Zidarich Vitovska 展示带皮发酵及橡木，不代表全部本地白酒。','g-vitovska'),
('law','Rosazzo~Rosazzo','Rosazzo DOCG is a dry white blend, separate from Ribolla Gialla di Rosazzo DOC type.~Rosazzo DOCG 是干白混酿，不同于 Ribolla Gialla di Rosazzo DOC 类型。','rosazzo-law'),
('law','Prosecco~Prosecco','Gorizia, Pordenone, Trieste and Udine fall within Prosecco DOC.~Gorizia、Pordenone、Trieste、Udine 纳入 Prosecco DOC。','prosecco'),
('law','Picolit~Picolit','Colli Orientali del Friuli Picolit is a separate DOCG established in 2006.~Colli Orientali del Friuli Picolit 为 2006 年成立的独立 DOCG。','picolit-law'),
('producers','Rosazzo Abbey~Rosazzo 修道院','Livio Felluga manages the Abbey vineyards for a Friulano-led white.~Livio Felluga 管理修道院园，酿 Friulano 为主白酒。','rosazzo'),
('producers','Bulfon~Bulfon','Emilio Bulfon is a reference for recovered varieties including Cividin and Cjanorie.~Emilio Bulfon 为 Cividin、Cjanorie 等恢复品种参照。','bulfon'),
('service','Collio Bianco~Collio Bianco','The consortium suggests 10–12°C.~协会建议 10–12°C。','collio'),
('service','Verduzzo identity~Verduzzo 身份','Verduzzo Trevigiano cannot be substituted for Ramandolo’s Verduzzo Friulano.~Verduzzo Trevigiano 不能替代 Ramandolo 的 Verduzzo Friulano。','ramandolo')]
fvg=reg('it-friuli-venezia-giulia','Friuli-Venezia Giulia','region',None,'Border region spanning Adriatic, Karst, eastern hills and alluvial plains, with distinct local grapes and denominations.~边境大区，跨亚得里亚海、喀斯特、东部丘陵及冲积平原，品种与法定产区各异。',FR,edge('friulano ribolla-gialla malvasia-istriana picolit pignolo schioppettino tazzelenghe refosco-dal-peduncolo-rosso pinot-gris sauvignon-blanc','co')+edge('teran','carso-law'),'Friuli Venezia Giulia|Friuli')
EROW=[
('overview','Emilia and Romagna~Emilia 与 Romagna','Emilian Lambrusco districts differ from Romagna’s Albana and Sangiovese traditions.~Emilia Lambrusco 区域不同于 Romagna Albana、Sangiovese 传统。','lambrusco'),
('overview','Lambrusco identity~Lambrusco 身份','Multiple varieties and DOCs, not one grape or sweetness level.~涉及多个品种及 DOC，非一种葡萄或固定甜度。','lambrusco'),
('history','Conservation~保育','The regional register documents rare Maligia, Sgavetta and Uva Tosca.~大区名录记录稀有 Maligia、Sgavetta、Uva Tosca。','er'),
('history','Recovery~复兴','Centesimino and Famoso exemplify recovered Romagna varieties.~Centesimino、Famoso 展示 Romagna 品种复兴。','er'),
('geography','Lambrusco~Lambrusco','Modena and Reggio Emilia include plains and Apennine foothills.~Modena、Reggio Emilia 包含平原及亚平宁山麓。','lambrusco'),
('geography','Albana~Albana','Romagna Albana covers parts of Bologna, Ravenna and Forlì-Cesena.~Romagna Albana 覆盖 Bologna、Ravenna、Forlì-Cesena 部分地区。','albana'),
('climate','Emilian plain~Emilia 平原','Hot summers and foggy winters characterize the consortium’s plain-land account.~协会平原描述为炎夏及多雾冬季。','lambrusco'),
('climate','Hillside ripening~丘陵成熟','Uva Tosca needs favourable exposure to ripen in Emilia’s mountain vineyards.~Uva Tosca 在 Emilia 山地园需良好朝向成熟。','g-uva-tosca'),
('soils','Modena plain~Modena 平原','River sedimentation left sands, clays and calcareous deposits.~河流沉积留下砂、黏土及钙质沉积物。','salamino'),
('soils','Grasparossa~Grasparossa','Clay-rich foothills contrast with better-drained higher calcareous sand/gravel sites.~富黏土山麓与高处排水较佳钙质砂砾地对比。','grasparossa'),
('grapes','Lambrusco varieties~Lambrusco 品种','Sorbara, Grasparossa, Salamino, Maestri, Marani and Viadanese are distinct.~Sorbara、Grasparossa、Salamino、Maestri、Marani、Viadanese 各自独立。','lambrusco'),
('grapes','Colour grape~增色品种','Ancellotta provides anthocyanin colour and is not itself Lambrusco.~Ancellotta 提供花色苷颜色，本身非 Lambrusco。','g-ancellotta'),
('grapes','Coastal grape~海岸品种','Fortana has a specific coastal sandy-soil association.~Fortana 与海岸沙土有特别联系。','g-fortana'),
('vinification','Bubbles and sugar~气泡与糖','Frizzante and spumante span dry to sweet; pressure and sugar are separate variables.~微起泡及起泡可干至甜，压力与糖为不同变量。','sorbara'),
('vinification','Albana~Albana','Dry, sweeter and passito styles are possible; Albana is not only a dessert wine.~可酿干型、带甜及风干酒，并非仅甜酒。','albana'),
('law','Albana blend~Albana 配比','Romagna Albana DOCG requires at least 95% Albana.~Romagna Albana DOCG 至少 95% Albana。','albana'),
('law','Distinct DOCs~不同 DOC','Sorbara, Grasparossa di Castelvetro, Salamino di Santa Croce, Modena and Reggiano have separate rules.~上述五种 DOC 各有独立规范。','lambrusco'),
('law','White and red~白与红','Colli di Scandiano e di Canossa includes local white as well as Lambrusco types.~Colli di Scandiano e di Canossa 也含本地白酒，并非仅 Lambrusco。','scandiano'),
('producers','Research collections~研究保育园','Regional institutions and growers preserve minor varieties; registration does not prove broad acreage.~地方机构、种植者保育小众品种，登记不代表广泛面积。','er'),
('producers','Centesimino~Centesimino','Pietro Pianori’s recovery work is central to the Oriolo/Faenza story.~Pietro Pianori 恢复工作是 Oriolo／Faenza 历史关键。','g-centesimino'),
('service','Sorbara versus Grasparossa~Sorbara 对比 Grasparossa','Sorbara is usually paler/lighter; Grasparossa has more body and tannin.~Sorbara 通常更浅更轻，Grasparossa 酒体单宁更多。','grasparossa'),
('service','Food~配餐','Dry Sorbara is a traditional companion to salumi; verify sweetness first.~干型 Sorbara 传统搭配腌肉，须先确认甜度。','sorbara')]
emilia=reg('it-emilia-romagna','Emilia-Romagna','region',None,'Northern region spanning Emilian plains and foothills, Romagna hills and the Adriatic coast.~北部大区，跨 Emilia 平原山麓、Romagna 丘陵及亚得里亚海岸。',EROW,edge('lambrusco-di-sorbara lambrusco-grasparossa lambrusco-salamino','lambrusco')+edge('albana','albana')+edge('sangiovese','sangiovese')+edge('pagadebiti trebbiano-toscano pignoletto malvasia-di-candia-aromatica','er'),'Emilia Romagna')
for g in B['grapes']:
 area=g['regions'][0]['name'];r={'Veneto':veneto,'Trentino':taa,'Alto Adige':taa,'Friuli-Venezia Giulia':fvg,'Emilia-Romagna':emilia}[area];s='g-'+g['id']
 r['grapes'].append({'grapeId':g['id'],'role':bi('Documented cultivation or conservation in the region.','大区有栽培或保育记录。'),'sourceIds':[s]})
 if s not in [x['id'] for x in r['sources']]:r['sources'].append({'id':s,'title':S[s][0],'url':S[s][1]})
save()
def quiz(r,text):
 for i,line in enumerate(text.strip().splitlines()):
  q,a,ref=line.split('|');r['questions'].append({'id':f'{i+1:02}','level':'foundation' if i<10 else 'advanced','group':'law' if any(k in q for k in ['DOC','minimum','allowed','Millesimato','UGA']) else 'place','q':bi(*pair(q)),'a':bi(*pair(a)),'refs':[ref]})
  if ref not in [s['id'] for s in r['sources']]:r['sources'].append({'id':ref,'title':S[ref][0],'url':S[ref][1]})
 save()
quiz(veneto,'''Which country contains Veneto?~Veneto 属于哪个国家？|Italy.~意大利。|soave
Which grape leads Soave?~Soave 主干品种？|Garganega.~Garganega。|soave
Which grape leads Prosecco?~Prosecco 主干品种？|Glera.~Glera。|prosecco
Which lake borders Bardolino?~Bardolino 邻哪个湖？|Lake Garda.~Garda 湖。|bardolino
Is Recioto sweet or dry?~Recioto 甜还是干？|Sweet.~甜型。|amarone
Is Amarone sparkling?~Amarone 是起泡吗？|No; still red.~不是，是静止红。|amarone
Which grape makes Torcolato?~Torcolato 用什么品种？|Vespaiola.~Vespaiola。|breganze
Name one Valpolicella red grape.~说出一个 Valpolicella 红品种。|Corvina.~Corvina。|valpo
Is Veneto one DOC?~Veneto 是一个 DOC 吗？|No; an administrative region.~不是，是行政大区。|prosecco
Which city lies west of Soave?~Soave 以西的主要城市？|Verona.~Verona。|soave
Soave DOC minimum Garganega?~Soave DOC 最低 Garganega？|70%.~70%。|soave
Two main complements in Soave DOC?~Soave DOC 两个主要辅助品种？|Trebbiano di Soave and Chardonnay.~Trebbiano di Soave 与 Chardonnay。|soave
Name Soave DOC’s two subzones.~Soave DOC 两个子区？|Classico and Colli Scaligeri.~Classico 与 Colli Scaligeri。|soave
What happens during appassimento?~Appassimento 做什么？|Grapes are dried.~将葡萄风干。|amarone
What distinguishes Ripasso?~Ripasso 的关键工艺？|Re-fermentation on Amarone/Recioto marc.~在 Amarone／Recioto 酒渣上再发酵。|ripasso
Name Bardolino’s three subzones.~Bardolino 三个子区？|Montebaldo, La Rocca, Sommacampagna.~Montebaldo、La Rocca、Sommacampagna。|bardolino-zones
Is all Soave soil volcanic?~Soave 全是火山土吗？|No; limestone also occurs.~不是，也有石灰岩。|soave-soils
Prosecco DOC Rosé Glera range?~Prosecco DOC 桃红 Glera 比例？|85–90%.~85–90%。|prosecco
Prosecco DOC Rosé red grape and range?~Prosecco DOC 桃红红品种及比例？|Pinot Noir, 10–15%.~Pinot Noir，10–15%。|prosecco
Obligatory vintage wording on Prosecco DOC Rosé?~Prosecco DOC 桃红须标什么年份用语？|Millesimato and the year.~Millesimato 与年份。|prosecco
Does Prosecco DOC include Verona province?~Prosecco DOC 包括 Verona 省吗？|No.~不包括。|prosecco
Which other region shares Prosecco DOC?~Prosecco DOC 还跨哪个大区？|Friuli-Venezia Giulia.~Friuli-Venezia Giulia。|prosecco
Is Asolo the same DOCG as Conegliano Valdobbiadene?~Asolo 与 Conegliano Valdobbiadene 同一 DOCG 吗？|No; separate DOCGs.~不是，各自独立。|asolo
What does Rive identify?~Rive 指什么？|Named steep hillside origins.~命名陡坡产地。|rive
Where is Cartizze?~Cartizze 在哪里？|Valdobbiadene hills.~Valdobbiadene 丘陵。|cv
Is Glera Lunga identical to Glera?~Glera Lunga 与 Glera 相同吗？|No.~不是。|g-glera-lunga
Which Raboso is called Friularo?~哪个 Raboso 称 Friularo？|Raboso Piave.~Raboso Piave。|g-raboso-piave
Raboso Veronese’s parents?~Raboso Veronese 亲本？|Raboso Piave × Marzemina Bianca.~Raboso Piave × Marzemina Bianca。|g-raboso-veronese
What grape lies behind Durello?~Durello 背后什么品种？|Durella.~Durella。|g-durella
Which grape is Masi Osar’s reference?~Masi Osar 参照哪个品种？|Oseleta.~Oseleta。|g-oseleta''')
quiz(taa,'''Name the two provincial wine territories.~两个省级葡萄酒区域？|Trentino and Alto Adige/Südtirol.~Trentino 与 Alto Adige／Südtirol。|trentino
Which river valley links many vineyards?~哪个河谷连接许多葡萄园？|Adige/Etsch.~Adige／Etsch。|alto-climate
Trento DOC’s main style?~Trento DOC 主要风格？|Traditional-method sparkling.~传统法起泡。|trento
Teroldego Rotaliano’s defining grape?~Teroldego Rotaliano 定义性品种？|Teroldego.~Teroldego。|rotaliano
Name a local Trentino white.~说出 Trentino 本地白品种。|Nosiola.~Nosiola。|trentino-growers
Which local red is linked to Gries?~Gries 对应哪个本地红品种？|Lagrein.~Lagrein。|alto-zones
Is Moscato Rosa normally sweet?~Moscato Rosa 通常甜吗？|Yes.~是。|g-moscato-rosa
Which group is called Vernatsch?~哪组品种称 Vernatsch？|Schiava.~Schiava。|g-schiava-gentile
Are Trento DOC and Trentino DOC identical?~Trento DOC 与 Trentino DOC 相同吗？|No.~不同。|trentino
Name a site factor besides latitude.~除纬度外一个地块因素？|Altitude or exposure.~海拔或朝向。|alto-climate
Trento non-vintage minimum lees ageing?~Trento 无年份最低酒泥陈年？|15 months.~15 个月。|trento
Trento vintage minimum lees ageing?~Trento 年份最低酒泥陈年？|24 months.~24 个月。|trento
Trento riserva minimum lees ageing?~Trento riserva 最低酒泥陈年？|36 months.~36 个月。|trento
Can Trento DOC be rosé?~Trento DOC 可以桃红吗？|Yes.~可以。|trento
Which river deposited Rotaliana gravel?~哪个河流沉积 Rotaliana 砾石？|Noce.~Noce。|rotaliano
Name two cooler Alto Adige zones.~两个较凉 Alto Adige 区域？|Eisacktal and Vinschgau.~Eisacktal 与 Vinschgau。|alto-zones
Name a warmer Alto Adige area.~一个较暖 Alto Adige 区域？|Bolzano or southern valley sites.~Bolzano 或南部河谷。|alto-zones
Is Alto Adige geologically uniform?~Alto Adige 地质单一吗？|No; rock types vary strongly.~不，岩石类型变化大。|alto-soils
What is an UGA?~UGA 是什么？|An additional defined geographical unit.~附加限定地理单元。|alto-uga
Are Schiava Gentile and Grossa interchangeable?~Schiava Gentile、Grossa 可互换吗？|No; separate varieties.~不能，是不同品种。|g-schiava-gentile
Who bred Rebo?~谁培育 Rebo？|Rebo Rigotti.~Rebo Rigotti。|g-rebo
Rebo’s parents?~Rebo 亲本？|Merlot × Teroldego.~Merlot × Teroldego。|g-rebo
Is Rebo interspecific?~Rebo 是种间杂交吗？|No; within Vitis vinifera.~不是，是欧亚种内。|g-rebo
Which Trentino area is linked to Marzemino?~Trentino 哪里与 Marzemino 联系？|Vallagarina.~Vallagarina。|g-marzemino
Casetta’s local name?~Casetta 地方名？|Foja Tonda.~Foja Tonda。|g-casetta
Enantio’s historical name?~Enantio 历史名？|Lambrusco a Foglia Frastagliata.~Lambrusco a Foglia Frastagliata。|g-enantio
Name two Casetta training systems.~Casetta 两种整枝？|Pergola and Guyot.~Pergola 与 Guyot。|g-casetta
Why can Moscato Rosa crops be erratic?~Moscato Rosa 为何产量不稳？|Female flowers and uneven fruit set.~雌花及坐果不均。|g-moscato-rosa
Name two Marzemino disease risks.~Marzemino 两个病害风险？|Powdery mildew and sour rot.~白粉病与酸腐。|g-marzemino
Which is usually lighter, Schiava or Lagrein?~Schiava、Lagrein 哪个通常更轻？|Schiava.~Schiava。|g-schiava-gentile''')
quiz(fvg,'''Which country contains Friuli-Venezia Giulia?~Friuli-Venezia Giulia 属于哪国？|Italy.~意大利。|collio
Are Collio and Colli Orientali one DOC?~Collio、Colli Orientali 同一 DOC 吗？|No.~不是。|co
Name a local white grape.~一个本地白品种？|Friulano or Ribolla Gialla.~Friulano 或 Ribolla Gialla。|co
Which grape makes Ramandolo?~Ramandolo 用什么品种？|Verduzzo Friulano.~Verduzzo Friulano。|ramandolo
Is Ramandolo dry or sweet?~Ramandolo 干还是甜？|Sweet.~甜。|ramandolo
Which city is linked to the Karst?~哪个城市与 Karst 相关？|Trieste.~Trieste。|carso-law
Name a Karst white grape.~一个 Karst 白品种？|Vitovska.~Vitovska。|g-vitovska
What is ponca?~Ponca 是什么？|Layered marl and sandstone.~交替泥灰岩与砂岩。|collio
Is Rosazzo DOCG red?~Rosazzo DOCG 是红酒吗？|No; a white blend.~不是，是白混酿。|rosazzo-law
Name an international white grown here.~本地一个国际白品种？|Pinot Gris or Sauvignon Blanc.~Pinot Gris 或 Sauvignon Blanc。|collio
When did Collio become DOC?~Collio 何时获得 DOC？|1968.~1968 年。|collio
When did Ramandolo become DOCG?~Ramandolo 何时获得 DOCG？|2001.~2001 年。|ramandolo
Can Verduzzo Trevigiano replace Friulano in Ramandolo?~Ramandolo 可用 Trevigiano 替代 Friulano 吗？|No.~不能。|ramandolo
Which province contains Collio’s core?~Collio 核心在哪个省？|Gorizia.~Gorizia。|collio
Which province contains Colli Orientali?~Colli Orientali 在哪个省？|Udine.~Udine。|co
Collio ponca’s geological age?~Collio ponca 地质时代？|Eocene.~始新世。|collio
Zidarich Vitovska’s documented soils?~Zidarich Vitovska 土壤？|Limestone and terra rossa.~石灰岩及红土。|g-vitovska
Do all Friuli whites use skin contact?~Friuli 白酒都浸皮吗？|No.~不是。|g-vitovska
Name two local eastern-hill reds.~两个东部丘陵本地红品种？|Pignolo and Schioppettino.~Pignolo 与 Schioppettino。|co
Is Ribolla Gialla di Rosazzo the same as Rosazzo DOCG?~Ribolla Gialla di Rosazzo 等于 Rosazzo DOCG 吗？|No; the former is in Friuli Colli Orientali DOC.~不，前者在 Friuli Colli Orientali DOC 内。|co-law
Who manages the Rosazzo Abbey vineyards?~谁管理 Rosazzo 修道院园？|Livio Felluga.~Livio Felluga。|rosazzo
Which grape leads Rosazzo DOCG?~Rosazzo DOCG 主干品种？|Friulano, minimum 50%.~Friulano，至少 50%。|rosazzo-law
Name the four regional Prosecco DOC provinces.~大区内四个 Prosecco DOC 省？|Gorizia, Pordenone, Trieste, Udine.~Gorizia、Pordenone、Trieste、Udine。|prosecco
Collio Bianco suggested serving range?~Collio Bianco 建议温度？|10–12°C.~10–12°C。|collio
Which grower revived Cividin and Cjanorie?~哪个种植者复兴 Cividin、Cjanorie？|Emilio Bulfon.~Emilio Bulfon。|bulfon
Cividin’s ripening tendency?~Cividin 成熟倾向？|Very late.~极晚。|g-cividin
Cjanorie’s alternate spelling?~Cjanorie 另一拼法？|Cianorie.~Cianorie。|g-cjanorie
Is Sagrestana’s proposed parentage confirmed?~Sagrestana 所谓亲本已证实吗？|No; a local hypothesis.~没有，是地方假说。|g-sagrestana
Where is Cordenossa associated?~Cordenossa 与哪里联系？|Western Friuli.~Friuli 西部。|g-cordenossa
Is every conserved variety permitted in every DOC?~每个保育品种都可用于每个 DOC 吗？|No; rules are denomination-specific.~不是，各产区有具体规范。|ersa''')
quiz(emilia,'''Which country contains Emilia-Romagna?~Emilia-Romagna 属于哪国？|Italy.~意大利。|er
Is Lambrusco a single variety?~Lambrusco 是单一品种吗？|No.~不是。|lambrusco
Romagna’s principal red grape?~Romagna 主要红品种？|Sangiovese.~Sangiovese。|sangiovese
Romagna Albana DOCG’s grape?~Romagna Albana DOCG 品种？|Albana.~Albana。|albana
Is every Lambrusco sweet?~所有 Lambrusco 都甜吗？|No.~不是。|sorbara
Which Lambrusco is usually pale and light?~哪个 Lambrusco 通常浅且轻？|Sorbara.~Sorbara。|sorbara
Which Lambrusco is linked to Castelvetro?~Castelvetro 对应哪个 Lambrusco？|Grasparossa.~Grasparossa。|grasparossa
Name two central Lambrusco provinces.~两个核心 Lambrusco 省份？|Modena and Reggio Emilia.~Modena、Reggio Emilia。|lambrusco
Can Albana be dry?~Albana 可以干型吗？|Yes.~可以。|albana
Is Ancellotta a Lambrusco synonym?~Ancellotta 是 Lambrusco 同义名吗？|No.~不是。|g-ancellotta
Romagna Albana DOCG minimum Albana?~Romagna Albana DOCG 最低 Albana？|95%.~95%。|albana
Sorbara DOC minimum named grape?~Sorbara DOC 同名品种最低比例？|60%.~60%。|sorbara
Grasparossa DOC minimum named grape?~Grasparossa DOC 同名品种最低比例？|85%.~85%。|grasparossa
Salamino di Santa Croce DOC minimum named grape?~Salamino di Santa Croce DOC 同名品种最低比例？|85%.~85%。|salamino
Two non-Lambrusco complements in Salamino DOC?~Salamino DOC 两个非 Lambrusco 补充品种？|Ancellotta and Fortana.~Ancellotta 与 Fortana。|salamino
How does Grasparossa differ structurally from Sorbara?~Grasparossa 与 Sorbara 结构差别？|More colour, body and tannin, typically.~通常颜色、酒体、单宁更多。|grasparossa
What formed Modena plain soils?~Modena 平原土壤成因？|River sedimentation.~河流沉积。|salamino
Two provinces included in Romagna Albana?~Romagna Albana 覆盖两个省？|Ravenna and Forlì-Cesena; also Bologna.~Ravenna、Forlì-Cesena，也含 Bologna。|albana
Are Reggiano DOC and Modena DOC identical?~Reggiano DOC 与 Modena DOC 相同吗？|No.~不同。|reggiano
Which white is associated with Scandiano?~Scandiano 对应哪个白品种？|Spergola, genetically identical to Vernaccia di Oristano.~Spergola，遗传上与 Vernaccia di Oristano 相同。|g-spergola
Is Spergola Sauvignon Blanc?~Spergola 是 Sauvignon Blanc 吗？|No.~不是。|g-spergola
Centesimino’s local name?~Centesimino 地方名？|Savignôn Rosso.~Savignôn Rosso。|g-centesimino
Is Centesimino Alicante?~Centesimino 是 Alicante 吗？|No.~不是。|g-centesimino
Famoso’s alternate name?~Famoso 另一名称？|Rambella.~Rambella。|g-famoso
Trebbianina’s historical name?~Trebbianina 历史名？|Trebbiano di Spagna.~Trebbiano di Spagna。|g-trebbianina
Does Trebbiano di Spagna prove Spanish origin?~Trebbiano di Spagna 证明西班牙起源吗？|No.~不能。|g-trebbianina
Which grape favours coastal sands?~哪个品种适应海岸沙土？|Fortana.~Fortana。|g-fortana
Uva Tosca’s traditional territory?~Uva Tosca 传统地区？|Emilia Apennine hills and mountains.~Emilia 亚平宁丘陵山区。|g-uva-tosca
Is Negretto French Négrette?~Negretto 是法国 Négrette 吗？|No.~不是。|g-negretto
Why distinguish Lambrusco Oliva and Fiorano?~为何区分 Lambrusco Oliva 与 Fiorano？|Similar historical names do not establish identity.~相似历史名不能证明相同。|g-lambrusco-oliva''')
# Recovered geographical territories and individual denominations.
def profile(id,name,parent,intro,src,text,edges,aliases='',kind='appellation'):
 rows=[]
 for ln in text.strip().splitlines():
  section,label,body,*sid=ln.split('|');rows.append((section,label,body,sid[0] if sid else src))
 return reg(id,name,kind,parent,intro,rows,edges,aliases)
trentino=profile('it-trentino','Trentino','it-trentino-alto-adige','Wine territory of the autonomous province of Trento, encompassing several distinct DOCs.~Trento 自治省葡萄酒区域，含多个独立 DOC。','trentino-growers','''overview|Scope~范围|Province-level wine territory, distinct from Trentino DOC.~省级葡萄酒区域，区别于 Trentino DOC。
geography|Axis~轴线|Adige valley, tributary valleys and hillside vineyards.~Adige 河谷、支流谷地及丘陵葡萄园。
geography|Vallagarina~Vallagarina|Southern valley associated with Marzemino and Enantio.~南部谷地与 Marzemino、Enantio 相连。
history|Research~研究|San Michele all’Adige is associated with Rebo Rigotti and Rebo.~San Michele all’Adige 与 Rebo Rigotti、Rebo 相关。|g-rebo
climate|Altitude~海拔|Mountain exposure and diurnal variation shape sparkling vineyard sites.~山地朝向及昼夜温差影响起泡园地。|trento-place
soils|Rotaliana~Rotaliana|Gravelly Noce alluvium is a reference for Teroldego.~Noce 砾石冲积地是 Teroldego 的参照。|rotaliano
grapes|Local whites~本地白品种|Nosiola is a distinctive local white.	~Nosiola 是特色本地白品种。
grapes|Local reds~本地红品种|Teroldego, Marzemino, Enantio and Casetta are distinct identities.~Teroldego、Marzemino、Enantio、Casetta 各有独立身份。
grapes|Rebo~Rebo|Merlot × Teroldego; a vinifera crossing.~Merlot × Teroldego，为欧亚种内杂交。|g-rebo
law|DOCs~DOC|Trentino, Trento, Teroldego Rotaliano, Valdadige and Casteller.~Trentino、Trento、Teroldego Rotaliano、Valdadige、Casteller。|trentino
law|IGTs~IGT|Vigneti delle Dolomiti and Vallagarina provide additional geographical designations.~Vigneti delle Dolomiti、Vallagarina 为其他地理名称。|trentino
vinification|Sparkling~起泡|Trento DOC uses traditional bottle fermentation.~Trento DOC 使用传统瓶中二次发酵。|trento
vinification|Passito~风干|Local traditions also include sweet wines, not only sparkling and dry wines.~本地还保有甜酒传统。
producers|Casetta~Casetta|Albino Armani’s Foja Tonda provides a varietal Casetta reference.~Albino Armani 的 Foja Tonda 是 Casetta 单品种参照。|g-casetta
service|Schiava Gentile~Schiava Gentile|Cavit recommends 12–14°C for Bottega Vinai Schiava Gentile.~Cavit 为 Bottega Vinai Schiava Gentile 建议 12–14°C。|g-schiava-gentile''',edge('teroldego nosiola chardonnay pinot-blanc pinot-gris muller-thurgau','trentino-growers')+edge('marzemino','g-marzemino')+edge('enantio','g-enantio')+edge('casetta','g-casetta')+edge('rebo','g-rebo')+edge('schiava-gentile','g-schiava-gentile'),'Trento province',kind='subregion')
alto=profile('it-alto-adige','Alto Adige / Südtirol','it-trentino-alto-adige','Autonomous Bolzano province: Alpine valleys, diverse elevations and both local and international grapes.~Bolzano 自治省：阿尔卑斯谷地、多样海拔及本地和国际品种。','alto','''overview|Scope~范围|A geographical province; Alto Adige DOC is a denomination within it.~地理省份；Alto Adige DOC 是其中的法定名称。
geography|Valleys~谷地|Adige/Etsch, Eisack/Isarco and Vinschgau/Val Venosta.~Adige／Etsch、Eisack／Isarco、Vinschgau／Val Venosta。
geography|Bolzano~Bolzano|A warm basin contrasted with higher, cooler vineyards.~温暖盆地与较高、凉爽葡萄园形成对比。|alto-climate
climate|Exposure~朝向|Valley winds, slopes and elevation create marked local differences.~谷风、坡面、海拔造成明显局部差异。|alto-climate
climate|Northern districts~北部区域|Eisacktal and Vinschgau favour cooler-site white styles.~Eisacktal、Vinschgau 有利于凉地白酒风格。|alto-zones
soils|Geological range~地质范围|Porphyry, limestone, dolomite, glacial and river deposits coexist.~斑岩、石灰岩、白云岩、冰川及河流沉积并存。|alto-soils
soils|Gries~Gries|Bolzano-Gries alluvial gravels and sands are associated with Lagrein.~Bolzano-Gries 冲积砾石、沙土与 Lagrein 相关。|alto-zones
grapes|Local red core~本地红品种|Lagrein and the Schiava group are separate identities.~Lagrein 与 Schiava 群为不同身份。|alto-zones
grapes|Whites~白品种|Pinot Blanc, Chardonnay, Sauvignon and Gewürztraminer are key references.~Pinot Blanc、Chardonnay、Sauvignon、Gewürztraminer 为核心参照。
grapes|Moscato Rosa~Moscato Rosa|A rare aromatic red with functionally female flowers and low yields.~罕见芳香红品种，功能性雌花且低产。|g-moscato-rosa
history|Moscato Rosa~Moscato Rosa|Moscato Rosa wine was exhibited in Bolzano in 1886.~1886 年 Bolzano 展览已有 Moscato Rosa 酒。|g-moscato-rosa
law|Additional units~附加单元|UGA designations link specified origins and permitted grapes.~UGA 名称连接指定产地与允许品种。|alto-uga
law|Province and wine~省份与酒|A provincial origin does not automatically establish DOC eligibility.~省内产地本身不自动证明 DOC 资格。
vinification|Range~范围|Still dry whites and reds coexist with sweet aromatic specialities.~静止干白、干红与芳香甜酒并存。
producers|Structure~生产结构|Cooperatives, estates and independent growers all form part of the region.~合作社、庄园与独立种植者共同构成产区。''',edge('lagrein schiava-grossa pinot-blanc pinot-gris chardonnay sauvignon-blanc gewurztraminer kerner goldmuskateller','alto')+edge('moscato-rosa','g-moscato-rosa'),'Alto Adige|Südtirol|South Tyrol',kind='subregion')
for sid,title,url in [('amarone-law','MASAF · Amarone consolidated 2023','https://www.consorziovalpolicella.it/wp-content/uploads/2024/02/DisciplinareAmarone-della-Valpolicella.pdf'),('ripasso-law','MASAF · Ripasso consolidated 2023','https://www.consorziovalpolicella.it/wp-content/uploads/2024/02/DisciplinareValpolicella-Ripasso.pdf'),('recioto-law','Consorzio · Recioto production code translation','https://www.consorziovalpolicella.it/wp-content/uploads/2021/03/DOCG_Recioto_della_Valpolicella-ENG.pdf')]:S[sid]=(title,url)
soave_common='''geography|Location~位置|Eastern Verona hills and adjoining plains.~Verona 东部丘陵与邻近平原。
geography|Classico~Classico|The historical zone centres on Soave and Monteforte d’Alpone.~历史区以 Soave、Monteforte d’Alpone 为中心。
soils|Volcanic sector~火山区|Eastern hills include basalt-derived soils.~东部丘陵含玄武岩风化土。|soave-soils
soils|Limestone sector~石灰岩区|Western hills include shallow calcareous soils.~西部丘陵含浅层石灰质土。|soave-soils
soils|Plains~平原|Alluvial materials differ from the hillside substrates.~冲积材料不同于丘陵母质。|soave-soils
grapes|Principal grape~主要品种|Garganega forms at least 70% of the blend.~Garganega 至少占 70%。
vinification|White wine~白葡萄酒|Garganega-led white styles; cellar vessel and lees choices vary by producer.~Garganega 主导白酒，容器及酒泥处理因生产者而异。
service|Geological reading~地质阅读|Soave includes both volcanic and limestone sites; the name alone does not identify one soil.~Soave 兼有火山、石灰岩地块，名称不能单独判断土壤。'''
profile('it-soave-doc','Soave DOC','it-veneto','Garganega-led white denomination east of Verona, including historical hills and a wider delimited zone.~Verona 东侧以 Garganega 为主的白酒产区，含历史丘陵及较广划定区域。','soave',soave_common+'''
overview|Classification~分类|DOC, distinct from Soave Superiore DOCG and Recioto di Soave DOCG.~DOC，区别于 Soave Superiore DOCG、Recioto di Soave DOCG。
history|Recognition~认可|DOC recognised in 1968.~1968 年获 DOC。
grapes|Complement~辅助品种|Trebbiano di Soave and Chardonnay together may form up to 30%.~Trebbiano di Soave、Chardonnay 合计最多 30%。
grapes|Other whites~其他白品种|Up to 5% authorised non-aromatic white grapes within the complementary share.~辅助份额中可有最多 5% 获准非芳香白品种。
law|Geographical mentions~地理标示|Classico and Colli Scaligeri identify different delimited hillside areas.~Classico、Colli Scaligeri 指不同划定丘陵区域。
law|Identity~身份|Trebbiano di Soave corresponds to Verdicchio, not Trebbiano Toscano.~Trebbiano di Soave 对应 Verdicchio，非 Trebbiano Toscano。
grapes|Training~整枝|The code accommodates espalier and pergola systems.~规章允许篱架与 pergola 系统。''',edge('garganega verdicchio chardonnay','soave'),'Soave|Soave Classico|Soave Colli Scaligeri')
profile('it-soave-superiore-docg','Soave Superiore DOCG','it-veneto','Separate Garganega-led DOCG associated with the Soave hillside zone.~与 Soave 丘陵区相连、以 Garganega 为主的独立 DOCG。','soave-full',soave_common+'''
overview|Classification~分类|DOCG with its own production code.~DOCG，独立生产规范。
history|Relationship~关系|Developed from the established Soave production tradition.~发展自既有 Soave 生产传统。
grapes|Complement~辅助品种|Trebbiano di Soave up to 30%; do not import the Soave DOC Chardonnay clause.~Trebbiano di Soave 最多 30%；不可直接套用 Soave DOC 的 Chardonnay 条款。
grapes|Other whites~其他白品种|Other authorised non-aromatic whites are limited to 5% within the complementary share.~其他获准非芳香白品种在辅助份额中最多 5%。
law|Classico~Classico|Classico is a geographical mention within the DOCG.~Classico 是 DOCG 内地理标示。
law|Riserva~Riserva|Riserva is separately regulated within the DOCG.~Riserva 由 DOCG 内独立条款规范。
vinification|Distinction~区分|A dry-white denomination, distinct from sweet Recioto di Soave.~干白产区，区别于甜型 Recioto di Soave。''',edge('garganega verdicchio','soave-full'),'Soave Superiore|Soave Superiore Classico')
valpo_base='''geography|Location~位置|Verona province, north of the city and east towards the Lessini valleys.~Verona 省，城市北侧并向东延入 Lessini 谷地。|valpo
geography|Classico~Classico|Negrar, Marano, Fumane, Sant’Ambrogio and San Pietro in Cariano form the historical core.~Negrar、Marano、Fumane、Sant’Ambrogio、San Pietro in Cariano 构成历史核心。
geography|Valpantena~Valpantena|A separate geographical mention referring to the Valpantena valley.~指 Valpantena 谷地的独立地理标示。
climate|Influences~气候影响|Lessini relief and proximity to Lake Garda create varied exposures and airflow.~Lessini 地形与 Garda 湖邻近性形成多样朝向及气流。|valpo
soils|Mosaic~多样性|Calcareous and dolomitic rocks, basalt, morainic and river deposits occur.~石灰质及白云岩、玄武岩、冰碛及河流沉积并存。|valpo
grapes|Core~核心|Corvina/Corvinone and Rondinella underpin the wine.~Corvina／Corvinone 与 Rondinella 构成基础。|valpo
'''
profile('it-valpolicella-doc','Valpolicella DOC','it-veneto','Fresh-grape red DOC of Verona, separate from Ripasso and the two dried-grape DOCGs.~Verona 鲜葡萄红酒 DOC，与 Ripasso 及两个风干 DOCG 分开。','valpo',valpo_base+'''overview|Classification~分类|DOC for red wine, including Superiore.~红酒 DOC，含 Superiore。
history|Recognition~认可|DOC recognition dates to 1968.~1968 年获 DOC。
law|Geographical mentions~地理标示|Classico and Valpantena can qualify the denomination.~可使用 Classico、Valpantena 地理标示。
law|Separate denominations~独立产区|Amarone, Recioto and Ripasso have their own rules.~Amarone、Recioto、Ripasso 各有规章。
vinification|Base style~基础风格|Red fermentation of fresh grapes; appassimento is not the defining process.~鲜葡萄红酿，定义工艺不是风干。
vinification|Ripasso comparison~Ripasso 对比|Ripasso adds a regulated re-fermentation on dried-grape wine marc.~Ripasso 增加在风干酒渣上再发酵的法定程序。|ripasso
service|Profile~风格|Fresh cherry-led fruit and moderate structure distinguish the basic style.~基本风格以清新樱桃果味、中等结构为特征。
service|Sweetness~甜度|The denomination is not the sweet Recioto designation.~此名称不是甜型 Recioto。''',edge('corvina corvinone rondinella','valpo'),'Valpolicella|Valpolicella Classico|Valpolicella Superiore')
profile('it-amarone-della-valpolicella-docg','Amarone della Valpolicella DOCG','it-veneto','Concentrated dry-style red from dried Valpolicella grapes.~由 Valpolicella 风干葡萄酿成的浓缩干型风格红酒。','amarone-law',valpo_base+'''overview|Classification~分类|Separate DOCG since 2010.~2010 年起为独立 DOCG。
history|Earlier recognition~早期认可|Recognised as a wine type within the 1968 DOC.~1968 年 DOC 已认可此类型。
grapes|Blend~比例|Corvina and/or Corvinone 45–95%; Rondinella 5–30%.~Corvina 和／或 Corvinone 45–95%；Rondinella 5–30%。
grapes|Additional varieties~其他品种|Other permitted red grapes may total 25%, subject to category and individual limits.~其他获准红品种合计可至 25%，须满足类别及单品种限制。
vinification|Appassimento~风干|Selected sound bunches dry in ventilated fruttai before fermentation.~挑选健康果穗，在通风 fruttai 风干后发酵。
vinification|Fermentation date~发酵日期|Normally not before 1 December; authorised vintage exceptions may apply.~通常不得早于 12 月 1 日酿造，可有获准年份例外。
law|Ageing~陈年|At least two years from 1 January after harvest.~自采收后 1 月 1 日起至少两年。
law|Riserva~Riserva|At least four years from 1 November of harvest year.~自采收年 11 月 1 日起至少四年。
service|Structure~结构|Full body, warmth and dried-fruit character; concentration does not make it Recioto.~饱满、温热、干果特征；浓缩不等于 Recioto。
service|Alcohol~酒精|Minimum actual alcohol 14% vol.; the sugar ceiling is alcohol-dependent.~实际酒精至少 14%；残糖上限与酒精相关。''',edge('corvina corvinone rondinella','amarone-law'),'Amarone|Amarone della Valpolicella|Amarone Classico')
profile('it-recioto-della-valpolicella-docg','Recioto della Valpolicella DOCG','it-veneto','Sweet red DOCG made from dried grapes; a separate denomination from Amarone.~以风干葡萄酿制的甜红 DOCG，与 Amarone 独立。','recioto-law',valpo_base+'''overview|Classification~分类|DOCG recognised in 2010, following the earlier DOC tradition.~2010 年获 DOCG，承接此前 DOC 传统。
history|Tradition~传统|Sweet dried-grape wine precedes modern dry-style Amarone.~甜型风干酒传统早于现代干型风格 Amarone。
grapes|Blend~比例|Corvina and/or Corvinone 45–95%; Rondinella 5–30%.~Corvina 和／或 Corvinone 45–95%；Rondinella 5–30%。
grapes|Vineyard exclusions~园地限制|Peaty and excessively damp valley-floor sites are excluded.~排除泥炭及过湿谷底地块。
vinification|Drying~风干|Healthy bunch selection and ventilated drying concentrate the grapes.~健康果穗选择及通风风干浓缩果实。
vinification|Sweetness~甜度|Fermentation is managed to preserve substantial grape sugar.~控制发酵，保留大量葡萄糖分。
law|Types~类型|Still Recioto and Recioto spumante are both recognised.~同时认可静止 Recioto 与 Recioto spumante。
law|Geographical mentions~地理标示|Still wines may be Classico or Valpantena; spumante may be Valpantena.~静止可标 Classico、Valpantena；起泡可标 Valpantena。
service|Reference~参照|Sweet, concentrated red fruit contrasts with Amarone’s dry-style finish.~甜、浓缩红果与 Amarone 干型风格收尾对比。''',edge('corvina corvinone rondinella','recioto-law'),'Recioto della Valpolicella|Recioto della Valpolicella Classico')
profile('it-valpolicella-ripasso-doc','Valpolicella Ripasso DOC','it-veneto','Valpolicella red re-fermented on Amarone or Recioto marc under a separate DOC.~Valpolicella 红酒在 Amarone 或 Recioto 酒渣上再发酵，属独立 DOC。','ripasso-law',valpo_base+'''overview|Classification~分类|A DOC, not a DOCG.~DOC，并非 DOCG。
history|Autonomy~独立|Separate production code approved in 2010.~2010 年批准独立规章。
grapes|Blend~比例|Corvina and/or Corvinone 45–95%; Rondinella 5–30%.~Corvina 和／或 Corvinone 45–95%；Rondinella 5–30%。
vinification|Ripasso~Ripasso|Re-fermentation uses Amarone or Recioto marc.~使用 Amarone 或 Recioto 酒渣再发酵。
vinification|Duration~时间|The ripasso operation lasts at least three days.~Ripasso 程序至少三天。
law|Ownership~所有权|Wine and marc belong to the producer arranging the re-fermentation.~酒与酒渣须属安排再发酵的同一生产者。
law|Release~上市|Not before 1 January of the second year after harvest.~不得早于采收后第二年 1 月 1 日上市。
law|Types~类型|Classico, Valpantena and Superiore are permitted qualifications.~可使用 Classico、Valpantena、Superiore。
service|Alcohol~酒精|Minimum 12.5% actual alcohol; Superiore 13%.~实际酒精至少 12.5%，Superiore 至少 13%。
service|Profile~风格|Greater body and softer texture than a simple fresh-grape Valpolicella.~相较简单鲜葡萄 Valpolicella，酒体更厚、质地更柔。''',edge('corvina corvinone rondinella','ripasso-law'),'Valpolicella Ripasso|Ripasso')
profile('it-bardolino-doc','Bardolino DOC','it-veneto','Lake Garda’s eastern-shore red and Chiaretto rosé denomination.~Garda 湖东岸红酒及 Chiaretto 桃红产区。','bardolino','''overview|Location~位置|Verona province along eastern Lake Garda.~Verona 省 Garda 湖东岸。
geography|Landscape~地貌|Rolling morainic hills rather than the core Valpolicella valleys.~起伏冰碛丘陵，区别于 Valpolicella 核心谷地。
climate|Lake~湖泊|Lake Garda moderates the nearby vineyard climate.~Garda 湖调节附近葡萄园气候。
soils|Origin~成因|Glacial moraines create varied stony soils.~冰川冰碛形成多样多石土壤。
grapes|Red grapes~红品种|Corvina is central, with Rondinella and Molinara among the local references.~Corvina 为核心，Rondinella、Molinara 为本地参照。
vinification|Red~红酒|Fresh-grape reds favour red fruit and freshness.~鲜葡萄红酒突出红果与清新。
vinification|Chiaretto~Chiaretto|Short skin contact produces rosé.~短时间果皮接触酿桃红。
law|Classification~分类|Bardolino DOC is separate from Bardolino Superiore DOCG.~Bardolino DOC 与 Bardolino Superiore DOCG 独立。
law|Subzones~子区|Montebaldo, La Rocca and Sommacampagna.~Montebaldo、La Rocca、Sommacampagna。|bardolino-zones
geography|Montebaldo~Montebaldo|The northern of the three named subzones.~三个命名子区中的北部区域。|bardolino-zones
geography|La Rocca~La Rocca|The central lakeside subzone.~中部近湖子区。|bardolino-zones
geography|Sommacampagna~Sommacampagna|The southern subzone.~南部子区。|bardolino-zones
service|Comparison~对比|Lighter fresh-fruit expression contrasts with Amarone appassimento concentration.~较轻清新果味与 Amarone 风干浓缩对比。''',edge('corvina rondinella molinara','bardolino'),'Bardolino|Bardolino Chiaretto')
save()
profile('it-prosecco-doc','Prosecco DOC','it-veneto','Cross-regional Glera-led denomination spanning Veneto and Friuli-Venezia Giulia, with separately specified white and rosé styles.~跨 Veneto、Friuli-Venezia Giulia 的 Glera 主导产区，白酒与桃红各有规范。','prosecco','''overview|Classification~分类|DOC, distinct from Conegliano Valdobbiadene and Asolo DOCGs.~DOC，与 Conegliano Valdobbiadene、Asolo 两个 DOCG 独立。
history|Modern denomination~现代产区|Established in 2009.~建立于 2009 年。
geography|Veneto~Veneto|Belluno, Padova, Treviso, Venezia and Vicenza provinces.~Belluno、Padova、Treviso、Venezia、Vicenza 五省。
geography|Friuli-Venezia Giulia~Friuli-Venezia Giulia|Gorizia, Pordenone, Trieste and Udine provinces.~Gorizia、Pordenone、Trieste、Udine 四省。
geography|Exclusion~边界|Verona is not one of the nine DOC provinces.~Verona 不在九个 DOC 省份中。
grapes|White blend~白酒比例|Glera at least 85%.~Glera 至少 85%。
grapes|White complements~白酒辅助品种|Up to 15% Verdiso, Bianchetta Trevigiana, Perera, Glera Lunga, Chardonnay, Pinot Blanc, Pinot Gris or white-vinified Pinot Noir.~最多 15% Verdiso、Bianchetta Trevigiana、Perera、Glera Lunga、Chardonnay、Pinot Blanc、Pinot Gris、白酿 Pinot Noir。
grapes|Rosé blend~桃红比例|Glera 85–90%; red-vinified Pinot Noir 10–15%.~Glera 85–90%；红酿 Pinot Noir 10–15%。
vinification|White styles~白酒类型|Still, frizzante and spumante.~静止、微起泡、起泡。
vinification|Rosé style~桃红类型|Rosé is exclusively spumante.~桃红仅为 spumante 起泡。
vinification|Sparkling practice~起泡工艺|Tank fermentation is central to the fresh fruit-led sparkling style.~罐式二次发酵是清新果味起泡风格的核心。
law|Rosé vintage~桃红年份|Millesimato is compulsory; at least 85% from the stated vintage.~必须标 Millesimato，至少 85% 来自所标年份。
law|Treviso and Trieste~Treviso 与 Trieste|Provincial mentions require grape production, vinification and bottling within the stated province.~省名标示要求种植、酿造、装瓶均在该省。
service|Distinction~区分|Prosecco DOC rosé rules cannot be transferred to either DOCG.~Prosecco DOC 桃红规则不可移植到两个 DOCG。
service|Grape name~品种名称|Glera is the grape name; Prosecco is the protected wine designation.~Glera 为品种名；Prosecco 为受保护酒名。''',edge('glera glera-lunga verdiso chardonnay pinot-blanc pinot-gris pinot-noir','prosecco'),'Prosecco|Prosecco Treviso|Prosecco Trieste')
profile('it-conegliano-valdobbiadene-prosecco-docg','Conegliano Valdobbiadene Prosecco DOCG','it-veneto','Historic Treviso hillside origin for Glera-led Prosecco Superiore, with Rive and Cartizze distinctions.~Treviso 历史丘陵 Glera 主导 Prosecco Superiore 产地，含 Rive、Cartizze 区分。','cv','''overview|Classification~分类|DOCG; the sparkling expression bears Superiore.~DOCG；起泡酒使用 Superiore。
history|Recognition~认可|DOCG since 2009, following the historical DOC.~继历史 DOC 后，2009 年获 DOCG。|cv-history
geography|Extent~范围|Fifteen municipalities between Conegliano and Valdobbiadene.~Conegliano 与 Valdobbiadene 之间十五市镇。|cv-history
geography|Relief~地形|Steep, closely spaced hills distinguish this origin from the wider DOC plain.~陡峭密集丘陵有别于广域 DOC 平原。|cv-history
grapes|Core~核心|Glera is the principal variety; traditional local complements contribute to blends.~Glera 为主，传统本地辅助品种参与混酿。
grapes|Local companions~本地辅助|Verdiso and Glera Lunga are separate grape identities.~Verdiso、Glera Lunga 各为独立品种。|g-verdiso
vinification|Sparkling~起泡|Pressure fermentation preserves floral and fresh-fruit expression.~压力二次发酵保留花香与清新果香。
law|Rive~Rive|Forty-three specified Rive origins are recognised.~认可四十三个指定 Rive 产地。|rive
law|Rive harvest~Rive 采收|Rive wines require hand harvesting and vintage indication.~Rive 要求手工采收、标年份。|rive
geography|Cartizze~Cartizze|A 107-hectare delimited hill area in Valdobbiadene.~Valdobbiadene 内划定的 107 公顷丘陵区。
geography|Cartizze places~Cartizze 地点|San Pietro di Barbozza, Santo Stefano and Saccol.~San Pietro di Barbozza、Santo Stefano、Saccol。
law|Cartizze designation~Cartizze 标示|Valdobbiadene Superiore di Cartizze is a specifically delimited expression.~Valdobbiadene Superiore di Cartizze 为指定划区表达。
service|Hierarchy~层级|Rive identifies a named origin; it is not a separate grape.~Rive 标明具体产地，并非品种。
service|Sweetness~甜度|Brut and Extra Dry are dosage categories, not geographical quality ranks.~Brut、Extra Dry 为甜度类别，非地理质量等级。''',edge('glera','cv')+edge('verdiso','g-verdiso')+edge('glera-lunga','g-glera-lunga'),'Conegliano Valdobbiadene|Conegliano-Valdobbiadene|Valdobbiadene|Prosecco Superiore|Cartizze')
profile('it-asolo-prosecco-docg','Asolo Prosecco DOCG','it-veneto','Glera-led sparkling DOCG of the Asolo hills and Montello in Treviso.~Treviso 的 Asolo 丘陵及 Montello、以 Glera 为主的起泡 DOCG。','asolo-law','''overview|Classification~分类|DOCG, separate from Prosecco DOC and Conegliano Valdobbiadene DOCG.~DOCG，与 Prosecco DOC、Conegliano Valdobbiadene DOCG 独立。
history|Recognition~认可|DOCG recognition dates to 2009.~2009 年获 DOCG。|asolo
geography|Hills~丘陵|Asolo hills and Montello in Treviso province.~Treviso 省 Asolo 丘陵及 Montello。
geography|Origin~产地|The delimited hillside origin is smaller than the nine-province Prosecco DOC.~划定丘陵产地小于九省 Prosecco DOC。
grapes|Principal~主要品种|Glera at least 85%.~Glera 至少 85%。
grapes|Traditional complements~传统辅助|Verdiso, Bianchetta Trevigiana, Perera and Glera Lunga may complete the blend.~Verdiso、Bianchetta Trevigiana、Perera、Glera Lunga 可补充混酿。
grapes|Sparkling adjustment~起泡调配|The code also regulates traditional use of Pinot and Chardonnay base wines for spumante.~规章也规范起泡酒传统使用 Pinot、Chardonnay 基酒。
vinification|Main style~主要风格|Fresh, floral sparkling white wine.~清新、花香型起泡白酒。|asolo
vinification|Pressure~压力|Frizzante and spumante are different pressure categories.~Frizzante、spumante 为不同压力类别。
law|Name~名称|Asolo Prosecco and Colli Asolani Prosecco are regulated forms of the designation.~Asolo Prosecco、Colli Asolani Prosecco 为受规范名称形式。
law|Superiore~Superiore|Superiore accompanies the spumante designation.~Superiore 用于 spumante 类型。
service|Origin comparison~产地对比|Asolo is its own DOCG, not a Conegliano Valdobbiadene Rive.~Asolo 为独立 DOCG，不是 Conegliano Valdobbiadene 的 Rive。
service|Rosé~桃红|Do not apply the wider Prosecco DOC rosé specification to this DOCG.~不可套用广域 Prosecco DOC 桃红规范。''',edge('glera glera-lunga verdiso','asolo-law'),'Asolo|Asolo Prosecco|Colli Asolani Prosecco')
profile('it-breganze-doc','Breganze DOC','it-veneto','Vicenza foothill DOC particularly associated with Vespaiola, as dry Vespaiolo and sweet Torcolato.~Vicenza 山麓 DOC，尤其关联 Vespaiola，酿干型 Vespaiolo、甜型 Torcolato。','breganze','''overview|Classification~分类|DOC encompassing white and red types.~涵盖白、红类型的 DOC。
history|Recognition~认可|Recognised in 1969; the first DOC in Vicenza province.~1969 年获认可，是 Vicenza 省首个 DOC。|breganze-history
geography|Position~位置|Foothills north of Vicenza, centred on Breganze.~Vicenza 北部山麓，以 Breganze 为中心。|breganze-history
grapes|Vespaiola~Vespaiola|The local white grape behind Vespaiolo and Torcolato.~Vespaiolo、Torcolato 背后的本地白品种。
grapes|Acidity~酸度|Vespaiola retains marked acidity useful in both dry and sweet styles.~Vespaiola 保有明显酸度，适合干、甜风格。|g-vespaiola
vinification|Vespaiolo~Vespaiolo|Dry white wine showing the grape’s freshness.~干白表达品种清新特征。
vinification|Torcolato~Torcolato|Selected bunches are air-dried before sweet-wine production.~精选果穗风干后酿甜酒。
vinification|Contrast~对比|The same grape produces substantially different dry and dried-grape expressions.~同品种呈现不同干型、风干风格。
law|Wine names~酒名|Vespaiolo and Torcolato are wine types, not separate grape varieties.~Vespaiolo、Torcolato 为酒类型，非不同品种。
service|Sweet profile~甜酒风格|Torcolato combines concentrated fruit with supporting acidity.~Torcolato 结合浓缩果味与支撑酸度。
service|Dry comparison~干型对比|Vespaiolo emphasises freshness without the dried-grape sweetness.~Vespaiolo 强调清新，无风干甜酒的甜度。''',edge('vespaiola','breganze'),'Breganze|Torcolato|Breganze Vespaiolo')
profile('it-trento-doc','Trento DOC','it-trentino','Traditional-method sparkling denomination of Trentino; Trentodoc is its collective promotional identity.~Trentino 传统法起泡产区；Trentodoc 为其集体推广身份。','trento','''overview|Classification~分类|DOC for traditional-method sparkling wine.~传统法起泡酒 DOC。
geography|Province~省份|Vineyards lie in the delimited Trento provincial territory.~葡萄园位于 Trento 省划定区域。|trento-place
geography|Altitude~海拔|Mountain vineyards commonly lie around 200–800 metres; not a single fixed altitude.~山地葡萄园常约 200–800 米，并非单一固定海拔。|trento-place
climate|Mountain effect~山地影响|Day-night temperature differences help retain fresh aromatic and acid profiles.~昼夜温差帮助保留清新香气与酸度。|trento-place
grapes|White grapes~白品种|Chardonnay and Pinot Blanc.~Chardonnay、Pinot Blanc。|trento-grapes
grapes|Black grapes~黑品种|Pinot Noir and Pinot Meunier.~Pinot Noir、Pinot Meunier。|trento-grapes
grapes|Harvest~采收|Careful hand picking and small crates protect intact bunches.~细致手采、小筐保护果穗完整。|trento-grapes
grapes|Training~整枝|Pergola, Guyot and spur cordon are documented.~有 pergola、Guyot、短梢水平蔓。|trento-grapes
vinification|Method~工艺|Second fermentation takes place in bottle.~瓶中进行二次发酵。
vinification|Lees~酒泥|Lees maturation is integral to the style.~酒泥熟成为核心工艺。
vinification|Colours~颜色|White and rosé sparkling expressions.~白色及桃红起泡风格。
law|Non-vintage~无年份|Minimum fifteen months on lees.~酒泥时间至少十五个月。
law|Millesimato~年份|Minimum twenty-four months on lees.~酒泥时间至少二十四个月。
law|Riserva~Riserva|Minimum thirty-six months on lees.~酒泥时间至少三十六个月。
service|Comparison~对比|Trento DOC sparkling is distinct from Trentino DOC still-wine identities.~Trento DOC 起泡区别于 Trentino DOC 静止酒身份。''',edge('chardonnay pinot-blanc pinot-noir pinot-meunier','trento-grapes'),'Trento|Trentodoc')
profile('it-teroldego-rotaliano-doc','Teroldego Rotaliano DOC','it-trentino','Teroldego denomination of the Campo Rotaliano north of Trento.~Trento 北侧 Campo Rotaliano 的 Teroldego 法定产区。','rotaliano','''overview|Classification~分类|DOC; the grape is Teroldego and the origin is Rotaliano.~DOC；Teroldego 为品种，Rotaliano 为产地。
geography|Core~核心|Campo Rotaliano, north of Trento, near Mezzolombardo and Mezzocorona.~Trento 北侧 Campo Rotaliano，近 Mezzolombardo、Mezzocorona。
soils|Noce~Noce|Gravelly alluvial soils associated with the Noce river.~与 Noce 河相连的砾石冲积土。
soils|Reference site~参照地块|The cited Nativi vineyard example is on the Rotaliana plain.~所引 Nativi 葡萄园参照位于 Rotaliana 平原。
grapes|Identity~身份|Teroldego is distinct from Lagrein and Marzemino.~Teroldego 不同于 Lagrein、Marzemino。
grapes|Reference bottling~参照酒款|Cantina Sociale Trento’s Nativi is 100% Teroldego.~Cantina Sociale Trento 的 Nativi 为 100% Teroldego。
vinification|Red style~红酒风格|Skin fermentation gives a deeply coloured red.~带皮发酵形成深色红酒。
vinification|Producer practice~酒庄做法|The Nativi technical sheet documents the specific cellar treatment; it is not a DOC-wide prescription.~Nativi 技术表记录具体工艺，并非 DOC 全区强制。
producers|Reference~参照|Nativi Teroldego Rotaliano DOC, Cantina Sociale Trento.~Cantina Sociale Trento 的 Nativi Teroldego Rotaliano DOC。
service|Profile~风格|Dark fruit, violet-toned aroma and substantial colour characterise the reference.~参照酒呈深色果味、紫罗兰气息及浓色。
law|Scope~范围|A geographical Teroldego designation, distinct from broader Trentino DOC.~有地理限定的 Teroldego 名称，区别于广域 Trentino DOC。''',edge('teroldego','rotaliano'),'Teroldego Rotaliano|Campo Rotaliano|Rotaliana')
save()
profile('it-collio-doc','Collio DOC','it-friuli-venezia-giulia','Gorizia border hills, noted for dry whites and the local marl-sandstone sequence called ponca.~Gorizia 边境丘陵，以干白及本地称 ponca 的泥灰岩—砂岩层著称。','collio','''overview|Classification~分类|DOC; also known as Collio Goriziano.~DOC，也称 Collio Goriziano。
history|Recognition~认可|DOC recognition dates to 1968.~1968 年获 DOC。
geography|Border~边境|Hills in Gorizia province along the Slovenian frontier.~Gorizia 省沿斯洛文尼亚边境丘陵。
geography|Relationship~关系|Distinct from the adjoining Friuli Colli Orientali DOC.~区别于邻近 Friuli Colli Orientali DOC。
soils|Ponca~Ponca|Eocene marl and sandstone layers form the local ponca.~始新世泥灰岩、砂岩层构成本地 ponca。
grapes|Local whites~本地白品种|Friulano, Ribolla Gialla and Malvasia Istriana are regional references.~Friulano、Ribolla Gialla、Malvasia Istriana 为地方参照。
grapes|International whites~国际白品种|Sauvignon, Pinot Gris, Pinot Blanc and Chardonnay also contribute.~Sauvignon、Pinot Gris、Pinot Blanc、Chardonnay 也参与。
grapes|Collio Bianco~Collio Bianco|White blending type using permitted varieties.~使用获准品种的白混酿类型。
law|Aromatic limit~芳香品种限制|Müller-Thurgau and Traminer Aromatico together are limited to 15% in Collio Bianco.~Collio Bianco 中 Müller-Thurgau、Traminer Aromatico 合计最多 15%。
vinification|White styles~白酒风格|Pressed whites coexist with producer-specific skin-contact expressions.~直接压榨白酒与部分酒庄浸皮风格并存。
vinification|Cellar diversity~酿造差异|Vessel and maturation choices differ among producers.~容器及熟成选择因酒庄而异。
service|Temperature~温度|The consortium suggests 10–12°C for Collio Bianco.~协会为 Collio Bianco 建议 10–12°C。
service|Identity~身份|Collio is an origin, not a synonym for orange wine.~Collio 是产地，不是橙酒同义词。''',edge('friulano ribolla-gialla malvasia-istriana sauvignon-blanc pinot-gris pinot-blanc chardonnay muller-thurgau gewurztraminer','collio'),'Collio|Collio Goriziano')
profile('it-friuli-colli-orientali-doc','Friuli Colli Orientali DOC','it-friuli-venezia-giulia','Eastern Udine hill DOC combining indigenous whites, distinctive local reds and international varieties.~Udine 东部丘陵 DOC，结合本土白品种、独特本地红品种及国际品种。','co-law','''overview|Classification~分类|DOC with numerous varietal wines and defined subzones.~含多个单品种酒及划定子区的 DOC。
history|Recognition~认可|Originally recognised in 1970; the Friuli Colli Orientali name dates to the 2011 revision.~最初 1970 年认可；Friuli Colli Orientali 名称来自 2011 年修订。
geography|Location~位置|Eastern hills of Udine province, near Slovenia.~Udine 省东部丘陵，近斯洛文尼亚。
soils|Flysch~复理石|Marl-sandstone formations characterise many hillside vineyards.~泥灰岩—砂岩地层为不少丘陵园地特征。|co
grapes|White identities~白品种|Friulano, Ribolla Gialla and Verduzzo Friulano.~Friulano、Ribolla Gialla、Verduzzo Friulano。
grapes|Local reds~本地红品种|Schioppettino, Pignolo and Refosco dal Peduncolo Rosso.~Schioppettino、Pignolo、Refosco dal Peduncolo Rosso。
grapes|International grapes~国际品种|Merlot, Cabernet varieties, Sauvignon and Pinot varieties also occur.~也有 Merlot、Cabernet 各品种、Sauvignon、Pinot 各品种。
law|Cialla~Cialla|A named subzone with its own wine specifications.~命名子区，具有独立酒款规范。
law|Prepotto~Prepotto|Schioppettino di Prepotto is a specified subzone expression.~Schioppettino di Prepotto 为规定子区表达。
law|Rosazzo names~Rosazzo 名称|Ribolla Gialla di Rosazzo and Pignolo di Rosazzo are not Rosazzo DOCG white blend.~Ribolla Gialla di Rosazzo、Pignolo di Rosazzo 不等于 Rosazzo DOCG 白混酿。
vinification|Dry wines~干酒|Dry varietal whites and reds are central to the DOC.~单品种干白、干红为 DOC 核心。
vinification|Sweet distinctions~甜酒区分|Ramandolo and Colli Orientali del Friuli Picolit have separate DOCG codes.~Ramandolo、Colli Orientali del Friuli Picolit 各有独立 DOCG 规章。
service|Identity~身份|Friuli Colli Orientali and Collio should retain separate map entries.~Friuli Colli Orientali、Collio 须保留独立地图条目。''',edge('friulano ribolla-gialla verduzzo-friulano schioppettino pignolo refosco-dal-peduncolo-rosso merlot cabernet-franc cabernet-sauvignon sauvignon-blanc pinot-gris pinot-blanc chardonnay','co-law'),'Friuli Colli Orientali|Colli Orientali del Friuli|Colli Orientali')
profile('it-ramandolo-docg','Ramandolo DOCG','it-friuli-venezia-giulia','Sweet Verduzzo Friulano DOCG on the southern slopes of Monte Bernadia around Nimis and Tarcento.~Nimis、Tarcento 周边 Monte Bernadia 南坡的甜型 Verduzzo Friulano DOCG。','ramandolo','''overview|Classification~分类|DOCG devoted to sweet white wine, with a regulated Riserva.~甜白 DOCG，含受规范 Riserva。
history|Recognition~认可|DOCG recognised in 2001.~2001 年获 DOCG。
geography|Communes~市镇|Delimited parts of Nimis and Tarcento, Udine province.~Udine 省 Nimis、Tarcento 划定部分。
geography|Relief~地形|Terraced south-facing Monte Bernadia slopes, approximately 250–413 metres.~Monte Bernadia 朝南梯田坡，约 250–413 米。
climate|Rainfall~降雨|A relatively wet hillside environment; exposure and ventilation matter.~相对多雨的丘陵环境，朝向、通风重要。
soils|Substrate~母质|Eocene marls dominate the local hillside setting.~始新世泥灰岩主导当地丘陵。
grapes|Composition~组成|100% Verduzzo Friulano, locally called Verduzzo Giallo.~100% Verduzzo Friulano，本地称 Verduzzo Giallo。
grapes|Identity~身份|Not Verduzzo Trevigiano, and not a Picolit blend.~不是 Verduzzo Trevigiano，也非 Picolit 混酿。
grapes|Vine density~株密度|New plantings: at least 3,000 vines/ha.~新植至少 3,000 株／公顷。
law|Yield~产量|Maximum grape yield 8 t/ha and wine conversion 65%.~葡萄产量最高 8 吨／公顷，出酒率 65%。
vinification|Concentration~浓缩|Grapes may dry on the vine or in suitable drying rooms.~葡萄可在藤上或适当风干室失水。
vinification|Wood~木桶|Wooden vessels are permitted.~允许使用木容器。
law|Release~上市|Ordinary wine: November of the year after harvest.~普通酒：采收次年十一月。
law|Riserva release~Riserva 上市|From 1 December of the third year from harvest, as specified in the code.~按规章，自采收起第三年十二月一日起。
service|Structure~结构|Sweet, full and sometimes tannic, with ripe fruit and honeyed notes.~甜、饱满，有时有单宁，呈熟果、蜂蜜气息。''',edge('verduzzo-friulano','ramandolo','Exclusive grape; 100%.~唯一品种，100%。'),'Ramandolo')
profile('it-rosazzo-docg','Rosazzo DOCG','it-friuli-venezia-giulia','Dry white blend DOCG centred on the Rosazzo hills and abbey in Udine province.~以 Udine 省 Rosazzo 丘陵、修道院为中心的干白混酿 DOCG。','rosazzo-law','''overview|Classification~分类|DOCG for a dry white blend.~干白混酿 DOCG。
history|Recognition~认可|Recognised as DOCG in 2011.~2011 年获 DOCG。
history|Abbey~修道院|Abbazia di Rosazzo anchors the historical vineyard landscape.~Abbazia di Rosazzo 为历史葡萄园景观核心。|rosazzo
geography|Communes~市镇|Delimited parts of Manzano, Corno di Rosazzo and San Giovanni al Natisone.~Manzano、Corno di Rosazzo、San Giovanni al Natisone 划定部分。
soils|Hills~丘陵|Marl-sandstone hillside formations link it to eastern Friuli’s flysch landscape.~泥灰岩—砂岩丘陵与 Friuli 东部复理石景观相连。
grapes|Friulano~Friulano|At least 50%.~至少 50%。
grapes|Sauvignon~Sauvignon|20–30%.~20–30%。
grapes|Pinot Blanc/Chardonnay~Pinot Blanc／Chardonnay|Together 20–30%.~合计 20–30%。
grapes|Ribolla Gialla~Ribolla Gialla|Up to 10%.~最多 10%。
grapes|Other whites~其他白品种|Other suitable white grapes up to 5%; these are ceilings within a total of 100%.~其他适宜白品种最多 5%；各项须合计 100%。
law|Density~株密度|New plantings at least 4,000 vines/ha.~新植至少 4,000 株／公顷。
law|Yield~产量|Maximum 8 t/ha and 2 kg per vine.~最高 8 吨／公顷、每株 2 千克。
vinification|Wood~木桶|Wooden vessels are permitted in vinification and maturation.~酿造、熟成可用木容器。
producers|Abbey wine~修道院酒|Livio Felluga’s Abbazia di Rosazzo is an estate reference.~Livio Felluga 的 Abbazia di Rosazzo 为庄园参照。|rosazzo
service|Distinction~区分|Rosazzo DOCG is neither a Picolit sweet wine nor the DOC’s Pignolo di Rosazzo.~Rosazzo DOCG 既非 Picolit 甜酒，也非 DOC 的 Pignolo di Rosazzo。''',edge('friulano sauvignon-blanc pinot-blanc chardonnay ribolla-gialla','rosazzo-law'),'Rosazzo')
profile('it-colli-orientali-del-friuli-picolit-docg','Colli Orientali del Friuli Picolit DOCG','it-friuli-venezia-giulia','Sweet Picolit-led DOCG from the eastern Friuli hills, with a separately delimited Cialla subzone.~Friuli 东部丘陵以 Picolit 为主的甜酒 DOCG，含独立划定 Cialla 子区。','picolit-law','''overview|Classification~分类|DOCG separate from Friuli Colli Orientali DOC.~独立于 Friuli Colli Orientali DOC 的 DOCG。
history|Recognition~认可|DOCG recognised in 2006.~2006 年获 DOCG。
geography|Location~位置|Eastern Udine hill territory.~Udine 东部丘陵区域。
geography|Cialla~Cialla|Cialla is a delimited subzone with additional rules.~Cialla 为另有条款的划定子区。
soils|Hillside setting~丘陵环境|Marl and sandstone geological formations characterise the local hills.~当地丘陵以泥灰岩、砂岩地层为特征。
grapes|Principal~主要品种|Picolit at least 85% for the general DOCG.~一般 DOCG 的 Picolit 至少 85%。
grapes|Complements~辅助|Other suitable whites up to 15%, excluding Traminer Aromatico.~其他适宜白品种最多 15%，排除 Traminer Aromatico。
vinification|Sweet style~甜型|Ripe or dried grapes produce sweet, concentrated whites.~成熟或风干葡萄酿甜而浓缩的白酒。
vinification|Appassimento~风干|Drying provides concentration before fermentation.~发酵前风干使葡萄浓缩。
law|Subzone~子区|The general 85% rule must not replace the separate Cialla specification.~一般 85% 规则不能取代 Cialla 独立规范。
service|Comparison~对比|Picolit is distinct from Ramandolo’s Verduzzo Friulano.~Picolit 不同于 Ramandolo 的 Verduzzo Friulano。
service|Profile~风格|Golden, sweet, floral and concentrated; producer ageing affects texture.~金黄、甜、花香、浓缩；酒庄陈年影响质地。''',edge('picolit','picolit-law'),'Colli Orientali del Friuli Picolit|Picolit DOCG')
profile('it-carso-kras-doc','Carso / Kras DOC','it-friuli-venezia-giulia','Border limestone plateau denomination around Trieste and Gorizia, associated with Vitovska, Malvasia Istriana and Terrano.~Trieste、Gorizia 边境石灰岩台地产区，与 Vitovska、Malvasia Istriana、Terrano 相关。','carso-law','''overview|Classification~分类|DOC with the equivalent names Carso and Kras.~DOC，Carso、Kras 为等同名称。
geography|Position~位置|Delimited areas in Trieste and Gorizia provinces, near Slovenia.~Trieste、Gorizia 两省划定区域，近斯洛文尼亚。
geography|Relief~地形|Karst plateau and slopes above the Adriatic coast.~亚得里亚海岸上方喀斯特台地及坡地。
climate|Airflow~气流|Coastal proximity and exposed plateau sites create varied conditions.~海岸邻近性及开放台地造成多样条件。
soils|Limestone~石灰岩|Karst limestone and pockets of red clay-rich terra rossa.~喀斯特石灰岩及局部富黏土红色 terra rossa。
grapes|Whites~白品种|Vitovska and Malvasia Istriana are local references.~Vitovska、Malvasia Istriana 为本地参照。
grapes|Terrano~Terrano|Terrano is the local red identity linked to Teran.~Terrano 为与 Teran 对应的本地红品种。
vinification|White styles~白酒风格|Both direct pressing and producer-specific skin maceration occur.~存在直接压榨及部分酒庄浸皮风格。
vinification|Colour~颜色|Maceration can deepen white-wine colour; it is not mandatory for all Carso wines.~浸皮可加深白酒颜色，并非所有 Carso 酒强制。
law|Origin and label~产地与标签|Wines from this geographical landscape may carry DOC or other legally eligible labels.~该地理景观中的酒可依法使用 DOC 或其他标签。
producers|Vitovska reference~Vitovska 参照|Zidarich’s cited Vitovska is Venezia Giulia IGP, a geographical reference rather than a DOC example.~所引 Zidarich Vitovska 为 Venezia Giulia IGP，是地理参照而非 DOC 酒例。|g-vitovska
service|Comparison~对比|Terrano red and skin-contact Vitovska are distinct grape and wine identities.~Terrano 红酒、浸皮 Vitovska 为不同品种及酒身份。''',edge('vitovska malvasia-istriana teran','carso-law'),'Carso|Kras|Carso-Kras')
profile('it-friuli-grave-doc','Friuli Grave DOC','it-friuli-venezia-giulia','Friulian plain DOC associated with extensive gravelly alluvial deposits.~与广泛砾石冲积物相连的 Friuli 平原 DOC。','grave-law','''overview|Classification~分类|DOC including white, red and named-variety types.~包含白、红及命名品种类型的 DOC。
geography|Provinces~省份|Delimited plains in Udine and Pordenone.~Udine、Pordenone 的划定平原。
geography|Rivers~河流|The Tagliamento and other Alpine rivers shaped the alluvial landscape.~Tagliamento 等阿尔卑斯河流塑造冲积地貌。
soils|Grave~Grave|Gravel-rich river deposits give the denomination its name.~富砾石河流沉积形成产区名称。
soils|Variation~差异|Gravel depth and finer sediment vary across the broad plain.~广阔平原的砾石深度、细沉积物比例不同。
grapes|Local whites~本地白品种|Friulano and Verduzzo Friulano occur alongside international whites.~Friulano、Verduzzo Friulano 与国际白品种并存。
grapes|International whites~国际白品种|Pinot Gris, Chardonnay and Sauvignon are important references.~Pinot Gris、Chardonnay、Sauvignon 为重要参照。
grapes|Reds~红品种|Merlot, Cabernet varieties and Refosco dal Peduncolo Rosso.~Merlot、Cabernet 各品种、Refosco dal Peduncolo Rosso。
vinification|Styles~风格|Still, frizzante or spumante types are defined individually by the code.~规章分别规定静止、微起泡或起泡类型。
vinification|Wood~木桶|Wood treatment is permitted; it is not obligatory for every wine.~可使用木容器，并非每款酒强制。
law|Varietal labelling~品种标签|Each named-variety type follows its own composition and analytical requirements.~各命名品种类型有自己的组成及分析要求。
service|Comparison~对比|A broad alluvial plain origin, distinct from Collio’s border hills.~广域冲积平原产地，区别于 Collio 边境丘陵。''',edge('friulano verduzzo-friulano pinot-gris pinot-blanc chardonnay sauvignon-blanc merlot cabernet-franc cabernet-sauvignon refosco-dal-peduncolo-rosso','grave-law'),'Friuli Grave|Grave')
save()
profile('it-lambrusco-di-sorbara-doc','Lambrusco di Sorbara DOC','it-emilia-romagna','Modena plain DOC producing especially pale, fragrant and acid-driven red and rosé Lambrusco.~Modena 平原 DOC，尤以色浅、芳香、酸度鲜明的红及桃红 Lambrusco 著称。','sorbara','''overview|Classification~分类|DOC for red and rosé Lambrusco styles.~红、桃红 Lambrusco DOC。
geography|District~区域|Twelve municipalities on the Modena plain, including Bomporto and Bastiglia.~Modena 平原十二市镇，包括 Bomporto、Bastiglia。
geography|Position~位置|North of Modena, around Sorbara.~Modena 北侧 Sorbara 周围。
soils|Alluvium~冲积|River-deposited plain soils with varying sand, silt and clay.~河流冲积平原土，沙、粉砂、黏土比例不同。
grapes|Sorbara~Sorbara|Lambrusco di Sorbara at least 60%.~Lambrusco di Sorbara 至少 60%。
grapes|Salamino~Salamino|Lambrusco Salamino may contribute up to 40%.~Lambrusco Salamino 可占最多 40%。
grapes|Other Lambruschi~其他 Lambrusco|Other permitted Lambrusco varieties up to 15%, within the total blend.~其他获准 Lambrusco 最多 15%，计入总混酿。
vinification|Pressure~压力|Frizzante and spumante expressions are recognised.~认可微起泡及起泡表达。
vinification|Colour~颜色|Red and rosé are both established styles.~红及桃红均为传统风格。
law|Sweetness~甜度|Dry through sweeter categories are possible under the code.~规章下可有干至较甜类型。
law|Composition~组成|The individual maxima cannot be added beyond a total of 100%.~各项上限不能相加超过 100%。
service|Appearance~外观|Especially light ruby or pink compared with many Lambruschi.~相比不少 Lambrusco，特别浅宝石红或粉红。
service|Aroma~香气|Violet, red berries and fresh fruit.~紫罗兰、红浆果、清新果味。
service|Structure~结构|Marked acidity and generally lighter body than Grasparossa.~酸度明显，酒体通常轻于 Grasparossa。
service|Identity~身份|Sorbara is a grape as well as part of the geographical wine name.~Sorbara 是品种，也出现在地理酒名中。''',edge('lambrusco-di-sorbara lambrusco-salamino','sorbara'),'Lambrusco di Sorbara|Sorbara DOC')
profile('it-lambrusco-grasparossa-di-castelvetro-doc','Lambrusco Grasparossa di Castelvetro DOC','it-emilia-romagna','Southern Modena foothill DOC known for deeply coloured, tannic Lambrusco.~Modena 南部山麓 DOC，以深色、有单宁 Lambrusco 著称。','grasparossa','''overview|Classification~分类|DOC for red and rosé sparkling or semi-sparkling styles.~红、桃红起泡或微起泡 DOC。
geography|Core~核心|Castelvetro and the southern Modena hills.~Castelvetro 及 Modena 南部丘陵。
geography|Contrast~对比|More hillside-oriented than Sorbara and Salamino’s northern plain origins.~相比 Sorbara、Salamino 北部平原，更具丘陵特点。
soils|Lower slopes~下坡|Clay-rich foothill soils are common.~山麓常见富黏土土壤。
soils|Upper slopes~上坡|Higher sites include limestone, sand and gravel materials.~较高地块含石灰岩、沙及砾石材料。
grapes|Principal~主要品种|Lambrusco Grasparossa at least 85%.~Lambrusco Grasparossa 至少 85%。
grapes|Complement~辅助品种|Other permitted Lambrusco and Malbo Gentile together up to 15%.~其他获准 Lambrusco、Malbo Gentile 合计最多 15%。
vinification|Pressure~压力|Frizzante and spumante types.~微起泡及起泡类型。
vinification|Colours~颜色|Both red and rosé are defined.~定义红及桃红。
law|Sweetness~甜度|Dry and sweeter expressions are recognised.~认可干型及较甜表达。
service|Colour~颜色|Deep ruby-purple with coloured foam in red examples.~红酒常深宝石紫红，泡沫带色。
service|Fruit~果味|Dark berries, cherry and vinous fruit.~深色浆果、樱桃、葡萄酒果香。
service|Tannin~单宁|Generally firmer tannin and fuller body than Sorbara.~通常单宁比 Sorbara 更强、酒体更厚。
service|Identity~身份|Grasparossa is a grape; Castelvetro locates the denomination.~Grasparossa 为品种，Castelvetro 标示产区。''',edge('lambrusco-grasparossa','grasparossa'),'Lambrusco Grasparossa di Castelvetro|Grasparossa di Castelvetro')
profile('it-lambrusco-salamino-di-santa-croce-doc','Lambrusco Salamino di Santa Croce DOC','it-emilia-romagna','Carpi-area plain DOC led by Lambrusco Salamino.~Carpi 周边平原、以 Lambrusco Salamino 为主的 DOC。','salamino','''overview|Classification~分类|DOC for red and rosé Lambrusco.~红、桃红 Lambrusco DOC。
geography|Core~核心|Northern Modena plain around Carpi and Santa Croce.~Carpi、Santa Croce 周围 Modena 北部平原。
geography|Landscape~地貌|Low, level river-sediment country.~低平河流沉积地区。
soils|Alluvial origin~冲积成因|Sand, silt and clay occur in varying proportions.~沙、粉砂、黏土比例各异。
grapes|Principal~主要品种|Lambrusco Salamino at least 85%.~Lambrusco Salamino 至少 85%。
grapes|Lambrusco complements~Lambrusco 辅助|Other authorised Lambruschi may contribute to the balance.~其他获准 Lambrusco 可参与余下混酿。
grapes|Other complements~其他辅助|Ancellotta and Fortana may be included within the 15% complement.~Ancellotta、Fortana 可计入 15% 辅助份额。
vinification|Styles~风格|Frizzante and spumante, red or rosé.~微起泡、起泡，红或桃红。
law|Sweetness~甜度|Dry, semi-dry and sweeter categories are available.~可有干、半干及较甜类别。
law|Identity~身份|Not a synonym for Reggiano or Modena DOC.~不是 Reggiano 或 Modena DOC 同义名。
service|Aroma~香气|Red fruit, flowers and a vinous note.~红果、花香及葡萄酒果香。
service|Body~酒体|Often intermediate in structure between very light Sorbara and tannic Grasparossa.~结构常介于轻盈 Sorbara、有单宁 Grasparossa 之间。
service|Colour~颜色|Ruby red with violet tones in red examples.~红酒常宝石红、带紫色调。''',edge('lambrusco-salamino ancellotta fortana','salamino'),'Lambrusco Salamino di Santa Croce|Salamino di Santa Croce')
profile('it-modena-doc','Modena DOC','it-emilia-romagna','Broad Modena denomination with multiple wine types; the Lambrusco rules apply to its Lambrusco type.~Modena 广域多类型产区，Lambrusco 规则适用于其 Lambrusco 类型。','modena','''overview|Classification~分类|DOC including Lambrusco and other red, white and rosé types.~DOC，含 Lambrusco 及其他红、白、桃红类型。
geography|Province~省份|The Modena provincial production area includes plain and hill settings.~Modena 省生产区含平原、丘陵。
soils|Plain~平原|Clay-rich alluvial deposits characterise much of the plain.~平原不少地块为富黏土冲积物。
soils|Hills~丘陵|Calcareous materials are important in hill sites.~丘陵地块石灰质材料重要。
grapes|Lambrusco blend~Lambrusco 比例|At least 85% combined permitted Lambrusco varieties.~获准 Lambrusco 合计至少 85%。
grapes|Lambrusco identities~Lambrusco 身份|Grasparossa, Salamino, Sorbara, Marani, Maestri, Montericco, Oliva and Lambrusco a Foglia Frastagliata are listed.~列 Grasparossa、Salamino、Sorbara、Marani、Maestri、Montericco、Oliva、Lambrusco a Foglia Frastagliata。
grapes|Complement~辅助|Ancellotta, Malbo Gentile and Fortana up to 15% combined for the Lambrusco type.~Lambrusco 类型的 Ancellotta、Malbo Gentile、Fortana 合计最多 15%。
vinification|Lambrusco~Lambrusco|Red and rosé frizzante or spumante expressions.~红及桃红微起泡或起泡。
vinification|Other wines~其他酒|The broader DOC also regulates non-Lambrusco types.~广域 DOC 另规范非 Lambrusco 类型。
law|Scope of percentages~比例适用范围|The 85% Lambrusco rule does not describe every Modena DOC wine.~85% Lambrusco 规则不适用于所有 Modena DOC 酒。
law|Sweetness~甜度|Lambrusco styles extend from dry to sweet categories.~Lambrusco 可从干至甜类别。
service|Blend reading~混酿阅读|Different Lambrusco combinations change colour, tannin and perfume.~不同 Lambrusco 组合改变颜色、单宁、香气。
service|Identity~身份|Modena is a denomination, not one Lambrusco cultivar.~Modena 是产区，不是单一 Lambrusco 品种。''',edge('lambrusco-grasparossa lambrusco-salamino lambrusco-di-sorbara lambrusco-marani lambrusco-maestri lambrusco-oliva enantio ancellotta fortana','modena'),'Modena|Modena Lambrusco')
profile('it-reggiano-doc','Reggiano DOC','it-emilia-romagna','Reggio Emilia DOC with Lambrusco, Ancellotta-led red and other separately specified types.~Reggio Emilia DOC，包含 Lambrusco、Ancellotta 主导红酒及其他独立规定类型。','reggiano','''overview|Classification~分类|A multi-type DOC, not one grape.~多类型 DOC，并非单一品种。
geography|District~区域|Reggio Emilia province, from plain to foothill vineyards.~Reggio Emilia 省，从平原至山麓葡萄园。
soils|Variation~差异|Alluvial plain and foothill soils differ across the production area.~生产区内冲积平原与山麓土壤不同。
grapes|Lambrusco share~Lambrusco 比例|The Lambrusco type requires at least 85% combined listed Lambruschi.~Lambrusco 类型要求所列 Lambrusco 合计至少 85%。
grapes|Listed Lambruschi~所列 Lambrusco|Maestri, Marani, Salamino, Montericco, Sorbara, Grasparossa, Viadanese, Oliva and Barghi.~Maestri、Marani、Salamino、Montericco、Sorbara、Grasparossa、Viadanese、Oliva、Barghi。
grapes|Complement~辅助|Ancellotta, Malbo Gentile, Fogarina and Lambrusco a Foglia Frastagliata may form the 15% balance.~Ancellotta、Malbo Gentile、Fogarina、Lambrusco a Foglia Frastagliata 可构成余下 15%。
grapes|Ancellotta~Ancellotta|Ancellotta is distinct from the Lambruschi and important in Reggiano Rosso.~Ancellotta 不同于 Lambrusco 各品种，在 Reggiano Rosso 重要。
vinification|Lambrusco~Lambrusco|Red and rosé frizzante or spumante styles.~红、桃红微起泡或起泡。
vinification|Rosso~Rosso|Reggiano Rosso follows a separate blend formula.~Reggiano Rosso 使用独立混酿公式。
law|Scope~范围|Do not transfer the Lambrusco 85% rule to Reggiano Rosso.~不可将 Lambrusco 85% 规则套用到 Reggiano Rosso。
law|Sweetness~甜度|Dry through sweet categories are specified for relevant types.~相关类型规定干至甜类别。
service|Texture~质地|Grape proportions influence colour, body and tannin.~品种比例影响颜色、酒体、单宁。
service|Identity~身份|Reggiano and Modena are separate denominations despite shared grape families.~尽管共享品种群，Reggiano、Modena 仍为独立产区。''',edge('lambrusco-maestri lambrusco-marani lambrusco-salamino lambrusco-di-sorbara lambrusco-grasparossa lambrusco-viadanese lambrusco-oliva lambrusco-barghi ancellotta fogarina enantio','reggiano'),'Reggiano|Reggiano Lambrusco|Reggiano Rosso')
profile('it-colli-di-scandiano-e-di-canossa-doc','Colli di Scandiano e di Canossa DOC','it-emilia-romagna','Reggio Emilia hill DOC with distinctive whites and several separate Lambrusco expressions.~Reggio Emilia 丘陵 DOC，拥有特色白酒及若干独立 Lambrusco 表达。','scandiano','''overview|Classification~分类|Multi-type DOC including whites, reds and named Lambrusco types.~多类型 DOC，含白、红及命名 Lambrusco 类型。
history|Canossa~Canossa|Canossa’s landscape is linked to the eleventh-century Countess Matilda.~Canossa 景观与十一世纪 Matilda 伯爵夫人相关。
geography|District~区域|Hills of Reggio Emilia around Scandiano and Canossa.~Reggio Emilia 的 Scandiano、Canossa 周边丘陵。
soils|Hill setting~丘陵环境|Hill substrates and slopes distinguish it from the low Reggio plain.~丘陵母质、坡面区别于 Reggio 低平原。
grapes|Local white~本地白品种|Spergola is a central local white name.~Spergola 为核心本地白品种名。
grapes|Aromatic white~芳香白品种|Malvasia di Candia Aromatica is another important local white.~Malvasia di Candia Aromatica 为另一重要本地白品种。
grapes|Lambrusco blend~Lambrusco 混酿|Maestri, Marani, Salamino and Barghi together form at least 85% in the relevant blended type.~相关混酿类型 Maestri、Marani、Salamino、Barghi 合计至少 85%。
grapes|Additional grapes~辅助品种|The blend’s permitted complements include Malbo Gentile, Marzemino, Croatina, Sgavetta, Termarina and Perla dei Vivi.~混酿获准辅助包括 Malbo Gentile、Marzemino、Croatina、Sgavetta、Termarina、Perla dei Vivi。
law|Grasparossa type~Grasparossa 类型|The named Grasparossa type requires at least 85% Grasparossa.~命名 Grasparossa 类型要求该品种至少 85%。
law|Montericco type~Montericco 类型|The named Montericco type has its own minimum 85% rule.~命名 Montericco 类型有自己的至少 85% 规则。
vinification|Sparkling tradition~起泡传统|Local white and Lambrusco expressions include frizzante styles.~本地白酒及 Lambrusco 表达含微起泡。
vinification|Diversity~多样性|The DOC cannot be reduced to a single red blend.~DOC 不可简化为单一红混酿。
service|Identity~身份|Keep grape identity, named wine type and broader geographical origin separate.~须区分品种身份、命名酒类型及广域地理产地。''',edge('vernaccia-di-oristano malvasia-di-candia-aromatica lambrusco-maestri lambrusco-marani lambrusco-salamino lambrusco-barghi lambrusco-grasparossa marzemino croatina sgavetta','scandiano'),'Colli di Scandiano e di Canossa|Scandiano|Canossa')
profile('it-romagna-albana-docg','Romagna Albana DOCG','it-emilia-romagna','Romagna’s Albana-led white DOCG, spanning dry, sweet and passito expressions.~Romagna 以 Albana 为主的白酒 DOCG，涵盖干、甜及风干风格。','albana','''overview|Classification~分类|DOCG for Albana-based whites.~Albana 白酒 DOCG。
geography|Provinces~省份|Delimited parts of Bologna, Ravenna and Forlì-Cesena.~Bologna、Ravenna、Forlì-Cesena 划定部分。
geography|Landscape~地貌|Romagna hill and foothill sites south of the Via Emilia corridor.~Via Emilia 走廊南侧 Romagna 丘陵及山麓。
grapes|Composition~组成|Albana at least 95%.~Albana 至少 95%。
grapes|Complement~辅助|Other suitable white varieties may make up to 5%.~其他适宜白品种最多 5%。
grapes|Identity~身份|Albana is distinct from Trebbiano Romagnolo.~Albana 不同于 Trebbiano Romagnolo。
vinification|Secco~Secco|Dry white expression.~干白表达。
vinification|Amabile and dolce~Amabile 与 dolce|Sweeter still-white types are recognised.~认可较甜静止白酒类型。
vinification|Passito~Passito|Dried grapes yield a concentrated sweet style.~风干葡萄形成浓缩甜酒。
law|Spumante distinction~起泡区分|Romagna Albana Spumante DOC is a separate denomination.~Romagna Albana Spumante DOC 为独立产区。
law|Wine categories~酒类型|Secco, amabile, dolce and passito are style distinctions within this DOCG.~Secco、amabile、dolce、passito 为本 DOCG 内风格区分。
service|Dry structure~干型结构|Dry Albana can have substantial body and a phenolic grip.~干型 Albana 可有厚酒体及酚类抓力。
service|Sweet structure~甜型结构|Passito combines concentration and sweetness with acidity.~Passito 将浓缩、甜度与酸度结合。
service|Comparison~对比|Albana DOCG does not imply that every wine is sweet.~Albana DOCG 不意味着每款酒都甜。''',edge('albana','albana'),'Romagna Albana|Albana di Romagna')
save()
# Exact source-labelled bunch photographs; no generic vineyard substitutions.
photos={
'ancellotta':'2020/12/ANCELLOTTA-N.-RAUSCEDO-2-203x300.png',
'durella':'2021/02/durella-2010-233.jpg',
'fortana':'2021/02/fortana-2010-237.jpg',
'glera-lunga':'2020/12/PROSECCO-LUNGO-B.-VCR-40-e1610022991621-263x300.jpg',
'lambrusco-maestri':'2020/12/LAMBRUSCO-MAESTRI-N.-I-VCR-1--204x300.png',
'lambrusco-marani':'2020/12/LAMBRUSCO-MARANI-N.-R-2-1-200x300.jpg',
'lambrusco-viadanese':'2020/12/lambrusco-viadanese-VCR12-200x300.jpg',
'marzemino':'2020/12/MARZEMINO-N.-VCR-3-3-200x300.jpg',
'ortrugo':'2020/12/ORTRUGO-VCR245-GR-2-200x300.jpg',
'raboso-piave':'2020/12/RABOSO-PIAVE-N.-R-11-200x300.jpg',
'verdiso':'2021/02/VERDISO-B.-VCR-2.jpg',
'verduzzo-friulano':'2020/12/VERDUZZO-FRIULANO-B.-R-5-200x300.jpg',
'verduzzo-trevigiano':'2021/02/Verduzzo-trev.-grappolo-Susegana-6.09.05.jpg'}
for id,p in photos.items():
 u='https://www.vivairauscedo.com/wp-content/uploads/'+p;G[id].update(imageUrl=u,originalImageUrl=u,imageCredit='Vivai Cooperativi Rauscedo (VCR)',imageSourceUrl=G[id]['sources'][0]['url'])
for id,p in {'cjanorie':'Cianorie3.jpg','cividin':'cividin7.jpg','cordenossa':'CORDENOSSA-4-7.JPG','sagrestana':'sagrestana7.jpg'}.items():
 u='https://www.ersa.fvg.it/export/sites/ersa/aziende/sperimentazione/Colture-arboree/vite/biodiversita/img/'+p;G[id].update(imageUrl=u,originalImageUrl=u,imageCredit='ERSA Friuli-Venezia Giulia',imageSourceUrl=G[id]['sources'][0]['url'])
S['raimondi-2020']=('Raimondi et al. 2020 · genetic identity and parentage','https://www.nature.com/articles/s41598-020-72799-6')
# Preserve one genetic identity; islands batch owns the canonical record and qualified alias.
spergola=G['spergola']
B['grapes']=[g for g in B['grapes'] if g['id']!='spergola'];B['translations']=[t for t in B['translations'] if t['id']!='spergola']
B['corrections'].append({'id':'spergola-vernaccia-di-oristano','canonicalId':'vernaccia-di-oristano','removeProvisionalId':'spergola','note':bi('The matched registered Spergola genotype is identical to Vernaccia di Oristano in Raimondi et al. 2020. Homonymous accessions require authentication; do not assert every historical Spergola accession is identical.','Raimondi 等 2020 年研究确认匹配的登记 Spergola 基因型与 Vernaccia di Oristano 相同；同名材料须鉴定，不应宣称所有历史同名材料皆相同。'),'sourceUrls':[S['raimondi-2020'][1],spergola['sources'][0]['url']]})
for q in emilia['questions']:
 if 'genetically identical' in q['a']['en']:
  q['a']=bi('The matched registered Spergola genotype is identical to Vernaccia di Oristano; authenticate homonymous accessions.','匹配的登记 Spergola 基因型与 Vernaccia di Oristano 相同；同名材料须鉴定。');q['refs'].append('raimondi-2020')
if not any(s['id']=='raimondi-2020' for s in emilia['sources']):emilia['sources'].append({'id':'raimondi-2020','title':S['raimondi-2020'][0],'url':S['raimondi-2020'][1]})
R={r['id']:r for r in B['regions']}
def add_source(r,s):
 if not any(x['id']==s for x in r['sources']):r['sources'].append({'id':s,'title':S[s][0],'url':S[s][1]})
def add_edge(r,id,s,role):
 if not any(e['grapeId']==id for e in r['grapes']):r['grapes'].append({'grapeId':id,'role':bi(*pair(role)),'sourceIds':[s]})
 add_source(r,s)
# Link every new local grape to its real administrative and provincial context.
area_ids={'Veneto':['it-veneto'],'Trentino':['it-trentino','it-trentino-alto-adige'],'Alto Adige':['it-alto-adige','it-trentino-alto-adige'],'Trentino-Alto Adige':['it-trentino-alto-adige'],'Friuli-Venezia Giulia':['it-friuli-venezia-giulia'],'Emilia-Romagna':['it-emilia-romagna']}
for g in B['grapes']:
 area=g['regions'][0]['name']
 for rid in area_ids.get(area,[]):add_edge(R[rid],g['id'],'g-'+g['id'],'Documented regional variety; this link alone does not assert PDO eligibility.~有记录的区域品种；此链接本身不宣称具备 PDO 资格。')
for r in B['regions']:
 for e in r['grapes']:
  if e['grapeId']=='spergola':e['grapeId']='vernaccia-di-oristano'
add_edge(emilia,'vernaccia-di-oristano','g-spergola','Local registered material called Spergola; matched genetic identity, with accession qualification.~本地登记材料称 Spergola；匹配遗传身份，须限定材料。')
add_source(emilia,'raimondi-2020')
# Add secondary regional evidence precisely where a row combines sources.
for r,sec,ids in [(veneto,'grapes',['prosecco','breganze']),(veneto,'geography',['soave']),(taa,'producers',['g-schiava-gentile'])]:
 s=next(s for s in r['sections'] if s['id']==sec)
 for sid in ids:
  if sid not in s['refs']:s['refs'].append(sid)
  add_source(r,sid)
# Producer-specific wines remain explicit outward references until bottle dossiers are built.
for rid,name,producer,sid,note in [
('it-veneto','Osar Rosso Verona IGT','Masi','g-oseleta','Varietal Oseleta reference; not Amarone.~Oseleta 单品种参照，并非 Amarone。'),
('it-trentino','Foja Tonda Valdadige Terradeiforti DOC','Albino Armani','g-casetta','Casetta reference; distinct from Enantio.~Casetta 参照，区别于 Enantio。'),
('it-trentino','Bottega Vinai Schiava Gentile Trentino DOC','Cavit','g-schiava-gentile','Producer technical sheet; a specific Schiava identity.~酒庄技术表，特定 Schiava 身份。'),
('it-carso-kras-doc','Vitovska Venezia Giulia IGP','Zidarich','g-vitovska','Geographical Carso reference labelled IGP, not a Carso DOC bottle.~地理 Carso 参照、标 IGP，非 Carso DOC 酒款。'),
('it-teroldego-rotaliano-doc','Nativi Teroldego Rotaliano DOC','Cantina Sociale Trento','rotaliano','100% Teroldego; producer-specific site and cellar information.~100% Teroldego，酒庄特定地块及工艺资料。'),
('it-rosazzo-docg','Abbazia di Rosazzo','Livio Felluga','rosazzo','Abbey vineyard white blend; individual producer reference.~修道院葡萄园白混酿，具体酒庄参照。')]:
 R[rid]['wines'].append({'name':name,'producer':producer,'url':S[sid][1],'note':bi(*pair(note))});add_source(R[rid],sid)
# Ensure reverse links: canonical existing grapes receive additive updates only.
base=json.loads((D.parents[1]/'data/grape-varieties.json').read_text());baseids={g['id'] for g in base};newids={g['id'] for g in B['grapes']};updates={}
for r in B['regions']:
 for e in r['grapes']:
  id=e['grapeId'];rn={'name':r['name'],'country':'Italy','note':e['role']['zh'],'enNote':e['role']['en']}
  if id in newids:
   g=G[id];t=T[id]
   if not any(x['name']==r['name'] for x in g['regions']):g['regions'].append({k:v for k,v in rn.items() if k!='enNote'});t['regions'].append({'name':r['name'],'note':rn['enNote']})
   for sid in e['sourceIds']:
    if not any(x['url']==S[sid][1] for x in g['sources']):g['sources'].append({'title':S[sid][0],'url':S[sid][1]})
  else:
   u=updates.setdefault(id,{'id':id,'countriesAdd':['Italy'],'aliasesAdd':[],'regionsAdd':[],'sourcesAdd':[]})
   if not any(x['name']==rn['name'] for x in u['regionsAdd']):u['regionsAdd'].append(rn)
   for sid in e['sourceIds']:
    if not any(x['url']==S[sid][1] for x in u['sourcesAdd']):u['sourcesAdd'].append({'title':S[sid][0],'url':S[sid][1]})
u=updates['vernaccia-di-oristano'];u['aliasesAdd'].append({'name':'Spergola','context':'匹配的登记材料；历史同名材料须鉴定。','enContext':'Matched registered material; historical homonymous accessions require authentication.'});u['sourcesAdd'].append({'title':S['raimondi-2020'][0],'url':S['raimondi-2020'][1]})
B['existingUpdates']=list(updates.values())
B['evidence']=[{'topic':'Scope and review','note':'Recovered primary-source research, reviewed 2026-10-26. Forty distinct new grape dossiers after Spergola identity merge; 33 regions/denominations. Photos are source-identified variety bunch images, not generic illustrations.'},{'topic':'Valpolicella rules','sourceUrls':[S['amarone-law'][1],S['ripasso-law'][1]],'note':'Consolidated 2023 laws: Corvina and/or Corvinone 45–95%, Rondinella 5–30%. Ripasso operation minimum three days; release from 1 January of the second year after harvest. Do not reuse obsolete Corvinone substitution limits.'}]
B['unresolved']=[{'type':'coverage','note':'This batch is not an exhaustive inventory of every local accession or PDO. Further priority grapes: Bianchetta Trevigiana, Perera, Recantina, Dindarella, Negrara, Marzemina Bianca, Schiava Grigia, Rossara, Versoaln, Sciaglin, Ucelut, Forgiarin, Piculit Neri, Refosco Nostrano, Malbo Gentile, Lambrusco Montericco, Alionza, Melara, Montù.'},{'type':'appellation-coverage','note':'Further dossiers: Recioto di Soave, Lessini Durello, Monti Lessini, Piave, Piave Malanotte, Bagnoli Friularo, Colli di Conegliano, Trentino DOC, Alto Adige DOC, Lago di Caldaro, Valdadige Terradeiforti, Bosco Eliceo, Ortrugo dei Colli Piacentini, Gutturnio, Colli Bolognesi Pignoletto.'},{'type':'wine-dossiers','note':'Six exact producer references are linked in region profiles; no new independent bottle dossiers or vintage-specific bottle photos were invented.'},{'type':'photo-coverage','note':'Seventeen new varieties have exact source-identified bunch photos; other entries intentionally have no unsupported image.'}]
save()
print(json.dumps({'grapes':len(B['grapes']),'regions':len(B['regions']),'questions':sum(len(r['questions']) for r in B['regions']),'existingUpdates':len(B['existingUpdates']),'photos':sum('imageUrl' in g for g in B['grapes'])}))
# Last source-specific improvements after reopening official production references.
S['teroldego-consortium']=('Consorzio Vini del Trentino · Teroldego','https://vinideltrentino.com/en/portfolio/teroldego-2/')
S['valpolicella-law']=('MASAF · Valpolicella consolidated 2023','https://www.consorziovalpolicella.it/wp-content/uploads/2024/02/DisciplinareValpolicella.pdf')
S['valpolicella-2026']=('Regione Veneto · 2026 early vinification authorisation','https://bur.regione.veneto.it/BurvServices/pubblica/DettaglioDecreto.aspx?id=594192')
def appendrow(rid,sec,label,body,sid):
 r=R[rid];s=next((s for s in r['sections'] if s['id']==sec),None)
 if s is None:s={'id':sec,'title':bi(*titles[sec]),'rows':[],'refs':[]};r['sections'].append(s)
 s['rows'].append({'label':bi(*pair(label)),'body':bi(*pair(body))})
 if sid not in s['refs']:s['refs'].append(sid)
 add_source(r,sid)
rt=R['it-teroldego-rotaliano-doc']
for s in rt['sections']:
 for row in s['rows']:
  if row['label']['en']=='Producer practice':row['body']=bi('For Nativi: prolonged skin fermentation, malolactic fermentation, then several months in oak barrels of different sizes.','Nativi：较长带皮发酵、苹果酸乳酸发酵，之后在不同容量橡木桶中熟成数月。')
  if row['label']['en']=='Profile':row['body']=bi('Nativi: deep ruby, violet, roasted almond and liquorice; full-bodied and long.','Nativi：深宝石红，紫罗兰、烤杏仁、甘草，酒体饱满、余味长。')
appendrow('it-teroldego-rotaliano-doc','history','DOC recognition~DOC 认可','Trentino’s first varietal DOC, recognised in 1971.~Trentino 首个单品种 DOC，1971 年获认可。','teroldego-consortium')
appendrow('it-teroldego-rotaliano-doc','history','Historical record~历史记录','The consortium records Teroldego in Piana Rotaliana from the fourteenth century.~协会记录 Teroldego 在 Piana Rotaliana 可追溯至十四世纪。','teroldego-consortium')
appendrow('it-teroldego-rotaliano-doc','grapes','Training~整枝','Trentino pergola and Guyot are documented local systems.~本地有 Trentino pergola、Guyot 系统。','teroldego-consortium')
appendrow('it-teroldego-rotaliano-doc','service','Temperature~温度','The regional consortium suggests 16–18°C; producer advice may differ for an individual bottling.~大区协会建议 16–18°C，具体酒款酒庄建议可不同。','teroldego-consortium')
appendrow('it-valpolicella-doc','grapes','Blend~比例','Corvina and/or Corvinone 45–95%; Rondinella 5–30%.~Corvina 和／或 Corvinone 45–95%；Rondinella 5–30%。','valpolicella-law')
appendrow('it-valpolicella-doc','law','Superiore ageing~Superiore 陈年','At least one year from 1 January following harvest.~自采收次年 1 月 1 日起至少一年。','valpolicella-law')
appendrow('it-valpolicella-doc','law','Alcohol~酒精','Minimum actual alcohol 11%; Superiore 12%.~实际酒精至少 11%；Superiore 至少 12%。','valpolicella-law')
for rid in ['it-amarone-della-valpolicella-docg','it-recioto-della-valpolicella-docg']:
 appendrow(rid,'law','2026 vintage exception~2026 年份例外','Veneto decree 20024/2026 authorises vinification from 2 November 2026 for the 2026 harvest only.~Veneto 20024/2026 号令允许 2026 年采收葡萄自 2026 年 11 月 2 日起酿造，仅限该年份。','valpolicella-2026')
appendrow('it-romagna-albana-docg','law','Passito release~Passito 上市','Passito: not before 1 September following harvest; Passito Riserva: not before 1 December following harvest.~Passito 不早于采收次年 9 月 1 日；Passito Riserva 不早于次年 12 月 1 日。','albana')
# Remove incidental tab from source recovery.
def scrub(x):
 if isinstance(x,str):return x.replace('\t','').strip()
 if isinstance(x,list):return [scrub(y) for y in x]
 if isinstance(x,dict):return {k:scrub(v) for k,v in x.items()}
 return x
B=scrub(B);save()
