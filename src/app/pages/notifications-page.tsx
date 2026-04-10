import { Header } from "../components/header";
import {
  Bell,
  ShoppingCart,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

export function NotificationsPage() {
  const { lang } = useLanguage();
  const notifications = [
    {
      id: 1,
      type: "success",
      icon: CheckCircle2,
      title: lang === 'ta' ? "கிடங்கு முன்பதிவு உறுதி செய்யப்பட்டது" : "Storage Booking Confirmed",
      message: lang === 'ta' ? "Green Valley Storage-ல் 2000 கிலோ கோதுமைக்கான உங்கள் முன்பதிவு உறுதி செய்யப்பட்டுள்ளது." : "Your booking at Green Valley Storage has been confirmed for 2000 kg of wheat.",
      time: lang === 'ta' ? "2 மணிநேரத்திற்கு முன்" : "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      icon: ShoppingCart,
      title: lang === 'ta' ? "புதிய கொள்முதல் சலுகை" : "New Purchase Offer",
      message: lang === 'ta' ? "'அனில் டிரேடர்ஸ்' 1500 கிலோ அரிசியை ₹65/கிலோ விலைக்கு வாங்க விரும்புகிறார்கள்." : "Buyer 'Anil Traders' wants to buy 1500 kg of your rice at ₹65/kg.",
      time: lang === 'ta' ? "5 மணிநேரத்திற்கு முன்" : "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      icon: AlertCircle,
      title: lang === 'ta' ? "சேமிப்பு நினைவூட்டல்" : "Storage Reminder",
      message: lang === 'ta' ? "Safe Harvest Godown-ல் உங்கள் முன்பதிவு 7 நாட்களில் முடிவடைகிறது." : "Your storage booking at Safe Harvest Godown expires in 7 days.",
      time: lang === 'ta' ? "1 நாளைக்கு முன்" : "1 day ago",
      read: false,
    },
    {
      id: 4,
      type: "success",
      icon: TrendingUp,
      title: lang === 'ta' ? "விலை எச்சரிக்கை" : "Price Alert",
      message: lang === 'ta' ? "அமிர்தசரஸ் சந்தையில் கோதுமை விலை ₹2,100/குவின்டலாக அதிகரித்துள்ளது (+5%)." : "Wheat price increased to ₹2,100/quintal in Amritsar market (+5%).",
      time: lang === 'ta' ? "1 நாளைக்கு முன்" : "1 day ago",
      read: true,
    },
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-accent/20 text-accent";
      case "warning":
        return "bg-chart-4/20 text-chart-4";
      case "info":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('notifications', lang)}</h1>
            <p className="text-muted-foreground">{t('stayUpdated', lang)}</p>
          </div>
          <button className="px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors">
            {t('markAllRead', lang)}
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg whitespace-nowrap">
            {t('all', lang)}
          </button>
          <button className="px-4 py-2 bg-card border border-border text-card-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
            {t('unread', lang)}
          </button>
          <button className="px-4 py-2 bg-card border border-border text-card-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
            {t('bookings', lang)}
          </button>
          <button className="px-4 py-2 bg-card border border-border text-card-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
            {t('sales', lang)}
          </button>
          <button className="px-4 py-2 bg-card border border-border text-card-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
            {t('priceAlerts', lang)}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow ${
                  !notification.read ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getIconColor(
                      notification.type
                    )}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-card-foreground">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-card border border-border text-card-foreground rounded-lg hover:bg-muted transition-colors">
            {t('loadMoreNotifications', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
