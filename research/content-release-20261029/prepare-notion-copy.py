import copy, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
original = json.loads((ROOT / 'research/content-release-20261028/france-review.json').read_text())['nativeIntegrationCandidates']
out = copy.deepcopy(original)
excluded_producers = {'producer-fr-domaine-tempier', 'producer-fr-chateau-simone'}
out['producers'] = [p for p in out['producers'] if p['id'] not in excluded_producers]
out['wines'] = [w for w in out['wines'] if w['producerId'] not in excluded_producers]

def clean(s):
    s = re.sub(r'\[(https?://[^\]]+)\]\(https?://[^)]+\)', '', s)
    s = re.sub(r'\[([^\]]+)\]\(https?://[^)]+\)', r'\1', s)
    s = s.replace('\\~', 'approximately ').replace('\\[', '[').replace('\\]', ']')
    return re.sub(r' {2,}', ' ', s).strip()

producer_copy = {
'producer-fr-domaines-ott': [
('History', 'Domaines Ott traces its history to Marcel Ott in the early twentieth century. He acquired Château de Selle in 1912. The name represents a family-founded group of estates and a wider wine portfolio.'),
('People and ownership', 'The official website identifies Domaines Ott as part of the Roederer Collection. The group comprises three distinct estates; detailed shareholdings and their chronology are not documented in the sources used here.'),
('Vineyards and sites', 'Château de Selle is at Taradeau in Côtes de Provence; Clos Mireille is at coastal La Londe-les-Maures, also in Côtes de Provence; Château Romassan is near Le Castellet in Bandol. Étoile combines fruit from the three estates and is classified Vin de France.'),
('Portfolio', 'The portfolio includes Château de Selle, Clos Mireille and Château Romassan estate wines, the cross-estate Étoile cuvée and the BY.OTT range. Individual wine profiles in this first edition cover a selection of the portfolio.')],
'producer-fr-domaines-ott-chateau-de-selle': [
('History', 'Château de Selle, at Taradeau near Draguignan, was the first estate purchased by Marcel Ott, in 1912. It is one of the three Domaines Ott estates and produces Côtes de Provence wines.'),
('People and ownership', 'An estate within Domaines Ott, whose official website identifies an affiliation with the Roederer Collection. The detailed legal ownership chronology of the estate is not documented in this profile.'),
('Vineyards and sites', 'The estate describes approximately 93 hectares of planted vines around Taradeau, with gypsum, red clay, sandstone, gravel and stones. These figures and soils concern Château de Selle.'),
('Portfolio', 'Château de Selle Rosé is a Côtes de Provence AOC wine. The estate catalogue also includes a red wine; a complete vintage-by-vintage portfolio is outside this first edition.')],
'producer-fr-domaines-ott-clos-mireille': [
('History', 'Clos Mireille is a coastal estate at La Londe-les-Maures and a distinct member of the Domaines Ott collection. Its rosé and white wines are associated with Côtes de Provence AOC.'),
('People and ownership', 'Clos Mireille operates within Domaines Ott. Group affiliation is described in the Domaines Ott profile; detailed estate shareholdings are not documented here.'),
('Vineyards and sites', 'The English estate page describes approximately 56 hectares of vines within a 174-hectare protected landscape, on schist and quartz. An older French page gives 53 hectares of vines; these are source-specific figures, not a single permanent measurement.'),
('Portfolio', 'Clos Mireille Blanc and Clos Mireille Rosé are Côtes de Provence AOC wines.')],
'producer-fr-domaines-ott-chateau-romassan': [
('History', 'Château Romassan lies near Le Castellet within Bandol AOC. The historic château dates to the eighteenth century. Its origin is distinct from the group’s Côtes de Provence estates.'),
('People and ownership', 'Château Romassan is a Domaines Ott estate. The group website identifies its Roederer Collection affiliation; a detailed dated ownership history is not available in the sources used here.'),
('Vineyards and sites', 'The estate describes approximately 83 hectares of vineyards across eight Bandol communes, with gravelly limestone and marl soils, maritime sunshine and cooling air.'),
('Portfolio', 'Château Romassan Rosé and Château Romassan Rouge are Bandol AOC wines. The group’s Étoile cuvée also draws on the other two Domaines Ott estates.')],
'producer-fr-mas-amiel': [
('History', 'Raymond-Étienne Amiel acquired the property in 1816. Charles Dupuy acquired it in 1907, and successive Dupuy generations developed its reputation for vins doux naturels. Olivier Decelle began a period of renewal in 1999, developing dry wines alongside fortified Maury.'),
('People and ownership', 'The estate chronology records Raymond-Étienne Amiel from 1816, the Charles and Jean Dupuy family era from 1907 to 1997, and Olivier Decelle’s transformation from 1999. These historical roles do not establish current shareholding percentages.'),
('Vineyards and sites', 'Mas Amiel lies in the Agly valley at Maury, Roussillon. The estate page describes about 95 parcels and 100 hectares of vineyards, including old Grenache and Carignan on schist and calcareous schist. A historical 1999 account gives 155 planted hectares within a 226-hectare property; the figures refer to different dates and definitions. The estate reports organic certification in 2017 and biodynamic certification by 2020.'),
('Portfolio', 'The fortified portfolio includes Vintage Rouge, Vintage Réserve, Vintage Charles Dupuy, Vintage Blanc, aged oxidative blends and vintage-dated Maury. The Trésors du Temps selection includes 20, 30, 40 and 50 Ans d’Âge. Dry wines include Maury Sec and Côtes du Roussillon. Availability and individual cuvée specifications depend on the release.')],
'producer-fr-clos-cibonne': [
('History', 'Clos Cibonne is a Roux family estate at Le Pradet in Provence. André Roux (1905–1989) championed Tibouren and helped establish the estate’s Côtes de Provence Cru Classé standing. His daughter Jacqueline and son-in-law Émile ran the estate from 1989 to 2003; later family accounts document Brigitte, Claude, Olivier and Caroline.'),
('People and ownership', 'The estate describes Olivier joining in 2012 to lead viticulture and winemaking, Brigitte in sales and administration, Claude in commercial development, and Caroline contributing to communications. These are source-era responsibilities; current beneficial shareholdings are not documented here.'),
('Vineyards and sites', 'The coastal Le Pradet estate is a Tibouren specialist and one of Provence’s historical Cru Classé estates. Tradition combines Tibouren and Grenache. Cuvée des Vignettes draws on vines dating from the mid-1950s. The Prestige cuvées Caroline and Olivier use 300-litre barrels.'),
('Portfolio', 'The estate catalogue includes Tradition, Tentations, Cuvée des Vignettes and the Prestige wines Caroline Rosé and Olivier Rouge. Historical Cuvée Spéciale Tibouren naming and vintage-specific releases require their corresponding labels and technical sheets.')],
'producer-fr-domaine-jules-desjourneys': [
('History', 'Jules Desjourneys began wine production in 2007 with Fleurie and Moulin-à-Vent. The source chronology dates Chénas Le Jugement Dernier and later Chassignol-related releases from 2012. The portfolio subsequently extended into Mâconnais whites. The literary account of “Jules” on the website is brand storytelling, not evidence of a historical founder of that name.'),
('People and ownership', 'The official legal notice names SARL Jules Desjourneys, gives an address at La Chapelle-de-Guinchay, and identifies Fabien Duperray as publication manager. It does not establish complete corporate shareholdings or vineyard land titles.'),
('Vineyards and sites', 'Origins include Fleurie sites Les Moriers and Chapelle des Bois, Moulin-à-Vent sites Chassignol and Aux Michelons, Chénas Le Jugement Dernier, and Pouilly-Fuissé in the Mâconnais. Chassignol is described as old vines on quartz-rich granite. Each wine retains its own geographical origin.'),
('Portfolio', 'Documented cuvées include Moulin-à-Vent Chassignol and Aux Michelons, Fleurie Les Moriers and La Chapelle des Bois, Chénas Le Jugement Dernier, and Pouilly-Fuissé Les Vignes Blanches. Historical “Les Michelons” naming and references to Les Ménétrières require vintage-specific labels for precise comparison. The current red-wine portfolio is broader than this selection.')],
'producer-fr-domaine-comte-abbatucci': [
('History', 'The family estate lies at Casalabriva in the Taravo valley of southern Corsica. Antoine Abbatucci established a collection of traditional Corsican grape varieties; Jean-Charles developed biodynamic farming and heritage-variety research. The Collection range, celebrating historical family figures, began in 2006.'),
('People and ownership', 'The estate website names Jean-Charles and his daughter Faustine Abbatucci as proprietor-vignerons. Its 2026 legal notice identifies EARL Domaine Comte Abbatucci. Detailed beneficial shareholdings are not given.'),
('Vineyards and sites', 'The estate describes 21 hectares of vines on decomposed granitic sands near 150 metres altitude in the Taravo valley. Its ampelographic collection conserves a range of native grapes; the estate area is not an individual cuvée’s vineyard area.'),
('Viticulture', 'Biodynamic cultivation and conservation of Corsican grapes are central to the estate’s stated approach. The website’s reference to 18 old or native varieties concerns the conservatory, not the blend of every wine.'),
('Vinification', 'Methods vary by range. Faustine whites and rosés largely use stainless steel; the red uses a longer maceration. Collection whites combine demi-muids and stainless steel. Parcellaires wines may use foudres, demi-muids or tanks. Wine-specific technical sheets define the relevant process.'),
('Portfolio', 'The portfolio includes Faustine Blanc, Rouge and Rosé; the Parcellaires wines Alte Rosso Blanc, Monte Bianco Rouge and Valle di Nero Rosé; and Collection wines Ministre Impérial Rouge, Diplomate d’Empire Blanc and Général de la Révolution Blanc. The current Ministre Impérial technical sheet specifies Vin de France. Historical Faustine Vieilles Vignes Rosé naming requires a corresponding release label. Other estate ranges include Empire Sparkling, Dolce Rosso and the Insolites Valle di Mare and Monte Mare.')],
'producer-fr-domaine-gauby': [
('History', 'Domaine Gauby is a family property centred on Calce in Roussillon, associated with terroir-focused wines and organic, biodynamic and regenerative farming. Distributor and regional accounts describe Gérard Gauby’s development of the estate and Lionel Gauby’s subsequent role in vinification.'),
('People and ownership', 'Gérard Gauby established and expanded the domaine; distributor accounts identify Lionel with later winemaking and estate stewardship. Family roles, company representatives and land ownership are distinct matters; detailed current shareholdings are not established here.'),
('Vineyards and sites', 'Distributor and regional sources describe an approximately 85-hectare ecosystem: around 45 hectares of vines and 40 hectares of grassland, woodland and garrigue. Sites lie near 150–200 metres altitude, with limestone, marl and schist under Mediterranean influence. Some vines exceed a century in age. Areas and vine ages are source-specific.'),
('Viticulture', 'Distributors describe organic and biodynamic cultivation with preparations made at the estate. These farming descriptions do not, by themselves, document a current certification.'),
('Vinification', 'Whole-bunch handling, carbonic maceration and maturation vary by wine and period. The 2023 La Muntada description specifies 70% Grenache and 30% Carignan, with 14 months in foudre and concrete. That release is IGP Côtes Catalanes; older Côtes du Roussillon Villages descriptions belong to their respective vintages.'),
('Portfolio', 'The distributor’s 2026 list includes Les Calcinaires Blanc and Rouge, Vieilles Vignes Blanc and Rouge, La Muntada Rouge, Coume Gineste Blanc and La Jasse, under IGP Côtes Catalanes. Historical references also include La Roque. Colour and vintage distinguish wines that share a cuvée name.')],
'producer-fr-domaine-jean-foillard': [
('History', 'Jean and Agnès Foillard took over Jean’s father’s property in 1980. Jean became associated with the Beaujolais low-intervention movement influenced by Jules Chauvet and the group often called the “Gang of Four”: Lapierre, Thévenet, Breton and Foillard. This history is documented by importer Kermit Lynch.'),
('People and ownership', 'Importer sources identify Jean and Agnès with the 1980 takeover. Alex Foillard also appears as an associated grower, with a distinct portfolio; current legal shareholding percentages are not documented in this profile.'),
('Vineyards and sites', 'The importer describes close to 14 hectares at the time of publication, including Morgon Côte du Py, Corcelette, Les Charmes and Fleurie. Côte du Py descriptions refer to schist, granite and manganese; Corcelette is lighter and sandy. Cuvée 3.14 draws on very old Gamay, described as around a century old. Portfolio-wide vineyard totals are not individual cuvée areas.'),
('Viticulture', 'The importer reports certified organic farming, hand sorting, restrained sulphur use and unfiltered bottling. These descriptions are tied to the importer’s publication, rather than a separately examined current certificate.'),
('Vinification', 'For several Morgon cuvées, the importer describes traditional whole-bunch, semi-carbonic fermentation over three to four weeks and six to nine months in used Burgundy barrels. Corcelette may also use a 30-hectolitre foudre. Timing and vessels may vary by vintage.'),
('Portfolio', 'The Morgon selection includes Côte du Py, Corcelette, Cuvée 3.14 and Les Charmes, also encountered as Eponym’. The importer additionally lists Beaujolais-Villages and Fleurie. Cuvée 3.14 is a selected very-old-vine expression whose release is vintage-dependent.')],
'producer-fr-domaine-du-clos-des-fees': [
('History', 'Hervé and Claudine Bizeul established Domaine du Clos des Fées at Vingrau in Roussillon in the late 1990s. Estate and importer accounts describe a portfolio assembled from small parcels across several Roussillon terroirs.'),
('People and ownership', 'Hervé Bizeul is identified as founder and vigneron, with Claudine Bizeul in the estate’s historical account. A current corporate shareholding breakdown is not documented in the sources used here.'),
('Vineyards and sites', 'The estate works a mosaic of limestone-clay, marl and schist sites around Vingrau, exposed to the Tramontane. A 2025 importer catalogue describes approximately 30 hectares across several terroirs and more than 100 plots. La Petite Sibérie is a particular old-vine, Grenache-dominant, wind-exposed parcel; these estate-wide figures are not its area.'),
('Portfolio', 'Principal names include Le Clos des Fées, Vieilles Vignes, Les Sorcières, La Petite Sibérie and De battre mon cœur s’est arrêté. Vieilles Vignes and Les Sorcières occur in both red and white forms. The 2023 Post Scriptum release has a distinct identity from standard La Petite Sibérie. Appellation, colour and technical details require the corresponding wine and vintage.')],
'producer-fr-domaine-marcel-lapierre': [
('History', 'The family history in Villié-Morgon begins with Michel Lapierre in 1909. His son Camille developed bottling; Marcel took over in 1973 and, influenced by Jules Chauvet, began pursuing vinification without added sulphur in 1981. Marcel died in October 2010. Mathieu joined in 2004 and assumed management in 2010; his sister Camille joined in 2013. The name “M & C Lapierre” refers to the same family estate.'),
('People and ownership', 'The family account includes Marcel, Mathieu, Camille, Anne and Marie. Mathieu’s management and winemaking role dates from 2010; Camille joined in 2013. Marie is associated with historical viticulture and sales responsibilities. Detailed current beneficial shareholdings are not stated.'),
('Vineyards and sites', 'The estate’s 2026 website reports approximately 20 hectares of Gamay noir à jus blanc, predominantly in Morgon with some Beaujolais sites. Cuvée Camille comes from a southwest-facing Côte du Py site on shallow granitic bedrock; an older technical sheet gives one hectare. These figures have different geographical and chronological scopes.'),
('Viticulture', 'The estate reports organic certification since 2004 and a farming approach developed from around 1981.'),
('Vinification', 'Hand harvesting and sorting precede semi-carbonic Beaujolais maceration with indigenous yeast. Sulphur additions during vinification are limited or absent, while bottling practice varies by wine and batch. Cuvée Camille receives a longer maceration in a wooden truncated-conical vat; exact timing is vintage-dependent.'),
('Portfolio', 'Morgon and Cuvée Camille are part of a wider portfolio that includes Cuvée Marcel Lapierre, Raisins Gaulois, Beaujolais and Bourgogne Pinot Noir. Cuvée Camille has historical Roche du Py and Côte du Py references; it is distinct from Cuvée Marcel Lapierre.')],
'producer-fr-domaine-jean-marc-burgaud': [
('History', 'Jean-Marc Burgaud founded the Villié-Morgon estate in 1989. Its 2026 website reports 17.5 hectares in Beaujolais: 12.5 in Morgon and five in Lantignié. Morgon expressions include Côte du Py, Javernières, La Roche, James, Ruyère and Chollet.'),
('People and ownership', 'Jean-Marc Burgaud is the founder and winemaker. The sources used here do not establish a detailed current shareholding or succession structure.'),
('Vineyards and sites', 'Côte du Py is described as a south-facing hill of blue schist rich in iron oxides, alongside the estate’s separate granite and clay sites. A dated commercial account refers to six hectares at Côte du Py; the estate’s 12.5 hectares in Morgon represent a broader area.'),
('Viticulture', 'An organic certification is not established by the sources used in this first edition.'),
('Vinification', 'Estate and importer sources describe whole-cluster Gamay maceration. A Côte du Py importer profile gives seven to twelve days; an older technical sheet gives twelve to fourteen. These are source-specific descriptions, rather than a fixed protocol for every vintage.'),
('Portfolio', 'The estate lists Lantignié whites and reds alongside Morgon Chollet, Ruyère, La Roche, Côte du Py, Javernières and James. This first edition includes an individual Côte du Py profile.')]
}

for p in out['producers']:
    old_sections = {s['title']:s for s in p['sections']}
    p['sections'] = [{'title':t, 'text':text, 'sourceIds':old_sections.get(t,{}).get('sourceIds',p['sourceIds'])} for t,text in producer_copy[p['id']]]
    p['intro'] = p['sections'][0]['text']
    p['scope'] = 'First edition in English. Chinese translation pending. Areas, personnel and methods are attributed to the cited sources; individual vintages may differ.'
    p['contentLanguage'] = 'en'

wine_copy = {
'wine-fr-domaines-ott-cotes-de-provence-etoile': {
 'denomination':'Vin de France', 'composition':'2024: 80% Grenache, 20% Mourvèdre.', 'style':'Rosé · Vin de France · cross-estate cuvée',
 'vintageScope':'2024 release. The estate technical sheet specifies Vin de France, 14% ABV and a serving temperature of 10–12°C.', 'serving':'2024 estate recommendation: 10–12°C.',
 'vineyard':'Fruit from Clos Mireille (schist and clay), Château de Selle (limestone) and Château Romassan (limestone, sandstone and marl). Estate proportions and exact parcels are not specified.'},
'wine-fr-mas-amiel-maury-50-ans-d-age': {
 'denomination':'Maury AOC', 'composition':'100% Grenache Noir, according to the estate’s Trésors du Temps description of 50 Ans d’Âge.',
 'vintageScope':'A multi-vintage aged blend included in the estate’s Trésors du Temps selection alongside 20, 30 and 40 Ans d’Âge. Base vintages and a complete cuvée-specific ageing chronology are not supplied.',
 'method':'The estate’s oxidative house process includes fortification on skins, about one year outdoors in 60-litre glass demijohns, then extended maturation in old oak foudres. This describes the house method; the exact chronology for 50 Ans d’Âge is not established in the cited product page.'},
'wine-fr-mas-amiel-maury-vintage-blanc': {
 'denomination':'Maury AOC', 'composition':'2025: 100% Grenache Gris.',
 'vintageScope':'The composition and technical details concern the estate’s 2025 release. This is a sweet fortified Maury Blanc, distinct from the estate’s dry white wines.'},
'wine-fr-domaine-comte-abbatucci-vin-de-france-alte-rosso': {
 'denomination':'Vin de France', 'composition':'100% Barbarossa.', 'grapeNames':['Barbarossa'], 'style':'White · Vin de France · Parcellaires',
 'vintageScope':'The estate identifies Alte Rosso as a white wine. Its wine-specific profile gives Vin de France and an undated house method; exact vintage specifications may differ.',
 'vineyard':'Parcellaires single-terroir selection on decomposed granitic sands in the Taravo valley. Exact parcel boundaries and area are not given.'},
'wine-fr-domaine-comte-abbatucci-vin-de-france-diplomate-d-empire': {
 'denomination':'', 'composition':'Vermentino, Brustiano, Bianco Gentile, Genovese and Rossola Bianca.', 'grapeNames':['Vermentino','Brustiano','Bianco Gentile','Genovese','Rossola Bianca'],
 'style':'White · Collection range', 'vintageScope':'The estate portfolio supplies an undated house profile. An exact legal designation for a specific vintage is not established by the source used here.'},
'wine-fr-domaine-comte-abbatucci-ajaccio-faustine-rouge': {
 'denomination':'', 'composition':'Estate house profile: 70% Sciaccarello (Sciaccarellu), 30% Nielluccio (Niellucciu, a name for Sangiovese). The proportions are not assigned to every vintage.',
 'style':'Red · Faustine range', 'vintageScope':'The estate’s undated wine profile describes a house method. The legal appellation for a particular vintage requires its bottle label or technical sheet.'},
'wine-fr-domaine-comte-abbatucci-vin-de-france-ministre-imperial': {
 'denomination':'Vin de France', 'composition':'Morescola, Morescono, Aleatico, Carcajolo Nero, Montanaccia, Sciaccarellu and Niellucciu (Sangiovese), according to the estate technical sheet.',
 'grapeNames':['Morescola','Morescono','Aleatico','Carcajolo Nero','Montanaccia','Sciaccarellu','Niellucciu'],
 'vintageScope':'The cited wine-specific estate technical sheet explicitly identifies Ministre Impérial as Vin de France Rouge. Its production details are not tied to a named vintage.',
 'vineyard':'Native Corsican grape conservatory on granitic sands in the Taravo valley, near Casalabriva. The cuvée’s exact parcel area is not stated.'},
'wine-fr-domaine-comte-abbatucci-vin-de-france-valle-di-nero': {
 'denomination':'Vin de France', 'composition':'100% Carcajolo Nero, according to the estate technical sheet.', 'grapeNames':['Carcajolo Nero'],
 'style':'Rosé · Vin de France · Parcellaires', 'vintageScope':'The estate’s wine-specific profile identifies Valle di Nero as a Vin de France rosé. The cited production method is undated.',
 'vineyard':'A Taravo site on granitic sands, selected for the Parcellaires range. Exact boundaries and vineyard area are not supplied.'},
'wine-fr-domaine-comte-abbatucci-vin-de-france-monte-bianco': {
 'denomination':'Vin de France', 'style':'Red · Vin de France · Parcellaires',
 'vintageScope':'Despite its name, Monte Bianco is a red wine. The estate’s wine-specific profile identifies Vin de France and supplies an undated house method.',
 'vineyard':'Slopes of granitic sand in the Taravo valley, selected for the Parcellaires range. Exact plot boundaries are not supplied.'},
'wine-fr-domaine-comte-abbatucci-ajaccio-faustine-blanc': {
 'denomination':'', 'composition':'100% Vermentino (Vermentinu / Rolle), according to the estate’s undated house profile.',
 'style':'Dry white · Faustine range', 'vintageScope':'The estate’s technical recipe is not tied to a particular vintage. A bottle-specific legal designation is not established in this profile.'},
'wine-fr-domaine-comte-abbatucci-ajaccio-faustine-rose': {
 'denomination':'', 'composition':'100% Sciaccarello (Sciaccarellu), according to the estate’s undated descriptive profile.',
 'style':'Dry rosé · Faustine range', 'vintageScope':'The estate’s wine profile does not specify a vintage. The legal appellation requires the corresponding release label.',
 'vineyard':'Granitic sands in the Taravo valley, Corsica. Individual cuvée parcels and area are not specified.'},
'wine-fr-domaine-gauby-unverified-la-muntada': {
 'denomination':'IGP Côtes Catalanes', 'composition':'2023: 70% Grenache, 30% Carignan, in the wine-specific technical information reproduced by the retailer. Older descriptions include different grapes and appellations.',
 'style':'Red · IGP Côtes Catalanes · 2023',
 'vintageScope':'The 2023 release is described as IGP Côtes Catalanes. A 2019 listing uses Côtes du Roussillon Villages; the older designation does not establish the classification of 2023.',
 'method':'The 2023 estate-supplied description reports hand harvesting and sorting, whole-bunch maceration for up to about 15 days in concrete with native yeasts, then 14 months in foudre and concrete and ten months in bottle. Older importer descriptions of 21 months in foudre refer to other releases.'},
'wine-fr-domaine-jean-foillard-morgon-les-charmes': {
 'denomination':'Morgon AOC', 'composition':'Gamay. The importer describes vines around 45–50 years old for the Les Charmes / Eponym’ cuvée; the vine-age statement is source-specific.',
 'style':'Red · Morgon AOC · Les Charmes / Eponym’',
 'vintageScope':'Importer naming includes Les Charmes Eponym’; older releases may be labelled Eponym’ alone. The cited 2021 listing and general technical profile have different scopes.'},
'wine-fr-domaine-jean-foillard-morgon-corcelette': {
 'denomination':'Morgon AOC', 'vintageScope':'Vine age and cellar details are an importer baseline, not a technical sheet for a named vintage.',
 'vineyard':'Corcelette in Morgon, on sandy decomposed granite and sandstone. The importer’s 8.6-hectare figure covers several named Morgon wines, rather than this cuvée alone.'},
'wine-fr-domaine-jean-foillard-morgon-cote-du-py': {
 'denomination':'Morgon AOC', 'composition':'Gamay. The importer describes vines approximately 10–90 years old across the site; this is not a fixed vintage blend specification.',
 'vintageScope':'A separate importer page documents the 2024 release. General cellar details below describe the importer’s house baseline and may vary by vintage.'},
'wine-fr-domaine-jean-foillard-morgon-cuvee-3-14': {
 'denomination':'Morgon AOC', 'description':'The importer describes a concentrated, finely textured old-vine Gamay with deep fruit and a pronounced mineral character.',
 'vintageScope':'Importer technical information describes the cuvée without establishing an annual release schedule. Availability and specifications depend on the vintage.',
 'vineyard':'Selected very old Gamay from Côte du Py sectors described with schist, granite and manganese. The importer’s 8.6-hectare figure covers its wider Morgon roster, not Cuvée 3.14 alone.'},
'wine-fr-domaine-du-clos-des-fees-cotes-du-roussillon-villages-le-clos-des-fees': {
 'denomination':'', 'composition':'2020: 25% Grenache Noir, 10% Mourvèdre, 50% Syrah and 15% Carignan, according to the estate shop’s technical sheet.',
 'style':'Red · Le Clos des Fées · 2020',
 'vintageScope':'Composition and oak treatment refer to the archived 2020 estate sheet. An exact legal appellation for this release is not independently established in this profile.',
 'method':'The 2020 estate sheet describes manual selection at and after destemming, chilled transport and some fermentation in 500-litre demi-muids. Élevage used 100% new oak for approximately 18 months on lees. These details concern the dated release.'},
'wine-fr-domaine-du-clos-des-fees-cotes-du-roussillon-villages-la-petite-siberie': {
 'denomination':'', 'composition':'2024: 96% Grenache Noir, 2% Mourvèdre and 2% Syrah. The estate also gives similar proportions for some older releases.',
 'vintageScope':'This profile concerns the 2024 estate technical sheet. The winery describes 2023 Post Scriptum as a separate release, rather than a standard 2023 La Petite Sibérie. Exact bottle classification requires the corresponding vintage label.',
 'vineyard':'The 2024 estate sheet describes a south-facing old-vine parcel on an east–west knoll, with clay-limestone bedrock cut by iron-rich schist. Cold northwesterly wind is reported for more than 200 days per year. Exact cadastral boundaries are not supplied.'},
'wine-fr-domaine-m-c-lapierre-morgon-morgon': {
 'denomination':'Morgon AOC', 'composition':'Gamay noir à jus blanc.', 'style':'Red · Morgon AOC · Domaine Marcel Lapierre',
 'vintageScope':'An undated estate house profile, with source material reviewed in October 2026. “M & C Lapierre” is a naming variant of Domaine Marcel Lapierre.',
 'vineyard':'The estate website describes approximately 18 hectares in Morgon across different terroirs within three kilometres of the Villié-Morgon winery. This is the estate’s Morgon area, rather than a vineyard dedicated solely to this cuvée. The estate reports organic certification since 2004.',
 'method':'The estate describes hand harvesting, chilling and sorting, followed by semi-carbonic whole-cluster fermentation with native yeasts for approximately 9–35 days according to parcel and vintage. Maturation takes place in used barrels; bottling is unfiltered. Some batches receive a light sulphur addition before bottling, while nature or N bottlings are separately identified.'},
'wine-fr-domaine-m-c-lapierre-morgon-cuvee-camille-roche-du-py': {
 'denomination':'Morgon AOC', 'composition':'Gamay noir à jus blanc. The name honours both Marcel’s daughter Camille and his father Camille. Cuvée Camille is distinct from Cuvée Marcel Lapierre.',
 'vintageScope':'The estate identifies Cuvée Camille; historical references also use Roche du Py. Supplier listings cover 2022–2025, but the house method below is not a vintage-specific technical specification.',
 'vineyard':'A southwest-facing Côte du Py parcel on shallow granitic bedrock, according to the estate. An older technical sheet uses Roche du Py and gives one hectare; the dated area does not establish a current measurement.'},
'wine-fr-domaine-jean-marc-burgaud-morgon-cote-du-py': {
 'denomination':'Morgon AOC', 'composition':'Gamay noir, as identified by the estate and importer.',
 'vintageScope':'Estate and importer descriptions provide the basis for this profile. No additional claim about changes to legal site-name eligibility is made from commercial commentary alone.',
 'vineyard':'Côte du Py near Villié-Morgon, on high hills of iron-rich blue schist. The estate’s 17.5 hectares comprise 12.5 in Morgon and five in Lantignié; this is not the area devoted to Côte du Py. Javernières, James and Chollet are separate estate labels.'}
}
for w in out['wines']:
    w.update(wine_copy[w['id']])
    for k in ['description','composition','style','serving','vintageScope','vineyard','method']:
        w[k] = clean(w.get(k,''))
    w['contentLanguage'] = 'en'
    w['translationStatus'] = 'Chinese pending'
    # Broad regional context is never promoted to an appellation.
    w['legalOriginStatus'] = 'stated in cited source' if w['denomination'] else 'exact vintage designation not established'
    if not w['denomination']:
        w['regionId'] = None

for s in out['sources']:
    s['url'] = s['url'].strip().rstrip('"\'')
for p in out['producers']:
    for key in ['website','sourceWebsite']:
        p[key] = p.get(key,'').strip().rstrip('"\'')
    p['wineIds'] = [w['id'] for w in out['wines'] if w['producerId'] == p['id']]
for w in out['wines']:
    w['officialUrl'] = w.get('officialUrl','').strip().rstrip('"\'')
    for s in w['sources']:
        s['url'] = s['url'].strip().rstrip('"\'')

out['status'] = 'english_first_edition_publication_copy'
out['producerCount'] = len(out['producers'])
out['wineCount'] = len(out['wines'])
out['integrationNotes'] = [
 'Derived from the existing Oct 28 source-indexed research. No fresh independent source verification was performed for this copy edit.',
 'Preserve live Tempier and Château Simone profiles and their eight wines unchanged.',
 'Hold the ambiguous legacy Tempier Bandol Rouge record; it is absent from this file.',
 'English first edition. Chinese pending. Do not present broad geographic context as a confirmed appellation.',
 'All source references and exact vintage boundaries are retained. Editorial and migration instructions have been removed from public prose.'
]
assert out['producerCount'] == 13 and out['wineCount'] == 21
(ROOT / 'research/content-release-20261029/notion-publication-copy.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'producers':out['producerCount'],'wines':out['wineCount'],'sources':len(out['sources'])}))
