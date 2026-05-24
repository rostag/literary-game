## Context

The project is a monorepo with three directories: `server/` (Express + TypeScript), `client/` (Vite + React + TypeScript), and `shared/` (common types). There is an existing `README.md` describing the intent-driven template but nothing that helps a developer understand or run the project code.

## Goals / Non-Goals

**Goals:**
- Document prerequisite setup (Node version, package manager)
- Cover both server and client setup + run commands
- Explain the project architecture and data flow (HTTP polling)
- List available API endpoints with request/response shapes
- Outline how to contribute (code structure, naming conventions)

**Non-Goals:**
- Replacing or modifying the existing README.md
- In-depth API reference (keep it concise)
- Deployment instructions
- Tutorial on the literary game rules

## Decisions

- **File name**: `DEVELOPMENT.md` — conventional, clearly signals developer audience, coexists with `README.md`
- **Structure**: sections in dependency order — prerequisites → setup → run → architecture → API → contributing
- **Audience**: a developer who has cloned the repo and wants to start coding within 5 minutes
- **No code-level API docs** — inline source comments are sufficient; DEVELOPMENT.md focuses on getting started and the big picture

## Risks / Trade-offs

- [Docs go stale] → DEVELOPMENT.md must be updated when endpints or architecture change. Mitigation: keep it concise so updates are low-effort
- [Redundant with README] → Mitigation: README.md stays focused on template usage, DEVELOPMENT.md stays focused on project code
