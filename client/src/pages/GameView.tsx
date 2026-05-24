import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import RulesModal from "./RulesModal";
import type { GameState } from "../../../shared/types";

export default function GameView({
  roomCode,
  playerId,
  gameState,
  language: userLanguage,
  onLanguageChange,
  onError,
}: {
  roomCode: string;
  playerId: string;
  gameState: GameState | null;
  language: string;
  onLanguageChange: (lang: string) => void;
  onError: (err: string | null) => void;
}) {
  const [completion, setCompletion] = useState("");
  const [newSentence, setNewSentence] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");

  const gs = gameState;
  const lang = userLanguage || gs?.config.language || "en";
  const { t, translateServerError } = useTranslation(lang);

  const mode = gs?.config.revealMode ?? "consensus";
  const isHost = gs ? playerId === gs.hostPlayerId : false;
  const hasPendingReveal = gs?.revealProposedBy != null;
  const isProposer = gs?.revealProposedBy === playerId;

  // Show reveal trigger: host-only → only host; others → anyone when no pending proposal
  const canTriggerReveal =
    gs?.phase === "playing" &&
    !hasPendingReveal &&
    (mode === "host-only" ? isHost : true);

  async function copyJoinLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopyMsg(t("lobby.copied"));
      setTimeout(() => setCopyMsg(""), 2000);
    } catch {
      setCopyMsg("");
    }
  }

  async function handleReveal() {
    onError(null);
    try {
      const res = await fetch("/api/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomCode, playerId }),
      });
      if (!res.ok) {
        const data = await res.json();
        onError(translateServerError(data.error) || t("error.invalidTurn"));
      }
    } catch {
      onError(t("error.network"));
    }
  }

  async function handleDeclineReveal() {
    onError(null);
    try {
      await fetch("/api/reveal/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomCode, playerId }),
      });
    } catch {
      onError(t("error.network"));
    }
  }

  const topControls = (
    <div className="top-controls">
      <button className="rules-link" onClick={() => setShowRules(true)}>
        {t("game.rules")}
      </button>
      <select
        className="language-switcher-inline"
        value={lang}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="en">EN</option>
        <option value="uk">УК</option>
      </select>
      {canTriggerReveal && (
        <button className="reveal-trigger" onClick={handleReveal}>
          {t("game.revealAll")}
        </button>
      )}
    </div>
  );

  // Voting overlay shown to non-proposers when a reveal is pending
  const votingOverlay = gs?.phase === "playing" && hasPendingReveal ? (
    <div className="voting-overlay">
      {isProposer ? (
        <p className="voting-waiting">{t("reveal.waiting")}</p>
      ) : (mode === "host-approve" && isHost) ? (
        <div className="voting-prompt">
          <p>{t("reveal.approvePrompt")}</p>
          <button className="primary" onClick={handleReveal}>{t("reveal.approve")}</button>
          <button className="secondary" onClick={handleDeclineReveal}>{t("reveal.decline")}</button>
        </div>
      ) : mode === "consensus" && !isProposer ? (
        <div className="voting-prompt">
          <p>{t("reveal.agreePrompt")}</p>
          <button className="primary" onClick={handleReveal}>{t("reveal.agree")}</button>
          <button className="secondary" onClick={handleDeclineReveal}>{t("reveal.decline")}</button>
        </div>
      ) : null}
    </div>
  ) : null;

  if (!gs) {
    return (
      <div className="page">
        {topControls}
        <h2>{t("game.loading")}</h2>
        <p>{t("game.room")} {roomCode}</p>
        {showRules && <RulesModal language={lang} onClose={() => setShowRules(false)} />}
      </div>
    );
  }

  if (gs.phase === "lobby") {
    const joinUrl = `${window.location.origin}/join/${gs.id}`;
    return (
      <div className="page">
        {topControls}
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
        <div className="join-url">
          <strong>{t("lobby.joinUrl")}</strong>
          <div className="join-url-row">
            <input readOnly value={joinUrl} onClick={(e) => (e.target as HTMLInputElement).select()} />
            <button className="secondary" onClick={() => copyJoinLink(joinUrl)}>
              {copyMsg || t("lobby.copyLink")}
            </button>
          </div>
        </div>
        {gs.players.length < gs.config.numPlayers && <p>{t("lobby.waiting")}</p>}
        {showRules && <RulesModal language={lang} onClose={() => setShowRules(false)} />}
      </div>
    );
  }

  if (gs.phase === "reveal") {
    const startSentence = gs.sentences[0]?.fullText;
    return (
      <div className="page">
        {topControls}
        <h2>{t("reveal.heading")}</h2>
        {startSentence && (
          <div className="starting-sentence">
            <p><strong>{t("reveal.startingSentence")}</strong></p>
            <p className="starting-text">{startSentence}</p>
          </div>
        )}
        <div className="story-text">{gs.fullRevealText}</div>
        <button className="secondary start-over" onClick={() => { window.location.href = "/"; }}>
          {t("game.startOver")}
        </button>
        {showRules && <RulesModal language={lang} onClose={() => setShowRules(false)} />}
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

  return (
    <div className="page">
      {topControls}
      {votingOverlay}
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
            </div>
          </>
        ) : (
          <div className="waiting-screen">
            <p>{t("game.waitingActive")}</p>
          </div>
        )}
      </div>

      {showRules && <RulesModal language={lang} onClose={() => setShowRules(false)} />}
    </div>
  );
}
