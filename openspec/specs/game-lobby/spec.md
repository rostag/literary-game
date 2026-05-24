## Purpose

Manages the pre-game lobby: creating games with configurable parameters, joining by room code, and automatically starting when all players have joined.

## Requirements

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

### Requirement: Host can share a join URL from the lobby
The system SHALL display a pre-composed join URL in the lobby so the host can share it directly without manually constructing a link from the room code.

#### Scenario: Join URL displayed in lobby
- **GIVEN** the game is in the lobby phase
- **WHEN** any player views the lobby screen
- **THEN** the system SHALL display a labelled join URL composed as `<origin>/join/<roomId>`

#### Scenario: Copy button copies URL to clipboard
- **GIVEN** the join URL is visible in the lobby
- **WHEN** the player clicks the "Copy" button
- **THEN** the full join URL SHALL be written to the clipboard
- **AND** the button label SHALL briefly change to "Copied!" as confirmation

#### Scenario: URL input selectable on click
- **GIVEN** the join URL is visible in the lobby
- **WHEN** the player clicks the URL input field
- **THEN** the full URL text SHALL be selected so the player can manually copy it
