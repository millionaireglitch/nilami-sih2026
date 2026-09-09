import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

const LAST_UPDATED = '1 September 2025';

const SECTIONS = [
  { id: 'overview', title: '1. Overview' },
  { id: 'information-collected', title: '2. Information We Collect' },
  { id: 'how-we-use', title: '3. How We Use Your Information' },
  { id: 'sharing', title: '4. Information Sharing' },
  { id: 'security', title: '5. Data Security' },
  { id: 'cookies', title: '6. Cookies & Tracking' },
  { id: 'third-party', title: '7. Third-Party Links' },
  { id: 'retention', title: '8. Data Retention' },
  { id: 'rights', title: '9. Your Rights' },
  { id: 'children', title: '10. Children\'s Privacy' },
  { id: 'changes', title: '11. Changes to This Policy' },
  { id: 'contact', title: '12. Grievance Officer' },
];

const HIGHLIGHTS = [
  {
    icon: Lock,
    title: 'Data Encrypted',
    desc: 'All personal data is encrypted in transit (TLS 1.3) and at rest (AES-256).',
  },
  {
    icon: Eye,
    title: 'Never Sold',
    desc: 'We do not sell your personal data to any third party, ever.',
  },
  {
    icon: Database,
    title: 'Minimal Collection',
    desc: 'We collect only what is necessary to provide the service.',
  },
  {
    icon: UserCheck,
    title: 'Your Control',
    desc: 'You can request access, correction, or deletion of your data at any time.',
  },
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Hero */}
      <div className="bg-navy-900 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-navy-300 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Privacy Policy</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-navy-300 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white border-b border-surface-border">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HIGHLIGHTS.map(h => (
              <div key={h.title} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-4 h-4 text-navy-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-900">{h.title}</p>
                  <p className="text-xs text-navy-500 mt-0.5 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-8 items-start">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 card p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400 mb-3">Contents</p>
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

              <PSection id="overview" title="1. Overview" onVisible={setActiveSection}>
                <p>
                  Nilami Technologies Private Limited ("Nilami," "we," "us") is committed to protecting
                  your personal data. This Privacy Policy explains how we collect, use, share, and
                  protect your information when you use the Nilami platform at nilami.in.
                </p>
                <p>
                  This Policy is governed by the Information Technology Act, 2000, the Information
                  Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data
                  or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDP
                  Act). By using our platform, you consent to the practices described in this Policy.
                </p>
              </PSection>

              <PSection id="information-collected" title="2. Information We Collect" onVisible={setActiveSection}>
                <p><strong>Information you provide directly:</strong></p>
                <ul>
                  <li><strong>Account information:</strong> Name, email address, mobile number, date of birth, and password when you register.</li>
                  <li><strong>KYC documents:</strong> PAN card, Aadhaar number (masked), address proof, photograph — collected for identity verification as required for auction participation.</li>
                  <li><strong>Communication data:</strong> Messages, queries, and feedback you send us via contact forms, email, or chat.</li>
                  <li><strong>Payment data:</strong> Payment method type, partial card/UPI details, transaction references (we do not store full card numbers; payment processing is handled by Razorpay).</li>
                  <li><strong>Business information:</strong> Organisation name, GSTIN, designation, and documents — if you register as an organisation user.</li>
                </ul>
                <p><strong>Information collected automatically:</strong></p>
                <ul>
                  <li><strong>Usage data:</strong> Pages visited, search queries, filters applied, auctions viewed, time spent on pages.</li>
                  <li><strong>Device data:</strong> IP address, browser type and version, operating system, device identifiers.</li>
                  <li><strong>Location data:</strong> General geographic location inferred from IP address; precise location only if you grant permission.</li>
                  <li><strong>Cookies and similar technologies:</strong> Session cookies, preference cookies, analytics cookies (see Section 6).</li>
                </ul>
              </PSection>

              <PSection id="how-we-use" title="3. How We Use Your Information" onVisible={setActiveSection}>
                <p>We use your information to:</p>
                <ul>
                  <li>Create and manage your account, and authenticate your identity;</li>
                  <li>Facilitate auction discovery, registration, and bidding processes;</li>
                  <li>Process EMD payments and issue transaction receipts;</li>
                  <li>Send auction alerts, reminders, and status updates you have opted into;</li>
                  <li>Conduct KYC/AML verification as required by applicable law and selling organisations;</li>
                  <li>Provide customer support and respond to your queries;</li>
                  <li>Improve the Platform's search, recommendation, and personalisation features;</li>
                  <li>Detect, investigate, and prevent fraudulent or illegal activity;</li>
                  <li>Comply with legal obligations under Indian law; and</li>
                  <li>Send platform-related announcements and, where permitted, promotional communications.</li>
                </ul>
              </PSection>

              <PSection id="sharing" title="4. Information Sharing" onVisible={setActiveSection}>
                <p>
                  We do not sell, rent, or trade your personal data. We share information only in the
                  following limited circumstances:
                </p>
                <ul>
                  <li>
                    <strong>Selling organisations:</strong> When you register for an auction, we share your
                    name, contact details, KYC status, and EMD payment confirmation with the relevant bank
                    or organisation, as required for auction participation.
                  </li>
                  <li>
                    <strong>Payment processors:</strong> Razorpay and similar processors receive payment
                    information necessary to process transactions.
                  </li>
                  <li>
                    <strong>Service providers:</strong> Cloud hosting (AWS/Azure), email service (for OTPs
                    and notifications), analytics providers — under strict data processing agreements.
                  </li>
                  <li>
                    <strong>Legal compliance:</strong> When required by court order, government authority,
                    or applicable Indian law, including RBI, SEBI, or enforcement agencies.
                  </li>
                  <li>
                    <strong>Business transfers:</strong> In the event of a merger, acquisition, or asset
                    sale, your data may be transferred to the acquiring entity with prior notice to you.
                  </li>
                </ul>
              </PSection>

              <PSection id="security" title="5. Data Security" onVisible={setActiveSection}>
                <p>
                  We implement industry-standard technical and organisational security measures including:
                </p>
                <ul>
                  <li>TLS 1.3 encryption for all data in transit;</li>
                  <li>AES-256 encryption for sensitive data at rest;</li>
                  <li>Bcrypt password hashing with per-user salts;</li>
                  <li>Multi-factor authentication for administrative access;</li>
                  <li>Regular third-party security audits and penetration testing;</li>
                  <li>Role-based access control for all internal systems; and</li>
                  <li>Masking of Aadhaar numbers in compliance with UIDAI guidelines.</li>
                </ul>
                <p>
                  While we take reasonable precautions, no system is completely secure. If you suspect
                  a security breach, please report it immediately to security@nilami.in.
                </p>
              </PSection>

              <PSection id="cookies" title="6. Cookies & Tracking" onVisible={setActiveSection}>
                <p>We use the following types of cookies:</p>
                <ul>
                  <li>
                    <strong>Essential cookies:</strong> Required for the Platform to function —
                    authentication sessions, CSRF protection, cart/compare state.
                  </li>
                  <li>
                    <strong>Preference cookies:</strong> Remember your filter settings, language preference,
                    and notification choices.
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Used via privacy-friendly analytics tools to
                    understand how users interact with the Platform. No personally identifiable tracking.
                  </li>
                </ul>
                <p>
                  You can control cookie preferences through your browser settings. Disabling essential
                  cookies will affect Platform functionality. We do not use third-party advertising or
                  cross-site tracking cookies.
                </p>
              </PSection>

              <PSection id="third-party" title="7. Third-Party Links" onVisible={setActiveSection}>
                <p>
                  The Platform may contain links to selling organisations' websites, payment gateways,
                  e-auction portals, and other external resources. These third-party services have their
                  own privacy policies, and we have no control over their data practices. We encourage
                  you to review their privacy policies before providing personal information.
                </p>
              </PSection>

              <PSection id="retention" title="8. Data Retention" onVisible={setActiveSection}>
                <p>We retain your personal data as follows:</p>
                <ul>
                  <li>
                    <strong>Account data:</strong> Retained for the lifetime of your account plus 3 years
                    after account deletion, as required for legal and audit purposes.
                  </li>
                  <li>
                    <strong>KYC documents:</strong> Retained for 5 years after the last verified transaction,
                    per PMLA requirements.
                  </li>
                  <li>
                    <strong>Transaction records:</strong> Retained for 7 years as required by the Companies
                    Act and Income Tax Act.
                  </li>
                  <li>
                    <strong>Usage logs:</strong> Retained for 90 days for security and fraud detection.
                  </li>
                </ul>
                <p>
                  After the applicable retention period, data is securely deleted or anonymised.
                </p>
              </PSection>

              <PSection id="rights" title="9. Your Rights" onVisible={setActiveSection}>
                <p>
                  Under the Digital Personal Data Protection Act, 2023, you have the following rights:
                </p>
                <ul>
                  <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
                  <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your data, subject to legal retention obligations.</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for non-essential data processing.</li>
                  <li><strong>Right to Grievance Redressal:</strong> Lodge a complaint with our Grievance Officer.</li>
                  <li><strong>Right to Nominate:</strong> Nominate a person to exercise your rights in the event of your death or incapacitation.</li>
                </ul>
                <p>
                  To exercise your rights, email privacy@nilami.in from your registered email address.
                  We will respond within 30 days as required by law.
                </p>
              </PSection>

              <PSection id="children" title="10. Children's Privacy" onVisible={setActiveSection}>
                <p>
                  The Nilami Platform is not directed at children under 18 years of age. We do not
                  knowingly collect personal data from minors. If you believe we have inadvertently
                  collected data from a minor, please contact us immediately at privacy@nilami.in and
                  we will delete such data promptly.
                </p>
              </PSection>

              <PSection id="changes" title="11. Changes to This Policy" onVisible={setActiveSection}>
                <p>
                  We may update this Privacy Policy from time to time. Material changes will be
                  communicated via email or a prominent notice on the Platform at least 15 days before
                  they take effect. Your continued use of the Platform after the effective date
                  constitutes acceptance of the updated Policy.
                </p>
              </PSection>

              <PSection id="contact" title="12. Grievance Officer" onVisible={setActiveSection}>
                <p>
                  As required by the Information Technology (Intermediary Guidelines and Digital Media
                  Ethics Code) Rules, 2021, we have appointed a Grievance Officer:
                </p>
                <div className="bg-navy-50 rounded-lg p-4 mt-3 not-prose">
                  <p className="text-sm font-semibold text-navy-900">Grievance Officer — Nilami Technologies Pvt. Ltd.</p>
                  <div className="mt-3 flex flex-col gap-1">
                    <p className="text-sm text-navy-600">
                      <span className="font-medium">Name:</span> Ms. Priya Nair
                    </p>
                    <p className="text-sm text-navy-600">
                      <span className="font-medium">Email:</span> grievance@nilami.in
                    </p>
                    <p className="text-sm text-navy-600">
                      <span className="font-medium">Phone:</span> +91 22 4567 8901
                    </p>
                    <p className="text-sm text-navy-600">
                      <span className="font-medium">Address:</span> Level 8, One BKC, Mumbai — 400 051
                    </p>
                    <p className="text-sm text-navy-600">
                      <span className="font-medium">Response time:</span> Within 30 days of receipt
                    </p>
                  </div>
                </div>
              </PSection>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-surface-border">
                <div className="flex gap-3 items-start">
                  <Shield className="w-4 h-4 text-navy-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-navy-400 leading-relaxed">
                    Nilami Technologies Private Limited · CIN: U74999MH2024PTC123456 ·
                    This Privacy Policy is published in compliance with the Information Technology Act, 2000
                    and the Digital Personal Data Protection Act, 2023.
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

function PSection({
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
      <div className="space-y-3 text-sm text-navy-600 leading-relaxed [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:list-disc [&_li]:text-navy-600 [&_strong]:text-navy-800 [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}
