## 1. Shared Types

- [x] 1.1 Add `revealMode: "consensus" | "host-approve" | "host-only"` to `GameConfig` in `shared/types.ts`
- [x] 1.2 Add `hostPlayerId: string` to `GameState` in `shared/types.ts`
- [x] 1.3 Add `revealProposedBy: string | null` and `revealVotes: string[]` to `GameState` in `shared/types.ts`

## 2. Server — Game State

- [x] 2.1 Set `hostPlayerId` to the first player's ID in `GameStateManager.createRoom()` (or on first `addPlayer` call) and initialise `revealProposedBy: null`, `revealVotes: []`
- [x] 2.2 Rewrite `GameStateManager.reveal()` to be mode-aware:
  - `host-only`: reject if caller is not host; otherwise reveal immediately
  - `host-approve`: if caller is host → reveal immediately; if non-host → record `revealProposedBy`, return pending state
  - `consensus`: if no proposal yet → record `revealProposedBy`; if proposal exists and caller not proposer → add to `revealVotes`; if all non-proposer players voted → reveal
- [x] 2.3 Add `GameStateManager.declineReveal(roomId, playerId)` that clears `revealProposedBy` and `revealVotes` (valid in consensus and host-approve modes)

## 3. Server — Routes

- [x] 3.1 Update `POST /api/create` to accept `revealMode` from request body (default `"consensus"`) and pass it into `GameConfig`
- [x] 3.2 Update `POST /api/reveal` to call the rewritten `reveal()` and return `{ pending: true }` when a proposal is recorded rather than revealing immediately
- [x] 3.3 Add `POST /api/reveal/decline` route that calls `GameStateManager.declineReveal()` and returns updated game state

## 4. Client — CreateGame Form

- [x] 4.1 Add a reveal mode selector (`<select>` or radio group) to `CreateGame.tsx` with options: Consensus (default), Host Approve, Host Only
- [x] 4.2 Pass `revealMode` in the `POST /api/create` request body
- [x] 4.3 Add i18n keys for the three mode labels and the selector label to `en.json` and `uk.json`

## 5. Client — Top-Right Controls

- [x] 5.1 Add a `<div class="top-controls">` to `GameView.tsx` that replaces the existing floating `rulesLink` and houses: language selector, rules link, and (conditionally) the reveal trigger
- [x] 5.2 Remove the language selector from its current location and render it inside `.top-controls`
- [x] 5.3 Render the reveal trigger inside `.top-controls` as a small text/icon element, only for players permitted to initiate under the current mode (host in host-only; any player in consensus/host-approve when no proposal is pending)
- [x] 5.4 Add CSS for `.top-controls` (fixed/absolute top-right, flex row, small text sizes) and remove any previous positioning styles for the rules link

## 6. Client — Reveal Voting UI

- [x] 6.1 When `gs.revealProposedBy` is set and the current player is not the proposer, show a modal or banner with "Agree" and "Decline" buttons (calls `POST /api/reveal` to agree, `POST /api/reveal/decline` to decline)
- [x] 6.2 When `gs.revealProposedBy` is set and the current player is the proposer, show a "Waiting for others…" message (no action buttons)
- [x] 6.3 When `gs.revealProposedBy` is set and the current player is the host (in host-approve mode), show an "Approve" and "Decline" prompt
- [x] 6.4 Add i18n keys for the voting UI (agree, decline, approve, waiting) to `en.json` and `uk.json`

## 7. Client — Reveal Screen

- [x] 7.1 Add a "Start Over" button below `fullRevealText` on the reveal phase screen in `GameView.tsx`
- [x] 7.2 Wire "Start Over" to navigate to `/` (e.g., `window.location.href = "/"`)
- [x] 7.3 Add i18n keys for "Start Over" label to `en.json` and `uk.json`
