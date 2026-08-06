import React from "react";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/context";

export default function SEO({ title, description, path = "" }) {
  const { lang } = useI18n();
  const siteUrl = "https://mk-capitalmarkets.com";
  
  const cleanPath = typeof path === "string" ? path : "";
  const currentUrl = `${siteUrl}/${lang}${cleanPath === "/" ? "" : cleanPath}`;
  const frUrl = `${siteUrl}/fr${cleanPath === "/" ? "" : cleanPath}`;
  const enUrl = `${siteUrl}/en${cleanPath === "/" ? "" : cleanPath}`;

  return (
    <Helmet>
      <title>{typeof title === "string" ? title : "MK Capital Markets"}</title>
      <meta name="description" content={typeof description === "string" ? description : ""} />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={frUrl} />
    </Helmet>
  );
}