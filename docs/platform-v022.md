# Wine & Sommelier — v0.2.2

Working name, not a final brand. Latest user direction broadens the platform beyond SOMM100 and CMS. No-login testing and existing URL are preserved. No database migration or account data change.

## Product and contracts

Discover → Learning Programs → SOMM100 / CMS. CMS offers Intro / CS / AS / MS exercise filters and Module 01's existing four-stage learning. These labels describe authored exercise difficulty, not official examination equivalence or completed certification curricula. Independent modules: Tasting Notes, Wine Quiz, Wine Maps, Wine Channel. Progress, study time/check-ins and settings remain accessible through desktop utility navigation and mobile More. WSET is future scope. Wine News is a separate future content project; no fabricated feed or empty news page.

`data/platform.json` records module identity/type/status. `data/wine-maps.json` records region coordinates, knowledge-node references, topic and official map sources. GET /api/curriculum includes both alongside the existing schema v2 content. Existing 96 questions and stable IDs are preserved. South America 90-question staging and the separate Dismiss specification are not implemented by this release.

## Journal integration and provenance

Existing `wine_tasting_journal_v1_4.html`, Library ID libfile_a41077a7c780819180c8c8419d8a8f91, version 0, 61,647 bytes, was retrieved and inspected. Original remains unmodified. A copy lives at public/journal/index.html. The only source adapter adds a visibilitychange flush of pending saves. It is loaded in a same-origin iframe kept mounted after first visit; /journal/ provides a full-screen option.

Preserved: Open/Blind mode, Sparkling/White/Rosé/Red-specific options, Sight/Nose/Palate/conclusions, local autosave and JSON import/export. IndexedDB WTJ_V11 / notes, with localStorage wtj_notes fallback, is separate from learning localStorage somm100-device-test-v1. Neither is shared with another device or origin. An old downloaded HTML or separate Journal URL requires Export JSON → Import JSON. No sample user records are bundled. CMS timed training remains a distinct exercise, not a second full journal.

## Map scope and sources

Local SVG plots approximate city coordinates in northeastern France on a labelled longitude/latitude grid. It is not an equal-distance projection or legal appellation/vineyard map. Two selectable learning regions: Alsace (Colmar reference) and Chablis. Related knowledge and exercises open existing content. Chablis's sourced teaching aerial image is zoomable and explicitly labelled non-legal.

Official linked map pages were read during this task:
- https://www.vinsalsace.com/en/carte/
- https://www.bourgogne-wines.com/our-resources/media,3181,14293.html?args=Y29tcF9pZD0yMzA5JmFjdGlvbj1maWNoZV9tZWRpYSZpZD01MzUmfA%3D%3D

Maps are linked rather than copied. External OSM embed failed WebGL compatibility in preview; raster tiles displayed an access restriction. Neither integration ships. A production map provider and mainland network acceptance remain future work.

## Validation

Preview browser: homepage/navigation; CMS Master filter returns 8 current exercises; Journal Add → Blind → White, white-fruit categories, Save → reload retains one record; Chablis teaching image zoom reaches 150%; map knowledge button opens correct climate/aspect/water node; mobile 390×844 home and More menu checked. Existing learning, habits and browser-store automated suites pass; TypeScript passes. Production packaging is performed by Sites workflow. Browser test data stays in the preview origin, not production.

Phone hardware, mainland connectivity, Journal JSON migration roundtrip, unified progress statistics, video playback and native packages have not been validated by this change.
