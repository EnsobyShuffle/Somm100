# Grape reference standard

All 599 collected grape entries use the Aligoté reference layout. This is template and language coverage, not a claim that the global grape catalogue or every detailed dossier is complete.

- Canonical grape name remains unchanged in either language.
- English and Chinese are separate views, selected in the reader. The choice follows internal grape, region and wine links.
- Name, colour, species and a substantiated origin country precede the photograph. Growing countries are not substituted for an uncertain origin.
- Photographs appear directly below the identity line without a decorative background, frame or padding. Retain attribution links. Missing images produce no empty frame.
- Introduction is followed by a separate Key references line.
- Sections: Origin; Synonyms; Parentage; Viticulture; Regions & Appellations; Vinification; Tasting; Similar Varieties & Distinctions; Wines; Sources. Existing additional researched detail, such as Godello service information, is retained.
- Link referenced names directly in the text. Do not add duplicate link chips underneath.
- Preserve qualified genetic claims, unknown parentage, ambiguous regional names and distinctions between mutations, intraspecific crosses and interspecific ancestry.
- Existing wine records open internally. Retained producer-only references remain clearly external until an individual internal record exists.
- Directory search, A–Z, country/colour filtering, list/card views and saved grapes remain available.

## Data ownership

`grape-varieties.json` remains the canonical Chinese/source record. `grape-reference-translations.json` contains English narrative translations for the 598 non-Aligoté entries, preserving alias and region identities and order. `grape-reference-profiles.json` holds the curated bilingual Aligoté dossier. The reader adapter retains the deeper Godello rows, citations and selected wines from `grape-profiles.json`.

Optional `referenceRows` preserve researched subdivisions and exact source URLs. A supplied section replaces its narrative fallback; every cited URL must exist in that grape's source list. The 2026-10-25 expansion adds 94 distinct grapes and 34 bilingual internal wine records. New wine records distinguish cuvée-level information from a specified vintage and label editorial service advice.

Translation alone does not update the source review date. Generated reference views label that date as the source-record review date. Existing collective source lists are retained without inventing row-level citation precision.

## Verified correction

Teroldego: removed the Chinese wording placing basal buds on the fruit stalk. The [VCR technical sheet](https://www.vivairauscedo.com/en/product-sheet/teroldego/) describes low fertility of basal vine buds and the need for long pruning. Both languages now express that meaning.

## Remaining coverage

Photographs, per-grape individual wines, detailed viticultural subdivisions and source-by-source enrichment remain uneven. Do not use template coverage as a completeness badge for those fields. See `data/grape-coverage.json` for distinct coverage counts.


## France-first country sequence

Continue country by country: France → Italy → Germany → Spain, then remaining Old World coverage. France work added 254 dossiers to the prior 345, giving 599 globally. The France directory links 390 records through national/departmental/temporary classification, regional cultivation, conservation or history. A country association is not automatically commercial planting evidence.

`france-grape-regions.json` contains 49 regional or technical groups with 666 individually sourced connections. The region dropdown intersects the selected country, query, colour and initial; it never replaces a dossier or duplicates a synonym. Status labels distinguish principal, complementary, historic, revival and experimental roles. They are editorial regional descriptions, not a universal AOC legal hierarchy.

`france-classification-source.json` preserves the 30 July 2026 French wine-grape list. `build-france-catalogue.mjs` requires a unique canonical match for each of 361 national names, 11 department-specific names and 8 named temporary entries. Twenty-six experimental accessions remain explicitly unprofiled; Geneva cross-border provisions are separately scoped. This reconciliation does not establish exhaustive historical/regional coverage.

Historical Noah, Othello, Isabella, Jacquez, Clinton and Herbemont have dossiers but do not enter the permitted classification list. Othello identity and historical pedigree are qualified. Riminèse resolves to Albana; Castets resolves to Maturana Tinta; Corbeau resolves to Douce Noire. Ambiguous Bonarda and Auxerrois remain unresolved without context. Pinotin parentage follows the original 2021 SSR study; Bouquet 3196 berry-colour conflict remains documented.

Photographs are exact Plantgrape catalogue or profile photographs, credited to their source; no substitute grape imagery. The approved image layout remains unframed. More individual-wine dossiers and technical evidence for rare varieties remain outstanding; uniform bilingual sections do not imply equal evidence depth.
