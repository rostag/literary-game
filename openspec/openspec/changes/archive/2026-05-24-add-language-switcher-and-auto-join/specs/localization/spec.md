## ADDED Requirements

### Requirement: User can switch language via header dropdown
The system SHALL provide a language switcher in the app header that lets the user toggle between available languages.

#### Scenario: Language switcher visible
- **WHEN** a user views any page
- **THEN** they SHALL see a language selector (English / Українська) in the app header

#### Scenario: Language changes immediately
- **WHEN** a user selects a different language from the switcher
- **THEN** all visible UI strings SHALL update to the selected language immediately

### Requirement: Language choice persists across sessions
The user's selected language SHALL be saved to localStorage and restored on subsequent visits.

#### Scenario: Language persists on reload
- **WHEN** a user selects Ukrainian and reloads the page
- **THEN** the UI SHALL render in Ukrainian

#### Scenario: Saved language overrides server default
- **WHEN** a user has a saved language in localStorage
- **THEN** that language SHALL take precedence over the server's `DEFAULT_LANGUAGE` setting
