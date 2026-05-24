Create an OpenSpec proposal for the change named "$ARGUMENTS".

Steps:
1. If "$ARGUMENTS" is empty, ask the user for the change name before proceeding.
2. Run `openspec list` to check whether the change already exists.
3. If it does not exist, run `openspec new change "$ARGUMENTS"` to create it.
4. Run `openspec instructions proposal --change "$ARGUMENTS"` and capture the full output.
5. Follow those instructions exactly to author the proposal document at `openspec/changes/$ARGUMENTS/proposal.md`.
6. After writing the file, run `openspec status --change "$ARGUMENTS"` and report which artifacts are now complete.
