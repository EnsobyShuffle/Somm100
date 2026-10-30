# Wine Profile · v0.4.2

Single-wine profiles for As Sortes, Louro, Sorte Antiga and Sorte O Soro now offer three functional layouts: Dossier, Technical and Reading. All share English/Chinese content, language selection, source references, producer/region/grape links and remembered layout preferences.

As Sortes contains separate 2023 and 2022 technical records. Louro and Sorte Antiga contain 2023 records; Sorte O Soro contains 2022. Vineyard background is distinct from vintage-specific analysis and cellar methods. The undated estate method for Sorte Antiga (12 months in used barrels) is not substituted for the 2023 importer specification (9 months in third-use 500 L barrels). Louro’s 100% Godello is explicitly tied to the 2023 factsheet. No new-oak percentage or MLF status is inferred where absent.

## Sources

Source URLs and row-level references are in `data/wine-profiles.json`. Primary inputs: Rafael Palacios estate pages, dated Liberty Wines factsheets and importer Valade & Transandine’s 2022 As Sortes page. Historical European Cellars/Indigo trade data is dated as historical, not applied to current vintages. Bottle images retain source links and are identified as reference images. Service recommendations identify SOMM100 editorial suggestions.

## Integration

Both legacy Wine Library links and the modern grape-linked As Sortes wine ID resolve to the shared component. Existing grape dossiers, search, quizzes and local learning records are preserved. The replacement covers these four Rafael Palacios wines; other wine profiles retain their prior content.

## Verification

- TypeScript no-emit check passed.
- All five existing test suites passed.
- Data audit confirmed bilingual rows, valid source IDs and local bottle images.
- Browser checks: A/B/C switching, English/Chinese/bilingual switching, As Sortes 2022/2023 metrics and cellar methods, all four linked profiles, and modern grape-to-wine alias route.
- All three layouts checked in a 390px iframe (375px document area with scrollbar): no horizontal document overflow. Corrected mobile bottle-caption overlap and template label wrapping.
- Screenshot: `wine-profile-technical-v042.jpg`.

Mobile check is a browser viewport simulation, not a native iOS or HarmonyOS device test.
