import React from "react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FUTURE_MODULES } from "@/data/modules";
import { useI18n } from "@/i18n/context";
import { L } from "@/i18n/pick";

const ROADMAP = [
  { q: "Q2 2026", label: { en: "Documentation & Academy · beta", fr: "Documentation & Academy · beta" }, details: { en: "Interactive learning paths and certification tracks for developers, operators and regulators.", fr: "Parcours d'apprentissage interactifs et pistes de certification pour développeurs, opérateurs et régulateurs." } },
  { q: "Q4 2026", label: { en: "Community & Support Center", fr: "Communauté & Centre de Support" }, details: { en: "Global ticketing, SLA management, community forums, expert marketplace.", fr: "Ticketing global, gestion de SLA, forums communautaires, marketplace d'experts." } },
  { q: "Q1 2027", label: { en: "Marketplace & API Docs", fr: "Marketplace & Docs API" }, details: { en: "Third-party module marketplace with rev-share model and public REST/GraphQL sandbox.", fr: "Marketplace de modules tiers avec modèle de partage de revenus et sandbox public REST/GraphQL." } },
  { q: "Q3 2027", label: { en: "Client & Investor Portals", fr: "Portails Client & Investisseur" }, details: { en: "Multi-tier segmented portals with fine-grained data-room permissions.", fr: "Portails segmentés multi-niveaux avec permissions granulaires de data-room." } },
];

export default function Roadmap() {
  const { t, lang } = useI18n();
  return (
    <>
      <SEO title={t("bc.roadmap")} description={t("roadmap.title")} path="/solutions/roadmap" />

      <section className="bg-mk-ink text-white pt-20 pb-20 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.solutions"), to: "/solutions" }, { label: t("bc.roadmap") }]} />
          <div className="mt-8">
            <div className="overline mb-4">{t("roadmap.overline")}</div>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight max-w-4xl">{t("roadmap.title")}</h1>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-px bg-mk-line/15 border border-mk-line/15">
          {FUTURE_MODULES.map((m, i) => (
            <div key={m.slug} className="bg-mk-paper p-10">
              <div className="flex items-start justify-between mb-6">
                <m.icon className="w-8 h-8 text-mk-bronze" strokeWidth={1.5} />
                <span className="font-mono text-xs text-mk-text2/60">F{i + 1}</span>
              </div>
              <h3 className="font-serif text-3xl">{L(m.name, lang)}</h3>
              <div className="text-sm text-mk-bronze2 uppercase tracking-widest mt-1">{L(m.tagline, lang)}</div>
              <p className="mt-4 text-mk-text2">{L(m.description, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mk-paper2 py-24">
        <div className="container-mk">
          <div className="overline mb-3">{t("roadmap.delivery.overline")}</div>
          <h2 className="font-serif text-4xl mb-10">{t("roadmap.delivery.title")}</h2>
          <ol className="divide-y divide-mk-line/15 border-y border-mk-line/15">
            {ROADMAP.map((r) => (
              <li key={r.q} className="py-6 grid grid-cols-12 gap-4">
                <div className="col-span-3 md:col-span-2 font-mono text-mk-bronze2 text-sm">{r.q}</div>
                <div className="col-span-9 md:col-span-4"><div className="font-serif text-lg">{L(r.label, lang)}</div></div>
                <div className="col-span-12 md:col-span-6 text-mk-text2 text-sm">{L(r.details, lang)}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
