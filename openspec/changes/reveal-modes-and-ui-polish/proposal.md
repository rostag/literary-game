## Why

The current reveal mechanic is a single unguarded button available to every player at all times, which makes accidental or premature story reveals too easy. Game hosts need configurable control over when and how the story is revealed, and the UI needs safeguards to prevent mis-clicks during play.

## What Changes

- Add a **reveal mode** selector to game creation — host chooses one of three modes that governs how reveals are triggered for that game
- **Consensus mode** (default): any player can propose a reveal; all other players receive an in-game prompt and must accept; reveal proceeds only after unanimous agreement
- **Host-approve mode**: any player can propose a reveal; the game host receives a prompt and must approve; reveal proceeds on host approval
- **Host-only mode**: only the game host sees a reveal button; clicking it immediately triggers the reveal
- Reposition the reveal button to a small control in the top-right corner to reduce accidental clicks
- Move the language selector to the same top-right corner
- Add a **Start Over** button on the reveal screen that takes all players back to the create/join landing page

## Capabilities

### New Capabilities
- `reveal-mode`: Configurable reveal behaviour — consensus, host-approve, and host-only modes; includes voting/approval flow state machine
- `start-over`: After a reveal, players can initiate a fresh game from the reveal screen

### Modified Capabilities
- `game-lobby`: Game creation form gains a `revealMode` selector (consensus | host-approve | host-only), stored in GameConfig
- `game-engine`: "Game ends by limit or reveal" behaviour changes — reveal is now gated by the configured mode rather than immediately triggered by any player's POST /api/reveal

## Impact

- `shared/types.ts` — add `revealMode: "consensus" | "host-approve" | "host-only"` to `GameConfig`; add `revealVotes` and `revealProposedBy` fields to `GameState` for tracking pending reveal state
- `server/` — `/api/reveal` endpoint becomes mode-aware: in consensus/host-approve modes it records a pending vote and notifies relevant players; resolves to reveal only when conditions are met
- `client/src/pages/CreateGame.tsx` — new reveal mode selector field
- `client/src/pages/GameView.tsx` — mode-aware reveal UI: voting prompt overlay, approval prompt for host, repositioned controls in top-right corner, Start Over button on reveal screen
- `client/src/index.css` — top-right controls area, reveal voting overlay styles
- `client/src/i18n/en.json`, `uk.json` — new keys for reveal mode labels, voting prompt, approval prompt, Start Over
