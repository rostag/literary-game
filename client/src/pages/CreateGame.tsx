import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";
import type { GameConfig } from "../../../shared/types";

const DEFAULT_LANG = "en";

export default function CreateGame({
  onJoin,
  onError,
}: {
  onJoin: (roomCode: string, playerId: string) => void;
  onError: (err: string | null) => void;
}) {
  const navigate = useNavigate();
  const { t, translateServerError } = useTranslation(DEFAULT_LANG);
  const [config, setConfig] = useState<GameConfig>({
    numPlayers: 3,
    gameTheme: "",
    sentencesCount: 5,
    visibleWords: 3,
    language: DEFAULT_LANG,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GameConfig, string>>>({});
  const [joinCode, setJoinCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [mode, setMode] = useState<"create" | "join">("create");
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const e: Partial<Record<keyof GameConfig, string>> = {};
    if (config.numPlayers < 2) e.numPlayers = t("create.minPlayers");
    if (config.sentencesCount < 1) e.sentencesCount = t("create.minSentences");
    if (config.visibleWords < 1) e.visibleWords = t("create.minWords");
    if (!config.gameTheme.trim()) e.gameTheme = t("create.themeRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleCreate() {
    if (!validate()) return;
    setLoading(true);
    onError(null);
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!res.ok) {
        onError(translateServerError(data.error) || t("error.createFailed"));
        return;
      }
      onJoin(data.roomCode, data.playerId);
      navigate(`/join/${data.roomCode}`);
    } catch {
      onError(t("error.network"));
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin() {
    if (!joinCode.trim() || !playerName.trim()) return;
    setLoading(true);
    onError(null);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomCode: joinCode.trim().toUpperCase(), playerName: playerName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        onError(translateServerError(data.error) || t("error.joinFailed"));
        return;
      }
      onJoin(joinCode.trim().toUpperCase(), data.playerId);
      navigate(`/join/${joinCode.trim().toUpperCase()}`);
    } catch {
      onError(t("error.network"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="mode-toggle">
        <button className={mode === "create" ? "active" : ""} onClick={() => setMode("create")}>
          {t("mode.create")}
        </button>
        <button className={mode === "join" ? "active" : ""} onClick={() => setMode("join")}>
          {t("mode.join")}
        </button>
      </div>

      {mode === "create" ? (
        <div className="form">
          <h2>{t("create.heading")}</h2>

          <label>
            {t("create.theme")}
            <input
              value={config.gameTheme}
              onChange={(e) => setConfig({ ...config, gameTheme: e.target.value })}
              placeholder={t("create.themePlaceholder")}
            />
            {errors.gameTheme && <span className="error">{errors.gameTheme}</span>}
          </label>

          <label>
            {t("create.numPlayers")}
            <input
              type="number"
              min={2}
              max={10}
              value={config.numPlayers}
              onChange={(e) => setConfig({ ...config, numPlayers: Math.max(2, parseInt(e.target.value) || 2) })}
            />
            {errors.numPlayers && <span className="error">{errors.numPlayers}</span>}
          </label>

          <label>
            {t("create.sentencesCount")}
            <input
              type="number"
              min={1}
              value={config.sentencesCount}
              onChange={(e) => setConfig({ ...config, sentencesCount: Math.max(1, parseInt(e.target.value) || 1) })}
            />
            {errors.sentencesCount && <span className="error">{errors.sentencesCount}</span>}
          </label>

          <label>
            {t("create.visibleWords")}
            <input
              type="number"
              min={1}
              value={config.visibleWords}
              onChange={(e) => setConfig({ ...config, visibleWords: Math.max(1, parseInt(e.target.value) || 1) })}
            />
            {errors.visibleWords && <span className="error">{errors.visibleWords}</span>}
          </label>

          <button className="primary" onClick={handleCreate} disabled={loading}>
            {loading ? t("create.creatingButton") : t("create.createButton")}
          </button>
        </div>
      ) : (
        <div className="form">
          <h2>{t("join.heading")}</h2>

          <label>
            {t("join.name")}
            <input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t("join.namePlaceholder")}
            />
          </label>

          <label>
            {t("join.roomCode")}
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder={t("join.codePlaceholder")}
              maxLength={6}
            />
          </label>

          <button className="primary" onClick={handleJoin} disabled={loading}>
            {loading ? t("join.joiningButton") : t("join.joinButton")}
          </button>
        </div>
      )}
    </div>
  );
}
