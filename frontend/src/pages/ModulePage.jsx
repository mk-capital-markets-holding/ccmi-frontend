import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Play } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getModule, MODULES } from "@/data/modules";
import { useI18n, localizedPath } from "@/i18n/context";

export default function ModulePage() {
  const { slug } = useParams();
  const { lang, t } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const mod = getModule(slug);
  if (!mod) return <Navigate to={p("/solutions")} replace />;
  const others = MODULES.filter(m => m.slug !== slug).slice(0, 3);

  return (
    <>
      <SEO title={`${mod.name} — CCMI Module`} description={mod.tagline} path={`/solutions/${mod.slug}`} image={mod.screenshot} />

      <section className="bg-mk-ink text-white pt-16 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: "Solutions", to: "/solutions" }, { label: mod.name }]} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="overline mb-4">CCMI Module</div>
              <div className="flex items-center gap-4 mb-6">
                <mod.icon className="w-10 h-10 text-mk-bronze" strokeWidth={1.5} />
                <h1 className="font-serif text-5xl md:text-6xl leading-none">{mod.name}</h1>
              </div>
              <p className="text-2xl text-white/85 font-serif italic max-w-2xl">{mod.tagline}</p>
              <p className="text-white/60 mt-6 max-w-2xl leading-relaxed">{mod.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink px-6 py-3 hover:bg-mk-bronze2 transition-colors" data-testid={`btn-mod-demo-${mod.slug}`}>{t("cta.demo")}</Link>
                <button className="border border-white/40 px-6 py-3 hover:bg-white hover:text-mk-ink transition-colors inline-flex items-center gap-2"><Play className="w-4 h-4" strokeWidth={1.5} /> Watch product tour</button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] bg-mk-ink2 overflow-hidden border border-mk-bronze/30">
                <img src={mod.screenshot} alt={`${mod.name} screenshot`} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits KPIs */}
      <section className="bg-mk-paper border-b border-mk-line/10">
        <div className="container-mk py-16 grid grid-cols-1 md:grid-cols-3 gap-0">
          {mod.benefits.map((b, i) => (
            <div key={b.label} className={`p-8 ${i > 0 ? "md:border-l border-mk-line/15" : ""}`}>
              <div className="font-serif text-5xl md:text-6xl text-mk-ink">{b.kpi}</div>
              <div className="mt-3 overline text-mk-text2">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-mk-paper py-24" data-testid="module-features">
        <div className="container-mk">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14">
            <div className="md:col-span-5"><div className="overline mb-3">Features</div><h2 className="font-serif text-4xl md:text-5xl">Everything that ships with {mod.name}.</h2></div>
            <div className="md:col-span-7 md:pt-6"><p className="text-mk-text2">Enterprise-ready capabilities aligned with local regulator rulebooks. Every feature has a dedicated audit trail, SLA and rollback plan.</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-mk-line/15 border border-mk-line/15">
            {mod.features.map((f) => (
              <div key={f.title} className="bg-mk-paper p-8">
                <CheckCircle2 className="w-5 h-5 text-mk-bronze mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl">{f.title}</h3>
                <p className="text-mk-text2 text-sm mt-3 leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="bg-mk-ink text-white py-24 mk-grain">
        <div className="container-mk">
          <div className="overline mb-3">Architecture</div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight mb-12">Engineered for the regulators reviewing you tomorrow.</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/10 border border-white/10">
            {mod.architecture.map((a, i) => (
              <div key={a} className="bg-mk-ink p-8">
                <div className="font-mono text-mk-bronze text-xs">L{i + 1}</div>
                <div className="font-serif text-lg mt-3">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related modules */}
      <section className="bg-mk-paper2 py-24">
        <div className="container-mk">
          <div className="overline mb-3">Complementary modules</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Deploy {mod.name} alongside:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-mk-line/15 border border-mk-line/15">
            {others.map((o) => (
              <Link key={o.slug} to={p(`/solutions/${o.slug}`)} className="bg-mk-paper2 p-8 hover:bg-white transition-colors group">
                <o.icon className="w-6 h-6 text-mk-bronze mb-4" strokeWidth={1.5} />
                <div className="font-serif text-xl">{o.name}</div>
                <div className="text-sm text-mk-text2 mt-2">{o.tagline}</div>
                <div className="mt-4 text-xs uppercase tracking-widest text-mk-bronze2 group-hover:translate-x-1 transition-transform">Explore →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contextual CTA */}
      <section className="bg-mk-paper py-24">
        <div className="container-mk max-w-4xl">
          <div className="border border-mk-line/20 p-10">
            <div className="overline mb-3">Talk to us</div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">See {mod.name} in a production deployment.</h2>
            <p className="text-mk-text2 mt-4">Our platform architects will walk you through a live client environment, benchmarks, and a concrete deployment plan for your institution.</p>
            <div className="mt-6 flex gap-3">
              <Link to={p("/contact")} className="bg-mk-bronze text-mk-ink px-5 py-3 hover:bg-mk-bronze2 transition-colors">{t("cta.demo")}</Link>
              <Link to={p("/technology")} className="border border-mk-ink px-5 py-3 hover:bg-mk-ink hover:text-white transition-colors">Technology architecture</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
