import React, { useState } from "react";
import {
  Building2,
  BarChart2,
  Users,
  TrendingUp,
  FileText,
  Eye,
  Edit2,
  Trash2,
  ShieldCheck,
  AlertCircle,
  Plus,
} from "lucide-react";
import { cn } from "@/utils/cn";

const ORG_NAME = "State Bank of India";
const ORG_ZONE = "Mumbai Zone";
const ORG_OFFICER = "Rajesh Kumar Sharma";
const ORG_ROLE = "Authorised Recovery Officer";

const STATS = [
  {
    label: "Active Listings",
    value: "8",
    icon: FileText,
    color: "text-navy-700",
    bg: "bg-navy-50",
  },
  {
    label: "Registered Bidders",
    value: "124",
    icon: Users,
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    label: "Bids Today",
    value: "37",
    icon: TrendingUp,
    color: "text-amber-700",
    bg: "bg-amber-50",
  },
  {
    label: "Total Reserve Value",
    value: "₹12.4 Cr",
    icon: BarChart2,
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
];

const LISTINGS = [
  {
    id: "AUC001",
    title: "3BHK Flat, Andheri West, Mumbai",
    ref: "SBI/MUM/2024/001",
    verified: true,
    status: "live",
    reserve: "₹48.5L",
    bidders: 14,
    date: "15 Jan 2024",
    views: 892,
  },
  {
    id: "AUC002",
    title: "2BHK Apartment, Dwarka Sector 7, Delhi",
    ref: "SBI/DEL/2024/002",
    verified: true,
    status: "upcoming",
    reserve: "₹65L",
    bidders: 8,
    date: "20 Jan 2024",
    views: 543,
  },
  {
    id: "AUC011",
    title: "Commercial Shop, Fort Area, Mumbai",
    ref: "SBI/MUM/2024/011",
    verified: false,
    status: "upcoming",
    reserve: "₹1.2 Cr",
    bidders: 5,
    date: "25 Jan 2024",
    views: 324,
  },
  {
    id: "AUC014",
    title: "Factory Shed, Bhiwandi Industrial Zone",
    ref: "SBI/MUM/2024/014",
    verified: true,
    status: "live",
    reserve: "₹85L",
    bidders: 3,
    date: "16 Jan 2024",
    views: 211,
  },
  {
    id: "AUC017",
    title: "Plot, Navi Mumbai Sector 12",
    ref: "SBI/MUM/2024/017",
    verified: false,
    status: "upcoming",
    reserve: "₹42L",
    bidders: 0,
    date: "28 Jan 2024",
    views: 98,
  },
  {
    id: "AUC019",
    title: "Office Space, BKC, Mumbai",
    ref: "SBI/MUM/2024/019",
    verified: true,
    status: "closed",
    reserve: "₹2.3 Cr",
    bidders: 22,
    date: "5 Jan 2024",
    views: 1240,
  },
  {
    id: "AUC020",
    title: "Warehouse, Taloja MIDC",
    ref: "SBI/MUM/2024/020",
    verified: true,
    status: "live",
    reserve: "₹1.8 Cr",
    bidders: 6,
    date: "17 Jan 2024",
    views: 305,
  },
  {
    id: "AUCX21",
    title: "Residential Bungalow, Thane West",
    ref: "SBI/MUM/2024/021",
    verified: false,
    status: "upcoming",
    reserve: "₹1.1 Cr",
    bidders: 2,
    date: "30 Jan 2024",
    views: 67,
  },
];

const REGISTRATIONS = [
  {
    name: "Priya Mehta",
    email: "p.mehta@gmail.com",
    auctionRef: "SBI/MUM/2024/001",
    emd: "₹97,000",
    date: "10 Jan 2024",
    status: "approved",
  },
  {
    name: "Suresh Rajan",
    email: "s.rajan@outlook.com",
    auctionRef: "SBI/MUM/2024/001",
    emd: "₹97,000",
    date: "11 Jan 2024",
    status: "approved",
  },
  {
    name: "Amit Kapoor",
    email: "akapoor@ymail.com",
    auctionRef: "SBI/DEL/2024/002",
    emd: "₹1,30,000",
    date: "12 Jan 2024",
    status: "pending",
  },
  {
    name: "Meena Bhat",
    email: "meenabhat@gmail.com",
    auctionRef: "SBI/MUM/2024/001",
    emd: "₹97,000",
    date: "12 Jan 2024",
    status: "approved",
  },
  {
    name: "Rahul Desai",
    email: "r.desai@hotmail.com",
    auctionRef: "SBI/MUM/2024/011",
    emd: "₹2,40,000",
    date: "13 Jan 2024",
    status: "pending",
  },
  {
    name: "Kavita Nair",
    email: "kavita.nair@gmail.com",
    auctionRef: "SBI/MUM/2024/014",
    emd: "₹1,70,000",
    date: "14 Jan 2024",
    status: "rejected",
  },
  {
    name: "Deepak Joshi",
    email: "djoshi@rediffmail.com",
    auctionRef: "SBI/DEL/2024/002",
    emd: "₹1,30,000",
    date: "14 Jan 2024",
    status: "approved",
  },
];

const MONTHLY_BIDS = [
  { month: "Sep", count: 12 },
  { month: "Oct", count: 18 },
  { month: "Nov", count: 9 },
  { month: "Dec", count: 24 },
  { month: "Jan", count: 37 },
];

const LISTING_STATUS_BREAKDOWN = [
  { label: "Live", count: 3, color: "bg-green-500" },
  { label: "Upcoming", count: 4, color: "bg-blue-500" },
  { label: "Closed", count: 1, color: "bg-gray-400" },
];

const PAYMENT_SUMMARY = [
  { label: "EMD Collected", value: "₹18.7L" },
  { label: "EMD Pending", value: "₹4.2L" },
  { label: "EMD Refunded", value: "₹6.1L" },
];

const STATUS_BADGE_MAP: Record<string, string> = {
  live: "badge-live",
  upcoming: "badge-upcoming",
  closed: "badge-closed",
  extended: "badge-extended",
};

const REG_STATUS_MAP: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

type OrgTab = "listings" | "registrations" | "analytics";

export default function OrgDashboard() {
  const [activeTab, setActiveTab] = useState<OrgTab>("listings");
  const maxBids = Math.max(...MONTHLY_BIDS.map((b) => b.count));

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-navy-700 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-saffron-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  {ORG_NAME} —{" "}
                  <span className="text-navy-300 font-medium">{ORG_ZONE}</span>
                </h1>
                <p className="text-navy-300 text-sm mt-0.5">
                  {ORG_OFFICER} · {ORG_ROLE}
                </p>
              </div>
            </div>
            <button className="btn btn-cta text-sm flex items-center gap-2 shrink-0">
              <Plus className="w-4 h-4" />
              Add Listing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-surface-border p-5"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                  stat.bg
                )}
              >
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-surface-border">
            {(
              [
                { key: "listings" as OrgTab, label: "My Listings" },
                { key: "registrations" as OrgTab, label: "Registrations" },
                { key: "analytics" as OrgTab, label: "Analytics" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === key
                    ? "border-navy-800 text-navy-900 bg-navy-50/40"
                    : "border-transparent text-gray-500 hover:text-navy-700"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* ── My Listings ── */}
            {activeTab === "listings" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b border-surface-border">
                      <th className="pb-3 font-semibold pr-4">Title / Ref</th>
                      <th className="pb-3 font-semibold pr-4">Status</th>
                      <th className="pb-3 font-semibold pr-4">Reserve</th>
                      <th className="pb-3 font-semibold pr-4">Bidders</th>
                      <th className="pb-3 font-semibold pr-4">Date</th>
                      <th className="pb-3 font-semibold pr-4">Views</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {LISTINGS.map((l) => (
                      <tr
                        key={l.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            {l.verified ? (
                              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                            )}
                            <div>
                              <div className="font-medium text-navy-900 line-clamp-1 max-w-[240px]">
                                {l.title}
                              </div>
                              <div className="text-xs text-gray-400 font-mono">
                                {l.ref}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={cn(
                              "badge text-xs",
                              STATUS_BADGE_MAP[l.status] ?? "badge-upcoming"
                            )}
                          >
                            {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 pr-4 font-semibold text-navy-800">
                          {l.reserve}
                        </td>
                        <td className="py-3 pr-4 text-gray-600">{l.bidders}</td>
                        <td className="py-3 pr-4 text-gray-500 text-xs">
                          {l.date}
                        </td>
                        <td className="py-3 pr-4 text-gray-500">
                          {l.views.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <button
                              className="p-1.5 rounded hover:bg-navy-50 text-navy-600 transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded hover:bg-amber-50 text-amber-600 transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── Registrations ── */}
            {activeTab === "registrations" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b border-surface-border">
                      <th className="pb-3 font-semibold pr-4">Bidder</th>
                      <th className="pb-3 font-semibold pr-4">Auction Ref</th>
                      <th className="pb-3 font-semibold pr-4">EMD Paid</th>
                      <th className="pb-3 font-semibold pr-4">Registered</th>
                      <th className="pb-3 font-semibold pr-4">Status</th>
                      <th className="pb-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {REGISTRATIONS.map((r, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3 pr-4">
                          <div className="font-medium text-navy-900">{r.name}</div>
                          <div className="text-xs text-gray-400">{r.email}</div>
                        </td>
                        <td className="py-3 pr-4 text-xs font-mono text-gray-500">
                          {r.auctionRef}
                        </td>
                        <td className="py-3 pr-4 font-semibold text-navy-800">
                          {r.emd}
                        </td>
                        <td className="py-3 pr-4 text-xs text-gray-500">
                          {r.date}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-semibold capitalize",
                              REG_STATUS_MAP[r.status] ??
                                "bg-gray-100 text-gray-600"
                            )}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {r.status === "pending" ? (
                            <button className="text-xs bg-navy-900 text-white px-3 py-1.5 rounded-lg hover:bg-navy-700 transition-colors font-medium">
                              Review
                            </button>
                          ) : (
                            <button className="text-xs text-gray-400 px-3 py-1.5 rounded-lg border border-surface-border hover:bg-gray-50 transition-colors">
                              View
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── Analytics ── */}
            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar chart */}
                <div className="lg:col-span-2 bg-gray-50 rounded-xl p-5 border border-surface-border">
                  <h3 className="text-sm font-semibold text-navy-900 mb-1">
                    Monthly Bid Activity
                  </h3>
                  <p className="text-xs text-gray-400 mb-5">
                    Total bids placed across all active listings
                  </p>
                  <div className="flex items-end gap-3 h-36">
                    {MONTHLY_BIDS.map((b) => (
                      <div
                        key={b.month}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <span className="text-xs font-bold text-navy-700">
                          {b.count}
                        </span>
                        <div
                          className="w-full bg-navy-700 rounded-t transition-all"
                          style={{ height: `${(b.count / maxBids) * 112}px` }}
                        />
                        <span className="text-xs text-gray-500">{b.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right panels */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-surface-border">
                    <h3 className="text-sm font-semibold text-navy-900 mb-3">
                      Listing Status
                    </h3>
                    <div className="space-y-2.5">
                      {LISTING_STATUS_BREAKDOWN.map((s) => (
                        <div
                          key={s.label}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn("w-2.5 h-2.5 rounded-full", s.color)}
                            />
                            <span className="text-xs text-gray-600">
                              {s.label}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-navy-800">
                            {s.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-surface-border">
                    <h3 className="text-sm font-semibold text-navy-900 mb-3">
                      EMD Summary
                    </h3>
                    <div className="space-y-2.5">
                      {PAYMENT_SUMMARY.map((p) => (
                        <div
                          key={p.label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-xs text-gray-500">{p.label}</span>
                          <span className="text-xs font-bold text-navy-900">
                            {p.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
