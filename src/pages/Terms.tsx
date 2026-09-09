import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, AlertTriangle } from 'lucide-react';

const LAST_UPDATED = '1 September 2025';
const EFFECTIVE_DATE = '1 October 2025';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'about', title: '2. About the Platform' },
  { id: 'eligibility', title: '3. Eligibility' },
  { id: 'accounts', title: '4. User Accounts' },
  { id: 'auction-info', title: '5. Auction Information' },
  { id: 'bidding', title: '6. Bidding & Participation' },
  { id: 'payments', title: '7. Payments & EMD' },
  { id: 'verification', title: '8. Verification & Accuracy' },
  { id: 'prohibited', title: '9. Prohibited Activities' },
  { id: 'ip', title: '10. Intellectual Property' },
  { id: 'liability', title: '11. Limitation of Liability' },
  { id: 'indemnification', title: '12. Indemnification' },
  { id: 'privacy', title: '13. Privacy Policy' },
  { id: 'modifications', title: '14. Modifications to Terms' },
  { id: 'governing-law', title: '15. Governing Law' },
  { id: 'contact', title: '16. Contact Us' },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState('acceptance');

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Hero */}
      <div className="bg-navy-900 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-navy-300 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Terms of Service</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-navy-300 text-sm">
            Last updated: {LAST_UPDATED}&ensp;·&ensp;Effective: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-8 items-start">

          {/* Sidebar TOC — desktop only */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 card p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400 mb-3">
                Contents
              </p>
              <nav className="space-y-0.5">
                {SECTIONS.map(s => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveSection(s.id)}
                    className={`block text-xs px-2.5 py-1.5 rounded transition-colors ${
                      activeSection === s.id
                        ? 'bg-navy-50 text-navy-900 font-semibold'
                        : 'text-navy-500 hover:text-navy-800 hover:bg-navy-50'
                    }`}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="card p-8">
              {/* Notice banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  Please read these Terms carefully before using Nilami. By creating an account or
                  accessing the platform, you agree to be bound by these Terms and our Privacy Policy.
                </p>
              </div>

              <TSection id="acceptance" title="1. Acceptance of Terms" onVisible={setActiveSection}>
                <p>
                  Welcome to Nilami, an auction discovery and information platform operated by Nilami
                  Technologies Private Limited ("Nilami," "we," "us," or "our"), a company incorporated
                  under the Companies Act, 2013. These Terms of Service ("Terms") govern your access to
                  and use of nilami.in and any associated services (collectively, the "Platform").
                </p>
                <p>
                  By registering, accessing, or using the Platform in any manner, you acknowledge that
                  you have read, understood, and agree to be bound by these Terms. If you are using the
                  Platform on behalf of an organisation, you represent that you are authorised to bind
                  that organisation to these Terms.
                </p>
              </TSection>

              <TSection id="about" title="2. About the Platform" onVisible={setActiveSection}>
                <p>
                  Nilami is an information aggregation and auction discovery platform. We compile and
                  display publicly available auction notices published by banks, financial institutions,
                  government bodies, DRT courts, and other authorised organisations. Nilami does not
                  conduct auctions, hold assets, act as an auctioneer, or guarantee title to any asset.
                </p>
                <p>
                  All listings on the Platform are sourced from publicly accessible records including
                  bank websites, e-auction portals, government notifications, and court proceedings.
                  The actual auction process, documentation, payment, and possession are governed
                  entirely by the respective selling organisation and applicable Indian law.
                </p>
              </TSection>

              <TSection id="eligibility" title="3. Eligibility" onVisible={setActiveSection}>
                <p>To register and use the Platform, you must:</p>
                <ul>
                  <li>Be at least 18 years of age;</li>
                  <li>Be resident in India or legally authorised to transact in India;</li>
                  <li>Have full legal capacity to enter into binding contracts;</li>
                  <li>Not be barred from receiving services under applicable Indian law; and</li>
                  <li>Provide accurate, current, and complete information during registration.</li>
                </ul>
                <p>
                  Participation in specific auctions may be subject to additional eligibility requirements
                  imposed by the selling organisation, including KYC verification, EMD deposit, and
                  proof of financial capacity. Nilami shall not be responsible for disqualification
                  arising from non-fulfilment of such requirements.
                </p>
              </TSection>

              <TSection id="accounts" title="4. User Accounts" onVisible={setActiveSection}>
                <p>
                  When you create an account, you are responsible for maintaining the confidentiality
                  of your credentials and for all activities that occur under your account. You agree to:
                </p>
                <ul>
                  <li>Provide truthful, accurate, and complete registration information;</li>
                  <li>Promptly update your details if they change;</li>
                  <li>Notify us immediately at security@nilami.in of any unauthorised access;</li>
                  <li>Not share your login credentials with any third party; and</li>
                  <li>Not create multiple accounts for the same individual or entity.</li>
                </ul>
                <p>
                  We reserve the right to suspend or permanently terminate accounts that violate these
                  Terms, engage in fraudulent or abusive activity, or are found to contain materially
                  false information.
                </p>
              </TSection>

              <TSection id="auction-info" title="5. Auction Information" onVisible={setActiveSection}>
                <p>
                  <strong>Important Disclaimer:</strong> All auction information displayed on Nilami is
                  sourced from public records and third-party sources. While we strive to keep information
                  accurate and current, we make no warranties — express or implied — regarding the
                  completeness, accuracy, reliability, or suitability of any listing.
                </p>
                <p>
                  Users are strongly advised to independently verify all information directly with the
                  selling bank or organisation before participating in any auction. Nilami is not liable
                  for errors, omissions, or changes in auction details.
                </p>
                <p>
                  The "Auction Scorecard" and verification indicators displayed on the Platform are
                  rule-based informational tools. They do not constitute legal advice, financial advice,
                  or a guarantee of title, legality, possession, or investment returns.
                </p>
              </TSection>

              <TSection id="bidding" title="6. Bidding & Participation" onVisible={setActiveSection}>
                <p>
                  Nilami provides a platform to discover and prepare for auctions conducted by selling
                  organisations. The bidding process is subject to the rules and procedures of the
                  respective organisation. By registering for an auction through Nilami:
                </p>
                <ul>
                  <li>You agree to be bound by the selling organisation's terms and conditions;</li>
                  <li>You confirm that bids once submitted may be legally binding under those terms;</li>
                  <li>You accept that auction results are final per the selling organisation's rules;</li>
                  <li>You acknowledge obligations under the SARFAESI Act, 2002, where applicable; and</li>
                  <li>You confirm that you have independently verified the asset and met all eligibility requirements.</li>
                </ul>
              </TSection>

              <TSection id="payments" title="7. Payments & EMD" onVisible={setActiveSection}>
                <p>
                  Nilami may facilitate payment of Earnest Money Deposits (EMD), registration fees, and
                  other charges through integrated payment gateways. All payments are subject to:
                </p>
                <ul>
                  <li>The payment gateway provider's terms of service;</li>
                  <li>The selling organisation's EMD and refund policies;</li>
                  <li>RBI guidelines applicable to the transaction type; and</li>
                  <li>Applicable taxes including GST under Indian law.</li>
                </ul>
                <p>
                  EMD refunds for unsuccessful bidders are processed directly by the selling organisation,
                  typically within 7–15 working days of auction closure. Nilami is not responsible for
                  delays or disputes in EMD refunds. Platform convenience fees, where applicable, are
                  non-refundable.
                </p>
              </TSection>

              <TSection id="verification" title="8. Verification & Accuracy" onVisible={setActiveSection}>
                <p>
                  Nilami employs automated and manual processes to cross-reference auction information
                  against publicly available sources. Verification badges indicate the status of our
                  cross-referencing only. They do not constitute:
                </p>
                <ul>
                  <li>Legal title verification or title search;</li>
                  <li>Physical inspection of the asset;</li>
                  <li>Encumbrance certificate review;</li>
                  <li>Confirmation of clear or marketable title; or</li>
                  <li>Any form of professional legal or financial due diligence.</li>
                </ul>
                <p>
                  Prospective buyers are strongly advised to engage a qualified advocate, obtain an
                  encumbrance certificate, and inspect the property physically before participating
                  in any auction.
                </p>
              </TSection>

              <TSection id="prohibited" title="9. Prohibited Activities" onVisible={setActiveSection}>
                <p>You agree not to use the Platform to:</p>
                <ul>
                  <li>Submit false, misleading, or fraudulent information;</li>
                  <li>Impersonate any person, entity, or government authority;</li>
                  <li>Manipulate auction prices or collude with other bidders (bid rigging);</li>
                  <li>Harvest, scrape, or extract Platform data without written permission;</li>
                  <li>Introduce malware, viruses, or malicious code into the Platform;</li>
                  <li>Violate applicable Indian laws including the IT Act, 2000;</li>
                  <li>Use the Platform for money laundering or illegal financing; or</li>
                  <li>Interfere with the security or proper functioning of the Platform.</li>
                </ul>
              </TSection>

              <TSection id="ip" title="10. Intellectual Property" onVisible={setActiveSection}>
                <p>
                  The Nilami name, logo, design, software, and original content are the intellectual
                  property of Nilami Technologies Private Limited and are protected under applicable
                  Indian intellectual property laws. You may not reproduce, distribute, modify, or
                  create derivative works without our prior written consent.
                </p>
                <p>
                  Auction notices, images, and documents sourced from third parties remain the property
                  of their respective owners and are displayed solely for informational purposes.
                </p>
              </TSection>

              <TSection id="liability" title="11. Limitation of Liability" onVisible={setActiveSection}>
                <p>
                  To the maximum extent permitted under Indian law, Nilami Technologies Private Limited,
                  its directors, officers, employees, and agents shall not be liable for:
                </p>
                <ul>
                  <li>Any indirect, incidental, special, consequential, or punitive damages;</li>
                  <li>Loss of profits, data, business, goodwill, or opportunity;</li>
                  <li>Damages arising from reliance on information displayed on the Platform;</li>
                  <li>Outcomes of auctions participated in through third-party platforms; or</li>
                  <li>Technical issues, downtime, data loss, or service interruptions.</li>
                </ul>
                <p>
                  Our total aggregate liability to you for any claims under these Terms shall not exceed
                  the fees paid by you to Nilami in the twelve (12) months preceding the claim.
                </p>
              </TSection>

              <TSection id="indemnification" title="12. Indemnification" onVisible={setActiveSection}>
                <p>
                  You agree to indemnify, defend, and hold harmless Nilami Technologies Private Limited
                  and its affiliates from and against any claims, liabilities, damages, losses, and
                  expenses — including reasonable legal fees — arising out of your use of the Platform,
                  your violation of these Terms, or your infringement of any rights of any person or entity.
                </p>
              </TSection>

              <TSection id="privacy" title="13. Privacy Policy" onVisible={setActiveSection}>
                <p>
                  Your use of the Platform is governed by our{' '}
                  <Link to="/privacy" className="text-navy-700 underline underline-offset-2 hover:text-navy-900">
                    Privacy Policy
                  </Link>
                  , which is incorporated into these Terms by reference. By using the Platform, you
                  consent to the collection and use of your information as described therein, in
                  accordance with the Information Technology Act, 2000 and the Digital Personal Data
                  Protection Act, 2023.
                </p>
              </TSection>

              <TSection id="modifications" title="14. Modifications to Terms" onVisible={setActiveSection}>
                <p>
                  We reserve the right to modify these Terms at any time. Material changes will be
                  notified via email or a prominent notice on the Platform at least 15 days before
                  they take effect. Your continued use of the Platform after the effective date
                  constitutes acceptance of the revised Terms.
                </p>
              </TSection>

              <TSection id="governing-law" title="15. Governing Law" onVisible={setActiveSection}>
                <p>
                  These Terms are governed by the laws of India. Any disputes arising under these Terms
                  shall be subject to the exclusive jurisdiction of the courts at Mumbai, Maharashtra.
                  The parties agree to attempt resolution through good-faith negotiation before
                  initiating legal proceedings.
                </p>
              </TSection>

              <TSection id="contact" title="16. Contact Us" onVisible={setActiveSection}>
                <p>For questions about these Terms, contact our Legal team:</p>
                <div className="bg-navy-50 rounded-lg p-4 mt-3 not-prose">
                  <p className="text-sm font-semibold text-navy-900">Nilami Technologies Private Limited</p>
                  <p className="text-sm text-navy-600 mt-1">Level 8, One BKC, Bandra Kurla Complex</p>
                  <p className="text-sm text-navy-600">Bandra (East), Mumbai — 400 051</p>
                  <div className="mt-3 flex flex-col gap-1">
                    <p className="text-sm text-navy-600">
                      <span className="font-medium">Email:</span> legal@nilami.in
                    </p>
                    <p className="text-sm text-navy-600">
                      <span className="font-medium">Phone:</span> +91 22 4567 8900
                    </p>
                    <p className="text-sm text-navy-600">
                      <span className="font-medium">Hours:</span> Mon–Fri, 9:30 AM – 5:30 PM IST
                    </p>
                  </div>
                </div>
              </TSection>

              {/* Bottom disclaimer */}
              <div className="mt-8 pt-6 border-t border-surface-border">
                <div className="flex gap-3 items-start">
                  <Shield className="w-4 h-4 text-navy-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-navy-400 leading-relaxed">
                    Nilami Technologies Private Limited · CIN: U74999MH2024PTC123456 · GSTIN: 27AABCN1234F1Z5 ·
                    Registered Office: Level 8, One BKC, Mumbai 400051. Nilami is an information platform only.
                    All auction-related decisions are solely the responsibility of the participating user.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TSection({
  id,
  title,
  children,
  onVisible,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  onVisible: (id: string) => void;
}) {
  return (
    <section
      id={id}
      className="mb-8 scroll-mt-24"
      onMouseEnter={() => onVisible(id)}
    >
      <h2 className="text-base font-semibold text-navy-900 mb-3 pb-2 border-b border-surface-border">
        {title}
      </h2>
      <div className="space-y-3 text-sm text-navy-600 leading-relaxed [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:list-disc [&_li]:text-navy-600 [&_strong]:text-navy-800 [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}
