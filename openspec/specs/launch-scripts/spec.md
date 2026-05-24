## Purpose

Defines the root-level development launch experience. Enables a single `npm run dev` command from the project root to start both the Express server and Vite client concurrently.

## Requirements

### Requirement: Root dev script launches both server and client
The root `npm run dev` SHALL start both the server and client processes concurrently.

#### Scenario: One-command launch
- **WHEN** a developer runs `npm run dev` at the project root
- **THEN** both the server (port 3001) and client (port 5173) SHALL start, with output from both processes displayed in the same terminal with distinguishable prefixes

### Requirement: Output is distinguishable
The concurrently-spawned processes SHALL show output with color-coded or prefixed labels so the developer can tell which process logged which message.

#### Scenario: Process labels shown
- **WHEN** both processes are running via `npm run dev` at root
- **THEN** each log line SHALL be prefixed with the process name (e.g., `[server]` and `[client]`)

### Requirement: Doc updated with one-liner
The DEVELOPMENT.md SHALL document the root-level `npm run dev` one-liner as the primary launch method, and the build-and-production-start flow.

#### Scenario: Quick Start updated
- **WHEN** a developer reads the Quick Start section
- **THEN** they SHALL see `npm run dev` (from project root) as the first command, with the two-terminal method as a note below it

#### Scenario: Build and production start documented
- **WHEN** a developer reads the Build & Run section
- **THEN** they SHALL see `npm run build` to build both server and client, followed by `npm run start` to run in production mode
