// Localization picker. Fields can be a plain string OR { en, fr, ... }.
export const L = (field, lang = "en") => {
  if (field == null) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") return field[lang] || field.en || Object.values(field)[0] || "";
  return String(field);
};

// Array of bilingual strings → array of localized
export const LA = (arr, lang = "en") => (arr || []).map((v) => L(v, lang));
