# Grape reference format — Aligoté / v0.4.1

Henry requested a professional reference for his own/MS-level use, with literal field names, a denser directory, and separate English/Chinese modes. This release establishes the complete new format on Aligoté; it does not claim the remaining 250 dossiers have been translated.

- Directory defaults to a compact table; List/Cards share search, A–Z, country and colour filters. View preference persists locally and can be overridden by `view=list` or `view=cards` in the URL.
- Visible grape names retain their original spelling; the translated-name search metadata is retained.
- Aligoté defaults to English. English and Chinese are rendered exclusively; the language persists locally and may be explicitly selected by `lang=en` or `lang=zh`.
- Direct sections: Origin, Synonyms, Parentage, Viticulture, Regions & Appellations, Vinification, Tasting, Similar Varieties & Distinctions, Wines, Sources.
- Ten linked wine names; no wine cards, bottle gallery or wine descriptions in the Wines section. Producer examples remain in Vinification as evidence of relevant methods.
- Aligoté uses VIVC record 312, Pl@ntGrape, BIVB, Bouzeron, INAO and producer/official representative material. Historical synonyms are distinguished from officially recognised propagation-material names. Registered countries are not represented as current planting-area statistics.
- `data/grape-reference-profiles.json` is the bilingual editorial source, rendered by `app/GrapeReference.tsx`. Adding another finalized dossier here still requires routing it in GrapeLibrary; do not imply untranslated dossiers have both languages.
- Existing generic profiles now use direct headings and wine-name links. The previously approved Godello three-layout reference is retained.

Data review date: 2026-10-25 (Asia/Shanghai).

Verification: schema/link checks and TypeScript passed. Browser checks covered default table (251 rows), card switch, Alligotet alias search → Aligoté, English-only article text, Chinese switching, unchanged Aligoté heading and ten wine links. Both directory and reference page fit a 390px responsive iframe without horizontal overflow (375px content width with scrollbar). Not a physical-device test.
