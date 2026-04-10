import React, { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import { Warehouse, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function FarmerBookingsPage() {
  const { lang } = useLanguage();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem("godownBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">{t('bookings', lang) || "My Bookings"}</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-12 text-center flex flex-col items-center">
          <Warehouse className="w-16 h-16 text-muted-foreground mb-4 opacity-30" />
          <p className="text-xl text-muted-foreground font-medium">
            {lang === 'ta' ? 'முன்பதிவுகள் எதுவும் இல்லை.' : 'No bookings found.'}
          </p>
          <a href="/farmer/book-godown" className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">
            {lang === 'ta' ? 'கிடங்கு முன்பதிவு' : 'Book Godown'}
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl border border-border shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Warehouse className="w-5 h-5" />
                  {booking.godown}
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> {booking.status}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-foreground">{new Date(booking.date).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-foreground">{booking.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
