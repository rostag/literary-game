import type { GameState, GameConfig, Player, Sentence } from "../../shared/types";

export class GameStateManager {
  private rooms = new Map<string, GameState>();

  createRoom(config: GameConfig): string {
    const id = this.generateRoomCode();
    const state: GameState = {
      id,
      config,
      players: [],
      phase: "lobby",
      sentences: [],
      currentTurnIndex: 0,
      turnCount: 0,
      activePlayerId: null,
      fullRevealText: null,
      lastWords: [],
    };
    this.rooms.set(id, state);
    return id;
  }

  getRoom(id: string): GameState | undefined {
    return this.rooms.get(id);
  }

  addPlayer(roomId: string, name: string): Player | null {
    const room = this.rooms.get(roomId);
    if (!room || room.phase !== "lobby") return null;
    if (room.players.length >= room.config.numPlayers) return null;

    const player: Player = {
      id: `${roomId}-${crypto.randomUUID()}`,
      name,
    };
    room.players.push(player);
    return player;
  }

  startGame(roomId: string): GameState | null {
    const room = this.rooms.get(roomId);
    if (!room || room.phase !== "lobby") return null;
    if (room.players.length < room.config.numPlayers) return null;

    room.phase = "playing";
    room.activePlayerId = room.players[0].id;
    return room;
  }

  submitTurn(
    roomId: string,
    playerId: string,
    completion: string,
    newSentence: string
  ): GameState | null {
    const room = this.rooms.get(roomId);
    if (!room || room.phase !== "playing") return null;
    if (room.activePlayerId !== playerId) return null;

    const lastSentence = room.sentences[room.sentences.length - 1];
    if (lastSentence) {
      lastSentence.fullText += " " + completion;
    }

    const sentence: Sentence = {
      fullText: newSentence,
      startedBy: playerId,
    };
    room.sentences.push(sentence);
    room.turnCount++;

    if (room.turnCount >= room.config.sentencesCount) {
      room.phase = "reveal";
      room.fullRevealText = this.assembleFullText(room);
      room.activePlayerId = null;
      room.lastWords = [];
    } else {
      room.currentTurnIndex = (room.currentTurnIndex + 1) % room.players.length;
      room.activePlayerId = room.players[room.currentTurnIndex].id;
      room.lastWords = this.getLastWords(roomId, room.config.visibleWords);
    }

    return room;
  }

  reveal(roomId: string, playerId: string): GameState | null {
    const room = this.rooms.get(roomId);
    if (!room || room.phase !== "playing") return null;
    if (!room.players.find((p) => p.id === playerId)) return null;

    room.phase = "reveal";
    room.fullRevealText = this.assembleFullText(room);
    room.activePlayerId = null;
    room.lastWords = [];
    return room;
  }

  private getLastWords(roomId: string, count: number): string[] {
    const room = this.rooms.get(roomId);
    if (!room || room.sentences.length === 0) return [];

    const lastSentence = room.sentences[room.sentences.length - 1];
    const words = lastSentence.fullText.split(/\s+/).filter(Boolean);
    return words.slice(-count);
  }

  private assembleFullText(room: GameState): string {
    return room.sentences.map((s) => s.fullText).join(" ");
  }

  private generateRoomCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return this.rooms.has(code) ? this.generateRoomCode() : code;
  }
}
