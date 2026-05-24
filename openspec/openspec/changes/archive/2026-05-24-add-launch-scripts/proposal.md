## Why

The DEVELOPMENT.md Quick Start requires two terminal windows and three commands per window (cd, npm install, npm run dev). A single `npm run dev` at the project root that launches both server and client simultaneously removes friction for new developers getting started.

## What Changes

- Add root-level `package.json` with a `dev` script that starts both server and client concurrently
- Add `concurrently` dev dependency at the root
- Update DEVELOPMENT.md Quick Start to offer the one-liner as the primary method, with the two-terminal approach as alternative

## Capabilities

### New Capabilities
- `launch-scripts`: Root-level npm scripts for launching the full development stack with a single command

### Modified Capabilities
- `dev-documentation`: Update Quick Start section in DEVELOPMENT.md to document the one-liner launch script

## Impact

- New file: `package.json` at project root with `dev` script and `concurrently` dep
- Modified file: `DEVELOPMENT.md` — update Quick Start section
- No changes to server or client code
