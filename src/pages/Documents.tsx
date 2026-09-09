import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Download, Trash2, Eye, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/utils/format';

interface UserDocument {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'pending' | 'rejected' | 'expired';
  uploadedAt: string;
  expiresAt?: string;
  sizeKB: number;
  required: boolean;
}

const MOCK_USER_DOCS: UserDocument[] = [
  { id: 'DOC001', name: 'PAN Card — ABCDE1234F.pdf', type: 'PAN Card', status: 'verified', uploadedAt: '2026-08-10', sizeKB: 245, required: true },
  { id: 'DOC002', name: 'Aadhaar Card — Masked.pdf', type: 'Aadhaar Card', status: 'verified', uploadedAt: '2026-08-10', sizeKB: 312, required: true },
  { id: 'DOC003', name: 'Address Proof — EB Bill.pdf', type: 'Address Proof', status: 'pending', uploadedAt: '2026-09-01', sizeKB: 198, required: true },
  { id: 'DOC004', name: 'Bank Statement — Aug 2026.pdf', type: 'Bank Statement', status: 'verified', uploadedAt: '2026-09-02', expiresAt: '2026-12-02', sizeKB: 520, required: false },
];

const REQUIRED_DOCS = [
  { type: 'PAN Card', desc: 'Mandatory for all auction participants. Must be self-attested.' },
  { type: 'Aadhaar Card', desc: 'Masked copy. Only last 4 digits of Aadhaar visible.' },
  { type: 'Address Proof', desc: 'Utility bill, Voter ID, Driving Licence, or Passbook (not older than 3 months).' },
  { type: 'Photograph', desc: 'Passport-size colour photograph on white background.' },
];

const STATUS_STYLE: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  verified: { icon: CheckCircle, color: 'text-emerald-700', bg: 'bg-emerald-100', label: 'Verified' },
  pending: { icon: Clock, color: 'text-amber-700', bg: 'bg-amber-100', label: 'Under Review' },
  rejected: { icon: AlertCircle, color: 'text-red-700', bg: 'bg-red-100', label: 'Rejected' },
  expired: { icon: AlertCircle, color: 'text-navy-500', bg: 'bg-navy-100', label: 'Expired' },
};

export default function Documents() {
  const { user } = useAuth();
  const [dragOver, setDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!user) return <Navigate to="/login" state={{ from: '/documents' }} replace />;

  const verifiedCount = MOCK_USER_DOCS.filter(d => d.status === 'verified').length;
  const kycComplete = user.kycStatus === 'approved';

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  }

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Header */}
      <div className="bg-navy-900 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-navy-300 mb-3 flex items-center gap-2">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>›</span>
            <span className="text-white">Documents</span>
          </nav>
          <h1 className="text-2xl font-bold text-white">My Documents</h1>
          <p className="text-navy-300 text-sm mt-1">Manage your KYC and auction-related documents.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* KYC status banner */}
        <div className={`rounded-lg p-5 mb-6 flex gap-4 items-start border ${
          kycComplete ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
        }`}>
          <Shield className={`w-6 h-6 flex-shrink-0 mt-0.5 ${kycComplete ? 'text-emerald-600' : 'text-amber-600'}`} />
          <div className="flex-1">
            <p className={`font-semibold text-sm ${kycComplete ? 'text-emerald-900' : 'text-amber-900'}`}>
              {kycComplete ? 'KYC Verified — You are eligible to participate in auctions' : 'KYC Incomplete — Complete verification to bid'}
            </p>
            <p className={`text-sm mt-0.5 ${kycComplete ? 'text-emerald-700' : 'text-amber-700'}`}>
              {verifiedCount} of {MOCK_USER_DOCS.filter(d => d.required).length} required documents verified.
              {!kycComplete && ' Please upload and verify all required documents.'}
            </p>
          </div>
          {!kycComplete && (
            <div className="flex-shrink-0">
              <div className="text-sm font-semibold text-amber-800">
                {Math.round((verifiedCount / REQUIRED_DOCS.length) * 100)}%
              </div>
              <div className="w-16 h-1.5 bg-amber-200 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(verifiedCount / REQUIRED_DOCS.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload + docs list */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload area */}
            <div className="card p-5">
              <h2 className="font-semibold text-navy-900 mb-4">Upload Document</h2>
              {uploadSuccess && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2 text-sm text-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Document uploaded successfully. It will be reviewed within 1–2 business days.
                </div>
              )}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver ? 'border-navy-400 bg-navy-50' : 'border-surface-border hover:border-navy-300'
                }`}
              >
                <Upload className="w-8 h-8 text-navy-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-navy-700">Drag and drop your file here</p>
                <p className="text-xs text-navy-400 mt-1">or</p>
                <label className="mt-3 inline-block cursor-pointer">
                  <span className="btn btn-outline text-sm px-4 py-2">Browse File</span>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </label>
                <p className="text-xs text-navy-400 mt-3">PDF, JPG, PNG · Max 5 MB per file</p>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Document Type</label>
                <select className="form-select text-sm w-full">
                  <option value="">Select type...</option>
                  {REQUIRED_DOCS.map(r => <option key={r.type}>{r.type}</option>)}
                  <option>Bank Statement</option>
                  <option>Income Tax Return</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Document list */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-surface-border">
                <h2 className="font-semibold text-navy-900">Uploaded Documents</h2>
              </div>
              <div className="divide-y divide-surface-border">
                {MOCK_USER_DOCS.map(doc => {
                  const cfg = STATUS_STYLE[doc.status];
                  return (
                    <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-surface-bg/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-navy-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy-900 truncate">{doc.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-navy-400">{doc.type}</span>
                          <span className="text-xs text-navy-300">·</span>
                          <span className="text-xs text-navy-400">{(doc.sizeKB / 1024).toFixed(1)} MB</span>
                          <span className="text-xs text-navy-300">·</span>
                          <span className="text-xs text-navy-400">{formatDate(doc.uploadedAt)}</span>
                        </div>
                        {doc.expiresAt && (
                          <p className="text-xs text-amber-600 mt-0.5">Expires: {formatDate(doc.expiresAt)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-navy-300 hover:text-navy-700 transition-colors rounded" title="Preview">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-navy-300 hover:text-navy-700 transition-colors rounded" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-navy-300 hover:text-red-500 transition-colors rounded" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Required docs checklist */}
          <div className="space-y-6">
            <div className="card p-5">
              <h2 className="font-semibold text-navy-900 mb-4">Required for KYC</h2>
              <div className="space-y-3">
                {REQUIRED_DOCS.map(req => {
                  const uploaded = MOCK_USER_DOCS.find(d => d.type === req.type);
                  return (
                    <div key={req.type} className="flex gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        uploaded?.status === 'verified'
                          ? 'bg-emerald-100'
                          : uploaded
                          ? 'bg-amber-100'
                          : 'bg-navy-100'
                      }`}>
                        {uploaded?.status === 'verified' ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        ) : uploaded ? (
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-navy-300" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-800">{req.type}</p>
                        <p className="text-xs text-navy-500 mt-0.5 leading-relaxed">{req.desc}</p>
                        {uploaded?.status === 'verified' && (
                          <p className="text-xs text-emerald-600 mt-0.5">✓ Verified</p>
                        )}
                        {uploaded?.status === 'pending' && (
                          <p className="text-xs text-amber-600 mt-0.5">⏳ Under review</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card p-5 bg-navy-900 text-white">
              <h3 className="font-semibold text-sm mb-2">Why is KYC required?</h3>
              <p className="text-xs text-navy-300 leading-relaxed">
                Selling banks and organisations require KYC verification as per RBI guidelines and
                PMLA, 2002 before allowing auction participation. Verified documents speed up EMD
                processing and registration approval.
              </p>
              <Link to="/how-it-works" className="text-xs text-saffron-400 hover:text-saffron-300 mt-3 inline-block">
                Learn how auctions work →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
