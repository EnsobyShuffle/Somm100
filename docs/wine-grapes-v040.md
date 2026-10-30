# Wine Library — Wine Grapes

Integrated into the existing SOMM100 application at `#grapes`, with links from Wine Library and global search. Existing region articles, producer pages, English module and learning features are retained.

## Content contract

The first collection is a researched release, not an assertion of a complete global grape catalogue. Canonical identities have stable IDs; regional synonyms carry context. Search accepts accents, Chinese names, regional synonyms and growing regions. Country filters describe growing locations, not exclusive origin. Ambiguous shared aliases do not silently become one identity. Colour mutations and artificial crossings are distinguished from natural parentage; unresolved or incompletely verified relationships are explicitly qualified.

Each dossier includes identity/origin, important synonyms, parentage, viticulture, winemaking, sensory characteristics, representative regions, linked real wines, retrieval practice, and primary-source links. Pinot Teinturier is explicitly a genetic-reference/subtype entry. Parentage references are clickable where the parent has an unambiguous canonical record. Missing parents remain plain text.

Region links open an index of connected grapes. They do not claim the full Wine Regions chapter or complete appellation-authorized variety list. The original Valdeorras feature remains available. The concurrently published bilingual Godello reference is preserved as its main profile, including three layouts, language choices and exactly ten wine-name links.

Wine records use producer or official representative material and distinguish cuvée-level description from vintage-specific composition. A bottle photograph may depict a different vintage; captions state this. Missing photographs are disclosed instead of replaced by invented bottles. Wine-Searcher is only an external search link, not a live inventory, rating or pricing feed.

## Implementation

- `data/grape-varieties.json`: structured dossiers.
- `data/grape-wines.json`: standalone wine records and explicit grape connections.
- `data/grape-media.json`: provenance for locally cached grape photographs.
- `lib/grape-library.ts`: accent-insensitive matching, country filtering and unambiguous identity resolution.
- `app/GrapeLibrary.tsx` / `app/grape-library.css`: responsive directory, dossiers, wine pages and region connections.
- `tests/grape-library.test.mjs`: real alias examples, identity collisions, combined filters, link resolution, schema and local media integrity.

Local grape bookmarks are stored under a dedicated browser key and do not alter the existing learning records. Filters are encoded in the URL so browser history and shared links retain the selected search.

## Continuing editorial work

Expand long-tail wine grapes, complete synonym inventories against VIVC/national registers, deepen historical/ampelographic material, resolve flagged pedigrees, and add multiple vintage-specific wine examples per grape. Not every dossier has a photograph or a wine profile in this release. Source URLs and image credits are recorded; attribution does not itself establish an open commercial licence.

## Release verification

{
  "reviewed": "2026-10-24",
  "grapeDossiers": 251,
  "aliasRecords": 383,
  "growingCountries": 44,
  "wineDossiers": 85,
  "localGrapePhotos": 104,
  "localWinePhotos": 65,
  "globalCatalogueComplete": false,
  "perGrapeWineCoverageComplete": false,
  "notes": [
    "Includes Pinot Teinturier as an explicitly qualified genetic-reference subtype entry.",
    "Representative countries and regions, not exhaustive planting or legal-authorisation lists.",
    "Some photographs/parentage/wine relationships remain unfilled or qualified."
  ]
}

Desktop browser QA: regional synonym Primitivo → Zinfandel → Ridge Geyserville; Portugal + white + Gouveio → Godello; related parent Savagnin link; old Valdeorras article; tap-to-reveal answer; bookmark persisted after reload and test bookmark removed. Primary preview configuration was repaired using the Sites execution-profile helper. Physical mobile-device testing was not performed.

Performance: complete grape/wine dossiers and their UI are loaded on demand. Compact search indexes stay available to global search. Regenerate indexes with `node scripts/library/build-index.mjs` after editorial data/image changes.

Publication reconciliation: merged concurrent source d27dfe9a152cc8209481666a06135485037a030e. Its bilingual Godello reference remains the active Godello detail page from both legacy and new directory links. Existing layout/language controls, sources and ten wine links are retained.
