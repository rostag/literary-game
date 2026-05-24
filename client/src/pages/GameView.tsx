import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import type { GameState } from "../../../shared/types";

export default function GameView({
  roomCode,
  playerId,
  gameState,
  language: userLanguage,
  onError,
}: {
  roomCode: string;
  playerId: string;
  gameState: GameState | null;
  language: string;
  onError: (err: string | null) => void;
}) {
  const [completion, setCompletion] = useState("");
  const [newSentence, setNewSentence] = useState("");

  const gs = gameState;
  const lang = userLanguage || gs?.config.language || "en";
  const { t, translateServerError } = useTranslation(lang);

  if (!gs) {
    return (
      <div className="page">
        <h2>{t("game.loading")}</h2>
        <p>{t("game.room")} {roomCode}</p>
      </div>
    );
  }

  if (gs.phase === "lobby") {
    return (
      <div className="page">
        <h2>{t("lobby.heading")}</h2>
        <p><strong>{t("lobby.roomCode")}</strong> {gs.id}</p>
        <p><strong>{t("lobby.theme")}</strong> {gs.config.gameTheme}</p>
        <p>
          {t("lobby.players")} {gs.players.length} / {gs.config.numPlayers}
        </p>
        <ul>
          {gs.players.map((p) => (
            <li key={p.id}>{p.name} {p.id === playerId ? t("lobby.you") : ""}</li>
          ))}
        </ul>
        {gs.players.length < gs.config.numPlayers && <p>{t("lobby.waiting")}</p>}
      </div>
    );
  }

  if (gs.phase === "reveal") {
    return (
      <div className="page">
        <h2>{t("reveal.heading")}</h2>
        <div className="story-text">{gs.fullRevealText}</div>
      </div>
    );
  }

  const isMyTurn = gs.activePlayerId === playerId;

  async function handleSubmit() {
    if (!completion.trim() || !newSentence.trim()) return;
    onError(null);
    try {
      const res = await fetch("/api/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomCode, playerId, completion: completion.trim(), newSentence: newSentence.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        onError(translateServerError(data.error) || t("error.invalidTurn"));
        return;
      }
      setCompletion("");
      setNewSentence("");
    } catch {
      onError(t("error.network"));
    }
  }

  async function handleReveal() {
    onError(null);
    try {
      await fetch("/api/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomCode, playerId }),
      });
    } catch {
      onError(t("error.network"));
    }
  }

  return (
    <div className="page">
      <div className="turn-indicator">
        <span className={isMyTurn ? "my-turn" : "waiting"}>
          {isMyTurn ? t("game.yourTurn") : t("game.waiting")}
        </span>
        <span>{t("game.turnIndicator", { current: gs.turnCount + 1, total: gs.config.sentencesCount })}</span>
      </div>

      <div className="theme-badge">{t("game.themeBadge", { theme: gs.config.gameTheme })}</div>

      <div className="game-area">
        {isMyTurn ? (
          <>
            {gs.lastWords.length > 0 && (
              <div className="prompt">
                <p><strong>{t("game.lastWords", { count: gs.config.visibleWords })}</strong></p>
                <p className="last-words">{gs.lastWords.join(" ")}</p>
              </div>
            )}

            <div className="input-group">
              <label>
                {t("game.completeLabel")}
                <textarea
                  value={completion}
                  onChange={(e) => setCompletion(e.target.value)}
                  placeholder={
                    gs.turnCount === 0
                      ? t("game.startPlaceholder")
                      : t("game.completePlaceholder")
                  }
                  rows={2}
                />
              </label>
            </div>

            <div className="input-group">
              <label>
                {t("game.newSentenceLabel")}
                <textarea
                  value={newSentence}
                  onChange={(e) => setNewSentence(e.target.value)}
                  placeholder={t("game.newSentencePlaceholder")}
                  rows={2}
                />
              </label>
            </div>

            <div className="actions">
              <button className="primary" onClick={handleSubmit} disabled={!completion.trim() || !newSentence.trim()}>
                {t("game.submit")}
              </button>
              <button className="secondary" onClick={handleReveal}>
                {t("game.revealAll")}
              </button>
            </div>
          </>
        ) : (
          <div className="waiting-screen">
            <p>{t("game.waitingActive")}</p>
            <button className="secondary" onClick={handleReveal}>
              {t("game.revealAll")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
