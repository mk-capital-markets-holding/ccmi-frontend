import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Play, Building2, Globe, Landmark, Shield } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";
import SEO from "@/components/common/SEO";
import { MODULES } from "@/data/modules";
import { INDUSTRIES } from "@/data/industries";
import { TESTIMONIALS, COMPANY, PARTNERS } from "@/data/companyInfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Hero = () => {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <section className="relative bg-mk-ink text-white overflow-hidden mk-grain min-h-[86vh] flex items-end" data-testid="home-hero">
      <div className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full mk-hero-glow" style={{ background: "radial-gradient(circle, rgba(201,169,97,0.28) 0%, rgba(10,22,40,0) 60%)" }} />
      <div className="absolute inset-0 opacity-25" style={{ background: "url('https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg') center/cover", filter: "grayscale(0.6) contrast(1.1)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.85) 60%, rgba(10,22,40,1) 100%)" }} />
      <div className="absolute top-0 left-0 right-0 bg-black/40 border-b border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap mk-ticker py-2 text-xs font-mono text-white/60">
          {Array.from({ length: 2 }).flatMap((_, k) => [
            t("hero.ticker_1"), t("hero.ticker_2"), t("hero.ticker_3"),
            t("hero.ticker_4"), t("hero.ticker_5"), t("hero.ticker_6"),
          ].map((s, i) => <span key={`${k}-${i}`} className="px-8">{s}<span className="text-mk-bronze ml-8">◆</span></span>))}
        </div>
      </div>

      <div className="container-mk relative py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <div className="overline mb-8" data-testid="hero-kicker">{t("hero.kicker")}</div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-white max-w-5xl" data-testid="hero-title">
            {t("hero.title")}
          </h1>
          <p className="mt-8 text-lg text-white/70 max-w-2xl leading-relaxed" data-testid="hero-lede">{t("hero.lede")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink font-medium px-6 py-3.5 hover:bg-mk-bronze2 transition-colors inline-flex items-center gap-2" data-testid="btn-hero-demo">
              {t("cta.demo")} <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link to={p("/contact")} className="border border-white/40 text-white px-6 py-3.5 hover:bg-white hover:text-mk-ink transition-colors inline-flex items-center gap-2" data-testid="btn-hero-contact">
              {t("cta.contact")}
            </Link>
            <button className="text-white/70 px-2 py-3.5 hover:text-mk-bronze transition-colors inline-flex items-center gap-2 text-sm" data-testid="btn-hero-play">
              <span className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center"><Play className="w-3.5 h-3.5" /></span>
              {t("cta.watch_demo")}
            </button>
          </div>
        </div>
        <div className="lg:col-span-4 hidden lg:block">
          <div className="border-l border-mk-bronze/50 pl-6 space-y-6 text-sm text-white/80 font-mono">
            <div><div className="overline text-white/40">{t("hero.hq")}</div><div className="mt-1">DIFC · Dubai</div></div>
            <div><div className="overline text-white/40">{t("hero.platform")}</div><div className="mt-1">CCMI Enterprise</div></div>
            <div><div className="overline text-white/40">{lang === "fr" ? "CADRE RÉGLEMENTAIRE" : "REGULATORY FRAMEWORK"}</div><div className="mt-1">COSUMAF / OHADA</div></div>
            <div><div className="overline text-white/40">{lang === "fr" ? "ARCHITECTURE CLOUD" : "CLOUD ARCHITECTURE"}</div><div className="mt-1">Microsoft Azure</div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueProp = () => {
  const { t, lang } = useI18n();
  const items = [
    { id: "difc", k: "DIFC", v: lang === "fr" ? "Hub & Juridiction" : "Jurisdiction & Hub" },
    { id: "cosumaf", k: "COSUMAF", v: lang === "fr" ? "Standards Réglementaires" : "Regulatory Framework" },
    { id: "azure", k: "Azure", v: lang === "fr" ? "Infrastructure Enterprise" : "Enterprise Infrastructure" },
    { id: "sla", k: "99.97%", v: lang === "fr" ? "Cible Disponibilité SLA" : "Target Uptime SLA" },
  ];
  return (
    <section className="bg-mk-paper border-y border-mk-line/10" data-testid="value-prop">
      <div className="container-mk py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="overline mb-4">{t("home.value.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">{t("home.value.title")}</h2>
        </div>
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-0 border-l border-mk-line/10">
          {items.map((it) => (
            <div key={it.id} className="border-r border-b border-mk-line/10 p-6 md:p-8 last:border-r-0">
              <div className="font-serif text-3xl md:text-4xl text-mk-ink font-bold">{it.k}</div>
              <div className="text-xs uppercase tracking-widest text-mk-text2 mt-3">{it.v}</div>
            </div>
          ))}
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

const Testimonials = () => {
  const { t, lang } = useI18n();
  return (
    <section className="bg-mk-paper2 py-24 md:py-32" data-testid="testimonials-section">
      <div className="container-mk grid grid-cols-1 lg:grid-cols-2 gap-8">
        {TESTIMONIALS.map((tm, i) => (
          <figure key={i} className="bg-white border border-mk-line/10 p-8 md:p-10 flex flex-col justify-between">
            <blockquote className="font-serif text-xl md:text-2xl leading-snug text-mk-ink">"{L(tm.quote, lang)}"</blockquote>
            <figcaption className="mt-8 pt-6 border-t border-mk-line/10">
              <div className="text-sm font-medium">{L(tm.author, lang)}</div>
              <div className="text-xs text-mk-text2 uppercase tracking-wider mt-1">{L(tm.role, lang)}</div>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="container-mk mt-16 overflow-hidden">
        <div className="overline text-mk-text2 text-center mb-6">
          {t("home.partners.overline")}
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center items-center">
          {PARTNERS.map((pn, idx) => (
            <div
              key={typeof pn === "object" ? pn.name || idx : idx}
              className="mk-logo font-serif text-lg text-mk-text2 tracking-wide"
            >
              {typeof pn === "object" ? pn.name : pn}
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
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-lg">{t("home.cta.title")}</h2>
          <p className="mt-6 text-white/70 max-w-md">{t("home.cta.lede")}</p>
        </div>
        <div className="border-l border-mk-bronze/30 pl-8 lg:pl-12">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink px-5 py-4 hover:bg-mk-bronze2 transition-colors text-center font-medium" data-testid="btn-cta-demo">{t("cta.demo")}</Link>
            <Link to={p("/investors")} className="border border-white/40 text-white px-5 py-4 hover:bg-white hover:text-mk-ink transition-colors text-center font-medium">{t("nav.investors")}</Link>
          </div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><Shield className="w-4 h-4 text-mk-bronze mt-0.5" strokeWidth={1.5} />{t("home.cta.bullet_1")}</li>
            <li className="flex gap-3"><Globe className="w-4 h-4 text-mk-bronze mt-0.5" strokeWidth={1.5} />{t("home.cta.bullet_2")}</li>
            <li className="flex gap-3"><Landmark className="w-4 h-4 text-mk-bronze mt-0.5" strokeWidth={1.5} />{t("home.cta.bullet_3")}</li>
            <li className="flex gap-3"><Building2 className="w-4 h-4 text-mk-bronze mt-0.5" strokeWidth={1.5} />{t("home.cta.bullet_4")}</li>
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
        description={lang === "fr" ? "MK Capital Markets Technologies — plateforme CCMI. Conçue à Dubaï, conçue pour les régulateurs et investisseurs institutionnels de la zone CEMAC." : "MK Capital Markets Technologies — CCMI platform. Dubai-engineered, designed for regulators and institutional investors in the CEMAC region."}
        path="/"
      />
      <Hero />
      <ValueProp />
      <ModulesGrid />
      <IndustriesStrip />
      <Testimonials />
      <InsightsPreview />
      <ConversionCTA />
    </>
  );
}