import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  Bookmark,
  ChevronDown,
  LogIn,
  UserPlus,
  Gavel,
  LayoutDashboard,
  LogOut,
  User,
  Crown,
  Zap,
  BadgeCheck,
  Sparkles,
  Gift,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { useNilvaa } from "@/context/NilvaaContext";
import type { NilvaaTier } from "@/context/NilvaaContext";

const NAV_LINKS = [
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "Marketplace", href: "/marketplace" },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Beginner Guide", href: "/beginner-guide" },
      { label: "Auction Calendar", href: "/calendar" },
      { label: "Help & FAQ", href: "/help" },
    ],
  },
  { label: "Earn Benefits", href: "/earn-benefits" },
];

function TierChipIcon({ tier, className }: { tier: NilvaaTier; className?: string }) {
  const cls = cn("w-3.5 h-3.5", className);
  switch (tier) {
    case "vip":      return <Crown className={cls} />;
    case "advanced": return <Zap className={cls} />;
    case "premium":  return <BadgeCheck className={cls} />;
    default:         return <Sparkles className={cls} />;
  }
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { count: savedCount } = useWatchlist();
  const { tier, tierInfo } = useNilvaa();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const transparent = isHome && !scrolled;

  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    transparent
      ? "bg-transparent border-transparent"
      : "bg-white/96 backdrop-blur-md shadow-nav border-b border-surface-border"
  );

  const textClass = transparent ? "text-white" : "text-navy-800";
  const logoTextClass = transparent ? "text-white" : "text-navy-900";
  const taglineClass = transparent ? "text-white/60" : "text-navy-400";

  return (
    <>
      <header className={headerClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div
                className={cn(
                  "w-8 h-8 rounded flex items-center justify-center",
                  transparent ? "bg-white/20" : "bg-navy-900"
                )}
              >
                <Gavel className={cn("w-4 h-4", transparent ? "text-white" : "text-white")} />
              </div>
              <div>
                <span
                  className={cn(
                    "text-xl font-bold tracking-tight leading-none block",
                    logoTextClass
                  )}
                >
                  Nilami
                </span>
                <span className={cn("text-[10px] leading-none font-medium tracking-wider uppercase", taglineClass)}>
                  Find · Understand · Bid
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors",
                        textClass,
                        transparent
                          ? "hover:bg-white/10"
                          : "hover:bg-navy-50 hover:text-navy-900"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-panel border border-surface-border py-1 z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 hover:text-navy-900 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded transition-colors",
                      textClass,
                      transparent
                        ? "hover:bg-white/10"
                        : "hover:bg-navy-50 hover:text-navy-900",
                      location.pathname === link.href && !transparent
                        ? "bg-navy-50 text-navy-900"
                        : ""
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/saved"
                    className={cn(
                      "relative hidden sm:flex items-center justify-center w-9 h-9 rounded-full transition-colors",
                      transparent
                        ? "text-white hover:bg-white/10"
                        : "text-navy-600 hover:bg-navy-50"
                    )}
                    title="Saved Auctions"
                  >
                    <Bookmark className="w-4.5 h-4.5" />
                    {savedCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-saffron-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                        {savedCount > 9 ? "9+" : savedCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/alerts"
                    className={cn(
                      "hidden sm:flex items-center justify-center w-9 h-9 rounded-full transition-colors",
                      transparent
                        ? "text-white hover:bg-white/10"
                        : "text-navy-600 hover:bg-navy-50"
                    )}
                    title="Alerts"
                  >
                    <Bell className="w-4.5 h-4.5" />
                  </Link>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                        transparent
                          ? "text-white border border-white/30 hover:bg-white/10"
                          : "text-navy-700 border border-surface-border hover:bg-navy-50"
                      )}
                    >
                      <div className="w-6 h-6 rounded-full bg-navy-600 flex items-center justify-center text-white text-xs font-bold">
                        {user?.name?.[0] ?? "U"}
                      </div>
                      <span className="hidden sm:block max-w-[72px] truncate">
                        {user?.name?.split(" ")[0]}
                      </span>
                      {/* Tier chip — only in white-bg (scrolled) mode */}
                      {!transparent && (
                        <span className={cn(
                          "hidden lg:inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                          tierInfo.colorClasses.badge
                        )}>
                          <TierChipIcon tier={tier} />
                          {tierInfo.label}
                        </span>
                      )}
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    </button>

                    {userMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setUserMenuOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-panel border border-surface-border z-50 py-1">
                          {/* User info header */}
                          <div className="px-4 py-3 border-b border-surface-border">
                            <p className="text-sm font-semibold text-navy-900">{user?.name}</p>
                            <p className="text-xs text-navy-500 truncate">{user?.email}</p>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              <span className={cn(
                                "inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                                tierInfo.colorClasses.badge
                              )}>
                                <TierChipIcon tier={tier} />
                                NILVAA {tierInfo.label}
                              </span>
                            </div>
                          </div>

                          {/* NILVAA Membership — first link */}
                          <Link
                            to="/membership"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-navy-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <TierChipIcon tier={tier} className={cn("w-4 h-4", tierInfo.colorClasses.text)} />
                            <span className={cn("font-semibold", tierInfo.colorClasses.text)}>NILVAA Membership</span>
                          </Link>

                          <div className="border-t border-surface-border" />

                          <Link
                            to="/dashboard"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            My Dashboard
                          </Link>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            Profile & KYC
                          </Link>
                          <Link
                            to="/my-bids"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Gavel className="w-4 h-4" />
                            My Bids
                          </Link>

                          <div className="border-t border-surface-border mt-1 pt-1">
                            <button
                              onClick={() => {
                                logout();
                                setUserMenuOpen(false);
                                navigate("/");
                              }}
                              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* NILVAA teaser for guests */}
                  <Link
                    to="/membership"
                    className={cn(
                      "hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors",
                      transparent
                        ? "text-white/80 border-white/25 hover:bg-white/10"
                        : "text-navy-600 border-surface-border hover:bg-navy-50"
                    )}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    NILVAA
                  </Link>
                  <Link
                    to="/login"
                    className={cn(
                      "hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      transparent
                        ? "text-white hover:bg-white/10"
                        : "text-navy-700 hover:bg-navy-50"
                    )}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 btn btn-cta text-sm py-2 px-4"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Register</span>
                    <span className="sm:hidden">Join</span>
                  </Link>
                </>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className={cn(
                  "lg:hidden w-9 h-9 flex items-center justify-center rounded-full ml-1 transition-colors",
                  transparent ? "text-white hover:bg-white/10" : "text-navy-700 hover:bg-navy-50"
                )}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-surface-border shadow-lg">
            <nav className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-3 py-1.5 text-xs font-semibold text-navy-400 uppercase tracking-wider">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              {/* NILVAA link in mobile menu */}
              <Link
                to="/membership"
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
              >
                <Gift className="w-4 h-4" />
                NILVAA Membership
              </Link>
              {!isAuthenticated && (
                <div className="flex gap-2 pt-2 border-t border-surface-border mt-2">
                  <Link to="/login" className="flex-1 btn btn-outline text-center text-sm py-2">
                    Sign In
                  </Link>
                  <Link to="/register" className="flex-1 btn btn-cta text-center text-sm py-2">
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
