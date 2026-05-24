import { useEffect, useRef, useState } from "react";
import type { GameState } from "../../../shared/types";

const POLL_INTERVAL = 2000;

export function useGamePolling(roomCode: string | null) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!roomCode) return;

    async function fetchState() {
      try {
        const res = await fetch(`/api/game/${roomCode}`);
        if (!res.ok) return;
        const data = await res.json();
        setGameState(data.gameState);
      } catch {
        // network error — will retry on next interval
      }
    }

    fetchState();
    intervalRef.current = setInterval(fetchState, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [roomCode]);

  return gameState;
}
