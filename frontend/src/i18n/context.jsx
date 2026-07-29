import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import fr from "./locales/fr.json";
import en from "./locales/en.json";

const translations = { fr, en };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  // Détection initiale via window.location (ne plante pas si hors du Router)
  const [lang, setLangState] = useState(() => {
    if (typeof window !== "undefined") {
      const pathLang = window.location.pathname.split("/")[1];
      if (pathLang === "en" || pathLang === "fr") return pathLang;
      return localStorage.getItem("mk-lang") || "fr";
    }
    return "fr";
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("mk-lang", newLang);
      document.documentElement.lang = newLang;
    }
  };

  const t = useCallback(
    (key) => {
      if (translations[lang] && translations[lang][key] !== undefined) {
        return translations[lang][key];
      }
      if (translations.fr && translations.fr[key] !== undefined) {
        return translations.fr[key];
      }
      return key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n doit être utilisé dans I18nProvider");
  return ctx;
}

export function localizedPath(path, lang) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath.startsWith("/fr/") || cleanPath.startsWith("/en/")) {
    const parts = cleanPath.split("/");
    parts[1] = lang;
    return parts.join("/");
  }
  return `/${lang}${cleanPath === "/" ? "" : cleanPath}`;
}