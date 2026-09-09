import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, AlertCircle, User, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type AccountType = 'individual' | 'business';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field: string, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!form.terms) {
      setError('Please accept the Terms & Conditions to continue.');
      return;
    }

    setLoading(true);
    const ok = await register(form.name, form.email, form.phone, form.password);
    setLoading(false);
    if (ok) {
      navigate('/dashboard');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-navy-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-2xl font-bold text-navy-900 tracking-tight">Nilami</span>
          </Link>
          <h1 className="text-2xl font-bold text-navy-900 mb-1">Create your account</h1>
          <p className="text-sm text-navy-500">Join thousands of verified bidders on Nilami</p>
        </div>

        <div className="card p-8">
          {/* Account type toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-surface-bg rounded-xl">
            <button
              type="button"
              onClick={() => setAccountType('individual')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                accountType === 'individual'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-500 hover:text-navy-700'
              }`}
            >
              <User className="w-4 h-4" />
              Individual
            </button>
            <button
              type="button"
              onClick={() => setAccountType('business')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                accountType === 'business'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-500 hover:text-navy-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Business
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                {accountType === 'individual' ? 'Full name' : 'Organisation name'} *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder={accountType === 'individual' ? 'Priya Sharma' : 'ABC Enterprises Pvt. Ltd.'}
                className="form-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Email address *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com"
                className="form-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Mobile number *</label>
              <div className="flex gap-2">
                <span className="form-input w-14 text-center text-navy-700 font-medium shrink-0 flex items-center justify-center">
                  +91
                </span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="98765 43210"
                  className="form-input flex-1"
                  maxLength={10}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Password *</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Min. 8 characters"
                  className="form-input w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Confirm password *</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => set('confirmPassword', e.target.value)}
                placeholder="Re-enter password"
                className="form-input w-full"
              />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={e => set('terms', e.target.checked)}
                className="mt-0.5 accent-navy-900"
              />
              <span className="text-sm text-navy-600">
                I agree to Nilami's{' '}
                <Link to="/terms" className="font-medium text-navy-900 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-navy-900 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-base font-semibold disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="border-t border-surface-border mt-6 pt-5 text-center">
            <p className="text-sm text-navy-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-navy-900 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-navy-400">
          <Shield className="w-3.5 h-3.5" />
          Secure sign-up · Your data is encrypted
        </div>
      </div>
    </div>
  );
}
