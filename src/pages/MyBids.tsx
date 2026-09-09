import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_BIDS } from '@/data/mockData';
import { formatINR, formatDateTime, formatDate } from '@/utils/format';
import type { BidStatus } from '@/types';

const STATUS_TABS: { key: BidStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All Bids' },
  { key: 'active', label: 'Active' },
  { key: 'outbid', label: 'Outbid' },
  { key: 'won', label: 'Won' },
  { key: 'lost', label: 'Lost' },
];

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active: { label: 'Active Bidder', className: 'bg-emerald-100 text-emerald-800' },
  outbid: { label: 'Outbid', className: 'bg-amber-100 text-amber-800' },
  won: { label: 'Won', className: 'bg-blue-100 text-blue-800' },
  lost: { label: 'Lost', className: 'bg-red-100 text-red-800' },
  pending: { label: 'Pending', className: 'bg-navy-100 text-navy-700' },
};

export default function MyBids() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<BidStatus | 'all'>('all');
  const [sortAsc, setSortAsc] = useState(false);

  if (!user) return <Navigate to="/login" state={{ from: '/bids' }} replace />;

  const filtered = MOCK_BIDS.filter(b => activeTab === 'all' || b.status === activeTab);
  const sorted = [...filtered].sort((a, b) =>
    sortAsc
      ? new Date(a.bidTime).getTime() - new Date(b.bidTime).getTime()
      : new Date(b.bidTime).getTime() - new Date(a.bidTime).getTime()
  );

  const counts: Record<string, number> = {
    all: MOCK_BIDS.length,
    active: MOCK_BIDS.filter(b => b.status === 'active').length,
    outbid: MOCK_BIDS.filter(b => b.status === 'outbid').length,
    won: MOCK_BIDS.filter(b => b.status === 'won').length,
    lost: MOCK_BIDS.filter(b => b.status === 'lost').length,
  };

  const totalBidValue = MOCK_BIDS.filter(b => b.status === 'active').reduce((s, b) => s + b.amount, 0);

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Header */}
      <div className="bg-navy-900 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-navy-300 mb-3 flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>›</span>
            <span className="text-white">My Bids</span>
          </nav>
          <h1 className="text-2xl font-bold text-white">My Bids</h1>
          <p className="text-navy-300 text-sm mt-1">Track all your auction participation and bid status.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Bids', value: MOCK_BIDS.length, color: 'text-navy-700' },
            { label: 'Active', value: counts.active, color: 'text-emerald-700' },
            { label: 'Outbid', value: counts.outbid, color: 'text-amber-700' },
            { label: 'Won', value: counts.won, color: 'text-blue-700' },
          ].map(c => (
            <div key={c.label} className="card p-4 text-center">
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
              <p className="text-xs text-navy-500 mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>

        {totalBidValue > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 text-sm text-emerald-800">
            You have <strong>{formatINR(totalBidValue)}</strong> in active bids across {counts.active} auction{counts.active !== 1 ? 's' : ''}.
          </div>
        )}

        {/* Filter tabs */}
        <div className="card overflow-hidden">
          <div className="flex border-b border-surface-border overflow-x-auto">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-navy-700 text-navy-900'
                    : 'border-transparent text-navy-500 hover:text-navy-700'
                }`}
              >
                {tab.label}
                <span className="ml-1.5 text-xs text-navy-400">({counts[tab.key] ?? 0})</span>
              </button>
            ))}
          </div>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 text-xs font-semibold text-navy-400 uppercase tracking-wider bg-surface-bg border-b border-surface-border">
            <span>Auction</span>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center gap-1 hover:text-navy-700 transition-colors"
            >
              Bid Date {sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <span>Bid Amount</span>
            <span>Reserve Price</span>
            <span>Status</span>
          </div>

          {sorted.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-navy-400 text-sm">No bids in this category.</p>
              <Link to="/explore" className="btn btn-primary mt-4 text-sm">Explore Auctions</Link>
            </div>
          ) : (
            <div className="divide-y divide-surface-border">
              {sorted.map(bid => {
                const cfg = STATUS_CONFIG[bid.status];
                const isAboveReserve = bid.amount >= bid.reservePrice;
                return (
                  <div key={bid.id} className="p-4 md:p-0">
                    {/* Mobile layout */}
                    <div className="md:hidden flex gap-3">
                      <img src={bid.auctionImage} alt={bid.auctionTitle} className="w-16 h-12 object-cover rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy-900 truncate">{bid.auctionTitle}</p>
                        <p className="text-xs text-navy-400 mt-0.5">{bid.location}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm font-semibold text-navy-900">{formatINR(bid.amount)}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.className}`}>{cfg.label}</span>
                        </div>
                        <p className="text-xs text-navy-400 mt-1">Ref: {bid.bidRef}</p>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center px-5 py-4 hover:bg-surface-bg/50 transition-colors">
                      <div className="flex gap-3 items-center min-w-0">
                        <img src={bid.auctionImage} alt={bid.auctionTitle} className="w-12 h-9 object-cover rounded flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy-900 truncate">{bid.auctionTitle}</p>
                          <p className="text-xs text-navy-400 mt-0.5">{bid.location}</p>
                          <p className="text-xs text-navy-300 mt-0.5">Ref: {bid.bidRef}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-navy-700">{formatDate(bid.bidTime)}</p>
                        <p className="text-xs text-navy-400">{new Date(bid.bidTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{formatINR(bid.amount)}</p>
                        {!isAboveReserve && (
                          <p className="text-xs text-amber-600 mt-0.5">Below reserve</p>
                        )}
                      </div>
                      <p className="text-sm text-navy-600">{formatINR(bid.reservePrice)}</p>
                      <div className="flex flex-col items-start gap-1.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.className}`}>{cfg.label}</span>
                        <Link to={`/auction/${bid.auctionId}`} className="text-xs text-navy-500 hover:text-navy-900 flex items-center gap-0.5 transition-colors">
                          View <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <p className="text-xs text-navy-400 mt-4 text-center">
          Bid history is retained for 12 months. For older records, contact support.
        </p>
      </div>
    </div>
  );
}
