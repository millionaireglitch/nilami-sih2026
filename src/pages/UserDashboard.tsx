import { Link, Navigate } from 'react-router-dom';
import { BookmarkIcon, TrendingUp, Trophy, CreditCard, Clock, ArrowRight, Bell, FileText, Gavel, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { MOCK_BIDS, MOCK_AUCTIONS, MOCK_PAYMENTS } from '@/data/mockData';
import { formatINR, formatDate, formatDateTime, getStatusClass, getStatusLabel } from '@/utils/format';

const QUICK_ACTIONS = [
  { label: 'Browse Auctions', icon: Gavel, to: '/explore', color: 'bg-navy-50 text-navy-700' },
  { label: 'My Saved Auctions', icon: BookmarkIcon, to: '/saved', color: 'bg-saffron-50 text-saffron-700' },
  { label: 'Set an Alert', icon: Bell, to: '/alerts', color: 'bg-emerald-50 text-emerald-700' },
  { label: 'Auction Calendar', icon: Clock, to: '/calendar', color: 'bg-blue-50 text-blue-700' },
  { label: 'My Documents', icon: FileText, to: '/documents', color: 'bg-violet-50 text-violet-700' },
  { label: 'Payment History', icon: CreditCard, to: '/payments', color: 'bg-amber-50 text-amber-700' },
];

const BID_STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  outbid: 'bg-amber-100 text-amber-800',
  won: 'bg-blue-100 text-blue-800',
  lost: 'bg-red-100 text-red-800',
  pending: 'bg-navy-100 text-navy-800',
};

export default function UserDashboard() {
  const { user } = useAuth();
  const { count: savedCount } = useWatchlist();

  if (!user) return <Navigate to="/login" state={{ from: '/dashboard' }} replace />;

  const activeBids = MOCK_BIDS.filter(b => b.status === 'active').length;
  const wonBids = MOCK_BIDS.filter(b => b.status === 'won').length;
  const pendingPayments = MOCK_PAYMENTS.filter(p => p.status === 'pending').length;

  const upcomingAuctions = MOCK_AUCTIONS
    .filter(a => a.status === 'upcoming' || a.status === 'live')
    .slice(0, 4);

  const stats = [
    { label: 'Saved Auctions', value: savedCount, icon: BookmarkIcon, color: 'text-saffron-600', bg: 'bg-saffron-50', to: '/saved' },
    { label: 'Active Bids', value: activeBids, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', to: '/bids' },
    { label: 'Auctions Won', value: wonBids, icon: Trophy, color: 'text-blue-600', bg: 'bg-blue-50', to: '/bids' },
    { label: 'Pending Payments', value: pendingPayments, icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50', to: '/payments' },
  ];

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Welcome header */}
      <div className="bg-navy-900 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-navy-300 text-sm mb-1">Welcome back,</p>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-navy-300 text-sm mt-1">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              {user.kycStatus === 'approved' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  KYC Verified
                </span>
              ) : (
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium hover:bg-amber-500/30 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  Complete KYC
                </Link>
              )}
              <Link to="/profile" className="btn btn-outline text-white border-white/30 hover:bg-white/10 text-sm py-1.5 px-4">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <Link key={s.label} to={s.to} className="card p-5 hover:shadow-card-hover transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <ChevronRight className="w-4 h-4 text-navy-300 group-hover:text-navy-600 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-navy-900">{s.value}</p>
              <p className="text-sm text-navy-500 mt-0.5">{s.label}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Bids */}
            <div className="card">
              <div className="flex items-center justify-between p-5 border-b border-surface-border">
                <h2 className="font-semibold text-navy-900">Recent Bids</h2>
                <Link to="/bids" className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="divide-y divide-surface-border">
                {MOCK_BIDS.map(bid => (
                  <div key={bid.id} className="p-4 flex gap-4 items-center">
                    <img
                      src={bid.auctionImage}
                      alt={bid.auctionTitle}
                      className="w-14 h-10 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 truncate">{bid.auctionTitle}</p>
                      <p className="text-xs text-navy-400 mt-0.5">{bid.location} · {formatDateTime(bid.bidTime)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <p className="text-sm font-semibold text-navy-900">{formatINR(bid.amount)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${BID_STATUS_COLORS[bid.status] || ''}`}>
                        {bid.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Auctions */}
            <div className="card">
              <div className="flex items-center justify-between p-5 border-b border-surface-border">
                <h2 className="font-semibold text-navy-900">Live & Upcoming</h2>
                <Link to="/explore" className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1">
                  Explore all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="divide-y divide-surface-border">
                {upcomingAuctions.map(a => (
                  <Link key={a.id} to={`/auction/${a.id}`} className="flex gap-3 p-4 hover:bg-surface-bg transition-colors group">
                    <img
                      src={a.images[0]}
                      alt={a.title}
                      className="w-14 h-10 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 truncate group-hover:text-navy-700">{a.title}</p>
                      <p className="text-xs text-navy-400 mt-0.5">{a.location.city}, {a.location.state}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <p className="text-sm font-semibold text-navy-900">{formatINR(a.reservePrice)}</p>
                      <span className={`badge ${getStatusClass(a.status)} text-xs`}>
                        {getStatusLabel(a.status)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card p-5">
              <h2 className="font-semibold text-navy-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map(a => (
                  <Link
                    key={a.label}
                    to={a.to}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg ${a.color} hover:opacity-90 transition-opacity text-center`}
                  >
                    <a.icon className="w-5 h-5" />
                    <span className="text-xs font-medium leading-tight">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Account status */}
            <div className="card p-5">
              <h2 className="font-semibold text-navy-900 mb-4">Account Status</h2>
              <div className="space-y-3">
                <StatusRow label="Email Verified" status={user.verified} />
                <StatusRow label="Phone Verified" status={true} />
                <StatusRow label="KYC Completed" status={user.kycStatus === 'approved'} action={{ label: 'Complete', to: '/profile' }} />
                <StatusRow label="Premium Membership" status={user.membership === 'premium'} action={{ label: 'Upgrade', to: '/profile' }} />
              </div>
              <div className="mt-4 pt-4 border-t border-surface-border">
                <p className="text-xs text-navy-500">
                  Member since {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            {/* Recent payment */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-navy-900">Recent Payments</h2>
                <Link to="/payments" className="text-xs text-navy-600 hover:text-navy-900">View all</Link>
              </div>
              <div className="space-y-2">
                {MOCK_PAYMENTS.slice(0, 3).map(p => (
                  <div key={p.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-navy-700 text-xs font-medium truncate max-w-[150px]">{p.description}</p>
                      <p className="text-navy-400 text-xs">{formatDate(p.date)}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className={`text-xs font-semibold ${p.type === 'refund' || p.status === 'refunded' ? 'text-emerald-600' : 'text-navy-900'}`}>
                        {p.type === 'refund' || p.status === 'refunded' ? '+' : ''}{formatINR(p.amount)}
                      </p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        p.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                        p.status === 'refunded' ? 'bg-blue-100 text-blue-700' :
                        p.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, status, action }: { label: string; status: boolean; action?: { label: string; to: string } }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-navy-600">{label}</p>
      {status ? (
        <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Done
        </span>
      ) : action ? (
        <Link to={action.to} className="text-xs text-saffron-600 hover:text-saffron-700 font-medium">
          {action.label} →
        </Link>
      ) : (
        <span className="text-xs text-navy-400">Pending</span>
      )}
    </div>
  );
}
