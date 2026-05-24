Apply the implementation tasks for the OpenSpec change named "$ARGUMENTS".

Steps:
1. If "$ARGUMENTS" is empty, ask the user for the change name before proceeding.
2. Run `openspec list` to verify the change exists. If it does not, stop and tell the user to run `/opsx-propose <change-name>` first.
3. Run `openspec status --change "$ARGUMENTS"` to confirm all required artifacts (proposal, specs, tasks) are present. If any are missing, stop and tell the user which commands to run first.
4. Run `openspec instructions apply --change "$ARGUMENTS"` and capture the full output.
5. Follow those instructions: read context files, work through each pending `- [ ]` task in `tasks.md`, mark each complete as you finish it.
6. Pause and ask for clarification if you hit a blocker rather than guessing.
7. When all tasks are done, remind the user to run `openspec archive "$ARGUMENTS"` to merge the change into the main specs.
