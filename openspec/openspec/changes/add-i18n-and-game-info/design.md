## Context

The game UI currently has hardcoded English strings spread across React components (GameView, CreateGame, etc.) and server error messages. Adding localization requires a lightweight i18n approach — no heavy libraries, no runtime dynamic switching. English is the default; Ukrainian is the first additional language.

## Goals / Non-Goals

**Goals:**
- Provide English (default) and Ukrainian translation catalogs
- Select active language via a global configurable parameter (`DEFAULT_LANGUAGE` env var)
- Replace all user-facing hardcoded strings with translation keys
- Client receives the active language via game state and renders accordingly

**Non-Goals:**
- Runtime language switching (language is set at startup)
- Pluralization rules, date/number formatting, RTL support
- Translating server-side developer logs or internal messages

## Decisions

1. **Vanilla JSON catalog over i18next / react-intl** — The project has zero i18n needs beyond key lookup. Adding a library adds bundle size and API surface for no benefit. A simple `Record<string, string>` catalog with a `t(key)` function is sufficient.

2. **Language passed via game state, not client-side detection** — The server owns the `DEFAULT_LANGUAGE` config and exposes it in the game state response. The client reads it once and uses the matching catalog. This keeps the client stateless regarding language selection.

3. **Dot-notation keys with a `t()` function** — Keys like `"game.turnIndicator"` are readable and groupable. The `useTranslation` hook returns `{ t, language }` so components call `t("game.turnIndicator")`.

4. **Separate catalog files per language** — `client/src/i18n/en.json` and `client/src/i18n/uk.json` keep translations isolated and easy to edit without touching code.

5. **Server error messages translated** — Server constructs error responses with the room's language so the client can display them directly. The `DEFAULT_LANGUAGE` is stored on the room config at creation time.

## Risks / Trade-offs

- **Catalog maintenance burden** — Every new UI string needs a key in both catalogs. Mitigation: enforce `t()` usage in code review; missing keys fall back to the key name (visible gap).
- **Dev experience overhead** — Jumping between component and catalog file is slightly slower than inline strings. Mitigation: co-locate catalog files in `client/src/i18n/` for quick access.
- **Server-side translation scope** — Only validation error messages are translated; server logs stay English. This is acceptable since logs are developer-facing.
