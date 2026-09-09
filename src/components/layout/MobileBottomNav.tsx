import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, Bookmark, Bell, User } from "lucide-react";
import { cn } from "@/utils/cn";
import { useWatchlist } from "@/context/WatchlistContext";

const TABS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Explore", icon: Search, href: "/explore" },
  { label: "Saved", icon: Bookmark, href: "/saved" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
  { label: "Profile", icon: User, href: "/dashboard" },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { count } = useWatchlist();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-surface-border safe-area-bottom">
      <div className="flex items-stretch">
        {TABS.map((tab) => {
          const isActive =
            tab.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(tab.href);
          return (
            <NavLink
              key={tab.href}
              to={tab.href}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 min-h-[56px] relative"
            >
              <div className="relative">
                <tab.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-navy-900" : "text-navy-400"
                  )}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                {tab.label === "Saved" && count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-saffron-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium leading-none",
                  isActive ? "text-navy-900" : "text-navy-400"
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-navy-900 rounded-full" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
