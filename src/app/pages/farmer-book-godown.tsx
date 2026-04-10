import React, { useState, useEffect } from "react";
import { loadGodownsFromCSV } from '../data/loadGodowns';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Warehouse, MapPin, Calendar, CheckCircle2, BadgeCheck, ShieldAlert } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

import { getGodownImage } from "../data/cropImages";
import { getAccountSession } from "../lib/account-session";

export default function FarmerBookGodownPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ godown: "", date: "", location: "" });
  const [success, setSuccess] = useState(false);
  const [godowns, setGodowns] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const accountSession = getAccountSession();

  useEffect(() => {
    loadGodownsFromCSV().then(setGodowns);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking = {
      id: Date.now().toString(),
      godown: form.godown,
      date: form.date,
      location: form.location,
      status: "Pending",
      bookedAt: new Date().toISOString()
    };
    
    const existingBookingsStr = localStorage.getItem("godownBookings");
    const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
    
    localStorage.setItem("godownBookings", JSON.stringify([newBooking, ...existingBookings]));

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    setForm({ godown: "", date: "", location: "" });
  };

  return (
    <div className="min-h-screen bg-muted px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">{t('availableGodowns', lang)}</h2>
        {accountSession && accountSession.role === "farmer" && (
          <div className={`mb-8 rounded-2xl border p-4 ${accountSession.verificationStatus === "verified" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
            <div className="flex items-start gap-3">
              {accountSession.verificationStatus === "verified" ? (
                <BadgeCheck className="mt-0.5 w-5 h-5 text-emerald-600" />
              ) : (
                <ShieldAlert className="mt-0.5 w-5 h-5 text-amber-600" />
              )}
              <div>
                <p className="font-semibold text-foreground">
                  {accountSession.verificationStatus === "verified" ? accountSession.verificationBatch : t('pleaseCompleteVerification', lang)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {accountSession.verificationStatus === "verified" ? t('trustedUserVisibility', lang) : t('limitedAccessMessage', lang)}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {godowns.map((g, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md border p-4 flex flex-col">
              <div className="rounded-lg h-36 w-full overflow-hidden mb-4">
                <img 
                  src={getGodownImage()} 
                  alt="Godown"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {t('verifiedWarehouseBatch', lang)}
                </div>
                <h3 className="text-lg font-bold mb-1">{g.location}</h3>
                <p className="text-muted-foreground mb-1">{t('district', lang)}: {g.district}</p>
                <p className="text-sm mb-2">{t('capacity', lang)}: <span className="font-semibold text-primary">{g.capacity} tons</span></p>
                <p className="text-sm mb-4">{t('scheme', lang)}: <span className="font-semibold">{g.scheme}</span></p>
                <p className="text-sm mb-4">{t('year', lang)}: <span className="font-semibold">{g.year}</span></p>
              </div>
              <button
                disabled={accountSession?.verificationStatus !== "verified"}
                className="mt-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  setForm({ ...form, godown: g.location });
                  setOpen(true);
                }}
              >
                {t('bookNow', lang)}
              </button>
            </div>
          ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('bookGodown', lang)}</DialogTitle>
              <DialogDescription>{t('fillFormToBook', lang)}</DialogDescription>
            </DialogHeader>
            <form onSubmit={e => { handleSubmit(e); setOpen(false); }} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="relative group">
                  <Label htmlFor="godown" className="text-foreground">{t('godownName', lang)}</Label>
                  <Input
                    id="godown"
                    className="pl-10 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                    value={form.godown}
                    onChange={e => setForm({ ...form, godown: e.target.value })}
                    placeholder="e.g. Green Valley Storage"
                    autoComplete="off"
                    required
                  />
                  <Warehouse className="absolute left-3 top-9 text-primary/70 group-focus-within:text-primary transition-colors" size={20} />
                </div>
                <div className="relative group">
                  <Label htmlFor="date" className="text-foreground">{t('bookingDate', lang)}</Label>
                  <Input
                    id="date"
                    type="date"
                    className="pl-10 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    required
                  />
                  <Calendar className="absolute left-3 top-9 text-primary/70 group-focus-within:text-primary transition-colors" size={20} />
                </div>
                <div className="relative group">
                  <Label htmlFor="location" className="text-foreground">{t('location', lang)}</Label>
                  <Input
                    id="location"
                    className="pl-10 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Amritsar"
                    required
                  />
                  <MapPin className="absolute left-3 top-9 text-primary/70 group-focus-within:text-primary transition-colors" size={20} />
                </div>
              </div>
              <Button
                type="submit"
                disabled={accountSession?.verificationStatus !== "verified"}
                className="mt-2 py-3 text-lg font-bold bg-primary text-primary-foreground rounded-xl transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('bookGodown', lang)}
              </Button>
              {accountSession?.verificationStatus !== "verified" && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  {t('completeVerificationToGetYourBatch', lang)}
                </p>
              )}
              {success && (
                <div className="flex flex-col items-center justify-center mt-4">
                  <CheckCircle2 className="text-primary animate-bounce-in" size={40} />
                  <span className="text-primary font-semibold mt-2">{t('godownBookedSuccess', lang)}</span>
                </div>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
