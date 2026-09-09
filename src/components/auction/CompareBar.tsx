import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GitCompare, X, ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useCompare } from "@/context/CompareContext";
import { MOCK_AUCTIONS } from "@/data/mockData";
import { formatINR } from "@/utils/format";

export default function CompareBar() {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();

  if (compareIds.length === 0) return null;

  const items = compareIds
    .map((id) => MOCK_AUCTIONS.find((a) => a.id === id))
    .filter(Boolean) as (typeof MOCK_AUCTIONS)[0][];

  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-30 bg-navy-900 border-t border-navy-700 shadow-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white shrink-0">
            <GitCompare className="w-4 h-4" />
            <span className="text-sm font-semibold hidden sm:inline">Compare</span>
            <span className="text-xs text-navy-400">({compareIds.length}/3)</span>
          </div>

          <div className="flex-1 flex items-center gap-2 overflow-x-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-navy-800 rounded-lg px-3 py-1.5 shrink-0"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs text-white font-medium line-clamp-1 max-w-[120px]">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-navy-400">{formatINR(item.reservePrice)}</p>
                </div>
                <button
                  onClick={() => removeFromCompare(item.id)}
                  className="text-navy-400 hover:text-white ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {compareIds.length < 3 && (
              <div className="shrink-0 w-32 h-[52px] border border-dashed border-navy-700 rounded-lg flex items-center justify-center text-xs text-navy-500">
                Add {3 - compareIds.length} more
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearCompare}
              className="flex items-center gap-1 text-xs text-navy-400 hover:text-white transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            {compareIds.length >= 2 && (
              <Link
                to="/compare"
                className="flex items-center gap-1.5 btn btn-cta text-xs py-2 px-3"
              >
                Compare
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
