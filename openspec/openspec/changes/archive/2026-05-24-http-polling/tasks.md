## 1. Server — Remove WebSocket, Add HTTP Endpoints

- [x] 1.1 Remove ws dependency from server/package.json
- [x] 1.2 Replace WebSocketServer in server/src/index.ts with Express routes: GET /api/game/:roomId, POST /api/turn, POST /api/reveal
- [x] 1.3 Add game state serialization method to GameStateManager for GET response
- [x] 1.4 Remove inactivity timer logic from server/src/gameState.ts
- [x] 1.5 Remove WebSocket connection tracking from server/src/index.ts

## 2. Client — Replace WebSocket with Polling

- [x] 2.1 Create src/hooks/useGamePolling.ts with setInterval-based polling at 2s interval
- [x] 2.2 Replace useWebSocket in App.tsx with useGamePolling; remove socket event handlers
- [x] 2.3 Update CreateGame to use fetch POST /api/create instead of WS CREATE_GAME event
- [x] 2.4 Update GameView to use fetch POST /api/turn and POST /api/reveal instead of WS events

## 3. Shared Types

- [x] 3.1 Remove ClientEvent and ServerEvent union types from shared/types.ts
- [x] 3.2 Add REST response types: GameStateResponse, SubmitTurnResponse, CreateGameResponse

## 4. Cleanup

- [x] 4.1 Remove client/src/hooks/useWebSocket.ts
- [x] 4.2 Verify server compiles with no errors (npx tsc --noEmit)
- [x] 4.3 Verify client compiles with no errors (npx tsc --noEmit)
- [x] 4.4 Test full flow: create → join → play N turns → reveal via curl or browser
