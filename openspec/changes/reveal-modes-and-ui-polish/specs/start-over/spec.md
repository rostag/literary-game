## ADDED Requirements

### Requirement: Players can start a new game after reveal
Feature: Start Over
Rule: After a story is revealed, any player SHALL be able to navigate back to the game creation/join landing page to start a fresh game.

#### Scenario: Start Over button visible on reveal screen
- **GIVEN** the game is in the reveal phase
- **WHEN** any player views the reveal screen
- **THEN** a "Start Over" button SHALL be visible below the full story text

#### Scenario: Clicking Start Over navigates to the landing page
- **GIVEN** a player is on the reveal screen
- **WHEN** the player clicks "Start Over"
- **THEN** the player SHALL be navigated to the root landing page where they can create or join a new game

## MODIFIED Requirements

## REMOVED Requirements
