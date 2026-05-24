## 1. Rules Modal Component

- [x] 1.1 Create `client/src/pages/RulesModal.tsx` — modal overlay component with close button and rules list, rendered via `useTranslation` for the title
- [x] 1.2 Add `showRules` boolean state and `rulesLink` button element to `GameView`
- [x] 1.3 Render `rulesLink` and `{showRules && <RulesModal />}` in every phase branch (loading, lobby, writing, reveal)

## 2. Lobby Join URL

- [x] 2.1 Compose `joinUrl` as `window.location.origin + /join/ + gs.id` in the lobby phase of `GameView`
- [x] 2.2 Add join URL display with read-only input (click-to-select) and a copy button that uses `navigator.clipboard.writeText`
- [x] 2.3 Show transient "Copied!" feedback on the copy button for 2 seconds after a successful clipboard write

## 3. Reveal Starting Sentence

- [x] 3.1 Read `gs.sentences[0]?.fullText` as the starting sentence in the reveal phase
- [x] 3.2 Conditionally render the starting sentence block with a labelled heading above `fullRevealText`

## 4. Styles

- [x] 4.1 Add CSS for `.rules-link` floating button (positioned, styled link appearance)
- [x] 4.2 Add CSS for `.modal-overlay` (full-viewport fixed overlay) and `.modal-content` (centred card with close button)
- [x] 4.3 Add CSS for `.join-url` container, `.join-url-row` input+button layout
- [x] 4.4 Add CSS for `.starting-sentence` and `.starting-text` in the reveal phase

## 5. Internationalisation

- [x] 5.1 Add keys to `client/src/i18n/en.json`: `game.rules`, `game.rulesTitle`, `lobby.joinUrl`, `lobby.copyLink`, `lobby.copied`, `reveal.startingSentence`
- [x] 5.2 Add matching Ukrainian translations to `client/src/i18n/uk.json` for all six keys
