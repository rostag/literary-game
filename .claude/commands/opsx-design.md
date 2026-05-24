Create an OpenSpec technical design document for the change named "$ARGUMENTS".

Steps:
1. If "$ARGUMENTS" is empty, ask the user for the change name before proceeding.
2. Run `openspec list` to verify the change exists. If it does not, stop and tell the user to run `/opsx-propose <change-name>` first.
3. Run `openspec instructions design --change "$ARGUMENTS"` and capture the full output.
4. Follow those instructions exactly to author the design document at `openspec/changes/$ARGUMENTS/design.md`.
5. After writing the file, run `openspec status --change "$ARGUMENTS"` and report which artifacts are now complete.
