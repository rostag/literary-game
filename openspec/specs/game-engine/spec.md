## Purpose

Defines the core game loop: players write sentences, leave them unfinished for the next player, and the game ends when all turns are complete or a reveal is requested.

## Requirements

### Requirement: Active player writes sentence and leaves it unfinished
The system SHALL present the active player with a text input where they write a sentence and deliberately leave it incomplete.

#### Scenario: First player writes
- **WHEN** it is the first player's turn (turn 0)
- **THEN** they SHALL see a text input with a placeholder indicating the theme, and after submitting their turn via POST /api/turn, their full sentence is stored server-side

#### Scenario: Subsequent players see last visibleWords
- **WHEN** it is a subsequent player's turn
- **THEN** they SHALL see only the last visibleWords words of the previous player's sentence (fetched via GET /api/game/:roomId), and SHALL be required to complete that sentence before starting a new one

#### Scenario: Completing and continuing
- **WHEN** the player submits their completion of the previous sentence and writes a new unfinished sentence via POST /api/turn
- **THEN** the server SHALL append the completion to the stored sentence, apply the turn, and return the updated game state in the response

### Requirement: Game ends by limit or reveal
The system SHALL end the game either when sentencesCount turns are completed, or when any player requests a reveal.

#### Scenario: Auto-end on turn limit
- **WHEN** sentencesCount turns have been completed
- **THEN** all clients discover the game has ended on their next poll, receiving fullRevealText

#### Scenario: Manual reveal
- **WHEN** any player sends POST /api/reveal during their turn or while waiting
- **THEN** the server SHALL immediately end the game, and all clients discover the reveal on their next poll

### Requirement: Turn order is round-robin
The system SHALL cycle through players in join order, wrapping around when the last player completes their turn.

#### Scenario: Round-robin cycle
- **WHEN** the last player in join order submits their turn
- **THEN** the next turn SHALL go to the first player, until sentencesCount is reached

### Requirement: Reveal phase shows the starting sentence
The system SHALL display the first sentence of the story at the top of the reveal screen, giving players an anchor for reading the full story from its origin.

#### Scenario: Starting sentence shown when available
- **GIVEN** the game has ended and the reveal screen is displayed
- **WHEN** at least one sentence exists in the game's sentence list
- **THEN** the system SHALL display the first sentence's full text with a "Starting sentence:" label above the full story reveal

#### Scenario: Starting sentence absent when no sentences recorded
- **GIVEN** the game ended before any sentences were stored
- **WHEN** the reveal screen is displayed
- **THEN** no starting sentence section SHALL be shown
