Distill Architecture Decision Records from the design for the change named "$ARGUMENTS".

Steps:
1. If "$ARGUMENTS" is empty, ask the user for the change name before proceeding.
2. Run `openspec list` to verify the change exists. If it does not, stop and tell the user to run `/opsx-propose <change-name>` first.
3. Run `openspec instructions adr --change "$ARGUMENTS"` and capture the full output.
4. Follow those instructions exactly to author ADR files in `adr/` at the repo root (NOT inside openspec/). ADRs are immutable once written — never edit existing ones; create new superseding ADRs if needed.
5. After writing the files, run `openspec status --change "$ARGUMENTS"` and report which artifacts are now complete.
