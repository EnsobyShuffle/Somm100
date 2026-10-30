# Shared knowledge dictionary

`knowledge-dictionary.json` is the editorial snapshot synchronized with the SOMM100 Knowledge Dictionary in Notion. It records stable IDs, source URLs, review notes, examples and Notion row mappings. Notion changes require an explicit reviewed import and a new publication; the browser does not query Notion live.

The build runs `scripts/build-dictionary.mjs`. Only canonical entries marked `Reviewed` or `Approved` are exported to `data/knowledge-dictionary.json` and the compatibility export `data/wine-term-reference.json`. Drafts, merged rows and editorial metadata stay out of the public dictionary. English Library, course translation/IPA and the global selection lookup share this generated snapshot. Course exercise IDs and saved learning progress remain stable.

## Review on 2026-10-26

- Audited 301 existing Notion rows; merged duplicate Cabernet Franc and Terroir entries while retaining both original records for traceability.
- Integrated the 22-entry lookup and 51 English-course words, deduplicated against the existing database, then added 60 hospitality entries: 12 sauces, 12 ingredients, 12 cooking methods, 12 service expressions and 12 classic dishes.
- Notion contains 427 records: 423 reviewed canonical entries, 2 pending geological entries and 2 merged duplicate records. Public lookup contains 423 entries.
- Belemnite chalk and Micraster chalk remain Draft because the available primary geological evidence did not verify the earlier sweeping claims. They are excluded from publication.
- Corrections include Asti versus secondary tank fermentation; current Médoc and Entre-Deux-Mers wine colours; soil versus rock; noble rot and acid metabolism; and aliases that previously confused grape must, fungus/disease, lees/lees ageing, and acidity/TA.
- Reviewed means editorial review against the recorded references; it is not a claim of independent human certification. Culinary examples describe illustrative dishes. Actual recipes and allergen information must be checked with the restaurant.

Run `node tests/dictionary.test.mjs`, `node tests/wine-reference.test.mjs`, `node tests/english.test.mjs` and the TypeScript check when changing lookup integration. Add focused regression cases when fixing an incorrect match.

## Continued expansion on 2026-10-26

- Added 120 reviewed entries: 90 classic menu dishes and 30 practical restaurant service expressions. The shared publication now contains 543 entries, including 102 menu dishes. Notion contains 547 records, retaining the same 4 unpublished records above.
- New dish coverage: Italy 25, France 25, Spain 20, and the UK, Greece, Germany, Austria and Belgium 4 each. Every new entry has bilingual explanations, an original bilingual service example and source links. Pronunciation is omitted where it was not independently checked.
- Added the Cuisine field in the editorial database and a cuisine filter under the menu-dish category. Cuisine is a learning/menu grouping, not a claim of exclusive historical origin.
- Removed residual fine-lees and pathogen aliases from broader lees/disease entries so one concept cannot silently replace another.
- This expansion supplies English Library and global lookup. It does not add food-and-wine pairing content or change the existing 51-word spaced-review exercises.

## Classic menu expansion to 200+ dishes on 2026-10-26

- Added 120 reviewed menu entries, taking the shared publication to 663 terms and 222 dishes. This editorial snapshot retains 667 records, including the same 4 unpublished records. At sync verification, the Notion database also contained 123 newly added Seed rows from parallel content work; those unreviewed rows are preserved in Notion and are not included in this reviewed snapshot.
- New coverage: Italy 30, France 30, Spain 10, Portugal 12, Greece 8, the UK 10, the USA 10, plus 10 dishes from Central/Northern Europe.
- Each new dish has an original English definition, Chinese ingredient/preparation explanation, bilingual service example, cuisine grouping and browsed source references. Examples illustrate a preparation rather than promising that every restaurant uses the same recipe.
- Cross-entry validation covers English names, Chinese labels and aliases together, preventing ambiguous names from silently returning a different dish. Generic dishes and specific preparations remain distinct.
- This is dictionary content expansion. The separate Food & Wine pairing module and the existing spaced-review curriculum are unchanged.

## Classic menu expansion to 300+ dishes on 2026-10-27

- Added 150 reviewed entries: 90 dishes, 30 ingredients, 20 flavour/texture descriptors and 10 cooking terms. The shared publication now contains 813 terms, including 312 dishes. The editorial snapshot contains 817 records; the same 4 unpublished records remain excluded.
- Notion readback verified all 150 new records and 159 existing category/related-term updates without differences. At verification it contained 997 rows: 813 Reviewed, 180 Seed and 4 Draft. Parallel Seed imports remain untouched and unpublished.
- Added a flavour/texture filter. Existing crispy/creamy entries moved into it; existing ingredient and cooking entries were recategorized without changing their course IDs. Category totals are 43 ingredients, 26 cooking terms and 22 flavour/texture terms.
- Related-term links use the same reviewed dictionary. Exact culinary terms occurring in dish explanations and examples were checked before adding links, with explicit comparisons for easily confused words. 227 of 312 dishes now have at least one related vocabulary link. Lookup shows bilingual link labels and omits unresolved links.
- Validation covers 300+ dishes, new aliases, distinct related concepts, resolvable links and all 51 original course terms. Reading translation, study notes, English learning, wine-reference checks and TypeScript also pass.
- Reviewed entries include source references and original bilingual definitions/examples. Unverified IPA is left empty. Cuisine remains a menu-learning group, and service examples describe illustrative preparations.
