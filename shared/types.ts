export interface Player {
  id: string;
  name: string;
}

export interface Sentence {
  fullText: string;
  startedBy: string;
}

export type RevealMode = "consensus" | "host-approve" | "host-only";

export interface GameConfig {
  numPlayers: number;
  gameTheme: string;
  sentencesCount: number;
  visibleWords: number;
  language: string;
  revealMode: RevealMode;
}

export type GamePhase = "lobby" | "playing" | "reveal";

export interface GameState {
  id: string;
  config: GameConfig;
  players: Player[];
  phase: GamePhase;
  sentences: Sentence[];
  currentTurnIndex: number;
  turnCount: number;
  activePlayerId: string | null;
  fullRevealText: string | null;
  lastWords: string[];
  hostPlayerId: string;
  revealProposedBy: string | null;
  revealVotes: string[];
}

export interface CreateGameResponse {
  roomCode: string;
  playerId: string;
}

export interface JoinGameResponse {
  playerId: string;
  gameState: GameState;
}

export interface SubmitTurnResponse {
  gameState: GameState;
}

export interface RevealResponse {
  fullText: string;
}

export interface GameStateResponse {
  gameState: GameState;
}

export interface ErrorResponse {
  error: string;
}
