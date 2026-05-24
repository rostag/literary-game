## Purpose

Provides players with in-game access to the game rules at any point during a session via a floating link that opens a dismissible overlay modal.

## Requirements

### Requirement: Player can view game rules from any phase
Feature: Game Rules Modal
Rule: Players should be able to access game rules at any point during a game session.

The system SHALL display a floating "Rules" link in every game phase (loading, lobby, writing, reveal). Clicking it opens a dismissible overlay modal containing the game rules.

#### Scenario: Rules link visible in loading phase
- **GIVEN** a player has joined and the game state is loading
- **WHEN** the loading screen is displayed
- **THEN** a "Rules" link SHALL be visible on the screen

#### Scenario: Rules link visible in lobby phase
- **GIVEN** a player is in the lobby waiting for others
- **WHEN** the lobby screen is displayed
- **THEN** a "Rules" link SHALL be visible on the screen

#### Scenario: Rules link visible in writing phase
- **GIVEN** the game is in the active writing phase
- **WHEN** the writing turn screen is displayed
- **THEN** a "Rules" link SHALL be visible on the screen

#### Scenario: Rules link visible in reveal phase
- **GIVEN** the game has ended and the reveal is shown
- **WHEN** the reveal screen is displayed
- **THEN** a "Rules" link SHALL be visible on the screen

#### Scenario: Clicking Rules opens the modal
- **GIVEN** a player is on any game screen
- **WHEN** the player clicks the "Rules" link
- **THEN** a modal overlay SHALL appear showing the game rules

#### Scenario: Clicking overlay dismisses the modal
- **GIVEN** the rules modal is open
- **WHEN** the player clicks outside the modal content (on the overlay)
- **THEN** the modal SHALL close and the game screen SHALL be visible

#### Scenario: Clicking close button dismisses the modal
- **GIVEN** the rules modal is open
- **WHEN** the player clicks the close (×) button
- **THEN** the modal SHALL close and the game screen SHALL be visible
