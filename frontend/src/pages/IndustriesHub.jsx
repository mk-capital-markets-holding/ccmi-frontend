import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { INDUSTRIES } from "@/data/industries";
import { useI18n, localizedPath } from "@/i18n/context";

export default function IndustriesHub() {
  const { lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <>
      <SEO title="Industries — Capital-markets verticals we serve" description="Exchanges · Regulators · Banks · Brokers · Asset Managers · Issuers · Institutional Investors. One platform, seven verticals." path="/industries" />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: "Industries" }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">Industries served</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">From exchanges to sovereign investors — CCMI, configured for your workflow.</h1>
            </div>
            <div className="lg:col-span-4 lg:pt-4 text-white/70">
              <p>Seven verticals. Each with a purpose-built configuration of CCMI modules, deployed in production and referenced by peers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-mk-line/15 border border-mk-line/15">
          {INDUSTRIES.map((ind) => (
            <Link key={ind.slug} to={p(`/industries/${ind.slug}`)} className="group bg-mk-paper p-10 hover:bg-white transition-colors" data-testid={`ind-hub-${ind.slug}`}>
              <ind.icon className="w-8 h-8 text-mk-bronze mb-6" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl md:text-3xl">{ind.name}</h3>
              <p className="text-mk-text2 mt-3 leading-relaxed">{ind.lede}</p>
              <div className="mt-6 border-t border-mk-line/15 pt-4 flex justify-between text-sm">
                <span className="text-mk-bronze2 group-hover:translate-x-1 transition-transform font-mono uppercase tracking-widest">Read →</span>
                <span className="text-mk-text2">{ind.relevantModules.length} modules</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
