## Why

The game currently has hardcoded English strings throughout the UI. Adding localization support enables the game to reach Ukrainian-speaking players while keeping English as the default. A global configurable parameter allows switching the active language without code changes.

## What Changes

- Add a localization module with English and Ukrainian string catalogs
- Add a configurable language parameter (default: English) read at server/startup
- Replace all hardcoded UI strings with localized keys via a shared translation hook
- Wire the active language into the game state so the client knows which language to render

## Capabilities

### New Capabilities
- `localization`: i18n system supporting English (default) and Ukrainian, with a global configurable parameter to select the active language, a translation key catalog, and a React hook for consuming translations in components

### Modified Capabilities
<!-- No existing spec-level behavior changes - all UI strings are implementation details, not contractual requirements. -->

## Impact

- **New dependency**: A lightweight i18n approach (vanilla pattern, no heavy library)
- **Client**: New `useTranslation` hook, translation catalog files, updated all UI components to use `t()` keys
- **Server**: Language parameter in game config or environment variable, exposed in game state response
- **Shared types**: Language enum/type added
