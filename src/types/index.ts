// ─── Core Entity Types ──────────────────────────────────────────────────────

export type AuctionStatus = "live" | "upcoming" | "closed" | "extended" | "cancelled";
export type AuctionType = "residential" | "commercial" | "land" | "vehicle" | "industrial" | "equipment" | "other";
export type VerificationStatus = "verified" | "pending" | "incomplete";
export type OrgType = "bank" | "government" | "npa" | "court" | "private";
export type UserRole = "user" | "org_admin" | "admin";
export type BidStatus = "active" | "outbid" | "won" | "lost" | "pending";
export type DocType = "auction_notice" | "terms" | "property_details" | "vehicle_details" | "emd_info" | "eligibility" | "other";
export type DocStatus = "available" | "pending" | "missing";

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  type: OrgType;
  verified: boolean;
  logo?: string;
  website?: string;
}

export interface AuctionDocument {
  id: string;
  name: string;
  type: DocType;
  status: DocStatus;
  url?: string;
  uploadedAt?: string;
  sizeKB?: number;
}

export interface VerificationDetails {
  source: string;
  lastChecked: string;
  organization: string;
  documentStatus: string;
  notes: string;
  sourceUrl?: string;
}

export interface AuctionScore {
  documentation: number;
  information: number;
  location: number;
  readiness: number;
  overall: number;
}

export interface AssetDetails {
  // Property fields
  propertyType?: string;
  area?: number;
  areaUnit?: string;
  bhk?: number;
  floor?: number;
  totalFloors?: number;
  ageYears?: number;
  condition?: string;
  facing?: string;
  // Vehicle fields
  make?: string;
  model?: string;
  year?: number;
  registrationNumber?: string;
  mileageKm?: number;
  fuelType?: string;
  color?: string;
  // Common
  possession?: string;
  encumbrances?: string;
  surveyNumber?: string;
  municipalNo?: string;
}

export interface ContactInfo {
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  branch?: string;
  officeAddress?: string;
}

export interface AuctionLocation {
  address: string;
  city: string;
  state: string;
  pincode?: string;
  district?: string;
}

export interface Auction {
  id: string;
  auctionRefId: string;
  title: string;
  type: AuctionType;
  status: AuctionStatus;
  reservePrice: number;
  emdAmount: number;
  bidIncrement: number;
  currentBid?: number;
  auctionStartDate: string;
  auctionEndDate: string;
  possessionDate?: string;
  location: AuctionLocation;
  organization: Organization;
  images: string[];
  documents: AuctionDocument[];
  description: string;
  eligibility: string;
  termsAndConditions: string;
  verificationStatus: VerificationStatus;
  verificationDetails?: VerificationDetails;
  score?: AuctionScore;
  tags: string[];
  views: number;
  savedCount: number;
  assetDetails: AssetDetails;
  contactInfo?: ContactInfo;
  createdAt: string;
  updatedAt: string;
  bankBranch?: string;
  loanAccountRef?: string;
  category: string;
}

// ─── User & Auth Types ───────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  membership: "free" | "premium";
  verified: boolean;
  kycStatus: "pending" | "approved" | "rejected" | "not_started";
  savedAuctions: string[];
  compareList: string[];
  createdAt: string;
}

// ─── Bid & Activity Types ────────────────────────────────────────────────────

export interface Bid {
  id: string;
  auctionId: string;
  auctionTitle: string;
  auctionImage: string;
  amount: number;
  status: BidStatus;
  bidTime: string;
  bidRef: string;
  location: string;
  reservePrice: number;
  auctionEndDate: string;
}

export interface Payment {
  id: string;
  type: "emd" | "balance" | "subscription" | "refund";
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  date: string;
  description: string;
  txnRef: string;
  auctionId?: string;
  auctionTitle?: string;
  method?: string;
}

export interface Alert {
  id: string;
  name: string;
  types: AuctionType[];
  states: string[];
  city: string;
  priceMin: number | null;
  priceMax: number | null;
  organization: string;
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
  matchCount: number;
  frequency: "instant" | "daily" | "weekly";
}

// ─── Filter & Sort Types ─────────────────────────────────────────────────────

export interface FilterState {
  search: string;
  types: AuctionType[];
  states: string[];
  city: string;
  priceMin: number | "";
  priceMax: number | "";
  dateFrom: string;
  dateTo: string;
  organization: string;
  statuses: AuctionStatus[];
  verificationStatus: string;
  sortBy: string;
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  types: [],
  states: [],
  city: "",
  priceMin: "",
  priceMax: "",
  dateFrom: "",
  dateTo: "",
  organization: "",
  statuses: [],
  verificationStatus: "",
  sortBy: "ending_soon",
};

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export interface DashboardStats {
  savedAuctions: number;
  activeBids: number;
  wonAuctions: number;
  pendingPayments: number;
  totalBidAmount: number;
  documentsUploaded: number;
}
