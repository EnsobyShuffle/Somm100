# Authored region-specific short-answer banks; source keys belong to each dossier.
import importlib.util,pathlib
P=pathlib.Path(__file__).parent
sp=importlib.util.spec_from_file_location('f',P/'build-france.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
quiz=m.quiz
quiz('champagne','''
Where is Champagne?|Champagne 在法国哪里？|Northeastern France.|法国东北。|a|place
Three dominant grapes?|三大主要品种？|Chardonnay, Pinot Noir, Meunier.|Chardonnay、Pinot Noir、Meunier。|r|place
How are the bubbles produced?|气泡如何产生？|Second fermentation in bottle.|瓶中二次发酵。|c|law
Name four vineyard sectors.|列四个葡萄园片区。|Montagne de Reims, Vallée de la Marne, Côte des Blancs, Côte des Bar.|Montagne de Reims、Vallée de la Marne、Côte des Blancs、Côte des Bar。|a|place
Non-vintage minimum maturation?|无年份最低陈年？|15 months.|15 个月。|c|law
Vintage minimum maturation?|年份酒最低陈年？|Three years.|三年。|c|law
What is pressing cuvée?|压榨 cuvée 是什么？|First press fraction.|首段压榨汁。|p|law
Which fraction follows cuvée?|Cuvée 后是哪段？|Taille.|Taille。|p|law
Name the local still-wine AOC.|当地静止酒 AOC 名之一？|Coteaux Champenois.|Coteaux Champenois。|a,b|law
What is Rosé des Riceys?|Rosé des Riceys 是什么？|Separate still-rosé AOC.|独立静止桃红 AOC。|b|law
Which year delimited the vineyard area?|哪年法律界定葡萄园？|1927.|1927 年。|a|law
Champagne AOC recognition year?|Champagne AOC 认可年份？|1936.|1936 年。|b|law
Weight of the cited pressing marc?|所引一批压榨葡萄重量？|4,000 kg.|4,000 kg。|v|law
Permitted must from a 4,000 kg Champagne marc?|4,000 kg Champagne 葡萄的许可汁液量？|2,550 L.|2,550 L。|v|law
Cuvée volume from a 4,000 kg Champagne marc?|4,000 kg Champagne 葡萄的 cuvée 量？|2,050 L.|2,050 L。|v|law
Taille volume from a 4,000 kg Champagne marc?|4,000 kg Champagne 葡萄的 taille 量？|500 L.|500 L。|v|law
Are cuvée and taille finished-wine ranks?|Cuvée、taille 是成酒等级吗？|No; press fractions.|不，是压榨分段。|p|law
Why retain separate press fractions?|为何分开保存压榨段？|Different blending components.|提供不同调配组成。|p|law
Which bottling starts maturation timing?|哪次装瓶启动陈年计时？|Tirage.|Tirage。|c|law
Minimum non-vintage lees contact?|无年份最低酒泥接触？|12 months.|12 个月。|t|law
Must wine be released at the minimum?|满最低时间必须上市吗？|No; longer ageing is possible.|不，可更长陈年。|c|law
What yeast process shapes lees-aged texture?|什么酵母过程塑造酒泥质感？|Autolysis.|自溶。|c|law
Which slow exchange also affects ageing?|哪种缓慢交换也影响陈年？|Oxygen exchange.|氧交换。|c|law
Does lees time determine dosage?|酒泥时间确定补糖量吗？|No.|不。|c|law
Which grape was recognised in July 2025?|2025 年 7 月认可哪品种？|Chardonnay rose.|Chardonnay rose。|r|law
Does principal legal status mean large planting?|法定主要身份等于种植多吗？|No.|不。|r|law
Name two minority historic grapes.|列两种少量传统品种。|Arbane and Petit Meslier.|Arbane、Petit Meslier。|r|place
Are Coteaux Champenois wines Champagne AOC?|Coteaux Champenois 属 Champagne AOC 吗？|No; separate AOC.|不，独立 AOC。|a,b|law
Which producer documents press fractions?|哪酒庄记录压榨分段？|Jean Vesselle.|Jean Vesselle。|v|people
Which house explains longer chosen ageing?|哪酒庄解释自选更长陈年？|Taittinger.|Taittinger。|t|people
''')
quiz('alsace','''
Which mountains shelter Alsace?|哪山脉遮蔽 Alsace？|Vosges.|Vosges。|b|place
Which plain is east of the vineyards?|葡萄园东侧哪平原？|Rhine plain.|莱茵平原。|b|place
Alsace AOC recognition year?|Alsace AOC 认可年份？|1962.|1962 年。|a|law
Principal red grape?|主要红品种？|Pinot Noir.|Pinot Noir。|c|place
Name four aromatic white references.|列四种芳香白参照。|Riesling, Gewürztraminer, Pinot Gris, Muscat.|Riesling、Gewürztraminer、Pinot Gris、Muscat。|c|place
Sparkling appellation name?|起泡产区名？|Crémant d’Alsace.|Crémant d’Alsace。|b|law
Number of named Grand Cru sites?|具名 Grand Cru 数？|51.|51。|z|law
Are all Alsace whites dry?|Alsace 白酒全干吗？|No; dry to sweet styles exist.|不，有干至甜。|b|place
Meaning of Vendanges Tardives?|Vendanges Tardives 含义？|Regulated late-harvest mention.|受监管晚采标示。|b|law
Expand SGN.|SGN 全称？|Sélection de Grains Nobles.|Sélection de Grains Nobles。|b|law
Which Grand Cru permits Sylvaner?|哪 Grand Cru 可用 Sylvaner？|Zotzenberg.|Zotzenberg。|z,p|law
Zotzenberg's village?|Zotzenberg 位于哪村？|Mittelbergheim.|Mittelbergheim。|z|place
Zotzenberg's main rocks?|Zotzenberg 主要岩石？|Marl and limestone.|泥灰岩、石灰岩。|z|place
Which geological periods are cited for Zotzenberg?|Zotzenberg 所引哪些地质时期？|Jurassic and Oligocene.|侏罗纪、渐新世。|z|place
Zotzenberg's principal aspects?|Zotzenberg 主要坡向？|East and south.|东、南。|z|place
Is Sylvaner permitted in every Grand Cru?|全部 Grand Cru 都可用 Sylvaner 吗？|No; site-specific exception.|不，特定地块例外。|z,p|law
Three red Grand Cru sites?|三个红 Grand Cru 地块？|Hengst, Kirchberg de Barr, Vorbourg.|Hengst、Kirchberg de Barr、Vorbourg。|r|law
Which grape makes red Grand Cru Hengst, Kirchberg de Barr and Vorbourg?|Hengst、Kirchberg de Barr、Vorbourg 红 Grand Cru 用哪品种？|Pinot Noir.|Pinot Noir。|r|law
Year of Vorbourg red recognition?|Vorbourg 红酒认可年份？|2024.|2024 年。|r|law
Are all Grand Cru grape rules identical?|全部 Grand Cru 品种规则一样吗？|No.|不。|r,z|law
Does a lieu-dit automatically mean Grand Cru?|有 lieu-dit 自动是 Grand Cru 吗？|No.|不。|a|law
Are Pinot Blanc and Auxerrois one grape?|Pinot Blanc、Auxerrois 同一种吗？|No; distinct varieties.|不，品种不同。|c|place
Why check a Pinot Blanc wine's composition?|为何核对 Pinot Blanc 酒组成？|Auxerrois may be involved.|可能含 Auxerrois。|c|law
What berry condition is central to SGN?|SGN 关键果粒状态？|Noble-rot concentration.|贵腐浓缩。|b|law
Grape in Louis Sipp Crémant Rosé?|Louis Sipp Crémant Rosé 品种？|Pinot Noir.|Pinot Noir。|s|people
Which town is associated with Louis Sipp’s Crémant Rosé vineyards?|Louis Sipp Crémant Rosé 葡萄园邻近哪城？|Ribeauvillé.|Ribeauvillé。|s|place
Producer of the Sylvaner Zotzenberg example?|Sylvaner Zotzenberg 实例酒庄？|Boeckel.|Boeckel。|p|people
Two Trimbach Réserve grape examples?|Trimbach Réserve 两个品种实例？|Pinot Gris and Gewurztraminer.|Pinot Gris、Gewurztraminer。|t|people
Why is Alsace relatively dry?|Alsace 为何相对少雨？|Vosges rain shadow.|Vosges 雨影。|b|place
Can perfume establish residual sugar?|香气能确定残糖吗？|No; check sweetness information.|不能，查甜度资料。|b,t|service
''')
quiz('bourgogne','''
Principal red grape?|主要红品种？|Pinot Noir.|Pinot Noir。|c|place
Principal white grape?|主要白品种？|Chardonnay.|Chardonnay。|c|place
What is a Climat?|Climat 是什么？|Named, delimited vineyard identity.|具名划定葡萄园身份。|b|place
Does Climat mean weather here?|这里 Climat 指天气吗？|No.|不。|b|place
Two halves of Côte d’Or?|Côte d’Or 两部分？|Côte de Nuits and Côte de Beaune.|Côte de Nuits、Côte de Beaune。|c|place
Region south of Côte Chalonnaise?|Côte Chalonnaise 南方哪区？|Mâconnais.|Mâconnais。|c|place
Four familiar hierarchy levels?|常用四层级？|Regional, village, village Premier Cru, Grand Cru.|大区、村庄、村庄 Premier Cru、Grand Cru。|b,c|law
Regional Aligoté appellation?|Aligoté 大区产区？|Bourgogne Aligoté.|Bourgogne Aligoté。|l|law
Village Aligoté appellation?|Aligoté 村庄产区？|Bouzeron.|Bouzeron。|v|law
Which northern sector contains Chablis?|Chablis 属北部哪片区？|Chablis and Grand Auxerrois sector.|Chablis／Grand Auxerrois 片区。|c|place
How many Chablis Grand Cru AOCs?|多少 Chablis Grand Cru AOC？|One.|一个。|h|law
How many Climats lie within Chablis Grand Cru?|Chablis Grand Cru 内多少 Climats？|Seven.|七个。|h|law
Name three Chablis Grand Cru Climats.|列三个 Grand Cru Climats。|Les Clos, Valmur, Vaudésir.|Les Clos、Valmur、Vaudésir。|h|place
Name the four Chablis Grand Cru Climats besides Les Clos, Valmur and Vaudésir.|除 Les Clos、Valmur、Vaudésir 外，另四个 Chablis Grand Cru Climats？|Blanchot, Bougros, Grenouilles, Les Preuses.|Blanchot、Bougros、Grenouilles、Les Preuses。|h|place
Which river and bank contain the hillside?|坡地在哪条河哪岸？|Serein, right bank.|Serein 右岸。|h|place
Direction from Chablis town?|相对 Chablis 镇方向？|Northeast.|东北。|h|place
Four Chablis label levels?|Chablis 四层酒标？|Petit Chablis, Chablis, Chablis Premier Cru, Chablis Grand Cru.|Petit Chablis、Chablis、Chablis Premier Cru、Chablis Grand Cru。|h|law
Is Premier Cru a producer ranking?|Premier Cru 是酒庄排名吗？|No; vineyard designation within a village AOC.|不，村庄 AOC 内葡萄园标示。|b,d|law
Bourgogne Aligoté recognition year?|Bourgogne Aligoté 认可年份？|1937.|1937 年。|l|law
Grape in Ponsot's Clos des Monts Luisants?|Ponsot Clos des Monts Luisants 品种？|Aligoté.|Aligoté。|p|people
Which village contains Ponsot’s Clos des Monts Luisants?|Ponsot 的 Clos des Monts Luisants 位于哪村？|Morey-Saint-Denis.|Morey-Saint-Denis。|p|law
Which Côte contains Morey-Saint-Denis?|Morey-Saint-Denis 属哪 Côte？|Côte de Nuits.|Côte de Nuits。|c,p|place
Linked Bouzeron producer?|链接的 Bouzeron 酒庄？|Domaine de Villaine.|Domaine de Villaine。|v|people
Clos des Mouches Rouge producer here?|本页 Clos des Mouches Rouge 酒庄？|Joseph Drouhin.|Joseph Drouhin。|d|people
Which grape makes Drouhin’s Clos des Mouches Rouge?|Drouhin 的 Clos des Mouches Rouge 用哪品种？|Pinot Noir.|Pinot Noir。|d|law
What classification does Beaune Clos des Mouches carry?|Beaune Clos des Mouches 是什么级别？|Premier Cru.|Premier Cru。|d|law
Why retain Rouge in the name?|为何保留 Rouge？|A white from the same Climat also exists.|同 Climat 也有白酒。|d|people
Important northern spring risk?|北部重要春季风险？|Frost.|霜冻。|a|place
Two central geological materials?|两个核心地质材料？|Limestone and marl.|石灰岩、泥灰岩。|c|place
What contributes beyond a soil word to Climat identity?|除土壤外什么构成 Climat 身份？|Slope, exposure, delimitation, human history.|坡度、坡向、划界、人文历史。|b|place
''')
quiz('bordeaux','''
Which rivers form the Gironde estuary?|哪河汇成 Gironde 河口？|Garonne and Dordogne.|Garonne、Dordogne。|a|place
Key Médoc red grape?|Médoc 关键红品种？|Cabernet Sauvignon.|Cabernet Sauvignon。|c|place
Key right-bank blend grape?|右岸关键调配品种？|Merlot.|Merlot。|c|place
Three principal white references?|三个主要白品种参照？|Sauvignon Blanc, Sémillon, Muscadelle.|Sauvignon Blanc、Sémillon、Muscadelle。|c|place
Broad climate influence?|主要气候影响？|Atlantic / oceanic.|大西洋／海洋性。|b|place
Famous historic classification year?|著名历史分级年份？|1855.|1855 年。|f|law
Lafite Rothschild's appellation?|Lafite Rothschild 产区？|Pauillac.|Pauillac。|l|place
Most red 1855 estates come from where?|多数 1855 红列级来自哪里？|Médoc.|Médoc。|f|law
Sweet-white 1855 areas?|1855 甜白地区？|Sauternes and Barsac.|Sauternes、Barsac。|f|law
Only one Bordeaux classification?|Bordeaux 仅一种分级吗？|No; multiple systems.|不，多体系。|k|law
Graves exception in red 1855 list?|1855 红名单 Graves 例外？|Château Haut-Brion.|Château Haut-Brion。|f|people
How many red ranks?|红酒几级？|Five.|五级。|g|law
Estates or Climats ranked in 1855?|1855 分酒庄还是 Climats？|Estates.|酒庄。|g|law
Which event prompted the classification?|何活动促成分级？|Paris Universal Exhibition.|巴黎世博会。|f|people
Which emperor commissioned the 1855 classification?|1855 分级在哪位皇帝时期委托？|Napoleon III.|Napoléon III。|f|people
Four familiar river-side Médoc communal AOCs?|四个常见河侧 Médoc 村庄 AOC？|Saint-Estèphe, Pauillac, Saint-Julien, Margaux.|Saint-Estèphe、Pauillac、Saint-Julien、Margaux。|a|place
Two more inland Médoc AOCs?|两个更内陆 Médoc AOC？|Moulis and Listrac.|Moulis、Listrac。|b|place
Which soil challenges the all-gravel stereotype?|何种土壤反驳全砾石印象？|Clay-limestone.|黏土石灰质。|b|place
Name three Médoc places with cited clay-limestone sectors.|列三个含黏土石灰质片区的 Médoc 地方。|Saint-Estèphe, Moulis, Listrac.|Saint-Estèphe、Moulis、Listrac。|b|place
Does Graves have a separate classification?|Graves 有独立分级吗？|Yes.|有。|k|law
Which system is periodically revised at Saint-Émilion?|Saint-Émilion 定期修订什么？|Estate classification.|酒庄分级。|k|law
Does Grand Cru AOC alone mean Grand Cru Classé?|Grand Cru AOC 本身等于列级吗？|No.|不。|k|law
Are Crus Bourgeois in the 1855 list?|Crus Bourgeois 属 1855 名单吗？|No; separate system.|不，独立体系。|k|law
Which region has Crus Bourgeois?|Crus Bourgeois 对应哪地区？|Médoc.|Médoc。|k|place
Which wine colour is covered by the cited Crus Bourgeois system?|所引 Crus Bourgeois 体系涉及哪酒色？|Red.|红。|k|law
Is Cru Artisan a grape?|Cru Artisan 是品种吗？|No; classification term.|不，分级术语。|k|law
Is Cru Artisan the same as Cru Bourgeois?|Cru Artisan 等于 Cru Bourgeois 吗？|No.|不。|k|law
Lafite's 1855 rank?|Lafite 的 1855 等级？|First growth.|一级庄。|g|people
Does classification replace origin?|分级取代产地吗？|No; AOC and rank are separate.|不，AOC 与等级不同。|k|law
Can unclassified estates produce fine wine?|未列级庄能酿优质酒吗？|Yes.|能。|k|law
''')
quiz('loire-valley','''
Main west-to-east sequence?|主要西至东顺序？|Nantais, Anjou-Saumur, Touraine, Centre-Loire.|Nantais、Anjou-Saumur、Touraine、Centre-Loire。|a,m|place
Muscadet's grape?|Muscadet 品种？|Melon de Bourgogne.|Melon de Bourgogne。|b|law
Versatile Anjou/Vouvray white grape?|Anjou／Vouvray 多用途白品种？|Chenin Blanc.|Chenin Blanc。|b|place
Chinon/Bourgueil red anchor?|Chinon／Bourgueil 红核心？|Cabernet Franc.|Cabernet Franc。|b|place
Pouilly-Fumé grape?|Pouilly-Fumé 品种？|Sauvignon Blanc.|Sauvignon Blanc。|b|law
Western climate influence?|西部气候影响？|Oceanic.|海洋性。|a|place
Influence increasing eastward?|向东加强的影响？|Continental.|大陆性。|a|place
Name a Chenin AOC around Tours.|列 Tours 附近 Chenin AOC。|Vouvray or Montlouis-sur-Loire.|Vouvray 或 Montlouis-sur-Loire。|b,m|place
Is Muscadet Muscat?|Muscadet 等于 Muscat？|No.|不。|b|law
Principal regional Crémant name?|主要大区 Crémant 名？|Crémant de Loire.|Crémant de Loire。|b|law
What does Sèvre-et-Maine specify?|Sèvre-et-Maine 指明什么？|A specific Muscadet geographical appellation.|具体 Muscadet 地理产区。|b,m|law
Does Muscadet Sèvre-et-Maine include named communal crus?|Muscadet Sèvre-et-Maine 有具名村庄 crus 吗？|Yes.|有。|m|law
Savennières' grape?|Savennières 品种？|Chenin Blanc.|Chenin Blanc。|b|law
Which river name gives Coteaux du Layon?|Coteaux du Layon 来自哪河名？|Layon.|Layon。|m|place
Four Cabernet Franc red references?|四个 Cabernet Franc 红参照？|Saumur-Champigny, Chinon, Bourgueil, Saint-Nicolas-de-Bourgueil.|Saumur-Champigny、Chinon、Bourgueil、Saint-Nicolas-de-Bourgueil。|b|place
Are Vouvray and Montlouis one AOC?|Vouvray、Montlouis 同一 AOC 吗？|No.|不。|b|law
How do Vouvray and Montlouis differ in river-bank location?|Vouvray、Montlouis 河岸位置有何不同？|Opposite Loire banks.|Loire 两岸。|m|place
Is Vouvray exclusively still?|Vouvray 全静止吗？|No; sparkling also exists.|不，也有起泡。|b|law
Red grape in Sancerre?|Sancerre 红品种？|Pinot Noir.|Pinot Noir。|b|law
Can Sancerre be rosé?|Sancerre 可为桃红吗？|Yes.|可以。|b|law
What are terres blanches?|Terres blanches 是什么？|Marly clay-limestone soils.|泥灰岩黏土石灰质土。|c|place
What are caillottes?|Caillottes 是什么？|Stony limestone soils.|多石石灰质土。|c|place
Which mineral identifies flint-rich clay?|富燧石黏土的重要材料？|Flint.|燧石。|c|place
Which AOC contrasts through alluvial sand/gravel?|哪 AOC 以冲积砂砾对照？|Quincy.|Quincy。|c|place
Are Loire sparkling AOC rules identical?|Loire 起泡 AOC 规则一样吗？|No.|不。|b|law
Who founded Domaine Huet?|谁创立 Huet？|Victor and Gaston Huet.|Victor、Gaston Huet。|h|people
Huet's founding year?|Huet 创立年份？|1928.|1928 年。|h|people
Three principal Huet sites?|Huet 三主要地块？|Le Haut-Lieu, Le Mont, Clos du Bourg.|Le Haut-Lieu、Le Mont、Clos du Bourg。|h|people
Huet's flint-bearing site?|Huet 含燧石地块？|Le Mont.|Le Mont。|h|place
Match Huet clay and limestone sites.|Huet 黏土、石灰岩地块对应？|Le Haut-Lieu: deeper clay; Clos du Bourg: limestone.|Le Haut-Lieu：深黏土；Clos du Bourg：石灰岩。|h|place
''')
quiz('rhone-valley','''
Northern red anchor grape?|北部红核心品种？|Syrah.|Syrah。|c|place
Condrieu grape?|Condrieu 品种？|Viognier.|Viognier。|g|law
Saint-Péray's two grapes?|Saint-Péray 两品种？|Marsanne, Roussanne.|Marsanne、Roussanne。|p|law
Broad north–south climate contrast?|南北主要气候对照？|More continental north, Mediterranean south.|北较大陆性，南地中海性。|a|place
Important valley wind?|谷地重要风？|Mistral.|Mistral。|a|place
Number of northern crus?|北部 crus 数？|Eight.|八个。|b|law
Two Viognier white AOCs?|两个 Viognier 白 AOC？|Condrieu and Château-Grillet.|Condrieu、Château-Grillet。|c,g|law
Strictly Syrah red cru?|严格单一 Syrah 红 cru？|Cornas.|Cornas。|c|law
Does Saint-Péray make sparkling wine?|Saint-Péray 做起泡吗？|Yes.|做。|p|law
Familiar broad hierarchy?|常见大层级？|Côtes du Rhône, Côtes du Rhône Villages, crus.|Côtes du Rhône、Côtes du Rhône Villages、crus。|b|law
List the eight northern crus.|列北部八 crus。|Côte-Rôtie, Condrieu, Château-Grillet, Saint-Joseph, Crozes-Hermitage, Hermitage, Cornas, Saint-Péray.|Côte-Rôtie、Condrieu、Château-Grillet、Saint-Joseph、Crozes-Hermitage、Hermitage、Cornas、Saint-Péray。|b|place
Cornas on which bank?|Cornas 在哪岸？|Right bank.|右岸。|c|place
Cornas in which département?|Cornas 属哪省？|Ardèche.|Ardèche。|c|place
Cornas's northern neighbour?|Cornas 北邻？|Saint-Joseph.|Saint-Joseph。|c|place
Cornas's southern neighbour?|Cornas 南邻？|Saint-Péray.|Saint-Péray。|c|place
Meaning of gores?|Gores 含义？|Decomposed-granite soils.|风化花岗岩土。|c|place
Meaning of chaillées?|Chaillées 含义？|Dry-stone terrace walls.|干砌石梯田墙。|c|place
Key Cornas slope aspects?|Cornas 关键坡向？|East and southeast.|东、东南。|c|place
Cornas AOC year?|Cornas AOC 年份？|1938.|1938 年。|c|law
Saint-Péray on which bank?|Saint-Péray 哪岸？|Right bank.|右岸。|p|place
Which city is nearest the cited Saint-Péray vineyards?|所引 Saint-Péray 葡萄园邻近哪城？|Valence.|Valence。|p|place
Which fortress forms a limestone landmark at Saint-Péray?|Saint-Péray 哪城堡形成石灰岩地标？|Château de Crussol.|Château de Crussol。|p|place
Is Saint-Péray entirely granite?|Saint-Péray 全花岗岩吗？|No; limestone, clay, loess and alluvium also occur.|不，也有石灰岩、黏土、黄土、冲积物。|p|place
Who made the cited first sparkling wine?|所引首款起泡酒制作人？|Louis-Alexandre Faure.|Louis-Alexandre Faure。|p|people
In which year did Faure make the cited first Saint-Péray sparkling wine?|Faure 于哪年制作所引首款 Saint-Péray 起泡酒？|1829.|1829 年。|p|people
Saint-Péray AOC year?|Saint-Péray AOC 年份？|1936.|1936 年。|p|law
Which method is used for sparkling Saint-Péray?|Saint-Péray 起泡用什么方法？|Traditional method.|传统法。|p|law
Producer of the linked Condrieu?|链接 Condrieu 酒庄？|E. Guigal.|E. Guigal。|g|people
Beaucastel Rouge appellation?|Beaucastel Rouge 产区？|Châteauneuf-du-Pape.|Châteauneuf-du-Pape。|f|people
Does a Rhône address grant Côtes du Rhône AOC?|Rhône 地址自动获 Côtes du Rhône AOC 吗？|No.|不。|b|law
''')
quiz('jura-franche-comte','''
Principal Jura white grapes?|Jura 主要白品种？|Chardonnay and Savagnin.|Chardonnay、Savagnin。|a|place
Three core red grapes?|三个核心红品种？|Poulsard, Trousseau, Pinot Noir.|Poulsard、Trousseau、Pinot Noir。|a|place
Vin jaune grape?|Vin jaune 品种？|Savagnin.|Savagnin。|b|law
What does ouillé indicate?|Ouillé 指什么？|Topped-up wine.|添桶酒。|a|law
What is sous voile?|Sous voile 是什么？|Ageing under a surface yeast veil.|表面酵母膜下陈年。|b|law
Traditional vin jaune bottle?|Vin jaune 传统瓶名？|Clavelin.|Clavelin。|v|law
Clavelin capacity?|Clavelin 容量？|62 cl.|62 cl。|v|law
Arbois AOC year?|Arbois AOC 年份？|1936.|1936 年。|a|law
Jura vineyard foothill side?|葡萄园位 Jura 哪侧山麓？|Western.|西侧。|a,c|place
Two central geological materials?|两个核心地质材料？|Marl and limestone.|泥灰岩、石灰岩。|c|place
Four vin jaune AOCs?|四个 vin jaune AOC？|Arbois, Côtes du Jura, L’Étoile, Château-Chalon.|Arbois、Côtes du Jura、L’Étoile、Château-Chalon。|b|law
Is all vin jaune Château-Chalon?|所有 vin jaune 都是 Château-Chalon 吗？|No; distinct appellation.|不，后者独立产区。|b|law
Reference vin jaune maturation duration?|Vin jaune 参照陈年期？|Six years and three months from harvest.|采收后六年三个月。|c,m|law
Is vin jaune topped up during long voile ageing?|Vin jaune 长期酒膜陈年添桶吗？|No.|不。|v,m|law
Does a clavelin prove a fixed evaporation percentage?|Clavelin 证明固定蒸发率吗？|No.|不。|v,m|law
Can Savagnin be made ouillé?|Savagnin 可以添桶酿造吗？|Yes.|可以。|a|law
Is all Savagnin vin jaune?|所有 Savagnin 都是 vin jaune 吗？|No.|不。|a,b|law
How does topping up affect headspace?|添桶如何影响顶部空间？|It reduces it.|减少空间。|a|law
Is voile ageing simple air oxidation?|酒膜陈年等于简单空气氧化吗？|No; biological ageing is involved.|不，涉及生物陈年。|b,v|law
How are vin de paille grapes concentrated?|Vin de paille 葡萄如何浓缩？|Drying after harvest.|采收后干燥。|a,c|law
Does vin de paille mean spirit addition?|Vin de paille 意指加烈酒吗？|No.|不。|a,c|law
What is Macvin?|Macvin 是什么？|Mistelle of must and grape spirit.|葡萄汁与葡萄烈酒的 mistelle。|a,c|law
What is Marc du Jura?|Marc du Jura 是什么？|Grape-pomace spirit.|葡萄渣蒸馏酒。|a,c|law
Is Macvin a Savagnin synonym?|Macvin 是 Savagnin 同义名吗？|No.|不。|a,c|law
What does Pupillin designate?|Pupillin 指什么？|Geography associated with Arbois.|与 Arbois 相关的地理标示。|p|law
Three principal vineyard towns cited?|所引三个主要葡萄园城镇？|Arbois, Poligny, Lons-le-Saunier.|Arbois、Poligny、Lons-le-Saunier。|a,c|place
Producer of the linked Côtes du Jura Vin Jaune?|所链 Côtes du Jura Vin Jaune 酒庄？|Domaine Clavelin.|Domaine Clavelin。|v|people
Home appellation of Domaine de la Pinte?|Domaine de la Pinte 所在产区？|Arbois.|Arbois。|p|people
Name two wine categories besides still wine at Domaine de la Pinte.|Domaine de la Pinte 除静止酒外另两类别？|Crémant and Macvin.|Crémant、Macvin。|p|people
Is Franche-Comté heritage limited to Jura AOCs?|Franche-Comté 传统限于 Jura AOC 吗？|No; it is geographically broader.|不，地理更广。|a,c|place
''')
quiz('savoie','''
What broad mountain region frames Savoie?|Savoie 属哪个大山地？|The Alps.|阿尔卑斯。|b|place
Key light-bodied white grape?|轻盈白酒关键品种？|Jacquère.|Jacquère。|a|place
Roussette de Savoie grape?|Roussette de Savoie 品种？|Altesse.|Altesse。|r,e|law
Bergeron is which grape?|Bergeron 是哪品种？|Roussanne.|Roussanne。|a,q|place
Central local red grape?|核心地方红品种？|Mondeuse.|Mondeuse。|a|place
Important Mondeuse geographical name?|Mondeuse 重要地理名？|Arbin.|Arbin。|a,b|place
Name two important lakes.|列两个重要湖泊。|Léman and Lac du Bourget.|Léman、Lac du Bourget。|b|place
Which grape is associated with Léman shores?|Léman 湖岸关联哪品种？|Chasselas.|Chasselas。|a,b|place
Which grape is associated with Ayze?|Ayze 关联哪品种？|Gringet.|Gringet。|a,b|place
Is Altesse Roussanne?|Altesse 等于 Roussanne 吗？|No.|不。|a,r|place
Four Roussette geographical additions?|Roussette 四附加地理名？|Frangy, Marestel, Monterminod, Monthoux.|Frangy、Marestel、Monterminod、Monthoux。|r,e|law
Does Chignin-Bergeron mean Altesse?|Chignin-Bergeron 是 Altesse 吗？|No; Roussanne.|不，是 Roussanne。|a,q|law
Three Jacquère place references?|三个 Jacquère 地点参照？|Apremont, Abymes, Chignin.|Apremont、Abymes、Chignin。|a|place
Is Arbin a grape?|Arbin 是品种吗？|No; a geographical wine name.|不，是地理酒名。|a,b|law
Is Roussette de Savoie part of Savoie AOC?|Roussette de Savoie 是 Savoie AOC 内部名吗？|No; a separate AOC.|不，独立 AOC。|r,e|law
Three mesoclimate controls besides Alpine identity?|除阿尔卑斯身份，三个局地气候因素？|Altitude, aspect, lake moderation.|海拔、坡向、湖泊调节。|b|place
Name three common slope-deposit types.|列三种常见坡地沉积。|Limestone scree, moraine, clay-marl.|石灰岩崩积、冰碛、黏土泥灰岩。|b|place
Name three major sectors beyond the lakes.|除湖泊列三个片区。|Combe de Savoie, Chautagne, Ayze.|Combe de Savoie、Chautagne、Ayze。|b|place
Is Seyssel the same as Savoie AOC?|Seyssel 等于 Savoie AOC 吗？|No.|不。|s|law
Seyssel's usual still-white grape?|Seyssel 通常静止白品种？|Altesse.|Altesse。|s|law
Which explicitly labelled grape is the exception?|明确标哪品种时例外？|Molette.|Molette。|s|law
Additional grape possible in sparkling Seyssel?|Seyssel 起泡可有哪额外品种？|Chasselas.|Chasselas。|s|law
Seyssel AOC recognition year?|Seyssel AOC 年份？|1942.|1942 年。|s|law
Earliest wine documentation cited for Seyssel?|Seyssel 所引最早酒文献年份？|1145.|1145 年。|s|place
Seyssel's three commune names?|Seyssel 三个市镇名？|Corbonod and two communes named Seyssel.|Corbonod 及两个 Seyssel 市镇。|s|place
Which two départements contain Seyssel’s appellation communes?|Seyssel 产区市镇属哪两省？|Ain and Haute-Savoie.|Ain、Haute-Savoie。|s|place
Which river crosses the Seyssel area?|哪条河穿过 Seyssel？|Rhône.|Rhône。|s|place
Where is André et Michel Quenard based?|André et Michel Quenard 在哪里？|Chignin-Torméry.|Chignin-Torméry。|q|people
Which hillside is associated with André et Michel Quenard?|André et Michel Quenard 对应哪坡地？|Torméry.|Torméry。|q|place
Which two appellation expressions are cited for André et Michel Quenard?|André et Michel Quenard 所引两个产区表达？|Vin de Savoie Chignin and Chignin-Bergeron.|Vin de Savoie Chignin、Chignin-Bergeron。|q|people
''')
quiz('provence','''
Where in France is Provence?|Provence 位于法国哪里？|Mediterranean southeast.|地中海东南部。|a,b|place
Is Provence only rosé?|Provence 只有桃红吗？|No; red and white also exist.|不，也有红、白。|b,c|place
Côtes de Provence recognition year?|Côtes de Provence 认可年份？|1977.|1977 年。|a|law
Key Bandol red grape?|Bandol 关键红品种？|Mourvèdre.|Mourvèdre。|c|place
Bandol AOC recognition year?|Bandol AOC 年份？|1941.|1941 年。|c|law
Town near Bellet?|Bellet 邻近哪城？|Nice.|Nice。|s|place
Town near Palette?|Palette 邻近哪城？|Aix-en-Provence.|Aix-en-Provence。|p|place
Grape strongly associated with Clos Cibonne?|Clos Cibonne 强关联品种？|Tibouren.|Tibouren。|t|people
Is Bandol Côtes de Provence AOC?|Bandol 属 Côtes de Provence AOC 吗？|No; separate AOC.|不，独立 AOC。|b,c|law
Is Palette independent?|Palette 独立吗？|Yes; independent AOC.|是，独立 AOC。|p|law
Three Côtes de Provence départements?|Côtes de Provence 三省？|Var, Bouches-du-Rhône, Alpes-Maritimes.|Var、Bouches-du-Rhône、Alpes-Maritimes。|a|place
Dominant northern/western foundation?|北、西主要地质基础？|Limestone.|石灰岩。|a|place
Contrasting southern/eastern foundation?|南、东对照地质？|Crystalline rocks.|结晶岩。|a|place
Two crystalline massifs?|两个结晶岩山体？|Maures and Estérel.|Maures、Estérel。|a|place
Name five Côtes de Provence terroir expressions.|列五个具名风土表达。|Sainte-Victoire, Fréjus, La Londe, Pierrefeu, Notre-Dame des Anges.|Sainte-Victoire、Fréjus、La Londe、Pierrefeu、Notre-Dame des Anges。|a|law
Is Provence geography identical to Côtes de Provence AOC?|Provence 地理等于 Côtes de Provence AOC 吗？|No.|不。|a,b|law
Name four independent AOCs cited.|列本页四个独立 AOC。|Bandol, Cassis, Palette, Bellet.|Bandol、Cassis、Palette、Bellet。|b,c,p|law
How many Bandol communes are cited?|本页 Bandol 几市镇？|Eight.|八。|d|place
Name four Bandol communes besides Bandol itself.|除 Bandol 列四市镇。|Le Beausset, La Cadière-d’Azur, Le Castellet, Évenos.|Le Beausset、La Cadière-d’Azur、Le Castellet、Évenos。|d|place
Which Bandol communes remain after Bandol, Le Beausset, La Cadière-d’Azur, Le Castellet and Évenos?|除 Bandol、Le Beausset、La Cadière-d’Azur、Le Castellet、Évenos，另三个市镇？|Ollioules, Saint-Cyr-sur-Mer, Sanary-sur-Mer.|Ollioules、Saint-Cyr-sur-Mer、Sanary-sur-Mer。|d|place
Does Bandol produce white wine?|Bandol 产白酒吗？|Yes.|产。|c|law
Can Bandol red grape rules describe its whites?|Bandol 红品种规则可概括白酒吗？|No.|不。|c|law
What is poudingue?|Poudingue 是什么？|Cemented rounded-pebble conglomerate.|圆砾胶结砾岩。|s|place
Which small Provençal AOC is associated with poudingue?|哪个小型 Provence AOC 关联 poudingue？|Bellet.|Bellet。|s|place
Which valley locates Palette?|哪河谷定位 Palette？|Arc valley.|Arc 河谷。|p|place
Clos Cibonne's commune?|Clos Cibonne 市镇？|Le Pradet.|Le Pradet。|t|people
Name Clos Cibonne’s cited Tibouren range.|Clos Cibonne 所引 Tibouren 系列名？|Tibouren Tradition.|Tibouren Tradition。|t|people
Two Prestige names cited?|所引两个 Prestige 名？|Caroline and Olivier.|Caroline、Olivier。|t|people
Which producer is the Bellet example?|Bellet 酒庄实例？|Domaine Saint Jean.|Domaine Saint Jean。|s|people
Does a Provençal address authorise Côtes de Provence?|Provence 地址自动获准 Côtes de Provence 吗？|No.|不。|a,b|law
''')
quiz('languedoc','''
Broad climate setting?|主要气候环境？|Mediterranean.|地中海。|a|place
Is Languedoc geography one AOC?|Languedoc 地理就是单一 AOC 吗？|No; many AOCs and IGPs.|不，多个 AOC、IGP。|b,l|law
Former name replaced in 2007?|2007 年替代的旧名？|Coteaux du Languedoc.|Coteaux du Languedoc。|b|law
Replacement regional AOC name?|替代后的大区 AOC 名？|Languedoc.|Languedoc。|b|law
Three principal regional red references?|三个大区红品种重点？|Grenache, Syrah, Mourvèdre.|Grenache、Syrah、Mourvèdre。|a|place
Pays d’Oc's legal category?|Pays d’Oc 法律类别？|IGP.|IGP。|d|law
Town south of Pic Saint Loup?|Pic Saint Loup 以南哪城？|Montpellier.|Montpellier。|c|place
Pic Saint Loup recognition year?|Pic Saint Loup 独立认可年份？|2017.|2017 年。|c|law
What is the principal geology of the Pic Saint Loup massif?|Pic Saint Loup 山体主要地质？|Limestone.|石灰岩。|c|place
Is Pays d’Oc Languedoc AOC?|Pays d’Oc 等于 Languedoc AOC 吗？|No.|不。|d,b|law
Three landscape types in the region?|地区三类地貌？|Coastal plains, inland hills, Cévennes foothills.|海岸平原、内陆丘陵、Cévennes 山麓。|a,c|place
Three controls modifying summer heat?|调节夏季热量的三因素？|Elevation, aspect, sea distance.|海拔、坡向、距海距离。|a,c|place
Name five regional geological materials.|列五种地区地质材料。|Limestone, clay, schist, sandstone, alluvium.|石灰岩、黏土、片岩、砂岩、冲积物。|a,l|place
Is the regional Languedoc AOC described as multivariety?|大区 Languedoc AOC 被描述为多品种吗？|Yes.|是。|a|law
Does Languedoc AOC’s blend rule govern every nearby AOC?|Languedoc AOC 调配规则适用全部邻近 AOC 吗？|No.|不。|a,l|law
Two additional red grapes broadening the region?|另外两个扩展地区面貌的红品种？|Carignan and Cinsaut.|Carignan、Cinsaut。|a,l|place
Name three independent AOCs beyond Languedoc.|除 Languedoc 列三独立 AOC。|Corbières, Minervois, Saint-Chinian.|Corbières、Minervois、Saint-Chinian。|l|law
Name three more cited identities.|再列本页三个身份。|Faugères, La Clape, Terrasses du Larzac.|Faugères、La Clape、Terrasses du Larzac。|l|law
Does Picpoul de Pinet mean every Piquepoul wine?|Picpoul de Pinet 指所有 Piquepoul 酒吗？|No; a protected geographical appellation.|不，受保护地理产区。|l|law
Does Limoux have only one wine style?|Limoux 只有一种风格吗？|No; still and sparkling identities differ.|不，静止起泡身份不同。|l|law
What labelling identity is strong in Pays d’Oc?|Pays d’Oc 哪种标示突出？|Varietal labelling.|品种标示。|d|law
Does Pays d’Oc use only international grapes?|Pays d’Oc 仅用国际品种吗？|No; local grapes also occur.|不，也有地方品种。|d|place
Does conservation planting prove AOC permission?|保育种植证明 AOC 许可吗？|No.|不。|r,a|law
Which producer supplies the Picardan example?|Picardan 实例来自哪庄？|Domaine Ampelhus.|Domaine Ampelhus。|p|people
What colour grape is Picardan?|Picardan 什么酒色品种？|White.|白。|p|place
Which producer makes Le Canaguier?|Le Canaguier 来自哪庄？|Domaine d’Aupilhac.|Domaine d’Aupilhac。|u|people
Is Le Canaguier a regional appellation name?|Le Canaguier 是大区产区名吗？|No; a producer cuvée.|不，是酒庄 cuvée。|u|people
Which cited producer works with rare varieties?|所引哪庄研究稀有品种？|Pierre Cros.|Pierre Cros。|r|people
Are inland foothills identical to coastal plains?|内陆山麓等于海岸平原吗？|No; exposure and climate differ.|不，坡向气候不同。|a,c|place
Should older Coteaux du Languedoc labels be renamed historically?|旧 Coteaux du Languedoc 酒标应改写历史名称吗？|No; retain the period's legal wording.|不，保留当时法定措辞。|b|law
''')
quiz('roussillon','''
Which sea borders Roussillon?|Roussillon 邻哪海？|Mediterranean.|地中海。|a|place
Which mountain chain is nearby?|附近哪山脉？|Pyrenees.|比利牛斯。|c,d|place
Three principal rivers?|三条主要河流？|Agly, Têt, Tech.|Agly、Têt、Tech。|a|place
Does Roussillon make dry wine?|Roussillon 做干酒吗？|Yes.|做。|c,d|law
What does VDN stand for?|VDN 全称？|Vin doux naturel.|Vin doux naturel。|c|law
Is VDN fortified?|VDN 强化吗？|Yes.|是。|c|law
How is fermentation arrested?|如何中断发酵？|Addition of grape spirit, or mutage.|加入葡萄烈酒，即 mutage。|c|law
Grape in Rivesaltes Grenat?|Rivesaltes Grenat 品种？|Grenache Noir.|Grenache Noir。|b|law
Name a coastal dry AOC.|列一海岸干酒 AOC。|Collioure.|Collioure。|c,e|law
Is every Mas Amiel wine sweet?|Mas Amiel 全是甜酒吗？|No; dry wines also exist.|不，也有干酒。|m|people
Four geographical boundaries cited?|所引四周边地貌？|Corbières, Canigou, Albères, Mediterranean.|Corbières、Canigou、Albères、地中海。|a|place
Inland schist reference?|内陆片岩参照？|Maury.|Maury。|e|place
Two coastal schist references?|两个海岸片岩参照？|Banyuls and Collioure.|Banyuls、Collioure。|e|place
Does shared schist imply identical mesoclimate?|同为片岩表示局地气候一样吗？|No.|不。|e|place
Name three non-schist soil materials.|列三种非片岩材料。|Clay, limestone, sand or gravel.|黏土、石灰岩、砂或砾石。|a,e|place
Three Grenache colour forms?|三种 Grenache 颜色形态？|Noir, Blanc, Gris.|Noir、Blanc、Gris。|b,c|place
Four principal dry-wine identities?|四个主要干酒身份？|Collioure, Côtes du Roussillon, Côtes du Roussillon Villages, Maury sec.|Collioure、Côtes du Roussillon、Côtes du Roussillon Villages、Maury sec。|c,d|law
Five principal VDN references?|五个主要 VDN 参照？|Banyuls, Banyuls Grand Cru, Maury, Rivesaltes, Muscat de Rivesaltes.|Banyuls、Banyuls Grand Cru、Maury、Rivesaltes、Muscat de Rivesaltes。|c,d|law
What sugar does mutage retain?|Mutage 保留哪种来源糖分？|Grape sugar.|葡萄糖分。|c|law
Does naturel mean no spirit addition?|Naturel 意味没加烈酒吗？|No.|不。|c|law
Does fortification necessarily mean oxidative ageing?|强化必定意味着氧化陈年吗？|No.|不。|b,m|law
Two oxidative Rivesaltes style names?|两个氧化 Rivesaltes 风格名？|Ambré and tuilé.|Ambré、tuilé。|b|law
Minimum Grenache Noir in cited tuilé summary?|所引 tuilé 摘要最低 Grenache Noir？|50%.|50%。|b|law
Is tuilé a grape synonym?|Tuilé 是品种同义名吗？|No; style designation.|不，是风格名。|b|law
Which Muscat appellation also covers Banyuls/Maury?|哪个 Muscat 产区也覆盖 Banyuls／Maury？|Muscat de Rivesaltes.|Muscat de Rivesaltes。|d|law
Does overlapping territory make the wines identical?|地域重合使酒相同吗？|No; grapes and category differ.|不，品种类别不同。|c,d|law
Which dry/fortified pair shares coastal landscape?|共享海岸景观的干／强化产区？|Collioure / Banyuls.|Collioure／Banyuls。|c,e|place
Two sweet-range approaches at Mas Amiel?|Mas Amiel 甜酒两种系列方式？|Vintage and long oxidative ageing.|年份型及长期氧化陈年。|m|people
Which three oxidative sweet-wine age statements are cited for Mas Amiel?|Mas Amiel 所引三种氧化甜酒年龄标示？|20, 30, 40 years.|20、30、40 年。|m|people
Is an age statement a harvest vintage?|年龄标示等于采收年份吗？|No.|不。|m|law
''')
quiz('corsica','''
Which sea surrounds Corsica?|Corsica 被哪海包围？|Mediterranean.|地中海。|a,b|place
Main topographical feature?|主要地形特点？|Mountainous island.|多山岛屿。|a,b|place
Key Patrimonio red grape?|Patrimonio 核心红品种？|Niellucciu.|Niellucciu。|a,p|place
Key Ajaccio red grape?|Ajaccio 核心红品种？|Sciaccarellu.|Sciaccarellu。|c|place
Key island white grape name?|岛屿关键白品种地方名？|Vermentinu.|Vermentinu。|a,d|place
Patrimonio recognition year?|Patrimonio 认可年份？|1968.|1968 年。|p,l|law
Ajaccio recognition year?|Ajaccio 认可年份？|1984.|1984 年。|c|law
Ajaccio's key geological foundation?|Ajaccio 关键地质？|Granite.|花岗岩。|c|place
Patrimonio's contrasting foundation?|Patrimonio 对照地质？|Limestone-rich terrain.|富石灰质地形。|p,l|place
Gulf near Patrimonio?|Patrimonio 邻哪海湾？|Gulf of Saint-Florent.|Saint-Florent 湾。|p,l|place
Four distinct protected identities cited?|所引四个独立保护身份？|Ajaccio, Patrimonio, Corse, Muscat du Cap Corse.|Ajaccio、Patrimonio、Corse、Muscat du Cap Corse。|a|law
Five geographical additions to Corse?|Corse 五附加地理名？|Calvi, Coteaux du Cap Corse, Figari, Porto-Vecchio, Sartène.|Calvi、Coteaux du Cap Corse、Figari、Porto-Vecchio、Sartène。|a|law
Does a nine-name summary mean nine independent PDOs?|九名称概述等于九独立 PDO 吗？|No; additions may be included in the count.|不，可能把附加名计入。|a,b|law
Is Ajaccio merely a Corse addition?|Ajaccio 只是 Corse 附加名吗？|No; independent protected identity.|不，独立保护身份。|a,c|law
How many Patrimonio communes are cited?|所引 Patrimonio 几市镇？|Seven.|七个。|l|place
Name three communes within Patrimonio.|列 Patrimonio 内三个市镇。|Barbaggio, Farinole, Oletta.|Barbaggio、Farinole、Oletta。|l|place
Name the four Patrimonio communes besides Barbaggio, Farinole and Oletta.|除 Barbaggio、Farinole、Oletta，Patrimonio 另四市镇？|Patrimonio, Poggio-d’Oletta, Saint-Florent, Santo-Pietro-di-Tenda.|Patrimonio、Poggio-d’Oletta、Saint-Florent、Santo-Pietro-di-Tenda。|l|place
Three local climate controls?|三个局地气候因素？|Altitude, aspect, maritime exposure.|海拔、坡向、面海程度。|a,b|place
Should local spellings become duplicate grape records?|地方拼写应重复建品种吗？|No; link the canonical variety.|不，连接标准品种。|a,d|law
Does estate cultivation prove AOC grape permission?|酒庄种植证明 AOC 品种许可吗？|No.|不。|c,d|law
Which estate documents rare-variety conservation?|哪庄记录稀有品种保育？|Domaine Comte Abbatucci.|Domaine Comte Abbatucci。|d|people
Which decade began Abbatucci’s cited native-grape work?|Abbatucci 所引本地品种工作始于何年代？|1960s.|1960 年代。|d|people
First Collection vintage year cited?|所引首批 Collection 年份？|2006.|2006 年。|d|people
Three Abbatucci ranges?|Abbatucci 三个系列？|Faustine, Parcellaires, Collections.|Faustine、Parcellaires、Collections。|d|people
Is Diplomate d’Empire a grape?|Diplomate d’Empire 是品种吗？|No; cuvée name.|不，是 cuvée。|d|people
Name two Abbatucci Collection cuvées besides Diplomate d’Empire.|除 Diplomate d’Empire 外列两个 Abbatucci Collection 酒款。|Général de la Révolution, Ministre Impérial.|Général de la Révolution、Ministre Impérial。|d|people
Monte Bianco's grape?|Monte Bianco 品种？|Sciaccarello.|Sciaccarello。|v|people
Is Monte Bianco a parcel-wine reference?|Monte Bianco 是单地块参照吗？|Yes.|是。|v|people
Can all Abbatucci wines be assumed Ajaccio AOC?|可预设 Abbatucci 全为 Ajaccio AOC 吗？|No; retain each bottle's actual category.|不，保留每款实际类别。|d,v|law
Does 1960s revival prove ancient origin for every grape?|1960 年代复兴证明每种葡萄古代起源吗？|No; revival history and genetic origin differ.|不，复兴史与遗传起源不同。|d|people
''')
