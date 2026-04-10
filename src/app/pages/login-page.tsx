import { Link, useNavigate } from "react-router-dom";
import { VoiceInput } from "../components/ui/voice-input";
import { Sprout, User, ShoppingBag, Warehouse } from "lucide-react";
import { useState } from "react";
import { t } from "../i18n";
import { supabase } from "../../lib/supabase";
import { createAccountSession, saveAccountSession } from "../lib/account-session";


import { useLanguage } from "../LanguageContext";

export function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"farmer" | "buyer" | "godown" | null>(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { lang, setLang } = useLanguage();

  const handleSendOtp = async () => {
    if (email && selectedRole) {
      setLoading(true);
      setError("");

      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          data: {
            role: selectedRole === "godown" ? "godown_owner" : selectedRole
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setShowOtp(true);
      }
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (otp && selectedRole) {
      setLoading(true);
      setError("");

      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email',
      });

      if (error) {
        setError(error.message);
      } else {
        const accountSession = createAccountSession({
          email,
          role: selectedRole === "godown" ? "godown_owner" : selectedRole,
          name: email.split("@")[0],
        });
        saveAccountSession(accountSession);
        navigate(`/${selectedRole}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-2">
          <select
            value={lang}
            onChange={e => setLang(e.target.value as any)}
            className="text-black rounded px-2 py-1 border border-border"
            style={{ minWidth: 100 }}
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Sprout className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">AGRI GENIX</span>
          </Link>
          <h1 className="text-2xl font-semibold text-foreground mt-4">{t('welcomeBack', lang)}</h1>
          <p className="text-muted-foreground mt-2">{t('loginToYourAccount', lang)}</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          {!selectedRole ? (
            <>
              <h2 className="text-lg font-semibold text-card-foreground mb-4">{t('selectYourRole', lang)}</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedRole("farmer")}
                  className="w-full p-4 bg-primary/5 hover:bg-primary/10 border-2 border-primary/20 hover:border-primary rounded-xl transition-all flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-card-foreground">{t('farmer', lang)}</p>
                    <p className="text-sm text-muted-foreground">{t('sellCropsBookStorage', lang)}</p>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedRole("buyer")}
                  className="w-full p-4 bg-accent/5 hover:bg-accent/10 border-2 border-accent/20 hover:border-accent rounded-xl transition-all flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-card-foreground">{t('buyer', lang)}</p>
                    <p className="text-sm text-muted-foreground">{t('browsePurchaseCrops', lang)}</p>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedRole("godown")}
                  className="w-full p-4 bg-secondary/5 hover:bg-secondary/10 border-2 border-secondary/20 hover:border-secondary rounded-xl transition-all flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <Warehouse className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-card-foreground">{t('godownOwner', lang)}</p>
                    <p className="text-sm text-muted-foreground">{t('manageWarehouseBookings', lang)}</p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setShowOtp(false);
                  setEmail("");
                  setOtp("");
                }}
                className="text-sm text-primary hover:underline mb-4"
              >
                ← {t('changeRole', lang)}
              </button>
              <h2 className="text-lg font-semibold text-card-foreground mb-6">
                {t('loginAs', lang)} {selectedRole === "farmer"
                  ? t('farmer', lang)
                  : selectedRole === "buyer"
                  ? t('buyer', lang)
                  : t('godownOwner', lang)}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={showOtp || loading}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>
                )}
                {showOtp && (
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">{t('enterOtp', lang)}</label>
                    <input
                      type="text"
                      placeholder={t('enter6DigitOtp', lang)}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      OTP sent to {email}
                    </p>
                  </div>
                )}
                {!showOtp ? (
                  <button
                    onClick={handleSendOtp}
                    disabled={!email || !email.includes('@') || loading}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? <span className="animate-pulse">Sending OTP...</span> : t('sendOtp', lang)}
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    disabled={!otp || otp.length < 6 || loading}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? <span className="animate-pulse">Verifying...</span> : t('login', lang)}
                  </button>
                )}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {t('newUser', lang)} {" "}
                  <button className="text-primary hover:underline">{t('registerHere', lang)}</button>
                </p>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← {t('backToHome', lang)}
          </Link>
        </div>
      </div>
    </div>
  );
}
