## Purpose

Provides a localization system that supports English (default) and Ukrainian languages, controlled by a server-side `DEFAULT_LANGUAGE` environment variable or overridden by the user's client-side preference persisted in localStorage. All user-facing strings are defined in translation catalogs and accessed via a `t("key.name")` pattern.

## Requirements

### Requirement: Translation catalog provides English and Ukrainian strings
The system SHALL maintain named translation catalogs for English (default) and Ukrainian, where each catalog maps translation keys to localized strings.

#### Scenario: UI renders in default language (English)
- **WHEN** no `DEFAULT_LANGUAGE` environment variable is set
- **THEN** the client SHALL use the English catalog for all user-facing strings

#### Scenario: UI renders in Ukrainian when configured
- **WHEN** `DEFAULT_LANGUAGE=uk` is set in the server environment
- **THEN** the client SHALL use the Ukrainian catalog for all user-facing strings

### Requirement: Language is configurable via environment variable
The active language SHALL be determined at server startup by reading a `DEFAULT_LANGUAGE` environment variable.

#### Scenario: Custom language set
- **WHEN** the server starts with `DEFAULT_LANGUAGE=uk`
- **THEN** the game config SHALL use "uk" as the active language and expose it in the game state response

#### Scenario: Falls back to English
- **WHEN** the server starts without `DEFAULT_LANGUAGE` set
- **THEN** the game config SHALL use "en" as the active language

### Requirement: All user-facing strings use translation keys
Every hardcoded user-facing string in the UI SHALL be replaced with a `t("key.name")` call referencing the translation catalog.

#### Scenario: Game view strings translated
- **WHEN** a player views the game page
- **THEN** the turn indicator, theme badge, button labels, and placeholders SHALL be rendered via the translation catalog

#### Scenario: Lobby strings translated
- **WHEN** a player views the lobby
- **THEN** the room code label, player count, and waiting message SHALL be rendered via the translation catalog

#### Scenario: Error messages translated
- **WHEN** the server returns a validation error
- **THEN** the client SHALL display the error message translated into the active language

### Requirement: Missing keys fall back gracefully
The translation system SHALL handle missing keys without crashing, displaying the key name itself as a visible placeholder.

#### Scenario: Unknown key
- **WHEN** a component calls `t("nonexistent.key")`
- **THEN** the system SHALL return `"nonexistent.key"` as the display string

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
