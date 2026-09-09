import React, { useState } from "react";
import { Filter, X, ChevronDown, RotateCcw } from "lucide-react";
import { cn } from "@/utils/cn";
import { ORGANIZATIONS, INDIAN_STATES } from "@/data/mockData";
import type { FilterState, AuctionType, AuctionStatus } from "@/types";
import { DEFAULT_FILTERS } from "@/types";

interface AuctionFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const TYPES: { value: AuctionType; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land / Plot" },
  { value: "vehicle", label: "Vehicle" },
  { value: "industrial", label: "Industrial" },
  { value: "equipment", label: "Equipment" },
  { value: "other", label: "Other" },
];

const STATUSES: { value: AuctionStatus; label: string }[] = [
  { value: "live", label: "Live Now" },
  { value: "upcoming", label: "Upcoming" },
  { value: "extended", label: "Extended" },
  { value: "closed", label: "Closed" },
];

const SORT_OPTIONS = [
  { value: "ending_soon", label: "Ending Soon" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Recently Added" },
  { value: "most_viewed", label: "Most Viewed" },
];

function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-surface-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-navy-800 hover:text-navy-900"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          className={cn("w-4 h-4 text-navy-400 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function AuctionFilters({
  filters,
  onChange,
  resultCount,
  mobileOpen = false,
  onMobileClose,
}: AuctionFiltersProps) {
  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleType = (t: AuctionType) => {
    update(
      "types",
      filters.types.includes(t) ? filters.types.filter((x) => x !== t) : [...filters.types, t]
    );
  };

  const toggleStatus = (s: AuctionStatus) => {
    update(
      "statuses",
      filters.statuses.includes(s) ? filters.statuses.filter((x) => x !== s) : [...filters.statuses, s]
    );
  };

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.states.length > 0 ||
    filters.statuses.length > 0 ||
    filters.priceMin !== "" ||
    filters.priceMax !== "" ||
    filters.organization !== "" ||
    filters.verificationStatus !== "";

  const content = (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-navy-700" />
          <span className="font-semibold text-navy-900 text-sm">Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-navy-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {[
                filters.types.length,
                filters.states.length,
                filters.statuses.length,
                filters.priceMin !== "" ? 1 : 0,
                filters.priceMax !== "" ? 1 : 0,
                filters.organization ? 1 : 0,
              ].reduce((a, b) => a + b, 0)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={() => onChange(DEFAULT_FILTERS)}
              className="flex items-center gap-1 text-xs text-saffron-600 hover:text-saffron-700 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
          {onMobileClose && (
            <button onClick={onMobileClose} className="lg:hidden">
              <X className="w-5 h-5 text-navy-500" />
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-navy-500 mb-4">
        {resultCount.toLocaleString("en-IN")} result{resultCount !== 1 ? "s" : ""}
      </p>

      {/* Sort */}
      <CollapsibleSection title="Sort By">
        <select
          className="form-select text-sm"
          value={filters.sortBy}
          onChange={(e) => update("sortBy", e.target.value)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </CollapsibleSection>

      {/* Asset Type */}
      <CollapsibleSection title="Asset Type">
        <div className="space-y-2">
          {TYPES.map((t) => (
            <label key={t.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.types.includes(t.value)}
                onChange={() => toggleType(t.value)}
                className="w-4 h-4 rounded border-surface-border text-navy-700 focus:ring-navy-400 focus:ring-offset-0"
              />
              <span className="text-sm text-navy-700 group-hover:text-navy-900">{t.label}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Status */}
      <CollapsibleSection title="Auction Status">
        <div className="space-y-2">
          {STATUSES.map((s) => (
            <label key={s.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.statuses.includes(s.value)}
                onChange={() => toggleStatus(s.value)}
                className="w-4 h-4 rounded border-surface-border text-navy-700 focus:ring-navy-400 focus:ring-offset-0"
              />
              <span className="text-sm text-navy-700 group-hover:text-navy-900">{s.label}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Location */}
      <CollapsibleSection title="State">
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {INDIAN_STATES.map((state) => (
            <label key={state} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.states.includes(state)}
                onChange={() =>
                  update(
                    "states",
                    filters.states.includes(state)
                      ? filters.states.filter((s) => s !== state)
                      : [...filters.states, state]
                  )
                }
                className="w-4 h-4 rounded border-surface-border text-navy-700 focus:ring-navy-400 focus:ring-offset-0"
              />
              <span className="text-sm text-navy-700 group-hover:text-navy-900">{state}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Price Range */}
      <CollapsibleSection title="Reserve Price Range">
        <div className="space-y-2">
          <div>
            <label className="text-xs text-navy-500 mb-1 block">Minimum (₹)</label>
            <input
              type="number"
              placeholder="e.g. 500000"
              className="form-input text-sm"
              value={filters.priceMin}
              onChange={(e) => update("priceMin", e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-navy-500 mb-1 block">Maximum (₹)</label>
            <input
              type="number"
              placeholder="e.g. 10000000"
              className="form-input text-sm"
              value={filters.priceMax}
              onChange={(e) => update("priceMax", e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Organisation */}
      <CollapsibleSection title="Organisation / Bank">
        <select
          className="form-select text-sm"
          value={filters.organization}
          onChange={(e) => update("organization", e.target.value)}
        >
          <option value="">All Organisations</option>
          {ORGANIZATIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.shortName} — {o.name}
            </option>
          ))}
        </select>
      </CollapsibleSection>

      {/* Verification */}
      <CollapsibleSection title="Verification Status" defaultOpen={false}>
        <div className="space-y-2">
          {[
            { value: "", label: "Any" },
            { value: "verified", label: "✓ Source Verified" },
            { value: "pending", label: "⚠ Pending Verification" },
            { value: "incomplete", label: "! Incomplete" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="verificationStatus"
                value={opt.value}
                checked={filters.verificationStatus === opt.value}
                onChange={() => update("verificationStatus", opt.value)}
                className="w-4 h-4 text-navy-700 focus:ring-navy-400 focus:ring-offset-0"
              />
              <span className="text-sm text-navy-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Date Range */}
      <CollapsibleSection title="Auction Date" defaultOpen={false}>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-navy-500 mb-1 block">From</label>
            <input
              type="date"
              className="form-input text-sm"
              value={filters.dateFrom}
              onChange={(e) => update("dateFrom", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-navy-500 mb-1 block">To</label>
            <input
              type="date"
              className="form-input text-sm"
              value={filters.dateTo}
              onChange={(e) => update("dateTo", e.target.value)}
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );

  // Mobile overlay
  if (mobileOpen !== undefined) {
    return (
      <>
        {/* Desktop sidebar */}
        <div className="hidden lg:block">{content}</div>
        {/* Mobile drawer */}
        {mobileOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/40"
              onClick={onMobileClose}
            />
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-panel max-h-[85vh] overflow-y-auto p-5">
              {content}
            </div>
          </>
        )}
      </>
    );
  }

  return content;
}
