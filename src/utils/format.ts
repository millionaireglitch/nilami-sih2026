import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";
import type { AuctionStatus, AuctionType, VerificationStatus } from "@/types";

// ─── Currency ─────────────────────────────────────────────────────────────────

export function formatINR(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatINRFull(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatINRCompact(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(1)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(1)} L`;
  if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(0)}K`;
  return `₹${amount}`;
}

// ─── Dates ────────────────────────────────────────────────────────────────────

function toDate(d: string | Date): Date {
  return typeof d === "string" ? parseISO(d) : d;
}

export function formatDate(date: string | Date): string {
  const d = toDate(date);
  return isValid(d) ? format(d, "dd MMM yyyy") : "—";
}

export function formatDateTime(date: string | Date): string {
  const d = toDate(date);
  return isValid(d) ? format(d, "dd MMM yyyy, hh:mm a") : "—";
}

export function formatDateShort(date: string | Date): string {
  const d = toDate(date);
  return isValid(d) ? format(d, "dd MMM") : "—";
}

export function timeAgo(date: string | Date): string {
  const d = toDate(date);
  return isValid(d) ? formatDistanceToNow(d, { addSuffix: true }) : "—";
}

export function formatDayOfWeek(date: string | Date): string {
  const d = toDate(date);
  return isValid(d) ? format(d, "EEEE, dd MMMM yyyy") : "—";
}

// ─── Auction Status ──────────────────────────────────────────────────────────

const STATUS_LABELS: Record<AuctionStatus, string> = {
  live: "Live",
  upcoming: "Upcoming",
  closed: "Closed",
  extended: "Extended",
  cancelled: "Cancelled",
};

const STATUS_CLASSES: Record<AuctionStatus, string> = {
  live: "badge badge-live",
  upcoming: "badge badge-upcoming",
  closed: "badge badge-closed",
  extended: "badge badge-extended",
  cancelled: "badge bg-red-100 text-red-600 border border-red-200",
};

export function getStatusLabel(status: AuctionStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function getStatusClass(status: AuctionStatus): string {
  return STATUS_CLASSES[status] ?? "badge bg-gray-100 text-gray-600";
}

// ─── Auction Type ─────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<AuctionType, string> = {
  residential: "Residential",
  commercial: "Commercial",
  land: "Land / Plot",
  vehicle: "Vehicle",
  industrial: "Industrial",
  equipment: "Equipment",
  other: "Other",
};

export function getTypeLabel(type: AuctionType): string {
  return TYPE_LABELS[type] ?? type;
}

// ─── Verification ─────────────────────────────────────────────────────────────

const VERIFY_LABELS: Record<VerificationStatus, string> = {
  verified: "Source Verified",
  pending: "Verification Pending",
  incomplete: "Incomplete Information",
};

const VERIFY_CLASSES: Record<VerificationStatus, string> = {
  verified: "badge badge-verified",
  pending: "badge badge-pending",
  incomplete: "badge bg-orange-100 text-orange-700 border border-orange-200",
};

export function getVerificationLabel(s: VerificationStatus): string {
  return VERIFY_LABELS[s] ?? s;
}

export function getVerificationClass(s: VerificationStatus): string {
  return VERIFY_CLASSES[s] ?? "badge bg-gray-100 text-gray-600";
}

// ─── Text ─────────────────────────────────────────────────────────────────────

export function truncate(text: string, limit = 100): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit).replace(/\s+\S*$/, "") + "…";
}

export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

// ─── Numbers ──────────────────────────────────────────────────────────────────

export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

export function formatPercent(n: number, decimals = 0): string {
  return `${n.toFixed(decimals)}%`;
}
