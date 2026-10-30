# SOMM100 content audit · 28 October 2026

Baseline: live v44, source `a4a28908c1feb7548863013cc4e864bdff2fc4fc`. Latest Notion pages and Library deliverables were compared with actual application data, rather than treating generated files or page titles as completion.

## Released in this batch

- Module 01: current 16-section Core Text with original reading IDs preserved. The updated Understanding and Extension contains 16 substantive topics, 25 source reading links and seven locally served images with creator/license links. Historical KB records and deep links remain available; new topic completion is tracked separately.
- Core Text no longer inserts recall cards. Incorrect generic links from every module to Alsace were removed. Checklist display uses ordinary numbers.
- Curriculum: 09A Provence & Corsica, 09B Languedoc & Roussillon, 09C Southwest France, 10 Spain, 11 Portugal. Spain/Portugal add 20 short reading sections, explicitly labelled first-edition overviews. Existing module09/module10/module11 IDs retain their original French subjects; Spain and Portugal have separate IDs. There are 29 numbered modules and 31 directory entries because Module 09 has three parts.
- France: two bilingual estate profiles (Domaine Tempier, Château Simone), eight wine profiles, reciprocal grape/region/wine links. Official estate pages were independently read on 28 October. Vintage-neutral house specifications remain labelled as such. The disputed Tempier basic-red label mapping is excluded. Château Simone Blanc’s ambiguous ageing wording is not collapsed into a fabricated total.
- Producers now has an entry within Wine Library, while all existing producer routes remain valid.
- ONE English Editorial v0.2 replaces its existing standalone entry. The storage key, record shape and content identities are preserved. Its service-worker cleanup is limited to its own cache prefix.
- Recent Releases reflects actual publication and pending content.

## What is still pending

| Material | Verified scope | Next dependency |
| --- | --- | --- |
| Remaining CMS Core Text | Most latest 02–29 pages are concise reading outlines, often shorter than the app’s existing content | Retain richer existing reading; expand real text and then extension/checklists/questions by round |
| French Notion cohort | 15 producer pages, 64 wine pages; 30 substantive wine drafts, 22 partial, 12 identity/origin holds | Translate and independently verify the remaining cohort; use enriched properties over stale placeholder bodies |
| FR004 | 604 producer entities, 1,036 wine entities, predominantly seeds | Identity reconciliation; 85 source definitions from prior FR001–003 dossiers missing in this bundle |
| Germany | 13 PDO regions, 119 technical variety registrations and other research material | Native mapping, current-rule review, avoid treating technical registrations as complete wine-grape dossiers |
| Quizlet | 141 sets, 20,605 cards, 617 images in migration handoff | De-duplication, answer quality, rights, curriculum IDs; not added to live question count |
| Wine Channel | Latest inventory: 774 videos, 23 subtitle files, no Ready videos | Rights, content/subtitle review and approved delivery; no direct YouTube material added |
| New World | Six-country MS handoff: AU, NZ, US, ZA, CL, AR | Reconcile with existing content and map individual entities |
| Wine Atlas V3 | Interactive parcel prototype | Schematic parcels are not validated appellation/cadastral boundaries |
| Foundation pre-learning | Course structure and revised D1–D4 learning sequence | Align with actual source lesson decks |

The existing ten detailed Aligoté wine dossiers remain unchanged. Neither France nor the whole CMS curriculum is represented as complete.

## Evidence and validation

- Source snapshots and audit: `research/content-release-20261028/`.
- CMS master outline: https://app.notion.com/p/3f817d16de4c81738ac8d77e4ebbfb24
- Module 01 extension: https://app.notion.com/p/3fb17d16de4c81d1bc62eafbd8059c86
- France repair batches: https://app.notion.com/p/40617d16de4c81ab8747ebc5d0ec71da and https://app.notion.com/p/40617d16de4c81c7bb39dd6a8d2ea9d8
- Estate provenance: every released profile links its official source in `data/producers.json`.
- Targeted checks cover learning IDs, notes/plans, grading and review, image files/licenses, bilingual switching, reciprocal entity links, and ONE English script syntax/storage compatibility.
- Managed preview reported running, but the cloud browser returned `ERR_CONNECTION_REFUSED` for the exact supplied preview URL. Visual browser QA could not be completed in this environment. Type checks, data tests and production build remain the release checks; no claim of visual QA is made.

No original Notion source, learner record or existing wine dossier was deleted.
