import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp,
  Package,
  Warehouse,
  IndianRupee,
  Upload,
  Camera,
  Cloud,
  Droplets,
  Wind,
  Sun,
  Languages,
  Mic,
  ClipboardList,
  BookOpen,
  Home,
  ShoppingBag,
  LogOut,
  User,
  Building2,
  PlusCircle,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { StatCard } from "../components/stat-card";
import { loadGodownsFromCSV } from '../data/loadGodowns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../components/ui/dialog";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

import { getCropImage } from "../data/cropImages";
import { clearAccountSession, getAccountSession } from "../lib/account-session";

export function FarmerDashboard() {
  const { lang } = useLanguage();
  const [active, setActive] = useState("My Bookings");
  const navigate = useNavigate();
  const [godowns, setGodowns] = useState<any[]>([]);
  const [spoilageData, setSpoilageData] = useState<Record<number, any>>({});
  const [crops, setCrops] = useState<any[]>([]);
  const [openIdx, setOpenIdx] = useState(-1);
  const accountSession = getAccountSession();

  useEffect(() => {
    loadGodownsFromCSV().then(setGodowns);
    
    // Load crops
    const staticCrops = [
      { crop: "Wheat", quantity: 1000, price: 22, location: "Amritsar, Punjab" },
      { crop: "Rice", quantity: 500, price: 28, location: "Ludhiana, Punjab" }
    ];
    const localStr = localStorage.getItem("listedCrops");
    const localCrops = localStr ? JSON.parse(localStr).map((c: any) => ({
      crop: c.cropName,
      quantity: parseInt(c.quantity) || 0,
      price: parseInt(c.price.replace(/\D/g, '')) || 0,
      location: c.location
    })) : [];
    
    const allCrops = [...localCrops, ...staticCrops];
    setCrops(allCrops);

    // Fetch AI Spoilage Data for each crop
    allCrops.forEach((c, idx) => {
      fetch('http://127.0.0.1:5000/api/ai/predict-spoilage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop_type: c.crop,
          harvest_date: new Date().toISOString().split('T')[0],
          temp: 30,
          humidity: 60
        })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setSpoilageData(prev => ({ ...prev, [idx]: data }));
        }
      })
      .catch(console.error);
    });
  }, []);


  const sidebarLinks = [
    { key: "bookings", label: "My Bookings", href: "/farmer/bookings", icon: ShoppingBag },
    { key: "sellCrops", label: "Sell Crops", href: "/farmer/sell-crops", icon: Package },
    { key: "bookGodown", label: "Book Godown", href: "/farmer/book-godown", icon: Building2 },
    { key: "home", label: "AI Insights", href: "/ai-insights", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-border shadow-sm h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <Home className="w-7 h-7 text-primary" />
          <span className="text-2xl font-bold text-foreground tracking-tight">AGRI GENIX</span>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => {
              clearAccountSession();
              navigate("/login");
            }}
          >
            <LogOut className="w-5 h-5" /> {t('logout', lang)}
          </button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-border flex flex-col py-8 px-0 min-h-[calc(100vh-4rem)] shadow-md">
          <nav className="flex flex-col gap-4 w-full px-4">
            {sidebarLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold transition-colors group
                   ${active === item.label ? "bg-primary/10 text-primary" : "text-foreground hover:bg-primary/10 hover:text-primary"}`}
                onClick={() => setActive(item.label)}
              >
                <item.icon className="w-6 h-6" />
                {t(item.key, lang)}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#f9fafb] p-6 md:p-10">
          {accountSession && accountSession.role === "farmer" && (
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
              {t('welcomeFarmer', lang)} <span className="inline-block align-middle text-2xl leading-none" style={{lineHeight:'1'}} role="img" aria-label="wave">👋</span>
            </h1>
            <p className="text-muted-foreground text-lg">{t('manageFarmerDesc', lang)}</p>
          </div>


          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="/farmer/book-godown" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition-colors">
              <Building2 className="w-6 h-6" /> {t('bookGodown', lang)}
            </a>
            <a href="/farmer/sell-crops" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition-colors">
              <PlusCircle className="w-6 h-6" /> {t('sellCrops', lang)}
            </a>
            <a href="/farmer/bookings" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition-colors">
              <ClipboardList className="w-6 h-6" /> {t('viewBookings', lang)}
            </a>
          </div>

          {/* Crops Listed Cards (styled like Book Godown) */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('listedCrops', lang)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((c, idx) => {
                const aiData = spoilageData[idx];
                const riskLevel = aiData?.risk_level || "Medium";
                const remainingDays = aiData?.remaining_days || "~10";

                return (
                  <React.Fragment key={idx}>
                    <div className="bg-white rounded-xl shadow-md border p-4 flex flex-col">
                      <div className="rounded-lg h-36 w-full overflow-hidden mb-4">
                        <img 
                          src={getCropImage(c.crop)} 
                          alt={c.crop}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {c.verificationBatch && (
                        <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                          {c.verificationBatch}
                        </span>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{c.crop}</h3>
                        <p className="text-muted-foreground mb-1">{t('location', lang)}: {c.location}</p>
                        <p className="text-sm mb-2">{t('quantity', lang)}: <span className="font-semibold text-primary">{c.quantity} kg</span></p>
                        <p className="text-sm mb-3">{t('price', lang)}: <span className="font-semibold">₹{c.price}/kg</span></p>
                        
                        {/* AI Spoilage Risk Badge */}
                        <div className={`flex items-center gap-2 mb-4 p-2 rounded-lg border ${riskLevel === 'High' ? 'bg-red-50 border-red-100' : riskLevel === 'Low' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                          <AlertTriangle className={`w-4 h-4 ${riskLevel === 'High' ? 'text-red-500' : riskLevel === 'Low' ? 'text-green-500' : 'text-orange-500'}`} />
                          <div className="text-[10px] leading-tight">
                            <p className="font-bold text-primary">{t('spoilageRisk', lang)}: <span className={riskLevel === 'High' ? 'text-red-600' : riskLevel === 'Low' ? 'text-green-600' : 'text-orange-600'}>{riskLevel}</span></p>
                            <p className="text-muted-foreground">{t('estLife', lang)}: <span className="font-bold">{remainingDays} {t('days', lang)}</span></p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="mt-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                        onClick={() => setOpenIdx(idx)}
                      >
                        {t('viewDetails', lang)}
                      </button>
                    </div>
                    <Dialog open={openIdx === idx} onOpenChange={open => setOpenIdx(open ? idx : -1)}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t('cropDetails', lang)}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-2">
                          <div><strong>{t('crops', lang)}:</strong> {c.crop}</div>
                          <div><strong>{t('location', lang)}:</strong> {c.location}</div>
                          <div><strong>{t('quantity', lang)}:</strong> {c.quantity} kg</div>
                          <div><strong>{t('price', lang)}:</strong> ₹{c.price}/kg</div>
                        </div>
                        <DialogClose asChild>
                          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">{t('close', lang)}</button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </React.Fragment>
                );
              })}
            </div>
          </div>


          {/* Empty State (if no godowns) */}
          {godowns.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <img src="https://www.svgrepo.com/show/331993/farmer.svg" alt="Farming" className="w-40 h-40 mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">{t('manageFarmerDesc', lang)}</h3>
              <p className="text-muted-foreground mb-4">{t('welcomeFarmer', lang)}</p>
              <a href="/farmer/book-godown" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">{t('bookStorage', lang)}</a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
