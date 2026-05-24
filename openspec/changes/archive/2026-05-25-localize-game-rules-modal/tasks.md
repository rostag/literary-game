## 1. Translation Keys

- [x] 1.1 Add 5 new keys to `client/src/i18n/en.json`: `game.rule1` through `game.rule5`, with the English text of each hardcoded rule item
- [x] 1.2 Add matching Ukrainian translations for `game.rule1` through `game.rule5` to `client/src/i18n/uk.json`

## 2. RulesModal Component

- [x] 2.1 Update `client/src/pages/RulesModal.tsx` to replace each hardcoded `<li>` string with a `{t("game.rule1")}` through `{t("game.rule5")}` call
