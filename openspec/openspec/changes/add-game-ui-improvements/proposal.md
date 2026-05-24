## Why

The reveal screen currently shows only the assembled `fullRevealText` without distinguishing the starting sentence. Players also lack a way to learn the game rules in-app, and the join link is a room code that must be copied from a non-obvious location. These three improvements make the game more usable and self-documenting.

## What Changes

- Reveal screen shows the starting sentence (first player's original text) separately before the full story
- Add a game rules modal with rules text, accessible via a link in the top-right corner of the header
- Lobby screen shows a full clickable/copy-able join URL (`http://host:port/join/ROOMCODE`) after game creation

## Capabilities

### New Capabilities
- `game-rules-modal`: A modal dialog that displays the game's rules, toggled by a link in the top-right header

### Modified Capabilities
- `game-engine`: Add a scenario to the reveal requirement showing the starting sentence separately
- `game-lobby`: Add a requirement that the lobby displays a copy-able join link after game creation

## Impact

- **Client only**: No server changes needed
- `GameView.tsx`: Update reveal phase to show starting sentence, add rules modal link in header
- `App.tsx` or `GameView.tsx`: Add rules modal link in top-right
- New component `RulesModal.tsx` for the modal
- `CreateGame.tsx`: Show copy-able link in lobby after creation
