## 1. Starting Sentence on Reveal

- [x] 1.1 Update reveal section in `GameView.tsx` to show the starting sentence (`gs.sentences[0]?.fullText`) above `fullRevealText`

## 2. Rules Modal

- [x] 2.1 Create `RulesModal.tsx` component with overlay, close-on-backdrop, and game rules content
- [x] 2.2 Add rules link in top-right corner of game page and wire it to open the modal

## 3. Copy-able Join Link in Lobby

- [x] 3.1 In the lobby section of `GameView.tsx`, add a full join URL with a "Copy" button using `navigator.clipboard`

## 4. Verify

- [x] 4.1 Create a game, confirm lobby shows copy-able join URL
- [x] 4.2 Play through to reveal, confirm starting sentence is shown above the full story
- [x] 4.3 Open rules modal, confirm it opens and closes correctly
