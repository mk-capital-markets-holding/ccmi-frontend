import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Award, ScrollText, ArrowUpRight } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { COMPANY, TIMELINE, VALUES } from "@/data/companyInfo";
import { FOUNDER } from "@/data/founder";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";

export default function About() {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);

  const missionText =
    lang === "fr"
      ? "Servir de référentiel maître et unique pour la gestion des identités, en orchestrant l'intégralité du cycle de vie des participants et leur conformité dynamique au sein d'un écosystème hautement sécurisé."
      : "Serve as the single master repository for identity management, orchestrating the complete participant lifecycle and dynamic compliance within a highly secure ecosystem.";

  const visionText =
    lang === "fr"
      ? "Moderniser et centraliser les infrastructures des marchés de capitaux grâce à un système d'information unifié, garantissant une conformité automatisée, une traçabilité totale et une agilité opérationnelle sans compromis."
      : "Modernize and centralize capital market infrastructures through a unified information system, ensuring automated compliance, full auditability, and uncompromised operational agility.";

  return (
    <>
      <SEO
        title={t("bc.about")}
        description={
          lang === "fr"
            ? "MK Capital Markets Technologies développe CCMI, la plateforme d'infrastructures de marchés pour la gestion du cycle de vie des parties et de la conformité."
            : "MK Capital Markets Technologies engineers CCMI, the market infrastructure platform for party lifecycle and compliance management."
        }
        path="/about"
      />

      {/* HERO SECTION */}
      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.about") }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">{t("about.hero.overline")}</div>
              <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">
                {t("about.hero.title")}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pt-4 text-white/70">
              <p>{t("about.hero.lede")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="overline mb-3">{t("about.mission.overline")}</div>
            <h2 className="font-serif text-2xl md:text-3xl leading-relaxed text-mk-ink">
              {missionText}
            </h2>
          </div>
          <div>
            <div className="overline mb-3">{t("about.vision.overline")}</div>
            <h2 className="font-serif text-2xl md:text-3xl leading-relaxed text-mk-ink">
              {visionText}
            </h2>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION (Format épuré : Années + Grandes lignes uniquement) */}
      <section className="bg-mk-paper2 py-24" data-testid="about-timeline">
        <div className="container-mk">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-mk-line/20" />
            <ol className="space-y-12">
              {TIMELINE.map((it, i) => (
                <li
                  key={it.year}
                  className={`md:grid md:grid-cols-2 md:gap-16 ${
                    i % 2 === 0 ? "" : "md:direction-rtl"
                  }`}
                >
                  <div
                    className={`md:${
                      i % 2 === 0
                        ? "text-right md:pr-16"
                        : "col-start-2 md:pl-16"
                    } relative pl-10 md:pl-0 flex flex-col justify-center`}
                  >
                    <span className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 bg-mk-bronze block" />
                    <div className="font-serif text-4xl md:text-5xl text-mk-ink font-medium">
                      {it.year}
                    </div>
                    <div className="mt-2 text-sm font-medium text-mk-bronze2 uppercase tracking-wider">
                      {L(it.title, lang)}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FOUNDER BLOCK */}
      <section className="bg-mk-paper py-24" data-testid="about-founder-block">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] bg-mk-ink2 overflow-hidden">
              <img
                src={FOUNDER.portrait}
                alt={FOUNDER.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="overline mb-4">{t("about.founder.overline")}</div>
            <h2 className="font-serif text-5xl leading-tight">
              {FOUNDER.name}
            </h2>
            <div className="text-mk-bronze2 mt-2 uppercase tracking-widest text-sm">
              {L(FOUNDER.role, lang)}
            </div>
            <blockquote className="mt-8 font-serif text-2xl leading-snug text-mk-ink border-l-2 border-mk-bronze pl-6">
              "{L(FOUNDER.quotes[0], lang)}"
            </blockquote>
            <Link
              to={p("/founder")}
              className="mt-8 inline-flex items-center gap-2 text-mk-ink hover:text-mk-bronze mk-link"
            >
              {t("cta.read_full_profile")}{" "}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="bg-mk-paper py-24" data-testid="about-values">
        <div className="container-mk">
          <div className="overline mb-3">{t("about.values.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-3xl mb-12">
            {t("about.values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mk-line/15 border border-mk-line/15">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-mk-paper p-8 md:p-12">
                <div className="font-mono text-xs text-mk-bronze2 uppercase tracking-widest">
                  0{i + 1}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl mt-3">
                  {L(v.title, lang)}
                </h3>
                <p className="mt-4 text-mk-text2 leading-relaxed">
                  {L(v.body, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUBAI OFFICE SECTION */}
      <section className="bg-mk-paper2 py-24" data-testid="about-dubai-office">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="overline mb-3">{t("about.dubai.overline")}</div>
            <h2 className="font-serif text-4xl leading-tight">
              {t("about.dubai.title")}
            </h2>
            <div className="mt-8 space-y-3 text-mk-text2">
              <div className="flex gap-3">
                <MapPin
                  className="w-4 h-4 mt-1 text-mk-bronze"
                  strokeWidth={1.5}
                />
                {L(COMPANY.hq.address, lang)}
              </div>
              <div>
                {t("contact.phone")}:{" "}
                <a
                  href={`tel:${COMPANY.hq.phone.replace(/\s/g, "")}`}
                  className="text-mk-ink hover:text-mk-bronze"
                >
                  {COMPANY.hq.phone}
                </a>
              </div>
              <div>
                {t("contact.email")}:{" "}
                <a
                  href={`mailto:${COMPANY.hq.email}`}
                  className="text-mk-ink hover:text-mk-bronze"
                >
                  {COMPANY.hq.email}
                </a>
              </div>
            </div>
          </div>
          <div className="aspect-video bg-mk-ink border border-mk-line/10">
            <iframe
              title="MK CMT DIFC HQ"
              src={COMPANY.hq.mapEmbed(lang)}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* LICENSES & CERTS SECTION */}
      <section className="bg-mk-paper py-24" data-testid="about-licenses">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="overline mb-3">
              <ScrollText
                className="w-3 h-3 inline mr-2"
                strokeWidth={1.5}
              />
              {t("about.licenses.overline")}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              {t("about.licenses.title")}
            </h2>
            <ul className="divide-y divide-mk-line/15 border-y border-mk-line/15">
              {COMPANY.licenses.map((l) => (
                <li
                  key={l.number}
                  className="py-5 grid grid-cols-12 gap-3 text-sm"
                >
                  <div className="col-span-3 font-mono text-mk-bronze2">
                    {l.authority}
                  </div>
                  <div className="col-span-5">{L(l.scope, lang)}</div>
                  <div className="col-span-2 font-mono text-mk-text2">
                    {l.number}
                  </div>
                  <div className="col-span-2 font-mono text-mk-text2 text-right">
                    {t("about.licenses.until")} {l.validUntil}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="overline mb-3">
              <Award className="w-3 h-3 inline mr-2" strokeWidth={1.5} />
              {t("about.certs.overline")}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              {t("about.certs.title")}
            </h2>
            <ul className="grid grid-cols-2 gap-4">
              {COMPANY.certifications.map((c) => (
                <li key={c.name} className="border border-mk-line/15 p-6">
                  <div className="font-serif text-lg">{c.name}</div>
                  <div className="text-xs text-mk-text2 mt-1">
                    {t("about.certs.issued_by")} {c.issuer}
                  </div>
                  <div className="text-xs font-mono text-mk-bronze2 mt-1">
                    {c.year}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}