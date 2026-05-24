## 1. Translation Catalog & Hook

- [x] 1.1 Create `client/src/i18n/en.json` with all English translation keys for game UI
- [x] 1.2 Create `client/src/i18n/uk.json` with all Ukrainian translation keys
- [x] 1.3 Create `client/src/i18n/useTranslation.ts` hook reading catalog by language and returning `{ t, language }`

## 2. Server Language Config

- [x] 2.1 Add `DEFAULT_LANGUAGE` env var reading to server startup, default `"en"`
- [x] 2.2 Add `language` field to `GameConfig` in shared types
- [x] 2.3 Store language in room config at creation time

## 3. Client Integration

- [x] 3.1 Replace hardcoded strings in `GameView.tsx` with `t()` calls
- [x] 3.2 Replace hardcoded strings in `CreateGame.tsx` with `t()` calls
- [x] 3.3 Replace hardcoded strings in `App.tsx` with `t()` calls
- [x] 3.4 Translate server error messages using the room's language

## 4. Verify

- [x] 4.1 Run app with `DEFAULT_LANGUAGE=uk` and confirm Ukrainian strings render
- [x] 4.2 Run app without env var and confirm English strings render
