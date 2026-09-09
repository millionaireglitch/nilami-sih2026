import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Building2, ChevronRight } from "lucide-react";
import { startOfDay, endOfDay, addDays, parseISO, format, isWithinInterval } from "date-fns";
import { MOCK_AUCTIONS } from "@/data/mockData";
import { formatINR, getStatusClass, getStatusLabel } from "@/utils/format";
import { cn } from "@/utils/cn";
import { EmptyState } from "@/components/common/EmptyState";
import VerificationBadge from "@/components/auction/VerificationBadge";

// Derive reference date from earliest auction in mock data — not new Date()
const refDate = MOCK_AUCTIONS.reduce((earliest, auction) => {
  const d = parseISO(auction.auctionStartDate);
  return d < earliest ? d : earliest;
}, parseISO(MOCK_AUCTIONS[0].auctionStartDate));

type CalendarTab = "today" | "tomorrow" | "week" | "month";

const TABS: { key: CalendarTab; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "tomorrow", label: "Tomorrow" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
];

function getInterval(tab: CalendarTab): { start: Date; end: Date } {
  const dayStart = startOfDay(refDate);
  switch (tab) {
    case "today":
      return { start: dayStart, end: endOfDay(refDate) };
    case "tomorrow":
      return {
        start: startOfDay(addDays(refDate, 1)),
        end: endOfDay(addDays(refDate, 1)),
      };
    case "week":
      return { start: dayStart, end: endOfDay(addDays(refDate, 6)) };
    case "month":
      return { start: dayStart, end: endOfDay(addDays(refDate, 29)) };
  }
}

const todayKey = format(refDate, "yyyy-MM-dd");
const tomorrowKey = format(addDays(refDate, 1), "yyyy-MM-dd");

function getDateLabel(dateStr: string): string {
  if (dateStr === todayKey)
    return `Today — ${format(parseISO(dateStr), "d MMMM yyyy")}`;
  if (dateStr === tomorrowKey)
    return `Tomorrow — ${format(parseISO(dateStr), "d MMMM yyyy")}`;
  return format(parseISO(dateStr), "EEEE, d MMMM yyyy");
}

export default function AuctionCalendar() {
  const [activeTab, setActiveTab] = useState<CalendarTab>("week");

  const tabCounts = useMemo(() => {
    const counts = {} as Record<CalendarTab, number>;
    for (const { key } of TABS) {
      const interval = getInterval(key);
      counts[key] = MOCK_AUCTIONS.filter((a) =>
        isWithinInterval(parseISO(a.auctionStartDate), interval)
      ).length;
    }
    return counts;
  }, []);

  const filteredAuctions = useMemo(() => {
    const interval = getInterval(activeTab);
    return MOCK_AUCTIONS.filter((a) =>
      isWithinInterval(parseISO(a.auctionStartDate), interval)
    ).sort(
      (a, b) =>
        parseISO(a.auctionStartDate).getTime() -
        parseISO(b.auctionStartDate).getTime()
    );
  }, [activeTab]);

  const groupedAuctions = useMemo(() => {
    const groups: Record<string, typeof MOCK_AUCTIONS> = {};
    for (const auction of filteredAuctions) {
      const key = format(parseISO(auction.auctionStartDate), "yyyy-MM-dd");
      if (!groups[key]) groups[key] = [];
      groups[key].push(auction);
    }
    return groups;
  }, [filteredAuctions]);

  const sortedDateKeys = Object.keys(groupedAuctions).sort();

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Page Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-saffron-400" />
            <h1 className="text-2xl font-bold tracking-tight">Auction Calendar</h1>
          </div>
          <p className="text-navy-300 text-sm max-w-xl">
            Browse upcoming auctions by date. Plan your bids and never miss a
            scheduled auction.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-surface-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === key
                    ? "border-navy-800 text-navy-900"
                    : "border-transparent text-gray-500 hover:text-navy-700 hover:border-navy-200"
                )}
              >
                {label}
                {tabCounts[key] > 0 ? (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-semibold",
                      activeTab === key
                        ? "bg-navy-900 text-white"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {tabCounts[key]}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-400">
                    0
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAuctions.length === 0 ? (
          <EmptyState
            icon={<Calendar className="w-10 h-10 text-gray-400" />}
            title="No auctions scheduled"
            description="There are no auctions scheduled for this period. Try a different time range or browse all auctions."
            ctaLabel="Explore All Auctions"
            ctaHref="#/explore"
          />
        ) : (
          <div className="space-y-10">
            {sortedDateKeys.map((dateKey) => {
              const auctions = groupedAuctions[dateKey];
              return (
                <div key={dateKey}>
                  {/* Date header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-navy-900 text-white rounded-lg px-4 py-2 text-sm font-semibold shrink-0">
                      {getDateLabel(dateKey)}
                    </div>
                    <div className="flex-1 h-px bg-surface-border" />
                    <span className="text-xs text-gray-400 font-medium shrink-0">
                      {auctions.length} auction{auctions.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Auction list */}
                  <div className="space-y-2">
                    {auctions.map((auction) => (
                      <Link
                        key={auction.id}
                        to={`/auction/${auction.id}`}
                        className="flex items-start gap-4 bg-white rounded-xl border border-surface-border hover:border-navy-300 hover:shadow-card-hover p-4 transition-all group"
                      >
                        {/* Time */}
                        <div className="w-20 shrink-0 text-center pt-0.5">
                          <div className="text-sm font-semibold text-navy-900">
                            {format(parseISO(auction.auctionStartDate), "h:mm a")}
                          </div>
                          <div className="text-xs text-gray-400">IST</div>
                        </div>

                        <div className="w-px self-stretch bg-surface-border shrink-0" />

                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          <img
                            src={auction.images[0]}
                            alt={auction.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="text-sm font-semibold text-navy-900 leading-snug line-clamp-1 group-hover:text-navy-700">
                                {auction.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin className="w-3 h-3 shrink-0" />
                                  {auction.location.city}, {auction.location.state}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                  <Building2 className="w-3 h-3 shrink-0" />
                                  {auction.organization.shortName ??
                                    auction.organization.name}
                                </span>
                              </div>
                            </div>
                            <div className="shrink-0 flex flex-col items-end gap-1.5">
                              <span
                                className={cn(
                                  "badge text-xs",
                                  getStatusClass(auction.status)
                                )}
                              >
                                {getStatusLabel(auction.status)}
                              </span>
                              <VerificationBadge
                                status={auction.verificationStatus}
                                mini
                              />
                            </div>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                            <span>
                              Reserve:{" "}
                              <span className="font-semibold text-navy-800">
                                {formatINR(auction.reservePrice)}
                              </span>
                            </span>
                            <span>
                              EMD:{" "}
                              <span className="font-medium text-gray-700">
                                {formatINR(auction.emdAmount)}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Ends:{" "}
                              {format(
                                parseISO(auction.auctionEndDate),
                                "d MMM, h:mm a"
                              )}
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 p-4 bg-white rounded-xl border border-surface-border">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Note:</strong> All auction times are
            in Indian Standard Time (IST, UTC+5:30). Dates shown are auction start
            dates. Always verify exact schedules and any postponements directly
            with the respective bank or organisation before participating.
          </p>
        </div>
      </div>
    </div>
  );
}
