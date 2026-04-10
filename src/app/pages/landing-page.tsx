import { Link } from "react-router-dom";
import {
  Sprout,
  TrendingDown,
  Trash2,
  Warehouse,
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { t } from "../i18n";
import { useLanguage } from "../LanguageContext";

export function LandingPage() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">AGRI GENIX</span>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={lang}
                onChange={e => setLang(e.target.value as any)}
                className="text-black rounded px-2 py-1 border border-border"
                style={{ minWidth: 100 }}
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
              </select>
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t('loginSignUp', lang)}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-muted to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t('smartFarmingMarketplace', lang)}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t('heroSubtitle', lang)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/marketplace"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-center"
                >
                  {t('checkCropPrices', lang)}
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors text-center"
                >
                  {t('sellCrops', lang)}
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-colors text-center"
                >
                  {t('bookStorage', lang)}
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1759261158814-e5c651e30714?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwY3JvcHN8ZW58MXx8fHwxNzczNjM2NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farmer harvesting"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t('problemsFarmersFace', lang)}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">{t('lowCropPrices', lang)}</h3>
              <p className="text-muted-foreground">
                {t('lowCropPricesDesc', lang)}
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">{t('cropWastage', lang)}</h3>
              <p className="text-muted-foreground">
                {t('cropWastageDesc', lang)}
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Warehouse className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">{t('storageProblems', lang)}</h3>
              <p className="text-muted-foreground">
                {t('storageProblemsDesc', lang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t('solutionsByAgriGenix', lang)}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {t('realTimeCropPrices', lang)}
              </h3>
              <p className="text-muted-foreground">
                {t('realTimeCropPricesDesc', lang)}
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {t('directMarketplace', lang)}
              </h3>
              <p className="text-muted-foreground">
                {t('directMarketplaceDesc', lang)}
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {t('storageBookingSystem', lang)}
              </h3>
              <p className="text-muted-foreground">
                {t('storageBookingSystemDesc', lang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t('howItWorks', lang)}
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {t('checkCropPrices', lang)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('checkCropPricesDesc', lang)}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">{t('findBuyers', lang)}</h3>
                  <p className="text-muted-foreground">
                    {t('findBuyersDesc', lang)}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {t('bookStorageIfNeeded', lang)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('bookStorageIfNeededDesc', lang)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t('whatFarmersSay', lang)}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <CheckCircle2 key={star} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                {t('testimonial1', lang)}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Rajesh Kumar</p>
                  <p className="text-sm text-muted-foreground">Punjab</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <CheckCircle2 key={star} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                {t('testimonial2', lang)}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Lakshmi Devi</p>
                  <p className="text-sm text-muted-foreground">Karnataka</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <CheckCircle2 key={star} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                {t('testimonial3', lang)}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Suresh Patil</p>
                  <p className="text-sm text-muted-foreground">Maharashtra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <p className="text-4xl font-bold text-primary mb-2">50,000+</p>
              <p className="text-muted-foreground">{t('farmersConnected', lang)}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Warehouse className="w-10 h-10 text-accent" />
              </div>
              <p className="text-4xl font-bold text-accent mb-2">500+</p>
              <p className="text-muted-foreground">{t('storageFacilities', lang)}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-4xl font-bold text-secondary mb-2">1M+ Tons</p>
              <p className="text-muted-foreground">{t('cropsTraded', lang)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="text-xl font-semibold">AGRI GENIX</span>
              </div>
              <p className="text-primary-foreground/80">
                {t('footerDesc', lang)}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('forFarmers', lang)}</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>{t('sellCrops', lang)}</li>
                <li>{t('checkPrices', lang)}</li>
                <li>{t('bookStorage', lang)}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('forBuyers', lang)}</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>{t('browseMarketplace', lang)}</li>
                <li>{t('contactFarmers', lang)}</li>
                <li>{t('trackOrders', lang)}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('support', lang)}</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>{t('helpCenter', lang)}</li>
                <li>{t('contactUs', lang)}</li>
                <li>{t('termsPrivacy', lang)}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>© 2026 AGRI GENIX. {t('allRightsReserved', lang)}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
