import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface WatchlistContextValue {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearAll: () => void;
  count: number;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useLocalStorage<string[]>("nilami_watchlist", []);

  const toggleSave = useCallback(
    (id: string) => {
      setSavedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setSavedIds]
  );

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const clearAll = useCallback(() => setSavedIds([]), [setSavedIds]);

  return (
    <WatchlistContext.Provider
      value={{ savedIds, toggleSave, isSaved, clearAll, count: savedIds.length }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist(): WatchlistContextValue {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
}
