import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const data=new URL('../../data/',import.meta.url),root=new URL('../../',import.meta.url);
const read=name=>JSON.parse(readFileSync(new URL(name,data),'utf8'));
const grapes=read('grape-varieties.json'),wines=read('grape-wines.json'),translations=read('grape-reference-translations.json');
const coverage=read('grape-coverage.json');
const translated=new Set(translations.map(g=>g.id)),curated=new Set(read('grape-reference-profiles.json').map(g=>g.id));
const localPhoto=record=>record.imageUrl?.startsWith('/')&&existsSync(new URL('public'+record.imageUrl,root));
Object.assign(coverage,{
 reviewed:'2026-10-26',grapeDossiers:grapes.length,aliasRecords:grapes.reduce((n,g)=>n+g.aliases.length,0),
 growingCountries:new Set(grapes.flatMap(g=>g.countries)).size,wineDossiers:wines.length,
 localGrapePhotos:grapes.filter(localPhoto).length,localWinePhotos:wines.filter(localPhoto).length,
 bilingualReferenceProfiles:grapes.filter(g=>translated.has(g.id)||curated.has(g.id)).length,
 uniformReferenceTemplateProfiles:grapes.filter(g=>translated.has(g.id)||curated.has(g.id)).length,
 grapesWithSourcedDetailRows:grapes.filter(g=>g.referenceRows?.length).length,
 globalCatalogueComplete:false,perGrapeWineCoverageComplete:false,
});
if(existsSync(new URL('linked-country-audit.json',data))){
 const audit=read('linked-country-audit.json');
 Object.assign(coverage,{italyAssociatedGrapes:audit.countryCounts.Italy.grapes,italyRegionDossiers:audit.countryCounts.Italy.regionDossiers,franceRegionDossiers:audit.countryCounts.France.regionDossiers,linkedRegionDossiers:audit.regionDossiers,linkedRegionReviewQuestions:audit.questions,italianRegistryComplete:false,allItalianAppellationsComplete:false});
}
writeFileSync(new URL('grape-coverage.json',data),JSON.stringify(coverage,null,2)+'\n');
console.log(JSON.stringify(coverage));
