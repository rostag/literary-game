## MODIFIED Requirements

### Requirement: Game ends by limit or reveal
The system SHALL end the game either when sentencesCount turns are completed, or when any player requests a reveal.

#### Scenario: Auto-end on turn limit
- **WHEN** sentencesCount turns have been completed
- **THEN** all clients discover the game has ended on their next poll, receiving fullRevealText

#### Scenario: Manual reveal
- **WHEN** any player sends POST /api/reveal during their turn or while waiting
- **THEN** the server SHALL immediately end the game, and all clients discover the reveal on their next poll

#### Scenario: Starting sentence shown separately on reveal
- **WHEN** a player views the reveal screen
- **THEN** they SHALL see the starting sentence (first player's original text) displayed separately above the full assembled story
