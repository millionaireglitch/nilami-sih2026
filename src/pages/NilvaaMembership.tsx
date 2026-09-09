import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  Zap,
  BadgeCheck,
  Sparkles,
  Bookmark,
  Gavel,
  Bell,
  Eye,
  UserCheck,
  UserPlus,
  Scale,
  Gift,
  CheckCircle2,
  Lock,
  X,
  RotateCcw,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  useNilvaa,
  TIER_CONFIG,
  TIER_ORDER,
} from '@/context/NilvaaContext';
import type { NilvaaTier, NilvaaActionType } from '@/context/NilvaaContext';
import { cn } from '@/utils/cn';

// ─── Static data ──────────────────────────────────────────────────────────────

const TIER_REQUIREMENTS: Record<NilvaaTier, string> = {
  basic: 'Automatic on registration',
  premium: 'Save or bid on 4+ auctions',
  advanced: '8+ total meaningful actions',
  vip: '15+ total actions',
};

const TIER_BENEFITS: Record<NilvaaTier, string[]> = {
  basic: [
    'Free access to all auction listings',
    'Save up to 5 auctions to watchlist',
    '1 active price alert',
    'Standard search and filters',
    'Beginner guides and tutorials',
  ],
  premium: [
    'Unlimited auction saves',
    'Up to 5 active price alerts',
    'EMD amount guidance per listing',
    'Priority document checklist',
    'Premium member badge',
  ],
  advanced: [
    '24-hour early access to new listings',
    'Compare up to 5 auctions simultaneously',
    'Legal document checklist per listing',
    'Bank auction calendar access',
    'SMS + email alerts',
  ],
  vip: [
    'Personal auction advisor',
    'First-look at high-value auctions',
    'EMD payment assistance & guidance',
    'Priority support (response < 4 hours)',
    'VIP member badge',
    'Quarterly market intelligence report',
  ],
};

interface EarnAction {
  type: NilvaaActionType;
  icon: React.ElementType;
  label: string;
  description: string;
  badge: string;
  badgeColor: string;
  cap: number | null;
  simulateDescription: string;
}

const EARN_ACTIONS: EarnAction[] = [
  {
    type: 'save_auction',
    icon: Bookmark,
    label: 'Save an Auction',
    description: 'Bookmark any listing to your watchlist',
    badge: 'Saved / Qualified',
    badgeColor: 'bg-blue-50 text-blue-700 border border-blue-100',
    cap: null,
    simulateDescription: 'Saved an auction to watchlist',
  },
  {
    type: 'bid_intent',
    icon: Gavel,
    label: 'Register to Bid',
    description: 'Click "Register to Bid" or "Bid Now" on any listing',
    badge: 'Saved / Qualified',
    badgeColor: 'bg-blue-50 text-blue-700 border border-blue-100',
    cap: null,
    simulateDescription: 'Registered intent to bid on an auction',
  },
  {
    type: 'set_alert',
    icon: Bell,
    label: 'Set a Price Alert',
    description: 'Create a keyword or price-range notification',
    badge: 'Meaningful Action',
    badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    cap: null,
    simulateDescription: 'Created a new price alert',
  },
  {
    type: 'compare',
    icon: Scale,
    label: 'Compare Auctions',
    description: 'Add two or more listings to the comparison panel',
    badge: 'Meaningful Action',
    badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    cap: null,
    simulateDescription: 'Compared multiple auction listings',
  },
  {
    type: 'view_detail',
    icon: Eye,
    label: 'Explore Listings',
    description: 'Open auction detail pages (counts up to 5 times)',
    badge: 'Meaningful Action',
    badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    cap: 5,
    simulateDescription: 'Explored an auction listing in detail',
  },
  {
    type: 'profile_complete',
    icon: UserCheck,
    label: 'Complete Profile / KYC',
    description: 'Fill profile details and upload KYC documents',
    badge: 'Meaningful Action',
    badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    cap: 1,
    simulateDescription: 'Completed profile and KYC details',
  },
];

const ACTION_LABELS: Record<NilvaaActionType, string> = {
  register: 'Registered',
  save_auction: 'Saved Auction',
  bid_intent: 'Registered to Bid',
  set_alert: 'Set Alert',
  compare: 'Compared Listings',
  view_detail: 'Explored Listing',
  profile_complete: 'Completed Profile',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TierIconEl({ tier, size = 'md', className }: { tier: NilvaaTier; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const cls = className ?? (size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5');
  switch (tier) {
    case 'vip':      return <Crown className={cls} />;
    case 'advanced': return <Zap className={cls} />;
    case 'premium':  return <BadgeCheck className={cls} />;
    default:         return <Sparkles className={cls} />;
  }
}

function ActionIcon({ type, className }: { type: NilvaaActionType; className?: string }) {
  const cls = cn('w-4 h-4', className);
  switch (type) {
    case 'save_auction': return <Bookmark className={cls} />;
    case 'bid_intent': return <Gavel className={cls} />;
    case 'set_alert': return <Bell className={cls} />;
    case 'compare': return <Scale className={cls} />;
    case 'view_detail': return <Eye className={cls} />;
    case 'profile_complete': return <UserCheck className={cls} />;
    case 'register': return <UserPlus className={cls} />;
    default: return <CheckCircle2 className={cls} />;
  }
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function NilvaaMembership() {
  const {
    tier,
    tierInfo,
    totalActions,
    savedQualifiedCount,
    actions,
    welcomeActive,
    dismissWelcome,
    logAction,
    progressToNext,
    progressCurrent,
    progressMax,
    nextTierRequirement,
    resetForDemo,
  } = useNilvaa();

  const [feedback, setFeedback] = useState<Record<string, string | null>>({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const currentTierIdx = TIER_ORDER.indexOf(tier);
  const recentActions = [...actions].reverse().slice(0, 10);

  function handleSimulate(action: EarnAction) {
    const counted = logAction(action.type, action.simulateDescription);
    setFeedback((prev) => ({
      ...prev,
      [action.type]: counted ? 'Counted! +1 action' : 'Cap reached for this action',
    }));
    setTimeout(
      () => setFeedback((prev) => ({ ...prev, [action.type]: null })),
      2500
    );
  }

  function countUsed(type: NilvaaActionType): number {
    return actions.filter((a) => a.type === type).length;
  }

  return (
    <div className="bg-surface-bg">

      {/* ── Welcome Banner ─────────────────────────────────────────────────── */}
      {welcomeActive && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Gift className="w-4 h-4 text-amber-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-900">
                Welcome to NILVAA — Your benefits are ready!
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                You've joined as a Basic member. Save 4+ auctions to unlock Premium, or reach 8 actions for Advanced.
              </p>
            </div>
            <button
              onClick={dismissWelcome}
              className="shrink-0 w-6 h-6 rounded-full hover:bg-amber-200 flex items-center justify-center transition-colors text-amber-700"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-navy-300">
                  NILVAA Member
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Your Membership
              </h1>
              <p className="mt-2 text-navy-300 text-sm sm:text-base max-w-lg">
                The more you explore, save, and bid — the more benefits you unlock. Every action moves you closer to VIP status.
              </p>
            </div>
            {/* Current tier badge */}
            <div className={cn(
              'shrink-0 hidden sm:flex flex-col items-center gap-1.5 px-5 py-4 rounded-xl border',
              tier === 'vip' ? 'bg-amber-500/10 border-amber-400/30' :
              tier === 'advanced' ? 'bg-indigo-500/10 border-indigo-400/30' :
              tier === 'premium' ? 'bg-blue-500/10 border-blue-400/30' :
              'bg-white/5 border-white/10'
            )}>
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center',
                tier === 'vip' ? 'bg-amber-400/20 text-amber-300' :
                tier === 'advanced' ? 'bg-indigo-400/20 text-indigo-300' :
                tier === 'premium' ? 'bg-blue-400/20 text-blue-300' :
                'bg-white/10 text-white/60'
              )}>
                <TierIconEl tier={tier} size="lg" />
              </div>
              <p className={cn(
                'text-sm font-bold',
                tier === 'vip' ? 'text-amber-300' :
                tier === 'advanced' ? 'text-indigo-300' :
                tier === 'premium' ? 'text-blue-300' :
                'text-white/70'
              )}>
                {tierInfo.label}
              </p>
              <p className="text-[11px] text-navy-400 font-medium">{tierInfo.tagline}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-white/5 rounded-lg p-4 border border-white/8">
              <p className="text-2xl font-bold text-white">{totalActions}</p>
              <p className="text-xs text-navy-400 mt-0.5 font-medium">Total Actions</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/8">
              <p className="text-2xl font-bold text-white">{savedQualifiedCount}</p>
              <p className="text-xs text-navy-400 mt-0.5 font-medium">Saved / Qualified</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/8">
              <p className={cn(
                "text-2xl font-bold",
                tier === 'vip' ? 'text-amber-300' :
                tier === 'advanced' ? 'text-indigo-300' :
                tier === 'premium' ? 'text-blue-300' :
                'text-white/70'
              )}>
                {tierInfo.label}
              </p>
              <p className="text-xs text-navy-400 mt-0.5 font-medium">Current Tier</p>
            </div>
          </div>

          {/* Progress track */}
          <div className="mb-8">
            <div className="flex items-center">
              {TIER_ORDER.map((t, i) => {
                const isActive = i <= currentTierIdx;
                const isCurrent = t === tier;
                const conf = TIER_CONFIG[t];
                return (
                  <React.Fragment key={t}>
                    {i > 0 && (
                      <div className={cn(
                        'flex-1 h-0.5 mx-2',
                        isActive ? 'bg-white/60' : 'bg-white/15'
                      )} />
                    )}
                    <div className="flex flex-col items-center gap-2">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all border-2',
                        isCurrent
                          ? 'bg-white border-white shadow-lg scale-110'
                          : isActive
                          ? 'bg-white/80 border-white/50'
                          : 'bg-white/8 border-white/15',
                      )}>
                        <TierIconEl tier={t} className={cn(
                            'w-5 h-5',
                            isCurrent
                              ? conf.colorClasses.text
                              : isActive
                              ? conf.colorClasses.text + ' opacity-80'
                              : 'text-white/25'
                          )} />
                      </div>
                      <span className={cn(
                        'text-[11px] font-semibold',
                        isCurrent ? 'text-white' : isActive ? 'text-white/70' : 'text-white/30'
                      )}>
                        {conf.label}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Progress to next tier */}
          {tier !== 'vip' && (
            <div className="bg-white/5 border border-white/8 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-navy-400" />
                  <span className="text-sm font-semibold text-white">Progress to {TIER_CONFIG[TIER_ORDER[currentTierIdx + 1]].label}</span>
                </div>
                <span className="text-sm font-bold text-white">{progressCurrent} / {progressMax}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-700',
                    tier === 'basic' ? 'bg-blue-400' :
                    tier === 'premium' ? 'bg-indigo-400' :
                    'bg-amber-400'
                  )}
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <p className="text-xs text-navy-400 mt-2">{nextTierRequirement}</p>
            </div>
          )}

          {tier === 'vip' && (
            <div className="bg-amber-500/10 border border-amber-400/25 rounded-xl p-5 flex items-center gap-3">
              <Crown className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-300">You are VIP — the highest tier!</p>
                <p className="text-xs text-navy-400 mt-0.5">All benefits are unlocked. Thank you for being an active member of Nilami.</p>
              </div>
            </div>
          )}
        </div>
      </section>



      {/* ── Tier Roadmap ───────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-navy-900">Membership Tiers</h2>
            <p className="text-sm text-navy-500 mt-1">Four tiers, each unlocking more powerful tools for auction success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {TIER_ORDER.map((t) => {
              const conf = TIER_CONFIG[t];
              const isUnlocked = TIER_ORDER.indexOf(t) <= currentTierIdx;
              const isCurrent = t === tier;
              const benefits = TIER_BENEFITS[t];
              return (
                <div
                  key={t}
                  className={cn(
                    'relative rounded-xl border p-5 flex flex-col transition-shadow',
                    isCurrent
                      ? cn('shadow-lg', conf.colorClasses.border, conf.colorClasses.bg)
                      : isUnlocked
                      ? 'border-surface-border bg-white'
                      : 'border-surface-border bg-surface-bg opacity-70'
                  )}
                >
                  {isCurrent && (
                    <div className={cn(
                      'absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full',
                      conf.colorClasses.badge
                    )}>
                      CURRENT
                    </div>
                  )}
                  {!isUnlocked && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                      <Lock className="w-3 h-3 text-slate-400" />
                    </div>
                  )}
                  {/* Icon */}
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center mb-3',
                    isUnlocked ? cn(conf.colorClasses.bg, conf.colorClasses.text, 'border', conf.colorClasses.border) : 'bg-slate-100 text-slate-400'
                  )}>
                    <TierIconEl tier={t} className="w-5 h-5" />
                  </div>
                  {/* Label */}
                  <h3 className={cn(
                    'text-base font-bold mb-0.5',
                    isUnlocked ? 'text-navy-900' : 'text-navy-400'
                  )}>
                    {conf.label}
                  </h3>
                  {/* Requirement */}
                  <p className={cn(
                    'text-xs mb-4',
                    isUnlocked ? 'text-navy-500' : 'text-navy-400'
                  )}>
                    {TIER_REQUIREMENTS[t]}
                  </p>
                  {/* Benefits list */}
                  <ul className="space-y-2 flex-1">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className={cn(
                          'w-3.5 h-3.5 mt-0.5 shrink-0',
                          isUnlocked ? conf.colorClasses.text : 'text-slate-300'
                        )} />
                        <span className={cn(
                          'text-xs leading-snug',
                          isUnlocked ? 'text-navy-700' : 'text-navy-400'
                        )}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Current tier benefits callout ──────────────────────────────────── */}
      <section className={cn('py-10 border-t border-b', tierInfo.colorClasses.border, tierInfo.colorClasses.bg)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', tierInfo.colorClasses.badge)}>
              <TierIconEl tier={tier} size="md" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-900">
                Your {tierInfo.label} Benefits
              </h2>
              <p className="text-sm text-navy-500">{tierInfo.tagline}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIER_BENEFITS[tier].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3.5 border border-surface-border">
                <CheckCircle2 className={cn('w-4 h-4 mt-0.5 shrink-0', tierInfo.colorClasses.text)} />
                <span className="text-sm text-navy-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Earn ────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-navy-900">Earn Your Way Up</h2>
              <p className="text-sm text-navy-500 mt-1">
                Each action below earns progress. Use the Demo button to simulate and see your tier change in real time.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-navy-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                Saved / Qualified
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" />
                Meaningful Action
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EARN_ACTIONS.map((action) => {
              const used = countUsed(action.type);
              const isCapped = action.cap !== null && used >= action.cap;
              const fb = feedback[action.type];
              const Icon = action.icon;
              return (
                <div
                  key={action.type}
                  className={cn(
                    'bg-white rounded-xl border p-5 flex flex-col gap-3 transition-all',
                    isCapped ? 'border-surface-border opacity-60' : 'border-surface-border hover:shadow-sm'
                  )}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center text-navy-600 shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{action.label}</p>
                        <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-full', action.badgeColor)}>
                          {action.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Description */}
                  <p className="text-xs text-navy-500 leading-relaxed">{action.description}</p>
                  {/* Footer */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-surface-border mt-auto">
                    {action.cap !== null ? (
                      <span className="text-xs text-navy-400 font-medium">
                        {used}/{action.cap} used
                      </span>
                    ) : (
                      <span className="text-xs text-navy-400 font-medium">
                        {used} earned
                      </span>
                    )}
                    {fb ? (
                      <span className={cn(
                        'text-xs font-semibold px-2.5 py-1 rounded-md',
                        fb.startsWith('Counted') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      )}>
                        {fb}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSimulate(action)}
                        disabled={isCapped}
                        className={cn(
                          'text-xs font-semibold px-3 py-1.5 rounded-md transition-colors',
                          isCapped
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-navy-900 text-white hover:bg-navy-700 active:scale-95'
                        )}
                      >
                        Demo: Simulate
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Activity Feed ──────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Recent Activity</h2>
              <p className="text-xs text-navy-500 mt-0.5">Last {Math.min(10, actions.length)} actions logged</p>
            </div>
            <div className="flex items-center gap-3">
              {actions.length > 0 && (
                !showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="flex items-center gap-1.5 text-xs text-navy-500 hover:text-red-600 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset demo
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-navy-500">Reset all progress?</span>
                    <button
                      onClick={() => { resetForDemo(); setShowResetConfirm(false); }}
                      className="text-xs font-semibold text-red-600 hover:text-red-700"
                    >
                      Yes, reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="text-xs text-navy-500 hover:text-navy-700"
                    >
                      Cancel
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {recentActions.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-surface-border rounded-xl">
              <Clock className="w-8 h-8 text-navy-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-navy-500">No activity yet</p>
              <p className="text-xs text-navy-400 mt-1">Use the "Demo: Simulate" buttons above to log your first actions.</p>
            </div>
          ) : (
            <div className="divide-y divide-surface-border border border-surface-border rounded-xl overflow-hidden">
              {recentActions.map((record) => (
                <div key={record.id} className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-surface-bg transition-colors">
                  <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center shrink-0 text-navy-600">
                    <ActionIcon type={record.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy-800 truncate">{record.description}</p>
                    <p className="text-xs text-navy-400">{ACTION_LABELS[record.type]}</p>
                  </div>
                  <span className="text-xs text-navy-400 whitespace-nowrap shrink-0">
                    {formatDistanceToNow(new Date(record.timestamp), { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA bottom ─────────────────────────────────────────────────────── */}
      <section className="py-10 border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-base font-bold text-navy-900">Ready to start bidding?</p>
            <p className="text-sm text-navy-500 mt-0.5">Explore government and bank auctions across India.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/explore"
              className="flex items-center gap-2 btn btn-primary text-sm px-5 py-2.5"
            >
              Browse Auctions
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/beginner-guide"
              className="text-sm font-medium text-navy-600 hover:text-navy-900 underline underline-offset-2 transition-colors"
            >
              Beginner Guide
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
