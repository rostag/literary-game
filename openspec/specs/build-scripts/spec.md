## Purpose

Defines the root-level build and production launch experience. Enables single-command build and production serve for the entire application.

## Requirements

### Requirement: Root build command compiles both server and client
The root `npm run build` SHALL compile the server TypeScript and bundle the client with Vite in a single command.

#### Scenario: Full build completes
- **WHEN** a developer runs `npm run build` at the project root
- **THEN** the server SHALL compile to `server/dist/` and the client SHALL bundle to `client/dist/`, with both outputs produced before the command exits

### Requirement: Root start command runs production server
The root `npm run start` SHALL run the compiled server and serve the built client static files.

#### Scenario: Production start
- **WHEN** a developer runs `npm run start` after a successful build
- **THEN** the Express server SHALL start on port 3001 and serve the built client from `client/dist/` at the root URL
