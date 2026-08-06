import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";
import { MODULES } from "@/data/modules";
import { INDUSTRIES } from "@/data/industries";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

// Section Chiffres clés / Valeur
const ValueProp = () => {
  const { t, lang } = useI18n();
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        return (await axios.get(`${BACKEND_URL}/api/site/stats`)).data;
      } catch {
        return null;
      }
    },
  });

  const items = [
    { id: "aum", k: `USD ${data?.aum_supported_usd_bn ?? 42}B`, v: L(t("home.value.aum"), lang) || "AUM sous gestion" },
    { id: "exchanges", k: `${data?.exchanges_deployed ?? 6}`, v: L(t("home.value.exchanges"), lang) || "Bourses déployées" },
    { id: "investors", k: `${((data?.investors_managed ?? 1240000) / 1_000_000).toFixed(2)}M`, v: L(t("home.value.investors"), lang) || "Investisseurs gérés" },
    { id: "countries", k: `${data?.countries ?? 14}`, v: L(t("home.value.countries"), lang) || "Pays couverts" },
  ];

  return (
    <section className="bg-mk-paper border-y border-mk-line/10" data-testid="value-prop">
      <div className="container-mk py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="overline mb-4">{L(t("home.value.overline"), lang) || "Impact & Échelle"}</div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            {L(t("home.value.title"), lang) || "Une infrastructure éprouvée pour les marchés émergents."}
          </h2>
        </div>
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-0 border-l border-mk-line/10">
          {items.map((it) => (
            <div key={it.id} className="border-r border-b border-mk-line/10 p-6 md:p-8 last:border-r-0">
              <div className="font-serif text-3xl md:text-4xl text-mk-ink">{it.k}</div>
              <div className="text-xs uppercase tracking-widest text-mk-text2 mt-3">{it.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);

  return (
    <main className="bg-mk-paper text-mk-ink">
      {/* Hero Section */}
      <section className="relative bg-mk-ink text-white py-24 md:py-36 mk-grain" data-testid="home-hero">
        <div className="container-mk relative z-10 max-w-4xl">
          <div className="overline text-mk-bronze mb-6">
            {L(t("home.hero.overline"), lang) || "Infrastructures de Marchés de Capitaux"}
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight mb-8">
            {L(t("home.hero.title"), lang) || "Construire l'infrastucture numérique des marchés émergents."}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
            {L(t("home.hero.description"), lang) || "CCMI offre une suite complète de solutions SaaS pour régulateurs, bourses, banques et émetteurs."}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={p("/solutions")}
              className="bg-mk-bronze text-mk-ink px-6 py-3.5 font-medium hover:bg-mk-bronze2 transition-colors flex items-center gap-2"
            >
              <span>{L(t("cta.solutions"), lang) || "Découvrir la suite CCMI"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={p("/contact")}
              className="border border-white/20 text-white px-6 py-3.5 hover:bg-white/10 transition-colors"
            >
              {L(t("cta.contact"), lang) || "Demander une démo"}
            </Link>
          </div>
        </div>
      </section>

      {/* Section Chiffres */}
      <ValueProp />

      {/* Section Modules / Solutions */}
      <section className="py-20 md:py-32 container-mk">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="overline mb-3">{L(t("home.modules.overline"), lang) || "Suite Modulaire"}</div>
            <h2 className="font-serif text-3xl md:text-5xl">
              {L(t("home.modules.title"), lang) || "Solutions technologiques de pointe"}
            </h2>
          </div>
          <Link to={p("/solutions")} className="text-mk-bronze font-medium flex items-center gap-1 hover:underline">
            <span>{L(t("home.modules.all"), lang) || "Voir tous les modules"}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(MODULES || []).slice(0, 6).map((mod) => (
            <Link
              key={mod.slug}
              to={p(`/solutions/${mod.slug}`)}
              className="group border border-mk-line/10 p-8 hover:border-mk-bronze transition-colors flex flex-col justify-between"
            >
              <div>
                {mod.icon && <mod.icon className="w-8 h-8 text-mk-bronze mb-6" strokeWidth={1.5} />}
                <h3 className="font-serif text-2xl mb-3 group-hover:text-mk-bronze transition-colors">
                  {L(mod.name, lang)}
                </h3>
                <p className="text-sm text-mk-text2 leading-relaxed mb-6">
                  {L(mod.tagline || mod.description, lang)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-mk-bronze">
                <span>{L(t("common.learn_more"), lang) || "En savoir plus"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section Industries */}
      <section className="bg-mk-ink text-white py-20 md:py-32 mk-grain">
        <div className="container-mk">
          <div className="max-w-2xl mb-16">
            <div className="overline text-mk-bronze mb-3">{L(t("home.industries.overline"), lang) || "Secteurs"}</div>
            <h2 className="font-serif text-3xl md:text-5xl mb-6">
              {L(t("home.industries.title"), lang) || "Conçu pour tous les acteurs de l'écosystème"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(INDUSTRIES || []).map((ind) => (
              <Link
                key={ind.slug}
                to={p(`/industries/${ind.slug}`)}
                className="border border-white/10 p-8 hover:border-mk-bronze transition-colors block group"
              >
                {ind.icon && <ind.icon className="w-8 h-8 text-mk-bronze mb-6" strokeWidth={1.5} />}
                <h3 className="font-serif text-xl mb-3 group-hover:text-mk-bronze transition-colors">
                  {L(ind.name, lang)}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {L(ind.lede, lang)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}