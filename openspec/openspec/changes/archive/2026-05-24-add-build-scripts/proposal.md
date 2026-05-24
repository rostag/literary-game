## Why

The server and client each have their own build commands, but there is no single command to build the entire application for production. Adding a root `npm run build` provides a consistent one-step build process.

## What Changes

- Add `npm run build` to root `package.json` that builds both server and client using `concurrently`
- Update `DEVELOPMENT.md` with build and production start instructions

## Capabilities

### New Capabilities
- `build-scripts`: Production build for the entire application — compiles server TypeScript and bundles client with Vite in a single command

### Modified Capabilities
- `launch-scripts`: Add a production start scenario to the spec (running the built server + serving built client)

## Impact

- Root `package.json`: new `build` script, new `start` script for production
- `DEVELOPMENT.md`: new "Build & Run" section
- No new dependencies (uses existing `concurrently` and individual build scripts)
