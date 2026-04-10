import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sprout, Bell, MessageSquare, User, Menu } from "lucide-react";
import { useState } from "react";
import { t, Language } from "../i18n";
import { useLanguage } from "../LanguageContext";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  // Show farmer menu only on /farmer routes
  const isFarmer = location.pathname.startsWith("/farmer");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">AGRI GENIX</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {isFarmer ? (
              <>
                <Link to="/farmer/bookings" className="text-foreground hover:text-primary transition-colors">
                  {t('bookings', lang)}
                </Link>
                <Link to="/farmer/sell-crops" className="text-foreground hover:text-primary transition-colors">
                  {t('sellCrops', lang)}
                </Link>
                <Link to="/farmer/book-godown" className="text-foreground hover:text-primary transition-colors">
                  {t('bookGodown', lang)}
                </Link>
              </>
            ) : (
              <>
                <Link to="/marketplace" className="text-foreground hover:text-primary transition-colors">
                  {t('marketplace', lang)}
                </Link>
                <Link to="/notifications" className="relative">
                  <Bell className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-xs flex items-center justify-center rounded-full">
                    3
                  </span>
                </Link>
                <Link to="/messages">
                  <MessageSquare className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                </Link>
                <Link to="/profile" className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                  <span>{t('profile', lang)}</span>
                </Link>
              </>
            )}
            <select 
              value={lang} 
              onChange={e => setLang(e.target.value as Language)} 
              className="ml-4 text-black rounded px-2 py-1 border border-border"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
            </select>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {isFarmer ? (
                <>
                  <Link
                    to="/farmer/bookings"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('bookings', lang)}
                  </Link>
                  <Link
                    to="/farmer/sell-crops"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('sellCrops', lang)}
                  </Link>
                  <Link
                    to="/farmer/book-godown"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('bookGodown', lang)}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/marketplace"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('marketplace', lang)}
                  </Link>
                  <Link
                    to="/notifications"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('notifications', lang)}
                  </Link>
                  <Link
                    to="/messages"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('messages', lang)}
                  </Link>
                  <Link
                    to="/profile"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('profile', lang)}
                  </Link>
                </>
              )}
              <select 
                value={lang} 
                onChange={e => setLang(e.target.value as Language)} 
                className="mt-2 text-black rounded px-2 py-1 border border-border w-full"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
              </select>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
