import React, { useState, useEffect } from "react";
import { ShoppingBag, User2, Search, Package, MapPin, Phone, CreditCard, Clock } from "lucide-react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard-layout";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import { getCropImage } from "../data/cropImages";
import { CropCard } from "../components/crop-card";
import { isTrustedCropListing } from "../lib/account-session";

export function BuyerDashboard() {
  const { lang } = useLanguage();
  const location = useLocation();
  const [crops, setCrops] = useState<any[]>([]);
  const [tab, setTab] = useState<'crops' | 'orders'>(location.pathname === '/buyer-orders' ? 'orders' : 'crops');
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const staticCrops = [
    {
      cropName: t('wheat', lang),
      farmerName: "Harpreet Singh",
      location: `Ludhiana, ${t('punjab', lang)}`,
      quantity: "500 kg",
      price: "₹2,450/quintal",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    },
    {
      cropName: t('rice', lang),
      farmerName: "Deepak Kumar",
      location: `Karnal, ${t('haryana', lang)}`,
      quantity: "2000 kg",
      price: "₹6,800/quintal",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    },
    {
      cropName: t('tomatoes', lang),
      farmerName: "Sanjay Patil",
      location: `Nashik, ${t('maharashtra', lang)}`,
      quantity: "150 kg",
      price: "₹40/kg",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    },
    {
      cropName: t('onions', lang),
      farmerName: "Vijay Gavit",
      location: `Pune, ${t('maharashtra', lang)}`,
      quantity: "800 kg",
      price: "₹32/kg",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    }
  ];

  const orders = [
    {
      id: "ORD-9281",
      crop: t('wheat', lang),
      quantity: "1000 kg",
      price: "₹24,500",
      status: "Delivered",
      date: "12 Mar 2026",
      farmer: "Harpreet Singh"
    },
    {
      id: "ORD-8812",
      crop: t('rice', lang),
      quantity: "500 kg",
      price: "₹34,000",
      status: "In Transit",
      date: "25 Mar 2026",
      farmer: "Deepak Kumar"
    }
  ];

  const [localListedCrops, setLocalListedCrops] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("listedCrops");
    if (stored) {
      setLocalListedCrops(JSON.parse(stored));
    }
    setTab(location.pathname === '/buyer-orders' ? 'orders' : 'crops');
  }, [location.pathname]);

  const allCrops = [...localListedCrops, ...staticCrops];

  const filteredCrops = allCrops.filter((crop) => {
    if (!isTrustedCropListing(crop)) {
      return false;
    }
    const matchesSearch = search === "" || crop.cropName.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "" || crop.cropName.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout title={t('buyer', lang)}>
      {/* QUICK ACTION BUTTONS */}
      <section className="flex flex-col md:flex-row gap-4 mb-8">
        <button
          className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-lg font-bold shadow-md transition-all ${tab === 'crops' ? 'bg-primary text-white scale-[1.02]' : 'bg-white text-foreground border border-border hover:bg-muted'}`}
          onClick={() => setTab('crops')}
        >
          <ShoppingBag className="w-6 h-6" /> {t('availableCrops', lang)}
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-lg font-bold shadow-md transition-all ${tab === 'orders' ? 'bg-primary text-white scale-[1.02]' : 'bg-white text-foreground border border-border hover:bg-muted'}`}
          onClick={() => setTab('orders')}
        >
          <Package className="w-6 h-6" /> {t('myOrders', lang)}
        </button>
      </section>

      {tab === 'crops' ? (
        <>
          {/* SEARCH + FILTER BAR */}
          <section className="bg-white rounded-2xl shadow-sm border p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('searchCrops', lang)}
                className="w-full pl-12 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <select
                className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="">{t('allCrops', lang)}</option>
                <option value="wheat">{t('wheat', lang)}</option>
                <option value="rice">{t('rice', lang)}</option>
                <option value="tomato">{t('tomatoes', lang)}</option>
                <option value="onion">{t('onions', lang)}</option>
              </select>
            </div>
          </section>

          {/* CROP GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCrops.map((crop, idx) => (
              <CropCard
                key={idx}
                {...crop}
                image={getCropImage(crop.cropName)}
                verificationBatch={crop.verificationBatch}
                onBuy={() => alert(t('buyNow', lang))}
                onContact={() => alert(t('contact', lang))}
              />
            ))}
          </div>
        </>
      ) : (
        /* ORDERS LIST */
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-bold text-sm text-muted-foreground">{t('orderId', lang) || "Order ID"}</th>
                  <th className="px-6 py-4 font-bold text-sm text-muted-foreground">{t('crops', lang)}</th>
                  <th className="px-6 py-4 font-bold text-sm text-muted-foreground">{t('quantity', lang)}</th>
                  <th className="px-6 py-4 font-bold text-sm text-muted-foreground">{t('price', lang)}</th>
                  <th className="px-6 py-4 font-bold text-sm text-muted-foreground">{t('status', lang)}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <img src={getCropImage(order.crop)} alt={order.crop} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.crop}</p>
                          <p className="text-xs text-muted-foreground">{order.farmer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{order.quantity}</td>
                    <td className="px-6 py-4 font-bold text-primary">{order.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
