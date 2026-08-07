import React from "react";
import { Cloud, ShieldCheck, Layers, Plug, GitBranch } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n } from "@/i18n/context";

const PILLARS = [
  { icon: Cloud, keyPrefix: "tech.pillar1" },
  { icon: ShieldCheck, keyPrefix: "tech.pillar2" },
  { icon: Layers, keyPrefix: "tech.pillar3" },
  { icon: Plug, keyPrefix: "tech.pillar4" },
  { icon: GitBranch, keyPrefix: "tech.pillar5" },
];

export default function Technology() {
  const { t } = useI18n();

  return (
    <>
      <SEO title={t("nav.technology")} description={t("tech.lede")} path="/technology" />

      {/* Hero Section — Clean et 100 % lié aux traductions FR */}
      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.technology") }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">{t("tech.overline")}</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">
                {t("tech.title")}
              </h1>
            </div>
            <div className="lg:col-span-4 text-white/70 lg:pt-4">
              <p>{t("tech.lede")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section des Piliers Techniques (P1 à P5) */}
      <section className="bg-mk-paper py-24" data-testid="tech-pillars">
        <div className="container-mk space-y-16">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            const details = ["d1", "d2", "d3", "d4"].map((d) => t(`${p.keyPrefix}.${d}`));
            return (
              <article
                key={p.keyPrefix}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-16 ${
                  i < PILLARS.length - 1 ? "border-b border-mk-line/15" : ""
                }`}
                data-testid={`tech-pillar-${i + 1}`}
              >
                <div className="lg:col-span-1 font-mono text-mk-bronze2 text-sm">
                  P{i + 1}
                </div>
                <div className="lg:col-span-4">
                  <Icon className="w-8 h-8 text-mk-bronze mb-4" strokeWidth={1.5} />
                  <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                    {t(`${p.keyPrefix}.title`)}
                  </h2>
                  <div className="text-mk-bronze2 uppercase tracking-widest text-sm mt-2">
                    {t(`${p.keyPrefix}.tagline`)}
                  </div>
                </div>
                <ul className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.map((d, di) => (
                    <li key={di} className="border-l-2 border-mk-bronze/40 pl-4 text-mk-text py-1">
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}