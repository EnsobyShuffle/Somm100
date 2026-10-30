# Quiz card navigation — 2026-10-29

- Correct multiple-choice answers advance after 700 ms, only after saving succeeds. Incorrect answers remain available for retry.
- Left swipe reviews the previous card; right swipe and Next require a correct answer. Previous/Next buttons and focused-card arrow keys share the rule.
- Short-answer Got it advances; Review again stays and allows a later Got it. Incomplete source answers can continue manually after revealing the available answer.
- Previous answers remain visible when reviewing. Returning to a completed card does not start another timer. Filters, mode changes, manual navigation and unmount cancel pending advancement.
- A card session retains question membership while scores change, so Due/Review again filters do not remove the answered card before feedback or prevent reviewing it. Changing filters starts a new session; explicit dismissals remain effective.
- Horizontal swipes require at least 56 px and reject vertical scrolling, taps and long holds. Dragging across an option suppresses its click. Native vertical scrolling and pinch zoom remain enabled.

Validation: TypeScript, quiz-navigation and quiz-round tests; Cloud Browser preview verified wrong-answer stay, retry then automatic advance, left/right drag, unanswered forward block, no option click during drag, retained answers on review, and short-answer Review again then Got it.

Question content, stable IDs and persistent learning record structure are unchanged.
