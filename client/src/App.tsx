import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "./i18n/useTranslation";
import { useGamePolling } from "./hooks/useGamePolling";
import CreateGame from "./pages/CreateGame";
import GameView from "./pages/GameView";
import type { GameState } from "../../shared/types";

function getInitialLanguage(): string {
  return localStorage.getItem("language") || "en";
}

export default function App() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>(getInitialLanguage);
  const gameState = useGamePolling(roomCode);
  const { t } = useTranslation(language);

  function handleLanguageChange(newLang: string) {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t("app.title")}</h1>
        {!roomCode && (
          <select
            className="language-switcher"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="uk">Українська</option>
          </select>
        )}
      </header>
      {error && <div className="error-banner">{error}</div>}
      <Routes>
        <Route
          path="/"
          element={
            <CreateGame
              language={language}
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
                language={language}
                onLanguageChange={handleLanguageChange}
                onError={setError}
              />
            ) : (
              <CreateGame
                language={language}
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
