import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Play, Building2, Globe, Landmark, Shield } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";
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
      {/* Bronze glow */}
      <div className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full mk-hero-glow" style={{ background: "radial-gradient(circle, rgba(201,169,97,0.28) 0%, rgba(10,22,40,0) 60%)" }} />
      <div className="absolute inset-0 opacity-25" style={{ background: "url('https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg') center/cover", filter: "grayscale(0.6) contrast(1.1)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.85) 60%, rgba(10,22,40,1) 100%)" }} />
      {/* Ticker */}
      <div className="absolute top-0 left-0 right-0 bg-black/40 border-b border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap mk-ticker py-2 text-xs font-mono text-white/60">
          {Array.from({ length: 2 }).flatMap((_, k) => [
            "CCMI · Investor Registry v4.2 released",
            "NGX Lagos · Q4 dividend cycle completed at T+0",
            "MK CMT joins DIFC Fintech Hive Fund IV",
            "Series A · USD 18M · closed 2025",
            "6 exchanges live · 1.24M investors served",
            "Sibos 2026 · Frankfurt · MK CMT speaker session",
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
              {lang === "fr" ? "Voir la démo 2 min" : "Watch the 2-min demo"}
            </button>
          </div>
        </div>
        <div className="lg:col-span-4 hidden lg:block">
          <div className="border-l border-mk-bronze/50 pl-6 space-y-6 text-sm text-white/80 font-mono">
            <div><div className="overline text-white/40">HQ</div><div className="mt-1">DIFC · Dubai</div></div>
            <div><div className="overline text-white/40">Platform</div><div className="mt-1">CCMI v4.2</div></div>
            <div><div className="overline text-white/40">Uptime SLA</div><div className="mt-1">{COMPANY.stats.uptime}</div></div>
            <div><div className="overline text-white/40">Exchanges live</div><div className="mt-1">{COMPANY.stats.exchanges}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueProp = () => {
  const { data } = useQuery({ queryKey: ["stats"], queryFn: async () => (await axios.get(`${BACKEND_URL}/api/site/stats`)).data });
  const items = [
    { k: `USD ${data?.aum_supported_usd_bn ?? 42}B`, v: "AUM supported on platform" },
    { k: `${data?.exchanges_deployed ?? 6}`, v: "Exchanges deployed" },
    { k: `${((data?.investors_managed ?? 1240000) / 1_000_000).toFixed(2)}M`, v: "Investors served" },
    { k: `${data?.countries ?? 14}`, v: "Countries covered" },
  ];
  return (
    <section className="bg-mk-paper border-y border-mk-line/10" data-testid="value-prop">
      <div className="container-mk py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="overline mb-4">The proposition</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Built for regulators. Deployed with issuers. Trusted by institutions.</h2>
        </div>
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-0 border-l border-mk-line/10">
          {items.map((it) => (
            <div key={it.v} className="border-r border-b border-mk-line/10 p-6 md:p-8 last:border-r-0">
              <div className="font-serif text-4xl md:text-5xl text-mk-ink">{it.k}</div>
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
            <div className="overline mb-3">CCMI Platform · Modules</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Six modules. One operating system for capital markets.</h2>
          </div>
          <div className="md:col-span-4 md:pt-8">
            <p className="text-mk-text2">Each module is standalone, API-first, and interoperable. Deploy one, deploy all. Every capability is regulator-audit-ready on day one.</p>
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
              <h3 className="font-serif text-2xl leading-tight mb-3">{m.name}</h3>
              <p className="text-sm text-mk-text2 mb-6 leading-relaxed">{m.tagline}</p>
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
  const { lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <section className="bg-mk-ink text-white py-24 md:py-32 mk-grain" data-testid="industries-strip">
      <div className="container-mk">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-6">
            <div className="overline mb-3">Industries served</div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">From exchanges to sovereign investors — one platform, seven verticals.</h2>
          </div>
          <div className="md:col-span-6 md:pt-8">
            <p className="text-white/70 leading-relaxed">Every workflow you inherit, we've already automated for at least one client. CCMI's compositional architecture means we ship your first module in under 12 weeks.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {INDUSTRIES.map((ind) => (
            <Link key={ind.slug} to={p(`/industries/${ind.slug}`)} className="bg-mk-ink hover:bg-mk-ink2 p-8 group transition-colors" data-testid={`industry-card-${ind.slug}`}>
              <ind.icon className="w-6 h-6 text-mk-bronze mb-6" strokeWidth={1.5} />
              <div className="font-serif text-xl leading-tight text-white">{ind.name}</div>
              <div className="text-sm text-white/60 mt-3 leading-relaxed line-clamp-3">{ind.lede}</div>
              <div className="mt-6 text-xs font-mono uppercase tracking-wider text-mk-bronze group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">Read → </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="bg-mk-paper2 py-24 md:py-32" data-testid="testimonials-section">
    <div className="container-mk grid grid-cols-1 lg:grid-cols-3 gap-8">
      {TESTIMONIALS.map((t, i) => (
        <figure key={i} className="bg-white border border-mk-line/10 p-8 md:p-10 flex flex-col justify-between">
          <blockquote className="font-serif text-xl md:text-2xl leading-snug text-mk-ink">"{t.quote}"</blockquote>
          <figcaption className="mt-8 pt-6 border-t border-mk-line/10">
            <div className="text-sm font-medium">{t.author}</div>
            <div className="text-xs text-mk-text2 uppercase tracking-wider mt-1">{t.org}</div>
          </figcaption>
        </figure>
      ))}
    </div>
    <div className="container-mk mt-16 overflow-hidden">
      <div className="overline text-mk-text2 text-center mb-6">Ecosystem & partners</div>
      <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center items-center">
        {PARTNERS.map((p) => (<div key={p} className="mk-logo font-serif text-lg text-mk-text2 tracking-wide">{p}</div>))}
      </div>
    </div>
  </section>
);

const InsightsPreview = () => {
  const { lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const { data } = useQuery({ queryKey: ["home-articles"], queryFn: async () => (await axios.get(`${BACKEND_URL}/api/articles?limit=3`)).data });
  const items = data?.items || [];
  return (
    <section className="bg-mk-paper py-24 md:py-32" data-testid="insights-preview">
      <div className="container-mk">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="overline mb-3">Insights</div>
            <h2 className="font-serif text-4xl md:text-5xl">Latest from our research desk.</h2>
          </div>
          <Link to={p("/insights")} className="hidden md:inline-flex items-center gap-2 text-sm text-mk-ink hover:text-mk-bronze mk-link">All insights <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((a) => (
            <Link key={a.slug} to={p(`/insights/${a.slug}`)} className="group" data-testid={`insight-card-${a.slug}`}>
              <div className="aspect-[16/10] overflow-hidden bg-mk-ink mb-5">
                <img src={a.cover} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="overline mb-2 text-mk-bronze2">{a.category} · {a.read_minutes} min</div>
              <h3 className="font-serif text-2xl leading-tight group-hover:text-mk-bronze2 transition-colors">{a.title}</h3>
              <p className="text-sm text-mk-text2 mt-3 leading-relaxed">{a.excerpt}</p>
            </Link>
          ))}
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
          <div className="overline mb-4">Next step</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-lg">Meet the team. See CCMI in production.</h2>
          <p className="mt-6 text-white/70 max-w-md">Book a 45-minute session with our platform architects. We'll walk through a live deployment and give you a concrete assessment of what CCMI can do for your institution.</p>
        </div>
        <div className="border-l border-mk-bronze/30 pl-8 lg:pl-12">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink px-5 py-4 hover:bg-mk-bronze2 transition-colors text-center" data-testid="btn-cta-demo">{t("cta.demo")}</Link>
            <Link to={p("/investors")} className="border border-white/40 text-white px-5 py-4 hover:bg-white hover:text-mk-ink transition-colors text-center">{t("nav.investors")}</Link>
          </div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><Shield className="w-4 h-4 text-mk-bronze mt-0.5" strokeWidth={1.5} />Regulator-grade discipline in every deliverable</li>
            <li className="flex gap-3"><Globe className="w-4 h-4 text-mk-bronze mt-0.5" strokeWidth={1.5} />Deployed across 14 countries</li>
            <li className="flex gap-3"><Landmark className="w-4 h-4 text-mk-bronze mt-0.5" strokeWidth={1.5} />Selected by regulators for supervisory data-lakes</li>
            <li className="flex gap-3"><Building2 className="w-4 h-4 text-mk-bronze mt-0.5" strokeWidth={1.5} />DIFC-licensed. ADGM-licensed. ISO 27001 · SOC 2.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <SEO title="Institutional capital-markets infrastructure" description="MK Capital Markets Technologies — CCMI platform. Dubai-engineered, deployed across six exchanges, trusted by regulators and institutional investors." path="/" />
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
