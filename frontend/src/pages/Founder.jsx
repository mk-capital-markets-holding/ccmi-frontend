import React from "react";
import { ArrowUpRight, Linkedin } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FOUNDER } from "@/data/founder";

export default function Founder() {
  return (
    <>
      <SEO title={`Founder — ${FOUNDER.name}`} description="Malik Kamara — CFA, FRM. 22 years across capital markets. Founder & CEO of MK Capital Markets Technologies." path="/founder" />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: "Founder" }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5">
              <div className="aspect-[3/4] bg-mk-ink2 overflow-hidden">
                <img src={FOUNDER.portrait} alt={FOUNDER.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="overline mb-4">Founder & CEO</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-none">{FOUNDER.name}</h1>
              <div className="mt-4 text-mk-bronze2 uppercase tracking-widest text-sm">{FOUNDER.role} · {FOUNDER.location}</div>
              <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-white hover:text-mk-bronze mk-link" data-testid="founder-linkedin"><Linkedin className="w-4 h-4" strokeWidth={1.5} /> LinkedIn — verified profile</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="overline mb-3">Biography</div>
            <div className="space-y-6 text-lg leading-relaxed text-mk-text max-w-3xl">
              {FOUNDER.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <blockquote className="mt-12 font-serif text-3xl leading-tight text-mk-ink border-l-2 border-mk-bronze pl-6 max-w-3xl">"{FOUNDER.quotes[1]}"</blockquote>
          </div>
          <div className="lg:col-span-4">
            <div className="border-l border-mk-line/15 pl-8 space-y-8">
              <div>
                <div className="overline mb-3">Awards</div>
                <ul className="space-y-3 text-sm">{FOUNDER.awards.map(a => <li key={a} className="text-mk-text2">— {a}</li>)}</ul>
              </div>
              <div>
                <div className="overline mb-3">Upcoming engagements</div>
                <ul className="divide-y divide-mk-line/15">
                  {FOUNDER.upcoming.map(u => (
                    <li key={u.event} className="py-3">
                      <div className="font-serif text-lg">{u.event}</div>
                      <div className="text-xs font-mono text-mk-text2">{u.city} · {u.date}</div>
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
          <div className="overline mb-3">Career</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-12">22 years across capital markets.</h2>
          <ol className="divide-y divide-mk-line/15 border-y border-mk-line/15 max-w-4xl">
            {FOUNDER.career.map((c) => (
              <li key={c.period} className="py-6 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3 font-mono text-mk-bronze2 text-sm">{c.period}</div>
                <div className="col-span-12 md:col-span-6"><div className="font-serif text-lg">{c.org}</div></div>
                <div className="col-span-12 md:col-span-3 text-mk-text2 text-sm md:text-right">{c.role}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk">
          <div className="overline mb-3">Selected media</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-12">In the press.</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mk-line/15 border border-mk-line/15">
            {FOUNDER.media.map((m) => (
              <li key={m.title} className="bg-mk-paper p-8 flex items-start justify-between gap-8 hover:bg-white transition-colors">
                <div>
                  <div className="font-mono text-xs text-mk-bronze2 uppercase tracking-widest">{m.outlet}</div>
                  <div className="font-serif text-xl mt-2 leading-snug">{m.title}</div>
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
