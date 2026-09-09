import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, TrendingUp, CheckCircle,
  Search, Eye, Award, MapPin,
} from 'lucide-react';
import { MOCK_AUCTIONS, ORGANIZATIONS } from '@/data/mockData';
import AuctionCard from '@/components/auction/AuctionCard';
import { HeroSearch } from '@/components/common/HeroSearch';
import { CategoryNav } from '@/components/common/CategoryNav';
import { SectionHeader } from '@/components/common/SectionHeader';

const liveAuctions = MOCK_AUCTIONS.filter(a => a.status === 'live');
const upcomingAuctions = MOCK_AUCTIONS.filter(a => a.status === 'upcoming');
const totalValue = MOCK_AUCTIONS.reduce((s, a) => s + a.reservePrice, 0);

const HOW_IT_WORKS = [
  {
    step: '01',
    Icon: Search,
    title: 'Browse & Discover',
    description:
      'Search thousands of listings from SBI, PNB, HDFC, DRT courts, and government agencies. Filter by location, price range, type, and auction date.',
  },
  {
    step: '02',
    Icon: Eye,
    title: 'Understand the Auction',
    description:
      'Read plain-language explanations of EMD, reserve price, and bidding rules. The Auction Scorecard tells you exactly how prepared each listing is.',
  },
  {
    step: '03',
    Icon: Award,
    title: 'Register & Bid',
    description:
      'Complete your KYC, submit the EMD deposit to the bank, and bid in real time. Track every bid from your personal dashboard.',
  },
];

const TRUST_FEATURES = [
  {
    Icon: Shield,
    title: 'Source Verified',
    description:
      'Every listing is traced to its official bank portal, DRT notice, or government gazette notification.',
  },
  {
    Icon: TrendingUp,
    title: 'Transparent Scorecard',
    description:
      'Our rule-based Auction Scorecard rates documentation completeness, readiness, and information quality.',
  },
  {
    Icon: CheckCircle,
    title: 'Zero Commission',
    description:
      'Nilami charges no brokerage. You pay exactly what the auction requires — and nothing more.',
  },
  {
    Icon: MapPin,
    title: 'Pan-India Coverage',
    description:
      'Auctions from 29 states, covering all major metros and tier-2 cities. New listings added every day.',
  },
];

function StatCard({ value, label, context }: { value: string; label: string; context: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-navy-900">{value}</div>
      <div className="text-sm font-semibold text-navy-700 mt-1">{label}</div>
      <div className="text-xs text-navy-400 mt-0.5">{context}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 pb-16 pt-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trust pill */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/90 text-xs font-medium px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Verified listings from 14 banks &amp; government agencies
            </span>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-4">
              Find. Understand. Bid.
            </h1>
            <p className="text-lg text-navy-200 leading-relaxed">
              India's most transparent marketplace for bank-auctioned properties,
              vehicles, and government assets. Clear information. No jargon. No brokerage.
            </p>
          </div>

          <HeroSearch />

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-navy-300">
            {[
              'Source verified from official portals',
              'No brokerage or hidden fees',
              'Plain-language explanations',
            ].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Stats ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-surface-border">
            <StatCard
              value={`${liveAuctions.length}+`}
              label="Live Auctions"
              context="Open for bidding now"
            />
            <StatCard value="2,400+" label="Total Listings" context="Across all categories" />
            <StatCard
              value={`₹${Math.round(totalValue / 10_000_000).toLocaleString('en-IN')}Cr+`}
              label="Reserve Value"
              context="Combined reserve price"
            />
            <StatCard value="14+" label="Organisations" context="Banks, courts &amp; govt." />
          </div>
        </div>
      </section>

      {/* ── Category Navigation ─────────────────────────────────────────── */}
      <section className="bg-surface-bg border-b border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CategoryNav />
        </div>
      </section>

      {/* ── Live Auctions ────────────────────────────────────────────────── */}
      <section className="bg-surface-bg py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Live Auctions"
            subtitle={`${liveAuctions.length} auctions closing soon — bid before the deadline`}
            ctaLabel="View all live auctions"
            ctaHref="/explore?status=live"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liveAuctions.slice(0, 6).map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Auctions ────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Upcoming Auctions"
            subtitle="Register early — EMD is typically required 3–5 days before the auction date"
            ctaLabel="View all upcoming"
            ctaHref="/explore?status=upcoming"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingAuctions.slice(0, 4).map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <p className="mt-3 text-navy-300 max-w-xl mx-auto">
              Designed to be straightforward — even if you've never participated
              in a government auction before.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, Icon, title, description }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-saffron-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-saffron-400 uppercase tracking-widest mb-1">
                    Step {step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                  <p className="text-navy-300 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/how-it-works" className="btn btn-cta justify-center">
              Read the Full Guide <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/beginner-guide"
              className="btn border border-white/25 text-white hover:bg-white/10 justify-center"
            >
              I'm New to Auctions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Nilami ───────────────────────────────────────────────────── */}
      <section className="bg-surface-bg py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Nilami?"
            subtitle="Built for transparency. Designed for trust."
            centered
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_FEATURES.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 border border-surface-border hover:shadow-card transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-navy-700" />
                </div>
                <h3 className="text-base font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Organisations ────────────────────────────────────────── */}
      <section className="bg-white border-t border-surface-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-navy-400 uppercase tracking-widest mb-8">
            Auction notices sourced directly from
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {ORGANIZATIONS.map(org => (
              <span
                key={org.id}
                className="inline-flex items-center gap-2 px-4 py-2 bg-surface-bg border border-surface-border rounded-lg text-sm font-medium text-navy-700"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    org.type === 'bank'
                      ? 'bg-navy-500'
                      : org.type === 'government'
                      ? 'bg-green-500'
                      : org.type === 'court'
                      ? 'bg-amber-500'
                      : 'bg-purple-500'
                  }`}
                />
                {org.name}
                {org.verified && <CheckCircle className="w-3.5 h-3.5 text-green-500" />}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beginner Banner ──────────────────────────────────────────────── */}
      <section className="bg-saffron-600 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-white text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-widest text-saffron-200 mb-2">
              For First-Time Bidders
            </div>
            <h3 className="text-2xl font-bold mb-3">New to Government Auctions?</h3>
            <p className="text-saffron-100 leading-relaxed">
              Our Beginner's Guide explains every term — EMD, reserve price, bid increment, DRT — in
              plain English. No jargon, no confusion. Start bidding with confidence.
            </p>
          </div>
          <Link
            to="/beginner-guide"
            className="btn bg-white text-saffron-700 hover:bg-orange-50 font-semibold shrink-0 flex items-center gap-2 text-base"
          >
            Start Here — It's Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
