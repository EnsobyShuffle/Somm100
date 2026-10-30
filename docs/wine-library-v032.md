# Wine Library v0.3.2

Shared App/Web content graph: stable region and grape IDs in data/wine-library.json reference existing producer and wine IDs in data/producers.json. Individual wine pages derive from the producer record, avoiding duplicated technical descriptions. Explicit source IDs and media provenance accompany the content.

## Delivered
- Wine Library parent with Wine Regions, Grape Varieties, Wine Maps direct sidebar access.
- Valdeorras editorial article: geography, soils, climate, history, four official grape photographs, city map link, producer/wine connections and three reveal checks.
- Godello dossier: synonyms, Gouveio equivalence, parentage, viticulture, sensory profile, regional distribution, five reference wines, five reveal checks. Loureira, Treixadura, Dona Branca are brief introductory entries, not full dossiers.
- Independent detail routes for all 13 existing wine records; three official reference bottle photos. Rafael and Álvaro dossiers retained, Raúl Pérez added as a clearly scoped introductory profile with only Ultreia Godello 2016 verified.
- News Extension now opens internal region/grape articles. Producer/wine/grape connections are bidirectional. Library and global search index the new records.
- Original source links retained; Wine-Searcher search links added, but live results/rankings could not be retrieved and are not reproduced or claimed verified.

## Evidence and limits
Primary authority: D.O. Valdeorras Territory and DO history, Xunta Galicia wine museum, UC Davis FPS Gouveio, Rafael Palacios official wine pages, Raúl Pérez official Ultreia Godello 2016. Godello parentage was verified against indexed table rows in Augusto et al. Plants 2021, DOI 10.3390/plants10122755 (Gouveio / Castellana Blanca / Savagnin = Traminer). Full paper access and VIVC access did not succeed. O Barco city reference coordinates are from Spain Ministry of Culture PARES authority 82390; no legal appellation boundaries are drawn.

Raúl Pérez source header incorrectly says Mencía, conflicting with the clear 100% Godello white-wine description in its body. This conflict and vintage scope are surfaced in the wine record. New vintages are not inferred from the 2016 page.

Image URLs, source IDs and credit in wine-library.json media: D.O. Valdeorras 5 photos; Rafael Palacios 2 bottle images; Raúl Pérez 1 bottle image. Original photos retained, no generated substitute. No open-license grant was established.

## Validation
TypeScript and four existing test suites. Data reference assertions validated all source, region, grape, producer, wine and local-image IDs. Browser: directory, internal region-to-grape link, reveal answer, independent wine page and global search. Responsive CSS supplied; phone hardware not tested. Records remain in existing no-login test mode. New recall questions are reading checks, not yet added to spaced-review statistics. This release does not deploy a separate somm100.cn domain or native installation package.
