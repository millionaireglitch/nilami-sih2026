import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Download, CreditCard, RefreshCw, Star, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_PAYMENTS } from '@/data/mockData';
import { formatINR, formatDate } from '@/utils/format';
import type { Payment } from '@/types';

const STATUS_STYLE: Record<string, string> = {
  paid: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-blue-100 text-blue-800',
};

const TYPE_STYLE: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  emd: { label: 'EMD Deposit', icon: CreditCard, color: 'text-navy-600' },
  balance: { label: 'Balance Payment', icon: CreditCard, color: 'text-navy-600' },
  subscription: { label: 'Subscription', icon: Star, color: 'text-saffron-600' },
  refund: { label: 'Refund', icon: RefreshCw, color: 'text-emerald-600' },
};

type FilterType = 'all' | Payment['type'];

export default function Payments() {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');

  if (!user) return <Navigate to="/login" state={{ from: '/payments' }} replace />;

  const filtered = typeFilter === 'all' ? MOCK_PAYMENTS : MOCK_PAYMENTS.filter(p => p.type === typeFilter);

  const totalPaid = MOCK_PAYMENTS.filter(p => p.status === 'paid' && p.type !== 'refund').reduce((s, p) => s + p.amount, 0);
  const totalRefunded = MOCK_PAYMENTS.filter(p => p.status === 'refunded').reduce((s, p) => s + p.amount, 0);
  const totalEmd = MOCK_PAYMENTS.filter(p => p.type === 'emd' && p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Header */}
      <div className="bg-navy-900 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-navy-300 mb-3 flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>›</span>
            <span className="text-white">Payments</span>
          </nav>
          <h1 className="text-2xl font-bold text-white">Payment History</h1>
          <p className="text-navy-300 text-sm mt-1">All EMD deposits, refunds, and subscription payments.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card p-5">
            <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">Total Paid (EMD)</p>
            <p className="text-2xl font-bold text-navy-900">{formatINR(totalEmd)}</p>
            <p className="text-xs text-navy-400 mt-1">{MOCK_PAYMENTS.filter(p => p.type === 'emd' && p.status === 'paid').length} transaction(s)</p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">Refunds Received</p>
            <p className="text-2xl font-bold text-emerald-700">{formatINR(totalRefunded)}</p>
            <p className="text-xs text-navy-400 mt-1">{MOCK_PAYMENTS.filter(p => p.status === 'refunded').length} refund(s)</p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">Net Deployed</p>
            <p className="text-2xl font-bold text-navy-900">{formatINR(totalPaid - totalRefunded)}</p>
            <p className="text-xs text-navy-400 mt-1">Active EMD balance</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card overflow-hidden">
          <div className="flex gap-1 p-4 border-b border-surface-border overflow-x-auto">
            {(['all', 'emd', 'balance', 'subscription', 'refund'] as FilterType[]).map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                  typeFilter === t
                    ? 'bg-navy-900 text-white'
                    : 'text-navy-500 hover:text-navy-800 hover:bg-navy-50'
                }`}
              >
                {t === 'all' ? 'All' : t === 'emd' ? 'EMD' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Desktop table header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 text-xs font-semibold text-navy-400 uppercase tracking-wider bg-surface-bg border-b border-surface-border">
            <span>Description</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Method</span>
            <span>Status</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-navy-400">No transactions found.</div>
          ) : (
            <div className="divide-y divide-surface-border">
              {filtered.map(p => {
                const typeInfo = TYPE_STYLE[p.type] || TYPE_STYLE.emd;
                return (
                  <div key={p.id} className="p-4 md:p-0">
                    {/* Mobile */}
                    <div className="md:hidden">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <typeInfo.icon className={`w-3.5 h-3.5 ${typeInfo.color}`} />
                            <span className="text-xs text-navy-400">{typeInfo.label}</span>
                          </div>
                          <p className="text-sm font-medium text-navy-900">{p.description}</p>
                          {p.auctionTitle && (
                            <p className="text-xs text-navy-400 mt-0.5 truncate">{p.auctionTitle}</p>
                          )}
                          <p className="text-xs text-navy-400 mt-1">Ref: {p.txnRef}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 ml-4 flex-shrink-0">
                          <p className={`text-sm font-bold ${p.status === 'refunded' ? 'text-emerald-700' : 'text-navy-900'}`}>
                            {p.status === 'refunded' ? '+' : ''}{formatINR(p.amount)}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[p.status]}`}>
                            {p.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center px-5 py-4 hover:bg-surface-bg/50 transition-colors">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <typeInfo.icon className={`w-3.5 h-3.5 ${typeInfo.color}`} />
                          <span className="text-xs text-navy-400">{typeInfo.label}</span>
                        </div>
                        <p className="text-sm font-medium text-navy-900">{p.description}</p>
                        {p.auctionTitle && (
                          <Link to={p.auctionId ? `/auction/${p.auctionId}` : '#'} className="text-xs text-navy-400 hover:text-navy-700 flex items-center gap-0.5 mt-0.5">
                            {p.auctionTitle} <ArrowUpRight className="w-2.5 h-2.5" />
                          </Link>
                        )}
                        <p className="text-xs text-navy-300 mt-0.5">Ref: {p.txnRef}</p>
                      </div>
                      <p className="text-sm text-navy-600">{formatDate(p.date)}</p>
                      <p className={`text-sm font-semibold ${p.status === 'refunded' ? 'text-emerald-700' : 'text-navy-900'}`}>
                        {p.status === 'refunded' ? '+' : ''}{formatINR(p.amount)}
                      </p>
                      <p className="text-sm text-navy-500">{p.method || '—'}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_STYLE[p.status]}`}>
                          {p.status}
                        </span>
                        <button className="text-navy-300 hover:text-navy-600 transition-colors" title="Download receipt">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Note */}
        <div className="mt-6 text-xs text-navy-400 leading-relaxed">
          <p>
            <strong className="text-navy-600">EMD Refunds:</strong> Refunds for unsuccessful bids are processed by the selling organisation within 7–15 working days. Nilami facilitates the process but is not responsible for delays caused by banking systems.
          </p>
          <p className="mt-1">
            For payment disputes, email <a href="mailto:payments@nilami.in" className="text-navy-600 hover:underline">payments@nilami.in</a> with your transaction reference.
          </p>
        </div>
      </div>
    </div>
  );
}
