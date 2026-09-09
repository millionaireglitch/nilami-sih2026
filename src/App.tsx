import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import { NilvaaProvider } from "./context/NilvaaContext";
import { CompareProvider } from "./context/CompareContext";
import Layout from "./components/layout/Layout";
import CompareBar from "./components/auction/CompareBar";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PropertyAuctions from "./pages/PropertyAuctions";
import VehicleAuctions from "./pages/VehicleAuctions";
import AuctionDetail from "./pages/AuctionDetail";
import CompareAuctions from "./pages/CompareAuctions";
import AuctionCalendar from "./pages/AuctionCalendar";
import HowItWorks from "./pages/HowItWorks";
import BeginnerGuide from "./pages/BeginnerGuide";
import SavedAuctions from "./pages/SavedAuctions";
import Alerts from "./pages/Alerts";
import UserDashboard from "./pages/UserDashboard";
import MyBids from "./pages/MyBids";
import Payments from "./pages/Payments";
import Documents from "./pages/Documents";
import OrgDashboard from "./pages/OrgDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import HelpFAQ from "./pages/HelpFAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NilvaaMembership from "./pages/NilvaaMembership";
import Categories from "./pages/Categories";
import Marketplace from "./pages/Marketplace";
import EarnBenefits from "./pages/EarnBenefits";

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <WatchlistProvider>
          <NilvaaProvider>
            <CompareProvider>
              <Layout>
                <Routes>
                  {/* Core */}
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/property-auctions" element={<PropertyAuctions />} />
                  <Route path="/vehicle-auctions" element={<VehicleAuctions />} />
                  <Route path="/auction/:id" element={<AuctionDetail />} />
                  <Route path="/compare" element={<CompareAuctions />} />
                  <Route path="/calendar" element={<AuctionCalendar />} />

                  {/* Information */}
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/beginner-guide" element={<BeginnerGuide />} />
                  <Route path="/help" element={<HelpFAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />

                  {/* User account */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/my-bids" element={<MyBids />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/saved" element={<SavedAuctions />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/profile" element={<Profile />} />

                  {/* Membership */}
                  <Route path="/membership" element={<NilvaaMembership />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/earn-benefits" element={<EarnBenefits />} />

                  {/* Organisation & Admin */}
                  <Route path="/org-dashboard" element={<OrgDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />

                  {/* Fallback */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </Layout>
              <CompareBar />
            </CompareProvider>
          </NilvaaProvider>
        </WatchlistProvider>
      </AuthProvider>
    </HashRouter>
  );
}
