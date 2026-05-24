## Why

The WebSocket implementation in the literary game adds deployment complexity (sticky sessions, WSS upgrades) and extra dependencies. For a turn-based game where players wait seconds between actions, HTTP polling is simpler to deploy, debug, and scale — and removes the `ws` dependency entirely.

## What Changes

- **BREAKING**: Remove all WebSocket code from server and client
- Replace real-time push with periodic HTTP polling for game state
- Change turn submission from WebSocket message to POST request
- Remove client-side WebSocket reconnection logic
- Remove server-side inactivity timers (state fetched on poll)
- Simplify shared types: remove ClientEvent/ServerEvent union types, add REST response types

## Capabilities

### New Capabilities
- `polling-sync`: HTTP polling-based game state synchronization, where clients poll for turn changes, sentence updates, and game phase transitions at a configurable interval

### Modified Capabilities
- `real-time-communication`: Replaced entirely — superseded by `polling-sync`. All WebSocket-based requirements are removed.
- `game-engine`: Turn submission changes from WebSocket message to POST /api/turn with state returned in the response. Game state retrieval changes from push broadcast to GET /api/game/:roomId.

## Impact

- **server/package.json**: Remove `ws` dependency
- **server/src/index.ts**: Replace WebSocketServer with HTTP polling endpoints. Remove WebSocket connection handler, room join/leave WS events, turn_change broadcast, reconnect handler
- **server/src/gameState.ts**: Remove inactivity timer logic. Add GET state serialization. No structural changes to game logic
- **client/package.json**: No dependency changes
- **client/src/hooks/**: Remove `useWebSocket.ts`. Add `useGamePolling.ts` with setInterval-based polling
- **client/src/App.tsx**: Replace WebSocket message handler with polling-based state updates
- **client/src/pages/CreateGame.tsx**: No visual changes — send functions change from WS to fetch
- **client/src/pages/GameView.tsx**: No visual changes — data source changes from WS push to polled fetch
- **shared/types.ts**: Remove ClientEvent/ServerEvent types. Add GameResponse types for REST endpoints
