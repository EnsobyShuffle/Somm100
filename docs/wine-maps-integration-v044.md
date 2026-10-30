# Wine Maps · SOMM100 App integration · v0.4.4

## Delivered in this version

- The App's existing Wine Maps navigation now opens the Chambolle-Musigny interactive atlas within the production Site.
- The mobile map supports one-finger pan, two-finger pinch zoom, tap-to-open feature cards, search, and map layers; desktop supports pointer drag, wheel zoom, and double-click zoom.
- Feature cards link to the existing Bourgogne regional record, Pinot Noir grape record, and Wine Quizzes in the parent App.
- The atlas can request French DGFiP / Etalab cadastral polygons or accept a GeoJSON import. A cadastral polygon does not establish vineyard ownership or AOC status.

## Limits shown to learners

- Coloured Chambolle-Musigny climat shapes in this release are illustrative teaching geometry, not legal INAO boundaries or surveyed vineyard parcels.
- The App currently has broader Bourgogne and Pinot Noir records. It does not yet contain a Chambolle-Musigny-specific Wine Library page or verified producer-to-parcel / wine-to-parcel relationships.
- Official cadastre loading requires the browser to reach the external French data service; the default interactive map remains available if that request fails.
- Desktop and responsive browser behavior can be checked in the preview. Physical HarmonyOS / iOS device acceptance still requires a real-device touch test.
