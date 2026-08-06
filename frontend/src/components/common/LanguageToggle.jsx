import React from "react";
import { useI18n } from "@/i18n/context";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-2 font-mono text-xs" data-testid="btn-lang-toggle">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-mk-bronze font-bold" : "text-white/50 hover:text-white transition-colors"}
      >
        EN
      </button>
      <span className="text-white/20">|</span>
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={lang === "fr" ? "text-mk-bronze font-bold" : "text-white/50 hover:text-white transition-colors"}
      >
        FR
      </button>
    </div>
  );
}