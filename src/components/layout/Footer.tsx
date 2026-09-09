import React from "react";
import { Link } from "react-router-dom";
import { Gavel, Mail, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Explore Auctions", href: "/explore" },
  { label: "Properties", href: "/properties" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Auction Calendar", href: "/calendar" },
  { label: "Compare Auctions", href: "/compare" },
];

const RESOURCES = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Beginner's Guide", href: "/beginner-guide" },
  { label: "Help & FAQ", href: "/help" },
  { label: "Contact Us", href: "/contact" },
];

const LEGAL = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const BANKS = [
  "State Bank of India",
  "Punjab National Bank",
  "HDFC Bank",
  "ICICI Bank",
  "Bank of Baroda",
  "Union Bank of India",
  "Canara Bank",
  "Axis Bank",
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded bg-saffron-500 flex items-center justify-center">
                <Gavel className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight block leading-none">
                  Nilami
                </span>
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-medium">
                  Find · Understand · Bid
                </span>
              </div>
            </Link>
            <p className="text-sm text-navy-300 leading-relaxed max-w-xs">
              India's trusted platform for discovering and tracking verified bank and
              government auction opportunities. We aggregate, verify, and simplify.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href="mailto:support@nilami.in"
                className="flex items-center gap-2 text-sm text-navy-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                support@nilami.in
              </a>
              <div className="flex items-center gap-2 text-sm text-navy-400">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                Mumbai, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3 mt-6">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Source Organisations */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Auction Sources
            </h3>
            <p className="text-xs text-navy-500 mb-3">
              We aggregate listings from verified sources including:
            </p>
            <ul className="space-y-2">
              {BANKS.map((bank) => (
                <li key={bank} className="text-sm text-navy-400">
                  {bank}
                </li>
              ))}
              <li className="text-sm text-navy-500">+ 40 more banks & organisations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <p className="text-xs text-navy-500 leading-relaxed">
            <strong className="text-navy-400">Disclaimer:</strong> Nilami is an information
            aggregation platform. We do not conduct auctions or guarantee ownership, legality, or
            returns on any listed asset. All auction notices are sourced from official bank and
            government portals. Prospective bidders must independently verify all details and
            consult legal professionals before participating. Nilami shall not be liable for any
            losses arising from reliance on information on this platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-3">
            <p className="text-xs text-navy-600">
              © {new Date().getFullYear()} Nilami Technologies Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-xs text-navy-600">
              CIN: U72900MH2025PTC000001 | GST: 27AABCN1234A1Z5
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
