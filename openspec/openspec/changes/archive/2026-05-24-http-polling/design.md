## Context

The literary game currently uses WebSockets for real-time communication. For a turn-based game where players wait seconds between actions, this adds unnecessary complexity. HTTP polling simplifies deployment and debugging with minimal UX impact.

## Goals / Non-Goals

**Goals:**
- Remove all WebSocket code from server and client
- Replace with HTTP polling: client fetches game state at a regular interval
- Keep game logic unchanged (turn order, sentence completion, reveal)
- Maintain the same visual behavior — polling should be transparent to the user
- Remove `ws` dependency from the server

**Non-Goals:**
- Reduce server resource usage (polling may increase it)
- Real-time latency below 500ms (acceptable for turn-based game)
- Server-sent events or long-polling (simple periodic polling only)

## Decisions

- **Polling interval**: 2 seconds. Short enough that waiting players feel responsive, long enough to avoid excessive requests. Configurable via env var `POLL_INTERVAL_MS`
- **Polling mechanism**: `setInterval` on the client, cleared on unmount or when game ends. No exponential backoff needed for MVP
- **REST endpoints**: `GET /api/game/:roomId?playerId=...` returns full game state (players, phase, activePlayerId, turnCount, lastWords, fullText if revealed). `POST /api/turn` replaces WS submit. `POST /api/reveal` replaces WS reveal
- **State persistence**: Still in-memory. Polling fetches the same GameState object serialized to JSON
- **Last words**: Included in the state response as a field, not pushed separately
- **No reconnect logic**: Polling is stateless — the client just resumes polling on reconnect
- **No inactivity timers**: Server no longer tracks connection state. If a player stops polling, the game simply waits (existing timeout from game-engine still applies server-side)

## Risks / Trade-offs

- [Increased server load] → Each client polls every 2s. For N players, that's N/2 requests/second per room. Acceptable for MVP with <20 concurrent rooms
- [Stale state] → Client state is up to 2s behind reality. Acceptable for turn-based game — players wait for each other regardless
- [Race conditions on turn submission] → Two clients submitting simultaneously could collide. Mitigation: server rejects submit if playerId doesn't match activePlayerId (already implemented)
