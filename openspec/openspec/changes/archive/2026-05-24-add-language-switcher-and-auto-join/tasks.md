## 1. Language Switcher & Persistence

- [x] 1.1 Update `useTranslation.ts` to read language from localStorage first, falling back to the argument
- [x] 1.2 Add language switcher `<select>` to `App.tsx` header that persists choice to localStorage
- [x] 1.3 Wire `App.tsx` language state down so CreateGame and GameView use the user's chosen language
- [x] 2.1 In `CreateGame.tsx`, use `useParams` to read `:roomCode` from the URL
- [x] 2.2 When a room code param is present, auto-select "join" mode and pre-fill the room code input

## 3. Verify

- [x] 3.1 Switch language to Ukrainian, reload page, confirm UI stays in Ukrainian
- [x] 3.2 Navigate to `/join/TEST123` and confirm join form is shown with "TEST123" pre-filled
