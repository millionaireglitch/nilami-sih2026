import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
          <p className="text-navy-300 text-sm">
            Have a question, issue, or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* Info sidebar */}
        <div className="space-y-5">
          <div className="card p-5">
            <div className="w-9 h-9 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-1 text-sm">Email Support</h3>
            <p className="text-navy-500 text-xs mb-1">support@nilami.in</p>
            <p className="text-navy-400 text-xs">Response within 24 hours</p>
          </div>

          <div className="card p-5">
            <div className="w-9 h-9 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-1 text-sm">Phone Helpdesk</h3>
            <p className="text-navy-500 text-xs mb-1">1800-XXX-NILAMI (Toll Free)</p>
            <p className="text-navy-400 text-xs">Mon–Sat, 9 AM – 6 PM IST</p>
          </div>

          <div className="card p-5">
            <div className="w-9 h-9 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-1 text-sm">Registered Office</h3>
            <p className="text-navy-500 text-xs leading-relaxed">
              Nilami Technologies Pvt. Ltd.<br />
              WeWork Prestige Atlanta,<br />
              80 Feet Road, Koramangala,<br />
              Bengaluru, Karnataka 560034
            </p>
          </div>

          <div className="card p-5">
            <div className="w-9 h-9 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-1 text-sm">Support Hours</h3>
            <p className="text-navy-500 text-xs">Monday – Saturday</p>
            <p className="text-navy-400 text-xs">9:00 AM – 6:00 PM IST</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="card p-10 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-navy-900 mb-2">Message sent!</h2>
              <p className="text-navy-500 text-sm mb-6">
                Thank you for reaching out. Our team will respond to your query at <strong>{form.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', category: '', message: '' }); }}
                className="btn btn-outline px-6 py-2.5 text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="card p-8">
              <h2 className="text-xl font-bold text-navy-900 mb-6">Send us a message</h2>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">Your name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Priya Sharma"
                      className="form-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">Email address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="priya@example.com"
                      className="form-input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                    className="form-select w-full"
                  >
                    <option value="">Select a topic</option>
                    <option>Auction listing query</option>
                    <option>Account / login issue</option>
                    <option>Payment or EMD help</option>
                    <option>Report incorrect listing</option>
                    <option>Organisation / bank partnership</option>
                    <option>Feedback or suggestion</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    rows={5}
                    placeholder="Describe your question or issue in detail..."
                    className="form-input w-full resize-none"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full py-3 font-semibold">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
