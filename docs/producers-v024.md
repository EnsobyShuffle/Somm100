# Producers and news expansion — v0.2.4

Added Producers immediately below Wine Maps. Directory supports country/region filters and accent-insensitive producer, wine and grape search. Hash links retain producer identity on refresh and browser back. Two sourced starter dossiers: Rafael Palacios (4 detailed wines + 1 historical lead), Álvaro Palacios (7 Priorat wines; Rioja/Bierzo explicitly outside current dossier). Twenty tap-to-reveal recall prompts; up to three wines compared.

News now opens inline Knowledge Expansion before producer links: Valdeorras, Godello, skin fermentation, and multi-parcel/single-site comparison. Four embedded recall checks and original source links. The same content appears in producer connections. Data is in producers.json and news-expansions.json, independent of UI. Add records without creating pages by hand. No fabricated global producer totals, current technical vintages or certified status. Official site data without dates are marked as snapshots; historical Souto not declared discontinued. Media remain original-source links pending rights review.

Source keys reference original pages. Stable producer and wine IDs are intended for future geography, vintage, tasting and curriculum relations. Current scope does not include a world database, vineyard geometry, shared learner progress for the new questions, automated daily generation, or auto-populated journal entries. Existing CMS, local records and public/no-login policy retained.

QA: TypeScript and three existing test suites pass. Browser exercised news expansion, nested answer, producer deep link and comparison. Mobile physical device verification pending.
