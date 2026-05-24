Create an OpenSpec implementation task list for the change named "$ARGUMENTS".

Steps:
1. If "$ARGUMENTS" is empty, ask the user for the change name before proceeding.
2. Run `openspec list` to verify the change exists. If it does not, stop and tell the user to run `/opsx-propose <change-name>` first.
3. Run `openspec instructions tasks --change "$ARGUMENTS"` and capture the full output.
4. Follow those instructions exactly to author the task list at `openspec/changes/$ARGUMENTS/tasks.md`. Each task must use checkbox format `- [ ] X.Y Description` so the apply phase can track progress.
5. After writing the file, run `openspec status --change "$ARGUMENTS"` and report which artifacts are now complete.
