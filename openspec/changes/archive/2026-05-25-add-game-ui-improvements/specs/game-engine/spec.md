## ADDED Requirements

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

## MODIFIED Requirements

## REMOVED Requirements
