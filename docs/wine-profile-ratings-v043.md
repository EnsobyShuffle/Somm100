# Wine profile update · v0.4.3

Ratings now precede the introduction. Each rating retains its vintage, publication, original scale and source link. Three reader templates and English / Chinese / bilingual modes remain available. Contextual entity links replace the generic Extension block; Other wines remains. The producer website and bottle-image credit are visible in Sources at the end.

## Editorial coverage

`data/wine-editorial.json` extends four existing Rafael Palacios dossiers: As Sortes 2023 and 2022; Louro 2023; Sorte Antiga 2023; Sorte O Soro 2022. The other ten wine dossiers retain their existing content and use the shared layout. Original data files are preserved.

Critics’ tasting notes use brief attributed excerpts and bilingual paraphrases, not full copied reviews. Estate rating pages are primary score references. JamesSuckling.com material is restricted to its public preview. Merchant reproductions of Wine Advocate and JancisRobinson.com reviews are explicitly identified. Sources and URLs are recorded per wine and per vintage in the supplement.

SOMM100's How to sell this bottle section is original teaching material: a spoken customer recommendation, suitable drinkers, differentiating features and food suggestions. It is labeled separately from criticism.

## Source differences retained

- Louro 2023: the estate lists Wine Advocate 93; Farr Vintners reproduces a dated July 2024 review at 93+. The dated review is used at the top and the difference is recorded in Sources.
- As Sortes 2023: Liberty's technical alcohol figure is 14.5%; the reproduced Wine Advocate review says 14%. No artificial reconciliation.
- Sorte O Soro 2022: Liberty and the reproduced Wine Advocate review give different acidity and pH figures. Both retain their source scope. The review's 500 L fermentation / 1,500 L oval maturation description is distinguished from the importer sheet.

## Validation

- TypeScript checked successfully.
- Seven test files pass, including vintage separation, original score scales, source integrity, bilingual attribution, short quote length and safe contextual links.
- Existing 14 wine dossiers, Aligoté references, learning, quiz and English-study checks pass.
- Local managed preview returned the old v0.4.2 app and did not expose a new temporary QA page even after restart. Local browser QA is therefore unverified; the release requires a live UI check after publication.

No navigation restructuring, authentication changes, or existing personal records are part of this update.
