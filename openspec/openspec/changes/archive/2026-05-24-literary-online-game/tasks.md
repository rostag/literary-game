## 1. Project Scaffold

- [x] 1.1 Initialize server/ with Node.js + TypeScript + Express + ws
- [x] 1.2 Initialize client/ with Vite + React + TypeScript + React Router
- [x] 1.3 Add shared types package or shared types file for GameState, Player, Sentence, Room

## 2. Server — Real-time & Game Logic

- [x] 2.1 Implement WebSocket connection handler (connect, disconnect, room join/leave)
- [x] 2.2 Implement GameState manager (in-memory Map, room CRUD, turn tracking)
- [x] 2.3 Implement sentence submission handler (append completion, store new sentence)
- [x] 2.4 Implement reveal handler and game end logic (turn limit + manual reveal)
- [x] 2.5 Implement inactivity timeout and auto-skip for disconnected players

## 3. Client — Game Lobby

- [x] 3.1 Build CreateGame page with form (numPlayers, gameTheme, sentencesCount, visibleWords)
- [x] 3.2 Build JoinGame page with room code input, validation, and error display
- [x] 3.3 Build LobbyView showing joined players, theme, countdown until start

## 4. Client — Gameplay

- [x] 4.1 Build GameView with sentence display area showing last visibleWords
- [x] 4.2 Build sentence input (completion + new sentence), with submit button
- [x] 4.3 Build Reveal text view showing full assembled text
- [x] 4.4 Build turn indicator showing whose turn it is, turn number, and remaining turns

## 5. Client—Server Integration

- [x] 5.1 Connect CreateGame/JoinGame to WebSocket handshake and room creation
- [x] 5.2 Wire sentence submission to WebSocket events, handle turn_change broadcasts
- [x] 5.3 Wire reveal action, handle game_over broadcast with full text
- [x] 5.4 Handle reconnect flow (detect disconnect, auto-reconnect, restore state)

## 6. Polish

- [x] 6.1 Add basic styling (responsive, readable typography, turn-indicator colors)
- [x] 6.2 Add client-side validation for all inputs
- [x] 6.3 Test full flow: create → join → play N turns → reveal with 2-4 players
