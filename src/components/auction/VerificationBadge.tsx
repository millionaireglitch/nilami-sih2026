import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/utils/cn";
import type { VerificationStatus } from "@/types";

interface VerificationBadgeProps {
  status: VerificationStatus;
  mini?: boolean;
  showExplanation?: boolean;
}

const CONFIG = {
  verified: {
    label: "Source Verified",
    shortLabel: "Verified",
    icon: CheckCircle2,
    classes: "badge badge-verified",
    miniClasses: "text-emerald-600",
    popoverTitle: "What does 'Source Verified' mean?",
    popoverText:
      "This auction notice has been sourced directly from the official website or publication of the listed bank or government organisation. We have confirmed the notice exists at the source and the key details match our listing.",
  },
  pending: {
    label: "Pending Verification",
    shortLabel: "Pending",
    icon: AlertTriangle,
    classes: "badge badge-pending",
    miniClasses: "text-amber-600",
    popoverTitle: "Verification Pending",
    popoverText:
      "We have found this listing but are in the process of confirming it against the official source. Details may be incomplete or subject to change. We recommend verifying directly with the organisation before taking any action.",
  },
  incomplete: {
    label: "Information Incomplete",
    shortLabel: "Incomplete",
    icon: AlertCircle,
    classes: "badge bg-orange-100 text-orange-700 border border-orange-200",
    miniClasses: "text-orange-600",
    popoverTitle: "Incomplete Information",
    popoverText:
      "One or more important details for this listing are missing or could not be verified. This may affect your ability to participate. Please contact the listed organisation directly for the complete auction notice.",
  },
};

export default function VerificationBadge({
  status,
  mini = false,
  showExplanation = false,
}: VerificationBadgeProps) {
  const [open, setOpen] = useState(false);
  const cfg = CONFIG[status];
  const Icon = cfg.icon;

  if (mini) {
    return (
      <span className={cn("flex items-center gap-0.5 text-[11px] font-medium", cfg.miniClasses)}>
        <Icon className="w-3 h-3" />
        <span>{cfg.shortLabel}</span>
      </span>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-1.5">
      <span className={cfg.classes}>
        <Icon className="w-3 h-3 mr-1" />
        {cfg.label}
      </span>
      {showExplanation && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-navy-400 hover:text-navy-700 transition-colors"
          title="Why is this verified?"
        >
          <Info className="w-4 h-4" />
        </button>
      )}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-7 z-50 w-72 bg-white rounded-xl shadow-panel border border-surface-border p-4">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-navy-900">{cfg.popoverTitle}</h4>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-navy-400" />
              </button>
            </div>
            <p className="text-xs text-navy-600 mt-2 leading-relaxed">{cfg.popoverText}</p>
          </div>
        </>
      )}
    </div>
  );
}
