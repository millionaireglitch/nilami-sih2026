import React, { useState } from "react";
import {
  ShieldCheck,
  Users,
  LayoutList,
  Building2,
  ClipboardCheck,
  Eye,
  UserCheck,
  UserX,
  Flag,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";
import { cn } from "../utils/cn";

// ─── Inline constants ────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  buyer: "Buyer",
  org_admin: "Org Admin",
  admin: "Platform Admin",
  guest: "Guest",
};

const STATUS_BADGE: Record<string, string> = {
  active: "badge bg-green-100 text-green-700 border border-green-200",
  suspended: "badge bg-red-100 text-red-700 border border-red-200",
  pending: "badge bg-amber-100 text-amber-700 border border-amber-200",
};

const LISTING_STATUS: Record<
  string,
  { label: string; cls: string }
> = {
  live: { label: "Live", cls: "badge-live" },
  upcoming: { label: "Upcoming", cls: "badge-upcoming" },
  closed: { label: "Closed", cls: "badge-closed" },
  pending_review: {
    label: "Pending Review",
    cls: "badge bg-amber-100 text-amber-700 border border-amber-200",
  },
};

const PRIORITY_BADGE: Record<string, string> = {
  high: "badge bg-red-100 text-red-700 border border-red-200",
  medium: "badge bg-amber-100 text-amber-700 border border-amber-200",
  low: "badge bg-blue-100 text-blue-700 border border-blue-200",
};

// ─── Data ────────────────────────────────────────────────────────────────────

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  registered: string;
  bids: number;
  status: "active" | "suspended" | "pending";
}

interface AdminListing {
  id: string;
  title: string;
  ref: string;
  org: string;
  status: string;
  reserve: string;
  flagged: boolean;
}

interface AdminOrg {
  id: string;
  name: string;
  type: string;
  listings: number;
  verificationStatus: "verified" | "pending" | "rejected";
  registeredOn: string;
}

interface VerificationItem {
  id: string;
  ref: string;
  title: string;
  org: string;
  priority: "high" | "medium" | "low";
  issue: string;
  submittedOn: string;
  status: "pending" | "approved" | "rejected";
}

const ADMIN_USERS: AdminUser[] = [
  { id: "U001", name: "Rajesh Kumar Sharma", email: "rajesh.sharma@gmail.com", role: "buyer", registered: "12 Jan 2024", bids: 8, status: "active" },
  { id: "U002", name: "Priya Nair", email: "priya.nair@hdfc.co.in", role: "org_admin", registered: "03 Mar 2024", bids: 0, status: "active" },
  { id: "U003", name: "Mohammed Imran", email: "imran.m@outlook.com", role: "buyer", registered: "27 Feb 2024", bids: 14, status: "active" },
  { id: "U004", name: "Sunita Agarwal", email: "sunita.agarwal@yahoo.com", role: "buyer", registered: "15 Apr 2024", bids: 2, status: "suspended" },
  { id: "U005", name: "Vivek Joshi", email: "vivek.joshi@pnb.co.in", role: "org_admin", registered: "08 May 2024", bids: 0, status: "active" },
  { id: "U006", name: "Anita Menon", email: "anita.menon@gmail.com", role: "buyer", registered: "22 Jun 2024", bids: 5, status: "pending" },
  { id: "U007", name: "Deepak Singh", email: "deepak.singh@nilami.in", role: "admin", registered: "01 Jan 2024", bids: 0, status: "active" },
  { id: "U008", name: "Kavitha Reddy", email: "kavitha.r@iocl.com", role: "org_admin", registered: "19 Jul 2024", bids: 0, status: "active" },
];

const ADMIN_LISTINGS: AdminListing[] = [
  { id: "AUC001", title: "2BHK Residential Flat — Andheri East, Mumbai", ref: "SBI/MUM/2024/AUC001", org: "State Bank of India", status: "live", reserve: "₹48.5 L", flagged: false },
  { id: "AUC002", title: "3BHK Apartment — Dwarka Sector 12, Delhi", ref: "PNB/DEL/2024/AUC002", org: "Punjab National Bank", status: "upcoming", reserve: "₹65 L", flagged: false },
  { id: "AUC003", title: "Commercial Space — MG Road, Bengaluru", ref: "HDFC/BLR/2024/AUC003", org: "HDFC Bank", status: "live", reserve: "₹2.5 Cr", flagged: false },
  { id: "AUC007", title: "Industrial Plot — Bhiwandi, Thane", ref: "IOCL/MUM/2024/AUC007", org: "IOCL", status: "pending_review", reserve: "₹8.2 Cr", flagged: true },
  { id: "AUC009", title: "Luxury Villa — Jubilee Hills, Hyderabad", ref: "AXIS/HYD/2024/AUC009", org: "Axis Bank", status: "live", reserve: "₹3.8 Cr", flagged: false },
  { id: "AUC011", title: "Agricultural Land — Nashik, Maharashtra", ref: "UBI/PUN/2024/AUC011", org: "Union Bank of India", status: "upcoming", reserve: "₹42 L", flagged: true },
  { id: "AUC015", title: "SUV Toyota Fortuner 2021 — Chennai", ref: "ICICI/CHN/2024/AUC015", org: "ICICI Bank", status: "closed", reserve: "₹12.8 L", flagged: false },
  { id: "AUC018", title: "Commercial Warehouse — Pune MIDC", ref: "BOB/PUN/2024/AUC018", org: "Bank of Baroda", status: "upcoming", reserve: "₹1.1 Cr", flagged: false },
];

const ADMIN_ORGS: AdminOrg[] = [
  { id: "ORG01", name: "State Bank of India", type: "Public Sector Bank", listings: 48, verificationStatus: "verified", registeredOn: "01 Jan 2024" },
  { id: "ORG02", name: "Punjab National Bank", type: "Public Sector Bank", listings: 31, verificationStatus: "verified", registeredOn: "05 Jan 2024" },
  { id: "ORG03", name: "HDFC Bank", type: "Private Bank", listings: 22, verificationStatus: "verified", registeredOn: "10 Jan 2024" },
  { id: "ORG04", name: "ICICI Bank", type: "Private Bank", listings: 19, verificationStatus: "verified", registeredOn: "10 Jan 2024" },
  { id: "ORG05", name: "IOCL", type: "Government Enterprise", listings: 7, verificationStatus: "verified", registeredOn: "15 Feb 2024" },
  { id: "ORG06", name: "MCD (Municipal Corporation of Delhi)", type: "Government Body", listings: 5, verificationStatus: "pending", registeredOn: "20 Jun 2024" },
  { id: "ORG07", name: "Axis Bank", type: "Private Bank", listings: 14, verificationStatus: "verified", registeredOn: "12 Jan 2024" },
  { id: "ORG08", name: "Kotak Mahindra Bank", type: "Private Bank", listings: 9, verificationStatus: "pending", registeredOn: "10 Aug 2024" },
];

const VERIFICATIONS_INIT: VerificationItem[] = [
  { id: "VER001", ref: "IOCL/MUM/2024/AUC007", title: "Industrial Plot — Bhiwandi, Thane", org: "IOCL", priority: "high", issue: "Missing encumbrance certificate and property title documents.", submittedOn: "28 Aug 2024", status: "pending" },
  { id: "VER002", ref: "UBI/PUN/2024/AUC011", title: "Agricultural Land — Nashik, Maharashtra", org: "Union Bank of India", priority: "high", issue: "Land use classification inconsistency — document states agricultural but listing shows mixed-use.", submittedOn: "30 Aug 2024", status: "pending" },
  { id: "VER003", ref: "MCD/DEL/2024/AUC019", title: "Commercial Plot — Rohini, Delhi", org: "MCD", priority: "medium", issue: "Organisation not yet verified on platform. Awaiting registration confirmation.", submittedOn: "02 Sep 2024", status: "pending" },
  { id: "VER004", ref: "KMB/BLR/2024/AUC021", title: "Office Suite — Whitefield, Bengaluru", org: "Kotak Mahindra Bank", priority: "medium", issue: "Reserve price appears inconsistent with market valuation report provided.", submittedOn: "03 Sep 2024", status: "pending" },
  { id: "VER005", ref: "CNR/HYD/2024/AUC022", title: "Vehicle Lot — 4x Maruti Suzuki Swift", org: "Canara Bank", priority: "low", issue: "RC documents missing for 2 of 4 vehicles in the lot.", submittedOn: "04 Sep 2024", status: "pending" },
];

// ─── Stat cards ───────────────────────────────────────────────────────────────

const STAT_CARDS = [
  { label: "Total Users", value: "2,841", change: "+34 this week", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Auctions", value: "143", change: "+12 since yesterday", icon: Activity, color: "text-green-600", bg: "bg-green-50" },
  { label: "Pending Verifications", value: "12", change: "5 high priority", icon: ClipboardCheck, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Registered Orgs", value: "38", change: "2 pending approval", icon: Building2, color: "text-navy-600", bg: "bg-navy-50" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const TABS = [
  { key: "users", label: "Users", icon: Users },
  { key: "listings", label: "Listings", icon: LayoutList },
  { key: "orgs", label: "Organisations", icon: Building2 },
  { key: "verifications", label: "Verifications", icon: ClipboardCheck },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [verifications, setVerifications] = useState<VerificationItem[]>(VERIFICATIONS_INIT);

  const pendingVerifications = verifications.filter((v) => v.status === "pending");
  const allResolved =
    verifications.length > 0 && verifications.every((v) => v.status !== "pending");

  function handleVerify(id: string, action: "approved" | "rejected") {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: action } : v))
    );
  }

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-saffron-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Nilami — Internal Admin Console</h1>
                <p className="text-navy-200 text-sm mt-0.5">Platform administration · Restricted access</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-navy-300 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Last sync: just now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((s) => (
            <div key={s.label} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="stat-label mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-navy-900">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {s.change}
                  </p>
                </div>
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", s.bg)}>
                  <s.icon className={cn("w-5 h-5", s.color)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div>
          <div className="flex gap-1 border-b border-surface-border overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                  activeTab === t.key
                    ? "border-navy-700 text-navy-800"
                    : "border-transparent text-gray-500 hover:text-navy-700"
                )}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
                {t.key === "verifications" && pendingVerifications.length > 0 && (
                  <span className="ml-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full px-1.5 py-0.5 border border-amber-200">
                    {pendingVerifications.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {/* ── Users tab ─────────────────────────────────── */}
            {activeTab === "users" && (
              <div className="card overflow-hidden">
                <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between">
                  <h2 className="font-semibold text-navy-900">Registered Users</h2>
                  <span className="text-sm text-gray-500">{ADMIN_USERS.length} shown</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-surface-border">
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Email</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Registered</th>
                        <th className="text-center px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Bids</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                        <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      {ADMIN_USERS.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-medium text-navy-900">{u.name}</div>
                            <div className="text-xs text-gray-400 md:hidden">{u.email}</div>
                          </td>
                          <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className="badge bg-gray-100 text-gray-700 border border-gray-200">
                              {ROLE_LABELS[u.role] ?? u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{u.registered}</td>
                          <td className="px-4 py-3 text-center text-gray-600 hidden lg:table-cell">{u.bids}</td>
                          <td className="px-4 py-3">
                            <span className={STATUS_BADGE[u.status]}>
                              {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                title="View profile"
                                className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-navy-700 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                title="Approve / activate"
                                className="p-1.5 rounded hover:bg-green-50 text-gray-500 hover:text-green-600 transition-colors"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                              <button
                                title="Suspend user"
                                className="p-1.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Listings tab ───────────────────────────────── */}
            {activeTab === "listings" && (
              <div className="card overflow-hidden">
                <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between">
                  <h2 className="font-semibold text-navy-900">All Listings</h2>
                  <span className="text-sm text-gray-500">{ADMIN_LISTINGS.length} shown</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-surface-border">
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Ref No.</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Organisation</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Reserve</th>
                        <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      {ADMIN_LISTINGS.map((l) => {
                        const st = LISTING_STATUS[l.status] ?? { label: l.status, cls: "badge" };
                        return (
                          <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-start gap-2">
                                <div>
                                  <div className="font-medium text-navy-900 leading-snug">{l.title}</div>
                                  {l.flagged && (
                                    <span className="inline-flex items-center gap-1 text-xs text-red-600 mt-0.5">
                                      <Flag className="w-3 h-3" /> Flagged
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-500 font-mono text-xs hidden md:table-cell">{l.ref}</td>
                            <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{l.org}</td>
                            <td className="px-4 py-3">
                              <span className={st.cls}>{st.label}</span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-navy-800 hidden sm:table-cell">{l.reserve}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  title="View listing"
                                  className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-navy-700 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  title={l.flagged ? "Flagged — review" : "Flag listing"}
                                  className={cn(
                                    "p-1.5 rounded transition-colors",
                                    l.flagged
                                      ? "bg-red-50 text-red-500"
                                      : "hover:bg-red-50 text-gray-400 hover:text-red-500"
                                  )}
                                >
                                  <Flag className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Organisations tab ──────────────────────────── */}
            {activeTab === "orgs" && (
              <div className="card overflow-hidden">
                <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between">
                  <h2 className="font-semibold text-navy-900">Registered Organisations</h2>
                  <span className="text-sm text-gray-500">{ADMIN_ORGS.length} shown</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-surface-border">
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Organisation</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Type</th>
                        <th className="text-center px-4 py-3 font-medium text-gray-600">Listings</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Verification</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Registered</th>
                        <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      {ADMIN_ORGS.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-navy-900">{o.name}</td>
                          <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{o.type}</td>
                          <td className="px-4 py-3 text-center text-navy-700 font-semibold">{o.listings}</td>
                          <td className="px-4 py-3">
                            {o.verificationStatus === "verified" ? (
                              <span className="inline-flex items-center gap-1.5 badge badge-verified">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Verified
                              </span>
                            ) : o.verificationStatus === "pending" ? (
                              <span className="inline-flex items-center gap-1.5 badge bg-amber-100 text-amber-700 border border-amber-200">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                Pending
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 badge bg-red-100 text-red-700 border border-red-200">
                                <XCircle className="w-3.5 h-3.5" />
                                Rejected
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{o.registeredOn}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-navy-700 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              {o.verificationStatus === "pending" && (
                                <button className="btn text-xs py-1 px-3 bg-navy-800 text-white hover:bg-navy-700 transition-colors rounded">
                                  Approve
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Verifications tab ──────────────────────────── */}
            {activeTab === "verifications" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-navy-900">
                    Verification Queue
                  </h2>
                  <span className="text-sm text-gray-500">
                    {pendingVerifications.length} pending · {verifications.length - pendingVerifications.length} resolved
                  </span>
                </div>

                {allResolved ? (
                  <div className="card p-12 text-center">
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-lg mb-1">All verifications resolved</h3>
                    <p className="text-gray-500 text-sm">The queue is clear. New submissions will appear here.</p>
                  </div>
                ) : (
                  verifications.map((v) => (
                    <div
                      key={v.id}
                      className={cn(
                        "card p-5 transition-opacity",
                        v.status !== "pending" && "opacity-50"
                      )}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={PRIORITY_BADGE[v.priority]}>
                              {v.priority.charAt(0).toUpperCase() + v.priority.slice(1)} Priority
                            </span>
                            <span className="text-xs font-mono text-gray-400">{v.ref}</span>
                            {v.status !== "pending" && (
                              <span
                                className={cn(
                                  "badge",
                                  v.status === "approved"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                                )}
                              >
                                {v.status === "approved" ? "Approved" : "Rejected"}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-navy-900 mb-0.5 leading-snug">{v.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">{v.org}</p>
                          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800">{v.issue}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Submitted: {v.submittedOn}</p>
                        </div>

                        {v.status === "pending" && (
                          <div className="flex sm:flex-col gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleVerify(v.id, "approved")}
                              className="flex items-center gap-1.5 btn text-sm py-1.5 px-4 bg-green-600 text-white hover:bg-green-700 transition-colors rounded"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleVerify(v.id, "rejected")}
                              className="flex items-center gap-1.5 btn text-sm py-1.5 px-4 bg-white border border-red-300 text-red-600 hover:bg-red-50 transition-colors rounded"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
