## ADDED Requirements

## MODIFIED Requirements

### Requirement: All user-facing strings use translation keys
Every hardcoded user-facing string in the UI SHALL be replaced with a `t("key.name")` call referencing the translation catalog. This includes the body content of the rules modal.

#### Scenario: Game view strings translated
- **WHEN** a player views the game page
- **THEN** the turn indicator, theme badge, button labels, and placeholders SHALL be rendered via the translation catalog

#### Scenario: Lobby strings translated
- **WHEN** a player views the lobby
- **THEN** the room code label, player count, and waiting message SHALL be rendered via the translation catalog

#### Scenario: Error messages translated
- **WHEN** the server returns a validation error
- **THEN** the client SHALL display the error message translated into the active language

#### Scenario: Rules modal content translated
- **GIVEN** a player has opened the rules modal
- **WHEN** the active language is Ukrainian
- **THEN** all five rule list items SHALL be displayed in Ukrainian, not English

## REMOVED Requirements
