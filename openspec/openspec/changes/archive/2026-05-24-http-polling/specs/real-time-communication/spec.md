## REMOVED Requirements

### Requirement: WebSocket connection established on join
**Reason**: Replaced by HTTP polling — no persistent connection is needed

#### Scenario: Connection on join
- **WHEN** a player submits a room code or creates a game
- **THEN** the client SHALL open a WebSocket connection to the server with the room code and player ID

#### Scenario: Disconnection handling
- **WHEN** a player's WebSocket disconnects
- **THEN** the server SHALL mark the player as disconnected and SHALL notify other players. If the disconnected player was active, a 5-minute inactivity timer starts

### Requirement: Turn events broadcast in real time
**Reason**: Replaced by polling — clients discover state changes on their next poll

#### Scenario: Turn change broadcast
- **WHEN** a player submits their sentence
- **THEN** the server SHALL broadcast a "turn_change" event to all players with the new active player's identifier

#### Scenario: Reveal broadcast
- **WHEN** any player requests a reveal
- **THEN** the server SHALL broadcast the full assembled text to all players and close the game

### Requirement: Client reconnection
**Reason**: Replaced by polling — polling is stateless, no reconnection needed

#### Scenario: Reconnect resume
- **WHEN** a player reconnects with the same room code and player ID within 5 minutes
- **THEN** the server SHALL restore the player's state and re-broadcast the current game state
