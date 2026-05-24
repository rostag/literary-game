## Context

The current reveal mechanic (`POST /api/reveal`) immediately ends the game for any player who calls it, with no safeguards. The server has no concept of host identity, and the reveal button is a prominent call-to-action that is easy to hit accidentally mid-play.

This change introduces three reveal modes with different gating rules, explicit host tracking, a pending-reveal state machine on the server, and UI repositioning of controls. All reveal-mode logic lives server-side so clients cannot bypass it.

In-force ADRs (ADR-0001, ADR-0002) are unaffected — this change touches neither URL composition nor modal rendering patterns.

## Goals / Non-Goals

**Goals:**
- Three configurable reveal modes: consensus, host-approve, host-only
- Mode selected at game creation, stored in `GameConfig`, enforced on the server
- Pending reveal state visible to clients via the existing poll endpoint
- Voting/approval flow with a decline path that cancels the proposal
- Reveal and language selector controls repositioned to top-right
- Start Over button on the reveal screen (client navigation only)

**Non-Goals:**
- Real-time push notifications (WebSocket/SSE) — polling is sufficient for this interaction speed
- Partial reveals or reveal previews
- Changing the turn-limit auto-reveal path (already immediate, no gating needed)

## Decisions

### 1. Add `hostPlayerId` explicitly to `GameState`

The host is always `players[0]` by current convention (creator is added first in `/api/create`), but this is implicit. Adding `hostPlayerId: string` to `GameState` makes host identity an explicit, queryable contract rather than a positional assumption.

**Alternative**: Keep the convention and have callers derive `players[0].id`. Rejected — fragile if player order ever changes.

### 2. Pending reveal tracked as `revealVotes: string[]` + `revealProposedBy: string | null`

Two new nullable fields on `GameState`:
- `revealProposedBy`: ID of the player who initiated the current reveal proposal (null = no pending proposal)
- `revealVotes`: IDs of players who have agreed (empty when no proposal is active)

Clients discover a pending proposal through the existing `GET /api/game/:roomId` poll. No new endpoint needed for the discovery side.

**Alternative**: A separate `revealState` sub-object. Rejected as over-engineering for three scalar values.

### 3. Two reveal endpoints: `POST /api/reveal` and `POST /api/reveal/decline`

`POST /api/reveal` is mode-aware and caller-aware:
```
host-only:     host caller  → immediate reveal; non-host → 403
host-approve:  non-host     → records proposal; host caller → immediate reveal
consensus:     first caller → records proposal; subsequent callers (non-proposer) → records agree; when all others agreed → reveal
```

`POST /api/reveal/decline` cancels the pending proposal:
- Consensus: any non-proposer player can decline → clears `revealProposedBy` and `revealVotes`
- Host-approve: host can decline → clears proposal

**Alternative**: Single endpoint with `vote: "agree" | "decline"` param. Rejected — overloads one endpoint with three distinct semantics (propose, agree, decline), making server logic harder to follow.

**Alternative**: Separate agree endpoint. Kept folded into `POST /api/reveal` because in consensus mode "proposing" and "agreeing" are mechanically identical from the server's perspective — both add a player ID to the set of consenting players.

### 4. Start Over is client-side navigation only

The "Start Over" button reloads or navigates to the root `/` path. No server-side reset endpoint. Existing rooms expire naturally (in-memory store); a new game creates a new room.

### 5. Reveal button in top-right controls bar, rendered as a small icon/text link

A persistent `<div class="top-controls">` holds the language selector and (mode-permitting) the reveal trigger. The reveal trigger is styled as a small secondary-text element, not a primary button, to reduce accidental activation.

```
┌─────────────────────────────────────────────────────────┐
│  [Game content ...]                   Rules  🌐 EN  ⚑  │
└─────────────────────────────────────────────────────────┘
```
The ⚑ (or small "Reveal" text) is only shown to players who are allowed to initiate a reveal under the current mode.

## Risks / Trade-offs

- [Risk] Consensus mode with many players could deadlock if one player is AFK. -> Mitigation: out of scope for this change; a timeout or host-override could be added later.
- [Risk] In-memory `revealVotes` state is lost on server restart. -> Mitigation: consistent with the rest of the in-memory game store; no persistence is promised.
- [Risk] A player who joined but then closed the tab still needs to vote in consensus mode. -> Mitigation: same AFK problem as above; deferred.
- [Risk] `revealProposedBy` is not cleared when a player who proposed then disconnects. -> Mitigation: same AFK/disconnect scope; acceptable for now.

## Migration Plan

Client-only and server-only changes; shared type changes are additive (new optional fields with defaults). No data migration needed. Rollback is a code revert.

## Open Questions

_(none)_
