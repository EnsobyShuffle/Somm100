# Godello grape profile — v0.3.3

Replaces the introductory Identity / Compare presentation with a bilingual reference on synonyms, parentage, viticulture, regions, vinification, tasting, history and service. Henry requested three alternatives to compare visually, complete English and Chinese, and exactly ten wine-name links without wine cards or descriptions on the grape page.

## Interface

- A Reference: labelled entries with English and Chinese stacked, a reading index at the left.
- B Parallel: aligned English and Chinese columns; stacked paragraphs on phones.
- C Outline: compact reference rows with the same complete content.
- Language choices: EN / 中文, English, 中文. Layout and language persist in this browser; URL parameters override stored preferences.
- Exactly 10 wine tags. Four link to the existing internal Rafael Palacios wine profiles; six link directly to verified producer wine pages. External pages retain their source languages.
- Five click-to-reveal, independently authored questions; 17 linked references. No authentication added.

## Evidence and scope

`data/grape-profiles.json` separates bilingual text, row-level sources, navigation links, questions and the ten-wine selection. Selection is editorial, not an imported global score ranking; this distinction is recorded in the collapsible references.

Primary evidence includes UC Davis FPS, the Galicia wine museum, the 2021 Plants genetic study, Wines of Portugal, D.O. Valdeorras, and producer sites. Raúl Pérez La Claudina details are explicitly dated 2015, and Guitián barrel-fermentation details 2019. Pedrouzos sourcing changed from 2021 according to Valdesil; no current single-vineyard claim is made. No critic scores or current prices are fabricated.

Existing producer, wine, region, English Study and tasting functionality is retained. This is a complete bilingual Godello entry, not a claim that the whole app or all producer profiles have been translated. Original source material remains in Git history and original links.

## Verification

- TypeScript `tsc --noEmit`: pass.
- Existing four test files: pass.
- Content audit: ten unique wine links; every bilingual row populated; all source IDs resolve.
- Browser: A/B/C switching, independent English/Chinese, ten wine tags, answer reveal.
- Responsive preview: 390px iframe (375px document after scrollbar) for A/B/C; scroll width equals client width in every layout. This is browser responsive QA, not a physical iOS/HarmonyOS test.
