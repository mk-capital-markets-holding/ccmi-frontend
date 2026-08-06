// Localization picker sécurisé (Empêche le crash React #31)
export const L = (field, lang = "en") => {
  if (field == null) return "";
  
  // 1. Si c'est déjà du texte ou un nombre, on le renvoie
  if (typeof field === "string" || typeof field === "number") {
    return String(field);
  }

  // 2. Si c'est un objet
  if (typeof field === "object") {
    // Si l'objet contient directement les clés de langue (ex: { en: "...", fr: "..." })
    const val = field[lang] || field.en || field.fr;
    if (val && (typeof val === "string" || typeof val === "number")) {
      return String(val);
    }

    // Si la valeur trouvée est elle-même un objet, on relance la fonction de manière récursive
    if (val && typeof val === "object") {
      return L(val, lang);
    }

    // Si ce n'est pas un objet de langue mais un objet avec d'autres propriétés (ex: { name, category })
    if (field.name) return L(field.name, lang);
    if (field.title) return L(field.title, lang);
    if (field.label) return L(field.label, lang);
    if (field.lede) return L(field.lede, lang);
  }

  return "";
};

// Array of bilingual strings → array of localized strings
export const LA = (arr, lang = "en") => (arr || []).map((v) => L(v, lang));