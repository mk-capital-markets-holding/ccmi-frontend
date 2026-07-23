import React from "react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FUTURE_MODULES } from "@/data/modules";

const ROADMAP = [
  { q: "Q2 2026", label: "Documentation & Academy · beta", details: "Interactive learning paths and certification tracks for developers, operators and regulators." },
  { q: "Q4 2026", label: "Community & Support Center", details: "Global ticketing, SLA management, community forums, expert marketplace." },
  { q: "Q1 2027", label: "Marketplace & API Docs", details: "Third-party module marketplace with rev-share model and public REST/GraphQL sandbox." },
  { q: "Q3 2027", label: "Client & Investor Portals", details: "Multi-tier segmented portals with fine-grained data-room permissions." },
];

export default function Roadmap() {
  return (
    <>
      <SEO title="Platform roadmap — Future modules" description="MK CMT roadmap for Phase 2 modules: Documentation & Academy, Community & Support Center, Marketplace & API Docs, Client & Investor Portals." path="/solutions/roadmap" />

      <section className="bg-mk-ink text-white pt-20 pb-20 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: "Solutions", to: "/solutions" }, { label: "Roadmap" }]} />
          <div className="mt-8">
            <div className="overline mb-4">Phase 2 · 2026 – 2027</div>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight max-w-4xl">Extending the CCMI ecosystem beyond the core.</h1>
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
              <h3 className="font-serif text-3xl">{m.name}</h3>
              <div className="text-sm text-mk-bronze2 uppercase tracking-widest mt-1">{m.tagline}</div>
              <p className="mt-4 text-mk-text2">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mk-paper2 py-24">
        <div className="container-mk">
          <div className="overline mb-3">Delivery schedule</div>
          <h2 className="font-serif text-4xl mb-10">Quarter-by-quarter.</h2>
          <ol className="divide-y divide-mk-line/15 border-y border-mk-line/15">
            {ROADMAP.map((r) => (
              <li key={r.q} className="py-6 grid grid-cols-12 gap-4">
                <div className="col-span-3 md:col-span-2 font-mono text-mk-bronze2 text-sm">{r.q}</div>
                <div className="col-span-9 md:col-span-4"><div className="font-serif text-lg">{r.label}</div></div>
                <div className="col-span-12 md:col-span-6 text-mk-text2 text-sm">{r.details}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
