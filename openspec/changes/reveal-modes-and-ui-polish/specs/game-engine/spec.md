## ADDED Requirements

## MODIFIED Requirements

### Requirement: Game ends by limit or reveal
The system SHALL end the game either when sentencesCount turns are completed, or when a manual reveal is successfully completed according to the game's configured reveal mode.

#### Scenario: Auto-end on turn limit
- **WHEN** sentencesCount turns have been completed
- **THEN** all clients discover the game has ended on their next poll, receiving fullRevealText

#### Scenario: Manual reveal (host-only mode)
- **WHEN** the host sends a reveal request and the game mode is "host-only"
- **THEN** the server SHALL immediately end the game, and all clients discover the reveal on their next poll

#### Scenario: Manual reveal (host-approve mode — approved)
- **WHEN** a reveal proposal has been approved by the host in "host-approve" mode
- **THEN** the server SHALL end the game, and all clients discover the reveal on their next poll

#### Scenario: Manual reveal (consensus mode — unanimous agreement)
- **WHEN** all non-proposing players have agreed to reveal in "consensus" mode
- **THEN** the server SHALL end the game, and all clients discover the reveal on their next poll

#### Scenario: Reveal proposal declined — game continues
- **WHEN** a reveal proposal is cancelled (by a decline in consensus or host-approve mode)
- **THEN** the game SHALL remain in the playing phase

## REMOVED Requirements
