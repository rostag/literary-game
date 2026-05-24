## Why

The localization system is server-side only — users cannot switch language without a server restart. Adding a client-side language switcher with localStorage persistence lets users choose their preferred language and keeps it across sessions. Also, join links (`/join/:roomCode`) should auto-fill the join form so shared links work seamlessly.

## What Changes

- Add a language switcher dropdown in the app header (visible on all pages)
- Persist the user's language choice in `localStorage` and use it to override the server default
- Auto-detect room code from the URL `/join/:roomCode` and pre-fill the join form
- Show the "Join" tab automatically when navigating to a join link

## Capabilities

### New Capabilities
- `join-link`: URL-based join flow — when a user visits `/join/:roomCode`, the join section is shown automatically with the room code pre-filled

### Modified Capabilities
- `localization`: Add client-side language switching with localStorage persistence, overriding the server-side default

## Impact

- **Client only**: No server changes needed
- `App.tsx`: Add language switcher in header, read language from localStorage
- `CreateGame.tsx`: Pre-fill join form from URL params, auto-show join tab
- `useTranslation.ts`: Accept language from localStorage, fall back to server default
- No new dependencies
