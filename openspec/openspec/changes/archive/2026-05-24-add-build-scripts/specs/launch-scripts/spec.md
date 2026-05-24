## MODIFIED Requirements

### Requirement: Doc updated with one-liner
The DEVELOPMENT.md SHALL document the root-level `npm run dev` one-liner as the primary launch method.

#### Scenario: Quick Start updated
- **WHEN** a developer reads the Quick Start section
- **THEN** they SHALL see `npm run dev` (from project root) as the first command, with the two-terminal method as a note below it

#### Scenario: Build and production start documented
- **WHEN** a developer reads the Build & Run section
- **THEN** they SHALL see `npm run build` to build both server and client, followed by `npm run start` to run in production mode
