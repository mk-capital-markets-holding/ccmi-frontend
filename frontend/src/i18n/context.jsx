import React, { createContext, useContext, useState } from "react";
import frTranslations from "./locales/fr.json";
import enTranslations from "./locales/en.json";
import { L } from "./pick";

const I18nContext = createContext(null);

const TRANSLATIONS = {
  fr: frTranslations || {},
  en: enTranslations || {},
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("fr");

  const t = (key) => {
    if (!key || typeof key !== "string") return "";

    const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr || {};
    const keys = key.split(".");
    let current = dict;

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        current = null;
        break;
      }
    }

    // Si le résultat est un objet au lieu d'un texte, on le cast ou on renvoie vide
    if (typeof current === "object" && current !== null) {
      const extracted = L(current, lang);
      return typeof extracted === "string" ? extracted : "";
    }

    if (typeof current === "string" || typeof current === "number") {
      return String(current);
    }

    return "";
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n doit être utilisé dans I18nProvider");
  }
  return ctx;
}

export function localizedPath(path, lang) {
  if (!path) return `/${lang}`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean.startsWith("/fr/") || clean.startsWith("/en/")) {
    return clean.replace(/^\/(fr|en)/, `/${lang}`);
  }
  return `/${lang}${clean === "/" ? "" : clean}`;
}