# 0002. Modal overlay via inline conditional render, not React portal

- Status: accepted
- Date: 2026-05-25

## Context

The game UI needed a dismissible overlay modal (rules modal). React portals (`ReactDOM.createPortal`) are the conventional solution for modals because they render outside the parent DOM tree, avoiding z-index and stacking context issues. The alternative is to render the modal inline in the component tree and rely on CSS `position: fixed` + a high `z-index` to achieve full-viewport coverage.

In this application, `GameView` is the sole full-page component and its DOM tree does not create any stacking contexts that would trap a fixed-position element. The added complexity of portal setup (target DOM node, `createPortal` import) was not justified.

## Decision

Modal overlays in this application are rendered as inline JSX using conditional rendering (`{show && <Modal />}`) at the bottom of the parent component's return value. Modals achieve full-viewport coverage via `position: fixed` and `z-index` in CSS.

React portals are not used unless a future stacking context makes them necessary.

## Consequences

- **Positive**: Simpler code — no portal target node, no `createPortal` import.
- **Positive**: Modal visibility is co-located with the state that controls it, making the flow easy to trace.
- **Negative**: If a parent component ever introduces a CSS `transform`, `filter`, or `will-change` property, `position: fixed` descendants will be clipped to that stacking context, breaking the modal. Switching to a portal would then be required.
- **Neutral**: All phases of `GameView` must each include the `{showRules && <RulesModal />}` line, as there is no single render location shared by all branches.
