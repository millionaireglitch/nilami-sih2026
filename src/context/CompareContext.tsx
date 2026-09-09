import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const MAX_COMPARE = 3;

interface CompareContextValue {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  canAddMore: boolean;
  count: number;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useLocalStorage<string[]>("nilami_compare", []);

  const addToCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => {
        if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
        return [...prev, id];
      });
    },
    [setCompareIds]
  );

  const removeFromCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => prev.filter((x) => x !== id));
    },
    [setCompareIds]
  );

  const isInCompare = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  const clearCompare = useCallback(() => setCompareIds([]), [setCompareIds]);

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        canAddMore: compareIds.length < MAX_COMPARE,
        count: compareIds.length,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
