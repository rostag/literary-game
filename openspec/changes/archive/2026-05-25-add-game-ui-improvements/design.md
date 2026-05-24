## Context

The game UI was missing three features before a wider release: players had no in-game way to read the rules, the lobby provided no shareable join URL, and the reveal phase showed no anchor context for reading the story. All features are contained within the client (`client/src/`) — no API or shared type changes were needed.

The existing codebase uses a single `GameView.tsx` component that renders conditionally based on `gs.phase` (loading, lobby, writing, reveal). State is local to `GameView` via `useState`. Translations are handled via a custom `useTranslation(lang)` hook backed by JSON files in `client/src/i18n/`.

## Goals / Non-Goals

**Goals:**
- Surface game rules from any phase via a dismissible overlay modal
- Show a copyable join URL in the lobby so the host can share the room link
- Show the starting sentence in the reveal phase alongside `fullRevealText`

**Non-Goals:**
- Persistent rules storage or server-side rules management
- Join URL shortening or deep-link redirect service
- Full story history or replay features beyond the starting sentence
- Backend or shared-type changes

## Decisions

### 1. Rules modal rendered inline per phase (not via a portal)

The `RulesModal` component is conditionally rendered at the bottom of each phase's JSX block using `{showRules && <RulesModal ... />}`. A single `showRules: boolean` state in `GameView` controls visibility.

**Alternatives considered:**
- React portal (`ReactDOM.createPortal`) for z-index safety — rejected as unnecessary; the modal overlay uses `position: fixed` and covers the viewport, so stacking context from `GameView` is not an issue in this app.
- Separate context/provider — rejected as overkill for a single boolean flag scoped to one component.

### 2. Rules link defined once as a JSX variable and reused across phases

```tsx
const rulesLink = <button className="rules-link" onClick={() => setShowRules(true)}>{t("game.rules")}</button>;
```

This avoids repeating the handler binding in every phase branch.

### 3. Join URL composed client-side from `window.location.origin`

```tsx
const joinUrl = `${window.location.origin}/join/${gs.id}`;
```

**Alternatives considered:**
- Server-returned join URL — rejected; the URL is derivable from room ID and origin without an extra round-trip.
- Using `window.location.href` — rejected; the user may be viewing any path, so `origin + /join/<id>` is canonical.

### 4. Clipboard copy with transient feedback

`navigator.clipboard.writeText` is used; the button label switches to the `lobby.copied` string for 2 seconds via `setCopyMsg` + `setTimeout`. On failure the message resets silently (clipboard access can be denied in some contexts).

### 5. Starting sentence sourced from `gs.sentences[0]?.fullText`

The first sentence in `gs.sentences` is used as the starting sentence. The display is conditional (`startSentence &&`) so it degrades gracefully if the array is empty.

## Risks / Trade-offs

- **Clipboard API unavailability** — `navigator.clipboard` requires a secure context (HTTPS or localhost). In insecure HTTP deployments the copy button silently does nothing. Mitigation: the URL input is selectable (click-to-select) as a fallback.
- **Rules hardcoded in English** — `RulesModal` renders five rule `<li>` items as hardcoded strings rather than translation keys. This breaks the localization experience for non-English users. Mitigation: tracked as a follow-up change (`localize-game-rules-modal`).
- **`gs.sentences[0]` assumption** — The starting sentence display assumes the first element is the story opener. If the data model changes, this could show the wrong sentence. Mitigation: low risk; `sentences` is append-only during a game.

## Migration Plan

All changes are client-only. No migrations, data backfills, or coordinated deploys required. Rollback is a code revert.

## Open Questions

_(none)_
