import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import SearchModal from "./SearchModal";
import { useI18n } from "@/i18n/context";
import { useEffect } from "react";

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const loc = useLocation();
  const { lang } = useI18n();

  // Scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [loc.pathname]);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <link rel="canonical" href={`https://mkcmt.io${loc.pathname}`} />
        <link rel="alternate" hreflang="en" href={`https://mkcmt.io${loc.pathname.replace(/^\/fr/, "") || "/"}`} />
        <link rel="alternate" hreflang="fr" href={`https://mkcmt.io/fr${loc.pathname.replace(/^\/fr/, "")}`} />
        <meta property="og:site_name" content="MK Capital Markets Technologies" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <main className="min-h-[60vh]" data-testid="page-main">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
