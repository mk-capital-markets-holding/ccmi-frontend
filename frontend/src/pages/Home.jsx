import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Play, Building2, Shield } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";
import SEO from "@/components/common/SEO";
import { MODULES } from "@/data/modules";
import { INDUSTRIES } from "@/data/industries";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PARTNERS = ["MK Capital Markets"];

const Hero = () => {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <section className="relative bg-mk-ink text-white overflow-hidden mk-grain min-h-[86vh] flex items-end" data-testid="home-hero">
      <div className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full mk-hero-glow" style={{ background: "radial-gradient(circle, rgba(201,169,97,0.28) 0%, rgba(10,22,40,0) 60%)" }} />
      <div className="absolute inset-0 opacity-25" style={{ background: "url('https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg') center/cover", filter: "grayscale(0.6) contrast(1.1)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.85) 60%, rgba(10,22,40,1) 100%)" }} />

      <div className="container-mk relative py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          {/* SURTITRE */}
          <div className="overline mb-8" data-testid="hero-kicker">
            DUBAÏ — AFRIQUE — MARCHÉS DE CAPITAUX
          </div>

          {/* TITRE PRINCIPAL */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-white max-w-5xl" data-testid="hero-title">
            Modernisez vos infrastructures de marché avec CCMI.
          </h1>

          {/* SOUS-TEXTE */}
          <p className="mt-8 text-lg text-white/70 max-w-2xl leading-relaxed" data-testid="hero-lede">
            CCMI propulse la digitalisation des marchés financiers en Afrique et dans le Golfe. Une plateforme SaaS modulaire conçue à Dubaï pour interconnecter émetteurs, intermédiaires, investisseurs et régulateurs.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink font-medium px-6 py-3.5 hover:bg-mk-bronze2 transition-colors inline-flex items-center gap-2" data-testid="btn-hero-demo">
              Réserver une démo <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link to={p("/contact")} className="border border-white/40 text-white px-6 py-3.5 hover:bg-white hover:text-mk-ink transition-colors inline-flex items-center gap-2" data-testid="btn-hero-contact">
              Parler à un expert
            </Link>
            <button className="text-white/70 px-2 py-3.5 hover:text-mk-bronze transition-colors inline-flex items-center gap-2 text-sm" data-testid="btn-hero-play">
              <span className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center"><Play className="w-3.5 h-3.5" /></span>
              Voir la plateforme en action (2 min)
            </button>
          </div>
        </div>
        <div className="lg:col-span-4 hidden lg:block">
          <div className="border-l border-mk-bronze/50 pl-6 space-y-6 text-sm text-white/80 font-mono">
            <div><div className="overline text-white/40">{t("hero.hq")}</div><div className="mt-1">Dubaï</div></div>
            <div><div className="overline text-white/40">{t("hero.platform")}</div><div className="mt-1">CCMI Enterprise</div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ModulesGrid = () => {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <section className="bg-mk-paper" data-testid="modules-grid">
      <div className="container-mk py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-8">
            <div className="overline mb-3">{t("home.modules.overline")}</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">{t("home.modules.title")}</h2>
          </div>
          <div className="md:col-span-4 md:pt-8">
            <p className="text-mk-text2">{t("home.modules.lede")}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-mk-line/15 border border-mk-line/15">
          {MODULES.map((m, i) => (
            <Link
              key={m.slug}
              to={p(`/solutions/${m.slug}`)}
              className="group bg-mk-paper p-8 md:p-10 hover:bg-white transition-colors relative"
              data-testid={`module-card-${m.slug}`}
            >
              <div className="flex items-start justify-between mb-6">
                <m.icon className="w-8 h-8 text-mk-bronze" strokeWidth={1.5} />
                <span className="text-xs font-mono text-mk-text2/60">0{i + 1}</span>
              </div>
              <h3 className="font-serif text-2xl leading-tight mb-3">{L(m.name, lang)}</h3>
              <p className="text-sm text-mk-text2 mb-6 leading-relaxed">{L(m.tagline || m.description, lang)}</p>
              <div className="inline-flex items-center gap-2 text-sm text-mk-ink group-hover:text-mk-bronze transition-colors">
                {t("cta.learn")} <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustriesStrip = () => {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <section className="bg-mk-ink text-white py-24 md:py-32 mk-grain" data-testid="industries-strip">
      <div className="container-mk">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-6">
            <div className="overline mb-3">{t("home.ind.overline")}</div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">{t("home.ind.title")}</h2>
          </div>
          <div className="md:col-span-6 md:pt-8">
            <p className="text-white/70 leading-relaxed">{t("home.ind.lede")}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {INDUSTRIES.map((ind) => (
            <Link key={ind.slug} to={p(`/industries/${ind.slug}`)} className="bg-mk-ink hover:bg-mk-ink2 p-8 group transition-colors" data-testid={`industry-card-${ind.slug}`}>
              <ind.icon className="w-6 h-6 text-mk-bronze mb-6" strokeWidth={1.5} />
              <div className="font-serif text-xl leading-tight text-white">{L(ind.name, lang)}</div>
              <div className="text-sm text-white/60 mt-3 leading-relaxed line-clamp-3">{L(ind.lede, lang)}</div>
              <div className="mt-6 text-xs font-mono uppercase tracking-wider text-mk-bronze group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">{t("cta.read")}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersStrip = () => {
  const { t } = useI18n();
  return (
    <section className="bg-mk-paper2 py-16" data-testid="partners-section">
      <div className="container-mk overflow-hidden">
        <div className="overline text-mk-text2 text-center mb-6">
          {t("home.partners.overline")}
        </div>
        <div className="flex justify-center items-center">
          {PARTNERS.map((pn, idx) => (
            <div key={idx} className="mk-logo font-serif text-lg text-mk-text2 tracking-wide">
              {pn}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InsightsPreview = () => {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const { data } = useQuery({ queryKey: ["home-articles", lang], queryFn: async () => (await axios.get(`${BACKEND_URL}/api/articles?limit=3&lang=${lang}`)).data });
  const items = data?.items || [];

  const getCategoryLabel = (cat) => {
    if (!cat) return "";
    if (typeof cat === "string") return cat;
    if (typeof cat === "object") {
      if (cat.name) return L(cat.name, lang);
      return L(cat, lang);
    }
    return "";
  };

  return (
    <section className="bg-mk-paper py-24 md:py-32" data-testid="insights-preview">
      <div className="container-mk">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="overline mb-3">{t("home.insights.overline")}</div>
            <h2 className="font-serif text-4xl md:text-5xl">{t("home.insights.title")}</h2>
          </div>
          <Link to={p("/insights")} className="hidden md:inline-flex items-center gap-2 text-sm text-mk-ink hover:text-mk-bronze mk-link">{t("cta.all_insights")} <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((a, index) => {
            const articleSlug = typeof a.slug === "string" || typeof a.slug === "number"
              ? String(a.slug)
              : typeof a.id === "string" || typeof a.id === "number"
                ? String(a.id)
                : `article-${index}`;
            
            const categoryLabel = getCategoryLabel(a.category);

            return (
              <Link key={`${articleSlug}-${index}`} to={p(`/insights/${articleSlug}`)} className="group" data-testid={`insight-card-${articleSlug}`}>
                <div className="aspect-[16/10] overflow-hidden bg-mk-ink mb-5">
                  <img src={a.cover} alt={L(a.title, lang)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="overline mb-2 text-mk-bronze2">
                  {categoryLabel} {categoryLabel ? "·" : ""} {a.read_minutes} {t("ins.min_read")}
                </div>
                <h3 className="font-serif text-2xl leading-tight group-hover:text-mk-bronze2 transition-colors">{L(a.title, lang)}</h3>
                <p className="text-sm text-mk-text2 mt-3 leading-relaxed">{L(a.excerpt, lang)}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ConversionCTA = () => {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <section className="bg-mk-ink text-white mk-grain relative overflow-hidden" data-testid="conversion-cta">
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 80% 30%, rgba(201,169,97,0.25), transparent 55%)" }} />
      <div className="container-mk relative py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="overline mb-4">{t("home.cta.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-lg">
            {lang === "fr" ? "Rencontrez l'équipe. Découvrez CCMI." : "Meet the team. Discover CCMI."}
          </h2>
          <p className="mt-6 text-white/70 max-w-md">
            {lang === "fr" 
              ? "Réservez une session de 45 minutes avec nos architectes de plateforme. Nous vous présenterons une démonstration et une évaluation concrète des capacités de CCMI pour votre institution."
              : "Book a 45-minute session with our platform architects. We will present a demonstration and a concrete evaluation of CCMI capabilities for your institution."}
          </p>
        </div>
        <div className="border-l border-mk-bronze/30 pl-8 lg:pl-12">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink px-5 py-4 hover:bg-mk-bronze2 transition-colors text-center font-medium" data-testid="btn-cta-demo">{t("cta.demo")}</Link>
            <Link to={p("/investors")} className="border border-white/40 text-white px-5 py-4 hover:bg-white hover:text-mk-ink transition-colors text-center font-medium">{t("nav.investors")}</Link>
          </div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3">
              <Shield className="w-4 h-4 text-mk-bronze mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              {lang === "fr" ? "Rigueur et conformité réglementaire dès la conception" : "Rigorous regulatory compliance by design"}
            </li>
            <li className="flex gap-3">
              <Building2 className="w-4 h-4 text-mk-bronze mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              {lang === "fr" ? "Plateforme technologique éditée par MK Capital Markets Technologies" : "Technology platform edited by MK Capital Markets Technologies"}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { lang } = useI18n();
  return (
    <>
      <SEO
        title={lang === "fr" ? "Infrastructure institutionnelle pour les marchés de capitaux" : "Institutional capital-markets infrastructure"}
        description={lang === "fr" ? "MK Capital Markets Technologies — plateforme CCMI." : "MK Capital Markets Technologies — CCMI platform."}
        path="/"
      />
      <Hero />
      <ModulesGrid />
      <IndustriesStrip />
      <PartnersStrip />
      <InsightsPreview />
      <ConversionCTA />
    </>
  );
}