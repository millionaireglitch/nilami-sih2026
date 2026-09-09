import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/utils/cn";
import { useCountdown } from "@/hooks/useCountdown";
import { formatDate, formatDateTime } from "@/utils/format";
import type { AuctionStatus } from "@/types";

interface AuctionTimerProps {
  endDate: string;
  status: AuctionStatus;
  compact?: boolean;
}

export default function AuctionTimer({ endDate, status, compact = false }: AuctionTimerProps) {
  const countdown = useCountdown(endDate);

  if (status === "closed" || status === "cancelled") {
    return (
      <div className={cn("flex items-center gap-1.5", compact ? "text-xs" : "text-sm")}>
        <span className="text-navy-400">
          {status === "closed" ? "Closed" : "Cancelled"} — {formatDate(endDate)}
        </span>
      </div>
    );
  }

  if (status === "upcoming") {
    return (
      <div className={cn("flex items-center gap-1.5", compact ? "text-xs text-navy-500" : "text-sm text-navy-500")}>
        <Clock className={cn("shrink-0", compact ? "w-3 h-3" : "w-3.5 h-3.5")} />
        <span>Opens {formatDate(endDate)}</span>
      </div>
    );
  }

  // live or extended
  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-1 text-xs font-medium",
          countdown.urgency === "critical"
            ? "text-red-600"
            : countdown.urgency === "soon"
            ? "text-amber-600"
            : "text-emerald-700"
        )}
      >
        <Clock className="w-3 h-3 shrink-0" />
        <span>{countdown.isExpired ? "Ended" : countdown.formatted}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 py-2 px-3 rounded-lg text-sm",
        countdown.urgency === "critical"
          ? "bg-red-50 border border-red-100"
          : countdown.urgency === "soon"
          ? "bg-amber-50 border border-amber-100"
          : "bg-emerald-50 border border-emerald-100"
      )}
    >
      <Clock
        className={cn(
          "w-4 h-4 shrink-0",
          countdown.urgency === "critical"
            ? "text-red-500"
            : countdown.urgency === "soon"
            ? "text-amber-500"
            : "text-emerald-500"
        )}
      />
      <div>
        <p
          className={cn(
            "font-semibold leading-none",
            countdown.urgency === "critical"
              ? "text-red-700"
              : countdown.urgency === "soon"
              ? "text-amber-700"
              : "text-emerald-700"
          )}
        >
          {countdown.isExpired ? "Auction Ended" : countdown.formatted + " left"}
        </p>
        <p className="text-[11px] text-navy-500 mt-0.5">Ends {formatDateTime(endDate)}</p>
      </div>
    </div>
  );
}
