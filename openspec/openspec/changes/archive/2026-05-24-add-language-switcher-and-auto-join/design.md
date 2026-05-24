## Context

The localization system currently only supports server-side language selection via `DEFAULT_LANGUAGE` env var. Users cannot switch languages without a server restart. The join flow requires users to manually type or paste room codes — shared `/join/:roomCode` links don't pre-fill the form.

## Goals / Non-Goals

**Goals:**
- Language switcher dropdown in the header
- Language choice persisted in localStorage, overriding server default
- `/join/:roomCode` URL auto-fills join form and shows join tab
- All client-only changes (no server modifications)

**Non-Goals:**
- Server-side language negotiation (Accept-Language header)
- URL-based language param (e.g., `?lang=uk`)
- Translation of the app header/mode toggle (those already use t() calls)

## Decisions

1. **localStorage over cookie** — Language preference doesn't need server access. localStorage is simpler and avoids cookie consent overhead.

2. **Client preference overrides server default** — If a user has a saved language in localStorage, it wins. If not, fall back to the game state's `config.language` (which comes from server's `DEFAULT_LANGUAGE`). This means non-game pages (create/join) use localStorage if set, otherwise "en".

3. **Language switcher as `<select>` in header** — Simple native dropdown, no custom UI component needed. Only two options (English, Ukrainian) for now.

4. **`useTranslation` reads from localStorage on init** — The hook checks `localStorage.getItem("language")` before falling back to the passed `language` prop. The App component also reads it to set the initial header language.

5. **URL param via React Router `useParams`** — The route already captures `:roomCode`. CreateGame reads it from useParams and pre-fills the join code input plus switches to join mode.

## Risks / Trade-offs

- **Two language sources** — Server default vs localStorage can conflict. Mitigation: localStorage always wins for display; server default is only used when no localStorage value exists.
- **No language in create/join pages without localStorage** — Before game creation, the header title is always English (no game state yet). Acceptable since the switcher lets users change it immediately.
