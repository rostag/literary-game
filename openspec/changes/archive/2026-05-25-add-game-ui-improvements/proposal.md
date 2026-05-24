## Why

The game UI is missing several features expected before a wider release: players have no in-game way to read the rules, the lobby provides no shareable join URL, and the reveal phase shows no anchor context for reading the story. These gaps represent feature parity issues identified ahead of launch.

## What Changes

- Add a **Rules modal** accessible from every game phase via a floating "Rules" link — shows the game rules in a dismissible overlay
- Add a **join URL display** in the lobby with a one-click copy button so the host can share the link without manual room-code lookup
- Add a **starting sentence display** in the reveal phase so players can see where the story began alongside the full reveal text

## Capabilities

### New Capabilities
- `game-rules-modal`: In-game rules modal accessible from any phase (loading, lobby, writing, reveal)

### Modified Capabilities
- `game-lobby`: Lobby now displays a copyable join URL in addition to the room code
- `game-engine`: Reveal phase now surfaces the starting sentence alongside `fullRevealText`

## Impact

- `client/src/pages/GameView.tsx` — rules link + modal wired into all render branches; join URL row added to lobby; starting sentence added to reveal
- `client/src/pages/RulesModal.tsx` — new component (untracked)
- `client/src/index.css` — modal overlay, rules link, and join-url styles added
- `client/src/i18n/en.json`, `uk.json` — new keys: `game.rules`, `game.rulesTitle`, `lobby.joinUrl`, `lobby.copyLink`, `lobby.copied`, `reveal.startingSentence`
- No API, server, or shared type changes required
