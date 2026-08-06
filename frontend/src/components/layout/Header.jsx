import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, Globe } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";
import { MODULES } from "@/data/modules";
import { INDUSTRIES } from "@/data/industries";
import LanguageToggle from "@/components/common/LanguageToggle";

const MAIN_LINKS = [
  { to: "/about", key: "nav.about" },
  { to: "/solutions", key: "nav.solutions", mega: "solutions" },
  { to: "/industries", key: "nav.industries", mega: "industries" },
  { to: "/investors", key: "nav.investors" },
  { to: "/technology", key: "nav.technology" },
  { to: "/insights", key: "nav.insights" },
];

export default function Header({ onSearchOpen }) {
  const { t, lang, setLang } = useI18n();
  const nav = useNavigate();
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);

  const p = (path) => localizedPath(path, lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [loc.pathname]);

  const toggleLang = () => {
    const nextLang = lang === "fr" ? "en" : "fr";
    setLang(nextLang);

    // Extraction du chemin pur (sans le /fr ou /en initial) pour réorienter l'URL
    const currentPath = loc.pathname;
    const cleanPath = currentPath.replace(/^\/(fr|en)(\/|$)/, "/");
    const targetPath = localizedPath(cleanPath === "" ? "/" : cleanPath, nextLang);

    nav(targetPath, { replace: true });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "bg-mk-ink/95 backdrop-blur-sm" : "bg-mk-ink"
      } text-white border-b border-white/5`}
      data-testid="site-header"
    >
      <div className="container-mk flex items-center justify-between h-16 md:h-20">
        <Link to={p("/")} className="flex items-center gap-3 group" data-testid="header-logo">
          <div className="w-8 h-8 border border-mk-bronze flex items-center justify-center">
            <span className="font-serif text-mk-bronze text-lg leading-none">M</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-serif text-base md:text-lg">MK Capital Markets</div>
            <div className="overline text-[9px] text-white/60 -mt-0.5">{t("brand.tagline")}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {MAIN_LINKS.map((l) => (
            <div
              key={l.to}
              className="relative"
              onMouseEnter={() => l.mega && setOpenMega(l.mega)}
              onMouseLeave={() => setOpenMega(null)}
            >
              <Link
                to={p(l.to)}
                data-testid={`nav-${l.to.replace("/", "")}`}
                className="text-sm text-white/80 hover:text-mk-bronze transition-colors flex items-center gap-1 py-2"
              >
                {t(l.key)}
                {l.mega && <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />}
              </Link>
              {l.mega && openMega === l.mega && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                  <div
                    className="w-[720px] bg-mk-ink2 border border-white/10 p-8 grid grid-cols-2 gap-x-10 gap-y-4 shadow-2xl mk-grain"
                    data-testid={`mega-${l.mega}`}
                  >
                    {(l.mega === "solutions" ? MODULES : INDUSTRIES).map((m) => (
                      <Link key={m.slug} to={p(`${l.to}/${m.slug}`)} className="group block">
                        <div className="flex items-start gap-3">
                          {m.icon && <m.icon className="w-5 h-5 text-mk-bronze mt-0.5" strokeWidth={1.5} />}
                          <div>
                            <div className="text-sm text-white group-hover:text-mk-bronze transition-colors">
                              {L(m.name, lang)}
                            </div>
                            <div className="text-xs text-white/50 mt-0.5">
                              {L(m.tagline || m.lede, lang)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {l.mega === "solutions" && (
                      <Link
                        to={p("/solutions/roadmap")}
                        className="col-span-2 mt-2 pt-4 border-t border-white/10 flex items-center justify-between text-mk-bronze text-sm hover:text-white transition-colors"
                      >
                        <span>
                          {t("footer.future")} — {t("bc.roadmap")}
                        </span>
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            data-testid="btn-search-open"
            aria-label="Open search"
            className="p-2 text-white/80 hover:text-mk-bronze transition-colors"
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </button>
          
          <button
            onClick={toggleLang}
            data-testid="btn-lang-toggle"
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 hover:text-mk-bronze transition-colors px-2 py-1"
          >
            <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{lang === "fr" ? "EN" : "FR"}</span>
          </button>

          <Link
            to={p("/contact")}
            className="hidden md:inline-block bg-mk-bronze text-mk-ink text-sm px-4 py-2.5 font-medium hover:bg-mk-bronze2 transition-colors"
            data-testid="btn-header-demo"
          >
            {t("cta.demo")}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            data-testid="btn-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-mk-ink border-t border-white/10 mk-grain" data-testid="mobile-menu">
          <div className="container-mk py-6 flex flex-col gap-4">
            {MAIN_LINKS.map((l) => (
              <Link key={l.to} to={p(l.to)} className="text-white/90 py-2 border-b border-white/5">
                {t(l.key)}
              </Link>
            ))}
            <Link to={p("/contact")} className="text-white/90 py-2 border-b border-white/5">
              {t("nav.contact")}
            </Link>
            <Link to={p("/founder")} className="text-white/90 py-2 border-b border-white/5">
              {t("nav.founder")}
            </Link>
            <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink text-sm px-4 py-3 text-center mt-2">
              {t("cta.demo")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}