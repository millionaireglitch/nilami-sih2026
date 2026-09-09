import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  IndianRupee,
  Gavel,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  HelpCircle,
} from 'lucide-react';

const TERMS = [
  {
    term: 'Reserve Price',
    definition:
      'The minimum price set by the bank or seller below which the property will not be sold. Your bid must equal or exceed this amount to be considered valid.',
    example: 'If the reserve price is ₹48,50,000, you must bid at least that amount.',
  },
  {
    term: 'EMD — Earnest Money Deposit',
    definition:
      'A refundable security deposit (usually 10% of the reserve price) that you must pay before participating in the auction. It proves you are a serious bidder.',
    example: 'For a ₹48,50,000 property, EMD is typically ₹4,85,000. It is refunded if you don\'t win.',
  },
  {
    term: 'Bid Increment',
    definition:
      'The minimum amount by which each new bid must exceed the previous one. You cannot bid less than the current bid plus the increment.',
    example: 'If the current bid is ₹50,00,000 and increment is ₹25,000 — your next bid must be at least ₹50,25,000.',
  },
  {
    term: 'SARFAESI Act',
    definition:
      'The Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002. It allows banks to auction mortgaged properties to recover unpaid loans without going to court.',
    example: 'Most bank property auctions in India are held under this Act.',
  },
  {
    term: 'As-Is-Where-Is Basis',
    definition:
      'The property is sold in its exact current condition, including any defects, disputes, or pending dues. The bank makes no warranty about its condition.',
    example: 'If there are outstanding utility bills or occupancy issues, the buyer becomes responsible after purchase.',
  },
  {
    term: 'Possession Date',
    definition:
      'The date on or before which the bank/organization will hand over possession of the property to the successful bidder, after full payment.',
    example: 'Typical possession timelines range from 30 to 90 days after auction completion.',
  },
];

const MISTAKES = [
  'Not reading the auction notice and T&C thoroughly before bidding',
  'Not verifying encumbrances, pending dues, or occupancy status',
  'Paying EMD after the deadline — this disqualifies you automatically',
  'Bidding without physically inspecting the property or vehicle',
  'Not engaging a lawyer for title verification on property auctions',
  'Confusing reserve price with market value — they can differ significantly',
  'Not having funds ready for the 25% balance due on auction day',
];

interface TermCardProps {
  term: string;
  definition: string;
  example: string;
}

function TermCard({ term, definition, example }: TermCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-surface-border rounded-xl overflow-hidden bg-white">
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-bg transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-semibold text-navy-900">{term}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-navy-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-navy-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-surface-border pt-3">
          <p className="text-sm text-navy-600 leading-relaxed mb-3">{definition}</p>
          <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5 flex gap-2 text-xs text-amber-800">
            <BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span><strong>Example:</strong> {example}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BeginnerGuide() {
  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            Beginner's Guide
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            New to Auctions?<br />Start Here.
          </h1>
          <p className="text-navy-300 text-base md:text-lg max-w-2xl mx-auto">
            Understand how bank and government auctions work in India, key terms you'll encounter, and how to participate safely.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* What is a bank auction? */}
        <section className="card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center">
              <Gavel className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-navy-900">What is a Bank Auction?</h2>
          </div>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            When a borrower fails to repay a loan, the bank is legally allowed to seize and sell the mortgaged asset (property, vehicle, machinery) to recover the outstanding amount. This is called an <strong>NPA (Non-Performing Asset) auction</strong>.
          </p>
          <p className="text-navy-600 text-sm leading-relaxed mb-4">
            The bank publishes an official auction notice in newspapers and on their website. Anyone who meets the eligibility criteria can participate by paying an EMD (refundable deposit) and submitting the required documents.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: TrendingUp, label: 'Below Market Price', desc: 'Assets often available 15–30% below market value' },
              { icon: Shield, label: 'Legally Regulated', desc: 'Conducted under SARFAESI Act with strict legal framework' },
              { icon: FileText, label: 'Transparent Process', desc: 'Published in official newspapers and bank websites' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-surface-bg rounded-xl p-4 border border-surface-border">
                <Icon className="w-5 h-5 text-navy-600 mb-2" />
                <p className="font-semibold text-navy-800 text-sm mb-1">{label}</p>
                <p className="text-navy-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key terms */}
        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-navy-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">A</span>
            Key Terms Explained
          </h2>
          <div className="space-y-3">
            {TERMS.map(t => (
              <TermCard key={t.term} {...t} />
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="card p-8">
          <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-navy-600" />
            Typical Auction Timeline
          </h2>
          <div className="space-y-4">
            {[
              { day: 'D-30 days', label: 'Auction Notice Published', desc: 'Bank publishes notice in newspapers & official portals' },
              { day: 'D-7 days', label: 'EMD Deadline', desc: 'Last date to deposit EMD via NEFT/RTGS to bank account' },
              { day: 'D-3 days', label: 'Document Submission', desc: 'Submit bidder registration form, KYC, PAN, address proof' },
              { day: 'Day 0', label: 'Auction Day', desc: 'Bidding opens, place bids online or physically at bank branch' },
              { day: 'D+1 day', label: '25% Deposit Due', desc: 'Successful bidder pays 25% of bid amount to the bank' },
              { day: 'D+15 days', label: 'Balance Payment', desc: 'Remaining 75% of bid amount to be paid to the bank' },
              { day: 'D+30–90 days', label: 'Possession', desc: 'Sale certificate issued and property possession transferred' },
            ].map(({ day, label, desc }, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-navy-900 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < 6 && <div className="w-px flex-1 bg-surface-border mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-0.5">{day}</p>
                  <p className="font-semibold text-navy-900 text-sm">{label}</p>
                  <p className="text-navy-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="card p-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-navy-600" />
            Understanding Auction Pricing
          </h2>
          <div className="bg-navy-50 rounded-xl p-5 text-sm text-navy-700 leading-relaxed">
            <p className="mb-3">
              The <strong>Reserve Price</strong> is NOT the same as market value. Banks typically set the reserve price based on the outstanding loan amount, which may be significantly lower than the current market value.
            </p>
            <p>
              This is why bank auctions can offer attractive buying opportunities — especially for investors and end-users who do proper due diligence before bidding.
            </p>
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-center text-sm">
            {[
              { label: 'Reserve Price', val: '₹48,50,000', sub: 'Set by bank' },
              { label: 'Market Value', val: '~₹58,00,000', sub: 'Estimated' },
              { label: 'Potential Saving', val: '~16%', sub: 'vs market' },
            ].map(({ label, val, sub }) => (
              <div key={label} className="bg-white rounded-xl p-4 border border-surface-border">
                <p className="text-xs text-navy-500 mb-1">{label}</p>
                <p className="font-bold text-navy-900">{val}</p>
                <p className="text-xs text-navy-400">{sub}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-navy-400 mt-3 italic">
            * Market value estimates are for illustrative purposes only. Nilami does not guarantee any savings or returns.
          </p>
        </section>

        {/* Common mistakes */}
        <section className="card p-8 border-amber-200 bg-amber-50/50">
          <h2 className="text-xl font-bold text-navy-900 mb-5 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Common Mistakes to Avoid
          </h2>
          <ul className="space-y-3">
            {MISTAKES.map((m, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-navy-700">
                <span className="w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  !
                </span>
                {m}
              </li>
            ))}
          </ul>
        </section>

        {/* Safety tips */}
        <section className="card p-8 border-emerald-200 bg-emerald-50/30">
          <h2 className="text-xl font-bold text-navy-900 mb-5 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Safety Tips for First-Time Bidders
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Always download and read the official auction notice from the bank website.',
              'Physically inspect the property before bidding. Take photos.',
              'Get an independent legal opinion on title and encumbrances.',
              'Only bid what you can pay within the stated timeline.',
              'Verify the bank\'s account details independently before EMD transfer.',
              'Never pay auction fees or charges to third-party "agents".',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-navy-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-4">
          <div className="inline-flex items-center gap-2 bg-navy-50 rounded-full px-4 py-1.5 text-xs text-navy-600 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Ready to explore auctions?
          </div>
          <h2 className="text-2xl font-bold text-navy-900 mb-3">Start Your Auction Journey</h2>
          <p className="text-navy-500 text-sm mb-6 max-w-sm mx-auto">
            Browse verified bank and government auctions with plain-language guidance at every step.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/explore" className="btn btn-primary px-6 py-3 inline-flex items-center gap-1.5">
              Explore Auctions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/how-it-works" className="btn btn-outline px-6 py-3">
              How It Works
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
