## ADDED Requirements

## MODIFIED Requirements

### Requirement: Host can create a game with parameters
The system SHALL provide a creation form where the host sets numPlayers, gameTheme, sentencesCount, visibleWords, and revealMode before starting.

#### Scenario: Game created with valid params
- **WHEN** the host fills all required fields with valid values and clicks "Create Game"
- **THEN** the system SHALL generate a unique 6-character room code and display it for sharing

#### Scenario: Invalid parameter rejected
- **WHEN** the host submits numPlayers < 2, sentencesCount < 1, or visibleWords < 1
- **THEN** the system SHALL display an inline validation error and not create the game

#### Scenario: Reveal mode defaults to consensus
- **WHEN** the host does not explicitly select a reveal mode
- **THEN** the game SHALL be created with `revealMode: "consensus"`

## REMOVED Requirements
