## Context

The project has individual build commands for server (`npm run build` → `tsc`) and client (`npm run build` → `tsc -b && vite build`), but no root-level command to build both at once. Developers must remember to run both separately.

## Goals / Non-Goals

**Goals:**
- Single `npm run build` at root that builds both server and client
- Single `npm run start` at root that runs the production server and serves the built client
- Document the build-and-run flow in DEVELOPMENT.md

**Non-Goals:**
- CI/CD pipeline configuration
- Dockerization
- Deployment scripts
- Minification or bundling beyond what Vite already does

## Decisions

1. **Reuse `concurrently` for build** — The root already has `concurrently` for the `dev` command. Using it for `build` keeps the pattern consistent and avoids new dependencies.

2. **Server serves built client in production** — The Express server already has the capability to serve static files. The production `start` script runs the compiled server from `server/dist/`, and the server serves `client/dist/`.

3. **No new config files** — Both server and client already have working build configs (`tsconfig.json`, `vite.config.ts`). The root build just orchestrates them.

## Risks / Trade-offs

- **Build order** — Client build doesn't depend on server build, so they can run in parallel. If a future change introduces shared types that need compilation first, the build command would need `--sequential` flag. For now, parallelism is fine.
- **Client/dist not served** — If `start` is run without first running `build`, the server will fail to find client files. Mitigation: document the prerequisite clearly in DEVELOPMENT.md.
