## ADDED Requirements

### Requirement: WebSocket connection established on join
The system SHALL establish a persistent WebSocket connection when a player joins or creates a game.

#### Scenario: Connection on join
- **WHEN** a player submits a room code or creates a game
- **THEN** the client SHALL open a WebSocket connection to the server with the room code and player ID

#### Scenario: Disconnection handling
- **WHEN** a player's WebSocket disconnects
- **THEN** the server SHALL mark the player as disconnected and SHALL notify other players. If the disconnected player was active, a 5-minute inactivity timer starts

### Requirement: Turn events broadcast in real time
The system SHALL broadcast turn changes and game state updates to all connected players via WebSocket.

#### Scenario: Turn change broadcast
- **WHEN** a player submits their sentence
- **THEN** the server SHALL broadcast a "turn_change" event to all players with the new active player's identifier

#### Scenario: Reveal broadcast
- **WHEN** any player requests a reveal
- **THEN** the server SHALL broadcast the full assembled text to all players and close the game

### Requirement: Client reconnection
The system SHALL allow a player to reconnect and resume if their WebSocket drops and reconnects within 5 minutes.

#### Scenario: Reconnect resume
- **WHEN** a player reconnects with the same room code and player ID within 5 minutes
- **THEN** the server SHALL restore the player's state and re-broadcast the current game state
