import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Play } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getModule, MODULES } from "@/data/modules";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";

export default function ModulePage() {
  const { slug } = useParams();
  const { lang, t } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const mod = getModule(slug);
  if (!mod) return <Navigate to={p("/solutions")} replace />;
  const others = MODULES.filter(m => m.slug !== slug).slice(0, 3);
  const modName = L(mod.name, lang);

  return (
    <>
      <SEO title={`${modName} — CCMI`} description={L(mod.tagline, lang)} path={`/solutions/${mod.slug}`} image={mod.screenshot} />

      <section className="bg-mk-ink text-white pt-16 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.solutions"), to: "/solutions" }, { label: modName }]} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="overline mb-4">{t("mod.overline")}</div>
              <div className="flex items-center gap-4 mb-6">
                <mod.icon className="w-10 h-10 text-mk-bronze" strokeWidth={1.5} />
                <h1 className="font-serif text-5xl md:text-6xl leading-none">{modName}</h1>
              </div>
              <p className="text-2xl text-white/85 font-serif italic max-w-2xl">{L(mod.tagline, lang)}</p>
              <p className="text-white/60 mt-6 max-w-2xl leading-relaxed">{L(mod.description, lang)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink px-6 py-3 hover:bg-mk-bronze2 transition-colors" data-testid={`btn-mod-demo-${mod.slug}`}>{t("cta.demo")}</Link>
                <button className="border border-white/40 px-6 py-3 hover:bg-white hover:text-mk-ink transition-colors inline-flex items-center gap-2"><Play className="w-4 h-4" strokeWidth={1.5} /> {t("cta.watch_tour")}</button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] bg-mk-ink2 overflow-hidden border border-mk-bronze/30">
                <img src={mod.screenshot} alt={`${modName} screenshot`} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper border-b border-mk-line/10">
        <div className="container-mk py-16 grid grid-cols-1 md:grid-cols-3 gap-0">
          {mod.benefits.map((b, i) => (
            <div key={i} className={`p-8 ${i > 0 ? "md:border-l border-mk-line/15" : ""}`}>
              <div className="font-serif text-5xl md:text-6xl text-mk-ink">{b.kpi}</div>
              <div className="mt-3 overline text-mk-text2">{L(b.label, lang)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mk-paper py-24" data-testid="module-features">
        <div className="container-mk">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14">
            <div className="md:col-span-5"><div className="overline mb-3">{t("mod.features.overline")}</div><h2 className="font-serif text-4xl md:text-5xl">{t("mod.features.title_prefix")} {modName}.</h2></div>
            <div className="md:col-span-7 md:pt-6"><p className="text-mk-text2">{t("mod.features.lede")}</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-mk-line/15 border border-mk-line/15">
            {mod.features.map((f, i) => (
              <div key={i} className="bg-mk-paper p-8">
                <CheckCircle2 className="w-5 h-5 text-mk-bronze mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl">{L(f.title, lang)}</h3>
                <p className="text-mk-text2 text-sm mt-3 leading-relaxed">{L(f.detail, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mk-ink text-white py-24 mk-grain">
        <div className="container-mk">
          <div className="overline mb-3">{t("mod.arch.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight mb-12">{t("mod.arch.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/10 border border-white/10">
            {mod.architecture.map((a, i) => (
              <div key={i} className="bg-mk-ink p-8">
                <div className="font-mono text-mk-bronze text-xs">L{i + 1}</div>
                <div className="font-serif text-lg mt-3">{L(a, lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mk-paper2 py-24">
        <div className="container-mk">
          <div className="overline mb-3">{t("mod.related.overline")}</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{t("mod.related.title_prefix")} {modName} {t("mod.related.title_suffix")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-mk-line/15 border border-mk-line/15">
            {others.map((o) => (
              <Link key={o.slug} to={p(`/solutions/${o.slug}`)} className="bg-mk-paper2 p-8 hover:bg-white transition-colors group">
                <o.icon className="w-6 h-6 text-mk-bronze mb-4" strokeWidth={1.5} />
                <div className="font-serif text-xl">{L(o.name, lang)}</div>
                <div className="text-sm text-mk-text2 mt-2">{L(o.tagline, lang)}</div>
                <div className="mt-4 text-xs uppercase tracking-widest text-mk-bronze2 group-hover:translate-x-1 transition-transform">{t("sol.explore")}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk max-w-4xl">
          <div className="border border-mk-line/20 p-10">
            <div className="overline mb-3">{t("mod.cta.overline")}</div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">{t("mod.cta.title_prefix")} {modName} {t("mod.cta.title_suffix")}</h2>
            <p className="text-mk-text2 mt-4">{t("mod.cta.lede")}</p>
            <div className="mt-6 flex gap-3">
              <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink px-5 py-3 hover:bg-mk-bronze2 transition-colors">{t("cta.demo")}</Link>
              <Link to={p("/technology")} className="border border-mk-ink px-5 py-3 hover:bg-mk-ink hover:text-white transition-colors">{t("mod.cta.arch")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
