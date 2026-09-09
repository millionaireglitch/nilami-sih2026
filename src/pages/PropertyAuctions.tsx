import React, { useState, useMemo, useCallback } from "react";
import { Building2, Home, Trees, Factory } from "lucide-react";
import { MOCK_AUCTIONS } from "@/data/mockData";
import { DEFAULT_FILTERS } from "@/types";
import type { FilterState, AuctionType } from "@/types";
import AuctionCard from "@/components/auction/AuctionCard";
import AuctionFilters from "@/components/auction/AuctionFilters";
import CompareBar from "@/components/auction/CompareBar";
import { HeroSearch } from "@/components/common/HeroSearch";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { cn } from "@/utils/cn";

const PROPERTY_TYPES: AuctionType[] = [
  "residential",
  "commercial",
  "land",
  "industrial",
];

const TABS: { type: AuctionType | "all"; label: string; icon: React.ReactNode }[] = [
  { type: "all", label: "All Properties", icon: <Building2 size={15} /> },
  { type: "residential", label: "Residential", icon: <Home size={15} /> },
  { type: "commercial", label: "Commercial", icon: <Building2 size={15} /> },
  { type: "land", label: "Land / Plot", icon: <Trees size={15} /> },
  { type: "industrial", label: "Industrial", icon: <Factory size={15} /> },
];

const ITEMS_PER_PAGE = 12;

export default function PropertyAuctions() {
  const [activeTab, setActiveTab] = useState<AuctionType | "all">("all");
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    types: PROPERTY_TYPES,
  });
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let results = MOCK_AUCTIONS.filter((a) => PROPERTY_TYPES.includes(a.type));

    if (activeTab !== "all") {
      results = results.filter((a) => a.type === activeTab);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.location.city.toLowerCase().includes(q) ||
          a.organization.name.toLowerCase().includes(q)
      );
    }

    if (filters.statuses.length > 0) {
      results = results.filter((a) => filters.statuses.includes(a.status));
    }

    if (filters.states.length > 0) {
      results = results.filter((a) => filters.states.includes(a.location.state));
    }

    if (filters.city) {
      results = results.filter((a) =>
        a.location.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.priceMin !== "") {
      results = results.filter(
        (a) => a.reservePrice >= (filters.priceMin as number)
      );
    }

    if (filters.priceMax !== "") {
      results = results.filter(
        (a) => a.reservePrice <= (filters.priceMax as number)
      );
    }

    if (filters.organization) {
      results = results.filter((a) =>
        a.organization.name
          .toLowerCase()
          .includes(filters.organization.toLowerCase())
      );
    }

    if (filters.verificationStatus) {
      results = results.filter(
        (a) => a.verificationStatus === filters.verificationStatus
      );
    }

    switch (filters.sortBy) {
      case "price_asc":
        results.sort((a, b) => a.reservePrice - b.reservePrice);
        break;
      case "price_desc":
        results.sort((a, b) => b.reservePrice - a.reservePrice);
        break;
      case "newest":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        results.sort(
          (a, b) =>
            new Date(a.auctionEndDate).getTime() -
            new Date(b.auctionEndDate).getTime()
        );
    }

    return results;
  }, [filters, activeTab]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFiltersChange = useCallback(
    (f: FilterState) => {
      setFilters({ ...f, types: activeTab === "all" ? PROPERTY_TYPES : [activeTab] });
      setPage(1);
    },
    [activeTab]
  );

  const handleTabChange = (tab: AuctionType | "all") => {
    setActiveTab(tab);
    setFilters((prev) => ({
      ...prev,
      types: tab === "all" ? PROPERTY_TYPES : [tab],
    }));
    setPage(1);
  };

  const counts = useMemo(() => {
    const all = MOCK_AUCTIONS.filter((a) => PROPERTY_TYPES.includes(a.type));
    return {
      all: all.length,
      residential: all.filter((a) => a.type === "residential").length,
      commercial: all.filter((a) => a.type === "commercial").length,
      land: all.filter((a) => a.type === "land").length,
      industrial: all.filter((a) => a.type === "industrial").length,
    };
  }, []);

  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy-900 py-10">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Property Auctions
            </h1>
            <p className="text-navy-300 text-sm mb-6">
              Residential homes, commercial spaces, land parcels, and industrial
              properties from banks and government organisations across India.
            </p>
            <HeroSearch compact />
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        {/* Category Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-6 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.type}
              onClick={() => handleTabChange(tab.type)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all border",
                activeTab === tab.type
                  ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                  : "bg-white text-navy-600 border-surface-border hover:bg-surface-bg hover:border-navy-200"
              )}
            >
              {tab.icon}
              {tab.label}
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  activeTab === tab.type
                    ? "bg-white/20 text-white"
                    : "bg-surface-muted text-navy-500"
                )}
              >
                {tab.type === "all"
                  ? counts.all
                  : counts[tab.type as keyof typeof counts] || 0}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-6 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-20">
            <AuctionFilters
              filters={filters}
              onChange={handleFiltersChange}
              resultCount={filtered.length}
            />
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-navy-500">
                <span className="font-semibold text-navy-800">
                  {filtered.length}
                </span>{" "}
                properties found
              </p>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden text-sm text-navy-600 border border-surface-border px-3 py-1.5 rounded-lg bg-white hover:bg-surface-bg"
              >
                Filters
              </button>
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="No properties found"
                description="Adjust your filters or choose a different category."
                ctaLabel="Show All Properties"
                ctaAction={() => {
                  handleTabChange("all");
                  setFilters({ ...DEFAULT_FILTERS, types: PROPERTY_TYPES });
                }}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-surface-border rounded-lg bg-white text-sm text-navy-700 hover:bg-surface-bg disabled:opacity-40"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (n) => (
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={cn(
                            "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                            page === n
                              ? "bg-navy-900 text-white"
                              : "bg-white border border-surface-border text-navy-700 hover:bg-surface-bg"
                          )}
                        >
                          {n}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="px-4 py-2 border border-surface-border rounded-lg bg-white text-sm text-navy-700 hover:bg-surface-bg disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[90vw] bg-white overflow-y-auto shadow-2xl">
            <AuctionFilters
              filters={filters}
              onChange={handleFiltersChange}
              resultCount={filtered.length}
              mobileOpen={mobileFiltersOpen}
              onMobileClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      <CompareBar />
    </div>
  );
}
