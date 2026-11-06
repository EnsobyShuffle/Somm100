# Foundation React rendering check

Run from the repository root:

```sh
node scripts/check-foundation-rendering.mjs
node scripts/check-foundation-quiz-flow.mjs
node --test tests/foundation*.test.mjs
npm run build:cloudbase
```

The rendering check requires the repository's React/react-dom versions plus `jsdom@26.1.0`. jsdom is a test-environment dependency, not a student application dependency. To keep it outside the application's lockfile:

```sh
npm install --prefix /tmp/somm100-dom-check --ignore-scripts --no-audit --no-fund --save-exact jsdom@26.1.0
FOUNDATION_DOM_MODULE=file:///tmp/somm100-dom-check/node_modules/jsdom/lib/api.js node scripts/check-foundation-rendering.mjs
```

The repository's own React dependencies must already be installed. The test-only loader adapts JSON imports and ignores CSS; it does not replace React, hooks, progress helpers or application source. No external page is fetched.

## Coverage

- Actual React server rendering of the first unit of D1, D2, France, D3 and D4.
- Actual React DOM rendering and effects in jsdom for all 10 + 9 + 6 + 13 + 15 units, selected through their real change handlers.
- Learning objective, preparation and written practice text; written exercise save/scoring boundary. All 53 units must provide all three fields; the former D3 exception was removed after its learning guidance was added.
- Original check/question input counts and absence of internal Notion links in the rendered student view.
- Seeded first/latest answers and checks survive unit navigation without completion being fabricated.
- Actual checkbox/radio clicks save to isolated test localStorage; unmount/remount restores the selected unit and answers.
- Unit selection and previous/next buttons move actual DOM focus to the new article; initial load does not steal focus. Scroll requests are recorded with a jsdom stub, including reduced-motion behavior. Real scroll geometry remains untested.
- Corrupt stored records show an alert and are not overwritten by temporary interactions.
- React console errors/warnings fail the check.

This is not a browser screenshot, responsive-layout, accessibility audit, cloud-sync or online-deployment check. CSS is deliberately not rendered. The test writes only to jsdom's disposable localStorage. The 77-test data/progress suite and offline CloudBase artifact checker remain separate gates.

## 2026-11-06 environment

Node 24.22.1; React/react-dom 19.2.6; jsdom 26.1.0. The CloudBase-only build environment restored Vite 8.0.13, @vitejs/plugin-react 6.0.2, lucide-react 1.31.0, @tailwindcss/postcss and tailwindcss 4.2.1 outside the repository, linked as node_modules. This was a focused dependency restoration, not a frozen pnpm-lockfile install of the entire Next/Vinext stack. Repository package versions and lockfiles were not changed.

## Quiz/review round-trip integration (2026-11-07)

`check-foundation-quiz-flow.mjs` mounts the actual D1–D4 quiz wrappers together with their actual review components (including France for D2). It changes selections, makes two distinct answers, clicks every mapped review button, changes away from the original question and returns through the actual return button. It asserts stable first/latest answers, correct destination, actual DOM focus and no automatic review completion. Coverage: 142 questions, 143 mapped round trips (D3 question10 has two destinations). Invalid question IDs are ignored. Previous/next/pending-question navigation also returns focus to the quiz title. React errors/warnings fail the check.

The Node loader resolves local extensionless JS imports like the bundler. requestAnimationFrame callbacks are explicitly drained after React commits; scrollIntoView is stubbed because jsdom has no layout. These checks do not establish browser scroll geometry, screen-reader output, mobile layout, lazy-chunk network timing or online deployment. Test storage is disposable, never a user's records.

## Foundation loading recovery (2026-11-07)

Run `node scripts/check-foundation-loading.mjs` with the same React/jsdom dependencies. The actual FoundationLoadBoundary wraps deferred and rejected React.lazy components. Checks cover pending status and return action, successful resolution, rejected-import feedback and heading focus, explicit reload action only, no fake retry of React.lazy's cached rejection, unchanged seeded local record, and remount recovery. The reload API is stubbed; this does not verify actual network failures, page reload, screen-reader output, browser layout or online deployment. Existing course components remain inside one Suspense boundary so they become available together. No automatic reload or storage deletion is added.
