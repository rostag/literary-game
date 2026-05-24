## Why

Online literary games exist, but few combine structured turn-based play with creative writing mechanics like sentence completion. A game where players complete each other's unfinished sentences creates emergent storytelling — but no existing tool lets you configure player count, theme, visible words, and turn length through a simple interface. This project fills that gap.

## What Changes

- Build a React single-page application for the game frontend
- Build a Node.js backend with WebSocket support for real-time turn management
- Implement game creation flow: configure numPlayers, gameTheme, sentencesCount, visibleWords via UI
- Implement core turn loop: player A writes sentence → leaves unfinished → player B sees last N words and completes → starts new sentence → repeat
- Implement game reveal: all players can view the full assembled text at any time
- No user authentication system in MVP — players join by room code

## Capabilities

### New Capabilities
- `game-lobby`: Room-based game creation and joining with configurable parameters (numPlayers, gameTheme, sentencesCount, visibleWords)
- `game-engine`: Turn management, sentence completion mechanics, and full-text reveal logic
- `real-time-communication`: WebSocket-based real-time state synchronization between players during turns

### Modified Capabilities
*No existing capabilities are modified.*

## Impact

- New `client/` directory with React app (Vite + TypeScript)
- New `server/` directory with Node.js/Express + WebSocket (ws/uWebSockets) backend
- No existing code, APIs, or systems are affected — this is a greenfield project
