import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NilvaaTier = 'basic' | 'premium' | 'advanced' | 'vip';

export type NilvaaActionType =
  | 'register'
  | 'save_auction'
  | 'bid_intent'
  | 'set_alert'
  | 'compare'
  | 'view_detail'
  | 'profile_complete';

export interface NilvaaActionRecord {
  id: string;
  type: NilvaaActionType;
  description: string;
  timestamp: number;
  meta?: Record<string, unknown>;
}

export interface NilvaaTierInfo {
  tier: NilvaaTier;
  label: string;
  tagline: string;
  colorClasses: {
    bg: string;
    text: string;
    border: string;
    badge: string;
    dot: string;
    ring: string;
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Per-type action caps to prevent gaming */
const ACTION_CAPS: Partial<Record<NilvaaActionType, number>> = {
  register: 1,
  view_detail: 5,
  profile_complete: 1,
};

export const TIER_ORDER: NilvaaTier[] = ['basic', 'premium', 'advanced', 'vip'];

export const TIER_CONFIG: Record<NilvaaTier, NilvaaTierInfo> = {
  basic: {
    tier: 'basic',
    label: 'Basic',
    tagline: 'Just getting started',
    colorClasses: {
      bg: 'bg-slate-50',
      text: 'text-slate-600',
      border: 'border-slate-200',
      badge: 'bg-slate-100 text-slate-600',
      dot: 'bg-slate-400',
      ring: 'ring-slate-300',
    },
  },
  premium: {
    tier: 'premium',
    label: 'Premium',
    tagline: 'Serious bidder',
    colorClasses: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-700',
      dot: 'bg-blue-500',
      ring: 'ring-blue-300',
    },
  },
  advanced: {
    tier: 'advanced',
    label: 'Advanced',
    tagline: 'Power user',
    colorClasses: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-700',
      dot: 'bg-indigo-500',
      ring: 'ring-indigo-300',
    },
  },
  vip: {
    tier: 'vip',
    label: 'VIP',
    tagline: 'Elite member',
    colorClasses: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-700',
      dot: 'bg-amber-500',
      ring: 'ring-amber-300',
    },
  },
};

// ─── Tier computation ─────────────────────────────────────────────────────────

function computeTier(totalActions: number, savedQualifiedCount: number): NilvaaTier {
  if (totalActions >= 15) return 'vip';
  if (totalActions >= 8) return 'advanced';
  if (savedQualifiedCount >= 4) return 'premium';
  return 'basic';
}

interface ProgressResult {
  current: number;
  max: number;
  toNextPercent: number;
  requirement: string;
}

function computeProgress(
  tier: NilvaaTier,
  totalActions: number,
  savedQualifiedCount: number
): ProgressResult {
  switch (tier) {
    case 'basic':
      return {
        current: savedQualifiedCount,
        max: 4,
        toNextPercent: Math.min(100, Math.round((savedQualifiedCount / 4) * 100)),
        requirement: `Save or bid on ${Math.max(0, 4 - savedQualifiedCount)} more auction(s) to reach Premium`,
      };
    case 'premium':
      return {
        current: totalActions,
        max: 8,
        toNextPercent: Math.min(100, Math.round((totalActions / 8) * 100)),
        requirement: `${Math.max(0, 8 - totalActions)} more action(s) to reach Advanced`,
      };
    case 'advanced':
      return {
        current: totalActions,
        max: 15,
        toNextPercent: Math.min(100, Math.round((totalActions / 15) * 100)),
        requirement: `${Math.max(0, 15 - totalActions)} more action(s) to reach VIP`,
      };
    case 'vip':
      return {
        current: 15,
        max: 15,
        toNextPercent: 100,
        requirement: "You've reached the highest tier — VIP status!",
      };
  }
}

// ─── Context definition ───────────────────────────────────────────────────────

interface NilvaaContextValue {
  tier: NilvaaTier;
  tierInfo: NilvaaTierInfo;
  totalActions: number;
  savedQualifiedCount: number;
  actions: NilvaaActionRecord[];
  welcomeActive: boolean;
  dismissWelcome: () => void;
  logAction: (
    type: NilvaaActionType,
    description: string,
    meta?: Record<string, unknown>
  ) => boolean;
  progressToNext: number;
  progressCurrent: number;
  progressMax: number;
  nextTierRequirement: string;
  resetForDemo: () => void;
}

const NilvaaContext = createContext<NilvaaContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function NilvaaProvider({ children }: { children: React.ReactNode }) {
  const [actions, setActions] = useLocalStorage<NilvaaActionRecord[]>('nilvaa_actions_v1', []);
  const [welcomeSeen, setWelcomeSeen] = useLocalStorage<boolean>('nilvaa_welcome_v1', false);

  const totalActions = actions.length;

  const savedQualifiedCount = useMemo(
    () => actions.filter((a) => a.type === 'save_auction' || a.type === 'bid_intent').length,
    [actions]
  );

  const tier = useMemo(
    () => computeTier(totalActions, savedQualifiedCount),
    [totalActions, savedQualifiedCount]
  );

  const tierInfo = TIER_CONFIG[tier];

  const { current, max, toNextPercent, requirement } = useMemo(
    () => computeProgress(tier, totalActions, savedQualifiedCount),
    [tier, totalActions, savedQualifiedCount]
  );

  const welcomeActive = !welcomeSeen;

  const dismissWelcome = useCallback(() => {
    setWelcomeSeen(true);
  }, [setWelcomeSeen]);

  const logAction = useCallback(
    (type: NilvaaActionType, description: string, meta?: Record<string, unknown>): boolean => {
      const cap = ACTION_CAPS[type];
      if (cap !== undefined) {
        const existing = actions.filter((a) => a.type === type).length;
        if (existing >= cap) return false;
      }
      const record: NilvaaActionRecord = {
        id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        type,
        description,
        timestamp: Date.now(),
        meta,
      };
      setActions((prev) => [...prev, record]);
      return true;
    },
    [actions, setActions]
  );

  const resetForDemo = useCallback(() => {
    setActions([]);
    setWelcomeSeen(false);
  }, [setActions, setWelcomeSeen]);

  const value: NilvaaContextValue = {
    tier,
    tierInfo,
    totalActions,
    savedQualifiedCount,
    actions,
    welcomeActive,
    dismissWelcome,
    logAction,
    progressToNext: toNextPercent,
    progressCurrent: current,
    progressMax: max,
    nextTierRequirement: requirement,
    resetForDemo,
  };

  return <NilvaaContext.Provider value={value}>{children}</NilvaaContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useNilvaa(): NilvaaContextValue {
  const ctx = useContext(NilvaaContext);
  if (!ctx) throw new Error('useNilvaa must be used inside <NilvaaProvider>');
  return ctx;
}
