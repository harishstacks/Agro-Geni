import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { CropCard } from "../components/crop-card";
import { Search } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

import { getCropImage } from "../data/cropImages";
import { isTrustedCropListing } from "../lib/account-session";

interface Crop {
  image: string;
  cropName: string;
  farmerName: string;
  location: string;
  quantity: string;
  price: string;
  verificationBatch?: string | null;
  isVerifiedSeller?: boolean;
}

export function MarketplacePage() {
  const { lang } = useLanguage();

  const staticCrops: Crop[] = [
    {
      image: getCropImage("wheat"),
      cropName: t('wheat', lang),
      farmerName: "Harpreet Singh",
      location: `Ludhiana, ${t('punjab', lang)}`,
      quantity: "500 kg",
      price: "₹2,450/quintal",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    },
    {
      image: getCropImage("rice"),
      cropName: t('rice', lang),
      farmerName: "Deepak Kumar",
      location: `Karnal, ${t('haryana', lang)}`,
      quantity: "2000 kg",
      price: "₹6,800/quintal",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    },
    {
      image: getCropImage("tomato"),
      cropName: t('vegetables', lang) + " (Tomato)",
      farmerName: "Sanjay Patil",
      location: `Nashik, ${t('maharashtra', lang)}`,
      quantity: "150 kg",
      price: "₹40/kg",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    },
    {
      image: getCropImage("potato"),
      cropName: t('vegetables', lang) + " (Potato)",
      farmerName: "Rajendra Prasad",
      location: `Agra, ${t('up', lang)}`,
      quantity: "1000 kg",
      price: "₹18/kg",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    },
    {
      image: getCropImage("onion"),
      cropName: t('vegetables', lang) + " (Onion)",
      farmerName: "Vijay Gavit",
      location: `Pune, ${t('maharashtra', lang)}`,
      quantity: "800 kg",
      price: "₹32/kg",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    },
    {
      image: getCropImage("vegetables"),
      cropName: t('vegetables', lang) + " (Carrot)",
      farmerName: "Anil Sharma",
      location: `Shimla, Himachal Pradesh`,
      quantity: "300 kg",
      price: "₹45/kg",
      verificationBatch: "Verified Farmer Batch",
      isVerifiedSeller: true,
    }
  ];

  const [localListedCrops, setLocalListedCrops] = useState<Crop[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("listedCrops");
    if (stored) {
      setLocalListedCrops(JSON.parse(stored));
    }
  }, []);

  const crops = [...localListedCrops, ...staticCrops].filter((crop) => isTrustedCropListing(crop));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('cropMarketplace', lang)}</h1>
          <p className="text-muted-foreground">
            {t('buyQualityCropsDirectly', lang)}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('searchCropsFarmersLocations', lang)}
                className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <select className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>{t('allCrops', lang)}</option>
              <option>{t('wheat', lang)}</option>
              <option>{t('rice', lang)}</option>
              <option>{t('vegetables', lang)}</option>
              <option>{t('cotton', lang)}</option>
              <option>{t('corn', lang)}</option>
              <option>{t('sugarcane', lang)}</option>
            </select>
            <select className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>{t('allStates', lang)}</option>
              <option>{t('punjab', lang)}</option>
              <option>{t('haryana', lang)}</option>
              <option>{t('maharashtra', lang)}</option>
              <option>{t('karnataka', lang)}</option>
              <option>{t('up', lang)}</option>
            </select>
            <select className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>{t('anyPriceRange', lang)}</option>
              <option>Below ₹50/kg</option>
              <option>₹50 - ₹100/kg</option>
              <option>Above ₹100/kg</option>
            </select>
            <select className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>{t('sortByLatest', lang)}</option>
              <option>{t('priceLowToHigh', lang)}</option>
              <option>{t('priceHighToLow', lang)}</option>
              <option>{t('quantityHighToLow', lang)}</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {t('showing', lang)} <span className="font-semibold text-foreground">{crops.length}</span> {t('cropsCount', lang)}
          </p>
        </div>

        {/* Crop Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crops.map((crop, index) => (
            <CropCard
              key={index}
              {...crop}
              onContact={() => alert(`Contacting ${crop.farmerName}`)}
              onBuy={() => alert(`Buying ${crop.cropName}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
