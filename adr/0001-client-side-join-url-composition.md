# 0001. Client-side join URL composition

- Status: accepted
- Date: 2026-05-25

## Context

Players need a shareable link to invite others into a game lobby. Two approaches were considered: (1) have the server return a fully-qualified join URL in the game state response, or (2) have the client compose the URL from `window.location.origin` and the room ID it already holds.

The server has no reliable knowledge of the public-facing domain or port the application is served from, and introducing that configuration adds deployment complexity without functional benefit.

## Decision

Join URLs are composed entirely on the client:

```
const joinUrl = `${window.location.origin}/join/${gs.id}`;
```

The server does not generate or return join URLs. The join URL format is `/join/<roomId>`.

## Consequences

- **Positive**: No server configuration required for the public hostname; the URL is always correct for the environment the client is running in (localhost, staging, production).
- **Positive**: Simpler server — no URL assembly logic or environment variables for public domain.
- **Negative**: If the join route path changes (e.g., `/join/` → `/room/`), clients that compose the URL must be updated in sync; there is no single source of truth on the server.
- **Neutral**: Deep-link handling and canonical URL management remain the client's responsibility.
