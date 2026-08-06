export function L(obj, lang = "en") {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  
  // ✅ SI lang === "fr", on renvoie obj.fr. SINON obj.en (avec fallback)
  if (lang === "fr") {
    return obj.fr || obj.en || "";
  }
  return obj.en || obj.fr || "";
}