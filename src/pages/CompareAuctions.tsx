import React from "react";
import { Link } from "react-router-dom";
import {
  Scale, Plus, Trash2, ExternalLink, XCircle,
} from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { MOCK_AUCTIONS } from "@/data/mockData";
import VerificationBadge from "@/components/auction/VerificationBadge";
import { EmptyState } from "@/components/common/EmptyState";
import {
  formatINR, formatDate, getStatusClass, getStatusLabel, getTypeLabel,
} from "@/utils/format";
import { cn } from "@/utils/cn";
import type { Auction } from "@/types";

/* ───────── comparison row definitions ───────── */
const ROWS: {
  label: string;
  render: (a: Auction) => React.ReactNode;
}[] = [
  {
    label: "Reserve Price",
    render: (a) => (
      <span className="text-lg font-bold text-navy-900">{formatINR(a.reservePrice)}</span>
    ),
  },
  {
    label: "EMD Amount",
    render: (a) => (
      <span className="font-semibold text-navy-800">{formatINR(a.emdAmount)}</span>
    ),
  },
  {
    label: "Bid Increment",
    render: (a) => <span className="text-navy-700">{formatINR(a.bidIncrement)}</span>,
  },
  {
    label: "Asset Type",
    render: (a) => (
      <span className="badge badge-upcoming capitalize">{getTypeLabel(a.type)}</span>
    ),
  },
  {
    label: "Status",
    render: (a) => (
      <span className={cn("badge", getStatusClass(a.status))}>{getStatusLabel(a.status)}</span>
    ),
  },
  {
    label: "Location",
    render: (a) => (
      <div>
        <div className="font-medium text-navy-800">{a.location.city}</div>
        <div className="text-xs text-navy-500">{a.location.state}</div>
      </div>
    ),
  },
  {
    label: "Organisation",
    render: (a) => (
      <div>
        <div className="font-medium text-navy-800">{a.organization.name}</div>
        <div className="text-xs text-navy-500 uppercase tracking-wide">
          {a.organization.type}
        </div>
      </div>
    ),
  },
  {
    label: "Auction Start",
    render: (a) => <span className="text-navy-700">{formatDate(a.auctionStartDate)}</span>,
  },
  {
    label: "Auction End",
    render: (a) => <span className="text-navy-700">{formatDate(a.auctionEndDate)}</span>,
  },
  {
    label: "Verification",
    render: (a) => <VerificationBadge status={a.verificationStatus} mini />,
  },
  {
    label: "Overall Score",
    render: (a) =>
      a.score ? (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xl font-bold",
              a.score.overall >= 80
                ? "text-green-600"
                : a.score.overall >= 60
                ? "text-amber-600"
                : "text-red-500"
            )}
          >
            {a.score.overall}
          </span>
          <span className="text-sm text-navy-400">/ 100</span>
        </div>
      ) : (
        <span className="text-navy-400 text-sm italic">Not rated</span>
      ),
  },
  {
    label: "Tags",
    render: (a) => (
      <div className="flex flex-wrap gap-1">
        {a.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-navy-50 text-navy-600 border border-navy-100 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    label: "Eligibility",
    render: (a) => (
      <p className="text-sm text-navy-600 leading-relaxed line-clamp-3">{a.eligibility}</p>
    ),
  },
];

/* ───────── component ───────── */
const CompareAuctions: React.FC = () => {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();

  const auctions = compareIds
    .map((id) => MOCK_AUCTIONS.find((a) => a.id === id))
    .filter((a): a is Auction => Boolean(a));

  if (auctions.length === 0) {
    return (
      <div className="min-h-screen bg-surface-bg py-20">
        <div className="max-w-2xl mx-auto px-4">
          <EmptyState
            icon={<Scale className="w-12 h-12 text-navy-300" />}
            title="No auctions selected for comparison"
            description="Add up to 3 auctions to compare them side by side. Look for the Compare button on any auction card or listing page."
            ctaLabel="Explore Auctions"
            ctaHref="/explore"
          />
        </div>
      </div>
    );
  }

  const colCount = auctions.length;
  const hasSlot = colCount < 3;

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* ── page header ── */}
      <div className="bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-navy-700" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-navy-900">Compare Auctions</h1>
                <p className="text-sm text-navy-500">
                  {colCount} auction{colCount > 1 ? "s" : ""} selected — up to 3 supported
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {hasSlot && (
                <Link to="/explore" className="btn btn-outline text-sm flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  Add Auction
                </Link>
              )}
              <button
                onClick={clearCompare}
                className="btn btn-ghost text-sm text-red-500 hover:bg-red-50 flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── auction header cards ── */}
        <div className="overflow-x-auto pb-2">
          <div
            className="grid gap-4 min-w-[640px]"
            style={{
              gridTemplateColumns: `200px repeat(${colCount + (hasSlot ? 1 : 0)}, 1fr)`,
            }}
          >
            {/* label column spacer */}
            <div />
            {auctions.map((auction) => (
              <div key={auction.id} className="card p-4 relative min-w-0">
                <button
                  onClick={() => removeFromCompare(auction.id)}
                  title="Remove"
                  className="absolute top-3 right-3 text-navy-300 hover:text-red-500 hover:bg-red-50 w-7 h-7 flex items-center justify-center rounded transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
                <img
                  src={auction.images[0]}
                  alt={auction.title}
                  className="w-full h-28 object-cover rounded-md mb-3"
                  loading="lazy"
                />
                <h3 className="font-semibold text-navy-900 text-sm line-clamp-2 mb-1 pr-5">
                  {auction.title}
                </h3>
                <p className="text-xs text-navy-400 font-mono mb-3">{auction.auctionRefId}</p>
                <Link
                  to={`/auction/${auction.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-navy-900 transition-colors"
                >
                  View Full Details
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
            {/* add-more slot */}
            {hasSlot && (
              <Link
                to="/explore"
                className="card p-4 flex flex-col items-center justify-center border-dashed border-2 border-navy-200 hover:border-navy-400 transition-colors min-h-[180px] text-navy-400 hover:text-navy-600 rounded-xl"
              >
                <Plus className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Add Auction</span>
              </Link>
            )}
          </div>
        </div>

        {/* ── comparison table ── */}
        <div className="card overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <colgroup>
                <col style={{ width: "200px" }} />
                {auctions.map((a) => (
                  <col key={a.id} />
                ))}
                {hasSlot && <col />}
              </colgroup>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b border-surface-border last:border-0",
                      i % 2 === 0 ? "bg-white" : "bg-surface-bg/50"
                    )}
                  >
                    <td className="px-5 py-4 font-medium text-navy-600 text-sm bg-navy-50/40 border-r border-surface-border">
                      {row.label}
                    </td>
                    {auctions.map((auction) => (
                      <td key={auction.id} className="px-5 py-4 text-sm">
                        {row.render(auction)}
                      </td>
                    ))}
                    {hasSlot && <td className="px-5 py-4" />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── bottom CTA strip ── */}
        <div className="mt-8 bg-navy-900 rounded-xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold text-white">Ready to participate?</p>
            <p className="text-sm text-navy-300 mt-0.5">
              Register to bid on any of these auctions. EMD deposit required before bidding.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {auctions.map((a) => (
              <Link
                key={a.id}
                to={`/auction/${a.id}`}
                className="btn bg-saffron-500 hover:bg-saffron-600 text-white border-0 text-sm"
              >
                Bid on {a.auctionRefId}
              </Link>
            ))}
          </div>
        </div>

        {/* disclaimer */}
        <p className="text-xs text-navy-400 text-center mt-6 leading-relaxed">
          Comparison data is sourced from published auction notices. Verify all details directly
          with the organizing authority before submitting bids. Nilami does not guarantee accuracy
          of third-party information.
        </p>
      </div>
    </div>
  );
};

export default CompareAuctions;
