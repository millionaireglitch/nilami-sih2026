import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle } from 'lucide-react';

const FAQ_CATEGORIES = [
  {
    label: 'Getting Started',
    faqs: [
      {
        q: 'What is Nilami and how is it different from auction websites?',
        a: 'Nilami is an auction discovery and intelligence platform. We aggregate verified auction listings from Indian banks and government bodies, provide plain-language summaries, and help you understand each auction before bidding. We do not conduct the auctions ourselves — bidding happens directly with the bank or organisation.',
      },
      {
        q: 'Is Nilami free to use?',
        a: 'Browsing and viewing auction listings is completely free. Advanced features like price alerts, document tracking, and comparison tools are available on our free plan with reasonable limits. Premium plans offer higher limits, priority notifications, and additional research tools.',
      },
      {
        q: 'Do I need to register to view auctions?',
        a: 'No. You can browse all auction listings without an account. Registration is required to save auctions, set alerts, compare listings, and access your personal dashboard.',
      },
      {
        q: 'How do I create an account?',
        a: 'Click "Sign Up" on the top right. Enter your name, email, mobile number, and password. Verify your mobile via OTP. That\'s it — your account is ready.',
      },
    ],
  },
  {
    label: 'Bidding & Auctions',
    faqs: [
      {
        q: 'Do I bid directly on Nilami?',
        a: 'No. Nilami helps you discover and understand auctions. The actual bidding process takes place directly with the auction organiser (bank, DRT, government body) — either on their portal, their branch, or a designated e-auction platform.',
      },
      {
        q: 'What is EMD and is it refundable?',
        a: 'EMD (Earnest Money Deposit) is a refundable security deposit, typically 10% of the reserve price, paid before participating. If you don\'t win, it is refunded within 3–7 working days. The winner\'s EMD is adjusted against the final purchase price.',
      },
      {
        q: 'What happens if I win an auction?',
        a: 'You will need to pay 25% of the bid amount on auction day, with the remaining 75% typically due within 15 working days. Failure to pay forfeits your EMD. Upon full payment, a Sale Certificate is issued and possession is handed over within the stated timeline.',
      },
      {
        q: 'Can I inspect the property before bidding?',
        a: 'Yes, and we strongly recommend it. Most banks allow inspection on a pre-arranged date (usually 1–2 weeks before the auction). Contact the listed officer to schedule a visit. Never bid without physical inspection.',
      },
    ],
  },
  {
    label: 'Verification & Safety',
    faqs: [
      {
        q: 'What does "Source Verified" mean?',
        a: '"Source Verified" means our team has confirmed the listing against the official auction notice published by the bank or government body. The source URL, date, and document status are checked. It does NOT mean we have verified the legal title, condition, or occupancy of the asset.',
      },
      {
        q: 'Does Nilami guarantee the title or ownership of auctioned assets?',
        a: 'No. Nilami is an information platform. We never guarantee title, clear ownership, possession, or the return on any investment. Always engage a qualified lawyer for title verification before bidding on property auctions.',
      },
      {
        q: 'How do I report a suspicious listing?',
        a: 'Click the "Report" button on any auction listing page. Our team reviews all reports within 24 hours. Listings that cannot be verified against an official source are flagged or removed.',
      },
    ],
  },
  {
    label: 'Account & Settings',
    faqs: [
      {
        q: 'How do I set up auction alerts?',
        a: 'Go to "Alerts" in your dashboard. Click "Create Alert" and specify your criteria — location, asset type, price range, and organisation. You\'ll receive email/SMS notifications when matching auctions are published.',
      },
      {
        q: 'Can I compare multiple auctions side by side?',
        a: 'Yes. Click the compare icon (⊞) on any auction card to add it to your comparison list. You can compare up to 3 auctions simultaneously. Go to Explore > Compare to see the side-by-side view.',
      },
      {
        q: 'How do I update my profile or KYC details?',
        a: 'Go to Profile > Settings. You can update contact details, change password, and manage notification preferences. KYC document updates require re-verification.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-surface-border last:border-0">
      <button
        className="w-full flex items-start justify-between gap-3 py-4 text-left hover:text-navy-900 transition-colors group"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-medium text-navy-800 group-hover:text-navy-900 text-sm leading-relaxed">
          {q}
        </span>
        <span className="shrink-0 mt-0.5">
          {open ? (
            <ChevronUp className="w-4 h-4 text-navy-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-navy-400" />
          )}
        </span>
      </button>
      {open && (
        <p className="pb-4 text-sm text-navy-500 leading-relaxed -mt-1">{a}</p>
      )}
    </div>
  );
}

export default function HelpFAQ() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].label);

  const filteredCategory = search
    ? {
        label: 'Search Results',
        faqs: FAQ_CATEGORIES.flatMap(c => c.faqs).filter(
          f =>
            f.q.toLowerCase().includes(search.toLowerCase()) ||
            f.a.toLowerCase().includes(search.toLowerCase())
        ),
      }
    : FAQ_CATEGORIES.find(c => c.label === activeCategory)!;

  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <HelpCircle className="w-10 h-10 mx-auto mb-4 text-saffron-400" />
          <h1 className="text-3xl font-bold mb-3">Help & FAQ</h1>
          <p className="text-navy-300 text-sm mb-6">
            Find answers to common questions about Nilami, auction processes, and platform features.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-navy-900 placeholder:text-navy-400 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
            />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex gap-8">
        {/* Sidebar */}
        {!search && (
          <div className="hidden md:block w-56 shrink-0">
            <div className="sticky top-24 space-y-1">
              {FAQ_CATEGORIES.map(c => (
                <button
                  key={c.label}
                  onClick={() => setActiveCategory(c.label)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === c.label
                      ? 'bg-navy-900 text-white'
                      : 'text-navy-600 hover:bg-white hover:text-navy-900'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-navy-900 mb-5">{filteredCategory.label}</h2>
          {filteredCategory.faqs.length === 0 ? (
            <p className="text-navy-500 text-sm">No results found for your search.</p>
          ) : (
            <div className="card divide-y divide-surface-border">
              {filteredCategory.faqs.map(f => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          )}

          {/* Still need help */}
          <div className="mt-10 card p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-saffron-50 text-saffron-600 rounded-xl flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-navy-900 mb-1">Still need help?</h3>
              <p className="text-sm text-navy-500 mb-3">
                Can't find the answer you're looking for? Our support team responds within 24 hours.
              </p>
              <Link to="/contact" className="btn btn-primary text-sm px-5 py-2">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
