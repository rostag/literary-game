## ADDED Requirements

### Requirement: Rules modal is accessible from game page
The system SHALL display a modal with game rules when the user clicks a link in the top-right corner of the game page.

#### Scenario: Rules link visible
- **WHEN** a player is on the game page (lobby, playing, or reveal)
- **THEN** they SHALL see a "Rules" link in the top-right corner

#### Scenario: Modal opens and closes
- **WHEN** a player clicks the "Rules" link
- **THEN** a modal SHALL open showing the game rules, and SHALL close when the player clicks the close button or the overlay background
