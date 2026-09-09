import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  CheckSquare,
  Square,
  Clock,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ArrowUpDown,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { MOCK_AUCTIONS } from "@/data/mockData";
import { useWatchlist } from "@/context/WatchlistContext";
import { useCompare } from "@/context/CompareContext";
import { useAuth } from "@/context/AuthContext";
import {
  formatINRCompact,
  formatDateShort,
  getStatusLabel,
  getStatusClass,
  getTypeLabel,
  getVerificationClass,
  truncate,
} from "@/utils/format";

const TABS = [
  { id: "all", label: "All" },
  { id: "properties", label: "Properties", types: ["residential"] },
  { id: "vehicles", label: "Vehicles", types: ["vehicle"] },
  { id: "commercial", label: "Commercial", types: ["commercial"] },
  { id: "land", label: "Land", types: ["land"] },
  { id: "machinery", label: "Machinery", types: ["equipment", "industrial"] },
  { id: "other", label: "Other Assets", types: ["other"] },
] as const;

const LOCATIONS = ["All Locations", "Mumbai", "Delhi NCR", "Bengaluru", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Kolkata"];
const STATUSES = ["All Status", "Live", "Upcoming", "Extended"];
const PRICE_RANGES = ["Any Price", "Under ₹10L", "₹10L – ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹5Cr", "Above ₹5Cr"];
const SORT_OPTIONS = ["Relevance", "Closing Soon", "Price: Low to High", "Price: High to Low", "Newest First"];

function getCountdown(endDate: string): string {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return "Closed";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  if (days > 0) return `${days}d ${hours}h`;
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${mins}m`;
}

function AuctionCard({ auction }: { auction: (typeof MOCK_AUCTIONS)[0] }) {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useWatchlist();
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useCompare();
  const saved = isSaved(auction.id);
  const inCompare = isInCompare(auction.id);
  const countdown = getCountdown(auction.auctionEndDate);

  return (
    <div className="group bg-white border border-surface-border rounded-xl overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
      {/* Image */}
      <div
        className="relative h-44 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/auction/${auction.id}`)}
      >
        <img
          src={auction.images[0]}
          alt={auction.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Status badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className={cn("badge text-xs", getStatusClass(auction.status))}>
            {getStatusLabel(auction.status)}
          </span>
        </div>
        {/* Verification */}
        <div className="absolute top-2.5 right-2.5">
          <span className={cn("badge text-xs flex items-center gap-1", getVerificationClass(auction.verificationStatus))}>
            {auction.verificationStatus === "verified" ? (
              <ShieldCheck className="w-3 h-3" />
            ) : (
              <AlertCircle className="w-3 h-3" />
            )}
            {auction.verificationStatus === "verified" ? "Verified" : "Pending"}
          </span>
        </div>
        {/* Save */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleSave(auction.id); }}
          className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          title={saved ? "Remove from saved" : "Save auction"}
        >
          {saved ? (
            <BookmarkCheck className="w-3.5 h-3.5 text-saffron-500" />
          ) : (
            <Bookmark className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Source + type */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500 font-medium">{auction.organization.name}</span>
          <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
            {getTypeLabel(auction.type)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-semibold text-navy-900 text-sm leading-snug mb-1.5 cursor-pointer hover:text-navy-600 transition-colors"
          onClick={() => navigate(`/auction/${auction.id}`)}
        >
          {truncate(auction.title, 60)}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>{auction.location.city}, {auction.location.state}</span>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Reserve Price</p>
            <p className="text-base font-bold text-navy-900">{formatINRCompact(auction.reservePrice)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-0.5">EMD</p>
            <p className="text-sm font-semibold text-slate-700">{formatINRCompact(auction.emdAmount)}</p>
          </div>
        </div>

        {/* Countdown + closing date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 bg-surface-bg rounded-md px-2.5 py-1.5">
          <Clock className="w-3 h-3 flex-shrink-0 text-saffron-500" />
          <span>Closes {formatDateShort(auction.auctionEndDate)}</span>
          <span className="ml-auto font-medium text-navy-700">{countdown}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/auction/${auction.id}`)}
            className="flex-1 btn btn-primary text-xs py-2"
          >
            View Details
          </button>
          <button
            onClick={() => inCompare ? removeFromCompare(auction.id) : addToCompare(auction.id)}
            disabled={!inCompare && !canAddMore}
            title={inCompare ? "Remove from compare" : canAddMore ? "Add to compare" : "Compare limit reached"}
            className={cn(
              "w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors",
              inCompare
                ? "bg-navy-900 border-navy-900 text-white"
                : canAddMore
                ? "border-surface-border text-slate-500 hover:border-navy-300 hover:text-navy-600"
                : "border-surface-border text-slate-300 cursor-not-allowed"
            )}
          >
            {inCompare ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [status, setStatus] = useState("All Status");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [sortBy, setSortBy] = useState("Relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [adjustBudget, setAdjustBudget] = useState("₹25L");
  const [adjustArea, setAdjustArea] = useState("Mumbai");

  const tab = TABS.find((t) => t.id === activeTab)!;

  const filtered = useMemo(() => {
    let list = [...MOCK_AUCTIONS];

    // Tab filter
    if (tab.id !== "all" && "types" in tab) {
      list = list.filter((a) => (tab.types as unknown as string[]).includes(a.type));
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.location.city.toLowerCase().includes(q) ||
          a.organization.name.toLowerCase().includes(q)
      );
    }

    // Location
    if (location !== "All Locations") {
      list = list.filter(
        (a) =>
          a.location.city.toLowerCase().includes(location.toLowerCase()) ||
          a.location.state.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Status
    if (status !== "All Status") {
      const statusMap: Record<string, string> = {
        Live: "live",
        Upcoming: "upcoming",
        Extended: "extended",
      };
      list = list.filter((a) => a.status === statusMap[status]);
    }

    // Sort
    if (sortBy === "Closing Soon") {
      list.sort((a, b) => new Date(a.auctionEndDate).getTime() - new Date(b.auctionEndDate).getTime());
    } else if (sortBy === "Price: Low to High") {
      list.sort((a, b) => a.reservePrice - b.reservePrice);
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => b.reservePrice - a.reservePrice);
    } else if (sortBy === "Newest First") {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [activeTab, search, location, status, sortBy]);

  const recommended = useMemo(
    () => MOCK_AUCTIONS.filter((a) => a.location.state === "Maharashtra").slice(0, 4),
    []
  );

  const hasFilters = location !== "All Locations" || status !== "All Status" || priceRange !== "Any Price";

  return (
    <div className="bg-surface-bg">
      {/* Hero */}
      <section className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-saffron-400 text-sm font-medium tracking-wide uppercase mb-3">
              Auction Marketplace
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Nilami Marketplace
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              Discover verified auction assets and opportunities from trusted banks, government bodies and financial institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Search & Filter */}
      <div className="bg-white border-b border-surface-border sticky top-[64px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[160px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search auctions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
              />
            </div>
            {/* Location */}
            <div className="flex items-center gap-1.5 border border-surface-border rounded-lg px-2.5 py-2 bg-white">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-sm text-slate-700 bg-transparent focus:outline-none"
              >
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            {/* Sort */}
            <div className="flex items-center gap-1.5 border border-surface-border rounded-lg px-2.5 py-2 bg-white">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm text-slate-700 bg-transparent focus:outline-none"
              >
                {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border transition-colors",
                showFilters || hasFilters
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-slate-600 border-surface-border hover:border-navy-300"
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-saffron-400 ml-0.5" />}
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-surface-border">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-sm border border-surface-border rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-navy-300"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="text-sm border border-surface-border rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-navy-300"
              >
                {PRICE_RANGES.map((p) => <option key={p}>{p}</option>)}
              </select>
              {hasFilters && (
                <button
                  onClick={() => { setLocation("All Locations"); setStatus("All Status"); setPriceRange("Any Price"); }}
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" /> Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === t.id
                    ? "border-navy-700 text-navy-900"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

        {/* Smart Suggestions (signed in) */}
        {isAuthenticated && (
          <div className="mb-8 bg-navy-50 border border-navy-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-8 h-8 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-navy-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-900 mb-0.5">Smart Suggestions</p>
                <p className="text-xs text-navy-600">
                  Looking for properties around {adjustArea} under {adjustBudget}? Here are auctions that match your preferences.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <select
                value={adjustBudget}
                onChange={(e) => setAdjustBudget(e.target.value)}
                className="text-xs border border-navy-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-navy-300"
              >
                {["₹10L", "₹25L", "₹50L", "₹1Cr", "₹5Cr"].map((b) => <option key={b}>{b}</option>)}
              </select>
              <select
                value={adjustArea}
                onChange={(e) => setAdjustArea(e.target.value)}
                className="text-xs border border-navy-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-navy-300"
              >
                {["Mumbai", "Delhi", "Bengaluru", "Chennai", "Pune"].map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-navy-900">{filtered.length}</span> auctions found
            {search && <span className="text-slate-500"> for "<span className="text-navy-700">{search}</span>"</span>}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Eye className="w-3.5 h-3.5" />
            <span>Select auctions to compare</span>
          </div>
        </div>

        {/* Auction grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium mb-1">No auctions found</p>
            <p className="text-sm text-slate-400">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {filtered.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        )}

        {/* Recommended for You */}
        {recommended.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-navy-900">Recommended for You</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {isAuthenticated ? "Based on your Mumbai + Maharashtra preference" : "Popular auctions in Maharashtra"}
                </p>
              </div>
              <button
                onClick={() => navigate("/explore")}
                className="text-sm text-navy-600 hover:text-navy-800 font-medium flex items-center gap-1"
              >
                View all <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommended.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
