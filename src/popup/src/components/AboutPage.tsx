import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { translations } from "@/constant";
import {
  Keyboard,
  Languages,
  Github,
  Info,
  Zap,
  ArrowLeft,
  ArrowRight,
  User,
  Globe,
  Shield,
  Sparkles,
} from "lucide-react";

type Translations = (typeof translations)["en"];

type AboutPageProps = {
  language: "en" | "fa";
  toggleLanguage: () => void;
  onBack: () => void;
  t: Translations;
  isRTL: boolean;
};

export default function AboutPage({
  language,
  toggleLanguage,
  onBack,
  t,
  isRTL,
}: AboutPageProps) {
  return (
    <div
      className={`w-80 max-h-96 bg-background ${
        isRTL ? "rtl" : "ltr"
      } text-foreground overflow-y-auto`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-8 w-8 p-0 hover:bg-cyan-50"
            >
              {isRTL ? (
                <ArrowRight className="w-4 h-4 text-cyan-600" />
              ) : (
                <ArrowLeft className="w-4 h-4 text-cyan-600" />
              )}
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <Keyboard className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-medium">{t.aboutTitle}</h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 h-7 px-2 text-xs border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300"
          >
            <Languages className="w-3 h-3" />
            {language === "en" ? "EN" : "FA"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mb-2">{t.version}</p>
      </div>
      <Separator className="mx-4" />

      {/* Features */}
      <div className="p-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <label className="text-sm font-medium">{t.featuresTitle}</label>
        </div>
        <div className="space-y-2">
          {t.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Separator className="mx-4" />

      {/* How It Works */}
      <div className="p-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-cyan-600" />
          <label className="text-sm font-medium">{t.howItWorksTitle}</label>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t.howItWorksText}
        </p>
      </div>
      <Separator className="mx-4" />

      {/* Privacy */}
      <div className="p-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-cyan-600" />
          <label className="text-sm font-medium">{t.privacyTitle}</label>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t.privacyText}
        </p>
      </div>
      <Separator className="mx-4" />

      {/* Developer */}
      <div className="p-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-cyan-600" />
          <label className="text-sm font-medium">{t.developerTitle}</label>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t.developerText}
        </p>
      </div>
      <Separator className="mx-4" />

      {/* Support */}
      <div className="p-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-cyan-600" />
          <label className="text-sm font-medium">{t.supportTitle}</label>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          {t.supportText}
        </p>
        <div className="flex gap-2">
          <a
            href="https://github.com/masniper/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            tabIndex={-1}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300"
              type="button"
            >
              <Github className="w-3 h-3 mr-1" />
              {t.githubLink}
            </Button>
          </a>

          <a
            href="mailto:mohammad.alii.shahsavari@gmail.com?subject=Extension%20bug%20report"
            className="flex-1"
            tabIndex={-1}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300"
              type="button"
            >
              <Info className="w-3 h-3 mr-1" />
              {t.reportIssue}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
