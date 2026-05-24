## ADDED Requirements

### Requirement: Covers prerequisites and setup
The document SHALL list required tools (Node version, npm) and provide step-by-step setup instructions for both server and client.

#### Scenario: Setup completed in order
- **WHEN** a developer follows the document from the start
- **THEN** they SHALL be able to run both server and client within 5 minutes

#### Scenario: Prerequisites listed
- **WHEN** the document describes requirements
- **THEN** it SHALL specify the minimum Node.js version and that npm is required

### Requirement: Covers architecture and data flow
The document SHALL describe the project's monorepo layout and how server, client, and shared relate.

#### Scenario: Monorepo layout documented
- **WHEN** a developer reads the architecture section
- **THEN** they SHALL understand the purpose of server/, client/, and shared/ directories

#### Scenario: Data flow explained
- **WHEN** a developer reads about the API
- **THEN** they SHALL understand the HTTP polling mechanism: client polls GET /api/game/:roomId, submits via POST /api/turn and POST /api/reveal

### Requirement: Covers run commands
The document SHALL provide the exact terminal commands to start the server and client in development mode.

#### Scenario: Server started
- **WHEN** a developer runs the server command
- **THEN** the server SHALL start on port 3001

#### Scenario: Client started
- **WHEN** a developer runs the client command
- **THEN** the client SHALL start on port 5173 and proxy API requests to the server
