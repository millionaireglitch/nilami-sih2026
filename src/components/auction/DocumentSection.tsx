import React from "react";
import { FileText, Download, Eye, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/utils/cn";
import type { AuctionDocument } from "@/types";

interface DocumentSectionProps {
  documents: AuctionDocument[];
}

const DOC_TYPE_LABELS: Record<AuctionDocument["type"], string> = {
  auction_notice: "Auction Notice",
  terms: "Terms & Conditions",
  property_details: "Property Details",
  vehicle_details: "Vehicle Details",
  emd_info: "EMD Information",
  eligibility: "Eligibility Criteria",
  other: "Other Document",
};

const STATUS_CONFIG = {
  available: {
    icon: CheckCircle2,
    text: "Available",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  pending: { icon: Clock, text: "Pending", color: "text-amber-600", bg: "bg-amber-50" },
  missing: { icon: AlertCircle, text: "Not Available", color: "text-red-500", bg: "bg-red-50" },
};

export default function DocumentSection({ documents }: DocumentSectionProps) {
  if (documents.length === 0) {
    return (
      <div className="p-4 border border-dashed border-surface-border rounded-xl text-center">
        <FileText className="w-8 h-8 text-navy-300 mx-auto mb-2" />
        <p className="text-sm text-navy-500">No documents listed for this auction</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => {
        const sc = STATUS_CONFIG[doc.status];
        const StatusIcon = sc.icon;
        return (
          <div
            key={doc.id}
            className="flex items-center gap-3 p-3.5 border border-surface-border rounded-xl bg-white hover:bg-navy-50/50 transition-colors"
          >
            <div className="w-9 h-9 bg-navy-50 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-navy-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy-900">{doc.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-navy-500">{DOC_TYPE_LABELS[doc.type]}</span>
                {doc.sizeKB && (
                  <>
                    <span className="text-surface-border">·</span>
                    <span className="text-xs text-navy-400">{doc.sizeKB} KB</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  sc.color,
                  sc.bg
                )}
              >
                <StatusIcon className="w-3 h-3" />
                {sc.text}
              </span>
              {doc.status === "available" && doc.url && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-navy-400 hover:text-navy-700 hover:bg-navy-100 rounded transition-colors"
                  title="Download document"
                >
                  <Download className="w-4 h-4" />
                </a>
              )}
              {doc.status === "available" && !doc.url && (
                <button className="p-1.5 text-navy-400 hover:text-navy-700 hover:bg-navy-100 rounded transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
