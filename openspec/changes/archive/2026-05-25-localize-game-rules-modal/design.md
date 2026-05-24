## Context

`RulesModal.tsx` uses `t("game.rulesTitle")` for the modal heading, but the five rule `<li>` items are hardcoded English strings. The existing i18n system (`useTranslation` hook backed by `client/src/i18n/*.json`) already covers all other visible UI strings in both English and Ukrainian. This change closes that isolated gap.

Existing in-force ADRs (ADR-0001, ADR-0002) are unaffected — this change touches neither URL composition nor modal rendering patterns.

## Goals / Non-Goals

**Goals:**
- All five rule list items in `RulesModal` rendered via `t()` calls
- Keys added to `en.json` and `uk.json`

**Non-Goals:**
- Adding support for additional languages beyond English and Ukrainian
- Changing the i18n system, key naming conventions, or translation infrastructure
- Any visual or structural changes to `RulesModal`

## Decisions

### Key naming: `game.rule1` – `game.rule5`

Sequential numeric suffixes (`game.rule1` … `game.rule5`) are used rather than descriptive slugs (e.g., `game.ruleLeaveUnfinished`). The rules are ordered list items where position is the semantic identifier; descriptive slugs would add naming overhead with no lookup benefit.

## Risks / Trade-offs

- [Risk] If the number of rules changes, the sequential keys become a gap (e.g., `game.rule6` would need to be added to both locale files). -> Mitigation: low risk; the rules list is stable game content unlikely to change.

## Migration Plan

Client-only change. No deployment coordination or rollback procedure needed beyond a code revert.

## Open Questions

_(none)_
