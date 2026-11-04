# Foundation progress — 2026-11-04

Implementation commit: a49b0dcad6b2c5317721938ec382d3802d9c6d03.

The foundation route now renders the eight-node pre-course framework, four/eight-week reading paths, in-page navigation, ten original WeChat article links and eight non-scored reflection prompts. Service/practice links are retained under the after-course-start section. The obsolete Chapter 00 is no longer the pre-course main path.

Sources: Notion framework 40717d16de4c813b90b7d6a1bb17131e and guided reading 40717d16de4c812fa096fb12992546e3, read directly this session. Source inventory is data/foundation-source-map.json; its source-mapped status records the inventory creation stage, while this checkpoint records subsequent UI integration. These are introductory concept summaries, not completed full lessons.

Validation: replacement was restricted to the existing foundation JSX block; 8 unique section IDs, 10 mapped source links, and unchanged surrounding source were checked. GitHub file readback equals submitted source. Existing netlify.toml ignore protection was verified. No full local checkout or installed TSX compiler was available; production build, browser/mobile rendering, external-link accessibility and Tencent deployment have NOT been verified. Do not claim live release. No account/storage logic or other course modules changed.

Next: restore complete authoritative GitHub branch into a supported build workspace and run build:cloudbase; test navigation/details/links at mobile widths. Read Notion D1–D2 inventory 40717d16de4c810c811dd8a1324066cd and pre-course path 40717d16de4c814ba288fa4ab63f2746. Six formal course days remain pending timetable verification. Preserve lecturers and existing course images when importing current course information. Recover six grape reading links and expand concept lessons using verified material. Do not report complete six-day curriculum.
