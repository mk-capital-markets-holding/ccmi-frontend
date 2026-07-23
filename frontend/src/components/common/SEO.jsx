import React from "react";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/context";

/** SEO helper — meta title (50-60 char), description (150-160). */
export default function SEO({ title, description, image, path }) {
  const { lang } = useI18n();
  const fullTitle = title ? `${title} — MK Capital Markets Technologies` : "MK Capital Markets Technologies — Dubai · Africa · Capital Markets";
  const desc = description || "Institutional-grade capital-markets platform engineered from Dubai for Africa and the Gulf. Publisher of the CCMI operating system.";
  const url = `https://mkcmt.io${path || ""}`;
  const img = image || "https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg";
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content={lang === "fr" ? "fr_FR" : "en_US"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}
