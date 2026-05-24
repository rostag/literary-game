## ADDED Requirements

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

## MODIFIED Requirements

## REMOVED Requirements
