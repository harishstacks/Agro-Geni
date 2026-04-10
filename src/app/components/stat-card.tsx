import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: string;
}

export function StatCard({ title, value, icon: Icon, iconColor = "bg-primary", trend }: StatCardProps) {
  const { lang } = useLanguage();
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{t(title, lang)}</p>
          <p className="text-2xl font-semibold text-card-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-accent mt-2">{trend}</p>
          )}
        </div>
        <div className={`${iconColor} w-12 h-12 rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
