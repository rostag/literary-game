## ADDED Requirements

### Requirement: Lobby displays a copy-able join link
The lobby SHALL show a full URL that other players can use to join the game.

#### Scenario: Full URL shown after creation
- **WHEN** a player is in the game lobby
- **THEN** they SHALL see a clickable join URL (e.g., `http://localhost:5173/join/ABC123`) displayed prominently

#### Scenario: URL can be copied
- **WHEN** a player clicks a "Copy" button next to the join URL
- **THEN** the URL SHALL be copied to the clipboard and a brief confirmation SHALL be shown
