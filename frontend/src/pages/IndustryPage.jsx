import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getIndustry } from "@/data/industries";
import { MODULES } from "@/data/modules";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";

export default function IndustryPage() {
  const { slug } = useParams();
  const { lang, t } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const ind = getIndustry(slug);
  
  if (!ind) return <Navigate to={p("/industries")} replace />;
  
  const modules = ind.relevantModules.map(s => MODULES.find(m => m.slug === s)).filter(Boolean);
  const indName = L(ind.name, lang);

  return (
    <>
      <SEO title={`${indName} — CCMI`} description={L(ind.lede, lang)} path={`/industries/${ind.slug}`} image={ind.heroImg} />

      {/* Hero Section */}
      <section className="bg-mk-ink text-white pt-16 pb-24 mk-grain relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: `url(${ind.heroImg}) center/cover`, filter: "grayscale(0.7)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,22,40,0.7), rgba(10,22,40,0.95))" }} />
        <div className="container-mk relative">
          <Breadcrumbs items={[{ label: t("bc.industries"), to: "/industries" }, { label: indName }]} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">{t("indp.overline")}</div>
              <div className="flex items-center gap-4 mb-4">
                <ind.icon className="w-10 h-10 text-mk-bronze" strokeWidth={1.5} />
                <h1 className="font-serif text-5xl md:text-6xl leading-none">{indName}</h1>
              </div>
              <p className="text-xl text-white/85 max-w-2xl leading-relaxed">{L(ind.lede, lang)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Defis et Solutions */}
      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-2 gap-0 border border-mk-line/15">
          <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-mk-line/15">
            <div className="overline mb-3">{t("indp.challenges.overline")}</div>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">{t("indp.challenges.title")}</h2>
            <ul className="space-y-5">
              {ind.challenges.map((c, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-xs text-mk-bronze2 pt-1">C{i + 1}</span>
                  <span className="text-mk-text">{L(c, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 md:p-14 bg-mk-ink text-white mk-grain">
            <div className="overline text-white mb-3">{t("indp.solutions.overline")}</div>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">{t("indp.solutions.title")}</h2>
            <ul className="space-y-5">
              {ind.solutions.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-xs text-mk-bronze pt-1">S{i + 1}</span>
                  <span className="text-white/85">{L(s, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Piliers de valeur (Qualitatif - Sans faux chiffres) */}
      <section className="bg-mk-paper2 py-16">
        <div className="container-mk grid grid-cols-1 md:grid-cols-3 gap-0 border border-mk-line/15">
          {ind.benefits.map((b, i) => (
            <div key={i} className={`p-10 ${i > 0 ? "md:border-l border-mk-line/15" : ""}`}>
              <div className="font-serif text-2xl font-bold text-mk-ink uppercase tracking-wide">
                {L(b.label, lang)}
              </div>
              <div className="mt-3 text-sm text-mk-text2 leading-relaxed">
                {b.desc ? L(b.desc, lang) : L(b.label, lang)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules associes */}
      <section className="bg-mk-paper py-24">
        <div className="container-mk">
          <div className="overline mb-3">{t("indp.modules.overline")}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{t("indp.modules.title_prefix")} {indName}.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-mk-line/15 border border-mk-line/15">
            {modules.map((m) => (
              <Link key={m.slug} to={p(`/solutions/${m.slug}`)} className="group bg-mk-paper p-8 hover:bg-white transition-colors">
                <m.icon className="w-6 h-6 text-mk-bronze mb-4" strokeWidth={1.5} />
                <div className="font-serif text-xl">{L(m.name, lang)}</div>
                <div className="text-sm text-mk-text2 mt-2">{L(m.tagline, lang)}</div>
                <div className="mt-4 text-xs uppercase tracking-widest text-mk-bronze2 group-hover:translate-x-1 transition-transform">{t("sol.explore")}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Appel a l'action Institutionnel (Replaces Case Study) */}
      <section className="bg-mk-ink text-white py-24 mk-grain">
        <div className="container-mk max-w-4xl">
          <div className="overline mb-3">Déploiement & Projets Pilotes</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Modernisez vos infrastructures financières dès aujourd'hui
          </h2>
          <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-white/90 border-l-2 border-mk-bronze pl-6">
            Découvrez comment l'architecture modulaire CCMI s'adapte à vos contraintes réglementaires et opérationnelles.
          </blockquote>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink font-medium px-6 py-3 hover:bg-mk-bronze2 transition-colors">
              Demander une démonstration
            </Link>
            <Link to={p("/industries")} className="border border-white/40 px-6 py-3 hover:bg-white hover:text-mk-ink transition-colors">
              {t("cta.all_industries")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}