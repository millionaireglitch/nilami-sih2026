import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Bell, Shield, Key, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { INDIAN_STATES } from '@/data/mockData';
import { formatDate } from '@/utils/format';

const NOTIFICATION_PREFS = [
  { key: 'auction_reminders', label: 'Auction Reminders', desc: 'Remind me 24h and 1h before auctions I\'ve registered for' },
  { key: 'bid_outbid', label: 'Outbid Alerts', desc: 'Notify me immediately when someone outbids me' },
  { key: 'new_matches', label: 'Alert Matches', desc: 'Notify when new auctions match my saved alerts' },
  { key: 'status_changes', label: 'Auction Status Changes', desc: 'Cancelled, extended, or rescheduled auctions I\'ve saved' },
  { key: 'emd_updates', label: 'EMD & Payment Updates', desc: 'EMD confirmation, refund processing, payment receipts' },
  { key: 'platform_news', label: 'Platform Updates', desc: 'New features, policy updates, and important notices' },
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'notifications' | 'security'>('personal');
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    city: '',
    state: '',
    pincode: '',
  });

  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>(
    NOTIFICATION_PREFS.reduce((acc, p) => ({ ...acc, [p.key]: true }), {})
  );

  if (!user) return <Navigate to="/login" state={{ from: '/profile' }} replace />;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateUser({ name: form.name, phone: form.phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const KYC_STATUS = {
    approved: { label: 'KYC Verified', icon: CheckCircle, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', desc: 'Your identity has been verified. You are eligible to participate in auctions.' },
    pending: { label: 'KYC Under Review', icon: AlertCircle, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', desc: 'Your documents are being reviewed. This typically takes 1–2 business days.' },
    rejected: { label: 'KYC Rejected', icon: AlertCircle, color: 'text-red-700', bg: 'bg-red-50 border-red-200', desc: 'Your KYC was rejected. Please re-upload valid documents.' },
    not_started: { label: 'KYC Not Completed', icon: AlertCircle, color: 'text-navy-600', bg: 'bg-navy-50 border-navy-200', desc: 'Complete KYC to participate in auctions. Upload your PAN, Aadhaar, and address proof.' },
  };

  const kycInfo = KYC_STATUS[user.kycStatus];

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Header */}
      <div className="bg-navy-900 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-navy-300 mb-3 flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>›</span>
            <span className="text-white">Profile</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-navy-700 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-5 h-5 bg-saffron-500 rounded-full flex items-center justify-center hover:bg-saffron-600 transition-colors">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <p className="text-navy-300 text-sm">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  user.membership === 'premium' ? 'bg-saffron-500/20 text-saffron-300' : 'bg-navy-700 text-navy-300'
                }`}>
                  {user.membership === 'premium' ? '★ Premium' : 'Free Plan'}
                </span>
                <span className="text-xs text-navy-400">Member since {formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* KYC banner */}
        <div className={`rounded-lg p-4 mb-6 flex gap-3 items-start border ${kycInfo.bg}`}>
          <kycInfo.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${kycInfo.color}`} />
          <div className="flex-1">
            <p className={`text-sm font-semibold ${kycInfo.color}`}>{kycInfo.label}</p>
            <p className="text-sm text-navy-600 mt-0.5">{kycInfo.desc}</p>
          </div>
          {user.kycStatus !== 'approved' && (
            <Link to="/documents" className="btn btn-primary text-xs py-1.5 px-3 flex-shrink-0">
              Upload Docs
            </Link>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white border border-surface-border rounded-lg p-1 w-fit">
          {([
            { key: 'personal', label: 'Personal Info', icon: User },
            { key: 'notifications', label: 'Notifications', icon: Bell },
            { key: 'security', label: 'Security', icon: Shield },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-navy-900 text-white'
                  : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <form onSubmit={handleSave} className="card p-6">
            {saved && (
              <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2 text-sm text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Profile updated successfully.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  <User className="w-4 h-4 inline mr-1.5 text-navy-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  <Mail className="w-4 h-4 inline mr-1.5 text-navy-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="form-input opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-navy-400 mt-1">Email cannot be changed after registration.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  <Phone className="w-4 h-4 inline mr-1.5 text-navy-400" />
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 rounded-lg border border-surface-border bg-surface-bg text-sm text-navy-500 flex-shrink-0">+91</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="form-input flex-1"
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  <MapPin className="w-4 h-4 inline mr-1.5 text-navy-400" />
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  className="form-input"
                  placeholder="e.g. Mumbai"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">State</label>
                <select
                  value={form.state}
                  onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                  className="form-select"
                >
                  <option value="">Select state...</option>
                  {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">PIN Code</label>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))}
                  className="form-input"
                  placeholder="e.g. 400001"
                  pattern="[0-9]{6}"
                  maxLength={6}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button type="submit" className="btn btn-primary px-6">Save Changes</button>
              <p className="text-xs text-navy-400">Your email is used as your unique identifier and cannot be changed.</p>
            </div>
          </form>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="card p-6">
            <p className="text-sm text-navy-600 mb-5">
              Choose how and when Nilami contacts you. All critical transactional notifications
              (EMD receipts, bid confirmations) are always sent regardless of these preferences.
            </p>
            <div className="space-y-4">
              {NOTIFICATION_PREFS.map(pref => (
                <div key={pref.key} className="flex items-start justify-between gap-4 py-3 border-b border-surface-border last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy-900">{pref.label}</p>
                    <p className="text-xs text-navy-500 mt-0.5">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifPrefs(p => ({ ...p, [pref.key]: !p[pref.key] }))}
                    className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ${
                      notifPrefs[pref.key] ? 'bg-navy-700' : 'bg-navy-200'
                    }`}
                    style={{ height: '22px', minWidth: '40px' }}
                    role="switch"
                    aria-checked={notifPrefs[pref.key]}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      notifPrefs[pref.key] ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setSaved(true)} className="btn btn-primary mt-5 px-6">Save Preferences</button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex items-start gap-3 mb-5">
                <Key className="w-5 h-5 text-navy-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-navy-900">Change Password</h3>
                  <p className="text-sm text-navy-500 mt-0.5">Use a strong, unique password with at least 8 characters.</p>
                </div>
              </div>
              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Current Password</label>
                  <input type="password" className="form-input" autoComplete="current-password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">New Password</label>
                  <input type="password" className="form-input" autoComplete="new-password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Confirm New Password</label>
                  <input type="password" className="form-input" autoComplete="new-password" />
                </div>
                <button className="btn btn-primary px-6">Update Password</button>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-5 h-5 text-navy-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-navy-900">Account Security</h3>
                  <p className="text-sm text-navy-500 mt-0.5">Manage login sessions and account access.</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-3 border-b border-surface-border">
                  <div>
                    <p className="font-medium text-navy-800">Two-Factor Authentication</p>
                    <p className="text-xs text-navy-400 mt-0.5">Add an extra layer of security via OTP</p>
                  </div>
                  <button className="btn btn-outline text-xs px-3 py-1.5">Enable</button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-surface-border">
                  <div>
                    <p className="font-medium text-navy-800">Active Sessions</p>
                    <p className="text-xs text-navy-400 mt-0.5">1 active session on Chrome, Mumbai</p>
                  </div>
                  <button className="text-xs text-red-600 hover:text-red-700 font-medium">Sign Out All</button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-red-700">Delete Account</p>
                    <p className="text-xs text-navy-400 mt-0.5">Permanently remove your account and data</p>
                  </div>
                  <button className="btn text-xs px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
