import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  CheckCheck,
  Share2,
  Lock,
  CheckCircle2,
  ChevronRight,
  Users,
  Bell,
  Search,
  BarChart3,
  Star,
  Zap,
  ArrowRight,
  Gift,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";

// ── Mock referral state ──────────────────────────────────────────────────────
const MOCK_REFERRAL_CODE = "NILAMI-3W7X2";
const MOCK_REFERRALS_DONE = 3;
const REFERRALS_FOR_L2 = 4;
const REFERRALS_FOR_L3 = 8;

// ── Benefit definitions ──────────────────────────────────────────────────────
interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  level: 1 | 2 | 3;
}

const ALL_BENEFITS: Benefit[] = [
  // Level 1 — all members
  {
    id: "b1",
    title: "Personalised Auction Suggestions",
    description: "See auction listings tailored to your category, location and budget preferences.",
    icon: Star,
    level: 1,
  },
  {
    id: "b2",
    title: "Saved Searches",
    description: "Save your search filters and pick up right where you left off.",
    icon: Search,
    level: 1,
  },
  {
    id: "b3",
    title: "Auction Alerts",
    description: "Receive notifications when auctions matching your criteria go live or close.",
    icon: Bell,
    level: 1,
  },
  // Level 2 — 4 referrals
  {
    id: "b4",
    title: "Premium Discovery Filters",
    description: "Access advanced filters including EMD range, auction source, asset condition and more.",
    icon: Zap,
    level: 2,
  },
  {
    id: "b5",
    title: "Priority Auction Alerts",
    description: "Get early alerts before new auctions are listed on the public marketplace.",
    icon: Bell,
    level: 2,
  },
  {
    id: "b6",
    title: "Additional Marketplace Insights",
    description: "See reserve price trends, auction frequency and demand signals for categories you follow.",
    icon: BarChart3,
    level: 2,
  },
  // Level 3 — 8 referrals
  {
    id: "b7",
    title: "Advanced Comparison Tools",
    description: "Compare up to 6 auctions side-by-side across price, EMD, documents and more.",
    icon: BarChart3,
    level: 3,
  },
  {
    id: "b8",
    title: "Premium Research Features",
    description: "Access deeper asset details and verification reports for shortlisted auctions.",
    icon: Search,
    level: 3,
  },
  {
    id: "b9",
    title: "Exclusive Platform Benefits",
    description: "Platform benefits configured by Nilami's team — updated periodically.",
    icon: Gift,
    level: 3,
  },
];

// ── Progression steps ────────────────────────────────────────────────────────
const STEPS = [
  { id: "register", label: "New Member", desc: "Create your free account" },
  { id: "explore", label: "Explore", desc: "Browse & discover auctions" },
  { id: "save", label: "Save", desc: "Save searches & auctions" },
  { id: "refer", label: "Refer", desc: "Invite trusted contacts" },
  { id: "unlock", label: "Unlock Benefits", desc: "Benefits scale as you refer" },
];

// ── Level cards ──────────────────────────────────────────────────────────────
interface LevelInfo {
  level: 1 | 2 | 3;
  title: string;
  subtitle: string;
  requirement: string;
  color: { ring: string; bg: string; accent: string; badge: string };
}

const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: "Level 1",
    subtitle: "All Members",
    requirement: "Available on registration",
    color: {
      ring: "ring-emerald-200",
      bg: "bg-emerald-50",
      accent: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
    },
  },
  {
    level: 2,
    title: "Level 2",
    subtitle: "Active Referrer",
    requirement: `${REFERRALS_FOR_L2} verified referrals`,
    color: {
      ring: "ring-blue-200",
      bg: "bg-blue-50",
      accent: "text-blue-700",
      badge: "bg-blue-100 text-blue-700",
    },
  },
  {
    level: 3,
    title: "Level 3",
    subtitle: "Top Referrer",
    requirement: `${REFERRALS_FOR_L3} verified referrals`,
    color: {
      ring: "ring-amber-200",
      bg: "bg-amber-50",
      accent: "text-amber-700",
      badge: "bg-amber-100 text-amber-700",
    },
  },
];

function BenefitCard({
  benefit,
  unlocked,
}: {
  benefit: Benefit;
  unlocked: boolean;
}) {
  const Icon = benefit.icon;
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border transition-colors",
        unlocked
          ? "bg-white border-surface-border"
          : "bg-surface-bg border-surface-border opacity-60"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
          unlocked ? "bg-navy-50" : "bg-slate-100"
        )}
      >
        {unlocked ? (
          <Icon className="w-4 h-4 text-navy-600" />
        ) : (
          <Lock className="w-4 h-4 text-slate-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p
            className={cn(
              "text-sm font-medium",
              unlocked ? "text-navy-900" : "text-slate-500"
            )}
          >
            {benefit.title}
          </p>
          {unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
        </div>
        <p className={cn("text-xs leading-relaxed", unlocked ? "text-slate-500" : "text-slate-400")}>
          {benefit.description}
        </p>
      </div>
    </div>
  );
}

export default function EarnBenefits() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);

  // Derive current level from referral count
  const currentLevel: 1 | 2 | 3 =
    MOCK_REFERRALS_DONE >= REFERRALS_FOR_L3
      ? 3
      : MOCK_REFERRALS_DONE >= REFERRALS_FOR_L2
      ? 2
      : 1;

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_REFERRAL_CODE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Nilami",
        text: `I use Nilami to discover verified government and bank auctions. Join with my code ${MOCK_REFERRAL_CODE}`,
        url: "https://nilami.in",
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  // Progress to next level
  const nextLevel = currentLevel < 3 ? (currentLevel + 1) as 2 | 3 : null;
  const nextLevelTarget = nextLevel === 2 ? REFERRALS_FOR_L2 : REFERRALS_FOR_L3;
  const progressPercent = Math.min(100, Math.round((MOCK_REFERRALS_DONE / nextLevelTarget) * 100));

  return (
    <div className="bg-surface-bg">
      {/* Hero */}
      <section className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-saffron-400 text-sm font-medium tracking-wide uppercase mb-3">
              Earn Benefits
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Use Nilami. Unlock More Benefits.
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              Get more value from your Nilami account as you explore, save and refer trusted contacts.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Progression Flow */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-navy-900 mb-6">How It Works</h2>
          <div className="bg-white border border-surface-border rounded-2xl p-6 lg:p-8">
            <div className="flex items-start gap-0 overflow-x-auto pb-2">
              {STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center text-center w-32 sm:w-36">
                    <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center text-sm font-semibold mb-2">
                      {idx + 1}
                    </div>
                    <p className="text-sm font-semibold text-navy-900 leading-snug">{step.label}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">{step.desc}</p>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mx-1 mt-[-14px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Level Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-navy-900">Benefits by Level</h2>
            {LEVELS.map((lv) => {
              const isUnlocked = currentLevel >= lv.level;
              const benefits = ALL_BENEFITS.filter((b) => b.level === lv.level);
              return (
                <div
                  key={lv.level}
                  className={cn(
                    "bg-white border rounded-xl overflow-hidden",
                    isUnlocked ? `ring-1 ${lv.color.ring} border-transparent` : "border-surface-border"
                  )}
                >
                  <div className={cn("flex items-center justify-between px-5 py-4 border-b border-surface-border", isUnlocked ? lv.color.bg : "bg-slate-50")}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={cn("text-sm font-bold", isUnlocked ? lv.color.accent : "text-slate-500")}>
                            {lv.title}
                          </span>
                          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", isUnlocked ? lv.color.badge : "bg-slate-100 text-slate-500")}>
                            {lv.subtitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{lv.requirement}</p>
                      </div>
                    </div>
                    {isUnlocked ? (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        Unlocked
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Lock className="w-3.5 h-3.5" />
                        Locked
                      </div>
                    )}
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {benefits.map((b) => (
                      <BenefitCard key={b.id} benefit={b} unlocked={isUnlocked} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Referral Panel */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-navy-900">Your Referrals</h2>

            {isAuthenticated ? (
              <>
                {/* Referral code card */}
                <div className="bg-white border border-surface-border rounded-xl p-5">
                  <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Your Referral Code</p>
                  <div className="flex items-center gap-2 bg-navy-50 border border-navy-100 rounded-lg px-3 py-2.5 mb-4">
                    <span className="flex-1 font-mono text-sm font-semibold text-navy-900 tracking-wider">
                      {MOCK_REFERRAL_CODE}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-xs text-navy-600 hover:text-navy-800 font-medium transition-colors"
                    >
                      {copied ? (
                        <><CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> Copied</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
                      )}
                    </button>
                  </div>
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 btn btn-outline text-sm py-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Referral Link
                  </button>
                </div>

                {/* Progress card */}
                <div className="bg-white border border-surface-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-navy-900">Referral Progress</p>
                    {nextLevel && (
                      <span className="text-xs text-slate-500">Level {nextLevel}</span>
                    )}
                  </div>

                  {nextLevel ? (
                    <>
                      <p className="text-xs text-slate-500 mb-3">
                        <span className="font-semibold text-navy-900">{MOCK_REFERRALS_DONE}</span> of {nextLevelTarget} referrals completed
                      </p>
                      <div className="progress-bar mb-2">
                        <div
                          className="progress-fill transition-all duration-700"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        {nextLevelTarget - MOCK_REFERRALS_DONE} more to unlock Level {nextLevel} benefits
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-emerald-600 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                      All levels unlocked!
                    </div>
                  )}
                </div>

                {/* Referral history placeholder */}
                <div className="bg-white border border-surface-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-navy-900">Successful Referrals</p>
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                      {MOCK_REFERRALS_DONE} verified
                    </span>
                  </div>
                  <div className="space-y-2">
                    {["R***i K.", "P***l S.", "A***a M."].map((name, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm">
                        <div className="w-7 h-7 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-3.5 h-3.5 text-navy-600" />
                        </div>
                        <span className="text-slate-700 flex-1">{name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-3">
                    Names partially hidden for privacy.
                  </p>
                </div>
              </>
            ) : (
              /* Guest state */
              <div className="bg-white border border-surface-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-navy-600" />
                </div>
                <p className="text-sm font-semibold text-navy-900 mb-2">Sign in to refer & earn</p>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Create a free account to get your referral code and start unlocking benefits.
                </p>
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-primary text-sm py-2 w-full"
                >
                  Create Account
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-ghost text-sm py-2 w-full mt-2"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Your Benefits summary */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-navy-900 mb-5">Your Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_BENEFITS.map((b) => (
              <BenefitCard key={b.id} benefit={b} unlocked={currentLevel >= b.level} />
            ))}
          </div>
        </section>

        {/* CTA */}
        {!isAuthenticated && (
          <div className="bg-navy-900 rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <p className="text-saffron-400 text-sm font-medium mb-2">Get started — it's free</p>
              <h3 className="text-white text-xl font-semibold mb-2">
                Start using Nilami and unlock Level 1 benefits today
              </h3>
              <p className="text-navy-300 text-sm">
                No fees. No hidden charges. Personalised auction discovery from day one.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
