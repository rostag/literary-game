## Context

The game UI has three gaps: the reveal screen doesn't distinguish the starting sentence, there's no in-app way to learn rules, and the join link is just a room code without a full URL. All three are client-only changes.

## Goals / Non-Goals

**Goals:**
- Reveal screen shows starting sentence separately before `fullRevealText`
- Rules modal with game description, accessible from header link
- Copy-able full join URL displayed in lobby after game creation

**Non-Goals:**
- Multi-language rules text (uses existing `t()` pattern, English only for now)
- Styling beyond basic functional CSS

## Decisions

1. **Starting sentence from server data** — `gs.sentences[0]?.fullText` is the first player's original sentence. No server change needed.

2. **Modal as simple React component** — A `RulesModal` component with an overlay, controlled by `useState` in `GameView`. No modal library needed.

3. **Join URL constructed client-side** — `window.location.origin + "/join/" + roomCode`. The lobby already shows the room code; just add the full URL with a copy button.

4. **Rules link in GameView header** — A small link in the top-right of the game page (not the global app header), since rules are only relevant during gameplay.

## Risks / Trade-offs

- **Copy button uses `navigator.clipboard`** — Works on HTTPS and localhost. Falls back to selecting text manually if unavailable.
- **Rules text is hardcoded in component** — Could be moved to a JSON file later. Fine for now.
