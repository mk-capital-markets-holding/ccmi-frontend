import React from "react";
import { ArrowUpRight, Linkedin } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FOUNDER } from "@/data/founder";
import { useI18n } from "@/i18n/context";
import { L } from "@/i18n/pick";

export default function Founder() {
  const { t, lang } = useI18n();
  return (
    <>
      <SEO title={`${t("nav.founder")} — ${FOUNDER.name}`} description={lang === "fr" ? "Florent Makanda, Fondateur & CEO de MK Capital Markets Holdings." : "Florent Makanda, Founder & CEO of MK Capital Markets Holdings."} path="/founder" />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.founder") }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5">
              <div className="aspect-[3/4] bg-mk-ink2 overflow-hidden">
                <img src={FOUNDER.portrait} alt={FOUNDER.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="overline mb-4">{t("founder.overline")}</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-none">{FOUNDER.name}</h1>
              <div className="mt-4 text-mk-bronze2 uppercase tracking-widest text-sm">{L(FOUNDER.role, lang)} · {L(FOUNDER.location, lang)}</div>
              <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-white hover:text-mk-bronze mk-link" data-testid="founder-linkedin"><Linkedin className="w-4 h-4" strokeWidth={1.5} /> {t("founder.linkedin")}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="overline mb-3">{t("founder.bio.overline")}</div>
            <div className="space-y-6 text-lg leading-relaxed text-mk-text max-w-3xl">
              {FOUNDER.bio.map((p, i) => <p key={i}>{L(p, lang)}</p>)}
            </div>
            <blockquote className="mt-12 font-serif text-3xl leading-tight text-mk-ink border-l-2 border-mk-bronze pl-6 max-w-3xl">"{L(FOUNDER.quotes[1], lang)}"</blockquote>
          </div>
          <div className="lg:col-span-4">
            <div className="border-l border-mk-line/15 pl-8 space-y-8">
              <div>
                <div className="overline mb-3">{t("founder.awards.overline")}</div>
                <ul className="space-y-3 text-sm">{FOUNDER.awards.map((a, i) => <li key={i} className="text-mk-text2">— {L(a, lang)}</li>)}</ul>
              </div>
              <div>
                <div className="overline mb-3">{t("founder.upcoming.overline")}</div>
                <ul className="divide-y divide-mk-line/15">
                  {FOUNDER.upcoming.map((u) => (
                    <li key={u.event} className="py-3">
                      <div className="font-serif text-lg">{u.event}</div>
                      <div className="text-xs font-mono text-mk-text2">{L(u.city, lang)} · {u.date}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper2 py-24" data-testid="founder-career">
        <div className="container-mk">
          <div className="overline mb-3">{t("founder.career.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-12">{t("founder.career.title")}</h2>
          <ol className="divide-y divide-mk-line/15 border-y border-mk-line/15 max-w-4xl">
            {FOUNDER.career.map((c, i) => (
              <li key={i} className="py-6 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3 font-mono text-mk-bronze2 text-sm">{c.period}</div>
                <div className="col-span-12 md:col-span-6"><div className="font-serif text-lg">{L(c.org, lang)}</div></div>
                <div className="col-span-12 md:col-span-3 text-mk-text2 text-sm md:text-right">{L(c.role, lang)}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk">
          <div className="overline mb-3">{t("founder.media.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-12">{t("founder.media.title")}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mk-line/15 border border-mk-line/15">
            {FOUNDER.media.map((m, i) => (
              <li key={i} className="bg-mk-paper p-8 flex items-start justify-between gap-8 hover:bg-white transition-colors">
                <div>
                  <div className="font-mono text-xs text-mk-bronze2 uppercase tracking-widest">{m.outlet}</div>
                  <div className="font-serif text-xl mt-2 leading-snug">{L(m.title, lang)}</div>
                  <div className="text-xs font-mono text-mk-text2 mt-2">{m.date}</div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-mk-text2 shrink-0 mt-1" strokeWidth={1.5} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
