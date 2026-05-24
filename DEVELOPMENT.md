# Development Guide

## Prerequisites

- **Node.js** >= 18 (uses `crypto.randomUUID()`)
- **npm** (comes with Node)

## Quick Start

```bash
# One-command launch (from project root)
npm run dev
```

This starts both the server (port 3001) and client (port 5173) with distinguishable prefixes (`[server]` and `[client]`). Open `http://localhost:5173`, create a game, share the room code, then open a second tab to join as another player.

> **Alternative** — two terminals if you prefer separate windows:
> ```bash
> # Terminal 1 — Server
> cd server && npm run dev
> # → http://localhost:3001
>
> # Terminal 2 — Client
> cd client && npm run dev
> # → http://localhost:5173
> ```

## Project Architecture

```
├── server/          Express + TypeScript backend
│   ├── src/
│   │   ├── index.ts       HTTP routes and app entry
│   │   └── gameState.ts   In-memory game state manager
│   ├── package.json
│   └── tsconfig.json
├── client/          Vite + React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx                Root component with polling
│   │   ├── hooks/
│   │   │   └── useGamePolling.ts  2s interval polling hook
│   │   └── pages/
│   │       ├── CreateGame.tsx     Create/join form
│   │       └── GameView.tsx       Lobby, play, and reveal views
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── shared/
│   └── types.ts      TypeScript types shared by server and client
└── DEVELOPMENT.md    This file
```

### Data Flow

The game uses **HTTP polling** — no WebSockets. Clients fetch game state from the server at a regular interval:

1. **Create or join** → `POST /api/create` or `POST /api/join`
2. **Poll** → `GET /api/game/:roomId` every 2 seconds (handled by `useGamePolling` hook)
3. **Submit turn** → `POST /api/turn` (completion + new sentence)
4. **Reveal** → `POST /api/reveal` (any player can trigger early)
5. **Auto-end** → When `turnCount >= sentencesCount`, the server sets `phase: "reveal"` and clients see `fullRevealText` on their next poll

## API Reference

### `POST /api/create`

Create a new game room. Body:

```json
{
  "numPlayers": 2,
  "gameTheme": "space adventure",
  "sentencesCount": 5,
  "visibleWords": 3
}
```

Response: `{ "roomCode": "ABC123", "playerId": "..." }`

### `POST /api/join`

Join an existing game. Body:

```json
{
  "roomCode": "ABC123",
  "playerName": "Player2"
}
```

Response: `{ "playerId": "...", "gameState": { ... } }`

### `GET /api/game/:roomId`

Poll current game state. Query params: none (player identification is for display only).

Response: `{ "gameState": { id, config, players, phase, sentences, turnCount, activePlayerId, lastWords, fullRevealText } }`

### `POST /api/turn`

Submit a turn. Body:

```json
{
  "roomCode": "ABC123",
  "playerId": "...",
  "completion": "drifted through the void",
  "newSentence": "And in that silence we"
}
```

- **First turn**: set `completion: ""` (nothing to complete)
- **Subsequent turns**: `completion` completes the previous player's sentence; `newSentence` starts the next one

Response: `{ "gameState": { ... } }`

Returns `409` if it's not your turn.

### `POST /api/reveal`

End the game early and show the full text. Body:

```json
{
  "roomCode": "ABC123",
  "playerId": "..."
}
```

Response: `{ "fullText": "..." }`

## Contributing

- **Server** code is in `server/src/`. Game logic lives in `gameState.ts`; routes in `index.ts`.
- **Client** pages are in `client/src/pages/`. The polling hook is at `client/src/hooks/useGamePolling.ts`.
- **Shared types** (`GameState`, `Player`, etc.) are in `shared/types.ts` — update both server and client if you add fields.
- The client dev server proxies `/api/*` to `localhost:3001` (configured in `vite.config.ts`).
- No database — game state is in-memory and lost on server restart.
