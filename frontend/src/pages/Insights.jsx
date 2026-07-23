import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n, localizedPath } from "@/i18n/context";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const CATEGORIES = ["All", "Capital Markets", "Technologie", "Afrique", "Dubai", "Produit", "Société"];

export default function Insights() {
  const { lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({ queryKey: ["articles", cat, q], queryFn: async () => (await axios.get(`${BACKEND_URL}/api/articles?category=${encodeURIComponent(cat)}&q=${encodeURIComponent(q)}`)).data });
  const items = data?.items || [];
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <>
      <SEO title="Insights — Capital markets, technology, Africa, Dubai" description="Research and commentary from the MK CMT team on capital-markets technology, African exchanges, and Dubai as a fintech corridor." path="/insights" />

      <section className="bg-mk-ink text-white pt-20 pb-16 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: "Insights" }]} />
          <div className="mt-8">
            <div className="overline mb-4">Insights</div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">Research from the desk.</h1>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper border-b border-mk-line/15">
        <div className="container-mk py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" data-testid="insights-categories">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`text-xs uppercase tracking-widest px-3 py-1.5 transition-colors ${cat === c ? "bg-mk-ink text-white" : "text-mk-text2 hover:text-mk-ink"}`} data-testid={`cat-${c}`}>{c}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 border-b border-mk-line/25 py-1 w-full md:w-72">
            <Search className="w-4 h-4 text-mk-text2" strokeWidth={1.5} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search insights…" className="flex-1 bg-transparent focus:outline-none py-1 text-sm" data-testid="input-insights-search" />
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-16">
        <div className="container-mk">
          {isLoading && <div className="text-mk-text2">Loading…</div>}
          {featured && (
            <Link to={p(`/insights/${featured.slug}`)} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 group" data-testid="insights-featured">
              <div className="aspect-[4/3] overflow-hidden bg-mk-ink">
                <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="overline mb-3 text-mk-bronze2">{featured.category} · {featured.read_minutes} min read · {featured.published_at}</div>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight group-hover:text-mk-bronze2 transition-colors">{featured.title}</h2>
                <p className="mt-6 text-mk-text2 text-lg leading-relaxed max-w-lg">{featured.excerpt}</p>
                <div className="mt-6 text-sm">— {featured.author}</div>
              </div>
            </Link>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {rest.map(a => (
              <Link key={a.slug} to={p(`/insights/${a.slug}`)} className="group" data-testid={`article-card-${a.slug}`}>
                <div className="aspect-[16/10] overflow-hidden bg-mk-ink mb-5">
                  <img src={a.cover} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="overline text-mk-bronze2 mb-2">{a.category} · {a.read_minutes} min</div>
                <h3 className="font-serif text-2xl leading-tight group-hover:text-mk-bronze2 transition-colors">{a.title}</h3>
                <p className="text-sm text-mk-text2 mt-3 leading-relaxed">{a.excerpt}</p>
                <div className="mt-3 text-xs font-mono text-mk-text2">{a.published_at} · {a.author}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
