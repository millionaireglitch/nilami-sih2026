import React, { useState } from "react";
import { Bookmark, LayoutGrid, List, Trash2 } from "lucide-react";
import { MOCK_AUCTIONS } from "@/data/mockData";
import AuctionCard from "@/components/auction/AuctionCard";
import CompareBar from "@/components/auction/CompareBar";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { useWatchlist } from "@/context/WatchlistContext";
import { formatINR, formatDate } from "@/utils/format";
import { cn } from "@/utils/cn";

export default function SavedAuctions() {
  const { isSaved, toggleSave } = useWatchlist();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const savedAuctions = MOCK_AUCTIONS.filter((a) => isSaved(a.id));

  const liveCount = savedAuctions.filter(
    (a) => a.status === "live" || a.status === "extended"
  ).length;
  const upcomingCount = savedAuctions.filter(
    (a) => a.status === "upcoming"
  ).length;

  return (
    <div className="bg-surface-bg min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center">
                <Bookmark size={16} className="text-white fill-white" />
              </div>
              <h1 className="text-2xl font-bold text-navy-900">
                Saved Auctions
              </h1>
            </div>
            <p className="text-navy-500 text-sm ml-12">
              {savedAuctions.length > 0
                ? `${savedAuctions.length} auctions saved · ${liveCount} live now · ${upcomingCount} upcoming`
                : "No auctions saved yet"}
            </p>
          </div>
          {savedAuctions.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex border border-surface-border rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "px-3 py-2 transition-colors",
                    viewMode === "grid"
                      ? "bg-navy-900 text-white"
                      : "text-navy-500 hover:bg-surface-bg"
                  )}
                  title="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "px-3 py-2 transition-colors",
                    viewMode === "list"
                      ? "bg-navy-900 text-white"
                      : "text-navy-500 hover:bg-surface-bg"
                  )}
                  title="List view"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats row (only if saved auctions exist) */}
        {savedAuctions.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Total Saved", value: savedAuctions.length, color: "text-navy-800" },
              { label: "Live Now", value: liveCount, color: "text-emerald-700" },
              { label: "Upcoming", value: upcomingCount, color: "text-blue-700" },
              {
                label: "Closed",
                value: savedAuctions.filter((a) => a.status === "closed").length,
                color: "text-navy-400",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-surface-border px-4 py-3 shadow-card"
              >
                <p className={cn("text-2xl font-bold", stat.color)}>
                  {stat.value}
                </p>
                <p className="text-xs text-navy-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Auction Grid / Empty State */}
        {savedAuctions.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon={<Bookmark size={28} className="text-navy-300" />}
              title="No saved auctions"
              description="Save auctions you're interested in to track their status, dates, and price changes — all in one place."
              ctaLabel="Explore Auctions"
              ctaHref="/explore"
              secondaryLabel="Set Up Alerts Instead"
              secondaryHref="/alerts"
            />
          </div>
        ) : (
          <>
            {/* Live auctions section */}
            {liveCount > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="pulse-dot" />
                  <h2 className="text-sm font-semibold text-navy-700 uppercase tracking-wide">
                    Live Now
                  </h2>
                  <span className="badge badge-live">{liveCount}</span>
                </div>
                <div
                  className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                      : "flex flex-col gap-4"
                  )}
                >
                  {savedAuctions
                    .filter(
                      (a) =>
                        a.status === "live" || a.status === "extended"
                    )
                    .map((auction) => (
                      <AuctionCard
                        key={auction.id}
                        auction={auction}
                        viewMode={viewMode}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Upcoming auctions */}
            {upcomingCount > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-sm font-semibold text-navy-700 uppercase tracking-wide">
                    Upcoming
                  </h2>
                  <span className="badge badge-upcoming">{upcomingCount}</span>
                </div>
                <div
                  className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                      : "flex flex-col gap-4"
                  )}
                >
                  {savedAuctions
                    .filter((a) => a.status === "upcoming")
                    .map((auction) => (
                      <AuctionCard
                        key={auction.id}
                        auction={auction}
                        viewMode={viewMode}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Other / Closed */}
            {savedAuctions.filter(
              (a) =>
                a.status !== "live" &&
                a.status !== "extended" &&
                a.status !== "upcoming"
            ).length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-sm font-semibold text-navy-700 uppercase tracking-wide">
                    Closed / Other
                  </h2>
                </div>
                <div
                  className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                      : "flex flex-col gap-4"
                  )}
                >
                  {savedAuctions
                    .filter(
                      (a) =>
                        a.status !== "live" &&
                        a.status !== "extended" &&
                        a.status !== "upcoming"
                    )
                    .map((auction) => (
                      <AuctionCard
                        key={auction.id}
                        auction={auction}
                        viewMode={viewMode}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <CompareBar />
    </div>
  );
}
