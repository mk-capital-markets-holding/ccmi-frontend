import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MODULES, FUTURE_MODULES } from "@/data/modules";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";

export default function SolutionsHub() {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);

  return (
    <>
      <SEO title={t("nav.solutions")} description={t("sol.lede")} path="/solutions" />
      
      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.solutions") }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">{t("sol.overline")}</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">{t("sol.title")}</h1>
            </div>
            <div className="lg:col-span-4 lg:pt-4 text-white/70">
              <p>{t("sol.lede")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-mk-line/15 border border-mk-line/15">
          {MODULES.map((m, i) => (
            <Link key={m.slug} to={p(`/solutions/${m.slug}`)} className="group bg-mk-paper p-10 hover:bg-white transition-colors" data-testid={`sol-hub-${m.slug}`}>
              <div className="flex justify-between mb-6">
                <m.icon className="w-8 h-8 text-mk-bronze" strokeWidth={1.5} />
                <span className="font-mono text-xs text-mk-text2/60">0{i + 1}</span>
              </div>
              <h3 className="font-serif text-3xl leading-tight mb-3">{L(m.name, lang)}</h3>
              <p className="text-mk-text2 mb-6 leading-relaxed">{L(m.tagline, lang)}</p>
              <div className="border-t border-mk-line/15 pt-5 flex items-center justify-between text-sm">
                <span className="text-mk-bronze2 group-hover:translate-x-1 transition-transform font-mono uppercase tracking-widest">{t("sol.explore")}</span>
                <span className="text-mk-text2">{m.benefits.length} {t("sol.kpi_count")}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-mk-paper2 py-24" data-testid="future-modules-strip">
        <div className="container-mk">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-6">
              <div className="overline mb-3"><Layers className="w-3 h-3 inline mr-2" strokeWidth={1.5} />{t("sol.roadmap.overline")}</div>
              <h2 className="font-serif text-4xl md:text-5xl">{t("sol.roadmap.title")}</h2>
            </div>
            <div className="md:col-span-6 md:pt-6"><p className="text-mk-text2">{t("sol.roadmap.lede")}</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mk-line/15 border border-mk-line/15">
            {FUTURE_MODULES.map((m) => (
              <div key={m.slug} className="bg-mk-paper2 p-10">
                <m.icon className="w-6 h-6 text-mk-bronze2 mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl">{L(m.name, lang)}</h3>
                <div className="text-sm text-mk-bronze2 uppercase tracking-widest mt-1">{L(m.tagline, lang)}</div>
                <p className="text-mk-text2 mt-3">{L(m.description, lang)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to={p("/solutions/roadmap")} className="inline-flex items-center gap-2 text-mk-ink hover:text-mk-bronze mk-link">{t("cta.full_roadmap")} <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}