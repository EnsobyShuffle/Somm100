# Foundation component verification

From a normal repository checkout with its locked dependencies installed:

```sh
node --test tests/foundation-*.test.mjs
pnpm exec vite build --config tests/foundation-ui/vite.config.mjs
```

Serve `.foundation-ui-dist` on a dedicated local QA origin. Never copy it to `public` or the Tencent deployment directory. The normal CloudBase build entry is unchanged. This entry mounts the real five Foundation components under React StrictMode. It deliberately omits LearningApp navigation and conceptual reading sections; the related concept-scroll buttons cannot be accepted here. Use the full app for those checks.

Manual regression:

1. Change pre-course pace and current week; select D1 unit10 and France unit5.
2. Expand label answers and map guide. Confirm fictional label cards and the six information fields, no extra automatic score.
3. Check a D1 self-check; answer a question incorrectly then correctly. Reload; check active units, pace, checkbox and distinct first/latest answers.
4. At a narrow viewport, check cards stack and no horizontal overflow. This does not replace physical-phone testing.
5. Inspect existing D1/D2 diagrams and cohort dates. Confirm original storage keys and stable IDs.

The QA origin stores real-format local learning records. Use a dedicated test origin; never clear a learner's production storage. The harness validates component integration, not the full production bundle, cloud synchronization, deployment or mainland reachability.
