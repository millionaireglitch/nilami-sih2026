import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Bookmark, BookmarkCheck, GitCompare, Eye, Building2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { formatINR, formatDate, getStatusClass, getStatusLabel, getTypeLabel } from "@/utils/format";
import { useWatchlist } from "@/context/WatchlistContext";
import { useCompare } from "@/context/CompareContext";
import AuctionTimer from "./AuctionTimer";
import VerificationBadge from "./VerificationBadge";
import type { Auction } from "@/types";

interface AuctionCardProps {
  auction: Auction;
  viewMode?: "grid" | "list";
}

export default function AuctionCard({ auction, viewMode = "grid" }: AuctionCardProps) {
  const { isSaved, toggleSave } = useWatchlist();
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useCompare();
  const saved = isSaved(auction.id);
  const inCompare = isInCompare(auction.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSave(auction.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) removeFromCompare(auction.id);
    else if (canAddMore) addToCompare(auction.id);
  };

  if (viewMode === "list") {
    return (
      <Link
        to={`/auction/${auction.id}`}
        className="card flex gap-4 p-4 hover:shadow-card-hover transition-shadow"
      >
        <img
          src={auction.images[0]}
          alt={auction.title}
          loading="lazy"
          className="w-36 h-24 object-cover rounded-lg shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={getStatusClass(auction.status)}>
                  {auction.status === "live" && <span className="pulse-dot mr-1" />}
                  {getStatusLabel(auction.status)}
                </span>
                <VerificationBadge status={auction.verificationStatus} mini />
              </div>
              <h3 className="font-semibold text-navy-900 text-sm leading-snug line-clamp-1">
                {auction.title}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-navy-500">
                <Building2 className="w-3 h-3" />
                <span>{auction.organization.shortName}</span>
                <span className="text-surface-border">·</span>
                <MapPin className="w-3 h-3" />
                <span>{auction.location.city}, {auction.location.state}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-navy-500">Reserve</p>
              <p className="font-bold text-navy-900 text-base">{formatINR(auction.reservePrice)}</p>
              <p className="text-xs text-navy-500">EMD: {formatINR(auction.emdAmount)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <AuctionTimer endDate={auction.auctionEndDate} status={auction.status} compact />
            <div className="flex items-center gap-1">
              <button
                onClick={handleSave}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  saved ? "text-saffron-500 bg-saffron-50" : "text-navy-400 hover:text-navy-700"
                )}
                title={saved ? "Remove from saved" : "Save auction"}
              >
                {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="card group overflow-hidden hover:shadow-card-hover transition-all duration-200">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-navy-100">
        <img
          src={auction.images[0]}
          alt={auction.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(getStatusClass(auction.status), "text-xs font-semibold")}>
            {auction.status === "live" && <span className="pulse-dot mr-1.5" />}
            {getStatusLabel(auction.status)}
          </span>
        </div>
        {/* Save & Compare buttons */}
        <div className="absolute top-2 right-2 flex gap-1.5">
          <button
            onClick={handleCompare}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm",
              inCompare
                ? "bg-navy-600 text-white"
                : "bg-white/90 text-navy-600 hover:bg-white"
            )}
            title={inCompare ? "Remove from compare" : canAddMore ? "Add to compare" : "Max 3 items"}
          >
            <GitCompare className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleSave}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm",
              saved
                ? "bg-saffron-500 text-white"
                : "bg-white/90 text-navy-600 hover:bg-white"
            )}
            title={saved ? "Remove from watchlist" : "Add to watchlist"}
          >
            {saved ? (
              <BookmarkCheck className="w-3.5 h-3.5" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        {/* Type badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-0.5 bg-black/50 text-white text-[10px] font-medium rounded backdrop-blur-sm">
            {getTypeLabel(auction.type)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Organisation */}
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1 text-xs text-navy-500">
            <Building2 className="w-3 h-3" />
            {auction.organization.shortName}
            {auction.organization.verified && (
              <span className="ml-0.5 text-emerald-600">✓</span>
            )}
          </span>
          <VerificationBadge status={auction.verificationStatus} mini />
        </div>

        {/* Title */}
        <Link to={`/auction/${auction.id}`}>
          <h3 className="font-semibold text-navy-900 text-[15px] leading-snug line-clamp-2 hover:text-navy-600 transition-colors">
            {auction.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5 text-xs text-navy-500">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{auction.location.city}, {auction.location.state}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-border mt-3 pt-3">
          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              <p className="stat-label">Reserve Price</p>
              <p className="price-display text-navy-900">{formatINR(auction.reservePrice)}</p>
            </div>
            <div className="text-right">
              <p className="stat-label">EMD</p>
              <p className="text-sm font-semibold text-navy-700">{formatINR(auction.emdAmount)}</p>
            </div>
          </div>

          {/* Timer */}
          <div className="mt-3">
            <AuctionTimer endDate={auction.auctionEndDate} status={auction.status} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3">
          <Link
            to={`/auction/${auction.id}`}
            className="flex-1 btn btn-primary text-sm py-2 text-center"
          >
            View Details
          </Link>
          <div className="flex items-center gap-1 text-xs text-navy-400">
            <Eye className="w-3.5 h-3.5" />
            <span>{auction.views > 1000 ? `${(auction.views / 1000).toFixed(1)}k` : auction.views}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
