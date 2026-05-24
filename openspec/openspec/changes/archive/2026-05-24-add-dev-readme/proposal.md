## Why

The existing README describes the template structure but doesn't tell developers how to actually run, build, or understand the code in this project — the literary game server, client, shared types, and how they work together. New contributors need a single entry point that covers setup, development workflow, and architecture.

## What Changes

- Add `DEVELOPMENT.md` covering setup instructions for both server and client
- Document the project architecture (monorepo layout, server/client/shared)
- Include available npm scripts and how to run the full stack locally
- Describe the API endpoints and the HTTP polling protocol
- No modifications to existing README.md — complementary file

## Capabilities

### New Capabilities
- `dev-documentation`: Developer-focused documentation covering project setup, architecture, and workflows for a multi-service monorepo

### Modified Capabilities
*No existing capabilities are modified.*

## Impact

- New file `DEVELOPMENT.md` at project root
- No changes to existing code, configs, or the template README
