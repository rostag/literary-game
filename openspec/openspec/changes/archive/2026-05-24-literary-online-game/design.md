## Context

Greenfield project — no existing codebase. Two services: React SPA (Vite, TypeScript) and Node.js backend with WebSocket support. No authentication; players join by room code.

## Goals / Non-Goals

**Goals:**
- Allow a host to create a game with configurable numPlayers, gameTheme, sentencesCount, visibleWords
- Allow other players to join via room code
- Implement turn loop: write → leave unfinished → next player sees last N words → complete → start new
- Allow reveal of full assembled text at any time
- Real-time state sync via WebSocket

**Non-Goals:**
- User accounts or authentication
- Persistent storage of completed games (in-memory only for MVP)
- Spectator mode, chat, or moderation tools
- Mobile-native builds (responsive web only)

## Decisions

- **WebSocket library**: `ws` for simplicity and zero dependencies over Socket.IO — the protocol is simple enough (game events only) that Socket.IO's extra features (rooms, fallback transports) aren't needed
- **State storage**: In-memory Map<string, GameState> on the server. Games expire after 1 hour of inactivity. This avoids database complexity for MVP
- **React state management**: React context + useReducer per room connection. Redux unnecessary for this scope
- **Routing**: React Router with routes: `/` (lobby/create), `/join/:roomCode` (game view)
- **Visible words logic**: Server stores full sentence but sends only the last N words to the next player. Next player must complete the sentence (their input is appended). Then they start a new sentence, which is sent to the following player
- **Game end**: Automatically when all sentencesCount turns are done, or manually when any player clicks "Reveal"

## Risks / Trade-offs

- [In-memory state lost on server restart] → Acceptable for MVP. Mitigation: log game text to server console on reveal so it can be recovered
- [Player disconnection] → Other players wait indefinitely. Mitigation: 5-minute inactivity timeout per turn; if player doesn't act, turn auto-skips and their partial input is replaced with "..."
- [No auth means anyone can join any room] → Acceptable for MVP. Room codes use 6-character alphanumeric strings
