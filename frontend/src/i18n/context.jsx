import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import fr from "./locales/fr.json";
import en from "./locales/en.json";

const translations = { fr, en };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  // 1. Détection initiale : priorité à l'URL, puis au localStorage, puis ANGLAIS par défaut
  const [lang, setLangState] = useState(() => {
    if (typeof window !== "undefined") {
      const pathLang = window.location.pathname.split("/")[1];
      if (pathLang === "en" || pathLang === "fr") return pathLang;
      return localStorage.getItem("mk-lang") || "en"; // ✅ 'en' au lieu de 'fr'
    }
    return "en"; // ✅ 'en' au lieu de 'fr'
  });

  // Synchronise la balise <html lang="..."> au montage et au changement
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (newLang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("mk-lang", newLang);
      document.documentElement.lang = newLang;
    }
  };

  // 2. Traduction t() : cherche dans la langue active, puis fallback sur l'ANGLAIS
  const t = useCallback(
    (key) => {
      // Si la clé existe dans la langue demandée
      if (translations[lang] && translations[lang][key] !== undefined) {
        return translations[lang][key];
      }
      // ✅ Fallback sur l'anglais si la clé manque dans la langue actuelle
      if (translations.en && translations.en[key] !== undefined) {
        return translations.en[key];
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