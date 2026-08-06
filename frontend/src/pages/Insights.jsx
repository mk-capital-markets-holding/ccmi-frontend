import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Canonical (english) category values that map to `ins.category.*` keys.
const CATEGORY_KEYS = [
  { value: "All", tk: "ins.category.all" },
  { value: "Capital Markets", tk: "ins.category.capital_markets" },
  { value: "Technology", tk: "ins.category.technology" },
  { value: "Africa", tk: "ins.category.africa" },
  { value: "Dubai", tk: "ins.category.dubai" },
  { value: "Product", tk: "ins.category.product" },
  { value: "Company", tk: "ins.category.company" },
];

// Category value expected by backend for each locale (backend does exact match on localized value)
const BACKEND_CATEGORY_FR = {
  "All": "Toutes",
  "Capital Markets": "Marchés de Capitaux",
  "Technology": "Technologie",
  "Africa": "Afrique",
  "Dubai": "Dubaï",
  "Product": "Produit",
  "Company": "Société",
};

export default function Insights() {
  const { lang, t } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const backendCat = lang === "fr" ? (BACKEND_CATEGORY_FR[cat] || cat) : cat;

  const { data, isLoading } = useQuery({
    queryKey: ["articles", cat, q, lang],
    queryFn: async () => (await axios.get(`${BACKEND_URL}/api/articles?category=${encodeURIComponent(backendCat)}&q=${encodeURIComponent(q)}&lang=${lang}`)).data,
  });
  const items = data?.items || [];
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <>
      <SEO title={t("ins.title")} description={t("ins.title")} path="/insights" />

      <section className="bg-mk-ink text-white pt-20 pb-16 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.insights") }]} />
          <div className="mt-8">
            <div className="overline mb-4">{t("ins.overline")}</div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">{t("ins.title")}</h1>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper border-b border-mk-line/15">
        <div className="container-mk py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" data-testid="insights-categories">
            {CATEGORY_KEYS.map(c => (
              <button key={c.value} onClick={() => setCat(c.value)} className={`text-xs uppercase tracking-widest px-3 py-1.5 transition-colors ${cat === c.value ? "bg-mk-ink text-white" : "text-mk-text2 hover:text-mk-ink"}`} data-testid={`cat-${c.value}`}>{t(c.tk)}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 border-b border-mk-line/25 py-1 w-full md:w-72">
            <Search className="w-4 h-4 text-mk-text2" strokeWidth={1.5} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder={t("ins.search_placeholder")} className="flex-1 bg-transparent focus:outline-none py-1 text-sm" data-testid="input-insights-search" />
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-16">
        <div className="container-mk">
          {isLoading && <div className="text-mk-text2">{t("ins.loading")}</div>}
          {!isLoading && items.length === 0 && <div className="text-mk-text2" data-testid="insights-no-results">{t("ins.no_results")}</div>}
          {featured && (() => {
            const featuredSlug = typeof featured.slug === "string" || typeof featured.slug === "number"
              ? String(featured.slug)
              : typeof featured.id === "string" || typeof featured.id === "number"
                ? String(featured.id)
                : "featured-article";
            return (
              <Link to={p(`/insights/${featuredSlug}`)} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 group" data-testid="insights-featured">
                <div className="aspect-[4/3] overflow-hidden bg-mk-ink">
                  <img src={featured.cover} alt={L(featured.title, lang)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="overline mb-3 text-mk-bronze2">{L(featured.category?.name || featured.category, lang)} · {featured.read_minutes} {t("ins.min_read")} · {featured.published_at}</div>
                  <h2 className="font-serif text-4xl md:text-5xl leading-tight group-hover:text-mk-bronze2 transition-colors">{L(featured.title, lang)}</h2>
                  <p className="mt-6 text-mk-text2 text-lg leading-relaxed max-w-lg">{L(featured.excerpt, lang)}</p>
                  <div className="mt-6 text-sm">— {L(featured.author, lang)}</div>
                </div>
              </Link>
            );
          })()}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {rest.map((a, index) => {
              const articleSlug = typeof a.slug === "string" || typeof a.slug === "number"
                ? String(a.slug)
                : typeof a.id === "string" || typeof a.id === "number"
                  ? String(a.id)
                  : `article-${index}`;
              return (
                <Link key={`${articleSlug}-${index}`} to={p(`/insights/${articleSlug}`)} className="group" data-testid={`article-card-${articleSlug}`}>
                  <div className="aspect-[16/10] overflow-hidden bg-mk-ink mb-5">
                    <img src={a.cover} alt={L(a.title, lang)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="overline text-mk-bronze2 mb-2">{L(a.category?.name || a.category, lang)} · {a.read_minutes} {t("ins.min_read")}</div>
                  <h3 className="font-serif text-2xl leading-tight group-hover:text-mk-bronze2 transition-colors">{L(a.title, lang)}</h3>
                  <p className="text-sm text-mk-text2 mt-3 leading-relaxed">{L(a.excerpt, lang)}</p>
                  <div className="mt-3 text-xs font-mono text-mk-text2">{a.published_at} · {L(a.author, lang)}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
