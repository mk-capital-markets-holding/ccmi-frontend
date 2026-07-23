import React, { createContext, useContext, useMemo, useEffect, useState, useCallback } from "react";
import { translations } from "./translations";

const I18nContext = createContext(null);

export const LANGS = ["en", "fr"];

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    // Detect from URL prefix /fr
    const path = window.location.pathname;
    if (path.startsWith("/fr/") || path === "/fr") return "fr";
    const stored = window.localStorage.getItem("mk-lang");
    if (stored && LANGS.includes(stored)) return stored;
    return "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("mk-lang", lang);
  }, [lang]);

  const t = useCallback((key) => {
    const dict = translations[lang] || translations.en;
    return dict[key] || translations.en[key] || key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};

/** Compute a URL keeping the current language prefix. */
export const localizedPath = (path, lang) => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "fr") return `/fr${clean === "/" ? "" : clean}`;
  return clean;
};
