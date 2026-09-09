import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/utils/cn";
import type { AuctionScore } from "@/types";

interface ScoreCardProps {
  score: AuctionScore;
}

const METRICS = [
  {
    key: "documentation" as const,
    label: "Documentation",
    description: "Auction notice, T&C, and property details available",
  },
  {
    key: "information" as const,
    label: "Information Completeness",
    description: "All key fields (price, EMD, dates, eligibility) are provided",
  },
  {
    key: "location" as const,
    label: "Location Information",
    description: "Address, pincode, and map data available",
  },
  {
    key: "readiness" as const,
    label: "Auction Readiness",
    description: "Auction is currently in active/registration phase",
  },
];

function ScoreBar({ value }: { value: number }) {
  const color =
    value >= 85 ? "bg-emerald-500" : value >= 65 ? "bg-amber-400" : "bg-red-400";

  return (
    <div className="flex items-center gap-3">
      <div className="progress-bar flex-1">
        <div className={cn("progress-fill", color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-sm font-semibold text-navy-900 w-8 text-right">{value}</span>
    </div>
  );
}

export default function ScoreCard({ score }: ScoreCardProps) {
  const overallColor =
    score.overall >= 85
      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
      : score.overall >= 65
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-red-600 bg-red-50 border-red-200";

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-navy-900 text-base">Auction Scorecard</h3>
          <p className="text-xs text-navy-500 mt-0.5">
            Rule-based transparency score. Not an investment recommendation.
          </p>
        </div>
        <div className={cn("text-center border rounded-xl px-3 py-2", overallColor)}>
          <p className="text-2xl font-bold leading-none">{score.overall}</p>
          <p className="text-[11px] font-medium mt-0.5">/ 100</p>
        </div>
      </div>

      <div className="space-y-3.5">
        {METRICS.map((m) => (
          <div key={m.key}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-navy-700">{m.label}</span>
                <button
                  className="text-navy-300 hover:text-navy-500 transition-colors group relative"
                  title={m.description}
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <ScoreBar value={score[m.key]} />
          </div>
        ))}
      </div>

      <p className="text-[11px] text-navy-400 mt-4 pt-3 border-t border-surface-border leading-relaxed">
        This scorecard uses transparent, rule-based criteria. A high score indicates that
        information is available and complete — it does not imply investment suitability or
        guarantee auction outcome.
      </p>
    </div>
  );
}
