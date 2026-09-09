import React, { useState } from "react";
import {
  Bell,
  Plus,
  Edit3,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Clock,
  MapPin,
  Tag,
  Building2,
  CheckCircle,
  X,
  ChevronDown,
} from "lucide-react";
import { MOCK_ALERTS, INDIAN_STATES } from "@/data/mockData";
import type { Alert, AuctionType } from "@/types";
import { formatDate } from "@/utils/format";
import { cn } from "@/utils/cn";

const TYPE_OPTIONS: { value: AuctionType; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land / Plot" },
  { value: "vehicle", label: "Vehicle" },
  { value: "industrial", label: "Industrial" },
  { value: "equipment", label: "Equipment" },
  { value: "other", label: "Other" },
];

const FREQ_OPTIONS = [
  { value: "instant", label: "Instant" },
  { value: "daily", label: "Daily Digest" },
  { value: "weekly", label: "Weekly Summary" },
];

const EMPTY_FORM: Omit<Alert, "id" | "createdAt" | "lastTriggered" | "matchCount"> = {
  name: "",
  types: [],
  states: [],
  city: "",
  priceMin: null,
  priceMax: null,
  organization: "",
  active: true,
  frequency: "daily",
};

function AlertCard({
  alert,
  onToggle,
  onEdit,
  onDelete,
}: {
  alert: Alert;
  onToggle: (id: string) => void;
  onEdit: (alert: Alert) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border shadow-card p-5 transition-all",
        alert.active
          ? "border-surface-border"
          : "border-surface-border opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
              alert.active
                ? "bg-navy-900 text-white"
                : "bg-surface-muted text-navy-400"
            )}
          >
            <Bell size={15} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="font-semibold text-navy-800 text-sm truncate">
                {alert.name}
              </h3>
              {alert.active ? (
                <span className="badge badge-live text-[10px]">Active</span>
              ) : (
                <span className="badge bg-surface-muted text-navy-400 border-surface-border text-[10px]">
                  Paused
                </span>
              )}
            </div>
            <p className="text-xs text-navy-400">
              Created {formatDate(alert.createdAt)}
              {alert.lastTriggered && (
                <> · Last triggered {formatDate(alert.lastTriggered)}</>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(alert)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-400 hover:text-navy-700 hover:bg-surface-bg transition-colors"
            title="Edit alert"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => onDelete(alert.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete alert"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Criteria chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {alert.types.length > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-navy-50 text-navy-700 rounded text-xs border border-navy-200">
            <Tag size={10} />
            {alert.types
              .map(
                (t) => TYPE_OPTIONS.find((o) => o.value === t)?.label || t
              )
              .join(", ")}
          </span>
        )}
        {alert.states.length > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200">
            <MapPin size={10} />
            {alert.states.join(", ")}
          </span>
        )}
        {alert.city && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200">
            <MapPin size={10} />
            {alert.city}
          </span>
        )}
        {(alert.priceMin || alert.priceMax) && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs border border-emerald-200">
            ₹
            {alert.priceMin
              ? `${(alert.priceMin / 100000).toFixed(0)}L`
              : "0"}{" "}
            –{" "}
            {alert.priceMax
              ? `${(alert.priceMax / 100000).toFixed(0)}L`
              : "Any"}
          </span>
        )}
        {alert.organization && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs border border-purple-200">
            <Building2 size={10} />
            {alert.organization}
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-surface-muted text-navy-500 rounded text-xs border border-surface-border">
          <Clock size={10} />
          {FREQ_OPTIONS.find((f) => f.value === alert.frequency)?.label}
        </span>
      </div>

      {/* Stats + Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-lg font-bold text-navy-800">
              {alert.matchCount}
            </p>
            <p className="text-[10px] text-navy-400 uppercase tracking-wide">
              Matches
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggle(alert.id)}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
            alert.active
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-surface-bg text-navy-500 border-surface-border hover:bg-surface-muted"
          )}
        >
          {alert.active ? (
            <>
              <ToggleRight size={14} />
              Enabled
            </>
          ) : (
            <>
              <ToggleLeft size={14} />
              Enable
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function AlertFormModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<Alert>;
  onSave: (data: Omit<Alert, "id" | "createdAt" | "matchCount">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: initial.name || "",
    types: initial.types || ([] as AuctionType[]),
    states: initial.states || ([] as string[]),
    city: initial.city || "",
    priceMin: initial.priceMin ?? null as number | null,
    priceMax: initial.priceMax ?? null as number | null,
    organization: initial.organization || "",
    active: initial.active !== undefined ? initial.active : true,
    frequency: initial.frequency || ("daily" as "instant" | "daily" | "weekly"),
    lastTriggered: initial.lastTriggered,
  });

  const toggleType = (t: AuctionType) => {
    setForm((prev) => ({
      ...prev,
      types: prev.types.includes(t)
        ? prev.types.filter((x) => x !== t)
        : [...prev.types, t],
    }));
  };

  const toggleState = (s: string) => {
    setForm((prev) => ({
      ...prev,
      states: prev.states.includes(s)
        ? prev.states.filter((x) => x !== s)
        : [...prev.states, s],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border sticky top-0 bg-white z-10">
          <h2 className="font-bold text-navy-900">
            {initial.id ? "Edit Alert" : "Create New Alert"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-400 hover:bg-surface-bg hover:text-navy-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-5">
          {/* Alert Name */}
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">
              Alert Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. 2BHK in Mumbai under ₹50L"
              className="form-input"
              required
            />
          </div>

          {/* Asset Types */}
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-2 uppercase tracking-wide">
              Asset Types
            </label>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleType(opt.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                    form.types.includes(opt.value)
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-white text-navy-600 border-surface-border hover:bg-surface-bg"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* States */}
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-2 uppercase tracking-wide">
              States
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto border border-surface-border rounded-lg p-2">
              {INDIAN_STATES.map((state) => (
                <button
                  key={state}
                  type="button"
                  onClick={() => toggleState(state)}
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium transition-colors",
                    form.states.includes(state)
                      ? "bg-navy-900 text-white"
                      : "bg-surface-muted text-navy-600 hover:bg-surface-border"
                  )}
                >
                  {state}
                </button>
              ))}
            </div>
            {form.states.length > 0 && (
              <p className="text-xs text-navy-400 mt-1">
                {form.states.length} state{form.states.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">
              City (optional)
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              placeholder="e.g. Mumbai, Bengaluru"
              className="form-input"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">
              Price Range (₹)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  value={form.priceMin ?? ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      priceMin: e.target.value ? Number(e.target.value) : null,
                    }))
                  }
                  placeholder="Min price"
                  className="form-input"
                  min={0}
                />
              </div>
              <div>
                <input
                  type="number"
                  value={form.priceMax ?? ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      priceMax: e.target.value ? Number(e.target.value) : null,
                    }))
                  }
                  placeholder="Max price"
                  className="form-input"
                  min={0}
                />
              </div>
            </div>
          </div>

          {/* Organization */}
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1.5 uppercase tracking-wide">
              Bank / Organisation (optional)
            </label>
            <input
              type="text"
              value={form.organization}
              onChange={(e) =>
                setForm((p) => ({ ...p, organization: e.target.value }))
              }
              placeholder="e.g. SBI, HDFC, PNB"
              className="form-input"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-2 uppercase tracking-wide">
              Notification Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {FREQ_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setForm((p) => ({
                      ...p,
                      frequency: opt.value as Alert["frequency"],
                    }))
                  }
                  className={cn(
                    "py-2 rounded-lg border text-xs font-medium transition-colors",
                    form.frequency === opt.value
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-white text-navy-600 border-surface-border hover:bg-surface-bg"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn btn-outline flex-1">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-1">
              {initial.id ? "Save Changes" : "Create Alert"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);

  const handleToggle = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const handleDelete = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleEdit = (alert: Alert) => {
    setEditingAlert(alert);
    setShowForm(true);
  };

  const handleSave = (
    data: Omit<Alert, "id" | "createdAt" | "matchCount">
  ) => {
    if (editingAlert) {
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === editingAlert.id ? { ...a, ...data } : a
        )
      );
    } else {
      const newAlert: Alert = {
        ...data,
        id: `alert-${Date.now()}`,
        createdAt: new Date().toISOString(),
        matchCount: 0,
      };
      setAlerts((prev) => [...prev, newAlert]);
    }
    setShowForm(false);
    setEditingAlert(null);
  };

  const activeCount = alerts.filter((a) => a.active).length;

  return (
    <div className="bg-surface-bg min-h-screen">
      <div className="max-w-screen-lg mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center">
                <Bell size={16} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-navy-900">
                Auction Alerts
              </h1>
            </div>
            <p className="text-navy-500 text-sm ml-12">
              {alerts.length > 0
                ? `${alerts.length} alerts · ${activeCount} active`
                : "Get notified when matching auctions are listed"}
            </p>
          </div>
          <button
            onClick={() => {
              setEditingAlert(null);
              setShowForm(true);
            }}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Plus size={15} />
            New Alert
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
          <Bell size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">
              How alerts work
            </p>
            <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">
              We scan newly listed auctions from banks and government
              organisations against your criteria. When matches are found,
              you'll get notified based on your selected frequency — instantly,
              daily, or weekly.
            </p>
          </div>
        </div>

        {/* Alert List */}
        {alerts.length === 0 ? (
          <div className="py-12">
            <div className="text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-surface-card border border-surface-border flex items-center justify-center mx-auto mb-4">
                <Bell size={22} className="text-navy-300" />
              </div>
              <h3 className="text-base font-semibold text-navy-800 mb-2">
                No alerts set up
              </h3>
              <p className="text-sm text-navy-500 mb-6">
                Create your first alert to be notified when auctions matching
                your criteria are listed.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Plus size={14} />
                Create First Alert
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active alerts */}
            {alerts.filter((a) => a.active).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-3">
                  Active
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alerts
                    .filter((a) => a.active)
                    .map((alert) => (
                      <AlertCard
                        key={alert.id}
                        alert={alert}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Paused alerts */}
            {alerts.filter((a) => !a.active).length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-3">
                  Paused
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alerts
                    .filter((a) => !a.active)
                    .map((alert) => (
                      <AlertCard
                        key={alert.id}
                        alert={alert}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Alert Form Modal */}
      {showForm && (
        <AlertFormModal
          initial={editingAlert || {}}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingAlert(null);
          }}
        />
      )}
    </div>
  );
}
