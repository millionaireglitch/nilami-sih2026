import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  Map,
  Car,
  Factory,
  Wrench,
  Gem,
  Package,
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronRight,
  ArrowRight,
  Building,
  Landmark,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
  icon: React.ElementType;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  route: string;
}

const CATEGORIES: Category[] = [
  {
    id: "residential",
    name: "Residential Properties",
    description: "Flats, apartments, houses and residential units across India",
    count: 847,
    icon: Home,
    accentColor: "text-navy-700",
    bgColor: "bg-navy-50",
    borderColor: "border-navy-100",
    route: "/property-auctions",
  },
  {
    id: "commercial",
    name: "Commercial Properties",
    description: "Offices, shops, showrooms and commercial spaces",
    count: 312,
    icon: Building2,
    accentColor: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    route: "/marketplace?type=commercial",
  },
  {
    id: "land",
    name: "Land & Plots",
    description: "Agricultural, non-agricultural and development plots",
    count: 564,
    icon: Map,
    accentColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    route: "/marketplace?type=land",
  },
  {
    id: "vehicle",
    name: "Vehicles",
    description: "Cars, two-wheelers, trucks, buses and commercial vehicles",
    count: 1203,
    icon: Car,
    accentColor: "text-saffron-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    route: "/vehicle-auctions",
  },
  {
    id: "industrial",
    name: "Industrial Assets",
    description: "Factories, warehouses, industrial sheds and plants",
    count: 189,
    icon: Factory,
    accentColor: "text-slate-700",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-100",
    route: "/marketplace?type=industrial",
  },
  {
    id: "equipment",
    name: "Machinery & Equipment",
    description: "Industrial machinery, plant equipment and tools",
    count: 234,
    icon: Wrench,
    accentColor: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    route: "/marketplace?type=machinery",
  },
  {
    id: "gold",
    name: "Gold & Jewellery",
    description: "Gold ornaments, jewellery and precious metal assets",
    count: 156,
    icon: Gem,
    accentColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-100",
    route: "/marketplace?type=gold",
  },
  {
    id: "other",
    name: "Other Assets",
    description: "Miscellaneous assets including bonds, shares and equipment",
    count: 98,
    icon: Package,
    accentColor: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    route: "/marketplace?type=other",
  },
];

const POPULAR_SEARCHES = [
  { label: "Properties under ₹25L", route: "/marketplace?type=properties&maxPrice=2500000" },
  { label: "Vehicles under ₹10L", route: "/marketplace?type=vehicles&maxPrice=1000000" },
  { label: "Mumbai Auctions", route: "/marketplace?location=Mumbai" },
  { label: "Delhi NCR Auctions", route: "/marketplace?location=Delhi" },
  { label: "Bank Auctions", route: "/marketplace?source=bank" },
  { label: "Government Auctions", route: "/marketplace?source=government" },
  { label: "Auctions closing this week", route: "/marketplace?closing=week" },
];

const BROWSE_BY_SOURCE = [
  { label: "Bank Auctions", sublabel: "SBI, HDFC, PNB, ICICI & more", icon: Building, count: "2,400+" },
  { label: "Government Auctions", sublabel: "MCD, NLCIL, IOCL & PSUs", icon: Landmark, count: "680+" },
  { label: "DRT Auctions", sublabel: "Debt Recovery Tribunal assets", icon: Building2, count: "210+" },
];

const LOCATIONS = ["All India", "Mumbai", "Delhi NCR", "Bengaluru", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Kolkata", "Jaipur"];
const STATUSES = ["All Status", "Live", "Upcoming", "Closing Soon"];
const PRICE_RANGES = ["Any Price", "Under ₹10L", "₹10L – ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹5Cr", "Above ₹5Cr"];

export default function Categories() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All India");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-surface-bg">
      {/* Hero */}
      <section className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-saffron-400 text-sm font-medium tracking-wide uppercase mb-3">
              Browse Categories
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Explore Auctions by Category
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              Find verified auction opportunities across properties, vehicles, land, commercial assets and more.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-surface-border sticky top-[64px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors",
                showFilters
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-slate-600 border-surface-border hover:border-navy-300"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-surface-border">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="text-sm border border-surface-border rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-navy-300"
                >
                  {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm border border-surface-border rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-navy-300"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="text-sm border border-surface-border rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-navy-300"
              >
                {PRICE_RANGES.map((p) => <option key={p}>{p}</option>)}
              </select>
              {(selectedLocation !== "All India" || selectedStatus !== "All Status" || selectedPrice !== "Any Price") && (
                <button
                  onClick={() => { setSelectedLocation("All India"); setSelectedStatus("All Status"); setSelectedPrice("Any Price"); }}
                  className="text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Category Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-navy-900">
              All Categories
              <span className="ml-2 text-sm font-normal text-slate-500">
                {filtered.length} {filtered.length === 1 ? "category" : "categories"}
              </span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No categories match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => navigate(cat.route)}
                    className={cn(
                      "group text-left p-5 rounded-xl border-2 transition-all duration-200",
                      "hover:shadow-card-hover hover:-translate-y-0.5 bg-white",
                      cat.borderColor,
                      "hover:border-navy-300"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", cat.bgColor)}>
                      <Icon className={cn("w-5 h-5", cat.accentColor)} />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-sm mb-1 leading-snug">{cat.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{cat.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", cat.bgColor, cat.accentColor)}>
                        {cat.count.toLocaleString("en-IN")} listings
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-navy-600 transition-colors">
                        Explore <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Popular Searches */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.route)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm bg-white border border-surface-border rounded-full text-slate-600 hover:border-navy-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
              >
                <Search className="w-3 h-3 opacity-50" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Browse by Source */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Browse by Source</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BROWSE_BY_SOURCE.map((src) => {
              const Icon = src.icon;
              return (
                <button
                  key={src.label}
                  onClick={() => navigate("/marketplace")}
                  className="group flex items-center gap-4 p-4 bg-white border border-surface-border rounded-xl hover:border-navy-300 hover:shadow-card transition-all text-left"
                >
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-navy-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy-900 text-sm">{src.label}</p>
                    <p className="text-xs text-slate-500 truncate">{src.sublabel}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-navy-700">{src.count}</p>
                    <p className="text-xs text-slate-400">auctions</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Not sure where to start */}
        <div className="bg-navy-900 rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-saffron-400" />
              <p className="text-saffron-400 text-sm font-medium">Not sure where to start?</p>
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Let us help you find the right auction
            </h3>
            <p className="text-navy-300 text-sm leading-relaxed max-w-lg">
              Answer a few quick questions about what you're looking for — category, location, budget, and purpose — and we'll surface the most relevant opportunities for you.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/explore")}
              className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Help me find an auction
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
