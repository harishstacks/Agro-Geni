import { Header } from "../components/header";
import { StatCard } from "../components/stat-card";
import { Warehouse, Users, TrendingUp, IndianRupee, CheckCircle2, Clock, X } from "lucide-react";

import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import { useState, useEffect } from "react";

import { getGodownImage } from "../data/cropImages";
import { getAccountSession } from "../lib/account-session";

export function GodownDashboard() {
  const { lang } = useLanguage();
  const accountSession = getAccountSession();
  const bookingRequests = [
    {
      id: 1,
      farmer: "Rajesh Kumar",
      crop: "Wheat",
      quantity: "2000 kg",
      duration: "3 months",
      requestDate: "15 Mar 2026",
      status: "pending",
    },
    {
      id: 2,
      farmer: "Lakshmi Devi",
      crop: "Rice",
      quantity: "1500 kg",
      duration: "2 months",
      requestDate: "14 Mar 2026",
      status: "pending",
    },
    {
      id: 3,
      farmer: "Suresh Patil",
      crop: "Cotton",
      quantity: "3000 kg",
      duration: "4 months",
      requestDate: "13 Mar 2026",
      status: "pending",
    },
  ];

  const [realBookings, setRealBookings] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("godownBookings");
    if (saved) {
      setRealBookings(JSON.parse(saved));
    }
  }, []);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    const updated = realBookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setRealBookings(updated);
    localStorage.setItem("godownBookings", JSON.stringify(updated));
  };

  const realPending = realBookings.filter(b => b.status === "Pending").map(b => ({
    id: b.id,
    farmer: "Registered Farmer", // Mock data fallback since we didn't collect farmer name
    crop: "Mixed Crops",
    quantity: "Standard",
    duration: "Flexible",
    requestDate: new Date(b.bookedAt || b.date).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: "pending",
    isReal: true,
  }));

  const realActive = realBookings.filter(b => b.status === "Confirmed").map(b => ({
    farmer: "Registered Farmer",
    crop: "Mixed Crops",
    quantity: "Standard",
    startDate: new Date(b.date).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    endDate: "Flexible",
    revenue: "To be calculated",
  }));

  const activeBookings = [
    {
      farmer: "Arjun Singh",
      crop: "Wheat",
      quantity: "2500 kg",
      startDate: "1 Mar 2026",
      endDate: "1 Jun 2026",
      revenue: "₹15,000",
    },
    {
      farmer: "Priya Sharma",
      crop: "Rice",
      quantity: "1800 kg",
      startDate: "5 Mar 2026",
      endDate: "5 May 2026",
      revenue: "₹10,800",
    },
  ];

  const combinedRequests = [...realPending, ...bookingRequests];
  const combinedActive = [...realActive, ...activeBookings];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {accountSession && accountSession.role === "godown_owner" && (
          <div className={`mb-6 rounded-2xl border p-4 ${accountSession.verificationStatus === "verified" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
            <p className="font-semibold text-foreground">
              {accountSession.verificationStatus === "verified" ? accountSession.verificationBatch : t('pleaseCompleteVerification', lang)}
            </p>
            <p className="text-sm text-muted-foreground">
              {accountSession.verificationStatus === "verified" ? t('trustedUserVisibility', lang) : t('limitedAccessMessage', lang)}
            </p>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('welcomeStorageOwner', lang)}</h1>
          <p className="text-muted-foreground">{t('manageStorageDesc', lang)}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('totalCapacity', lang)}
            value="5,000 tons"
            icon={Warehouse}
            iconColor="bg-primary"
            trend="100% capacity"
          />
          <StatCard
            title={t('currentlyOccupied', lang)}
            value="3,200 tons"
            icon={TrendingUp}
            iconColor="bg-accent"
            trend="64% utilization"
          />
          <StatCard
            title={t('activeBookingsCount', lang)}
            value="24"
            icon={Users}
            iconColor="bg-secondary"
            trend="From 18 farmers"
          />
          <StatCard
            title={t('monthlyRevenue', lang)}
            value="₹1.8L"
            icon={IndianRupee}
            iconColor="bg-chart-4"
            trend="+12% from last month"
          />
        </div>

        {/* Storage Management */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <h2 className="text-xl font-semibold text-card-foreground mb-6">
            {t('capacityManagement', lang)}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('capacityTons', lang)}</label>
              <input
                type="number"
                defaultValue="5000"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('availableTons', lang)}</label>
              <input
                type="number"
                defaultValue="1800"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('priceKgMonth', lang)}</label>
              <input
                type="number"
                defaultValue="2"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            {t('updateCapacity', lang)}
          </button>
        </div>

        {/* Booking Requests */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-card-foreground">{t('bookingRequests', lang)}</h2>
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
              {combinedRequests.length} {t('newRequests', lang)}
            </span>
          </div>
          <div className="space-y-4">
            {combinedRequests.map((request: any) => (
              <div
                key={request.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-card-foreground">{request.farmer}</p>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                      {t('newRequests', lang)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">{t('crops', lang)}</p>
                      <p className="text-card-foreground">{request.crop}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{t('quantity', lang)}</p>
                      <p className="text-card-foreground">{request.quantity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{t('estLife', lang)}</p>
                      <p className="text-card-foreground">{request.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{t('bookings', lang)}</p>
                      <p className="text-card-foreground">{request.requestDate}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => request.isReal ? handleUpdateStatus(request.id, "Confirmed") : alert("Sample data cannot be accepted.")}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {t('accept', lang)}
                  </button>
                  <button 
                    onClick={() => request.isReal ? handleUpdateStatus(request.id, "Declined") : alert("Sample data cannot be declined.")}
                    className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    {t('decline', lang)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Bookings */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <h2 className="text-xl font-semibold text-card-foreground mb-6">{t('activeBookingsCount', lang)}</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">{t('farmer', lang)}</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">{t('crops', lang)}</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">{t('quantity', lang)}</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">{t('bookings', lang)}</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">{t('help', lang)}</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">{t('revenue', lang)}</th>
                </tr>
              </thead>
              <tbody>
                {combinedActive.map((booking, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium text-card-foreground">{booking.farmer}</td>
                    <td className="py-4 px-4 text-muted-foreground">{booking.crop}</td>
                    <td className="py-4 px-4 text-muted-foreground">{booking.quantity}</td>
                    <td className="py-4 px-4 text-muted-foreground">{booking.startDate}</td>
                    <td className="py-4 px-4 text-muted-foreground">{booking.endDate}</td>
                    <td className="py-4 px-4 font-semibold text-primary">{booking.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={getGodownImage()} 
              alt="Warehouse" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">
              Warehouse Information
            </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Warehouse Name</label>
              <input
                type="text"
                defaultValue="Green Valley Storage"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Location</label>
              <input
                type="text"
                defaultValue="Amritsar, Punjab"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-muted-foreground mb-2">Address</label>
              <textarea
                rows={3}
                defaultValue="Industrial Area, Phase 2, Amritsar, Punjab - 143001"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-muted-foreground mb-2">Facilities & Features</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Climate Controlled",
                  "24/7 Security",
                  "Fire Safety",
                  "Pest Control",
                  "Loading Dock",
                  "Insurance Coverage",
                ].map((facility, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                    <span className="text-sm text-card-foreground">{facility}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Update Information
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
