import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Award, ScrollText, ArrowUpRight } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { COMPANY, TIMELINE, VALUES } from "@/data/companyInfo";
import { FOUNDER, AFRICA_MARKETS } from "@/data/founder";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";

const StatusChip = ({ status }) => {
  const { t } = useI18n();
  const map = {
    live: { cls: "bg-mk-bronze text-mk-ink", key: "about.status.live" },
    deployment: { cls: "bg-mk-ink text-mk-bronze border border-mk-bronze", key: "about.status.deployment" },
    signed: { cls: "bg-mk-ink2 text-white", key: "about.status.signed" },
    engaged: { cls: "border border-mk-line/30 text-mk-text2", key: "about.status.engaged" },
  };
  const s = map[status] || map.engaged;
  return <span className={`text-[10px] uppercase tracking-widest px-2 py-1 font-mono ${s.cls}`}>{t(s.key)}</span>;
};

export default function About() {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <>
      <SEO
        title={t("bc.about")}
        description={lang === "fr" ? "Fondée au DIFC en 2026, MK Capital Markets Technologies conçoit CCMI, le système d'exploitation des acteurs des marchés de capitaux en Afrique et dans le Golfe." : "Founded in DIFC in 2019, MK Capital Markets Technologies engineers CCMI, the operating system for capital-markets participants in Africa and the Gulf."}
        path="/about"
      />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.about") }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">{t("about.hero.overline")}</div>
              <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">{t("about.hero.title")}</h1>
            </div>
            <div className="lg:col-span-4 lg:pt-4 text-white/70">
              <p>{t("about.hero.lede")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="overline mb-3">{t("about.mission.overline")}</div>
            <h2 className="font-serif text-3xl md:text-4xl leading-snug">{t("about.mission.body")}</h2>
          </div>
          <div>
            <div className="overline mb-3">{t("about.vision.overline")}</div>
            <h2 className="font-serif text-3xl md:text-4xl leading-snug">{t("about.vision.body")}</h2>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper2 py-24" data-testid="about-timeline">
        <div className="container-mk">
          <div className="overline mb-3">{t("about.timeline.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-3xl mb-16">{t("about.timeline.title")}</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-mk-line/20" />
            <ol className="space-y-10">
              {TIMELINE.map((it, i) => (
                <li key={it.year} className={`md:grid md:grid-cols-2 md:gap-16 ${i % 2 === 0 ? "" : "md:direction-rtl"}`}>
                  <div className={`md:${i % 2 === 0 ? "text-right md:pr-16" : "col-start-2 md:pl-16"} relative pl-10 md:pl-0`}>
                    <span className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 bg-mk-bronze block" />
                    <div className="font-serif text-4xl text-mk-ink">{it.year}</div>
                    <div className="mt-1 text-sm font-medium text-mk-bronze2 uppercase tracking-wider">{L(it.title, lang)}</div>
                    <p className="mt-3 text-mk-text2 max-w-md md:max-w-none md:ml-auto">{L(it.body, lang)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24" data-testid="about-founder-block">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] bg-mk-ink2 overflow-hidden">
              <img src={FOUNDER.portrait} alt={FOUNDER.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="overline mb-4">{t("about.founder.overline")}</div>
            <h2 className="font-serif text-5xl leading-tight">{FOUNDER.name}</h2>
            <div className="text-mk-bronze2 mt-2 uppercase tracking-widest text-sm">{L(FOUNDER.role, lang)}</div>
            <blockquote className="mt-8 font-serif text-2xl leading-snug text-mk-ink border-l-2 border-mk-bronze pl-6">"{L(FOUNDER.quotes[0], lang)}"</blockquote>
            <Link to={p("/founder")} className="mt-8 inline-flex items-center gap-2 text-mk-ink hover:text-mk-bronze mk-link">{t("cta.read_full_profile")} <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-mk-ink text-white py-24 mk-grain" data-testid="about-africa-presence">
        <div className="container-mk">
          <div className="overline mb-3">{t("about.africa.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-3xl mb-14">{t("about.africa.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {AFRICA_MARKETS.map((m) => (
              <div key={m.ticker} className="bg-mk-ink hover:bg-mk-ink2 p-6 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-serif text-xl">{L(m.name, lang)}</div>
                    <div className="text-xs font-mono text-white/50 mt-1">{m.ticker}</div>
                  </div>
                  <StatusChip status={m.status} />
                </div>
                <div className="text-xs uppercase tracking-widest text-mk-bronze mt-2">{m.tier === "primary" ? t("about.africa.primary") : t("about.africa.secondary")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24" data-testid="about-values">
        <div className="container-mk">
          <div className="overline mb-3">{t("about.values.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-3xl mb-12">{t("about.values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mk-line/15 border border-mk-line/15">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-mk-paper p-8 md:p-12">
                <div className="font-mono text-xs text-mk-bronze2 uppercase tracking-widest">0{i + 1}</div>
                <h3 className="font-serif text-2xl md:text-3xl mt-3">{L(v.title, lang)}</h3>
                <p className="mt-4 text-mk-text2 leading-relaxed">{L(v.body, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mk-paper2 py-24" data-testid="about-dubai-office">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="overline mb-3">{t("about.dubai.overline")}</div>
            <h2 className="font-serif text-4xl leading-tight">{t("about.dubai.title")}</h2>
            <div className="mt-8 space-y-3 text-mk-text2">
              <div className="flex gap-3"><MapPin className="w-4 h-4 mt-1 text-mk-bronze" strokeWidth={1.5} />{L(COMPANY.hq.address, lang)}</div>
              <div>{t("contact.phone")}: <a href={`tel:${COMPANY.hq.phone.replace(/\s/g, "")}`} className="text-mk-ink hover:text-mk-bronze">{COMPANY.hq.phone}</a></div>
              <div>{t("contact.email")}: <a href={`mailto:${COMPANY.hq.email}`} className="text-mk-ink hover:text-mk-bronze">{COMPANY.hq.email}</a></div>
            </div>
          </div>
          <div className="aspect-video bg-mk-ink border border-mk-line/10">
            <iframe title="MK CMT DIFC HQ" src={COMPANY.hq.mapEmbed(lang)} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24" data-testid="about-licenses">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="overline mb-3"><ScrollText className="w-3 h-3 inline mr-2" strokeWidth={1.5} />{t("about.licenses.overline")}</div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">{t("about.licenses.title")}</h2>
            <ul className="divide-y divide-mk-line/15 border-y border-mk-line/15">
              {COMPANY.licenses.map((l) => (
                <li key={l.number} className="py-5 grid grid-cols-12 gap-3 text-sm">
                  <div className="col-span-3 font-mono text-mk-bronze2">{l.authority}</div>
                  <div className="col-span-5">{L(l.scope, lang)}</div>
                  <div className="col-span-2 font-mono text-mk-text2">{l.number}</div>
                  <div className="col-span-2 font-mono text-mk-text2 text-right">{t("about.licenses.until")} {l.validUntil}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="overline mb-3"><Award className="w-3 h-3 inline mr-2" strokeWidth={1.5} />{t("about.certs.overline")}</div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">{t("about.certs.title")}</h2>
            <ul className="grid grid-cols-2 gap-4">
              {COMPANY.certifications.map((c) => (
                <li key={c.name} className="border border-mk-line/15 p-6">
                  <div className="font-serif text-lg">{c.name}</div>
                  <div className="text-xs text-mk-text2 mt-1">{t("about.certs.issued_by")} {c.issuer}</div>
                  <div className="text-xs font-mono text-mk-bronze2 mt-1">{c.year}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
