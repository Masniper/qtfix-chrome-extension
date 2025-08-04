import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Keyboard, Languages, Github, Info, Zap } from "lucide-react";
import { shortcutToString, type Shortcut } from "@/lib/shortcut";
import { translations } from "@/constant";

import { ShortcutEditor } from "@/components/ShortcutEditor";
import AboutPage from "@/components/AboutPage";

export type Language = "en" | "fa";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [showSuccess, setShowSuccess] = useState(false);
  const [shortcut, setShortcut] = useState<Shortcut | null>(null);
  const [currentView, setCurrentView] = useState<"main" | "about">("main");

  const t = translations[language];

  const shortcutStrArray = shortcutToString(shortcut, language);
  const shortcutStr = shortcutStrArray.length
    ? shortcutStrArray.map((item) => `<kbd>${item}</kbd>`).join(" + ")
    : "...";

  const usageHtml = t.usageText.replace("{shortcut}", shortcutStr);

  const isRTL = language === "fa";

  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "fa" : "en"));
  const showAbout = () => setCurrentView("about");
  const showMain = () => setCurrentView("main");

  useEffect(() => {
    chrome.storage.sync.get("language", (res) => {
      if (res.language) setLanguage(res.language);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ language });
  }, [language]);
  
  return (
    <div
      className={`w-80 max-h-96 bg-background ${
        isRTL ? "rtl" : "ltr"
      } text-foreground `}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Separator className="mx-4" />
      {currentView === "about" ? (
        <AboutPage
          language={language}
          toggleLanguage={toggleLanguage}
          onBack={showMain}
          t={translations[language]}
          isRTL={language === "fa"}
        />
      ) : (
        <>
          {/* Header */}
          <div className="p-4 pb-2">
            <div className="flex items-start justify-between mb-3 gap-2">
              <div className="flex flex-row items-center gap-2 min-w-0 flex-1">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                  <Keyboard className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-semibold text-base leading-tight text-cyan-700">
                    QTFix
                  </span>
                  <span
                    className={`text-sm font-medium leading-tight whitespace-pre-line break-words ${
                      isRTL ? "text-right" : ""
                    }`}
                    title={t.title.replace(/^QTFix[:：]?\s?/, "")}
                  >
                    {t.title.replace(/^QTFix[:：]?\s?/, "")}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-1 h-7 px-2 text-xs border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 flex-shrink-0"
              >
                <Languages className="w-3 h-3" />
                {language === "en" ? "EN" : "FA"}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.description}
            </p>
          </div>
          {/* Shortcut Editor Section */}
          <div className="p-4 py-3">
            <ShortcutEditor
              lang={language}
              shortcut={shortcut}
              setShortcut={setShortcut}
              onChange={() => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2000);
              }}
            />
          </div>

          <Separator className="mx-4" />

          {/* Usage Guide */}
          <div className="p-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-cyan-600" />
              <label className="text-sm font-medium">{t.usageTitle}</label>
            </div>
            <p
              className="text-xs text-muted-foreground leading-relaxed"
              dir={isRTL ? "rtl" : "ltr"}
              dangerouslySetInnerHTML={{ __html: usageHtml }}
            />
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mx-4 mb-3">
              <Card className="p-2 bg-green-50 border-green-200">
                <p className="text-xs text-green-700 text-center">
                  {t.shortcutSaved}
                </p>
              </Card>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 pt-2">
            <Separator className="mb-3" />
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <button
                className="flex items-center gap-1 hover:text-cyan-600 transition-colors"
                onClick={showAbout}
              >
                <Info className="w-3 h-3" />
                {t.about}
              </button>
              <a
                href="https://github.com/masniper/"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
              >
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <Github className="w-3 h-3" />
                  {t.github}
                </button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
