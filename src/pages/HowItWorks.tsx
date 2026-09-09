import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  Search,
  BookOpen,
  ClipboardCheck,
  Gavel,
  Trophy,
  ArrowRight,
  Shield,
  FileText,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const STEPS = [
  {
    step: '01',
    icon: UserCheck,
    title: 'Register & Verify',
    description:
      'Create your Nilami account and complete KYC verification. Upload your PAN, Aadhaar, and address proof. One-time process, used for all future auctions.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    step: '02',
    icon: Search,
    title: 'Find the Right Auction',
    description:
      'Browse thousands of verified bank and government auctions. Filter by location, asset type, price range, and auction date. Save interesting listings.',
    color: 'bg-purple-50 text-purple-700',
  },
  {
    step: '03',
    icon: BookOpen,
    title: 'Understand Before You Bid',
    description:
      'Read the auction notice, T&C, and property/vehicle details carefully. Check the Auction Scorecard for completeness. Use our plain-language "Understand This Auction" guide.',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    step: '04',
    icon: ClipboardCheck,
    title: 'Register for the Auction',
    description:
      'Submit EMD (Earnest Money Deposit) via NEFT/RTGS to the bank before the deadline. Download and submit bidder registration form with required documents.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    step: '05',
    icon: Gavel,
    title: 'Place Your Bid',
    description:
      'On auction day, log in and place bids above the reserve price. Each bid must exceed the previous by the minimum bid increment. Watch live countdown.',
    color: 'bg-navy-50 text-navy-700',
  },
  {
    step: '06',
    icon: Trophy,
    title: 'Win & Complete Purchase',
    description:
      'If you win, deposit 25% on the day and the balance within the stipulated period (usually 15 days). Receive sale confirmation from the bank/organization.',
    color: 'bg-saffron-50 text-saffron-700',
  },
];

const RULES = [
  {
    icon: Shield,
    title: 'SARFAESI Act 2002',
    desc: 'Most bank property auctions are conducted under the SARFAESI Act, allowing banks to recover dues without court intervention.',
  },
  {
    icon: FileText,
    title: 'As-Is-Where-Is Basis',
    desc: 'Properties are sold in their current condition. Buyers are responsible for verifying encumbrances, dues, and occupancy before bidding.',
  },
  {
    icon: Bell,
    title: 'EMD is Refundable',
    desc: 'If you do not win, your EMD is refunded within 3–7 working days. The successful bidder\'s EMD is adjusted against the sale price.',
  },
  {
    icon: HelpCircle,
    title: 'Legal Due Diligence',
    desc: 'Always engage a lawyer to verify title, encumbrances, and outstanding dues before bidding on any property auction.',
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Hero */}
      <section className="bg-navy-900 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-saffron-400 mb-3">
            Auction Process
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            How Nilami Works
          </h1>
          <p className="text-navy-300 text-base md:text-lg max-w-2xl mx-auto">
            Government and bank auctions made simple. Six steps from registration to winning your first auction.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <Link to="/register" className="btn btn-cta px-6 py-3">
              Get Started Free
            </Link>
            <Link to="/beginner-guide" className="btn btn-ghost text-white border-white/30 px-6 py-3">
              Beginner Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="The Auction Process — Step by Step"
            subtitle="Follow these 6 steps to successfully participate in your first bank or government auction."
            centered
            size="lg"
            className="mb-14"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {STEPS.map(({ step, icon: Icon, title, description, color }) => (
              <div key={step} className="card p-6 flex gap-5">
                <div className="shrink-0">
                  <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-1">
                    Step {step}
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg mb-2">{title}</h3>
                  <p className="text-navy-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important rules */}
      <section className="bg-white border-y border-surface-border py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Important Rules to Know"
            subtitle="These rules apply to most bank and government auctions in India."
            centered
            size="md"
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RULES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 bg-surface-bg rounded-2xl border border-surface-border">
                <div className="w-10 h-10 rounded-xl bg-navy-100 text-navy-700 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-navy-900 mb-1.5 text-sm">{title}</h4>
                <p className="text-navy-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-navy-900 mb-3">Still have questions?</h2>
        <p className="text-navy-500 mb-6 text-sm">
          Our comprehensive FAQ and beginner guide cover everything from EMD to possession timelines.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/help" className="btn btn-primary px-6 py-2.5">
            Read FAQ
          </Link>
          <Link to="/beginner-guide" className="btn btn-outline px-6 py-2.5 inline-flex items-center gap-1.5">
            Beginner Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
