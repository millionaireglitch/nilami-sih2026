import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { MOCK_AUCTIONS } from "@/data/mockData";
import { DEFAULT_FILTERS } from "@/types";
import type { FilterState } from "@/types";
import AuctionCard from "@/components/auction/AuctionCard";
import AuctionFilters from "@/components/auction/AuctionFilters";
import CompareBar from "@/components/auction/CompareBar";
import { EmptyState } from "@/components/common/EmptyState";
import { cn } from "@/utils/cn";

const ITEMS_PER_PAGE = 12;

export default function Explore() {
  const [searchParams] = useSearchParams();

  const initialFilters = useMemo((): FilterState => {
    const f = { ...DEFAULT_FILTERS };
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const state = searchParams.get("state");
    const q = searchParams.get("q");
    if (status) f.statuses = [status as any];
    if (type) f.types = [type as any];
    if (state) f.states = [state];
    if (q) f.search = q;
    return f;
  }, []);

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let results = [...MOCK_AUCTIONS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.location.city.toLowerCase().includes(q) ||
          a.organization.name.toLowerCase().includes(q) ||
          a.auctionRefId.toLowerCase().includes(q)
      );
    }

    if (filters.statuses.length > 0) {
      results = results.filter((a) => filters.statuses.includes(a.status));
    }

    if (filters.types.length > 0) {
      results = results.filter((a) => filters.types.includes(a.type));
    }

    if (filters.states.length > 0) {
      results = results.filter((a) =>
        filters.states.includes(a.location.state)
      );
    }

    if (filters.city) {
      results = results.filter((a) =>
        a.location.city
          .toLowerCase()
          .includes(filters.city.toLowerCase())
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
      results = results.filter(
        (a) =>
          a.organization.id === filters.organization ||
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

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom).getTime();
      results = results.filter(
        (a) => new Date(a.auctionStartDate).getTime() >= from
      );
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo).getTime();
      results = results.filter(
        (a) => new Date(a.auctionStartDate).getTime() <= to
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
      case "most_viewed":
        results.sort((a, b) => b.views - a.views);
        break;
      case "ending_soon":
      default:
        results.sort(
          (a, b) =>
            new Date(a.auctionEndDate).getTime() -
            new Date(b.auctionEndDate).getTime()
        );
    }

    return results;
  }, [filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFiltersChange = useCallback((f: FilterState) => {
    setFilters(f);
    setPage(1);
  }, []);

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [page - 2, page - 1, page, page + 1, page + 2];
  };

  return (
    <div className="bg-surface-bg min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-1">
            Explore Auctions
          </h1>
          <p className="text-navy-500 text-sm">
            Browse {MOCK_AUCTIONS.length}+ active listings from banks and
            government organisations across India
          </p>
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

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-2 border border-surface-border rounded-lg bg-white text-sm font-medium text-navy-700 hover:bg-surface-bg transition-colors"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                </button>
                <p className="text-sm text-navy-500">
                  <span className="font-semibold text-navy-800">
                    {filtered.length}
                  </span>{" "}
                  auctions found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex border border-surface-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "px-3 py-2 transition-colors",
                      viewMode === "grid"
                        ? "bg-navy-900 text-white"
                        : "bg-white text-navy-500 hover:bg-surface-bg"
                    )}
                    title="Grid view"
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "px-3 py-2 transition-colors",
                      viewMode === "list"
                        ? "bg-navy-900 text-white"
                        : "bg-white text-navy-500 hover:bg-surface-bg"
                    )}
                    title="List view"
                    aria-label="List view"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <EmptyState
                title="No auctions found"
                description="Try adjusting your filters or search terms to find what you're looking for."
                ctaLabel="Clear All Filters"
                ctaAction={() => {
                  setFilters(DEFAULT_FILTERS);
                  setPage(1);
                }}
              />
            ) : (
              <>
                <div
                  className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                      : "flex flex-col gap-4"
                  )}
                >
                  {paginated.map((auction) => (
                    <AuctionCard
                      key={auction.id}
                      auction={auction}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-surface-border rounded-lg bg-white text-sm font-medium text-navy-700 hover:bg-surface-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    {getPageNumbers().map((n) => (
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
                    ))}

                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="px-4 py-2 border border-surface-border rounded-lg bg-white text-sm font-medium text-navy-700 hover:bg-surface-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
