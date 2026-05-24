## ADDED Requirements

### Requirement: Client polls game state at regular interval
The system SHALL fetch the latest game state from the server at a configurable interval while the player is in an active game.

#### Scenario: Polling on game page
- **WHEN** a player is on the game page (lobby, playing, or reveal phase)
- **THEN** the client SHALL send a GET request to /api/game/:roomId every 2 seconds

#### Scenario: Polling stops on unmount
- **WHEN** the player navigates away from the game page
- **THEN** the client SHALL stop polling

### Requirement: Game state response includes all current data
The server SHALL return the complete game state in a single response for polling clients.

#### Scenario: State returned
- **WHEN** a client polls GET /api/game/:roomId?playerId=...
- **THEN** the response SHALL include: phase, players, activePlayerId, turnCount, lastWords (last visibleWords of the current sentence), and fullRevealText if game has ended

#### Scenario: Poll before game exists
- **WHEN** a client polls a non-existent room code
- **THEN** the server SHALL return a 404 status

### Requirement: State freshness is bounded
The system SHALL tolerate client state being up to the polling interval behind the server state without breaking game logic.

#### Scenario: Stale submit rejected
- **WHEN** a client submits a turn based on stale state (playerId no longer matches activePlayerId)
- **THEN** the server SHALL reject with 409 Conflict and the client SHALL re-fetch and re-evaluate
