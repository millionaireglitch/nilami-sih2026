import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Building2,
  Phone,
  Mail,
  AlertTriangle,
  Info,
  ArrowLeft,
  Share2,
  Bookmark,
  Eye,
  Hash,
  TrendingUp,
  FileText,
  CheckCircle,
  Clock,
  Scale,
  HelpCircle,
  GitCompare,
} from "lucide-react";
import { MOCK_AUCTIONS } from "@/data/mockData";
import AuctionTimer from "@/components/auction/AuctionTimer";
import VerificationBadge from "@/components/auction/VerificationBadge";
import ScoreCard from "@/components/auction/ScoreCard";
import DocumentSection from "@/components/auction/DocumentSection";
import CompareBar from "@/components/auction/CompareBar";
import AuctionCard from "@/components/auction/AuctionCard";
import { formatINR, formatDate, formatDateTime, getTypeLabel, getStatusLabel } from "@/utils/format";
import { useWatchlist } from "@/context/WatchlistContext";
import { useCompare } from "@/context/CompareContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";

function AccordionItem({
  title,
  children,
  defaultOpen = false,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-surface-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-surface-bg transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-navy-400">{icon}</span>}
          <span className="font-semibold text-navy-800 text-sm">{title}</span>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-navy-400 flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-navy-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 py-4 bg-white border-t border-surface-border text-sm text-navy-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  if (value == null || value === "") return null;
  return (
    <div className="flex justify-between items-start gap-4 py-3 border-b border-surface-border last:border-0">
      <span className="text-navy-500 text-sm flex-shrink-0 w-40">{label}</span>
      <span className="text-navy-800 text-sm font-medium text-right">{value}</span>
    </div>
  );
}

export default function AuctionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useWatchlist();
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useCompare();
  const { user } = useAuth();

  const auction = MOCK_AUCTIONS.find((a) => a.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [shareMsg, setShareMsg] = useState("");

  if (!auction) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-surface-card border border-surface-border flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-navy-900 mb-2">
            Auction Not Found
          </h2>
          <p className="text-navy-500 text-sm mb-6">
            The auction you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/explore"
            className="btn btn-primary"
          >
            Browse All Auctions
          </Link>
        </div>
      </div>
    );
  }

  const saved = isSaved(auction.id);
  const inCompare = isInCompare(auction.id);
  const relatedAuctions = MOCK_AUCTIONS.filter(
    (a) => a.id !== auction.id && (a.type === auction.type || a.location.state === auction.location.state)
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 2000);
    }
  };

  const isLive = auction.status === "live" || auction.status === "extended";
  const isUpcoming = auction.status === "upcoming";

  return (
    <div className="bg-surface-bg min-h-screen pb-24 lg:pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-surface-border">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-navy-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-navy-700 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link to="/explore" className="hover:text-navy-700 transition-colors">
              Auctions
            </Link>
            <ChevronRight size={12} />
            <span className="text-navy-600 truncate max-w-[200px] lg:max-w-none">
              {auction.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        {/* Back button + action row */}
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-navy-500 hover:text-navy-800 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-surface-border rounded-lg bg-white text-sm text-navy-600 hover:bg-surface-bg transition-colors"
            >
              <Share2 size={14} />
              {shareMsg || "Share"}
            </button>
            <button
              onClick={() => toggleSave(auction.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm transition-colors",
                saved
                  ? "bg-navy-900 text-white border-navy-900"
                  : "border-surface-border bg-white text-navy-600 hover:bg-surface-bg"
              )}
            >
              <Bookmark size={14} className={saved ? "fill-white" : ""} />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={() =>
                inCompare ? removeFromCompare(auction.id) : addToCompare(auction.id)
              }
              disabled={!inCompare && !canAddMore}
              className={cn(
                "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm transition-colors",
                inCompare
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : canAddMore
                  ? "border-surface-border bg-white text-navy-600 hover:bg-surface-bg"
                  : "border-surface-border bg-surface-bg text-navy-400 cursor-not-allowed"
              )}
            >
              <GitCompare size={14} />
              {inCompare ? "In Compare" : "Compare"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl border border-surface-border overflow-hidden shadow-card">
              <div className="relative aspect-[16/9] bg-surface-bg">
                <img
                  src={auction.images[selectedImageIndex] || auction.images[0]}
                  alt={auction.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={cn(
                      "badge",
                      auction.status === "live"
                        ? "badge-live"
                        : auction.status === "upcoming"
                        ? "badge-upcoming"
                        : auction.status === "extended"
                        ? "badge-extended"
                        : "badge-closed"
                    )}
                  >
                    {auction.status === "live" && (
                      <span className="pulse-dot mr-1.5" />
                    )}
                    {getStatusLabel(auction.status)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <VerificationBadge status={auction.verificationStatus} />
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                  <Eye size={12} />
                  {auction.views.toLocaleString("en-IN")} views
                </div>
              </div>
              {auction.images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {auction.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                        selectedImageIndex === i
                          ? "border-navy-700 ring-1 ring-navy-700"
                          : "border-surface-border hover:border-navy-300"
                      )}
                    >
                      <img
                        src={img}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & org */}
            <div className="bg-white rounded-xl border border-surface-border p-5 shadow-card">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="badge bg-navy-50 text-navy-700 border-navy-200">
                      {getTypeLabel(auction.type)}
                    </span>
                    {auction.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="badge bg-surface-muted text-navy-600 border-surface-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-xl lg:text-2xl font-bold text-navy-900 leading-snug">
                    {auction.title}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-navy-400" />
                  {auction.location.address}, {auction.location.city},{" "}
                  {auction.location.state}
                  {auction.location.pincode && ` – ${auction.location.pincode}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-navy-400" />
                  {auction.organization.name}
                  {auction.organization.verified && (
                    <CheckCircle size={12} className="text-emerald-500 inline" />
                  )}
                </span>
                <span className="flex items-center gap-1.5">
                  <Hash size={14} className="text-navy-400" />
                  Ref: {auction.auctionRefId}
                </span>
              </div>

              <p className="text-navy-600 text-sm leading-relaxed">
                {auction.description}
              </p>
            </div>

            {/* Asset Details */}
            <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
              <div className="px-5 py-4 border-b border-surface-border">
                <h2 className="font-semibold text-navy-800">Asset Details</h2>
              </div>
              <div className="px-5 py-2">
                {auction.assetDetails.propertyType && (
                  <DetailRow label="Property Type" value={auction.assetDetails.propertyType} />
                )}
                {auction.assetDetails.area && (
                  <DetailRow
                    label="Area"
                    value={`${auction.assetDetails.area.toLocaleString("en-IN")} ${auction.assetDetails.areaUnit || "sq.ft."}`}
                  />
                )}
                {auction.assetDetails.bhk && (
                  <DetailRow label="Configuration" value={`${auction.assetDetails.bhk} BHK`} />
                )}
                {auction.assetDetails.floor != null && (
                  <DetailRow
                    label="Floor"
                    value={
                      auction.assetDetails.totalFloors
                        ? `${auction.assetDetails.floor} of ${auction.assetDetails.totalFloors}`
                        : `${auction.assetDetails.floor}`
                    }
                  />
                )}
                {auction.assetDetails.ageYears && (
                  <DetailRow label="Age" value={`${auction.assetDetails.ageYears} years`} />
                )}
                {auction.assetDetails.condition && (
                  <DetailRow label="Condition" value={auction.assetDetails.condition} />
                )}
                {auction.assetDetails.facing && (
                  <DetailRow label="Facing" value={auction.assetDetails.facing} />
                )}
                {auction.assetDetails.make && (
                  <DetailRow label="Make" value={auction.assetDetails.make} />
                )}
                {auction.assetDetails.model && (
                  <DetailRow label="Model" value={auction.assetDetails.model} />
                )}
                {auction.assetDetails.year && (
                  <DetailRow label="Year" value={`${auction.assetDetails.year}`} />
                )}
                {auction.assetDetails.registrationNumber && (
                  <DetailRow label="Registration" value={auction.assetDetails.registrationNumber} />
                )}
                {auction.assetDetails.mileageKm && (
                  <DetailRow
                    label="Mileage"
                    value={`${auction.assetDetails.mileageKm.toLocaleString("en-IN")} km`}
                  />
                )}
                {auction.assetDetails.fuelType && (
                  <DetailRow label="Fuel Type" value={auction.assetDetails.fuelType} />
                )}
                {auction.assetDetails.possession && (
                  <DetailRow label="Possession" value={auction.assetDetails.possession} />
                )}
                {auction.assetDetails.encumbrances && (
                  <DetailRow label="Encumbrances" value={auction.assetDetails.encumbrances} />
                )}
                {auction.assetDetails.surveyNumber && (
                  <DetailRow label="Survey No." value={auction.assetDetails.surveyNumber} />
                )}
                {auction.loanAccountRef && (
                  <DetailRow label="Loan Account Ref" value={auction.loanAccountRef} />
                )}
              </div>
            </div>

            {/* Understand This Auction */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={16} className="text-saffron-500" />
                <h2 className="font-semibold text-navy-800">
                  Understand This Auction
                </h2>
                <span className="badge bg-saffron-50 text-saffron-700 border-saffron-200 text-[10px]">
                  Beginner Friendly
                </span>
              </div>
              <div className="space-y-2">
                <AccordionItem
                  title="What is the Reserve Price?"
                  defaultOpen={true}
                  icon={<TrendingUp size={15} />}
                >
                  <p className="mb-2">
                    The <strong>Reserve Price</strong> of{" "}
                    <strong className="text-navy-900">
                      {formatINR(auction.reservePrice)}
                    </strong>{" "}
                    is the minimum amount the auctioneer will accept. Bids below this
                    amount will not be considered. Your opening bid must meet or exceed
                    this value.
                  </p>
                  <p className="text-navy-500 text-xs">
                    Note: The reserve price is set by the bank or organisation, typically
                    based on a registered valuer's report.
                  </p>
                </AccordionItem>

                <AccordionItem
                  title="What is the EMD (Earnest Money Deposit)?"
                  icon={<Scale size={15} />}
                >
                  <p className="mb-2">
                    The <strong>EMD of {formatINR(auction.emdAmount)}</strong> is a
                    security deposit you must pay before you can participate in this
                    auction. Think of it as a "seriousness fee."
                  </p>
                  <ul className="text-xs text-navy-500 space-y-1.5 list-disc list-inside">
                    <li>
                      If you <strong>win</strong>, the EMD is adjusted against the final
                      payment amount.
                    </li>
                    <li>
                      If you <strong>do not win</strong>, the EMD is fully refunded
                      (typically within 7–14 working days).
                    </li>
                    <li>
                      If you win and <strong>fail to pay</strong> the balance, your EMD
                      may be forfeited.
                    </li>
                  </ul>
                </AccordionItem>

                <AccordionItem
                  title="How does the bidding process work?"
                  icon={<TrendingUp size={15} />}
                >
                  <ol className="text-xs text-navy-600 space-y-2 list-decimal list-inside">
                    <li>
                      Register on this platform and complete your KYC (identity
                      verification).
                    </li>
                    <li>
                      Pay the EMD of{" "}
                      <strong>{formatINR(auction.emdAmount)}</strong> via NEFT/RTGS
                      to the bank account specified in the auction notice.
                    </li>
                    <li>
                      Submit a bid equal to or higher than the reserve price (
                      {formatINR(auction.reservePrice)}).
                    </li>
                    <li>
                      The minimum bid increment is{" "}
                      <strong>{formatINR(auction.bidIncrement)}</strong> — each new bid
                      must be at least this much higher than the current highest bid.
                    </li>
                    <li>
                      The highest bidder at the auction close is declared the winner,
                      subject to confirmation by the auctioning organisation.
                    </li>
                  </ol>
                </AccordionItem>

                <AccordionItem
                  title="What happens after winning?"
                  icon={<CheckCircle size={15} />}
                >
                  <p className="mb-2">
                    If you are declared the highest bidder:
                  </p>
                  <ol className="text-xs text-navy-600 space-y-1.5 list-decimal list-inside">
                    <li>
                      You will receive a <strong>Sale Confirmation Letter</strong> from
                      the auctioning organisation.
                    </li>
                    <li>
                      You must pay the balance amount (total bid minus EMD) within the
                      stipulated time (typically 15 days for immovable property, as per
                      SARFAESI rules).
                    </li>
                    <li>
                      A <strong>Sale Certificate</strong> will be issued upon full
                      payment.
                    </li>
                    <li>
                      You are responsible for all registration charges, stamp duty, and
                      legal fees.
                    </li>
                  </ol>
                  <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
                    Always conduct independent legal due diligence before bidding.
                    Nilami does not guarantee title, possession, or legal status of
                    properties.
                  </p>
                </AccordionItem>
              </div>
            </div>

            {/* Auction Score */}
            {auction.score && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-semibold text-navy-800">Auction Scorecard</h2>
                  <span
                    className="inline-flex items-center gap-1 text-xs text-navy-400 cursor-help"
                    title="Score is calculated based on documentation quality, information completeness, location data, and auction readiness. Not an investment advice."
                  >
                    <Info size={13} />
                    Rule-based, not AI
                  </span>
                </div>
                <ScoreCard score={auction.score} />
              </div>
            )}

            {/* Documents */}
            <div>
              <h2 className="font-semibold text-navy-800 mb-3">
                Auction Documents
              </h2>
              <DocumentSection documents={auction.documents} />
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
              <div className="px-5 py-4 border-b border-surface-border">
                <h2 className="font-semibold text-navy-800">Eligibility Criteria</h2>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-navy-600 leading-relaxed whitespace-pre-line">
                  {auction.eligibility}
                </p>
              </div>
            </div>

            {/* Terms & Conditions */}
            <AccordionItem
              title="Terms & Conditions"
              icon={<FileText size={15} />}
            >
              <p className="whitespace-pre-line leading-relaxed">
                {auction.termsAndConditions}
              </p>
            </AccordionItem>

            {/* Contact Info */}
            {auction.contactInfo && (
              <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
                <div className="px-5 py-4 border-b border-surface-border">
                  <h2 className="font-semibold text-navy-800">Contact Information</h2>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div>
                    <p className="font-semibold text-navy-800 text-sm">
                      {auction.contactInfo.name}
                    </p>
                    <p className="text-navy-500 text-xs">
                      {auction.contactInfo.designation}
                    </p>
                    {auction.contactInfo.branch && (
                      <p className="text-navy-500 text-xs">
                        {auction.contactInfo.branch}
                      </p>
                    )}
                  </div>
                  {auction.contactInfo.phone && (
                    <a
                      href={`tel:${auction.contactInfo.phone}`}
                      className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-900 transition-colors"
                    >
                      <Phone size={14} className="text-navy-400" />
                      {auction.contactInfo.phone}
                    </a>
                  )}
                  {auction.contactInfo.email && (
                    <a
                      href={`mailto:${auction.contactInfo.email}`}
                      className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-900 transition-colors"
                    >
                      <Mail size={14} className="text-navy-400" />
                      {auction.contactInfo.email}
                    </a>
                  )}
                  {auction.contactInfo.officeAddress && (
                    <p className="text-xs text-navy-500 leading-relaxed">
                      {auction.contactInfo.officeAddress}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-600 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-1">
                    Important Disclaimer
                  </p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Nilami aggregates auction information from official bank and government
                    sources for informational purposes only. We do not conduct, facilitate,
                    or guarantee any auction. All bids must be submitted directly through
                    the auctioning organisation's official portal. Verify all details
                    independently before participating. This is not investment advice.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Auctions */}
            {relatedAuctions.length > 0 && (
              <div>
                <h2 className="font-semibold text-navy-800 mb-4">
                  Similar Auctions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedAuctions.map((a) => (
                    <AuctionCard key={a.id} auction={a} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar — sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Price Card */}
              <div className="bg-white rounded-xl border border-surface-border shadow-panel p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-navy-400 uppercase tracking-wide font-medium">
                    Reserve Price
                  </span>
                  <VerificationBadge
                    status={auction.verificationStatus}
                    mini
                  />
                </div>
                <div className="price-display text-2xl lg:text-3xl text-navy-900 mb-1">
                  {formatINR(auction.reservePrice)}
                </div>
                {auction.currentBid && (
                  <p className="text-sm text-emerald-600 font-medium mb-3">
                    Current Bid: {formatINR(auction.currentBid)}
                  </p>
                )}

                <div className="space-y-2.5 py-4 border-y border-surface-border mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">EMD Required</span>
                    <span className="font-semibold text-navy-800">
                      {formatINR(auction.emdAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Bid Increment</span>
                    <span className="font-semibold text-navy-800">
                      {formatINR(auction.bidIncrement)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Auction Date</span>
                    <span className="font-semibold text-navy-800">
                      {formatDate(auction.auctionStartDate)}
                    </span>
                  </div>
                  {auction.possessionDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-500">Possession</span>
                      <span className="font-semibold text-navy-800">
                        {formatDate(auction.possessionDate)}
                      </span>
                    </div>
                  )}
                </div>

                <AuctionTimer
                  endDate={auction.auctionEndDate}
                  status={auction.status}
                />

                <div className="mt-4 space-y-2">
                  {isLive ? (
                    <Link
                      to="/login"
                      className="btn btn-cta w-full text-center block py-3"
                    >
                      Bid Now
                    </Link>
                  ) : isUpcoming ? (
                    <Link
                      to="/login"
                      className="btn btn-primary w-full text-center block py-3"
                    >
                      Register to Bid
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="btn w-full py-3 bg-surface-muted text-navy-400 cursor-not-allowed border border-surface-border"
                    >
                      Auction Closed
                    </button>
                  )}
                  <button
                    onClick={() => toggleSave(auction.id)}
                    className={cn(
                      "w-full py-2.5 border rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2",
                      saved
                        ? "bg-navy-50 text-navy-800 border-navy-200"
                        : "bg-white text-navy-600 border-surface-border hover:bg-surface-bg"
                    )}
                  >
                    <Bookmark size={14} className={saved ? "fill-navy-800" : ""} />
                    {saved ? "Saved to Watchlist" : "Save to Watchlist"}
                  </button>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-white rounded-xl border border-surface-border shadow-card p-5">
                <h3 className="text-sm font-semibold text-navy-800 mb-3">
                  Auction Details
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 size={14} className="text-navy-400 flex-shrink-0" />
                    <span className="text-navy-600">{auction.organization.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-navy-400 flex-shrink-0" />
                    <span className="text-navy-600">
                      {auction.location.city}, {auction.location.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-navy-400 flex-shrink-0" />
                    <span className="text-navy-600">
                      Starts: {formatDateTime(auction.auctionStartDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-navy-400 flex-shrink-0" />
                    <span className="text-navy-600">
                      Ends: {formatDateTime(auction.auctionEndDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Hash size={14} className="text-navy-400 flex-shrink-0" />
                    <span className="text-navy-600 font-mono text-xs">
                      {auction.auctionRefId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help CTA */}
              <div className="bg-navy-50 border border-navy-200 rounded-xl p-4">
                <p className="text-sm font-medium text-navy-800 mb-1">
                  First time bidding?
                </p>
                <p className="text-xs text-navy-500 mb-3">
                  Read our step-by-step guide to understand the full process.
                </p>
                <Link
                  to="/beginner-guide"
                  className="text-sm font-semibold text-navy-700 hover:text-navy-900 underline underline-offset-2"
                >
                  Beginner's Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CompareBar />
    </div>
  );
}
