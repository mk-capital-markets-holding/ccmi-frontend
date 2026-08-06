// Localization picker. Fields can be a plain string OR { en, fr, ... } or objects with nested text fields.
export const L = (field, lang = "en") => {
  if (field == null) return "";
  if (typeof field === "string" || typeof field === "number") return String(field);
  if (Array.isArray(field)) return field.map((v) => L(v, lang)).join(" ");
  if (typeof field === "object") {
    const localized = field[lang] ?? field.en ?? field.fr;
    if (localized != null && (typeof localized === "string" || typeof localized === "number")) return String(localized);
    if (localized != null) return L(localized, lang);
    if (field.name) return L(field.name, lang);
    if (field.title) return L(field.title, lang);
    if (field.label) return L(field.label, lang);
    if (field.lede) return L(field.lede, lang);
    if (field.description) return L(field.description, lang);
    if (field.category) return L(field.category, lang);
    if (field.value) return L(field.value, lang);
  }
  return "";
};

// Array of bilingual strings → array of localized
export const LA = (arr, lang = "en") => (arr || []).map((v) => L(v, lang));
