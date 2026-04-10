import { Header } from "../components/header";
import { User, MapPin, Phone, Mail, Edit2, Save, BadgeCheck, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import { completeVerification, getAccountSession, saveAccountSession } from "../lib/account-session";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [accountSession, setAccountSession] = useState(getAccountSession());
  const { lang } = useLanguage();

  useEffect(() => {
    setAccountSession(getAccountSession());
  }, []);

  const handleCompleteVerification = () => {
    if (!accountSession) {
      return;
    }

    const verifiedSession = completeVerification(accountSession);
    saveAccountSession(verifiedSession);
    setAccountSession(verifiedSession);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('profile', lang)}</h1>
            <p className="text-muted-foreground">{t('manageYourAccount', lang) || "Manage your account information"}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5" />
                {t('saveChanges', lang) || "Save Changes"}
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" />
                {t('editProfile', lang) || "Edit Profile"}
              </>
            )}
          </button>
        </div>

          {accountSession && accountSession.role !== "buyer" && (
            <div className={`mb-6 rounded-2xl border p-5 ${accountSession.verificationStatus === "verified" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  {accountSession.verificationStatus === "verified" ? (
                    <BadgeCheck className="mt-0.5 w-6 h-6 text-emerald-600" />
                  ) : (
                    <ShieldAlert className="mt-0.5 w-6 h-6 text-amber-600" />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">
                      {accountSession.verificationStatus === "verified" ? accountSession.verificationBatch : t('pleaseCompleteVerification', lang)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {accountSession.verificationStatus === "verified"
                        ? t('trustedUserVisibility', lang)
                        : t('limitedAccessMessage', lang)}
                    </p>
                  </div>
                </div>
                {accountSession.verificationStatus !== "verified" && (
                  <button
                    onClick={handleCompleteVerification}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {t('completeVerification', lang)}
                  </button>
                )}
              </div>
            </div>
          )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-card-foreground mb-1">Rajesh Kumar</h2>
              <p className="text-muted-foreground mb-4">{t('farmer', lang)}</p>
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Amritsar, Punjab</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">rajesh@example.com</span>
                </div>
              </div>
              <div className="pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-semibold text-primary">24</p>
                    <p className="text-xs text-muted-foreground">{t('cropsSold', lang) || "Crops Sold"}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-accent">4.8</p>
                    <p className="text-xs text-muted-foreground">{t('rating', lang) || "Rating"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-6">
                {t('personalInfo', lang)}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('fullName', lang)}</label>
                  <input
                    type="text"
                    defaultValue="Rajesh Kumar"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('phoneNumber', lang)}</label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('emailAddress', lang)}</label>
                  <input
                    type="email"
                    defaultValue="rajesh@example.com"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('dob', lang) || "Date of Birth"}</label>
                  <input
                    type="date"
                    defaultValue="1985-05-15"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Farm Information */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-6">
                {t('farmInfo', lang) || "Farm Information"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('farmName', lang) || "Farm Name"}</label>
                  <input
                    type="text"
                    defaultValue="Green Fields Farm"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('farmSize', lang) || "Farm Size (acres)"}</label>
                  <input
                    type="number"
                    defaultValue="25"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('state', lang) || "State"}</label>
                  <select
                    defaultValue="Punjab"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option>Punjab</option>
                    <option>Haryana</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('district', lang) || "District"}</label>
                  <input
                    type="text"
                    defaultValue="Amritsar"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-2">{t('fullAddress', lang) || "Full Address"}</label>
                  <textarea
                    rows={3}
                    defaultValue="Village Majitha, Near GT Road, Amritsar, Punjab - 143601"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-2">
                    {t('primaryCrops', lang) || "Primary Crops"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Wheat", "Rice", "Cotton", "Vegetables"].map((crop, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {crop}
                      </span>
                    ))}
                    {isEditing && (
                      <button className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-muted/70">
                        + {t('addCrop', lang) || "Add Crop"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-6">
                {t('paymentDetails', lang) || "Payment Details"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('bankName', lang) || "Bank Name"}</label>
                  <input
                    type="text"
                    defaultValue="Punjab National Bank"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('accountNumber', lang) || "Account Number"}</label>
                  <input
                    type="text"
                    defaultValue="XXXX XXXX 1234"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('ifscCode', lang) || "IFSC Code"}</label>
                  <input
                    type="text"
                    defaultValue="PUNB0123400"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t('upiId', lang) || "UPI ID"}</label>
                  <input
                    type="text"
                    defaultValue="rajesh@paytm"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
