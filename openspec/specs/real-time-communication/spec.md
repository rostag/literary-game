## Purpose

Real-time communication between server and clients. **Deprecated** — replaced by HTTP polling (see [polling-sync](../polling-sync/spec.md) spec). No persistent connections are maintained; clients discover state changes via 2-second polling intervals.

### Removed: WebSocket connection

The initial implementation used WebSocket connections for real-time updates. This was replaced by HTTP polling to simplify deployment and eliminate sticky-session requirements.

**Reason**: Replaced by HTTP polling — no persistent connection is needed.

### Removed: Turn events broadcast

Turn changes and reveals were originally broadcast via WebSocket events. Now clients discover these changes on their next poll.

**Reason**: Replaced by polling — clients discover state changes on their next poll.

### Removed: Client reconnection

Reconnection logic is no longer needed since HTTP polling is stateless.

**Reason**: Replaced by polling — polling is stateless and no reconnection is needed.
