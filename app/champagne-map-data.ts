export type ChampagnePlace = {
  id: string;
  name: string;
  zh: string;
  region: 'Montagne de Reims' | 'Vallée de la Marne' | 'Côte des Blancs' | 'Côte des Bar' | 'Other Champagne';
  lat: number;
  lon: number;
  cru?: 'Grand Cru' | 'Premier Cru';
  grapes?: string;
  note: string;
  source: string;
};

// Town coordinates are orientation points sourced from their public geographic
// locations; they do not represent vineyard boundaries or parcel ownership.
const featuredPlaces: ChampagnePlace[] = [
  {id:'reims',name:'Reims',zh:'兰斯',region:'Montagne de Reims',lat:49.2583,lon:4.0317,note:'Champagne’s principal northern city and a useful starting point for the Montagne de Reims.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'verzenay',name:'Verzenay',zh:'韦尔兹奈',region:'Montagne de Reims',lat:49.1630,lon:4.1450,cru:'Grand Cru',grapes:'Pinot Noir',note:'A village on the Montagne de Reims. The Grand Cru label refers to Champagne’s traditional village classification.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'verzy',name:'Verzy',zh:'韦尔齐',region:'Montagne de Reims',lat:49.1460,lon:4.1640,cru:'Grand Cru',note:'A Grand Cru village in the Montagne de Reims cluster.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'mailly-champagne',name:'Mailly-Champagne',zh:'马伊香槟',region:'Montagne de Reims',lat:49.1570,lon:4.1190,cru:'Grand Cru',note:'A Grand Cru village within the Montagne de Reims.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'ambonnay',name:'Ambonnay',zh:'昂博奈',region:'Montagne de Reims',lat:49.0790,lon:4.1730,cru:'Grand Cru',grapes:'Pinot Noir',note:'A Grand Cru village at the southern end of the Montagne de Reims.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'bouzy',name:'Bouzy',zh:'布兹',region:'Montagne de Reims',lat:49.0790,lon:4.1480,cru:'Grand Cru',grapes:'Pinot Noir',note:'A Grand Cru village associated with the Pinot Noir-led southern slopes of the Montagne de Reims.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'ay-champagne',name:'Aÿ-Champagne',zh:'艾香槟',region:'Vallée de la Marne',lat:49.0500,lon:4.0030,cru:'Grand Cru',grapes:'Pinot Noir',note:'A Grand Cru village in the eastern Vallée de la Marne, close to Épernay.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'hautvillers',name:'Hautvillers',zh:'欧特维耶',region:'Vallée de la Marne',lat:49.0790,lon:3.9450,cru:'Premier Cru',note:'A village on the slopes above the Marne Valley, near Épernay.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'epernay',name:'Épernay',zh:'埃佩尔奈',region:'Vallée de la Marne',lat:49.0437,lon:3.9592,note:'A central Champagne town at the junction of the Marne Valley and the Côte des Blancs.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'chouilly',name:'Chouilly',zh:'舒伊',region:'Côte des Blancs',lat:49.0290,lon:3.9950,cru:'Grand Cru',grapes:'Chardonnay',note:'A Grand Cru village at the northern end of the Côte des Blancs. The traditional classification is village-level.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'cramant',name:'Cramant',zh:'克拉芒',region:'Côte des Blancs',lat:48.9990,lon:3.9860,cru:'Grand Cru',grapes:'Chardonnay',note:'A Grand Cru village in the Côte des Blancs, where Chardonnay is the leading grape.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'avize',name:'Avize',zh:'阿维兹',region:'Côte des Blancs',lat:48.9730,lon:4.0020,cru:'Grand Cru',grapes:'Chardonnay',note:'A Grand Cru village in the Côte des Blancs, widely associated with Chardonnay.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'le-mesnil-sur-oger',name:'Le Mesnil-sur-Oger',zh:'奥热尔河畔勒梅尼',region:'Côte des Blancs',lat:48.9470,lon:4.0220,cru:'Grand Cru',grapes:'Chardonnay',note:'A Grand Cru village at the southern end of the Côte des Blancs.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'vertus',name:'Vertus',zh:'韦尔蒂',region:'Côte des Blancs',lat:48.9060,lon:3.9730,cru:'Premier Cru',grapes:'Chardonnay',note:'A village at the southern edge of the Côte des Blancs.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'montgueux',name:'Montgueux',zh:'蒙格',region:'Other Champagne',lat:48.2650,lon:3.9680,note:'A detached Champagne growing area west of Troyes; shown as a geographic reference point.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'troyes',name:'Troyes',zh:'特鲁瓦',region:'Côte des Bar',lat:48.2970,lon:4.0740,note:'A regional city north of the Côte des Bar and a useful orientation point.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'bar-sur-seine',name:'Bar-sur-Seine',zh:'塞纳河畔巴尔',region:'Côte des Bar',lat:48.1120,lon:4.3740,note:'A town in the southern Champagne growing area.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
  {id:'les-riceys',name:'Les Riceys',zh:'莱里塞',region:'Côte des Bar',lat:47.9940,lon:4.3710,note:'A major village area in the southern Côte des Bar.',source:'https://www.champagne.fr/en/about-champagne/the-champagne-vineyard'},
];

// Additional Champagne crus and village orientation points. Coordinates are
// centroids of current commune polygons, so they locate the commune only.
const villagePoints: Array<[string,string,string,string,number,number]> = [
  ['beaumont-sur-vesle','Beaumont-sur-Vesle','博蒙叙韦斯勒','Montagne de Reims',49.173793,4.179882],
  ['oiry','Oiry','瓦里','Côte des Blancs',49.007928,4.039672],
  ['le-mesnil-sur-oger','Le Mesnil-sur-Oger','奥热尔河畔勒梅尼','Côte des Blancs',48.939779,4.020419],
  ['oger','Oger','奥热尔','Côte des Blancs',48.938500,4.004500],
  ['louvois','Louvois','卢瓦','Montagne de Reims',49.102500,4.118000],
  ['ambonnay','Ambonnay','昂博奈','Montagne de Reims',49.087303,4.171917],
  ['chouilly','Chouilly','舒伊','Côte des Blancs',49.017366,4.004299],
  ['cramant','Cramant','克拉芒','Côte des Blancs',48.987261,4.000629],
  ['mailly-champagne','Mailly-Champagne','马伊香槟','Montagne de Reims',49.154195,4.112186],
  ['puisieulx','Puisieulx','皮泽','Montagne de Reims',49.200884,4.116506],
  ['bouzy','Bouzy','布兹','Montagne de Reims',49.085832,4.138376],
  ['sillery','Sillery','西耶里','Montagne de Reims',49.192278,4.139951],
  ['avize','Avize','阿维兹','Côte des Blancs',48.973377,4.005795],
  ['champillon','Champillon','尚皮永','Vallée de la Marne',49.085227,3.975585],
  ['coulommes-la-montagne','Coulommes-la-Montagne','库洛姆拉蒙塔涅','Montagne de Reims',49.226639,3.910616],
  ['avenay-val-dor','Avenay-Val-d’Or','阿弗奈瓦尔多尔','Vallée de la Marne',49.075877,4.046252],
  ['verzenay','Verzenay','韦尔兹奈','Montagne de Reims',49.164053,4.142608],
  ['bergeres-les-verts','Bergères-lès-Vertus','贝热尔莱韦尔蒂','Côte des Blancs',48.873550,4.008401],
  ['verzy','Verzy','韦尔齐','Montagne de Reims',49.144217,4.160738],
  ['billy-le-grand','Billy-le-Grand','比伊勒格朗','Montagne de Reims',49.107885,4.232714],
  ['tours-sur-marne','Tours-sur-Marne','图尔叙马恩','Vallée de la Marne',49.052933,4.128584],
  ['chamery','Chamery','沙梅里','Montagne de Reims',49.170701,3.956550],
  ['chigny-les-roses','Chigny-les-Roses','希尼莱罗斯','Montagne de Reims',49.151629,4.061153],
  ['cumieres','Cumières','屈米耶尔','Vallée de la Marne',49.071955,3.919396],
  ['ecueil','Écueil','埃屈埃','Montagne de Reims',49.181777,3.951576],
  ['dizy','Dizy','迪齐','Vallée de la Marne',49.070724,3.970433],
  ['hautvillers','Hautvillers','欧特维耶','Vallée de la Marne',49.086038,3.944479],
  ['ludes','Ludes','吕德','Montagne de Reims',49.159893,4.082387],
  ['grauves','Grauves','格罗夫','Côte des Blancs',48.968104,3.959803],
  ['cuis','Cuis','屈伊','Côte des Blancs',48.999651,3.966903],
  ['mutigny','Mutigny','米蒂尼','Vallée de la Marne',49.075085,4.018980],
  ['vaudemange','Vaudemange','沃德芒日','Montagne de Reims',49.087769,4.244110],
  ['rilly-la-montagne','Rilly-la-Montagne','里伊拉蒙塔涅','Montagne de Reims',49.163305,4.046338],
  ['trepail','Trépail','特雷帕伊','Montagne de Reims',49.109102,4.182087],
  ['villers-marmery','Villers-Marmery','维耶马尔默里','Montagne de Reims',49.130433,4.197502],
  ['vrigny','Vrigny','弗里尼','Vallée de la Marne',49.237937,3.917225],
];

const grandCruNames = new Set(['Ambonnay','Avize','Aÿ-Champagne','Beaumont-sur-Vesle','Bouzy','Chouilly','Cramant','Le Mesnil-sur-Oger','Louvois','Mailly-Champagne','Oger','Oiry','Puisieulx','Sillery','Tours-sur-Marne','Verzenay','Verzy']);
const extraPlaces: ChampagnePlace[] = villagePoints.map(([id,name,zh,region,lat,lon])=>({
  id, name, zh, region: region as ChampagnePlace['region'], lat, lon,
  cru: grandCruNames.has(name) ? 'Grand Cru' : undefined,
  note: `${name} commune reference point, calculated from the official French commune boundary dataset. This locates the commune only; it does not identify a vineyard parcel or AOC boundary.`,
  source: 'https://geoservices.ign.fr/bdtopo',
}));

export const champagnePlaces: ChampagnePlace[] = (()=>{
  const byId=new Map(featuredPlaces.map(p=>[p.id,p]));
  for(const place of extraPlaces){
    const prior=byId.get(place.id);
    byId.set(place.id,{...prior,...place,cru:place.cru??prior?.cru,grapes:place.grapes??prior?.grapes,note:prior?.note??place.note});
  }
  return [...byId.values()];
})();

export const champagneRegions = [
  {id:'Montagne de Reims',zh:'兰斯山',lat:49.145,lon:4.105,grape:'Pinot Noir · 黑皮诺',labelDx:94,labelDy:-56,type:'major',note:'林地高原与两河之间的山脊；黑皮诺占重要位置。'},
  {id:'Vallée de la Marne',zh:'马恩河谷',lat:49.075,lon:3.90,grape:'Meunier · 莫尼耶',labelDx:-128,labelDy:-2,type:'major',note:'沿马恩河谷绵延；西段莫尼耶更突出，靠近埃佩尔奈一带黑皮诺增加。'},
  {id:'Côte des Blancs',zh:'白丘',lat:48.960,lon:3.93,grape:'Chardonnay · 霞多丽',labelDx:98,labelDy:43,type:'major',note:'白垩坡地以霞多丽见长。'},
  {id:'Côte des Bar',zh:'巴尔丘',lat:48.055,lon:4.45,grape:'Pinot Noir · 黑皮诺',labelDx:0,labelDy:-30,type:'major',note:'南部丘陵与多条小谷交错；黑皮诺占当地种植面积的大多数。'},
  {id:'Côte du Sézannais',zh:'塞扎讷丘',lat:48.72,lon:3.72,grape:'Chardonnay · 霞多丽',labelDx:-92,labelDy:-24,type:'sector',note:'香槟西南部的种植区，霞多丽较常见。'},
  {id:'Coteaux Vitryats',zh:'维特里丘陵',lat:48.72,lon:4.60,grape:'Champagne vineyard sector',labelDx:92,labelDy:-18,type:'sector',note:'位于马恩省东南部的种植区。'},
  {id:'Montgueux',zh:'蒙格',lat:48.265,lon:3.968,grape:'Chardonnay · 霞多丽',labelDx:-92,labelDy:-22,type:'sector',note:'特鲁瓦以西的独立坡地种植区，以白垩土上的霞多丽见长。'},
];

export const mapDataSources = {
  champagne: 'https://www.champagne.fr/fr/decouvrir-le-champagne/un-grand-vin-d-assemblage/le-vignoble-champenois',
  inao: 'https://www.data.gouv.fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao',
  basemap: 'https://www.openstreetmap.org/copyright',
};
