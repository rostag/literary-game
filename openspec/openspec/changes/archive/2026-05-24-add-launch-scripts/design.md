## Context

The project currently requires two terminal windows to run: `cd server && npm run dev` and `cd client && npm run dev`. Adding a root-level `dev` script lets developers start the full stack with a single `npm run dev` at the project root.

## Goals / Non-Goals

**Goals:**
- Add root `package.json` with a `dev` script using `concurrently`
- Update DEVELOPMENT.md Quick Start to show the one-liner as primary
- Keep existing two-terminal approach documented as an alternative

**Non-Goals:**
- Adding a dedicated shell script file (npm script is sufficient)
- Adding a `start` or `build` script for production
- CI/CD integration

## Decisions

- **Tool**: `concurrently` — lightweight, widely used, handles color prefixing for multiple processes. Alternative considered: `npm-run-all` (requires `--parallel` flag, less clear output)
- **Script name**: `dev` — matches server and client conventions
- **Install**: `npm install` at root installs `concurrently`; server and client have their own `postinstall` (not needed — each dir handled separately)
- **Windows compatibility**: `concurrently` is cross-platform, no shell-specific syntax needed

## Risks / Trade-offs

- [Conflicting root `package.json` if one already exists] → No root `package.json` exists currently. Low risk.
- [Port conflicts] → `concurrently` just spawns both processes; if ports conflict, the error messages are clear
