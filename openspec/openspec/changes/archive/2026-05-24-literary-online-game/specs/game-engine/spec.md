## ADDED Requirements

### Requirement: Active player writes sentence and leaves it unfinished
The system SHALL present the active player with a text input where they write a sentence and deliberately leave it incomplete.

#### Scenario: First player writes
- **WHEN** it is the first player's turn (turn 0)
- **THEN** they SHALL see a text input with a placeholder indicating the theme, and after submitting, their full sentence is stored server-side

#### Scenario: Subsequent players see last visibleWords
- **WHEN** it is a subsequent player's turn
- **THEN** they SHALL see only the last visibleWords words of the previous player's sentence, and SHALL be required to complete that sentence before starting a new one

#### Scenario: Completing and continuing
- **WHEN** the player submits their completion of the previous sentence and writes a new unfinished sentence
- **THEN** the server SHALL append the completion to the stored sentence, and pass the new sentence to the next player in turn order

### Requirement: Game ends by limit or reveal
The system SHALL end the game either when sentencesCount turns are completed, or when any player requests a reveal.

#### Scenario: Auto-end on turn limit
- **WHEN** sentencesCount turns have been completed
- **THEN** the system SHALL assemble and display the full concatenated text to all players

#### Scenario: Manual reveal
- **WHEN** any player clicks "Reveal" during their turn or while waiting
- **THEN** the system SHALL immediately end the game and display the full text to all players, including any incomplete sentence parts

### Requirement: Turn order is round-robin
The system SHALL cycle through players in join order, wrapping around when the last player completes their turn.

#### Scenario: Round-robin cycle
- **WHEN** the last player in join order submits their turn
- **THEN** the next turn SHALL go to the first player, until sentencesCount is reached
