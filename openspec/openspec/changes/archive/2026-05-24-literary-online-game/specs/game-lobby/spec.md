## ADDED Requirements

### Requirement: Host can create a game with parameters
The system SHALL provide a creation form where the host sets numPlayers, gameTheme, sentencesCount, and visibleWords before starting.

#### Scenario: Game created with valid params
- **WHEN** the host fills all four fields with valid values and clicks "Create Game"
- **THEN** the system SHALL generate a unique 6-character room code and display it for sharing

#### Scenario: Invalid parameter rejected
- **WHEN** the host submits numPlayers < 2, sentencesCount < 1, or visibleWords < 1
- **THEN** the system SHALL display an inline validation error and not create the game

### Requirement: Player can join a game by room code
The system SHALL allow players to enter a room code and join the game before it starts.

#### Scenario: Join success
- **WHEN** a player enters a valid room code for a game that has not yet started
- **THEN** the system SHALL add the player to the game lobby and show the current player count and theme

#### Scenario: Join invalid code
- **WHEN** a player enters a non-existent or expired room code
- **THEN** the system SHALL display a "Game not found" error message

### Requirement: Game starts when all players joined
The system SHALL start the game automatically when numPlayers players have joined.

#### Scenario: Start triggered
- **WHEN** the last required player joins
- **THEN** the system SHALL assign turn order (join order) and notify all players that the game has started, displaying the first player's turn
