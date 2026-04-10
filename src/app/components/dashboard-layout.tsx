import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import React from "react";
import { Header } from "./header";

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function DashboardLayout({ title, children }: DashboardLayoutProps) {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">{t(title, lang)}</h1>
          <div className="bg-white rounded-2xl border border-border shadow-lg p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
