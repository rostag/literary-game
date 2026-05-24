## Why

The `RulesModal` component uses the i18n system for its title but the five rule list items are hardcoded in English, breaking the localization experience for non-English users. The rest of the UI is fully translated (Ukrainian support exists), making this an isolated gap that is straightforward to close.

## What Changes

- Add 5 new i18n keys (`game.rule1` – `game.rule5`) to `client/src/i18n/en.json` and `client/src/i18n/uk.json`.
- Update `client/src/pages/RulesModal.tsx` to render each rule list item via `t()` instead of hardcoded English strings.

## Capabilities

### New Capabilities

_(none — this is a completeness fix within an existing capability)_

### Modified Capabilities

- `localization`: The rules modal body content (five game rule sentences) becomes translatable, extending the existing localization coverage to the previously hardcoded strings in `RulesModal`.

## Impact

- `client/src/i18n/en.json` — 5 new keys added
- `client/src/i18n/uk.json` — 5 new Ukrainian translations added
- `client/src/pages/RulesModal.tsx` — rule `<li>` items rendered via `t()` calls
- No API, backend, or dependency changes required
