import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "./i18n/useTranslation";
import { useGamePolling } from "./hooks/useGamePolling";
import CreateGame from "./pages/CreateGame";
import GameView from "./pages/GameView";
import type { GameState } from "../../shared/types";

export default function App() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const gameState = useGamePolling(roomCode);
  const { t } = useTranslation("en");

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t("app.title")}</h1>
      </header>
      {error && <div className="error-banner">{error}</div>}
      <Routes>
        <Route
          path="/"
          element={
            <CreateGame
              onJoin={(code, pid) => {
                setRoomCode(code);
                setPlayerId(pid);
              }}
              onError={setError}
            />
          }
        />
        <Route
          path="/join/:roomCode"
          element={
            roomCode ? (
              <GameView
                roomCode={roomCode}
                playerId={playerId || ""}
                gameState={gameState}
                onError={setError}
              />
            ) : (
              <CreateGame
                onJoin={(code, pid) => {
                  setRoomCode(code);
                  setPlayerId(pid);
                }}
                onError={setError}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}
