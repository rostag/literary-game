## ADDED Requirements

### Requirement: Join link auto-fills room code
The system SHALL detect a room code in the URL path and pre-fill the join form.

#### Scenario: URL with room code
- **WHEN** a user navigates to `/join/ABC123`
- **THEN** the join form SHALL be shown with the room code pre-filled as "ABC123"

#### Scenario: Join tab auto-selected
- **WHEN** a user navigates to `/join/:roomCode`
- **THEN** the "Join" tab SHALL be selected automatically instead of "Create Game"
