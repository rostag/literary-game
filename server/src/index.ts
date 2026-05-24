import express from "express";
import type { GameState } from "../../shared/types";
import { GameStateManager } from "./gameState";

const app = express();
const gameState = new GameStateManager();

app.use(express.json());

app.post("/api/create", (req, res) => {
  const { numPlayers, gameTheme, sentencesCount, visibleWords } = req.body;
  if (numPlayers < 2 || sentencesCount < 1 || visibleWords < 1) {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }

  const roomCode = gameState.createRoom({ numPlayers, gameTheme, sentencesCount, visibleWords, language: DEFAULT_LANGUAGE });
  const player = gameState.addPlayer(roomCode, "Host");
  if (!player) {
    res.status(500).json({ error: "Failed to create room" });
    return;
  }

  res.json({ roomCode, playerId: player.id });
});

app.post("/api/join", (req, res) => {
  const { roomCode, playerName } = req.body;
  if (!roomCode || !playerName) {
    res.status(400).json({ error: "Room code and player name required" });
    return;
  }

  const room = gameState.getRoom(roomCode);
  if (!room || room.phase !== "lobby") {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  if (room.players.length >= room.config.numPlayers) {
    res.status(400).json({ error: "Game is full" });
    return;
  }

  const player = gameState.addPlayer(roomCode, playerName);
  if (!player) {
    res.status(500).json({ error: "Failed to join" });
    return;
  }

  if (room.players.length === room.config.numPlayers) {
    gameState.startGame(roomCode);
  }

  res.json({ playerId: player.id, gameState: room });
});

app.get("/api/game/:roomId", (req, res) => {
  const room = gameState.getRoom(req.params.roomId);
  if (!room) {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  res.json({ gameState: room });
});

app.post("/api/turn", (req, res) => {
  const { roomCode, playerId, completion, newSentence } = req.body;
  if (!roomCode || !playerId || completion === undefined || !newSentence) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const updated = gameState.submitTurn(roomCode, playerId, completion, newSentence);
  if (!updated) {
    res.status(409).json({ error: "Invalid turn or not your turn" });
    return;
  }

  if (updated.phase === "reveal") {
    console.log(`[GAME OVER] ${roomCode}:`, updated.fullRevealText);
  }

  res.json({ gameState: updated });
});

app.post("/api/reveal", (req, res) => {
  const { roomCode, playerId } = req.body;
  if (!roomCode || !playerId) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const result = gameState.reveal(roomCode, playerId);
  if (!result) {
    res.status(400).json({ error: "Cannot reveal" });
    return;
  }

  console.log(`[GAME OVER] ${roomCode}:`, result.fullRevealText);
  res.json({ fullText: result.fullRevealText });
});

const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || "en";
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Default language: ${DEFAULT_LANGUAGE}`);
});
